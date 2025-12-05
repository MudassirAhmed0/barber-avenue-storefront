'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Product } from '@/lib/shopify/types';
import { clsx } from 'clsx';

export function VariantSelector({ options, variants }: { options: Product['options']; variants: Product['variants']['edges'] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const hasNoOptionsOrJustOneOption =
    !options.length || (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  // Helper to check if a combination exists
  const isCombinationAvailable = (optionName: string, value: string) => {
      // Logic could be complex here to filter based on OTHER selected options.
      // For simplicity, we just check if ANY variant has this option value.
      return variants.some((edge) => 
          edge.node.selectedOptions.some(opt => opt.name === optionName && opt.value === value) && edge.node.availableForSale
      );
  };

  return (
     <dl className="mb-8">
        {options.map((option) => (
          <div key={option.id} className="mb-4">
            <dt className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
              {option.name}
            </dt>
            <dd className="flex flex-wrap gap-3">
              {option.values.map((value) => {
                const isActive = searchParams.get(option.name) === value; // Naive check
                // In real app, we need to construct URL for this option + confirm it is valid combo
                
                const isAvailable = isCombinationAvailable(option.name, value);

                // Create a new URLSearchParams object
                const optionSearchParams = new URLSearchParams(searchParams.toString());
                optionSearchParams.set(option.name, value);
                const optionUrl = `${pathname}?${optionSearchParams.toString()}`;

                return (
                  <button
                    key={value}
                    onClick={() => {
                        router.replace(optionUrl, { scroll: false });
                    }}
                    disabled={!isAvailable}
                    className={clsx(
                      "flex items-center justify-center rounded-full border px-4 py-2 text-sm min-w-[3rem]",
                      {
                        "cursor-default ring-2 ring-blue-600": isActive,
                        "ring-1 ring-transparent hover:ring-gray-300": !isActive && isAvailable,
                        "relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform":
                          !isAvailable
                      }
                    )}
                  >
                    {value}
                  </button>
                );
              })}
            </dd>
          </div>
        ))}
      </dl>
  );
}
