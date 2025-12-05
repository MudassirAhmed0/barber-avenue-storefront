import { Cart as ShopifyCartType, Product as ShopifyProductType, Collection as ShopifyCollectionType, BaseCartLine } from '../../types/shopify-graphql';

export type CartLine = BaseCartLine;

export type Cart = Omit<ShopifyCartType, 'lines'> & {
  lines: CartLine[];
};

export type Product = ShopifyProductType;
export type Collection = ShopifyCollectionType;
