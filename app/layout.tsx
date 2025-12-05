import type { Metadata } from "next";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import { CartProvider } from "@/components/cart/cart-context";

export const metadata: Metadata = {
  title: "Barber Avenue",
  description: "Premium Barber Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className="antialiased">
          <CartProvider>
            <Toaster />
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </body>
      </Providers>
    </html>
  );
}
