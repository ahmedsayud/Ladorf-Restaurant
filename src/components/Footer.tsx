import React from "react";
import { MapPin, Phone, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <h3 className="text-2xl font-bold font-amiri mb-4">مطعم لادورف</h3>
            <p className="text-gray-300 leading-relaxed">
              نقدم لكم أشهى الأطباق الشرقية والعربية بنكهات أصيلة ومذاق لا
              يُنسى. نحن نسعى لتقديم تجربة طعام استثنائية لجميع عملائنا الكرام.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-xl font-semibold mb-4">معلومات التواصل</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 space-x-reverse">
                <a
                  href="https://maps.app.goo.gl/j1MZoCWf2xqyGrdc6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-3 space-x-reverse"
                >
                  <MapPin className="h-5 w-5 text-ladorf-800 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 hover:text-ladorf-800">
                    المنصورة – حي الجامعة – شارع الإيمان – متفرع من شارع جيهان
                  </p>
                </a>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Phone className="h-5 w-5 text-ladorf-800" />
                <a
                  href="https://wa.me/201020565509"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-ladorf-800"
                  dir="ltr"
                >
                  01020565509
                </a>
              </div>

              <div className="flex items-center space-x-3 space-x-reverse">
                <Clock className="h-5 w-5 text-ladorf-800" />
                <p className="text-gray-300">
                  مفتوح يومياً من 12 صباحاً إلى 12 منتصف الليل
                </p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">روابط سريعة</h4>
            <div className="space-y-2">
              <a
                href="/"
                className="block text-gray-300 hover:text-ladorf-800 transition-colors"
              >
                الصفحة الرئيسية
              </a>
              <a
                href="/category/chicken"
                className="block text-gray-300 hover:text-ladorf-800 transition-colors"
              >
                أطباق الدجاج
              </a>
              <a
                href="/category/meat"
                className="block text-gray-300 hover:text-ladorf-800 transition-colors"
              >
                أطباق اللحوم
              </a>
              <a
                href="/cart"
                className="block text-gray-300 hover:text-ladorf-800 transition-colors "
              >
                عرض الطلب
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            جميع الحقوق محفوظة. © 2025 مطعم لادورف. 
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
