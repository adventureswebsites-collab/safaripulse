import React, { useState } from 'react';
import { MapPin, ArrowRight, Compass, Sparkles } from 'lucide-react';

export interface MapHotspot {
  id: string;
  name: string;
  label: string;
  x: number; // percentage in viewBox
  y: number; // percentage in viewBox
  adventuresCount: number;
  startingPrice: number;
  description: string;
  highlightTag: string;
}

export const KENYA_HOTSPOTS: MapHotspot[] = [
  {
    id: 'nairobi',
    name: 'Nairobi',
    label: 'NAIROBI',
    x: 47,
    y: 63,
    adventuresCount: 14,
    startingPrice: 1500,
    description: 'Ngong Hills, Karura Canopy, & Urban Escapes',
    highlightTag: 'Hub & Day Hikes'
  },
  {
    id: 'naivasha',
    name: 'Naivasha',
    label: 'NAIVASHA',
    x: 42,
    y: 57,
    adventuresCount: 8,
    startingPrice: 1200,
    description: 'Hell’s Gate Canyons & Crescent Island Bushcraft',
    highlightTag: 'Canyons & Lake'
  },
  {
    id: 'mount-kenya',
    name: 'Mount Kenya',
    label: 'MOUNT KENYA',
    x: 54,
    y: 52,
    adventuresCount: 9,
    startingPrice: 6500,
    description: 'Point Lenana Summits, Glaciers & Alpine Tarns',
    highlightTag: 'Alpine Summit'
  },
  {
    id: 'maasai-mara',
    name: 'Maasai Mara',
    label: 'MAASAI MARA',
    x: 32,
    y: 68,
    adventuresCount: 10,
    startingPrice: 8500,
    description: 'Big Cats Tracking, Savannah Sunsets & 4x4',
    highlightTag: 'Overland Safari'
  },
  {
    id: 'amboseli',
    name: 'Amboseli',
    label: 'AMBOSELI',
    x: 58,
    y: 72,
    adventuresCount: 7,
    startingPrice: 8900,
    description: 'Big Tuskers & Mount Kilimanjaro Sunrises',
    highlightTag: 'Iconic Wildlife'
  },
  {
    id: 'mombasa',
    name: 'Mombasa',
    label: 'MOMBASA',
    x: 73,
    y: 78,
    adventuresCount: 6,
    startingPrice: 6800,
    description: 'Historical Swahili Shores & Marine Reefs',
    highlightTag: 'Swahili Coast'
  },
  {
    id: 'diani',
    name: 'Diani',
    label: 'DIANI',
    x: 71,
    y: 83,
    adventuresCount: 8,
    startingPrice: 7500,
    description: 'Turquoise Waters, Wasini Dhows & Sandbars',
    highlightTag: 'White Sand Beach'
  }
];

interface KenyaAdventureMapProps {
  onSelectHotspot: (name: string) => void;
  activeHotspotId?: string;
  className?: string;
  compact?: boolean;
}

