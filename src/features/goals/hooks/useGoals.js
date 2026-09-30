"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "react-hot-toast";

import { handleActionResult } from "@/shared/helpers/form.helper";

import {
  createGoalAction,
  deleteGoalAction,
  updateGoalProgressAction,
} from "../actions/goal.actions";

export function useGoals() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedValue, setSelectedValue] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const run = (action, successMessage, { form, onSuccess } = {}) =>
    startTransition(async () => {
      const result = await action();
      const ok = form ? handleActionResult(form, result) : result.ok;
      if (!ok) {
        if (!form) toast.error(result.error);
        return;
      }
      toast.success(successMessage);
      onSuccess?.(result.data);
    });

  return {
    router,
    isPending,
    selectedValue,
    setSelectedValue,
    openMenu,
    setOpenMenu,
    createGoals: (data, form) =>
      run(() => createGoalAction(data), "Hedef oluşturuldu.", {
        form,
        onSuccess: () => router.push("/goals"),
      }),
    deletedGoals: (id) => run(() => deleteGoalAction(id), "Hedef silindi."),
    updateGoals: ({ id, data }) =>
      run(() => updateGoalProgressAction(id, data), "Hedef güncellendi.", {
        onSuccess: () => setSelectedValue(null),
      }),
  };
}
