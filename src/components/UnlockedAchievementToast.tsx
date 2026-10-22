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
        colors: ['#f59e0b', '#d97706', '#fbbf24', '#fef08a', '#10b981'],
      });
    }
  }, [achievement]);

  if (!achievement) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in zoom-in-95 duration-300">
      <div className="relative w-full max-w-sm bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500 rounded-3xl p-6 text-center shadow-2xl shadow-amber-500/20">
        <button
          onClick={onDismiss}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Trophy Glow */}
        <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 shadow-xl shadow-amber-500/40 mb-4 animate-bounce">
          <Award className="w-10 h-10" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>
            {lang === 'hy'
              ? 'Նոր Նվաճում'
              : lang === 'ru'
              ? 'Новое Достижение!'
              : 'Achievement Unlocked!'}
          </span>
        </div>

        <h3 className="text-xl font-extrabold text-slate-100 mb-2">
          {achievement.title[lang]}
        </h3>

        <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
          {achievement.description[lang]}
        </p>

        <button
          onClick={onDismiss}
          className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-md transition-colors"
        >
          {lang === 'hy' ? 'Հիանալի է' : lang === 'ru' ? 'Превосходно!' : 'Claim Honor'}
        </button>
      </div>
    </div>
  );
};
