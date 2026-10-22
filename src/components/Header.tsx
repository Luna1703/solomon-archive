import React from 'react';
import { Flame, Settings, Globe } from 'lucide-react';
import type { Language, StreakState } from '../types';
import { translations } from '../i18n/translations';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  streak: StreakState;
  isTodayCompleted: boolean;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  streak,
  isTodayCompleted,
  onOpenSettings,
}) => {
  const t = translations[currentLang];

  return (
    <header
      className="sticky top-0 z-30 backdrop-blur-md px-4 py-3 border-b"
      style={{
        backgroundColor: 'rgba(21, 24, 23, 0.92)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
        {/* Brand / Logo with user's sticker */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-10 h-10 rounded-xl overflow-hidden border shadow-lg flex items-center justify-center p-0.5"
            style={{
              background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%)',
              borderColor: 'var(--border-gold)',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4), 0 0 10px var(--accent-gold-glow)',
            }}
          >
            <img
              src="logo-sticker.png"
              alt="Logo Sticker"
              className="w-full h-full object-contain filter drop-shadow hover:scale-105 transition-transform"
              onError={(e) => {
                // Fallback if needed
                (e.currentTarget as HTMLImageElement).src = '/logo-sticker.png';
              }}
            />
          </div>
          <div>
            <h1
              className="text-base sm:text-lg font-extrabold tracking-tight text-white flex items-center gap-1.5"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span>{t.appTitle}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider" style={{ background: 'var(--accent-gold-subtle)', color: 'var(--accent-gold)', border: '1px solid var(--border-gold)' }}>
                Archive
              </span>
            </h1>
            <p className="hidden sm:block text-xs" style={{ color: 'var(--text-secondary)' }}>
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak indicator pill */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs sm:text-sm font-semibold transition-all"
            style={
              isTodayCompleted || streak.currentStreak > 0
                ? {
                    background: 'var(--accent-subtle)',
                    borderColor: 'var(--border-accent)',
                    color: 'var(--accent)',
                    boxShadow: '0 2px 10px var(--accent-glow)',
                  }
                : {
                    background: 'var(--bg-secondary)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-muted)',
                  }
            }
            title={isTodayCompleted ? t.streakActiveToday : t.streakAtRisk}
          >
            <Flame
              className="w-4 h-4"
              style={{
                fill: streak.currentStreak > 0 ? 'var(--accent)' : 'none',
                color: streak.currentStreak > 0 ? 'var(--accent)' : 'var(--text-muted)',
              }}
            />
            <span>{streak.currentStreak}</span>
            <span className="hidden md:inline font-normal text-xs opacity-80">
              {t.streakDaysLabel}
            </span>
          </div>

          {/* Language Selector */}
          <div
            className="relative flex items-center border rounded-xl p-0.5"
            style={{
              background: 'var(--bg-secondary)',
              borderColor: 'var(--border)',
            }}
          >
            <Globe className="w-3.5 h-3.5 text-white/40 ml-1.5 hidden xs:block" />
            <div className="flex items-center text-xs font-semibold">
              {(['en', 'hy', 'ru'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className="px-2 py-1 rounded-lg transition-all uppercase"
                  style={
                    currentLang === lang
                      ? {
                          background: 'var(--accent)',
                          color: '#ffffff',
                          boxShadow: '0 2px 8px var(--accent-glow)',
                        }
                      : {
                          color: 'var(--text-secondary)',
                        }
                  }
                  aria-label={`Switch to ${lang}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Settings & Tools Modal Button */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl border transition-colors hover:text-white"
            style={{
              background: 'var(--bg-secondary)',
              borderColor: 'var(--border)',
              color: 'var(--text-secondary)',
            }}
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
