"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, LogOut, Package } from "lucide-react";
import { Product } from "@/types/product";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const token = typeof window !== "undefined" ? localStorage.getItem("primeadmin_token") : null;

  function handleLogout() {
    localStorage.removeItem("primeadmin_token");
    window.location.href = "/primeadmin";
  }

  async function handleDelete(slug: string) {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;
    const res = await fetch(`/api/products?slug=${slug}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setProducts(products.filter((p) => p.slug !== slug));
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 text-center">
        <p className="text-zinc-500">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">لوحة التحكم</h1>
          <p className="text-sm text-zinc-500">
            إدارة المنتجات - {products.length} منتج
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/primeadmin/add"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black hover:bg-zinc-200 transition-colors"
          >
            <Plus className="h-4 w-4" />
            إضافة منتج
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            خروج
          </button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-zinc-800 rounded-xl">
          <Package className="mx-auto h-12 w-12 text-zinc-600 mb-4" />
          <p className="text-zinc-500">لا توجد منتجات بعد</p>
          <Link
            href="/primeadmin/add"
            className="mt-4 inline-flex items-center gap-2 text-sm text-white hover:text-zinc-300 transition-colors"
          >
            <Plus className="h-4 w-4" />
            أضف أول منتج
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900">
                <th className="text-right px-4 py-3 text-zinc-400 font-medium">الاسم</th>
                <th className="text-right px-4 py-3 text-zinc-400 font-medium">التصنيف</th>
                <th className="text-right px-4 py-3 text-zinc-400 font-medium">السعر</th>
                <th className="text-right px-4 py-3 text-zinc-400 font-medium">مميز</th>
                <th className="text-right px-4 py-3 text-zinc-400 font-medium">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-zinc-800 last:border-0 hover:bg-zinc-900/50">
                  <td className="px-4 py-3 text-white">{product.name}</td>
                  <td className="px-4 py-3 text-zinc-400">{product.category}</td>
                  <td className="px-4 py-3 text-white whitespace-nowrap">
                    {product.price.toLocaleString("ar-EG")} ج.م
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded ${product.featured ? "bg-emerald-900 text-emerald-300" : "bg-zinc-800 text-zinc-500"}`}>
                      {product.featured ? "نعم" : "لا"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/primeadmin/edit/${product.slug}`}
                        className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                      >
                        <Edit className="h-3.5 w-3.5" />
                        تعديل
                      </Link>
                      <button
                        onClick={() => handleDelete(product.slug)}
                        className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-red-400 hover:text-red-300 hover:bg-red-900/30 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        حذف
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}