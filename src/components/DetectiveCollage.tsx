import React from 'react';

export const DetectiveCollage: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full max-w-[480px] h-[520px] select-none ${className}`}>
      {/* Tape for newspaper */}
      <div
        className="tape"
        style={{ top: '95px', left: '65px', transform: 'rotate(12deg)' }}
      />

      {/* Newspaper Clipping */}
      <div
        className="newspaper-clip absolute w-[200px] h-[180px] hover:z-30 transition-transform"
        style={{ top: '110px', left: '10px', transform: 'rotate(-6deg)', zIndex: 6 }}
      >
        <div className="h-[18px] bg-[#736458] rounded-[1px] mb-3 relative overflow-hidden">
          <span className="absolute left-1.5 top-0.5 text-[10px] font-bold text-[#F4EFEB] tracking-widest uppercase">
            THE CHRONICLE
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 relative">
          <div className="flex flex-col gap-1.5">
            <div className="h-[3px] bg-[#2C2825] opacity-80 rounded-xs w-full" />
            <div className="h-[3px] bg-[#2C2825] opacity-80 rounded-xs w-[85%]" />
            <div className="h-[3px] bg-[#2C2825] opacity-80 rounded-xs w-full" />
            <div className="h-[3px] bg-[#2C2825] opacity-80 rounded-xs w-[70%]" />
            <div className="h-[3px] bg-[#2C2825] opacity-80 rounded-xs w-full" />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="h-[3px] bg-[#2C2825] opacity-80 rounded-xs w-full" />
            <div className="h-[3px] bg-[#2C2825] opacity-80 rounded-xs w-[70%]" />
            <div className="h-[3px] bg-[#2C2825] opacity-80 rounded-xs w-full" />
            <div className="h-[3px] bg-[#2C2825] opacity-80 rounded-xs w-[85%]" />
          </div>
          {/* Red circled clue */}
          <div
            className="absolute border-[3.5px] border-[#B8252A] rounded-[50%] pointer-events-none"
            style={{ width: '74px', height: '34px', bottom: '8px', right: '-6px', transform: 'rotate(-8deg)' }}
          />
        </div>
      </div>

      {/* Tape for map */}
      <div
        className="tape"
        style={{ bottom: '15px', left: '140px', transform: 'rotate(-6deg)' }}
      />

      {/* Map Card */}
      <div
        className="map-card absolute w-[310px] h-[200px] hover:z-30 transition-transform"
        style={{ bottom: '20px', left: '30px', transform: 'rotate(2deg)', zIndex: 2 }}
      >
        <svg viewBox="0 0 320 200" className="w-full h-full rounded-[2px]" preserveAspectRatio="none">
          <rect x="0" y="0" width="320" height="200" fill="#E8D9C8" />
          <rect x="15" y="15" width="45" height="40" fill="#BAA692" rx="2" />
          <rect x="70" y="15" width="70" height="35" fill="#BAA692" rx="2" />
          <rect x="150" y="10" width="80" height="45" fill="#8E7E70" rx="2" />
          <rect x="240" y="15" width="65" height="55" fill="#BAA692" rx="2" />
          <rect x="180" y="65" width="50" height="40" fill="#6A5C52" rx="2" />
          <rect x="240" y="80" width="65" height="45" fill="#BAA692" rx="2" />
          <rect x="16" y="110" width="55" height="70" fill="#BAA692" rx="2" />
          <rect x="190" y="140" width="55" height="45" fill="#6A5C52" rx="2" />
          <rect x="255" y="135" width="50" height="50" fill="#BAA692" rx="2" />

          {/* White river */}
          <path
            d="M 120 0 C 130 50, 80 80, 95 120 C 105 145, 150 170, 190 200 L 155 200 C 120 175, 75 145, 65 110 C 50 70, 100 45, 95 0 Z"
            fill="#FDF8F2"
            opacity="0.95"
          />
          {/* Streets */}
          <line x1="0" y1="70" x2="120" y2="70" stroke="#FFFDF8" strokeWidth="7" strokeLinecap="round" />
          <line x1="90" y1="130" x2="320" y2="125" stroke="#FFFDF8" strokeWidth="7" strokeLinecap="round" />
          <line x1="235" y1="0" x2="235" y2="200" stroke="#FFFDF8" strokeWidth="6" strokeLinecap="round" />

          {/* Red markings */}
          <ellipse cx="65" cy="145" rx="16" ry="14" fill="none" stroke="#B8252A" strokeWidth="3.5" transform="rotate(-10 65 145)" />
          <ellipse cx="160" cy="115" rx="13" ry="12" fill="none" stroke="#B8252A" strokeWidth="3" transform="rotate(15 160 115)" />
          <ellipse cx="218" cy="110" rx="15" ry="13" fill="none" stroke="#B8252A" strokeWidth="3.5" />
          <line x1="210" y1="102" x2="226" y2="118" stroke="#B8252A" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="226" y1="102" x2="210" y2="118" stroke="#B8252A" strokeWidth="3.5" strokeLinecap="round" />
          <text x="238" y="165" fontFamily="'Permanent Marker', cursive" fontSize="22" fill="#B8252A" fontWeight="bold">?</text>
        </svg>
      </div>

      {/* Tape for top polaroid */}
      <div
        className="tape"
        style={{ top: '38px', left: '165px', transform: 'rotate(-18deg)' }}
      />

      {/* Polaroid 1 (Man with mustache) */}
      <div
        className="polaroid-card absolute w-[145px] hover:z-30 transition-transform"
        style={{ top: '50px', left: '135px', transform: 'rotate(-8deg)', zIndex: 8 }}
      >
        <div className="polaroid-photo">
          <svg viewBox="0 0 100 120" className="w-full h-full">
            <rect width="100" height="120" fill="#B8252A" />
            <path d="M 15 120 C 15 95, 85 95, 85 120 Z" fill="#D39F7F" />
            <rect x="42" y="80" width="16" height="20" fill="#C58E6F" />
            <ellipse cx="50" cy="62" rx="20" ry="24" fill="#E2AC8D" />
            <path d="M 28 55 C 24 35, 45 25, 60 25 C 75 25, 78 40, 74 60 C 70 42, 60 38, 50 38 C 40 38, 30 45, 28 55 Z" fill="#2C2825" />
            <path d="M 28 42 C 22 40, 18 48, 22 58 C 26 50, 30 45, 28 42 Z" fill="#2C2825" />
            <path d="M 50 72 C 45 68, 36 68, 34 74 C 40 76, 47 75, 50 74 C 53 75, 60 76, 66 74 C 64 68, 55 68, 50 72 Z" fill="#2C2825" />
          </svg>
        </div>
        <div className="polaroid-caption">Suspect "M"</div>
      </div>

      {/* Spiral Notebook */}
      <div
        className="note-card absolute w-[175px] h-[245px] hover:z-30 transition-transform"
        style={{ top: '15px', right: '50px', transform: 'rotate(11deg)', zIndex: 10 }}
      >
        <div className="note-spirals">
          <span className="spiral-ring" />
          <span className="spiral-ring" />
          <span className="spiral-ring" />
          <span className="spiral-ring" />
          <span className="spiral-ring" />
          <span className="spiral-ring" />
          <span className="spiral-ring" />
        </div>
        <div className="note-content">
          <div className="note-line full" />
          <div className="note-line full crossed" />
          <div className="note-line med" />
          <div className="note-line full crossed" />
          <div className="note-line short" />
          <div className="note-line full" />
          <div className="note-line full crossed" />
          <div className="note-line med" />
        </div>
      </div>

      {/* Detective Pen */}
      <div
        className="absolute w-[14px] h-[170px] rounded-[7px_7px_2px_2px] bg-gradient-to-r from-[#1C1917] via-[#3F3935] to-[#1C1917] shadow-lg pointer-events-none"
        style={{ top: '80px', right: '22px', transform: 'rotate(14deg)', zIndex: 24 }}
      >
        <div className="absolute top-[20px] left-[-4px] w-[5px] h-[48px] bg-[#A8A29E] rounded-[2px_0_0_2px]" />
      </div>

      {/* Tape for bottom right polaroid */}
      <div
        className="tape"
        style={{ bottom: '210px', right: '55px', transform: 'rotate(22deg)' }}
      />

      {/* Polaroid 2 (Woman) */}
      <div
        className="polaroid-card absolute w-[138px] hover:z-30 transition-transform"
        style={{ bottom: '70px', right: '30px', transform: 'rotate(5deg)', zIndex: 16 }}
      >
        <div className="polaroid-photo">
          <svg viewBox="0 0 100 120" className="w-full h-full">
            <rect width="100" height="120" fill="#B8252A" />
            <path d="M 18 120 C 18 96, 82 96, 82 120 Z" fill="#D39F7F" />
            <rect x="44" y="82" width="12" height="18" fill="#C58E6F" />
            <ellipse cx="50" cy="62" rx="18" ry="22" fill="#E2AC8D" />
            <path d="M 28 65 C 26 40, 40 28, 50 28 C 60 28, 74 40, 72 65 C 76 75, 78 86, 72 90 C 68 85, 68 70, 68 62 C 60 48, 40 48, 32 62 C 32 70, 32 85, 28 90 C 22 86, 24 75, 28 65 Z" fill="#2C2825" />
          </svg>
        </div>
        <div className="polaroid-caption">Witness "K"</div>
      </div>

      {/* Handwritten "HOW?!" Cutout Note */}
      <div
        className="marker-note absolute hover:z-30 transition-transform"
        style={{ top: '205px', left: '175px', transform: 'rotate(-3deg)', zIndex: 22 }}
      >
        <div className="marker-text">HOW?!</div>
      </div>
    </div>
  );
};
