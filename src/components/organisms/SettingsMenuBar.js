"use client";


import { User, Bell, Globe, Shield, Keyboard, Database } from "lucide-react";
import {MenuList,FeedHeader} from "@/components/molecules"
import { usePathname } from "next/navigation";
const menu = [
  { name: "Profil", icon: User, href: "/settings/profile" },
  { name: "Görünüm", icon: Globe, href: "/settings/appearance" },
  { name: "Bildirimler", icon: Bell, href: "/settings/notifications" },
  { name: "Dil", icon: Globe, href: "/settings/language" },
  { name: "Güvenlik", icon: Shield, href: "/settings/security" },
  { name: "Klavye Kısayolları", icon: Keyboard, href: "/settings/shortcuts" },
  { name: "Veri Yönetimi", icon: Database, href: "/settings/analytics" },
];
export function SettingsMenuBar() {
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

       
        </div>
      </div>
    </div>
  );
}
