'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Trash2,
  Heart,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    cartSubtotal,
    cartTotalItems,
    remainingForFreeShipping,
    hasFreeShipping,
    shippingFee,
    discountAmount,
    grandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    updateQuantity,
    removeFromCart,
    moveToWishlist,
    isGiftWrapped,
    setIsGiftWrapped,
    giftWrapFee,
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState('');

  // Pincode estimator
  const [pincode, setPincode] = useState('110001');
  const [pincodeResult, setPincodeResult] = useState(null);
  const [pincodeLoading, setPincodeLoading] = useState(false);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponError('');

    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode, subtotal: cartSubtotal }),
      });
      const data = await res.json();
      if (!res.ok || !data.valid) {
        setCouponError(data.message || 'Invalid coupon.');
      } else {
        applyCoupon(data.coupon);
        setCouponCode('');
      }
    } catch (err) {
      setCouponError('Failed to validate coupon.');
    } finally {
      setCouponLoading(false);
    }
  };

  const handleCheckPincode = async (e) => {
    e.preventDefault();
    if (!pincode.trim()) return;
    setPincodeLoading(true);

    try {
      const res = await fetch(`/api/pincode/validate?pincode=${pincode}`);
      const data = await res.json();
      setPincodeResult(data);
    } catch (err) {
      setPincodeResult({ serviceable: false, message: 'Verification error' });
    } finally {
      setPincodeLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-brand-black text-white flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
          <ShoppingBag size={28} className="text-neutral-400" />
        </div>
        <h1 className="font-display font-black text-3xl uppercase tracking-tight text-white">
          YOUR SHOPPING BAG IS EMPTY
        </h1>
        <p className="text-sm text-neutral-400 max-w-md mt-2 mb-8">
          Explore our curated fashion collection for Delhi NCR and discover your next signature silhouette.
        </p>
        <Link
          href="/shop"
          className="bg-white hover:bg-neutral-200 text-black font-display font-black text-xs uppercase px-8 py-4 tracking-wider transition-colors inline-flex items-center gap-2"
        >
          <span>EXPLORE COLLECTION</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-black text-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-white mb-2">
          SHOPPING BAG
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400 font-mono mb-8">
          {cartTotalItems} {cartTotalItems === 1 ? 'ITEM' : 'ITEMS'} RESERVED FOR DELHI NCR DISPATCH
        </p>

        {/* Free Shipping Progress Strip */}
        <div className="bg-neutral-900 border border-neutral-800 p-4 mb-8">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="flex items-center gap-2 text-neutral-300">
              <Truck size={14} className="text-brand-accent" />
              {hasFreeShipping ? (
                <span className="text-emerald-400 font-bold">
                  CONGRATULATIONS! YOU HAVE UNLOCKED FREE EXPRESS SHIPPING ACROSS DELHI NCR
                </span>
              ) : (
                <span>
                  Add <strong className="text-white">₹{remainingForFreeShipping}</strong> more for{' '}
                  <strong className="text-emerald-400">FREE EXPRESS DELIVERY</strong>
                </span>
              )}
            </span>
            <span className="text-neutral-500 font-bold">
              {Math.min(100, Math.round((cartSubtotal / 999) * 100))}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-neutral-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${Math.min(100, (cartSubtotal / 999) * 100)}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-7 space-y-4">
            {cart.map((item) => (
              <div
                key={item.cartItemId}
                className="bg-neutral-950 border border-neutral-800 p-4 sm:p-5 flex gap-4 sm:gap-6 relative group"
              >
                <div className="w-24 sm:w-28 aspect-[3/4] bg-neutral-900 flex-shrink-0 overflow-hidden">
                  <img
                    src={item.product?.images?.[0] || ''}
                    alt={item.product?.name || 'Product'}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <Link
                        href={`/product/${item.product?.slug}`}
                        className="font-display font-bold text-sm sm:text-base uppercase tracking-tight text-white hover:underline line-clamp-1"
                      >
                        {item.product?.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-neutral-500 hover:text-red-400 p-1"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <p className="text-xs text-neutral-400 mt-1 font-mono">
                      SIZE: <span className="text-white font-bold">{item.size}</span> • COLOR:{' '}
                      <span className="text-white font-bold">{item.color}</span>
                    </p>

                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-display font-black text-base text-white">
                        ₹{item.price}
                      </span>
                      {item.product?.mrp && item.product.mrp > item.price && (
                        <span className="text-xs text-neutral-500 line-through">
                          ₹{item.product.mrp}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-neutral-800/60 mt-3">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-neutral-700 bg-black">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-mono font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => moveToWishlist(item.cartItemId)}
                      className="text-xs font-mono text-neutral-400 hover:text-white flex items-center gap-1.5 transition-colors"
                    >
                      <Heart size={14} />
                      <span>Move to Wishlist</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Gift Wrap Toggle */}
            <div className="bg-neutral-950 border border-neutral-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles size={18} className="text-amber-400 flex-shrink-0" />
                <div>
                  <p className="text-xs font-display font-bold uppercase text-white">
                    SHARMAZONE Signature Gift Wrap (+₹99)
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    Bespoke matte black box, silver metallic wax seal, and personalized calligraphy note.
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={isGiftWrapped}
                onChange={(e) => setIsGiftWrapped(e.target.checked)}
                className="w-4 h-4 accent-white cursor-pointer"
              />
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout */}
          <div className="lg:col-span-5 space-y-6 sticky top-28">
            <div className="bg-neutral-950 border border-neutral-800 p-6 space-y-6">
              <h2 className="font-display font-bold text-lg uppercase tracking-tight text-white border-b border-neutral-800 pb-4">
                ORDER SUMMARY
              </h2>

              {/* Coupon Form */}
              <div>
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="ENTER PROMO (e.g. FIRST10)"
                    className="flex-1 bg-black border border-neutral-700 px-3 py-2.5 text-xs font-mono uppercase text-white placeholder-neutral-500 outline-none focus:border-white"
                  />
                  <button
                    type="submit"
                    disabled={couponLoading || !couponCode}
                    className="bg-white hover:bg-neutral-200 text-black px-4 py-2.5 text-xs font-display font-bold uppercase disabled:opacity-50"
                  >
                    {couponLoading ? '...' : 'APPLY'}
                  </button>
                </form>

                {couponError && (
                  <p className="text-[11px] text-red-400 mt-1.5 flex items-center gap-1 font-mono">
                    <AlertCircle size={12} /> {couponError}
                  </p>
                )}

                {appliedCoupon && (
                  <div className="mt-3 p-2.5 bg-emerald-950/60 border border-emerald-800/80 flex items-center justify-between text-xs font-mono text-emerald-300">
                    <div>
                      <span className="font-bold">{appliedCoupon.code}</span> applied:{' '}
                      {appliedCoupon.description}
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-neutral-400 hover:text-white underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Pincode Estimator */}
              <div className="pt-4 border-t border-neutral-800/80">
                <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  DELHI NCR DELIVERY ESTIMATOR
                </p>
                <form onSubmit={handleCheckPincode} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit PIN"
                    className="w-32 bg-black border border-neutral-700 px-3 py-2 text-xs font-mono text-white outline-none focus:border-white"
                  />
                  <button
                    type="submit"
                    disabled={pincodeLoading}
                    className="border border-neutral-700 hover:border-white px-3 py-2 text-xs font-mono text-neutral-300 hover:text-white"
                  >
                    Check Area
                  </button>
                </form>

                {pincodeResult && (
                  <div
                    className={`mt-2 text-[11px] font-mono p-2 border ${
                      pincodeResult.serviceable
                        ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                        : 'bg-red-950/40 border-red-800 text-red-300'
                    }`}
                  >
                    {pincodeResult.message}
                  </div>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-3 pt-4 border-t border-neutral-800 text-xs font-mono">
                <div className="flex justify-between text-neutral-400">
                  <span>Bag Subtotal</span>
                  <span className="text-white">₹{cartSubtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Coupon Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-400">
                  <span>Delhi NCR Express Shipping</span>
                  <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>

                {giftWrapFee > 0 && (
                  <div className="flex justify-between text-neutral-400">
                    <span>Signature Gift Packaging</span>
                    <span>₹{giftWrapFee}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm sm:text-base font-display font-bold text-white pt-3 border-t border-neutral-800">
                  <span>FINAL PAYABLE</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => router.push('/checkout')}
                className="w-full bg-white hover:bg-neutral-200 text-black font-display font-black text-xs sm:text-sm uppercase py-4 tracking-wider transition-colors flex items-center justify-center gap-2 shadow-xl"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight size={16} />
              </button>

              <div className="grid grid-cols-2 gap-3 pt-2 text-[10px] font-mono text-neutral-400 border-t border-neutral-800">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>100% Encrypted</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw size={14} className="text-neutral-400" />
                  <span>7-Day Return Policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
