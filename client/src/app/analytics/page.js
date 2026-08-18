import AnalyticsPage from "@/features/analytics/pages/AnalyticsPage";
import {
  getTask
} from "@/features/task/repositories/task.repository";

export default async function Analytics() {
  const meetings = await getTask();
  return <AnalyticsPage meeting={meetings} />;
}