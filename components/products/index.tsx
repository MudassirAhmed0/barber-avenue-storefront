"use client";
import { GET_ALL_PORDUCTS } from "@/graphql/products";
import { useStorefrontQuery } from "@/hooks/useStorefront";
import { GetProductsQuery } from "@/types/shopify-graphql";
import Link from "next/link";
import React from "react";

const Products = () => {
  const { data, isLoading, error } = useStorefrontQuery<GetProductsQuery>(
    ["products"],
    {
      query: GET_ALL_PORDUCTS,
    }
  );

  return (
    <div>
      Products
      <ul>
        {data?.products?.edges?.map((product) => (
          <li key={product.node.id}>
            <Link href={"/products/" + product.node.handle}>
              {product.node.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
