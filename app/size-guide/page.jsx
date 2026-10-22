'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Ruler, ArrowRight } from 'lucide-react';

export default function SizeGuidePage() {
  const [unit, setUnit] = useState('in'); // 'in' | 'cm'

  const toDisplay = (valInInches) => {
    if (unit === 'in') return `${valInInches}"`;
    return `${Math.round(valInInches * 2.54)} cm`;
  };

  return (
    <div className="min-h-screen bg-brand-black text-white pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent font-bold">
              PRECISION FIT ARCHIVE
            </span>
            <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white mt-2">
              SIZE & FIT GUIDE
            </h1>
            <p className="text-sm text-neutral-400 mt-2">
              Tailored architectural sizing for modern silhouettes.
            </p>
          </div>

          <div className="flex items-center gap-1 border border-neutral-700 p-1 bg-neutral-900 font-mono text-xs">
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 font-bold ${
                unit === 'in' ? 'bg-white text-black' : 'text-neutral-400'
              }`}
            >
              INCHES
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 font-bold ${
                unit === 'cm' ? 'bg-white text-black' : 'text-neutral-400'
              }`}
            >
              CENTIMETERS
            </button>
          </div>
        </div>

        {/* 1. Oversized T-Shirts & Tops */}
        <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-4">
          <h2 className="font-display font-bold text-base uppercase text-white tracking-wider border-b border-neutral-800 pb-3">
            Oversized & Relaxed Tops (Drop Shoulder)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="border-b border-neutral-800 text-neutral-400 uppercase bg-neutral-900/60">
                <tr>
                  <th className="p-3">Size</th>
                  <th>Chest Circumference</th>
                  <th>Length</th>
                  <th>Shoulder Width</th>
                  <th>Recommended Height</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {[
                  { size: 'S', chest: 42, len: 28, sh: 20, height: "5'4\" – 5'7\"" },
                  { size: 'M', chest: 44, len: 29, sh: 21, height: "5'7\" – 5'10\"" },
                  { size: 'L', chest: 46, len: 30, sh: 22, height: "5'10\" – 6'1\"" },
                  { size: 'XL', chest: 48, len: 31, sh: 23, height: "6'1\" – 6'3\"" },
                  { size: 'XXL', chest: 50, len: 32, sh: 24, height: "6'3\"+" },
                ].map((row) => (
                  <tr key={row.size} className="hover:bg-white/[0.02]">
                    <td className="p-3 text-white font-bold">{row.size}</td>
                    <td>{toDisplay(row.chest)}</td>
                    <td>{toDisplay(row.len)}</td>
                    <td>{toDisplay(row.sh)}</td>
                    <td className="text-neutral-400">{row.height}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. Cargos, Denims & Relaxed Pants */}
        <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-4">
          <h2 className="font-display font-bold text-base uppercase text-white tracking-wider border-b border-neutral-800 pb-3">
            Cargos, Denims & Relaxed Pants
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="border-b border-neutral-800 text-neutral-400 uppercase bg-neutral-900/60">
                <tr>
                  <th className="p-3">Waist Tag</th>
                  <th>Waistline</th>
                  <th>Hip</th>
                  <th>Inseam Length</th>
                  <th>Leg Opening</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60">
                {[
                  { size: '30 / S', waist: 30, hip: 40, inseam: 30, leg: 18 },
                  { size: '32 / M', waist: 32, hip: 42, inseam: 31, leg: 19 },
                  { size: '34 / L', waist: 34, hip: 44, inseam: 31.5, leg: 20 },
                  { size: '36 / XL', waist: 36, hip: 46, inseam: 32, leg: 21 },
                ].map((row) => (
                  <tr key={row.size} className="hover:bg-white/[0.02]">
                    <td className="p-3 text-white font-bold">{row.size}</td>
                    <td>{toDisplay(row.waist)}</td>
                    <td>{toDisplay(row.hip)}</td>
                    <td>{toDisplay(row.inseam)}</td>
                    <td>{toDisplay(row.leg)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/find-your-fit"
            className="inline-flex items-center gap-2 bg-white hover:bg-neutral-200 text-black font-display font-black text-xs uppercase px-8 py-4 tracking-wider transition-colors"
          >
            <span>USE INTERACTIVE 3D FIT FINDER</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}
