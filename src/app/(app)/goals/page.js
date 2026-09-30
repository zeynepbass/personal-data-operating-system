import GoalsPage from "@/features/goals/pages/goalsPage";
import { requirePageUser } from "@/server/auth/dal";
import { listGoals } from "@/server/services/goal.service";

export const metadata = { title: "Hedefler" };

export default async function Goals() {
  const user = await requirePageUser();
  const { items } = await listGoals(user, { limit: 100 });

  return <GoalsPage goals={items} />;
}
