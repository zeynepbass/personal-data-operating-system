"use client";
import { useRouter } from "next/navigation";
import { GoalForm } from "@/features/goals/components/GoalsForm/GoalForm";
import { useGoals } from "@/features/goals/hooks/useGoals";
export default function GoalsPage() {
  const { createGoals, isCreating } = useGoals();
  const router = useRouter();

  const handleSubmit = (goal, options) => {
    createGoals(goal, options);
  };

  return (
    <div className="space-y-6">
      {" "}
      <div className="mb-4">
        {" "}
        <p className="text-md text-gray-500 dark:text-gray-400"> Yeni Hedef </p>{" "}
        <h1 className="mt-1 text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {" "}
          Yeni hedefler oluştur{" "}
        </h1>{" "}
      </div>{" "}
      <div className="rounded-2xl bg-white dark:bg-[#1a1a22] shadow-sm">
        {" "}
        <GoalForm
          onSubmit={handleSubmit}
          isCreating={isCreating}
          onCreated={() => router.push("/goals")}
          onCancel={() => router.push("/goals")}
        />{" "}
      </div>{" "}
    </div>
  );
}
