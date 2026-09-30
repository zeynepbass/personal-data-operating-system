import { headers } from "next/headers";
import { Toaster } from "react-hot-toast";

import QueryProvider from "@/providers/QueryProvider";

import "./globals.css";

export const metadata = {
  title: {
    default: "PDOS",
    template: "%s | PDOS",
  },
  description: "Görevler, notlar, hedefler ve dokümanlar için kişisel çalışma alanı.",
};

export default async function RootLayout({ children }) {
  await headers();

  return (
    <html lang="tr" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <QueryProvider>
          {children}
          <Toaster position="bottom-right" />
        </QueryProvider>
      </body>
    </html>
  );
}
