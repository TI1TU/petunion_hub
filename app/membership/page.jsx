'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Gift, Users, Copy, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function MembershipPage() {
  const { user, setIsAuthModalOpen, showToast } = useStore();
  const [copied, setCopied] = useState(false);

  const referralCode = user?.membership?.referralCode || 'RAW-GUEST200';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    showToast('Referral code copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-brand-black text-white min-h-screen py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-brand-accent">
            <Sparkles size={12} />
            <span>DISTRICT COMMUNITY TIERS</span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter text-white">
            INNER CIRCLE
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            Exclusive privileges for our most dedicated street curators. Early drop passwords, limited colorways, and referral rewards.
          </p>
        </div>

        {/* Give ₹200, Get ₹200 Card */}
        <div className="bg-neutral-950 border border-white p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-brand-charcoal pb-4 gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase bg-emerald-950 border border-emerald-700 text-emerald-400 px-2.5 py-0.5 font-bold">
                COMMUNITY REFERRAL PROGRAM
              </span>
              <h2 className="font-display font-black text-2xl uppercase text-white mt-2">
                GIVE ₹200, GET ₹200
              </h2>
            </div>
            <p className="text-xs text-neutral-400 max-w-xs">
              Give your crew ₹200 off their first drop order. When they cop, you get ₹200 instant store credit.
            </p>
          </div>

          <div className="bg-black border border-brand-charcoal p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-neutral-500 block">
                YOUR UNIQUE SHARE CODE
              </span>
              <span className="font-mono font-extrabold text-lg text-white tracking-widest">
                {referralCode}
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="bg-white hover:bg-neutral-200 text-black font-display font-black text-xs uppercase px-6 py-3 tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'CODE COPIED' : 'COPY REFERRAL CODE'}</span>
            </button>
          </div>
        </div>

        {/* Membership Perks 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-950 border border-brand-charcoal p-6 space-y-3">
            <span className="w-8 h-8 bg-brand-charcoal text-white flex items-center justify-center font-mono text-xs font-bold">
              01
            </span>
            <h3 className="font-display font-bold text-base uppercase text-white">
              24-Hour Early Access
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Skip the general queue. Enter new seasonal drops and restocks 24 hours before public release via SMS password.
            </p>
          </div>

          <div className="bg-neutral-950 border border-brand-charcoal p-6 space-y-3">
            <span className="w-8 h-8 bg-brand-charcoal text-white flex items-center justify-center font-mono text-xs font-bold">
              02
            </span>
            <h3 className="font-display font-bold text-base uppercase text-white">
              Free Luxury Gift Wrap
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every Inner Circle order includes our complimentary matte black packaging with embossed wax seal and custom greeting note.
            </p>
          </div>

          <div className="bg-neutral-950 border border-brand-charcoal p-6 space-y-3">
            <span className="w-8 h-8 bg-brand-charcoal text-white flex items-center justify-center font-mono text-xs font-bold">
              03
            </span>
            <h3 className="font-display font-bold text-base uppercase text-white">
              Birthday Drop Voucher
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Receive an exclusive ₹500 discount voucher during your birth month with zero minimum spend threshold.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center pt-8 border-t border-brand-charcoal space-y-4">
          <p className="text-xs text-neutral-400">
            {user ? 'You are an active Inner Circle member.' : 'Join the Inner Circle instantly with your mobile number.'}
          </p>
          {!user && (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="bg-white hover:bg-neutral-200 text-black font-display font-black text-xs uppercase px-8 py-4 tracking-wider transition-colors inline-flex items-center gap-2"
            >
              <span>JOIN INNER CIRCLE WITH OTP</span>
              <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
