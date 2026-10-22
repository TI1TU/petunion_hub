'use client';

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

const SIZE_CHART_INCHES = [
  { size: 'S', chest: '42', length: '28', shoulder: '21', sleeve: '8.5' },
  { size: 'M', chest: '44', length: '29', shoulder: '22', sleeve: '9.0' },
  { size: 'L', chest: '46', length: '30', shoulder: '23', sleeve: '9.5' },
  { size: 'XL', chest: '48', length: '31', shoulder: '24', sleeve: '10.0' },
  { size: 'XXL', chest: '50', length: '32', shoulder: '25', sleeve: '10.5' },
];

const SIZE_CHART_CM = [
  { size: 'S', chest: '106.7', length: '71.1', shoulder: '53.3', sleeve: '21.6' },
  { size: 'M', chest: '111.8', length: '73.7', shoulder: '55.9', sleeve: '22.9' },
  { size: 'L', chest: '116.8', length: '76.2', shoulder: '58.4', sleeve: '24.1' },
  { size: 'XL', chest: '121.9', length: '78.7', shoulder: '61.0', sleeve: '25.4' },
  { size: 'XXL', chest: '127.0', length: '81.3', shoulder: '63.5', sleeve: '26.7' },
];

export default function SizeGuideModal() {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();
  const [unit, setUnit] = useState('in'); // 'in' or 'cm'
  const [activeTab, setActiveTab] = useState('chart'); // 'chart' or 'calculator'

  // Calculator states
  const [userHeight, setUserHeight] = useState('178'); // cm
  const [userWeight, setUserWeight] = useState('72'); // kg
  const [recommendedSize, setRecommendedSize] = useState('L');

  if (!isSizeGuideOpen) return null;

  const handleCalculateSize = (e) => {
    e.preventDefault();
    const h = parseFloat(userHeight);
    const w = parseFloat(userWeight);

    if (w < 60) setRecommendedSize('S');
    else if (w >= 60 && w < 70) setRecommendedSize('M');
    else if (w >= 70 && w < 82) setRecommendedSize('L');
    else if (w >= 82 && w < 94) setRecommendedSize('XL');
    else setRecommendedSize('XXL');
  };

  const currentChart = unit === 'in' ? SIZE_CHART_INCHES : SIZE_CHART_CM;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="absolute inset-0"
        onClick={() => setIsSizeGuideOpen(false)}
      />

      <div className="relative w-full max-w-xl bg-brand-black border border-brand-charcoal p-6 sm:p-8 shadow-2xl text-white z-10 max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setIsSizeGuideOpen(false)}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white transition-colors"
          aria-label="Close size guide"
        >
          <X size={20} />
        </button>

        <div className="mb-6">
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-accent">
            FIT & SIZING INTELLIGENCE
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-white mt-1">
            STREETWEAR SIZING GUIDE
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            SHARMAZONE garments are intentionally cut with modern dropped shoulders and boxy proportions. Order your standard size for the intended streetwear fit.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-brand-charcoal mb-6 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('chart')}
            className={`pb-2.5 px-3 border-b-2 transition-all ${
              activeTab === 'chart'
                ? 'border-white text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Measurement Chart
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`pb-2.5 px-3 border-b-2 transition-all ${
              activeTab === 'calculator'
                ? 'border-white text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Find My Size (Calculator)
          </button>
        </div>

        {activeTab === 'chart' ? (
          <div>
            {/* Unit Toggle */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-neutral-400 font-medium">Garment Specs (Relaxed Flat Lay)</span>
              <div className="inline-flex border border-brand-charcoal bg-neutral-950 p-0.5 text-xs font-bold">
                <button
                  onClick={() => setUnit('in')}
                  className={`px-3 py-1 transition-colors ${
                    unit === 'in' ? 'bg-white text-black' : 'text-neutral-400'
                  }`}
                >
                  INCHES
                </button>
                <button
                  onClick={() => setUnit('cm')}
                  className={`px-3 py-1 transition-colors ${
                    unit === 'cm' ? 'bg-white text-black' : 'text-neutral-400'
                  }`}
                >
                  CM
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-brand-charcoal">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-950 text-neutral-400 uppercase text-[11px] font-bold border-b border-brand-charcoal">
                  <tr>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Chest ({unit.toUpperCase()})</th>
                    <th className="py-3 px-4">Length ({unit.toUpperCase()})</th>
                    <th className="py-3 px-4">Shoulder ({unit.toUpperCase()})</th>
                    <th className="py-3 px-4">Sleeve ({unit.toUpperCase()})</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-charcoal text-neutral-300">
                  {currentChart.map((row) => (
                    <tr key={row.size} className="hover:bg-neutral-900/50">
                      <td className="py-3 px-4 font-bold text-white">{row.size}</td>
                      <td className="py-3 px-4">{row.chest}</td>
                      <td className="py-3 px-4">{row.length}</td>
                      <td className="py-3 px-4">{row.shoulder}</td>
                      <td className="py-3 px-4">{row.sleeve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-3 bg-neutral-950 border border-brand-charcoal text-[11px] text-neutral-400 space-y-1">
              <p>• <strong>Chest:</strong> Measured across the chest 1 inch below armhole.</p>
              <p>• <strong>Length:</strong> Measured from highest point of shoulder to bottom hem.</p>
              <p>• <strong>Fabric Preshrunk:</strong> Pre-washed French Terry ensures less than 1.5% shrinkage.</p>
            </div>
          </div>
        ) : (
          /* Interactive Calculator */
          <div className="space-y-5">
            <form onSubmit={handleCalculateSize} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase font-bold text-neutral-400 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  value={userHeight}
                  onChange={(e) => setUserHeight(e.target.value)}
                  className="w-full bg-neutral-950 border border-brand-charcoal px-3 py-2 text-white font-bold text-sm focus:border-white focus:outline-none"
                  min="140"
                  max="220"
                />
                <span className="text-[10px] text-neutral-500">e.g. 178 cm (5&apos;10&quot;)</span>
              </div>
              <div>
                <label className="block text-xs uppercase font-bold text-neutral-400 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={userWeight}
                  onChange={(e) => setUserWeight(e.target.value)}
                  className="w-full bg-neutral-950 border border-brand-charcoal px-3 py-2 text-white font-bold text-sm focus:border-white focus:outline-none"
                  min="40"
                  max="140"
                />
                <span className="text-[10px] text-neutral-500">e.g. 72 kg</span>
              </div>

              <button
                type="submit"
                className="col-span-2 bg-brand-charcoal hover:bg-neutral-800 text-white font-bold text-xs uppercase py-2.5 tracking-wider transition-colors"
              >
                Recalculate Best Fit
              </button>
            </form>

            {/* Recommendation Card */}
            <div className="p-4 bg-neutral-950 border border-white/20 text-center space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 flex items-center justify-center gap-1">
                <Check size={14} /> AI FIT RECOMMENDATION
              </span>
              <p className="text-3xl font-display font-extrabold text-white">
                SIZE {recommendedSize}
              </p>
              <p className="text-xs text-neutral-300 max-w-sm mx-auto">
                Based on your profile, <strong>Size {recommendedSize}</strong> delivers our signature boxy streetwear drape with dropped shoulders. If you prefer a closer fitted look, size down to {recommendedSize === 'S' ? 'XS' : 'one size smaller'}.
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-brand-charcoal flex justify-end">
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="bg-white text-black text-xs font-bold uppercase px-6 py-2.5 tracking-wider hover:bg-neutral-200 transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
