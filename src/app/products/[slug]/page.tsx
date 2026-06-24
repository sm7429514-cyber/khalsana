import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductGrid from "@/components/ProductGrid";
import { Check, ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "المنتج غير موجود" };

  return {
    title: `${product.name} | PrimeSolution`,
    description: product.description,
    openGraph: {
      title: `${product.name} | PrimeSolution`,
      description: product.description,
      images: [product.images[0]],
      locale: "ar_EG",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const relatedProducts = getRelatedProducts(product);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-cyan-300/60">
        <Link href="/" className="hover:text-white transition-colors">
          الرئيسية
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-white transition-colors">
          المنتجات
        </Link>
        <span>/</span>
        <Link
          href={`/products?category=${product.categoryEn}`}
          className="hover:text-white transition-colors"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-cyan-300/80">{product.name}</span>
      </nav>

      {/* Product Detail */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Image */}
        <div className="aspect-square overflow-hidden rounded-xl border border-cyan-900/50 bg-cyan-950/30">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={600}
            height={600}
            className="h-full w-full object-cover"
            priority
          />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-6">
          <div>
            <span className="text-xs font-medium text-cyan-400/60 uppercase tracking-wider">
              {product.category}
            </span>
            <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              {product.name}
            </h1>
          </div>

          <p className="text-3xl font-bold text-white">
            {product.price.toLocaleString("ar-EG")}{" "}
            <span className="text-base font-normal text-cyan-400/60">ج.م</span>
          </p>

          <p className="text-sm text-cyan-300/70 leading-relaxed border-t border-b border-cyan-900 py-4">
            {product.description}
          </p>

          {/* Features */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">المميزات:</h3>
            <ul className="space-y-2">
              {product.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-cyan-300/70">
                  <Check className="mt-0.5 h-4 w-4 text-cyan-400 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* WhatsApp CTA */}
          <div className="mt-4 rounded-xl border border-cyan-900/50 bg-cyan-950/30 p-6">
            <p className="text-sm text-cyan-300/70 mb-4">
              للاستفسار أو حجز موعد للتركيب، تواصل معنا عبر واتساب:
            </p>
            <WhatsAppButton
              message={product.whatsappMessage}
              label="احجز موعد التركيب عبر واتساب"
              size="lg"
            />
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <ProductGrid
            products={relatedProducts}
            title="منتجات ذات صلة"
            subtitle="قد تهمك هذه المنتجات أيضاً"
          />
        </div>
      )}

      {/* Back */}
      <div className="mt-8 text-center">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-cyan-300/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          العودة إلى جميع المنتجات
        </Link>
      </div>
    </div>
  );
}