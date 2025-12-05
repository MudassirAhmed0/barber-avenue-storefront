'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/lib/shopify/types';

export function ProductGallery({ images }: { images: Product['images']['edges'] }) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images.length) return null;

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 h-full">
      <div className="flex flex-row md:flex-col gap-4 overflow-auto md:w-24 px-1">
        {images.map((image, index) => (
          <button
            key={image.node.url}
            onClick={() => setSelectedImage(index)}
            className={`relative w-20 h-20 flex-shrink-0 border-2 rounded-md overflow-hidden ${
              selectedImage === index ? 'border-blue-600' : 'border-transparent'
            }`}
          >
            <Image
              src={image.node.url}
              alt={image.node.altText || 'Product Image'}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
      <div className="relative flex-1 aspect-square bg-gray-100 rounded-lg overflow-hidden">
        {images[selectedImage] && (
          <Image
            src={images[selectedImage].node.url}
            alt={images[selectedImage].node.altText || 'Product Image'}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>
    </div>
  );
}
