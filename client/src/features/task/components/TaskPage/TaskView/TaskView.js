"use client";

import { Pencil ,Trash, Calendar} from "lucide-react";
import { stageColorClasses } from "../../../utils/stageColors";
import TaskEmptyState from "../TaskEmptyState";
import { countActiveTaskFilters } from "../../../utils/taskFilters";

const priorityClasses = {
  Low: "bg-green-50 dark:bg-green-400/10 text-green-700 dark:text-green-300",
  Medium: "bg-yellow-50 dark:bg-yellow-400/10 text-yellow-700 dark:text-yellow-300",
  High: "bg-red-50 dark:bg-red-400/10 text-red-700 dark:text-red-300",
};

export default function TableView({
  rows,
  deletedTask,
  openMenuId,
  onMenuClick,
  onEditEvent,
  router,
  filters,
}) {
  if (!rows || rows.length === 0) {
    return (
      <TaskEmptyState
        hasFilters={filters ? countActiveTaskFilters(filters) > 0 : false}
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a1a22] p-2 shadow-sm">
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Task
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Önem Derecesi
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Status
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Date
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Kalan Süre
            </th>

            <th className="w-12 px-3 py-3" />
          </tr>
        </thead>

        <tbody>
          {rows.map((task) => {
            const isMenuOpen = openMenuId === task?.id;
            const isEvent = task?.itemType === "event";
            const color = stageColorClasses[task?.statusColor] ?? stageColorClasses.gray;

            const formattedDate = isEvent
              ? task.meetingCalendar
                ? `${new Date(task.meetingCalendar).toLocaleDateString("tr-TR")}${
                    task.meeting ? ` · ${task.meeting}` : ""
                  }`
                : "-"
              : task?.date || "-";

            return (
              <tr
                key={task?.id}
                className="border-b border-gray-100 dark:border-white/10 transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
              >
                <td className="px-5 py-4">
                  <p className="flex items-center gap-2 font-medium text-gray-900 dark:text-gray-100">
                    {isEvent && (
                      <Calendar size={14} className="shrink-0 text-gray-400 dark:text-gray-500" />
                    )}
                    {task?.title || "-"}
                  </p>
                </td>

                <td className="px-5 py-4">
                  {!isEvent && task?.priority ? (
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        priorityClasses[task.priority] ||
                        "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {task.priority}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-500 dark:text-gray-400">-</span>
                  )}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${color.badge} ${color.text}`}
                  >
                    <span className="h-2 w-2 rounded-full bg-current" />
                    {task?.status || "-"}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {formattedDate}
                </td>

                <td className="px-5 py-4 text-sm">
                  {isEvent && task.relativeTime ? (
                    <span className="font-medium text-[#7d78ce] dark:text-[#a5a1e8]">
                      {task.relativeTime}
                    </span>
                  ) : (
                    <span className="text-gray-400 dark:text-gray-500">-</span>
                  )}
                </td>

                <td className="relative px-3 py-4 text-right">
                  {isEvent ? (
                    <button
                      type="button"
                      aria-label="Etkinliği düzenle"
                      onClick={() => onEditEvent?.(task)}
                      className="rounded-lg p-2 text-gray-500 dark:text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-gray-100"
                    >
                      <Pencil size={16} />
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        aria-label="Task menüsünü aç"
                        onClick={() => onMenuClick(task?.id)}
                        className="rounded-lg p-2 text-gray-500 dark:text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-gray-100"
                      >
                        ⋮
                      </button>

                      {isMenuOpen && (
                        <div className="absolute right-2 top-12 z-50 min-w-10 overflow-hidden rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#232330] py-1 text-sm shadow-lg">
                          <button
                            type="button"
                            onClick={() => {
                              localStorage.setItem(
                                "selectedTask",
                                JSON.stringify(task)
                              );

                              router.push(`/tasks/${task.id}`);
                            }}
                            className="flex w-full items-center gap-2 px-4 py-2 text-left text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-white/10"
                          >
                            <Pencil size={16} />

                          </button>
                          <button
                            type="button"
                            onClick={() => deletedTask({ id: task.id })}
                            className="flex w-full items-center gap-2 px-4 py-2 text-left text-[#7d78ce] transition-colors hover:bg-gray-100 dark:hover:bg-white/10"
                          >
                            <Trash size={16} />

                          </button>
                        </div>
                      )}
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
