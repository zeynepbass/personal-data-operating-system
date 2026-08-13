"use client";

import { Pencil ,Trash} from "lucide-react";

export default function TableView({
  rows,
  deletedTask,
  openMenuId,
  onMenuClick,
  router,
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Task
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Label
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Status
            </th>

            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
              Date
            </th>

            <th className="w-12 px-3 py-3" />
          </tr>
        </thead>

        <tbody>
          {rows.map((task) => {
            const isMenuOpen = openMenuId === task?.id;

            const statusStyles = {
              "in-progress": "bg-purple-100 text-purple-700",
              Done: "bg-orange-100 text-orange-700",
              Todo: "bg-green-100 text-green-700",
            };

            return (
              <tr
                key={task?.id}
                className="border-b border-gray-100 transition-colors hover:bg-gray-50"
              >
                <td className="px-5 py-4">
                  <p className="font-medium text-gray-900">
                    {task?.title || "-"}
                  </p>
                </td>

                <td className="px-5 py-4">
                  {task?.label ? (
                    <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                      {task.label}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">-</span>
                  )}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                      statusStyles[task?.status] ||
                      "bg-gray-200 text-gray-700"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-current" />
                    {task?.status || "-"}
                  </span>
                </td>

                <td className="px-5 py-4 text-sm text-gray-500">
                  {task?.date || "-"}
                </td>

                <td className="relative px-3 py-4 text-right">
                  <button
                    type="button"
                    aria-label="Task menüsünü aç"
                    onClick={() => onMenuClick(task?.id)}
                    className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
                  >
                    ⋮
                  </button>

                  {isMenuOpen && (
                    <div className="absolute right-2 top-12 z-50 min-w-10 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 text-sm shadow-lg">
                      <button
                        type="button"
                        onClick={() => {
                          localStorage.setItem(
                            "selectedTask",
                            JSON.stringify(task)
                          );

                          router.push(`/tasks/${task.id}`);
                        }}
                        className="flex w-full items-center gap-2 px-4 py-2 text-left text-gray-700 transition-colors hover:bg-gray-100"
                      >
                        <Pencil size={16} />
              
                      </button>
                      <button
                        type="button"
                        onClick={() => deletedTask({ id: task.id })}
                        className="flex w-full items-center gap-2 px-4 py-2 text-left text-[#7d78ce] transition-colors hover:bg-gray-100"
                      >
                        <Trash size={16} />
      
                      </button>
                    </div>
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