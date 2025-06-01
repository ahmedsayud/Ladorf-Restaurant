
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Image } from 'lucide-react';
import { categories } from '@/data/restaurantData';
import { useToast } from '@/hooks/use-toast';
import ImageUploader from './ImageUploader';

const CategoryManager = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: ''
  });
  const { toast } = useToast();

  const handleAddCategory = () => {
    // في التطبيق الحقيقي، هنا سيتم إرسال البيانات للخادم
    toast({
      title: "تم إضافة القسم",
      description: `تم إضافة قسم "${formData.name}" بنجاح`,
    });
    setFormData({ name: '', description: '', image: '' });
    setIsAddDialogOpen(false);
  };

  const handleEditCategory = () => {
    toast({
      title: "تم تحديث القسم",
      description: `تم تحديث قسم "${formData.name}" بنجاح`,
    });
    setFormData({ name: '', description: '', image: '' });
    setIsEditDialogOpen(false);
    setEditingCategory(null);
  };

  const handleDeleteCategory = (categoryId) => {
    toast({
      title: "تم حذف القسم",
      description: "تم حذف القسم بنجاح",
    });
  };

  const openEditDialog = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      image: category.image || ''
    });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">الأقسام</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4 ml-2" />
              إضافة قسم جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>إضافة قسم جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">اسم القسم</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="أدخل اسم القسم"
                />
              </div>
              <div>
                <Label htmlFor="description">الوصف</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="أدخل وصف القسم"
                />
              </div>
              <div>
                <Label>صورة القسم</Label>
                <ImageUploader 
                  onImageSelect={(imageUrl) => setFormData({ ...formData, image: imageUrl })}
                  currentImage={formData.image}
                />
              </div>
              <Button onClick={handleAddCategory} className="w-full bg-orange-600 hover:bg-orange-700">
                إضافة القسم
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الصورة</TableHead>
                <TableHead>اسم القسم</TableHead>
                <TableHead>الوصف</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="w-12 h-12 bg-orange-100 rounded flex items-center justify-center">
                      {category.image ? (
                        <img src={category.image} alt={category.name} className="w-full h-full object-cover rounded" />
                      ) : (
                        <Image className="h-6 w-6 text-orange-600" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.description || 'لا يوجد وصف'}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openEditDialog(category)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteCategory(category.id)}
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

      {/* Dialog لتعديل القسم */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>تعديل القسم</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">اسم القسم</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="أدخل اسم القسم"
              />
            </div>
            <div>
              <Label htmlFor="edit-description">الوصف</Label>
              <Input
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="أدخل وصف القسم"
              />
            </div>
            <div>
              <Label>صورة القسم</Label>
              <ImageUploader 
                onImageSelect={(imageUrl) => setFormData({ ...formData, image: imageUrl })}
                currentImage={formData.image}
              />
            </div>
            <Button onClick={handleEditCategory} className="w-full bg-orange-600 hover:bg-orange-700">
              حفظ التعديلات
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryManager;
