'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { RotateCcw, Check, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function ReturnsExchangePage() {
  const { showToast } = useStore();
  const [orderId, setOrderId] = useState('RD-2026-89421');
  const [phone, setPhone] = useState('9876543210');
  const [requestType, setRequestType] = useState('exchange'); // 'exchange' | 'return'
  const [reason, setReason] = useState('size-small');
  const [newSize, setNewSize] = useState('XL');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Doorstep exchange request confirmed!');
  };

  return (
    <div className="bg-brand-black text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-widest font-mono mb-2">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Returns &amp; Exchange</span>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white">
            7-DAY DOORSTEP EXCHANGE &amp; RETURNS
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Zero friction. We send our courier partner to your doorstep with the replacement size.
          </p>
        </div>

        {/* Policy Highlights Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 bg-neutral-950 border border-brand-charcoal">
            <p className="font-display font-bold text-xs uppercase text-white">
              100% Free Exchange
            </p>
            <p className="text-[11px] text-neutral-400 mt-1">
              Zero reverse courier charges for all size adjustments.
            </p>
          </div>
          <div className="p-4 bg-neutral-950 border border-brand-charcoal">
            <p className="font-display font-bold text-xs uppercase text-white">
              Doorstep Handover
            </p>
            <p className="text-[11px] text-neutral-400 mt-1">
              Courier will pick up the item from your registered address.
            </p>
          </div>
          <div className="p-4 bg-neutral-950 border border-brand-charcoal">
            <p className="font-display font-bold text-xs uppercase text-white">
              Instant UPI Refunds
            </p>
            <p className="text-[11px] text-neutral-400 mt-1">
              Refunds credited directly to your original UPI account upon inspection.
            </p>
          </div>
        </div>

        {/* Portal Form */}
        <div className="p-6 bg-neutral-950 border border-brand-charcoal">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 bg-emerald-950/60 border border-emerald-700 text-emerald-400 mx-auto flex items-center justify-center">
                <Check size={28} />
              </div>
              <h3 className="font-display font-black text-xl uppercase text-white">
                REQUEST SCHEDULED SUCCESSFULLY
              </h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Delhivery courier will arrive at your address within 24-48 hours for doorstep pickup. Your new size ({newSize}) has already been allocated at our fulfillment center.
              </p>
              <div className="pt-4">
                <Link
                  href="/"
                  className="bg-white text-black font-display font-bold text-xs uppercase px-8 py-3 tracking-wider hover:bg-neutral-200"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-neutral-400 mb-1">
                    Order ID
                  </label>
                  <input
                    type="text"
                    required
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="w-full bg-black border border-brand-charcoal px-3 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-neutral-400 mb-1">
                    Registered Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-black border border-brand-charcoal px-3 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Request Type Toggle */}
              <div>
                <label className="block text-[11px] font-bold uppercase text-neutral-400 mb-2">
                  Select Action
                </label>
                <div className="grid grid-cols-2 gap-3 text-xs font-bold uppercase">
                  <button
                    type="button"
                    onClick={() => setRequestType('exchange')}
                    className={`py-3 text-center border transition-all ${
                      requestType === 'exchange'
                        ? 'border-white bg-white text-black'
                        : 'border-brand-charcoal text-neutral-400 hover:text-white'
                    }`}
                  >
                    Size Exchange (Fastest)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRequestType('return')}
                    className={`py-3 text-center border transition-all ${
                      requestType === 'return'
                        ? 'border-white bg-white text-black'
                        : 'border-brand-charcoal text-neutral-400 hover:text-white'
                    }`}
                  >
                    Return &amp; Refund to UPI
                  </button>
                </div>
              </div>

              {/* Reason Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase text-neutral-400 mb-1">
                  Reason for Exchange / Return
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-black border border-brand-charcoal px-3 py-2.5 text-xs text-white focus:outline-none"
                >
                  <option value="size-small">Size too small (Need larger size)</option>
                  <option value="size-big">Size too big (Need smaller size)</option>
                  <option value="fit-preference">Prefer a different fit style</option>
                  <option value="color-preference">Prefer an alternative colorway</option>
                  <option value="quality-issue">Quality inspection required</option>
                </select>
              </div>

              {requestType === 'exchange' && (
                <div>
                  <label className="block text-[11px] font-bold uppercase text-neutral-400 mb-2">
                    Replacement Size Requested
                  </label>
                  <div className="grid grid-cols-5 gap-2 text-xs">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                      <button
                        type="button"
                        key={sz}
                        onClick={() => setNewSize(sz)}
                        className={`py-2.5 text-center border font-bold ${
                          newSize === sz
                            ? 'border-white bg-white text-black'
                            : 'border-brand-charcoal text-neutral-300'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-white hover:bg-neutral-200 text-black font-display font-black text-xs uppercase py-3.5 tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <span>CONFIRM DOORSTEP PICKUP</span>
                <ArrowRight size={14} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
