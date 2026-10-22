import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, Sparkles, X } from 'lucide-react';
import type { Achievement, Language } from '../types';

interface UnlockedAchievementToastProps {
  achievement: Achievement | null;
  lang: Language;
  onDismiss: () => void;
}

export const UnlockedAchievementToast: React.FC<UnlockedAchievementToastProps> = ({
  achievement,
  lang,
  onDismiss,
}) => {
  useEffect(() => {
    if (achievement) {
      // Fire confetti burst!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e0245b', '#c01d4e', '#ffffff', '#ff4d7d', '#ffa3be'],
      });
    }
  }, [achievement]);

  if (!achievement) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in zoom-in-95 duration-300"
      style={{ background: 'rgba(15, 13, 14, 0.88)' }}
    >
      <div
        className="relative w-full max-w-sm border-2 rounded-3xl p-6 text-center shadow-2xl"
        style={{
          background: 'var(--bg-card)',
          borderColor: 'var(--border-accent)',
          boxShadow: '0 16px 48px var(--accent-glow)',
        }}
      >
        <button
          onClick={onDismiss}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-white/50 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Trophy Glow */}
        <div
          className="mx-auto w-20 h-20 rounded-3xl flex items-center justify-center text-white shadow-xl mb-4 animate-bounce"
          style={{
            background: 'var(--accent)',
            boxShadow: '0 8px 24px var(--accent-glow)',
          }}
        >
          <Award className="w-10 h-10" />
        </div>

        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-widest mb-2"
          style={{
            background: 'var(--accent-subtle)',
            borderColor: 'var(--border-accent)',
            color: 'var(--accent)',
          }}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>
            {lang === 'hy'
              ? 'Նոր Նվաճում'
              : lang === 'ru'
              ? 'Новое Достижение!'
              : 'Achievement Unlocked!'}
          </span>
        </div>

        <h3
          className="text-xl font-extrabold text-white mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {achievement.title[lang]}
        </h3>

        <p className="text-xs sm:text-sm text-white/70 mb-6 leading-relaxed">
          {achievement.description[lang]}
        </p>

        <button
          onClick={onDismiss}
          className="w-full py-3 px-4 rounded-xl text-white font-extrabold text-sm shadow-md transition-all active:scale-98"
          style={{
            background: 'var(--accent)',
            boxShadow: '0 4px 14px var(--accent-glow)',
            fontFamily: 'var(--font-display)',
          }}
        >
          {lang === 'hy' ? 'Հիանալի է' : lang === 'ru' ? 'Превосходно!' : 'Claim Honor'}
        </button>
      </div>
    </div>
  );
};
