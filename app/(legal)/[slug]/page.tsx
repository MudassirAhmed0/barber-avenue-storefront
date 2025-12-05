import { getPolicies } from '@/lib/shopify/policies';
import { notFound } from 'next/navigation';

export default async function LegalPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const policies = await getPolicies();

  let policy;
  
  // Map specific slugs to policy keys
  switch (params.slug) {
      case 'privacy-policy':
          policy = policies.privacyPolicy;
          break;
      case 'terms-of-service':
          policy = policies.termsOfService;
          break;
      case 'shipping-policy':
          policy = policies.shippingPolicy;
          break;
      case 'refund-policy':
          policy = policies.refundPolicy;
          break;
      default:
          return notFound();
  }

  if (!policy) {
      return (
          <div className="mx-auto max-w-4xl px-4 py-8 pt-32 lg:pt-40">
              <h1 className="text-3xl font-bold mb-4">Policy Not Found</h1>
              <p>This policy has not been set up in your Shopify store.</p>
          </div>
      );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 pt-32 lg:pt-40">
      <h1 className="text-4xl font-bold mb-8">{policy.title}</h1>
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: policy.body }}
      />
    </div>
  );
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    // ... metadata logic ...
    return {
        title: params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    };
}
