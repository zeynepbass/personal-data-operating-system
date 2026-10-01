"use client";

import { MoreVertical, Pencil, Trash } from "lucide-react";
import { useState } from "react";

import { Button } from "@/shared/components/atoms";

import { GOAL_CATEGORIES } from "../GoalsForm/GoalFormBasic";
import GoalItem from "../GoalsItem";

export default function GoalsCard({
  id,
  category,
  title,
  progress = 0,
  items = [],
  selectedValue,
  setSelectedValue,
  deletedGoals,
  isUpdating,
  updateGoals,
  openMenu,
  setOpenMenu,
}) {
  const [draft, setDraft] = useState(items);
  const isEditing = selectedValue === id;
  const menuId = `goal-menu-${id}`;

  const startEditing = () => {
    setDraft(items);
    setSelectedValue(id);
    setOpenMenu(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateGoals({ id, data: draft });
  };

  return (
    <article
      aria-labelledby={`goal-title-${id}`}
      className="relative rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">
          {GOAL_CATEGORIES.find((item) => item.value === category)?.label ?? category}
        </p>
        <button
          type="button"
          aria-label={`${title} menüsü`}
          aria-haspopup="menu"
          aria-expanded={openMenu === id}
          aria-controls={menuId}
          onClick={() => setOpenMenu((prev) => (prev === id ? null : id))}
          className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          <MoreVertical size={18} aria-hidden="true" />
        </button>

        {openMenu === id && (
          <div
            id={menuId}
            role="menu"
            className="absolute right-4 top-14 z-50 min-w-30 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 text-sm shadow-lg"
          >
            <button
              type="button"
              role="menuitem"
              onClick={startEditing}
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
            >
              <Pencil size={16} aria-hidden="true" /> Düzenle
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpenMenu(null);
                if (window.confirm(`"${title}" hedefi silinsin mi?`)) deletedGoals(id);
              }}
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-[#7d78ce] hover:bg-gray-100"
            >
              <Trash size={16} aria-hidden="true" /> Sil
            </button>
          </div>
        )}
      </div>

      <h2 id={`goal-title-${id}`} className="mt-2 text-3xl font-bold text-[#555A8A]">
        {title}
      </h2>

      <div className="mt-6 flex items-center gap-4">
        <div
          role="progressbar"
          aria-label={`${title} toplam ilerleme`}
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100"
        >
          <div className="h-full bg-[#555A8A] transition-all" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-sm font-semibold text-gray-600">{progress}%</span>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-3">
        {(isEditing ? draft : items).map((item, index) => (
          <GoalItem
            key={`${id}-${item.title}`}
            title={item.title}
            value={item.value}
            isEditing={isEditing}
            onChange={(value) =>
              setDraft((prev) => prev.map((row, i) => (i === index ? { ...row, value } : row)))
            }
          />
        ))}

        {isEditing && (
          <div className="mt-4 flex justify-center gap-3">
            <Button
              type="button"
              variant="outline"
              text="Vazgeç"
              onClick={() => setSelectedValue(null)}
              className="rounded-xl px-6 py-3"
            />
            <Button
              type="submit"
              disabled={isUpdating}
              text={isUpdating ? "Güncelleniyor..." : "Kaydet"}
              className="rounded-xl px-6 py-3 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>
        )}
      </form>
    </article>
  );
}
