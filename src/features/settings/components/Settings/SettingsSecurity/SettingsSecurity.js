"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { deleteAccountAction } from "@/features/auth/actions/auth.actions";
import { useCurrentUser } from "@/features/auth/context/AuthProvider";
import { Button, Heading, Input } from "@/shared/components/atoms";
import { handleActionResult } from "@/shared/helpers/form.helper";
import { deleteAccountSchema } from "@/shared/schemas/auth";

import Modal from "../SettingsModal";

const relativeFormatter = new Intl.RelativeTimeFormat("tr-TR", { numeric: "auto" });

/** @param {string | null | undefined} iso */
function describePasswordAge(iso) {
  if (!iso) return "Henüz değiştirilmedi.";
  const days = Math.round((new Date(iso).getTime() - Date.now()) / 86_400_000);
  return `Son değiştirilme: ${relativeFormatter.format(days, "day")}.`;
}

function SecurityItem({ title, description, action, border = true }) {
  return (
    <div
      className={`flex items-center justify-between px-8 py-6 ${
        border ? "border-b border-gray-200" : ""
      }`}
    >
      <div className="max-w-lg">
        <Heading
          title={title}
          description={description}
          className="text-base font-medium"
          descriptionClassName="mt-1 text-sm text-muted-foreground"
        />
      </div>
      {action}
    </div>
  );
}

function DeleteAccountDialog({ open, onClose }) {
  const [isPending, startTransition] = useTransition();
  const form = useForm({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: { password: "" },
  });

  const onSubmit = form.handleSubmit((values) =>
    startTransition(async () => {
      const result = await deleteAccountAction(values);
      handleActionResult(form, result);
    }),
  );

  return (
    <Modal open={open} onClose={onClose} title="Hesabı Sil">
      <form onSubmit={onSubmit} noValidate className="space-y-4">
        <p className="text-sm text-gray-600">
          Hesabınız, notlarınız, hedefleriniz, dokümanlarınız ve yüklediğiniz dosyalar kalıcı olarak
          silinecek. Onaylamak için şifrenizi girin.
        </p>
        <Input
          label="Şifre"
          type="password"
          autoComplete="current-password"
          required
          disabled={isPending}
          error={form.formState.errors.password?.message}
          {...form.register("password")}
        />
        <div className="flex justify-end gap-2">
          <Button type="button" variant="secondary" text="Vazgeç" onClick={onClose} />
          <Button
            type="submit"
            variant="destructive"
            disabled={isPending}
            text={isPending ? "Siliniyor..." : "Hesabı kalıcı olarak sil"}
          />
        </div>
      </form>
    </Modal>
  );
}

export default function SettingsSecurity() {
  const user = useCurrentUser();
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <section className="space-y-8">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-8 py-6">
          <Heading
            title="Hesap Güvenliği"
            description="Şifre ve hesap ayarlarınızı yönetin."
            className="text-xl font-semibold"
          />
        </div>

        <SecurityItem
          title="Şifre"
          description={describePasswordAge(user?.passwordChangedAt)}
          action={
            <Link
              href="/forgot-password"
              aria-label="Şifre sıfırlama bağlantısı iste"
              className="rounded-xl p-2 text-[#555A8A] transition hover:bg-gray-50"
            >
              <PencilIcon width={20} height={20} aria-hidden="true" />
            </Link>
          }
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <SecurityItem
          title="Hesabı Sil"
          description="Bu işlem geri alınamaz."
          border={false}
          action={
            <Button
              variant="destructive"
              className="p-2"
              aria-label="Hesabı sil"
              onClick={() => setDeleteOpen(true)}
              text={<TrashIcon width={20} height={20} aria-hidden="true" />}
            />
          }
        />
      </div>

      <DeleteAccountDialog open={deleteOpen} onClose={() => setDeleteOpen(false)} />
    </section>
  );
}
