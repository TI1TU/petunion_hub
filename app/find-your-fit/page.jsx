import React from 'react';
import Link from 'next/link';
import FindYourFitInline from '@/components/FindYourFitInline';

export const metadata = {
  title: 'Find Your Fit Guide | SHARMAZONE™ Indian Streetwear',
  description: 'Compare Oversized vs Relaxed vs Baggy fits side-by-side with our interactive streetwear size calculator.',
};

export default function FindYourFitPage() {
  return (
    <div className="bg-brand-black text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
        <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-widest font-mono mb-2">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span>/</span>
          <span className="text-white">Fit Guide</span>
        </div>
      </div>
      <FindYourFitInline />
    </div>
  );
}
