"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "react-hot-toast";

import { TaskForm } from "@/features/task/components/TaskForm";

import { updateTaskAction } from "../actions/task.actions";

export default function TaskEditPage({ task }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (updatedTask) =>
    startTransition(async () => {
      const result = await updateTaskAction(task.id, updatedTask);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Görev güncellendi.");
      router.push(`/tasks/${task.id}`);
    });

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-full">
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-500">Task Düzenleme</p>

          <h1 className="mt-1 text-2xl font-semibold text-gray-900">{task.title}</h1>

          <p className="mt-1 text-sm text-gray-500">Task bilgilerini güncelleyebilirsiniz.</p>
        </div>

        <div className="rounded-2xl shadow-sm">
          <TaskForm initialTask={task} onSubmit={handleSubmit} isUpdating={isPending} />
        </div>
      </div>
    </main>
  );
}
