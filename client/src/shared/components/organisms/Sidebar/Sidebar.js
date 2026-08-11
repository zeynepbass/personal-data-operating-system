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
  { id: 1, name: "Dashboard", icon: Home, href: "/dashboard" },
  { id: 2, name: "Tasks", icon: SquareCheck, href: "/tasks" },
  { id: 3, name: "Notes", icon: FileText, href: "/notes" },
  { id: 4, name: "Documents", icon: File, href: "/documents" },
  { id: 5, name: "Calendar", icon: Calendar, href: "/calendar" },
  { id: 6, name: "Goals", icon: Target, href: "/goals" },
  { id: 7, name: "Analytics", icon: BarChart3, href: "/analytics" },
  { id: 8, name: "Settings", icon: Settings, href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-gray-100 bg-[#FAFAFA]">
      <div className="flex items-center gap-3 px-6 py-6">
        <img
          src="/images/logo.png"
          width={50}
          height={50}
          alt="Logo"
        />
      </div>

      <nav className="flex-1 px-4">
        {menu && menu.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex w-full items-center gap-4 rounded-xl px-5 py-4 text-left transition-all duration-200 ${
                isActive
                  ? "bg-violet-50 text-[#555A8A] shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            className="h-10 w-10 rounded-full"
            alt="Zeynep Baş"
          />
          <span className="text-sm font-medium">Zeynep Baş</span>
        </div>
      </div>
    </aside>
  );
}