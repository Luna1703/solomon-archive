import type { StreakState } from '../types';
import { StorageService } from './storage';
import { formatDateKey, getEffectiveDate } from './dailyTask';

/**
 * Parses YYYY-MM-DD into a UTC midnight Date object to avoid timezone shifts
 */
function parseDateKey(key: string): Date {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

/**
 * Calculates day difference between two YYYY-MM-DD date strings
 */
export function getDaysDifference(dateStr1: string, dateStr2: string): number {
  const d1 = parseDateKey(dateStr1);
  const d2 = parseDateKey(dateStr2);
  const diffTime = d2.getTime() - d1.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Evaluates the current streak state based on the current effective date.
 * If user missed yesterday, active streak displays 0 until they complete today.
 */
export function evaluateStreak(): StreakState {
  const saved = StorageService.getSavedStreak();
  const todayStr = formatDateKey(getEffectiveDate());

  if (!saved.lastCompletedDate) {
    return { ...saved, currentStreak: 0 };
  }

  const daysSinceLast = getDaysDifference(saved.lastCompletedDate, todayStr);

  if (daysSinceLast === 0) {
    // Completed today - streak is active and intact
    return saved;
  } else if (daysSinceLast === 1) {
    // Completed yesterday - streak is waiting for today's completion
    return saved;
  } else {
    // Missed at least one whole day - streak is broken
    const updated = {
      ...saved,
      currentStreak: 0,
    };
    StorageService.saveStreak(updated);
    return updated;
  }
}

/**
 * Updates streak when a task is completed today.
 * Returns { newStreakState, streakIncreased }
 */
export function registerTaskCompletion(completedDateStr?: string): {
  streakState: StreakState;
  streakIncreased: boolean;
} {
  const todayStr = completedDateStr || formatDateKey(getEffectiveDate());
  const current = evaluateStreak();

  if (current.lastCompletedDate === todayStr) {
    // Already counted for today
    return { streakState: current, streakIncreased: false };
  }

  let nextStreak = 1;

  if (current.lastCompletedDate) {
    const daysSince = getDaysDifference(current.lastCompletedDate, todayStr);
    if (daysSince === 1) {
      nextStreak = current.currentStreak + 1;
    } else if (daysSince <= 0) {
      // Backfill or same date
      nextStreak = Math.max(1, current.currentStreak);
    } else {
      // Broken streak reset
      nextStreak = 1;
    }
  }

  const newHistory = Array.from(new Set([...current.history, todayStr]));
  const newLongest = Math.max(current.longestStreak, nextStreak);

  const updated: StreakState = {
    currentStreak: nextStreak,
    longestStreak: newLongest,
    lastCompletedDate: todayStr,
    history: newHistory,
  };

  StorageService.saveStreak(updated);
  return { streakState: updated, streakIncreased: true };
}

/**
 * Generates last 7 days status for Duolingo-style streak calendar
 */
export interface DayStatus {
  dateStr: string;
  dayNumber: number;
  dayShort: string;
  isCompleted: boolean;
  isToday: boolean;
}

export function getLast7DaysStatus(streak: StreakState): DayStatus[] {
  const effective = getEffectiveDate();
  const days: DayStatus[] = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i = 6; i >= 0; i--) {
    const d = new Date(effective);
    d.setDate(d.getDate() - i);
    const dateStr = formatDateKey(d);
    days.push({
      dateStr,
      dayNumber: d.getDate(),
      dayShort: dayNames[d.getDay()],
      isCompleted: streak.history.includes(dateStr),
      isToday: i === 0,
    });
  }

  return days;
}
