
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();
  const { toast } = useToast();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
    toast({
      title: "تم حذف المنتج",
      description: "تم حذف المنتج من عربة التسوق",
    });
  };

  const handleSubmitOrder = () => {
    if (!customerInfo.name || !customerInfo.phone) {
      toast({
        title: "معلومات مطلوبة",
        description: "الرجاء إدخال الاسم ورقم الهاتف",
        variant: "destructive"
      });
      return;
    }

    const orderDetails = {
      items,
      total,
      customerInfo,
      timestamp: new Date().toLocaleString('ar-EG')
    };

    console.log('Order submitted:', orderDetails);
    
    toast({
      title: "تم إرسال الطلب بنجاح",
      description: "سيتم التواصل معك قريباً لتأكيد الطلب",
    });

    clearCart();
    setCustomerInfo({ name: '', phone: '', address: '' });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-800 mb-4">عربة التسوق فارغة</h1>
            <p className="text-gray-600 mb-8">لم تقم بإضافة أي منتجات بعد</p>
            <Link to="/">
              <Button className="bg-orange-600 hover:bg-orange-700">
                تصفح المنتجات
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 font-amiri">عربة التسوق</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>منتجاتك ({items.length})</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 ml-2" />
                    إفراغ العربة
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600">{item.price} جنيه</p>
                    </div>
                    
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      
                      <span className="font-semibold w-8 text-center">{item.quantity}</span>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="text-left ml-4">
                      <span className="font-bold">{item.price * item.quantity} جنيه</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Customer Info */}
          <div className="space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>معلومات العميل</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">الاسم *</Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="أدخل اسمك"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">رقم الهاتف *</Label>
                  <Input
                    id="phone"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="01234567890"
                    dir="ltr"
                  />
                </div>
                
                <div>
                  <Label htmlFor="address">العنوان (اختياري)</Label>
                  <Input
                    id="address"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="أدخل عنوانك"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span>المجموع الفرعي:</span>
                  <span>{total} جنيه</span>
                </div>
                
                <div className="flex justify-between text-lg">
                  <span>رسوم التوصيل:</span>
                  <span>مجاناً</span>
                </div>
                
                <hr />
                
                <div className="flex justify-between text-xl font-bold">
                  <span>المجموع الكلي:</span>
                  <span className="text-orange-600">{total} جنيه</span>
                </div>
                
                <Button 
                  onClick={handleSubmitOrder}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-lg py-3"
                >
                  تأكيد الطلب
                </Button>
                
                <p className="text-sm text-gray-600 text-center">
                  سيتم التواصل معك عبر الهاتف لتأكيد الطلب
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
