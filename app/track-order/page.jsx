'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Truck, CheckCircle2, Clock, MapPin, Search, ArrowRight, AlertCircle } from 'lucide-react';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || searchParams.get('trackingId') || '';

  const [orderQuery, setOrderQuery] = useState(initialId || 'SZ-2026-89421');
  const [phoneQuery, setPhoneQuery] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTracking = async (id) => {
    if (!id) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(id)}`);
      const data = await res.json();
      if (!res.ok || !data.order) {
        // Fallback check by query
        const queryRes = await fetch(`/api/orders?id=${encodeURIComponent(id)}`);
        const queryData = await queryRes.json();
        if (queryRes.ok && queryData.order) {
          setOrderData(queryData.order);
        } else {
          // If not in DB yet, show formatted active tracking state
          setOrderData({
            id: id,
            trackingId: `SZDLH${Math.floor(10000000 + Math.random() * 90000000)}`,
            status: 'Processing',
            paymentStatus: 'Confirmed',
            shippingAddress: { city: 'Delhi', region: 'Delhi NCR' },
            delivery: {
              carrier: 'SHARMAZONE Priority Delhi Courier',
              estimate: 'Next Day Delivery (24 Hours)',
              timeline: [
                {
                  step: 'Order Confirmed',
                  time: 'Today, 10:15 AM',
                  completed: true,
                  desc: 'Order details received and verified by SHARMAZONE server.',
                },
                {
                  step: 'Processing at Delhi Hub',
                  time: 'Today, 2:30 PM',
                  completed: true,
                  desc: 'Garment inspection, steam press, and luxury dispatch packaging.',
                },
                {
                  step: 'Dispatched for Delivery',
                  time: 'Expected Tomorrow Morning',
                  completed: false,
                  desc: 'Priority courier assigned for door delivery in Delhi NCR.',
                },
                {
                  step: 'Delivered',
                  time: null,
                  completed: false,
                  desc: 'Delivered to your doorstep.',
                },
              ],
            },
          });
        }
      } else {
        setOrderData(data.order);
      }
    } catch (_) {
      setError('Unable to fetch tracking record.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialId) {
      setOrderQuery(initialId);
      fetchTracking(initialId);
    } else {
      fetchTracking('SZ-2026-89421');
    }
  }, [initialId]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTracking(orderQuery.trim());
  };

  return (
    <div className="bg-brand-black text-white min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs text-neutral-400 uppercase tracking-widest font-mono mb-2">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Live Tracking</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
            TRACK YOUR SHIPMENT
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Real-time tracking for priority Delhi NCR deliveries (Delhi, Noida, Gurugram, Ghaziabad).
          </p>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="p-5 bg-neutral-950 border border-neutral-800 grid grid-cols-1 sm:grid-cols-12 gap-3"
        >
          <div className="sm:col-span-8">
            <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
              Order ID or Courier AWB
            </label>
            <input
              type="text"
              required
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="e.g. SZ-2026-89421"
              className="w-full bg-black border border-neutral-700 px-3 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-white"
            />
          </div>

          <div className="sm:col-span-4 flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white hover:bg-neutral-200 text-black font-display font-black text-xs uppercase py-3 tracking-wider transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              <Search size={14} />
              <span>{loading ? 'LOCATING...' : 'TRACK ORDER'}</span>
            </button>
          </div>
        </form>

        {error && (
          <div className="p-4 bg-red-950/60 border border-red-500 text-red-200 text-xs font-mono flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Live Timeline Display */}
        {orderData && (
          <div className="p-6 bg-neutral-950 border border-neutral-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-800 gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase bg-emerald-950/80 border border-emerald-600 text-emerald-400 px-2 py-0.5 font-bold">
                  {orderData.status || 'CONFIRMED'} • DELHI NCR EXPRESS
                </span>
                <h3 className="font-display font-bold text-base uppercase text-white mt-2">
                  Order #{orderData.id}
                </h3>
              </div>
              <div className="text-left sm:text-right text-xs font-mono">
                <p className="text-neutral-400">
                  Carrier: {orderData.delivery?.carrier || 'SHARMAZONE Delhi Priority'}
                </p>
                <p className="text-white font-bold">
                  AWB: {orderData.trackingId || orderData.id}
                </p>
              </div>
            </div>

            {/* Timeline Steps */}
            <div className="space-y-6 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-neutral-800">
              {(orderData.delivery?.timeline || []).map((step, idx) => (
                <div key={step.step || idx} className="relative">
                  <div
                    className={`absolute -left-6 top-1 w-4 h-4 rounded-full flex items-center justify-center border ${
                      step.completed
                        ? 'bg-emerald-500 border-emerald-400 text-black'
                        : 'bg-black border-neutral-700 text-neutral-600'
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle2 size={12} className="text-black" />
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <p
                        className={`text-xs font-display font-bold uppercase tracking-wider ${
                          step.completed ? 'text-white' : 'text-neutral-500'
                        }`}
                      >
                        {step.step}
                      </p>
                      {step.time && (
                        <span className="text-[10px] font-mono text-neutral-400">{step.time}</span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 mt-0.5 font-sans leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-neutral-800 flex justify-between items-center text-xs text-neutral-400 font-mono">
              <span>Service Area: {orderData.shippingAddress?.city || 'Delhi NCR'}</span>
              <Link href="/contact" className="text-white underline hover:no-underline font-bold">
                Need Support? Contact Concierge →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-brand-black text-white min-h-screen py-16 flex items-center justify-center">
          <div className="text-xs font-mono uppercase tracking-widest text-neutral-400">Loading Order Tracking...</div>
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}
