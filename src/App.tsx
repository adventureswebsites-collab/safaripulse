import React, { useState, useEffect } from 'react';
import { 
  ActiveTab, Adventure, Booking, UserProfile 
} from './types';
import { ADVENTURES } from './data/adventures';
import { INITIAL_USER, INITIAL_BOOKINGS, INITIAL_SAVED_IDS } from './data/initialState';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DigitalTicket } from './components/DigitalTicket';
import { BookingModal } from './components/BookingModal';
import { AuthModal } from './components/AuthModal';
import { MobileSearchModal } from './components/MobileSearchModal';
import { NotificationModal } from './components/NotificationModal';
import { HomeView } from './views/HomeView';
import { ExploreView } from './views/ExploreView';
import { AdventureDetailView } from './views/AdventureDetailView';
import { DashboardView } from './views/DashboardView';
import { MyBookingsView } from './views/MyBookingsView';
import { MyTicketsView } from './views/MyTicketsView';
import { SavedView } from './views/SavedView';
import { ProfileView } from './views/ProfileView';
import { 
  Home, Compass, CalendarCheck, Ticket, User, Heart, CheckCircle2 
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ActiveTab>('home');
  const [user, setUser] = useState<UserProfile | null>(INITIAL_USER);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [savedIds, setSavedIds] = useState<string[]>(INITIAL_SAVED_IDS);
  
  // Navigation contextual states
  const [activeAdventure, setActiveAdventure] = useState<Adventure | null>(null);
  const [bookingAdventure, setBookingAdventure] = useState<Adventure | null>(null);
  const [ticketModalBooking, setTicketModalBooking] = useState<Booking | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Filters passed from Home to Explore
  const [exploreCategory, setExploreCategory] = useState<string>('');
  const [exploreDestination, setExploreDestination] = useState<string>('');

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Scroll to top when changing tab or opening adventure
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab, activeAdventure]);

  // Wishlist toggle
  const handleToggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from saved wishlist');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Saved to your adventure wishlist');
        return [...prev, id];
      }
    });
  };

  // Navigate to Detail
  const handleSelectAdventure = (adventure: Adventure) => {
    setActiveAdventure(adventure);
    setCurrentTab('detail');
  };

  // Open booking flow
  const handleOpenBooking = (adventure: Adventure) => {
    setBookingAdventure(adventure);
  };

  // Booking completion
  const handleBookingComplete = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    showToast(`Reservation ${newBooking.bookingReference} confirmed!`);
  };

  // Category selection from Home
  const handleExploreCategory = (category: string) => {
    setExploreCategory(category);
    setExploreDestination('');
    setCurrentTab('explore');
  };

  // Destination selection from Home
  const handleExploreDestination = (destination: string) => {
    setExploreDestination(destination);
    setExploreCategory('');
    setCurrentTab('explore');
  };

  // Hero search
  const handleHeroSearch = (destination: string, category: string) => {
    setExploreDestination(destination);
    setExploreCategory(category);
    setCurrentTab('explore');
  };

  // Scroll to anchor on home page
  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const savedAdventures = ADVENTURES.filter((a) => savedIds.includes(a.id));
  const upcomingCount = bookings.filter((b) => b.status === 'Confirmed').length;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#171717] flex flex-col font-sans selection:bg-[#F97316]/20 selection:text-[#EA580C]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-50 bg-[#171717] text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl border border-black/20 flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-[#F97316]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          if (tab !== 'detail') setActiveAdventure(null);
        }}
        savedCount={savedIds.length}
        upcomingCount={upcomingCount}
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
        onScrollToSection={handleScrollToSection}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenNotifications={() => setNotificationsOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            onSelectAdventure={handleSelectAdventure}
            onExploreCategory={handleExploreCategory}
            onExploreDestination={handleExploreDestination}
            onSearch={handleHeroSearch}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onOpenExplore={() => {
              setExploreCategory('');
              setExploreDestination('');
              setCurrentTab('explore');
            }}
            onQuickBook={handleOpenBooking}
            onOpenSearchModal={() => setSearchModalOpen(true)}
          />
        )}

        {currentTab === 'explore' && (
          <ExploreView
            initialCategory={exploreCategory}
            initialDestination={exploreDestination}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onSelectAdventure={handleSelectAdventure}
            onQuickBook={handleOpenBooking}
          />
        )}

        {currentTab === 'detail' && activeAdventure && (
          <AdventureDetailView
            adventure={activeAdventure}
            onBack={() => setCurrentTab('explore')}
            onOpenBooking={handleOpenBooking}
            isSaved={savedIds.includes(activeAdventure.id)}
            onToggleSave={handleToggleSave}
          />
        )}

        {currentTab === 'dashboard' && user && (
          <DashboardView
            user={user}
            bookings={bookings}
            savedAdventures={savedAdventures}
            onViewTicket={(bk) => setTicketModalBooking(bk)}
            onSelectAdventure={handleSelectAdventure}
            onNavigateTab={(tab) => setCurrentTab(tab)}
          />
        )}

        {currentTab === 'my-bookings' && (
          <MyBookingsView
            bookings={bookings}
            onViewTicket={(bk) => setTicketModalBooking(bk)}
            onSelectAdventure={handleSelectAdventure}
            onExploreTrips={() => setCurrentTab('explore')}
          />
        )}

        {currentTab === 'my-tickets' && (
          <MyTicketsView
            bookings={bookings}
            onExploreTrips={() => setCurrentTab('explore')}
          />
        )}

        {currentTab === 'saved' && (
          <SavedView
            savedAdventures={savedAdventures}
            onToggleSave={handleToggleSave}
            onSelectAdventure={handleSelectAdventure}
            onExploreTrips={() => setCurrentTab('explore')}
          />
        )}

        {currentTab === 'profile' && user && (
          <ProfileView
            user={user}
            onUpdateUser={(updated) => {
              setUser(updated);
              showToast('Traveler profile updated');
            }}
          />
        )}
      </main>

      {/* Mobile-First Fixed Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E7E5E4] px-3 py-1 flex items-center justify-around text-[10px] font-bold shadow-lg">
        {/* HOME */}
        <button
          onClick={() => {
            setCurrentTab('home');
            setActiveAdventure(null);
          }}
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl cursor-pointer min-h-[48px] min-w-[56px] transition-colors ${
            currentTab === 'home' ? 'text-[#F97316]' : 'text-[#737373] hover:text-[#171717]'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="leading-tight">HOME</span>
        </button>

        {/* EXPLORE */}
        <button
          onClick={() => {
            setCurrentTab('explore');
            setActiveAdventure(null);
          }}
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl cursor-pointer min-h-[48px] min-w-[56px] transition-colors ${
            currentTab === 'explore' ? 'text-[#F97316]' : 'text-[#737373] hover:text-[#171717]'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span className="leading-tight">EXPLORE</span>
        </button>

        {/* BOOKINGS */}
        <button
          onClick={() => {
            setCurrentTab('my-bookings');
            setActiveAdventure(null);
          }}
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl cursor-pointer min-h-[48px] min-w-[56px] transition-colors relative ${
            currentTab === 'my-bookings' ? 'text-[#F97316]' : 'text-[#737373] hover:text-[#171717]'
          }`}
        >
          <CalendarCheck className="w-5 h-5 mb-0.5" />
          <span className="leading-tight">BOOKINGS</span>
          {upcomingCount > 0 && (
            <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-[#F97316]" />
          )}
        </button>

        {/* TICKETS */}
        <button
          onClick={() => {
            setCurrentTab('my-tickets');
            setActiveAdventure(null);
          }}
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl cursor-pointer min-h-[48px] min-w-[56px] transition-colors ${
            currentTab === 'my-tickets' ? 'text-[#F97316]' : 'text-[#737373] hover:text-[#171717]'
          }`}
        >
          <Ticket className="w-5 h-5 mb-0.5" />
          <span className="leading-tight">TICKETS</span>
        </button>

        {/* PROFILE */}
        <button
          onClick={() => {
            setCurrentTab('profile');
            setActiveAdventure(null);
          }}
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl cursor-pointer min-h-[48px] min-w-[56px] transition-colors ${
            currentTab === 'profile' ? 'text-[#F97316]' : 'text-[#737373] hover:text-[#171717]'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="leading-tight">PROFILE</span>
        </button>
      </nav>

      {/* Comprehensive Marketplace Footer */}
      <Footer
        onSelectCategory={handleExploreCategory}
        onSelectDestination={handleExploreDestination}
        onNavigateTab={(tab) => setCurrentTab(tab)}
      />

      {/* Full-Screen Mobile Search Modal */}
      <MobileSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectAdventure={(adv) => {
          handleSelectAdventure(adv);
          setSearchModalOpen(false);
        }}
        onExploreFilter={(q, cat, dest) => {
          setExploreCategory(cat || '');
          setExploreDestination(dest || '');
          setCurrentTab('explore');
          setSearchModalOpen(false);
        }}
      />

      {/* Notifications Modal */}
      <NotificationModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        onSelectAdventure={(adv) => {
          handleSelectAdventure(adv);
          setNotificationsOpen(false);
        }}
      />

      {/* Multi-Step Booking Modal */}
      {bookingAdventure && (
        <BookingModal
          adventure={bookingAdventure}
          onClose={() => setBookingAdventure(null)}
          onBookingComplete={handleBookingComplete}
          onViewTicket={(bk) => {
            setBookingAdventure(null);
            setTicketModalBooking(bk);
          }}
        />
      )}

      {/* Digital Ticket Modal */}
      {ticketModalBooking && (
        <DigitalTicket
          booking={ticketModalBooking}
          showModalWrapper={true}
          onClose={() => setTicketModalBooking(null)}
        />
      )}

      {/* Auth Modal */}
      {authModalOpen && (
        <AuthModal
          onClose={() => setAuthModalOpen(false)}
          onLoginSuccess={(loggedInUser) => {
            setUser(loggedInUser);
            showToast(`Signed in as ${loggedInUser.fullName}`);
          }}
        />
      )}

    </div>
  );
}
