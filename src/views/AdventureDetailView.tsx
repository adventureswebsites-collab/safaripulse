import React, { useState } from 'react';
import { 
  Adventure 
} from '../types';
import { formatKSh, formatDate } from '../utils/formatters';
import { 
  Star, Heart, ShieldCheck, MapPin, Calendar, Clock, 
  Users, CheckCircle2, XCircle, ArrowLeft, 
  ChevronDown, ChevronUp, Share2, Phone, Award, Compass, Sparkles, Zap 
} from 'lucide-react';
import { SAMPLE_REVIEWS } from '../data/adventures';

interface AdventureDetailViewProps {
  adventure: Adventure;
  onBack: () => void;
  onOpenBooking: (adventure: Adventure) => void;
  isSaved: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
}

export const AdventureDetailView: React.FC<AdventureDetailViewProps> = ({
  adventure,
  onBack,
  onOpenBooking,
  isSaved,
  onToggleSave
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [expandedDay, setExpandedDay] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<string>(adventure.availableDates[0] || '2026-10-31');
  const [selectedSeats, setSelectedSeats] = useState<number>(1);

  const images = adventure.galleryImages && adventure.galleryImages.length > 0 
    ? adventure.galleryImages 
    : [adventure.featuredImage];

  const totalTripAmount = (adventure.pricePerPerson + adventure.conservationLevy) * selectedSeats;
  const percentBooked = Math.round((adventure.bookedSeatsCount / adventure.totalSeats) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top back navigation */}
      <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs uppercase tracking-wider font-extrabold text-[#171717] hover:text-[#F97316] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Departures</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={(e) => onToggleSave(adventure.id, e)}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
              isSaved
                ? 'bg-white border-[#F97316] text-[#F97316]'
                : 'bg-white border-[#E7E5E4] text-[#171717] hover:border-[#F97316]'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            <span>{isSaved ? 'Saved to Wishlist' : 'Save Adventure'}</span>
          </button>
        </div>
      </div>

      {/* Bookable Departure Banner & Urgency Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="bg-[#171717] text-white px-2.5 py-1 rounded-md font-bold uppercase">
            {adventure.nextDepartureDateText}
          </span>
          <span className="bg-[#F97316] text-white px-2.5 py-1 rounded-md font-extrabold uppercase">
            {adventure.availableSeats} SEATS REMAINING
          </span>
          <span className="text-[#737373] font-medium">
            · {adventure.registrationDeadline}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#171717] tracking-tight leading-tight">
          {adventure.title}
        </h1>

        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#171717] pt-1">
          <div className="flex items-center gap-1.5 font-bold">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{adventure.rating.toFixed(2)}</span>
            <span className="text-[#737373] font-normal">({adventure.reviewsCount} verified reviews)</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#171717] font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Pickup: {adventure.pickupHubs[0]}</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#171717] font-medium">
            <Clock className="w-3.5 h-3.5 text-[#171717]" />
            <span>{adventure.durationDays} Day(s) · Departs {adventure.departureTime}</span>
          </div>
        </div>
      </div>

      {/* Immersive Photography Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#E7E5E4]">
          <img
            src={images[activeImageIndex] || adventure.featuredImage}
            alt={adventure.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-md">
            Photo {activeImageIndex + 1} of {images.length}
          </div>
        </div>

        <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-3">
          {images.map((imgUrl, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`relative aspect-[16/10] lg:aspect-auto lg:h-[135px] rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                activeImageIndex === idx ? 'border-[#F97316] ring-2 ring-[#F97316]/30' : 'border-[#E7E5E4] opacity-80 hover:opacity-100'
              }`}
            >
              <img
                src={imgUrl}
                alt={`${adventure.title} preview ${idx + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout: Main Details vs Sticky Booking Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* LEFT COLUMN: Overview, Organizer, Itinerary, Inclusions */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-[#E7E5E4] shadow-xs text-xs">
            <div>
              <span className="uppercase text-[10px] text-[#737373] font-bold block">Next Departure</span>
              <span className="font-extrabold text-[#171717] mt-1 block">{adventure.nextDepartureDateText}</span>
            </div>
            <div>
              <span className="uppercase text-[10px] text-[#737373] font-bold block">Fitness Level</span>
              <span className="font-extrabold text-[#171717] mt-1 block">{adventure.difficulty}</span>
            </div>
            <div>
              <span className="uppercase text-[10px] text-[#737373] font-bold block">Seats Booked</span>
              <span className="font-extrabold text-[#F97316] mt-1 block">{percentBooked}% Capacity</span>
            </div>
            <div>
              <span className="uppercase text-[10px] text-[#737373] font-bold block">Meeting Hub</span>
              <span className="font-extrabold text-[#171717] mt-1 block truncate">{adventure.pickupHubs[0].split(' ')[0]}</span>
            </div>
          </div>

          {/* Overview Section */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#171717]">Expedition Overview</h2>
            <p className="text-sm text-[#171717]/85 leading-relaxed">
              {adventure.overview}
            </p>
          </div>

          {/* Key Highlights */}
          <div className="space-y-4">
            <h3 className="text-sm uppercase tracking-wider font-extrabold text-[#737373]">
              Expedition Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {adventure.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#E7E5E4]">
                  <CheckCircle2 className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
                  <span className="text-[#171717] leading-relaxed font-medium">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Organizer Card */}
          <div className="p-6 bg-white rounded-2xl border border-[#E7E5E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-4">
              <img
                src={adventure.organizer.avatar}
                alt={adventure.organizer.name}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-full object-cover border border-[#E7E5E4]"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-[#171717] text-base">{adventure.organizer.name}</h4>
                  {adventure.organizer.verified && (
                    <span className="bg-[#FFF7ED] text-[#F97316] text-[10px] px-2 py-0.5 rounded-full font-extrabold">
                      VERIFIED
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#737373] mt-0.5">{adventure.organizer.licenseNumber}</p>
                <p className="text-xs text-[#171717] mt-1">
                  ★ {adventure.organizer.rating} · {adventure.organizer.tripsCount} trips hosted · Response time {adventure.organizer.responseTime}
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <a
                href={`tel:${adventure.organizer.phone}`}
                className="px-4 py-2 bg-[#FAF7F2] hover:bg-[#E7E5E4] border border-[#E7E5E4] rounded-xl text-xs font-bold text-[#171717] flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#F97316]" />
                <span>Contact Organizer</span>
              </a>
            </div>
          </div>

          {/* Itinerary */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#171717]">Day-By-Day Itinerary</h2>
            
            <div className="space-y-3">
              {adventure.itinerary.map((day) => {
                const isExpanded = expandedDay === day.day;
                return (
                  <div
                    key={day.day}
                    className="border border-[#E7E5E4] rounded-xl bg-white overflow-hidden transition-all shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedDay(isExpanded ? 0 : day.day)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between cursor-pointer hover:bg-[#FAF7F2] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-[#171717] text-white text-xs font-bold flex items-center justify-center shrink-0">
                          D{day.day}
                        </span>
                        <h4 className="text-base font-bold text-[#171717]">{day.title}</h4>
                      </div>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-[#737373]" /> : <ChevronDown className="w-4 h-4 text-[#737373]" />}
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 pt-1 text-xs text-[#171717]/80 space-y-4 border-t border-[#E7E5E4]">
                        <p className="leading-relaxed text-sm pt-2">{day.description}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#FAF7F2] rounded-xl text-xs">
                          <div>
                            <span className="uppercase text-[10px] text-[#737373] font-bold block">Meal Plan</span>
                            <span className="font-semibold text-[#171717]">{day.meals}</span>
                          </div>
                          <div>
                            <span className="uppercase text-[10px] text-[#737373] font-bold block">Overnight Stay</span>
                            <span className="font-semibold text-[#171717]">{day.accommodation}</span>
                          </div>
                        </div>

                        {day.highlights && (
                          <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                            {day.highlights.map((item, hi) => (
                              <span key={hi} className="bg-[#FAF7F2] border border-[#E7E5E4] px-2.5 py-1 rounded text-[#171717] font-medium">
                                {item}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Included / Not Included */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#E7E5E4]">
            <div className="p-6 bg-white rounded-xl border border-[#E7E5E4] space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-[#171717] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F97316]" />
                <span>What's Included</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-[#171717]">
                {adventure.included.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#F97316] font-bold">✓</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 bg-white rounded-xl border border-[#E7E5E4] space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-extrabold text-[#737373] flex items-center gap-2">
                <XCircle className="w-4 h-4 text-[#737373]" />
                <span>What's Not Included</span>
              </h3>
              <ul className="space-y-2.5 text-xs text-[#737373]">
                {adventure.notIncluded.map((notInc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#737373] font-bold">✕</span>
                    <span>{notInc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pickup Hubs & Logistics */}
          <div className="p-6 bg-[#FAF7F2] rounded-2xl border border-[#E7E5E4] space-y-4">
            <h3 className="text-lg font-bold text-[#171717]">Pickup Hubs & Boarding Logistics</h3>
            
            <div className="space-y-2 text-xs">
              {adventure.pickupHubs.map((hub, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 bg-white rounded-xl border border-[#E7E5E4]">
                  <MapPin className="w-4 h-4 text-[#F97316] shrink-0" />
                  <span className="font-bold text-[#171717]">{hub}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-[#737373]">
              Staging vehicles depart strictly on time at <strong className="text-[#171717]">{adventure.departureTime}</strong>. Guides will reach out on WhatsApp with vehicle registration numbers.
            </p>
          </div>

          {/* Traveler Reviews */}
          <div className="space-y-6 pt-6 border-t border-[#E7E5E4]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-[#171717]">Traveler Reviews</h2>
                <div className="flex items-center gap-2 text-xs text-[#737373] mt-0.5">
                  <span>★ {adventure.rating.toFixed(2)} rating</span>
                  <span>•</span>
                  <span>{adventure.reviewsCount} reviews</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {SAMPLE_REVIEWS.map((rev) => (
                <div key={rev.id} className="p-6 bg-white rounded-xl border border-[#E7E5E4] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.avatar}
                        alt={rev.author}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-xs font-bold text-[#171717]">{rev.author}</p>
                        <p className="text-[10px] text-[#737373]">{rev.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-[#171717] leading-relaxed italic">
                    "{rev.content}"
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Sticky Instant Booking Panel */}
        <div className="lg:col-span-4 sticky top-28">
          <div className="bg-white rounded-2xl border border-[#E7E5E4] shadow-lg p-6 sm:p-7 space-y-6">
            
            {/* Price Header */}
            <div className="pb-5 border-b border-[#E7E5E4]">
              <span className="text-[10px] uppercase font-bold text-[#737373] block">Rate Per Traveler</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-extrabold text-[#171717] tabular-nums">
                  {formatKSh(adventure.pricePerPerson)}
                </span>
                <span className="text-xs text-[#737373]">/ seat</span>
              </div>
              <p className="text-[11px] text-[#737373] mt-1 font-medium">
                + {formatKSh(adventure.conservationLevy)} KWS park entry & conservation levy
              </p>
            </div>

            {/* Departure Date Selector */}
            <div>
              <label className="block text-[10px] uppercase font-extrabold tracking-wider text-[#737373] mb-2">
                Select Departure Date
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 bg-[#FAF7F2] border border-[#E7E5E4] rounded-xl text-xs font-bold text-[#171717] focus:outline-none cursor-pointer"
              >
                {adventure.availableDates.map((date) => (
                  <option key={date} value={date}>
                    {formatDate(date)} (Departs {adventure.departureTime})
                  </option>
                ))}
              </select>
            </div>

            {/* Seats Stepper */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] uppercase font-extrabold tracking-wider text-[#737373]">
                  Number of Seats
                </label>
                <span className="text-xs text-[#F97316] font-bold">
                  {adventure.availableSeats} seats remaining
                </span>
              </div>

              <div className="flex items-center justify-between p-3 border border-[#E7E5E4] rounded-xl bg-[#FAF7F2]">
                <button
                  type="button"
                  onClick={() => setSelectedSeats(Math.max(1, selectedSeats - 1))}
                  disabled={selectedSeats <= 1}
                  className="w-8 h-8 rounded-lg bg-white border border-[#E7E5E4] font-bold text-[#171717] disabled:opacity-40 cursor-pointer flex items-center justify-center hover:bg-[#E7E5E4]"
                >
                  -
                </button>
                <span className="text-sm font-bold text-[#171717] tabular-nums">
                  {selectedSeats} {selectedSeats === 1 ? 'Seat' : 'Seats'}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedSeats(Math.min(adventure.availableSeats, selectedSeats + 1))}
                  disabled={selectedSeats >= adventure.availableSeats}
                  className="w-8 h-8 rounded-lg bg-white border border-[#E7E5E4] font-bold text-[#171717] disabled:opacity-40 cursor-pointer flex items-center justify-center hover:bg-[#E7E5E4]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Itemized Calculation */}
            <div className="p-4 bg-[#FAF7F2] rounded-xl space-y-2 text-xs">
              <div className="flex justify-between text-[#737373]">
                <span>Base Trip Rate</span>
                <span className="tabular-nums font-semibold text-[#171717]">
                  {formatKSh(adventure.pricePerPerson * selectedSeats)}
                </span>
              </div>
              <div className="flex justify-between text-[#737373]">
                <span>Park Conservation Levy</span>
                <span className="tabular-nums font-semibold text-[#171717]">
                  {formatKSh(adventure.conservationLevy * selectedSeats)}
                </span>
              </div>
              <div className="border-t border-[#E7E5E4] pt-2 flex justify-between font-bold text-[#171717] text-sm">
                <span>Total Amount</span>
                <span className="font-extrabold text-[#F97316] tabular-nums">
                  {formatKSh(totalTripAmount)}
                </span>
              </div>
            </div>

            {/* Primary Action Button: BOOK NOW */}
            <button
              type="button"
              onClick={() => onOpenBooking(adventure)}
              className="w-full py-4 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs uppercase font-extrabold tracking-wider rounded-xl transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <span>RESERVE SEAT NOW · {formatKSh(totalTripAmount)}</span>
            </button>

            {/* Trust Reassurance */}
            <div className="text-[11px] text-[#737373] text-center space-y-1 font-medium">
              <p className="flex items-center justify-center gap-1.5 text-[#171717] font-bold">
                <ShieldCheck className="w-4 h-4 text-[#F97316]" />
                <span>Lipa Na M-PESA STK Push Escrow</span>
              </p>
              <p>Instant digital boarding pass generated with QR check-in.</p>
            </div>

          </div>
        </div>

      </div>

      {/* Mobile Sticky Booking Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E7E5E4] p-4 flex items-center justify-between shadow-2xl">
        <div>
          <span className="text-[10px] text-[#737373] block uppercase font-bold">Total ({selectedSeats} {selectedSeats === 1 ? 'Seat' : 'Seats'})</span>
          <span className="text-lg font-extrabold text-[#F97316]">{formatKSh(totalTripAmount)}</span>
        </div>

        <button
          onClick={() => onOpenBooking(adventure)}
          className="px-5 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-extrabold uppercase rounded-xl transition-colors cursor-pointer shadow-md flex items-center gap-1.5"
        >
          <span>RESERVE SEAT</span>
          <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
        </button>
      </div>

    </div>
  );
};
