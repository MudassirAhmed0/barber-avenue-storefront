import { useCartContext } from '@/components/cart/cart-context';

export function useCart() {
  return useCartContext();
}
