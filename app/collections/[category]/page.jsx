import ShopClientCategory from '@/app/shop/[category]/ShopClientCategory';
import { CATEGORIES } from '@/lib/products';

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    category: cat.slug,
  }));
}

export function generateMetadata({ params }) {
  const cat = CATEGORIES.find((c) => c.slug === params.category);
  const name = cat ? cat.name : 'Collection';
  return {
    title: `${name} Collection | SHARMAZONE Delhi NCR`,
    description: `Discover the curated ${name} collection by SHARMAZONE. Express dispatch across Delhi, Noida, Gurugram, and Ghaziabad.`,
  };
}

export default function CollectionCategoryPage({ params }) {
  return <ShopClientCategory categorySlug={params.category} />;
}
