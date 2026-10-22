'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Check, Sparkles, RefreshCw } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import productsData from '@/data/products.json';

// Group products for the 3 slots
const TEES = productsData.filter((p) => p.categorySlug.includes('t-shirt') || p.categorySlug.includes('tee'));
const PANTS = productsData.filter((p) => p.categorySlug.includes('cargo') || p.categorySlug.includes('pant') || p.categorySlug.includes('jean'));
const OUTERS = productsData.filter((p) => p.categorySlug.includes('hoodie') || p.categorySlug.includes('jacket') || p.categorySlug.includes('sweatshirt'));

export default function FitConfigurator() {
  const { addBundleToCart } = useStore();

  const [selectedTee, setSelectedTee] = useState(TEES[0] || productsData[0]);
  const [selectedPant, setSelectedPant] = useState(PANTS[0] || productsData[1]);
  const [selectedOuter, setSelectedOuter] = useState(OUTERS[0] || productsData[2]);

  const [teeSize, setTeeSize] = useState('L');
  const [pantSize, setPantSize] = useState('32');
  const [outerSize, setOuterSize] = useState('L');

  // Bundle calculations
  const originalTotal = selectedTee.price + selectedPant.price + selectedOuter.price;
  const bundleDiscountPercent = 10;
  const bundleSavings = Math.round((originalTotal * bundleDiscountPercent) / 100);
  const bundleTotal = originalTotal - bundleSavings;

  const handleAddBundle = () => {
    addBundleToCart(
      [
        { product: selectedTee, size: teeSize, color: selectedTee.colors?.[0]?.name },
        { product: selectedPant, size: pantSize, color: selectedPant.colors?.[0]?.name },
        { product: selectedOuter, size: outerSize, color: selectedOuter.colors?.[0]?.name },
      ],
      bundleDiscountPercent
    );
  };

  return (
    <section className="bg-brand-black text-white py-20 md:py-32 border-t border-brand-charcoal overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-brand-accent">
            <Sparkles size={13} />
            <span>SIGNATURE CONFIGURATOR 02 • CARTIER-INSPIRED LAYERING</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white mt-1">
            BUILD THE FIT
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2">
            Select your top, bottom, and outerwear layers. Preview the complete outfit synergy and secure an automatic 10% bundle discount in one tap.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: 3-TIER VISUAL CANVAS */}
          <div className="lg:col-span-7 bg-neutral-950 border border-brand-charcoal p-5 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-brand-charcoal pb-4">
              <span className="text-xs font-mono font-bold uppercase text-neutral-400">
                ACTIVE OUTFIT LAYERS [3 PIECES]
              </span>
              <span className="text-[10px] font-mono uppercase bg-emerald-950 border border-emerald-700 text-emerald-400 px-2.5 py-0.5 font-bold">
                BUNDLE SAVINGS: ₹{bundleSavings} OFF
              </span>
            </div>

            {/* 3 Interactive Layer Previews side by side */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {/* Layer 1: Tee */}
              <div className="bg-brand-black border border-brand-charcoal p-2 sm:p-3 space-y-2">
                <span className="text-[9px] font-mono uppercase text-neutral-500 font-bold block">
                  LAYER 01: BASE
                </span>
                <div className="aspect-[4/5] bg-neutral-900 overflow-hidden border border-brand-charcoal">
                  <img
                    src={selectedTee.images[0]}
                    alt={selectedTee.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold text-[11px] sm:text-xs uppercase text-white line-clamp-1">
                    {selectedTee.name}
                  </h4>
                  <p className="text-[10px] text-neutral-400 font-mono">₹{selectedTee.price}</p>
                </div>
              </div>

              {/* Layer 2: Pant */}
              <div className="bg-brand-black border border-brand-charcoal p-2 sm:p-3 space-y-2">
                <span className="text-[9px] font-mono uppercase text-neutral-500 font-bold block">
                  LAYER 02: BOTTOM
                </span>
                <div className="aspect-[4/5] bg-neutral-900 overflow-hidden border border-brand-charcoal">
                  <img
                    src={selectedPant.images[0]}
                    alt={selectedPant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold text-[11px] sm:text-xs uppercase text-white line-clamp-1">
                    {selectedPant.name}
                  </h4>
                  <p className="text-[10px] text-neutral-400 font-mono">₹{selectedPant.price}</p>
                </div>
              </div>

              {/* Layer 3: Outerwear */}
              <div className="bg-brand-black border border-brand-charcoal p-2 sm:p-3 space-y-2">
                <span className="text-[9px] font-mono uppercase text-neutral-500 font-bold block">
                  LAYER 03: OUTER
                </span>
                <div className="aspect-[4/5] bg-neutral-900 overflow-hidden border border-brand-charcoal">
                  <img
                    src={selectedOuter.images[0]}
                    alt={selectedOuter.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold text-[11px] sm:text-xs uppercase text-white line-clamp-1">
                    {selectedOuter.name}
                  </h4>
                  <p className="text-[10px] text-neutral-400 font-mono">₹{selectedOuter.price}</p>
                </div>
              </div>
            </div>

            {/* Bundle Checkout Box */}
            <div className="pt-4 border-t border-brand-charcoal flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">
                  Total Set Price:
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-black text-2xl text-white">₹{bundleTotal}</span>
                  <span className="text-xs text-neutral-500 line-through">₹{originalTotal}</span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase">
                    (10% Bundle Discount Applied)
                  </span>
                </div>
              </div>

              <button
                onClick={handleAddBundle}
                className="bg-white hover:bg-neutral-200 text-black font-display font-black text-xs uppercase px-8 py-4 tracking-wider transition-colors flex items-center justify-center gap-2 shadow-2xl"
              >
                <ShoppingBag size={15} />
                <span>ADD COMPLETE FIT (3 ITEMS)</span>
              </button>
            </div>
          </div>

          {/* RIGHT: CONFIGURATOR SELECTORS */}
          <div className="lg:col-span-5 space-y-5">
            {/* Slot 1: Select Tee */}
            <div className="bg-neutral-950 border border-brand-charcoal p-4 space-y-2.5">
              <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block">
                01 • CHOOSE T-SHIRT (BASE LAYER)
              </span>
              <div className="grid grid-cols-3 gap-2">
                {TEES.slice(0, 3).map((tee) => (
                  <button
                    key={tee.id}
                    onClick={() => setSelectedTee(tee)}
                    className={`p-2 border text-left transition-all ${
                      selectedTee.id === tee.id
                        ? 'border-white bg-neutral-900'
                        : 'border-brand-charcoal bg-black opacity-70 hover:opacity-100'
                    }`}
                  >
                    <p className="font-display font-bold text-[10px] uppercase text-white truncate">
                      {tee.name}
                    </p>
                    <p className="text-[10px] text-neutral-400">₹{tee.price}</p>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-1 text-[11px]">
                <span className="text-neutral-500 font-bold">Size:</span>
                {['S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setTeeSize(s)}
                    className={`px-2 py-0.5 border text-[10px] font-bold ${
                      teeSize === s ? 'border-white bg-white text-black' : 'border-brand-charcoal text-neutral-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Slot 2: Select Pant */}
            <div className="bg-neutral-950 border border-brand-charcoal p-4 space-y-2.5">
              <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block">
                02 • CHOOSE BOTTOMS (PANTS / JEANS)
              </span>
              <div className="grid grid-cols-3 gap-2">
                {PANTS.slice(0, 3).map((pant) => (
                  <button
                    key={pant.id}
                    onClick={() => setSelectedPant(pant)}
                    className={`p-2 border text-left transition-all ${
                      selectedPant.id === pant.id
                        ? 'border-white bg-neutral-900'
                        : 'border-brand-charcoal bg-black opacity-70 hover:opacity-100'
                    }`}
                  >
                    <p className="font-display font-bold text-[10px] uppercase text-white truncate">
                      {pant.name}
                    </p>
                    <p className="text-[10px] text-neutral-400">₹{pant.price}</p>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-1 text-[11px]">
                <span className="text-neutral-500 font-bold">Waist:</span>
                {['30', '32', '34', '36'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setPantSize(s)}
                    className={`px-2 py-0.5 border text-[10px] font-bold ${
                      pantSize === s ? 'border-white bg-white text-black' : 'border-brand-charcoal text-neutral-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Slot 3: Select Outerwear */}
            <div className="bg-neutral-950 border border-brand-charcoal p-4 space-y-2.5">
              <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block">
                03 • CHOOSE OUTERWEAR (HOODIE / JACKET)
              </span>
              <div className="grid grid-cols-3 gap-2">
                {OUTERS.slice(0, 3).map((outer) => (
                  <button
                    key={outer.id}
                    onClick={() => setSelectedOuter(outer)}
                    className={`p-2 border text-left transition-all ${
                      selectedOuter.id === outer.id
                        ? 'border-white bg-neutral-900'
                        : 'border-brand-charcoal bg-black opacity-70 hover:opacity-100'
                    }`}
                  >
                    <p className="font-display font-bold text-[10px] uppercase text-white truncate">
                      {outer.name}
                    </p>
                    <p className="text-[10px] text-neutral-400">₹{outer.price}</p>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-1 text-[11px]">
                <span className="text-neutral-500 font-bold">Size:</span>
                {['S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setOuterSize(s)}
                    className={`px-2 py-0.5 border text-[10px] font-bold ${
                      outerSize === s ? 'border-white bg-white text-black' : 'border-brand-charcoal text-neutral-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
