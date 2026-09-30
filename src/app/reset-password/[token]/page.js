import ResetPasswordForm from "@/features/auth/components/ResetPassword";

export const metadata = {
  title: "Yeni Şifre",
  referrer: "no-referrer",
};

export default async function ResetPasswordPage({ params }) {
  const { token } = await params;

  return (
    <main className="min-h-screen">
      <ResetPasswordForm token={token} />
    </main>
  );
}
