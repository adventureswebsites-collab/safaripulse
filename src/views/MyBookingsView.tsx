import React, { useState } from 'react';
import { Booking, Adventure } from '../types';
import { formatKSh, formatDate } from '../utils/formatters';
import { 
  Ticket, Calendar, MapPin, CheckCircle2, 
  XCircle, ArrowRight, Compass 
} from 'lucide-react';

interface MyBookingsViewProps {
  bookings: Booking[];
  onViewTicket: (booking: Booking) => void;
  onSelectAdventure: (adventure: Adventure) => void;
  onExploreTrips: () => void;
}

export const MyBookingsView: React.FC<MyBookingsViewProps> = ({
  bookings,
  onViewTicket,
  onSelectAdventure,
  onExploreTrips
}) => {
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Completed' | 'Cancelled'>('Upcoming');

  const filtered = bookings.filter((b) => {
    if (activeTab === 'Upcoming') return b.status === 'Confirmed';
    if (activeTab === 'Completed') return b.status === 'Completed';
    return b.status === 'Cancelled';
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-[#6E736B]">Reservation Manifest</span>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#0E2319] tracking-tight mt-1">
          My Booked Expeditions
        </h1>
        <p className="text-xs sm:text-sm text-[#6E736B] mt-1">
          Review your reservation status, download receipts, and access gate-ready boarding passes.
        </p>
      </div>

      {/* Tabs Filter */}
      <div className="flex border-b border-[#E5DFD3] gap-8 text-xs sm:text-sm font-bold uppercase tracking-wider font-mono">
        {[
          { id: 'Upcoming', count: bookings.filter(b => b.status === 'Confirmed').length },
          { id: 'Completed', count: bookings.filter(b => b.status === 'Completed').length },
          { id: 'Cancelled', count: bookings.filter(b => b.status === 'Cancelled').length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3.5 border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
              activeTab === tab.id
                ? 'border-[#0E2319] text-[#0E2319] font-bold'
                : 'border-transparent text-[#6E736B] hover:text-[#0E2319]'
            }`}
          >
            <span>{tab.id}</span>
            <span className={`text-[11px] px-2 py-0.5 rounded ${
              activeTab === tab.id ? 'bg-[#0E2319] text-[#F8F6F1]' : 'bg-[#EFEBE4] text-[#6E736B]'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Booking list */}
      {filtered.length > 0 ? (
        <div className="space-y-5">
          {filtered.map((bk) => (
            <div
              key={bk.id}
              className="bg-white rounded-2xl border border-[#E5DFD3] overflow-hidden shadow-xs hover:border-[#0E2319] transition-all p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Left: Image & Details */}
                <div className="flex flex-col sm:flex-row gap-5 items-start flex-1 min-w-0">
                  <img
                    src={bk.adventure.featuredImage}
                    alt={bk.adventure.title}
                    referrerPolicy="no-referrer"
                    className="w-full sm:w-48 h-36 rounded-xl object-cover shrink-0 bg-[#EFEBE4]"
                  />

                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                      <span className={`inline-flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        bk.status === 'Confirmed'
                          ? 'bg-[#0E2319] text-white'
                          : bk.status === 'Completed'
                          ? 'bg-[#EFEBE4] text-[#0E2319]'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {bk.status}
                      </span>

                      <span className="text-[#6E736B]">
                        Ref: {bk.bookingReference}
                      </span>

                      <span className="text-[#0E2319] font-bold">
                        {bk.paymentStatus} via {bk.paymentMethod}
                      </span>
                    </div>

                    <h3 className="font-editorial text-xl font-bold text-[#0E2319] leading-snug">
                      {bk.adventure.title}
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-[#6E736B] pt-1">
                      <div>
                        <span className="font-mono uppercase text-[10px] text-[#6E736B] block">Destination</span>
                        <span className="font-semibold text-[#0E2319]">{bk.adventure.destination}</span>
                      </div>
                      <div>
                        <span className="font-mono uppercase text-[10px] text-[#6E736B] block">Departure</span>
                        <span className="font-semibold text-[#0E2319]">{formatDate(bk.travelDate)}</span>
                      </div>
                      <div>
                        <span className="font-mono uppercase text-[10px] text-[#6E736B] block">Seats</span>
                        <span className="font-semibold text-[#0E2319]">{bk.seatsCount} Traveler(s)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Total & Actions */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between border-t lg:border-t-0 pt-4 lg:pt-0 border-[#E5DFD3] gap-4 shrink-0">
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] font-mono uppercase text-[#6E736B] block">Total Amount</span>
                    <span className="font-editorial text-2xl font-bold text-[#0E2319] tabular-nums">
                      {formatKSh(bk.totalAmount)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {bk.status === 'Confirmed' && (
                      <button
                        onClick={() => onViewTicket(bk)}
                        className="px-4 py-2.5 bg-[#E05626] hover:bg-[#C43C0E] text-white rounded-xl text-xs uppercase tracking-wider font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <Ticket className="w-3.5 h-3.5" />
                        <span>View Ticket</span>
                      </button>
                    )}

                    <button
                      onClick={() => onSelectAdventure(bk.adventure)}
                      className="px-4 py-2.5 bg-[#EFEBE4] hover:bg-[#E5DFD3] text-[#0E2319] rounded-xl text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
                    >
                      Trip Dossier
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-14 bg-white rounded-2xl border border-[#E5DFD3] text-center space-y-4">
          <Compass className="w-10 h-10 text-[#0E2319] mx-auto" />
          <h3 className="font-editorial text-xl font-bold text-[#0E2319]">
            No {activeTab.toLowerCase()} bookings found
          </h3>
          <p className="text-xs text-[#6E736B] max-w-sm mx-auto">
            You do not have any {activeTab.toLowerCase()} trip entries recorded.
          </p>
          <button
            onClick={onExploreTrips}
            className="px-5 py-2.5 bg-[#E05626] text-white text-xs uppercase tracking-wider font-bold rounded-xl hover:bg-[#C43C0E] cursor-pointer"
          >
            Explore Available Adventures
          </button>
        </div>
      )}

    </div>
  );
};
