import React from 'react';
import Link from 'next/link';
import { Truck, Clock, MapPin, ShieldCheck, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Shipping & Delivery Policy | SHARMAZONE Delhi NCR',
  description:
    'SHARMAZONE delivery service area guidelines and SLAs. Serving Delhi, Noida, Gurugram, and Ghaziabad exclusively with priority dispatch.',
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-brand-black text-white pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent font-bold">
            FULFILLMENT & LOGISTICS
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white mt-2">
            DELHI NCR SHIPPING POLICY
          </h1>
          <p className="text-sm text-neutral-400 mt-2">
            Last Updated: October 2026 • Exclusive Service Network
          </p>
        </div>

        {/* Highlighted Service Area Box */}
        <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <MapPin size={24} className="text-emerald-400" />
            <div>
              <h2 className="font-display font-bold text-base uppercase text-white">
                Approved Service Coverage: Delhi NCR
              </h2>
              <p className="text-xs text-neutral-400">
                To guarantee superior handling, tailored transit times, and immediate exchanges, SHARMAZONE operates strictly in:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {[
              { city: 'Delhi', code: '110xxx PINs', eta: '24 Hours' },
              { city: 'Noida & Gr. Noida', code: '2013xx PINs', eta: '24-48 Hours' },
              { city: 'Gurugram', code: '122xxx PINs', eta: '24-48 Hours' },
              { city: 'Ghaziabad', code: '2010xx PINs', eta: '24-48 Hours' },
            ].map((reg) => (
              <div key={reg.city} className="bg-neutral-900 border border-neutral-800 p-3">
                <p className="font-display font-bold text-sm text-white">{reg.city}</p>
                <p className="text-[11px] font-mono text-neutral-400">{reg.code}</p>
                <p className="text-[10px] font-mono text-emerald-400 mt-1 font-bold">ETA: {reg.eta}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8 text-neutral-300 text-xs sm:text-sm font-sans leading-relaxed">
          <section className="space-y-3">
            <h3 className="font-display font-bold text-base uppercase text-white">
              1. Delivery Charges & Thresholds
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-neutral-400">
              <li>
                <strong className="text-white">Orders above ₹999:</strong> Free Express Delivery across all serviceable Delhi NCR pincodes.
              </li>
              <li>
                <strong className="text-white">Orders below ₹999:</strong> Standard delivery fee of ₹99.
              </li>
              <li>
                <strong className="text-white">Cash on Delivery (COD):</strong> Available at no additional processing fee for all verified Delhi NCR addresses.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="font-display font-bold text-base uppercase text-white">
              2. Dispatch & Live Tracking
            </h3>
            <p>
              All orders are hand-inspected, steam-pressed, and packaged in our Okhla atelier. You will receive an SMS and email notification with an express tracking link as soon as your courier is assigned. Track your order at any time on our{' '}
              <Link href="/track-order" className="text-white underline font-bold">
                Live Order Tracker
              </Link>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-display font-bold text-base uppercase text-white">
              3. Unserviceable Areas
            </h3>
            <p>
              Addresses outside Delhi, Noida, Gurugram, and Ghaziabad cannot be processed at this time. Our checkout system automatically checks postal codes against our authorized logistics routing table to prevent erroneous dispatches.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
