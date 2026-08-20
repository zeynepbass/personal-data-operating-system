"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import "./globals.css";
import Layout from "@/shared/layout/AppLayout";
import { Toaster } from "react-hot-toast";
export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <QueryClientProvider client={queryClient}>
          <Layout>{children}

          <Toaster position="bottom-right" />
          </Layout>
        </QueryClientProvider>
      </body>
    </html>
  );
}