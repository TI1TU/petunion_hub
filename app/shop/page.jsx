'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  SlidersHorizontal,
  X,
  ChevronDown,
  RotateCcw,
  Check,
  ArrowUpDown,
  LayoutGrid,
  Grid3X3,
  Columns2,
  Sparkles,
} from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import {
  getAllProducts,
  CATEGORIES,
  FITS,
  SIZES,
  COLOR_FILTERS,
} from '@/lib/products';
import { useStore } from '@/context/StoreContext';

function ShopContent() {
  const searchParams = useSearchParams();
  const allProducts = getAllProducts();
  const { wishlist } = useStore();

  // Query parameter defaults
  const initialCategory = searchParams.get('category') || 'all';
  const initialFit = searchParams.get('fit') || 'all';
  const initialFilter = searchParams.get('filter') || 'all'; // 'new', 'bestseller', 'wishlist'
  const initialQuery = searchParams.get('q') || '';

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedFit, setSelectedFit] = useState(initialFit);
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [priceRange, setPriceRange] = useState('all'); // 'all', 'under999', '1000to1999', '2000plus'
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [gridCols, setGridCols] = useState(3); // 2, 3, or 4
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter products logic
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Wishlist filter mode
      if (initialFilter === 'wishlist') {
        const inWish = wishlist.some((w) => w.id === product.id);
        if (!inWish) return false;
      }

      // New arrivals filter mode
      if (initialFilter === 'new' && !product.isNew) return false;

      // Best seller filter mode
      if (initialFilter === 'bestseller' && !product.isBestSeller) return false;

      // Availability filter
      if (inStockOnly && !product.inStock) return false;

      // Search query parameter
      if (initialQuery) {
        const q = initialQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCategory = product.category.toLowerCase().includes(q);
        const matchesFit = product.fit.toLowerCase().includes(q);
        if (!matchesName && !matchesCategory && !matchesFit) return false;
      }

      // Category
      if (selectedCategory !== 'all') {
        if (
          product.categorySlug !== selectedCategory &&
          !product.categorySlug.includes(selectedCategory)
        ) {
          return false;
        }
      }

      // Fit
      if (selectedFit !== 'all' && product.fit !== selectedFit) {
        return false;
      }

      // Size
      if (selectedSize !== 'all' && !product.sizes.includes(selectedSize)) {
        return false;
      }

      // Color
      if (selectedColor !== 'all') {
        const hasColor = product.colors?.some((c) =>
          c.name.toLowerCase().includes(selectedColor.toLowerCase())
        );
        if (!hasColor) return false;
      }

      // Price Range
      if (priceRange === 'under999' && product.price > 999) return false;
      if (
        priceRange === '1000to1999' &&
        (product.price < 1000 || product.price > 1999)
      )
        return false;
      if (priceRange === '2000plus' && product.price < 2000) return false;

      return true;
    });
  }, [
    allProducts,
    selectedCategory,
    selectedFit,
    selectedSize,
    selectedColor,
    priceRange,
    inStockOnly,
    initialFilter,
    initialQuery,
    wishlist,
  ]);

  // Sort logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-low') {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-high') {
      return list.sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'rating') {
      return list.sort((a, b) => b.rating - a.rating);
    }
    if (sortBy === 'newest') {
      return list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
    return list; // featured
  }, [filteredProducts, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedFit('all');
    setSelectedSize('all');
    setSelectedColor('all');
    setPriceRange('all');
    setInStockOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedFit !== 'all' ||
    selectedSize !== 'all' ||
    selectedColor !== 'all' ||
    priceRange !== 'all' ||
    inStockOnly;

  const gridClass =
    gridCols === 4
      ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      : gridCols === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : 'grid-cols-2 md:grid-cols-3';

  return (
    <div className="bg-brand-black text-white min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Breadcrumb */}
        <div className="mb-6 md:mb-10">
          <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-widest font-mono mb-2">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Shop Catalog</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white">
                {initialFilter === 'wishlist'
                  ? 'YOUR WISHLIST DROPS'
                  : initialFilter === 'new'
                  ? 'NEW ARRIVALS 2026'
                  : initialFilter === 'bestseller'
                  ? 'BEST SELLING STREETWEAR'
                  : 'ALL STREETWEAR DROPS'}
              </h1>
              <p className="text-xs text-neutral-400 mt-1">
                Showing {sortedProducts.length} silhouettes • Free express shipping above ₹999
              </p>
            </div>

            {/* Desktop Grid Switcher + Sort */}
            <div className="hidden sm:flex items-center gap-4">
              {/* Column Switcher */}
              <div className="flex items-center border border-brand-charcoal bg-neutral-950 p-1 gap-1">
                <button
                  onClick={() => setGridCols(2)}
                  className={`p-1.5 transition-colors ${gridCols === 2 ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}
                  aria-label="2 columns"
                  title="2 columns view"
                >
                  <Columns2 size={16} />
                </button>
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-1.5 transition-colors ${gridCols === 3 ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}
                  aria-label="3 columns"
                  title="3 columns view"
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-1.5 transition-colors ${gridCols === 4 ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}
                  aria-label="4 columns"
                  title="4 columns view"
                >
                  <LayoutGrid size={16} />
                </button>
              </div>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-neutral-900 border border-brand-charcoal text-white text-xs px-3 py-2 focus:outline-none uppercase font-semibold"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {/* Mobile Filter & Sort Triggers */}
            <div className="flex sm:hidden items-center gap-2 pt-2">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="flex-1 bg-neutral-900 border border-brand-charcoal text-xs font-bold uppercase py-2.5 px-4 flex items-center justify-center gap-2"
              >
                <SlidersHorizontal size={14} />
                <span>Filters {hasActiveFilters && '•'}</span>
              </button>

              <div className="relative flex-1">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-neutral-900 border border-brand-charcoal text-xs font-bold uppercase py-2.5 px-3 appearance-none focus:outline-none"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest First</option>
                </select>
                <ArrowUpDown
                  size={12}
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-neutral-500 font-medium">Applied:</span>
            {selectedCategory !== 'all' && (
              <span className="bg-brand-charcoal border border-brand-charcoal px-2.5 py-1 text-white flex items-center gap-1.5">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory('all')}>
                  <X size={12} />
                </button>
              </span>
            )}
            {selectedFit !== 'all' && (
              <span className="bg-brand-charcoal border border-brand-charcoal px-2.5 py-1 text-white flex items-center gap-1.5">
                Fit: {selectedFit}
                <button onClick={() => setSelectedFit('all')}>
                  <X size={12} />
                </button>
              </span>
            )}
            {selectedSize !== 'all' && (
              <span className="bg-brand-charcoal border border-brand-charcoal px-2.5 py-1 text-white flex items-center gap-1.5">
                Size: {selectedSize}
                <button onClick={() => setSelectedSize('all')}>
                  <X size={12} />
                </button>
              </span>
            )}
            {selectedColor !== 'all' && (
              <span className="bg-brand-charcoal border border-brand-charcoal px-2.5 py-1 text-white flex items-center gap-1.5">
                Color: {selectedColor}
                <button onClick={() => setSelectedColor('all')}>
                  <X size={12} />
                </button>
              </span>
            )}
            {priceRange !== 'all' && (
              <span className="bg-brand-charcoal border border-brand-charcoal px-2.5 py-1 text-white flex items-center gap-1.5">
                Price: {priceRange}
                <button onClick={() => setPriceRange('all')}>
                  <X size={12} />
                </button>
              </span>
            )}
            {inStockOnly && (
              <span className="bg-brand-charcoal border border-brand-charcoal px-2.5 py-1 text-white flex items-center gap-1.5">
                In Stock Only
                <button onClick={() => setInStockOnly(false)}>
                  <X size={12} />
                </button>
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-neutral-400 hover:text-white underline text-[11px] ml-2"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Main Grid with Desktop Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* DESKTOP SIDEBAR FILTER */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 border-r border-brand-charcoal pr-6">
            <div className="flex items-center justify-between pb-3 border-b border-brand-charcoal">
              <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <SlidersHorizontal size={14} /> FILTERS
              </span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-neutral-400 hover:text-white underline"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2.5">
                Category
              </p>
              <div className="space-y-1.5 text-xs">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left py-1 px-2 transition-colors flex justify-between ${
                      selectedCategory === cat.slug
                        ? 'bg-white text-black font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] opacity-70">({cat.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Fit Filter */}
            <div className="pt-4 border-t border-brand-charcoal">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2.5">
                Fit Silhouette
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setSelectedFit('all')}
                  className={`text-xs py-1.5 px-2 border text-center transition-all ${
                    selectedFit === 'all'
                      ? 'border-white bg-white text-black font-bold'
                      : 'border-brand-charcoal text-neutral-400 hover:border-neutral-500'
                  }`}
                >
                  All Fits
                </button>
                {FITS.map((fit) => (
                  <button
                    key={fit}
                    onClick={() => setSelectedFit(fit)}
                    className={`text-xs py-1.5 px-2 border text-center transition-all ${
                      selectedFit === fit
                        ? 'border-white bg-white text-black font-bold'
                        : 'border-brand-charcoal text-neutral-400 hover:border-neutral-500'
                    }`}
                  >
                    {fit}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="pt-4 border-t border-brand-charcoal">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2.5">
                Size
              </p>
              <div className="grid grid-cols-5 gap-1.5">
                {SIZES.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(selectedSize === sz ? 'all' : sz)}
                    className={`py-2 text-xs font-bold uppercase border transition-all text-center ${
                      selectedSize === sz
                        ? 'border-white bg-white text-black'
                        : 'border-brand-charcoal text-neutral-400 hover:border-neutral-500'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="pt-4 border-t border-brand-charcoal">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2.5">
                Price Range
              </p>
              <div className="space-y-1.5 text-xs text-neutral-400">
                {[
                  { label: 'All Prices', val: 'all' },
                  { label: 'Under ₹999', val: 'under999' },
                  { label: '₹1,000 - ₹1,999', val: '1000to1999' },
                  { label: '₹2,000 and above', val: '2000plus' },
                ].map((pr) => (
                  <label
                    key={pr.val}
                    className="flex items-center gap-2 cursor-pointer hover:text-white"
                  >
                    <input
                      type="radio"
                      name="priceRange"
                      checked={priceRange === pr.val}
                      onChange={() => setPriceRange(pr.val)}
                      className="accent-white"
                    />
                    <span>{pr.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div className="pt-4 border-t border-brand-charcoal">
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2.5">
                Color Palette
              </p>
              <div className="flex flex-wrap gap-2">
                {COLOR_FILTERS.map((col) => (
                  <button
                    key={col.name}
                    onClick={() =>
                      setSelectedColor(selectedColor === col.name ? 'all' : col.name)
                    }
                    className={`w-6 h-6 border transition-all ${
                      selectedColor === col.name
                        ? 'border-white scale-125'
                        : 'border-neutral-700 opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                  />
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="pt-4 border-t border-brand-charcoal">
              <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-white"
                />
                <span>In Stock Items Only</span>
              </label>
            </div>
          </aside>

          {/* PRODUCT GRID CONTAINER */}
          <section className="lg:col-span-9">
            {sortedProducts.length === 0 ? (
              <div className="text-center py-24 space-y-4 border border-brand-charcoal bg-neutral-950 p-8">
                <h3 className="font-display font-black text-xl uppercase text-white">
                  No products match these filters
                </h3>
                <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                  Try clearing some filter criteria to browse all available streetwear pieces.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-white text-black font-display font-bold text-xs uppercase px-6 py-3 tracking-wider hover:bg-neutral-200 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className={`grid ${gridClass} gap-3 sm:gap-6`}>
                {sortedProducts.map((product, index) => {
                  // Insert editorial tile after every 8 products
                  const isEighth = (index + 1) % 8 === 0;
                  return (
                    <React.Fragment key={product.id}>
                      <ProductCard product={product} />

                      {isEighth && (
                        <div className="col-span-2 bg-neutral-950 border border-brand-charcoal p-6 flex flex-col justify-between aspect-[8/5] sm:aspect-auto">
                          <div className="space-y-2">
                            <span className="text-[9px] font-mono uppercase bg-white text-black px-2 py-0.5 font-bold">
                              EDITORIAL LOOKBOOK
                            </span>
                            <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-white">
                              A DAY IN THE CITY
                            </h3>
                            <p className="text-xs text-neutral-400 line-clamp-2">
                              4 chapters traversing the Delhi metro, brutalist studios, and night flyovers.
                            </p>
                          </div>
                          <Link
                            href="/#lookbook"
                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-brand-accent hover:underline pt-2"
                          >
                            <span>Explore Lookbook Chapters &rarr;</span>
                          </Link>
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* MOBILE FILTER BOTTOM SHEET DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-brand-black text-white p-5 animate-fadeIn">
          <div className="flex items-center justify-between pb-4 border-b border-brand-charcoal">
            <h3 className="font-display font-black text-lg uppercase tracking-tight">
              FILTER &amp; SORT
            </h3>
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="p-1 text-neutral-400 hover:text-white"
            >
              <X size={22} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-5 space-y-6">
            {/* Category */}
            <div>
              <p className="text-xs font-bold uppercase text-neutral-400 mb-2">Category</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`p-2.5 text-left border ${
                      selectedCategory === cat.slug
                        ? 'border-white bg-white text-black font-bold'
                        : 'border-brand-charcoal text-neutral-300'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Fit */}
            <div>
              <p className="text-xs font-bold uppercase text-neutral-400 mb-2">Fit Silhouette</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['all', ...FITS].map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFit(f)}
                    className={`p-2.5 text-center border uppercase ${
                      selectedFit === f
                        ? 'border-white bg-white text-black font-bold'
                        : 'border-brand-charcoal text-neutral-300'
                    }`}
                  >
                    {f === 'all' ? 'All Fits' : f}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <p className="text-xs font-bold uppercase text-neutral-400 mb-2">Size</p>
              <div className="grid grid-cols-5 gap-2 text-xs">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(selectedSize === s ? 'all' : s)}
                    className={`py-3 text-center border font-bold ${
                      selectedSize === s
                        ? 'border-white bg-white text-black'
                        : 'border-brand-charcoal text-neutral-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <p className="text-xs font-bold uppercase text-neutral-400 mb-2">Price</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { label: 'All', val: 'all' },
                  { label: 'Under ₹999', val: 'under999' },
                  { label: '₹1k - ₹2k', val: '1000to1999' },
                  { label: '₹2k+', val: '2000plus' },
                ].map((p) => (
                  <button
                    key={p.val}
                    onClick={() => setPriceRange(p.val)}
                    className={`p-2.5 text-center border uppercase ${
                      priceRange === p.val
                        ? 'border-white bg-white text-black font-bold'
                        : 'border-brand-charcoal text-neutral-300'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-brand-charcoal flex gap-3">
            <button
              onClick={resetFilters}
              className="flex-1 bg-neutral-900 border border-brand-charcoal text-xs font-bold uppercase py-3.5 text-neutral-400"
            >
              Reset
            </button>
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="flex-1 bg-white text-black font-display font-black text-xs uppercase py-3.5 tracking-wider"
            >
              Apply ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <React.Suspense
      fallback={
        <div className="bg-brand-black text-white min-h-[70vh] flex items-center justify-center text-xs font-mono tracking-widest uppercase text-neutral-400">
          Loading catalog...
        </div>
      }
    >
      <ShopContent />
    </React.Suspense>
  );
}
