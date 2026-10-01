import Link from "next/link";

import DashboardList from "@/features/dashboard/components/DashboardList";
import { listNotes } from "@/server/services/note.service";

export default async function RecentNotes({ user }) {
  const { items } = await listNotes(user, { limit: 3 });

  if (!items.length) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
        <div className="flex flex-col items-center text-center">
          <p className="text-sm font-medium text-slate-600">Henüz not bulunmuyor.</p>
          <Link href="/notes" className="mt-2 text-xs text-slate-500 underline">
            İlk notunu oluşturarak başlayabilirsin.
          </Link>
        </div>
      </div>
    );
  }

  return <DashboardList documents={items} />;
}
