'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  Star,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  ChevronDown,
  ChevronUp,
  Info,
  Tag,
  MapPin,
  Clock,
  Sparkles,
  Bell,
  Layers,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { getAllProducts } from '@/lib/products';
import { validateDelhiNcrPincode } from '@/lib/pincode';
import ProductCard from '@/components/ProductCard';
import ProductAnatomy from '@/components/ProductAnatomy';

export default function ProductDetailClient({ initialProduct, slug }) {
  const allProducts = getAllProducts();
  const product = initialProduct || allProducts[0];
  const { addToCart, isInWishlist, toggleWishlist, setIsSizeGuideOpen, setNotifyModalData, setCursorText } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'L');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [pincodeInput, setPincodeInput] = useState('110001');
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [pincodeMessage, setPincodeMessage] = useState(null);

  // Accordion state
  const [expandedSection, setExpandedSection] = useState('description');

  if (!product) {
    return (
      <div className="bg-brand-black text-white min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <h1 className="font-display font-black text-2xl uppercase">Product Not Found</h1>
        <p className="text-xs text-neutral-400 mt-2 mb-6">This drop may have sold out or was relocated.</p>
        <Link
          href="/shop"
          className="bg-white text-black font-display font-bold text-xs uppercase px-6 py-3 tracking-wider"
        >
          Back to Catalog
        </Link>
      </div>
    );
  }

  const inWish = isInWishlist(product.id);
  const soldOutSizes = product.soldOutSizes || [];

  // Pincode Delivery Estimator
  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincodeInput.length === 6) {
      setPincodeChecked(true);
      const res = validateDelhiNcrPincode(pincodeInput);
      setPincodeMessage(res);
    }
  };

  const handleAddToCart = () => {
    if (soldOutSizes.includes(selectedSize)) {
      setNotifyModalData({ product, size: selectedSize });
    } else {
      addToCart(product, selectedSize, selectedColor, quantity);
    }
  };

  const toggleSection = (name) => {
    setExpandedSection(expandedSection === name ? null : name);
  };

  // Related products
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.categorySlug === product.categorySlug || p.fit === product.fit))
    .slice(0, 4);

  return (
    <div className="bg-brand-black text-white min-h-screen py-6 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] md:text-xs text-neutral-400 uppercase tracking-widest font-mono mb-6 md:mb-8 overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-white">
            Catalog
          </Link>
          <span>/</span>
          <Link href={`/shop/${product.categorySlug}`} className="hover:text-white">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-white truncate max-w-[200px]">{product.name}</span>
        </div>

        {/* Product Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          {/* LEFT: 5-6 IMAGE GALLERY & ZOOM */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div
              className="relative aspect-[4/5] w-full bg-neutral-900 border border-brand-charcoal overflow-hidden group cursor-crosshair"
              onMouseEnter={() => setCursorText('ZOOM')}
              onMouseLeave={() => setCursorText('')}
            >
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={`${product.name} angle ${activeImageIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-110"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
                {product.tags && product.tags.length > 0 ? (
                  product.tags.map((t) => (
                    <span
                      key={t}
                      className="bg-brand-black text-white text-[10px] font-display font-extrabold px-2.5 py-1 uppercase tracking-wider border border-white/20"
                    >
                      {t}
                    </span>
                  ))
                ) : product.badge ? (
                  <span className="bg-brand-black text-white text-[10px] font-display font-extrabold px-2.5 py-1 uppercase tracking-wider border border-white/20">
                    {product.badge}
                  </span>
                ) : null}

                {product.discountPercent && (
                  <span className="bg-brand-accent text-white text-[10px] font-display font-extrabold px-2.5 py-1 uppercase tracking-wider">
                    {product.discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product)}
                aria-label={inWish ? 'Remove from wishlist' : 'Save to wishlist'}
                className={`absolute top-4 right-4 z-10 w-10 h-10 border flex items-center justify-center transition-colors ${
                  inWish
                    ? 'bg-white text-black border-white'
                    : 'bg-black/60 text-white border-white/20 hover:bg-black hover:border-white'
                }`}
              >
                <Heart size={16} className={inWish ? 'fill-current text-black' : ''} />
              </button>
            </div>

            {/* Thumbnail Row (5-6 Images) */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-[4/5] bg-neutral-900 overflow-hidden border transition-all ${
                    activeImageIndex === idx
                      ? 'border-white scale-98 shadow-md'
                      : 'border-brand-charcoal opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: PRODUCT SPECIFICATIONS & ACTIONS */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                <span className="uppercase font-mono tracking-wider">
                  {product.gender} • {product.fit} Cut
                </span>
                {product.rating && (
                  <div className="flex items-center gap-1.5 text-neutral-200">
                    <span className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} className="fill-current" />
                      ))}
                    </span>
                    <span className="font-bold">{product.rating}</span>
                    <span className="text-neutral-500">({product.reviewCount} reviews)</span>
                  </div>
                )}
              </div>

              <h1 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white leading-tight">
                {product.name}
              </h1>

              {/* Price Details */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="font-display font-black text-2xl sm:text-3xl text-white font-mono">
                  ₹{product.price}
                </span>
                {product.mrp && (
                  <span className="text-sm text-neutral-500 line-through font-mono">
                    ₹{product.mrp}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="text-xs bg-brand-accent/20 border border-brand-accent/40 text-brand-accent font-bold px-2 py-0.5 uppercase tracking-wider">
                    Save {product.discountPercent}%
                  </span>
                )}
              </div>
              <p className="text-[11px] text-neutral-400 mt-1 font-mono">
                MRP incl. all taxes &amp; GST • Free shipping above ₹999
              </p>
            </div>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="pt-2 border-t border-brand-charcoal">
                <div className="flex justify-between items-center text-xs mb-2.5">
                  <span className="text-neutral-400 font-medium">COLORWAY:</span>
                  <span className="text-white font-bold">{selectedColor || product.colors[0].name}</span>
                </div>
                <div className="flex gap-2.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-8 h-8 rounded-none border transition-all ${
                        selectedColor === c.name
                          ? 'border-white scale-110 shadow-lg'
                          : 'border-neutral-700 opacity-75 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector with Sold-Out Cross-Out & Notify Me */}
            <div className="pt-2 border-t border-brand-charcoal">
              <div className="flex justify-between items-center text-xs mb-2.5">
                <span className="text-neutral-400 font-medium">SELECT SIZE:</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-white hover:text-neutral-300 underline text-[11px] font-bold uppercase tracking-wider flex items-center gap-1"
                  >
                    <Info size={12} />
                    <span>Size Guide (in / cm)</span>
                  </button>
                  <Link
                    href="/find-your-fit"
                    className="text-brand-accent hover:underline text-[11px] font-bold uppercase tracking-wider"
                  >
                    Find My Size
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((sz) => {
                  const isSoldOut = soldOutSizes.includes(sz);
                  return (
                    <button
                      key={sz}
                      onClick={() => {
                        setSelectedSize(sz);
                        if (isSoldOut) {
                          setNotifyModalData({ product, size: sz });
                        }
                      }}
                      className={`py-3 text-xs font-bold uppercase border transition-all text-center relative ${
                        isSoldOut
                          ? 'border-neutral-800 text-neutral-600 line-through bg-neutral-950'
                          : selectedSize === sz
                          ? 'border-white bg-white text-black shadow-md'
                          : 'border-brand-charcoal bg-neutral-950 text-neutral-300 hover:border-neutral-500'
                      }`}
                    >
                      <span>{sz}</span>
                      {isSoldOut && (
                        <span className="block text-[8px] tracking-normal font-sans text-brand-accent no-underline mt-0.5">
                          Notify
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {soldOutSizes.includes(selectedSize) ? (
                <div className="mt-3 p-3 bg-neutral-950 border border-brand-charcoal flex items-center justify-between text-xs">
                  <span className="text-neutral-400">
                    Size <strong>{selectedSize}</strong> is out of stock.
                  </span>
                  <button
                    onClick={() => setNotifyModalData({ product, size: selectedSize })}
                    className="text-brand-accent font-bold uppercase underline text-[11px] flex items-center gap-1"
                  >
                    <Bell size={12} /> Set Restock Alert
                  </button>
                </div>
              ) : product.stockCount && product.stockCount < 10 ? (
                <p className="text-[11px] text-brand-accent font-semibold mt-2.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-ping" />
                  <span>Low stock: Only {product.stockCount} pieces remaining in warehouse!</span>
                </p>
              ) : null}
            </div>

            {/* Quantity Stepper & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-brand-charcoal bg-neutral-950 px-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-neutral-400 hover:text-white px-2 py-3"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 font-mono text-sm font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-neutral-400 hover:text-white px-2 py-3"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-white hover:bg-neutral-200 text-black font-display font-black text-sm uppercase py-4 tracking-wider transition-colors flex items-center justify-center gap-2 shadow-2xl"
                >
                  <ShoppingBag size={17} />
                  <span>
                    {soldOutSizes.includes(selectedSize)
                      ? `NOTIFY ME (${selectedSize})`
                      : `ADD TO BAG — ₹${product.price * quantity}`}
                  </span>
                </button>
              </div>

              {/* Buy Now / Quick Checkout */}
              {!soldOutSizes.includes(selectedSize) && (
                <Link
                  href="/checkout"
                  onClick={() => addToCart(product, selectedSize, selectedColor, quantity)}
                  className="w-full bg-brand-charcoal hover:bg-neutral-800 border border-brand-charcoal text-white font-display font-bold text-xs uppercase py-3.5 tracking-wider transition-colors flex items-center justify-center gap-1.5 block text-center"
                >
                  <span>BUY NOW (INSTANT CHECKOUT)</span>
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>

            {/* PINCODE ESTIMATOR */}
            <div className="p-4 bg-neutral-950 border border-brand-charcoal space-y-3">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-300">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-white" />
                  <span>Delhi NCR Express Delivery Check</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">DELHI • NOIDA • GURUGRAM • GHAZIABAD</span>
              </div>

              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode (e.g. 110001, 122001)"
                  value={pincodeInput}
                  onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                  className="flex-1 bg-black border border-brand-charcoal px-3 py-2 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                />
                <button
                  type="submit"
                  disabled={pincodeInput.length !== 6}
                  className="bg-brand-charcoal hover:bg-neutral-800 text-white font-bold text-xs uppercase px-4 py-2 border border-brand-charcoal disabled:opacity-50 transition-colors"
                >
                  Verify
                </button>
              </form>

              {pincodeChecked && pincodeMessage && (
                <div className="text-xs space-y-1.5 pt-2 border-t border-brand-charcoal/60">
                  {pincodeMessage.serviceable ? (
                    <>
                      <p className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                        <Check size={14} /> Serviceable in {pincodeMessage.region} ({pincodeMessage.state})
                      </p>
                      <p className="text-[11px] text-neutral-300">
                        • Estimated dispatch: <strong>Within 24 Hours</strong> from New Delhi Hub
                      </p>
                      <p className="text-[11px] text-neutral-300">
                        • Delivery ETA: <strong>{pincodeMessage.estimatedDays} business day(s)</strong> via Bluedart / Delhivery Express
                      </p>
                      <p className="text-[11px] text-neutral-400">
                        • Cash on Delivery (COD) &amp; UPI available at checkout
                      </p>
                    </>
                  ) : (
                    <div className="text-amber-400 space-y-1">
                      <p className="flex items-center gap-1.5 font-bold">
                        <AlertCircle size={14} /> Pincode {pincodeMessage.pincode} is not serviceable
                      </p>
                      <p className="text-[11px] text-neutral-400">
                        {pincodeMessage.reason || 'SHARMAZONE exclusively delivers to Delhi NCR pincodes.'}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* EXCLUSIVE PREPAID OFFERS */}
            <div className="p-4 bg-brand-charcoal/40 border border-brand-charcoal space-y-2 text-xs">
              <span className="text-[10px] font-mono uppercase text-brand-accent font-bold tracking-wider flex items-center gap-1">
                <Tag size={12} /> ACTIVE OFFERS &amp; COUPONS
              </span>
              <p className="text-neutral-300 font-medium">
                • <strong>FIRST10:</strong> Flat 10% off on your first order.
              </p>
              <p className="text-neutral-300 font-medium">
                • <strong>DELHINCR:</strong> Flat ₹200 off on Delhi NCR orders above ₹1,999.
              </p>
              <p className="text-neutral-300 font-medium">
                • <strong>SHARMA10:</strong> 10% off on curated streetwear drops.
              </p>
              <p className="text-neutral-400 text-[11px]">
                • Model is 6&apos;0&quot; wearing size L (Chest 38&quot;, Waist 30&quot;)
              </p>
            </div>

            {/* EXPANDABLE ACCORDIONS */}
            <div className="border-t border-brand-charcoal divide-y divide-brand-charcoal text-xs">
              {/* DESCRIPTION */}
              <div className="py-3">
                <button
                  onClick={() => toggleSection('description')}
                  className="w-full flex justify-between items-center font-display font-bold uppercase text-white tracking-wider py-1"
                >
                  <span>DESCRIPTION</span>
                  {expandedSection === 'description' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {expandedSection === 'description' && (
                  <p className="text-neutral-400 leading-relaxed pt-2 animate-fadeIn">
                    {product.description}
                  </p>
                )}
              </div>

              {/* SIZE & FIT */}
              <div className="py-3">
                <button
                  onClick={() => toggleSection('fit')}
                  className="w-full flex justify-between items-center font-display font-bold uppercase text-white tracking-wider py-1"
                >
                  <span>SIZE &amp; FIT GUIDE</span>
                  {expandedSection === 'fit' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {expandedSection === 'fit' && (
                  <div className="space-y-2 text-neutral-400 leading-relaxed pt-2 animate-fadeIn">
                    <p>• {product.fit} Cut: Dropped shoulders with relaxed chest ease.</p>
                    <p>• Order your standard size for the intended streetwear boxy drape.</p>
                    <p>• Pre-shrunk French Terry ensures less than 1.5% residual shrinkage after washing.</p>
                  </div>
                )}
              </div>

              {/* MATERIAL & CARE */}
              <div className="py-3">
                <button
                  onClick={() => toggleSection('care')}
                  className="w-full flex justify-between items-center font-display font-bold uppercase text-white tracking-wider py-1"
                >
                  <span>MATERIAL &amp; CARE MANUAL</span>
                  {expandedSection === 'care' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {expandedSection === 'care' && (
                  <div className="space-y-2 text-neutral-400 leading-relaxed pt-2 animate-fadeIn">
                    <p>• Fabric: {product.fabric}</p>
                    <p>• Care: {product.care}</p>
                    <p>• Crafted &amp; finished in New Delhi, India.</p>
                  </div>
                )}
              </div>

              {/* SHIPPING & RETURNS */}
              <div className="py-3">
                <button
                  onClick={() => toggleSection('shipping')}
                  className="w-full flex justify-between items-center font-display font-bold uppercase text-white tracking-wider py-1"
                >
                  <span>DELHI NCR EXPRESS SHIPPING &amp; RETURNS</span>
                  {expandedSection === 'shipping' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {expandedSection === 'shipping' && (
                  <div className="space-y-2 text-neutral-400 leading-relaxed pt-2 animate-fadeIn">
                    <p>• Free shipping across Delhi NCR on orders above ₹999.</p>
                    <p>• 7-Day hassle-free doorstep exchange and return policy.</p>
                    <p>• Dispatched within 24 hours via Delhi NCR express courier partners.</p>
                  </div>
                )}
              </div>
            </div>

            {/* PRODUCT SPECIFICATION TABLE */}
            <div className="p-4 bg-neutral-950 border border-brand-charcoal space-y-2 text-xs">
              <span className="text-[10px] font-mono uppercase text-neutral-500 font-bold block">
                PRODUCT SPECIFICATION METADATA
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-neutral-400">
                <div>
                  <span className="text-neutral-500">Fabric:</span> {product.fabric}
                </div>
                <div>
                  <span className="text-neutral-500">Fit Silhouette:</span> {product.fit} Cut
                </div>
                <div>
                  <span className="text-neutral-500">SKU Code:</span> {product.sku}
                </div>
                <div>
                  <span className="text-neutral-500">Country of Origin:</span> {product.origin || 'Made in India'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SIGNATURE 3: ANATOMY BLOCK (SELKIRK UPGRADES STYLE) */}
        <div className="mt-20">
          <ProductAnatomy product={product} />
        </div>

        {/* CUSTOMER REVIEWS WITH RATING BREAKDOWN & FIT SLIDER */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-20 pt-12 border-t border-brand-charcoal space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-brand-charcoal pb-4 gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-emerald-400">
                  VERIFIED STREET REVIEWS
                </span>
                <h2 className="font-display font-black text-2xl uppercase tracking-tight text-white mt-1">
                  CUSTOMER FEEDBACK ({product.reviews.length})
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-neutral-400">Average Rating:</span>
                <span className="font-bold text-white flex items-center gap-1 font-mono">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  {product.rating} / 5.0
                </span>
              </div>
            </div>

            {/* Fit Feedback Indicator Slider (Runs Small / True to Size / Runs Large) */}
            <div className="p-5 bg-neutral-950 border border-brand-charcoal space-y-3">
              <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block">
                COMMUNITY FIT ACCURACY [BASED ON 180+ VERIFIED PURCHASES]
              </span>
              <div className="flex items-center justify-between text-xs text-neutral-300 font-medium">
                <span>Runs Small (4%)</span>
                <span className="text-emerald-400 font-bold">True to Size (92%)</span>
                <span>Runs Large (4%)</span>
              </div>
              <div className="w-full bg-neutral-800 h-2 rounded-none overflow-hidden flex">
                <div className="bg-neutral-600 h-full w-[4%]" />
                <div className="bg-emerald-500 h-full w-[92%]" />
                <div className="bg-neutral-600 h-full w-[4%]" />
              </div>
            </div>

            {/* Individual Review Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 bg-neutral-950 border border-brand-charcoal space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex gap-0.5 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={12} className="fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono bg-brand-charcoal px-2 py-0.5 text-neutral-300">
                      {rev.fitFeedback}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-xs sm:text-sm uppercase text-white">
                    {rev.title}
                  </h4>
                  <p className="text-xs text-neutral-300 leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>

                  <div className="pt-2 border-t border-brand-charcoal/50 flex justify-between text-[11px] text-neutral-500">
                    <span className="font-medium text-neutral-400">
                      {rev.author} ({rev.city})
                    </span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* COMPLETE THE LOOK / RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-brand-charcoal">
            <div className="mb-8">
              <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-brand-accent">
                RECOMMENDED PAIRINGS
              </span>
              <h2 className="font-display font-black text-2xl uppercase tracking-tight text-white mt-1">
                COMPLETE THE LOOK
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* STICKY MOBILE BOTTOM ACTION BAR */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-brand-black/95 border-t border-brand-charcoal p-3 backdrop-blur-md flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-mono">
            Size: <strong className="text-white">{selectedSize}</strong>
          </span>
          <span className="font-display font-black text-base text-white font-mono">
            ₹{product.price}
          </span>
        </div>

        <button
          onClick={handleAddToCart}
          className="flex-1 bg-white text-black font-display font-black text-xs uppercase py-3 tracking-wider flex items-center justify-center gap-1.5 shadow-lg active:scale-95 transition-transform"
        >
          <ShoppingBag size={14} />
          <span>
            {soldOutSizes.includes(selectedSize)
              ? `NOTIFY ME (${selectedSize})`
              : `ADD TO BAG`}
          </span>
        </button>
      </div>
    </div>
  );
}
