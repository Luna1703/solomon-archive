import React from 'react';
import { Star } from 'lucide-react';
import type { Language } from '../types';

interface TapeBandsProps {
  lang?: Language;
}

const ITEMS_MAP: Record<string, string[]> = {
  ru: [
    'АРХИВ СОЛОМОНА',
    'ФОТОКОЛЛЕКЦИЯ',
    'ЕЖЕДНЕВНЫЙ КВЕСТ',
    'СТРИК ДНЕЙ',
    'АРТЕФАКТЫ',
    'ВИНТАЖНЫЙ ВАЙБ',
    'ИСТОРИЯ В КАДРЕ',
    'ДОСТИЖЕНИЯ',
  ],
  hy: [
    'ՍՈՂՈՄՈՆԻ ԱՐԽԻՎ',
    'ԼՈՒՍԱՆԿԱՐՆԵՐ',
    'ՕՐՎԱ ԱՌԱՋԱԴՐԱՆՔ',
    'ՕՐԵՐԻ ՇԱՐՔ',
    'ԱՐՏԵՖԱԿՏՆԵՐ',
    'ՊԱՏՄՈՒԹՅՈՒՆ',
    'ՀԱՎԱՔԱԾՈՒ',
  ],
  en: [
    'SOLOMON ARCHIVE',
    'PHOTO COLLECTION',
    'DAILY QUEST',
    'DAY STREAK',
    'ARTIFACTS',
    'COZY VINTAGE',
    'CAPTURE THE MOMENT',
    'ACHIEVEMENTS',
  ],
};

export const TapeBands: React.FC<TapeBandsProps> = ({ lang = 'ru' }) => {
  const items = ITEMS_MAP[lang] || ITEMS_MAP.en;
  // Duplicate for seamless infinite loop
  const repeated = [...items, ...items, ...items, ...items];
  const reversed = [...repeated].reverse();

  return (
    <div className="tape-bands-container" aria-hidden="true">
      {/* Band 1 - Mustard / Olive Gold with dark text, slight angle */}
      <div className="tape-band tape-band--gold">
        <div className="tape-band__track tape-band__track--reverse">
          {repeated.map((word, idx) => (
            <span key={`gold-${idx}`} className="tape-band__item">
              <span>{word}</span>
              <Star className="tape-band__star fill-current" />
            </span>
          ))}
        </div>
      </div>

      {/* Band 2 - Crimson / Raspberry Red with light text, opposite angle */}
      <div className="tape-band tape-band--crimson">
        <div className="tape-band__track">
          {reversed.map((word, idx) => (
            <span key={`crimson-${idx}`} className="tape-band__item">
              <span>{word}</span>
              <Star className="tape-band__star fill-current" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
