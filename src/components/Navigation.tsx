import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { categories } from '@/data/restaurantData';
import { useAuth } from '@/contexts/AuthContext';
import { getCart } from '@/components/api/CartApi';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getItemCount } = useCart();
  const location = useLocation();
  const itemCount = getItemCount();
  const auth = useAuth();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await getCart();
        const items = response.data.cart || [];
        const count = items.reduce((sum, item) => sum + Number(item.quantity), 0);
        setCartCount(count);
      } catch {
        setCartCount(0);
      }
    };
    fetchCartCount();
    const interval = setInterval(fetchCartCount, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold font-amiri text-ladorf-800">لادورف</div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8 space-x-reverse">
            <Link 
              to="/" 
              className={`hover:text-ladorf-800 transition-colors ${location.pathname === '/' ? 'text-ladorf-800 font-semibold' : ''}`}
            >
              الرئيسية
            </Link>
            <Link 
              to="/about" 
              className={`hover:text-ladorf-800 transition-colors ${location.pathname === '/about' ? 'text-ladorf-800 font-semibold' : ''}`}
            >
              من نحن
            </Link>
            {/* {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className={`hover:text-ladorf-800 transition-colors ${location.pathname === `/category/${category.id}` ? 'text-ladorf-800 font-semibold' : ''}`}
              >
                {category.name}
              </Link>
            ))} */}
            <Link 
              to="/admin" 
              className={`hover:text-ladorf-800 transition-colors ${location.pathname === '/admin' ? 'text-ladorf-800 font-semibold' : ''}`}
            >
              لوحة التحكم
            </Link>
          </div>

          {/* Cart & Mobile Menu Button */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link to="/cart">
              <Button variant="outline" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
            {/* Auth Buttons */}
            {!auth.isAuthenticated ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">تسجيل الدخول</Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="sm">إنشاء حساب</Button>
                </Link>
              </>
            ) : (
              <>
                <span className="mx-2 text-ladorf-800 font-bold">{auth.user?.name}</span>
                <Button variant="destructive" size="sm" onClick={() => { auth.logout(); navigate('/'); }}>
                  تسجيل الخروج
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t bg-white">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`block py-2 px-4 hover:bg-orange-50 rounded ${location.pathname === '/' ? 'text-ladorf-800 font-semibold bg-orange-50' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                الرئيسية
              </Link>
              <Link 
                to="/about" 
                className={`block py-2 px-4 hover:bg-orange-50 rounded ${location.pathname === '/about' ? 'text-ladorf-800 font-semibold bg-orange-50' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                من نحن
              </Link>
              {/* {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className={`block py-2 px-4 hover:bg-orange-50 rounded ${location.pathname === `/category/${category.id}` ? 'text-ladorf-800 font-semibold bg-orange-50' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))} */}
              <Link 
                to="/admin" 
                className={`block py-2 px-4 hover:bg-orange-50 rounded ${location.pathname === '/admin' ? 'text-ladorf-800 font-semibold bg-orange-50' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                لوحة التحكم
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
