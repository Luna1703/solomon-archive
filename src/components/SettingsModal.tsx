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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 backdrop-blur-md animate-in fade-in duration-200"
      style={{ background: 'rgba(15, 13, 14, 0.88)' }}
    >
      <div
        className="relative w-full max-w-lg border rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden"
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
          <h3 className="text-base font-bold text-white">
            {t.settingsTitle}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/50 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="overflow-y-auto p-5 space-y-6">
          {/* Language Selector */}
          <div className="space-y-2.5">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
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
                  className="p-3 rounded-2xl border text-center transition-all"
                  style={
                    currentLang === langItem.code
                      ? {
                          background: 'var(--accent)',
                          borderColor: 'var(--border-accent)',
                          color: '#ffffff',
                          boxShadow: '0 2px 10px var(--accent-glow)',
                        }
                      : {
                          background: 'var(--bg-primary)',
                          borderColor: 'var(--border)',
                          color: 'var(--text-secondary)',
                        }
                  }
                >
                  <div className="text-sm font-bold">{langItem.label}</div>
                  <div className="text-[11px] opacity-80 mt-0.5">{langItem.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Tester Simulation Sanctum */}
          <div
            className="rounded-2xl border p-4 space-y-3"
            style={{
              background: 'var(--bg-primary)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                <FlaskConical className="w-4 h-4" />
                <span>{t.testToolsTitle}</span>
              </div>
              <span
                className="text-[10px] font-mono px-2 py-0.5 rounded border"
                style={{
                  background: 'var(--accent-subtle)',
                  borderColor: 'var(--border-accent)',
                  color: 'var(--accent)',
                }}
              >
                {effectiveDateKey} {simulatedOffset !== 0 ? `(+${simulatedOffset}d)` : ''}
              </span>
            </div>
            <p className="text-xs text-white/60">
              {t.testToolsDesc}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={handleAdvanceDay}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors border"
                style={{
                  background: 'var(--accent-subtle)',
                  borderColor: 'var(--border-accent)',
                  color: 'var(--accent)',
                }}
              >
                <FastForward className="w-3.5 h-3.5" />
                <span>{t.simulateTomorrow}</span>
              </button>
              {simulatedOffset !== 0 && (
                <button
                  type="button"
                  onClick={handleResetSimulatedDate}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-colors"
                  style={{
                    background: 'var(--bg-secondary)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.simulateResetDate}</span>
                </button>
              )}
            </div>
          </div>

          {/* Local Storage & Backup */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/50">
              <Database className="w-4 h-4" style={{ color: 'var(--accent)' }} />
              <span>{t.storageInfoTitle}</span>
            </label>
            <div
              className="rounded-2xl border p-3.5 text-xs space-y-2 text-white/70"
              style={{
                background: 'var(--bg-primary)',
                borderColor: 'var(--border)',
              }}
            >
              <p>{t.storageInfoDesc}</p>
              <div
                className="flex items-center justify-between pt-1 border-t font-mono text-[11px]"
                style={{ borderColor: 'var(--border)' }}
              >
                <span>{t.totalCollected}:</span>
                <span className="font-bold" style={{ color: 'var(--accent)' }}>{artifactCount}</span>
              </div>
            </div>

            {/* Backup buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleExportBackup}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-colors hover:text-white"
                style={{
                  background: 'var(--bg-secondary)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-secondary)',
                }}
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.exportBackup}</span>
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-colors hover:text-white"
                style={{
                  background: 'var(--bg-secondary)',
                  borderColor: 'var(--border)',
                  color: 'var(--text-secondary)',
                }}
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
          <div
            className="rounded-2xl border p-4 space-y-2"
            style={{
              background: 'var(--bg-primary)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="flex items-center gap-2 text-xs font-bold text-white/50">
              <Info className="w-4 h-4" style={{ color: 'var(--accent)' }} />
              <span>{t.aboutTitle}</span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              {t.aboutText}
            </p>
            <div
              className="pt-2 border-t flex items-center justify-between text-xs"
              style={{ borderColor: 'var(--border)' }}
            >
              <span className="text-white/40">Creator / Instagram:</span>
              <a
                href="https://www.instagram.com/tkhanoyan"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                @tkhanoyan
              </a>
            </div>
            <div className="text-[10px] text-white/30 font-mono pt-1">
              {t.version}
            </div>
          </div>

          {/* Danger zone */}
          <div className="pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
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
        <div
          className="px-5 py-3 border-t flex justify-end"
          style={{
            background: 'var(--bg-primary)',
            borderColor: 'var(--border)',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-white text-xs font-bold transition-all"
            style={{
              background: 'var(--accent)',
              boxShadow: '0 2px 8px var(--accent-glow)',
            }}
          >
            {t.saveClose}
          </button>
        </div>
      </div>
    </div>
  );
};
