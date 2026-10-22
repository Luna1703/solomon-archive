import React from 'react';
import { Flame, Settings, Sparkles, Globe } from 'lucide-react';
import type { Language, StreakState } from '../types';
import { translations } from '../i18n/translations';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  streak: StreakState;
  isTodayCompleted: boolean;
  onOpenSettings: () => void;
  onOpenDossier?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  streak,
  isTodayCompleted,
  onOpenSettings,
  onOpenDossier,
}) => {
  const t = translations[currentLang];

  return (
    <header className="sticky top-0 z-30 bg-slate-950/85 backdrop-blur-md border-b border-amber-900/30 px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-950/50 border border-amber-400/30">
            <Sparkles className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              {t.appTitle}
            </h1>
            <p className="hidden sm:block text-xs text-slate-400">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak indicator pill (Duolingo style) */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs sm:text-sm font-semibold transition-all ${
              isTodayCompleted
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-400 shadow-sm shadow-amber-500/20'
                : streak.currentStreak > 0
                ? 'bg-orange-500/10 border-orange-500/30 text-orange-400 animate-pulse'
                : 'bg-slate-900 border-slate-800 text-slate-400'
            }`}
            title={isTodayCompleted ? t.streakActiveToday : t.streakAtRisk}
          >
            <Flame
              className={`w-4 h-4 ${
                streak.currentStreak > 0 ? 'text-amber-500 fill-amber-500' : 'text-slate-500'
              }`}
            />
            <span>{streak.currentStreak}</span>
            <span className="hidden md:inline font-normal text-xs opacity-80">
              {t.streakDaysLabel}
            </span>
          </div>

          {/* Language Selector */}
          <div className="relative flex items-center bg-slate-900/90 border border-slate-800 rounded-lg p-0.5">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5 hidden xs:block" />
            <div className="flex items-center text-xs font-medium">
              {(['en', 'hy', 'ru'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`px-2 py-1 rounded transition-all uppercase ${
                    currentLang === lang
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  aria-label={`Switch to ${lang}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Detective Dossier button */}
          {onOpenDossier && (
            <button
              onClick={onOpenDossier}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#B8252A]/15 border border-[#B8252A]/40 text-[#B8252A] hover:bg-[#B8252A]/25 text-xs font-bold transition-colors"
              title="Detective Dossier Preview"
            >
              <span>🕵️</span>
              <span className="hidden sm:inline uppercase tracking-wider text-[11px]">Dossier</span>
            </button>
          )}

          {/* Settings & Tools Modal Button */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 hover:bg-slate-800 text-slate-300 hover:text-amber-300 transition-colors"
            title={t.navSettings}
            aria-label={t.navSettings}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
