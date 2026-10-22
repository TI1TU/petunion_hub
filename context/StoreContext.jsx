'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext(null);

const FREE_SHIPPING_THRESHOLD = 999;
const GIFT_WRAP_FEE = 99;

export function StoreProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [quickAddProduct, setQuickAddProduct] = useState(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [notifyModalData, setNotifyModalData] = useState(null);
  const [isGiftWrapped, setIsGiftWrapped] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');

  const [recentSearches, setRecentSearches] = useState([
    'Oversized T-shirts',
    'Cargo Pants',
    'Heavyweight Hoodies',
  ]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [user, setUser] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Initialize from localStorage safely
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('sz_cart') || localStorage.getItem('rd_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('sz_wishlist') || localStorage.getItem('rd_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedSearches = localStorage.getItem('sz_searches') || localStorage.getItem('rd_searches');
      if (savedSearches) setRecentSearches(JSON.parse(savedSearches));

      const savedUser = localStorage.getItem('sz_user') || localStorage.getItem('rd_user');
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch (e) {
      console.error('Failed to load from storage:', e);
    }
  }, []);

  // Sync back to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sz_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('sz_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  // Toast notification helper
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Cart operations
  const addToCart = (product, size, color, quantity = 1, customPrice = null) => {
    if (!product) return;
    const selectedSize = size || product.sizes?.[0] || 'M';
    const selectedColor = color || product.colors?.[0]?.name || 'Standard';
    const unitPrice = customPrice !== null ? customPrice : product.price;
    const cartItemId = `${product.id}-${selectedSize}-${selectedColor}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          product,
          size: selectedSize,
          color: selectedColor,
          price: unitPrice,
          originalPrice: product.price,
          quantity,
        },
      ];
    });

    showToast(`Added ${product.name} (${selectedSize}) to bag`);
    setIsCartOpen(true);
    setQuickAddProduct(null);
  };

  const addBundleToCart = (items, bundleDiscountPercent = 10) => {
    if (!items || items.length === 0) return;

    setCart((prev) => {
      let updated = [...prev];
      items.forEach(({ product, size, color }) => {
        const discountedPrice = Math.round(product.price * (1 - bundleDiscountPercent / 100));
        const selectedSize = size || product.sizes?.[0] || 'L';
        const selectedColor = color || product.colors?.[0]?.name || 'Standard';
        const cartItemId = `${product.id}-${selectedSize}-${selectedColor}`;

        const existingIndex = updated.findIndex((i) => i.cartItemId === cartItemId);
        if (existingIndex > -1) {
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + 1,
          };
        } else {
          updated.push({
            cartItemId,
            product,
            size: selectedSize,
            color: selectedColor,
            price: discountedPrice,
            originalPrice: product.price,
            bundleItem: true,
            quantity: 1,
          });
        }
      });
      return updated;
    });

    showToast(`Added curated 3-piece look to bag with 10% Bundle Discount!`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setIsGiftWrapped(false);
  };

  const moveToWishlist = (cartItemId) => {
    const item = cart.find((i) => i.cartItemId === cartItemId);
    if (item) {
      toggleWishlist(item.product);
      removeFromCart(cartItemId);
      showToast('Moved item to wishlist');
    }
  };

  // Wishlist operations
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (!product) return;
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showToast(`Removed from wishlist`);
        return prev.filter((item) => item.id !== product.id);
      } else {
        showToast(`Saved to wishlist`);
        return [...prev, product];
      }
    });
  };

  // Search
  const addRecentSearch = (term) => {
    if (!term || !term.trim()) return;
    const clean = term.trim();
    setRecentSearches((prev) => {
      const filtered = prev.filter((t) => t.toLowerCase() !== clean.toLowerCase());
      const updated = [clean, ...filtered].slice(0, 8);
      try {
        localStorage.setItem('sz_searches', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Coupon (Supports both direct payload and async server validation)
  const applyCoupon = (couponObjOrCode) => {
    if (typeof couponObjOrCode === 'object' && couponObjOrCode !== null) {
      setAppliedCoupon(couponObjOrCode);
      showToast(`Coupon ${couponObjOrCode.code} applied!`);
      return { success: true, message: `Coupon ${couponObjOrCode.code} applied!` };
    }

    const upper = (couponObjOrCode || '').trim().toUpperCase();
    if (upper === 'FIRST10' || upper === 'RAWFIRST') {
      const c = { code: 'FIRST10', discountPercent: 10, description: '10% First Order Off' };
      setAppliedCoupon(c);
      showToast('Coupon FIRST10 applied: 10% OFF');
      return { success: true, message: '10% First Order Discount applied!' };
    } else if (upper === 'SHARMA10') {
      const c = { code: 'SHARMA10', discountPercent: 10, description: '10% Storewide Off' };
      setAppliedCoupon(c);
      showToast('Coupon SHARMA10 applied: 10% OFF');
      return { success: true, message: '10% Storewide Discount applied!' };
    } else if (upper === 'DELHINCR') {
      const c = { code: 'DELHINCR', discountPercent: 15, description: '15% Delhi NCR Exclusive' };
      setAppliedCoupon(c);
      showToast('Coupon DELHINCR applied: 15% OFF');
      return { success: true, message: '15% Delhi NCR Discount applied!' };
    } else if (upper === 'WELCOME200') {
      const c = { code: 'WELCOME200', flatDiscount: 200, description: '₹200 Flat Off' };
      setAppliedCoupon(c);
      showToast('Coupon WELCOME200 applied: ₹200 OFF');
      return { success: true, message: '₹200 Flat Off applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try FIRST10 or DELHINCR.' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed');
  };

  // Auth
  const loginUser = (phoneNumber, name = 'Kabir Sharma') => {
    const newUser = {
      phone: phoneNumber,
      name: name,
      token: 'sz_usr_' + Date.now(),
      membership: {
        tier: 'SHARMAZONE Insider',
        points: 450,
        referralCode: 'SHARMA-INSIDER',
      },
      addresses: [
        {
          id: 'addr-1',
          name: name || 'Kabir Sharma',
          phone: phoneNumber,
          addressLine: 'B-42, Greater Kailash Part 1',
          city: 'Delhi',
          state: 'Delhi',
          pincode: '110048',
          isDefault: true,
        },
      ],
      orders: [
        {
          id: 'SZ-2026-89421',
          date: 'Yesterday, 4:32 PM',
          status: 'Shipped',
          carrier: 'SHARMAZONE Priority Delhi Courier',
          awb: 'SZDLH982736192',
          items: 2,
          total: 2498,
          payment: 'Prepaid (UPI)',
        },
      ],
    };
    setUser(newUser);
    try {
      localStorage.setItem('sz_user', JSON.stringify(newUser));
    } catch (e) {}
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${newUser.name}!`);
  };

  const logoutUser = () => {
    setUser(null);
    try {
      localStorage.removeItem('sz_user');
    } catch (e) {}
    showToast('Logged out');
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const hasFreeShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = cartSubtotal === 0 || hasFreeShipping ? 0 : 99;
  const giftWrapFee = isGiftWrapped && cartSubtotal > 0 ? GIFT_WRAP_FEE : 0;

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discountAmount = Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100);
      if (appliedCoupon.maxDiscount && discountAmount > appliedCoupon.maxDiscount) {
        discountAmount = appliedCoupon.maxDiscount;
      }
    } else if (appliedCoupon.flatDiscount) {
      discountAmount = Math.min(cartSubtotal, appliedCoupon.flatDiscount);
    } else if (appliedCoupon.discountAmount) {
      discountAmount = Math.min(cartSubtotal, appliedCoupon.discountAmount);
    }
  }

  const grandTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee + giftWrapFee);

  return (
    <StoreContext.Provider
      value={{
        cart,
        cartSubtotal,
        cartTotalItems,
        remainingForFreeShipping,
        hasFreeShipping,
        shippingFee,
        discountAmount,
        grandTotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        addToCart,
        addBundleToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        moveToWishlist,

        // Gift Wrap
        isGiftWrapped,
        setIsGiftWrapped,
        giftWrapFee,

        wishlist,
        isInWishlist,
        toggleWishlist,

        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        quickAddProduct,
        setQuickAddProduct,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        notifyModalData,
        setNotifyModalData,

        // Cursor
        cursorText,
        setCursorText,
        cursorVariant,
        setCursorVariant,

        recentSearches,
        addRecentSearch,

        user,
        loginUser,
        logoutUser,

        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
