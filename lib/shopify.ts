import { SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS } from './constants';
import { ensureStartsWith } from './utils';
import { Cart } from '../types/shopify-graphql';

// Access environment variables directly
// Access environment variables directly
const domain = process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN || process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '', 'https://')
  : '';
const endpoint = process.env.NEXT_PUBLIC_SHOPIFY_STORE_API_URL 
  ? process.env.NEXT_PUBLIC_SHOPIFY_STORE_API_URL 
  : `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

export async function shopifyFetch<T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }

    throw {
      error: e,
      query
    };
  }
}

export function removeEdgesAndNodes<T>(array: Connection<T>): T[] {
  return array.edges.map((edge) => edge?.node);
}

export function reshapeCart(cart: any): Cart {
  if (!cart || !cart.cost?.totalAmount) {
    return cart;
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines)
  };
}

// Temporary Types placeholders if codegen not ready
// Real types should come from codegen files
type Connection<T> = {
  edges: Array<{ node: T }>;
};

