import React, { useState } from 'react';
import { Booking } from '../types';
import { formatKSh, formatDate } from '../utils/formatters';
import { 
  CheckCircle2, MapPin, Calendar, Clock, Users, 
  Printer, Shield, Phone, Sparkles, X, ArrowDownToLine 
} from 'lucide-react';

interface DigitalTicketProps {
  booking: Booking;
  onClose?: () => void;
  showModalWrapper?: boolean;
}

export const DigitalTicket: React.FC<DigitalTicketProps> = ({
  booking,
  onClose,
  showModalWrapper = false
}) => {
  const [isCheckedIn, setIsCheckedIn] = useState(booking.status === 'Completed');
  const [simulatingScan, setSimulatingScan] = useState(false);

  const handleSimulateScan = () => {
    setSimulatingScan(true);
    setTimeout(() => {
      setIsCheckedIn(true);
      setSimulatingScan(false);
    }, 700);
  };

  const ticketContent = (
    <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl border border-[#E7E5E4] overflow-hidden font-sans">
      
      {/* 1. Header Banner: Dark Charcoal with Orange Typography */}
      <div className="bg-[#171717] text-white p-6 flex items-center justify-between border-b border-black/20">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#F97316] font-extrabold block">
            KENYA EXPEDITION BOARDING PASS
          </span>
          <h2 className="text-2xl font-black tracking-tight text-white mt-0.5">
            SAFARIPULSE<span className="text-[#F97316]">.</span>
          </h2>
        </div>

        <div className="text-right">
          <span className="text-[9px] uppercase tracking-wider text-white/60 block">Reference No.</span>
          <span className="text-sm font-bold text-[#F97316] font-mono">{booking.bookingReference}</span>
        </div>
      </div>

      {/* 2. Photography & Trip Overview Header Strip */}
      <div className="relative h-44 bg-[#FAF7F2] overflow-hidden">
        <img
          src={booking.adventure.featuredImage}
          alt={booking.adventure.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        
        {/* Status Stamps on Image */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="bg-[#F97316] text-white text-[10px] uppercase tracking-widest font-extrabold px-2.5 py-1 rounded-md shadow-sm">
            PAID IN FULL
          </span>
          <span className="bg-white/20 backdrop-blur-xs text-white text-[10px] uppercase tracking-widest font-extrabold px-2.5 py-1 rounded-md">
            CONFIRMED
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#F97316] block">
            {booking.adventure.destination}
          </span>
          <h3 className="text-xl font-extrabold leading-tight mt-0.5">
            {booking.adventure.title}
          </h3>
        </div>
      </div>

      {/* 3. Main Flight-Style Travel Matrix */}
      <div className="p-6 bg-white space-y-6">
        
        {/* Matrix grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#FAF7F2] border border-[#E7E5E4]">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#737373] block">Date</span>
            <span className="text-xs font-bold text-[#171717] block mt-0.5">{formatDate(booking.travelDate)}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#737373] block">Departure</span>
            <span className="text-xs font-bold text-[#171717] block mt-0.5">{booking.adventure.departureTime}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#737373] block">Seats</span>
            <span className="text-xs font-bold text-[#171717] block mt-0.5">{booking.seatsCount} Traveler(s)</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#737373] block">Total KSh</span>
            <span className="text-xs font-extrabold text-[#F97316] block mt-0.5 tabular-nums">{formatKSh(booking.totalAmount)}</span>
          </div>
        </div>

        {/* Passenger & Staging details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#737373] block">Lead Passenger</span>
            <p className="font-bold text-[#171717] text-sm mt-0.5">{booking.leadPassenger.fullName}</p>
            <p className="text-[#737373] mt-0.5">ID / Passport: {booking.leadPassenger.idNumber || 'Verified'}</p>
            <p className="text-[#737373] font-mono">{booking.leadPassenger.phone}</p>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-[#737373] block">Departure Staging Point</span>
            <p className="font-bold text-[#171717] text-sm mt-0.5">{booking.pickupLocationSelected || booking.adventure.meetingPoint}</p>
            <p className="text-[#737373] mt-0.5">Operated by {booking.adventure.organizer.name}</p>
            <p className="text-[#F97316] font-bold mt-0.5">Hotline: {booking.adventure.organizer.phone}</p>
          </div>
        </div>

      </div>

      {/* Perforated Divider with Circular Punch Cuts */}
      <div className="relative flex items-center bg-white px-6">
        <div className="absolute -left-3.5 w-7 h-7 rounded-full bg-[#171717]/80 border-r border-[#E7E5E4]" />
        <div className="w-full border-t-2 border-dashed border-[#E7E5E4]" />
        <div className="absolute -right-3.5 w-7 h-7 rounded-full bg-[#171717]/80 border-l border-[#E7E5E4]" />
      </div>

      {/* 4. Elegant Prominent QR Code Section */}
      <div className="p-6 bg-[#FAF7F2] flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#E7E5E4]">
        
        <div className="flex items-center gap-4">
          {/* High-Contrast Vector QR Pattern */}
          <div className="p-3 bg-white rounded-xl shadow-xs border border-[#E7E5E4] shrink-0">
            <svg className="w-20 h-20 text-[#171717]" viewBox="0 0 100 100" fill="currentColor">
              <rect x="0" y="0" width="28" height="28" fill="#171717" rx="3" />
              <rect x="4" y="4" width="20" height="20" fill="white" rx="2" />
              <rect x="8" y="8" width="12" height="12" fill="#171717" rx="1" />

              <rect x="72" y="0" width="28" height="28" fill="#171717" rx="3" />
              <rect x="76" y="4" width="20" height="20" fill="white" rx="2" />
              <rect x="80" y="8" width="12" height="12" fill="#171717" rx="1" />

              <rect x="0" y="72" width="28" height="28" fill="#171717" rx="3" />
              <rect x="4" y="76" width="20" height="20" fill="white" rx="2" />
              <rect x="8" y="80" width="12" height="12" fill="#171717" rx="1" />

              <rect x="34" y="4" width="6" height="6" />
              <rect x="44" y="4" width="6" height="6" />
              <rect x="54" y="4" width="12" height="6" />
              <rect x="34" y="16" width="12" height="6" fill="#F97316" />
              <rect x="52" y="16" width="6" height="6" />
              <rect x="34" y="26" width="6" height="12" />
              <rect x="44" y="26" width="16" height="6" />
              <rect x="64" y="26" width="6" height="6" />

              <rect x="4" y="34" width="6" height="12" />
              <rect x="16" y="34" width="8" height="6" />
              <rect x="4" y="52" width="12" height="6" />
              <rect x="20" y="44" width="6" height="16" />

              <rect x="34" y="44" width="12" height="12" fill="#171717" />
              <rect x="52" y="44" width="8" height="6" />
              <rect x="64" y="44" width="12" height="6" />
              <rect x="80" y="34" width="6" height="16" />

              <rect x="34" y="64" width="6" height="12" fill="#F97316" />
              <rect x="44" y="60" width="14" height="6" />
              <rect x="44" y="72" width="6" height="14" />
              <rect x="56" y="72" width="12" height="6" />
              <rect x="72" y="60" width="6" height="12" />
              <rect x="76" y="80" width="18" height="6" />
            </svg>
          </div>

          <div className="text-xs">
            <span className="font-mono font-bold text-[#171717] block">{booking.qrCodeToken}</span>
            <span className="text-[#737373] text-[11px] block mt-1">
              Show this pass to your organizer at pickup staging.
            </span>
            <div className="mt-2 flex items-center gap-1.5">
              {isCheckedIn ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  CHECKED IN AT STAGING
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleSimulateScan}
                  disabled={simulatingScan}
                  className="px-2.5 py-1 rounded-md bg-[#FFF7ED] text-[#F97316] border border-[#F97316]/30 hover:bg-[#F97316] hover:text-white transition-colors cursor-pointer text-[10px] font-bold"
                >
                  {simulatingScan ? 'Scanning...' : 'Simulate Ranger Scan'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex sm:flex-col gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => window.print()}
            className="flex-1 sm:flex-none px-4 py-2 bg-white hover:bg-[#FAF7F2] border border-[#E7E5E4] rounded-xl text-xs font-bold text-[#171717] cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Print Pass</span>
          </button>
        </div>

      </div>

      {/* 5. Emergency hotline & M-PESA Code Footer */}
      <div className="p-4 bg-white border-t border-[#E7E5E4] flex items-center justify-between text-[11px] text-[#737373]">
        <span className="font-medium">M-PESA Receipt: <strong className="text-[#171717] font-mono">{booking.mpesaReceipt || 'QJD8291KL0'}</strong></span>
        <span className="font-bold text-[#F97316]">24/7 Staging SOS Dispatch</span>
      </div>

    </div>
  );

  if (showModalWrapper) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="relative w-full max-w-lg">
          <button
            onClick={onClose}
            aria-label="Close digital ticket"
            className="absolute -top-12 right-0 text-white hover:text-white text-xs font-bold flex items-center gap-1.5 bg-white/20 hover:bg-white/30 px-4 py-2 min-h-[44px] rounded-full cursor-pointer shadow-md"
          >
            <X className="w-4 h-4" />
            <span>Close Ticket</span>
          </button>
          {ticketContent}
        </div>
      </div>
    );
  }

  return ticketContent;
};
