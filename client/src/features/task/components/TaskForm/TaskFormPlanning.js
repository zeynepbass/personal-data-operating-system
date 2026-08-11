"use client";

import { Input, Select } from "@/shared/components/atoms";

export function TaskFormPlanning({ task, onChange }) {
  return (
    <div className="">
      <h3 className="mb-4 text-sm font-semibold text-gray-900">
        Planlama
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">


        <Select
          label="Öncelik"
          name="priority"
          value={task.priority || ""}
          onChange={onChange}
          options={[
            { value: "low", label: "Düşük" },
            { value: "medium", label: "Orta" },
            { value: "high", label: "Yüksek" },
          ]}
        />

        <Input
          type="number"
          label="Tahmini Süre"
          name="estimatedHours"
          value={task.estimatedHours || ""}
          onChange={onChange}
          placeholder="Örn. 4"
        />

        <Input
          type="number"
          label="Story Points"
          name="storyPoints"
          value={task.storyPoints || ""}
          onChange={onChange}
          placeholder="Örn. 5"
        />
      </div>
    </div>
  );
}