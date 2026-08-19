"use client";

import Link from "next/link";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { PageHeader } from "@/shared/components/molecules";
import { Button, Input } from "@/shared/components/atoms";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function LoginForm() {
  const router = useRouter();

  const { login, loginLoading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await login(formData);

    if (response?.success) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-12">
      <div className="relative hidden lg:col-span-6 lg:block">
        <Image
          src="/images/login.jpg"
          alt="login"
          fill
          priority
          sizes="50vw"
          className="object-contain object-left"
        />
      </div>

      <div className="flex items-center justify-center bg-[#FAFAFA] lg:col-span-6">
        <div className="w-full max-w-lg">
          <PageHeader
            title="Hoş Geldiniz 👋"
            description="Hesabınıza giriş yaparak hedeflerinizi takip etmeye devam edin."
          />

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >
            <div className="relative">
              <Mail
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-posta adresiniz"
                disabled={loginLoading}
                className="h-14 w-full rounded-2xl border border-gray-200 pl-14 pr-14"
              />
            </div>

            <div className="relative">
              <Lock
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Şifreniz"
                disabled={loginLoading}
                className="h-14 w-full rounded-2xl border border-gray-200 pl-14 pr-14"
              />

              <button
                type="button"
                disabled={loginLoading}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#555A8A]"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-500">
                <Input
                  type="checkbox"
                  disabled={loginLoading}
                  className="h-4 w-4 accent-purple-600"
                />
                Beni Hatırla
              </label>

              <Link
                href="/forgot-password"
                className="font-medium text-[#555A8A]"
              >
                Şifremi Unuttum?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={loginLoading}
              text={loginLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
              className="w-full text-white"
            />

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t text-gray-300" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-[#FAFAFA] px-4 text-sm text-gray-400">
                  veya
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled={loginLoading}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 text-gray-500 hover:border-[rgb(125,120,206)]"
            >
              <Image
                src="/images/google.svg"
                alt="Google"
                width={20}
                height={20}
              />
              Google ile giriş yap
            </button>

            <p className="text-center text-gray-500">
              Hesabın yok mu?{" "}
              <Link
                href="/register"
                className="font-semibold text-[#555A8A] hover:text-gray-500"
              >
                Kayıt Ol
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}