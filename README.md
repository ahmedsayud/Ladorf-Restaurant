# 🍽️ مطعم لادورف - موقع طعام إلكتروني

## 📋 نظرة عامة

موقع إلكتروني متطور لمطعم لادورف يقدم أشهى الأطباق الشرقية والعربية. يتيح للعملاء تصفح القائمة، إضافة الأطباق إلى السلة، وإتمام عملية الطلب بسهولة.

## ✨ المميزات

- 🍕 **قائمة طعام تفاعلية** - تصفح الأطباق حسب الفئات
- 🛒 **سلة مشتريات ذكية** - إضافة وإزالة الأطباق بسهولة
- 📱 **تصميم متجاوب** - يعمل على جميع الأجهزة
- 🔐 **نظام تسجيل دخول** - للمستخدمين والإدارة
- 👨‍💼 **لوحة إدارة** - لإدارة المنتجات والطلبات
- 🌐 **دعم اللغة العربية** - واجهة عربية كاملة
- ⚡ **سرعة عالية** - مبني بـ Vite و React

## 🛠️ التقنيات المستخدمة

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Build Tool**: Vite
- **State Management**: React Context
- **Routing**: React Router
- **Icons**: Lucide React
- **Deployment**: Vercel

## 🚀 التثبيت والتشغيل

### المتطلبات الأساسية
- Node.js (الإصدار 18 أو أحدث)
- npm أو yarn

### خطوات التثبيت

```bash
# 1. استنساخ المشروع
git clone https://github.com/your-username/ladorf-restaurant.git

# 2. الانتقال إلى مجلد المشروع
cd ladorf-restaurant

# 3. تثبيت التبعيات
npm install

# 4. تشغيل خادم التطوير
npm run dev
```

### أوامر مفيدة

```bash
# تشغيل خادم التطوير
npm run dev

# بناء المشروع للإنتاج
npm run build

# معاينة البناء
npm run preview

# فحص الأخطاء
npm run lint
```

## 📁 هيكل المشروع

```
src/
├── components/          # المكونات
│   ├── admin/          # مكونات الإدارة
│   ├── api/            # واجهات API
│   └── ui/             # مكونات واجهة المستخدم
├── contexts/           # React Contexts
├── data/               # البيانات الثابتة
├── hooks/              # Custom Hooks
├── pages/              # صفحات التطبيق
├── types/              # تعريفات TypeScript
└── lib/                # مكتبات مساعدة
```

## 🌐 النشر

### Vercel (موصى به)
1. اربط مستودع GitHub بـ Vercel
2. سيتم النشر تلقائياً عند كل تحديث
3. احصل على رابط مباشر للموقع

### GitHub Pages
```bash
npm run build
# ارفع محتويات مجلد dist إلى GitHub Pages
```

## 🔧 الإعدادات

### متغيرات البيئة
```env
VITE_API_BASE_URL=https://your-api-domain.com
```

### تكوين API
يتم تكوين رابط API في `src/components/api/ConfigApi.ts`

## 📱 تحسين محركات البحث (SEO)

تم تحسين الموقع لظهور أفضل في محركات البحث من خلال:

- ✅ ملف `robots.txt` محسن
- ✅ ملف `sitemap.xml` شامل
- ✅ Meta tags محسنة
- ✅ Structured Data (Schema.org)
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Web App Manifest

## 🎨 التصميم

- **الألوان الرئيسية**: ذهبي (#e7c565) وأبيض
- **الخط**: خط عربي جميل ومقروء
- **التصميم**: عصري وأنيق يناسب المطاعم الفاخرة

## 📞 الدعم

للاستفسارات والدعم التقني:
- 📧 البريد الإلكتروني: support@ladorf.com
- 📱 الهاتف: +20-XXX-XXX-XXXX
- 🌐 الموقع: https://ladorf.com

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT.

## 🤝 المساهمة

نرحب بمساهماتكم! يرجى:

1. عمل Fork للمشروع
2. إنشاء فرع جديد للميزة
3. عمل Commit للتغييرات
4. عمل Push للفرع
5. إنشاء Pull Request

---

**مطعم لادورف** - أشهى الأطباق الشرقية والعربية 🍽️✨
