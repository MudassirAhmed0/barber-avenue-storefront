import { shopifyFetch, removeEdgesAndNodes } from '../shopify';
import { getProductsQuery, getProductQuery, getProductRecommendationsQuery } from '../../graphql/queries/products';
import { Product } from '../../types/shopify-graphql';

export async function getProducts({
  query,
  reverse,
  sortKey
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const res = await shopifyFetch<any>({
    query: getProductsQuery,
    variables: {
      query,
      reverse,
      sortKey
    },
    cache: 'no-store'
  });

  return removeEdgesAndNodes(res.body.data.products);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const res = await shopifyFetch<any>({
    query: getProductQuery,
    tags: ['products'],
    variables: {
      handle
    }
  });

  return res.body.data.product;
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
  const res = await shopifyFetch<any>({
    query: getProductRecommendationsQuery,
    tags: ['products'],
    variables: {
      productId
    }
  });

  return res.body.data.productRecommendations;
}
