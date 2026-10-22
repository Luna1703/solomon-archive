import React from 'react';
import { Compass, Sparkles, Award } from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../i18n/translations';

export type ActiveTab = 'quest' | 'archive' | 'achievements';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  lang: Language;
  artifactCount: number;
  unlockedAchievementCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  lang,
  artifactCount,
  unlockedAchievementCount,
}) => {
  const t = translations[lang];

  const items: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'quest',
      label: t.navDaily,
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      id: 'archive',
      label: t.navArchive,
      icon: <Compass className="w-5 h-5" />,
      badge: artifactCount > 0 ? artifactCount : undefined,
    },
    {
      id: 'achievements',
      label: t.navAchievements,
      icon: <Award className="w-5 h-5" />,
      badge: unlockedAchievementCount > 0 ? unlockedAchievementCount : undefined,
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-20 backdrop-blur-lg border-t px-2 py-1.5 sm:py-2"
      style={{
        backgroundColor: 'rgba(15, 13, 14, 0.92)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className="relative flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all duration-200"
              style={
                isActive
                  ? {
                      color: 'var(--accent)',
                      background: 'var(--accent-subtle)',
                      fontWeight: 600,
                    }
                  : {
                      color: 'var(--text-secondary)',
                    }
              }
            >
              <div className="relative">
                {item.icon}
                {item.badge !== undefined && (
                  <span
                    className="absolute -top-1.5 -right-3 px-1.5 py-0.2 min-w-4 text-[10px] font-bold rounded-full flex items-center justify-center text-white"
                    style={{
                      background: 'var(--accent)',
                      boxShadow: '0 2px 6px var(--accent-glow)',
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] sm:text-xs mt-1 truncate max-w-full">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
