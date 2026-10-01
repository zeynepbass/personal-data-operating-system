export default function AnalyticsCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-2 text-4xl font-bold text-[#555A8A]">{value}</p>
    </div>
  );
}
