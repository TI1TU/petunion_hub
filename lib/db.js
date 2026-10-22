import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import initialProducts from '@/data/products.json';
import { validateDelhiNcrPincode } from './pincode';

const DATA_DIR = path.join(process.cwd(), 'data', 'store');

// Ensure data/store directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const COUPONS_FILE = path.join(DATA_DIR, 'coupons.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const CMS_FILE = path.join(DATA_DIR, 'cms_content.json');
const CMS_HISTORY_FILE = path.join(DATA_DIR, 'cms_history.json');
const ADMIN_SESSIONS_FILE = path.join(DATA_DIR, 'admin_sessions.json');

// Helper for atomic file read/write
function readJson(filePath, defaultValue) {
  try {
    if (!fs.existsSync(filePath)) {
      writeJson(filePath, defaultValue);
      return defaultValue;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return defaultValue;
  }
}

function writeJson(filePath, data) {
  const tempPath = `${filePath}.tmp.${Date.now()}`;
  try {
    fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempPath, filePath);
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
    try {
      if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    } catch (_) {}
    throw err;
  }
}

// -------------------------------------------------------------
// 1. PRODUCTS PERSISTENCE & INITIALIZATION
// -------------------------------------------------------------
function cleanGsmAndRebrandProduct(p) {
  const cleanedName = p.name
    .replace(/Raw District/gi, 'SHARMAZONE')
    .replace(/\b\d{3}\s*GSM\b/gi, '')
    .trim();

  const cleanedFabric = (p.fabric || '')
    .replace(/\(\d{3}\s*GSM\)/gi, '')
    .replace(/\b\d{3}\s*GSM\b/gi, '')
    .trim();

  const cleanedDesc = (p.description || '')
    .replace(/Raw District/gi, 'SHARMAZONE')
    .replace(/custom-milled \d{3} GSM French terry cotton/gi, 'custom-milled premium French terry cotton')
    .replace(/\b\d{3}\s*GSM\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  const cleanedAnatomy = (p.anatomy || []).map((a) => ({
    ...a,
    title: a.title.replace(/\bGSM\b/gi, 'Cotton Weight').replace(/\b\d{3}\s*GSM\b/gi, ''),
    desc: a.desc.replace(/\b\d{3}\s*GSM\b/gi, '').replace(/\(\d{3}\s*GSM\)/gi, '').trim(),
  }));

  const cleanedReviews = (p.reviews || []).map((r) => ({
    ...r,
    title: r.title.replace(/\bGSM\b/gi, 'Fabric').replace(/Raw District/gi, 'SHARMAZONE'),
    comment: r.comment.replace(/\b\d{3}\s*GSM\b/gi, 'heavyweight').replace(/Raw District/gi, 'SHARMAZONE'),
  }));

  return {
    ...p,
    id: p.id.replace(/^rd-/, 'sz-'),
    sku: p.sku ? p.sku.replace(/^RD-/, 'SZ-') : `SZ-${p.id}`,
    name: cleanedName,
    fabric: cleanedFabric || '100% Combed Heavy Cotton',
    description: cleanedDesc,
    published: true, // Draft / Published support
    isDraft: false,
    deliveryArea: 'Delhi NCR (Delhi, Noida, Gurugram, Ghaziabad)',
    anatomy: cleanedAnatomy,
    reviews: cleanedReviews,
    updatedAt: new Date().toISOString(),
  };
}

export function getDbProducts() {
  if (!fs.existsSync(PRODUCTS_FILE)) {
    const cleaned = initialProducts.map(cleanGsmAndRebrandProduct);
    writeJson(PRODUCTS_FILE, cleaned);
    return cleaned;
  }
  return readJson(PRODUCTS_FILE, []);
}

export function saveDbProduct(productData) {
  const products = getDbProducts();
  const id = productData.id || `sz-${Date.now()}`;
  const slug =
    productData.slug ||
    productData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const index = products.findIndex((p) => p.id === id || p.slug === slug);
  const now = new Date().toISOString();

  const updatedItem = {
    ...productData,
    id,
    slug,
    updatedAt: now,
    published: productData.published !== undefined ? productData.published : true,
  };

  if (index >= 0) {
    products[index] = { ...products[index], ...updatedItem };
  } else {
    products.unshift({
      ...updatedItem,
      createdAt: now,
      rating: productData.rating || 5.0,
      reviewCount: productData.reviewCount || 0,
      reviews: productData.reviews || [],
      images: productData.images || ['https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80'],
    });
  }

  writeJson(PRODUCTS_FILE, products);
  return updatedItem;
}

export function deleteDbProduct(id) {
  let products = getDbProducts();
  const initialLength = products.length;
  products = products.filter((p) => p.id !== id && p.slug !== id);
  if (products.length < initialLength) {
    writeJson(PRODUCTS_FILE, products);
    return true;
  }
  return false;
}

// -------------------------------------------------------------
// 2. COUPONS PERSISTENCE & ENGINE
// -------------------------------------------------------------
const DEFAULT_COUPONS = [
  {
    code: 'FIRST10',
    discountPercent: 10,
    minOrderValue: 0,
    maxDiscount: 1000,
    active: true,
    description: '10% off your first SHARMAZONE order',
    usageLimit: 500,
    usedCount: 14,
    expiresAt: '2027-12-31T23:59:59Z',
  },
  {
    code: 'SHARMA10',
    discountPercent: 10,
    minOrderValue: 0,
    maxDiscount: 1000,
    active: true,
    description: '10% off storewide',
    usageLimit: 1000,
    usedCount: 28,
    expiresAt: '2027-12-31T23:59:59Z',
  },
  {
    code: 'DELHINCR',
    discountPercent: 15,
    minOrderValue: 1499,
    maxDiscount: 1500,
    active: true,
    description: '15% exclusive discount for Delhi NCR orders above ₹1,499',
    usageLimit: 300,
    usedCount: 42,
    expiresAt: '2027-12-31T23:59:59Z',
  },
  {
    code: 'WELCOME200',
    flatDiscount: 200,
    minOrderValue: 999,
    maxDiscount: 200,
    active: true,
    description: 'Flat ₹200 off on orders above ₹999',
    usageLimit: 200,
    usedCount: 19,
    expiresAt: '2027-12-31T23:59:59Z',
  },
];

export function getDbCoupons() {
  return readJson(COUPONS_FILE, DEFAULT_COUPONS);
}

export function validateCouponServer(code, subtotal = 0) {
  if (!code) {
    return { valid: false, message: 'Please enter a coupon code.' };
  }

  const cleanCode = String(code).trim().toUpperCase();
  const coupons = getDbCoupons();
  const coupon = coupons.find((c) => c.code.toUpperCase() === cleanCode);

  if (!coupon) {
    return { valid: false, message: 'Invalid promotional code.' };
  }

  if (!coupon.active) {
    return { valid: false, message: 'This coupon is no longer active.' };
  }

  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
    return { valid: false, message: 'This coupon has expired.' };
  }

  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
    return { valid: false, message: 'This coupon has reached its maximum usage limit.' };
  }

  if (coupon.minOrderValue && subtotal < coupon.minOrderValue) {
    return {
      valid: false,
      message: `Minimum cart value of ₹${coupon.minOrderValue} required for this coupon.`,
    };
  }

  let discountAmount = 0;
  if (coupon.discountPercent) {
    discountAmount = Math.round((subtotal * coupon.discountPercent) / 100);
    if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
      discountAmount = coupon.maxDiscount;
    }
  } else if (coupon.flatDiscount) {
    discountAmount = Math.min(subtotal, coupon.flatDiscount);
  }

  return {
    valid: true,
    coupon: {
      code: coupon.code,
      discountPercent: coupon.discountPercent || null,
      flatDiscount: coupon.flatDiscount || null,
      discountAmount,
      description: coupon.description,
    },
    message: `Coupon ${coupon.code} applied successfully!`,
  };
}

