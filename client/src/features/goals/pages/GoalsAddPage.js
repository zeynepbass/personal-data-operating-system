"use client";
import { GoalForm } from "@/features/goals/components/GoalsForm/GoalForm";
import { useGoals } from "@/features/goals/hooks/useGoals";
export default function GoalsPage() {
  const { createGoals, isCreating } = useGoals();
  return (
    <div className="space-y-6">
      {" "}
      <div className="mb-4">
        {" "}
        <p className="text-md text-gray-400"> Yeni Hedef </p>{" "}
        <h1 className="mt-1 text-2xl font-semibold text-gray-900">
          {" "}
          Yeni hedefler oluştur{" "}
        </h1>{" "}
      </div>{" "}
      <div className="rounded-2xl bg-white shadow-sm">
        {" "}
        <GoalForm onSubmit={createGoals} isCreating={isCreating} />{" "}
      </div>{" "}
    </div>
  );
}

