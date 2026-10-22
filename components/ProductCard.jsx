'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Star, ShoppingBag, Eye, Bell } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function ProductCard({ product }) {
  const { isInWishlist, toggleWishlist, setQuickAddProduct, setNotifyModalData, addToCart, setCursorText } = useStore();
  const [isHovered, setIsHovered] = useState(false);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const hasMultipleImages = product.images && product.images.length > 1;
  const currentImg = isHovered && hasMultipleImages ? product.images[1] : product.images[0];
  const soldOutSizes = product.soldOutSizes || [];

  const handleSizeClick = (e, sz) => {
    e.preventDefault();
    e.stopPropagation();
    if (soldOutSizes.includes(sz)) {
      setNotifyModalData({ product, size: sz });
    } else {
      addToCart(product, sz, product.colors?.[0]?.name, 1);
    }
  };

  return (
    <div
      className="group relative flex flex-col bg-brand-black border border-brand-charcoal hover:border-neutral-500 transition-colors duration-300"
      onMouseEnter={() => {
        setIsHovered(true);
        setCursorText('VIEW');
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCursorText('');
      }}
    >
      {/* 4:5 Aspect Ratio Image Wrapper */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-900 select-none">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={currentImg}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Top Badges & Tags (NEW / BEST SELLER / BACK IN STOCK) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.tags && product.tags.length > 0 ? (
            product.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[9px] font-display font-extrabold px-2 py-0.5 uppercase tracking-wider border ${
                  tag === 'NEW'
                    ? 'bg-white text-black border-white'
                    : tag === 'BEST SELLER'
                    ? 'bg-brand-black text-white border-white/30'
                    : 'bg-brand-charcoal text-neutral-200 border-brand-charcoal'
                }`}
              >
                {tag}
              </span>
            ))
          ) : product.badge ? (
            <span className="bg-brand-black text-white text-[9px] font-display font-extrabold px-2 py-0.5 uppercase tracking-wider border border-white/20">
              {product.badge}
            </span>
          ) : null}

          {product.discountPercent && (
            <span className="bg-brand-accent text-white text-[9px] font-display font-extrabold px-2 py-0.5 uppercase tracking-wider">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-none border flex items-center justify-center transition-colors ${
            inWishlist
              ? 'bg-white text-black border-white'
              : 'bg-black/60 text-white border-white/20 hover:bg-black hover:border-white'
          }`}
        >
          <Heart size={14} className={inWishlist ? 'fill-current text-black' : ''} />
        </button>

        {/* Desktop Quick Add Bar on Hover */}
        <div className="hidden md:flex absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out gap-2">
          <button
            onClick={() => setQuickAddProduct(product)}
            className="flex-1 bg-white hover:bg-neutral-200 text-black font-display font-extrabold text-xs uppercase py-2.5 tracking-wider transition-colors flex items-center justify-center gap-1.5"
          >
            <ShoppingBag size={13} />
            <span>QUICK ADD</span>
          </button>
          <Link
            href={`/product/${product.slug}`}
            className="bg-neutral-900 border border-white/20 text-white hover:bg-neutral-800 p-2.5 flex items-center justify-center"
            aria-label="View product details"
          >
            <Eye size={14} />
          </Link>
        </div>

        {/* Mobile Quick Add Button (Always visible on touch devices) */}
        <div className="md:hidden absolute bottom-2 right-2 z-10">
          <button
            onClick={() => setQuickAddProduct(product)}
            className="bg-white text-black font-display font-extrabold text-[10px] uppercase px-2.5 py-1.5 tracking-wider flex items-center gap-1 shadow-md"
          >
            <ShoppingBag size={12} />
            <span>ADD</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Fit & Rating */}
          <div className="flex items-center justify-between text-[11px] text-neutral-400">
            <span className="uppercase font-semibold tracking-wider">{product.fit} Cut</span>
            {product.rating && (
              <span className="flex items-center gap-1 text-neutral-300 font-medium">
                <Star size={11} className="fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-neutral-500">({product.reviewCount})</span>
              </span>
            )}
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block mt-1">
            <h3 className="font-display font-bold text-xs sm:text-[13px] uppercase tracking-tight text-white line-clamp-1 hover:underline">
              {product.name}
            </h3>
          </Link>

          {/* Full Size Run with Sold-Out Cross-Out & Notify Me */}
          <div className="flex items-center gap-1 pt-2">
            <span className="text-[10px] text-neutral-500 font-mono mr-1">SIZES:</span>
            {product.sizes.map((sz) => {
              const isSoldOut = soldOutSizes.includes(sz);
              return (
                <button
                  key={sz}
                  onClick={(e) => handleSizeClick(e, sz)}
                  title={isSoldOut ? `Size ${sz} Sold Out - Tap to Notify` : `Add Size ${sz}`}
                  className={`text-[10px] font-mono px-1.5 py-0.5 border transition-all ${
                    isSoldOut
                      ? 'border-neutral-800 text-neutral-600 line-through bg-neutral-950 hover:text-white hover:border-brand-accent'
                      : 'border-brand-charcoal text-neutral-300 hover:border-white hover:text-white'
                  }`}
                >
                  {sz}
                </button>
              );
            })}
          </div>
        </div>

        {/* Price & Color Thumbnails */}
        <div className="pt-2 border-t border-brand-charcoal/60 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display font-black text-sm text-white">₹{product.price}</span>
            {product.mrp && (
              <span className="text-xs text-neutral-500 line-through">₹{product.mrp}</span>
            )}
          </div>

          {/* Color Thumbnails */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1">
              {product.colors.slice(0, 3).map((col) => (
                <span
                  key={col.name}
                  className="w-2.5 h-2.5 rounded-none border border-neutral-600 block"
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-[10px] text-neutral-500">+{product.colors.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
