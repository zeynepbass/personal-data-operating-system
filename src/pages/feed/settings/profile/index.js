"use client";

import { Button, Input,Heading, Textarea } from "@/components/atoms";
import { User, Bell, Globe, Shield, Keyboard, Database } from "lucide-react";
import {MenuList,FeedHeader} from "@/components/molecules"
import { usePathname } from "next/navigation";
const menu = [
  { name: "Profil", icon: User, href: "/dashboard" },
  { name: "Görünüm", icon: Globe, href: "/tasks" },
  { name: "Bildirimler", icon: Bell, href: "/notes" },
  { name: "Dil", icon: Globe, href: "/documents" },
  { name: "Güvenlik", icon: Shield, href: "/calendar" },
  { name: "Klavye Kısayolları", icon: Keyboard, href: "/goals" },
  { name: "Veri Yönetimi", icon: Database, href: "/analytics" },
];
export default function SettingsPage() {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <FeedHeader title="Ayarlar" />

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
       
        <aside className="space-y-2">
               {menu.map((item) => {
                 const isActive = pathname === item.href;
                 return (
                   <MenuList
                     key={item.name}
                     href={item.href}
                     className={`flex w-full items-left gap-4 rounded-xl
                       py-4 text-left transition-all duration-200
                                           ${
                                             isActive
                                               ? "bg-violet-50 text-[#555A8A] shadow-sm"
                                               : "text-gray-600 hover:bg-gray-100"
                                           }`}
                     icon={item.icon}
                     item={item.name}
                   />
                 );
               })}
             </aside>

          <section className="rounded-3xl border border-gray-100 bg-white p-10 shadow-sm">
            <Heading title=" Profil Bilgileri" />

            <div className="mb-10 flex flex-wrap items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-2xl font-bold text-white">
                ZK
              </div>
              <Button text=" Fotoğraf Değiştir" />
            </div>

            <form className="space-y-6">
              <Input
                label="Ad Soyad"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition duration-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
              />

              <Input
                label="E-posta"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition duration-200 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                type="email"
              />

              <div>
                <Textarea label="Hakkımda" />
              </div>

              <div className="pt-2 text-center">
                <Button type="submit" text="      Kaydet" />
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
