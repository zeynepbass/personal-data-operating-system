import { Suspense } from "react";

import AnalyticsHome from "@/features/analytics/components/AnalyticsHome";
import AnalyticsRangeSelect from "@/features/analytics/components/AnalyticsRangeSelect";
import { getRemainingMonthDates } from "@/features/analytics/utils/date";
import { requirePageUser } from "@/server/auth/dal";
import { getTaskAnalytics } from "@/server/services/analytics.service";
import { PageHeader, PageSkeleton } from "@/shared/components/molecules";

export const metadata = { title: "Analiz" };

async function AnalyticsContent({ user, from, to }) {
  const analytics = await getTaskAnalytics(user, { from, to });
  return <AnalyticsHome {...analytics} />;
}

export default async function Analytics({ searchParams }) {
  const user = await requirePageUser();
  const options = getRemainingMonthDates();
  const { range } = await searchParams;

  const selected = options.find((option) => option.value === range) ?? options[0];
  const [from, to] = selected.value.split("_");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <PageHeader title="Analiz" description="Periyotlarınızın takibini yapın." />
        <AnalyticsRangeSelect options={options} selectedRange={selected.value} />
      </div>

      <Suspense key={selected.value} fallback={<PageSkeleton label="İstatistikler yükleniyor" />}>
        <AnalyticsContent user={user} from={from} to={to} />
      </Suspense>
    </div>
  );
}
