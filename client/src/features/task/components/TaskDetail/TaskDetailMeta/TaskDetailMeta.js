
"use client";

export function TaskDetailMeta({ task }) {
  return (
    <div className="border-t border-gray-200 p-6">
      <h3 className="mb-4 text-sm font-semibold text-gray-900">
        Task Bilgileri
      </h3>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">

        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <span className="text-sm text-gray-500">Task ID</span>

          <span className=" truncate text-sm font-medium text-gray-800">
            {task.id || "-"}
          </span>
        </div>




        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <span className="text-sm text-gray-500">Öncelik</span>

          <span className="text-sm font-medium text-gray-800">
            {task.priority || "-"}
          </span>
        </div>


        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <span className="text-sm text-gray-500">Etiket</span>

          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
            {task.label || "-"}
          </span>
        </div>


        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm text-gray-500">Görev Tarihi</span>

          <span className="text-sm font-medium text-gray-800">
            {task.date || "-"}
          </span>
        </div>
      </div>
    </div>
  );
}
