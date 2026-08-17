import { dashboardRepository } from "@/features/dashboard/dashboard.container";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
export const dynamic = "force-dynamic";
export default async function Dashboard() {
  const meetings=await dashboardRepository.getTask();
  return <DashboardPage meetings={meetings}/>;
}
