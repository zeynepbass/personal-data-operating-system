"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input, Button } from "@/shared/components/atoms";
import { PageHeader } from "@/shared/components/molecules";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function RegisterForm() {
  const router = useRouter();

  const { register, registerLoading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

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

    const response = await register(formData);

    if (response?.success) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-12">
      <div className="relative hidden lg:col-span-6 lg:block">
        <Image
          src="/images/login.jpg"
          alt="Kayıt ol"
          fill
          priority
          sizes="50vw"
          className="object-contain object-left"
        />
      </div>

      <div className="flex items-center justify-center bg-[#FAFAFA] lg:col-span-6">
        <div className="w-full max-w-lg">
          <PageHeader
            title="Aramıza Katılın 🚀"
            description="Hesabınızı oluşturarak notlarınızı düzenlemeye, öğrenme yolculuğunuzu takip etmeye ve tüm içeriklere erişmeye başlayın."
          />

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >

            <div className="relative">
              <User
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <Input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Adınız Soyadınız"
                required
                className="h-14 w-full rounded-2xl border border-gray-200 pl-14 pr-14"
              />
            </div>


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
                required
                className="h-14 w-full rounded-2xl border border-gray-200 pl-14 pr-14"
              />
            </div>


            <div className="flex gap-2">
              <div className="relative w-full">
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
                  required
                  minLength={6}
                  className="h-14 w-full rounded-2xl border border-gray-200 pl-14 pr-14"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#555A8A]"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              <div className="relative w-full">
                <Lock
                  size={20}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <Input
                  name="passwordAgain"
                  type={showPassword ? "text" : "password"}
                  value={formData.passwordAgain}
                  onChange={handleChange}
                  placeholder="Şifre Tekrar"
                  required
                  minLength={6}
                  className="h-14 w-full rounded-2xl border border-gray-200 pl-14 pr-14"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#555A8A]"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>


            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-500">
                <Input
                  type="checkbox"
                  className="h-4 w-4 accent-purple-600"
                />
                Beni Hatırla
              </label>
            </div>


            <Button
              type="submit"
              disabled={registerLoading}
              text={
                registerLoading
                  ? "Kayıt oluşturuluyor..."
                  : "Kayıt Ol"
              }
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
              Hesabın var mı?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#555A8A] hover:text-gray-500"
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