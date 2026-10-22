import { ACHIEVEMENTS_LIST } from '../data/achievements';
import type { Achievement, ArtifactItem, StreakState } from '../types';
import { StorageService } from './storage';

export interface EvaluatedAchievement extends Achievement {
  isUnlocked: boolean;
  currentValue: number;
  targetValue: number;
  progressPercent: number;
}

/**
 * Checks all achievements against current archive state and unlocks any newly earned ones.
 * Returns the list of newly unlocked achievements.
 */
export function checkAchievements(
  artifacts: ArtifactItem[],
  streak: StreakState,
  latestArtifact?: ArtifactItem
): Achievement[] {
  const unlockedRecords = StorageService.getUnlockedAchievements();
  const newlyUnlocked: Achievement[] = [];
  const now = Date.now();

  const totalCount = artifacts.length;
  const uniqueCategories = new Set(artifacts.map((a) => a.taskCategory)).size;
  const hasAnyNote = artifacts.some((a) => a.note && a.note.trim().length > 0);

  const bestStreak = Math.max(streak.currentStreak, streak.longestStreak);

  let hour = new Date().getHours();
  if (latestArtifact) {
    hour = new Date(latestArtifact.timestamp).getHours();
  }

  for (const ach of ACHIEVEMENTS_LIST) {
    if (unlockedRecords[ach.id]) {
      continue; // Already unlocked
    }

    let isMet = false;

    switch (ach.condition.type) {
      case 'artifact_count':
        isMet = totalCount >= ach.condition.target;
        break;

      case 'streak':
        isMet = bestStreak >= ach.condition.target;
        break;

      case 'category_count':
        isMet = uniqueCategories >= ach.condition.target;
        break;

      case 'has_note':
        isMet = hasAnyNote;
        break;

      case 'time_of_day':
        if (ach.condition.timeWindow === 'morning' && hour < 9) {
          isMet = true;
        } else if (ach.condition.timeWindow === 'night' && hour >= 20) {
          isMet = true;
        }
        break;
    }

    if (isMet) {
      unlockedRecords[ach.id] = now;
      newlyUnlocked.push({ ...ach, unlockedAt: now });
    }
  }

  if (newlyUnlocked.length > 0) {
    StorageService.saveUnlockedAchievements(unlockedRecords);
  }

  return newlyUnlocked;
}

/**
 * Returns full evaluated list of achievements with progress metrics
 */
export function getEvaluatedAchievements(
  artifacts: ArtifactItem[],
  streak: StreakState
): EvaluatedAchievement[] {
  const unlockedRecords = StorageService.getUnlockedAchievements();
  const totalCount = artifacts.length;
  const uniqueCategories = new Set(artifacts.map((a) => a.taskCategory)).size;
  const hasAnyNote = artifacts.some((a) => a.note && a.note.trim().length > 0);
  const bestStreak = Math.max(streak.currentStreak, streak.longestStreak);

  return ACHIEVEMENTS_LIST.map((ach) => {
    const isUnlocked = Boolean(unlockedRecords[ach.id]);
    const targetValue = ach.condition.target;
    let currentValue = 0;

    switch (ach.condition.type) {
      case 'artifact_count':
        currentValue = totalCount;
        break;
      case 'streak':
        currentValue = bestStreak;
        break;
      case 'category_count':
        currentValue = uniqueCategories;
        break;
      case 'has_note':
        currentValue = hasAnyNote ? 1 : 0;
        break;
      case 'time_of_day':
        currentValue = isUnlocked ? 1 : 0;
        break;
    }

    const cappedCurrent = Math.min(currentValue, targetValue);
    const progressPercent = targetValue > 0 ? Math.min(100, Math.round((cappedCurrent / targetValue) * 100)) : 0;

    return {
      ...ach,
      isUnlocked,
      unlockedAt: unlockedRecords[ach.id],
      currentValue: cappedCurrent,
      targetValue,
      progressPercent: isUnlocked ? 100 : progressPercent,
    };
  });
}
