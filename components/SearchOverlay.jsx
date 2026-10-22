'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, ArrowRight, TrendingUp, History } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { searchProducts, POPULAR_SEARCHES } from '@/lib/products';

export default function SearchOverlay() {
  const { isSearchOpen, setIsSearchOpen, recentSearches, addRecentSearch } = useStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSearchOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
    } else {
      const found = searchProducts(query);
      setResults(found);
    }
  }, [query]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const handleSelectSearch = (term) => {
    setQuery(term);
    addRecentSearch(term);
  };

  const handleProductClick = () => {
    if (query.trim()) {
      addRecentSearch(query.trim());
    }
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-brand-black/98 text-white flex flex-col backdrop-blur-md animate-fadeIn">
      {/* Top Bar with Big Search Input */}
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 pt-6 pb-4 border-b border-brand-charcoal flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center gap-3">
          <Search size={24} className="text-neutral-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search silhouettes, heavy tees, cargos, winterwear..."
            className="w-full bg-transparent text-lg sm:text-2xl font-display font-bold text-white placeholder-neutral-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-neutral-400 hover:text-white p-1 text-xs uppercase tracking-wider"
            >
              Clear
            </button>
          )}
        </div>

        <button
          onClick={() => setIsSearchOpen(false)}
          className="text-neutral-400 hover:text-white p-2 border border-brand-charcoal hover:border-neutral-500 transition-colors flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
          aria-label="Close search overlay"
        >
          <span className="hidden sm:inline">ESC</span>
          <X size={18} />
        </button>
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto max-w-5xl mx-auto w-full px-4 sm:px-6 py-8">
        {query.trim().length === 0 ? (
          /* Default state: Popular & Recent Searches */
          <div className="space-y-8">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                  <History size={14} />
                  <span>Recent Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSelectSearch(term)}
                      className="text-xs bg-brand-charcoal/70 border border-brand-charcoal hover:border-neutral-400 text-neutral-200 px-3.5 py-2 transition-colors flex items-center gap-2"
                    >
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Streetwear Tags */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3">
                <TrendingUp size={14} className="text-brand-accent" />
                <span>Trending Streetwear Drops</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSelectSearch(term)}
                    className="text-xs bg-neutral-900 border border-brand-charcoal hover:bg-white hover:text-black hover:border-white text-neutral-300 px-4 py-2 transition-colors font-medium"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="pt-6 border-t border-brand-charcoal grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Link
                href="/shop/oversized-t-shirts"
                onClick={() => setIsSearchOpen(false)}
                className="p-4 bg-brand-charcoal/40 border border-brand-charcoal hover:border-white transition-colors group"
              >
                <p className="font-display font-bold text-sm uppercase">Oversized Tees</p>
                <p className="text-[11px] text-neutral-400 mt-1">Combed French Terry</p>
              </Link>
              <Link
                href="/shop/cargo-pants"
                onClick={() => setIsSearchOpen(false)}
                className="p-4 bg-brand-charcoal/40 border border-brand-charcoal hover:border-white transition-colors group"
              >
                <p className="font-display font-bold text-sm uppercase">Utility Cargos</p>
                <p className="text-[11px] text-neutral-400 mt-1">Multi-Pocket Tactical</p>
              </Link>
              <Link
                href="/shop/hoodies"
                onClick={() => setIsSearchOpen(false)}
                className="p-4 bg-brand-charcoal/40 border border-brand-charcoal hover:border-white transition-colors group"
              >
                <p className="font-display font-bold text-sm uppercase">Winter Hoodies</p>
                <p className="text-[11px] text-neutral-400 mt-1">Sub-Zero Double-Fleece</p>
              </Link>
              <Link
                href="/shop/jeans"
                onClick={() => setIsSearchOpen(false)}
                className="p-4 bg-brand-charcoal/40 border border-brand-charcoal hover:border-white transition-colors group"
              >
                <p className="font-display font-bold text-sm uppercase">Skate Denims</p>
                <p className="text-[11px] text-neutral-400 mt-1">Relaxed & Baggy fits</p>
              </Link>
            </div>
          </div>
        ) : (
          /* Live Results */
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs uppercase tracking-wider text-neutral-400">
                Found <strong className="text-white">{results.length}</strong> items for &ldquo;{query}&rdquo;
              </p>
              {results.length > 0 && (
                <Link
                  href={`/shop?q=${encodeURIComponent(query)}`}
                  onClick={handleProductClick}
                  className="text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white flex items-center gap-1 hover:underline"
                >
                  View All in Catalog <ArrowRight size={13} />
                </Link>
              )}
            </div>

            {results.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <p className="text-neutral-300 text-base font-display">
                  No drops matching &ldquo;{query}&rdquo;
                </p>
                <p className="text-neutral-500 text-xs">
                  Try searching for &quot;Oversized&quot;, &quot;Cargo&quot;, &quot;Hoodie&quot;, or &quot;Acid Wash&quot;.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={handleProductClick}
                    className="group flex flex-col bg-neutral-950 border border-brand-charcoal p-2.5 hover:border-neutral-400 transition-colors"
                  >
                    <div className="relative aspect-[4/5] w-full bg-neutral-900 overflow-hidden mb-2.5">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.discountPercent && (
                        <span className="absolute top-2 left-2 bg-brand-accent text-white text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wider">
                          {product.discountPercent}% OFF
                        </span>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] text-neutral-400 uppercase tracking-wider">
                          {product.fit} Fit
                        </p>
                        <h4 className="font-display font-bold text-xs uppercase tracking-tight text-white line-clamp-1 group-hover:underline">
                          {product.name}
                        </h4>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs font-bold text-white">₹{product.price}</span>
                        {product.mrp && (
                          <span className="text-[11px] text-neutral-500 line-through">
                            ₹{product.mrp}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
