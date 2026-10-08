import React from 'react';
import { Star, Heart, MapPin, ArrowRight, Zap } from 'lucide-react';
import { Adventure } from '../types';
import { formatKSh } from '../utils/formatters';

interface AdventureCardProps {
  adventure: Adventure;
  isSaved: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onSelect: (adventure: Adventure) => void;
  onQuickBook?: (adventure: Adventure, e: React.MouseEvent) => void;
  layout?: 'grid' | 'list';
  compact?: boolean;
}

export const AdventureCard: React.FC<AdventureCardProps> = ({
  adventure,
  isSaved,
  onToggleSave,
  onSelect,
  onQuickBook,
  layout = 'grid',
  compact = false
}) => {
  const isList = layout === 'list';
  const percentBooked = Math.round((adventure.bookedSeatsCount / adventure.totalSeats) * 100);

  return (
    <article
      onClick={() => onSelect(adventure)}
      className={`group cursor-pointer bg-white rounded-xl sm:rounded-2xl border border-[#E7E5E4] overflow-hidden hover:border-[#F97316]/50 hover:shadow-md transition-all duration-300 flex ${
        isList ? 'flex-col md:flex-row' : 'flex-col'
      }`}
    >
      {/* Adventure Image */}
      <div
        className={`relative overflow-hidden bg-[#FAF7F2] ${
          isList ? 'md:w-80 h-56 md:h-auto shrink-0' : 'w-full aspect-[16/10]'
        }`}
      >
        <img
          src={adventure.featuredImage}
          alt={adventure.title}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
        />

        {/* Protection Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className={`absolute ${compact ? 'top-1.5 inset-x-1.5 sm:top-3 sm:inset-x-3' : 'top-2 sm:top-3 inset-x-2 sm:inset-x-3'} flex items-start justify-between z-10 gap-1`}>
          <div className="flex flex-col gap-0.5 sm:gap-1 items-start min-w-0">
            <span className={`bg-[#171717]/90 backdrop-blur-xs text-white ${compact ? 'text-[9px] sm:text-[11px] px-1.5 py-0.5 sm:px-2.5 sm:py-1' : 'text-[10px] sm:text-[11px] px-2 py-0.5 sm:px-2.5 sm:py-1'} font-bold rounded sm:rounded-md shadow-xs truncate max-w-[100px] sm:max-w-none`}>
              {adventure.nextDepartureDateText}
            </span>
            {adventure.isNew && (
              <span className={`bg-[#F97316] text-white ${compact ? 'text-[8px] sm:text-[10px] px-1 py-0.5 sm:px-2 sm:py-0.5' : 'text-[9px] sm:text-[10px] px-1.5 py-0.5 sm:px-2 sm:py-0.5'} font-extrabold uppercase rounded shadow-xs`}>
                NEW
              </span>
            )}
          </div>

          <button
            onClick={(e) => onToggleSave(adventure.id, e)}
            aria-label={isSaved ? 'Remove from saved' : 'Save adventure'}
            className={`${compact ? 'w-7 h-7 sm:w-9 sm:h-9 min-h-[30px] min-w-[30px] sm:min-h-[44px] sm:min-w-[44px]' : 'w-8 h-8 sm:w-9 sm:h-9 min-h-[36px] min-w-[36px] sm:min-h-[44px] sm:min-w-[44px]'} rounded-full flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer shrink-0 ${
              isSaved
                ? 'bg-white text-[#F97316] shadow-sm'
                : 'bg-black/40 text-white hover:bg-black/60'
            }`}
          >
            <Heart className={`${compact ? 'w-3.5 h-3.5 sm:w-4 sm:h-4' : 'w-3.5 h-3.5 sm:w-4 sm:h-4'} ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom image overlay: Category & Rating */}
        <div className={`absolute ${compact ? 'bottom-1.5 inset-x-1.5 sm:bottom-3 sm:inset-x-3' : 'bottom-2 sm:bottom-3 inset-x-2 sm:inset-x-3'} flex items-center justify-between text-white text-xs gap-1`}>
          <span className={`${compact ? 'text-[9px] sm:text-[11px] px-1.5 py-0.5 sm:px-2.5 sm:py-0.5' : 'text-[10px] sm:text-[11px] px-2 py-0.5 sm:px-2.5 sm:py-0.5'} font-semibold bg-black/60 backdrop-blur-xs rounded sm:rounded-md truncate max-w-[85px] sm:max-w-none`}>
            {adventure.category}
          </span>

          <div className={`flex items-center gap-0.5 sm:gap-1 bg-black/60 backdrop-blur-xs ${compact ? 'px-1.5 py-0.5 sm:px-2 sm:py-0.5 text-[9px] sm:text-[11px]' : 'px-1.5 py-0.5 sm:px-2 sm:py-0.5 text-[10px] sm:text-[11px]'} rounded sm:rounded-md font-bold shrink-0`}>
            <Star className={`${compact ? 'w-2.5 h-2.5 sm:w-3 sm:h-3' : 'w-2.5 h-2.5 sm:w-3 sm:h-3'} fill-amber-400 text-amber-400`} />
            <span>{adventure.rating.toFixed(1)}</span>
            <span className="text-white/70 font-normal hidden xs:inline sm:inline">({adventure.reviewsCount})</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className={`${compact ? 'p-2.5 sm:p-4' : 'p-3 sm:p-4.5'} flex-1 flex flex-col justify-between ${compact ? 'space-y-2 sm:space-y-3' : 'space-y-2.5 sm:space-y-3'}`}>
        <div className={`${compact ? 'space-y-1 sm:space-y-2' : 'space-y-1.5 sm:space-y-2'}`}>
          
          {/* Location & Duration */}
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-[#737373] gap-1">
            <span className="flex items-center gap-1 min-w-0 font-medium">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F97316] shrink-0" />
              <span className="truncate">{adventure.destination}</span>
            </span>
            <span className="shrink-0 font-medium text-[10px] sm:text-xs">
              {adventure.durationDays === 1 ? '1 Day' : `${adventure.durationDays}D/${adventure.durationNights}N`}
            </span>
          </div>

          {/* Title */}
          <h3 className={`${compact ? 'text-xs sm:text-base lg:text-lg' : 'text-sm sm:text-base lg:text-lg'} font-bold text-[#171717] leading-tight sm:leading-snug group-hover:text-[#F97316] transition-colors line-clamp-2`}>
            {adventure.title}
          </h3>

          {/* Organizer */}
          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-[#737373]">
            <span className="text-[#171717] font-medium truncate">{adventure.organizer.name}</span>
          </div>

          {/* Available Seats Bar */}
          <div className="pt-0.5 sm:pt-1">
            <div className="flex justify-between items-center text-[10px] sm:text-[11px] mb-1">
              <span className="text-[#737373] truncate">
                Seats: <strong className="text-[#171717] font-bold">{adventure.availableSeats}</strong>
              </span>
              {adventure.availableSeats <= 3 && (
                <span className="text-[#EA580C] font-bold flex items-center gap-0.5 text-[9px] sm:text-[11px] shrink-0">
                  <Zap className="w-2 h-2 sm:w-2.5 sm:h-2.5 fill-current" />
                  <span>Selling fast</span>
                </span>
              )}
            </div>
            <div className="w-full bg-[#FAF7F2] h-1.5 rounded-full overflow-hidden border border-[#E7E5E4]">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  adventure.availableSeats <= 3 ? 'bg-[#F97316]' : 'bg-[#171717]'
                }`}
                style={{ width: `${percentBooked}%` }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Row: Starting price & Book Now */}
        <div className={`pt-2 sm:pt-2.5 border-t border-[#E7E5E4] flex items-center justify-between gap-1.5 sm:gap-3`}>
          <div className="min-w-0">
            <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#737373] block truncate">Starting</span>
            <div className="flex items-baseline gap-0.5 sm:gap-1">
              <span className={`${compact ? 'text-xs sm:text-base lg:text-xl' : 'text-sm sm:text-lg lg:text-xl'} font-extrabold text-[#171717] tabular-nums truncate`}>
                {formatKSh(adventure.pricePerPerson)}
              </span>
              <span className="text-[9px] sm:text-[11px] text-[#737373] hidden xs:inline">/seat</span>
            </div>
          </div>

          <button
            onClick={(e) => {
              if (onQuickBook) {
                e.stopPropagation();
                onQuickBook(adventure, e);
              } else {
                onSelect(adventure);
              }
            }}
            className={`${compact ? 'px-2 py-1.5 sm:px-4 sm:py-2.5 text-[10px] sm:text-xs min-h-[32px] sm:min-h-[44px]' : 'px-2.5 sm:px-4 py-1.5 sm:py-2.5 text-[11px] sm:text-xs min-h-[36px] sm:min-h-[44px]'} bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold uppercase tracking-wider rounded-lg sm:rounded-xl transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-1 shrink-0`}
          >
            <span>Book</span>
            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </button>
        </div>

      </div>
    </article>
  );
};
