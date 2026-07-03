"use client";

import { usePathname } from "next/navigation";
import { SearchBar, Sidebar } from "@/components/organisms";

export function Layout({ children }) {
  const pathname = usePathname();

  const hideLayout = [
    "/login",
    "/register",
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