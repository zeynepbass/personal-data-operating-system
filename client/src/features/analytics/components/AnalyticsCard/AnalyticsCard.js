export default function AnalyticsCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#1a1a22] p-6 shadow-sm transition hover:shadow-md">
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>

      <h2 className="mt-2 text-4xl font-bold text-[#555A8A] dark:text-[#a5a1e8]">{value}</h2>

      <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">Geçen haftaya göre</p>
    </div>
  );
}
