"use client";

export default function TaskNavigation  ({ setView, view,isAdmin,isInitialized})  {


  const base =
    "px-4 py-2 text-sm rounded-t-lg border-b-2 transition";

  const getClass = (key) =>
    view === key
      ? "bg-indigo-50 border-[#555A8A]text-[#555A8A]"
      : "border-transparent text-gray-500 hover:text-indigo-700 hover:border-indigo-300";

  return (
    <div className="flex gap-2 border-b border-gray-200 max-w-sm">
      <button className={`${base} ${getClass("list")}`} onClick={() => setView("list")}>
        Liste
      </button>

      <button className={`${base} ${getClass("kanban")}`} onClick={() => setView("kanban")}>
        Kanban
      </button>
  {isInitialized && isAdmin &&   (
     <button className={`${base} ${getClass("table")}`} onClick={() => setView("table")}>
        Tablo
      </button>
  )
     }

    </div>

  );
};