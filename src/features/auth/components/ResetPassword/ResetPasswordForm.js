"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { resetPasswordAction } from "@/features/auth/actions/auth.actions";
import { Button } from "@/shared/components/atoms";
import { handleActionResult } from "@/shared/helpers/form.helper";
import { resetPasswordSchema } from "@/shared/schemas/auth";

import { PasswordInput } from "../AuthFields";
import AuthShell from "../AuthShell";

export default function ResetPasswordForm({ token }) {
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token, password: "", passwordAgain: "" },
  });
  const { errors } = form.formState;

  const onSubmit = form.handleSubmit((values) =>
    startTransition(async () => {
      const result = await resetPasswordAction(values);
      handleActionResult(form, result);
    }),
  );

  return (
    <AuthShell
      badge="🔐 Yeni şifre"
      headline="Neredeyse bitti."
      tagline="Yeni şifreni belirledikten sonra tüm cihazlardaki oturumların kapatılır."
      title="Yeni Şifre Belirle"
      description="En az 8 karakterden oluşan yeni bir şifre seç."
    >
      <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
        <input type="hidden" {...form.register("token")} />

        <PasswordInput
          placeholder="Yeni şifreniz"
          aria-label="Yeni şifre"
          autoComplete="new-password"
          disabled={isPending}
          error={errors.password?.message}
          {...form.register("password")}
        />
        <PasswordInput
          placeholder="Yeni şifre tekrar"
          aria-label="Yeni şifre tekrarı"
          autoComplete="new-password"
          disabled={isPending}
          error={errors.passwordAgain?.message}
          {...form.register("passwordAgain")}
        />

        <Button
          type="submit"
          disabled={isPending}
          text={isPending ? "Kaydediliyor..." : "Şifreyi Güncelle"}
          className="h-14 w-full rounded-2xl font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
        />

        <p className="pt-2 text-center text-sm text-gray-500">
          <Link
            href="/forgot-password"
            className="font-semibold text-[#555A8A] hover:text-[#7d78ce]"
          >
            Yeni bağlantı iste
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
