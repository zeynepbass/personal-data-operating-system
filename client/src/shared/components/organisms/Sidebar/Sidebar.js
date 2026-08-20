"use client";



import { usePathname } from "next/navigation";
import Link from "next/link";
import {navigation} from "@/shared/mock/navigation"

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
        {navigation && navigation.map((item) => {
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