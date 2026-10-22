import React, { useState } from 'react';
import {
  Award,
  Sparkles,
  Flame,
  Crown,
  Compass,
  Scroll,
  Gem,
  Feather,
  Layers,
  Sun,
  Moon,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../i18n/translations';
import type { EvaluatedAchievement } from '../services/achievements';

interface AchievementsViewProps {
  achievements: EvaluatedAchievement[];
  lang: Language;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Sparkles,
  Flame,
  FlameKindling: Flame,
  Crown,
  Compass,
  Scroll,
  Gem,
  Feather,
  Layers,
  Sun,
  Moon,
};

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  achievements,
  lang,
}) => {
  const t = translations[lang];
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;
  const totalCount = achievements.length;
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

  const displayedList = achievements.filter((a) => {
    if (filter === 'unlocked') return a.isUnlocked;
    if (filter === 'locked') return !a.isUnlocked;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Banner / Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 border border-amber-900/40 p-5 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2.5">
              <Award className="w-6 h-6 text-amber-400" />
              <span>{t.achievementsTitle}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {t.achievementsSubtitle}
            </p>
          </div>

          {/* Unlocked stats pill */}
          <div className="flex items-center gap-3 bg-slate-950/60 border border-slate-800 rounded-2xl px-4 py-3 self-start sm:self-auto">
            <div className="text-right">
              <div className="text-xs text-slate-400 uppercase tracking-wider">{t.progressLabel}</div>
              <div className="text-lg font-extrabold text-amber-300 font-mono">
                {unlockedCount} / {totalCount}
              </div>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-slate-700 flex items-center justify-center font-bold text-xs text-amber-400 bg-amber-500/10">
              {completionPercentage}%
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-4 w-full bg-slate-800/80 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full transition-all duration-700"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            filter === 'all'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          {lang === 'hy' ? 'Բոլորը' : lang === 'ru' ? 'Все' : 'All'} ({totalCount})
        </button>
        <button
          onClick={() => setFilter('unlocked')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            filter === 'unlocked'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          {t.unlockedTab.replace('{count}', String(unlockedCount))}
        </button>
        <button
          onClick={() => setFilter('locked')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            filter === 'locked'
              ? 'bg-amber-500 text-slate-950 shadow-sm'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          {t.lockedTab.replace('{count}', String(totalCount - unlockedCount))}
        </button>
      </div>

      {/* Achievements Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {displayedList.map((ach) => {
          const IconComp = ICON_MAP[ach.icon] || Award;
          const unlockDateStr = ach.unlockedAt
            ? new Intl.DateTimeFormat(
                lang === 'hy' ? 'hy-AM' : lang === 'ru' ? 'ru-RU' : 'en-US',
                { month: 'short', day: 'numeric', year: 'numeric' }
              ).format(new Date(ach.unlockedAt))
            : '';

          return (
            <div
              key={ach.id}
              className={`relative overflow-hidden rounded-2xl p-4 sm:p-5 border transition-all duration-300 flex items-start gap-4 ${
                ach.isUnlocked
                  ? 'bg-slate-900/90 border-amber-500/50 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-950/40 border-slate-800/80 opacity-75'
              }`}
            >
              {/* Icon badge */}
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                  ach.isUnlocked
                    ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 border-amber-300 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-500 border-slate-800'
                }`}
              >
                {ach.isUnlocked ? (
                  <IconComp className="w-6 h-6" />
                ) : (
                  <Lock className="w-5 h-5 text-slate-600" />
                )}
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3
                    className={`text-sm font-bold truncate ${
                      ach.isUnlocked ? 'text-amber-200' : 'text-slate-300'
                    }`}
                  >
                    {ach.title[lang]}
                  </h3>
                  {ach.isUnlocked && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  {ach.description[lang]}
                </p>

                {/* Progress bar or Unlocked date */}
                {ach.isUnlocked ? (
                  <div className="text-[10px] text-amber-400/80 font-mono">
                    {t.unlockedOn.replace('{date}', unlockDateStr)}
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>{t.progressLabel}</span>
                      <span>
                        {ach.currentValue} / {ach.targetValue}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-amber-500/60 h-full rounded-full transition-all duration-300"
                        style={{ width: `${ach.progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
