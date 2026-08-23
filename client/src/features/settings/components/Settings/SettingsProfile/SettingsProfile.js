"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button, Input, Textarea } from "@/shared/components/atoms";
import { Pencil } from "lucide-react";


export default function SettingsProfile() {
  const {
    profile,
    fullName,
    setFullName,
    email,
    setEmail,
    about,
    setAbout,
    profileMutation,
  } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!profile?._id) {
      toast.error("Kullanıcı bilgisi bulunamadı.");
      return;
    }

    profileMutation.mutate({
      id: profile._id,
      data: {
        fullName,
        email,
        about,
      },
    });
  };

  return (
    <section className="space-y-8">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-10 flex items-center gap-5">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-2xl font-bold text-white">
              {profile?.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt="Profil fotoğrafı"
                  className="h-full w-full object-cover"
                />
              ) : (
                profile?.fullName
                  ?.split(" ")
                  .map((name) => name[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase() || "ZK"
              )}
            </div>

            <button
              type="button"
              aria-label="Profil fotoğrafını güncelle"
              className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-white text-gray-600 shadow-md transition hover:bg-gray-100"
            >
              <Pencil size={15} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
              text={
                profile.profileLoading
                  ? "Kaydediliyor..."
                  : "Kaydet"
              }
              disabled={profile.profileLoading}
              className="text-white"
            />
          </div>
        </form>
      </div>
    </section>
  );
}