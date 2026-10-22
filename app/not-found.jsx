import React from 'react';
import Link from 'next/link';
import { ArrowRight, Search, Home } from 'lucide-react';

export const metadata = {
  title: '404 // Drop Not Found | SHARMAZONE™',
};

export default function NotFound() {
  return (
    <div className="bg-brand-black text-white min-h-[85vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center space-y-8 border border-brand-charcoal bg-neutral-950 p-8 sm:p-14 shadow-2xl">
        <div className="inline-block px-3 py-1 bg-neutral-900 border border-brand-charcoal font-mono text-[11px] uppercase tracking-widest text-brand-accent">
          [ERROR 404: ARCHIVED / UNRELEASED]
        </div>

        <h1 className="font-display font-black text-5xl sm:text-7xl uppercase tracking-tighter text-white leading-none">
          DROP NOT <br />
          <span className="text-neutral-500">FOUND</span>
        </h1>

        <p className="text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
          The streetwear silhouette or URL you requested does not exist in our metropolitan catalogue or has moved to our seasonal archives.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link
            href="/"
            className="bg-white hover:bg-neutral-200 text-black font-display font-black text-xs uppercase px-8 py-3.5 tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <Home size={14} />
            <span>RETURN TO BASE</span>
          </Link>
          <Link
            href="/shop"
            className="bg-brand-charcoal hover:bg-neutral-800 text-white font-display font-bold text-xs uppercase px-8 py-3.5 tracking-wider transition-colors flex items-center justify-center gap-2 border border-brand-charcoal"
          >
            <span>EXPLORE ACTIVE DROPS</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Quick Directory Links */}
        <div className="pt-8 border-t border-brand-charcoal grid grid-cols-3 gap-2 text-xs font-mono text-neutral-400 uppercase">
          <Link href="/shop/oversized-t-shirts" className="hover:text-white">
            01 T-Shirts
          </Link>
          <Link href="/shop/cargo-pants" className="hover:text-white">
            02 Cargos
          </Link>
          <Link href="/shop/winterwear" className="hover:text-white">
            03 Winter / 26
          </Link>
        </div>
      </div>
    </div>
  );
}
