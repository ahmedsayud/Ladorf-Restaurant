import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getCart, updateCartItem, deleteCartItem, placeOrder } from '@/components/api/CartApi';

const CartPage = () => {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();
  const { toast } = useToast();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [orderNotes, setOrderNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [discount, setDiscount] = useState(0);

  // دالة polling لجلب السلة عدة مرات بعد التعديل أو الحذف
  const refetchCartWithPolling = (retries = 3, delay = 700) => {
    let count = 0;
    const poll = () => {
      fetchCart();
      count++;
      if (count < retries) {
        setTimeout(poll, delay);
      }
    };
    poll();
  };

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      await handleRemoveItem(cartItemId);
      return;
    }
    // تحديث سريع للواجهة
    setCartItems(prev =>
      prev.map(item =>
        item.item_id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
    setCartTotal(
      cartItems.reduce(
        (sum, item) =>
          sum +
          (item.item_id === cartItemId
            ? Number(item.price) * newQuantity
            : Number(item.price) * Number(item.quantity)),
        0
      )
    );
    try {
      await updateCartItem(cartItemId, newQuantity);
      setTimeout(fetchCart, 700); // جلب السلة بعد العملية للتأكد
      toast({ title: 'تم تحديث الكمية بنجاح' });
    } catch (error) {
      // setTimeout(fetchCart, 700);
      if (error?.response?.status >= 400) {
        toast({ title: 'خطأ في تحديث الكمية', variant: 'destructive' });
      }
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    // تحديث سريع للواجهة
    setCartItems(prev => prev.filter(item => item.item_id !== cartItemId));
    setCartTotal(
      cartItems
        .filter(item => item.item_id !== cartItemId)
        .reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0)
    );
    try {
      await deleteCartItem(cartItemId);
      setTimeout(fetchCart, 700);
      toast({ title: 'تم حذف المنتج من السلة' });
    } catch (error) {
      // setTimeout(fetchCart, 700);
      if (error?.response?.status >= 400) {
        toast({ title: 'خطأ في حذف المنتج', variant: 'destructive' });
      }
    }
  };

  const handlePlaceOrder = async () => {
    try {
      await placeOrder({ shipping_address: customerInfo.address });
      toast({ title: 'تم إرسال الطلب بنجاح!' });
      clearCart();
      navigate('/'); // يمكنك تغييره لصفحة شكر
    } catch (error) {
      toast({ title: 'حدث خطأ أثناء إرسال الطلب', variant: 'destructive' });
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await getCart();
        const items = response.data.cart || [];
        const total = items.reduce((sum, item) => sum + Number(item.total_price || (item.price * item.quantity)), 0);
        setCartItems(items);
        setCartTotal(total);
      } catch (error) {
        setCartItems([]);
        setCartTotal(0);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
      0
    );
    setCartTotal(total);
  }, [cartItems]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>جاري تحميل السلة...</span>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-800 mb-4">عربة التسوق فارغة</h1>
            <p className="text-gray-600 mb-8">لم تقم بإضافة أي منتجات بعد</p>
            <Link to="/">
              <Button className="bg-ladorf-600 hover:bg-ladorf-800">
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
                  <span>منتجاتك ({cartItems.length})</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={clearCart}
                    className=""
                  >
                    <Trash2 className="h-4 w-4 ml-2" />
                    إفراغ العربة
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.item?.name || 'منتج بدون اسم'}</h3>
                      <p className="text-gray-600">{item.price} جنيه</p>
                    </div>
                    
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.item_id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      
                      <span className="font-semibold w-8 text-center">{item.quantity}</span>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.item_id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveItem(item.item_id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="text-left mr-4">
                      <span className="font-bold">{Number(item.price) * Number(item.quantity)} جنيه</span>
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
                    placeholder="01020565509"
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
                  <span>{cartTotal} جنيه</span>
                </div>
                
                <div className="flex justify-between text-lg">
                  <span>رسوم التوصيل:</span>
                  <span>مجاناً</span>
                </div>
                
                <hr />
                
                <div className="flex justify-between text-xl font-bold">
                  <span>المجموع الكلي:</span>
                  <span >{cartTotal} جنيه</span>
                </div>
                <Button
                  className="w-full bg-ladorf-600 hover:bg-ladorf-700 text-white mt-4"
                  onClick={handlePlaceOrder}
                >
                  تأكيد الطلب
                </Button>
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