export const KenyaAdventureMap: React.FC<KenyaAdventureMapProps> = ({
  onSelectHotspot,
  activeHotspotId,
  className = '',
  compact = false
}) => {
  const [selectedHotspot, setSelectedHotspot] = useState<MapHotspot>(
    KENYA_HOTSPOTS.find(h => h.id === activeHotspotId) || KENYA_HOTSPOTS[1] // Default to Naivasha
  );

  const handleHotspotClick = (hotspot: MapHotspot) => {
    setSelectedHotspot(hotspot);
    onSelectHotspot(hotspot.name);
  };

  return (
    <div className={`relative bg-[#171717] rounded-xl sm:rounded-2xl border border-neutral-800 p-2.5 sm:p-4 lg:p-5 text-white shadow-xl overflow-hidden ${className}`}>
      
      {/* Editorial Header */}
      <div className="flex items-center justify-between pb-2 sm:pb-2.5 border-b border-neutral-800/80 mb-1.5 sm:mb-2.5">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F97316] animate-ping" />
          <span className="text-[10px] sm:text-xs uppercase font-bold tracking-[0.15em] sm:tracking-[0.2em] text-[#F97316]">
            KENYA ADVENTURE HOTSPOTS MAP
          </span>
        </div>
        <span className="text-[10px] sm:text-xs text-neutral-400 font-mono">
          7 Regions
        </span>
      </div>

      {/* Stylized Vector Map & Hotspots - Compact Preview on Mobile */}
      <div className="relative w-full h-[190px] sm:h-[240px] md:h-[270px] lg:h-[300px] flex items-center justify-center select-none overflow-hidden">
        <div className="relative h-full aspect-square max-w-full mx-auto">
          {/* Stylized SVG Map of Kenya */}
          <svg
            viewBox="0 0 500 500"
            className="w-full h-full filter drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Subtle Topographic Elevation Rings */}
            <ellipse cx="250" cy="280" rx="190" ry="170" stroke="#262626" strokeWidth="1" strokeDasharray="3 6" opacity="0.6" />
            <ellipse cx="250" cy="280" rx="140" ry="120" stroke="#333333" strokeWidth="1" strokeDasharray="4 6" opacity="0.7" />
            <ellipse cx="260" cy="270" rx="80" ry="70" stroke="#404040" strokeWidth="1" opacity="0.5" />

            {/* Stylized Rift Valley Fault Line */}
            <path
              d="M 210 50 Q 220 180 205 280 T 235 440"
              stroke="#F97316"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.35"
            />

            {/* Stylized Kenya Territorial Boundary */}
            <path
              d="M 180 40 
                 L 260 25 
                 L 390 90 
                 L 440 220 
                 L 420 310 
                 L 375 440 
                 L 360 470 
                 L 310 420 
                 L 230 400 
                 L 160 350 
                 L 120 300 
                 L 115 220 
                 L 155 120 
                 Z"
              fill="#1F1F1F"
              stroke="#383838"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Lake Victoria (West pocket) */}
            <path
              d="M 115 280 Q 95 305 120 330 Q 145 320 135 295 Z"
              fill="#0F172A"
              stroke="#1E293B"
              strokeWidth="1"
              opacity="0.9"
            />

            {/* Lake Turkana (North pocket) */}
            <path
              d="M 185 65 Q 175 120 195 180 Q 210 160 200 80 Z"
              fill="#0F172A"
              stroke="#1E293B"
              strokeWidth="1"
              opacity="0.9"
            />

            {/* Indian Ocean Swell Lines (South East) */}
            <path
              d="M 370 410 Q 400 425 430 450"
              stroke="#0284C7"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.4"
            />
            <path
              d="M 385 435 Q 410 450 435 470"
              stroke="#0284C7"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.4"
            />

            {/* Compass Rose Accent */}
            <g transform="translate(60, 80) scale(0.6)">
              <circle cx="0" cy="0" r="22" stroke="#404040" strokeWidth="1" />
              <path d="M 0 -18 L 4 0 L 0 4 L -4 0 Z" fill="#F97316" />
              <path d="M 0 18 L 4 0 L 0 -4 L -4 0 Z" fill="#737373" />
              <text x="-4" y="-23" fill="#A3A3A3" fontSize="10" fontWeight="bold">N</text>
            </g>

            {/* Equator Line */}
            <line x1="80" y1="260" x2="430" y2="260" stroke="#525252" strokeWidth="1" strokeDasharray="2 6" opacity="0.4" />
            <text x="360" y="255" fill="#737373" fontSize="9" letterSpacing="1" opacity="0.6">EQUATOR 0°</text>
          </svg>

          {/* Interactive Location Markers Overlay */}
          {KENYA_HOTSPOTS.map((hotspot) => {
            const isSelected = selectedHotspot.id === hotspot.id;

            return (
              <div
                key={hotspot.id}
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                className="absolute z-20 cursor-pointer group"
                onClick={() => handleHotspotClick(hotspot)}
              >
                {/* Pulsing Orange Pin */}
                <div className="relative flex items-center justify-center">
                  <span
                    className={`absolute rounded-full transition-all duration-300 ${
                      isSelected
                        ? 'w-6 h-6 sm:w-7 sm:h-7 bg-[#F97316]/40 animate-ping'
                        : 'w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#F97316]/20 group-hover:scale-150'
                    }`}
                  />
                  
                  <div
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 transition-transform duration-200 flex items-center justify-center ${
                      isSelected
                        ? 'bg-[#F97316] border-white scale-110 sm:scale-125 shadow-lg shadow-[#F97316]/50'
                        : 'bg-[#EA580C] border-[#FAF7F2] group-hover:scale-110'
                    }`}
                  />

                  {/* Micro Label */}
                  <span
                    className={`absolute top-3.5 sm:top-4 whitespace-nowrap text-[8px] sm:text-[9px] font-bold tracking-wider px-1 sm:px-1.5 py-0.2 sm:py-0.5 rounded transition-all pointer-events-none ${
                      isSelected
                        ? 'bg-[#F97316] text-white shadow-sm'
                        : 'bg-black/80 text-neutral-300 group-hover:text-white group-hover:bg-black/95'
                    }`}
                  >
                    {hotspot.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Marker Detail Card (Compact Overlay overlapping bottom of map) */}
      <div className="relative -mt-11 sm:-mt-12 md:-mt-12 lg:mt-2.5 z-10 p-2 sm:p-2.5 sm:p-3 bg-neutral-900/95 rounded-xl border border-neutral-700/80 backdrop-blur-md shadow-lg flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1 space-y-0.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs sm:text-sm font-black text-white tracking-wide truncate">
              {selectedHotspot.label}
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold text-[#F97316] px-1.5 py-0.2 rounded bg-[#F97316]/15 border border-[#F97316]/30 shrink-0">
              {selectedHotspot.adventuresCount} adventures
            </span>
          </div>

          <p className="text-[10px] sm:text-xs text-neutral-300 leading-tight truncate">
            {selectedHotspot.description}
          </p>

          <div className="text-[10px] sm:text-xs font-bold text-white flex items-center gap-1">
            <span className="text-neutral-400 font-normal text-[9px] sm:text-[10px]">From</span>
            <span className="text-[#F97316] font-mono text-xs sm:text-sm font-extrabold">KSh {selectedHotspot.startingPrice.toLocaleString()}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSelectHotspot(selectedHotspot.name)}
          className="px-3 sm:px-4 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg sm:rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1 shrink-0"
        >
          <span>EXPLORE</span>
          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </button>
      </div>

      {/* Quick Region Selector Pills - Horizontally scrollable single row */}
      <div className="mt-2 sm:mt-2.5 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none no-scrollbar pt-0.5 pb-0.5">
        {KENYA_HOTSPOTS.map((h) => (
          <button
            key={h.id}
            type="button"
            onClick={() => handleHotspotClick(h)}
            className={`shrink-0 whitespace-nowrap px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
              selectedHotspot.id === h.id
                ? 'bg-[#F97316] text-white shadow-xs'
                : 'bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700'
            }`}
          >
            {h.name}
          </button>
        ))}
      </div>

    </div>
  );
};
