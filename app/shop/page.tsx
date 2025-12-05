import { getProducts } from '@/lib/shopify/products';
import { ProductGrid } from '@/components/product/ProductGrid';
import { defaultSort, sorting } from '@/lib/constants';

export const metadata = {
  title: 'Shop All',
  description: 'Browse all products.'
};

export default async function ShopPage(props: { searchParams: Promise<{ sort?: string; q?: string }> }) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue } = searchParams || {};
  
  // Basic sort handling or search
  const products = await getProducts({
    query: searchValue,
    sortKey: sort ? sort.toUpperCase() : 'CREATED_AT',
    reverse: sort === 'price-desc' || sort === 'latest-desc' // Naive logic, should map from constants
  });

  return (
    <div className="mx-auto max-w-screen-2xl px-4 pb-4 pt-32 lg:pt-40">
       <h1 className="text-3xl font-bold mb-8 mt-4">Shop</h1>
       <ProductGrid products={products} />
    </div>
  );
}
