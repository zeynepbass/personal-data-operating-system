"use client";

import { Input, Textarea } from "@/shared/components/atoms";

export function TaskFormBasic({ task, onChange }) {
  return (
    <div className="">
      <h3 className="mb-4 text-sm font-semibold text-gray-900">
        Temel Bilgiler
      </h3>

      <div className="space-y-4">
        <Input
          label="Task Başlığı"
          name="title"
          value={task.title || ""}
          onChange={onChange}
          placeholder="Task başlığını girin"
        />

        <Textarea
          label="Açıklama"
          name="description"
          value={task.description || ""}
          onChange={onChange}
          placeholder="Task açıklamasını girin"
        />

        <Input
          label="Etiket"
          name="label"
          value={task.label || ""}
          onChange={onChange}
          placeholder="Örn. frontend"
        />
      </div>
    </div>
  );
}