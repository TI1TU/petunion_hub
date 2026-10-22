'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Check, Sliders } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import productsData from '@/data/products.json';

const FIT_COMPARISONS = [
  {
    fit: 'Oversized',
    tag: 'SIGNATURE DROP',
    chestEase: '+6 inches ease',
    shoulderDrop: '2.5 inch dropped shoulder',
    sleeveLength: 'Past elbow line',
    torsoFeel: 'Boxy, zero restriction',
    bestFor: 'Modern street rotation, layering over long sleeves',
    product: productsData.find((p) => p.fit === 'Oversized') || productsData[0],
  },
  {
    fit: 'Relaxed',
    tag: 'EVERYDAY VERSATILE',
    chestEase: '+3.5 inches ease',
    shoulderDrop: '1.2 inch dropped shoulder',
    sleeveLength: 'Mid-bicep level',
    torsoFeel: 'Effortless drape, clean drape',
    bestFor: 'Daily wear, casual office, travel',
    product: productsData.find((p) => p.fit === 'Relaxed') || productsData[1],
  },
  {
    fit: 'Baggy',
    tag: 'SKATE CORE',
    chestEase: '+5 inches ease',
    shoulderDrop: '2.0 inch dropped seam',
    sleeveLength: 'Elbow break',
    torsoFeel: 'Wide silhouette, maximum stack at hems',
    bestFor: 'Skater aesthetics, pairing with chunky sneakers',
    product: productsData.find((p) => p.fit === 'Baggy') || productsData[2],
  },
  {
    fit: 'Regular',
    tag: 'STRUCTURED CLASSIC',
    chestEase: '+1.5 inches ease',
    shoulderDrop: 'Standard natural shoulder',
    sleeveLength: 'Upper bicep line',
    torsoFeel: 'Structured, close-to-body lines',
    bestFor: 'Classic layering, jackets, minimalist styling',
    product: productsData.find((p) => p.fit === 'Regular') || productsData[3],
  },
];

