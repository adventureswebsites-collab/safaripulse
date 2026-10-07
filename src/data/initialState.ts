import { Booking, UserProfile } from '../types';
import { ADVENTURES } from './adventures';

export const INITIAL_USER: UserProfile = {
  id: 'usr-kevin-otieno-254',
  fullName: 'Kevin Otieno',
  email: 'kevin.otieno@gmail.com',
  phone: '+254 712 345 678',
  idNumber: '34891024',
  nationality: 'Kenyan',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  emergencyContact: {
    name: 'Grace Achieng Otieno',
    phone: '+254 722 998 123',
    relationship: 'Spouse'
  },
  preferences: {
    diet: 'No special restrictions (Omnivore)',
    fitnessLevel: 'Moderate',
    notificationsEnabled: true
  }
};

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-01-mara',
    bookingReference: 'SP-KE-84920',
    adventureId: 'adv-mara-safari-01',
    adventure: ADVENTURES[0], // Mara Safari
    travelDate: '2026-10-23',
    seatsCount: 2,
    leadPassenger: {
      fullName: 'Kevin Otieno',
      email: 'kevin.otieno@gmail.com',
      phone: '+254 712 345 678',
      idNumber: '34891024',
      dietaryRequirements: 'None',
      emergencyContactName: 'Grace Otieno',
      emergencyContactPhone: '+254 722 998 123'
    },
    additionalPassengers: [
      {
        fullName: 'Grace Achieng Otieno',
        email: 'grace.achieng@gmail.com',
        phone: '+254 722 998 123',
        idNumber: '35120984',
        dietaryRequirements: 'Vegetarian'
      }
    ],
    totalAmount: 44000, // 2 * (18500 + 3500)
    conservationFeesTotal: 7000,
    status: 'Confirmed',
    paymentStatus: 'Paid in Full',
    paymentMethod: 'M-PESA',
    mpesaReceipt: 'QJD8291KL0',
    bookedAt: '2026-10-02T14:32:00Z',
    qrCodeToken: 'SP-KE-84920-VERIFIED-SEKENANI-GATE',
    pickupLocationSelected: 'Kencom House CBD (06:00 AM)'
  },
  {
    id: 'bk-02-hellsgate',
    bookingReference: 'SP-KE-79114',
    adventureId: 'adv-hells-gate-05',
    adventure: ADVENTURES[0], // Hell's Gate
    travelDate: '2026-09-14',
    seatsCount: 2,
    leadPassenger: {
      fullName: 'Kevin Otieno',
      email: 'kevin.otieno@gmail.com',
      phone: '+254 712 345 678',
      idNumber: '34891024'
    },
    totalAmount: 11400, // 2 * (4900 + 800)
    conservationFeesTotal: 1600,
    status: 'Completed',
    paymentStatus: 'Paid in Full',
    paymentMethod: 'M-PESA',
    mpesaReceipt: 'PKF7320MN9',
    bookedAt: '2026-09-01T09:15:00Z',
    qrCodeToken: 'SP-KE-79114-USED',
    pickupLocationSelected: 'Sarit Centre Westlands (06:45 AM)'
  },
  {
    id: 'bk-03-naivasha',
    bookingReference: 'SP-KE-64201',
    adventureId: 'adv-naivasha-camp-04',
    adventure: ADVENTURES[1], // Naivasha
    travelDate: '2026-08-02',
    seatsCount: 1,
    leadPassenger: {
      fullName: 'Kevin Otieno',
      email: 'kevin.otieno@gmail.com',
      phone: '+254 712 345 678',
      idNumber: '34891024'
    },
    totalAmount: 9000,
    conservationFeesTotal: 1200,
    status: 'Cancelled',
    paymentStatus: 'Deposit Paid',
    paymentMethod: 'M-PESA',
    mpesaReceipt: 'RFX88410AZ',
    bookedAt: '2026-07-20T11:45:00Z',
    qrCodeToken: 'SP-KE-64201-CANCELLED',
    pickupLocationSelected: 'National Museum Hill (07:00 AM)'
  }
];

export const INITIAL_SAVED_IDS = ['adv-mt-kenya-02', 'adv-diani-dhow-03'];
