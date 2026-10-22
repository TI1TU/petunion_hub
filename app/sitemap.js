import { getAllProducts, CATEGORIES } from '@/lib/products';

export default function sitemap() {
  const baseUrl = 'https://petunionhub.com';
  const products = getAllProducts();

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(product.updatedAt || Date.now()),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const categoryUrls = CATEGORIES.map((cat) => ({
    url: `${baseUrl}/shop/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const staticUrls = [
    '',
    '/shop',
    '/cart',
    '/wishlist',
    '/about',
    '/atelier',
    '/contact',
    '/shipping',
    '/returns',
    '/size-guide',
    '/find-your-fit',
    '/faq',
    '/track-order',
    '/login',
    '/signup',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.6,
  }));

  return [...staticUrls, ...categoryUrls, ...productUrls];
}
