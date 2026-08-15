export default function AnalyticsCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">
      <p className="text-sm text-gray-500">{title}</p>

      <h2 className="mt-2 text-4xl font-bold text-[#555A8A]">{value}</h2>

      <p className="mt-1 text-xs text-gray-500">Geçen haftaya göre</p>
    </div>
  );
}
