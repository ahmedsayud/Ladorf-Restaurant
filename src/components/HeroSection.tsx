
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative bg-[url('/assets/96.png')] bg-cover bg-center bg-[rgpa(0,0,0, .5)]  text-white py-20 px-4">
        <div className="absolute inset-0 bg-black/20"></div>

      <div className="container mx-auto text-center">
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold font-amiri mb-6 animate-fade-in">
            أهلاً بكم في مطعم لادورف
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in">
            نقدم لكم أشهى الأطباق الشرقية والعربية بنكهات أصيلة ومذاق لا يُنسى
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/categories">
              <Button size="lg" className="bg-white text-ladorf-800 hover:bg-gray-100 text-lg px-8 py-3">
                تصفح القائمة
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/cart">
              <Button size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-ladorf-800 text-lg px-8 py-3">
                عربة الطلب
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
