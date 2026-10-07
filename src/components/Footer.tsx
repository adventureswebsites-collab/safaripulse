import React from 'react';
import { 
  ShieldCheck, PhoneCall, Award, CreditCard, ArrowRight,
  Instagram, Twitter, Facebook, Youtube, Mail, Compass
} from 'lucide-react';

interface FooterProps {
  onSelectCategory?: (category: string) => void;
  onSelectDestination?: (destination: string) => void;
  onNavigateTab?: (tab: any) => void;
  onOpenOrganizerModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onSelectCategory, 
  onSelectDestination,
  onNavigateTab,
  onOpenOrganizerModal
}) => {
  return (
    <footer className="bg-[#171717] text-white border-t border-neutral-800 mt-10 sm:mt-16 pb-16 md:pb-0">
      
      {/* Trust & Guarantee Strip */}
      <div className="border-b border-neutral-800 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8">
            <div className="flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-[#F97316] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide">100% KATO Bonded Operators</h4>
                <p className="text-xs text-[#FAF7F2]/70 mt-1 leading-relaxed">
                  Every tour company is registered with Kenya Tourism Regulatory Authority (TRA).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CreditCard className="w-6 h-6 text-[#F97316] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide">M-PESA & Card Escrow</h4>
                <p className="text-xs text-[#FAF7F2]/70 mt-1 leading-relaxed">
                  Instant STK Push confirmation. Your funds are protected in escrow until departure.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Award className="w-6 h-6 text-[#F97316] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide">Certified Field Guides</h4>
                <p className="text-xs text-[#FAF7F2]/70 mt-1 leading-relaxed">
                  Led by certified KPSGA naturalists and Mountain Club of Kenya guides.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <PhoneCall className="w-6 h-6 text-[#F97316] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide">24/7 Field Rescue Desk</h4>
                <p className="text-xs text-[#FAF7F2]/70 mt-1 leading-relaxed">
                  Live dispatch from Nairobi for weather, roads, and emergency coordination.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-10">
          
          {/* Brand Column (Span 4) */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-2xl font-black text-white tracking-tight">
              SAFARIPULSE<span className="text-[#F97316]">.</span>
            </span>
            <p className="text-xs text-[#FAF7F2]/70 leading-relaxed max-w-sm">
              The modern marketplace connecting active travelers with accredited Kenyan outdoor adventures, mountain treks, bush camps, and coastal marine escapes. All pricing in KSh with instant digital boarding passes.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#instagram" className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-[#F97316] flex items-center justify-center text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#twitter" className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-[#F97316] flex items-center justify-center text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#facebook" className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-[#F97316] flex items-center justify-center text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#youtube" className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-[#F97316] flex items-center justify-center text-white transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 text-xs text-[#FAF7F2]/60 space-y-1">
              <p>The Mirage, Chiromo Road, Westlands, Nairobi</p>
              <p>Hotline: <span className="text-[#F97316] font-bold">+254 (0) 700 723 274</span></p>
            </div>
          </div>

          {/* Navigation (Span 2) */}
          <div className="md:col-span-2">
            <h5 className="text-xs uppercase tracking-widest text-white mb-4 font-bold">
              Marketplace
            </h5>
            <ul className="space-y-2.5 text-xs text-[#FAF7F2]/75">
              <li>
                <button
                  onClick={() => onNavigateTab && onNavigateTab('explore')}
                  className="hover:text-[#F97316] transition-colors cursor-pointer"
                >
                  Explore
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab && onNavigateTab('explore')}
                  className="hover:text-[#F97316] transition-colors cursor-pointer"
                >
                  Adventures
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab && onNavigateTab('home')}
                  className="hover:text-[#F97316] transition-colors cursor-pointer"
                >
                  Destinations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab && onNavigateTab('home')}
                  className="hover:text-[#F97316] transition-colors cursor-pointer"
                >
                  Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab && onNavigateTab('home')}
                  className="hover:text-[#F97316] transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* Destinations (Span 2) */}
          <div className="md:col-span-2">
            <h5 className="text-xs uppercase tracking-widest text-white mb-4 font-bold">
              Destinations
            </h5>
            <ul className="space-y-2.5 text-xs text-[#FAF7F2]/75">
              {['Nairobi', 'Naivasha', 'Diani', 'Mombasa', 'Maasai Mara', 'Amboseli', 'Mount Kenya'].map((dest) => (
                <li key={dest}>
                  <button
                    onClick={() => onSelectDestination && onSelectDestination(dest)}
                    className="hover:text-[#F97316] transition-colors text-left cursor-pointer"
                  >
                    {dest}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories (Span 2) */}
          <div className="md:col-span-2">
            <h5 className="text-xs uppercase tracking-widest text-white mb-4 font-bold">
              Categories
            </h5>
            <ul className="space-y-2.5 text-xs text-[#FAF7F2]/75">
              {[
                'Hiking & Outdoor', 
                'Safari & Wildlife', 
                'Beach Escapes', 
                'Road Trips', 
                'Camping', 
                'Cultural Experiences', 
                'Water Activities'
              ].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => onSelectCategory && onSelectCategory(cat)}
                    className="hover:text-[#F97316] transition-colors text-left cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Organizers & Support (Span 2) */}
          <div className="md:col-span-2">
            <h5 className="text-xs uppercase tracking-widest text-white mb-4 font-bold">
              Partner & Help
            </h5>
            <ul className="space-y-2.5 text-xs text-[#FAF7F2]/75">
              <li>
                <button 
                  onClick={onOpenOrganizerModal}
                  className="hover:text-[#F97316] transition-colors text-left cursor-pointer font-bold text-[#F97316]"
                >
                  Become an Organizer
                </button>
              </li>
              <li className="hover:text-[#F97316] cursor-pointer">Help Center</li>
              <li className="hover:text-[#F97316] cursor-pointer">Contact Support</li>
              <li className="hover:text-[#F97316] cursor-pointer">Terms of Service</li>
              <li className="hover:text-[#F97316] cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF7F2]/50 gap-4">
          <p>© 2026 SafariPulse Adventures. All rights reserved. Registered in Kenya.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="hover:text-white cursor-pointer">Privacy</span>
            <span className="hover:text-white cursor-pointer">M-PESA Escrow Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
