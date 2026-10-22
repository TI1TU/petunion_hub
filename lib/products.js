import initialProducts from '@/data/products.json';

function cleanProduct(p) {
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
    published: p.published !== false,
    isDraft: false,
    deliveryArea: 'Delhi NCR (Delhi, Noida, Gurugram, Ghaziabad)',
    anatomy: cleanedAnatomy,
    reviews: cleanedReviews,
  };
}

const cleanedProductsList = initialProducts.map(cleanProduct);

export function getAllProducts() {
  return cleanedProductsList.filter((p) => p.published !== false);
}

export function getAllProductsAdmin() {
  return cleanedProductsList;
}

export function getProductBySlug(slug) {
  if (!slug) return null;
  return (
    cleanedProductsList.find((p) => p.slug === slug || p.id === slug || p.id === `sz-${slug}`) || null
  );
}

export function getProductsByCategory(categorySlug) {
  const products = getAllProducts();
  if (!categorySlug || categorySlug === 'all') return products;
  return products.filter(
    (p) =>
      p.categorySlug?.toLowerCase() === categorySlug.toLowerCase() ||
      p.category?.toLowerCase().replace(/\s+/g, '-') === categorySlug.toLowerCase()
  );
}

export function getProductsByFit(fit) {
  const products = getAllProducts();
  if (!fit || fit === 'all') return products;
  return products.filter((p) => p.fit?.toLowerCase() === fit.toLowerCase());
}

export function getFeaturedProducts() {
  return getAllProducts().filter((p) => p.featured);
}

export function getBestSellers() {
  return getAllProducts().filter((p) => p.isBestSeller);
}

export function getNewArrivals() {
  return getAllProducts().filter((p) => p.isNew);
}

export function getWinterProducts() {
  return getAllProducts().filter(
    (p) =>
      p.isWinter ||
      p.categorySlug?.includes('winter') ||
      p.categorySlug?.includes('hoodie') ||
      p.categorySlug?.includes('jacket')
  );
}

export function searchProducts(query) {
  if (!query || !query.trim()) return [];
  const q = query.toLowerCase().trim();
  const tokens = q.split(/\s+/).filter(Boolean);
  const products = getAllProducts();

  return products.filter((p) => {
    const haystack = [
      p.name,
      p.category,
      p.fit,
      p.description,
      p.fabric,
      ...(p.colors?.map((c) => c.name) || []),
    ]
      .join(' ')
      .toLowerCase();

    return tokens.every((token) => haystack.includes(token));
  });
}

export const CATEGORIES = [
  { name: 'All Products', slug: 'all' },
  { name: 'Oversized T-Shirts', slug: 'oversized-t-shirts' },
  { name: 'Classic T-Shirts', slug: 't-shirts' },
  { name: 'Cargo Pants', slug: 'cargo-pants' },
  { name: 'Jeans & Denim', slug: 'jeans' },
  { name: 'Hoodies', slug: 'hoodies' },
  { name: 'Sweatshirts', slug: 'sweatshirts' },
  { name: 'Jackets & Outerwear', slug: 'jackets' },
  { name: 'Winterwear', slug: 'winter-wear' },
];

export const FITS = ['Oversized', 'Relaxed', 'Baggy', 'Regular'];
export const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
export const COLOR_FILTERS = [
  { name: 'Black', hex: '#0A0A0A' },
  { name: 'Charcoal', hex: '#2B2B2B' },
  { name: 'Bone White', hex: '#EFECE6' },
  { name: 'Grey', hex: '#71717A' },
  { name: 'Olive Green', hex: '#3B4734' },
  { name: 'Earth Brown', hex: '#4A3728' },
  { name: 'Indigo Denim', hex: '#2C3E50' },
];

export const POPULAR_SEARCHES = [
  'Oversized T-shirts',
  'Cargo Pants',
  'Heavyweight Hoodies',
  'Parachute Pants',
  'Acid Wash',
  'Winter Jackets',
  'Baggy Jeans',
];
