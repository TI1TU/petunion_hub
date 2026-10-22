'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  Truck,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import ProductCard from '@/components/ProductCard';

export default function AccountPage() {
  const { user, loginUser, logoutUser, wishlist, setIsAuthModalOpen } = useStore();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'addresses' | 'wishlist'

  if (!user) {
    return (
      <div className="bg-brand-black text-white min-h-[70vh] flex flex-col items-center justify-center p-6 text-center pt-28">
        <div className="w-16 h-16 bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-4">
          <User size={28} className="text-neutral-300" />
        </div>
        <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight">
          SHARMAZONE ACCOUNT
        </h1>
        <p className="text-xs text-neutral-400 mt-2 mb-6 max-w-sm">
          Sign in to view your orders, saved Delhi NCR addresses, and priority delivery updates.
        </p>
        <div className="flex gap-3">
          <Link
            href="/login"
            className="bg-white text-black font-display font-black text-xs uppercase px-8 py-3.5 tracking-wider hover:bg-neutral-200 transition-colors"
          >
            SIGN IN
          </Link>
          <Link
            href="/signup"
            className="border border-neutral-700 hover:border-white text-white font-mono text-xs uppercase px-6 py-3.5 transition-colors"
          >
            CREATE ACCOUNT
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-black text-white min-h-screen pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Profile Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-brand-charcoal gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 size={12} /> VERIFIED SHARMAZONE MEMBER • DELHI NCR
            </span>
            <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white mt-1">
              {user.name}
            </h1>
            <p className="text-xs text-neutral-400 mt-0.5 font-mono">{user.phone ? `+91 ${user.phone}` : user.email}</p>
          </div>

          <button
            onClick={logoutUser}
            className="self-start sm:self-auto bg-neutral-900 border border-brand-charcoal hover:border-neutral-500 text-xs font-bold uppercase px-4 py-2 text-neutral-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <LogOut size={14} />
            <span>Log Out</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-brand-charcoal gap-6 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'orders'
                ? 'border-white text-white'
                : 'border-transparent text-neutral-500 hover:text-white'
            }`}
          >
            <Package size={14} />
            <span>Orders ({user.orders?.length || 0})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'addresses'
                ? 'border-white text-white'
                : 'border-transparent text-neutral-500 hover:text-white'
            }`}
          >
            <MapPin size={14} />
            <span>Saved Addresses</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`pb-3 border-b-2 flex items-center gap-2 transition-all ${
              activeTab === 'wishlist'
                ? 'border-white text-white'
                : 'border-transparent text-neutral-500 hover:text-white'
            }`}
          >
            <Heart size={14} />
            <span>Wishlist ({wishlist.length})</span>
          </button>
        </div>

        {/* Tab Content: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {(!user.orders || user.orders.length === 0) ? (
              <div className="p-8 bg-neutral-950 border border-brand-charcoal text-center space-y-3">
                <ShoppingBag size={28} className="mx-auto text-neutral-500" />
                <p className="font-display font-bold text-sm uppercase text-white">No Orders Placed Yet</p>
                <p className="text-xs text-neutral-400">Discover our collection tailored for Delhi NCR.</p>
                <Link
                  href="/shop"
                  className="inline-block mt-2 bg-white text-black font-display font-bold text-xs uppercase px-6 py-2.5"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              user.orders.map((order) => (
                <div
                  key={order.id}
                  className="p-5 bg-neutral-950 border border-brand-charcoal space-y-4 font-mono text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-brand-charcoal gap-2">
                    <div>
                      <span className="text-[10px] text-neutral-400">Order Ref:</span>
                      <p className="font-bold text-white text-sm">{order.id}</p>
                      <p className="text-[11px] text-neutral-400 font-sans">{order.date}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 text-[10px] uppercase font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                        {order.status}
                      </span>
                      <Link
                        href={`/track-order?id=${order.id}`}
                        className="bg-white hover:bg-neutral-200 text-black px-3 py-1 font-bold text-[11px] flex items-center gap-1"
                      >
                        <Truck size={12} />
                        <span>Track</span>
                      </Link>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
                    <div>
                      <span className="text-neutral-500">Items:</span>
                      <p className="text-white font-bold">{order.items} Pieces</p>
                    </div>
                    <div>
                      <span className="text-neutral-500">Final Total:</span>
                      <p className="text-white font-bold">₹{order.total}</p>
                    </div>
                    <div>
                      <span className="text-neutral-500">Payment:</span>
                      <p className="text-white">{order.payment}</p>
                    </div>
                    <div>
                      <span className="text-neutral-500">Service Carrier:</span>
                      <p className="text-emerald-400 truncate">{order.carrier || 'SHARMAZONE Delhi Priority'}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab Content: Addresses */}
        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(user.addresses || []).map((addr) => (
              <div
                key={addr.id}
                className="p-5 bg-neutral-950 border border-brand-charcoal space-y-2 text-xs font-mono relative"
              >
                {addr.isDefault && (
                  <span className="absolute top-4 right-4 text-[10px] uppercase bg-white/10 px-2 py-0.5 text-neutral-300">
                    Default Delivery Address
                  </span>
                )}
                <p className="font-bold text-white text-sm font-sans">{addr.name}</p>
                <p className="text-neutral-400 font-sans">{addr.addressLine}</p>
                <p className="text-emerald-400 font-bold">
                  {addr.city}, {addr.state} - {addr.pincode}
                </p>
                <p className="text-neutral-500 pt-1">+91 {addr.phone}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: Wishlist */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlist.length === 0 ? (
              <div className="p-8 bg-neutral-950 border border-brand-charcoal text-center space-y-3">
                <Heart size={28} className="mx-auto text-neutral-500" />
                <p className="font-display font-bold text-sm uppercase text-white">Your Wishlist is Empty</p>
                <Link
                  href="/shop"
                  className="inline-block mt-2 bg-white text-black font-display font-bold text-xs uppercase px-6 py-2.5"
                >
                  Explore Catalog
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {wishlist.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
