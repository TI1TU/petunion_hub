'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { CheckCircle2 } from 'lucide-react';

export default function ToastContainer() {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-fadeIn">
      <div className="bg-neutral-900 border border-brand-charcoal text-white text-xs px-4 py-2.5 shadow-2xl flex items-center gap-2 rounded-sm backdrop-blur-md">
        <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" />
        <span className="font-medium tracking-wide">{toastMessage}</span>
      </div>
    </div>
  );
}
