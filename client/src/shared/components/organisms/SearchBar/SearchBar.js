"use client";

import { useState } from "react";
import { Bell, Settings, Search, ChevronDown } from "lucide-react";
import { Button, Input } from "@/shared/components/atoms";
import { useAuth } from "@/features/auth/hooks/useAuth";

export function SearchBar() {
  const {user,logout} = useAuth();
  const [isOpen, setIsOpen] = useState(false);


  const fullName = user?.user?.fullName ?? "Kullanıcı";
  const email = user?.user?.email ?? "Email";
  const role = user?.user?.role ?? "Kullanıcı";

  const initials =
    fullName
      ?.split(" ")
      .filter(Boolean)
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "K";

  return (
    <div className="flex w-full items-center justify-between bg-white px-4 py-3">

      <form className="relative flex-1 max-w-full">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <Input
          type="text"
          placeholder="Ara..."
          className="w-full border-0 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#555A8A]"
        />
      </form>


      <div className="ml-4 flex items-center gap-1">
        <Button
          text={<Bell size={20} />}
          className="bg-transparent hover:text-[rgb(125,120,206)]"
        />

        <Button
          text={<Settings size={20} />}
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

              <span className="truncate text-gray-400">
                {role}
              </span>
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
                <p className="text-sm font-semibold text-gray-900">
                  {fullName}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {email}
                </p>
              </div>


              <button
                type="button"
                onClick={logout}
                className="w-full px-4 py-3 text-left text-xs font-semibold text-gray-700 transition hover:bg-slate-50 hover:text-red-600"
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