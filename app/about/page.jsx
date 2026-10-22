import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, MapPin, ShieldCheck, Heart } from 'lucide-react';

export const metadata = {
  title: 'About SHARMAZONE | Delhi NCR Fashion House',
  description:
    'Discover the story behind SHARMAZONE. Designed and crafted for the Delhi NCR metropolis with uncompromising quality and architectural silhouettes.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-black text-white pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent font-bold">
            THE SHARMAZONE MANIFESTO
          </span>
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tighter text-white">
            DESIGNED FOR THE METROPOLIS.
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Rooted in the raw energy, cultural heritage, and contemporary architecture of Delhi NCR.
          </p>
        </div>

        {/* Hero image banner */}
        <div className="aspect-[16/9] bg-neutral-900 border border-neutral-800 overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1600&q=80"
            alt="SHARMAZONE Atelier"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-xs font-mono uppercase text-brand-accent tracking-widest">
              ATELIER ARCHIVE • NEW DELHI
            </span>
          </div>
        </div>

        {/* Story Section */}
        <div className="space-y-8 text-neutral-300 text-sm sm:text-base leading-relaxed font-sans">
          <div className="border-l-2 border-white pl-6 py-2">
            <h2 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-white mb-2">
              Our Vision
            </h2>
            <p>
              SHARMAZONE was born from a desire to redefine contemporary Indian streetwear and elevated fashion for Delhi NCR. We believe everyday garments should hold structural integrity, tailored precision, and effortless presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-3">
              <MapPin size={22} className="text-white" />
              <h3 className="font-display font-bold text-sm uppercase text-white">
                Delhi NCR Exclusive
              </h3>
              <p className="text-xs text-neutral-400">
                Tailored logistics network serving Delhi, Noida, Gurugram, and Ghaziabad with next-day dispatch.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-3">
              <ShieldCheck size={22} className="text-white" />
              <h3 className="font-display font-bold text-sm uppercase text-white">
                Architectural Cuts
              </h3>
              <p className="text-xs text-neutral-400">
                Custom drop-shoulder fits, anti-sag collars, and heavy-density mineral wash cotton.
              </p>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-3">
              <Heart size={22} className="text-white" />
              <h3 className="font-display font-bold text-sm uppercase text-white">
                Zero Compromise
              </h3>
              <p className="text-xs text-neutral-400">
                Crafted and milled ethically in India. Every stitch inspected before door dispatch.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-8 border-t border-neutral-800">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-white hover:bg-neutral-200 text-black font-display font-black text-xs uppercase px-8 py-4 tracking-wider transition-colors shadow-2xl"
          >
            <span>EXPLORE THE CURRENT DROP</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
