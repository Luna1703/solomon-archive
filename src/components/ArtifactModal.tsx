import React from 'react';
import { X, Calendar, Tag, Trash2, Quote, Sparkles } from 'lucide-react';
import type { ArtifactItem, Language } from '../types';
import { translations } from '../i18n/translations';

interface ArtifactModalProps {
  artifact: ArtifactItem | null;
  onClose: () => void;
  lang: Language;
  onDelete: (id: string) => Promise<void>;
  indexNumber: number;
}

export const ArtifactModal: React.FC<ArtifactModalProps> = ({
  artifact,
  onClose,
  lang,
  onDelete,
  indexNumber,
}) => {
  const t = translations[lang];

  if (!artifact) return null;

  const formattedDate = new Intl.DateTimeFormat(
    lang === 'hy' ? 'hy-AM' : lang === 'ru' ? 'ru-RU' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
  ).format(new Date(artifact.timestamp));

  const handleDelete = async () => {
    if (window.confirm(t.deleteConfirm)) {
      await onDelete(artifact.id);
      onClose();
    }
  };

  const relicNumStr = String(indexNumber).padStart(3, '0');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-900/40 rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="font-mono text-xs sm:text-sm font-bold text-amber-400 tracking-wider">
              {t.relicNumber.replace('{num}', relicNumStr)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Main Photo Frame */}
          <div className="relative rounded-2xl overflow-hidden border border-amber-900/40 bg-slate-950 flex items-center justify-center max-h-[50vh]">
            <img
              src={artifact.imageUrl}
              alt={artifact.taskTitle[lang]}
              className="w-full h-auto max-h-[50vh] object-contain"
            />
          </div>

          {/* Details header */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-medium">
                <Tag className="w-3 h-3" />
                {t.categories[artifact.taskCategory] || artifact.taskCategory}
              </span>
              <span className="inline-flex items-center gap-1 text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                {formattedDate}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-100">
              {artifact.taskTitle[lang]}
            </h3>
          </div>

          {/* User note if present */}
          {artifact.note && (
            <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-4 relative">
              <Quote className="w-5 h-5 text-amber-500/20 absolute top-2 right-2" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">
                {t.captureNoteLabel}
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                {artifact.note}
              </p>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 text-xs font-semibold transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t.deleteButton}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            {t.closeModal}
          </button>
        </div>
      </div>
    </div>
  );
};
