import React from 'react';
import { Adventure } from '../types';
import { formatKSh } from '../utils/formatters';
import { Zap, Clock, MapPin, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface DepartureBoardProps {
  adventures: Adventure[];
  onSelectAdventure: (adventure: Adventure) => void;
  onQuickBook: (adventure: Adventure) => void;
}

export const DepartureBoard: React.FC<DepartureBoardProps> = ({
  adventures,
  onSelectAdventure,
  onQuickBook
}) => {
  return (
    <div className="bg-[#171717] text-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-neutral-800 shadow-2xl space-y-6">
      
      {/* Terminal Board Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-neutral-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] animate-ping" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#F97316] font-bold">
              LIVE NAIROBI EXPEDITION DEPARTURES BOARD
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Upcoming Weekend Slots Manifest
          </h2>
          <p className="text-xs text-[#FAF7F2]/75">
            Confirmed overland departures leaving Kencom CBD, Westlands Shell, and Museum Hill this week.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>KATO Bonded</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-[#F97316]/20 border border-[#F97316]/40 text-[#F97316] font-bold">
            Escrow Protected
          </div>
        </div>
      </div>

      {/* Departures Table / List */}
      <div className="divide-y divide-neutral-800">
        {adventures.map((adv) => {
          const percentBooked = Math.round((adv.bookedSeatsCount / adv.totalSeats) * 100);
          const isUrgent = adv.availableSeats <= 3;

          return (
            <div
              key={adv.id}
              className="py-4 hover:bg-white/[0.04] transition-colors rounded-xl px-2 sm:px-3 flex flex-col lg:flex-row lg:items-center justify-between gap-4 group cursor-pointer"
              onClick={() => onSelectAdventure(adv)}
            >
              {/* Departure Date, Time & Status */}
              <div className="lg:w-64 shrink-0 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">
                    {adv.nextDepartureDateText}
                  </span>
                  {adv.isGuaranteedDeparture && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                      CONFIRMED
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#FAF7F2]/60">
                  <Clock className="w-3.5 h-3.5 text-[#F97316]" />
                  <span>{adv.departureTime}</span>
                  <span className="text-white/30">·</span>
                  <span className="truncate">{adv.durationDays === 1 ? 'Day Escape' : `${adv.durationDays}D/${adv.durationNights}N`}</span>
                </div>
              </div>

              {/* Experience Details */}
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#F97316] transition-colors truncate">
                    {adv.title}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#FAF7F2]/70">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#F97316]" />
                    <span className="truncate max-w-[200px] sm:max-w-none">{adv.pickupHubs[0]}</span>
                  </span>
                  <span className="text-white/30">|</span>
                  <span className="text-[#FAF7F2]/50">{adv.organizer.name}</span>
                </div>
              </div>

              {/* Availability Progress & Urgency */}
              <div className="lg:w-48 shrink-0 space-y-1.5">
                <div className="flex justify-between items-center text-[10px]">
                  <span className={isUrgent ? 'text-[#F97316] font-bold flex items-center gap-1' : 'text-[#FAF7F2]/70'}>
                    {isUrgent && <Zap className="w-2.5 h-2.5 fill-current" />}
                    <span>{adv.availableSeats} of {adv.totalSeats} seats left</span>
                  </span>
                  <span className="text-[#FAF7F2]/50 font-bold">{percentBooked}% booked</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isUrgent ? 'bg-[#F97316]' : 'bg-emerald-400'
                    }`}
                    style={{ width: `${percentBooked}%` }}
                  />
                </div>
              </div>

              {/* Price & Action */}
              <div className="lg:w-44 shrink-0 flex items-center justify-between lg:justify-end gap-4 pt-2 lg:pt-0 border-t lg:border-t-0 border-neutral-800">
                <div className="text-left lg:text-right">
                  <span className="text-base sm:text-lg font-bold text-white block leading-tight">
                    {formatKSh(adv.pricePerPerson)}
                  </span>
                  <span className="text-[10px] text-[#FAF7F2]/60">all-inclusive</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickBook(adv);
                  }}
                  className="px-3.5 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs uppercase font-extrabold rounded-xl transition-colors cursor-pointer shadow-sm flex items-center gap-1 shrink-0"
                >
                  <span>BOOK</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Footer reassurance */}
      <div className="pt-3 border-t border-neutral-800 flex flex-wrap items-center justify-between text-[11px] text-[#FAF7F2]/60 gap-3">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Real-time seat allocation with instant Lipa Na M-PESA STK confirmation</span>
        </span>
        <span>Registration closes 24h prior for park ranger clearance</span>
      </div>

    </div>
  );
};
