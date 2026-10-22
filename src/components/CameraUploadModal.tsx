import React, { useRef, useState } from 'react';
import { Camera, Upload, X, Check, Sparkles } from 'lucide-react';
import type { Language, TaskDefinition } from '../types';
import { translations } from '../i18n/translations';

interface CameraUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskDefinition;
  lang: Language;
  onSaveArtifact: (imageUrl: string, note: string) => Promise<void>;
}

export const CameraUploadModal: React.FC<CameraUploadModalProps> = ({
  isOpen,
  onClose,
  task,
  lang,
  onSaveArtifact,
}) => {
  const t = translations[lang];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Process selected file and resize if very large
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const img = new Image();
      img.onload = () => {
        // Resize image to max 1600px width/height to preserve memory & speed
        const maxDimension = 1600;
        let { width, height } = img;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setSelectedImage(compressedDataUrl);
        } else {
          setSelectedImage(loadEvent.target?.result as string);
        }
      };
      img.src = loadEvent.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!selectedImage || isSubmitting) return;
    try {
      setIsSubmitting(true);
      await onSaveArtifact(selectedImage, note);
      setSelectedImage(null);
      setNote('');
      onClose();
    } catch (err) {
      console.error('Error saving artifact:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-200"
      style={{ background: 'rgba(15, 13, 14, 0.88)' }}
    >
      <div
        className="relative w-full max-w-lg border rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        style={{
          background: 'var(--bg-card)',
          borderColor: 'var(--border)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{
            background: 'var(--bg-primary)',
            borderColor: 'var(--border)',
          }}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" style={{ color: 'var(--accent)' }} />
            <h3 className="text-base font-bold text-white">
              {t.uploadPrompt}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/50 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Target task recap */}
          <div
            className="border rounded-xl p-3 text-xs"
            style={{
              background: 'var(--bg-primary)',
              borderColor: 'var(--border)',
            }}
          >
            <span
              className="font-bold uppercase tracking-wider block mb-1"
              style={{ color: 'var(--accent)' }}
            >
              {t.questTitle}
            </span>
            <span className="text-white font-medium text-sm">
              {task.title[lang]}
            </span>
          </div>

          {/* Hidden inputs */}
          <input
            type="file"
            ref={cameraInputRef}
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Photo Preview / Picker Area */}
          {!selectedImage ? (
            <div className="space-y-3">
              <div
                onClick={() => cameraInputRef.current?.click()}
                className="cursor-pointer border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all group"
                style={{
                  background: 'var(--accent-subtle)',
                  borderColor: 'var(--border-accent)',
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-colors border"
                  style={{
                    background: 'var(--bg-primary)',
                    borderColor: 'var(--border-accent)',
                    color: 'var(--accent)',
                  }}
                >
                  <Camera className="w-7 h-7 group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-sm font-semibold text-white mb-1">
                  {t.cameraButton}
                </span>
                <span className="text-xs text-white/50">
                  {lang === 'hy'
                    ? 'Լուսանկարեք միանգամից հեռախոսի տեսախցիկով'
                    : lang === 'ru'
                    ? 'Снять прямо сейчас на камеру устройства'
                    : 'Use device camera to capture the relic'}
                </span>
              </div>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t" style={{ borderColor: 'var(--border)' }}></div>
                <span className="flex-shrink mx-3 text-[11px] text-white/40 uppercase tracking-widest">
                  {lang === 'hy' ? 'ԿԱՄ' : lang === 'ru' ? 'ИЛИ' : 'OR'}
                </span>
                <div className="flex-grow border-t" style={{ borderColor: 'var(--border)' }}></div>
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium border transition-colors hover:text-white"
                style={{
                  background: 'var(--bg-secondary)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-secondary)',
                }}
              >
                <Upload className="w-4 h-4 text-white/50" />
                <span>{t.fileButton}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div
                className="relative rounded-xl overflow-hidden border aspect-video max-h-64 flex items-center justify-center group"
                style={{
                  background: 'var(--bg-primary)',
                  borderColor: 'var(--border-accent)',
                }}
              >
                <img
                  src={selectedImage}
                  alt="Selected artifact preview"
                  className="w-full h-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 p-1.5 rounded-lg border text-white transition-colors"
                  style={{
                    background: 'rgba(15, 13, 14, 0.85)',
                    borderColor: 'var(--border)',
                  }}
                  title="Retake"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Note / Log field */}
              <div>
                <label className="block text-xs font-medium text-white/70 mb-1.5">
                  {t.captureNoteLabel}
                </label>
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={t.captureNotePlaceholder}
                  className="w-full rounded-xl border p-3 text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none resize-none transition-colors"
                  style={{
                    background: 'var(--bg-primary)',
                    borderColor: 'var(--border)',
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        {selectedImage && (
          <div
            className="p-4 border-t flex items-center justify-end gap-3"
            style={{
              background: 'var(--bg-primary)',
              borderColor: 'var(--border)',
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-white/60 hover:text-white transition-colors"
              disabled={isSubmitting}
            >
              {lang === 'hy' ? 'Փոխել նկարը' : lang === 'ru' ? 'Сменить фото' : 'Change photo'}
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-xs sm:text-sm shadow-lg active:scale-98 transition-all disabled:opacity-50"
              style={{
                background: 'var(--accent)',
                boxShadow: '0 4px 14px var(--accent-glow)',
              }}
            >
              <Check className="w-4 h-4" />
              <span>{isSubmitting ? t.submitting : t.confirmSubmission}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
