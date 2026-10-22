import React from 'react';
import { DetectiveCollage } from './DetectiveCollage';
import { X, ExternalLink } from 'lucide-react';

interface DetectiveDossierViewProps {
  onClose?: () => void;
  isModal?: boolean;
}

export const DetectiveDossierView: React.FC<DetectiveDossierViewProps> = ({
  onClose,
  isModal = false,
}) => {
  return (
    <div
      className={`w-full ${
        isModal
          ? 'fixed inset-0 z-50 bg-[#F7EBE0] overflow-y-auto'
          : 'rounded-3xl overflow-hidden'
      }`}
      style={{
        background: 'linear-gradient(135deg, #F7EBE0 0%, #FDF8F2 100%)',
        color: '#2C2825',
      }}
    >
      {/* Header bar */}
      <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between border-b border-[#2C2825]/10">
        <div className="flex flex-col text-xs text-[#6B635B]">
          <span className="font-bold uppercase tracking-widest text-[#B8252A] flex items-center gap-1.5 text-[11px] mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8252A]" />
            Confidential Investigation Div.
          </span>
          <div className="flex items-center gap-1.5 my-0.5">
            <span className="text-[#2C2825] font-medium">Instagram:</span>
            <a
              href="https://www.instagram.com/tkhanoyan"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#B8252A] hover:underline"
            >
              @tkhanoyan
            </a>
          </div>
          <span className="opacity-80">Dispatch: archive@solomon-dossier.org</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="preview-detective-dossier.html"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-[#B8252A] hover:underline"
          >
            <span>Open Standalone HTML</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          {isModal && onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#2C2825]/10 hover:bg-[#2C2825]/20 text-[#2C2825] transition-colors"
              title="Close Dossier"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-10 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left 60% */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-block px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#B8252A] bg-[#B8252A]/10 border-l-3 border-[#B8252A]">
            Docket #1926-SOLOMON &bull; Classification: Top Secret
          </div>

          <h1
            className="text-4xl sm:text-6xl font-extrabold uppercase leading-[0.95] tracking-tight"
            style={{ fontFamily: "'Anton', 'Oswald', sans-serif" }}
          >
            THE SHADOW<br />
            OF THE <span className="text-[#B8252A] underline decoration-[#B8252A]/40 decoration-4">ARCHIVE.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#6B635B] leading-relaxed max-w-xl">
            Pieces of evidence scattered across the city. Stolen artifacts, cryptic logs, and unanswered interrogations. Piece together the daily relics before the trail goes cold.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('detective-props-anchor');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-detective"
            >
              Inspect Evidence Board &rarr;
            </button>
            <div
              className="inline-flex items-center justify-center border-2 border-dashed border-[#B8252A] text-[#B8252A] px-4 py-2 font-bold uppercase tracking-widest text-xs rotate-[-4deg]"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              CONFIDENTIAL
            </div>
          </div>
        </div>

        {/* Right 40% Collage */}
        <div className="lg:col-span-5 flex justify-center">
          <DetectiveCollage />
        </div>
      </div>

      {/* Props Showcase */}
      <div id="detective-props-anchor" className="max-w-6xl mx-auto px-6 py-12 border-t border-[#2C2825]/10">
        <div className="flex items-center gap-4 mb-8">
          <h2
            className="text-2xl font-bold uppercase tracking-wider text-[#B8252A]"
            style={{ fontFamily: "'Anton', 'Oswald', sans-serif" }}
          >
            Evidence Props & UI Components
          </h2>
          <div className="flex-1 h-0.5 bg-gradient-to-r from-[#B8252A]/40 to-transparent" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. Polaroid Card */}
          <div className="p-6 rounded-2xl border border-dashed border-[#2C2825]/20 bg-white/40 flex flex-col items-center justify-center min-h-[300px] relative">
            <div className="polaroid-card w-[150px] rotate-[-2deg]">
              <div className="polaroid-photo">
                <svg viewBox="0 0 100 120" className="w-full h-full">
                  <rect width="100" height="120" fill="#B8252A" />
                  <path d="M 15 120 C 15 95, 85 95, 85 120 Z" fill="#D39F7F" />
                  <rect x="42" y="80" width="16" height="20" fill="#C58E6F" />
                  <ellipse cx="50" cy="62" rx="20" ry="24" fill="#E2AC8D" />
                  <path d="M 28 55 C 24 35, 45 25, 60 25 C 75 25, 78 40, 74 60 C 70 42, 60 38, 50 38 C 40 38, 30 45, 28 55 Z" fill="#2C2825" />
                  <path d="M 50 72 C 45 68, 36 68, 34 74 C 40 76, 47 75, 50 74 C 53 75, 60 76, 66 74 C 64 68, 55 68, 50 72 Z" fill="#2C2825" />
                </svg>
              </div>
              <div className="polaroid-caption">.polaroid-card</div>
            </div>
            <span className="absolute bottom-3 left-4 text-[11px] font-bold uppercase tracking-wider text-[#6B635B]">
              Polaroid Card
            </span>
          </div>

          {/* 2. Note Card */}
          <div className="p-6 rounded-2xl border border-dashed border-[#2C2825]/20 bg-white/40 flex flex-col items-center justify-center min-h-[300px] relative">
            <div className="note-card w-[170px] rotate-[2deg]">
              <div className="note-spirals">
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
              </div>
            </div>
            <span className="absolute bottom-3 left-4 text-[11px] font-bold uppercase tracking-wider text-[#6B635B]">
              .note-card (Spiral)
            </span>
          </div>

          {/* 3. Newspaper Clip */}
          <div className="p-6 rounded-2xl border border-dashed border-[#2C2825]/20 bg-white/40 flex flex-col items-center justify-center min-h-[300px] relative">
            <div className="newspaper-clip w-[190px] rotate-[-2deg]">
              <div className="h-4 bg-[#736458] rounded-[1px] mb-2" />
              <div className="grid grid-cols-2 gap-2 relative">
                <div className="flex flex-col gap-1">
                  <div className="h-1 bg-[#2C2825] opacity-80 w-full" />
                  <div className="h-1 bg-[#2C2825] opacity-80 w-[80%]" />
                  <div className="h-1 bg-[#2C2825] opacity-80 w-full" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="h-1 bg-[#2C2825] opacity-80 w-full" />
                  <div className="h-1 bg-[#2C2825] opacity-80 w-[70%]" />
                </div>
                <div
                  className="absolute border-2 border-[#B8252A] rounded-full"
                  style={{ width: '60px', height: '26px', bottom: '0px', right: '-2px' }}
                />
              </div>
            </div>
            <span className="absolute bottom-3 left-4 text-[11px] font-bold uppercase tracking-wider text-[#6B635B]">
              .newspaper-clip (Torn)
            </span>
          </div>

          {/* 4. Buttons and Marker */}
          <div className="p-6 rounded-2xl border border-dashed border-[#2C2825]/20 bg-white/40 flex flex-col items-center justify-center min-h-[300px] gap-4 relative">
            <div className="marker-note rotate-[4deg]">
              <div className="marker-text">HOW?!</div>
            </div>
            <button className="btn-detective text-xs py-2.5 px-4">
              .btn-detective
            </button>
            <span className="absolute bottom-3 left-4 text-[11px] font-bold uppercase tracking-wider text-[#6B635B]">
              CTA & Marker Props
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
