"use client";

import { Select } from "@/shared/components/atoms";

export default function DashboardDuration({
  value,
  onChange,
}) {
  return (
    <div className="w-full md:w-52">
      <Select
        name="durationType"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Zaman Birimi"
        options={[
          { value: "day", label: "Gün" },
          { value: "month", label: "Ay" },
          { value: "year", label: "Yıl" },
        ]}
      />
    </div>
  );
}