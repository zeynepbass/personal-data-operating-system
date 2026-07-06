"use client";

import {
  Home,
  CheckSquare,
  FileText,
  File,
  Calendar,
  Target,
  BarChart3,
  Settings,
} from "lucide-react";

import { MenuList } from "@/components/molecules";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Dashboard", icon: Home, href: "/dashboard" },
  { name: "Tasks", icon: CheckSquare, href: "/tasks" },
  { name: "Notes", icon: FileText, href: "/notes" },
  { name: "Documents", icon: File, href: "/documents" },
  { name: "Calendar", icon: Calendar, href: "/calendar" },
  { name: "Goals", icon: Target, href: "/goals" },
  { name: "Analytics", icon: BarChart3, href: "/analytics" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-[#FAFAFA] border-r border-gray-100 flex flex-col">
      <div className="px-6 py-6 flex items-center gap-3">
        <img src="/images/logo.png" width={50} height={50} />
      </div>

      <nav className="flex-1 px-4">
        {menu.map((item) => {
          const isActive = pathname === item.href;

          return (
            <MenuList
              key={item.name}
              href={item.href}
              className={`flex w-full items-center gap-4 rounded-xl px-5 py-4 text-left transition-all duration-200
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
      </nav>

      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            className="w-10 h-10 rounded-full"
            alt=""
          />
          <span className="font-medium text-sm">Zeynep Baş</span>
        </div>
      </div>
    </aside>
  );
}
