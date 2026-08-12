"use client";

import { useState } from "react";

import { Button } from "@/shared/components/atoms";

import { TaskFormBasic } from "./TaskFormBasic";
import { TaskFormSchedule } from "./TaskFormSchedule";
import { TaskFormPlanning } from "./TaskFormPlanning";

export function TaskForm({ initialTask, onSubmit,isUpdating }) {
  const [task, setTask] = useState(initialTask);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(task);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-5">
      <TaskFormBasic
        task={task}
        onChange={handleChange}
      />

      <TaskFormSchedule
        task={task}
        onChange={handleChange}
      />

      <TaskFormPlanning
        task={task}
        onChange={handleChange}
      />

      <div className="flex justify-end gap-3">

     
                 <Button
                   type="submit"
                   disabled={isUpdating}
                   text={
                     isUpdating
                       ? "Oluşturuluyor..."
                       : "Görevi Düzenle"
                   }
                   className="rounded-xl bg-[#555A8A] px-6 py-3 text-gray-50 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                 />
      </div>
    </form>
  );
}