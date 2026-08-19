"use client";

import { useEffect, useRef, useState } from "react";
import { Filter } from "lucide-react";
import { Button, Input } from "@/shared/components/atoms";
import { useGoalCategories } from "../../hooks/useGoalCategories";

export const emptyGoalFilters = {
  categories: [],
  categoryTitle: "",
  goalTitle: "",
};

export default function GoalsFilter({ filters, setFilters }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const { data: categories = [] } = useGoalCategories();

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

  const activeCount =
    filters.categories.length +
    (filters.categoryTitle ? 1 : 0) +
    (filters.goalTitle ? 1 : 0);

  const toggleCategory = (name) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(name)
        ? prev.categories.filter((category) => category !== name)
        : [...prev.categories, name],
    }));
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
        <div className="absolute left-0 top-full z-40 mt-2 w-80 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a1a22] p-4 shadow-lg">
          <div className="mb-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Kategoriler
            </p>

            <div className="scrollbar-thin max-h-40 space-y-1 overflow-y-auto">
              {categories.length === 0 && (
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Henüz kategori yok.
                </p>
              )}

              {categories.map((category) => (
                <label
                  key={category.id}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category.name)}
                    onChange={() => toggleCategory(category.name)}
                    className="h-4 w-4 accent-[#555A8A]"
                  />
                  {category.name}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <Input
              label="Kategori Başlığı"
              value={filters.categoryTitle}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  categoryTitle: e.target.value,
                }))
              }
              placeholder="Kategori adında ara..."
            />
          </div>

          <div>
            <Input
              label="Görev Başlığı"
              value={filters.goalTitle}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  goalTitle: e.target.value,
                }))
              }
              placeholder="Hedef başlığında ara..."
            />
          </div>

          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => setFilters(emptyGoalFilters)}
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
