import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../components/api/ConfigApi';
import ProductCard from '../components/ProductCard';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (categoryId) {
      fetchCategoryAndProducts();
    }
  }, [categoryId]);

  const fetchCategoryAndProducts = async () => {
    try {
      setLoading(true);
      setError('');

      // جلب التصنيف مع المنتجات المرتبطة به
      const categoryResponse = await axios.get(`${BASE_URL}/api/user/menuCategories/${categoryId}`);
      
      const categoryData = categoryResponse.data.data;
      
      setCategory(categoryData);

      // استخراج المنتجات من relationship.Items
      const categoryProducts = categoryData?.relationship?.Items || [];
      
      setProducts(categoryProducts);

    } catch (err) {
      setError('فشل في تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ladorf-600 mx-auto mb-4"></div>
            <p className="text-gray-600">جاري التحميل...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            {error || 'القسم غير موجود'}
          </h1>
          <p className="text-gray-600 mb-4">الرجاء العودة للصفحة الرئيسية</p>
          <button 
            onClick={fetchCategoryAndProducts}
            className="bg-ladorf-600 text-white px-6 py-2 rounded-lg hover:bg-ladorf-700 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Category Header */}
      <div className="hero-gradient text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-amiri mb-4">
            {category.attributes?.name || category.name}
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {category.attributes?.description || category.description}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        {products.length > 0 ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                جميع المنتجات في قسم {category.attributes?.name || category.name}
              </h2>
              <p className="text-gray-600">اختر من بين {products.length} منتج متاح</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              لا توجد منتجات في هذا القسم حالياً
            </h2>
            <p className="text-gray-600 mb-4">categoryId: {categoryId}</p>
            <p className="text-gray-600">اسم التصنيف: {category.attributes?.name}</p>
            <p className="text-gray-600">سيتم إضافة منتجات جديدة قريباً</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CategoryPage;
