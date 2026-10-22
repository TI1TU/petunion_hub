'use client';

import React, { useState } from 'react';
import { X, Bell, Check, MessageCircle } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function NotifyMeModal() {
  const { notifyModalData, setNotifyModalData, showToast } = useStore();
  const [phone, setPhone] = useState('');
  const [channel, setChannel] = useState('whatsapp'); // 'whatsapp' | 'email'
  const [submitted, setSubmitted] = useState(false);

  if (!notifyModalData) return null;

  const { product, size } = notifyModalData;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast(`Restock alert set for ${product.name} (Size ${size})`);
  };

  const handleClose = () => {
    setNotifyModalData(null);
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={handleClose} />

      <div className="relative w-full max-w-md bg-brand-black border border-brand-charcoal p-6 sm:p-8 shadow-2xl text-white z-10 space-y-5">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 bg-emerald-950/60 border border-emerald-700 text-emerald-400 mx-auto flex items-center justify-center">
              <Check size={24} />
            </div>
            <h3 className="font-display font-black text-lg uppercase text-white">
              YOU&apos;RE FIRST IN LINE
            </h3>
            <p className="text-xs text-neutral-400">
              We will send you a direct alert the moment size <strong>{size}</strong> restocks in our New Delhi warehouse.
            </p>
            <button
              onClick={handleClose}
              className="mt-2 bg-white text-black font-display font-bold text-xs uppercase px-6 py-2.5 tracking-wider hover:bg-neutral-200"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-brand-accent flex items-center gap-1.5">
                <Bell size={12} /> RESTOCK RADAR NOTIFICATION
              </span>
              <h3 className="font-display font-black text-xl uppercase tracking-tight text-white mt-1">
                NOTIFY WHEN AVAILABLE
              </h3>
              <p className="text-xs text-neutral-400 mt-1">
                Size <strong>{size}</strong> in <strong>{product.name}</strong> is currently on batch reprint. Enter your details to get first dibs before the public drop.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-neutral-400 mb-1">
                  10-Digit Mobile Number
                </label>
                <div className="flex border border-brand-charcoal bg-neutral-950">
                  <span className="px-3 py-2.5 text-xs font-bold text-neutral-400 border-r border-brand-charcoal flex items-center">
                    🇮🇳 +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 bg-transparent text-white text-xs px-3 py-2.5 focus:outline-none font-semibold"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-neutral-400">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="notifyChannel"
                    checked={channel === 'whatsapp'}
                    onChange={() => setChannel('whatsapp')}
                    className="accent-white"
                  />
                  <span>WhatsApp Alert (Fastest)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="notifyChannel"
                    checked={channel === 'email'}
                    onChange={() => setChannel('email')}
                    className="accent-white"
                  />
                  <span>SMS Only</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={phone.length < 10}
                className="w-full bg-white hover:bg-neutral-200 disabled:opacity-50 text-black font-display font-black text-xs uppercase py-3.5 tracking-wider transition-colors"
              >
                NOTIFY ME ON RESTOCK
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
