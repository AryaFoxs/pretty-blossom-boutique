import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Pretty Blossom Boutique | Toko Bunga Premium",
    template: "%s | Pretty Blossom Boutique",
  },
  description:
    "Toko bunga premium dengan rangkaian buket cantik, bunga papan, standing flower, dan dekorasi acara. Pengiriman same-day area Jabodetabek.",
  keywords: [
    "toko bunga",
    "florist",
    "buket bunga",
    "bunga papan",
    "dekorasi pernikahan",
    "standing flower",
    "Jakarta",
  ],
  authors: [{ name: "Pretty Blossom Boutique" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://prettyblossom.com",
    siteName: "Pretty Blossom Boutique",
    title: "Pretty Blossom Boutique | Toko Bunga Premium",
    description:
      "Toko bunga premium dengan rangkaian buket cantik, bunga papan, standing flower, dan dekorasi acara.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${poppins.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
