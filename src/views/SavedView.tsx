import React from 'react';
import { Adventure } from '../types';
import { AdventureCard } from '../components/AdventureCard';
import { Heart, Compass, ArrowRight } from 'lucide-react';

interface SavedViewProps {
  savedAdventures: Adventure[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onSelectAdventure: (adventure: Adventure) => void;
  onExploreTrips: () => void;
}

export const SavedView: React.FC<SavedViewProps> = ({
  savedAdventures,
  onToggleSave,
  onSelectAdventure,
  onExploreTrips
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-[#E05626] font-bold">
          PERSONAL WISHLIST
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#0E2319] tracking-tight mt-1">
          Saved Expeditions
        </h1>
        <p className="text-xs sm:text-sm text-[#6E736B] mt-1">
          Trips you’ve bookmarked for upcoming weekends, safari getaways, and mountain climbs.
        </p>
      </div>

      {savedAdventures.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedAdventures.map((adv) => (
            <AdventureCard
              key={adv.id}
              adventure={adv}
              isSaved={true}
              onToggleSave={onToggleSave}
              onSelect={onSelectAdventure}
            />
          ))}
        </div>
      ) : (
        <div className="p-14 bg-white rounded-2xl border border-[#E5DFD3] text-center space-y-4">
          <Heart className="w-10 h-10 text-[#E05626] mx-auto" />
          <h3 className="font-editorial text-xl font-bold text-[#0E2319]">No Saved Expeditions Yet</h3>
          <p className="text-xs text-[#6E736B] max-w-sm mx-auto">
            Click the heart icon on any adventure card to save it to your personal wishlist for quick access later.
          </p>
          <button
            onClick={onExploreTrips}
            className="px-5 py-2.5 bg-[#E05626] text-white text-xs uppercase tracking-wider font-bold rounded-xl hover:bg-[#C43C0E] cursor-pointer"
          >
            Explore Trips
          </button>
        </div>
      )}

    </div>
  );
};
