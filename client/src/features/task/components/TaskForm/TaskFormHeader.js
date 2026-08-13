
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { TaskForm } from "@/features/task/components/TaskForm";
import { NotFound } from "@/shared/components/organisms";

export default function TaskEditPage() {
  const router = useRouter();
  const { id } = useParams();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedTask = localStorage.getItem("selectedTask");

    if (!storedTask) {
      setLoading(false);
      return;
    }

    try {
      const parsedTask = JSON.parse(storedTask);

      if (String(parsedTask.id) === String(id)) {
        setTask(parsedTask);
      }
    } catch (error) {
      console.error("Task okunamadı:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = (updatedTask) => {
    localStorage.setItem(
      "selectedTask",
      JSON.stringify(updatedTask)
    );

    router.push(`/tasks/${updatedTask.id}`);
  };

  const handleCancel = () => {
    router.push(`/tasks/${id}`);
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center ">
        <p className="text-sm text-gray-500">
          Yükleniyor...
        </p>
      </main>
    );
  }

  if (!task) {
    return (
      <main className="flex min-h-screen items-center justify-center  p-6">
        <NotFound
          title="Oopss!"
          description="Task bulunamadı."
          linkText="Böyle bir task bulunamadı."
          buttonText="Tasklere Dön"
          route="/tasks"
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen ">
      <div className="mx-auto max-w-full">

        <div className="mb-6">
          <p className="text-sm font-medium text-gray-400">
            Task Düzenleme
          </p>

          <h1 className="mt-1 text-2xl font-semibold text-gray-900">
            {task.title}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Task bilgilerini güncelleyebilirsiniz.
          </p>
        </div>


        <div className="rounded-2xl shadow-sm">
          <TaskForm
            initialTask={task}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </main>
  );
}
