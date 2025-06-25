import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import { Product } from '@/types/restaurant';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { addToCart as apiAddToCart } from '@/components/api/CartApi';

interface ProductCardProps {
  product: Product;
}

const getProductImage = (product: any): string => {
  // استخدم فقط الرابط القادم من الAPI كما هو
  return (
    product.image_url ||
    product.image ||
    product.attributes?.image_url ||
    product.attributes?.image ||
    ''
  );
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const auth = useAuth();
  const navigate = useNavigate();

  // تحويل المنتج من relationship.Items إلى الشكل المتوقع
  const normalizedProduct = {
    id: product.id,
    name: product.name || product.attributes?.name,
    price: parseFloat(product.price) || product.attributes?.price || product.price,
    description: product.description || product.attributes?.description,
    categoryId: product.menucategory_id || product.attributes?.menuCategoryId || product.categoryId,
    image: product.image || product.attributes?.image || product.image,
  };

  const handleAddToCart = async () => {
    if (!auth.isAuthenticated) {
      toast({
        title: 'يجب تسجيل الدخول',
        description: 'سجّل الدخول أولاً لإضافة منتجات للسلة',
        variant: 'destructive',
      });
      navigate('/login', { state: { redirect: window.location.pathname } });
      return;
    }
    try {
      await apiAddToCart(normalizedProduct.id, 1);
      toast({
        title: 'تم إضافة المنتج',
        description: `تم إضافة ${normalizedProduct.name} إلى عربة التسوق`,
      });
    } catch (error) {
      toast({
        title: 'خطأ في الإضافة',
        description: 'حدث خطأ أثناء إضافة المنتج للسلة',
        variant: 'destructive',
      });
    }
  };

  const imageUrl = getProductImage(product);

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img 
            src={imageUrl} 
            alt={normalizedProduct.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 group-hover:text-ladorf-600 transition-colors">
            {normalizedProduct.name}
          </h3>
          {normalizedProduct.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {normalizedProduct.description}
            </p>
          )}
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-lg font-bold bg-ladorf-100 text-ladorf-800">
              {normalizedProduct.price} جنيه
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-ladorf-600 hover:bg-ladorf-700 text-white"
          size="sm"
        >
          <Plus className="h-4 w-4 ml-2" />
          إضافة للعربة
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
