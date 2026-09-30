import { redirect } from "next/navigation";

import RegisterForm from "@/features/auth/components/Register";
import { getCurrentUser } from "@/server/auth/dal";

export const metadata = { title: "Kayıt Ol" };

export default async function RegisterPage() {
  if (await getCurrentUser()) redirect("/dashboard");

  return <RegisterForm />;
}
