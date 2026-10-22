import React from 'react';
import { Flame, Calendar, Trophy, CheckCircle2 } from 'lucide-react';
import type { Language, StreakState } from '../types';
import { translations } from '../i18n/translations';
import { getLast7DaysStatus } from '../services/streak';

interface StreakBannerProps {
  streak: StreakState;
  isTodayCompleted: boolean;
  lang: Language;
}

export const StreakBanner: React.FC<StreakBannerProps> = ({
  streak,
  isTodayCompleted,
  lang,
}) => {
  const t = translations[lang];
  const last7Days = getLast7DaysStatus(streak);

  return (
    <div
      className="relative overflow-hidden rounded-2xl border p-4 sm:p-5 shadow-xl"
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Glow effect */}
      <div
        className="absolute top-0 right-0 -mt-6 -mr-6 w-40 h-40 rounded-full blur-2xl pointer-events-none"
        style={{ background: 'var(--accent-glow)', opacity: 0.2 }}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        {/* Streak summary */}
        <div className="flex items-center gap-3.5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center border transition-all"
            style={
              isTodayCompleted || streak.currentStreak > 0
                ? {
                    background: 'var(--accent-subtle)',
                    borderColor: 'var(--border-accent)',
                    color: 'var(--accent)',
                    boxShadow: '0 4px 14px var(--accent-glow)',
                  }
                : {
                    background: 'var(--bg-secondary)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-muted)',
                  }
            }
          >
            <Flame
              className="w-8 h-8"
              style={{
                fill: streak.currentStreak > 0 ? 'var(--accent)' : 'none',
                color: streak.currentStreak > 0 ? 'var(--accent)' : 'var(--text-muted)',
              }}
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                {streak.currentStreak}
              </span>
              <span className="text-sm sm:text-base font-bold" style={{ color: 'var(--accent)' }}>
                {t.streakDaysLabel}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/70 flex items-center gap-1.5 mt-0.5">
              {isTodayCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-emerald-300 font-medium">{t.streakActiveToday}</span>
                </>
              ) : (
                <span style={{ color: 'var(--accent)' }}>{t.streakAtRisk}</span>
              )}
            </p>
          </div>
        </div>

        {/* Record & Total Stats */}
        <div
          className="flex items-center gap-4 border rounded-xl px-3 py-2 text-xs"
          style={{
            background: 'var(--bg-primary)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="flex items-center gap-1.5 text-white/70">
            <Trophy className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            <div>
              <div className="text-[10px] text-white/40 uppercase tracking-wider">{t.bestStreak}</div>
              <div className="font-bold text-white">{streak.longestStreak} d</div>
            </div>
          </div>
          <div className="h-6 w-px" style={{ background: 'var(--border)' }} />
          <div className="flex items-center gap-1.5 text-white/70">
            <Calendar className="w-4 h-4 text-white/40" />
            <div>
              <div className="text-[10px] text-white/40 uppercase tracking-wider">{t.totalCollected}</div>
              <div className="font-bold text-white">{streak.history.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day History Track */}
      <div className="mt-4 pt-3.5 border-t relative z-10" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-medium text-white/40 uppercase tracking-wider">
            {t.weekView}
          </span>
        </div>
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {last7Days.map((d) => (
            <div
              key={d.dateStr}
              className="flex flex-col items-center justify-center py-2 px-1 rounded-xl border text-center transition-all"
              style={
                d.isCompleted
                  ? {
                      background: 'var(--accent-subtle)',
                      borderColor: 'var(--border-accent)',
                      color: 'var(--accent)',
                    }
                  : d.isToday
                  ? {
                      background: 'rgba(224, 36, 91, 0.05)',
                      borderColor: 'var(--border-accent)',
                      color: 'var(--accent)',
                    }
                  : {
                      background: 'rgba(26, 23, 24, 0.4)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-muted)',
                    }
              }
            >
              <span className="text-[10px] font-medium opacity-80">{d.dayShort}</span>
              <div className="my-1">
                {d.isCompleted ? (
                  <Flame className="w-4 h-4 mx-auto" style={{ fill: 'var(--accent)', color: 'var(--accent)' }} />
                ) : (
                  <div
                    className="w-2 h-2 rounded-full mx-auto"
                    style={{
                      background: d.isToday ? 'var(--accent)' : 'rgba(255, 255, 255, 0.2)',
                    }}
                  />
                )}
              </div>
              <span className="text-[10px] font-mono">{d.dayNumber}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
