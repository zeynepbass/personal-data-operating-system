"use client";

import { MoreVertical,Pencil } from "lucide-react";
import Input from "@/shared/components/atoms/Input";
export default function TaskList  ({ todayTasks, onToggle, onMenuClick, openMenuId ,router})  {

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
                  checked={task?.completed || false}
                  onChange={() => onToggle(task?.id)}
                  className="h-4 w-4 accent-indigo-600"
                />

                <span
                  className={`text-sm ${
                    task?.completed
                      ? "text-gray-500 line-through"
                      : "text-gray-800"
                  }`}
                >
                  {task?.title}
                </span>
              </div>

              <div className="relative">
                <button
                  onClick={() => onMenuClick(task?.id)}
                  className="rounded-lg p-1 hover:bg-gray-100"
                >
                  <MoreVertical size={18} />
                </button>

                {openMenuId === task?.id && (
           <div className="absolute right-0 top-5 z-50 rounded-lg bg-white text-sm shadow">
           <div
          onClick={() => {
           localStorage.setItem(
            "selectedTask",
             JSON.stringify(task)
           );
         
           router.push(`/tasks/${task.id}`);
         }}
             className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-100"
           >
             <Pencil width={16} height={16} />
         
           </div>
         </div>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};
