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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Edit, Trash2, Image } from "lucide-react";
import { products } from "@/data/restaurantData";
import { useToast } from "@/hooks/use-toast";
import ImageUploader from "./ImageUploader";
import axios from "axios";
import { BASE_URL } from '../api/ConfigApi';

const ProductManager = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    type: "",
    categoryId: "",
    image: null as File | null,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

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
      .catch((err) => {
        toast({
          title: "خطأ",
          description: "فشل في جلب الأقسام",
          variant: "destructive",
        });
      });
  };

  const fetchProducts = () => {
    const token = localStorage.getItem("adminToken");
    axios
      .get(`${BASE_URL}/api/admin/items`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setItems(res.data.data);
      })
      .catch((err) => {
        toast({
          title: "خطأ",
          description: "فشل في جلب المنتجات",
          variant: "destructive",
        });
      });
  };

  const filteredProducts =
    selectedCategory === "all"
      ? items
      : items.filter((product) => product.attributes.menuCategoryId === selectedCategory);

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.attributes.name : "غير محدد";
  };

  const handleAddProduct = () => {
    if (!formData.name.trim()) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى إدخال اسم المنتج",
        variant: "destructive",
      });
      return;
    }

    if (!formData.categoryId) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى اختيار القسم",
        variant: "destructive",
      });
      return;
    }

    if (!formData.type.trim()) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى إدخال نوع المنتج",
        variant: "destructive",
      });
      return;
    }

    const token = localStorage.getItem("adminToken");
    if (!token) {
      toast({
        title: "خطأ في المصادقة",
        description: "يرجى تسجيل الدخول مرة أخرى",
        variant: "destructive",
      });
      return;
    }

    const url = `${BASE_URL}/api/admin/items`;
    const data = new FormData();
    data.append("name", formData.name.trim());
    data.append("description", formData.description.trim());
    data.append("price", formData.price);
    data.append("type", formData.type);
    data.append("category_id", formData.categoryId);
    
    if (formData.image && formData.image instanceof File) {
      data.append("image", formData.image);
    }

    axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setItems((prev) => [...prev, res.data.data]);
        setFormData({ name: "", description: "", price: "", type: "", categoryId: "", image: null });
        setIsAddDialogOpen(false);
      })
      .catch((err) => {
        let errorMessage = "حدث خطأ أثناء إضافة المنتج";
        if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.response?.status === 401) {
          errorMessage = "انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى";
        } else if (err.response?.status === 409) {
          errorMessage = "اسم المنتج موجود مسبقاً";
        }

        toast({
          title: "خطأ في الإضافة",
          description: errorMessage,
          variant: "destructive",
        });
      });
  };

  const handleEditProduct = () => {
    if (!editingProduct) {
      toast({
        title: "خطأ",
        description: "لم يتم تحديد المنتج للتعديل",
        variant: "destructive",
      });
      return;
    }

    if (!formData.name.trim()) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى إدخال اسم المنتج",
        variant: "destructive",
      });
      return;
    }

    if (!formData.type.trim()) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى إدخال نوع المنتج",
        variant: "destructive",
      });
      return;
    }

    const token = localStorage.getItem("adminToken");
    if (!token) {
      toast({
        title: "خطأ في المصادقة",
        description: "يرجى تسجيل الدخول مرة أخرى",
        variant: "destructive",
      });
      return;
    }

    const data = new FormData();
    data.append("name", formData.name.trim());
    data.append("description", formData.description.trim());
    data.append("price", formData.price);
    data.append("type", formData.type);
    data.append("category_id", formData.categoryId);
    
    if (formData.image && formData.image instanceof File) {
      data.append("image", formData.image);
    } else {
      if (editingProduct.attributes.image) {
        data.append("keep_current_image", "true");
      } else {
        data.append("remove_image", "true");
      }
    }

    axios
      .post(
        `${BASE_URL}/api/admin/items/${editingProduct.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setItems((prev) =>
          prev.map((item) =>
            item.id === editingProduct.id ? res.data.data : item
          )
        );
        setFormData({ name: "", description: "", price: "", type: "", categoryId: "", image: null });
        setIsEditDialogOpen(false);
        setEditingProduct(null);
      })
      .catch((err) => {
        let errorMessage = "حدث خطأ أثناء تعديل المنتج";
        if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.response?.status === 401) {
          errorMessage = "انتهت صلاحية الجلسة، يرجى تسجيل الدخول مرة أخرى";
        } else if (err.response?.status === 404) {
          errorMessage = "المنتج غير موجود";
        } else if (err.response?.status === 409) {
          errorMessage = "اسم المنتج موجود مسبقاً";
        }

        toast({
          title: "خطأ في التعديل",
          description: errorMessage,
          variant: "destructive",
        });
      });
  };

  const handleDeleteProduct = (productId) => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      toast({
        title: "خطأ في المصادقة",
        description: "يرجى تسجيل الدخول مرة أخرى",
        variant: "destructive",
      });
      return;
    }
    axios.delete(`${BASE_URL}/api/admin/items/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setItems(prev => prev.filter(item => item.id !== productId))
    })
    .catch(err => {
      toast({
        title: "خطأ",
        description: "فشل حذف المنتج",
        variant: "destructive",
      });
    })
  };

  const openEditDialog = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.attributes.name,
      description: product.attributes.description || "",
      price: product.attributes.price.toString(),
      type: product.attributes.type || "",
      categoryId: product.attributes.menuCategoryId,
      image: null,
    });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-2xl font-bold">المنتجات</h2>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <Label htmlFor="category-filter">تصفية حسب القسم:</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="جميع الأقسام" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأقسام</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.attributes.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-ladorf-600 hover:bg-ladorf-700">
                <Plus className="h-4 w-4 ml-2" />
                إضافة منتج جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>إضافة منتج جديد</DialogTitle>
              </DialogHeader>
              <ScrollArea className="max-h-[60vh] pr-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="product-name">اسم المنتج</Label>
                    <Input
                      id="product-name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="أدخل اسم المنتج"
                    />
                  </div>
                  <div>
                    <Label htmlFor="product-description">الوصف</Label>
                    <Input
                      id="product-description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="أدخل وصف المنتج"
                    />
                  </div>
                  <div>
                    <Label htmlFor="product-price">السعر</Label>
                    <Input
                      id="product-price"
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      placeholder="أدخل سعر المنتج"
                    />
                  </div>
                  <div>
                    <Label htmlFor="product-type">النوع (ساخن/بارد)</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع المنتج" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ساخن">ساخن</SelectItem>
                        <SelectItem value="بارد">بارد</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>القسم</Label>
                    <Select
                      value={formData.categoryId ? String(formData.categoryId) : ""}
                      onValueChange={(value) => {
                        setFormData({ ...formData, categoryId: value });
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر القسم" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={String(category.id)}>
                            {category.attributes.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>صورة المنتج</Label>
                    <ImageUploader
                      onImageSelect={(file) => {
                        setFormData({ ...formData, image: file });
                      }}
                      currentImage={null}
                    />
                  </div>
                </div>
              </ScrollArea>
              <Button
                onClick={handleAddProduct}
                className="w-full bg-ladorf-600 hover:bg-ladorf-700 mt-4"
              >
                إضافة المنتج
              </Button>
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
                <TableHead>النوع</TableHead>
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
                    <div className="w-12 h-12 bg-ladorf-100 rounded flex items-center justify-center">
                      {(product.image_url || product.image || product.attributes?.image_url || product.attributes?.image) ? (
                        <img
                          src={product.image_url || product.image || product.attributes?.image_url || product.attributes?.image}
                          alt={product.attributes.name}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : null}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {product.attributes.name}
                  </TableCell>
                  <TableCell>{product.attributes.type || 'N/A'}</TableCell>
                  <TableCell>
                    {product.relationship?.menuCategory?.name || "غير محدد"}
                  </TableCell>
                  <TableCell>{product.attributes.price} ج.م</TableCell>
                  <TableCell className="max-w-xs truncate">
                    {product.attributes.description || "لا يوجد وصف"}
                  </TableCell>
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>تعديل المنتج</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-product-name">اسم المنتج</Label>
                <Input
                  id="edit-product-name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="أدخل اسم المنتج"
                />
              </div>
              <div>
                <Label htmlFor="edit-product-description">الوصف</Label>
                <Input
                  id="edit-product-description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="أدخل وصف المنتج"
                />
              </div>
              <div>
                <Label htmlFor="edit-product-price">السعر</Label>
                <Input
                  id="edit-product-price"
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="أدخل سعر المنتج"
                />
              </div>
              <div>
                <Label htmlFor="edit-product-type">النوع (ساخن/بارد)</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع المنتج" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ساخن">ساخن</SelectItem>
                    <SelectItem value="بارد">بارد</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>القسم</Label>
                <Select
                  value={formData.categoryId ? String(formData.categoryId) : ""}
                  onValueChange={(value) => {
                    setFormData({ ...formData, categoryId: value });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر القسم" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={String(category.id)}>
                        {category.attributes.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>صورة المنتج</Label>
                <ImageUploader
                  onImageSelect={(file) => {
                    setFormData({ ...formData, image: file });
                  }}
                  currentImage={editingProduct?.attributes?.image || null}
                />
              </div>
            </div>
          </ScrollArea>
          <Button
            onClick={handleEditProduct}
            className="w-full bg-ladorf-600 hover:bg-ladorf-700 mt-4"
          >
            حفظ التعديلات
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManager;
