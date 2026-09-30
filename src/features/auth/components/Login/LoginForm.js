"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { loginAction } from "@/features/auth/actions/auth.actions";
import { Button } from "@/shared/components/atoms";
import { handleActionResult } from "@/shared/helpers/form.helper";
import { loginSchema } from "@/shared/schemas/auth";

import { IconInput, PasswordInput } from "../AuthFields";
import AuthShell from "../AuthShell";

export default function LoginForm({ next, resetDone = false }) {
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const { errors } = form.formState;

  const onSubmit = form.handleSubmit((values) =>
    startTransition(async () => {
      const result = await loginAction({ ...values, next });
      handleActionResult(form, result);
    }),
  );

  return (
    <AuthShell
      badge="👋 Tekrar hoş geldin"
      headline="Çalışma alanına kaldığın yerden devam et."
      tagline="Görevlerini, hedeflerini, notlarını ve dokümanlarını tek bir yerden yönet."
      title="Hoş Geldiniz 👋"
      description="Hesabınıza giriş yaparak hedeflerinizi takip etmeye devam edin."
    >
      {resetDone && (
        <p role="status" className="mt-6 rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-700">
          Şifreniz güncellendi. Yeni şifrenizle giriş yapabilirsiniz.
        </p>
      )}

      <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
        <IconInput
          icon={Mail}
          type="email"
          placeholder="E-posta adresiniz"
          aria-label="E-posta adresi"
          autoComplete="email"
          disabled={isPending}
          error={errors.email?.message}
          {...form.register("email")}
        />

        <PasswordInput
          placeholder="Şifreniz"
          aria-label="Şifre"
          autoComplete="current-password"
          disabled={isPending}
          error={errors.password?.message}
          {...form.register("password")}
        />

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
          disabled={isPending}
          text={isPending ? "Giriş yapılıyor..." : "Giriş Yap"}
          className="h-14 w-full rounded-2xl font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
        />

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
    </AuthShell>
  );
}
