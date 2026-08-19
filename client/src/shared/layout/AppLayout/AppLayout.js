"use client";

import { usePathname } from "next/navigation";
import { SearchBar, Sidebar } from "@/shared/components/organisms";
import { Toaster } from "react-hot-toast";
export default function AppLayout({ children }) {
  const pathname = usePathname();

  const hideLayout = [
    "/login",
    "/register",
    "/forgot-password"
  ].includes(pathname);

  if (hideLayout) {
    return <main className="min-h-screen">{children}</main>;
  }

  return (
    <div className="flex min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <SearchBar />

        <main className="flex-1 p-6">
          {children}
          <Toaster position="bottom-right" />
        </main>
      </div>
    </div>
  );
}