import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { BASE_URL } from '@/components/api/ConfigApi';
// import { useAuth } from '@/contexts/AuthContext'; // Will be created next

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  // const auth = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // This is a placeholder for the actual API call
      // const response = await axios.post(`${BASE_URL}/api/user/register`, { name, mobile, password, address });
      // auth.login(response.data.token, response.data.user);
      
      toast({ title: "تم إنشاء الحساب وتسجيل الدخول بنجاح!" });
      navigate('/');

    } catch (error) {
      toast({
        title: "خطأ في إنشاء الحساب",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">إنشاء حساب جديد</CardTitle>
          <CardDescription>
            املأ البيانات التالية للانضمام إلينا.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">الاسم</Label>
              <Input id="name" type="text" placeholder="اسمك الكامل" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mobile">رقم الموبايل</Label>
              <Input id="mobile" type="tel" placeholder="01xxxxxxxxx" required value={mobile} onChange={(e) => setMobile(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">العنوان</Label>
              <Input id="address" type="text" placeholder="عنوانك بالتفصيل" required value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "جاري الإنشاء..." : "إنشاء حساب"}
            </Button>
            <p className="mt-4 text-xs text-center text-gray-700">
              لديك حساب بالفعل؟{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                سجل الدخول
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage; 