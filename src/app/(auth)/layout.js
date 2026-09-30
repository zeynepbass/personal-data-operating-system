import { redirect } from "next/navigation";

import { getCurrentUser } from "@/server/auth/dal";

export default async function AuthLayout({ children }) {
  if (await getCurrentUser()) redirect("/dashboard");

  return <main className="min-h-screen">{children}</main>;
}
