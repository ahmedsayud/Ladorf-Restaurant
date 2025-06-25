import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { BASE_URL } from '../api/ConfigApi';

interface AdminAuthProps {
  onAuthenticated: () => void;
}

const AdminAuth = ({ onAuthenticated }: AdminAuthProps) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    axios
      .post(`${BASE_URL}/api/admin/login`, { email, password })

      .then((res) => {
        localStorage.setItem("adminToken", res.data.data.token);
        toast.success("تم تسجيل الدخول بنجاح");
        onAuthenticated();
      })
      .catch((err) => {
        toast.error("كلمة السر غير صحيحة");
        setPassword("");
      });
  }
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
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">الايميل</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="أدخل الايميل"
                required
                className="text-right"
                disabled={isLoading}
              />
            </div>

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
              {isLoading ? "جاري التحقق..." : "دخول"}
            </Button>
          </form>
          
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAuth;
