export type AdventureCategory = 
  | 'Day Hikes & Trails' 
  | 'Overnight Bush Camps' 
  | 'Weekend Road Trips' 
  | 'Alpine Summits' 
  | 'Coastal & Water' 
  | 'Safari Expeditions'
  | 'Hiking & Outdoor'
  | 'Safari & Wildlife'
  | 'Beach Escapes'
  | 'Road Trips'
  | 'Camping'
  | 'Cultural Experiences'
  | 'Water Activities';

export type AdventureDifficulty = 'Easy' | 'Moderate' | 'Challenging' | 'Strenuous';

export interface Organizer {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  tripsCount: number;
  verified: boolean;
  licenseNumber: string; // e.g. KATO / TRA Registered
  responseTime: string;
  phone: string;
  email: string;
  organizedCountThisYear: number;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  meals: string;
  accommodation: string;
  highlights: string[];
}

export interface Review {
  id: string;
  author: string;
  location: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  verifiedPurchase: boolean;
  tripTaken: string;
}

export interface Adventure {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  destination: string;
  region: string;
  category: AdventureCategory;
  difficulty: AdventureDifficulty;
  durationDays: number;
  durationNights: number;
  pricePerPerson: number; // in KSh
  conservationLevy: number; // KWS or conservancy fees in KSh
  featuredImage: string;
  galleryImages: string[];
  rating: number;
  reviewsCount: number;
  availableDates: string[];
  nextDepartureDateText: string; // e.g. "This Saturday, 11 Oct"
  departureTime: string;
  registrationDeadline: string; // e.g. "Closes Thursday 8:00 PM"
  pickupHubs: string[]; // e.g. ['Kencom House Nairobi', 'Sarit Centre Westlands']
  totalSeats: number;
  availableSeats: number;
  bookedSeatsCount: number;
  isGuaranteedDeparture: boolean;
  experienceVibe: string; // e.g. "Social Road Trip", "Endurance Trek", "Relaxed Campout"
  meetingPoint: string;
  organizer: Organizer;
  overview: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  included: string[];
  notIncluded: string[];
  requirements: string[];
  cancellationPolicy: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  isPopular?: boolean;
  isThisWeekend?: boolean;
  isNew?: boolean;
}

export interface PassengerInfo {
  fullName: string;
  email: string;
  phone: string;
  idNumber: string;
  dietaryRequirements?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  preferredPickupHub?: string;
}

export type BookingStatus = 'Confirmed' | 'Completed' | 'Cancelled';
export type PaymentStatus = 'Paid in Full' | 'Pending STK' | 'Deposit Paid';

export interface Booking {
  id: string;
  bookingReference: string;
  adventureId: string;
  adventure: Adventure;
  travelDate: string;
  seatsCount: number;
  leadPassenger: PassengerInfo;
  additionalPassengers?: PassengerInfo[];
  totalAmount: number; // KSh
  conservationFeesTotal: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: 'M-PESA' | 'Card' | 'Bank Transfer';
  mpesaReceipt?: string;
  bookedAt: string;
  qrCodeToken: string;
  pickupLocationSelected: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  idNumber: string;
  nationality: string;
  avatar: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  preferences: {
    diet: string;
    fitnessLevel: AdventureDifficulty;
    notificationsEnabled: boolean;
  };
}

export interface FilterState {
  searchQuery: string;
  category: string;
  dateFilter: 'all' | 'this-weekend' | 'next-weekend' | 'next-30-days';
  maxPrice: number;
  difficulty: string;
  pickupHub: string;
  urgentSeatsOnly: boolean;
  guaranteedOnly: boolean;
  sortBy: 'departing-soon' | 'price-asc' | 'price-desc' | 'popular' | 'rating';
}

export type ActiveTab = 'home' | 'explore' | 'detail' | 'dashboard' | 'my-bookings' | 'my-tickets' | 'saved' | 'profile';
