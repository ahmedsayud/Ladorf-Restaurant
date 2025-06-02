
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';

interface AdminAuthProps {
  onAuthenticated: () => void;
}

const AdminAuth = ({ onAuthenticated }: AdminAuthProps) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // كلمة السر الافتراضية - يمكن تغييرها هنا
  const ADMIN_PASSWORD = 'admin123';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // محاكاة تحقق من كلمة السر
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        toast.success('تم تسجيل الدخول بنجاح');
        onAuthenticated();
      } else {
        toast.error('كلمة السر غير صحيحة');
        setPassword('');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ladorf-50 to-ladorf-100 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lock className="h-8 w-8 text-ladorf-600" />
            <CardTitle className="text-2xl font-bold font-amiri text-ladorf-600">
              دخول لوحة التحكم
            </CardTitle>
          </div>
          <p className="text-gray-600">يرجى إدخال كلمة السر للمتابعة</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">كلمة السر</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="أدخل كلمة السر"
                required
                className="text-right"
                disabled={isLoading}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-ladorf-600 hover:bg-ladorf-700"
              disabled={isLoading}
            >
              {isLoading ? 'جاري التحقق...' : 'دخول'}
            </Button>
          </form>
          <div className="mt-4 p-3 bg-gray-100 rounded text-sm text-gray-600 text-center">
            <strong>ملاحظة:</strong> كلمة السر الافتراضية هي: admin123
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAuth;
