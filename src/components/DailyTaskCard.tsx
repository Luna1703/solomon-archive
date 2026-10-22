import React, { useState, useEffect } from 'react';
import {
  Camera,
  CheckCircle2,
  Clock,
  Sparkles,
  Quote,
  Lightbulb,
  Tag,
  ExternalLink,
} from 'lucide-react';
import type { ArtifactItem, Language, TaskCategory, TaskDefinition } from '../types';
import { translations } from '../i18n/translations';
import { getEffectiveDate, getTimeUntilMidnight } from '../services/dailyTask';

interface DailyTaskCardProps {
  task: TaskDefinition;
  dateStr: string;
  isCompleted: boolean;
  todayArtifact?: ArtifactItem;
  lang: Language;
  onOpenUpload: () => void;
  onInspectArtifact: (artifact: ArtifactItem) => void;
}

const CATEGORY_COLORS: Record<TaskCategory, { bg: string; text: string; border: string }> = {
  artefact: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
  nature: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  time: { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/30' },
  light: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30' },
  knowledge: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/30' },
  everyday: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30' },
  food: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' },
  architecture: { bg: 'bg-stone-500/10', text: 'text-stone-300', border: 'border-stone-500/30' },
  transport: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  texture: { bg: 'bg-lime-500/10', text: 'text-lime-400', border: 'border-lime-500/30' },
  color: { bg: 'bg-fuchsia-500/10', text: 'text-fuchsia-400', border: 'border-fuchsia-500/30' },
  animals: { bg: 'bg-teal-500/10', text: 'text-teal-400', border: 'border-teal-500/30' },
  street: { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/30' },
  geometry: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
};

export const DailyTaskCard: React.FC<DailyTaskCardProps> = ({
  task,
  isCompleted,
  todayArtifact,
  lang,
  onOpenUpload,
  onInspectArtifact,
}) => {
  const t = translations[lang];
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const effective = getEffectiveDate();
      setTimeLeft(getTimeUntilMidnight(effective));
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const categoryStyle = CATEGORY_COLORS[task.category] || CATEGORY_COLORS.artefact;
  const categoryLabel = t.categories[task.category] || task.category;

  // Format date readable in active language
  const formattedDate = new Intl.DateTimeFormat(
    lang === 'hy' ? 'hy-AM' : lang === 'ru' ? 'ru-RU' : 'en-US',
    {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }
  ).format(getEffectiveDate());

  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-amber-900/40 p-5 sm:p-7 shadow-2xl">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top bar with category & countdown */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}
          >
            <Tag className="w-3 h-3" />
            {categoryLabel}
          </span>
          <span className="text-xs text-slate-400 capitalize">
            {formattedDate}
          </span>
        </div>

        {/* Midnight timer */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] font-mono text-slate-400">
          <Clock className="w-3.5 h-3.5 text-amber-500/80" />
          <span>{t.timeLeftToday}</span>
          <span className="text-amber-300 font-bold">
            {String(timeLeft.hours).padStart(2, '0')}:
            {String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Title & Description */}
      <div className="space-y-3 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-100 leading-snug">
          {task.title[lang]}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          {task.description[lang]}
        </p>
      </div>

      {/* Solomon's Whisper hint */}
      <div className="rounded-2xl bg-amber-950/20 border border-amber-800/30 p-4 mb-4">
        <div className="flex items-start gap-2.5">
          <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-0.5">
              {t.hintLabel}
            </span>
            <p className="text-xs sm:text-sm text-amber-200/80 italic">
              {task.hint[lang]}
            </p>
          </div>
        </div>
      </div>

      {/* Wisdom Quote */}
      <div className="rounded-2xl bg-slate-950/60 border border-slate-800/80 p-4 mb-6 relative">
        <Quote className="w-6 h-6 text-amber-500/20 absolute top-2 right-2" />
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">
          {t.quoteLabel}
        </span>
        <blockquote className="text-xs sm:text-sm text-slate-300 italic font-serif">
          {task.solomonQuote[lang]}
        </blockquote>
      </div>

      {/* State: Completed vs Uncompleted */}
      {isCompleted && todayArtifact ? (
        <div className="space-y-4">
          <div className="rounded-2xl bg-emerald-950/30 border border-emerald-500/40 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-emerald-300">
                  {t.questCompletedTitle}
                </h4>
                <p className="text-xs text-emerald-200/70">
                  {t.questCompletedDesc}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => onInspectArtifact(todayArtifact)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{t.viewRelic}</span>
              </button>
              <button
                onClick={onOpenUpload}
                className="flex items-center justify-center p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 text-xs transition-colors"
                title={lang === 'hy' ? 'Փոխարինել նկարը' : lang === 'ru' ? 'Переснять' : 'Retake'}
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mini preview card */}
          <div
            onClick={() => onInspectArtifact(todayArtifact)}
            className="cursor-pointer group relative rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/40 bg-slate-950 max-h-56 flex items-center justify-center transition-all"
          >
            <img
              src={todayArtifact.imageUrl}
              alt={todayArtifact.taskTitle[lang]}
              className="w-full h-56 object-cover group-hover:scale-102 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
              <span className="font-mono text-amber-300 font-bold">
                {t.relicNumber.replace('{num}', '001')}
              </span>
              <span className="text-slate-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {t.viewRelic}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={onOpenUpload}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2.5 active:scale-98 transition-all duration-150 group"
        >
          <Camera className="w-5 h-5 group-hover:rotate-6 transition-transform" />
          <span>{t.uploadPrompt}</span>
        </button>
      )}
    </div>
  );
};
