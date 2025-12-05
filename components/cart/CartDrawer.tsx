'use client';

import { useCart } from '@/hooks/useCart';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'; // Verified import path from components.json
import { ShoppingBag, Minus, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateItem, removeItem } = useCart();
  const quantity = cart?.totalQuantity || 0;

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetTrigger asChild>
        <button 
           className="relative rounded-full cursor-pointer lg:p-vw12 p-4 lg:bg-black lg:text-white bg-white text-black flex items-center justify-center transition-transform hover:scale-105" 
           aria-label="Open cart"
        >
          <ShoppingBag className="lg:size-vw20 size-5" />
          {quantity > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[var(--color-green)] text-[10px] font-bold text-white flex items-center justify-center border-2 border-white">
              {quantity}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-6 h-full">
        <SheetHeader className="mb-4">
          <SheetTitle>My Cart ({quantity})</SheetTitle>
        </SheetHeader>

        {!cart || cart.lines.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full space-y-4">
            <ShoppingBag className="h-16 w-16 text-gray-300" />
            <p className="text-xl font-semibold text-gray-900">Your cart is empty.</p>
            <Button onClick={() => setCartOpen(false)}>Continue Shopping</Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-6">
              {cart.lines.map((line: any) => (
                <div key={line.id} className="flex gap-4">
                  <div className="relative aspect-square h-20 w-20 min-w-[5rem] overflow-hidden rounded border bg-neutral-100">
                    {line.merchandise.image && (
                      <Image
                        src={line.merchandise.image.url}
                        alt={line.merchandise.image.altText || line.merchandise.product.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="grid gap-1">
                      <h3 className="font-medium leading-none">
                        <Link onClick={() => setCartOpen(false)} href={`/product/${line.merchandise.product.handle}`}>
                           {line.merchandise.product.title}
                        </Link>
                      </h3>
                      {line.merchandise.title !== 'Default Title' && (
                        <p className="text-sm text-muted-foreground">{line.merchandise.title}</p>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border rounded-md">
                         <div className="flex items-center">
                            <button
                              onClick={() => {
                                if (line.quantity === 1) return removeItem(line.id);
                                updateItem(line.id, line.merchandise.id, line.quantity - 1);
                              }}
                              className="h-8 w-8 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                              disabled={false}
                            >
                                <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-8 text-center text-sm">{line.quantity}</span>
                            <button
                                onClick={() => updateItem(line.id, line.merchandise.id, line.quantity + 1)}
                                className="h-8 w-8 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                            >
                                <Plus className="h-3 w-3" />
                            </button>
                         </div>
                      </div>
                      <div className="flex flex-col items-end">
                         <p className="font-medium">
                            {formatPrice(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode)}
                         </p>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeItem(line.id)} className="text-neutral-500 hover:text-red-500 self-start">
                     <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-4">
              <div className="flex items-center justify-between font-medium text-lg">
                <span>Total</span>
                <span>{formatPrice(cart.cost.totalAmount.amount, cart.cost.totalAmount.currencyCode)}</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                  Taxes and shipping calculated at checkout.
              </p>
              <Button asChild className="w-full h-12 text-base bg-[var(--color-green)] hover:bg-[var(--color-darkgreen)] text-white">
                <a href={cart.checkoutUrl}>Checkout</a>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
