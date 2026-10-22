'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DEFAULT_MESSAGES = [
  { text: 'EXPRESS DELIVERY ACROSS DELHI NCR (DELHI, NOIDA, GURUGRAM & GHAZIABAD)', link: '/shipping' },
  { text: 'COMPLIMENTARY SHIPPING ON ORDERS ABOVE ₹999 IN DELHI NCR', link: '/shop' },
  { text: 'USE CODE "FIRST10" FOR 10% OFF YOUR FIRST ORDER', link: '/shop' },
  { text: '7-DAY COMPLIMENTARY DOORSTEP RETURNS & SIZE EXCHANGES', link: '/returns' },
];

export default function AnnouncementBar() {
  const [messages, setMessages] = useState(DEFAULT_MESSAGES);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sync with CMS announcements if updated
  useEffect(() => {
    async function loadCmsAnnouncement() {
      try {
        const res = await fetch('/api/cms');
        if (res.ok) {
          const data = await res.json();
          if (data?.cms?.announcementBar?.text) {
            setMessages([
              {
                text: data.cms.announcementBar.text,
                link: data.cms.announcementBar.link || '/shipping',
              },
              ...DEFAULT_MESSAGES.slice(1),
            ]);
          }
        }
      } catch (_) {}
    }
    loadCmsAnnouncement();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [messages.length]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + messages.length) % messages.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % messages.length);
  };

  const current = messages[currentIndex] || messages[0];

  return (
    <div className="bg-brand-charcoal text-brand-offwhite text-[11px] md:text-xs tracking-wider uppercase border-b border-brand-border-dark select-none h-8 md:h-9 flex items-center justify-between px-3 md:px-8 z-50 relative">
      <button
        onClick={handlePrev}
        aria-label="Previous announcement"
        className="text-neutral-400 hover:text-white transition-colors p-1"
      >
        <ChevronLeft size={14} />
      </button>

      <div className="overflow-hidden flex-1 text-center font-medium mx-2">
        <Link
          href={current.link}
          className="hover:underline underline-offset-4 transition-all duration-300 inline-block py-1 truncate max-w-full font-mono text-[11px]"
        >
          {current.text}
        </Link>
      </div>

      <button
        onClick={handleNext}
        aria-label="Next announcement"
        className="text-neutral-400 hover:text-white transition-colors p-1"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}
