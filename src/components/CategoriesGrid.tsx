import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '@/components/api/ConfigApi';



const CategoriesGrid = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/user/menuCategories`);
      setCategories(response.data.data || []);
    } catch (err) {
      setError('فشل في تحميل التصنيفات');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 px-4">
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
            {[...Array(8)].map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="p-0">
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-amiri text-gray-800 mb-4">
            تصفح أقسام القائمة
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchCategories}
            className="bg-ladorf-600 text-white px-6 py-2 rounded-lg hover:bg-ladorf-700 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-amiri text-gray-800 mb-4">
            تصفح أقسام القائمة
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            اختر من بين مجموعة متنوعة من الأطباق الشهية المحضرة بأجود المكونات
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              لا توجد أقسام متاحة حالياً
            </h3>
            <p className="text-gray-600">سيتم إضافة أقسام جديدة قريباً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {categories.map((category) => {
              const imageUrl =
                category.image_url ||
                category.image ||
                category.attributes?.image_url ||
                category.attributes?.image ||
                '';

              return (
                <Link key={category.id} to={`/category/${category.id}`}>
                  <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer rounded-lg">
                    <CardContent className="p-0">
                      <div className="relative h-48 overflow-hidden rounded-lg flex items-center justify-center">
                        {imageUrl && (
                          <img 
                            src={imageUrl}
                            alt={category.attributes?.name || category.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 rounded-lg"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-300 rounded-lg"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-2 rounded-lg">
                          <h3 className="font-bold text-lg mb-2 text-white drop-shadow-lg group-hover:text-ladorf-300 transition-colors font-amiri">
                            {category.attributes?.name || category.name}
                          </h3>
                          <p className="text-white text-sm drop-shadow-lg">
                            {category.attributes?.description || category.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoriesGrid;
