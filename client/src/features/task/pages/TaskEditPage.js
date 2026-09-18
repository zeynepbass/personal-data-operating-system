"use client";

import { useParams, useRouter } from "next/navigation";

import { TaskForm } from "@/features/task/components/TaskForm";
import { NotFound } from "@/shared/components/organisms";
import { useTasks, useTaskById } from "@/features/task/hooks/useTask";

export default function TaskEditPage() {
  const router = useRouter();
  const { id } = useParams();

  const { task, isLoading } = useTaskById(id);
  const { updateTask, updateTaskPending } = useTasks();

  const handleSubmit = (updatedTask) => {
    updateTask(
      {
        id,
        data: updatedTask,
      },
      {
        onSuccess: () => {
          router.push(`/tasks/${id}`);
        },
      }
    );
  };

  if (isLoading) {
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
          <p className="text-sm font-medium text-gray-500">
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
            isUpdating={updateTaskPending}
          />
        </div>
      </div>
    </main>
  );
}