export default function FindYourFitInline() {
  const { addToCart } = useStore();
  const [selectedSizes, setSelectedSizes] = useState({
    Oversized: 'L',
    Relaxed: 'L',
    Baggy: '32',
    Regular: 'L',
  });

  // Height & Weight Calculator state
  const [heightCm, setHeightCm] = useState(178);
  const [weightKg, setWeightKg] = useState(72);

  const calculateRecommendedFit = () => {
    if (weightKg < 62) return { size: 'S', note: 'Recommended: Size S for signature relaxed street drape' };
    if (weightKg >= 62 && weightKg < 72) return { size: 'M', note: 'Recommended: Size M for clean drop shoulder' };
    if (weightKg >= 72 && weightKg < 84) return { size: 'L', note: 'Recommended: Size L for signature oversized boxy cut' };
    if (weightKg >= 84 && weightKg < 95) return { size: 'XL', note: 'Recommended: Size XL for spacious silhouette' };
    return { size: 'XXL', note: 'Recommended: Size XXL for maximum volume' };
  };

  const rec = calculateRecommendedFit();

  const handleSizeChange = (fitName, size) => {
    setSelectedSizes((prev) => ({ ...prev, [fitName]: size }));
  };

  return (
    <section className="bg-brand-black text-white py-20 md:py-32 border-t border-brand-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-brand-accent">
            <Sliders size={13} />
            <span>SIGNATURE 04 • SIDE-BY-SIDE FIT INTELLIGENCE</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white mt-1">
            FIND YOUR FIT
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2">
            Compare our 4 engineered silhouettes side by side. Pick your exact proportion and add directly to your bag.
          </p>
        </div>

        {/* Height & Weight Interactive Calculator Strip */}
        <div className="p-6 bg-neutral-950 border border-brand-charcoal mb-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 space-y-1">
            <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold flex items-center gap-1">
              <Check size={12} /> ALGORITHMIC FIT FINDER
            </span>
            <h3 className="font-display font-black text-xl uppercase text-white">
              WHAT IS YOUR BODY PROFILE?
            </h3>
            <p className="text-xs text-neutral-400">
              Adjust height & weight to calculate your intended streetwear size.
            </p>
          </div>

          <div className="md:col-span-5 grid grid-cols-2 gap-4">
            <div>
              <label className="flex justify-between text-xs font-bold text-neutral-300 mb-1">
                <span>Height</span>
                <span className="text-white font-mono">{heightCm} cm</span>
              </label>
              <input
                type="range"
                min="150"
                max="205"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full accent-white bg-neutral-800"
              />
            </div>
            <div>
              <label className="flex justify-between text-xs font-bold text-neutral-300 mb-1">
                <span>Weight</span>
                <span className="text-white font-mono">{weightKg} kg</span>
              </label>
              <input
                type="range"
                min="45"
                max="120"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full accent-white bg-neutral-800"
              />
            </div>
          </div>

          <div className="md:col-span-3 bg-black border border-white/30 p-3.5 text-center">
            <span className="text-[10px] font-mono uppercase text-neutral-400 block">
              RECOMMENDED SIZE
            </span>
            <p className="font-display font-black text-2xl text-white">
              SIZE {rec.size}
            </p>
            <p className="text-[10px] text-emerald-400 mt-0.5">{rec.note}</p>
          </div>
        </div>

        {/* SIDE-BY-SIDE FIT COMPARISON GRID (4 COLUMNS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FIT_COMPARISONS.map((item) => {
            const currentSize = selectedSizes[item.fit] || item.product.sizes[0];
            return (
              <div
                key={item.fit}
                className="bg-neutral-950 border border-brand-charcoal hover:border-neutral-500 transition-all flex flex-col justify-between p-5 space-y-4 group"
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] font-mono uppercase bg-neutral-900 border border-brand-charcoal px-2 py-0.5 text-neutral-300">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white">
                    {item.fit} Fit
                  </h3>

                  {/* 4:5 Thumbnail */}
                  <div className="relative aspect-[4/5] bg-neutral-900 overflow-hidden border border-brand-charcoal my-3">
                    <img
                      src={item.product.images[0]}
                      alt={`${item.fit} sample product`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Specs Comparison Table */}
                  <div className="space-y-1.5 text-xs text-neutral-300 border-t border-brand-charcoal pt-3">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Chest Ease:</span>
                      <strong className="text-white">{item.chestEase}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Shoulder Drop:</span>
                      <strong className="text-white">{item.shoulderDrop}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Sleeve:</span>
                      <strong className="text-white">{item.sleeveLength}</strong>
                    </div>
                    <div className="pt-2 text-[11px] text-neutral-400 leading-tight">
                      {item.bestFor}
                    </div>
                  </div>
                </div>

                {/* Inline Size Picker + Inline Add to Cart (Selkirk Style) */}
                <div className="pt-3 border-t border-brand-charcoal space-y-2">
                  <div className="flex justify-between items-center text-[10px] text-neutral-400 font-bold uppercase">
                    <span>Select Size:</span>
                    <span>₹{item.product.price}</span>
                  </div>

                  <div className="grid grid-cols-5 gap-1 text-xs font-bold">
                    {item.product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => handleSizeChange(item.fit, sz)}
                        className={`py-1 text-center border transition-colors ${
                          currentSize === sz
                            ? 'border-white bg-white text-black'
                            : 'border-brand-charcoal bg-black text-neutral-300 hover:border-neutral-500'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => addToCart(item.product, currentSize, item.product.colors?.[0]?.name, 1)}
                    className="w-full bg-white hover:bg-neutral-200 text-black font-display font-bold text-xs uppercase py-2.5 tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <ShoppingBag size={13} />
                    <span>ADD {item.fit.toUpperCase()} ({currentSize})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
