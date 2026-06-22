import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FacebookPixel from "@/components/FacebookPixel";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "PrimeSolution | حلول التيار الخفيف والأنظمة الأمنية",
  description:
    "متخصصون في تركيب كاميرات المراقبة، الإنتركم، الأكسس كنترول، والسمارت هوم. أفضل المنتجات بأفضل الأسعار.",
  openGraph: {
    title: "PrimeSolution | حلول التيار الخفيف والأنظمة الأمنية",
    description:
      "متخصصون في تركيب كاميرات المراقبة، الإنتركم، الأكسس كنترول، والسمارت هوم.",
    locale: "ar_EG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-zinc-100 font-sans">
        <FacebookPixel />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}