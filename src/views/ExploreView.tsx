import React, { useState, useMemo } from 'react';
import { 
  Search, SlidersHorizontal, LayoutGrid, List, RotateCcw, 
  MapPin, Compass, ArrowUpDown, Filter, ChevronDown, Check, ArrowRight, Zap 
} from 'lucide-react';
import { Adventure } from '../types';
import { ADVENTURES } from '../data/adventures';
import { AdventureCard } from '../components/AdventureCard';
import { formatKSh } from '../utils/formatters';

interface ExploreViewProps {
  initialCategory?: string;
  initialDestination?: string;
  savedIds: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onSelectAdventure: (adventure: Adventure) => void;
  onQuickBook?: (adventure: Adventure) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  initialCategory = '',
  initialDestination = '',
  savedIds,
  onToggleSave,
  onSelectAdventure,
  onQuickBook
}) => {
  const [searchQuery, setSearchQuery] = useState(initialDestination || '');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [dateFilter, setDateFilter] = useState<'all' | 'this-weekend' | 'next-weekend'>('all');
  const [maxPrice, setMaxPrice] = useState<number>(25000);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [urgentSeatsOnly, setUrgentSeatsOnly] = useState<boolean>(false);
  const [guaranteedOnly, setGuaranteedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'departing-soon' | 'price-asc' | 'price-desc' | 'popular' | 'rating'>('departing-soon');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'list'>('grid');
  const [showFiltersMobile, setShowFiltersMobile] = useState<boolean>(false);

  const categories = [
    'All Categories',
    'Day Hikes & Trails',
    'Overnight Bush Camps',
    'Weekend Road Trips',
    'Alpine Summits',
    'Coastal & Water'
  ];

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setDateFilter('all');
    setMaxPrice(25000);
    setSelectedDifficulty('all');
    setUrgentSeatsOnly(false);
    setGuaranteedOnly(false);
    setSortBy('departing-soon');
  };

  const filteredAdventures = useMemo(() => {
    return ADVENTURES.filter((adv) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = adv.title.toLowerCase().includes(q);
        const matchDest = adv.destination.toLowerCase().includes(q);
        const matchTag = adv.tagline.toLowerCase().includes(q);
        const matchHub = adv.pickupHubs.some(h => h.toLowerCase().includes(q));
        if (!matchTitle && !matchDest && !matchTag && !matchHub) return false;
      }
      if (selectedCategory && selectedCategory !== 'All Categories') {
        if (adv.category !== selectedCategory) return false;
      }
      if (dateFilter === 'this-weekend' && !adv.isThisWeekend) return false;
      if (dateFilter === 'next-weekend' && adv.isThisWeekend) return false;
      if (adv.pricePerPerson > maxPrice) return false;
      if (selectedDifficulty !== 'all' && adv.difficulty !== selectedDifficulty) return false;
      if (urgentSeatsOnly && adv.availableSeats > 3) return false;
      if (guaranteedOnly && !adv.isGuaranteedDeparture) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'departing-soon') return (b.isThisWeekend ? 1 : 0) - (a.isThisWeekend ? 1 : 0);
      if (sortBy === 'price-asc') return a.pricePerPerson - b.pricePerPerson;
      if (sortBy === 'price-desc') return b.pricePerPerson - a.pricePerPerson;
      if (sortBy === 'popular') return b.reviewsCount - a.reviewsCount;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [
    searchQuery, selectedCategory, dateFilter, maxPrice, 
    selectedDifficulty, urgentSeatsOnly, guaranteedOnly, sortBy
  ]);

  const activeFiltersCount = [
    Boolean(selectedCategory && selectedCategory !== 'All Categories'),
    dateFilter !== 'all',
    maxPrice < 25000,
    selectedDifficulty !== 'all',
    urgentSeatsOnly,
    guaranteedOnly
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-7 space-y-4 sm:space-y-6">
      
      {/* Header */}
      <div className="space-y-3 sm:space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]" />
            <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-[#F97316]">
              MARKETPLACE CATALOG · LIVE DEPARTURES
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#171717] tracking-tight mt-0.5 sm:mt-1">
            Discover & Book Experiences
          </h1>
          <p className="text-xs sm:text-sm text-[#737373] mt-0.5 sm:mt-1">
            Real scheduled departures with live seat availability, expert guides, and instant M-PESA booking.
          </p>
        </div>

        {/* Quick Date Timing Selector */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-1 text-xs font-bold">
          <button
            onClick={() => setDateFilter('all')}
            className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap min-h-[38px] ${
              dateFilter === 'all'
                ? 'bg-[#171717] text-white'
                : 'bg-white border border-[#E7E5E4] text-[#171717] hover:bg-[#FAF7F2]'
            }`}
          >
            All Upcoming Dates
          </button>

          <button
            onClick={() => setDateFilter('this-weekend')}
            className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 min-h-[38px] ${
              dateFilter === 'this-weekend'
                ? 'bg-[#F97316] text-white shadow-xs'
                : 'bg-white border border-[#E7E5E4] text-[#171717] hover:bg-[#FAF7F2]'
            }`}
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Departing This Weekend</span>
          </button>

          <button
            onClick={() => setDateFilter('next-weekend')}
            className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl transition-colors cursor-pointer whitespace-nowrap min-h-[38px] ${
              dateFilter === 'next-weekend'
                ? 'bg-[#171717] text-white'
                : 'bg-white border border-[#E7E5E4] text-[#171717] hover:bg-[#FAF7F2]'
            }`}
          >
            Next Weekend
          </button>
        </div>

        {/* Global Search Bar */}
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 items-stretch">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#737373] absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by trip name, activity (cycling, camp, summit), or pickup hub..."
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white border border-[#E7E5E4] rounded-xl text-xs sm:text-sm text-[#171717] focus:outline-none focus:border-[#F97316] shadow-xs min-h-[44px]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-[#737373] hover:text-[#171717] text-xs font-bold"
              >
                Clear
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="sm:hidden px-4 py-2.5 bg-white border border-[#E7E5E4] rounded-xl text-xs font-bold text-[#171717] flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#F97316]" />
            <span>Filters ({activeFiltersCount})</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Filters Sidebar + Catalog */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        
        {/* Filters Sidebar */}
        <aside className={`lg:block ${showFiltersMobile ? 'block' : 'hidden'} space-y-4 sm:space-y-6`}>
          <div className="bg-white p-4 sm:p-5 lg:p-6 rounded-2xl border border-[#E7E5E4] space-y-4 sm:space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E5E4]">
              <span className="text-xs uppercase tracking-wider font-extrabold text-[#171717] flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-[#F97316]" />
                <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
              </span>

              {activeFiltersCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-[#F97316] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-[#171717] uppercase tracking-wider mb-2">
                Experience Type
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2.5 bg-[#FAF7F2] border border-[#E7E5E4] rounded-lg text-xs font-medium text-[#171717] focus:outline-none cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c} value={c === 'All Categories' ? '' : c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Max Budget Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="font-bold text-[#171717] uppercase text-[11px]">Max Price Per Seat</span>
                <span className="font-bold text-[#F97316] tabular-nums">{formatKSh(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="1500"
                max="25000"
                step="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#F97316] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#737373] mt-1 font-medium">
                <span>KSh 1,500</span>
                <span>KSh 25,000+</span>
              </div>
            </div>

            {/* Difficulty Grade */}
            <div>
              <label className="block text-xs font-bold text-[#171717] uppercase tracking-wider mb-2">
                Fitness Level
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full p-2.5 bg-[#FAF7F2] border border-[#E7E5E4] rounded-lg text-xs font-medium text-[#171717] focus:outline-none cursor-pointer"
              >
                <option value="all">All Fitness Levels</option>
                <option value="Easy">Easy (Social / Beginner)</option>
                <option value="Moderate">Moderate (Active Hiker)</option>
                <option value="Challenging">Challenging (Summit / High Trail)</option>
              </select>
            </div>

            {/* Urgency & Availability Toggles */}
            <div className="pt-3 border-t border-[#E7E5E4] space-y-3">
              <label className="flex items-center justify-between text-xs cursor-pointer">
                <div>
                  <p className="font-bold text-[#171717] flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-[#F97316] fill-current" />
                    <span>Almost Sold Out (&lt; 4 seats)</span>
                  </p>
                  <p className="text-[10px] text-[#737373]">Last spots available</p>
                </div>
                <input
                  type="checkbox"
                  checked={urgentSeatsOnly}
                  onChange={(e) => setUrgentSeatsOnly(e.target.checked)}
                  className="w-4 h-4 accent-[#F97316] cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between text-xs cursor-pointer">
                <div>
                  <p className="font-bold text-[#171717]">Guaranteed Departures</p>
                  <p className="text-[10px] text-[#737373]">Confirmed minimum crew</p>
                </div>
                <input
                  type="checkbox"
                  checked={guaranteedOnly}
                  onChange={(e) => setGuaranteedOnly(e.target.checked)}
                  className="w-4 h-4 accent-[#F97316] cursor-pointer"
                />
              </label>
            </div>

          </div>
        </aside>

        {/* Results Catalog */}
        <main className="lg:col-span-3 space-y-4 sm:space-y-6">
          
          {/* Controls Bar */}
          <div className="p-3 sm:p-4 bg-white rounded-xl border border-[#E7E5E4] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-extrabold text-[#171717]">{filteredAdventures.length}</span>
              <span className="text-[#737373] ml-1">scheduled departures found</span>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-2">
                <span className="text-[#737373]">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#FAF7F2] border border-[#E7E5E4] rounded-lg px-2.5 py-1 text-xs font-bold text-[#171717] focus:outline-none cursor-pointer"
                >
                  <option value="departing-soon">Departing Soonest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="popular">Most Booked</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              <div className="flex items-center gap-1 p-0.5 bg-[#FAF7F2] rounded-lg border border-[#E7E5E4]">
                <button
                  type="button"
                  onClick={() => setLayoutMode('grid')}
                  className={`p-1.5 rounded-md cursor-pointer transition-colors ${
                    layoutMode === 'grid' ? 'bg-white text-[#F97316] shadow-xs' : 'text-[#737373]'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setLayoutMode('list')}
                  className={`p-1.5 rounded-md cursor-pointer transition-colors ${
                    layoutMode === 'list' ? 'bg-white text-[#F97316] shadow-xs' : 'text-[#737373]'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Cards Catalog */}
          {filteredAdventures.length > 0 ? (
            <div
              className={`grid gap-3.5 sm:gap-5 lg:gap-6 ${
                layoutMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1'
              }`}
            >
              {filteredAdventures.map((adv) => (
                <AdventureCard
                  key={adv.id}
                  adventure={adv}
                  isSaved={savedIds.includes(adv.id)}
                  onToggleSave={onToggleSave}
                  onSelect={onSelectAdventure}
                  onQuickBook={onQuickBook}
                  layout={layoutMode}
                />
              ))}
            </div>
          ) : (
            <div className="p-14 text-center bg-white rounded-2xl border border-[#E7E5E4] space-y-4">
              <Compass className="w-10 h-10 text-[#F97316] mx-auto" />
              <div>
                <h3 className="text-xl font-bold text-[#171717]">No departures matched your search</h3>
                <p className="text-xs text-[#737373] mt-1 max-w-sm mx-auto">
                  Try clearing the urgency filters or extending your budget slider.
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-[#F97316] text-white text-xs uppercase tracking-wider font-extrabold rounded-xl hover:bg-[#EA580C] cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </main>

      </div>
    </div>
  );
};
