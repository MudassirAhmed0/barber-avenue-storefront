export const getShopPoliciesQuery = /* GraphQL */ `
  query getShopPolicies {
    shop {
      privacyPolicy {
        id
        title
        body
      }
      termsOfService {
        id
        title
        body
      }
      shippingPolicy {
        id
        title
        body
      }
      refundPolicy {
        id
        title
        body
      }
    }
  }
`;
