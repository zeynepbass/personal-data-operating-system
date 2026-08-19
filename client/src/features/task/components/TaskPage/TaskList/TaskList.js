"use client";
import { useState } from "react";
import { Calendar, Clock, Pencil } from "lucide-react";
import { Input } from "@/shared/components/atoms";
import TaskEmptyState from "../TaskEmptyState";
import { countActiveTaskFilters } from "../../../utils/taskFilters";
export default function TaskList({ todayTasks, onToggle, onEditEvent, filters }) {
  const [checked, setChecked] = useState(todayTasks?.completed === true);

const handleChange = async (task) => {
  setChecked(true);

  await onToggle(task);
};

  if (!todayTasks || todayTasks.length === 0) {
    return (
      <TaskEmptyState
        hasFilters={filters ? countActiveTaskFilters(filters) > 0 : false}
      />
    );
  }

  return (
    <div className="space-y-2">
      {todayTasks &&
        todayTasks.map((item) => {
          if (item.itemType === "event") {
            const formattedDate = item.meetingCalendar
              ? new Date(item.meetingCalendar).toLocaleDateString("tr-TR")
              : null;

            return (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-dashed border-gray-300 dark:border-white/15 bg-white/60 dark:bg-white/5 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <Calendar size={16} className="text-gray-400 dark:text-gray-500" />

                  <span className="text-sm text-gray-800 dark:text-gray-100">
                    {item.title}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end gap-0.5">
                    {(item.meeting || formattedDate) && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <Clock size={12} />
                        {[formattedDate, item.meeting].filter(Boolean).join(" · ")}
                      </div>
                    )}

                    {item.relativeTime && (
                      <span className="text-xs font-medium text-[#7d78ce] dark:text-[#a5a1e8]">
                        {item.relativeTime}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    aria-label="Etkinliği düzenle"
                    onClick={() => onEditEvent?.(item)}
                    className="rounded-lg p-2 text-gray-500 dark:text-gray-400 transition hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-gray-100"
                  >
                    <Pencil size={14} />
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-gray-100 dark:border-white/10 bg-white dark:bg-[#1a1a22] px-4 py-3 shadow-sm"
            >
<div className="flex items-center gap-3">
  <Input
    type="checkbox"
    checked={checked}
    onChange={()=>handleChange(item)}
    className="h-4 w-4 accent-indigo-600"
  />

  <span
    className={`text-sm ${
      checked
        ? "text-gray-500 dark:text-gray-500 line-through"
        : "text-gray-800 dark:text-gray-100"
    }`}
  >
    {item?.title}
  </span>
</div>

              {/* <div className="relative">
                <button
                  onClick={() => onMenuClick(task?.id)}
                  className="rounded-lg p-1 hover:bg-gray-100"
                >
                  <MoreVertical size={18} />
                </button>


              </div> */}
            </div>
          );
        })}
    </div>
  );
}
