import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login } from '@/components/api/AuthApi';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const LoginPage = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await login(phone, password);
      auth.login(data.data.token, data.data.user);
      toast({ title: "تم تسجيل الدخول بنجاح!" });
      const redirectPath = location.state?.redirect || '/';
      navigate(redirectPath);

    } catch (error: any) {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: error?.message || "رقم الموبايل أو كلمة المرور غير صحيحة.",
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
          <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
          <CardDescription>
            أدخل رقم الموبايل وكلمة المرور للدخول إلى حسابك.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="phone">رقم الموبايل</Label>
              <Input id="phone" type="tel" placeholder="01xxxxxxxxx" required value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "جاري الدخول..." : "تسجيل الدخول"}
            </Button>
            <p className="mt-4 text-xs text-center text-gray-700">
              ليس لديك حساب؟{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                أنشئ حسابًا
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage; 