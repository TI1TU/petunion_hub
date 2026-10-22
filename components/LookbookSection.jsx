'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, X, ShoppingBag, ArrowRight, MapPin, Eye } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import productsData from '@/data/products.json';

const CHAPTERS = [
  {
    id: '01',
    title: 'COMMUTE',
    subtitle: 'Delhi Metro Yellow Line / 08:30 AM',
    desc: 'Heavyweight dropped shoulder tees and multi-pocket utility cargos designed for rapid transit and urban velocity.',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1600&q=85',
    hotspots: [
      {
        id: 'hs-1-1',
        productId: 'rd-01-acid-wash-tee',
        x: 48,
        y: 42,
        label: 'Heavyweight Acid Wash Tee',
      },
      {
        id: 'hs-1-2',
        productId: 'rd-04-stealth-cargo',
        x: 52,
        y: 72,
        label: 'Stealth 6-Pocket Cargo',
      },
    ],
  },
  {
    id: '02',
    title: 'CAMPUS / WORK',
    subtitle: 'Brutalist Rooftop Studio / 02:15 PM',
    desc: 'Clean structured boxy silhouettes that transition effortlessly from design studio reviews to cafe workstations.',
    image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1600&q=85',
    hotspots: [
      {
        id: 'hs-2-1',
        productId: 'rd-02-arch-logo-tee',
        x: 46,
        y: 38,
        label: 'Arch Logo Regular Tee',
      },
      {
        id: 'hs-2-2',
        productId: 'rd-05-skate-baggy-denim',
        x: 54,
        y: 68,
        label: '90s Skate Baggy Denim',
      },
    ],
  },
  {
    id: '03',
    title: 'EVENING',
    subtitle: 'Hauz Khas Social & Alleys / 07:45 PM',
    desc: 'Mineral washed textures catching the golden hour neon. Dropped shoulders, effortless drape, zero restriction.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1600&q=85',
    hotspots: [
      {
        id: 'hs-3-1',
        productId: 'rd-03-vintage-mineral-tee',
        x: 50,
        y: 35,
        label: 'Vintage Mineral Wash Tee',
      },
      {
        id: 'hs-3-2',
        productId: 'rd-06-ripstop-parachute-pant',
        x: 48,
        y: 75,
        label: 'Ripstop Parachute Pant',
      },
    ],
  },
  {
    id: '04',
    title: 'NIGHT',
    subtitle: 'Aerocity Skybridge / 11:20 PM',
    desc: 'Sub-Zero 400 GSM brushed fleece layering shielding against midnight expressway winds.',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1600&q=85',
    hotspots: [
      {
        id: 'hs-4-1',
        productId: 'rd-07-subzero-hoodie',
        x: 52,
        y: 36,
        label: 'Sub-Zero Heavyweight Hoodie',
      },
      {
        id: 'hs-4-2',
        productId: 'rd-04-stealth-cargo',
        x: 50,
        y: 74,
        label: 'Stealth Multi-Pocket Cargo',
      },
    ],
  },
];

