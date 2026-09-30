"use server";

import { revalidatePath } from "next/cache";

import { runAction } from "@/server/action";
import { requireUser } from "@/server/auth/dal";
import * as goalService from "@/server/services/goal.service";

/** @param {unknown} input */
export async function createGoalAction(input) {
  return runAction(async () => {
    const goal = await goalService.createGoal(await requireUser(), input);
    revalidatePath("/goals");
    return goal;
  });
}

/**
 * @param {string} id
 * @param {unknown} items
 */
export async function updateGoalProgressAction(id, items) {
  return runAction(async () => {
    const goal = await goalService.updateGoalProgress(await requireUser(), id, items);
    revalidatePath("/goals");
    return goal;
  });
}

/** @param {string} id */
export async function deleteGoalAction(id) {
  return runAction(async () => {
    await goalService.deleteGoal(await requireUser(), id);
    revalidatePath("/goals");
  });
}
