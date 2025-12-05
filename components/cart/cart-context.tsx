'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { createCart, addToCart, removeFromCart, updateCart, getCart } from '@/lib/shopify/cart';
import { Cart } from '@/lib/shopify/types';

type CartContextType = {
  cart: Cart | undefined;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, variantId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | undefined>(undefined);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const initializeCart = async () => {
      const existingCartId = localStorage.getItem('cartId');
      if (existingCartId) {
        const existingCart = await getCart(existingCartId);
        if (existingCart) {
          setCart(existingCart);
          return;
        }
      }

      // Create new cart if none exists or invalid
      const newCart = await createCart();
      localStorage.setItem('cartId', newCart.id);
      setCart(newCart);
    };

    initializeCart();
  }, []);

  const addItem = async (variantId: string, quantity: number = 1) => {
    let currentCartId = cart?.id;

    // If no cart in state, check local storage or create new one
    if (!currentCartId) {
       currentCartId = localStorage.getItem('cartId') || undefined;
       if (!currentCartId) {
          const newCart = await createCart();
          currentCartId = newCart.id;
          localStorage.setItem('cartId', currentCartId);
          setCart(newCart);
       }
    }

    if (!currentCartId) return;

    const newCart = await addToCart(currentCartId, [{ merchandiseId: variantId, quantity }]);
    setCart(newCart);
    setCartOpen(true);
  };

  const updateItem = async (lineId: string, variantId: string, quantity: number) => {
    if (!cart?.id) return;
    const newCart = await updateCart(cart.id, [{ id: lineId, merchandiseId: variantId, quantity }]);
    setCart(newCart);
  };

  const removeItem = async (lineId: string) => {
    if (!cart?.id) return;
    const newCart = await removeFromCart(cart.id, [lineId]);
    setCart(newCart);
  };

  const value = useMemo(() => ({
    cart,
    cartOpen,
    setCartOpen,
    addItem,
    updateItem,
    removeItem
  }), [cart, cartOpen]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
}
