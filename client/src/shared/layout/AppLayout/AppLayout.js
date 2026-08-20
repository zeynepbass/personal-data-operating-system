"use client";

import { usePathname } from "next/navigation";
import { SearchBar, Sidebar } from "@/shared/components/organisms";

import { useEffect } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
export default function AppLayout({ children }) {
  const pathname = usePathname();
  const { initializeAuth } = useAuth();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);
  const hideLayout = [
    "/login",
    "/register",
    "/forgot-password"
  ].includes(pathname);

  if (hideLayout) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <SearchBar />

        <main className="flex-1 p-6">
          {children}

        </main>
      </div>
    </div>
  );
}