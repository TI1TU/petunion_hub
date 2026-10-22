'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/ProductCard';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] bg-brand-black text-white flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
          <Heart size={28} className="text-neutral-400" />
        </div>
        <h1 className="font-display font-black text-3xl uppercase tracking-tight text-white">
          YOUR WISHLIST IS EMPTY
        </h1>
        <p className="text-sm text-neutral-400 max-w-md mt-2 mb-8">
          Save your favorite SHARMAZONE silhouettes here to review or add to your shopping bag later.
        </p>
        <Link
          href="/shop"
          className="bg-white hover:bg-neutral-200 text-black font-display font-black text-xs uppercase px-8 py-4 tracking-wider transition-colors inline-flex items-center gap-2"
        >
          <span>EXPLORE CATALOG</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-neutral-800">
          <div>
            <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
              MY WISHLIST
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-mono mt-1">
              {wishlist.length} {wishlist.length === 1 ? 'PIECE' : 'PIECES'} SAVED FOR LATER
            </p>
          </div>
          <Link
            href="/shop"
            className="text-xs font-mono uppercase text-neutral-400 hover:text-white flex items-center gap-1.5"
          >
            <span>Continue Shopping</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="relative group flex flex-col">
              <ProductCard product={product} />
              <button
                onClick={() => toggleWishlist(product)}
                className="mt-2 w-full py-2 bg-neutral-900 border border-neutral-800 hover:border-red-500/50 text-neutral-400 hover:text-red-400 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
              >
                <Trash2 size={13} />
                <span>Remove from Wishlist</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
