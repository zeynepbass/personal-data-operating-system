import LoginForm from "@/features/auth/components/Login";

export const metadata = { title: "Giriş Yap" };

export default async function LoginPage({ searchParams }) {
  const { next, reset } = await searchParams;

  return <LoginForm next={typeof next === "string" ? next : undefined} resetDone={reset === "1"} />;
}
