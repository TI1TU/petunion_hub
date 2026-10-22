'use client';

import React, { useState } from 'react';
import { X, Smartphone, ArrowRight, ShieldCheck, CheckCircle2, User, Package, MapPin, LogOut } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, user, loginUser, logoutUser } = useStore();
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [otp, setOtp] = useState(['4', '2', '8', '9']);
  const [timer, setTimer] = useState(30);

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length < 10) return;
    setStep('otp');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    loginUser(phone, name || 'Kabir Verma');
    setStep('phone');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="absolute inset-0"
        onClick={() => setIsAuthModalOpen(false)}
      />

      <div className="relative w-full max-w-md bg-brand-black border border-brand-charcoal p-6 sm:p-8 shadow-2xl text-white z-10">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {user ? (
          /* User Profile Dashboard */
          <div className="space-y-6">
            <div className="border-b border-brand-charcoal pb-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 flex items-center gap-1">
                <CheckCircle2 size={12} /> VERIFIED SHARMAZONE MEMBER
              </span>
              <h2 className="font-display font-black text-xl uppercase tracking-tight text-white mt-1">
                {user.name}
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">+91 {user.phone}</p>
            </div>

            {/* Quick stats / sections */}
            <div className="space-y-3">
              <div className="p-3 bg-neutral-950 border border-brand-charcoal">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-white mb-1">
                  <Package size={14} className="text-neutral-400" />
                  <span>Recent Order ({user.orders?.[0]?.id})</span>
                </div>
                <div className="flex justify-between items-center text-xs text-neutral-400">
                  <span>Status: <strong className="text-emerald-400">{user.orders?.[0]?.status}</strong></span>
                  <span>₹{user.orders?.[0]?.total}</span>
                </div>
                <p className="text-[10px] text-neutral-500 mt-1">
                  Shipped via {user.orders?.[0]?.carrier} • AWB {user.orders?.[0]?.awb}
                </p>
              </div>

              <div className="p-3 bg-neutral-950 border border-brand-charcoal">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-white mb-1">
                  <MapPin size={14} className="text-neutral-400" />
                  <span>Default Delivery Address</span>
                </div>
                <p className="text-xs text-neutral-300">
                  {user.addresses?.[0]?.addressLine}, {user.addresses?.[0]?.city} - {user.addresses?.[0]?.pincode}
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  logoutUser();
                  setStep('phone');
                }}
                className="flex-1 bg-neutral-900 border border-brand-charcoal hover:bg-neutral-800 text-xs font-bold uppercase py-3 transition-colors text-neutral-300 flex items-center justify-center gap-2"
              >
                <LogOut size={14} /> Log Out
              </button>
              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="flex-1 bg-white text-black font-display font-bold text-xs uppercase py-3 tracking-wider hover:bg-neutral-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ) : step === 'phone' ? (
          /* Step 1: Mobile Number Input */
          <div className="space-y-5">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-accent">
                SHARMAZONE CLUB ACCESS
              </span>
              <h2 className="font-display font-black text-xl uppercase tracking-tight text-white mt-1">
                INSTANT SIGN IN
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                Enter your mobile number to get instant OTP. No passwords required.
              </p>
            </div>

            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold text-neutral-400 mb-1.5">
                  Your Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kabir Verma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-neutral-950 border border-brand-charcoal text-white text-xs px-3.5 py-3 focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold text-neutral-400 mb-1.5">
                  10-Digit Mobile Number
                </label>
                <div className="flex border border-brand-charcoal bg-neutral-950 focus-within:border-white">
                  <span className="px-3.5 py-3 text-xs font-bold text-neutral-400 border-r border-brand-charcoal flex items-center">
                    🇮🇳 +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 bg-transparent text-white text-sm font-semibold px-3 py-3 focus:outline-none tracking-widest"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={phone.length < 10}
                className="w-full bg-white hover:bg-neutral-200 disabled:opacity-50 text-black font-display font-extrabold text-xs uppercase py-3.5 tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <span>SEND 4-DIGIT OTP</span>
                <ArrowRight size={15} />
              </button>
            </form>

            <div className="text-[10px] text-neutral-500 space-y-1 text-center pt-2 border-t border-brand-charcoal">
              <p className="flex items-center justify-center gap-1">
                <ShieldCheck size={12} className="text-neutral-400" /> By continuing, you agree to our Terms & Privacy Policy
              </p>
            </div>
          </div>
        ) : (
          /* Step 2: OTP Verification */
          <div className="space-y-5">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">
                VERIFICATION CODE SENT
              </span>
              <h2 className="font-display font-black text-xl uppercase tracking-tight text-white mt-1">
                ENTER OTP
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                We sent a 4-digit code to <strong className="text-white">+91 {phone}</strong>
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="flex justify-between gap-3">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const next = [...otp];
                      next[idx] = e.target.value;
                      setOtp(next);
                    }}
                    className="w-14 h-14 bg-neutral-950 border border-brand-charcoal text-center text-xl font-display font-extrabold text-white focus:outline-none focus:border-white"
                  />
                ))}
              </div>

              <div className="flex justify-between items-center text-xs text-neutral-400">
                <span>Auto-filled for demo</span>
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-neutral-300 hover:text-white underline"
                >
                  Edit Number
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-white hover:bg-neutral-200 text-black font-display font-extrabold text-xs uppercase py-3.5 tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <span>VERIFY & ACCESS ACCOUNT</span>
                <ArrowRight size={15} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
