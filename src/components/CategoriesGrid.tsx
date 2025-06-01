
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { categories } from '@/data/restaurantData';
import { ChefHat, Coffee, Utensils, Beef, Cake, Salad } from 'lucide-react';

const categoryIcons: { [key: string]: React.ReactNode } = {
  chicken: <ChefHat className="h-8 w-8" />,
  flatbread: <Utensils className="h-8 w-8" />,
  meat: <Beef className="h-8 w-8" />,
  pasta: <Utensils className="h-8 w-8" />,
  stews: <ChefHat className="h-8 w-8" />,
  drinks: <Coffee className="h-8 w-8" />,
  bakery: <Cake className="h-8 w-8" />,
  grilled: <ChefHat className="h-8 w-8" />,
  kunafa: <Cake className="h-8 w-8" />,
  salads: <Salad className="h-8 w-8" />,
  masoob: <Cake className="h-8 w-8" />,
};

const CategoriesGrid = () => {
  return (
    <section className="section-gradient py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-amiri text-gray-800 mb-4">
            تصفح أقسام القائمة
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            اختر من بين مجموعة متنوعة من الأطباق الشهية المحضرة بأجود المكونات
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link key={category.id} to={`/category/${category.id}`}>
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer border-2 hover:border-orange-200">
                <CardContent className="p-6 text-center">
                  <div className="text-orange-600 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {categoryIcons[category.id] || <Utensils className="h-8 w-8" />}
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-orange-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesGrid;
