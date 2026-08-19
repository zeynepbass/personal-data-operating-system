"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import "./globals.css";
import Layout from "@/shared/layout/AppLayout";
import { ThemeProvider } from "@/shared/theme/ThemeProvider";

const NO_FLASH_THEME_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("pdos_theme");
    var theme = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    if (theme === "dark") document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_THEME_SCRIPT }} />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <Layout>{children}</Layout>
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}