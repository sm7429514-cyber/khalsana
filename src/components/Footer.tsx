import { Phone, MapPin, Clock, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-cyan-900 bg-black mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Prime<span className="text-cyan-400">Solution</span>
            </h3>
            <p className="text-sm text-cyan-300/70 leading-relaxed">
              متخصصون في حلول التيار الخفيف والأنظمة الأمنية. نقدم أفضل منتجات كاميرات المراقبة،
              الإنتركم، الأكسس كنترول، والسمارت هوم.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">خدماتنا</h3>
            <ul className="space-y-2 text-sm text-cyan-300/70">
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-cyan-600" />
                تركيب كاميرات المراقبة
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-cyan-600" />
                أنظمة الإنتركم
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-cyan-600" />
                الأكسس كنترول
              </li>
              <li className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-cyan-600" />
                السمارت هوم
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">تواصل معنا</h3>
            <ul className="space-y-3 text-sm text-cyan-300/70">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-cyan-600" />
                +201003418966
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-cyan-600" />
                مصر
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-cyan-600" />
                يومياً 9:00 ص - 10:00 م
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-cyan-900 pt-6 text-center text-xs text-cyan-600">
          © {new Date().getFullYear()} PrimeSolution. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  );
}