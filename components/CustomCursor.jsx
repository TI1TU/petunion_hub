'use client';

import React, { useEffect, useState } from 'react';
import { useStore } from '@/context/StoreContext';

export default function CustomCursor() {
  const { cursorText, cursorVariant } = useStore();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Check if device supports fine hover pointer
    const checkTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouch(checkTouch);
    if (checkTouch) return;

    const handleMouseMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [visible]);

  if (isTouch || !visible) return null;

  const hasText = Boolean(cursorText);

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-200 select-none ${
          hasText
            ? 'w-16 h-16 bg-white text-black font-display font-black text-[10px] uppercase tracking-wider rounded-full shadow-2xl'
            : cursorVariant === 'link'
            ? 'w-8 h-8 bg-white/20 border border-white rounded-full'
            : 'w-3 h-3 bg-white rounded-full'
        }`}
      >
        {hasText && <span>{cursorText}</span>}
      </div>
    </div>
  );
}
