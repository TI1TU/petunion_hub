'use client';

import React, { useState } from 'react';
import { Sparkles, Info, ShieldCheck, Check } from 'lucide-react';

export default function ProductAnatomy({ product }) {
  const [activeHotspotId, setActiveHotspotId] = useState(1);

  if (!product || !product.anatomy) return null;

  const currentPoint = product.anatomy.find((pt) => pt.id === activeHotspotId) || product.anatomy[0];

  return (
    <div className="bg-neutral-950 border border-brand-charcoal p-6 sm:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-brand-charcoal pb-4 gap-2">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent font-bold flex items-center gap-1.5">
            <Sparkles size={12} />
            <span>SIGNATURE 03 • ANATOMY &amp; CRAFTSMANSHIP DECONSTRUCTION</span>
          </span>
          <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white mt-1">
            GARMENT ANATOMY
          </h3>
        </div>
        <span className="text-xs text-neutral-400 font-mono">
          [INTERACTIVE SPECIFICATION MAP]
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Annotated Image with Numbered Hotspot Pins */}
        <div className="lg:col-span-7 relative aspect-[4/5] bg-black border border-brand-charcoal overflow-hidden group">
          <img
            src={product.images[0]}
            alt={`${product.name} anatomy diagram`}
            className="w-full h-full object-cover filter contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />

          {/* Numbered Hotspot Pins */}
          {product.anatomy.map((point) => {
            const isActive = point.id === activeHotspotId;
            return (
              <button
                key={point.id}
                onClick={() => setActiveHotspotId(point.id)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full font-mono text-xs font-black transition-all flex items-center justify-center ${
                  isActive
                    ? 'bg-white text-black scale-125 shadow-2xl ring-4 ring-white/30 z-20'
                    : 'bg-black/90 text-white border border-white/60 hover:scale-110 z-10'
                }`}
                style={{ top: `${point.y}%`, left: `${point.x}%` }}
                aria-label={`Inspect specification ${point.id}: ${point.title}`}
              >
                <span>0{point.id}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Technical Specification Details & Macro Fabric Loop */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Specification Detail Box */}
          <div className="p-5 bg-black border border-white/30 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase bg-neutral-900 border border-brand-charcoal text-brand-accent px-2 py-0.5 font-bold">
                SPEC 0{currentPoint.id} OF 06
              </span>
              <span className="text-[10px] text-emerald-400 font-bold uppercase flex items-center gap-1">
                <Check size={12} /> LAB TESTED
              </span>
            </div>

            <h4 className="font-display font-black text-lg uppercase tracking-tight text-white">
              {currentPoint.title}
            </h4>

            <p className="text-xs text-neutral-300 leading-relaxed">
              {currentPoint.desc}
            </p>
          </div>

          {/* Hotspot Thumbnails List */}
          <div className="space-y-1.5">
            <p className="text-[10px] font-mono uppercase text-neutral-500 font-bold">
              TAP POINT TO INSPECT ANATOMY:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {product.anatomy.map((pt) => (
                <button
                  key={pt.id}
                  onClick={() => setActiveHotspotId(pt.id)}
                  className={`p-2.5 border text-left transition-all flex items-center gap-2 ${
                    pt.id === activeHotspotId
                      ? 'border-white bg-neutral-900 text-white font-bold'
                      : 'border-brand-charcoal text-neutral-400 hover:text-white'
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-60">0{pt.id}</span>
                  <span className="truncate text-[11px]">{pt.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Macro Fabric Loop Video / Canvas Box */}
          <div className="p-4 bg-black border border-brand-charcoal space-y-2">
            <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block">
              FABRIC MACRO TEXTURE [COMBED FRENCH TERRY WEAVE]
            </span>
            <div className="h-24 bg-neutral-900 overflow-hidden relative border border-brand-charcoal">
              <img
                src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80"
                alt="Macro French Terry Fabric Loop"
                className="w-full h-full object-cover scale-150 animate-pulse"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-[10px] font-mono tracking-widest text-neutral-200 uppercase bg-black/80 px-2 py-1 border border-white/20">
                  HIGH-DENSITY COMPACT WEAVE
                </span>
              </div>
            </div>
            <p className="text-[10px] text-neutral-500 leading-tight">
              Pre-washed under gentle enzyme bath to achieve zero collar torque and lasting hand-softness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