export function incrementCouponUsage(code) {
  const coupons = getDbCoupons();
  const coupon = coupons.find((c) => c.code.toUpperCase() === String(code).toUpperCase());
  if (coupon) {
    coupon.usedCount = (coupon.usedCount || 0) + 1;
    writeJson(COUPONS_FILE, coupons);
  }
}

// -------------------------------------------------------------
// 3. ORDERS PERSISTENCE & STATE MACHINE
// -------------------------------------------------------------
export const ORDER_STATUSES = [
  'Pending',
  'Confirmed',
  'Processing',
  'Shipped',
  'Out for Delivery',
  'Delivered',
  'Cancelled',
];

export function getDbOrders() {
  return readJson(ORDERS_FILE, []);
}

export function getOrderById(orderId) {
  const orders = getDbOrders();
  return orders.find((o) => o.id === orderId || o.trackingId === orderId) || null;
}

/**
 * Creates an order on the server with strict server-side validation:
 * 1. Verifies delivery pincode is within approved Delhi NCR service area.
 * 2. Recalculates product prices from database records (prevents client price tampering).
 * 3. Validates coupon and computes discount on the server.
 * 4. Checks inventory / stock availability.
 * 5. Supports idempotency keys to prevent duplicate order placement.
 */
export function createOrderServer({
  items,
  customer,
  shippingAddress,
  couponCode,
  paymentMethod = 'prepaid',
  paymentDetails = {},
  idempotencyKey = null,
  isGiftWrapped = false,
}) {
  if (!items || !items.length) {
    throw new Error('Order items cannot be empty.');
  }

  if (!shippingAddress || !shippingAddress.pincode) {
    throw new Error('Shipping address and 6-digit postal code are required.');
  }

  // 1. Strict Server-Side Delhi NCR Pincode Validation
  const pincodeCheck = validateDelhiNcrPincode(shippingAddress.pincode);
  if (!pincodeCheck.serviceable) {
    throw new Error(
      `Delivery unserviceable for pincode ${shippingAddress.pincode}. SHARMAZONE exclusively services Delhi, Noida, Gurugram, and Ghaziabad (Delhi NCR).`
    );
  }

  const existingOrders = getDbOrders();

  // 2. Idempotency Check: prevent duplicate orders
  if (idempotencyKey) {
    const existing = existingOrders.find((o) => o.idempotencyKey === idempotencyKey);
    if (existing) {
      return { order: existing, isDuplicate: true };
    }
  }

  // 3. Recalculate Prices & Validate Stock from DB
  const dbProducts = getDbProducts();
  let subtotal = 0;
  const verifiedItems = [];

  for (const item of items) {
    const dbProduct = dbProducts.find(
      (p) => p.id === item.id || p.id === item.productId || p.slug === item.slug || p.slug === item.id
    );
    if (!dbProduct) {
      throw new Error(`Product "${item.name || item.id || item.productId}" is no longer available.`);
    }

    if (!dbProduct.inStock || (dbProduct.stockCount !== undefined && dbProduct.stockCount <= 0)) {
      throw new Error(`Product "${dbProduct.name}" is currently out of stock.`);
    }

    const qty = Math.max(1, parseInt(item.quantity || 1, 10));
    const unitPrice = dbProduct.price; // ALWAYS use server DB price
    subtotal += unitPrice * qty;

    verifiedItems.push({
      productId: dbProduct.id,
      slug: dbProduct.slug,
      name: dbProduct.name,
      size: item.size || 'M',
      color: item.color || (dbProduct.colors?.[0]?.name ?? 'Standard'),
      quantity: qty,
      unitPrice,
      mrp: dbProduct.mrp || unitPrice,
      image: dbProduct.images?.[0] || '',
    });
  }

  // 4. Server-side Coupon Calculation
  let discountAmount = 0;
  let appliedCoupon = null;
  if (couponCode) {
    const couponRes = validateCouponServer(couponCode, subtotal);
    if (couponRes.valid) {
      discountAmount = couponRes.coupon.discountAmount;
      appliedCoupon = couponRes.coupon;
      incrementCouponUsage(couponCode);
    }
  }

  // Shipping & Gift Wrap
  const freeShippingThreshold = 999;
  const shippingFee = subtotal >= freeShippingThreshold ? 0 : 99;
  const giftWrapFee = isGiftWrapped ? 99 : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee + giftWrapFee);

  const orderId = `SZ-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const trackingId = `SZDLH${Math.floor(10000000 + Math.random() * 90000000)}`;
  const createdAt = new Date().toISOString();

  const newOrder = {
    id: orderId,
    trackingId,
    idempotencyKey,
    createdAt,
    status: paymentMethod === 'cod' ? 'Confirmed' : 'Pending', // Pending until payment sandbox or gateway confirms
    paymentStatus: paymentMethod === 'cod' ? 'Pending (COD)' : 'Pending',
    paymentMethod,
    paymentDetails,
    items: verifiedItems,
    customer: {
      name: customer?.name || 'Valued Customer',
      email: customer?.email || '',
      phone: customer?.phone || '',
    },
    shippingAddress: {
      ...shippingAddress,
      city: pincodeCheck.city,
      state: pincodeCheck.state,
      region: pincodeCheck.region,
    },
    pricing: {
      subtotal,
      discountAmount,
      appliedCoupon,
      shippingFee,
      giftWrapFee,
      finalTotal,
    },
    delivery: {
      carrier: pincodeCheck.carrier,
      estimate: pincodeCheck.deliveryEstimate,
      timeline: [
        {
          step: 'Order Placed',
          time: createdAt,
          completed: true,
          desc: 'Order details received and verified by SHARMAZONE server.',
        },
        {
          step: 'Processing at Delhi Hub',
          time: null,
          completed: false,
          desc: 'Garment inspection, bespoke steam press, and dispatch packaging.',
        },
        {
          step: 'Dispatched for Delivery',
          time: null,
          completed: false,
          desc: `${pincodeCheck.carrier} courier assigned for final delivery run.`,
        },
        {
          step: 'Delivered',
          time: null,
          completed: false,
          desc: 'Delivered to your doorstep in Delhi NCR.',
        },
      ],
    },
  };

  // Decrement Stock
  for (const item of verifiedItems) {
    const prod = dbProducts.find((p) => p.id === item.productId);
    if (prod && prod.stockCount !== undefined) {
      prod.stockCount = Math.max(0, prod.stockCount - item.quantity);
      if (prod.stockCount === 0) prod.inStock = false;
    }
  }
  writeJson(PRODUCTS_FILE, dbProducts);

  existingOrders.unshift(newOrder);
  writeJson(ORDERS_FILE, existingOrders);

  return { order: newOrder, isDuplicate: false };
}

export function updateOrderStatusServer(orderId, newStatus, trackingNotes = '') {
  const orders = getDbOrders();
  const order = orders.find((o) => o.id === orderId || o.trackingId === orderId);
  if (!order) {
    throw new Error(`Order ${orderId} not found.`);
  }

  if (!ORDER_STATUSES.includes(newStatus)) {
    throw new Error(`Invalid status transition to "${newStatus}".`);
  }

  order.status = newStatus;
  order.updatedAt = new Date().toISOString();

  // Update timeline
  const now = new Date().toISOString();
  if (newStatus === 'Processing' && order.delivery.timeline[1]) {
    order.delivery.timeline[1].completed = true;
    order.delivery.timeline[1].time = now;
  } else if ((newStatus === 'Shipped' || newStatus === 'Out for Delivery') && order.delivery.timeline[2]) {
    order.delivery.timeline[1].completed = true;
    order.delivery.timeline[2].completed = true;
    order.delivery.timeline[2].time = now;
  } else if (newStatus === 'Delivered') {
    order.delivery.timeline.forEach((step) => {
      step.completed = true;
      if (!step.time) step.time = now;
    });
    order.paymentStatus = 'Paid';
  } else if (newStatus === 'Cancelled') {
    order.paymentStatus = 'Cancelled / Refunded';
  }

  if (trackingNotes) {
    order.trackingNotes = trackingNotes;
  }

  writeJson(ORDERS_FILE, orders);
  return order;
}

export function markOrderPaymentServer(orderId, paymentOutcome, transactionId = null) {
  const orders = getDbOrders();
  const order = orders.find((o) => o.id === orderId);
  if (!order) {
    throw new Error(`Order ${orderId} not found.`);
  }

  if (paymentOutcome === 'SUCCESS') {
    order.paymentStatus = 'Paid';
    order.status = 'Confirmed';
    order.transactionId = transactionId || `TXN_${Date.now()}`;
    order.paidAt = new Date().toISOString();
  } else if (paymentOutcome === 'FAILED') {
    order.paymentStatus = 'Failed';
    order.status = 'Payment Failed';
  } else if (paymentOutcome === 'CANCELLED') {
    order.paymentStatus = 'Cancelled by User';
    order.status = 'Cancelled';
  }

  writeJson(ORDERS_FILE, orders);
  return order;
}

// -------------------------------------------------------------
// 4. STOREFRONT CMS & CAMPAIGN MANAGEMENT
// -------------------------------------------------------------
const DEFAULT_CMS = {
  hero: {
    headline: 'EVERYDAY. ELEVATED.',
    subheadline: 'COLLECTION 01 / NEW DELHI METROPOLIS',
    description:
      'Contemporary fashion essentials engineered for the Delhi NCR aesthetic. Premium silhouettes, refined tailoring, and modern everyday essentials.',
    buttonPrimaryText: 'SHOP THE COLLECTION',
    buttonPrimaryUrl: '/shop',
    buttonSecondaryText: 'DISCOVER FIT GUIDE',
    buttonSecondaryUrl: '/find-your-fit',
    backgroundImage:
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=2000&q=85',
    active: true,
  },
  announcementBar: {
    enabled: true,
    text: 'EXPRESS DELIVERY ACROSS DELHI NCR (DELHI, NOIDA, GURUGRAM & GHAZIABAD) • COMPLIMENTARY SHIPPING ON ORDERS ₹999+',
    link: '/shipping',
  },
  campaignBanner: {
    enabled: true,
    badge: 'DELHI NCR EXCLUSIVE',
    title: 'YOUR STYLE. YOUR CAPITAL.',
    subtitle: 'Limited edition curated drop available with same-day and next-day priority dispatch.',
    buttonText: 'SHOP EXCLUSIVE DROPS',
    buttonUrl: '/shop?filter=new',
    backgroundImage:
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1600&q=80',
  },
  sections: {
    hero: { visible: true, order: 1 },
    uspStrip: { visible: true, order: 2 },
    newArrivals: { visible: true, order: 3 },
    marqueeTicker: { visible: true, order: 4 },
    lookbook: { visible: true, order: 5 },
    categories: { visible: true, order: 6 },
    editorialManifesto: { visible: true, order: 7 },
    fitConfigurator: { visible: true, order: 8 },
    bestSellers: { visible: true, order: 9 },
    campaignPromo: { visible: true, order: 10 },
    reviews: { visible: true, order: 11 },
    delhiNcrServiceStrip: { visible: true, order: 12 },
  },
  seo: {
    defaultTitle: 'SHARMAZONE | Premium Fashion E-Commerce — Delhi NCR',
    defaultDescription:
      'SHARMAZONE is the premier fashion destination serving Delhi, Noida, Gurugram, and Ghaziabad. Curated modern silhouettes, rapid express delivery, and cash on delivery.',
    ogImage: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=80',
  },
  publishedAt: new Date().toISOString(),
  version: 1,
};

export function getDbCmsContent() {
  return readJson(CMS_FILE, DEFAULT_CMS);
}

export function saveDbCmsContent(newContent, createBackup = true) {
  const current = getDbCmsContent();

  if (createBackup) {
    const history = readJson(CMS_HISTORY_FILE, []);
    history.unshift({
      ...current,
      archivedAt: new Date().toISOString(),
    });
    // Keep max 10 backups for rollback
    writeJson(CMS_HISTORY_FILE, history.slice(0, 10));
  }

  const updated = {
    ...current,
    ...newContent,
    version: (current.version || 1) + 1,
    publishedAt: new Date().toISOString(),
  };

  writeJson(CMS_FILE, updated);
  return updated;
}

export function rollbackDbCmsContent() {
  const history = readJson(CMS_HISTORY_FILE, []);
  if (!history.length) {
    throw new Error('No previous CMS version found for rollback.');
  }

  const previous = history.shift();
  writeJson(CMS_HISTORY_FILE, history);
  writeJson(CMS_FILE, previous);
  return previous;
}

// -------------------------------------------------------------
// 5. ADMIN AUTH & ALLOWLIST SECURITY
// -------------------------------------------------------------
export const ADMIN_ALLOWED_EMAILS = [
  'admin@sharmazone.com',
  'vishal.20031203@gmail.com',
];

// Secure salt & hash for passwords
export function hashPassword(password) {
  return crypto.createHash('sha256').update(`sz_salt_${password}`).digest('hex');
}

export function verifyAdminCredentials(email, password) {
  if (!email || !password) return { success: false, message: 'Email and password required.' };

  const cleanEmail = String(email).trim().toLowerCase();
  const isAllowed = ADMIN_ALLOWED_EMAILS.includes(cleanEmail);

  if (!isAllowed) {
    return {
      success: false,
      message: 'Access restricted: Unauthorized administrator email address.',
    };
  }

  // Pre-configured secure admin check
  // Allows secure demo pass 'SharmaAdmin2026!' or custom env pass
  const validPassHash = hashPassword(process.env.ADMIN_PASSWORD || 'SharmaAdmin2026!');
  if (hashPassword(password) !== validPassHash) {
    return { success: false, message: 'Invalid administrator credentials.' };
  }

  const token = `sz_adm_${crypto.randomBytes(24).toString('hex')}`;
  const sessions = readJson(ADMIN_SESSIONS_FILE, {});
  sessions[token] = {
    email: cleanEmail,
    role: 'superadmin',
    createdAt: Date.now(),
    expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
  };
  writeJson(ADMIN_SESSIONS_FILE, sessions);

  return {
    success: true,
    token,
    user: { email: cleanEmail, role: 'superadmin' },
  };
}

export function validateAdminSession(token) {
  if (!token) return false;
  const sessions = readJson(ADMIN_SESSIONS_FILE, {});
  const session = sessions[token];
  if (!session) return false;

  if (Date.now() > session.expiresAt) {
    delete sessions[token];
    writeJson(ADMIN_SESSIONS_FILE, sessions);
    return false;
  }

  return session;
}

// -------------------------------------------------------------
// 6. CUSTOMER USER AUTHENTICATION & SESSIONS
// -------------------------------------------------------------
export function getDbUsers() {
  return readJson(USERS_FILE, []);
}

export function registerUser({ name, email, phone, password }) {
  if (!email || !password) {
    throw new Error('Email and password are required.');
  }

  const cleanEmail = String(email).trim().toLowerCase();
  const users = getDbUsers();

  if (users.some((u) => u.email === cleanEmail)) {
    throw new Error('An account with this email address already exists.');
  }

  const userId = `usr_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
  const passwordHash = hashPassword(password);
  const now = new Date().toISOString();

  const newUser = {
    id: userId,
    name: name || 'Valued Customer',
    email: cleanEmail,
    phone: phone || '',
    passwordHash,
    createdAt: now,
    membershipTier: 'SHARMAZONE Insider',
    addresses: [],
    emailVerified: true,
  };

  users.push(newUser);
  writeJson(USERS_FILE, users);

  const token = `sz_usr_${crypto.randomBytes(24).toString('hex')}`;
  const sessions = readJson(ADMIN_SESSIONS_FILE, {});
  sessions[token] = {
    userId,
    email: cleanEmail,
    name: newUser.name,
    role: 'customer',
    expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
  };
  writeJson(ADMIN_SESSIONS_FILE, sessions);

  return {
    token,
    user: {
      id: userId,
      name: newUser.name,
      email: cleanEmail,
      phone: newUser.phone,
      membershipTier: newUser.membershipTier,
    },
  };
}

