import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Link as LinkIcon, X, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  onImageSelect: (file: File | null) => void;
  currentImage?: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, currentImage }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState(currentImage || '');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCurrentImage, setIsCurrentImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // عند تغيير currentImage، تحديث المعاينة
  useEffect(() => {
    if (currentImage) {
      setPreviewUrl(currentImage);
      setIsCurrentImage(true);
      // لا نرسل onImageSelect هنا لأن الصورة الحالية ليست ملف File
    } else {
      setPreviewUrl('');
      setIsCurrentImage(false);
      setSelectedFile(null);
    }
  }, [currentImage]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // التحقق من نوع الملف
      if (!file.type.startsWith('image/')) {
        toast({
          title: "خطأ في نوع الملف",
          description: "يرجى اختيار ملف صورة صحيح",
          variant: "destructive",
        });
        return;
      }

      // التحقق من حجم الملف (5MB كحد أقصى)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "خطأ في حجم الملف",
          description: "حجم الملف يجب أن يكون أقل من 5MB",
          variant: "destructive",
        });
        return;
      }

      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);
      setSelectedFile(file);
      setIsCurrentImage(false);
      
      onImageSelect(file);
      
      toast({
        title: "تم رفع الصورة",
        description: "تم رفع الصورة بنجاح",
      });
    }
  };

  const handleUrlSubmit = async () => {
    if (imageUrl) {
      try {
        // تحويل URL إلى ملف
        const response = await fetch(imageUrl);
        if (!response.ok) {
          throw new Error('فشل في تحميل الصورة');
        }
        
        const blob = await response.blob();
        const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
        
        setPreviewUrl(imageUrl);
        setSelectedFile(file);
        setIsCurrentImage(false);
        
        onImageSelect(file);
        
        toast({
          title: "تم إضافة الصورة",
          description: "تم إضافة رابط الصورة بنجاح",
        });
      } catch (error) {
        toast({
          title: "خطأ في تحميل الصورة",
          description: "فشل في تحميل الصورة من الرابط المحدد",
          variant: "destructive",
        });
      }
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl('');
    setImageUrl('');
    setSelectedFile(null);
    setIsCurrentImage(false);
    
    onImageSelect(null);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        {previewUrl ? (
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={previewUrl} 
                alt="معاينة الصورة" 
                className="w-full h-48 object-cover rounded-lg border"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {selectedFile && (
              <div className="text-sm text-gray-600">
                <p>اسم الملف: {selectedFile.name}</p>
                <p>الحجم: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                <p>النوع: {selectedFile.type}</p>
              </div>
            )}
            {isCurrentImage && (
              <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                <p>📷 الصورة الحالية للقسم</p>
                <p>لحفظ الصورة الحالية، اضغط "حفظ التعديلات" بدون تغيير الصورة</p>
              </div>
            )}
          </div>
        ) : (
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">رفع من الجهاز</TabsTrigger>
              <TabsTrigger value="url">رابط من الإنترنت</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Image className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">اختر صورة من جهازك</p>
                <p className="text-sm text-gray-500 mb-4">الحد الأقصى: 5MB</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                  className="mx-auto"
                >
                  <Upload className="h-4 w-4 ml-2" />
                  اختيار صورة
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="url" className="space-y-4">
              <div>
                <Label htmlFor="image-url">رابط الصورة</Label>
                <Input
                  id="image-url"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
              <Button 
                onClick={handleUrlSubmit} 
                disabled={!imageUrl}
                className="w-full"
              >
                <LinkIcon className="h-4 w-4 ml-2" />
                إضافة الصورة
              </Button>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageUploader;
