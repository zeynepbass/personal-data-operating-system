"use client";
import { useState } from "react";
import { Input } from "@/shared/components/atoms";
export default function TaskList({ todayTasks, onToggle }) {
  const [checked, setChecked] = useState(todayTasks?.completed === true);

const handleChange = async (task) => {
  setChecked(true);

  await onToggle(task);
};
  return (
    <div className="space-y-2">
      {todayTasks &&
        todayTasks.map((task) => {
          return (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm"
            >
<div className="flex items-center gap-3">
  <Input
    type="checkbox"
    checked={checked}
    onChange={()=>handleChange(task)}
    className="h-4 w-4 accent-indigo-600"
  />

  <span
    className={`text-sm ${
      checked
        ? "text-gray-500 line-through"
        : "text-gray-800"
    }`}
  >
    {task?.title}
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
