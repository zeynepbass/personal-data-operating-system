"use client";

import { useEffect, useState } from "react";
import {  useParams } from "next/navigation";

import { TaskForm } from "@/features/task/components/TaskForm";
import { NotFound } from "@/shared/components/organisms";
import { useTasks } from "@/features/task/hooks/useTask";

export default function TaskEditPage() {

  const { id } = useParams();

  const { updateTask, isUpdating,router } = useTasks();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedTask = localStorage.getItem("selectedTask");

    if (!storedTask) {
      setLoading(false);
      return;
    }

    const parsedTask = JSON.parse(storedTask);

    if (String(parsedTask.id) === String(id)) {
      setTask(parsedTask);
    }

    setLoading(false);
  }, [id]);

  const handleSubmit = (updatedTask) => {
    updateTask(
      {
        id,
        data: updatedTask,
      },
      {
        onSuccess: () => {
          localStorage.setItem(
            "selectedTask",
            JSON.stringify(updatedTask)
          );

          router.push(`/tasks/${id}`);
        },
      }
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-500">
          Yükleniyor...
        </p>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <NotFound
          title="Oopss!"
          description="Task bulunamadı."
          linkText="Böyle bir task bulunamadı."
          buttonText="Tasklere Dön"
          route="/tasks"
        />
      </div>
    );
  }

  return (
    <main className="min-h-screen  p-6">
      <div>
        <div className="mb-2">
          <p className="text-md text-gray-500">
            Task Düzenle
          </p>

          <h1 className="mt-1 text-2xl font-semibold text-gray-900">
            {task.title}
          </h1>

          <p className="mt-1 text-md text-gray-500">
            Task bilgilerini güncelleyebilirsiniz.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
          <TaskForm
            initialTask={task}
            onSubmit={handleSubmit}
            isLoading={isUpdating}
          />
        </div>
      </div>
    </main>
  );
}