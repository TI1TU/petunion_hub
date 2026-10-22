'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronDown, ArrowRight, Shield } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function Header() {
  const pathname = usePathname();
  const { cartTotalItems, wishlist, setIsCartOpen, setIsSearchOpen, setIsAuthModalOpen, user, setCursorText } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const headerBgClass = isScrolled || !isHome
    ? 'bg-brand-black/95 backdrop-blur-md border-b border-brand-charcoal text-white shadow-lg'
    : 'bg-transparent text-white border-b border-white/10';

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${headerBgClass}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          {/* Left: Mobile Hamburger & Brand Wordmark */}
          <div className="flex items-center gap-3 md:gap-8">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
              className="md:hidden text-white hover:text-neutral-300 p-1 -ml-1 transition-colors"
            >
              <Menu size={22} />
            </button>

            <Link
              href="/"
              className="group flex items-center gap-2"
              onMouseEnter={() => setCursorText('HOME')}
              onMouseLeave={() => setCursorText('')}
            >
              <span className="font-display font-black text-xl md:text-2xl tracking-widest uppercase text-white group-hover:text-brand-offwhite transition-colors">
                SHARMAZONE<span className="text-[10px] align-super tracking-normal text-neutral-400 font-sans">®</span>
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation with Enhanced Dropdowns */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-[13px] font-semibold tracking-wider uppercase text-neutral-300">
            <Link
              href="/shop?filter=new"
              className="hover:text-white transition-colors py-2 relative group"
            >
              NEW ARRIVALS
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* T-SHIRTS MEGA MENU */}
            <div
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown('tshirts')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/shop/oversized-t-shirts"
                className="hover:text-white transition-colors flex items-center gap-1 group"
              >
                T-SHIRTS
                <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === 'tshirts' ? 'rotate-180' : ''}`} />
              </Link>

              {activeDropdown === 'tshirts' && (
                <div className="absolute top-full -left-28 w-[720px] bg-brand-black border border-brand-charcoal p-6 shadow-2xl rounded-none grid grid-cols-3 gap-6 animate-fadeIn">
                  {/* Col 1: By Fit */}
                  <div>
                    <p className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase font-bold mb-3 border-b border-brand-charcoal pb-1">
                      Shop By Fit
                    </p>
                    <ul className="space-y-2 text-xs normal-case font-medium">
                      <li>
                        <Link href="/shop/oversized-t-shirts" className="text-white hover:text-brand-accent transition-colors block">
                          Heavyweight Oversized Drop-Shoulder
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop/t-shirts" className="text-neutral-300 hover:text-white transition-colors block">
                          Boxy Relaxed Crewnecks
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop?fit=Regular" className="text-neutral-300 hover:text-white transition-colors block">
                          Tailored Regular Cut
                        </Link>
                      </li>
                      <li>
                        <Link href="/find-your-fit" className="text-brand-accent font-semibold flex items-center gap-1 pt-1 text-[11px]">
                          Compare All Fits &rarr;
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Col 2: By Fabric & Wash */}
                  <div>
                    <p className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase font-bold mb-3 border-b border-brand-charcoal pb-1">
                      Shop By Fabric
                    </p>
                    <ul className="space-y-2 text-xs normal-case font-medium">
                      <li>
                        <Link href="/shop/oversized-t-shirts" className="text-neutral-300 hover:text-white transition-colors block">
                          Combed French Terry Cotton
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop/oversized-t-shirts" className="text-neutral-300 hover:text-white transition-colors block">
                          Enzyme Mineral Wash Fade
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop/t-shirts" className="text-neutral-300 hover:text-white transition-colors block">
                          Classic Ring-Spun Cotton
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Col 3: Visual Feature */}
                  <div className="bg-neutral-900 border border-brand-charcoal p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-mono tracking-widest text-brand-accent uppercase font-bold block mb-1">
                        DELHI METROPOLIS DROP
                      </span>
                      <p className="font-display font-bold text-sm text-white uppercase">
                        Heavyweight Acid Wash Tee
                      </p>
                      <p className="text-[11px] text-neutral-400 mt-1">
                        Drop shoulder boxy silhouette with anti-sag ribbed collar.
                      </p>
                    </div>
                    <Link
                      href="/product/heavyweight-acid-wash-oversized-tee"
                      className="text-xs font-bold text-white hover:underline flex items-center gap-1 mt-4"
                    >
                      Shop Now <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* PANTS & CARGOS DROPDOWN */}
            <div
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown('pants')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/shop/cargo-pants"
                className="hover:text-white transition-colors flex items-center gap-1 group"
              >
                BOTTOMS
                <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === 'pants' ? 'rotate-180' : ''}`} />
              </Link>

              {activeDropdown === 'pants' && (
                <div className="absolute top-full -left-20 w-[640px] bg-brand-black border border-brand-charcoal p-6 shadow-2xl rounded-none grid grid-cols-3 gap-6 animate-fadeIn">
                  <div>
                    <p className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase font-bold mb-3 border-b border-brand-charcoal pb-1">
                      Pants &amp; Cargos
                    </p>
                    <ul className="space-y-2 text-xs normal-case font-medium">
                      <li>
                        <Link href="/shop/cargo-pants" className="text-white hover:text-brand-accent transition-colors block">
                          Multi-Pocket Tactical Cargos
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop/cargo-pants" className="text-neutral-300 hover:text-white transition-colors block">
                          Parachute Utility Pants
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop/jeans" className="text-neutral-300 hover:text-white transition-colors block">
                          Baggy Skate Denim Jeans
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase font-bold mb-3 border-b border-brand-charcoal pb-1">
                      Fabrics
                    </p>
                    <ul className="space-y-2 text-xs normal-case font-medium">
                      <li>
                        <Link href="/shop/cargo-pants" className="text-neutral-300 hover:text-white transition-colors block">
                          Cotton Heavy Twill
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop/jeans" className="text-neutral-300 hover:text-white transition-colors block">
                          14oz Rigid Indigo Denim
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop/cargo-pants" className="text-neutral-300 hover:text-white transition-colors block">
                          Lightweight Ripstop Nylon
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-neutral-900 border border-brand-charcoal p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-mono tracking-widest text-brand-accent uppercase font-bold block mb-1">
                        SIGNATURE CARGO
                      </span>
                      <p className="font-display font-bold text-sm text-white uppercase">
                        Stealth Multi-Pocket Cargo
                      </p>
                      <p className="text-[11px] text-neutral-400 mt-1">
                        8 utility pockets, ankle cinch tabs, and articulated knees.
                      </p>
                    </div>
                    <Link
                      href="/product/stealth-multi-pocket-baggy-cargo-pants"
                      className="text-xs font-bold text-white hover:underline flex items-center gap-1 mt-4"
                    >
                      Shop Piece <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* HOODIES & WINTERWEAR DROPDOWN */}
            <div
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown('winter')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/shop/hoodies"
                className="hover:text-white transition-colors flex items-center gap-1 group"
              >
                OUTERWEAR
                <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === 'winter' ? 'rotate-180' : ''}`} />
              </Link>

              {activeDropdown === 'winter' && (
                <div className="absolute top-full -left-20 w-[640px] bg-brand-black border border-brand-charcoal p-6 shadow-2xl rounded-none grid grid-cols-3 gap-6 animate-fadeIn">
                  <div>
                    <p className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase font-bold mb-3 border-b border-brand-charcoal pb-1">
                      Silhouettes
                    </p>
                    <ul className="space-y-2 text-xs normal-case font-medium">
                      <li>
                        <Link href="/shop/hoodies" className="text-white hover:text-brand-accent transition-colors block">
                          Sub-Zero Heavyweight Hoodies
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop/sweatshirts" className="text-neutral-300 hover:text-white transition-colors block">
                          Tailored Crewneck Sweatshirts
                        </Link>
                      </li>
                      <li>
                        <Link href="/shop/jackets" className="text-neutral-300 hover:text-white transition-colors block">
                          Tactical Bomber Jackets
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase font-bold mb-3 border-b border-brand-charcoal pb-1">
                      Thermal Tech
                    </p>
                    <ul className="space-y-2 text-xs normal-case font-medium">
                      <li>
                        <span className="text-neutral-300 block">
                          Sub-Zero Double-Brushed Fleece
                        </span>
                      </li>
                      <li>
                        <span className="text-neutral-300 block">
                          Double-Layer Heavyweight Hood
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-neutral-900 border border-brand-charcoal p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-mono tracking-widest text-brand-accent uppercase font-bold block mb-1">
                        OUTERWEAR ICON
                      </span>
                      <p className="font-display font-bold text-sm text-white uppercase">
                        Sub-Zero Heavyweight Hoodie
                      </p>
                      <p className="text-[11px] text-neutral-400 mt-1">
                        Deep crossover hood, dropped shoulders, kangaroo pocket.
                      </p>
                    </div>
                    <Link
                      href="/product/heavyweight-sub-zero-oversized-hoodie"
                      className="text-xs font-bold text-white hover:underline flex items-center gap-1 mt-4"
                    >
                      Shop Hoodie <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/shop"
              className="hover:text-white transition-colors py-2 relative group"
            >
              CATALOG
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
            </Link>

            <Link
              href="/about"
              className="hover:text-white transition-colors py-2 text-neutral-400 hover:text-white"
            >
              ABOUT
            </Link>
          </nav>

          {/* Right: Actions (Search, Account, Wishlist, Bag, Admin) */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search drops"
              className="p-1.5 text-neutral-300 hover:text-white transition-colors"
            >
              <Search size={20} />
            </button>

            {/* Account Link */}
            <Link
              href="/account"
              aria-label="User account"
              className="p-1.5 text-neutral-300 hover:text-white transition-colors relative"
            >
              <User size={20} />
              {user && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full" />
              )}
            </Link>

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              aria-label="Saved items"
              className="p-1.5 text-neutral-300 hover:text-white transition-colors relative hidden sm:block"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Bag Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping bag"
              className="p-1.5 text-white hover:text-neutral-300 transition-colors relative flex items-center gap-1.5"
            >
              <ShoppingBag size={20} />
              <span className="text-xs font-bold tracking-tight">
                {cartTotalItems > 0 ? (
                  <span className="bg-brand-accent text-white text-[10px] font-bold px-1.5 py-0.5">
                    {cartTotalItems}
                  </span>
                ) : (
                  <span className="text-neutral-400">0</span>
                )}
              </span>
            </button>

            {/* Admin Console Direct Link */}
            <Link
              href="/admin"
              aria-label="Admin console"
              className="hidden lg:flex items-center gap-1 text-[11px] font-mono text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600 px-2 py-1 transition-colors"
              title="Admin Console"
            >
              <Shield size={12} />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </header>

      {/* MOBILE FULL-HEIGHT DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col bg-brand-black/98 text-white animate-fadeIn">
          {/* Mobile Header Bar */}
          <div className="flex items-center justify-between px-5 h-16 border-b border-brand-charcoal">
            <span className="font-display font-black text-lg uppercase tracking-widest">
              SHARMAZONE®
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-neutral-400 hover:text-white"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
            <div>
              <p className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase font-bold mb-3">
                COLLECTIONS
              </p>
              <div className="space-y-3 font-display uppercase tracking-tight text-xl font-bold">
                <Link
                  href="/shop?filter=new"
                  className="block hover:text-brand-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  NEW ARRIVALS
                </Link>
                <Link
                  href="/shop/oversized-t-shirts"
                  className="block hover:text-brand-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  OVERSIZED T-SHIRTS
                </Link>
                <Link
                  href="/shop/cargo-pants"
                  className="block hover:text-brand-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  CARGO PANTS &amp; JEANS
                </Link>
                <Link
                  href="/shop/hoodies"
                  className="block hover:text-brand-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  HOODIES &amp; SWEATSHIRTS
                </Link>
                <Link
                  href="/shop"
                  className="block text-neutral-300 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ALL PIECES
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-brand-charcoal space-y-3 font-mono text-xs uppercase text-neutral-400">
              <Link
                href="/cart"
                className="block text-white hover:text-brand-accent font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shopping Bag ({cartTotalItems})
              </Link>
              <Link
                href="/wishlist"
                className="block text-white hover:text-brand-accent font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Wishlist ({wishlist.length})
              </Link>
              <Link
                href="/track-order"
                className="block text-white hover:text-brand-accent font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Track Live Order
              </Link>
              <Link
                href="/about"
                className="block hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                About SHARMAZONE
              </Link>
              <Link
                href="/contact"
                className="block hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Client Concierge
              </Link>
              <Link
                href="/size-guide"
                className="block hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Size Guide
              </Link>
              <Link
                href="/admin"
                className="block text-emerald-400 font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin Console
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
