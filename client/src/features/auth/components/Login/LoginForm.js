"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { PageHeader } from "@/shared/components/molecules";
import { Button, Input } from "@/shared/components/atoms";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function LoginForm() {
  const { login } = useAuth();

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

    await login(formData);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-12">

      <div className="relative hidden min-h-screen overflow-hidden lg:col-span-5 lg:block">
        <Image
          src="/images/login.jpg"
          alt="Giriş yap"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute bottom-10 left-10 max-w-md text-white">
          <div className="mb-4 inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur-md">
            👋 Tekrar hoş geldin
          </div>

          <h2 className="text-3xl font-bold leading-tight">
            Çalışma alanına kaldığın yerden devam et.
          </h2>

          <p className="mt-4 text-sm leading-6 text-white/80">
            Görevlerini, hedeflerini, notlarını ve dokümanlarını
            tek bir yerden yönet.
          </p>
        </div>
      </div>


      <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-6 py-12 lg:col-span-7">
        <div className="w-full max-w-lg">
          <PageHeader
            title="Hoş Geldiniz 👋"
            description="Hesabınıza giriş yaparak hedeflerinizi takip etmeye devam edin."
          />

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            <div className="relative">
              <Mail
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-posta adresiniz"
                disabled={login.isPending}
                required
                autoComplete="email"
                className="h-14 w-full rounded-2xl border border-gray-200 bg-white pl-14 pr-5 transition focus:border-[#555A8A]"
              />
            </div>


            <div className="relative">
              <Lock
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Şifreniz"
                disabled={login.isPending}
                required
                autoComplete="current-password"
                className="h-14 w-full rounded-2xl border border-gray-200 bg-white pl-14 pr-12 transition focus:border-[#555A8A]"
              />

              <button
                type="button"
                disabled={login.isPending}
                aria-label={
                  showPassword
                    ? "Şifreyi gizle"
                    : "Şifreyi göster"
                }
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#555A8A] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>


            <div className="flex items-center justify-between text-sm">
  

              <Link
                href="/forgot-password"
                className="font-medium text-[#555A8A] transition hover:text-[#7d78ce]"
              >
                Şifremi Unuttum?
              </Link>
            </div>


            <Button
              type="submit"
              disabled={login.isPending}
              text={
                login.isPending
                  ? "Giriş yapılıyor..."
                  : "Giriş Yap"
              }
              className="h-14 w-full rounded-2xl bg-[#555A8A] font-semibold text-white transition hover:bg-[#494e7a] disabled:cursor-not-allowed disabled:opacity-60"
            />

 
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>

              <div className="relative flex justify-center">
                <span className="bg-[#FAFAFA] px-4 text-sm text-gray-400">
                  veya
                </span>
              </div>
            </div>


            <button
              type="button"
              disabled={login.isPending}
              className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white font-medium text-gray-600 transition hover:border-[#7d78ce] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Image
                src="/images/google.svg"
                alt="Google"
                width={20}
                height={20}
              />

              Google ile giriş yap
            </button>


            <p className="pt-2 text-center text-sm text-gray-500">
              Hesabın yok mu?{" "}
              <Link
                href="/register"
                className="font-semibold text-[#555A8A] transition hover:text-[#7d78ce]"
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