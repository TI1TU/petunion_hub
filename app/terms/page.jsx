import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | SHARMAZONE™',
  description: 'Terms and conditions for SHARMAZONE FASHIONS.',
};

export default function TermsPage() {
  return (
    <div className="bg-brand-black text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-widest font-mono mb-2">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Terms of Service</span>
          </div>

          <h1 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white">
            TERMS &amp; CONDITIONS
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Standard user and purchase terms for sharmazone.com / petunionhub.com.
          </p>
        </div>

        <div className="space-y-6 text-xs text-neutral-300 leading-relaxed bg-neutral-950 p-6 md:p-8 border border-brand-charcoal">
          <section className="space-y-2">
            <h2 className="font-display font-bold text-sm uppercase text-white">
              1. General Terms
            </h2>
            <p>
              This website is operated by SHARMAZONE FASHIONS (CIN: U18101DL2024PTC394821, GSTIN: 07AABCR1234F1Z9). Throughout the site, the terms &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; refer to SHARMAZONE™.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-brand-charcoal">
            <h2 className="font-display font-bold text-sm uppercase text-white">
              2. Product Sizing &amp; Descriptions
            </h2>
            <p>
              We manufacture garments according to strict streetwear tolerances (within +/- 0.5 inches). Because garments undergo enzyme mineral washing, minor variations in vintage fade tone are characteristic of the artisanal process.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-brand-charcoal">
            <h2 className="font-display font-bold text-sm uppercase text-white">
              3. Pricing &amp; GST
            </h2>
            <p>
              All listed product prices in Indian Rupees (INR ₹) are inclusive of all statutory Goods and Services Tax (GST) applicable in India.
            </p>
          </section>

          <section className="space-y-2 pt-4 border-t border-brand-charcoal">
            <h2 className="font-display font-bold text-sm uppercase text-white">
              4. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the courts of New Delhi, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
