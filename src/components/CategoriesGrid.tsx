
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { categories } from '@/data/restaurantData';

const categoryImages: { [key: string]: string } = {
  chicken: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop',
  flatbread: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop',
  meat: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=400&h=300&fit=crop',
  pasta: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
  stews: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop',
  drinks: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
  bakery: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
  grilled: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
  kunafa: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop',
  salads: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
  masoob: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop',
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
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer border-2 hover:border-ladorf-600">
                <CardContent className="p-0">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img 
                      src={categoryImages[category.id] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'} 
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-ladorf-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {category.description}
                    </p>
                  </div>
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
