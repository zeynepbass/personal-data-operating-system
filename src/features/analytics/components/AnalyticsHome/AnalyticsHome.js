import AnalyticsCard from "../AnalyticsCard";
import AnalyticsChart from "../AnalyticsChart";

export default function AnalyticsHome({
  totalTasks = 0,
  completedTasks = 0,
  totalEstimatedHours = 0,
  chartData = [],
  mostWorkedCategory,
  mostProductiveDay,
}) {
  const chartSummary = chartData.map((item) => `${item.day}: ${item.value}`).join(", ");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <AnalyticsCard title="Toplam Görev" value={totalTasks} />
        <AnalyticsCard title="Tamamlanan" value={completedTasks} />
        <AnalyticsCard title="Çalışma Süresi" value={`${totalEstimatedHours} saat`} />
      </div>

      <section
        aria-labelledby="analytics-chart-title"
        className="rounded-2xl bg-white p-6 shadow-sm"
      >
        <h2 id="analytics-chart-title" className="mb-5 text-lg font-semibold text-[#555A8A]">
          Günlere Göre Görevler
        </h2>
        <p className="sr-only">{chartSummary}</p>
        <div className="h-72" aria-hidden="true">
          <AnalyticsChart data={chartData} />
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">En Verimli Gün</p>
          <p className="mt-2 text-3xl font-bold text-[#555A8A]">{mostProductiveDay?.day ?? "-"}</p>
          <p className="mt-2 text-sm font-medium text-emerald-600">
            {mostProductiveDay ? `${mostProductiveDay.value} görev` : "Henüz veri yok"}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">En Çok Çalışılan Kategori</p>
          <p className="mt-2 text-3xl font-bold text-[#555A8A]">
            {mostWorkedCategory?.category ?? "-"}
          </p>
          <div
            role="progressbar"
            aria-label="Kategori oranı"
            aria-valuenow={mostWorkedCategory?.percentage ?? 0}
            aria-valuemin={0}
            aria-valuemax={100}
            className="mt-5 h-2 overflow-hidden rounded-full bg-gray-200"
          >
            <div
              className="h-full rounded-full bg-[#665CFF]"
              style={{ width: `${mostWorkedCategory?.percentage ?? 0}%` }}
            />
          </div>
          <p className="mt-2 text-sm font-medium text-[#665CFF]">
            {mostWorkedCategory?.percentage ?? 0}%
          </p>
        </div>
      </div>
    </div>
  );
}
