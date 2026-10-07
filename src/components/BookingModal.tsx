import React, { useState } from 'react';
import { Adventure, Booking, PassengerInfo } from '../types';
import { formatKSh, formatDate } from '../utils/formatters';
import { 
  X, CheckCircle2, ChevronRight, ArrowLeft, ShieldCheck, 
  CreditCard, Smartphone, Building, User, Mail, Phone, 
  MapPin, Calendar, Users, AlertCircle, Loader2, Ticket 
} from 'lucide-react';

interface BookingModalProps {
  adventure: Adventure;
  onClose: () => void;
  onBookingComplete: (newBooking: Booking) => void;
  onViewTicket: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  adventure,
  onClose,
  onBookingComplete,
  onViewTicket
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedDate, setSelectedDate] = useState<string>(adventure.availableDates[0] || '2026-10-31');
  const [selectedPickupHub, setSelectedPickupHub] = useState<string>(adventure.pickupHubs[0] || adventure.meetingPoint);
  const [seats, setSeats] = useState<number>(1);
  
  // Passenger details
  const [leadPassenger, setLeadPassenger] = useState<PassengerInfo>({
    fullName: 'Kevin Otieno',
    email: 'kevin.otieno@gmail.com',
    phone: '+254 712 345 678',
    idNumber: '34891024',
    dietaryRequirements: '',
    emergencyContactName: 'Grace Otieno',
    emergencyContactPhone: '+254 722 998 123'
  });

  const [additionalNames, setAdditionalNames] = useState<string[]>([]);

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<'M-PESA' | 'Card' | 'Bank'>('M-PESA');
  const [mpesaNumber, setMpesaNumber] = useState<string>('0712345678');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [stkSent, setStkSent] = useState<boolean>(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  // Financials
  const baseTripTotal = adventure.pricePerPerson * seats;
  const conservationTotal = adventure.conservationLevy * seats;
  const grandTotal = baseTripTotal + conservationTotal;

  const handleSeatsChange = (newCount: number) => {
    const clamped = Math.max(1, Math.min(newCount, adventure.availableSeats));
    setSeats(clamped);
    if (clamped > 1) {
      const extraNeeded = clamped - 1;
      setAdditionalNames((prev) => {
        const next = [...prev];
        while (next.length < extraNeeded) next.push('');
        return next.slice(0, extraNeeded);
      });
    } else {
      setAdditionalNames([]);
    }
  };

  const handleProcessPayment = () => {
    setIsProcessingPayment(true);
    if (paymentMethod === 'M-PESA') setStkSent(true);

    setTimeout(() => {
      const randomRef = `SP-KE-${Math.floor(10000 + Math.random() * 90000)}`;
      const randomReceipt = `Q${Math.random().toString(36).substring(2, 6).toUpperCase()}${Math.floor(1000 + Math.random() * 9000)}`;
      
      const newBooking: Booking = {
        id: `bk-${Date.now()}`,
        bookingReference: randomRef,
        adventureId: adventure.id,
        adventure: adventure,
        travelDate: selectedDate,
        seatsCount: seats,
        leadPassenger: leadPassenger,
        additionalPassengers: additionalNames.map((name, i) => ({
          fullName: name || `Traveler ${i + 2}`,
          email: leadPassenger.email,
          phone: leadPassenger.phone,
          idNumber: 'Verified at Gate'
        })),
        totalAmount: grandTotal,
        conservationFeesTotal: conservationTotal,
        status: 'Confirmed',
        paymentStatus: 'Paid in Full',
        paymentMethod: paymentMethod === 'M-PESA' ? 'M-PESA' : 'Card',
        mpesaReceipt: randomReceipt,
        bookedAt: new Date().toISOString(),
        qrCodeToken: `${randomRef}-VERIFIED-${adventure.destination.split(' ')[0].toUpperCase()}`,
        pickupLocationSelected: selectedPickupHub
      };

      setCreatedBooking(newBooking);
      setIsProcessingPayment(false);
      onBookingComplete(newBooking);
      setCurrentStep(4);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="w-full max-w-4xl bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E7E5E4] overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="p-5 bg-[#171717] text-white flex items-center justify-between border-b border-black/20 shrink-0">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#F97316] font-extrabold">
              CONFIRMED SEAT RESERVATION
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-white truncate max-w-lg mt-0.5">
              {adventure.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close booking modal"
            className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clear Multi-Step Indicator: TRIP → TRAVELERS → PAYMENT → CONFIRMATION */}
        <div className="bg-white border-b border-[#E7E5E4] px-6 py-3.5 shrink-0">
          <div className="flex items-center justify-between text-xs uppercase tracking-wider font-extrabold">
            {[
              { num: 1, label: 'TRIP' },
              { num: 2, label: 'TRAVELERS' },
              { num: 3, label: 'PAYMENT' },
              { num: 4, label: 'CONFIRMATION' }
            ].map((step, idx) => (
              <div key={step.num} className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    currentStep === step.num
                      ? 'bg-[#F97316] text-white'
                      : currentStep > step.num
                      ? 'bg-[#171717] text-white'
                      : 'bg-[#FAF7F2] text-[#737373] border border-[#E7E5E4]'
                  }`}
                >
                  {currentStep > step.num ? '✓' : step.num}
                </span>
                <span className={currentStep === step.num ? 'text-[#F97316]' : 'text-[#737373]'}>
                  {step.label}
                </span>
                {idx < 3 && <span className="text-[#737373]/40 hidden sm:inline mx-2">→</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Modal Body with Persistent Booking Summary Layout */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Area: Forms (Span 7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* STEP 1: TRIP */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-extrabold text-[#171717]">1. Select Travel Dates</h3>
                  <p className="text-xs text-[#737373] mt-0.5">Choose your departure weekend from Nairobi.</p>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {adventure.availableDates.map((date) => (
                    <button
                      key={date}
                      type="button"
                      onClick={() => setSelectedDate(date)}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                        selectedDate === date
                          ? 'border-[#F97316] bg-[#FFF7ED] text-[#171717] ring-2 ring-[#F97316]'
                          : 'border-[#E7E5E4] bg-white hover:border-[#F97316] text-[#171717]'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold text-[#737373] block">Departure</span>
                      <span className="text-xs font-bold block mt-0.5">{formatDate(date)}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-extrabold text-[#171717]">2. Number of Travelers</h3>
                    <span className="text-xs font-bold text-[#F97316]">
                      {adventure.availableSeats} seats remaining
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-[#E7E5E4] bg-white">
                    <span className="text-xs font-bold text-[#171717]">Reserve Seats:</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleSeatsChange(seats - 1)}
                        disabled={seats <= 1}
                        className="w-9 h-9 rounded-lg border border-[#E7E5E4] font-bold text-[#171717] hover:bg-[#FAF7F2] disabled:opacity-40 cursor-pointer flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="text-base font-bold text-[#171717] w-8 text-center tabular-nums">
                        {seats}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleSeatsChange(seats + 1)}
                        disabled={seats >= adventure.availableSeats}
                        className="w-9 h-9 rounded-lg border border-[#E7E5E4] font-bold text-[#171717] hover:bg-[#FAF7F2] disabled:opacity-40 cursor-pointer flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="font-extrabold uppercase tracking-wider text-[10px] text-[#737373] block">
                    3. Select Nairobi Pickup Hub
                  </span>
                  <div className="space-y-2">
                    {adventure.pickupHubs.map((hub) => (
                      <button
                        key={hub}
                        type="button"
                        onClick={() => setSelectedPickupHub(hub)}
                        className={`w-full p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between text-xs ${
                          selectedPickupHub === hub
                            ? 'border-[#F97316] bg-white ring-1 ring-[#F97316] font-bold text-[#171717]'
                            : 'border-[#E7E5E4] bg-white hover:border-[#F97316] text-[#171717]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
                          <span>{hub}</span>
                        </div>
                        {selectedPickupHub === hub && (
                          <CheckCircle2 className="w-4 h-4 text-[#F97316] shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#E7E5E4] text-xs text-[#171717] space-y-1">
                  <span className="font-extrabold uppercase tracking-wider text-[10px] text-[#F97316] block">
                    Departure Protocol
                  </span>
                  <p>Staging at <strong className="font-bold">{selectedPickupHub}</strong> promptly at <strong className="font-bold">{adventure.departureTime}</strong>.</p>
                </div>
              </div>
            )}

            {/* STEP 2: TRAVELERS */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-extrabold text-[#171717]">Lead Traveler Credentials</h3>
                  <p className="text-xs text-[#737373] mt-0.5">Required for park gate manifest and passenger insurance.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-[#171717] mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      value={leadPassenger.fullName}
                      onChange={(e) => setLeadPassenger({ ...leadPassenger, fullName: e.target.value })}
                      className="w-full px-3 py-2.5 bg-white border border-[#E7E5E4] rounded-xl text-[#171717] focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#171717] mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={leadPassenger.email}
                      onChange={(e) => setLeadPassenger({ ...leadPassenger, email: e.target.value })}
                      className="w-full px-3 py-2.5 bg-white border border-[#E7E5E4] rounded-xl text-[#171717] focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#171717] mb-1">Phone Number (M-PESA) *</label>
                    <input
                      type="tel"
                      value={leadPassenger.phone}
                      onChange={(e) => setLeadPassenger({ ...leadPassenger, phone: e.target.value })}
                      className="w-full px-3 py-2.5 bg-white border border-[#E7E5E4] rounded-xl text-[#171717] font-mono focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#171717] mb-1">National ID or Passport No. *</label>
                    <input
                      type="text"
                      value={leadPassenger.idNumber}
                      onChange={(e) => setLeadPassenger({ ...leadPassenger, idNumber: e.target.value })}
                      className="w-full px-3 py-2.5 bg-white border border-[#E7E5E4] rounded-xl text-[#171717] font-mono focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                      required
                    />
                  </div>
                </div>

                {seats > 1 && (
                  <div className="pt-3 border-t border-[#E7E5E4] space-y-3">
                    <h4 className="text-xs uppercase tracking-wider font-extrabold text-[#171717]">
                      Additional Travelers ({seats - 1})
                    </h4>
                    {additionalNames.map((name, index) => (
                      <div key={index} className="text-xs">
                        <label className="block text-[#737373] mb-1">Traveler #{index + 2} Full Legal Name</label>
                        <input
                          type="text"
                          value={name}
                          placeholder={`Passenger ${index + 2} Legal Name`}
                          onChange={(e) => {
                            const updated = [...additionalNames];
                            updated[index] = e.target.value;
                            setAdditionalNames(updated);
                          }}
                          className="w-full px-3 py-2 bg-white border border-[#E7E5E4] rounded-xl text-[#171717] focus:outline-none focus:ring-1 focus:ring-[#F97316]"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: PAYMENT */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-extrabold text-[#171717]">Secure Payment</h3>
                  <p className="text-xs text-[#737373] mt-0.5">Protected by KATO Bonded Escrow.</p>
                </div>

                {/* Method Tabs */}
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('M-PESA')}
                    className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                      paymentMethod === 'M-PESA'
                        ? 'border-[#F97316] bg-[#FFF7ED] ring-2 ring-[#F97316] font-bold text-[#171717]'
                        : 'border-[#E7E5E4] bg-white text-[#737373]'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 mx-auto mb-1 text-[#F97316]" />
                    <span className="text-xs block font-bold">Lipa Na M-PESA</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Card')}
                    className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                      paymentMethod === 'Card'
                        ? 'border-[#F97316] bg-[#FFF7ED] ring-2 ring-[#F97316] font-bold text-[#171717]'
                        : 'border-[#E7E5E4] bg-white text-[#737373]'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mx-auto mb-1 text-[#171717]" />
                    <span className="text-xs block font-bold">Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Bank')}
                    className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                      paymentMethod === 'Bank'
                        ? 'border-[#F97316] bg-[#FFF7ED] ring-2 ring-[#F97316] font-bold text-[#171717]'
                        : 'border-[#E7E5E4] bg-white text-[#737373]'
                    }`}
                  >
                    <Building className="w-5 h-5 mx-auto mb-1 text-[#171717]" />
                    <span className="text-xs block font-bold">Bank Transfer</span>
                  </button>
                </div>

                {/* Form based on method */}
                {paymentMethod === 'M-PESA' && (
                  <div className="p-5 rounded-xl bg-white border border-[#E7E5E4] space-y-3 text-xs">
                    <span className="font-bold text-[#171717] block">Lipa Na M-PESA Express (STK Push)</span>
                    <p className="text-[#737373]">
                      Enter your Safaricom phone number to trigger the instant STK push prompt on your handset for <strong className="text-[#171717]">{formatKSh(grandTotal)}</strong>.
                    </p>

                    <div>
                      <label className="block text-[#171717] font-bold mb-1">M-PESA Number</label>
                      <input
                        type="tel"
                        value={mpesaNumber}
                        onChange={(e) => setMpesaNumber(e.target.value)}
                        placeholder="07XX XXX XXX"
                        className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#E7E5E4] rounded-xl text-sm font-mono text-[#171717] font-bold"
                      />
                    </div>

                    {stkSent && (
                      <div className="p-3 bg-[#FFF7ED] rounded-xl border border-[#F97316]/30 text-xs text-[#171717] flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-[#F97316]" />
                        <span>Prompt sent! Enter your M-PESA PIN on your phone now...</span>
                      </div>
                    )}
                  </div>
                )}

                {paymentMethod === 'Card' && (
                  <div className="p-5 rounded-xl bg-white border border-[#E7E5E4] space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-[#171717] mb-1">Card Number</label>
                      <input
                        type="text"
                        defaultValue="4242 •••• •••• 4242"
                        className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E7E5E4] rounded-xl font-mono text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-[#171717] mb-1">Expiry</label>
                        <input
                          type="text"
                          defaultValue="11/28"
                          className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E7E5E4] rounded-xl font-mono text-xs"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-[#171717] mb-1">CVC</label>
                        <input
                          type="password"
                          defaultValue="781"
                          className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E7E5E4] rounded-xl font-mono text-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'Bank' && (
                  <div className="p-5 rounded-xl bg-white border border-[#E7E5E4] text-xs text-[#737373] space-y-1.5">
                    <p className="font-bold text-[#171717]">Equity Bank Kenya Escrow Account</p>
                    <p>Account Name: <strong className="text-[#171717]">SafariPulse Expeditions Ltd</strong></p>
                    <p>Account Number: <strong className="text-[#171717]">01802938472910</strong></p>
                    <p className="text-[11px] pt-1">Your seats will be reserved for 6 hours pending payment verification.</p>
                  </div>
                )}
              </div>
            )}

            {/* STEP 4: CONFIRMATION */}
            {currentStep === 4 && createdBooking && (
              <div className="text-center py-6 space-y-5">
                <div className="w-14 h-14 bg-[#171717] text-white rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#F97316]" />
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#F97316] font-extrabold">
                    BOOKING CONFIRMED & PAID
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#171717] mt-1">
                    Your Expedition is Set!
                  </h3>
                  <p className="text-xs text-[#737373] mt-1">
                    Ref: <strong className="text-[#171717]">{createdBooking.bookingReference}</strong> · SMS sent to {createdBooking.leadPassenger.phone}
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      onViewTicket(createdBooking);
                      onClose();
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs uppercase tracking-wider font-extrabold rounded-xl transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>VIEW DIGITAL TICKET</span>
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto px-5 py-3 bg-white border border-[#E7E5E4] hover:bg-[#FAF7F2] text-[#171717] text-xs uppercase tracking-wider font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Right Area: Persistent Booking Summary (Span 5) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-[#E7E5E4] flex flex-col justify-between space-y-6 h-fit shadow-xs">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-[#737373] block font-extrabold">
                BOOKING SUMMARY
              </span>

              <div className="flex gap-3 pb-4 border-b border-[#E7E5E4]">
                <img
                  src={adventure.featuredImage}
                  alt={adventure.title}
                  referrerPolicy="no-referrer"
                  className="w-20 h-16 rounded-xl object-cover bg-[#FAF7F2] shrink-0"
                />
                <div className="truncate">
                  <h4 className="text-sm font-extrabold text-[#171717] leading-snug truncate">
                    {adventure.title}
                  </h4>
                  <p className="text-xs text-[#737373] mt-0.5">{adventure.destination}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#737373]">Date</span>
                  <span className="font-bold text-[#171717]">{formatDate(selectedDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737373]">Travelers</span>
                  <span className="font-bold text-[#171717]">{seats} Person(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737373]">Base Rate</span>
                  <span className="tabular-nums font-semibold text-[#171717]">{formatKSh(baseTripTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737373]">KWS Conservation Fees</span>
                  <span className="tabular-nums font-semibold text-[#171717]">{formatKSh(conservationTotal)}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E7E5E4] space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase font-bold text-[#737373]">Total Payable</span>
                <span className="text-2xl font-extrabold text-[#F97316] tabular-nums">
                  {formatKSh(grandTotal)}
                </span>
              </div>

              {currentStep < 4 && (
                <div className="flex items-center gap-2 pt-2">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep((prev) => (prev - 1) as any)}
                      className="px-3.5 py-3 border border-[#E7E5E4] rounded-xl text-xs font-bold text-[#171717] hover:bg-[#FAF7F2] cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  )}

                  {currentStep === 1 && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="w-full py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs uppercase tracking-wider font-extrabold rounded-xl transition-colors cursor-pointer shadow-sm text-center"
                    >
                      CONTINUE TO TRAVELERS →
                    </button>
                  )}

                  {currentStep === 2 && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="w-full py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs uppercase tracking-wider font-extrabold rounded-xl transition-colors cursor-pointer shadow-sm text-center"
                    >
                      CONTINUE TO PAYMENT →
                    </button>
                  )}

                  {currentStep === 3 && (
                    <button
                      type="button"
                      onClick={handleProcessPayment}
                      disabled={isProcessingPayment}
                      className="w-full py-3.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-xs uppercase tracking-wider font-extrabold rounded-xl transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {isProcessingPayment ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>AUTHORIZING...</span>
                        </>
                      ) : (
                        <span>PAY {formatKSh(grandTotal)}</span>
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
