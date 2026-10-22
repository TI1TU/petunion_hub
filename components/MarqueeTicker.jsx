'use client';

import React from 'react';

export default function MarqueeTicker({
  text = 'SHARMAZONE • DELHI NCR CAPITAL FASHION • PRIORITY EXPRESS DISPATCH • DELHI • NOIDA • GURUGRAM • GHAZIABAD •',
  speed = '40s',
  reverse = false,
  className = '',
}) {
  return (
    <div className={`overflow-hidden whitespace-nowrap select-none bg-neutral-950 border-y border-brand-charcoal py-3 ${className}`}>
      <div
        className={`inline-block font-display font-black text-xs md:text-sm uppercase tracking-widest text-neutral-400 ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
        style={{ animationDuration: speed }}
      >
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
      </div>
    </div>
  );
}
