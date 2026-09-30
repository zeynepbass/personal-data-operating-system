import { AuthProvider } from "@/features/auth/context/AuthProvider";
import QueryProvider from "@/providers/QueryProvider";
import { requirePageUser } from "@/server/auth/dal";
import { toPublicUser } from "@/server/serializers/user";
import AppLayout from "@/shared/layout/AppLayout";

export default async function ProtectedLayout({ children }) {
  const user = await requirePageUser();

  return (
    <QueryProvider>
      <AuthProvider user={toPublicUser(user)}>
        <AppLayout>{children}</AppLayout>
      </AuthProvider>
    </QueryProvider>
  );
}
