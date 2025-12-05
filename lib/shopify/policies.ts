import { shopifyFetch } from '../shopify';
import { getShopPoliciesQuery } from '../../graphql/queries/policies';

export type Policy = {
    id: string;
    title: string;
    body: string;
};

export async function getPolicies(): Promise<Record<string, Policy | null>> {
  const res = await shopifyFetch<any>({
    query: getShopPoliciesQuery,
    cache: 'force-cache'
  });

  return {
      privacyPolicy: res.body.data.shop.privacyPolicy,
      termsOfService: res.body.data.shop.termsOfService,
      shippingPolicy: res.body.data.shop.shippingPolicy,
      refundPolicy: res.body.data.shop.refundPolicy
  };
}
