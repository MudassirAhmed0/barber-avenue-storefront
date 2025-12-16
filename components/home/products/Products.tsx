"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProductCarousel from "./ProductCarousel";
import { Product, Collection } from "@/lib/shopify/types";

interface ProductsProps {
  products: Product[];
  collections: Collection[];
}

interface CarouselSlot {
  title: string;
  type: "carousel";
  images: { image: string; link: string }[];
  link: string;
  image?: never;
}

interface StaticSlot {
  title: string;
  type: "static";
  image: string;
  link: string;
  images?: never;
}

type Slot = CarouselSlot | StaticSlot;

const Products = ({ products, collections }: ProductsProps) => {
  // Map products to carousel format
  const carouselImages = products
    .map((p) => ({
      image: p.featuredImage?.url || "",
      link: `/product/${p.handle}`,
    }))
    .filter((img) => img.image);

  const slots: Slot[] = [
    {
      title: "BARBER ESSENTIALS",
      type: "carousel",
      images: carouselImages,
      link: "/collections/barber-essentials",
    },
    // ...collections.slice(0, 2).map((c) => ({
    //   title: c.title,
    //   type: "static" as const,
    //   image: c.image?.url || "",
    //   link: `/collections/${c.handle}`,
    // })),
    {
      title: "ACCESSORIES",
      type: "static",
      image:
        "https://fadedculture.com/cdn/shop/files/file001_Album_-1.jpg?v=1747415201&width=1080",
      link: "/collections/accessories",
    },
    {
      title: "MERCHANDISE",
      type: "static",
      image:
        "https://fadedculture.com/cdn/shop/files/clay_4.jpg?v=1727901050&width=1080",
      link: "/collections/merchandise",
    },
  ];

  // Fill remaining slots
  if (slots.length < 3 && products[0]) {
    slots.push({
      title: "All Products",
      type: "static",
      image: products[0].featuredImage?.url || "",
      link: "/shop",
    });
  }

  return (
    <section>
      <div className="myContainer flex flex-col items-center justify-center">
        <h2 className="text55">Products</h2>

        <div className="flex flex-wrap gap-4 justify-between w-full lg:my-[length:var(--vw60)] my-10">
          {slots.map((category, index) => (
            <Link
              href={category.link}
              key={index}
              className="w-full sm:w-[31.5%] bg-white"
            >
              <div className="w-full flex flex-col">
                {category.type === "carousel" && category.images ? (
                  <ProductCarousel images={category.images} />
                ) : (
                  <div className="w-full sm:h-[30vw] h-[300px] relative">
                    {category.image ? (
                      <Image
                        fill
                        alt={category.title}
                        src={category.image}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span>No Image</span>
                      </div>
                    )}
                  </div>
                )}
                <span className="uppercase lg:text24 text-center mtext18 font-medium lg:py-[length:var(--vw20)] py-3">
                  {category.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
