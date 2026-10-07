import React, { useState } from 'react';
import { 
  MapPin, Calendar, Clock, Star, ArrowRight, ShieldCheck, 
  CheckCircle2, Heart, Sparkles, Compass, Ticket, PhoneCall, 
  Users, Zap, ChevronRight, Sunrise, DollarSign, Flame, Award, Search
} from 'lucide-react';
import { Adventure } from '../types';
import { 
  ADVENTURES, 
  EXPERIENCE_CATEGORIES, 
  EDITORIAL_DESTINATIONS 
} from '../data/adventures';
import { AdventureCard } from '../components/AdventureCard';
import { KenyaAdventureMap } from '../components/KenyaAdventureMap';
import { DepartureBoard } from '../components/DepartureBoard';
import { formatKSh } from '../utils/formatters';

interface HomeViewProps {
  onSelectAdventure: (adventure: Adventure) => void;
  onExploreCategory: (category: string) => void;
  onExploreDestination: (destination: string) => void;
  onSearch: (destination: string, category: string) => void;
  savedIds: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onOpenExplore: () => void;
  onQuickBook: (adventure: Adventure) => void;
  onOpenSearchModal?: () => void;
}

type HeroVibe = 'GET OUTSIDE' | 'ESCAPE' | 'GET ACTIVE' | 'WEEKEND AWAY' | 'DISCOVER';

