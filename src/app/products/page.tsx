import { getAllProducts, getCategories } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ category?: string }>;
};

const categoryIcons: Record<string, string> = {
  "Security Cameras": "📹",
  "Intercom": "📞",
  "Access Control": "🔐",
  "Smart Home": "🏠",
};

export default async function ProductsPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const categories = getCategories();
  const allProducts = getAllProducts();

  const filtered = category
    ? allProducts.filter((p) => p.categoryEn === category)
    : allProducts;

  const activeCategory = categories.find((c) => c.nameEn === category);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          {activeCategory ? activeCategory.name : "جميع المنتجات"}
        </h1>
        <p className="mt-1 text-sm text-cyan-300/60">
          {activeCategory
            ? `تصفح منتجات ${activeCategory.name}`
            : "تصفح جميع المنتجات والحلول الأمنية"} ({filtered.length} منتج)
        </p>
      </div>

      {/* Categories Filter */}
      <div className="mb-10 flex flex-wrap gap-2">
        <Link
          href="/products"
          className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
            !category
              ? "border-cyan-500 bg-cyan-600 text-white"
              : "border-cyan-900 text-cyan-300/70 hover:border-cyan-700 hover:text-white"
          }`}
        >
          الكل
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.nameEn}
            href={`/products?category=${cat.nameEn}`}
            className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
              category === cat.nameEn
                ? "border-cyan-500 bg-cyan-600 text-white"
                : "border-cyan-900 text-cyan-300/70 hover:border-cyan-700 hover:text-white"
            }`}
          >
            {categoryIcons[cat.nameEn] || ""} {cat.name}
          </Link>
        ))}
      </div>

      <ProductGrid products={filtered} />
    </div>
  );
}