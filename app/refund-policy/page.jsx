import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Refund & Return Policy | SHARMAZONE™',
  description: '7-Day hassle-free return and exchange terms for SHARMAZONE streetwear.',
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-brand-black text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-widest font-mono mb-2">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Refund Policy</span>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white">
            RETURN, EXCHANGE &amp; REFUND POLICY
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Easy 7-day doorstep reverse pickups across Delhi NCR.
          </p>
        </div>

        <div className="space-y-6 text-xs text-neutral-300 leading-relaxed bg-neutral-950 p-6 md:p-8 border border-brand-charcoal">
          <section className="space-y-2">
            <h2 className="font-display font-bold text-sm uppercase text-white">
              1. 7-Day Window
            </h2>
            <p>
              You have 7 days from the confirmed date of delivery to initiate an exchange or return request through our online portal.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-brand-charcoal">
            <h2 className="font-display font-bold text-sm uppercase text-white">
              2. Exchange vs Return
            </h2>
            <p>
              • <strong>Size Exchange:</strong> 100% Free doorstep swap. Our courier delivers your replacement size and collects the original package simultaneously.
            </p>
            <p>
              • <strong>Returns:</strong> Available for store credit or original payment method refund (UPI/bank transfer).
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-brand-charcoal">
            <h2 className="font-display font-bold text-sm uppercase text-white">
              3. Refund Timelines
            </h2>
            <p>
              Once the returned piece is picked up and passes our basic quality inspection at the warehouse, your refund will be processed within 24 to 48 business hours via UPI intent or original bank source.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-brand-charcoal">
            <h2 className="font-display font-bold text-sm uppercase text-white">
              4. Condition Requirements
            </h2>
            <p>
              Garments must be unworn, unwashed, and returned with the original SHARMAZONE brand tag and internal wash label intact.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
