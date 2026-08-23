"use client";

import { useRef, useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button, Input, Textarea } from "@/shared/components/atoms";
import { Pencil } from "lucide-react";

export default function SettingsProfile() {
  const {
    user,
    profile,
    profileLoading,
    fullName,
    setFullName,
    email,
    setEmail,
    about,
    setAbout,
  } = useAuth();

  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(user?.profileImage || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    profile({
      fullName,
      email,
      about,
      profileImage,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setProfileImage(file);

    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);

    e.target.value = "";
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
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="mb-10 flex items-center gap-5">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-2xl font-bold text-white">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="PDOS"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleImageChange}
              />

              <button
                type="button"
                aria-label="Profil fotoğrafını güncelle"
                disabled={profileLoading}
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-white text-gray-600 shadow-md transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Pencil size={15} />
              </button>
            </div>
          </div>

          <Input
            label="Ad Soyad"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition duration-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          />

          <Input
            label="E-posta"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition duration-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
          />

          <Textarea
            label="Hakkımda"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          <div className="pt-2 text-center">
            <Button
              type="submit"
              text={profileLoading ? "Kaydediliyor..." : "Kaydet"}
              disabled={profileLoading}
              className="text-white"
            />
          </div>
        </form>
      </div>
    </section>
  );
}
