
"use client";

import { Calendar, Clock, Gauge } from "lucide-react";

export function TaskDetaiInfo({ task }) {
  return (
    <div className="grid grid-cols-1 gap-4 p-6 lg:grid-cols-2">




      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-start gap-3">
          <div className="shrink-0 rounded-lg bg-white p-2 shadow-sm">
            <Calendar size={18} className="text-gray-600" />
          </div>

          <div className="flex-1">
            <p className="text-xs font-medium text-gray-400">Tarih</p>

            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-gray-500">Başlangıç</span>
                <span className="font-medium text-gray-800">
                  {task.startDate || "-"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-gray-500">Bitiş</span>
                <span className="font-medium text-gray-800">
                  {task.dueDate || "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-start gap-3">
          <div className="shrink-0 rounded-lg bg-white p-2 shadow-sm">
            <Clock size={18} className="text-gray-600" />
          </div>

          <div className="flex-1">
            <p className="text-xs font-medium text-gray-400">
              Planlama
            </p>

            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-gray-500">Tahmini Süre</span>
                <span className="font-medium text-gray-800">
                  {task.estimatedHours ? `${task.estimatedHours} saat` : "-"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="flex items-center gap-1.5 text-gray-500">
                  <Gauge size={14} />
                  Zorluk Derecesi
                </span>

                <span className="font-medium text-gray-800">
                  {task.storyPoints || "-"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

