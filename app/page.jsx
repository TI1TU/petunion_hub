'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  Sparkles,
  Instagram,
  CheckCircle2,
  Star,
  Quote,
  MapPin,
} from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import LookbookSection from '@/components/LookbookSection';
import FitConfigurator from '@/components/FitConfigurator';
import MarqueeTicker from '@/components/MarqueeTicker';
import { getAllProducts, getBestSellers, getNewArrivals } from '@/lib/products';
import { useStore } from '@/context/StoreContext';

export default function HomePage() {
  const allProducts = getAllProducts();
  const newArrivals = getNewArrivals().slice(0, 6);
  const bestSellers = getBestSellers();
  const { showToast, setCursorText } = useStore();

  const [cmsContent, setCmsContent] = useState(null);
  const carouselRef = useRef(null);
  const [commEmail, setCommEmail] = useState('');
  const [commWhatsapp, setCommWhatsapp] = useState(true);
  const [commSubmitted, setCommSubmitted] = useState(false);

  // Sync with live Storefront CMS
  useEffect(() => {
    async function loadCms() {
      try {
        const res = await fetch('/api/cms');
        if (res.ok) {
          const data = await res.json();
          if (data?.cms) setCmsContent(data.cms);
        }
      } catch (_) {}
    }
    loadCms();
  }, []);

  const heroHeadline = cmsContent?.hero?.headline || 'EVERYDAY. ELEVATED.';
  const heroSubheadline = cmsContent?.hero?.subheadline || 'COLLECTION 01 / NEW DELHI METROPOLIS';
  const heroDescription =
    cmsContent?.hero?.description ||
    'Contemporary fashion essentials engineered for the Delhi NCR aesthetic. Refined oversized silhouettes, tactical cargos, and priority 24-48h doorstep dispatch.';
  const heroPrimaryText = cmsContent?.hero?.buttonPrimaryText || 'SHOP THE COLLECTION';
  const heroPrimaryUrl = cmsContent?.hero?.buttonPrimaryUrl || '/shop';
  const heroSecondaryText = cmsContent?.hero?.buttonSecondaryText || 'EXPLORE FIT GUIDE';
  const heroSecondaryUrl = cmsContent?.hero?.buttonSecondaryUrl || '/find-your-fit';
  const heroBg =
    cmsContent?.hero?.backgroundImage ||
    'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=2000&q=85';

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCommunitySubmit = (e) => {
    e.preventDefault();
    if (!commEmail) return;
    setCommSubmitted(true);
    showToast('Welcome to SHARMAZONE! 10% coupon code: FIRST10');
    setCommEmail('');
  };

  return (
    <div className="bg-brand-black text-white min-h-screen">
      {/* 1. CINEMATIC FULL-WIDTH HERO */}
      <section className="relative min-h-[92vh] md:min-h-screen flex items-end justify-start overflow-hidden pb-16 md:pb-24 pt-20">
        {/* Campaign Background Image & Video Poster */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="SHARMAZONE Fashion Campaign"
            className="w-full h-full object-cover object-center scale-105 animate-[pulse_12s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-brand-black/30" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-4 md:space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono uppercase tracking-widest text-neutral-200">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
              <span>{heroSubheadline}</span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter text-white leading-[0.95]">
              {heroHeadline.includes('.') ? (
                <>
                  {heroHeadline.split('.')[0]}. <br />
                  <span className="text-brand-offwhite">{heroHeadline.split('.')[1]}</span>
                </>
              ) : (
                heroHeadline
              )}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-xl font-normal leading-relaxed">
              {heroDescription}
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 md:pt-4">
              <Link
                href={heroPrimaryUrl}
                className="bg-white hover:bg-neutral-200 text-black font-display font-black text-xs sm:text-sm uppercase px-8 py-4 tracking-wider transition-all duration-300 flex items-center gap-2 group shadow-xl"
              >
                <span>{heroPrimaryText}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href={heroSecondaryUrl}
                className="bg-transparent hover:bg-white/10 text-white border border-white/40 font-display font-bold text-xs sm:text-sm uppercase px-8 py-4 tracking-wider transition-colors backdrop-blur-sm"
              >
                {heroSecondaryText}
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator strip */}
        <div className="absolute bottom-4 right-6 hidden md:flex items-center gap-3 text-[11px] font-mono tracking-widest text-neutral-400">
          <span>SCROLL DOWN</span>
          <span className="w-8 h-[1px] bg-neutral-600" />
          <span>[ 01 / 15 ]</span>
        </div>
      </section>

      {/* 2. SLIM USP STRIP */}
      <section className="bg-neutral-950 border-y border-brand-charcoal py-4 sm:py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-xs text-neutral-300">
            <div className="flex items-center justify-center gap-2.5">
              <Truck size={17} className="text-white flex-shrink-0" />
              <span className="font-medium tracking-wide">Free Shipping above ₹999</span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <CreditCard size={17} className="text-white flex-shrink-0" />
              <span className="font-medium tracking-wide">Free COD in Delhi NCR</span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <RotateCcw size={17} className="text-white flex-shrink-0" />
              <span className="font-medium tracking-wide">7-Day Easy Returns</span>
            </div>
            <div className="flex items-center justify-center gap-2.5">
              <ShieldCheck size={17} className="text-white flex-shrink-0" />
              <span className="font-medium tracking-wide">100% Encrypted Payments</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NEW ARRIVALS */}
      <section className="py-20 md:py-28 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-brand-accent">
                SEASON DROP 01 • JUST LANDED
              </span>
              <h2 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white mt-1">
                NEW ARRIVALS
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-lg">
                Fresh silhouettes. Clean essentials. Built for everyday wear in Delhi NCR.
              </p>
            </div>
            <Link
              href="/shop?filter=new"
              className="mt-4 md:mt-0 text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>Explore All New Drops</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE TICKER STRIP 1 */}
      <MarqueeTicker text="SHARMAZONE • NEW DELHI METROPOLIS • COMBED FRENCH TERRY • CONTEMPORARY ARCHITECTURAL FIT • FAST DISPATCH IN DELHI, NOIDA, GURUGRAM & GHAZIABAD •" />

      {/* 4. A DAY IN THE CITY LOOKBOOK */}
      <LookbookSection />

      {/* 5. SHOP BY CATEGORY */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14">
          <div>
            <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-brand-accent">
              CURATED SILHOUETTES
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white mt-1">
              SHOP BY CATEGORY
            </h2>
          </div>
          <Link
            href="/shop"
            className="mt-3 md:mt-0 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {[
            {
              title: 'T-SHIRTS',
              sub: 'Heavyweight Drop-Shoulder Tees',
              slug: 'oversized-t-shirts',
              img: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80',
            },
            {
              title: 'PANTS',
              sub: 'Multi-pocket Cargos & Baggy Skate Cut',
              slug: 'cargo-pants',
              img: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80',
            },
            {
              title: 'HOODIES',
              sub: 'Sub-Zero Heavyweight Fleece',
              slug: 'hoodies',
              img: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80',
            },
            {
              title: 'WINTERWEAR',
              sub: 'Thermal Jackets, Fleeces & Layers',
              slug: 'winterwear',
              img: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
            },
          ].map((cat) => (
            <Link
              key={cat.title}
              href={`/shop/${cat.slug}`}
              className="group relative aspect-[3/4] overflow-hidden bg-neutral-900 border border-brand-charcoal flex flex-col justify-end p-5 transition-all duration-300"
            >
              <img
                src={cat.img}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity group-hover:opacity-90" />

              <div className="relative z-10 space-y-1 transform transition-transform duration-300 group-hover:-translate-y-1">
                <p className="text-[10px] text-neutral-300 font-medium tracking-wide uppercase line-clamp-1">
                  {cat.sub}
                </p>
                <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-white">
                  {cat.title}
                </h3>
                <div className="pt-2 flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-white opacity-90 group-hover:underline">
                  <span>SHOP NOW</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. THE EVERYDAY COLLECTION */}
      <section className="py-20 md:py-28 bg-neutral-950 border-t border-brand-charcoal overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Big Image + Manifesto */}
            <div className="lg:col-span-7 space-y-6">
              <div className="relative aspect-[4/5] sm:aspect-[16/11] bg-neutral-900 overflow-hidden border border-brand-charcoal">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80"
                  alt="Editorial Lookbook"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent font-bold">
                    SHARMAZONE EDITORIAL
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white mt-1">
                    THE CAPITAL COLLECTION
                  </h3>
                </div>
              </div>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
                &ldquo;Clean silhouettes, versatile mineral palettes and comfortable fits engineered to become your everyday wardrobe foundation.&rdquo;
              </p>
            </div>

            {/* Right Column: Two Staggered Editorial Detail Images */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] bg-neutral-900 overflow-hidden border border-brand-charcoal">
                  <img
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80"
                    alt="Fashion Detail"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-brand-charcoal/40 border border-brand-charcoal">
                  <p className="font-display font-bold text-xs uppercase text-white">
                    Heavy French Terry
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    Custom knit for structural drape and anti-sag necklines.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="p-4 bg-brand-charcoal/40 border border-brand-charcoal">
                  <p className="font-display font-bold text-xs uppercase text-white">
                    Artisanal Mineral Wash
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-1">
                    Each piece individually enzyme washed for subtle tonal character.
                  </p>
                </div>
                <div className="aspect-[4/5] bg-neutral-900 overflow-hidden border border-brand-charcoal">
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80"
                    alt="Fashion Detail"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BUILD THE FIT */}
      <FitConfigurator />

      {/* 8. BEST SELLERS */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-brand-charcoal">
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-brand-accent">
              SHARMAZONE ICONS
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white mt-1">
              BEST SELLERS
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCarousel('left')}
              className="w-10 h-10 border border-brand-charcoal hover:border-white bg-neutral-950 text-white flex items-center justify-center transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="w-10 h-10 border border-brand-charcoal hover:border-white bg-neutral-950 text-white flex items-center justify-center transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          onMouseEnter={() => setCursorText('DRAG')}
          onMouseLeave={() => setCursorText('')}
          className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-4 cursor-grab"
        >
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className="min-w-[260px] sm:min-w-[300px] md:min-w-[320px] snap-start flex-shrink-0"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* 9. PROMO CAMPAIGN BANNER */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-brand-charcoal border-y border-brand-charcoal">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1600&q=80"
            alt="Fashion Banner"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-4 sm:space-y-6">
          <span className="inline-block text-[10px] font-mono tracking-widest text-brand-accent uppercase border border-brand-accent/40 px-3 py-1 bg-black/40">
            {cmsContent?.campaignBanner?.badge || 'DELHI NCR EXCLUSIVE'}
          </span>

          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-white">
            {cmsContent?.campaignBanner?.title || 'YOUR STYLE. YOUR CAPITAL.'}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-neutral-300 max-w-xl mx-auto leading-relaxed">
            {cmsContent?.campaignBanner?.subtitle ||
              'Discover contemporary wardrobe essentials. Minimal branding, high-density combed cottons, and architectural cuts.'}
          </p>

          <div className="pt-2">
            <Link
              href={cmsContent?.campaignBanner?.buttonUrl || '/shop'}
              className="inline-flex items-center gap-2 bg-white hover:bg-neutral-200 text-black font-display font-black text-xs sm:text-sm uppercase px-8 py-4 tracking-wider transition-colors shadow-2xl"
            >
              <span>{cmsContent?.campaignBanner?.buttonText || 'SHOP THE COLLECTION'}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 10. REVIEWS & CUSTOMER FEEDBACK */}
      <section className="py-20 md:py-28 bg-brand-black border-t border-brand-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stylist Endorsement Quote */}
          <div className="mb-16 bg-neutral-950 border border-white/20 p-6 sm:p-10 relative">
            <Quote size={40} className="text-brand-charcoal absolute top-4 right-4 pointer-events-none" />
            <div className="max-w-3xl space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                <Sparkles size={12} /> CREATOR &amp; STYLIST ENDORSEMENT
              </span>
              <blockquote className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl uppercase tracking-tight text-white leading-snug">
                &ldquo;The collar doesn&apos;t sag after an all-day shoot, the shoulder drop holds clean structure on camera, and the combed French terry fabric has actual presence.&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-800 border border-white">
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80"
                    alt="Kabir Anand"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-display font-bold text-xs uppercase text-white">Kabir Anand</p>
                  <p className="text-[11px] text-neutral-400">Fashion Stylist &amp; Creative Director, Delhi NCR</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Reviews Grid */}
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center justify-center gap-1">
              <CheckCircle2 size={12} /> VERIFIED DELHI NCR CLIENTELE
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white mt-1">
              CLIENT TESTIMONIALS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Aarav Sharma',
                city: 'South Delhi (GK-1)',
                product: 'Heavyweight Acid Wash Tee (Size L)',
                fitTag: 'Fits true to size',
                rating: 5,
                comment:
                  'The cotton density and drop-shoulder drape is incredible for ₹999. Delivered to my doorstep in Greater Kailash in under 24 hours. Collar holds tight after washing.',
              },
              {
                name: 'Rohan Deshmukh',
                city: 'Noida (Sector 18)',
                product: 'Multi-Pocket Utility Cargos (Size 32)',
                fitTag: 'Perfect relaxed baggy stack',
                rating: 5,
                comment:
                  'Received next day in Noida. Pockets are genuinely functional and the toggle at the ankles lets you switch between wide leg and tapered fit over sneakers.',
              },
              {
                name: 'Kabir Verma',
                city: 'Gurugram (DLF Phase 1)',
                product: 'Sub-Zero Winter Hoodie (Size XL)',
                fitTag: 'Heavy thermal drop',
                rating: 5,
                comment:
                  'Sub-zero warmth approved. The double-layered crossover hood holds its architectural shape and does not flop flat. Outstanding quality.',
              },
            ].map((rev, idx) => (
              <div
                key={idx}
                className="bg-neutral-950 border border-brand-charcoal p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={14} className="fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono bg-black border border-brand-charcoal px-2 py-0.5 text-emerald-400 font-semibold uppercase">
                      {rev.fitTag}
                    </span>
                  </div>

                  <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-charcoal/60">
                  <p className="font-display font-bold text-xs uppercase text-white">
                    {rev.name}
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    {rev.city} • <span className="text-neutral-500">{rev.product}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. TRUST ROW */}
      <section className="py-16 md:py-20 border-t border-brand-charcoal bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div className="p-4 space-y-2">
              <Sparkles size={24} className="mx-auto text-neutral-300" />
              <h4 className="font-display font-bold text-xs sm:text-sm uppercase text-white">
                Premium Fabrics
              </h4>
              <p className="text-[11px] text-neutral-400">
                Custom-milled combed cotton French terry and fleece.
              </p>
            </div>

            <div className="p-4 space-y-2">
              <RotateCcw size={24} className="mx-auto text-neutral-300" />
              <h4 className="font-display font-bold text-xs sm:text-sm uppercase text-white">
                7-Day Easy Returns
              </h4>
              <p className="text-[11px] text-neutral-400">
                Complimentary doorstep pickup across Delhi NCR.
              </p>
            </div>

            <div className="p-4 space-y-2">
              <ShieldCheck size={24} className="mx-auto text-neutral-300" />
              <h4 className="font-display font-bold text-xs sm:text-sm uppercase text-white">
                Secure Checkout
              </h4>
              <p className="text-[11px] text-neutral-400">
                256-bit encrypted UPI, Cards, and NetBanking.
              </p>
            </div>

            <div className="p-4 space-y-2">
              <Truck size={24} className="mx-auto text-neutral-300" />
              <h4 className="font-display font-bold text-xs sm:text-sm uppercase text-white">
                Priority Dispatch
              </h4>
              <p className="text-[11px] text-neutral-400">
                24-48h express delivery across Delhi NCR.
              </p>
            </div>

            <div className="p-4 space-y-2 col-span-2 md:col-span-1">
              <CreditCard size={24} className="mx-auto text-neutral-300" />
              <h4 className="font-display font-bold text-xs sm:text-sm uppercase text-white">
                COD Available
              </h4>
              <p className="text-[11px] text-neutral-400">
                Pay on delivery in Delhi, Noida, Gurugram &amp; Ghaziabad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FOLLOW THE DROP */}
      <section className="py-20 md:py-28 bg-brand-black border-t border-brand-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
            <div>
              <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-brand-accent">
                COMMUNITY FEED
              </span>
              <h2 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white mt-1">
                FOLLOW THE DROP
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Tag @SHARMAZONE.OFFICIAL to be featured on our editorial feed.
              </p>
            </div>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 sm:mt-0 inline-flex items-center gap-2 bg-neutral-900 border border-brand-charcoal hover:border-white text-white font-display font-bold text-xs uppercase px-5 py-2.5 tracking-wider transition-colors"
            >
              <Instagram size={14} />
              <span>FOLLOW US</span>
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=600&q=80',
              'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
            ].map((imgUrl, i) => (
              <div
                key={i}
                className="group relative aspect-square bg-neutral-900 overflow-hidden border border-brand-charcoal"
              >
                <img
                  src={imgUrl}
                  alt={`SHARMAZONE drop feature ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-xs font-mono font-bold text-white tracking-widest">
                    @SHARMAZONE
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. JOIN THE COMMUNITY (Email + WhatsApp) */}
      <section className="py-20 md:py-28 border-t border-brand-charcoal bg-neutral-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-brand-accent">
            EXCLUSIVE DROPS &amp; SECRET PASSWORDS
          </span>

          <h2 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
            JOIN THE COMMUNITY
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
            Get first access to new drops, exclusive offers and limited collections before they hit public release.
          </p>

          {commSubmitted ? (
            <div className="p-4 bg-emerald-950/60 border border-emerald-700 text-emerald-400 text-xs font-semibold font-mono">
              ✓ THANK YOU FOR JOINING. YOUR 10% DISCOUNT CODE &ldquo;FIRST10&rdquo; IS ACTIVE.
            </div>
          ) : (
            <form onSubmit={handleCommunitySubmit} className="space-y-4 max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={commEmail}
                  onChange={(e) => setCommEmail(e.target.value)}
                  className="flex-1 bg-black border border-brand-charcoal px-4 py-3.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white font-mono"
                />
                <button
                  type="submit"
                  className="bg-white hover:bg-neutral-200 text-black font-display font-black text-xs uppercase px-8 py-3.5 tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <span>SUBSCRIBE</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <label className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={commWhatsapp}
                  onChange={(e) => setCommWhatsapp(e.target.checked)}
                  className="accent-white rounded-none"
                />
                <span>Also notify me on WhatsApp for limited quantity restocks</span>
              </label>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