export const HomeView: React.FC<HomeViewProps> = ({
  onSelectAdventure,
  onExploreCategory,
  onExploreDestination,
  onSearch,
  savedIds,
  onToggleSave,
  onOpenExplore,
  onQuickBook,
  onOpenSearchModal
}) => {
  // Hero Interactive Options
  const [selectedVibe, setSelectedVibe] = useState<HeroVibe>('GET OUTSIDE');

  // Quick Discovery Filter: This Weekend | Near Me | Under KSh 2,000 | Hiking | Safari | Beach | Camping | Road Trips
  const [activeQuickFilter, setActiveQuickFilter] = useState<string>('This Weekend');

  // Weekend Date Tab: Saturday | Sunday | Next Weekend
  const [weekendDayFilter, setWeekendDayFilter] = useState<'Saturday' | 'Sunday' | 'Next Weekend'>('Saturday');

  // Organizer Modal
  const [organizerModalOpen, setOrganizerModalOpen] = useState(false);
  const [organizerSubmitted, setOrganizerSubmitted] = useState(false);

  // Dynamic Hero Configuration based on Selected Vibe
  const heroVibeConfig: Record<HeroVibe, {
    bgImage: string;
    caption: string;
    highlightRegion: string;
    previewTripId: string;
  }> = {
    'GET OUTSIDE': {
      bgImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85',
      caption: 'Ngong Hills Ridge Trail · Nairobi Environs',
      highlightRegion: 'Nairobi',
      previewTripId: 'adv-ngonghills-08'
    },
    'ESCAPE': {
      bgImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=85',
      caption: 'Turquoise Waters & Coral Reefs · Diani Coast',
      highlightRegion: 'Diani',
      previewTripId: 'adv-diani-escape-pop'
    },
    'GET ACTIVE': {
      bgImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85',
      caption: 'Mount Kenya Alpine Moorlands · Central Highlands',
      highlightRegion: 'Mount Kenya',
      previewTripId: 'adv-mtkenya-hiking-pop'
    },
    'WEEKEND AWAY': {
      bgImage: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=2000&q=85',
      caption: 'Lake Naivasha Campsite & Acacia Campfires',
      highlightRegion: 'Naivasha',
      previewTripId: 'adv-naivasha-camping-pop'
    },
    'DISCOVER': {
      bgImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=85',
      caption: 'Savannah Big Cats Overland · Maasai Mara',
      highlightRegion: 'Maasai Mara',
      previewTripId: 'adv-mara-safari-pop'
    }
  };

  const currentVibeData = heroVibeConfig[selectedVibe];

  // Specific trips referenced in user prompt:
  // Ngong Hills Adventure for Hero Preview & Featured section
  const ngongHillsTrip = ADVENTURES.find(a => a.id === 'adv-ngonghills-08') || ADVENTURES[0];

  // 9. Popular Adventures (the 4 exact trips specified in prompt)
  const popularTrips = [
    ADVENTURES.find(a => a.id === 'adv-mara-safari-pop') || ADVENTURES[0],
    ADVENTURES.find(a => a.id === 'adv-mtkenya-hiking-pop') || ADVENTURES[1],
    ADVENTURES.find(a => a.id === 'adv-diani-escape-pop') || ADVENTURES[2],
    ADVENTURES.find(a => a.id === 'adv-naivasha-camping-pop') || ADVENTURES[3]
  ];

  // 13. Trending This Week (the 4 exact trips specified in prompt)
  const trendingRailTrips = [
    ADVENTURES.find(a => a.id === 'adv-hellsgate-cycling-trend') || ADVENTURES[0],
    ADVENTURES.find(a => a.id === 'adv-naivasha-boat-trend') || ADVENTURES[1],
    ADVENTURES.find(a => a.id === 'adv-mombasa-beach-trend') || ADVENTURES[2],
    ADVENTURES.find(a => a.id === 'adv-amboseli-safari-trend') || ADVENTURES[3]
  ];

  // 14. Happening This Weekend filtered trips
  const weekendTrips = ADVENTURES.filter(a => {
    if (weekendDayFilter === 'Saturday') {
      return a.nextDepartureDateText.toLowerCase().includes('saturday') || a.isThisWeekend;
    }
    if (weekendDayFilter === 'Sunday') {
      return a.nextDepartureDateText.toLowerCase().includes('sunday') || a.id.includes('elephanthill') || a.id.includes('longonot');
    }
    // Next Weekend
    return !a.isThisWeekend || a.nextDepartureDateText.toLowerCase().includes('next');
  }).slice(0, 6);

  // Quick discovery filtered trips for the Happening This Weekend rail
  const quickFilteredTrips = ADVENTURES.filter(a => {
    if (activeQuickFilter === 'Under KSh 2,000') {
      return a.pricePerPerson <= 2000;
    }
    if (activeQuickFilter === 'Near Me') {
      return a.destination.toLowerCase().includes('nairobi') || a.destination.toLowerCase().includes('naivasha');
    }
    if (activeQuickFilter === 'Hiking') {
      return a.category.toLowerCase().includes('hike') || a.category.toLowerCase().includes('trail');
    }
    if (activeQuickFilter === 'Safari') {
      return a.category.toLowerCase().includes('safari');
    }
    if (activeQuickFilter === 'Beach') {
      return a.category.toLowerCase().includes('beach') || a.category.toLowerCase().includes('coast') || a.category.toLowerCase().includes('water');
    }
    if (activeQuickFilter === 'Camping') {
      return a.category.toLowerCase().includes('camp');
    }
    if (activeQuickFilter === 'Road Trips') {
      return a.category.toLowerCase().includes('road');
    }
    // Default 'This Weekend' filter
    if (weekendDayFilter === 'Saturday') {
      return a.nextDepartureDateText.toLowerCase().includes('saturday') || a.isThisWeekend;
    }
    if (weekendDayFilter === 'Sunday') {
      return a.nextDepartureDateText.toLowerCase().includes('sunday') || a.id.includes('elephanthill') || a.id.includes('longonot');
    }
    return !a.isThisWeekend || a.nextDepartureDateText.toLowerCase().includes('next');
  });

  // 15. Weekend Escapes featured trip
  const dianiGetawayTrip = ADVENTURES.find(a => a.id === 'adv-diani-getaway-escape') || ADVENTURES[2];

  // 16. Adventures Under KSh 2,000
  const under2000Trips = ADVENTURES.filter(a => a.pricePerPerson <= 2000).slice(0, 3);

  // 16. Sunrise Adventures
  const sunriseTrips = [
    ADVENTURES.find(a => a.id === 'adv-longonot-sunrise') || ADVENTURES[0],
    ADVENTURES.find(a => a.id === 'adv-mtkenya-summit-04') || ADVENTURES[1],
    ADVENTURES.find(a => a.id === 'adv-amboseli-06') || ADVENTURES[2]
  ];

  // 16. Just Added
  const justAddedTrips = ADVENTURES.filter(a => a.isNew || a.id.includes('pop') || a.id.includes('trend')).slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">

      {/* =========================================================================
          5. HERO SECTION + 6. TRIP PREVIEW + 7. INTERACTIVE KENYA MAP
          ========================================================================= */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#171717] text-white p-6 sm:p-10 lg:p-12 border border-neutral-800 shadow-2xl min-h-[580px] flex flex-col justify-between">
            
            {/* Dramatic African Adventure Photograph Background */}
            <div className="absolute inset-0 z-0">
              <img
                src={currentVibeData.bgImage}
                alt={currentVibeData.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-700 ease-in-out scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/75 to-black/40" />
              <div className="absolute inset-0 bg-black/25" />
            </div>

            {/* Top Bar inside Hero: Location pill */}
            <div className="relative z-10 flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-semibold text-white/90">
                <MapPin className="w-3.5 h-3.5 text-[#F97316]" />
                <span className="truncate">{currentVibeData.caption}</span>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-[11px] font-bold text-[#FAF7F2]/80 bg-black/40 backdrop-blur-xs px-3 py-1 rounded-full border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
                <span>Live Marketplace · Instant Lipa Na M-PESA</span>
              </div>
            </div>

            {/* Middle Main Composition: Headline, Interactive Buttons, & Right-side Previews */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 my-6 sm:my-8 items-center">
              
              {/* Left Column: Personality-Driven Interactive Headline (Span 7) */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F97316]/20 border border-[#F97316]/40 text-[#F97316] text-xs font-black tracking-wider uppercase">
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  <span>DISCOVER SOMETHING TO DO</span>
                </div>

                <h1 className="text-3xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.04]">
                  WHAT ARE YOU <br className="hidden sm:inline" />
                  <span className="text-white">UP FOR?</span>
                </h1>

                <p className="text-sm sm:text-xl text-[#FAF7F2]/90 max-w-xl font-medium leading-relaxed">
                  Find something worth leaving home for.
                </p>

                {/* Horizontally scrollable intent buttons (Selected turns orange) */}
                <div className="pt-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#FAF7F2]/60 block mb-2">
                    CHOOSE YOUR ADVENTURE VIBE:
                  </span>

                  <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto scrollbar-none pb-1.5 -mx-1 px-1 sm:mx-0 sm:px-0 sm:flex-wrap">
                    {(['GET OUTSIDE', 'ESCAPE', 'GET ACTIVE', 'WEEKEND AWAY', 'DISCOVER'] as HeroVibe[]).map((vibe) => {
                      const isSelected = selectedVibe === vibe;
                      return (
                        <button
                          key={vibe}
                          onClick={() => setSelectedVibe(vibe)}
                          className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer shrink-0 min-h-[44px] flex items-center ${
                            isSelected
                              ? 'bg-[#F97316] text-white shadow-lg shadow-[#F97316]/30 scale-102 ring-2 ring-[#EA580C]'
                              : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15'
                          }`}
                        >
                          {vibe}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Column: 6. Real Bookable Trip Preview inside Hero (Span 5) */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* 6. FEATURED TRIP PREVIEW INSIDE HERO */}
                <div className="bg-white text-[#171717] rounded-2xl p-5 shadow-2xl border border-[#E7E5E4] space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] animate-ping" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#F97316]">
                        THIS WEEKEND
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Guaranteed Departure
                    </span>
                  </div>

                  <div className="flex gap-3.5">
                    <img
                      src={ngongHillsTrip.featuredImage}
                      alt={ngongHillsTrip.title}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 rounded-xl object-cover shrink-0 border border-[#E7E5E4]"
                    />
                    <div className="min-w-0 space-y-1">
                      <h3 className="text-base sm:text-lg font-black text-[#171717] truncate leading-tight">
                        NGONG HILLS ADVENTURE
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#737373]">
                        <Clock className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
                        <span>Saturday · 8:00 AM</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#737373]">
                        <MapPin className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
                        <span>Nairobi, Kenya</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating, Price & Seats metadata */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#FAF7F2] border border-[#E7E5E4] text-center text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#737373] block">Rating</span>
                      <span className="font-extrabold text-[#171717] flex items-center justify-center gap-0.5 mt-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>4.8</span>
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#737373] block">Rate</span>
                      <span className="font-black text-[#F97316] text-sm mt-0.5 block">
                        KSh 1,500
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#737373] block">Availability</span>
                      <span className="font-bold text-[#171717] mt-0.5 block">
                        12 seats left
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => onQuickBook(ngongHillsTrip)}
                    className="w-full py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    <span>BOOK THIS ADVENTURE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>

            {/* Bottom Row inside Hero: Quick Category shortcuts */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-white/80">
              <span className="font-bold text-[#FAF7F2]">
                Instant Discovery:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { label: 'Day Hikes', cat: 'Hiking & Outdoor' },
                  { label: 'Overnight Camps', cat: 'Camping' },
                  { label: 'Savannah Safaris', cat: 'Safari & Wildlife' },
                  { label: 'Coastal Dhows', cat: 'Beach Escapes' }
                ].map((s) => (
                  <button
                    key={s.label}
                    onClick={() => onExploreCategory(s.cat)}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-white font-semibold transition-colors cursor-pointer text-[11px]"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          4. MOBILE SEARCH (Large touch target opens full-screen mobile search)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          onClick={() => {
            if (onOpenSearchModal) onOpenSearchModal();
            else onOpenExplore();
          }}
          className="bg-white rounded-2xl p-3.5 sm:p-4 border-2 border-[#E7E5E4] hover:border-[#F97316] shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 min-h-[56px] group"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] text-[#F97316] flex items-center justify-center shrink-0">
              <Search className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-sm sm:text-base font-bold text-[#171717] block truncate">
                What adventure are you looking for?
              </span>
              <span className="text-[11px] text-[#737373] block truncate">
                Search by hike, safari, destination or organizer
              </span>
            </div>
          </div>

          <div className="px-4 py-2 bg-[#F97316] group-hover:bg-[#EA580C] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-colors shrink-0 flex items-center gap-1.5 shadow-xs min-h-[44px]">
            <span>Search</span>
            <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. QUICK DISCOVERY (Horizontally scrollable filters for one-handed thumb tap)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
          {[
            'This Weekend',
            'Near Me',
            'Under KSh 2,000',
            'Hiking',
            'Safari',
            'Beach',
            'Camping',
            'Road Trips'
          ].map((f) => {
            const isSelected = activeQuickFilter === f;
            return (
              <button
                key={f}
                onClick={() => setActiveQuickFilter(f)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer min-h-[44px] flex items-center shrink-0 ${
                  isSelected
                    ? 'bg-[#F97316] text-white shadow-md shadow-[#F97316]/20 font-black ring-2 ring-[#EA580C]'
                    : 'bg-white hover:bg-[#FAF7F2] text-[#171717] border border-[#E7E5E4]'
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          6. HAPPENING THIS WEEKEND (Horizontal Swipeable Trip Rail)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 pb-3 border-b border-[#E7E5E4] gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] animate-ping" />
              <span className="text-[10px] sm:text-xs uppercase font-black tracking-widest text-[#F97316]">
                {activeQuickFilter === 'This Weekend' ? 'GUARANTEED DEPARTURES' : `FILTER: ${activeQuickFilter.toUpperCase()}`}
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#171717]">
              HAPPENING THIS WEEKEND
            </h2>
            <p className="text-xs sm:text-sm text-[#737373] mt-0.5">
              Swipe to browse real departure seats departing in the next 72 hours.
            </p>
          </div>

          {activeQuickFilter === 'This Weekend' && (
            <div className="flex items-center gap-1.5 p-1 bg-[#FAF7F2] border border-[#E7E5E4] rounded-xl self-start sm:self-auto">
              {(['Saturday', 'Sunday', 'Next Weekend'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setWeekendDayFilter(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all min-h-[36px] ${
                    weekendDayFilter === tab
                      ? 'bg-[#F97316] text-white shadow-xs'
                      : 'text-[#171717] hover:bg-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Swipeable Trip Rail: on mobile shows 1 full card and a peek of the next card */}
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {quickFilteredTrips.map((adv) => {
            const percentBooked = Math.round((adv.bookedSeatsCount / adv.totalSeats) * 100);
            const isSaved = savedIds.includes(adv.id);
            return (
              <div
                key={adv.id}
                onClick={() => onSelectAdventure(adv)}
                className="w-[84vw] sm:w-[320px] md:w-[350px] shrink-0 snap-start bg-white rounded-2xl border border-[#E7E5E4] overflow-hidden hover:border-[#F97316]/50 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                    <img
                      src={adv.featuredImage}
                      alt={adv.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
                      <span className="bg-[#171717]/90 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                        {adv.nextDepartureDateText}
                      </span>
                      <span className="bg-[#F97316] text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md">
                        {adv.category}
                      </span>
                    </div>
                    <button
                      onClick={(e) => onToggleSave(adv.id, e)}
                      aria-label="Save trip"
                      className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-colors min-h-[36px] min-w-[36px] ${
                        isSaved ? 'bg-white text-[#F97316]' : 'bg-black/40 text-white hover:bg-black/60'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                    <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{adv.rating.toFixed(1)}</span>
                      <span className="text-white/70 font-normal">({adv.reviewsCount})</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#737373]">
                      <span className="flex items-center gap-1 truncate font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
                        <span className="truncate">{adv.destination}</span>
                      </span>
                      <span className="font-semibold text-[#171717]">
                        {adv.durationDays === 1 ? '1 Day' : `${adv.durationDays}D / ${adv.durationNights}N`}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-[#171717] hover:text-[#F97316] transition-colors leading-snug line-clamp-2">
                      {adv.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-[#737373]">
                      <span className="text-[#171717] font-medium truncate">{adv.organizer.name}</span>
                      {adv.organizer.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
                      )}
                    </div>

                    {/* Available Seats Bar */}
                    <div className="pt-1">
                      <div className="flex justify-between items-center text-[11px] mb-1">
                        <span className="text-[#737373]">
                          Available seats: <strong className="text-[#171717]">{adv.availableSeats}</strong>
                        </span>
                        {adv.availableSeats <= 3 && (
                          <span className="text-[#EA580C] font-bold flex items-center gap-0.5">
                            <Zap className="w-2.5 h-2.5 fill-current" />
                            <span>Selling fast</span>
                          </span>
                        )}
                      </div>
                      <div className="w-full bg-[#FAF7F2] h-1.5 rounded-full overflow-hidden border border-[#E7E5E4]">
                        <div
                          className={`h-full rounded-full ${adv.availableSeats <= 3 ? 'bg-[#F97316]' : 'bg-[#171717]'}`}
                          style={{ width: `${percentBooked}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-2 border-t border-[#E7E5E4] flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#737373] block">Starting from</span>
                    <span className="text-lg font-black text-[#171717]">
                      {formatKSh(adv.pricePerPerson)}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickBook(adv);
                    }}
                    className="px-4 py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5 min-h-[44px]"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          7. INTERACTIVE KENYA ADVENTURE MAP (Distinctive Platform Signature)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF7F2] p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-[#E7E5E4]">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]" />
              <span className="text-xs uppercase font-black tracking-widest text-[#F97316]">
                REGIONAL EXPEDITION MAP
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] tracking-tight leading-tight">
              INTERACTIVE KENYA ADVENTURE MAP
            </h2>

            <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
              Explore scheduled overland departures from the Great Rift Valley canyons to Mount Kenya glaciers and turquoise Diani waters. Tap any pin to see available slots and starting prices.
            </p>

            {/* Key Hotspot List */}
            <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs">
              {[
                { name: 'Nairobi', info: '14 adventures · From KSh 1,500' },
                { name: 'Naivasha', info: '8 adventures · From KSh 1,200' },
                { name: 'Mount Kenya', info: '9 adventures · From KSh 6,500' },
                { name: 'Maasai Mara', info: '10 adventures · From KSh 8,500' },
                { name: 'Amboseli', info: '7 adventures · From KSh 8,900' },
                { name: 'Diani & Mombasa', info: '14 adventures · From KSh 6,800' }
              ].map((item) => (
                <div key={item.name} className="p-2.5 bg-white rounded-xl border border-[#E7E5E4]">
                  <strong className="block text-[#171717] font-bold">{item.name}</strong>
                  <span className="text-[11px] text-[#737373] block mt-0.5">{item.info}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenExplore}
                className="px-5 py-3 bg-[#171717] hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer inline-flex items-center gap-2"
              >
                <span>BROWSE ALL 7 REGIONS</span>
                <ArrowRight className="w-4 h-4 text-[#F97316]" />
              </button>
            </div>
          </div>

          {/* Right Column: The Illustrated Editorial Kenya Map */}
          <div className="lg:col-span-7">
            <KenyaAdventureMap onSelectHotspot={onExploreDestination} />
          </div>

        </div>
      </section>

      {/* =========================================================================
          8. TRUST BAR (Below Hero)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#E7E5E4] p-6 sm:p-8 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#E7E5E4]">
          
          {/* Trust item 1 */}
          <div className="flex items-start gap-3.5 pt-4 sm:pt-0 sm:px-4 first:pt-0 first:px-0">
            <div className="w-9 h-9 rounded-xl bg-[#FFF7ED] border border-[#F97316]/30 flex items-center justify-center shrink-0 text-[#F97316]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#171717]">
                SECURE BOOKING
              </h4>
              <p className="text-xs text-[#737373] mt-1 leading-snug">
                Your payments are protected.
              </p>
            </div>
          </div>

          {/* Trust item 2 */}
          <div className="flex items-start gap-3.5 pt-4 sm:pt-0 sm:px-4">
            <div className="w-9 h-9 rounded-xl bg-[#FFF7ED] border border-[#F97316]/30 flex items-center justify-center shrink-0 text-[#F97316]">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#171717]">
                DIGITAL TICKETS
              </h4>
              <p className="text-xs text-[#737373] mt-1 leading-snug">
                Get your QR ticket instantly.
              </p>
            </div>
          </div>

          {/* Trust item 3 */}
          <div className="flex items-start gap-3.5 pt-4 sm:pt-0 sm:px-4">
            <div className="w-9 h-9 rounded-xl bg-[#FFF7ED] border border-[#F97316]/30 flex items-center justify-center shrink-0 text-[#F97316]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#171717]">
                VERIFIED ORGANIZERS
              </h4>
              <p className="text-xs text-[#737373] mt-1 leading-snug">
                Book from trusted organizers.
              </p>
            </div>
          </div>

          {/* Trust item 4 */}
          <div className="flex items-start gap-3.5 pt-4 sm:pt-0 sm:px-4">
            <div className="w-9 h-9 rounded-xl bg-[#FFF7ED] border border-[#F97316]/30 flex items-center justify-center shrink-0 text-[#F97316]">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#171717]">
                24/7 SUPPORT
              </h4>
              <p className="text-xs text-[#737373] mt-1 leading-snug">
                We're here when you need us.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          9. POPULAR ADVENTURES
          Maasai Mara Safari (KSh 8,500)
          Mount Kenya Hiking Adventure (KSh 6,500)
          Diani Beach Escape (KSh 7,500)
          Lake Naivasha Camping (KSh 5,500)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E7E5E4] gap-2">
          <div>
            <span className="text-xs uppercase font-black tracking-widest text-[#F97316] block">
              TOP BOOKINGS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] mt-1">
              POPULAR ADVENTURES
            </h2>
            <p className="text-xs sm:text-sm text-[#737373] mt-1">
              The trips everyone is booking.
            </p>
          </div>

          <button
            onClick={onOpenExplore}
            className="text-xs font-bold text-[#171717] hover:text-[#F97316] flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <span>View All Popular</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Clean Adventure Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularTrips.map((adv) => (
            <AdventureCard
              key={adv.id}
              adventure={adv}
              isSaved={savedIds.includes(adv.id)}
              onToggleSave={onToggleSave}
              onSelect={onSelectAdventure}
              onQuickBook={onQuickBook}
            />
          ))}
        </div>
      </section>

      {/* =========================================================================
          11. FEATURED ADVENTURE (Large Editorial 60/40 Section)
          One side: Large cinematic image
          Other side:
          FEATURED ADVENTURE
          NGONG HILLS ADVENTURE
          Nairobi, Kenya
          ★★★★★ 4.8
          Saturday
          1 Day
          From KSh 1,500
          12 seats left
          [ VIEW ADVENTURE ]
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E7E5E4] overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">
          
          {/* Large Cinematic Image (60%) */}
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[500px] bg-[#171717] overflow-hidden">
            <img
              src={ngongHillsTrip.featuredImage}
              alt="Ngong Hills Adventure Kenya"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center hover:scale-103 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1.5 bg-[#F97316] text-white text-[11px] font-black uppercase tracking-widest rounded-lg shadow-md">
                FEATURED ADVENTURE
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
              <span className="font-semibold bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/10">
                Great Rift Valley 7-Peaks Ridge Trek · Kona Baridi
              </span>
            </div>
          </div>

          {/* Editorial Feature Details (40%) */}
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6 bg-white">
            <div className="space-y-4">
              
              <div className="space-y-1.5">
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#F97316]">
                  EDITOR’S PICK
                </span>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#171717] leading-tight">
                  NGONG HILLS ADVENTURE
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-[#737373] pt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
                  <span className="font-semibold text-[#171717]">Nairobi, Kenya</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="font-black text-[#171717]">4.8</span>
                <span className="text-[#737373]">(164 verified reviews)</span>
              </div>

              <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
                Hike all 7 rolling green peaks overlooking the Great Rift Valley drop. Towering wind turbines, crisp mountain breezes, and an open trail social make this Kenya’s favorite Saturday escape.
              </p>

              {/* Metadata highlight grid */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-[#FAF7F2] border border-[#E7E5E4] text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#737373] block">Schedule</span>
                  <span className="font-bold text-[#171717] block mt-0.5">Saturday · 1 Day</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#737373] block">Starting Rate</span>
                  <span className="font-black text-[#F97316] text-base block mt-0.5">From KSh 1,500</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#737373] pt-1">
                <span>Available seats: <strong className="text-[#171717] font-bold">12 seats left</strong></span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Guaranteed Departure</span>
                </span>
              </div>
            </div>

            {/* Actions: VIEW ADVENTURE & BOOK NOW */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onSelectAdventure(ngongHillsTrip)}
                className="w-full sm:w-auto flex-1 py-3.5 px-6 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-sm text-center flex items-center justify-center gap-2"
              >
                <span>VIEW ADVENTURE</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onQuickBook(ngongHillsTrip)}
                className="w-full sm:w-auto py-3.5 px-6 border-2 border-[#171717] hover:bg-[#171717] hover:text-white text-[#171717] text-xs font-black uppercase tracking-wider rounded-xl transition-colors cursor-pointer text-center"
              >
                BOOK NOW
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          12. EXPLORE BY EXPERIENCE (Visual Categories)
          Hiking & Outdoor | Safari & Wildlife | Beach Escapes | Road Trips | Camping | Cultural Experiences | Water Activities
          ========================================================================= */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E7E5E4] gap-2">
          <div>
            <span className="text-xs uppercase font-black tracking-widest text-[#F97316] block">
              CURATED WAYS TO EXPLORE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] mt-1">
              EXPLORE BY EXPERIENCE
            </h2>
            <p className="text-xs sm:text-sm text-[#737373] mt-1">
              Different ways to experience Kenya.
            </p>
          </div>

          <button
            onClick={onOpenExplore}
            className="text-xs font-bold text-[#171717] hover:text-[#F97316] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 7 Photographic Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {EXPERIENCE_CATEGORIES.map((cat) => (
            <div
              key={cat.name}
              onClick={() => onExploreCategory(cat.name)}
              className="group relative rounded-xl overflow-hidden aspect-[3/4] cursor-pointer bg-[#171717] shadow-xs hover:shadow-md transition-all border border-[#E7E5E4]"
            >
              <img
                src={cat.image}
                alt={cat.name}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="absolute bottom-3 inset-x-3 text-white">
                <span className="text-[10px] font-mono text-[#F97316] font-bold block">
                  {cat.count}
                </span>
                <h3 className="text-xs sm:text-sm font-black leading-snug group-hover:text-[#F97316] transition-colors mt-0.5">
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          13. TRENDING THIS WEEK (Horizontal Marketplace Rail)
          Hell's Gate Cycling | Naivasha Boat Ride | Mombasa Beach Escape | Amboseli Safari
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E7E5E4] gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-ping" />
              <span className="text-xs uppercase font-black tracking-widest text-[#EA580C]">
                LIVE BOOKING DEMAND
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">
              TRENDING THIS WEEK
            </h2>
            <p className="text-xs sm:text-sm text-[#737373] mt-1">
              What people are booking right now.
            </p>
          </div>

          <button
            onClick={onOpenExplore}
            className="text-xs font-bold text-[#171717] hover:text-[#F97316] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View All Trending</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal Marketplace Trip Rail */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingRailTrips.map((adv) => (
            <div
              key={adv.id}
              onClick={() => onSelectAdventure(adv)}
              className="group bg-white rounded-xl border border-[#E7E5E4] overflow-hidden hover:border-[#F97316]/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img
                    src={adv.featuredImage}
                    alt={adv.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {adv.category}
                  </div>
                  <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{adv.rating.toFixed(1)}</span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="text-base font-extrabold text-[#171717] group-hover:text-[#F97316] transition-colors leading-snug">
                    {adv.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-[#737373]">
                    <span className="truncate">{adv.destination}</span>
                    <span className="font-bold text-[#171717]">{adv.availableSeats} seats left</span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center justify-between border-t border-[#E7E5E4] mt-2">
                <span className="font-black text-[#F97316] text-base">
                  {formatKSh(adv.pricePerPerson)}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickBook(adv);
                  }}
                  className="px-3 py-1.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-[11px] font-bold uppercase rounded-lg transition-colors"
                >
                  Book Seat
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          14. LIVE OVERLAND DEPARTURES MANIFEST (Terminal Board Experience)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DepartureBoard
          adventures={weekendTrips.slice(0, 5)}
          onSelectAdventure={onSelectAdventure}
          onQuickBook={onQuickBook}
        />
      </section>

      {/* =========================================================================
          15. WEEKEND ESCAPES (Large Destination Photography + Floating Panel)
          DIANI BEACH GETAWAY | 2 Days · 1 Night | KSh 7,500 | [ EXPLORE ]
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#171717] text-white min-h-[440px] sm:min-h-[480px] shadow-2xl border border-neutral-800 flex items-end">
          
          <img
            src={dianiGetawayTrip.featuredImage}
            alt="Diani Beach Getaway Kenya"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          {/* Top Tag */}
          <div className="absolute top-6 left-6 z-10">
            <span className="px-3.5 py-1.5 bg-white/20 backdrop-blur-md border border-white/25 rounded-full text-xs font-black uppercase tracking-wider text-white">
              WEEKEND ESCAPES
            </span>
          </div>

          {/* Floating Trip Information Panel (Editorial) */}
          <div className="relative z-10 m-6 sm:m-10 max-w-xl bg-white text-[#171717] rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#E7E5E4] space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#F97316] block">
                Short trips. Big memories.
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#171717] mt-1 leading-tight">
                DIANI BEACH GETAWAY
              </h3>
              <p className="text-xs text-[#737373] mt-1">
                2 Days · 1 Night · Indian Ocean turquoise channels, SGR express connection, and white powder sands.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#E7E5E4]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#737373] block">Starting from</span>
                <span className="text-xl font-black text-[#F97316] font-mono">
                  KSh 7,500
                </span>
              </div>

              <button
                onClick={() => onSelectAdventure(dianiGetawayTrip)}
                className="px-6 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-1.5"
              >
                <span>EXPLORE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          16. OTHER DISCOVERY COLLECTIONS (Varied Layouts)
          ADVENTURES UNDER KSH 2,000 | SUNRISE ADVENTURES
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Collection 1: ADVENTURES UNDER KSH 2,000 */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 border-b border-[#E7E5E4] gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-[#F97316]" />
                <span className="text-xs uppercase font-black tracking-widest text-[#F97316]">
                  HIGH VALUE DEPARTURES
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">
                ADVENTURES UNDER KSH 2,000
              </h2>
              <p className="text-xs sm:text-sm text-[#737373] mt-1">
                Budget-friendly day escapes right from Nairobi.
              </p>
            </div>

            <button
              onClick={onOpenExplore}
              className="text-xs font-bold text-[#171717] hover:text-[#F97316] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>See All Under 2K</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {under2000Trips.map((adv) => (
              <div
                key={adv.id}
                onClick={() => onSelectAdventure(adv)}
                className="group p-4 bg-white rounded-xl border border-[#E7E5E4] hover:border-[#F97316] transition-all cursor-pointer shadow-xs flex items-center gap-4"
              >
                <img
                  src={adv.featuredImage}
                  alt={adv.title}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0 space-y-1 flex-1">
                  <span className="text-[10px] font-bold text-[#F97316] uppercase">{adv.destination}</span>
                  <h4 className="text-sm font-bold text-[#171717] group-hover:text-[#F97316] transition-colors truncate">
                    {adv.title}
                  </h4>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-black text-[#171717]">{formatKSh(adv.pricePerPerson)}</span>
                    <span className="text-[10px] text-[#737373] font-bold">{adv.availableSeats} slots</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collection 2: SUNRISE ADVENTURES */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 border-b border-[#E7E5E4] gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sunrise className="w-4 h-4 text-[#F97316]" />
                <span className="text-xs uppercase font-black tracking-widest text-[#F97316]">
                  DAWN CRATER & SUMMITS
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717]">
                SUNRISE ADVENTURES
              </h2>
              <p className="text-xs sm:text-sm text-[#737373] mt-1">
                Early wake-ups rewarded with golden equatorial horizons.
              </p>
            </div>

            <button
              onClick={onOpenExplore}
              className="text-xs font-bold text-[#171717] hover:text-[#F97316] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Explore Sunrise</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {sunriseTrips.map((adv) => (
              <AdventureCard
                key={adv.id}
                adventure={adv}
                isSaved={savedIds.includes(adv.id)}
                onToggleSave={onToggleSave}
                onSelect={onSelectAdventure}
                onQuickBook={onQuickBook}
              />
            ))}
          </div>
        </div>

      </section>

      {/* =========================================================================
          17. DESTINATIONS (Asymmetric Editorial Photography)
          WHERE WILL YOU GO NEXT?
          Nairobi | Naivasha | Diani | Mombasa | Maasai Mara | Amboseli | Mount Kenya
          ========================================================================= */}
      <section id="destinations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#E7E5E4] gap-2">
          <div>
            <span className="text-xs uppercase font-black tracking-widest text-[#F97316] block">
              KENYA DESTINATIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] mt-1">
              WHERE WILL YOU GO NEXT?
            </h2>
            <p className="text-xs sm:text-sm text-[#737373] mt-1">
              Explore trips starting from or staged in Kenya’s most scenic regions.
            </p>
          </div>

          <button
            onClick={onOpenExplore}
            className="text-xs font-bold text-[#171717] hover:text-[#F97316] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>All Destinations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Asymmetrical Editorial Photography Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5">
          {EDITORIAL_DESTINATIONS.map((dest) => {
            const colSpan = dest.size === 'large' 
              ? 'lg:col-span-6' 
              : 'lg:col-span-3';

            return (
              <div
                key={dest.name}
                onClick={() => onExploreDestination(dest.name)}
                className={`${colSpan} group relative rounded-2xl overflow-hidden min-h-[240px] sm:min-h-[280px] cursor-pointer bg-[#171717] shadow-sm hover:shadow-md transition-all border border-[#E7E5E4]`}
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-bold text-white/90 bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-md">
                    {dest.count} Trips
                  </span>
                </div>

                <div className="absolute bottom-4 inset-x-4 text-white space-y-1">
                  <span className="text-[10px] font-bold text-[#F97316] uppercase tracking-wider block">
                    {dest.region}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold group-hover:text-[#F97316] transition-colors leading-tight">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-1">
                    {dest.tagline}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          18. HOW IT WORKS (Clean 5-Step Process + Check In)
          01 DISCOVER | 02 CHOOSE | 03 BOOK | 04 PAY | 05 GET YOUR TICKET | CHECK IN
          ========================================================================= */}
      <section id="how-it-works" className="bg-[#FAF7F2] py-16 sm:py-20 border-y border-[#E7E5E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-xl">
            <span className="text-xs uppercase font-black tracking-widest text-[#F97316] block">
              MARKETPLACE WORKFLOW
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171717] mt-1">
              HOW IT WORKS
            </h2>
            <p className="text-xs sm:text-sm text-[#737373] mt-1">
              From choosing your weekend adventure to scanning your ticket on departure morning.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            
            {/* Step 1 */}
            <div className="p-6 bg-white rounded-xl border border-[#E7E5E4] space-y-3 shadow-xs">
              <span className="text-xl font-black text-[#F97316]">01</span>
              <h3 className="text-sm font-extrabold uppercase text-[#171717] tracking-wider">
                DISCOVER
              </h3>
              <p className="text-xs text-[#737373] leading-relaxed">
                Find an adventure.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 bg-white rounded-xl border border-[#E7E5E4] space-y-3 shadow-xs">
              <span className="text-xl font-black text-[#F97316]">02</span>
              <h3 className="text-sm font-extrabold uppercase text-[#171717] tracking-wider">
                CHOOSE
              </h3>
              <p className="text-xs text-[#737373] leading-relaxed">
                Select your trip and date.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 bg-white rounded-xl border border-[#E7E5E4] space-y-3 shadow-xs">
              <span className="text-xl font-black text-[#F97316]">03</span>
              <h3 className="text-sm font-extrabold uppercase text-[#171717] tracking-wider">
                BOOK
              </h3>
              <p className="text-xs text-[#737373] leading-relaxed">
                Reserve your seats.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 bg-white rounded-xl border border-[#E7E5E4] space-y-3 shadow-xs">
              <span className="text-xl font-black text-[#F97316]">04</span>
              <h3 className="text-sm font-extrabold uppercase text-[#171717] tracking-wider">
                PAY
              </h3>
              <p className="text-xs text-[#737373] leading-relaxed">
                Pay securely online.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-6 bg-white rounded-xl border border-[#E7E5E4] space-y-3 shadow-xs">
              <span className="text-xl font-black text-[#F97316]">05</span>
              <h3 className="text-sm font-extrabold uppercase text-[#171717] tracking-wider">
                GET YOUR TICKET
              </h3>
              <p className="text-xs text-[#737373] leading-relaxed">
                Receive your digital QR ticket.
              </p>
            </div>

          </div>

          {/* Then: CHECK IN Highlight */}
          <div className="p-5 bg-white rounded-xl border border-[#F97316]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F97316] text-white flex items-center justify-center font-black">
                ✓
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-[#171717] uppercase tracking-wide">
                  CHECK IN ON DEPARTURE DAY
                </h4>
                <p className="text-xs text-[#737373] mt-0.5">
                  Organizer scans your QR code when you arrive at the pickup point.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenExplore}
              className="px-5 py-2.5 bg-[#171717] text-white text-xs font-bold uppercase rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Explore Available Dates
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          19. ORGANIZER SECTION (Visually Distinct Dark Section)
          HAVE AN ADVENTURE TO HOST?
          Create trips | Set prices | Manage seats | Manage bookings | Receive payments | Verify tickets | Track earnings
          Button: START SELLING
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#171717] text-white rounded-2xl sm:rounded-3xl p-8 sm:p-14 border border-neutral-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-black uppercase tracking-widest text-[#F97316] block">
              FOR TRIP ORGANIZERS & GUIDES
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              HAVE AN ADVENTURE TO HOST?
            </h2>
            <p className="text-sm text-[#FAF7F2]/80 leading-relaxed max-w-xl">
              Publish your trips, fill seats fast, and give your guests instant digital tickets. We provide the complete booking and payments infrastructure for Kenyan tour operators.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-medium text-white/90">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F97316] shrink-0" />
                <span>Create trips</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F97316] shrink-0" />
                <span>Set prices</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F97316] shrink-0" />
                <span>Manage seats</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F97316] shrink-0" />
                <span>Manage bookings</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F97316] shrink-0" />
                <span>Receive payments</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F97316] shrink-0" />
                <span>Verify tickets</span>
              </li>
              <li className="flex items-center gap-2 sm:col-span-2">
                <CheckCircle2 className="w-4 h-4 text-[#F97316] shrink-0" />
                <span>Track earnings</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5 flex lg:justify-end">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 w-full max-w-md space-y-5 text-center">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#F97316] uppercase">Fast Partner Onboarding</span>
                <p className="text-base font-extrabold text-white">Join Verified Kenyan Tour Clubs</p>
              </div>

              <button
                onClick={() => setOrganizerModalOpen(true)}
                className="w-full py-4 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
              >
                <span>START SELLING</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-white/60">
                TRA / MCK license validation required before publishing departures.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          20. FINAL CTA (Impressive Sunset Adventure Photograph)
          Headline: YOUR NEXT ADVENTURE IS WAITING.
          Supporting text: Discover new places, meet new people and book unforgettable experiences.
          Button: EXPLORE ADVENTURES
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#171717] text-white p-10 sm:p-16 lg:p-20 text-center border border-neutral-800 shadow-2xl">
          
          <img
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=85"
            alt="African Savannah Sunset Adventure"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/80 to-[#171717]/60" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-widest font-black text-[#F97316] block">
              READY FOR THE OUTDOORS?
            </span>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              YOUR NEXT ADVENTURE <br />
              IS WAITING.
            </h2>

            <p className="text-xs sm:text-base text-[#FAF7F2]/80 leading-relaxed max-w-lg mx-auto font-medium">
              Discover new places, meet new people and book unforgettable experiences.
            </p>

            <div className="pt-2 flex justify-center">
              <button
                onClick={onOpenExplore}
                className="px-8 py-4 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-xl flex items-center gap-2"
              >
                <span>EXPLORE ADVENTURES</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Organizer Registration Modal */}
      {organizerModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E7E5E4] p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
              <div>
                <span className="text-[10px] font-bold text-[#F97316] uppercase tracking-wider block">
                  Host Onboarding
                </span>
                <h3 className="text-lg font-bold text-[#171717]">Start Selling on the Platform</h3>
              </div>
              <button
                onClick={() => {
                  setOrganizerModalOpen(false);
                  setOrganizerSubmitted(false);
                }}
                className="text-[#737373] hover:text-[#171717] text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {organizerSubmitted ? (
              <div className="p-6 text-center space-y-3 bg-[#FFF7ED] rounded-xl border border-[#F97316]/30">
                <CheckCircle2 className="w-10 h-10 text-[#F97316] mx-auto" />
                <h4 className="text-sm font-bold text-[#171717]">Application Received!</h4>
                <p className="text-xs text-[#737373]">
                  Our partner team will verify your credentials within 24 hours to activate your organizer portal.
                </p>
                <button
                  onClick={() => {
                    setOrganizerModalOpen(false);
                    setOrganizerSubmitted(false);
                  }}
                  className="px-5 py-2.5 bg-[#F97316] text-white text-xs font-bold rounded-xl"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setOrganizerSubmitted(true);
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="block font-bold text-[#171717] mb-1">Tour Club or Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rift Wanderers Overland"
                    className="w-full px-3.5 py-2.5 border border-[#E7E5E4] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#171717] mb-1">Contact Email</label>
                  <input
                    type="email"
                    required
                    placeholder="organizer@trips.ke"
                    className="w-full px-3.5 py-2.5 border border-[#E7E5E4] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#171717] mb-1">Phone Number (M-Pesa Business)</label>
                  <input
                    type="tel"
                    required
                    placeholder="+254 7XX XXX XXX"
                    className="w-full px-3.5 py-2.5 border border-[#E7E5E4] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#171717] mb-1">Primary Trips Hosted</label>
                  <select className="w-full px-3.5 py-2.5 border border-[#E7E5E4] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#F97316] bg-white">
                    <option>Day Hikes & Outdoor Trails</option>
                    <option>Overnight Bush Camps & Camping</option>
                    <option>Safari Expeditions & 4x4 Trips</option>
                    <option>Beach Escapes & Marine Dhows</option>
                    <option>Mount Kenya Summits</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#F97316] hover:bg-[#EA580C] text-white font-extrabold uppercase tracking-wider rounded-xl cursor-pointer transition-colors shadow-sm"
                  >
                    SUBMIT APPLICATION
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
