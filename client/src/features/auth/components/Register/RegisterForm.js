"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User
} from "lucide-react";
import { useState } from "react";

import { Input, Button } from "@/shared/components/atoms";
import { PageHeader } from "@/shared/components/molecules";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function RegisterForm() {
  const { register, registerLoading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    passwordAgain: "",
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

    await register(formData);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-12">

      <div className="relative hidden min-h-screen overflow-hidden lg:col-span-5 lg:block">
        <Image
          src="/images/login.jpg"
          alt="Hesap oluştur"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute bottom-10 left-10 max-w-md text-white">
          <div className="mb-4 inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur-md">
            🚀 Kişisel çalışma alanına katıl
          </div>

          <h2 className="text-3xl font-bold leading-tight">
            Öğren, organize ol ve hedeflerine ulaş.
          </h2>

          <p className="mt-4 text-sm leading-6 text-white/80">
            Notlarını, görevlerini, hedeflerini ve dokümanlarını
            tek bir yerde yönet.
          </p>
        </div>
      </div>


      <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-6 py-12 lg:col-span-7">
        <div className="w-full max-w-lg">
          <PageHeader
            title="Aramıza Katılın 🚀"
            description="Hesabınızı oluşturarak kişisel çalışma alanınıza erişmeye başlayın."
          />

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            <div className="relative">
              <User
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <Input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Adınız Soyadınız"
                required
                autoComplete="name"
                className="h-14 w-full rounded-2xl border border-gray-200 bg-white pl-14 pr-5 transition focus:border-[#555A8A]"
              />
            </div>


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
                required
                autoComplete="email"
                className="h-14 w-full rounded-2xl border border-gray-200 bg-white pl-14 pr-5 transition focus:border-[#555A8A]"
              />
            </div>


            <div className="grid gap-4 sm:grid-cols-2">

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
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="h-14 w-full rounded-2xl border border-gray-200 bg-white pl-14 pr-12 transition focus:border-[#555A8A]"
                />

                <button
                  type="button"
                  aria-label={
                    showPassword
                      ? "Şifreyi gizle"
                      : "Şifreyi göster"
                  }
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#555A8A]"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>


              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <Input
                  name="passwordAgain"
                  type={
                    showPasswordAgain
                      ? "text"
                      : "password"
                  }
                  value={formData.passwordAgain}
                  onChange={handleChange}
                  placeholder="Şifre Tekrar"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="h-14 w-full rounded-2xl border border-gray-200 bg-white pl-14 pr-12 transition focus:border-[#555A8A]"
                />

                <button
                  type="button"
                  aria-label={
                    showPasswordAgain
                      ? "Şifreyi gizle"
                      : "Şifreyi göster"
                  }
                  onClick={() =>
                    setShowPasswordAgain(
                      (prev) => !prev
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#555A8A]"
                >
                  {showPasswordAgain ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>


            <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-500">
              <Input
                type="checkbox"
                className="h-4 w-4 rounded accent-purple-600"
              />

              <span>
                Beni Hatırla
              </span>
            </label>


            <Button
              type="submit"
              disabled={registerLoading}
              text={
                registerLoading
                  ? "Kayıt oluşturuluyor..."
                  : "Kayıt Ol"
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
              className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white font-medium text-gray-600 transition hover:border-[#7d78ce] hover:bg-gray-50"
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
              Hesabın var mı?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#555A8A] transition hover:text-[#7d78ce]"
              >
                Giriş Yap
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}