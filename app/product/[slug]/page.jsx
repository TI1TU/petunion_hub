import ProductDetailClient from './ProductDetailClient';
import { getAllProducts, getProductBySlug } from '@/lib/products';

export function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export function generateMetadata({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return { title: 'Product Not Found | SHARMAZONE' };
  }

  return {
    title: `${product.name} | SHARMAZONE Delhi NCR`,
    description: `${product.description?.slice(0, 160)}... Available with priority express delivery across Delhi, Noida, Gurugram, and Ghaziabad.`,
    openGraph: {
      title: `${product.name} | SHARMAZONE`,
      description: product.description,
      images: [{ url: product.images?.[0] || '' }],
    },
  };
}

export default function ProductPage({ params }) {
  const product = getProductBySlug(params.slug);
  return <ProductDetailClient initialProduct={product} slug={params.slug} />;
}
