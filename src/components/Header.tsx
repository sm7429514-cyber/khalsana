"use client";

import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useState } from "react";

const categories = [
  { name: "كاميرات مراقبة", nameEn: "Security Cameras" },
  { name: "إنتركم", nameEn: "Intercom" },
  { name: "أكسس كنترول", nameEn: "Access Control" },
  { name: "سمارت هوم", nameEn: "Smart Home" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-white" />
          <span className="text-xl font-bold tracking-tight text-white">
            Prime<span className="text-zinc-400">Solution</span>
          </span>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link href="/" className="text-sm text-zinc-400 transition-colors hover:text-white">
            الرئيسية
          </Link>
          <div className="relative group">
            <button className="text-sm text-zinc-400 transition-colors hover:text-white flex items-center gap-1">
              المنتجات
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute right-0 top-full mt-1 w-56 rounded-lg border border-zinc-800 bg-black py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl">
              {categories.map((cat) => (
                <Link
                  key={cat.nameEn}
                  href={`/products?category=${cat.nameEn}`}
                  className="block px-4 py-2 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
              <div className="border-t border-zinc-800 mt-1 pt-1">
                <Link
                  href="/products"
                  className="block px-4 py-2 text-sm text-white hover:bg-zinc-900 transition-colors font-medium"
                >
                  عرض الكل
                </Link>
              </div>
            </div>
          </div>
          <Link href="/products" className="text-sm text-zinc-400 transition-colors hover:text-white">
            جميع المنتجات
          </Link>
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-zinc-400 hover:text-white transition-colors"
          aria-label="القائمة"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-black">
          <div className="space-y-1 px-4 py-4">
            <Link href="/" className="block py-2 text-sm text-zinc-400 hover:text-white" onClick={() => setMenuOpen(false)}>
              الرئيسية
            </Link>
            <div className="py-2">
              <p className="text-sm text-zinc-500 mb-2">المنتجات</p>
              {categories.map((cat) => (
                <Link
                  key={cat.nameEn}
                  href={`/products?category=${cat.nameEn}`}
                  className="block pr-4 py-1.5 text-sm text-zinc-400 hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
            <Link href="/products" className="block py-2 text-sm text-white font-medium" onClick={() => setMenuOpen(false)}>
              جميع المنتجات
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}