"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  SearchBar,
  Sidebar,
} from "@/shared/components/organisms";
import { useEffect } from "react";
import { useAuthStore } from "@/shared/store/auth.store";

const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
];

export default function AppLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const initializeAuth = useAuthStore(
    (state) => state.initializeAuth
  );
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );
  const isInitialized = useAuthStore(
    (state) => state.isInitialized
  );

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  useEffect(() => {
    if (!isInitialized) return;

    if (!isAuthenticated && !isPublicRoute) {
      router.replace("/login");
    }
  }, [isInitialized, isAuthenticated, isPublicRoute, router]);

  if (isPublicRoute) {
    return (
      <main className="min-h-screen">
        {children}
      </main>
    );
  }

  if (!isInitialized || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-500">Yükleniyor...</p>
      </div>
    );
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
