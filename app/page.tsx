import About from "@/components/home/about/About";
import ProductCarousel from "@/components/home/products/Products";
import Testimonials from "@/components/home/testimonials/Testimonials";
import Hero from "@/components/common/Hero";
import Image from "next/image";
import { getProducts } from "@/lib/shopify/products";
import { getCollections } from "@/lib/shopify/collections";

export const metadata = {
  title: "Barber Storefront",
  description: "Create your own style."
};

export default async function Home() {
  const products = await getProducts({ sortKey: "BEST_SELLING" });
  const collections = await getCollections();

  return (
    <>
      <Hero />
      <About />
      <ProductCarousel products={products} collections={collections} />
      <div className="w-full fullVhcm fullSvhcm relative">
        <span className="atlwh_Full bg-[color:var(--color-darkgreen)]/70 z-[1]"></span>
        <Image
          fill
          alt="banner"
          src={"/images/home/banner.jpg"}
          className="object-cover"
        />
      </div>
      <Testimonials />
    </>
  );
}
