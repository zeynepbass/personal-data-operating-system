"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { requestPasswordResetAction } from "@/features/auth/actions/auth.actions";
import { Button } from "@/shared/components/atoms";
import { handleActionResult } from "@/shared/helpers/form.helper";
import { forgotPasswordSchema } from "@/shared/schemas/auth";

import { IconInput } from "../AuthFields";
import AuthShell from "../AuthShell";

export default function PasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [sentMessage, setSentMessage] = useState("");
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = form.handleSubmit((values) =>
    startTransition(async () => {
      const result = await requestPasswordResetAction(values);
      if (handleActionResult(form, result)) setSentMessage(result.data.message);
    }),
  );

  return (
    <AuthShell
      badge="🔐 Hesap kurtarma"
      headline="Şifreni mi unuttun? Sorun değil."
      tagline="E-posta adresine tek kullanımlık bir sıfırlama bağlantısı gönderelim."
      title="Şifreni Yenile"
      description="Kayıtlı e-posta adresini gir, sana bir sıfırlama bağlantısı gönderelim."
    >
      {sentMessage ? (
        <p role="status" className="mt-8 rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-700">
          {sentMessage}
        </p>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
          <IconInput
            icon={Mail}
            type="email"
            placeholder="E-posta adresiniz"
            aria-label="E-posta adresi"
            autoComplete="email"
            disabled={isPending}
            error={form.formState.errors.email?.message}
            {...form.register("email")}
          />

          <Button
            type="submit"
            disabled={isPending}
            text={isPending ? "Gönderiliyor..." : "Sıfırlama Bağlantısı Gönder"}
            className="h-14 w-full rounded-2xl font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
          />
        </form>
      )}

      <p className="pt-6 text-center text-sm text-gray-500">
        <Link href="/login" className="font-semibold text-[#555A8A] hover:text-[#7d78ce]">
          Giriş sayfasına dön
        </Link>
      </p>
    </AuthShell>
  );
}
