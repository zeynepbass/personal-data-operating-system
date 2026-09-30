"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { registerAction } from "@/features/auth/actions/auth.actions";
import { Button } from "@/shared/components/atoms";
import { handleActionResult } from "@/shared/helpers/form.helper";
import { registerSchema } from "@/shared/schemas/auth";

import { IconInput, PasswordInput } from "../AuthFields";
import AuthShell from "../AuthShell";

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { fullName: "", email: "", password: "", passwordAgain: "" },
  });
  const { errors } = form.formState;

  const onSubmit = form.handleSubmit((values) =>
    startTransition(async () => {
      const result = await registerAction(values);
      handleActionResult(form, result);
    }),
  );

  return (
    <AuthShell
      badge="🚀 Kişisel çalışma alanına katıl"
      headline="Öğren, organize ol ve hedeflerine ulaş."
      tagline="Notlarını, görevlerini, hedeflerini ve dokümanlarını tek bir yerde yönet."
      title="Aramıza Katılın 🚀"
      description="Hesabınızı oluşturarak kişisel çalışma alanınıza erişmeye başlayın."
    >
      <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
        <IconInput
          icon={User}
          placeholder="Adınız Soyadınız"
          aria-label="Ad soyad"
          autoComplete="name"
          disabled={isPending}
          error={errors.fullName?.message}
          {...form.register("fullName")}
        />

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

        <div className="grid gap-4 sm:grid-cols-2">
          <PasswordInput
            placeholder="Şifreniz"
            aria-label="Şifre"
            autoComplete="new-password"
            disabled={isPending}
            error={errors.password?.message}
            {...form.register("password")}
          />
          <PasswordInput
            placeholder="Şifre Tekrar"
            aria-label="Şifre tekrarı"
            autoComplete="new-password"
            disabled={isPending}
            error={errors.passwordAgain?.message}
            {...form.register("passwordAgain")}
          />
        </div>

        <Button
          type="submit"
          disabled={isPending}
          text={isPending ? "Kayıt oluşturuluyor..." : "Kayıt Ol"}
          className="h-14 w-full rounded-2xl font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
        />

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
    </AuthShell>
  );
}
