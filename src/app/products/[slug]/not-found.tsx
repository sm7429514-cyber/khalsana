import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-24 text-center">
      <h1 className="text-4xl font-bold text-white">المنتج غير موجود</h1>
      <p className="mt-4 text-zinc-500">عذراً، لم نتمكن من العثور على هذا المنتج</p>
      <Link
        href="/products"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-black hover:bg-zinc-200 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        العودة إلى المنتجات
      </Link>
    </div>
  );
}