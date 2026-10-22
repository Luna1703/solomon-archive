import React, { useState, useMemo } from 'react';
import { Search, Sparkles, SlidersHorizontal, Calendar, Compass, Download } from 'lucide-react';
import type { ArtifactItem, Language, TaskCategory } from '../types';
import { translations } from '../i18n/translations';

interface ArchiveGalleryProps {
  artifacts: ArtifactItem[];
  lang: Language;
  onSelectArtifact: (artifact: ArtifactItem, index: number) => void;
  onNavigateToQuest: () => void;
}

export const ArchiveGallery: React.FC<ArchiveGalleryProps> = ({
  artifacts,
  lang,
  onSelectArtifact,
  onNavigateToQuest,
}) => {
  const t = translations[lang];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');

  const categories: { id: TaskCategory | 'all'; label: string }[] = [
    { id: 'all', label: t.filterAll },
    { id: 'artefact', label: t.categories.artefact },
    { id: 'nature', label: t.categories.nature },
    { id: 'everyday', label: t.categories.everyday },
    { id: 'food', label: t.categories.food },
    { id: 'architecture', label: t.categories.architecture },
    { id: 'street', label: t.categories.street },
    { id: 'transport', label: t.categories.transport },
    { id: 'light', label: t.categories.light },
    { id: 'texture', label: t.categories.texture },
    { id: 'color', label: t.categories.color },
    { id: 'geometry', label: t.categories.geometry },
    { id: 'animals', label: t.categories.animals },
    { id: 'time', label: t.categories.time },
    { id: 'knowledge', label: t.categories.knowledge },
  ];

  const filteredArtifacts = useMemo(() => {
    let result = [...artifacts];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((a) => a.taskCategory === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.taskTitle[lang].toLowerCase().includes(q) ||
          (a.note && a.note.toLowerCase().includes(q))
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'newest') return b.timestamp - a.timestamp;
      return a.timestamp - b.timestamp;
    });

    return result;
  }, [artifacts, selectedCategory, searchQuery, sortBy, lang]);

  return (
    <div className="space-y-6">
      {/* Header & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2
            className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <Compass className="w-6 h-6" style={{ color: 'var(--accent)' }} />
            <span>{t.archiveTitle}</span>
          </h2>
          <p className="text-xs sm:text-sm text-white/50">
            {t.archiveSubtitle.replace('{count}', String(artifacts.length))}
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <SlidersHorizontal className="w-4 h-4 text-white/40" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
            className="border rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none transition-colors"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--border)',
            }}
          >
            <option value="newest" style={{ background: 'var(--bg-card)' }}>{t.sortByNewest}</option>
            <option value="oldest" style={{ background: 'var(--bg-card)' }}>{t.sortByOldest}</option>
          </select>
        </div>
      </div>

      {/* Search & Category Pills */}
      <div className="space-y-3">
        {/* Search bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full border rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-white/30 focus:outline-none transition-colors"
            style={{
              background: 'var(--bg-card)',
              borderColor: 'var(--border)',
            }}
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all border"
              style={
                selectedCategory === cat.id
                  ? {
                      background: 'var(--accent)',
                      borderColor: 'var(--border-accent)',
                      color: '#ffffff',
                      boxShadow: '0 2px 8px var(--accent-glow)',
                    }
                  : {
                      background: 'var(--bg-card)',
                      borderColor: 'var(--border)',
                      color: 'var(--text-secondary)',
                    }
              }
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid or Empty State */}
      {filteredArtifacts.length === 0 ? (
        <div
          className="rounded-3xl border border-dashed p-8 sm:p-12 text-center flex flex-col items-center justify-center"
          style={{
            background: 'var(--bg-card)',
            borderColor: 'var(--border)',
          }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border"
            style={{
              background: 'var(--accent-subtle)',
              borderColor: 'var(--border-accent)',
              color: 'var(--accent)',
            }}
          >
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white mb-1">
            {t.emptyArchiveTitle}
          </h3>
          <p className="text-xs sm:text-sm text-white/50 max-w-sm mb-5">
            {t.emptyArchiveDesc}
          </p>
          <button
            onClick={onNavigateToQuest}
            className="px-5 py-2.5 rounded-xl text-white font-bold text-xs sm:text-sm transition-all"
            style={{
              background: 'var(--accent)',
              boxShadow: '0 4px 14px var(--accent-glow)',
            }}
          >
            {t.navDaily}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredArtifacts.map((art, idx) => {
            const relicIndex = artifacts.length - idx;
            const relicNumStr = String(relicIndex).padStart(3, '0');
            const dateStr = new Intl.DateTimeFormat(
              lang === 'hy' ? 'hy-AM' : lang === 'ru' ? 'ru-RU' : 'en-US',
              { month: 'short', day: 'numeric' }
            ).format(new Date(art.timestamp));

            return (
              <div
                key={art.id}
                onClick={() => onSelectArtifact(art, relicIndex)}
                className="group relative cursor-pointer rounded-2xl overflow-hidden border shadow-md hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
                style={{
                  background: 'var(--bg-card)',
                  borderColor: 'var(--border)',
                }}
              >
                {/* Photo frame */}
                <div className="aspect-square w-full overflow-hidden relative" style={{ background: 'var(--bg-primary)' }}>
                  <img
                    src={art.imageUrl}
                    alt={art.taskTitle[lang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Relic # badge */}
                  <div
                    className="absolute top-2 left-2 px-2 py-0.5 rounded-md backdrop-blur-sm border text-[10px] font-mono font-bold"
                    style={{
                      background: 'rgba(21, 24, 23, 0.88)',
                      borderColor: 'var(--border)',
                      color: 'var(--accent-gold)',
                    }}
                  >
                    #{relicNumStr}
                  </div>

                  {/* Quick download button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const link = document.createElement('a');
                      link.href = art.imageUrl;
                      const cleanTitle = (art.taskTitle.en || 'photo').toLowerCase().replace(/[^a-z0-9]/g, '-');
                      link.download = `solomon-archive-${relicNumStr}-${cleanTitle}.jpg`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-lg border backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:scale-105"
                    style={{
                      background: 'rgba(21, 24, 23, 0.88)',
                      borderColor: 'var(--border-gold)',
                      color: 'var(--accent-gold)',
                    }}
                    title={t.downloadPhoto}
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Card footer details */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <h4 className="text-xs font-bold text-white line-clamp-2 mb-1 group-hover:text-[var(--accent)] transition-colors">
                    {art.taskTitle[lang]}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-white/50 mt-2">
                    <span className="capitalize">{t.categories[art.taskCategory] || art.taskCategory}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-white/40" />
                      {dateStr}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
