import ShopClientCategory from './ShopClientCategory';
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
    title: `${name} | SHARMAZONE Delhi NCR`,
    description: `Shop the latest ${name} from SHARMAZONE. Premium contemporary fashion, fast delivery across Delhi, Noida, Gurugram, and Ghaziabad.`,
  };
}

export default function CategoryPage({ params }) {
  return <ShopClientCategory categorySlug={params.category} />;
}
