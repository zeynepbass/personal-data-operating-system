"use client";

import Image from "next/image";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { Input, Button } from "@/shared/components/atoms";
import { PageHeader } from "@/shared/components/molecules";

export default function PasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="grid min-h-screen lg:grid-cols-12">
<div className="relative hidden min-h-screen lg:col-span-6 lg:block">

  <Image
    src="/images/login.jpg"
    alt="Şifre yenileme"
    fill
    priority

    className="object-contain object-left"
  />

</div>

      <div className="flex items-center justify-center bg-[#FAFAFA] px-6 py-12 lg:col-span-6">
        <div className="w-full max-w-md">
          <PageHeader
            title="Şifreni Yenile"
            description="Yeni şifreni belirleyerek hesabına tekrar güvenli bir şekilde eriş."
          />

          <form className="mt-8 space-y-5">

            <div className="relative">
              <Lock
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Yeni şifreniz"
                className="h-14 w-full rounded-2xl border border-gray-200 pl-14 pr-14"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#555A8A]"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>


            <div className="relative">
              <Lock
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Şifrenizi tekrar girin"
                className="h-14 w-full rounded-2xl border border-gray-200 pl-14 pr-14"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#555A8A]"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            <Button
              text="Şifre Yenile"
              className="h-14 w-full rounded-2xl text-white"
            />
          </form>
        </div>
      </div>
    </div>
  );
}