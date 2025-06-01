
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/restaurant';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

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
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="h-48 bg-gradient-to-br from-orange-100 to-red-100 rounded-t-lg flex items-center justify-center">
          <div className="text-6xl opacity-20">🍽️</div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 group-hover:text-orange-600 transition-colors">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-gray-600 text-sm mb-3">{product.description}</p>
          )}
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-lg font-bold bg-orange-100 text-orange-700">
              {product.price} جنيه
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white"
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
