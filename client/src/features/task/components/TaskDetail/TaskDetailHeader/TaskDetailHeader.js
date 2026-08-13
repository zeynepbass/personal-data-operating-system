"use client";

import { ArrowLeft, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

export function TaskDetailHeader({ task }) {
  const router = useRouter();

  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-3 flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900"
        >
          <ArrowLeft width={16} height={16} />
          Geri dön
        </button>

        <h1 className="text-2xl font-semibold text-gray-900">Task Detayı</h1>

        <p className="mt-1 text-sm text-gray-500">
          Task bilgilerini görüntüle ve düzenle.
        </p>
      </div>

      <button
        type="button"
        onClick={() => {
          localStorage.setItem("selectedTask", JSON.stringify(task));
          router.push(`/tasks/edit/${task.id}`);
        }}
        className="flex items-center gap-2 rounded-xl bg-[#555A8A] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
      >
        {" "}
        <Pencil width={16} height={16} /> Düzenle{" "}
      </button>
    </div>
  );
}
