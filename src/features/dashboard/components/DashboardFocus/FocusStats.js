const SUMMARY = [
  {
    key: "total",
    label: "Toplam Görev",
    box: "border-indigo-100 bg-indigo-50",
    text: "text-[#555A8A]",
  },
  { key: "done", label: "Tamamlanan", box: "border-green-100 bg-green-50", text: "text-green-600" },
  {
    key: "pending",
    label: "Tamamlanmayı Bekleyen",
    box: "border-orange-100 bg-orange-50",
    text: "text-orange-500",
  },
];

const STATUSES = [
  { key: "todo", label: "Todo", className: "border-green-500 text-green-600" },
  { key: "inProgress", label: "In Progress", className: "border-blue-500 text-blue-600" },
  { key: "done", label: "Done", className: "border-orange-500 text-orange-600" },
];

export default function FocusStats({ statistics }) {
  return (
    <>
      <dl className="grid grid-cols-3 gap-3">
        {SUMMARY.map((item) => (
          <div key={item.key} className={`rounded-xl border p-4 text-center ${item.box}`}>
            <dd className={`text-2xl font-bold ${item.text}`}>{statistics[item.key]}</dd>
            <dt className="mt-1 text-xs font-medium text-slate-500">{item.label}</dt>
          </div>
        ))}
      </dl>

      <dl className="mt-4 grid grid-cols-3 gap-3">
        {STATUSES.map((item) => (
          <div
            key={item.key}
            className={`rounded-xl border bg-white p-3 text-center ${item.className}`}
          >
            <dd className="text-lg font-bold">{statistics[item.key]}</dd>
            <dt className="text-xs">{item.label}</dt>
          </div>
        ))}
      </dl>
    </>
  );
}
