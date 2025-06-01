
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="py-20 px-4 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-amiri text-orange-600 mb-6">
              من نحن
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              مطعم لاورف - وجهتكم الأولى للطعام الشرقي الأصيل
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-orange-600">قصتنا</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  تأسس مطعم لاورف بهدف تقديم أشهى الأطباق الشرقية والعربية بنكهات أصيلة ومذاق لا يُنسى. 
                  نحن نؤمن بأن الطعام ليس مجرد وجبة، بل تجربة ثقافية تجمع الأسر والأصدقاء حول مائدة واحدة.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-orange-600">رؤيتنا</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  نسعى لأن نكون المطعم الأول في تقديم الطعام الشرقي الأصيل، مع الحفاظ على التراث الغذائي العربي 
                  وتطويره ليناسب الأذواق العصرية، مع ضمان أعلى معايير الجودة والنظافة.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-orange-600">مهمتنا</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  تقديم أطباق شهية محضرة بعناية فائقة من أجود المكونات، مع خدمة عملاء متميزة تضمن 
                  راحة ورضا عملائنا الكرام في كل زيارة.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-orange-600">تخصصاتنا</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-gray-700 space-y-2">
                  <li>• المندي والمدفون بأنواعه</li>
                  <li>• المطبقات الشهية</li>
                  <li>• الكنافة والمعصوب</li>
                  <li>• الأطباق الرئيسية المتنوعة</li>
                  <li>• المخبوزات الطازجة</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Card className="shadow-lg max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-orange-600">اتصل بنا</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-lg mb-2">العنوان:</h3>
                    <p className="text-gray-700">المنصورة – حي الجامعة – شارع الإيمان – متفرع من شارع جيهان</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">هاتف:</h3>
                    <p className="text-gray-700 font-mono">01020565509</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
