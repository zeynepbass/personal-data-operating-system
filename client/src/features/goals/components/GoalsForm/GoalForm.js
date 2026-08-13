
"use client";

import { useState } from "react";
import { Button } from "@/shared/components/atoms";

import { GoalFormBasic } from "./GoalFormBasic";
import { GoalFormItems } from "./GoalFormItems";

export function GoalForm({
  initialGoal,
  onSubmit,
  isCreating,
}) {
  const [goal, setGoal] = useState(
    initialGoal || {
      id: "",
      status: "active",
      items: [],
    }
  );

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

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(goal);
  };

  return (
   <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-5">
    <form
      onSubmit={handleSubmit}
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

      <div className="flex justify-end gap-3">
        <Button
          type="submit"
          disabled={isCreating}
          text={
            isCreating
              ? "Oluşturuluyor..."
              : "Hedef Oluştur"
          }
          className="rounded-xl bg-[#555A8A] px-6 py-3 text-gray-50 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>
    </form></div>
  );
}
