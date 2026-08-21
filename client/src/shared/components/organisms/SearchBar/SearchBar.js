"use client";

import { useState } from "react";
import { Bell, Settings, Search, ChevronDown } from "lucide-react";
import Link from "next/link";

import { Button, Input } from "@/shared/components/atoms";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useTasks } from "@/features/task/hooks/useTask";
import { navigation } from "@/shared/mock/navigation";
import { useRouter } from "next/navigation";

export function SearchBar() {
  const { user, logout } = useAuth();
  const { notifications } = useTasks();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const fullName = user?.fullName ?? "Kullanıcı";
  const email = user?.email ?? "Email";
  const role = user?.role ?? "Kullanıcı";

  const initials =
    fullName
      ?.split(" ")
      .filter(Boolean)
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "K";

  const filteredPages = navigation.filter((page) =>
    page.name
      .toLocaleLowerCase("tr-TR")
      .includes(search.toLocaleLowerCase("tr-TR").trim())
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="flex w-full items-center justify-between bg-white px-4 py-3">
      <form
        onSubmit={handleSearchSubmit}
        className="relative max-w-full flex-1"
      >
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Ara..."
          className="w-full border-0 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#555A8A]"
        />

        {search.trim() && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
            {filteredPages.length > 0 ? (
              <div className="py-1">
                {filteredPages.map((page) => {
                  const Icon = page.icon;

                  return (
                    <Link
                      key={page.id}
                      href={page.href}
                      onClick={() => setSearch("")}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 transition hover:bg-gray-50"
                    >
                      <Icon size={18} className="text-purple-500" />

                      <span>{page.name}</span>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p className="px-4 py-3 text-sm text-gray-500">
                Sonuç bulunamadı.
              </p>
            )}
          </div>
        )}
      </form>

      <div className="ml-4 flex items-center gap-1">
        <Button
          text={<Bell size={20} />}
          onClick={() => setShowNotifications((prev) => !prev)}
          className="bg-transparent hover:text-[rgb(125,120,206)]"
        />
        {showNotifications && (
          <div className="absolute right-5 top-14 z-50 w-80 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
            <h3 className="mb-3 text-gray-500">Bildirimler</h3>

            {notifications?.length > 0 ? (
              <div className="space-y-2">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="rounded-lg bg-gray-50 p-3"
                  >
                    <p className="text-sm font-medium text-gray-400">
                      {notification.title}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {notification.message}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">Yeni bildiriminiz yok.</p>
            )}
          </div>
        )}
        <Button
          text={<Settings size={20} />}
          onClick={() => router.push("/settings")}
          className="bg-transparent hover:text-[rgb(125,120,206)]"
        />

        <div className="relative ml-2 w-44">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition hover:bg-slate-50 focus:outline-none"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[rgb(125,120,206)] text-xs font-semibold text-white">
              {initials}
            </span>

            <span className="flex min-w-0 flex-1 flex-col text-left">
              <span className="truncate font-medium text-gray-900">
                {fullName}
              </span>

              <span className="truncate text-gray-400">{role}</span>
            </span>

            <ChevronDown
              className={`h-4 w-4 shrink-0 text-slate-500 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
              <div className="border-b border-slate-100 px-4 py-3">
                <p className="text-sm font-medium text-gray-900">{fullName}</p>

                <p className="mt-1 text-xs text-gray-500">{email}</p>
              </div>

              <button
                type="button"
                onClick={logout}
                className="w-full px-4 py-3 text-left text-xs font-semibold text-gray-700 transition hover:bg-slate-50 hover:text-purple-400"
              >
                Çıkış Yap
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
