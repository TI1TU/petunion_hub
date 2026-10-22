import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Behind the Seams | SHARMAZONE™ Streetwear Journal',
  description: 'The craftsmanship, milling philosophy, and New Delhi street origins of SHARMAZONE™ apparel.',
};

export default function JournalPage() {
  return (
    <div className="bg-brand-black text-white min-h-screen py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-brand-accent">
            <Sparkles size={12} />
            <span>SHARMAZONE EDITORIAL JOURNAL</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter text-white">
            BEHIND THE SEAMS
          </h1>

          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Real fabrics. Real factories. No fast-fashion shortcuts. The untold narrative of how we engineer architectural streetwear in India.
          </p>
        </div>

        {/* Lead Feature Story: Ludhiana Milling */}
        <article className="border border-brand-charcoal bg-neutral-950 p-6 sm:p-10 space-y-6">
          <div className="aspect-[16/9] bg-neutral-900 overflow-hidden border border-brand-charcoal">
            <img
              src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1400&q=80"
              alt="Ludhiana Knitting Looms"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-mono uppercase text-brand-accent font-bold">
              ESSAY 01 • PROVENANCE &amp; SOURCING
            </span>
            <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
              CIRCULAR LOOMS TO NEW DELHI STUDIO
            </h2>
            <div className="text-xs text-neutral-300 leading-relaxed space-y-3">
              <p>
                When we launched SHARMAZONE™, Indian streetwear was flooded with flimsy lightweight promotional tees bearing massive logos. We wanted the opposite: silent branding, structural weight, and enduring craftsmanship.
              </p>
              <p>
                Our raw long-staple cotton is sourced directly from certified ginning mills in Gujarat. The yarn travels north to Ludhiana, Punjab — India’s historic textile capital — where circular knitting machines custom-weave our proprietary <strong>Heavyweight French Terry</strong> and <strong>All-Weather brushed fleece</strong>.
              </p>
              <blockquote className="p-4 border-l-2 border-white bg-black/60 italic text-white my-4 font-display text-sm">
                &ldquo;If the collar flops after three washes, the garment has failed. We engineered a 1.25-inch double-rib collar with a lycra core that retains its tension through 50+ machine cycles.&rdquo;
              </blockquote>
              <p>
                Garments are cut, sewn, and quality-inspected at our Okhla Phase III studio in New Delhi, ensuring ethical wages, safe indoor climate control, and fair working hours.
              </p>
            </div>
          </div>
        </article>

        {/* Secondary Essays Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Essay 2 */}
          <article className="border border-brand-charcoal bg-neutral-950 p-6 space-y-4">
            <div className="aspect-[4/3] bg-neutral-900 overflow-hidden border border-brand-charcoal">
              <img
                src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80"
                alt="Enzyme Mineral Wash Alchemy"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block">
              ESSAY 02 • WASH ALCHEMY
            </span>
            <h3 className="font-display font-bold text-lg uppercase tracking-tight text-white">
              THE MINERAL ENZYME FADE
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Why each garment carries its own unique tonal patina. We reject harsh chemical bleach in favor of biodegradable enzyme tumbling, creating a vintage soft hand-feel with zero fiber degradation.
            </p>
            <Link
              href="/shop/oversized-t-shirts"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-white hover:underline pt-2"
            >
              <span>Explore Washed Tees</span>
              <ArrowRight size={13} />
            </Link>
          </article>

          {/* Essay 3 */}
          <article className="border border-brand-charcoal bg-neutral-950 p-6 space-y-4">
            <div className="aspect-[4/3] bg-neutral-900 overflow-hidden border border-brand-charcoal">
              <img
                src="https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80"
                alt="Tactical Cargo Pocket Architecture"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block">
              ESSAY 03 • CARGO ARCHITECTURE
            </span>
            <h3 className="font-display font-bold text-lg uppercase tracking-tight text-white">
              FUNCTIONAL POCKET ENGINEERING
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every pocket on our Stealth Cargos is gusseted to expand when loaded with your everyday carry — keys, earbuds, power bank — without pulling down your silhouette.
            </p>
            <Link
              href="/shop/cargo-pants"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-white hover:underline pt-2"
            >
              <span>Explore Cargos</span>
              <ArrowRight size={13} />
            </Link>
          </article>
        </div>

        {/* Back to Shop CTA */}
        <div className="text-center pt-8 border-t border-brand-charcoal">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-white hover:bg-neutral-200 text-black font-display font-black text-xs uppercase px-8 py-4 tracking-wider transition-colors shadow-2xl"
          >
            <span>DISCOVER THE LATEST DROPS</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
