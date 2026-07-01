"use client";

import { MoreVertical } from "lucide-react";

export const ListView = ({
  tasks = [],
  onToggle,
  onMenuClick,
  openMenuId,
}) => {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100"
        >

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={task.completed || false}
              onChange={() => onToggle(task.id)}
              className="w-4 h-4 accent-indigo-600"
            />

            <span
              className={`text-sm ${
                task.completed
                  ? "line-through text-gray-400"
                  : "text-gray-800"
              }`}
            >
              {task.title}
            </span>
          </div>

  
          <div className="relative">
            <button
              onClick={() => onMenuClick(task.id)}
              className="p-1 rounded-lg hover:bg-gray-100"
            >
              <MoreVertical size={18} />
            </button>

            {openMenuId === task.id && (
              <div className="absolute right-0 top-8 bg-white border shadow rounded-lg text-sm z-50">
                <button className="px-3 py-2 hover:bg-gray-100 w-full text-left">
                  Düzenle
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};