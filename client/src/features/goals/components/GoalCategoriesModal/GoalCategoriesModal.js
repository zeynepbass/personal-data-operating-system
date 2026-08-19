"use client";

import { useState } from "react";
import { Trash } from "lucide-react";
import { Button, Input, Heading } from "@/shared/components/atoms";
import { useGoalCategories } from "../../hooks/useGoalCategories";

export default function GoalCategoriesModal({ open, setOpen }) {
  const [name, setName] = useState("");
  const {
    data: categories = [],
    isLoading,
    createGoalCategory,
    deleteGoalCategory,
    isCreating,
    isDeleting,
  } = useGoalCategories();

  if (!open) return null;

  const handleClose = () => {
    setName("");
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = name.trim();
    if (!trimmed) return;

    createGoalCategory(
      { name: trimmed },
      {
        onSuccess: () => setName(""),
      }
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white dark:bg-[#1a1a22] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-white/10 p-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Hedef Kategorileri
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Hedeflerinizde kullanılacak kategorileri yönetin.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 text-gray-500 dark:text-gray-400 transition hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-gray-100"
          >
            ✕
          </button>
        </div>

        <div className="scrollbar-thin max-h-[60vh] overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="flex items-end gap-3">
            <div className="flex-1">
              <Input
                label="Yeni kategori"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Örn. Sağlık Hedefleri"
              />
            </div>

            <Button
              type="submit"
              disabled={isCreating || !name.trim()}
              text={isCreating ? "Ekleniyor..." : "Ekle"}
              className="rounded-xl px-5 py-3 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </form>

          <div className="mt-6 space-y-2">
            {isLoading && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Yükleniyor...
              </p>
            )}

            {!isLoading && categories.length === 0 && (
              <div className="rounded-xl border border-dashed border-gray-300 dark:border-white/15 p-6 text-center text-sm text-gray-500 dark:text-gray-400">
                Henüz kategori eklenmedi.
              </div>
            )}

            {categories.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 px-4 py-3"
              >
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {category.name}
                </span>

                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => deleteGoalCategory(category.id)}
                  className="rounded-lg p-2 text-[#7d78ce] transition hover:bg-red-50 dark:hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
