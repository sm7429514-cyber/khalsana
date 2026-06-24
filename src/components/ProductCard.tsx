import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-cyan-900/50 bg-cyan-950/30 transition-all hover:border-cyan-700 hover:shadow-xl hover:shadow-cyan-500/10"
    >
      <div className="aspect-square overflow-hidden bg-cyan-950">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium text-cyan-400/60 uppercase tracking-wider">
          {product.category}
        </span>
        <h3 className="text-sm font-semibold text-white leading-tight group-hover:text-cyan-200 transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-cyan-300/50 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-white">
            {product.price.toLocaleString("ar-EG")}{" "}
            <span className="text-xs font-normal text-cyan-400/60">ج.م</span>
          </span>
          <span className="text-xs text-cyan-400 font-medium group-hover:text-cyan-300 transition-colors">
            احجز الآن
          </span>
        </div>
      </div>
    </Link>
  );
}