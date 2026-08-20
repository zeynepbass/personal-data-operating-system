"use client";

import {
  Home,
  SquareCheck,
  FileText,
  File,
  Calendar,
  Target,
  BarChart3,
  Settings,
} from "lucide-react";

import { usePathname } from "next/navigation";
import Link from "next/link";

const menu = [
  { id: 1, name: "Ana Sayfa", icon: Home, href: "/dashboard" },
  { id: 2, name: "Görevler", icon: SquareCheck, href: "/tasks" },
  { id: 3, name: "Notlar", icon: FileText, href: "/notes" },
  { id: 4, name: "Dökümanlar", icon: File, href: "/documents" },
  { id: 5, name: "Takvim", icon: Calendar, href: "/calendar" },
  { id: 6, name: "Hedefler", icon: Target, href: "/goals" },
  { id: 7, name: "Analiz", icon: BarChart3, href: "/analytics" },
  { id: 8, name: "Ayarlar", icon: Settings, href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-gray-100 bg-[rgb(125,120,206)]">
      <div className="flex items-center gap-3 px-6 py-5">
        <img
          src="/images/logo.png"
          width={60}
          height={60}
          alt="Logo"
        />
      </div>

      <nav className="flex-1 px-1">
        {menu && menu.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex w-full items-center gap-4 rounded-xl px-5 mb-2 py-4 text-left transition-all duration-200 ${
                isActive
                  ? "bg-violet-50 text-[#555A8A] shadow-sm"
                  : "text-white hover:bg-gray-100 hover:text-gray-500"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>


    </aside>
  );
}