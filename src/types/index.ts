export type Language = 'en' | 'hy' | 'ru';

export type TaskCategory =
  | 'artefact'
  | 'nature'
  | 'time'
  | 'light'
  | 'knowledge'
  | 'everyday'
  | 'food'
  | 'architecture'
  | 'transport'
  | 'texture'
  | 'color'
  | 'animals'
  | 'street'
  | 'geometry';

export interface LocalizedText {
  en: string;
  hy: string;
  ru: string;
}

export interface TaskDefinition {
  id: string;
  category: TaskCategory;
  title: LocalizedText;
  description: LocalizedText;
  hint: LocalizedText;
  solomonQuote: LocalizedText;
}

export interface ArtifactItem {
  id: string;
  taskId: string;
  taskTitle: LocalizedText;
  taskCategory: TaskCategory;
  dateStr: string; // YYYY-MM-DD
  timestamp: number;
  imageUrl: string; // Blob URL or base64 data stored in IndexedDB
  note?: string;
}

export interface AchievementCondition {
  type: 'streak' | 'artifact_count' | 'category_count' | 'time_of_day' | 'has_note';
  target: number;
  categoryThreshold?: number;
  timeWindow?: 'morning' | 'night';
}

export interface Achievement {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  icon: string;
  condition: AchievementCondition;
  unlockedAt?: number; // timestamp if unlocked
}

export interface StreakState {
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string | null; // YYYY-MM-DD
  history: string[]; // list of dates completed YYYY-MM-DD
}

export interface DailyProgress {
  dateStr: string; // YYYY-MM-DD
  taskId: string;
  completed: boolean;
  artifactId?: string;
  completedAt?: number;
}
