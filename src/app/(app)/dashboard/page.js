import { Suspense } from "react";

import DashboardPage from "@/features/dashboard/pages/dashboardPage";
import { requirePageUser } from "@/server/auth/dal";
import { listBoard } from "@/server/services/task.service";

import RecentNotes from "./_components/RecentNotes";

export const metadata = { title: "Dashboard" };

function NotesFallback() {
  return (
    <ul role="status" aria-label="Notlar yükleniyor" className="animate-pulse space-y-2">
      {["a", "b", "c"].map((key) => (
        <li key={key} className="h-11 rounded-xl bg-slate-100" />
      ))}
    </ul>
  );
}

export default async function Dashboard() {
  const user = await requirePageUser();
  const board = await listBoard(user);

  return (
    <DashboardPage
      initialBoard={board}
      recentNotes={
        <Suspense fallback={<NotesFallback />}>
          <RecentNotes user={user} />
        </Suspense>
      }
    />
  );
}
