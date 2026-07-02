"use client";

import { MoreVertical } from "lucide-react";
import { Button, Input } from "@/components/atoms";
export const ListView = ({ tasks = [], onToggle, onMenuClick, openMenuId }) => {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
  key={task.id}
  className="flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm"
>
  <div className="flex items-center gap-3">
    <Input
      type="checkbox"
      checked={task.completed || false}
      onChange={() => onToggle(task.id)}
      className="h-4 w-4 accent-indigo-600"
    />

    <span
      className={`text-sm ${
        task.completed
          ? "text-gray-500 line-through"
          : "text-gray-800"
      }`}
    >
      {task.title}
    </span>
  </div>

  <div className="relative">
    <button
      onClick={() => onMenuClick(task.id)}
      className="rounded-lg p-1 hover:bg-gray-100"
    >
      <MoreVertical size={18} />
    </button>

    {openMenuId === task.id && (
      <div className="absolute right-0 top-8 z-50">
        <Button text="Düzenle" className="hover:text-white"/>
      </div>
    )}
  </div>
</div>
      ))}
    </div>
  );
};
