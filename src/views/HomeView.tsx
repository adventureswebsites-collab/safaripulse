import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  MapPin, Calendar, Clock, Star, ArrowRight, 
  CheckCircle2, Heart, Sparkles, Compass, 
  Users, Zap, ChevronRight, Sunrise, DollarSign, Flame, Search,
  ChevronLeft
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

  // Hero Autoplay Carousel Slide Definition
  interface HeroSlide {
    id: string;
    adventureId: string;
    bgImage: string;
    locationBadge: string;
    title: string;
    dateText: string;
    timeText: string;
    locationText: string;
    price: number;
    priceFormatted: string;
    vibe: HeroVibe;
    rating: number;
    availableSeats: number;
    badge: string;
  }

  const heroSlides: HeroSlide[] = [
    {
      id: 'slide-ngong-hills',
      adventureId: 'adv-ngonghills-08',
      bgImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85',
      locationBadge: 'Ngong Hills Ridge Trail · Nairobi Environs',
      title: 'NGONG HILLS ADVENTURE',
      dateText: 'Saturday',
      timeText: '8:00 AM',
      locationText: 'Nairobi',
      price: 1500,
      priceFormatted: 'KSh 1,500',
      vibe: 'GET OUTSIDE',
      rating: 4.8,
      availableSeats: 12,
      badge: 'Guaranteed Departure'
    },
    {
      id: 'slide-karura-forest',
      adventureId: 'adv-karura-09',
      bgImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=85',
      locationBadge: 'Karura Forest Canopy Trail · Nairobi Sanctuary',
      title: 'KARURA FOREST ADVENTURE',
      dateText: 'Sunday',
      timeText: '9:00 AM',
      locationText: 'Nairobi',
      price: 1200,
      priceFormatted: 'KSh 1,200',
      vibe: 'ESCAPE',
      rating: 4.9,
      availableSeats: 8,
      badge: 'Guaranteed Departure'
    },
    {
      id: 'slide-longonot-crater',
      adventureId: 'adv-longonot-sunrise',
      bgImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85',
      locationBadge: 'Mount Longonot Crater Rim · Great Rift Valley',
      title: 'MOUNT LONGONOT ADVENTURE',
      dateText: 'Saturday',
      timeText: '6:30 AM',
      locationText: 'Naivasha',
      price: 2500,
      priceFormatted: 'KSh 2,500',
      vibe: 'GET ACTIVE',
      rating: 4.89,
      availableSeats: 6,
      badge: 'Guaranteed Departure'
    }
  ];

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchDiffXRef = useRef<number>(0);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const goToNextSlide = useCallback(() => {
    setActiveSlideIndex((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const goToPrevSlide = useCallback(() => {
    setActiveSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, [heroSlides.length]);

  // Autoplay timer: every 4.5 seconds when not paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      goToNextSlide();
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, goToNextSlide]);

  // Sync selected vibe if user clicks a vibe button
  const currentActiveSlide = heroSlides[activeSlideIndex];
  const activeSlideAdventure = ADVENTURES.find(a => a.id === currentActiveSlide.adventureId) || ADVENTURES[0];

  // Pause interactions handler
  const handleInteractionStart = () => {
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    setIsPaused(true);
  };

  const handleInteractionEnd = () => {
    // Resume autoplay after 3 seconds of inactivity
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 3000);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    handleInteractionStart();
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    touchDiffXRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = touchStartXRef.current - currentX;
    const diffY = touchStartYRef.current - currentY;
    
    // Only capture horizontal swipes if predominantly horizontal
    if (Math.abs(diffX) > Math.abs(diffY)) {
      touchDiffXRef.current = diffX;
    }
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDiffXRef.current) > 40) {
      if (touchDiffXRef.current > 0) {
        goToNextSlide();
      } else {
        goToPrevSlide();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    touchDiffXRef.current = 0;
    handleInteractionEnd();
  };

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
    <div className="space-y-8 sm:space-y-12 lg:space-y-16 pb-16">

      {/* =========================================================================
          5. HERO SECTION (Compact Mobile Hero with Autoplay / Swipe Carousel + Synchronized Floating Breakout Card)
          ========================================================================= */}
      <section 
        className="relative px-3 sm:px-6 lg:px-8 pt-2.5 sm:pt-5 mb-7 sm:mb-9 lg:mb-0 select-none"
        onMouseEnter={handleInteractionStart}
        onMouseLeave={handleInteractionEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="max-w-7xl mx-auto relative">
          
          {/* Main Dark Hero Container - overflow-visible on mobile so the floating card can break out */}
          <div className="relative rounded-2xl sm:rounded-3xl bg-[#171717] text-white p-3.5 xs:p-4.5 sm:p-8 lg:p-10 border border-neutral-800 shadow-2xl min-h-0 lg:min-h-[540px] flex flex-col justify-between">
            
            {/* Dramatic African Adventure Photograph Background Carousel (Clipped inside with rounded corners) */}
            <div className="absolute inset-0 z-0 rounded-2xl sm:rounded-3xl overflow-hidden pointer-events-none">
              {heroSlides.map((slide, index) => {
                const isActive = index === activeSlideIndex;
                return (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={slide.bgImage}
                      alt={slide.locationBadge}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover object-center transition-transform duration-7000 ease-out ${
                        isActive ? 'scale-105' : 'scale-100'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/80 to-black/45" />
                    <div className="absolute inset-0 bg-black/25" />
                  </div>
                );
              })}
            </div>

            {/* Top Bar inside Hero: Dynamic Location pill & Live Marketplace status */}
            <div className="relative z-20 flex items-center justify-between gap-3 mb-1.5 sm:mb-0">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-semibold text-white/90 transition-all duration-300">
                <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F97316] shrink-0" />
                <span className="truncate max-w-[210px] xs:max-w-none">
                  {currentActiveSlide.locationBadge}
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-[11px] font-bold text-[#FAF7F2]/80 bg-black/40 backdrop-blur-xs px-3 py-1 rounded-full border border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
                <span>Live Marketplace · Instant Lipa Na M-PESA</span>
              </div>
            </div>

            {/* Middle Main Composition */}
            <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 my-1.5 sm:my-5 items-center">
              
              {/* Left Column: Personality-Driven Interactive Headline (Span 7) */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                
                {/* 3. Small eyebrow */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F97316]/20 border border-[#F97316]/40 text-[#F97316] text-[10px] sm:text-xs font-black tracking-wider uppercase w-fit mb-1 sm:mb-2.5">
                  <Sparkles className="w-3 h-3 fill-current shrink-0" />
                  <span>DISCOVER SOMETHING TO DO</span>
                </div>

                {/* 4. Main headline */}
                <h1 className="text-[34px] xs:text-[38px] sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[0.96] sm:leading-[1.04] mb-1 sm:mb-2.5">
                  WHAT ARE YOU <br className="sm:hidden" />
                  <span className="text-white">UP FOR?</span>
                </h1>

                {/* 5. Subtitle */}
                <p className="text-[13px] xs:text-sm sm:text-lg text-[#FAF7F2]/90 max-w-[290px] sm:max-w-xl font-medium leading-snug sm:leading-relaxed mb-2 sm:mb-3.5">
                  Find something worth leaving home for.
                </p>

                {/* 6. Adventure vibe filters */}
                <div className="mb-3 sm:mb-0">
                  <span className="hidden sm:block text-[10px] uppercase font-bold tracking-widest text-[#FAF7F2]/60 mb-1.5">
                    CHOOSE YOUR ADVENTURE VIBE:
                  </span>

                  <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none pb-0.5 -mx-1 px-1 sm:mx-0 sm:px-0 sm:flex-wrap">
                    {(['GET OUTSIDE', 'ESCAPE', 'GET ACTIVE', 'WEEKEND AWAY', 'DISCOVER'] as HeroVibe[]).map((vibe) => {
                      const isSelected = selectedVibe === vibe;
                      return (
                        <button
                          key={vibe}
                          onClick={() => {
                            setSelectedVibe(vibe);
                            // Also switch to corresponding slide if available
                            const matchingIndex = heroSlides.findIndex(s => s.vibe === vibe);
                            if (matchingIndex !== -1) {
                              setActiveSlideIndex(matchingIndex);
                            }
                          }}
                          className={`h-[38px] sm:h-[42px] px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full sm:rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer shrink-0 min-h-[38px] sm:min-h-[42px] flex items-center whitespace-nowrap ${
                            isSelected
                              ? 'bg-[#F97316] text-white shadow-md shadow-[#F97316]/30 ring-2 ring-[#EA580C]'
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

              {/* Right Column: Desktop Featured Trip Preview inside Hero (Hidden on mobile, Visible on lg+) */}
              <div className="hidden lg:block lg:col-span-5 space-y-4">
                
                {/* 6. FEATURED TRIP PREVIEW INSIDE HERO (Desktop synchronized with carousel) */}
                <div className="bg-white text-[#171717] rounded-2xl p-5 shadow-2xl border border-[#E7E5E4] space-y-3.5 transition-all duration-300">
                  <div className="flex items-center justify-between pb-2.5 border-b border-[#E7E5E4]">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] animate-ping" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#F97316]">
                        THIS WEEKEND
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {currentActiveSlide.badge}
                    </span>
                  </div>

                  <div className="flex gap-3.5">
                    <img
                      src={activeSlideAdventure.featuredImage || currentActiveSlide.bgImage}
                      alt={currentActiveSlide.title}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 rounded-xl object-cover shrink-0 border border-[#E7E5E4]"
                    />
                    <div className="min-w-0 space-y-1">
                      <h3 className="text-base sm:text-lg font-black text-[#171717] truncate leading-tight">
                        {currentActiveSlide.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#737373]">
                        <Clock className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
                        <span>{currentActiveSlide.dateText} · {currentActiveSlide.timeText}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#737373]">
                        <MapPin className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
                        <span>{currentActiveSlide.locationText}, Kenya</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating, Price & Seats metadata */}
                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E7E5E4] text-center text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#737373] block">Rating</span>
                      <span className="font-extrabold text-[#171717] flex items-center justify-center gap-0.5 mt-0.5">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{currentActiveSlide.rating}</span>
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#737373] block">Rate</span>
                      <span className="font-black text-[#F97316] text-sm mt-0.5 block">
                        {currentActiveSlide.priceFormatted}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#737373] block">Availability</span>
                      <span className="font-bold text-[#171717] mt-0.5 block">
                        {currentActiveSlide.availableSeats} seats left
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => onQuickBook(activeSlideAdventure)}
                    className="w-full py-3 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 active:scale-[0.99]"
                  >
                    <span>BOOK THIS ADVENTURE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>

            {/* Bottom Row inside Hero: Desktop Quick Category shortcuts + Carousel Pagination Controls */}
            <div className="relative z-20 pt-2 sm:pt-3.5 border-t border-white/10 flex items-center justify-between gap-3 text-xs text-white/80">
              
              {/* Pagination Dots (Mobile & Desktop indicators) */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {heroSlides.map((slide, idx) => {
                  const isActive = idx === activeSlideIndex;
                  return (
                    <button
                      key={slide.id}
                      onClick={() => {
                        setActiveSlideIndex(idx);
                        setSelectedVibe(slide.vibe);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'w-6 bg-[#F97316]'
                          : 'w-2 bg-white/30 hover:bg-white/60'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  );
                })}
                <span className="text-[10px] font-bold text-white/60 ml-1 hidden xs:inline">
                  {activeSlideIndex + 1}/{heroSlides.length}
                </span>
              </div>

              {/* Desktop category shortcut chips */}
              <div className="hidden lg:flex items-center gap-2">
                <span className="font-bold text-[#FAF7F2] mr-1">
                  Instant Discovery:
                </span>
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

              {/* Prev / Next controls for desktop */}
              <div className="hidden sm:flex items-center gap-1 text-white/70">
                <button
                  onClick={goToPrevSlide}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={goToNextSlide}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

          {/* =========================================================================
              FLOATING BREAKOUT CARD (Mobile Only - breaks out of hero bottom edge)
              - Absolute positioning overlapping the bottom edge of the hero container
              - Approximately 35-45% extends below the hero's bottom edge (translate-y-[40%])
              - Clean white background, rounded-[14px] to rounded-[16px], subtle shadow
              - 90-92% width on mobile, centered horizontally (left-1/2 -translate-x-1/2)
              - High z-index (z-30) so it layers prominently above the hero border
              - Synchronized dynamically with the active slide in the carousel!
              ========================================================================= */}
          <div 
            onClick={() => onQuickBook(activeSlideAdventure)}
            className="block lg:hidden absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[40%] z-30 w-[91%] max-w-[420px] bg-white text-[#171717] rounded-[15px] p-2.5 shadow-xl shadow-black/15 border border-[#E7E5E4] cursor-pointer hover:border-[#F97316] transition-all duration-300 group active:scale-[0.98]"
          >
            <div className="flex items-center gap-2.5">
              {/* Small thumbnail around 56-64px square */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-[#E7E5E4]/80">
                <img
                  src={activeSlideAdventure.featuredImage || currentActiveSlide.bgImage}
                  alt={currentActiveSlide.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content to the right of the image */}
              <div className="min-w-0 flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-between gap-1.5 mb-0.5">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-ping" />
                    <span className="text-[9px] font-black uppercase tracking-wider text-[#F97316]">
                      THIS WEEKEND
                    </span>
                  </div>
                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 leading-none">
                    {currentActiveSlide.badge}
                  </span>
                </div>

                <h3 className="text-[13px] sm:text-sm font-black text-[#171717] truncate leading-tight group-hover:text-[#F97316] transition-colors">
                  {currentActiveSlide.title}
                </h3>

                <div className="flex items-center justify-between gap-1 mt-0.5 text-[11px] text-[#737373]">
                  <span className="truncate">
                    {currentActiveSlide.dateText} · {currentActiveSlide.timeText} · {currentActiveSlide.locationText}
                  </span>
                  <span className="font-black text-[#F97316] text-xs shrink-0">
                    {currentActiveSlide.priceFormatted}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. MOBILE SEARCH (Large touch target opens full-screen mobile search)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div
          onClick={() => {
            if (onOpenSearchModal) onOpenSearchModal();
            else onOpenExplore();
          }}
          className="bg-white rounded-2xl p-2.5 sm:p-3.5 border-2 border-[#E7E5E4] hover:border-[#F97316] shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 min-h-[50px] sm:min-h-[56px] group"
        >
          <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FFF7ED] text-[#F97316] flex items-center justify-center shrink-0">
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs sm:text-sm lg:text-base font-bold text-[#171717] block truncate">
                What adventure are you looking for?
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#737373] block truncate">
                Search by hike, safari, destination or organizer
              </span>
            </div>
          </div>

          <div className="px-3.5 sm:px-4 py-2 bg-[#F97316] group-hover:bg-[#EA580C] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-colors shrink-0 flex items-center gap-1.5 shadow-xs min-h-[40px] sm:min-h-[44px]">
            <span>Search</span>
            <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. QUICK DISCOVERY (Horizontally scrollable filters for one-handed thumb tap)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 -mt-3 sm:-mt-5">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1.5 -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
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
                className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer min-h-[40px] sm:min-h-[44px] flex items-center shrink-0 ${
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
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-3 sm:mb-5 pb-2.5 sm:pb-3 border-b border-[#E7E5E4] gap-2.5">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] animate-ping" />
              <span className="text-[10px] sm:text-xs uppercase font-black tracking-widest text-[#F97316]">
                {activeQuickFilter === 'This Weekend' ? 'GUARANTEED DEPARTURES' : `FILTER: ${activeQuickFilter.toUpperCase()}`}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#171717]">
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
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-3 sm:gap-4 pb-3 -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
          {quickFilteredTrips.map((adv) => {
            const percentBooked = Math.round((adv.bookedSeatsCount / adv.totalSeats) * 100);
            const isSaved = savedIds.includes(adv.id);
            return (
              <div
                key={adv.id}
                onClick={() => onSelectAdventure(adv)}
                className="w-[80vw] sm:w-[310px] md:w-[340px] shrink-0 snap-start bg-white rounded-2xl border border-[#E7E5E4] overflow-hidden hover:border-[#F97316]/50 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
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
                      <span className="bg-[#171717]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
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

                  <div className="p-3.5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-[#737373]">
                      <span className="flex items-center gap-1 truncate font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
                        <span className="truncate">{adv.destination}</span>
                      </span>
                      <span className="font-semibold text-[#171717]">
                        {adv.durationDays === 1 ? '1 Day' : `${adv.durationDays}D / ${adv.durationNights}N`}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-extrabold text-[#171717] hover:text-[#F97316] transition-colors leading-snug line-clamp-2">
                      {adv.title}
                    </h3>

                    <div className="flex items-center gap-1.5 text-xs text-[#737373]">
                      <span className="text-[#171717] font-medium truncate">{adv.organizer.name}</span>
                    </div>

                    {/* Available Seats Bar */}
                    <div className="pt-0.5">
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

                <div className="p-3.5 pt-2 border-t border-[#E7E5E4] flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#737373] block">Starting from</span>
                    <span className="text-base sm:text-lg font-black text-[#171717]">
                      {formatKSh(adv.pricePerPerson)}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickBook(adv);
                    }}
                    className="px-3.5 sm:px-4 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-1.5 min-h-[40px] sm:min-h-[44px]"
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
      <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-center bg-[#FAF7F2] p-2.5 sm:p-5 lg:p-8 rounded-2xl sm:rounded-3xl border border-[#E7E5E4]">
          
          {/* Editorial column: displayed on desktop; hidden on mobile to keep compact mobile preview */}
          <div className="hidden lg:block lg:col-span-5 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]" />
              <span className="text-[10px] sm:text-xs uppercase font-black tracking-widest text-[#F97316]">
                REGIONAL EXPEDITION MAP
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#171717] tracking-tight leading-tight">
              INTERACTIVE KENYA ADVENTURE MAP
            </h2>

            <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
              Explore scheduled overland departures from the Great Rift Valley canyons to Mount Kenya glaciers and turquoise Diani waters. Tap any pin to see available slots and starting prices.
            </p>

            {/* Key Hotspot List */}
            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              {[
                { name: 'Nairobi', info: '14 adventures · From KSh 1,500' },
                { name: 'Naivasha', info: '8 adventures · From KSh 1,200' },
                { name: 'Mount Kenya', info: '9 adventures · From KSh 6,500' },
                { name: 'Maasai Mara', info: '10 adventures · From KSh 8,500' },
                { name: 'Amboseli', info: '7 adventures · From KSh 8,900' },
                { name: 'Diani & Mombasa', info: '14 adventures · From KSh 6,800' }
              ].map((item) => (
                <div key={item.name} className="p-2 sm:p-2.5 bg-white rounded-xl border border-[#E7E5E4]">
                  <strong className="block text-[#171717] font-bold text-[11px] sm:text-xs">{item.name}</strong>
                  <span className="text-[10px] sm:text-[11px] text-[#737373] block mt-0.5 truncate">{item.info}</span>
                </div>
              ))}
            </div>

            <div className="pt-1">
              <button
                onClick={onOpenExplore}
                className="px-4 sm:px-5 py-2.5 sm:py-3 bg-[#171717] hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer inline-flex items-center gap-2 min-h-[42px]"
              >
                <span>BROWSE ALL 7 REGIONS</span>
                <ArrowRight className="w-4 h-4 text-[#F97316]" />
              </button>
            </div>
          </div>

          {/* Compact Map Preview on Mobile / Editorial Column on Desktop */}
          <div className="w-full lg:col-span-7">
            <KenyaAdventureMap onSelectHotspot={onExploreDestination} />
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-3.5 sm:mb-6 pb-2.5 sm:pb-3 border-b border-[#E7E5E4] gap-2">
          <div>
            <span className="text-[10px] sm:text-xs uppercase font-black tracking-widest text-[#F97316] block">
              TOP BOOKINGS
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#171717] mt-0.5">
              POPULAR ADVENTURES
            </h2>
            <p className="text-xs sm:text-sm text-[#737373] mt-0.5">
              The trips everyone is booking.
            </p>
          </div>

          <button
            onClick={onOpenExplore}
            className="text-xs font-bold text-[#171717] hover:text-[#F97316] flex items-center gap-1.5 cursor-pointer transition-colors self-start sm:self-auto min-h-[36px]"
          >
            <span>View All Popular</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 2-column compact grid on Mobile, 2 cols on Tablet, 4 cols on Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-6">
          {popularTrips.map((adv) => (
            <AdventureCard
              key={adv.id}
              adventure={adv}
              isSaved={savedIds.includes(adv.id)}
              onToggleSave={onToggleSave}
              onSelect={onSelectAdventure}
              onQuickBook={onQuickBook}
              compact={true}
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
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E7E5E4] overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12">
          
          {/* Large Cinematic Image (60%) */}
          <div className="lg:col-span-7 relative min-h-[220px] sm:min-h-[320px] lg:min-h-[460px] bg-[#171717] overflow-hidden">
            <img
              src={ngongHillsTrip.featuredImage}
              alt="Ngong Hills Adventure Kenya"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center hover:scale-103 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
              <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 bg-[#F97316] text-white text-[10px] sm:text-[11px] font-black uppercase tracking-widest rounded-lg shadow-md">
                FEATURED ADVENTURE
              </span>
            </div>

            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white text-xs">
              <span className="font-semibold bg-black/60 backdrop-blur-md px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-lg border border-white/10 text-[11px] sm:text-xs">
                Great Rift Valley 7-Peaks Ridge Trek · Kona Baridi
              </span>
            </div>
          </div>

          {/* Editorial Feature Details (40%) */}
          <div className="lg:col-span-5 p-4 sm:p-7 lg:p-9 flex flex-col justify-between space-y-4 sm:space-y-5 bg-white">
            <div className="space-y-3 sm:space-y-3.5">
              
              <div className="space-y-1">
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-[#F97316]">
                  EDITOR’S PICK
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#171717] leading-tight">
                  NGONG HILLS ADVENTURE
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-[#737373] pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
                  <span className="font-semibold text-[#171717]">Nairobi, Kenya</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-0.5 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-black text-[#171717]">4.8</span>
                <span className="text-[#737373]">(164 reviews)</span>
              </div>

              <p className="text-xs sm:text-sm text-[#737373] leading-relaxed">
                Hike all 7 rolling green peaks overlooking the Great Rift Valley drop. Towering wind turbines, crisp mountain breezes, and an open trail social make this Kenya’s favorite Saturday escape.
              </p>

              {/* Metadata highlight grid */}
              <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-[#FAF7F2] border border-[#E7E5E4] text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#737373] block">Schedule</span>
                  <span className="font-bold text-[#171717] block mt-0.5">Saturday · 1 Day</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#737373] block">Starting Rate</span>
                  <span className="font-black text-[#F97316] text-sm sm:text-base block mt-0.5">From KSh 1,500</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#737373] pt-0.5">
                <span>Available seats: <strong className="text-[#171717] font-bold">12 seats left</strong></span>
                <span className="text-emerald-600 font-bold flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Guaranteed Departure</span>
                </span>
              </div>
            </div>

            {/* Actions: VIEW ADVENTURE & BOOK NOW */}
            <div className="pt-1 flex flex-col sm:flex-row items-center gap-2.5">
              <button
                onClick={() => onSelectAdventure(ngongHillsTrip)}
                className="w-full sm:w-auto flex-1 py-3 px-5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-xs text-center flex items-center justify-center gap-2 min-h-[42px]"
              >
                <span>VIEW ADVENTURE</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onQuickBook(ngongHillsTrip)}
                className="w-full sm:w-auto py-3 px-5 border-2 border-[#171717] hover:bg-[#171717] hover:text-white text-[#171717] text-xs font-black uppercase tracking-wider rounded-xl transition-colors cursor-pointer text-center min-h-[42px]"
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
      <section id="categories" className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-6 pb-2.5 sm:pb-3 border-b border-[#E7E5E4] gap-2">
          <div>
            <span className="text-[10px] sm:text-xs uppercase font-black tracking-widest text-[#F97316] block">
              CURATED WAYS TO EXPLORE
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#171717] mt-0.5">
              EXPLORE BY EXPERIENCE
            </h2>
            <p className="text-xs sm:text-sm text-[#737373] mt-0.5">
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5 sm:gap-3.5 lg:gap-4">
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

              <div className="absolute bottom-2.5 inset-x-2.5 text-white">
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
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-2.5 sm:mb-4 pb-2 sm:pb-2.5 border-b border-[#E7E5E4] gap-1.5">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-ping" />
              <span className="text-[10px] sm:text-xs uppercase font-black tracking-widest text-[#EA580C]">
                LIVE BOOKING DEMAND
              </span>
            </div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-extrabold text-[#171717]">
                TRENDING THIS WEEK
              </h2>
              <span className="sm:hidden text-[10px] font-bold text-[#F97316] bg-[#F97316]/10 px-2 py-0.5 rounded-full">
                Swipe →
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#737373] mt-0.5">
              What people are booking right now.
            </p>
          </div>

          <button
            onClick={onOpenExplore}
            className="text-xs font-bold text-[#171717] hover:text-[#F97316] flex items-center gap-1 cursor-pointer transition-colors self-start sm:self-auto min-h-[32px] sm:min-h-0"
          >
            <span>View All Trending</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal Marketplace Trip Rail: Scrollable on mobile/tablet, 4-column row on desktop */}
        <div 
          className="flex overflow-x-auto snap-x snap-mandatory gap-3 sm:gap-4 lg:gap-5 pb-2 pt-0.5 no-scrollbar scrollbar-none lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch' 
          }}
        >
          {trendingRailTrips.map((adv) => (
            <div
              key={adv.id}
              onClick={() => onSelectAdventure(adv)}
              className="group bg-white rounded-xl border border-[#E7E5E4] overflow-hidden hover:border-[#F97316]/50 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between shrink-0 snap-start w-[78%] xs:w-[75%] sm:w-[48%] lg:w-auto"
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
                  {/* Category Pill */}
                  <div className="absolute top-2 left-2 bg-black/65 backdrop-blur-xs text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                    {adv.category}
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute bottom-2 left-2 bg-black/65 backdrop-blur-xs text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{adv.rating.toFixed(1)}</span>
                  </div>

                  {/* Heart / Favorite Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(adv.id, e);
                    }}
                    aria-label="Save to favorites"
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 hover:bg-black/75 backdrop-blur-xs flex items-center justify-center text-white transition-all z-10 cursor-pointer shadow-xs"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 transition-colors ${
                        savedIds.includes(adv.id)
                          ? 'fill-rose-500 text-rose-500'
                          : 'text-white hover:text-rose-400'
                      }`}
                    />
                  </button>
                </div>

                <div className="p-2.5 sm:p-3 space-y-1">
                  <h3 className="text-xs sm:text-sm font-extrabold text-[#171717] group-hover:text-[#F97316] transition-colors leading-snug line-clamp-2 min-h-[32px] sm:min-h-[36px]">
                    {adv.title}
                  </h3>
                  
                  <div className="flex items-center gap-1 text-[11px] text-[#737373]">
                    <MapPin className="w-3 h-3 text-[#F97316] shrink-0" />
                    <span className="truncate">{adv.destination}</span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#737373] pt-0.5">
                    <div className="flex items-center gap-1 truncate">
                      <Calendar className="w-3 h-3 text-[#737373] shrink-0" />
                      <span className="truncate">{adv.nextDepartureDateText}</span>
                    </div>
                    <span className="font-bold text-[#171717] shrink-0">{adv.availableSeats} seats left</span>
                  </div>
                </div>
              </div>

              <div className="p-2.5 sm:p-3 pt-0 flex items-center justify-between border-t border-[#E7E5E4] mt-1">
                <div>
                  <span className="text-[9px] text-[#737373] block uppercase tracking-wider font-semibold">From</span>
                  <span className="font-black text-[#F97316] text-xs sm:text-sm font-mono">
                    {formatKSh(adv.pricePerPerson)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickBook(adv);
                  }}
                  className="px-2.5 sm:px-3 py-1.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-[10px] sm:text-[11px] font-bold uppercase rounded-lg transition-colors min-h-[32px] cursor-pointer"
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
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
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
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#171717] text-white min-h-[360px] sm:min-h-[440px] shadow-2xl border border-neutral-800 flex items-end">
          
          <img
            src={dianiGetawayTrip.featuredImage}
            alt="Diani Beach Getaway Kenya"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          {/* Top Tag */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1.5 bg-white/20 backdrop-blur-md border border-white/25 rounded-full text-xs font-black uppercase tracking-wider text-white">
              WEEKEND ESCAPES
            </span>
          </div>

          {/* Floating Trip Information Panel (Editorial) */}
          <div className="relative z-10 m-3 sm:m-6 lg:m-8 max-w-xl bg-white text-[#171717] rounded-2xl p-4 sm:p-6 lg:p-7 shadow-2xl border border-[#E7E5E4] space-y-3 sm:space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#F97316] block">
                Short trips. Big memories.
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#171717] mt-0.5 leading-tight">
                DIANI BEACH GETAWAY
              </h3>
              <p className="text-xs text-[#737373] mt-1 leading-relaxed">
                2 Days · 1 Night · Indian Ocean turquoise channels, SGR express connection, and white powder sands.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#E7E5E4]">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#737373] block">Starting from</span>
                <span className="text-lg sm:text-xl font-black text-[#F97316] font-mono">
                  KSh 7,500
                </span>
              </div>

              <button
                onClick={() => onSelectAdventure(dianiGetawayTrip)}
                className="px-5 py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-1.5 min-h-[42px]"
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
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        
        {/* Collection 1: ADVENTURES UNDER KSH 2,000 */}
        <div className="space-y-4 sm:space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-2.5 sm:pb-3 border-b border-[#E7E5E4] gap-2">
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <DollarSign className="w-4 h-4 text-[#F97316]" />
                <span className="text-[10px] sm:text-xs uppercase font-black tracking-widest text-[#F97316]">
                  HIGH VALUE DEPARTURES
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#171717]">
                ADVENTURES UNDER KSH 2,000
              </h2>
              <p className="text-xs sm:text-sm text-[#737373] mt-0.5">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5">
            {under2000Trips.map((adv) => (
              <div
                key={adv.id}
                onClick={() => onSelectAdventure(adv)}
                className="group p-3 sm:p-3.5 bg-white rounded-xl border border-[#E7E5E4] hover:border-[#F97316] transition-all cursor-pointer shadow-xs flex items-center gap-3.5"
              >
                <img
                  src={adv.featuredImage}
                  alt={adv.title}
                  referrerPolicy="no-referrer"
                  className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0 space-y-1 flex-1">
                  <span className="text-[10px] font-bold text-[#F97316] uppercase">{adv.destination}</span>
                  <h4 className="text-xs sm:text-sm font-bold text-[#171717] group-hover:text-[#F97316] transition-colors truncate">
                    {adv.title}
                  </h4>
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-xs sm:text-sm font-black text-[#171717]">{formatKSh(adv.pricePerPerson)}</span>
                    <span className="text-[10px] text-[#737373] font-bold">{adv.availableSeats} slots</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collection 2: SUNRISE ADVENTURES */}
        <div className="space-y-4 sm:space-y-5 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-2.5 sm:pb-3 border-b border-[#E7E5E4] gap-2">
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <Sunrise className="w-4 h-4 text-[#F97316]" />
                <span className="text-[10px] sm:text-xs uppercase font-black tracking-widest text-[#F97316]">
                  DAWN CRATER & SUMMITS
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#171717]">
                SUNRISE ADVENTURES
              </h2>
              <p className="text-xs sm:text-sm text-[#737373] mt-0.5">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5 lg:gap-6">
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
      <section id="destinations" className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-6 pb-2.5 sm:pb-3 border-b border-[#E7E5E4] gap-2">
          <div>
            <span className="text-[10px] sm:text-xs uppercase font-black tracking-widest text-[#F97316] block">
              KENYA DESTINATIONS
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#171717] mt-0.5">
              WHERE WILL YOU GO NEXT?
            </h2>
            <p className="text-xs sm:text-sm text-[#737373] mt-0.5">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 sm:gap-4 lg:gap-5">
          {EDITORIAL_DESTINATIONS.map((dest) => {
            const colSpan = dest.size === 'large' 
              ? 'lg:col-span-6' 
              : 'lg:col-span-3';

            return (
              <div
                key={dest.name}
                onClick={() => onExploreDestination(dest.name)}
                className={`${colSpan} group relative rounded-2xl overflow-hidden min-h-[200px] sm:min-h-[250px] cursor-pointer bg-[#171717] shadow-sm hover:shadow-md transition-all border border-[#E7E5E4]`}
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

                <div className="absolute bottom-3.5 inset-x-3.5 sm:bottom-4 sm:inset-x-4 text-white space-y-0.5 sm:space-y-1">
                  <span className="text-[10px] font-bold text-[#F97316] uppercase tracking-wider block">
                    {dest.region}
                  </span>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold group-hover:text-[#F97316] transition-colors leading-tight">
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
      <section id="how-it-works" className="bg-[#FAF7F2] py-10 sm:py-16 border-y border-[#E7E5E4]">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          
          <div className="max-w-xl">
            <span className="text-[10px] sm:text-xs uppercase font-black tracking-widest text-[#F97316] block">
              MARKETPLACE WORKFLOW
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#171717] mt-0.5">
              HOW IT WORKS
            </h2>
            <p className="text-xs sm:text-sm text-[#737373] mt-0.5">
              From choosing your weekend adventure to scanning your ticket on departure morning.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
            
            {/* Step 1 */}
            <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E7E5E4] space-y-2 sm:space-y-2.5 shadow-xs">
              <span className="text-lg sm:text-xl font-black text-[#F97316]">01</span>
              <h3 className="text-xs sm:text-sm font-extrabold uppercase text-[#171717] tracking-wider">
                DISCOVER
              </h3>
              <p className="text-xs text-[#737373] leading-relaxed">
                Find an adventure.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E7E5E4] space-y-2 sm:space-y-2.5 shadow-xs">
              <span className="text-lg sm:text-xl font-black text-[#F97316]">02</span>
              <h3 className="text-xs sm:text-sm font-extrabold uppercase text-[#171717] tracking-wider">
                CHOOSE
              </h3>
              <p className="text-xs text-[#737373] leading-relaxed">
                Select your trip and date.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E7E5E4] space-y-2 sm:space-y-2.5 shadow-xs">
              <span className="text-lg sm:text-xl font-black text-[#F97316]">03</span>
              <h3 className="text-xs sm:text-sm font-extrabold uppercase text-[#171717] tracking-wider">
                BOOK
              </h3>
              <p className="text-xs text-[#737373] leading-relaxed">
                Reserve your seats.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E7E5E4] space-y-2 sm:space-y-2.5 shadow-xs">
              <span className="text-lg sm:text-xl font-black text-[#F97316]">04</span>
              <h3 className="text-xs sm:text-sm font-extrabold uppercase text-[#171717] tracking-wider">
                PAY
              </h3>
              <p className="text-xs text-[#737373] leading-relaxed">
                Complete M-PESA or card payment.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E7E5E4] space-y-2 sm:space-y-2.5 shadow-xs">
              <span className="text-lg sm:text-xl font-black text-[#F97316]">05</span>
              <h3 className="text-xs sm:text-sm font-extrabold uppercase text-[#171717] tracking-wider">
                GET YOUR TICKET
              </h3>
              <p className="text-xs text-[#737373] leading-relaxed">
                Receive your digital QR ticket.
              </p>
            </div>

          </div>

          {/* Then: CHECK IN Highlight */}
          <div className="p-3.5 sm:p-4.5 bg-white rounded-xl border border-[#F97316]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F97316] text-white flex items-center justify-center font-black shrink-0">
                ✓
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-extrabold text-[#171717] uppercase tracking-wide">
                  CHECK IN ON DEPARTURE DAY
                </h4>
                <p className="text-xs text-[#737373] mt-0.5">
                  Organizer scans your QR code when you arrive at the pickup point.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenExplore}
              className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#171717] text-white text-xs font-bold uppercase rounded-lg hover:bg-neutral-800 transition-colors shrink-0 min-h-[38px]"
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
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="bg-[#171717] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 lg:p-12 border border-neutral-800 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#F97316] block">
              FOR TRIP ORGANIZERS & GUIDES
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              HAVE AN ADVENTURE TO HOST?
            </h2>
            <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed max-w-xl">
              Publish your trips, fill seats fast, and give your guests instant digital tickets. We provide the complete booking and payments infrastructure for Kenyan tour operators.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs font-medium text-white/90">
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
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 w-full max-w-md space-y-4 text-center">
              <div className="space-y-0.5">
                <span className="text-[10px] sm:text-xs font-bold text-[#F97316] uppercase">Fast Partner Onboarding</span>
                <p className="text-sm sm:text-base font-extrabold text-white">Join Leading Kenyan Tour Clubs</p>
              </div>

              <button
                onClick={() => setOrganizerModalOpen(true)}
                className="w-full py-3 sm:py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2 min-h-[44px]"
              >
                <span>START SELLING</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] sm:text-[11px] text-white/60">
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
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#171717] text-white p-6 sm:p-12 lg:p-16 text-center border border-neutral-800 shadow-2xl">
          
          <img
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=85"
            alt="African Savannah Sunset Adventure"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171717] via-[#171717]/80 to-[#171717]/60" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4 sm:space-y-5">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest font-black text-[#F97316] block">
              READY FOR THE OUTDOORS?
            </span>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              YOUR NEXT ADVENTURE <br />
              IS WAITING.
            </h2>

            <p className="text-xs sm:text-sm lg:text-base text-[#FAF7F2]/80 leading-relaxed max-w-lg mx-auto font-medium">
              Discover new places, meet new people and book unforgettable experiences.
            </p>

            <div className="pt-1 flex justify-center">
              <button
                onClick={onOpenExplore}
                className="px-6 sm:px-8 py-3 sm:py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs sm:text-sm font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-xl flex items-center gap-2 min-h-[44px]"
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
