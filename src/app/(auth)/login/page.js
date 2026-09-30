import { redirect } from "next/navigation";

import LoginForm from "@/features/auth/components/Login";
import { getCurrentUser } from "@/server/auth/dal";

export const metadata = { title: "Giriş Yap" };

export default async function LoginPage({ searchParams }) {
  if (await getCurrentUser()) redirect("/dashboard");

  const { next, reset } = await searchParams;

  return <LoginForm next={typeof next === "string" ? next : undefined} resetDone={reset === "1"} />;
}
