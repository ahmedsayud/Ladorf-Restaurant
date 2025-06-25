import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ImageUploader from "./ImageUploader";
import axios from "axios";
import { BASE_URL } from '../api/ConfigApi';

const CategoryManager = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null as File | null,
  });
  const { toast } = useToast();
  const [categories, setCategories] = useState([]);

  // جلب التصنيفات عند تحميل المكون
  useEffect(() => {
    fetchCategories();
  }, []);

  // جلب التصنيفات
  const fetchCategories = () => {
    const token = localStorage.getItem("adminToken");
    axios
      .get(`${BASE_URL}/api/admin/menuCategories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch(() => {
        toast({
          title: "خطأ",
          description: "فشل في جلب التصنيفات",
          variant: "destructive",
        });
      });
  };

  // دالة مشتركة للتحقق من صحة البيانات
  const validateFormData = () => {
    if (!formData.name.trim()) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى إدخال اسم القسم",
        variant: "destructive",
      });
      return false;
    }

    const token = localStorage.getItem("adminToken");
    if (!token) {
      toast({
        title: "خطأ في المصادقة",
        description: "يرجى تسجيل الدخول مرة أخرى",
        variant: "destructive",
      });
      return false;
    }

    return token;
  };

  // دالة مشتركة لإنشاء FormData
  const createFormData = (isEdit = false) => {
    const data = new FormData();
    data.append("name", formData.name.trim());
    data.append("description", formData.description.trim());
    
    // إضافة الصورة إذا كانت موجودة
    if (formData.image && formData.image instanceof File) {
      data.append("image", formData.image);
    } else {
      // إذا كان تعديل والقسم له صورة حالية، نرسل إشارة للاحتفاظ بها
      if (isEdit && editingCategory?.attributes?.image) {
        data.append("keep_current_image", "true");
      } else if (isEdit) {
        data.append("remove_image", "true");
      }
    }

    return data;
  };

  // دالة مشتركة لمعالجة الأخطاء
  const handleError = (err, operation) => {
    let errorMessage = `حدث خطأ أثناء ${operation}`;
    if (err.response?.data?.message) {
      errorMessage = err.response.data.message;
    } else if (err.response?.status === 401) {
      errorMessage = "انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى";
    } else if (err.response?.status === 404) {
      errorMessage = "القسم غير موجود";
    } else if (err.response?.status === 409) {
      errorMessage = "اسم القسم موجود مسبقاً";
    }

    toast({
      title: `خطأ في ${operation}`,
      description: errorMessage,
      variant: "destructive",
    });
  };

  // دالة إضافة قسم جديد
  const handleAddCategory = () => {
    const token = validateFormData();
    if (!token) return;

    const url = `${BASE_URL}/api/admin/menuCategories`;
    const data = createFormData(false);

    // إرسال الطلب
    axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast({
          title: "تمت الإضافة بنجاح",
          description: `تم إضافة القسم "${formData.name}" بنجاح`,
        });
        
        // إضافة القسم الجديد للقائمة
        setCategories((prev) => [...prev, res.data.data]);

        // تصفير البيانات
        setFormData({ name: "", description: "", image: null });
        setIsAddDialogOpen(false);
      })
      .catch((err) => handleError(err, "الإضافة"));
  };

  // دالة تعديل القسم
  const handleEditCategory = () => {
    if (!editingCategory) {
      toast({
        title: "خطأ",
        description: "لم يتم تحديد القسم للتعديل",
        variant: "destructive",
      });
      return;
    }

    const token = validateFormData();
    if (!token) return;

    const data = createFormData(true);

    // إرسال الطلب
    axios
      .post(
        `${BASE_URL}/api/admin/menuCategories/${editingCategory.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        toast({
          title: "تم التعديل بنجاح",
          description: `تم تعديل القسم "${formData.name}" بنجاح`,
        });
        
        // تحديث البيانات في الجدول
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === editingCategory.id ? res.data.data : cat
          )
        );
        
        // إعادة التهيئة
        setFormData({ name: "", description: "", image: null });
        setIsEditDialogOpen(false);
        setEditingCategory(null);
      })
      .catch((err) => handleError(err, "التعديل"));
  };

  // للحذف
  const handleDeleteCategory = (categoryId) => {
    const token = localStorage.getItem("adminToken");
    const url = `${BASE_URL}/api/admin/menuCategories/${categoryId}`;

    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        toast({
          title: "تم حذف القسم",
          description: "تم حذف القسم بنجاح",
        });

        // تحديث القائمة بعد الحذف
        setCategories((prev) =>
          prev.filter((category) => category.id !== categoryId)
        );
      })
      .catch((err) => {
        toast({
          title: "خطأ في الحذف",
          description: "فشل حذف القسم",
          variant: "destructive",
        });
      });
  };

  // فتح نافذة التعديل
  const openEditDialog = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.attributes.name,
      description: category.attributes.description || "",
      image: null, // سنعرض الصورة الحالية في ImageUploader
    });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">الأقسام</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-ladorf-600 hover:bg-ladorf-700">
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
                <Label htmlFor="add-name">اسم القسم</Label>
                <Input
                  id="add-name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="أدخل اسم القسم"
                />
              </div>
              <div>
                <Label htmlFor="add-description">الوصف</Label>
                <Input
                  id="add-description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="أدخل وصف القسم"
                />
              </div>
              <div>
                <Label>صورة القسم</Label>
                <ImageUploader
                  onImageSelect={(file) => {
                    setFormData({ ...formData, image: file });
                  }}
                  currentImage={null}
                />
              </div>
              <Button
                onClick={() => {
                  handleAddCategory();
                }}
                className="w-full bg-ladorf-600 hover:bg-ladorf-700"
              >
                إضافة القسم
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* جدول الأقسام */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الصورة</TableHead>
                <TableHead>الاسم</TableHead>
                <TableHead>الوصف</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="w-12 h-12 bg-ladorf-100 rounded flex items-center justify-center">
                      {(category.image_url || category.image || category.attributes?.image_url || category.attributes?.image) ? (
                        <img
                          src={category.image_url || category.image || category.attributes?.image_url || category.attributes?.image}
                          alt={category.attributes.name}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : null}
                    </div>
                  </TableCell>
                  <TableCell>{category.attributes.name}</TableCell>
                  <TableCell>
                    {category.attributes.description || "لا يوجد وصف"}
                  </TableCell>
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

      {/* نافذة التعديل */}
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
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="أدخل اسم القسم"
              />
            </div>
            <div>
              <Label htmlFor="edit-description">الوصف</Label>
              <Input
                id="edit-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="أدخل وصف القسم"
              />
            </div>
            <div>
              <Label>صورة القسم</Label>
              <ImageUploader
                onImageSelect={(file) => {
                  setFormData({ ...formData, image: file });
                }}
                currentImage={editingCategory?.attributes?.image || null}
              />
            </div>
            <Button
              onClick={() => {
                handleEditCategory();
              }}
              className="w-full bg-ladorf-600 hover:bg-ladorf-700"
            >
              حفظ التعديلات
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CategoryManager;
