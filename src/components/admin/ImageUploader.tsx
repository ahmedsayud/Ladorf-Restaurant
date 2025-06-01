
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Link as LinkIcon, X, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  onImageSelect: (imageUrl: string) => void;
  currentImage?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, currentImage }) => {
  const [imageUrl, setImageUrl] = useState(currentImage || '');
  const [previewUrl, setPreviewUrl] = useState(currentImage || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // في التطبيق الحقيقي، هنا سيتم رفع الملف للخادم
      // الآن سنستخدم URL محلي للمعاينة
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);
      onImageSelect(localUrl);
      toast({
        title: "تم رفع الصورة",
        description: "تم رفع الصورة بنجاح",
      });
    }
  };

  const handleUrlSubmit = () => {
    if (imageUrl) {
      setPreviewUrl(imageUrl);
      onImageSelect(imageUrl);
      toast({
        title: "تم إضافة الصورة",
        description: "تم إضافة رابط الصورة بنجاح",
      });
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl('');
    setImageUrl('');
    onImageSelect('');
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
