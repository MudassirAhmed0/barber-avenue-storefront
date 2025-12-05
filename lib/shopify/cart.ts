import { shopifyFetch, reshapeCart } from '../shopify';
import { getCartQuery } from '../../graphql/queries/cart';
import { addToCartMutation, createCartMutation, editCartItemsMutation, removeFromCartMutation } from '../../graphql/mutations/cart';
import { Cart } from './types';

export async function createCart(): Promise<Cart> {
  const res = await shopifyFetch<any>({
    query: createCartMutation,
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartCreate.cart) as unknown as Cart;
}

export async function getCart(cartId: string): Promise<Cart | undefined> {
  const res = await shopifyFetch<any>({
    query: getCartQuery,
    variables: { cartId },
    tags: ['cart'],
    cache: 'no-store'
  });

  if (!res.body.data.cart) {
    return undefined;
  }

  return reshapeCart(res.body.data.cart) as unknown as Cart;
}

export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]): Promise<Cart> {
  const res = await shopifyFetch<any>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartLinesAdd.cart) as unknown as Cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const res = await shopifyFetch<any>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartLinesRemove.cart) as unknown as Cart;
}

export async function updateCart(cartId: string, lines: { id: string; merchandiseId: string; quantity: number }[]): Promise<Cart> {
  const res = await shopifyFetch<any>({
    query: editCartItemsMutation,
    variables: {
      cartId,
      lines
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartLinesUpdate.cart) as unknown as Cart;
}
