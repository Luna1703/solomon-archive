import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { BottomNav, type ActiveTab } from './components/BottomNav';
import { StreakBanner } from './components/StreakBanner';
import { DailyTaskCard } from './components/DailyTaskCard';
import { CameraUploadModal } from './components/CameraUploadModal';
import { ArchiveGallery } from './components/ArchiveGallery';
import { ArtifactModal } from './components/ArtifactModal';
import { AchievementsView } from './components/AchievementsView';
import { SettingsModal } from './components/SettingsModal';
import { UnlockedAchievementToast } from './components/UnlockedAchievementToast';

import type { Achievement, ArtifactItem, Language, StreakState, TaskDefinition } from './types';
import { StorageService } from './services/storage';
import { getDailyTask, formatDateKey, getEffectiveDate } from './services/dailyTask';
import { evaluateStreak, registerTaskCompletion } from './services/streak';
import { checkAchievements, getEvaluatedAchievements } from './services/achievements';
import { translations } from './i18n/translations';

export function App() {
  // App state
  const [lang, setLang] = useState<Language>(() => StorageService.getSavedLanguage());
  const [activeTab, setActiveTab] = useState<ActiveTab>('quest');
  const [streak, setStreak] = useState<StreakState>(() => evaluateStreak());
  const [artifacts, setArtifacts] = useState<ArtifactItem[]>([]);
  const [currentTask, setCurrentTask] = useState<TaskDefinition | null>(null);
  const [todayDateKey, setTodayDateKey] = useState<string>('');
  const [isTodayCompleted, setIsTodayCompleted] = useState<boolean>(false);
  const [todayArtifact, setTodayArtifact] = useState<ArtifactItem | undefined>(undefined);

  // Modals & Popups
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedArtifact, setSelectedArtifact] = useState<ArtifactItem | null>(null);
  const [selectedArtifactIndex, setSelectedArtifactIndex] = useState<number>(1);
  const [celebrationAchievement, setCelebrationAchievement] = useState<Achievement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load state and tasks
  const loadData = useCallback(async () => {
    try {
      const effective = getEffectiveDate();
      const dateKey = formatDateKey(effective);
      setTodayDateKey(dateKey);

      // Load streak
      const currentStreak = evaluateStreak();
      setStreak(currentStreak);

      // Load artifacts from IndexedDB
      const allArtifacts = await StorageService.getAllArtifacts();
      setArtifacts(allArtifacts);

      // Load Daily Task
      const daily = await getDailyTask(dateKey);
      setCurrentTask(daily.task);
      setIsTodayCompleted(daily.completed);

      if (daily.completed && daily.artifactId) {
        const found = allArtifacts.find((a) => a.id === daily.artifactId);
        setTodayArtifact(found);
      } else {
        // Also check if any artifact exists for this dateKey
        const match = allArtifacts.find((a) => a.dateStr === dateKey);
        if (match) {
          setIsTodayCompleted(true);
          setTodayArtifact(match);
        } else {
          setTodayArtifact(undefined);
        }
      }
    } catch (err) {
      console.error('Error loading Solomon Archive data:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isCancelled = false;
    const fetchArchive = async () => {
      await loadData();
    };
    if (!isCancelled) {
      void fetchArchive();
    }
    return () => {
      isCancelled = true;
    };
  }, [loadData]);

  // Handle language change
  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    StorageService.saveLanguage(newLang);
  };

  // Handle artifact submission (capturing photo)
  const handleSaveArtifact = async (imageUrl: string, note: string) => {
    if (!currentTask) return;

    const newArtifactId = `art_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const effective = getEffectiveDate();
    const dateKey = formatDateKey(effective);

    const newArtifact: ArtifactItem = {
      id: newArtifactId,
      taskId: currentTask.id,
      taskTitle: currentTask.title,
      taskCategory: currentTask.category,
      dateStr: dateKey,
      timestamp: effective.getTime(),
      imageUrl,
      note: note.trim() || undefined,
    };

    // 1. Save artifact to IndexedDB
    await StorageService.saveArtifact(newArtifact);

    // 2. Mark day as completed
    await StorageService.saveDailyProgress({
      dateStr: dateKey,
      taskId: currentTask.id,
      completed: true,
      artifactId: newArtifactId,
      completedAt: Date.now(),
    });

    // 3. Register streak
    const { streakState, streakIncreased } = registerTaskCompletion(dateKey);
    setStreak(streakState);

    // 4. Update local artifacts array
    const updatedArtifacts = [newArtifact, ...artifacts];
    setArtifacts(updatedArtifacts);
    setIsTodayCompleted(true);
    setTodayArtifact(newArtifact);

    // 5. Check achievements
    const newlyUnlocked = checkAchievements(updatedArtifacts, streakState, newArtifact);

    // 6. Confetti and celebration
    if (streakIncreased || newlyUnlocked.length > 0) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#e0245b', '#c01d4e', '#ffffff', '#ff4d7d', '#ffa3be'],
      });
    }

    if (newlyUnlocked.length > 0) {
      // Show first unlocked achievement toast
      setCelebrationAchievement(newlyUnlocked[0]);
    }
  };

  // Handle artifact deletion
  const handleDeleteArtifact = async (id: string) => {
    await StorageService.deleteArtifact(id);
    const updated = artifacts.filter((a) => a.id !== id);
    setArtifacts(updated);

    if (todayArtifact && todayArtifact.id === id) {
      setIsTodayCompleted(false);
      setTodayArtifact(undefined);
      await StorageService.saveDailyProgress({
        dateStr: todayDateKey,
        taskId: currentTask?.id || '',
        completed: false,
      });
    }
  };

  // Reset all data
  const handleResetData = async () => {
    await StorageService.clearAllData();
    window.location.reload();
  };

  const evaluatedAchievements = getEvaluatedAchievements(artifacts, streak);
  const unlockedCount = evaluatedAchievements.filter((a) => a.isUnlocked).length;

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-3"
        style={{ background: 'var(--bg-primary)', color: 'var(--accent)' }}
      >
        <div
          className="w-10 h-10 border-2 rounded-full animate-spin"
          style={{ borderColor: 'var(--border)', borderTopColor: 'var(--accent)' }}
        />
        <span className="text-xs font-mono tracking-widest uppercase text-white/70">
          {translations[lang].appTitle}...
        </span>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col antialiased text-white"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Top Header */}
      <Header
        currentLang={lang}
        onLanguageChange={handleLanguageChange}
        streak={streak}
        isTodayCompleted={isTodayCompleted}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-5 sm:py-7 pb-24 space-y-6">
        {/* Streak Banner (shown on Quest and Archive tabs) */}
        {activeTab !== 'achievements' && (
          <StreakBanner
            streak={streak}
            isTodayCompleted={isTodayCompleted}
            lang={lang}
          />
        )}

        {/* Tab 1: Today's Quest */}
        {activeTab === 'quest' && currentTask && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <DailyTaskCard
              task={currentTask}
              dateStr={todayDateKey}
              isCompleted={isTodayCompleted}
              todayArtifact={todayArtifact}
              lang={lang}
              onOpenUpload={() => setIsUploadOpen(true)}
              onInspectArtifact={(art) => {
                setSelectedArtifact(art);
                setSelectedArtifactIndex(artifacts.findIndex((a) => a.id === art.id) + 1);
              }}
            />
          </div>
        )}

        {/* Tab 2: The Archive (Collection) */}
        {activeTab === 'archive' && (
          <div className="animate-in fade-in duration-200">
            <ArchiveGallery
              artifacts={artifacts}
              lang={lang}
              onSelectArtifact={(art, idx) => {
                setSelectedArtifact(art);
                setSelectedArtifactIndex(idx);
              }}
              onNavigateToQuest={() => setActiveTab('quest')}
            />
          </div>
        )}

        {/* Tab 3: Trophies / Achievements */}
        {activeTab === 'achievements' && (
          <div className="animate-in fade-in duration-200">
            <AchievementsView
              achievements={evaluatedAchievements}
              lang={lang}
            />
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        lang={lang}
        artifactCount={artifacts.length}
        unlockedAchievementCount={unlockedCount}
      />

      {/* Camera / File Upload Modal */}
      {currentTask && (
        <CameraUploadModal
          isOpen={isUploadOpen}
          onClose={() => setIsUploadOpen(false)}
          task={currentTask}
          lang={lang}
          onSaveArtifact={handleSaveArtifact}
        />
      )}

      {/* Artifact Full Detail Modal */}
      <ArtifactModal
        artifact={selectedArtifact}
        indexNumber={selectedArtifactIndex}
        onClose={() => setSelectedArtifact(null)}
        lang={lang}
        onDelete={handleDeleteArtifact}
      />

      {/* Settings & Simulation Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentLang={lang}
        onLanguageChange={handleLanguageChange}
        artifactCount={artifacts.length}
        onDataReset={handleResetData}
        onDateShiftChanged={() => loadData()}
      />

      {/* Unlocked Achievement Celebration Popup */}
      <UnlockedAchievementToast
        achievement={celebrationAchievement}
        lang={lang}
        onDismiss={() => setCelebrationAchievement(null)}
      />
    </div>
  );
}

export default App;