export default function LookbookSection() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const { addToCart } = useStore();

  const chapter = CHAPTERS[activeChapterIndex];

  // Helper to find product from hotspot
  const getProduct = (productId) => {
    return productsData.find((p) => p.id === productId) || productsData[0];
  };

  return (
    <section className="relative bg-brand-black text-white py-20 md:py-32 border-t border-brand-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-brand-accent">
              <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-ping" />
              <span>SIGNATURE EDITORIAL 01 • TAP HOTSPOTS TO SHOP</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white mt-1">
              A DAY IN THE CITY
            </h2>
          </div>

          {/* Chapter Selector Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 mt-4 md:mt-0 overflow-x-auto no-scrollbar pb-2">
            {CHAPTERS.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => {
                  setActiveChapterIndex(idx);
                  setActiveHotspot(null);
                }}
                className={`text-xs font-mono font-bold px-3 py-2 border transition-all whitespace-nowrap ${
                  activeChapterIndex === idx
                    ? 'border-white bg-white text-black'
                    : 'border-brand-charcoal bg-neutral-950 text-neutral-400 hover:text-white hover:border-neutral-500'
                }`}
              >
                <span>{ch.id} {ch.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Full-Bleed Editorial Stage */}
        <div className="relative aspect-[4/5] sm:aspect-[16/9] w-full bg-neutral-900 border border-brand-charcoal overflow-hidden group">
          <img
            src={chapter.image}
            alt={chapter.title}
            className="w-full h-full object-cover object-center transition-all duration-700 ease-out"
          />

          {/* Dark gradient for text and hotspot contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/30 pointer-events-none" />

          {/* Chapter Info Overlay */}
          <div className="absolute bottom-6 left-6 max-w-lg z-10 space-y-2 pointer-events-none">
            <span className="text-[10px] font-mono uppercase bg-black/60 border border-white/20 text-neutral-300 px-2.5 py-1 backdrop-blur-sm">
              CHAPTER {chapter.id} • {chapter.subtitle}
            </span>
            <h3 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white">
              {chapter.title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 line-clamp-2 leading-relaxed">
              {chapter.desc}
            </p>
          </div>

          {/* Pulsing Hotspot Dots */}
          {chapter.hotspots.map((hs) => {
            const isSelected = activeHotspot?.id === hs.id;
            const product = getProduct(hs.productId);

            return (
              <div
                key={hs.id}
                className="absolute z-20"
                style={{ top: `${hs.y}%`, left: `${hs.x}%` }}
              >
                {/* Pulsing button */}
                <button
                  onClick={() => setActiveHotspot(isSelected ? null : { ...hs, product })}
                  className={`relative -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
                    isSelected ? 'scale-125 bg-white text-black shadow-2xl' : 'bg-black/80 text-white border border-white/50 hover:scale-110'
                  }`}
                  aria-label={`View ${hs.label}`}
                >
                  <span className="absolute inset-0 rounded-full bg-white/40 animate-ping pointer-events-none" />
                  {isSelected ? <X size={14} /> : <Plus size={14} />}
                </button>

                {/* Inline Mini Product Popover Card */}
                {isSelected && (
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 w-64 sm:w-72 bg-brand-black/95 border border-white p-3.5 shadow-2xl backdrop-blur-md z-30 animate-fadeIn text-white space-y-3">
                    <div className="flex gap-3">
                      <div className="w-16 h-20 bg-neutral-900 border border-brand-charcoal overflow-hidden flex-shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-mono uppercase text-brand-accent font-bold">
                          {product.fit} Cut
                        </span>
                        <h4 className="font-display font-bold text-xs uppercase text-white truncate">
                          {product.name}
                        </h4>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-sm font-black text-white">₹{product.price}</span>
                          {product.mrp && (
                            <span className="text-[10px] text-neutral-500 line-through">
                              ₹{product.mrp}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quick Add Size Stepper */}
                    <div>
                      <p className="text-[10px] uppercase font-bold text-neutral-400 mb-1">
                        Select Size:
                      </p>
                      <div className="grid grid-cols-5 gap-1 text-[11px] font-bold">
                        {product.sizes.map((s) => (
                          <button
                            key={s}
                            onClick={() => {
                              addToCart(product, s, product.colors?.[0]?.name, 1);
                              setActiveHotspot(null);
                            }}
                            className="py-1 bg-neutral-900 border border-brand-charcoal hover:bg-white hover:text-black hover:border-white text-center transition-colors"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* View Details Link */}
                    <div className="pt-2 border-t border-brand-charcoal flex justify-between items-center text-[11px]">
                      <Link
                        href={`/product/${product.slug}`}
                        className="text-neutral-400 hover:text-white underline"
                      >
                        Full Product Anatomy
                      </Link>
                      <span className="text-emerald-400 font-medium">In Stock</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
