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
      <div
        className="relative overflow-hidden rounded-3xl border p-5 sm:p-7 shadow-xl"
        style={{
          background: 'var(--bg-card)',
          borderColor: 'var(--border)',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2
              className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <Award className="w-6 h-6" style={{ color: 'var(--accent)' }} />
              <span>{t.achievementsTitle}</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/50">
              {t.achievementsSubtitle}
            </p>
          </div>

          {/* Unlocked stats pill */}
          <div
            className="flex items-center gap-3 border rounded-2xl px-4 py-3 self-start sm:self-auto"
            style={{
              background: 'var(--bg-primary)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="text-right">
              <div className="text-xs text-white/50 uppercase tracking-wider">{t.progressLabel}</div>
              <div className="text-lg font-extrabold font-mono" style={{ color: 'var(--accent)' }}>
                {unlockedCount} / {totalCount}
              </div>
            </div>
            <div
              className="w-12 h-12 rounded-full border flex items-center justify-center font-bold text-xs"
              style={{
                borderColor: 'var(--border-accent)',
                background: 'var(--accent-subtle)',
                color: 'var(--accent)',
              }}
            >
              {completionPercentage}%
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-4 w-full rounded-full h-2 overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${completionPercentage}%`,
              background: 'var(--accent)',
              boxShadow: '0 0 10px var(--accent-glow)',
            }}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter('all')}
          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border"
          style={
            filter === 'all'
              ? {
                  background: 'var(--accent)',
                  borderColor: 'var(--border-accent)',
                  color: '#ffffff',
                  boxShadow: '0 2px 8px var(--accent-glow)',
                }
              : {
                  background: 'var(--bg-card)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-secondary)',
                }
          }
        >
          {lang === 'hy' ? 'Բոլորը' : lang === 'ru' ? 'Все' : 'All'} ({totalCount})
        </button>
        <button
          onClick={() => setFilter('unlocked')}
          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border"
          style={
            filter === 'unlocked'
              ? {
                  background: 'var(--accent)',
                  borderColor: 'var(--border-accent)',
                  color: '#ffffff',
                  boxShadow: '0 2px 8px var(--accent-glow)',
                }
              : {
                  background: 'var(--bg-card)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-secondary)',
                }
          }
        >
          {t.unlockedTab.replace('{count}', String(unlockedCount))}
        </button>
        <button
          onClick={() => setFilter('locked')}
          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border"
          style={
            filter === 'locked'
              ? {
                  background: 'var(--accent)',
                  borderColor: 'var(--border-accent)',
                  color: '#ffffff',
                  boxShadow: '0 2px 8px var(--accent-glow)',
                }
              : {
                  background: 'var(--bg-card)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-secondary)',
                }
          }
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
              className="relative overflow-hidden rounded-2xl p-4 sm:p-5 border transition-all duration-300 flex items-start gap-4"
              style={
                ach.isUnlocked
                  ? {
                      background: 'var(--bg-card)',
                      borderColor: 'var(--border-accent)',
                      boxShadow: '0 4px 18px rgba(224, 36, 91, 0.12)',
                    }
                  : {
                      background: 'rgba(26, 23, 24, 0.5)',
                      borderColor: 'var(--border)',
                      opacity: 0.75,
                    }
              }
            >
              {/* Icon badge */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-transform duration-300"
                style={
                  ach.isUnlocked
                    ? {
                        background: 'var(--accent)',
                        borderColor: 'var(--border-accent)',
                        color: '#ffffff',
                        boxShadow: '0 4px 14px var(--accent-glow)',
                      }
                    : {
                        background: 'var(--bg-secondary)',
                        borderColor: 'var(--border)',
                        color: 'var(--text-muted)',
                      }
                }
              >
                {ach.isUnlocked ? (
                  <IconComp className="w-6 h-6" />
                ) : (
                  <Lock className="w-5 h-5" />
                )}
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3
                    className="text-sm font-bold truncate text-white"
                  >
                    {ach.title[lang]}
                  </h3>
                  {ach.isUnlocked && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                </div>

                <p className="text-xs text-white/50 leading-relaxed mb-3">
                  {ach.description[lang]}
                </p>

                {/* Progress bar or Unlocked date */}
                {ach.isUnlocked ? (
                  <div className="text-[10px] font-mono" style={{ color: 'var(--accent)' }}>
                    {t.unlockedOn.replace('{date}', unlockDateStr)}
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-white/40 font-mono">
                      <span>{t.progressLabel}</span>
                      <span>
                        {ach.currentValue} / {ach.targetValue}
                      </span>
                    </div>
                    <div className="w-full rounded-full h-1.5 overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${ach.progressPercent}%`,
                          background: 'var(--accent)',
                        }}
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
