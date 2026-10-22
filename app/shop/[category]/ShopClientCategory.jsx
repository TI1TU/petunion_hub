'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { getProductsByCategory, CATEGORIES } from '@/lib/products';

export default function ShopClientCategory({ categorySlug }) {
  const products = getProductsByCategory(categorySlug);
  const currentCat = CATEGORIES.find((c) => c.slug === categorySlug);
  const title = currentCat ? currentCat.name : categorySlug.replace(/-/g, ' ').toUpperCase();

  return (
    <div className="bg-brand-black text-white min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 md:mb-10">
          <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-widest font-mono mb-2">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-white">
              Catalog
            </Link>
            <span>/</span>
            <span className="text-white">{title}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white">
                {title}
              </h1>
              <p className="text-xs text-neutral-400 mt-1">
                Showing {products.length} silhouettes • Pan-India Free Shipping &gt; ₹999
              </p>
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={14} />
              <span>All Streetwear Drops</span>
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20 border border-brand-charcoal bg-neutral-950 p-6">
            <p className="text-neutral-400 text-sm mb-4">No products currently found in this category.</p>
            <Link
              href="/shop"
              className="bg-white text-black font-display font-bold text-xs uppercase px-6 py-3 tracking-wider"
            >
              Explore All Drops
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
