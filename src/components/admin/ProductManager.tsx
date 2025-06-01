
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Image } from 'lucide-react';
import { categories, products } from '@/data/restaurantData';
import { useToast } from '@/hooks/use-toast';
import ImageUploader from './ImageUploader';

const ProductManager = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    categoryId: '',
    image: ''
  });
  const { toast } = useToast();

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.categoryId === selectedCategory);

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'غير محدد';
  };

  const handleAddProduct = () => {
    toast({
      title: "تم إضافة المنتج",
      description: `تم إضافة منتج "${formData.name}" بنجاح`,
    });
    setFormData({ name: '', description: '', price: '', categoryId: '', image: '' });
    setIsAddDialogOpen(false);
  };

  const handleEditProduct = () => {
    toast({
      title: "تم تحديث المنتج",
      description: `تم تحديث منتج "${formData.name}" بنجاح`,
    });
    setFormData({ name: '', description: '', price: '', categoryId: '', image: '' });
    setIsEditDialogOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    toast({
      title: "تم حذف المنتج",
      description: "تم حذف المنتج بنجاح",
    });
  };

  const openEditDialog = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      categoryId: product.categoryId,
      image: product.image || ''
    });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-2xl font-bold">المنتجات</h2>
        <div className="flex gap-4 items-center">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="فلترة حسب القسم" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأقسام</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Plus className="h-4 w-4 ml-2" />
                إضافة منتج جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>إضافة منتج جديد</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="product-name">اسم المنتج</Label>
                  <Input
                    id="product-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="أدخل اسم المنتج"
                  />
                </div>
                <div>
                  <Label htmlFor="product-description">الوصف</Label>
                  <Input
                    id="product-description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="أدخل وصف المنتج"
                  />
                </div>
                <div>
                  <Label htmlFor="product-price">السعر</Label>
                  <Input
                    id="product-price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="أدخل سعر المنتج"
                  />
                </div>
                <div>
                  <Label>القسم</Label>
                  <Select value={formData.categoryId} onValueChange={(value) => setFormData({ ...formData, categoryId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر القسم" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>صورة المنتج</Label>
                  <ImageUploader 
                    onImageSelect={(imageUrl) => setFormData({ ...formData, image: imageUrl })}
                    currentImage={formData.image}
                  />
                </div>
                <Button onClick={handleAddProduct} className="w-full bg-orange-600 hover:bg-orange-700">
                  إضافة المنتج
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الصورة</TableHead>
                <TableHead>اسم المنتج</TableHead>
                <TableHead>القسم</TableHead>
                <TableHead>السعر</TableHead>
                <TableHead>الوصف</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="w-12 h-12 bg-orange-100 rounded flex items-center justify-center">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded" />
                      ) : (
                        <Image className="h-6 w-6 text-orange-600" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{getCategoryName(product.categoryId)}</TableCell>
                  <TableCell>{product.price} جنيه</TableCell>
                  <TableCell className="max-w-xs truncate">{product.description || 'لا يوجد وصف'}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openEditDialog(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog لتعديل المنتج */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>تعديل المنتج</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-product-name">اسم المنتج</Label>
              <Input
                id="edit-product-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="أدخل اسم المنتج"
              />
            </div>
            <div>
              <Label htmlFor="edit-product-description">الوصف</Label>
              <Input
                id="edit-product-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="أدخل وصف المنتج"
              />
            </div>
            <div>
              <Label htmlFor="edit-product-price">السعر</Label>
              <Input
                id="edit-product-price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="أدخل سعر المنتج"
              />
            </div>
            <div>
              <Label>القسم</Label>
              <Select value={formData.categoryId} onValueChange={(value) => setFormData({ ...formData, categoryId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر القسم" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>صورة المنتج</Label>
              <ImageUploader 
                onImageSelect={(imageUrl) => setFormData({ ...formData, image: imageUrl })}
                currentImage={formData.image}
              />
            </div>
            <Button onClick={handleEditProduct} className="w-full bg-orange-600 hover:bg-orange-700">
              حفظ التعديلات
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManager;
