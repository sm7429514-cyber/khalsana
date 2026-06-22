import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

type ProductGridProps = {
  products: Product[];
  title?: string;
  subtitle?: string;
};

export default function ProductGrid({ products, title, subtitle }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-zinc-500">لا توجد منتجات متاحة حالياً</p>
      </div>
    );
  }

  return (
    <section className="py-16">
      {title && (
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{title}</h2>
          {subtitle && <p className="mt-2 text-sm text-zinc-500">{subtitle}</p>}
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}