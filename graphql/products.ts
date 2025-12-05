import { gql } from "graphql-tag";

export const GET_ALL_PORDUCTS = gql`
  query getProducts {
   products(first: 15) {
    edges {
      node {
        id
        handle
        title
        options { name values }
        priceRange {
          minVariantPrice { amount currencyCode }
          maxVariantPrice { amount currencyCode }
        }
        variants(first: 100) {
          nodes {
            id
            title
            selectedOptions { name value }
            price { amount currencyCode }
            compareAtPrice { amount currencyCode }
            image { url altText }   # a single image per variant (if set)
            metafields(identifiers: [{namespace: "custom", key: "color"}]) {
              key
              value
            }
          }
        }
        media(first: 100) {
          nodes {
            __typename
            id
            alt
            previewImage { url }
            ... on MediaImage { image { url altText } }
            
          }
        }
      }
    }
  }
  }
`;
