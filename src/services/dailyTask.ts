import { TASKS_DATABASE } from '../data/tasks';
import type { TaskDefinition } from '../types';
import { StorageService } from './storage';

/**
 * Returns current effective date accounting for tester simulation offset
 */
export function getEffectiveDate(): Date {
  const offsetDays = StorageService.getSimulatedDayOffset();
  const d = new Date();
  if (offsetDays !== 0) {
    d.setDate(d.getDate() + offsetDays);
  }
  return d;
}

/**
 * Formats date as YYYY-MM-DD
 */
export function formatDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Calculates a non-repeating task index for each consecutive calendar day.
 * Uses a coprime step multiplier to mathematically guarantee that every
 * task in the database is visited exactly once before any repetition occurs.
 */
export function getNonRepeatingDailyIndex(dateStr: string, totalCount: number): number {
  if (totalCount <= 0) return 0;
  const [y, m, d] = dateStr.split('-').map(Number);
  const epochDays = Math.floor(Date.UTC(y, m - 1, d) / (1000 * 60 * 60 * 24));
  
  // 37 is coprime to 105 (and most typical database sizes)
  const step = 37;
  const offset = 19;
  return Math.abs((epochDays * step + offset) % totalCount);
}

/**
 * Retrieves the daily task for given date.
 * If not already chosen, assigns one deterministically and caches it in daily_progress.
 */
export async function getDailyTask(dateStr?: string): Promise<{ task: TaskDefinition; dateStr: string; completed: boolean; artifactId?: string }> {
  const targetDateStr = dateStr || formatDateKey(getEffectiveDate());
  
  // Check if we already have progress or cached task for today
  const existingProgress = await StorageService.getDailyProgress(targetDateStr);
  
  if (existingProgress && existingProgress.taskId) {
    const found = TASKS_DATABASE.find((t) => t.id === existingProgress.taskId);
    if (found) {
      return {
        task: found,
        dateStr: targetDateStr,
        completed: existingProgress.completed,
        artifactId: existingProgress.artifactId,
      };
    }
  }

  // Non-repeating deterministic cycle based on consecutive calendar day
  const taskIndex = getNonRepeatingDailyIndex(targetDateStr, TASKS_DATABASE.length);
  const selectedTask = TASKS_DATABASE[taskIndex];

  // Save the assignment so it stays guaranteed fixed for this day
  await StorageService.saveDailyProgress({
    dateStr: targetDateStr,
    taskId: selectedTask.id,
    completed: false,
  });

  return {
    task: selectedTask,
    dateStr: targetDateStr,
    completed: false,
  };
}

/**
 * Milliseconds left until midnight of effective date
 */
export function getTimeUntilMidnight(effectiveDate: Date): { hours: number; minutes: number; seconds: number } {
  const midnight = new Date(effectiveDate);
  midnight.setHours(24, 0, 0, 0);
  const diffMs = Math.max(0, midnight.getTime() - effectiveDate.getTime());
  
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
  
  return { hours, minutes, seconds };
}
