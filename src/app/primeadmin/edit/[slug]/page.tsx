"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Product } from "@/types/product";

const categories = [
  { name: "كاميرات مراقبة", nameEn: "Security Cameras" },
  { name: "إنتركم", nameEn: "Intercom" },
  { name: "أكسس كنترول", nameEn: "Access Control" },
  { name: "سمارت هوم", nameEn: "Smart Home" },
];

export default function EditProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    slug: "",
    name: "",
    nameEn: "",
    category: "",
    categoryEn: "",
    price: "",
    description: "",
    features: [""],
    images: ["/images/placeholder-product.svg"],
    featured: false,
    whatsappMessage: "",
  });

  useEffect(() => {
    params.then(({ slug }) => {
      fetch(`/api/products?slug=${slug}`)
        .then((res) => res.json())
        .then((product: Product) => {
          setForm({
            slug: product.slug,
            name: product.name,
            nameEn: product.nameEn,
            category: product.category,
            categoryEn: product.categoryEn,
            price: String(product.price),
            description: product.description,
            features: product.features,
            images: product.images,
            featured: product.featured,
            whatsappMessage: product.whatsappMessage,
          });
          setFetching(false);
        })
        .catch(() => setFetching(false));
    });
  }, [params]);

  function handleFeatureChange(i: number, value: string) {
    const features = [...form.features];
    features[i] = value;
    setForm({ ...form, features });
  }

  function addFeature() {
    setForm({ ...form, features: [...form.features, ""] });
  }

  function removeFeature(i: number) {
    setForm({ ...form, features: form.features.filter((_, idx) => idx !== i) });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("primeadmin_token");
    if (!token) {
      alert("الرجاء تسجيل الدخول أولاً");
      router.push("/primeadmin");
      return;
    }

    const res = await fetch(`/api/products?slug=${form.slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        features: form.features.filter((f) => f.trim()),
        whatsappMessage: form.whatsappMessage || `أريد حجز موعد لتركيب ${form.name}`,
      }),
    });

    if (res.ok) {
      router.push("/primeadmin");
      router.refresh();
    } else {
      alert("حدث خطأ في تحديث المنتج");
    }
    setLoading(false);
  }

  if (fetching) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center">
        <p className="text-zinc-500">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/primeadmin" className="text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-white">تعديل المنتج</h1>
          <p className="text-sm text-zinc-500">تعديل بيانات: {form.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">اسم المنتج (عربي)</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">اسم المنتج (إنجليزي)</label>
            <input
              type="text"
              required
              value={form.nameEn}
              onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">السعر (ج.م)</label>
            <input
              type="number"
              required
              min="0"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">التصنيف</label>
            <select
              value={form.category}
              onChange={(e) => {
                const cat = categories.find((c) => c.name === e.target.value);
                if (cat) setForm({ ...form, category: cat.name, categoryEn: cat.nameEn });
              }}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-zinc-400"
            >
              {categories.map((cat) => (
                <option key={cat.nameEn} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="rounded border-zinc-700 bg-zinc-800 text-white focus:ring-zinc-400"
              />
              <span className="text-sm text-zinc-400">منتج مميز</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">الوصف</label>
          <textarea
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-2">المميزات</label>
          {form.features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(i, e.target.value)}
                className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400"
                placeholder={`ميزة ${i + 1}`}
              />
              {form.features.length > 1 && (
                <button type="button" onClick={() => removeFeature(i)} className="text-zinc-500 hover:text-red-400 text-sm">
                  حذف
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addFeature} className="text-sm text-zinc-400 hover:text-white transition-colors">
            + إضافة ميزة
          </button>
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">رابط الصورة</label>
          <input
            type="text"
            value={form.images[0]}
            onChange={(e) => setForm({ ...form, images: [e.target.value] })}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-400 mb-1">رسالة واتساب</label>
          <input
            type="text"
            value={form.whatsappMessage}
            onChange={(e) => setForm({ ...form, whatsappMessage: e.target.value })}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-medium text-black transition-all hover:bg-zinc-200 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
          </button>
          <Link href="/primeadmin" className="text-sm text-zinc-400 hover:text-white transition-colors">
            إلغاء
          </Link>
        </div>
      </form>
    </div>
  );
}