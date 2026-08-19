"use client";

import { useEffect, useRef, useState } from "react";
import { Filter } from "lucide-react";
import { Button, Select, Input } from "@/shared/components/atoms";
import { useTaskStages } from "../../../hooks/useTaskStages";
import {
  emptyTaskFilters,
  countActiveTaskFilters,
  datePresets,
  getActiveDatePresetLabel,
} from "../../../utils/taskFilters";

const typeOptions = [
  { value: "task", label: "Görev" },
  { value: "event", label: "Etkinlik" },
];

const priorityOptions = [
  { value: "Low", label: "🟢 Low" },
  { value: "Medium", label: "🟡 Medium" },
  { value: "High", label: "🔴 High" },
];

const dateOperatorOptions = [
  { value: "gte", label: "Büyüktür (sonrası)" },
  { value: "lte", label: "Küçüktür (öncesi)" },
  { value: "between", label: "Arasında" },
];

export default function TaskFilter({ filters, setFilters }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const { data: stages = [] } = useTaskStages();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeCount = countActiveTaskFilters(filters);
  const activePreset = getActiveDatePresetLabel(filters);

  const update = (patch) =>
    setFilters((prev) => ({ ...prev, ...patch }));

  const applyPreset = (preset) => {
    const range = preset.getRange();

    update({
      dateOperator: "between",
      date: range.from,
      dateTo: range.to,
    });
  };

  const handleTypeSelect = (value) => {
    if (value === filters.type) {
      update({ type: "" });
      return;
    }

    update({
      type: value,
      priority: value === "event" ? "" : filters.priority,
    });
  };

  return (
    <div className="relative" ref={containerRef}>
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-xl px-4 py-2 text-sm"
        text={
          <span className="flex items-center gap-2">
            <Filter size={16} />
            Filtre
            {activeCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#555A8A] dark:bg-[#7d78ce] px-1 text-xs font-semibold text-white">
                {activeCount}
              </span>
            )}
          </span>
        }
      />

      {open && (
        <div className="scrollbar-thin absolute right-0 top-full z-40 mt-2 max-h-[80vh] w-80 overflow-y-auto rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a1a22] p-4 shadow-lg">
          <div className="mb-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Görev Tipi
            </p>

            <div className="flex gap-2">
              {typeOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleTypeSelect(option.value)}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    filters.type === option.value
                      ? "bg-[#555A8A] dark:bg-[#6f6bb3] text-white"
                      : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Tarih
            </p>

            <div className="grid grid-cols-2 gap-2">
              {datePresets.map((preset) => (
                <button
                  key={preset.key}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    activePreset === preset.label
                      ? "bg-[#555A8A] dark:bg-[#6f6bb3] text-white"
                      : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <Select
              label="Zaman Aralığı"
              value={filters.dateOperator}
              onChange={(e) => update({ dateOperator: e.target.value })}
              options={dateOperatorOptions}
            />

            <Input
              label={
                filters.dateOperator === "between"
                  ? "Başlangıç Tarihi"
                  : "Tarih"
              }
              type="date"
              value={filters.date}
              onChange={(e) => update({ date: e.target.value })}
            />

            {filters.dateOperator === "between" && (
              <Input
                label="Bitiş Tarihi"
                type="date"
                value={filters.dateTo}
                onChange={(e) => update({ dateTo: e.target.value })}
              />
            )}
          </div>

          <div className="mb-4">
            <Select
              label="Aşama"
              value={filters.stage}
              onChange={(e) => update({ stage: e.target.value })}
              placeholder="Tüm aşamalar"
              options={stages.map((stage) => ({
                value: stage.name,
                label: stage.title,
              }))}
            />
          </div>

          {filters.type !== "event" && (
            <div>
              <Select
                label="Önem Derecesi"
                value={filters.priority}
                onChange={(e) => update({ priority: e.target.value })}
                placeholder="Tümü"
                options={priorityOptions}
              />
            </div>
          )}

          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => setFilters(emptyTaskFilters)}
              className="mt-4 text-sm font-medium text-[#7d78ce] hover:text-[#555A8A] dark:hover:text-[#a5a1e8]"
            >
              Filtreleri temizle
            </button>
          )}
        </div>
      )}
    </div>
  );
}
