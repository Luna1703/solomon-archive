import React, { useState, useMemo } from 'react';
import { Search, Sparkles, SlidersHorizontal, Calendar, Compass } from 'lucide-react';
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
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Compass className="w-6 h-6 text-amber-400" />
            <span>{t.archiveTitle}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            {t.archiveSubtitle.replace('{count}', String(artifacts.length))}
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <SlidersHorizontal className="w-4 h-4 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest')}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500/50"
          >
            <option value="newest">{t.sortByNewest}</option>
            <option value="oldest">{t.sortByOldest}</option>
          </select>
        </div>
      </div>

      {/* Search & Category Pills */}
      <div className="space-y-3">
        {/* Search bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full bg-slate-900/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/60 transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid or Empty State */}
      {filteredArtifacts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-900/30 p-8 sm:p-12 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-200 mb-1">
            {t.emptyArchiveTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-sm mb-5">
            {t.emptyArchiveDesc}
          </p>
          <button
            onClick={onNavigateToQuest}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors"
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
                className="group relative cursor-pointer rounded-2xl overflow-hidden border border-slate-800/90 hover:border-amber-500/50 bg-slate-900 shadow-md hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 flex flex-col"
              >
                {/* Photo frame */}
                <div className="aspect-square w-full bg-slate-950 overflow-hidden relative">
                  <img
                    src={art.imageUrl}
                    alt={art.taskTitle[lang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Relic # badge */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-sm border border-slate-800 text-[10px] font-mono font-bold text-amber-300">
                    #{relicNumStr}
                  </div>
                </div>

                {/* Card footer details */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <h4 className="text-xs font-bold text-slate-200 line-clamp-2 mb-1 group-hover:text-amber-300 transition-colors">
                    {art.taskTitle[lang]}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                    <span className="capitalize">{t.categories[art.taskCategory] || art.taskCategory}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
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
