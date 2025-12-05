import { getProduct, getProductRecommendations } from '@/lib/shopify/products';
import { ProductGallery } from '@/components/product/ProductGallery';
import { VariantSelector } from '@/components/product/VariantSelector';
import { AddToCartButton } from '@/components/cart/AddToCartButton';
import { ProductGrid } from '@/components/product/ProductGrid';
import { notFound } from 'next/navigation';
import { formatPrice } from '@/lib/utils';
import { Suspense } from 'react';

export async function generateMetadata(props: { params: Promise<{ handle: string }> }) {
  const params = await props.params;
  const product = await getProduct(params.handle);
  if (!product) return notFound();
  return {
    title: product.seo?.title || product.title,
    description: product.seo?.description || product.description
  };
}

export default async function ProductPage(props: { params: Promise<{ handle: string }>; searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const relatedProducts = await getProductRecommendations(product.id);

  // Determine selected variant
  // This logic should match Shopify's selectedOptions
  // Simple version: find variant that matches all searchParams
  // or default to first variant
  
  const selectedVariant = product.variants.edges.find((variant) =>
    variant.node.selectedOptions.every(
      (option) => searchParams[option.name] === option.value
    )
  )?.node || product.variants.edges[0]?.node;

  return (
    <div className="mx-auto max-w-screen-2xl px-4 pt-32 lg:pt-40">
      <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 mt-8">
        <div className="h-full w-full basis-full lg:basis-4/6">
          <ProductGallery images={product.images.edges} />
        </div>

        <div className="basis-full lg:basis-2/6">
          <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
          <div className="mr-auto w-auto rounded-full bg-[var(--color-green)] p-2 text-sm text-white mb-6 inline-block">
             <p className="font-semibold">
               {formatPrice(
                 selectedVariant?.price.amount || product.priceRange.minVariantPrice.amount,
                 selectedVariant?.price.currencyCode || product.priceRange.minVariantPrice.currencyCode
               )}
             </p>
          </div>

          <VariantSelector options={product.options} variants={product.variants.edges} />

          <div
             className="prose prose-sm mb-6 text-gray-500 overflow-y-auto max-h-[300px]"
             dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
           />

           <AddToCartButton 
              variantId={selectedVariant?.id} 
              availableForSale={selectedVariant?.availableForSale || false}
              selectedOptions={selectedVariant?.selectedOptions.reduce((acc, curr) => ({ ...acc, [curr.name]: curr.value }), {})} 
           />
        </div>
      </div>

      {relatedProducts.length > 0 && (
         <div className="py-12">
            <h2 className="text-2xl font-bold mb-4">Related Products</h2>
            <ProductGrid products={relatedProducts} />
         </div>
      )}
    </div>
  );
}
