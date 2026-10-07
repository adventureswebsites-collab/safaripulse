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
    y: 75,
    adventuresCount: 7,
    startingPrice: 8900,
    description: 'Big Tuskers & Mount Kilimanjaro Sunrises',
    highlightTag: 'Iconic Wildlife'
  },
  {
    id: 'mombasa',
    name: 'Mombasa',
    label: 'MOMBASA',
    x: 74,
    y: 83,
    adventuresCount: 6,
    startingPrice: 6800,
    description: 'Historical Swahili Shores & Marine Reefs',
    highlightTag: 'Swahili Coast'
  },
  {
    id: 'diani',
    name: 'Diani',
    label: 'DIANI',
    x: 72,
    y: 89,
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
    KENYA_HOTSPOTS.find(h => h.id === activeHotspotId) || KENYA_HOTSPOTS[1] // Default to Naivasha as requested in prompt example
  );

  const handleHotspotClick = (hotspot: MapHotspot) => {
    setSelectedHotspot(hotspot);
    onSelectHotspot(hotspot.name);
  };

  return (
    <div className={`relative bg-[#171717] rounded-2xl border border-neutral-800 p-4 sm:p-5 text-white shadow-xl overflow-hidden ${className}`}>
      
      {/* Editorial Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F97316] animate-ping" />
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#F97316]">
            KENYA ADVENTURE HOTSPOTS MAP
          </span>
        </div>
        <span className="text-[10px] text-neutral-400 font-mono">
          7 Key Regions
        </span>
      </div>

      {/* Stylized Vector Map & Hotspots */}
      <div className="relative w-full aspect-[1/0.95] max-h-[360px] mx-auto select-none">
        
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
                      ? 'w-7 h-7 bg-[#F97316]/40 animate-ping'
                      : 'w-4 h-4 bg-[#F97316]/20 group-hover:scale-150'
                  }`}
                />
                
                <div
                  className={`w-3.5 h-3.5 rounded-full border-2 transition-transform duration-200 flex items-center justify-center ${
                    isSelected
                      ? 'bg-[#F97316] border-white scale-125 shadow-lg shadow-[#F97316]/50'
                      : 'bg-[#EA580C] border-[#FAF7F2] group-hover:scale-110'
                  }`}
                />

                {/* Micro Label */}
                <span
                  className={`absolute top-4.5 whitespace-nowrap text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded transition-all ${
                    isSelected
                      ? 'bg-[#F97316] text-white shadow-sm'
                      : 'bg-black/75 text-neutral-300 group-hover:text-white group-hover:bg-black/90'
                  }`}
                >
                  {hotspot.name}
                </span>
              </div>
            </div>
          );
        })}

      </div>

      {/* Selected Marker Detail Card (Editorial style requested in spec) */}
      <div className="mt-3 p-3.5 bg-neutral-900/90 rounded-xl border border-neutral-700/80 backdrop-blur-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-black text-white tracking-wide">
              {selectedHotspot.label}
            </span>
            <span className="text-[10px] font-bold text-[#F97316] px-2 py-0.5 rounded bg-[#F97316]/15 border border-[#F97316]/30">
              {selectedHotspot.adventuresCount} adventures
            </span>
          </div>

          <p className="text-[11px] text-neutral-300 leading-tight">
            {selectedHotspot.description}
          </p>

          <div className="text-xs font-bold text-white pt-0.5">
            <span className="text-neutral-400 font-normal text-[10px] mr-1">Starting from</span>
            <span className="text-[#F97316] font-mono text-sm">From KSh {selectedHotspot.startingPrice.toLocaleString()}</span>
          </div>
        </div>

        <button
          onClick={() => onSelectHotspot(selectedHotspot.name)}
          className="self-stretch sm:self-center px-4 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5 shrink-0"
        >
          <span>EXPLORE</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Quick Region Selector Pills for mobile/touch accessibility */}
      <div className="mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
        {KENYA_HOTSPOTS.map((h) => (
          <button
            key={h.id}
            onClick={() => handleHotspotClick(h)}
            className={`whitespace-nowrap px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
              selectedHotspot.id === h.id
                ? 'bg-[#F97316] text-white'
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
