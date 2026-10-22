const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'products.json');
let products = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const fashionImages = [
  'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1000&q=80'
];

products = products.map((p, idx) => {
  // Ensure 5-6 images
  const imgs = [...(p.images || [])];
  while (imgs.length < 5) {
    imgs.push(fashionImages[(idx + imgs.length) % fashionImages.length]);
  }

  // Tags
  let tags = [];
  if (p.isNew) tags.push('NEW');
  if (p.isBestSeller) tags.push('BEST SELLER');
  if (idx % 4 === 1) tags.push('BACK IN STOCK');
  if (tags.length === 0) tags.push('CORE ESSENTIAL');

  // Realistic sold-out sizes for testing "Notify Me"
  const soldOutSizes = idx % 3 === 0 ? ['XXL'] : idx % 5 === 0 ? ['S', 'XXL'] : [];

  // Anatomy hotspots
  const anatomy = [
    {
      id: 1,
      title: 'Milled Fabric GSM',
      desc: p.fabric || '260 GSM French Terry Cotton [CLAIM TO VERIFY: Knitted in Ludhiana, Punjab]',
      x: 52,
      y: 40,
    },
    {
      id: 2,
      title: 'Anti-Sag Collar Rib',
      desc: '1.25" high-density 1x1 rib with lycra core to prevent neck sagging across 50+ wash cycles.',
      x: 50,
      y: 18,
    },
    {
      id: 3,
      title: 'Architectural Drop Shoulder',
      desc: '2.5" dropped shoulder seam engineered with forward-pitch drape for signature boxy profile.',
      x: 28,
      y: 28,
    },
    {
      id: 4,
      title: 'Reinforced Twin-Needle Seams',
      desc: 'High-tensile Japanese thread topstitching across high-stress tension points.',
      x: 74,
      y: 38,
    },
    {
      id: 5,
      title: 'Artisanal Mineral Enzyme Wash',
      desc: 'Enzyme bio-washed for velvety hand-feel. Pre-shrunk to less than 1.5% residual shrinkage.',
      x: 48,
      y: 65,
    },
    {
      id: 6,
      title: 'Clean Structural Hem',
      desc: 'Blind stitched lower hem designed to sit flush over baggy skate denim or cargo stacks.',
      x: 50,
      y: 88,
    },
  ];

  return {
    ...p,
    images: imgs.slice(0, 5),
    tags,
    soldOutSizes,
    origin: 'Crafted & Milled in India',
    anatomy,
    fitFeedbackBreakdown: {
      runsSmall: 4,
      trueToSize: 92,
      runsLarge: 4,
    },
    ratingBreakdown: {
      5: 84,
      4: 12,
      3: 3,
      2: 1,
      1: 0,
    },
  };
});

// Add 2 more products if count is 18
if (products.length === 18) {
  products.push({
    id: 'rd-19-distressed-graphic-tee',
    name: 'Distressed Underground Graphic Oversized Tee',
    slug: 'distressed-underground-graphic-oversized-tee',
    sku: 'RD-TEE-019',
    category: 'Oversized T-shirts',
    categorySlug: 'oversized-t-shirts',
    fit: 'Oversized',
    gender: 'Unisex',
    price: 899,
    mrp: 1799,
    discountPercent: 50,
    rating: 4.8,
    reviewCount: 96,
    badge: 'NEW DROP',
    isNew: true,
    isBestSeller: false,
    isWinter: false,
    inStock: true,
    stockCount: 14,
    featured: true,
    tags: ['NEW', 'LIMITED DROP'],
    soldOutSizes: ['XXL'],
    origin: 'Crafted & Milled in India',
    images: [
      fashionImages[0],
      fashionImages[1],
      fashionImages[2],
      fashionImages[3],
      fashionImages[4],
    ],
    colors: [
      { name: 'Faded Black', hex: '#1C1C1C' },
      { name: 'Concrete Grey', hex: '#63666A' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fabric: '100% Combed Heavy Cotton (260 GSM French Terry)',
    care: 'Machine wash cold inside out. Hang dry in shade. Do not iron directly on print.',
    modelInfo: 'Model is 6\'0" wearing size L (Chest 38", Waist 30")',
    description: 'Featuring hand-screened water-based typographic graphics inspired by brutalist New Delhi metro infrastructure. Heavyweight 260 GSM French terry cotton with dropped shoulders.',
    pincodeDeliveryDays: 3,
    codAvailable: true,
    fitFeedbackBreakdown: { runsSmall: 5, trueToSize: 90, runsLarge: 5 },
    ratingBreakdown: { 5: 80, 4: 15, 3: 5, 2: 0, 1: 0 },
    anatomy: products[0].anatomy,
    reviews: [
      {
        id: 'rev-19-1',
        author: 'Devendra Rao',
        city: 'Bengaluru',
        rating: 5,
        date: '2 days ago',
        fitFeedback: 'True to size',
        title: 'Screen print quality is top tier',
        comment: 'Soft hand feel, not that cheap plastisol rubber feel. The fabric breathes well even in 30°C weather.',
      },
    ],
  });

  products.push({
    id: 'rd-20-minimalist-heavyweight-zip-hoodie',
    name: 'Sub-Zero 400 GSM Heavyweight Zip Hoodie',
    slug: 'sub-zero-400-gsm-heavyweight-zip-hoodie',
    sku: 'RD-HOD-020',
    category: 'Hoodies',
    categorySlug: 'hoodies',
    fit: 'Oversized',
    gender: 'Unisex',
    price: 2199,
    mrp: 3999,
    discountPercent: 45,
    rating: 4.9,
    reviewCount: 142,
    badge: 'WINTER / 26',
    isNew: true,
    isBestSeller: true,
    isWinter: true,
    inStock: true,
    stockCount: 7,
    featured: true,
    tags: ['NEW', 'BEST SELLER'],
    soldOutSizes: [],
    origin: 'Crafted & Milled in India',
    images: [
      fashionImages[1],
      fashionImages[2],
      fashionImages[3],
      fashionImages[4],
      fashionImages[5],
    ],
    colors: [
      { name: 'Onyx Black', hex: '#0A0A0A' },
      { name: 'Heather Charcoal', hex: '#2F3542' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fabric: '100% Ultra-Heavyweight Brushed Fleece (400 GSM) [CLAIM TO VERIFY]',
    care: 'Machine wash cold inside out, gentle cycle. Lay flat to dry.',
    modelInfo: 'Model is 6\'1" wearing size XL (Chest 40", Waist 31")',
    description: 'Engineered for freezing North Indian winter temperatures. Custom 400 GSM double-brushed cotton fleece with two-way gunmetal YKK zipper, double-layered rigid hood, and deep hidden kangaroo pockets.',
    pincodeDeliveryDays: 3,
    codAvailable: true,
    fitFeedbackBreakdown: { runsSmall: 2, trueToSize: 95, runsLarge: 3 },
    ratingBreakdown: { 5: 89, 4: 9, 3: 2, 2: 0, 1: 0 },
    anatomy: products[0].anatomy,
    reviews: [
      {
        id: 'rev-20-1',
        author: 'Manpreet Singh',
        city: 'Amritsar',
        rating: 5,
        date: '5 days ago',
        fitFeedback: 'True to size',
        title: 'Actual heavyweight winter shield',
        comment: 'Wore this in 6°C Punjab morning with just a tee underneath. Zero wind chills. The two-way zip is super clean.',
      },
    ],
  });
}

fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf8');
console.log('Successfully enriched products. Count:', products.length);
