"use client";
import { GoalForm } from "@/features/goals/components/GoalsForm/GoalForm";
import { useGoals } from "@/features/goals/hooks/useGoals";
import {ArrowLeft} from "lucide-react"

export default function GoalsPage() {
  const { createGoals, isCreating,router } = useGoals();

  return (
    <div className="space-y-6">
      {" "}
      <div>
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-3 flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900"
        >
          <ArrowLeft width={16} height={16} />
          Geri dön
        </button>

        <h1 className="text-2xl font-semibold text-gray-900">Yeni Hedef</h1>

        <p className="mt-1 text-sm text-gray-500">
          Hedeflerinize bir yenisini daha ekleyin.
        </p>
      </div>
      <div className="rounded-2xl bg-white shadow-sm">
        {" "}
        <GoalForm onSubmit={createGoals} isCreating={isCreating} />{" "}
      </div>{" "}
    </div>
  );
}

