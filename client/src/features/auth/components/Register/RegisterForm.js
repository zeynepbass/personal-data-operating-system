"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/shared/api";
import {Input,Button} from "@/shared/components/atoms";
import { PageHeader } from "@/shared/components/molecules";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await apiClient.post("/auth/register", {
        fullName,
        email,
        password,
        passwordAgain,
      });
      const { token, user } = response.data.data;

      window.localStorage.setItem("pdos_token", token);
      window.localStorage.setItem("pdos_user", JSON.stringify(user));
      router.replace("/dashboard");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Kayıt oluşturulamadı. Bilgilerinizi kontrol edin."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-12">
      <div className="relative hidden lg:col-span-6 lg:block">
  <Image
    src="/images/login.jpg"
    alt="kayit-ol"
    fill
    priority

    className="object-contain object-left"
  />

      </div>

      <div className="flex items-center justify-center bg-[#FAFAFA]   lg:col-span-6">
        <div className="w-full max-w-lg">
          <PageHeader
            title="Aramıza Katılın 🚀"
            description="Hesabınızı oluşturarak notlarınızı düzenlemeye, öğrenme yolculuğunuzu takip etmeye ve tüm içeriklere erişmeye başlayın."
          />

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <User
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <Input
                name="fullName"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                required
                placeholder="Adınız Soyadınız"
                className="h-14 rounded-2xl pl-14 pr-14 w-full border border-gray-200"
              />
            </div>
            <div className="relative">
              <Mail
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <Input
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                placeholder="E-posta adresiniz"
                className="h-14 rounded-2xl pl-14 pr-14 w-full border border-gray-200"
              />
            </div>
            <div className="flex gap-2">  <div className="relative">
              <Lock
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                placeholder="Şifreniz"
                className="h-14 rounded-2xl pl-14 pr-14 w-full border border-gray-200"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#555A8A]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative">
              <Lock
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <Input
                type={showPassword ? "text" : "password"}
                name="passwordAgain"
                value={passwordAgain}
                onChange={(event) => setPasswordAgain(event.target.value)}
                required
                placeholder="Şifre Tekrar"
                className="h-14 rounded-2xl pl-14 pr-14 w-full border border-gray-200"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#555A8A]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-500">
                <Input type="checkbox" className="h-4 w-4 accent-purple-600" />
                Beni Hatırla
              </label>
            </div>

            {error && (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              text={isSubmitting ? "Kayıt oluşturuluyor..." : "Kayıt Ol"}
              className="w-full text-white disabled:cursor-not-allowed disabled:opacity-60"
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

                <button type="button" className="flex h-14 text-gray-500 w-full items-center justify-center gap-3 rounded-2xl border border-gray-200 hover:border-[rgb(125,120,206)]">
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
