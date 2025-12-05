import { shopifyFetch, removeEdgesAndNodes } from '../shopify';
import { getCollectionQuery, getCollectionsQuery } from '../../graphql/queries/collections';
import { Collection } from '../../types/shopify-graphql';

export async function getCollection(handle: string): Promise<Collection | undefined> {
  const res = await shopifyFetch<any>({
    query: getCollectionQuery,
    tags: ['collections'],
    variables: {
      handle
    }
  });

  return res.body.data.collection;
}

export async function getCollections(): Promise<Collection[]> {
  const res = await shopifyFetch<any>({
    query: getCollectionsQuery,
    tags: ['collections']
  });

  return removeEdgesAndNodes(res.body.data.collections);
}
