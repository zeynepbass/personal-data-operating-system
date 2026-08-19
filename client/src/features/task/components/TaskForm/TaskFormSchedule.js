"use client";

import { Input } from "@/shared/components/atoms";

export function TaskFormSchedule({ task, onChange }) {
  return (
    <div className="">
      <h3 className="mb-4 text-sm font-semibold text-gray-900">
        Tarih Bilgileri
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          type="date"
          label="Başlangıç Tarihi"
          name="startDate"
          value={task.startDate || ""}
          onChange={onChange}
        />

        <Input
          type="date"
          label="Bitiş Tarihi"
          name="dueDate"
          value={task.dueDate || ""}
          onChange={onChange}
        />
      </div>

    </div>
  );
}