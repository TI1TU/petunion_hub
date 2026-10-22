'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  const phoneNumber = '919876543210';
  const textMessage = encodeURIComponent(
    'Hi SHARMAZONE! I have a question regarding sizing and Delhi NCR delivery for your latest drop.'
  );
  const waUrl = `https://wa.me/${phoneNumber}?text=${textMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Discreet Hover/Tap Prompt */}
      {showTooltip && (
        <div className="bg-neutral-900 border border-brand-charcoal text-white text-xs py-2 px-3.5 shadow-xl hidden sm:flex items-center gap-2 animate-fadeIn font-mono">
          <span>Need sizing or delivery help? Chat with a SHARMAZONE stylist</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-neutral-400 hover:text-white"
            aria-label="Dismiss tooltip"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        aria-label="Chat on WhatsApp"
        className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all duration-300 group"
      >
        <MessageCircle size={24} className="fill-current" />
      </a>
    </div>
  );
}
