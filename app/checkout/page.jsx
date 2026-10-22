'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Lock,
  Truck,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  RotateCcw,
  Sparkles,
  MapPin,
  AlertCircle,
  HelpCircle,
  RefreshCw,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { validateDelhiNcrPincode } from '@/lib/pincode';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    cartSubtotal,
    shippingFee,
    discountAmount,
    grandTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    clearCart,
    user,
    loginUser,
    isGiftWrapped,
    giftWrapFee,
  } = useStore();

  const [phone, setPhone] = useState(user?.phone || '9876543210');
  const [fullName, setFullName] = useState(user?.name || 'Kabir Sharma');
  const [email, setEmail] = useState(user?.email || 'kabir.sharma@example.com');
  const [addressLine, setAddressLine] = useState(
    user?.addresses?.[0]?.addressLine || 'B-42, Greater Kailash Part 1'
  );
  const [locality, setLocality] = useState('Near M-Block Market');
  const [city, setCity] = useState('Delhi');
  const [state, setState] = useState('Delhi');
  const [pincode, setPincode] = useState('110048');
  const [pincodeValidation, setPincodeValidation] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'cod'
  const [upiApp, setUpiApp] = useState('gpay');
  const [simulatedPaymentOutcome, setSimulatedPaymentOutcome] = useState('SUCCESS'); // 'SUCCESS' | 'FAILED' | 'CANCELLED'
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [createdOrder, setCreatedOrder] = useState(null);

  // Validate pincode on initial load & change
  useEffect(() => {
    const res = validateDelhiNcrPincode(pincode);
    setPincodeValidation(res);
    if (res.serviceable) {
      setCity(res.city);
      setState(res.state);
    }
  }, [pincode]);

  const handlePincodeChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPincode(val);
    const res = validateDelhiNcrPincode(val);
    setPincodeValidation(res);
    if (res.serviceable) {
      setCity(res.city);
      setState(res.state);
    }
  };

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;

    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponInput, subtotal: cartSubtotal }),
      });
      const data = await res.json();
      if (!res.ok || !data.valid) {
        setCouponError(data.message || 'Invalid coupon.');
      } else {
        applyCoupon(data.coupon);
        setCouponInput('');
      }
    } catch (_) {
      setCouponError('Error validating coupon on server.');
    }
  };

  // Place Order on Server with strict server pricing & Delhi NCR validation
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!pincodeValidation || !pincodeValidation.serviceable) {
      setSubmitError(
        'Delivery unserviceable for this pincode. SHARMAZONE exclusively services Delhi, Noida, Gurugram, and Ghaziabad (Delhi NCR).'
      );
      return;
    }

    if (!phone || phone.length < 10) {
      setSubmitError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const idempotencyKey = `idemp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

      const orderPayload = {
        items: cart.map((i) => ({
          productId: i.product?.id,
          slug: i.product?.slug,
          name: i.product?.name,
          size: i.size,
          color: i.color,
          quantity: i.quantity,
        })),
        customer: {
          name: fullName,
          email,
          phone,
        },
        shippingAddress: {
          fullName,
          phone,
          addressLine,
          locality,
          city,
          state,
          pincode,
        },
        couponCode: appliedCoupon?.code || null,
        paymentMethod,
        idempotencyKey,
        isGiftWrapped,
      };

      // 1. Create order on server
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.success) {
        throw new Error(orderData.error || 'Failed to initialize order on server.');
      }

      const order = orderData.order;
      setCreatedOrder(order);

      // 2. Handle Payment Flow
      if (paymentMethod === 'cod') {
        // COD is immediately confirmed
        clearCart();
        router.push(`/checkout/success?orderId=${order.id}&trackingId=${order.trackingId}`);
        return;
      }

      // Online payment (UPI or Card): Execute through sandbox verification
      const payRes = await fetch('/api/payment/sandbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'confirm',
          orderId: order.id,
          simulatedOutcome: simulatedPaymentOutcome,
        }),
      });

      const payData = await payRes.json();
      if (!payRes.ok || payData.status !== 'PAID') {
        throw new Error(
          payData.message || 'Payment was not captured. You may retry your payment below.'
        );
      }

      clearCart();
      router.push(`/checkout/success?orderId=${order.id}&trackingId=${order.trackingId}`);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0 && !createdOrder) {
    return (
      <div className="bg-brand-black text-white min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-display font-black text-2xl uppercase tracking-tight">Your Bag is Empty</h1>
        <p className="text-xs text-neutral-400 mt-2 mb-6">
          Add some curated SHARMAZONE fashion pieces before checking out.
        </p>
        <Link
          href="/shop"
          className="bg-white text-black font-display font-bold text-xs uppercase px-8 py-3.5 tracking-wider hover:bg-neutral-200 transition-colors"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  const codFee = paymentMethod === 'cod' ? 0 : 0; // COD is complimentary in Delhi NCR
  const finalPayable = grandTotal;

  return (
    <div className="bg-brand-black text-white min-h-screen py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Minimal Distraction-Free Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-brand-charcoal">
          <Link href="/" className="font-display font-black text-xl uppercase tracking-widest text-white">
            SHARMAZONE<span className="text-[10px] align-super text-neutral-400">®</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
            <Lock size={13} className="text-emerald-400" />
            <span>256-BIT ENCRYPTED CHECKOUT • DELHI NCR</span>
          </div>
        </div>

        {submitError && (
          <div className="mb-6 p-4 bg-red-950/80 border border-red-500 text-red-200 text-xs font-mono flex items-start gap-3">
            <AlertCircle size={18} className="flex-shrink-0 text-red-400 mt-0.5" />
            <div>
              <p className="font-bold">Checkout Notice:</p>
              <p>{submitError}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT: CHECKOUT STEPS */}
          <div className="lg:col-span-7 space-y-8">
            <form onSubmit={handlePlaceOrder} className="space-y-8">
              {/* Step 1: Customer Contact Info */}
              <div className="p-5 bg-neutral-950 border border-brand-charcoal space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent font-bold">
                    STEP 1 OF 3
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">Contact Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono tracking-wider text-neutral-400 uppercase mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Kabir Sharma"
                      className="w-full bg-black border border-neutral-700 focus:border-white p-3 text-xs text-white placeholder-neutral-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono tracking-wider text-neutral-400 uppercase mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="kabir@example.com"
                      className="w-full bg-black border border-neutral-700 focus:border-white p-3 text-xs text-white placeholder-neutral-600 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono tracking-wider text-neutral-400 uppercase mb-1">
                    Mobile Number (For Delhi NCR Courier Updates)
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 border border-r-0 border-neutral-700 bg-neutral-900 text-neutral-400 text-xs font-mono">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="9876543210"
                      className="w-full bg-black border border-neutral-700 focus:border-white p-3 text-xs text-white placeholder-neutral-600 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Address & Delhi NCR Pincode Lookup */}
              <div className="p-5 bg-neutral-950 border border-brand-charcoal space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent font-bold">
                    STEP 2 OF 3
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">
                    Delhi NCR Delivery Destination
                  </span>
                </div>

                {/* Pincode Input First */}
                <div>
                  <label className="block text-[11px] font-mono tracking-wider text-neutral-400 uppercase mb-1">
                    6-Digit Postal Code (PIN)
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={handlePincodeChange}
                    placeholder="e.g. 110001, 201301, 122002, 201010"
                    className="w-full bg-black border border-neutral-700 focus:border-white p-3 text-xs text-white placeholder-neutral-600 outline-none font-mono font-bold"
                  />

                  {/* Real-time Pincode Validation Feedback */}
                  {pincodeValidation && (
                    <div
                      className={`mt-2 p-2.5 text-[11px] font-mono border flex items-start gap-2 ${
                        pincodeValidation.serviceable
                          ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                          : 'bg-red-950/60 border-red-500 text-red-200'
                      }`}
                    >
                      {pincodeValidation.serviceable ? (
                        <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-bold">
                          {pincodeValidation.serviceable
                            ? `Deliverable: ${pincodeValidation.city}, ${pincodeValidation.state}`
                            : 'Service Area Notice:'}
                        </p>
                        <p>{pincodeValidation.message}</p>
                        {pincodeValidation.deliveryEstimate && (
                          <p className="text-neutral-300 mt-0.5">
                            Estimated Transit: <strong>{pincodeValidation.deliveryEstimate}</strong> via{' '}
                            {pincodeValidation.carrier}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-mono tracking-wider text-neutral-400 uppercase mb-1">
                    Flat / House No. / Building & Street
                  </label>
                  <input
                    type="text"
                    required
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                    placeholder="B-42, Greater Kailash Part 1"
                    className="w-full bg-black border border-neutral-700 focus:border-white p-3 text-xs text-white placeholder-neutral-600 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono tracking-wider text-neutral-400 uppercase mb-1">
                      Locality / Landmark
                    </label>
                    <input
                      type="text"
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      placeholder="Near Metro Station"
                      className="w-full bg-black border border-neutral-700 focus:border-white p-3 text-xs text-white placeholder-neutral-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono tracking-wider text-neutral-400 uppercase mb-1">
                      City & State (Auto-Populated)
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={`${city}, ${state}`}
                      className="w-full bg-neutral-900 border border-neutral-800 p-3 text-xs text-neutral-300 outline-none font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method & Sandbox Testing */}
              <div className="p-5 bg-neutral-950 border border-brand-charcoal space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand-accent font-bold">
                    STEP 3 OF 3
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">Payment Options</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label
                    className={`border p-4 flex flex-col justify-between cursor-pointer transition-colors ${
                      paymentMethod === 'upi'
                        ? 'border-white bg-white/5'
                        : 'border-neutral-800 bg-black hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-display font-bold text-xs uppercase text-white">
                        UPI Instant
                      </span>
                      <input
                        type="radio"
                        name="pay"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={() => setPaymentMethod('upi')}
                      />
                    </div>
                    <p className="text-[10px] text-neutral-400">GPay, PhonePe, Paytm QR</p>
                  </label>

                  <label
                    className={`border p-4 flex flex-col justify-between cursor-pointer transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-white bg-white/5'
                        : 'border-neutral-800 bg-black hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-display font-bold text-xs uppercase text-white">
                        Card / NetBanking
                      </span>
                      <input
                        type="radio"
                        name="pay"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                      />
                    </div>
                    <p className="text-[10px] text-neutral-400">All Indian Banks & RuPay</p>
                  </label>

                  <label
                    className={`border p-4 flex flex-col justify-between cursor-pointer transition-colors ${
                      paymentMethod === 'cod'
                        ? 'border-white bg-white/5'
                        : 'border-neutral-800 bg-black hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-display font-bold text-xs uppercase text-white">
                        Cash on Delivery
                      </span>
                      <input
                        type="radio"
                        name="pay"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                      />
                    </div>
                    <p className="text-[10px] text-emerald-400 font-bold">Free COD in Delhi NCR</p>
                  </label>
                </div>

                {/* Sandbox Payment Simulation State Controller (for QA verification) */}
                {paymentMethod !== 'cod' && (
                  <div className="mt-4 p-3 bg-neutral-900 border border-neutral-800 text-xs font-mono space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase text-brand-accent tracking-widest font-bold">
                        SANDBOX GATEWAY STATE CONTROLLER
                      </span>
                      <span className="text-[10px] text-neutral-400">Phase 2E Testing</span>
                    </div>
                    <p className="text-neutral-400 text-[11px]">
                      Select the simulated payment callback result:
                    </p>
                    <div className="flex gap-2">
                      {['SUCCESS', 'FAILED', 'CANCELLED'].map((outcome) => (
                        <button
                          key={outcome}
                          type="button"
                          onClick={() => setSimulatedPaymentOutcome(outcome)}
                          className={`px-3 py-1.5 text-[11px] font-bold uppercase transition-colors ${
                            simulatedPaymentOutcome === outcome
                              ? outcome === 'SUCCESS'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-red-600 text-white'
                              : 'bg-black text-neutral-400 border border-neutral-700'
                          }`}
                        >
                          Simulate {outcome}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || (pincodeValidation && !pincodeValidation.serviceable)}
                className="w-full bg-white hover:bg-neutral-200 text-black font-display font-black text-sm uppercase py-4 tracking-wider transition-colors flex items-center justify-center gap-2 shadow-2xl disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>COMMUNICATING WITH SERVER...</span>
                ) : (
                  <>
                    <span>PLACE ORDER • ₹{finalPayable}</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-950 border border-brand-charcoal p-6 space-y-6 sticky top-6">
              <h2 className="font-display font-bold text-base uppercase text-white tracking-wider border-b border-neutral-800 pb-3">
                ORDER OVERVIEW
              </h2>

              {/* Items preview */}
              <div className="space-y-3 max-h-60 overflow-y-auto no-scrollbar">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="flex gap-3 text-xs font-mono">
                    <img
                      src={item.product?.images?.[0]}
                      alt={item.product?.name}
                      className="w-12 h-16 object-cover bg-neutral-900"
                    />
                    <div className="flex-1">
                      <p className="text-white font-bold line-clamp-1">{item.product?.name}</p>
                      <p className="text-neutral-400 text-[11px]">
                        {item.size} • Qty: {item.quantity}
                      </p>
                      <p className="text-white mt-1">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2 pt-2 border-t border-neutral-800">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  placeholder="COUPON (e.g. FIRST10)"
                  className="flex-1 bg-black border border-neutral-700 px-3 py-2 text-xs font-mono uppercase text-white outline-none focus:border-white"
                />
                <button
                  type="submit"
                  className="bg-white hover:bg-neutral-200 text-black px-4 py-2 text-xs font-bold font-mono"
                >
                  APPLY
                </button>
              </form>

              {couponError && <p className="text-[11px] text-red-400 font-mono">{couponError}</p>}

              {appliedCoupon && (
                <div className="p-2 bg-emerald-950 border border-emerald-800 text-xs font-mono text-emerald-300 flex justify-between">
                  <span>
                    {appliedCoupon.code}: {appliedCoupon.description}
                  </span>
                  <button onClick={removeCoupon} className="text-neutral-400 hover:text-white underline">
                    Remove
                  </button>
                </div>
              )}

              {/* Totals */}
              <div className="space-y-2 pt-4 border-t border-neutral-800 text-xs font-mono">
                <div className="flex justify-between text-neutral-400">
                  <span>Bag Subtotal</span>
                  <span className="text-white">₹{cartSubtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-400">
                  <span>Delhi NCR Express Shipping</span>
                  <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>

                {giftWrapFee > 0 && (
                  <div className="flex justify-between text-neutral-400">
                    <span>Gift Wrap</span>
                    <span>₹{giftWrapFee}</span>
                  </div>
                )}

                <div className="flex justify-between text-base font-display font-black text-white pt-3 border-t border-neutral-800">
                  <span>TOTAL PAYABLE</span>
                  <span>₹{finalPayable}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
