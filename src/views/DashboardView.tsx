import React from 'react';
import { 
  Booking, UserProfile, Adventure 
} from '../types';
import { formatKSh, formatDate } from '../utils/formatters';
import { 
  MapPin, Ticket, Heart, Compass, Clock, ArrowRight, 
  CheckCircle2, ChevronRight, Award, Sparkles 
} from 'lucide-react';
import { ADVENTURES } from '../data/adventures';

interface DashboardViewProps {
  user: UserProfile;
  bookings: Booking[];
  savedAdventures: Adventure[];
  onViewTicket: (booking: Booking) => void;
  onSelectAdventure: (adventure: Adventure) => void;
  onNavigateTab: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  bookings,
  savedAdventures,
  onViewTicket,
  onSelectAdventure,
  onNavigateTab
}) => {
  const upcoming = bookings.filter((b) => b.status === 'Confirmed');
  const completed = bookings.filter((b) => b.status === 'Completed');
  const nextAdventure = upcoming[0];

  const bookedIds = new Set(bookings.map((b) => b.adventureId));
  const recommendations = ADVENTURES.filter((a) => !bookedIds.has(a.id)).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* 1. Welcoming Header */}
      <div className="border-b border-[#E7E5E4] pb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#F97316]">Traveler Dashboard</span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#171717] tracking-tight mt-1">
            Welcome back, {user.fullName.split(' ')[0]}.
          </h1>
          <p className="text-xs sm:text-sm text-[#737373] mt-1.5">
            Your Kenyan adventure manifests, digital gate passes, and expedition logs.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('explore')}
          className="px-5 py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-xl text-xs uppercase tracking-wider font-extrabold transition-colors cursor-pointer w-fit shadow-xs"
        >
          Explore New Trips →
        </button>
      </div>

      {/* 2. HIGHLIGHT: YOUR NEXT ADVENTURE */}
      {nextAdventure ? (
        <section className="bg-white rounded-2xl border border-[#E7E5E4] shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="text-xs uppercase font-extrabold tracking-widest text-[#F97316]">
                YOUR NEXT ADVENTURE
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171717] leading-tight">
                {nextAdventure.adventure.destination.toUpperCase()}
              </h2>

              <p className="text-xs uppercase tracking-wider text-[#737373] font-bold">
                {formatDate(nextAdventure.travelDate).toUpperCase()}
              </p>

              <div className="flex items-center gap-3 text-xs text-[#171717] pt-2">
                <span className="font-bold">Nairobi → {nextAdventure.adventure.destination.split(' ')[0]}</span>
                <span>•</span>
                <span>{nextAdventure.adventure.durationDays} DAYS • {nextAdventure.adventure.durationNights} NIGHTS</span>
                <span>•</span>
                <span>{nextAdventure.seatsCount} Traveler(s)</span>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E7E5E4] flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onViewTicket(nextAdventure)}
                className="px-6 py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs uppercase tracking-wider font-extrabold rounded-xl transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                <Ticket className="w-4 h-4" />
                <span>VIEW TICKET</span>
              </button>

              <button
                onClick={() => onSelectAdventure(nextAdventure.adventure)}
                className="px-5 py-3.5 bg-[#FAF7F2] hover:bg-[#E7E5E4] text-[#171717] text-xs uppercase tracking-wider font-bold rounded-xl transition-colors cursor-pointer text-center"
              >
                Trip Dossier
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-[#FAF7F2]">
            <img
              src={nextAdventure.adventure.featuredImage}
              alt={nextAdventure.adventure.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-[#171717]/90 text-white px-3 py-1 rounded-md text-xs font-mono font-bold">
              Ref: {nextAdventure.bookingReference}
            </div>
          </div>

        </section>
      ) : (
        <section className="p-8 bg-white rounded-2xl border border-[#E7E5E4] text-center space-y-3">
          <Compass className="w-8 h-8 text-[#F97316] mx-auto" />
          <h3 className="text-xl font-bold text-[#171717]">No Upcoming Expeditions</h3>
          <p className="text-xs text-[#737373] max-w-sm mx-auto">
            Ready to hit the savanna or scale Point Lenana? Discover departures this month.
          </p>
          <button
            onClick={() => onNavigateTab('explore')}
            className="px-5 py-2.5 bg-[#F97316] text-white text-xs uppercase tracking-wider font-extrabold rounded-xl hover:bg-[#EA580C] cursor-pointer"
          >
            Find an Adventure
          </button>
        </section>
      )}

      {/* 3. YOUR ACTIVITY */}
      <section className="space-y-6">
        <div className="border-b border-[#E7E5E4] pb-3 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-[#171717]">Your Activity</h2>
          <span className="text-xs text-[#737373]">Account Overview</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Upcoming Trips Box */}
          <div
            onClick={() => onNavigateTab('my-bookings')}
            className="p-6 bg-white rounded-2xl border border-[#E7E5E4] hover:border-[#F97316] cursor-pointer transition-all space-y-3 shadow-xs"
          >
            <span className="text-[10px] uppercase tracking-widest text-[#F97316] font-extrabold block">
              RESERVED PASSES
            </span>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold text-[#171717]">Upcoming Trips</h3>
              <span className="text-3xl font-extrabold text-[#171717]">{upcoming.length}</span>
            </div>
            <p className="text-xs text-[#737373]">Active reservations ready for park check-in.</p>
            <span className="text-xs font-bold text-[#F97316] inline-flex items-center gap-1 pt-2">
              <span>View Bookings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Completed Trips Box */}
          <div
            onClick={() => onNavigateTab('my-bookings')}
            className="p-6 bg-white rounded-2xl border border-[#E7E5E4] hover:border-[#F97316] cursor-pointer transition-all space-y-3 shadow-xs"
          >
            <span className="text-[10px] uppercase tracking-widest text-[#737373] font-bold block">
              ARCHIVE
            </span>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold text-[#171717]">Completed Trips</h3>
              <span className="text-3xl font-extrabold text-[#171717]">{completed.length}</span>
            </div>
            <p className="text-xs text-[#737373]">Past expeditions and boarding passes.</p>
            <span className="text-xs font-bold text-[#171717] inline-flex items-center gap-1 pt-2">
              <span>View History</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Saved Adventures Box */}
          <div
            onClick={() => onNavigateTab('saved')}
            className="p-6 bg-white rounded-2xl border border-[#E7E5E4] hover:border-[#F97316] cursor-pointer transition-all space-y-3 shadow-xs"
          >
            <span className="text-[10px] uppercase tracking-widest text-[#F97316] font-bold block">
              WISHLIST
            </span>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold text-[#171717]">Saved Adventures</h3>
              <span className="text-3xl font-extrabold text-[#171717]">{savedAdventures.length}</span>
            </div>
            <p className="text-xs text-[#737373]">Trips bookmarked for your next weekend escape.</p>
            <span className="text-xs font-bold text-[#F97316] inline-flex items-center gap-1 pt-2">
              <span>View Saved</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

        </div>
      </section>

      {/* 4. RECOMMENDATIONS */}
      {recommendations.length > 0 && (
        <section className="space-y-6">
          <div className="border-b border-[#E7E5E4] pb-3 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#F97316]">
                PERSONALIZED FOR YOU
              </span>
              <h2 className="text-2xl font-extrabold text-[#171717] mt-0.5">
                Recommended Expeditions
              </h2>
            </div>
            <button
              onClick={() => onNavigateTab('explore')}
              className="text-xs font-bold text-[#171717] hover:text-[#F97316] flex items-center gap-1 cursor-pointer"
            >
              <span>See All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recommendations.map((adv) => (
              <div
                key={adv.id}
                onClick={() => onSelectAdventure(adv)}
                className="group bg-white rounded-xl border border-[#E7E5E4] overflow-hidden hover:border-[#F97316] cursor-pointer transition-all shadow-xs"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF7F2]">
                  <img
                    src={adv.featuredImage}
                    alt={adv.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded font-bold">
                    {adv.category}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#737373]">
                    <span>{adv.destination}</span>
                    <span className="text-[#F97316] font-bold">{adv.availableSeats} seats</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#171717] group-hover:text-[#F97316] line-clamp-1 transition-colors">
                    {adv.title}
                  </h4>
                  <div className="pt-2 border-t border-[#E7E5E4] flex justify-between items-baseline">
                    <span className="text-xs font-bold text-[#171717]">{formatKSh(adv.pricePerPerson)}</span>
                    <span className="text-[10px] text-[#F97316] font-extrabold uppercase">Book →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
