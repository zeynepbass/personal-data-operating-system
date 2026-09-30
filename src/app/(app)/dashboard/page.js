import DashboardPage from "@/features/dashboard/pages/dashboardPage";
import { requirePageUser } from "@/server/auth/dal";
import { listNotes } from "@/server/services/note.service";

export const metadata = { title: "Dashboard" };

export default async function Dashboard() {
  const user = await requirePageUser();
  const { items: recentNotes } = await listNotes(user, { limit: 3 });

  return <DashboardPage recentNotes={recentNotes} />;
}
