'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Truck, ArrowRight, MessageCircle } from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'SZ-2026-89421';
  const trackingId = searchParams.get('trackingId') || 'SZDLH982736192';

  return (
    <div className="bg-brand-black text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-neutral-950 border border-brand-charcoal p-6 sm:p-10 space-y-8 text-center shadow-2xl">
        <div className="w-16 h-16 bg-emerald-950/60 border border-emerald-700 text-emerald-400 mx-auto flex items-center justify-center">
          <CheckCircle2 size={32} />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
            ORDER CONFIRMED &amp; PROCESSING
          </span>
          <h1 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white">
            THANK YOU FOR CHOOSING SHARMAZONE
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
            Your order has been verified on our server. Our Delhi NCR fulfillment facility is preparing your pieces for express dispatch.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-black border border-brand-charcoal p-5 text-left space-y-3 text-xs">
          <div className="flex justify-between items-center border-b border-brand-charcoal pb-2.5">
            <span className="text-neutral-400">Order Reference:</span>
            <span className="font-mono font-bold text-white uppercase">{orderId}</span>
          </div>
          <div className="flex justify-between items-center border-b border-brand-charcoal pb-2.5">
            <span className="text-neutral-400">Delivery Service Area:</span>
            <span className="text-emerald-400 font-semibold">Delhi NCR Express (24-48 Hours)</span>
          </div>
          <div className="flex justify-between items-center border-b border-brand-charcoal pb-2.5">
            <span className="text-neutral-400">Logistics Carrier:</span>
            <span className="text-white font-medium">SHARMAZONE Delhi Priority (AWB: {trackingId})</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-neutral-400">Exchange Window:</span>
            <span className="text-neutral-300">7 Days Doorstep Pickup</span>
          </div>
        </div>

        {/* Live Notification Notice */}
        <div className="p-4 bg-brand-charcoal/40 border border-brand-charcoal flex items-center gap-3 text-left">
          <MessageCircle size={22} className="text-[#25D366] flex-shrink-0" />
          <div className="text-xs text-neutral-300">
            <p className="font-bold text-white">SMS & WhatsApp Dispatch Alerts Active</p>
            <p className="text-[11px] text-neutral-400">
              You will receive real-time updates as your courier moves across Delhi NCR.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href={`/track-order?id=${orderId}`}
            className="flex-1 bg-white hover:bg-neutral-200 text-black font-display font-black text-xs uppercase py-3.5 tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <Truck size={14} />
            <span>TRACK LIVE ORDER</span>
          </Link>
          <Link
            href="/shop"
            className="flex-1 bg-brand-charcoal hover:bg-neutral-800 text-white font-display font-bold text-xs uppercase py-3.5 tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <span>CONTINUE SHOPPING</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-brand-black text-white min-h-screen py-16 flex items-center justify-center">
          <div className="text-xs uppercase font-mono tracking-widest text-neutral-400">Loading Order Details...</div>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
