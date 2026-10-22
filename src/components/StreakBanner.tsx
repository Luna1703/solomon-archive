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
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-amber-950/20 border border-amber-900/40 p-4 sm:p-5 shadow-xl">
      {/* Glow effect */}
      <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Streak summary */}
        <div className="flex items-center gap-3.5">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${
              isTodayCompleted
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-400 shadow-lg shadow-amber-500/20'
                : streak.currentStreak > 0
                ? 'bg-orange-500/15 border-orange-500/40 text-orange-400 animate-pulse'
                : 'bg-slate-800/60 border-slate-700 text-slate-500'
            }`}
          >
            <Flame
              className={`w-8 h-8 ${
                streak.currentStreak > 0
                  ? 'fill-amber-500 text-amber-500 filter drop-shadow'
                  : 'text-slate-500'
              }`}
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-100 font-mono tracking-tight">
                {streak.currentStreak}
              </span>
              <span className="text-sm sm:text-base font-semibold text-amber-300">
                {t.streakDaysLabel}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 mt-0.5">
              {isTodayCompleted ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-emerald-300 font-medium">{t.streakActiveToday}</span>
                </>
              ) : (
                <span className="text-amber-300/90">{t.streakAtRisk}</span>
              )}
            </p>
          </div>
        </div>

        {/* Record & Total Stats */}
        <div className="flex items-center gap-4 bg-slate-950/50 border border-slate-800 rounded-xl px-3 py-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Trophy className="w-4 h-4 text-amber-400" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">{t.bestStreak}</div>
              <div className="font-bold text-amber-200">{streak.longestStreak} d</div>
            </div>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div className="flex items-center gap-1.5 text-slate-300">
            <Calendar className="w-4 h-4 text-slate-400" />
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">{t.totalCollected}</div>
              <div className="font-bold text-slate-200">{streak.history.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day History Track (Duolingo style) */}
      <div className="mt-4 pt-3.5 border-t border-slate-800/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
            {t.weekView}
          </span>
        </div>
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {last7Days.map((d) => (
            <div
              key={d.dateStr}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border text-center transition-all ${
                d.isToday
                  ? d.isCompleted
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md shadow-amber-500/20 ring-1 ring-amber-400/40'
                    : 'bg-amber-500/5 border-amber-500/50 text-amber-400 ring-1 ring-amber-500/40 animate-pulse'
                  : d.isCompleted
                  ? 'bg-slate-800/70 border-amber-600/40 text-amber-400'
                  : 'bg-slate-950/40 border-slate-800/60 text-slate-600'
              }`}
            >
              <span className="text-[10px] font-medium opacity-80">{d.dayShort}</span>
              <div className="my-1">
                {d.isCompleted ? (
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-500 mx-auto" />
                ) : (
                  <div
                    className={`w-2 h-2 rounded-full mx-auto ${
                      d.isToday ? 'bg-amber-400' : 'bg-slate-700'
                    }`}
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
