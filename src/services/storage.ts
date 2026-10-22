import { openDB, type IDBPDatabase } from 'idb';
import type { ArtifactItem, DailyProgress, Language, StreakState } from '../types';

const DB_NAME = 'solomons_archive_db';
const DB_VERSION = 1;
const STORE_ARTIFACTS = 'artifacts';
const STORE_PROGRESS = 'daily_progress';

const LOCAL_STORAGE_KEYS = {
  LANGUAGE: 'solomon_language',
  STREAK: 'solomon_streak',
  ACHIEVEMENTS: 'solomon_achievements',
  SIMULATED_OFFSET_DAYS: 'solomon_simulated_offset_days',
};

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDb(): Promise<IDBPDatabase> {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_ARTIFACTS)) {
          const artifactStore = db.createObjectStore(STORE_ARTIFACTS, { keyPath: 'id' });
          artifactStore.createIndex('dateStr', 'dateStr');
          artifactStore.createIndex('timestamp', 'timestamp');
        }
        if (!db.objectStoreNames.contains(STORE_PROGRESS)) {
          db.createObjectStore(STORE_PROGRESS, { keyPath: 'dateStr' });
        }
      },
    });
  }
  return dbPromise;
}

export const StorageService = {
  // Artifacts in IndexedDB
  async saveArtifact(artifact: ArtifactItem): Promise<void> {
    const db = await getDb();
    await db.put(STORE_ARTIFACTS, artifact);
  },

  async getAllArtifacts(): Promise<ArtifactItem[]> {
    const db = await getDb();
    const all = await db.getAll(STORE_ARTIFACTS);
    return all.sort((a, b) => b.timestamp - a.timestamp);
  },

  async deleteArtifact(id: string): Promise<void> {
    const db = await getDb();
    await db.delete(STORE_ARTIFACTS, id);
  },

  // Daily Progress in IndexedDB
  async saveDailyProgress(progress: DailyProgress): Promise<void> {
    const db = await getDb();
    await db.put(STORE_PROGRESS, progress);
  },

  async getDailyProgress(dateStr: string): Promise<DailyProgress | undefined> {
    const db = await getDb();
    return db.get(STORE_PROGRESS, dateStr);
  },

  async getAllProgress(): Promise<DailyProgress[]> {
    const db = await getDb();
    return db.getAll(STORE_PROGRESS);
  },

  // LocalStorage methods
  getSavedLanguage(): Language {
    const lang = localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE) as Language | null;
    if (lang === 'en' || lang === 'hy' || lang === 'ru') {
      return lang;
    }
    // Default language detection
    const navLang = navigator.language.toLowerCase();
    if (navLang.startsWith('hy')) return 'hy';
    if (navLang.startsWith('ru')) return 'ru';
    return 'ru'; // Default to Russian as per prompt context
  },

  saveLanguage(lang: Language): void {
    localStorage.setItem(LOCAL_STORAGE_KEYS.LANGUAGE, lang);
  },

  getSavedStreak(): StreakState {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.STREAK);
    if (!raw) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        lastCompletedDate: null,
        history: [],
      };
    }
    try {
      return JSON.parse(raw);
    } catch {
      return {
        currentStreak: 0,
        longestStreak: 0,
        lastCompletedDate: null,
        history: [],
      };
    }
  },

  saveStreak(streak: StreakState): void {
    localStorage.setItem(LOCAL_STORAGE_KEYS.STREAK, JSON.stringify(streak));
  },

  getUnlockedAchievements(): Record<string, number> {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.ACHIEVEMENTS);
    if (!raw) return {};
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  },

  saveUnlockedAchievements(record: Record<string, number>): void {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(record));
  },

  // Tester Simulation Day Offset
  getSimulatedDayOffset(): number {
    const val = localStorage.getItem(LOCAL_STORAGE_KEYS.SIMULATED_OFFSET_DAYS);
    return val ? parseInt(val, 10) || 0 : 0;
  },

  setSimulatedDayOffset(offset: number): void {
    localStorage.setItem(LOCAL_STORAGE_KEYS.SIMULATED_OFFSET_DAYS, offset.toString());
  },

  // Wipe All Data
  async clearAllData(): Promise<void> {
    const db = await getDb();
    await db.clear(STORE_ARTIFACTS);
    await db.clear(STORE_PROGRESS);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.STREAK);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACHIEVEMENTS);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.SIMULATED_OFFSET_DAYS);
  },

  // Export full JSON backup
  async exportFullBackup(): Promise<string> {
    const artifacts = await this.getAllArtifacts();
    const progress = await this.getAllProgress();
    const streak = this.getSavedStreak();
    const achievements = this.getUnlockedAchievements();
    const language = this.getSavedLanguage();

    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      language,
      streak,
      achievements,
      progress,
      artifacts,
    };
    return JSON.stringify(payload, null, 2);
  },

  // Import full JSON backup
  async importFullBackup(jsonString: string): Promise<boolean> {
    try {
      const data = JSON.parse(jsonString);
      if (!data || !Array.isArray(data.artifacts)) return false;

      const db = await getDb();
      await db.clear(STORE_ARTIFACTS);
      await db.clear(STORE_PROGRESS);

      for (const item of data.artifacts) {
        await db.put(STORE_ARTIFACTS, item);
      }
      if (Array.isArray(data.progress)) {
        for (const prog of data.progress) {
          await db.put(STORE_PROGRESS, prog);
        }
      }
      if (data.streak) this.saveStreak(data.streak);
      if (data.achievements) this.saveUnlockedAchievements(data.achievements);
      if (data.language) this.saveLanguage(data.language);

      return true;
    } catch (err) {
      console.error('Failed to parse backup JSON:', err);
      return false;
    }
  }
};
