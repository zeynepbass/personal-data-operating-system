
"use client";

import { useState } from "react";
import { Button } from "@/shared/components/atoms";

import { GoalFormBasic } from "./GoalFormBasic";
import { GoalFormItems } from "./GoalFormItems";

const initialGoal = {
  title: "",
  status: "active",
  category: "",
  items: [],
};

export function GoalForm({
  onSubmit,
  isCreating,
  onCreated,
  onCancel,
}) {
  const [goal, setGoal] = useState(initialGoal);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setGoal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemsChange = (items) => {
    setGoal((prev) => ({
      ...prev,
      items,
    }));
  };

  const submitGoal = (afterSuccess) => {
    onSubmit(goal, { onSuccess: afterSuccess });
  };

  const handleSaveAndClose = (event) => {
    event.preventDefault();
    submitGoal(() => onCreated?.());
  };

  const handleSaveAndNew = (event) => {
    event.preventDefault();
    submitGoal(() => setGoal(initialGoal));
  };

  return (
   <div className="space-y-4 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#1a1a22] ">
    <form
      onSubmit={handleSaveAndClose}
      className="space-y-4  p-5"
    >
      <GoalFormBasic
        goal={goal}
        onChange={handleChange}
      />

      <GoalFormItems
        items={goal.items}
        onChange={handleItemsChange}
      />

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          disabled={isCreating}
          onClick={onCancel}
          text="Vazgeç"
          className="rounded-xl px-6 py-3 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <Button
          type="button"
          variant="outline"
          disabled={isCreating}
          onClick={handleSaveAndNew}
          text={
            isCreating
              ? "Oluşturuluyor..."
              : "Kaydet ve Yeni Ekle"
          }
          className="rounded-xl px-6 py-3 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <Button
          type="submit"
          disabled={isCreating}
          text={
            isCreating
              ? "Oluşturuluyor..."
              : "Hedef Oluştur"
          }
          className="rounded-xl px-6 py-3 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>
    </form></div>
  );
}
