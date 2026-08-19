"use client";

import { X } from "lucide-react";
import TaskFilter from "../TaskFilter";
import { useTaskStages } from "../../../hooks/useTaskStages";
import { getActiveDatePresetLabel } from "../../../utils/taskFilters";

const badgeClass =
  "flex items-center gap-1.5 rounded-full bg-violet-50 dark:bg-violet-400/10 px-3 py-1.5 text-xs font-medium text-violet-700 dark:text-violet-300";

const typeLabels = { task: "Görev", event: "Etkinlik" };
const priorityLabels = { Low: "🟢 Low", Medium: "🟡 Medium", High: "🔴 High" };
const operatorLabels = { gte: "sonrası", lte: "öncesi", between: "arası" };

export default function TaskNavigation  ({ setView, view, filters, setFilters })  {


  const base =
    "px-4 py-2 text-sm rounded-t-lg border-b-2 transition";

  const getClass = (key) =>
    view === key
      ? "bg-indigo-50 dark:bg-violet-400/10 border-[#555A8A] text-[#555A8A] dark:text-[#a5a1e8]"
      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-indigo-700 dark:hover:text-violet-300 hover:border-indigo-300 dark:hover:border-violet-400/40";

  const { data: stages = [] } = useTaskStages();
  const stageTitle = stages.find((stage) => stage.name === filters?.stage)?.title;
  const datePresetLabel = filters ? getActiveDatePresetLabel(filters) : null;

  const clearField = (patch) =>
    setFilters((prev) => ({ ...prev, ...patch }));

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex gap-2 border-b border-gray-200 dark:border-white/10">
        <button className={`${base} ${getClass("list")}`} onClick={() => setView("list")}>
          Liste
        </button>

        <button className={`${base} ${getClass("kanban")}`} onClick={() => setView("kanban")}>
          Kanban
        </button>


        <button className={`${base} ${getClass("table")}`} onClick={() => setView("table")}>
          Tablo
        </button>
      </div>

      {filters && setFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <TaskFilter filters={filters} setFilters={setFilters} />

          {filters.type && (
            <span className={badgeClass}>
              {typeLabels[filters.type]}
              <button
                type="button"
                onClick={() => clearField({ type: "" })}
                className="hover:text-red-500"
              >
                <X size={12} />
              </button>
            </span>
          )}

          {filters.stage && (
            <span className={badgeClass}>
              {stageTitle || filters.stage}
              <button
                type="button"
                onClick={() => clearField({ stage: "" })}
                className="hover:text-red-500"
              >
                <X size={12} />
              </button>
            </span>
          )}

          {filters.priority && (
            <span className={badgeClass}>
              {priorityLabels[filters.priority] || filters.priority}
              <button
                type="button"
                onClick={() => clearField({ priority: "" })}
                className="hover:text-red-500"
              >
                <X size={12} />
              </button>
            </span>
          )}

          {filters.date && (
            <span className={badgeClass}>
              {datePresetLabel
                ? datePresetLabel
                : filters.dateOperator === "between"
                ? `${filters.date} – ${filters.dateTo || "?"}`
                : `${filters.date} ${operatorLabels[filters.dateOperator]}`}
              <button
                type="button"
                onClick={() => clearField({ date: "", dateTo: "" })}
                className="hover:text-red-500"
              >
                <X size={12} />
              </button>
            </span>
          )}
        </div>
      )}
    </div>

  );
};
