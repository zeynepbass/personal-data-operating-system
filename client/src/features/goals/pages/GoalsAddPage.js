
"use client";

import { useRouter } from "next/navigation";
import { GoalForm } from "@/features/goals/components/GoalsForm/GoalForm";
import { useGoals } from "@/features/goals/hooks/useGoals";

export default function GoalsPage() {
  const router = useRouter();

  const { mutate: createGoal, isPending } = useGoals();

  const handleSubmit = (goal) => {
    createGoal(goal, {
      onSuccess: () => {
        router.push("/goals");
      },
    });
  };

  return (
    <div className="space-y-6 ">

        <div className="mb-2 pl-5">
          <p className="text-md text-gray-400">
            Yeni Hedef
          </p>

          <h1 className="mt-1 text-2xl font-semibold text-gray-900">
            Yeni hedefler oluştur 
          </h1>

        </div>



        <div className="rounded-2xl shadow-sm bg-white">
      <GoalForm
        onSubmit={handleSubmit}
        isCreating={isPending}
      /></div>
    </div>
  );
}
