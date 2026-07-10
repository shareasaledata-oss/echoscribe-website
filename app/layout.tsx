import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://echoscribes.com"),
  title: {
    default: "Echos Scribes | Curated Lifestyle & Tech Journal",
    template: "%s | Echos Scribes",
  },
  description:
    "A premium digital journal covering home & garden, tools, electronics, and clothing — where artisanal lifestyle meets forward-thinking technology.",
  keywords: ["lifestyle", "home garden", "tools", "electronics", "fashion", "blog"],
  authors: [{ name: "Echos Scribes Team" }],
  openGraph: {
    type: "website",
    siteName: "Echos Scribes",
    title: "Echos Scribes | Curated Lifestyle & Tech Journal",
    description:
      "A premium digital journal covering home & garden, tools, electronics, and clothing.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Echos Scribes",
    description: "A premium digital journal covering home & garden, tools, electronics, and clothing.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
