
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CategoryManager from '@/components/admin/CategoryManager';
import ProductManager from '@/components/admin/ProductManager';
import { Shield } from 'lucide-react';

const AdminPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-orange-600" />
              <h1 className="text-3xl md:text-4xl font-bold font-amiri text-orange-600">
                لوحة التحكم
              </h1>
            </div>
            <p className="text-gray-600">إدارة الأقسام والمنتجات</p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <Tabs defaultValue="categories" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="categories" className="text-lg">إدارة الأقسام</TabsTrigger>
                  <TabsTrigger value="products" className="text-lg">إدارة المنتجات</TabsTrigger>
                </TabsList>
                
                <TabsContent value="categories">
                  <CategoryManager />
                </TabsContent>
                
                <TabsContent value="products">
                  <ProductManager />
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
