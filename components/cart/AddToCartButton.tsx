'use client';

import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { useState, useTransition } from 'react';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

export function AddToCartButton({
  variantId,
  availableForSale,
  selectedOptions
}: {
  variantId: string | undefined;
  availableForSale: boolean;
  selectedOptions?: Record<string, string>;
}) {
  const { addItem, setCartOpen } = useCart();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = () => {
    if (!variantId) return;
    startTransition(async () => {
       await addItem(variantId);
       setCartOpen(true);
    });
  };

  if (!availableForSale) {
    return (
      <Button disabled className="w-full rounded-full cursor-not-allowed bg-neutral-200 text-neutral-500 py-6">
        Out Of Stock
      </Button>
    );
  }

  if (!variantId) {
     return (
        <Button disabled className="w-full rounded-full cursor-not-allowed bg-neutral-200 text-neutral-500 py-6">
            Select Options
        </Button>
     );
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isPending}
      className={clsx("w-full rounded-full py-6 text-base font-medium", {
        'bg-[var(--color-green)] hover:bg-[var(--color-darkgreen)] text-white': !isPending,
        'bg-[var(--color-green)]/80 cursor-wait': isPending
      })}
    >
      {isPending ? <Loader2 className="animate-spin mr-2" /> : null}
      Add To Cart
    </Button>
  );
}
