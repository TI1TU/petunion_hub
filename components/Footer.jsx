'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function Footer() {
  const { showToast } = useStore();
  const [email, setEmail] = useState('');
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    showToast('Welcome! 10% coupon code: FIRST10');
    setEmail('');
  };

  return (
    <footer className="bg-brand-black border-t border-brand-charcoal text-white pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Brand Statement & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-brand-charcoal">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-display font-black text-2xl md:text-3xl tracking-widest uppercase text-white block">
              SHARMAZONE<span className="text-xs align-super text-neutral-400 font-sans">®</span>
            </span>
            <p className="text-xs text-neutral-400 max-w-md leading-relaxed font-sans">
              Contemporary elevated fashion for Delhi NCR. Designed and milled in India with dropped shoulders, architectural cuts, and refined mineral washes. Built for everyday wear.
            </p>
            <div className="text-[11px] text-neutral-500 font-mono space-y-1">
              <p>Atelier & Hub: Okhla Industrial Area, Phase III, New Delhi 110020</p>
              <p>Serving: Delhi • Noida • Gurugram • Ghaziabad</p>
            </div>
          </div>

          <div className="lg:col-span-7 bg-neutral-950 p-6 md:p-8 border border-brand-charcoal">
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-accent font-mono">
              INSIDER DROP RADAR • DELHI NCR
            </span>
            <h3 className="font-display font-black text-lg sm:text-xl uppercase tracking-tight text-white mt-1">
              GET 10% OFF YOUR FIRST ORDER
            </h3>
            <p className="text-xs text-neutral-400 mt-1 mb-4 font-sans">
              Sign up for secret drop passwords, priority Delhi NCR restocks, and exclusive styling releases.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-950/50 border border-emerald-800 text-emerald-400 text-xs font-semibold flex items-center gap-2 font-mono">
                <Check size={16} /> YOU&apos;RE ON THE LIST. USE CODE &ldquo;FIRST10&rdquo; AT CHECKOUT.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-black border border-brand-charcoal px-3.5 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white font-mono"
                  />
                  <button
                    type="submit"
                    className="bg-white hover:bg-neutral-200 text-black font-display font-extrabold text-xs uppercase px-6 py-3 tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <span>JOIN</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
                <label className="flex items-center gap-2 text-[11px] text-neutral-400 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={whatsappOptIn}
                    onChange={(e) => setWhatsappOptIn(e.target.checked)}
                    className="accent-white rounded-none"
                  />
                  <span>Send drop announcements &amp; tracking updates via WhatsApp</span>
                </label>
              </form>
            )}
          </div>
        </div>

        {/* Middle Section: Organized Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-brand-charcoal text-xs">
          {/* Col 1: Shop */}
          <div>
            <h4 className="font-display font-bold uppercase text-white tracking-wider mb-4 text-[13px]">
              COLLECTIONS
            </h4>
            <ul className="space-y-2.5 text-neutral-400 font-sans">
              <li>
                <Link href="/shop/oversized-t-shirts" className="hover:text-white transition-colors">
                  Oversized T-Shirts
                </Link>
              </li>
              <li>
                <Link href="/shop/cargo-pants" className="hover:text-white transition-colors">
                  Cargo &amp; Utility Pants
                </Link>
              </li>
              <li>
                <Link href="/shop/jeans" className="hover:text-white transition-colors">
                  Baggy &amp; Relaxed Denims
                </Link>
              </li>
              <li>
                <Link href="/shop/hoodies" className="hover:text-white transition-colors">
                  Heavyweight Hoodies
                </Link>
              </li>
              <li>
                <Link href="/shop/winterwear" className="hover:text-white transition-colors">
                  Winter Outerwear
                </Link>
              </li>
              <li>
                <Link href="/shop?filter=bestseller" className="hover:text-white transition-colors">
                  Best Selling Pieces
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Sizing & Fits */}
          <div>
            <h4 className="font-display font-bold uppercase text-white tracking-wider mb-4 text-[13px]">
              FIT &amp; ATELIER
            </h4>
            <ul className="space-y-2.5 text-neutral-400 font-sans">
              <li>
                <Link href="/size-guide" className="hover:text-white transition-colors">
                  Size &amp; Measurements Chart
                </Link>
              </li>
              <li>
                <Link href="/find-your-fit" className="hover:text-white transition-colors">
                  Interactive 3D Fit Finder
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About SHARMAZONE
                </Link>
              </li>
              <li>
                <Link href="/atelier" className="hover:text-white transition-colors">
                  The Atelier &amp; Craft
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div>
            <h4 className="font-display font-bold uppercase text-white tracking-wider mb-4 text-[13px]">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2.5 text-neutral-400 font-sans">
              <li>
                <Link href="/track-order" className="hover:text-white transition-colors">
                  Track Live Order
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  Delhi NCR Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  7-Day Returns &amp; Exchange
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Concierge
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@sharmazone.com"
                  className="hover:text-white transition-colors font-mono"
                >
                  support@sharmazone.com
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Security */}
          <div>
            <h4 className="font-display font-bold uppercase text-white tracking-wider mb-4 text-[13px]">
              LEGAL &amp; SECURITY
            </h4>
            <ul className="space-y-2.5 text-neutral-400 font-sans">
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-emerald-400 transition-colors font-mono text-[11px]">
                  Admin Console
                </Link>
              </li>
              <li className="pt-2">
                <span className="inline-block bg-neutral-900 border border-brand-charcoal text-[11px] text-neutral-300 px-2.5 py-1 font-mono">
                  Delhi NCR Exclusive Service
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Payments & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] text-neutral-500 font-mono">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-neutral-400 font-semibold uppercase tracking-wider">ACCEPTED PAYMENTS:</span>
            <span className="px-2 py-0.5 bg-neutral-900 border border-brand-charcoal text-neutral-300">UPI Instant</span>
            <span className="px-2 py-0.5 bg-neutral-900 border border-brand-charcoal text-neutral-300">RuPay</span>
            <span className="px-2 py-0.5 bg-neutral-900 border border-brand-charcoal text-neutral-300">Google Pay</span>
            <span className="px-2 py-0.5 bg-neutral-900 border border-brand-charcoal text-neutral-300">PhonePe</span>
            <span className="px-2 py-0.5 bg-neutral-900 border border-brand-charcoal text-neutral-300">Visa / Master</span>
            <span className="px-2 py-0.5 bg-neutral-900 border border-brand-charcoal text-emerald-400">Cash on Delivery</span>
          </div>

          <div className="text-center md:text-right">
            <p>© {new Date().getFullYear()} SHARMAZONE APPAREL. ALL RIGHTS RESERVED.</p>
            <p className="mt-0.5 text-neutral-600">Delivering across Delhi, Noida, Gurugram &amp; Ghaziabad.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
