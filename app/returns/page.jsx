import React from 'react';
import Link from 'next/link';
import { RotateCcw, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Returns & Exchange Policy | SHARMAZONE Delhi NCR',
  description:
    '7-Day Doorstep Returns and Instant Exchanges across Delhi NCR. Read SHARMAZONE return terms and easy pickup details.',
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-brand-black text-white pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent font-bold">
            CUSTOMER ASSURANCE
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white mt-2">
            7-DAY EASY RETURNS & EXCHANGES
          </h1>
          <p className="text-sm text-neutral-400 mt-2">
            Hassle-free doorstep pickup across Delhi, Noida, Gurugram, and Ghaziabad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-neutral-950 border border-neutral-800 p-5 space-y-2">
            <RotateCcw size={22} className="text-white" />
            <h3 className="font-display font-bold text-sm uppercase text-white">
              7-Day Return Window
            </h3>
            <p className="text-xs text-neutral-400">
              Initiate a return or size exchange within 7 days of doorstep delivery.
            </p>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 p-5 space-y-2">
            <CheckCircle2 size={22} className="text-emerald-400" />
            <h3 className="font-display font-bold text-sm uppercase text-white">
              Complimentary Doorstep Pickup
            </h3>
            <p className="text-xs text-neutral-400">
              Our courier collects the parcel right from your address in Delhi NCR.
            </p>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 p-5 space-y-2">
            <ShieldCheck size={22} className="text-white" />
            <h3 className="font-display font-bold text-sm uppercase text-white">
              Instant UPI / Bank Refund
            </h3>
            <p className="text-xs text-neutral-400">
              Refunds are initiated within 24 hours of package inspection at our Delhi atelier.
            </p>
          </div>
        </div>

        <div className="space-y-6 text-neutral-300 text-xs sm:text-sm font-sans leading-relaxed border-t border-neutral-800 pt-8">
          <h2 className="font-display font-bold text-lg uppercase text-white">
            Return Conditions & Guidelines
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-neutral-400">
            <li>Garments must be unworn, unwashed, and in their original pristine state.</li>
            <li>All original designer tags and garment seal loops must remain attached.</li>
            <li>Original packaging box and invoices must be handed back during pickup.</li>
          </ul>

          <p className="pt-4">
            Need to exchange a size? Reach our concierge directly via{' '}
            <Link href="/contact" className="text-white underline font-bold">
              Contact Concierge
            </Link>{' '}
            or WhatsApp (+91 98765 43210).
          </p>
        </div>
      </div>
    </div>
  );
}
