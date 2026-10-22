'use client';

import React, { useState } from 'react';
import { X, Check, ShieldCheck } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function QuickAddModal() {
  const { quickAddProduct, setQuickAddProduct, addToCart, setIsSizeGuideOpen } = useStore();
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState(null);

  if (!quickAddProduct) return null;

  const product = quickAddProduct;
  const activeColor = selectedColor || product.colors?.[0]?.name || 'Standard';

  const handleConfirmAdd = () => {
    addToCart(product, selectedSize, activeColor, 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="absolute inset-0"
        onClick={() => setQuickAddProduct(null)}
      />

      <div className="relative w-full max-w-md bg-brand-black border border-brand-charcoal p-6 shadow-2xl text-white z-10 space-y-5">
        <button
          onClick={() => setQuickAddProduct(null)}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Product Brief */}
        <div className="flex gap-4 items-center">
          <div className="w-20 h-24 bg-neutral-900 border border-brand-charcoal overflow-hidden flex-shrink-0">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">
              {product.fit} Silouette
            </span>
            <h3 className="font-display font-bold text-sm uppercase text-white mt-0.5 line-clamp-1">
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-base font-extrabold text-white">₹{product.price}</span>
              {product.mrp && (
                <span className="text-xs text-neutral-500 line-through">₹{product.mrp}</span>
              )}
              {product.discountPercent && (
                <span className="text-[10px] bg-brand-accent text-white px-1.5 py-0.5 font-bold uppercase tracking-wider">
                  {product.discountPercent}% OFF
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Color Choice */}
        {product.colors && product.colors.length > 0 && (
          <div>
            <div className="flex justify-between items-center text-xs mb-2">
              <span className="text-neutral-400 font-medium">COLOR:</span>
              <span className="text-white font-semibold">{activeColor}</span>
            </div>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-7 h-7 rounded-none border transition-all ${
                    activeColor === c.name ? 'border-white scale-110 shadow-sm' : 'border-neutral-700 opacity-80'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>
        )}

        {/* Size Selection */}
        <div>
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-neutral-400 font-medium">SELECT SIZE:</span>
            <button
              onClick={() => setIsSizeGuideOpen(true)}
              className="text-neutral-300 hover:text-white underline text-[11px] tracking-wider uppercase font-semibold"
            >
              Size Guide
            </button>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`py-2.5 text-xs font-bold uppercase border transition-all ${
                  selectedSize === s
                    ? 'bg-white text-black border-white'
                    : 'bg-neutral-900 text-white border-brand-charcoal hover:border-neutral-500'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {product.stockCount && product.stockCount < 10 && (
            <p className="text-[11px] text-brand-accent font-semibold mt-2">
              • Only {product.stockCount} pieces left in warehouse
            </p>
          )}
        </div>

        {/* CTA Button */}
        <button
          onClick={handleConfirmAdd}
          className="w-full bg-white hover:bg-neutral-200 text-black font-display font-extrabold text-sm uppercase py-3.5 tracking-wider transition-colors flex items-center justify-center gap-2"
        >
          <span>ADD TO BAG — ₹{product.price}</span>
        </button>

        <p className="text-[10px] text-center text-neutral-400">
          Free Pan-India Delivery on orders ₹999+ | 7-Day Exchange Available
        </p>
      </div>
    </div>
  );
}
