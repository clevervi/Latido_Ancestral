import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import StoreHydration from "@/components/StoreHydration";
import NotificationToast from "@/components/NotificationToast";
import PromoPopup from "@/components/PromoPopup";

export const metadata: Metadata = {
  title: "Latido Ancestral - Artesanías Colombianas",
  description: "Tienda virtual especializada en la venta de artesanías colombianas hechas a mano. Sombreros vueltiaos, mochilas wayuu, hamacas y más.",
  keywords: ["artesanías", "colombia", "sombrero vueltiao", "mochila wayuu", "hamaca", "artesanías colombianas"],
  openGraph: {
    title: "Latido Ancestral - Artesanías Colombianas",
    description: "Descubre artesanías colombianas auténticas hechas a mano",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <StoreHydration />
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          
          {/* Componentes globales */}
          <NotificationToast />
          <PromoPopup delay={10000} />
        </ThemeProvider>
      </body>
    </html>
  );
}
