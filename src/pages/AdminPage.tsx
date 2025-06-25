import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategoryManager from "@/components/admin/CategoryManager";
import ProductManager from "@/components/admin/ProductManager";
import AdminAuth from "@/components/admin/AdminAuth";
import { Shield, LogOut } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import OrderManager from '@/components/admin/OrderManager';
import { BASE_URL } from '../components/api/ConfigApi';

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);

    const token = localStorage.getItem("adminToken");
    axios
      .post(`${BASE_URL}/api/admin/logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        localStorage.removeItem("adminToken");
        toast.success("تم تسجيل الخروج بنجاح");
        navigate("/");
      })
      .catch(() => {
        toast.error("فشل تسجيل الخروج");
      });
  };

  // إذا لم يتم التحقق من كلمة السر، اعرض شاشة تسجيل الدخول
  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-ladorf-600" />
              <h1 className="text-3xl md:text-4xl font-bold font-amiri text-ladorf-600">
                لوحة التحكم
              </h1>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="mr-4 text-ladorf-600 border-ladorf-600 hover:bg-ladorf-300"
              >
                <LogOut className="h-4 w-4 ml-2" />
                خروج
              </Button>
            </div>
            <p className="text-gray-600">إدارة الأقسام والمنتجات</p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <Tabs defaultValue="categories" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="categories" className="text-lg">
                    إدارة الأقسام
                  </TabsTrigger>
                  <TabsTrigger value="products" className="text-lg">
                    إدارة المنتجات
                  </TabsTrigger>
                  <TabsTrigger value="orders" className="text-lg">
                    إدارة الطلبات
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="categories">
                  <CategoryManager />
                </TabsContent>

                <TabsContent value="products">
                  <ProductManager />
                </TabsContent>

                <TabsContent value="orders">
                  <OrderManager />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdminPage;
