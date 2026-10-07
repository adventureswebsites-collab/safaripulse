import React, { useState } from 'react';
import { UserProfile } from '../types';
import { 
  User, Mail, Phone, Shield, Bell, CheckCircle2, 
  MapPin, Award, Lock, Save 
} from 'lucide-react';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, onUpdateUser }) => {
  const [formData, setFormData] = useState<UserProfile>(user);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-[#6E736B]">Account Credentials</span>
        <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#0E2319] tracking-tight mt-1">
          Traveler Dossier & Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#6E736B] mt-1">
          Keep your National ID and emergency contacts verified for park manifest gates and mountain rescue teams.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* User Card */}
        <div className="p-6 bg-white rounded-2xl border border-[#E5DFD3] flex flex-col sm:flex-row items-center gap-6">
          <img
            src={formData.avatar}
            alt={formData.fullName}
            referrerPolicy="no-referrer"
            className="w-20 h-20 rounded-full object-cover border-2 border-[#0E2319]"
          />

          <div className="flex-1 text-center sm:text-left space-y-1">
            <h3 className="font-editorial text-xl font-bold text-[#0E2319]">{formData.fullName}</h3>
            <p className="text-xs text-[#6E736B] font-mono">{formData.email}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
              <span className="text-[10px] font-mono font-bold text-[#0E2319] bg-[#EFEBE4] px-2.5 py-0.5 rounded">
                Verified Citizen / Resident
              </span>
              <span className="text-[10px] font-mono text-[#6E736B] bg-[#F8F6F1] border border-[#E5DFD3] px-2 py-0.5 rounded">
                National ID: {formData.idNumber}
              </span>
            </div>
          </div>
        </div>

        {/* Personal Details */}
        <div className="p-6 bg-white rounded-2xl border border-[#E5DFD3] space-y-4">
          <h3 className="font-editorial text-lg font-bold text-[#0E2319]">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#0E2319] mb-1">Full Legal Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F8F6F1] border border-[#E5DFD3] rounded-lg text-[#191B19] focus:outline-none focus:border-[#0E2319]"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-[#0E2319] mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F8F6F1] border border-[#E5DFD3] rounded-lg text-[#191B19] focus:outline-none focus:border-[#0E2319]"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-[#0E2319] mb-1">Phone Number (M-PESA)</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F8F6F1] border border-[#E5DFD3] rounded-lg text-[#191B19] font-mono focus:outline-none focus:border-[#0E2319]"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-[#0E2319] mb-1">National ID / Passport No.</label>
              <input
                type="text"
                value={formData.idNumber}
                onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#F8F6F1] border border-[#E5DFD3] rounded-lg text-[#191B19] font-mono focus:outline-none focus:border-[#0E2319]"
                required
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="p-6 bg-white rounded-2xl border border-[#E5DFD3] space-y-4">
          <div>
            <h3 className="font-editorial text-lg font-bold text-[#0E2319]">
              Wilderness Emergency Dispatch Contact
            </h3>
            <p className="text-xs text-[#6E736B] mt-0.5">
              Used strictly by mountain rescue teams and safari dispatch in case of field medical necessity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#0E2319] mb-1">Contact Name</label>
              <input
                type="text"
                value={formData.emergencyContact.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emergencyContact: { ...formData.emergencyContact, name: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2.5 bg-[#F8F6F1] border border-[#E5DFD3] rounded-lg text-[#191B19] focus:outline-none focus:border-[#0E2319]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#0E2319] mb-1">Contact Phone</label>
              <input
                type="tel"
                value={formData.emergencyContact.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emergencyContact: { ...formData.emergencyContact, phone: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2.5 bg-[#F8F6F1] border border-[#E5DFD3] rounded-lg text-[#191B19] font-mono focus:outline-none focus:border-[#0E2319]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#0E2319] mb-1">Relationship</label>
              <input
                type="text"
                value={formData.emergencyContact.relationship}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emergencyContact: { ...formData.emergencyContact, relationship: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2.5 bg-[#F8F6F1] border border-[#E5DFD3] rounded-lg text-[#191B19] focus:outline-none focus:border-[#0E2319]"
              />
            </div>
          </div>
        </div>

        {/* Travel Preferences */}
        <div className="p-6 bg-white rounded-2xl border border-[#E5DFD3] space-y-4">
          <h3 className="font-editorial text-lg font-bold text-[#0E2319]">
            Travel Preferences
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-[#0E2319] mb-1">Dietary Preference</label>
              <input
                type="text"
                value={formData.preferences.diet}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    preferences: { ...formData.preferences, diet: e.target.value }
                  })
                }
                className="w-full px-3.5 py-2.5 bg-[#F8F6F1] border border-[#E5DFD3] rounded-lg text-[#191B19] focus:outline-none focus:border-[#0E2319]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#0E2319] mb-1">Physical Grade</label>
              <select
                value={formData.preferences.fitnessLevel}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    preferences: { ...formData.preferences, fitnessLevel: e.target.value as any }
                  })
                }
                className="w-full px-3.5 py-2.5 bg-[#F8F6F1] border border-[#E5DFD3] rounded-lg text-[#191B19] focus:outline-none focus:border-[#0E2319] cursor-pointer"
              >
                <option value="Easy">Easy (Leisure / Family)</option>
                <option value="Moderate">Moderate (Active Weekend Hiker)</option>
                <option value="Challenging">Challenging (Alpine Summits)</option>
                <option value="Strenuous">Strenuous (Endurance)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess ? (
            <span className="text-xs font-semibold text-[#0E2319] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#E05626]" />
              <span>Dossier successfully updated!</span>
            </span>
          ) : (
            <span className="text-xs text-[#6E736B]">
              Protected under Laws of Kenya (Data Protection Act).
            </span>
          )}

          <button
            type="submit"
            className="px-6 py-3 bg-[#E05626] hover:bg-[#C43C0E] text-white rounded-xl text-xs uppercase tracking-wider font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>SAVE PROFILE</span>
          </button>
        </div>

      </form>

    </div>
  );
};
