'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, Heart, ArrowRight, ShieldCheck, Tag, Check, Gift, Sparkles } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import productsData from '@/data/products.json';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    moveToWishlist,
    cartSubtotal,
    freeShippingThreshold,
    remainingForFreeShipping,
    hasFreeShipping,
    shippingFee,
    isGiftWrapped,
    setIsGiftWrapped,
    giftWrapFee,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    grandTotal,
    addToCart,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  // Free shipping progress percentage (0 - 100)
  const shippingProgress = Math.min(
    100,
    Math.round((cartSubtotal / freeShippingThreshold) * 100)
  );

  // Upsell complementary products: pick 3 products not already in cart
  const cartProductIds = new Set(cart.map((item) => item.product.id));
  const upsellProducts = productsData
    .filter((p) => !cartProductIds.has(p.id))
    .slice(0, 3);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer content */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-brand-black border-l border-brand-charcoal flex flex-col shadow-2xl text-white">
          {/* Header */}
          <div className="px-5 py-4 border-b border-brand-charcoal flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-display font-extrabold text-base uppercase tracking-tight">
                SHOPPING BAG
              </h2>
              <span className="text-xs bg-brand-charcoal px-2 py-0.5 rounded-none text-neutral-300 font-mono">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-neutral-400 hover:text-white p-1 transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-neutral-950 px-5 py-3 border-b border-brand-charcoal">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              {hasFreeShipping ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Check size={14} /> FREE EXPRESS SHIPPING UNLOCKED
                </span>
              ) : (
                <span className="text-neutral-300">
                  Add <strong className="text-white font-mono">₹{remainingForFreeShipping}</strong> more for{' '}
                  <strong className="text-brand-accent">FREE SHIPPING</strong>
                </span>
              )}
              <span className="text-[11px] text-neutral-400 font-mono">{shippingProgress}%</span>
            </div>
            {/* Minimal line progress bar */}
            <div className="w-full bg-neutral-800 h-1 rounded-none overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  hasFreeShipping ? 'bg-emerald-500' : 'bg-brand-accent'
                }`}
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 divide-y divide-brand-charcoal">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <p className="text-neutral-400 text-sm">Your shopping bag is empty.</p>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-block bg-white text-black font-display font-bold text-xs uppercase px-6 py-3 tracking-wider hover:bg-neutral-200 transition-colors"
                >
                  START EXPLORING DROPS
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.cartItemId} className="pt-4 first:pt-0 flex gap-3.5">
                  {/* Product 4:5 Thumbnail */}
                  <div className="relative w-20 h-24 sm:w-22 sm:h-28 flex-shrink-0 bg-neutral-900 overflow-hidden border border-brand-charcoal">
                    <img
                      src={item.product.images?.[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="font-display font-bold text-xs sm:text-sm uppercase tracking-tight text-white hover:underline line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {/* Variant metadata */}
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        Size: <span className="text-white font-medium">{item.size}</span> | Color:{' '}
                        <span className="text-white font-medium">{item.color}</span>
                        {item.bundleItem && (
                          <span className="ml-2 text-[10px] bg-emerald-950 border border-emerald-700 text-emerald-400 px-1 font-mono">
                            10% BUNDLE
                          </span>
                        )}
                      </p>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-bold text-white font-mono">₹{item.price}</span>
                        {item.product.mrp && (
                          <span className="text-[10px] text-neutral-500 line-through font-mono">
                            ₹{item.product.mrp}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stepper + Move to Wishlist */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-brand-charcoal/50">
                      <div className="flex items-center border border-brand-charcoal bg-neutral-950">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                          className="p-1.5 text-neutral-400 hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-xs font-bold text-white font-mono">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                          className="p-1.5 text-neutral-400 hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => moveToWishlist(item.cartItemId)}
                        className="text-[11px] text-neutral-400 hover:text-white transition-colors flex items-center gap-1"
                      >
                        <Heart size={12} />
                        <span>Move to wishlist</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* UPSELL / COMPLETE THE LOOK */}
            {cart.length > 0 && upsellProducts.length > 0 && (
              <div className="pt-6 pb-2">
                <p className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-bold mb-3">
                  COMPLETE THE LOOK • RECOMMENDATIONS
                </p>
                <div className="space-y-2">
                  {upsellProducts.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-2 bg-neutral-950 border border-brand-charcoal"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-10 h-12 object-cover border border-brand-charcoal"
                        />
                        <div>
                          <p className="text-xs font-medium text-white line-clamp-1">{p.name}</p>
                          <p className="text-[11px] text-neutral-400 font-mono">₹{p.price}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart(p, p.sizes[0], p.colors?.[0]?.name)}
                        className="text-[11px] font-bold uppercase tracking-wider bg-brand-charcoal hover:bg-white hover:text-black text-white px-2.5 py-1 transition-colors"
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Calculations & Options */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-brand-charcoal bg-neutral-950 space-y-3.5">
              {/* Luxury Gift Wrap Checkbox */}
              <label className="flex items-center justify-between bg-black border border-brand-charcoal p-2.5 text-xs cursor-pointer select-none">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isGiftWrapped}
                    onChange={(e) => setIsGiftWrapped(e.target.checked)}
                    className="accent-white rounded-none"
                  />
                  <span className="flex items-center gap-1.5 text-neutral-200">
                    <Gift size={14} className="text-neutral-300" />
                    <span>Add Luxury Matte Black Gift Wrap &amp; Note</span>
                  </span>
                </div>
                <span className="font-mono text-neutral-400">+₹99</span>
              </label>

              {/* Coupon Code Input */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-950/40 border border-emerald-800/60 p-2.5 text-xs">
                  <div className="flex items-center gap-2 text-emerald-400 font-medium">
                    <Tag size={14} />
                    <span>{appliedCoupon.code} applied ({appliedCoupon.label})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-neutral-400 hover:text-white text-[11px] underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code (RAWFIRST, UPI5)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 bg-black border border-brand-charcoal text-xs uppercase px-3 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                    />
                    <button
                      type="submit"
                      className="bg-brand-charcoal text-white text-xs font-bold px-4 hover:bg-neutral-800 transition-colors uppercase tracking-wider"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-red-400 mt-1">{couponError}</p>
                  )}
                </form>
              )}

              {/* Subtotal breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-400 pt-1">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="text-white font-medium font-mono">₹{cartSubtotal}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Coupon Discount</span>
                    <span className="font-mono">-₹{discountAmount}</span>
                  </div>
                )}
                {isGiftWrapped && (
                  <div className="flex justify-between text-neutral-300">
                    <span>Luxury Gift Wrap</span>
                    <span className="font-mono">+₹{giftWrapFee}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-400 font-semibold uppercase">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-brand-charcoal">
                  <span>Total Amount</span>
                  <span className="font-mono text-base font-black">₹{grandTotal}</span>
                </div>
                <p className="text-[10px] text-neutral-500">Includes GST &amp; all applicable taxes</p>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-white text-black font-display font-extrabold text-sm uppercase py-3.5 tracking-wider hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight size={16} />
              </Link>

              {/* Reassurance strip */}
              <div className="flex items-center justify-center gap-4 text-[10px] text-neutral-400 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={12} className="text-neutral-300" /> 100% Secure Checkout
                </span>
                <span>•</span>
                <span>COD Available</span>
                <span>•</span>
                <span>7-Day Doorstep Exchange</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
