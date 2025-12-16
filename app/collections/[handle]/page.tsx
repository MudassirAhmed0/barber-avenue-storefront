import { getCollection } from "@/lib/shopify/collections";
import { getProducts } from "@/lib/shopify/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  let collection;
  try {
    collection = await getCollection(params.handle);
  } catch (e) {
    return {
      title: "Collection not found",
      description: "Collection not found",
    };
  }

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description ||
      collection.description ||
      `${collection.title} products`,
  };
}

export default async function CollectionPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  let collection;

  try {
    collection = await getCollection(params.handle);
  } catch (error) {
    console.error("Error fetching collection:", error);
    // In dev, show error on screen
    return (
      <div className="mx-auto max-w-screen-2xl px-4 pb-4 pt-32 lg:pt-40 text-center text-red-500">
        Error fetching collection:{" "}
        {error instanceof Error ? error.message : JSON.stringify(error)}
      </div>
    );
  }

  if (!collection) return notFound();

  return (
    <div className="mx-auto max-w-screen-2xl px-4 pb-4 pt-32 lg:pt-40">
      <div className="flex flex-col gap-4 mb-8 mt-4">
        <h1 className="text-3xl font-bold">{collection.title}</h1>
        {collection.description && (
          <p className="text-gray-600 max-w-3xl">{collection.description}</p>
        )}
      </div>

      {collection.products && collection.products.edges.length > 0 ? (
        <ProductGrid
          products={collection.products.edges.map((p: any) => p.node)}
        />
      ) : (
        <p className="text-center py-20 text-gray-500">
          No products found in this collection.
        </p>
      )}
    </div>
  );
}
