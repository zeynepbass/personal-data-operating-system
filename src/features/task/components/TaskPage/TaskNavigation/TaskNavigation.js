"use client";

const VIEWS = [
  { key: "list", label: "Liste" },
  { key: "kanban", label: "Kanban" },
  { key: "table", label: "Tablo", adminOnly: true },
];

export default function TaskNavigation({ setView, view, isAdmin }) {
  return (
    <div role="group" aria-label="Görünüm" className="flex max-w-sm gap-2 border-b border-gray-200">
      {VIEWS.filter((item) => !item.adminOnly || isAdmin).map((item) => (
        <button
          key={item.key}
          type="button"
          aria-pressed={view === item.key}
          onClick={() => setView(item.key)}
          className={`rounded-t-lg border-b-2 px-4 py-2 text-sm transition ${
            view === item.key
              ? "border-[#555A8A] bg-indigo-50 text-[#555A8A]"
              : "border-transparent text-gray-500 hover:border-indigo-300 hover:text-indigo-700"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
