import React, { useState } from 'react';
import { X, Lock, Mail, User, Shield, Compass } from 'lucide-react';
import { UserProfile } from '../types';
import { INITIAL_USER } from '../data/initialState';

interface AuthModalProps {
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [role, setRole] = useState<'traveler' | 'organizer'>('traveler');
  const [email, setEmail] = useState('kevin.otieno@gmail.com');
  const [fullName, setFullName] = useState('Kevin Otieno');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess({
      ...INITIAL_USER,
      fullName: fullName || 'Kevin Otieno',
      email: email || 'kevin.otieno@gmail.com'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E7E5E4] overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-[#171717] text-white flex items-center justify-between border-b border-black/20">
          <div>
            <span className="text-2xl font-black tracking-tight text-white">
              SAFARIPULSE<span className="text-[#F97316]">.</span>
            </span>
            <p className="text-xs text-[#FAF7F2]/70 mt-0.5">
              {mode === 'signin' ? 'Welcome back to your adventure account' : 'Join Kenya’s outdoor experience marketplace'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role toggle */}
        <div className="p-3 bg-white border-b border-[#E7E5E4] flex gap-2">
          <button
            type="button"
            onClick={() => setRole('traveler')}
            className={`flex-1 py-2 text-xs uppercase font-extrabold tracking-wider rounded-xl transition-colors cursor-pointer ${
              role === 'traveler'
                ? 'bg-[#F97316] text-white shadow-xs'
                : 'text-[#737373] hover:text-[#171717]'
            }`}
          >
            Traveler
          </button>
          <button
            type="button"
            onClick={() => setRole('organizer')}
            className={`flex-1 py-2 text-xs uppercase font-extrabold tracking-wider rounded-xl transition-colors cursor-pointer ${
              role === 'organizer'
                ? 'bg-[#F97316] text-white shadow-xs'
                : 'text-[#737373] hover:text-[#171717]'
            }`}
          >
            Organizer
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#171717]">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#737373] absolute left-3 top-3" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Peterson Munene"
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-[#E7E5E4] rounded-xl text-[#171717] focus:outline-none focus:border-[#F97316]"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#171717]">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#737373] absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="peterson@domain.co.ke"
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-[#E7E5E4] rounded-xl text-[#171717] focus:outline-none focus:border-[#F97316]"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#171717]">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#737373] absolute left-3 top-3" />
              <input
                type="password"
                defaultValue="secretpassword123"
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-[#E7E5E4] rounded-xl text-[#171717] focus:outline-none focus:border-[#F97316]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-xs uppercase tracking-wider font-extrabold text-white bg-[#F97316] hover:bg-[#EA580C] rounded-xl transition-colors cursor-pointer shadow-sm mt-2"
          >
            {mode === 'signin' ? 'Sign In to Account' : 'Create Account'}
          </button>

          <div className="pt-2 text-center text-xs text-[#737373]">
            {mode === 'signin' ? (
              <p>
                Don’t have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-[#F97316] font-bold hover:underline cursor-pointer"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-[#F97316] font-bold hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </form>

      </div>
    </div>
  );
};
