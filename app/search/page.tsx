import { getProducts } from '@/lib/shopify/products';
import { ProductGrid } from '@/components/product/ProductGrid';

export const metadata = {
  title: 'Search',
  description: 'Search for products.'
};

export default async function SearchPage(props: { searchParams: Promise<{ q?: string }> }) {
  const searchParams = await props.searchParams;
  const { q: searchValue } = searchParams || {};

  const products = await getProducts({
    query: searchValue
  });

  return (
    <div className="mx-auto max-w-screen-2xl px-4 pb-4 pt-32 lg:pt-40">
      {searchValue ? (
        <h1 className="text-3xl font-bold mb-8 mt-4">
          Search results for &quot;{searchValue}&quot;
        </h1>
      ) : (
        <h1 className="text-3xl font-bold mb-8 mt-4">Search</h1>
      )}
      
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p className="text-center py-20 text-gray-500">
            {searchValue ? `No results found for "${searchValue}".` : "Search for a product."}
        </p>
      )}
    </div>
  );
}
