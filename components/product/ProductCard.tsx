import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/shopify/types';
import { formatPrice } from '@/lib/utils';
import { AddToCartButton } from '@/components/cart/AddToCartButton';

export function ProductCard({ product }: { product: Product }) {
  const { handle, title, featuredImage, priceRange, variants } = product;
  const firstVariant = variants?.edges?.[0]?.node;
  const price = priceRange?.minVariantPrice?.amount;
  const currencyCode = priceRange?.minVariantPrice?.currencyCode;
  
  // Simple check for availability
  const availableForSale = product.availableForSale;

  return (
    <div className="group relative border rounded-lg overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow bg-white">
      <Link href={`/product/${handle}`} className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
        {featuredImage ? (
          <Image
            src={featuredImage.url}
            alt={featuredImage.altText || title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
             No Image
          </div>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          <Link href={`/product/${handle}`}>
            {title}
          </Link>
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
            {product.description?.substring(0, 60)}...
        </p>
        <div className="mt-auto flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">
                {price && currencyCode ? formatPrice(price, currencyCode) : 'N/A'}
            </span>
            {/* If there are multiple variants, button might redirect to product page or open modal. 
                For simple storefront, if 1 variant, add directly. If multiple, maybe link.
                We'll put a simple Add button that adds the default/first variant if available.
             */}
            <div className="w-32">
                {product.variants?.edges?.length === 1 ? (
                    <AddToCartButton 
                        variantId={firstVariant?.id} 
                        availableForSale={availableForSale} 
                    />
                ) : (
                    <Link href={`/product/${handle}`} className="inline-flex h-10 w-full items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2">
                        View Options
                    </Link>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
