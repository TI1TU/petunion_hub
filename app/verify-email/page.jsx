'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Mail } from 'lucide-react';

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-brand-black text-white flex flex-col justify-center items-center px-4 py-28 text-center">
      <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 p-8 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/50 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={32} className="text-emerald-400" />
        </div>

        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
          VERIFICATION CONFIRMED
        </span>

        <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white mt-2">
          EMAIL VERIFIED
        </h1>

        <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
          Your SHARMAZONE account is verified and ready. You can now shop exclusive drops, track Delhi NCR deliveries, and manage your wardrobe.
        </p>

        <div className="mt-8 space-y-3">
          <Link
            href="/shop"
            className="w-full bg-white hover:bg-neutral-200 text-black font-display font-black text-xs uppercase py-3.5 tracking-wider transition-colors inline-flex items-center justify-center gap-2"
          >
            <span>START SHOPPING</span>
            <ArrowRight size={15} />
          </Link>
          <Link
            href="/account"
            className="w-full block border border-neutral-700 hover:border-white text-white font-mono text-xs uppercase py-3 transition-colors"
          >
            Go to My Account
          </Link>
        </div>
      </div>
    </div>
  );
}
