
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import { Product } from '@/types/restaurant';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const getProductImage = (categoryId: string, productName: string): string => {
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
  
  return categoryImages[categoryId] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop';
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: "تم إضافة المنتج",
      description: `تم إضافة ${product.name} إلى عربة التسوق`,
    });
  };

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 hover:border-ladorf-600">
      <CardContent className="p-0">
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img 
            src={getProductImage(product.categoryId, product.name)} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 group-hover:text-ladorf-600 transition-colors">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-gray-600 text-sm mb-3">{product.description}</p>
          )}
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-lg font-bold bg-ladorf-100 text-ladorf-800">
              {product.price} جنيه
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
