import React from 'react';
import { Star, Heart, MapPin, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { Adventure } from '../types';
import { formatKSh } from '../utils/formatters';

interface AdventureCardProps {
  adventure: Adventure;
  isSaved: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onSelect: (adventure: Adventure) => void;
  onQuickBook?: (adventure: Adventure, e: React.MouseEvent) => void;
  layout?: 'grid' | 'list';
}

export const AdventureCard: React.FC<AdventureCardProps> = ({
  adventure,
  isSaved,
  onToggleSave,
  onSelect,
  onQuickBook,
  layout = 'grid'
}) => {
  const isList = layout === 'list';
  const percentBooked = Math.round((adventure.bookedSeatsCount / adventure.totalSeats) * 100);

  return (
    <article
      onClick={() => onSelect(adventure)}
      className={`group cursor-pointer bg-white rounded-xl border border-[#E7E5E4] overflow-hidden hover:border-[#F97316]/50 hover:shadow-md transition-all duration-300 flex ${
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
        <div className="absolute top-3 inset-x-3 flex items-start justify-between z-10">
          <div className="flex flex-col gap-1 items-start">
            <span className="bg-[#171717]/90 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
              {adventure.nextDepartureDateText}
            </span>
            {adventure.isNew && (
              <span className="bg-[#F97316] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-xs">
                NEW
              </span>
            )}
          </div>

          <button
            onClick={(e) => onToggleSave(adventure.id, e)}
            aria-label={isSaved ? 'Remove from saved' : 'Save adventure'}
            className={`w-9 h-9 min-h-[44px] min-w-[44px] rounded-full flex items-center justify-center backdrop-blur-xs transition-colors cursor-pointer ${
              isSaved
                ? 'bg-white text-[#F97316] shadow-sm'
                : 'bg-black/40 text-white hover:bg-black/60'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom image overlay: Category & Rating */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-white text-xs">
          <span className="text-[11px] font-semibold bg-black/60 backdrop-blur-xs px-2.5 py-0.5 rounded-md">
            {adventure.category}
          </span>

          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md text-[11px] font-bold">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{adventure.rating.toFixed(1)}</span>
            <span className="text-white/70 font-normal">({adventure.reviewsCount})</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-3.5 sm:p-4.5 flex-1 flex flex-col justify-between space-y-2.5 sm:space-y-3">
        <div className="space-y-1.5 sm:space-y-2">
          
          {/* Location & Duration */}
          <div className="flex items-center justify-between text-xs text-[#737373]">
            <span className="flex items-center gap-1 truncate font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
              <span className="truncate">{adventure.destination}</span>
            </span>
            <span className="shrink-0 font-medium">
              {adventure.durationDays === 1 ? '1 Day' : `${adventure.durationDays}D / ${adventure.durationNights}N`}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-[#171717] leading-snug group-hover:text-[#F97316] transition-colors line-clamp-2">
            {adventure.title}
          </h3>

          {/* Organizer */}
          <div className="flex items-center gap-1.5 text-xs text-[#737373] pt-0.5">
            <span className="text-[#171717] font-medium truncate">{adventure.organizer.name}</span>
            {adventure.organizer.verified && (
              <CheckCircle2 className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
            )}
          </div>

          {/* Available Seats Bar */}
          <div className="pt-1">
            <div className="flex justify-between items-center text-[11px] mb-1">
              <span className="text-[#737373]">
                Available seats: <strong className="text-[#171717] font-bold">{adventure.availableSeats}</strong>
              </span>
              {adventure.availableSeats <= 3 && (
                <span className="text-[#EA580C] font-bold flex items-center gap-0.5">
                  <Zap className="w-2.5 h-2.5 fill-current" />
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
        <div className="pt-2.5 border-t border-[#E7E5E4] flex items-end justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#737373] block">Starting from</span>
            <div className="flex items-baseline gap-1">
              <span className="text-base sm:text-lg lg:text-xl font-extrabold text-[#171717] tabular-nums">
                {formatKSh(adventure.pricePerPerson)}
              </span>
              <span className="text-[11px] text-[#737373]">/ seat</span>
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
            className="px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-xs flex items-center gap-1.5 shrink-0 min-h-[42px] sm:min-h-[44px]"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </article>
  );
};
