import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, Clock, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Shipping Policy | SHARMAZONE™ Delhi NCR',
  description: 'Delhi NCR express delivery rates, timelines, COD availability and tracking information.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="bg-brand-black text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-widest font-mono mb-2">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Shipping Policy</span>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white">
            DELHI NCR EXPRESS SHIPPING POLICY
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Express doorstep delivery across Delhi, Noida, Gurugram, and Ghaziabad.
          </p>
        </div>

        <div className="space-y-6 text-xs text-neutral-300 leading-relaxed bg-neutral-950 p-6 md:p-8 border border-brand-charcoal">
          <section className="space-y-2">
            <h2 className="font-display font-bold text-sm uppercase text-white">
              1. Shipping Charges &amp; Free Shipping Threshold
            </h2>
            <p>
              • <strong>Orders ₹999 and Above:</strong> 100% FREE Pan-India Express Shipping.
            </p>
            <p>
              • <strong>Orders Below ₹999:</strong> A nominal flat standard shipping fee of ₹99 applies across all states and union territories.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-brand-charcoal">
            <h2 className="font-display font-bold text-sm uppercase text-white">
              2. Delivery Timelines
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-black border border-brand-charcoal">
                <p className="font-bold text-white uppercase text-[11px]">Delhi NCR &amp; North India</p>
                <p className="text-[11px] text-emerald-400 mt-0.5">2 - 3 Business Days</p>
              </div>
              <div className="p-3 bg-black border border-brand-charcoal">
                <p className="font-bold text-white uppercase text-[11px]">Tier-1 Metros (Mumbai, BLR, HYD)</p>
                <p className="text-[11px] text-emerald-400 mt-0.5">3 - 4 Business Days</p>
              </div>
              <div className="p-3 bg-black border border-brand-charcoal">
                <p className="font-bold text-white uppercase text-[11px]">Rest of India &amp; Tier-2/3 Cities</p>
                <p className="text-[11px] text-neutral-300 mt-0.5">4 - 6 Business Days</p>
              </div>
              <div className="p-3 bg-black border border-brand-charcoal">
                <p className="font-bold text-white uppercase text-[11px]">North-East &amp; Remote Pincodes</p>
                <p className="text-[11px] text-neutral-300 mt-0.5">5 - 7 Business Days</p>
              </div>
            </div>
          </section>

          <section className="space-y-2 pt-4 border-t border-brand-charcoal">
            <h2 className="font-display font-bold text-sm uppercase text-white">
              3. Cash on Delivery (COD)
            </h2>
            <p>
              Cash on Delivery is available for orders up to ₹5,000. For COD orders, an automated WhatsApp / SMS verification link is triggered to confirm the recipient&apos;s phone number and address before dispatch.
            </p>
            <p>
              A convenience handling fee of ₹49 is charged by our logistics partners for cash collections.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-brand-charcoal">
            <h2 className="font-display font-bold text-sm uppercase text-white">
              4. Logistics Partners
            </h2>
            <p>
              All shipments are fulfilled directly from our primary distribution center in New Delhi through premium air-express logistics providers: Delhivery, Bluedart, and XpressBees.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
