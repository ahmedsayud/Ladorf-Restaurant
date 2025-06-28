# 📋 دليل رفع موقع مطعم لادورف على سيرفر الشركة

## 🎯 نظرة عامة

هذا الدليل يوضح كيفية رفع موقع React على سيرفر الشركة مع جميع الملفات المطلوبة.

## 📁 الملفات المطلوبة للرفع

### 1. ملفات المشروع (بعد البناء)
```bash
# بناء المشروع
npm run build
```

### 2. ملفات السيرفر
- `public/.htaccess` - لسيرفر Apache
- `nginx.conf` - لسيرفر Nginx
- `public/robots.txt` - لتحسين SEO
- `public/sitemap.xml` - خريطة الموقع
- `public/manifest.json` - للتطبيق المحمول

## 🚀 خطوات الرفع

### الخطوة 1: بناء المشروع
```bash
npm run build
```

### الخطوة 2: تحضير الملفات
```bash
# انسخ محتويات مجلد dist
# أضف الملفات التالية:
# - .htaccess (لـ Apache)
# - robots.txt
# - sitemap.xml
# - manifest.json
```

### الخطوة 3: رفع الملفات
1. ارفع جميع محتويات مجلد `dist` إلى مجلد الموقع على السيرفر
2. ارفع ملف `.htaccess` إلى المجلد الجذر
3. ارفع باقي الملفات إلى المجلد الجذر

## ⚙️ إعدادات السيرفر

### لسيرفر Apache:
1. ضع ملف `.htaccess` في المجلد الجذر
2. تأكد من تفعيل `mod_rewrite`
3. تأكد من تفعيل `mod_deflate` (اختياري)

### لسيرفر Nginx:
1. انسخ محتويات `nginx.conf` إلى إعدادات الموقع
2. عدل `server_name` و `root` حسب إعداداتك
3. أعد تشغيل Nginx

## 🔧 التخصيص

### تحديث الروابط في الملفات:

#### 1. robots.txt
```txt
Sitemap: https://your-domain.com/sitemap.xml
```

#### 2. sitemap.xml
```xml
<loc>https://your-domain.com/</loc>
```

#### 3. index.html
```html
<link rel="canonical" href="https://your-domain.com/" />
<meta property="og:url" content="https://your-domain.com/" />
```

#### 4. manifest.json
```json
{
  "start_url": "https://your-domain.com/"
}
```

## 📋 قائمة التحقق

- [ ] بناء المشروع بـ `npm run build`
- [ ] رفع محتويات مجلد `dist`
- [ ] رفع ملف `.htaccess` (لـ Apache)
- [ ] رفع ملف `nginx.conf` (لـ Nginx)
- [ ] رفع `robots.txt`
- [ ] رفع `sitemap.xml`
- [ ] رفع `manifest.json`
- [ ] تحديث جميع الروابط
- [ ] اختبار الموقع
- [ ] اختبار React Router
- [ ] اختبار SEO

## 🐛 حل المشاكل الشائعة

### مشكلة: صفحات React Router تعطي 404
**الحل**: تأكد من وجود ملف `.htaccess` أو إعدادات Nginx الصحيحة

### مشكلة: الملفات لا تتحمل
**الحل**: تأكد من إعدادات التخزين المؤقت في `.htaccess` أو `nginx.conf`

### مشكلة: الموقع بطيء
**الحل**: تأكد من تفعيل ضغط الملفات (gzip)

## 📞 الدعم

إذا واجهت أي مشاكل:
1. تحقق من سجلات السيرفر
2. تأكد من إعدادات السيرفر
3. راجع ملفات `.htaccess` أو `nginx.conf`

---

**ملاحظة**: تأكد من تحديث جميع الروابط لتطابق دومينك الفعلي قبل الرفع. 