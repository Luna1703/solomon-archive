import React, { useRef, useState } from 'react';
import {
  X,
  Globe,
  Database,
  FastForward,
  RotateCcw,
  Trash2,
  Download,
  Upload,
  Info,
  CheckCircle,
  FlaskConical,
} from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../i18n/translations';
import { StorageService } from '../services/storage';
import { getEffectiveDate, formatDateKey } from '../services/dailyTask';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  artifactCount: number;
  onDataReset: () => Promise<void>;
  onDateShiftChanged: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onLanguageChange,
  artifactCount,
  onDataReset,
  onDateShiftChanged,
}) => {
  const t = translations[currentLang];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const [simulatedOffset, setSimulatedOffset] = useState<number>(() =>
    StorageService.getSimulatedDayOffset()
  );

  if (!isOpen) return null;

  const effectiveDate = getEffectiveDate();
  const effectiveDateKey = formatDateKey(effectiveDate);

  // Advance simulation day
  const handleAdvanceDay = () => {
    const nextOffset = simulatedOffset + 1;
    StorageService.setSimulatedDayOffset(nextOffset);
    setSimulatedOffset(nextOffset);
    onDateShiftChanged();
  };

  // Reset simulation to real date
  const handleResetSimulatedDate = () => {
    StorageService.setSimulatedDayOffset(0);
    setSimulatedOffset(0);
    onDateShiftChanged();
  };

  // Export full archive backup
  const handleExportBackup = async () => {
    const jsonStr = await StorageService.exportFullBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `solomons-archive-backup-${effectiveDateKey}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import backup
  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const content = evt.target?.result as string;
      const success = await StorageService.importFullBackup(content);
      if (success) {
        setImportSuccess(true);
        setTimeout(() => {
          setImportSuccess(false);
          window.location.reload();
        }, 1200);
      } else {
        alert('Invalid backup file format');
      }
    };
    reader.readAsText(file);
  };

  const handleResetAll = async () => {
    if (window.confirm(t.resetDataConfirm)) {
      await onDataReset();
      setSimulatedOffset(0);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-amber-900/40 rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/40">
          <h3 className="text-base font-bold text-slate-100">
            {t.settingsTitle}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="overflow-y-auto p-5 space-y-6">
          {/* Language Selector */}
          <div className="space-y-2.5">
            <label className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Globe className="w-4 h-4" />
              <span>{t.languageLabel}</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { code: 'ru', name: 'Русский', label: 'RU' },
                { code: 'hy', name: 'Հայերեն', label: 'HY' },
                { code: 'en', name: 'English', label: 'EN' },
              ].map((langItem) => (
                <button
                  key={langItem.code}
                  type="button"
                  onClick={() => onLanguageChange(langItem.code as Language)}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    currentLang === langItem.code
                      ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold shadow-md shadow-amber-500/10 ring-1 ring-amber-500/40'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="text-sm font-bold">{langItem.label}</div>
                  <div className="text-[11px] opacity-80 mt-0.5">{langItem.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Detective Dossier Section */}
          <div className="rounded-2xl bg-gradient-to-br from-[#B8252A]/15 to-slate-950/80 border border-[#B8252A]/40 p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#B8252A] uppercase tracking-wider flex items-center gap-1.5">
                <span>🕵️</span>
                <span>Detective Dossier / Mystery Collage</span>
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Визуальный концепт расследования с наложенными уликами, записками и картами.
            </p>
            <div className="pt-1">
              <a
                href="preview-detective-dossier.html"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#B8252A] hover:bg-[#981b20] text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <span>Открыть Dossier Preview (HTML) &rarr;</span>
              </a>
            </div>
          </div>

          {/* Tester Simulation Sanctum (Allows testing multi-day streaks) */}
          <div className="rounded-2xl bg-gradient-to-br from-amber-950/20 to-slate-950/80 border border-amber-500/30 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <FlaskConical className="w-4 h-4" />
                <span>{t.testToolsTitle}</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                {effectiveDateKey} {simulatedOffset !== 0 ? `(+${simulatedOffset}d)` : ''}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              {t.testToolsDesc}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={handleAdvanceDay}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-colors"
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>{t.simulateTomorrow}</span>
              </button>
              {simulatedOffset !== 0 && (
                <button
                  type="button"
                  onClick={handleResetSimulatedDate}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.simulateResetDate}</span>
                </button>
              )}
            </div>
          </div>

          {/* Local Storage & Backup */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <Database className="w-4 h-4 text-amber-400" />
              <span>{t.storageInfoTitle}</span>
            </label>
            <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-3.5 text-xs text-slate-300 space-y-2">
              <p>{t.storageInfoDesc}</p>
              <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 font-mono text-[11px] text-amber-400">
                <span>{t.totalCollected}:</span>
                <span className="font-bold">{artifactCount}</span>
              </div>
            </div>

            {/* Backup buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleExportBackup}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.exportBackup}</span>
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{t.importBackup}</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept=".json"
                onChange={handleImportFile}
                className="hidden"
              />
            </div>
            {importSuccess && (
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs justify-center font-medium animate-pulse">
                <CheckCircle className="w-4 h-4" />
                <span>Import successful! Reloading...</span>
              </div>
            )}
          </div>

          {/* About & Version */}
          <div className="rounded-2xl bg-slate-950/40 border border-slate-800/60 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <Info className="w-4 h-4 text-amber-400" />
              <span>{t.aboutTitle}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.aboutText}
            </p>
            <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs">
              <span className="text-slate-400">Creator / Instagram:</span>
              <a
                href="https://www.instagram.com/tkhanoyan"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-amber-400 hover:text-amber-300 hover:underline"
              >
                @tkhanoyan
              </a>
            </div>
            <div className="text-[10px] text-slate-500 font-mono pt-1">
              {t.version}
            </div>
          </div>

          {/* Danger zone */}
          <div className="pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={handleResetAll}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 text-xs font-semibold transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>{t.resetData}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
          >
            {t.saveClose}
          </button>
        </div>
      </div>
    </div>
  );
};
