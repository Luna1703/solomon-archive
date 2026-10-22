import React from 'react';
import { X, Calendar, Tag, Trash2, Quote, Sparkles, Download } from 'lucide-react';
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

  const handleDownload = () => {
    try {
      const link = document.createElement('a');
      link.href = artifact.imageUrl;
      // Friendly filename
      const cleanTitle = (artifact.taskTitle.en || 'photo')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-');
      link.download = `solomon-archive-${relicNumStr}-${cleanTitle}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error('Download failed', e);
      window.open(artifact.imageUrl, '_blank');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 backdrop-blur-md animate-in fade-in duration-200"
      style={{ background: 'rgba(15, 13, 14, 0.88)' }}
    >
      <div
        className="relative w-full max-w-2xl border rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
        style={{
          background: 'var(--bg-card)',
          borderColor: 'var(--border)',
        }}
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-5 py-3.5 border-b"
          style={{
            background: 'var(--bg-primary)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            <span
              className="font-mono text-xs sm:text-sm font-bold tracking-wider"
              style={{ color: 'var(--accent)' }}
            >
              {t.relicNumber.replace('{num}', relicNumStr)}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/50 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Main Photo Frame */}
          <div
            className="relative rounded-2xl overflow-hidden border flex items-center justify-center max-h-[50vh]"
            style={{
              background: 'var(--bg-primary)',
              borderColor: 'var(--border)',
            }}
          >
            <img
              src={artifact.imageUrl}
              alt={artifact.taskTitle[lang]}
              className="w-full h-auto max-h-[50vh] object-contain"
            />
          </div>

          {/* Details header */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border font-semibold"
                style={{
                  background: 'var(--accent-subtle)',
                  borderColor: 'var(--border-accent)',
                  color: 'var(--accent)',
                }}
              >
                <Tag className="w-3 h-3" />
                {t.categories[artifact.taskCategory] || artifact.taskCategory}
              </span>
              <span className="inline-flex items-center gap-1 text-white/50">
                <Calendar className="w-3.5 h-3.5" />
                {formattedDate}
              </span>
            </div>
            <h3
              className="text-lg sm:text-xl font-bold text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {artifact.taskTitle[lang]}
            </h3>
          </div>

          {/* User note if present */}
          {artifact.note && (
            <div
              className="rounded-2xl border p-4 relative"
              style={{
                background: 'var(--bg-primary)',
                borderColor: 'var(--border)',
              }}
            >
              <Quote
                className="w-5 h-5 absolute top-2 right-2 pointer-events-none"
                style={{ color: 'var(--accent)', opacity: 0.15 }}
              />
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-1">
                {t.captureNoteLabel}
              </span>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed whitespace-pre-wrap">
                {artifact.note}
              </p>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div
          className="px-5 py-3 border-t flex flex-wrap items-center justify-between gap-2"
          style={{
            background: 'var(--bg-primary)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border"
              style={{
                background: 'var(--accent-gold-subtle)',
                borderColor: 'var(--border-gold)',
                color: 'var(--accent-gold)',
                boxShadow: '0 2px 8px var(--accent-gold-glow)',
              }}
              title={t.downloadPhoto}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.downloadPhoto}</span>
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 text-xs font-semibold transition-colors"
              title={t.deleteButton}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.deleteButton}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-white text-xs font-bold transition-all"
            style={{
              background: 'var(--accent)',
              boxShadow: '0 2px 8px var(--accent-glow)',
            }}
          >
            {t.closeModal}
          </button>
        </div>
      </div>
    </div>
  );
};
