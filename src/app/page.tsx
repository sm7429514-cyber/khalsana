import Link from "next/link";
import { getAllProducts, getFeaturedProducts } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ArrowLeft, Shield, Camera, Wifi, Smartphone } from "lucide-react";

const services = [
  {
    icon: Camera,
    title: "كاميرات مراقبة",
    desc: "حلول متكاملة للمراقبة الداخلية والخارجية بأعلى دقة",
  },
  {
    icon: Wifi,
    title: "إنتركم وأنظمة دخول",
    desc: "أنظمة إنتركم فيديو وصوت للتحكم في الدخول",
  },
  {
    icon: Shield,
    title: "أكسس كنترول",
    desc: "أنظمة بصمة وكارت للتحكم في دخول الموظفين",
  },
  {
    icon: Smartphone,
    title: "سمارت هوم",
    desc: "تحكم ذكي في منزلك بالكامل من هاتفك",
  },
];

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const allProducts = getAllProducts();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 via-black to-black pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              حلول التيار الخفيف
              <br />
              <span className="text-zinc-400">والأنظمة الأمنية</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-500 leading-relaxed">
              متخصصون في تركيب كاميرات المراقبة، الإنتركم، الأكسس كنترول،
              والسمارت هوم. نقدم أفضل المنتاص بأفضل الأسعار مع خدمة تركيب
              احترافية.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition-all hover:bg-zinc-200"
              >
                تصفح المنتجات
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <WhatsAppButton
                message="مرحباً، أريد استفساراً عن منتجات PrimeSolution"
                label="تواصل معنا"
                size="md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">خدماتنا</h2>
          <p className="mt-2 text-sm text-zinc-500">نقدم مجموعة متكاملة من الحلول الأمنية والذكية</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-center transition-all hover:border-zinc-700 hover:bg-zinc-900"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-800 group-hover:bg-zinc-700 transition-colors">
                <service.icon className="h-6 w-6 text-zinc-300" />
              </div>
              <h3 className="text-sm font-semibold text-white">{service.title}</h3>
              <p className="mt-2 text-xs text-zinc-500 leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductGrid
          products={featuredProducts}
          title="منتجات مميزة"
          subtitle="اختر من بين منتجاتنا الأكثر طلباً"
        />
      </section>

      {/* All Products Preview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductGrid
          products={allProducts}
          title="جميع المنتجات"
          subtitle="تصفح مجموعتنا الكاملة من المنتجات والحلول"
        />
        <div className="text-center pb-16">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            عرض جميع المنتجات
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            هل لديك استفسار أو تريد حجز موعد؟
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            تواصل معنا عبر واتساب وسنرد عليك فوراً
          </p>
          <div className="mt-6 flex items-center justify-center gap-4">
            <WhatsAppButton
              message="مرحباً، أريد حجز موعد للتركيب"
              label="احجز موعدك الآن"
              size="lg"
            />
          </div>
        </div>
      </section>
    </>
  );
}