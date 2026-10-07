import React, { useState } from 'react';
import { Booking } from '../types';
import { DigitalTicket } from '../components/DigitalTicket';
import { Ticket, ChevronRight, Compass } from 'lucide-react';
import { formatDate } from '../utils/formatters';

interface MyTicketsViewProps {
  bookings: Booking[];
  onExploreTrips: () => void;
}

export const MyTicketsView: React.FC<MyTicketsViewProps> = ({ bookings, onExploreTrips }) => {
  const activeBookings = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Completed');
  const [selectedBookingId, setSelectedBookingId] = useState<string>(
    activeBookings[0]?.id || ''
  );

  const selectedBooking = activeBookings.find((b) => b.id === selectedBookingId) || activeBookings[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-[#E05626] font-bold">
          DIGITAL WALLET & GATE PASSES
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#0E2319] tracking-tight mt-1">
          Expedition Boarding Passes
        </h1>
        <p className="text-xs sm:text-sm text-[#6E736B] mt-1 max-w-2xl leading-relaxed">
          Show this scannable QR ticket directly on your mobile device to your driver or KWS gate rangers. Compatible with offline viewing.
        </p>
      </div>

      {activeBookings.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Issued Passes List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#6E736B] font-bold">
              Issued Passes ({activeBookings.length})
            </h3>

            {activeBookings.map((bk) => {
              const isSelected = bk.id === selectedBooking?.id;
              return (
                <button
                  key={bk.id}
                  onClick={() => setSelectedBookingId(bk.id)}
                  className={`w-full p-4 rounded-xl text-left border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'border-[#0E2319] bg-white ring-2 ring-[#0E2319] shadow-sm'
                      : 'border-[#E5DFD3] bg-white hover:border-[#6E736B]'
                  }`}
                >
                  <div className="space-y-1 truncate">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                        bk.status === 'Confirmed' ? 'bg-[#0E2319] text-[#F8F6F1]' : 'bg-[#EFEBE4] text-[#0E2319]'
                      }`}>
                        {bk.status === 'Confirmed' ? 'GATE READY' : 'BOARDED'}
                      </span>
                      <span className="text-xs text-[#6E736B] font-mono">{bk.bookingReference}</span>
                    </div>

                    <h4 className="font-editorial text-sm font-bold text-[#0E2319] truncate">
                      {bk.adventure.title}
                    </h4>

                    <p className="text-[11px] text-[#6E736B]">
                      {formatDate(bk.travelDate)} · {bk.seatsCount} Seats
                    </p>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-[#0E2319]' : 'text-[#6E736B]'}`} />
                </button>
              );
            })}

            <div className="p-4 bg-[#EFEBE4] rounded-xl text-xs text-[#0E2319] space-y-1">
              <span className="font-mono uppercase text-[10px] text-[#E05626] font-bold block">Offline Notice</span>
              <p className="leading-relaxed text-[#6E736B]">
                Cellular signal in Amboseli or the Mara Triangle may be intermittent. Take a screenshot of this ticket to ensure quick park gate verification.
              </p>
            </div>
          </div>

          {/* Right Column: Full Interactive Ticket Display */}
          <div className="lg:col-span-7">
            {selectedBooking && (
              <DigitalTicket booking={selectedBooking} />
            )}
          </div>

        </div>
      ) : (
        <div className="p-14 bg-white rounded-2xl border border-[#E5DFD3] text-center space-y-4">
          <Ticket className="w-10 h-10 text-[#0E2319] mx-auto" />
          <h3 className="font-editorial text-xl font-bold text-[#0E2319]">No Digital Tickets Issued</h3>
          <p className="text-xs text-[#6E736B] max-w-sm mx-auto">
            Once you book an expedition, your gate-ready boarding pass with scannable QR code will be generated here.
          </p>
          <button
            onClick={onExploreTrips}
            className="px-5 py-2.5 bg-[#E05626] text-white text-xs uppercase tracking-wider font-bold rounded-xl hover:bg-[#C43C0E] cursor-pointer"
          >
            Find an Adventure
          </button>
        </div>
      )}

    </div>
  );
};
