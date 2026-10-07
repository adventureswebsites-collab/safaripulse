import React from 'react';
import { X, Bell, Calendar, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Adventure } from '../types';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAdventure?: (adventure: Adventure) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'notif-1',
      title: 'Ngong Hills Departure This Saturday',
      time: '15 mins ago',
      type: 'departure',
      message: 'Departing 8:00 AM from Nairobi CBD Hub. Only 4 slots left for this weekend\'s guided ridge trek.',
      urgent: true
    },
    {
      id: 'notif-2',
      title: 'Lipa Na M-PESA Instant Confirmation',
      time: '2 hours ago',
      type: 'payment',
      message: 'Online checkout now generates instant digital QR boarding passes on your phone.',
      urgent: false
    },
    {
      id: 'notif-3',
      title: 'New Trip Added: Lake Naivasha Camping',
      time: '1 day ago',
      type: 'trip',
      message: 'Crescent Island boat crossing & acacia campfire overland package is now open for booking.',
      urgent: false
    },
    {
      id: 'notif-4',
      title: 'Welcome to SAFARIPULSE',
      time: '2 days ago',
      type: 'welcome',
      message: 'Use code PULSEKENYA for KSh 500 off your first group overland trip or mountain summit.',
      urgent: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in">
      <div 
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl border border-[#E7E5E4] shadow-2xl flex flex-col max-h-[85vh] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#E7E5E4]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FFF7ED] text-[#F97316] flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#171717]">Trip Updates & Alerts</h3>
              <p className="text-[11px] text-[#737373]">Real-time manifest and departure notices</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#737373] hover:text-[#171717] min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg cursor-pointer"
            aria-label="Close notifications"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3.5 rounded-xl border transition-all ${
                n.urgent 
                  ? 'bg-[#FFF7ED]/50 border-[#F97316]/30' 
                  : 'bg-[#FAF7F2] border-[#E7E5E4]'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-1.5">
                  {n.urgent && (
                    <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
                  )}
                  <h4 className="text-xs sm:text-sm font-bold text-[#171717]">
                    {n.title}
                  </h4>
                </div>
                <span className="text-[10px] text-[#737373] font-medium whitespace-nowrap">
                  {n.time}
                </span>
              </div>
              <p className="text-xs text-[#737373] leading-relaxed">
                {n.message}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E7E5E4] bg-[#FAF7F2] rounded-b-2xl flex items-center justify-between">
          <span className="text-xs text-[#737373]">
            Push alerts are enabled on mobile
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#171717] text-white text-xs font-bold rounded-xl cursor-pointer min-h-[44px] flex items-center"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
