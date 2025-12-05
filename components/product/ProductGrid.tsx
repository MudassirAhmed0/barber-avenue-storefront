import { Product } from '@/lib/shopify/types';
import { ProductCard } from '../product/ProductCard';

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products || products.length === 0) {
     return <p className="text-center text-gray-500 py-10">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
