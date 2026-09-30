"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { updateProfileAction } from "@/features/auth/actions/auth.actions";
import { useCurrentUser } from "@/features/auth/context/AuthProvider";
import { Button, Input, Textarea } from "@/shared/components/atoms";
import { handleActionResult } from "@/shared/helpers/form.helper";
import { profileSchema } from "@/shared/schemas/auth";

const AVATAR_TYPES = ["image/png", "image/jpeg", "image/webp"];
const AVATAR_MAX_BYTES = 2 * 1024 * 1024;

const FIELD_CLASS =
  "w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition duration-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100";

export default function SettingsProfile() {
  const user = useCurrentUser();
  const fileInputRef = useRef(null);
  const [isPending, startTransition] = useTransition();
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(user?.profileImage || "");

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user?.fullName ?? "",
      email: user?.email ?? "",
      about: user?.about ?? "",
      currentPassword: "",
    },
  });
  const { errors } = form.formState;
  const emailChanged = form.watch("email").trim().toLowerCase() !== user?.email;

  const onSubmit = form.handleSubmit((values) =>
    startTransition(async () => {
      const formData = new FormData();
      formData.set("fullName", values.fullName);
      formData.set("email", values.email);
      formData.set("about", values.about ?? "");
      if (emailChanged && values.currentPassword) {
        formData.set("currentPassword", values.currentPassword);
      }
      if (avatarFile) formData.set("profileImage", avatarFile);

      const result = await updateProfileAction(formData);
      if (handleActionResult(form, result)) {
        setAvatarFile(null);
        form.reset({ ...values, currentPassword: "" });
        toast.success("Profil başarıyla güncellendi.");
      }
    }),
  );

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!AVATAR_TYPES.includes(file.type)) {
      toast.error("Sadece PNG, JPEG veya WebP yükleyebilirsiniz.");
      return;
    }
    if (file.size > AVATAR_MAX_BYTES) {
      toast.error("Profil fotoğrafı en fazla 2 MB olabilir.");
      return;
    }

    setAvatarFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const initials =
    user?.fullName
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "PDOS";

  return (
    <section className="space-y-8">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <form onSubmit={onSubmit} noValidate className="space-y-6">
          <div className="mb-10 flex items-center gap-5">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-2xl font-bold text-white">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt={`${user?.fullName ?? "Kullanıcı"} profil fotoğrafı`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept={AVATAR_TYPES.join(",")}
                className="hidden"
                aria-hidden="true"
                tabIndex={-1}
                onChange={handleImageChange}
              />

              <button
                type="button"
                aria-label="Profil fotoğrafını güncelle"
                disabled={isPending}
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-white text-gray-600 shadow-md transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Pencil size={15} />
              </button>
            </div>
          </div>

          <Input
            label="Ad Soyad"
            required
            disabled={isPending}
            error={errors.fullName?.message}
            className={FIELD_CLASS}
            {...form.register("fullName")}
          />

          <Input
            label="E-posta"
            type="email"
            required
            autoComplete="email"
            disabled={isPending}
            error={errors.email?.message}
            className={FIELD_CLASS}
            {...form.register("email")}
          />

          {emailChanged && (
            <Input
              label="Mevcut şifre"
              type="password"
              required
              autoComplete="current-password"
              disabled={isPending}
              error={errors.currentPassword?.message}
              className={FIELD_CLASS}
              {...form.register("currentPassword")}
            />
          )}

          <Textarea
            label="Hakkımda"
            disabled={isPending}
            error={errors.about?.message}
            {...form.register("about")}
          />

          <div className="pt-2 text-center">
            <Button
              type="submit"
              text={isPending ? "Kaydediliyor..." : "Kaydet"}
              disabled={isPending}
              className="text-white"
            />
          </div>
        </form>
      </div>
    </section>
  );
}
