import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, MapPin, Calendar, ArrowRight, UserCheck, Sparkles, TrendingUp, Compass } from 'lucide-react';
import { Adventure } from '../types';
import { ADVENTURES } from '../data/adventures';
import { formatKSh } from '../utils/formatters';

interface MobileSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAdventure: (adventure: Adventure) => void;
  onExploreFilter: (query: string, category?: string, destination?: string) => void;
}

const SEARCH_SUGGESTIONS = [
  'Hiking near Nairobi',
  'Ngong Hills',
  'Mount Kenya',
  'Maasai Mara Safari',
  'Diani Beach Escape',
  'Lake Naivasha Camping',
  'Hell\'s Gate Cycling',
  'Amboseli Safari'
];

const SEARCH_CATEGORIES = [
  'Hiking & Outdoor',
  'Safari & Wildlife',
  'Beach Escapes',
  'Camping',
  'Road Trips',
  'Water Activities'
];

const DESTINATION_SHORTCUTS = [
  'Nairobi',
  'Naivasha',
  'Mount Kenya',
  'Maasai Mara',
  'Diani',
  'Amboseli',
  'Mombasa'
];

export const MobileSearchModal: React.FC<MobileSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectAdventure,
  onExploreFilter
}) => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'destination' | 'activity' | 'organizer'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return ADVENTURES.filter((a) => {
      const matchTitle = a.title.toLowerCase().includes(q);
      const matchDest = a.destination.toLowerCase().includes(q) || a.region.toLowerCase().includes(q);
      const matchCat = a.category.toLowerCase().includes(q);
      const matchOrg = a.organizer.name.toLowerCase().includes(q);
      const matchDesc = a.overview.toLowerCase().includes(q) || a.tagline.toLowerCase().includes(q);

      if (filterType === 'destination') {
        return matchDest;
      }
      if (filterType === 'activity') {
        return matchCat || matchTitle;
      }
      if (filterType === 'organizer') {
        return matchOrg;
      }
      return matchTitle || matchDest || matchCat || matchOrg || matchDesc;
    }).slice(0, 10);
  }, [query, filterType]);

  if (!isOpen) return null;

  const handleSuggestionClick = (text: string) => {
    setQuery(text);
  };

  const handleFullSearch = () => {
    if (query.trim()) {
      onExploreFilter(query.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF7F2] flex flex-col animate-fade-in">
      {/* Top Header & Search Bar (Mobile First) */}
      <div className="bg-white border-b border-[#E7E5E4] px-4 pt-3 pb-3 safe-top shadow-xs">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-[#F97316] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleFullSearch();
              }}
              placeholder="What adventure are you looking for?"
              className="w-full pl-11 pr-10 py-3 rounded-xl bg-[#FAF7F2] text-[#171717] placeholder-[#737373] text-sm sm:text-base font-semibold border border-[#E7E5E4] focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 transition-all min-h-[48px]"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#737373] hover:text-[#171717] min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs sm:text-sm font-bold text-[#171717] hover:text-[#F97316] px-2 py-2 min-h-[48px] flex items-center cursor-pointer"
          >
            Cancel
          </button>
        </div>

        {/* Filter Type Pills: All | Destination | Activity | Organizer */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-2.5 pb-0.5 text-xs font-bold text-[#737373]">
          {(['all', 'destination', 'activity', 'organizer'] as const).map((type) => {
            const labels: Record<string, string> = {
              all: 'All Results',
              destination: 'Destinations',
              activity: 'Activities',
              organizer: 'Organizers'
            };
            const isSelected = filterType === type;
            return (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer min-h-[36px] flex items-center ${
                  isSelected
                    ? 'bg-[#F97316] text-white shadow-xs font-black'
                    : 'bg-[#FAF7F2] hover:bg-[#E7E5E4] text-[#171717]'
                }`}
              >
                {labels[type]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Search Body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {/* If no query, show helpful suggestions and categories */}
        {!query && (
          <div className="space-y-6 max-w-2xl mx-auto">
            {/* Quick Suggestions */}
            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#737373] mb-3">
                <TrendingUp className="w-4 h-4 text-[#F97316]" />
                <span>POPULAR ADVENTURE SEARCHES</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SEARCH_SUGGESTIONS.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSuggestionClick(item)}
                    className="px-3.5 py-2.5 bg-white border border-[#E7E5E4] hover:border-[#F97316] text-[#171717] text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-2 min-h-[44px]"
                  >
                    <Search className="w-3.5 h-3.5 text-[#F97316]" />
                    <span>{item}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Destinations */}
            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#737373] mb-3">
                <MapPin className="w-4 h-4 text-[#F97316]" />
                <span>POPULAR DESTINATIONS</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {DESTINATION_SHORTCUTS.map((dest) => (
                  <button
                    key={dest}
                    onClick={() => {
                      onExploreFilter('', undefined, dest);
                      onClose();
                    }}
                    className="p-3 bg-white border border-[#E7E5E4] hover:border-[#F97316] text-left rounded-xl transition-all cursor-pointer min-h-[44px] flex items-center justify-between group"
                  >
                    <span className="text-xs sm:text-sm font-bold text-[#171717] group-hover:text-[#F97316]">
                      {dest}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#737373] group-hover:text-[#F97316] transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            {/* Experience Categories */}
            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#737373] mb-3">
                <Compass className="w-4 h-4 text-[#F97316]" />
                <span>EXPLORE BY ACTIVITY</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SEARCH_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      onExploreFilter('', cat);
                      onClose();
                    }}
                    className="px-3.5 py-2.5 bg-white border border-[#E7E5E4] hover:border-[#F97316] text-[#171717] text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer min-h-[44px] flex items-center gap-2"
                  >
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Live Search Results */}
        {query && (
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="flex items-center justify-between text-xs text-[#737373] pb-1">
              <span>
                Found <strong className="text-[#171717]">{searchResults.length}</strong> adventures matching &ldquo;{query}&rdquo;
              </span>
              {searchResults.length > 0 && (
                <button
                  onClick={handleFullSearch}
                  className="font-bold text-[#F97316] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>See in Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              )}
            </div>

            {searchResults.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-[#E7E5E4] space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#FFF7ED] text-[#F97316] flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-[#171717]">No adventures found</h4>
                <p className="text-xs text-[#737373] max-w-sm mx-auto">
                  Try searching for popular terms like &ldquo;Mount Kenya&rdquo;, &ldquo;Ngong Hills&rdquo;, &ldquo;Safari&rdquo;, or &ldquo;Beach&rdquo;.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      onExploreFilter('');
                      onClose();
                    }}
                    className="px-4 py-2.5 bg-[#F97316] text-white text-xs font-black uppercase rounded-xl cursor-pointer min-h-[44px]"
                  >
                    Browse All 28 Adventures
                  </button>
                </div>
              </div>
            ) : (
              searchResults.map((adv) => (
                <div
                  key={adv.id}
                  onClick={() => {
                    onSelectAdventure(adv);
                    onClose();
                  }}
                  className="bg-white rounded-xl p-3 border border-[#E7E5E4] hover:border-[#F97316] shadow-xs hover:shadow-md transition-all cursor-pointer flex gap-3.5 items-center group min-h-[72px]"
                >
                  <img
                    src={adv.featuredImage}
                    alt={adv.title}
                    referrerPolicy="no-referrer"
                    className="w-18 h-18 rounded-lg object-cover shrink-0 border border-[#E7E5E4]"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#F97316] bg-[#FFF7ED] px-2 py-0.5 rounded">
                        {adv.category}
                      </span>
                      <span className="text-[11px] text-[#737373] flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#F97316]" />
                        {adv.nextDepartureDateText}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#171717] group-hover:text-[#F97316] transition-colors truncate">
                      {adv.title}
                    </h4>

                    <div className="flex items-center justify-between text-xs pt-0.5">
                      <span className="text-[#737373] flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-[#F97316] shrink-0" />
                        <span className="truncate">{adv.destination}</span>
                      </span>

                      <div className="flex items-baseline gap-1 shrink-0 ml-2">
                        <span className="font-extrabold text-[#171717]">
                          {formatKSh(adv.pricePerPerson)}
                        </span>
                        <span className="text-[10px] text-[#737373]">
                          · {adv.availableSeats} left
                        </span>
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#737373] group-hover:text-[#F97316] group-hover:translate-x-1 transition-all shrink-0" />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
