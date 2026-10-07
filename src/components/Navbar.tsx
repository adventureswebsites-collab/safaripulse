import React from 'react';
import { Search, Compass, Heart, User, Sparkles, ArrowRight, Bell } from 'lucide-react';
import { ActiveTab, UserProfile } from '../types';

interface NavbarProps {
  currentTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
  savedCount: number;
  upcomingCount: number;
  user: UserProfile | null;
  onOpenAuth: () => void;
  onScrollToSection?: (sectionId: string) => void;
  onOpenSearch?: () => void;
  onOpenNotifications?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  savedCount,
  upcomingCount,
  user,
  onOpenAuth,
  onScrollToSection,
  onOpenSearch,
  onOpenNotifications
}) => {
  const handleNavClick = (tab: ActiveTab, sectionId?: string) => {
    if (sectionId && onScrollToSection) {
      if (currentTab !== 'home') {
        onNavigate('home');
        setTimeout(() => onScrollToSection(sectionId), 150);
      } else {
        onScrollToSection(sectionId);
      }
    } else {
      onNavigate(tab);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E7E5E4] transition-all">
      
      {/* Top compact highlight bar */}
      <div className="bg-[#171717] text-white text-[11px] font-medium py-1.5 px-4 text-center border-b border-black/10">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-ping" />
          <span className="text-[#FAF7F2]/90">
            Departing this weekend across Kenya · Instant Lipa Na M-PESA seat confirmation & digital tickets
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-17 flex items-center justify-between gap-4">
        
        {/* Logo on the left */}
        <div className="flex items-center gap-8 shrink-0">
          <button
            onClick={() => handleNavClick('home')}
            className="text-left group cursor-pointer focus-visible:outline-none flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-[#F97316] text-white flex items-center justify-center font-black text-lg shadow-sm">
              S
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#171717] group-hover:text-[#EA580C] transition-colors leading-none block">
                SAFARIPULSE<span className="text-[#F97316]">.</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#737373] block mt-0.5">
                Adventure Marketplace
              </span>
            </div>
          </button>
        </div>

        {/* Center Navigation:
            Explore | Adventures | Destinations | Categories | How It Works */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-[#171717]/85">
          <button
            onClick={() => handleNavClick('explore')}
            className={`cursor-pointer transition-colors hover:text-[#F97316] py-1 ${
              currentTab === 'explore' ? 'text-[#F97316] border-b-2 border-[#F97316]' : ''
            }`}
          >
            Explore
          </button>

          <button
            onClick={() => handleNavClick('explore')}
            className="cursor-pointer transition-colors hover:text-[#F97316] py-1"
          >
            Adventures
          </button>

          <button
            onClick={() => handleNavClick('home', 'destinations')}
            className="cursor-pointer transition-colors hover:text-[#F97316] py-1"
          >
            Destinations
          </button>

          <button
            onClick={() => handleNavClick('home', 'categories')}
            className="cursor-pointer transition-colors hover:text-[#F97316] py-1"
          >
            Categories
          </button>

          <button
            onClick={() => handleNavClick('home', 'how-it-works')}
            className="cursor-pointer transition-colors hover:text-[#F97316] py-1"
          >
            How It Works
          </button>
        </nav>

        {/* Right side Desktop:
            Search | Login | Sign Up | Primary CTA: EXPLORE ADVENTURES */}
        <div className="hidden md:flex items-center gap-4">
          
          <button
            onClick={() => {
              if (onOpenSearch) onOpenSearch();
              else onNavigate('explore');
            }}
            className="p-2 text-[#737373] hover:text-[#171717] transition-colors cursor-pointer rounded-lg hover:bg-[#FAF7F2] min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="Search Adventures"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('saved')}
            className="relative p-2 text-[#737373] hover:text-[#171717] transition-colors cursor-pointer rounded-lg hover:bg-[#FAF7F2] min-h-[44px] min-w-[44px] flex items-center justify-center"
            title="Saved Trips"
          >
            <Heart className="w-4 h-4" />
            {savedCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#F97316]" />
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('my-bookings')}
                className="text-xs font-bold text-[#171717] hover:text-[#F97316] cursor-pointer flex items-center gap-1.5 min-h-[44px] px-2"
              >
                <span>My Bookings</span>
                {upcomingCount > 0 && (
                  <span className="text-[10px] bg-[#171717] text-white px-1.5 py-0.5 rounded-full font-mono">
                    {upcomingCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => onNavigate('profile')}
                className="flex items-center gap-2 cursor-pointer p-0.5 min-h-[44px] min-w-[44px] justify-center"
                title="Account Profile"
              >
                <img
                  src={user.avatar}
                  alt={user.fullName}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover border border-[#E7E5E4]"
                />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-bold">
              <button
                onClick={onOpenAuth}
                className="px-3 py-2 text-[#171717] hover:text-[#F97316] transition-colors cursor-pointer min-h-[44px] flex items-center"
              >
                Login
              </button>
              <button
                onClick={onOpenAuth}
                className="px-3 py-2 text-[#171717] hover:text-[#F97316] transition-colors cursor-pointer min-h-[44px] flex items-center"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Primary CTA */}
          <button
            onClick={() => onNavigate('explore')}
            className="px-4 py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm hover:shadow flex items-center gap-1.5 min-h-[44px]"
          >
            <span>EXPLORE ADVENTURES</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Compact Mobile Top Right: Search Icon + Notification Icon */}
        <div className="flex md:hidden items-center gap-1">
          <button
            onClick={() => {
              if (onOpenSearch) onOpenSearch();
              else onNavigate('explore');
            }}
            className="p-2.5 text-[#171717] hover:text-[#F97316] transition-colors cursor-pointer rounded-xl hover:bg-[#FAF7F2] min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Open Adventure Search"
          >
            <Search className="w-5 h-5 text-[#171717]" />
          </button>

          <button
            onClick={() => {
              if (onOpenNotifications) onOpenNotifications();
            }}
            className="relative p-2.5 text-[#171717] hover:text-[#F97316] transition-colors cursor-pointer rounded-xl hover:bg-[#FAF7F2] min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="View Notifications"
          >
            <Bell className="w-5 h-5 text-[#171717]" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#F97316] ring-2 ring-white" />
          </button>
        </div>

      </div>

    </header>
  );
};