export function loginUser({ email, password }) {
  if (!email || !password) {
    throw new Error('Email and password are required.');
  }

  const cleanEmail = String(email).trim().toLowerCase();
  const users = getDbUsers();
  const user = users.find((u) => u.email === cleanEmail);

  if (!user || user.passwordHash !== hashPassword(password)) {
    // Safe error message avoiding account enumeration
    throw new Error('Invalid email or password.');
  }

  const token = `sz_usr_${crypto.randomBytes(24).toString('hex')}`;
  const sessions = readJson(ADMIN_SESSIONS_FILE, {});
  sessions[token] = {
    userId: user.id,
    email: cleanEmail,
    name: user.name,
    role: 'customer',
    expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
  };
  writeJson(ADMIN_SESSIONS_FILE, sessions);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: cleanEmail,
      phone: user.phone,
      membershipTier: user.membershipTier,
      addresses: user.addresses || [],
    },
  };
}

export function requestPasswordReset(email) {
  if (!email) return { success: true }; // Always return success to prevent email discovery
  const cleanEmail = String(email).trim().toLowerCase();
  const users = getDbUsers();
  const user = users.find((u) => u.email === cleanEmail);

  if (user) {
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    user.resetExpires = Date.now() + 3600000; // 1 hour
    writeJson(USERS_FILE, users);
    return {
      success: true,
      resetToken, // for testing / dev sandbox display
      message: 'If the account exists, password reset instructions have been dispatched.',
    };
  }

  return {
    success: true,
    message: 'If the account exists, password reset instructions have been dispatched.',
  };
}

export function resetPassword(token, newPassword) {
  if (!token || !newPassword) {
    throw new Error('Token and new password are required.');
  }

  const users = getDbUsers();
  const user = users.find((u) => u.resetToken === token && u.resetExpires > Date.now());

  if (!user) {
    throw new Error('Invalid or expired password reset token.');
  }

  user.passwordHash = hashPassword(newPassword);
  delete user.resetToken;
  delete user.resetExpires;
  writeJson(USERS_FILE, users);

  return { success: true, message: 'Password has been successfully updated.' };
}

