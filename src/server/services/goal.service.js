import "server-only";

import {
  deriveGoalStatus,
  goalFilterSchema,
  goalProgressSchema,
  goalSchema,
} from "@/shared/schemas/goal";

import { AppError } from "../errors";
import { pageQuerySchema } from "../pagination";
import {
  deleteGoalForUser,
  findGoalsByUser,
  insertGoal,
  updateGoalForUser,
} from "../repositories/goal.repository";
import { parseInput } from "../validation";

/**
 * @typedef {{ _id: import("mongoose").Types.ObjectId, role: string }} Actor
 * @typedef {{
 *   id: string, title: string, category: string, status: "active" | "completed",
 *   progress: number, items: Array<{ title: string, value: number }>,
 *   createdAt: string, updatedAt: string,
 * }} GoalDTO
 */

/**
 * @param {any} goal
 * @returns {GoalDTO}
 */
export function toGoalDTO(goal) {
  const items = (goal.items ?? []).map((item) => ({ title: item.title, value: item.value ?? 0 }));
  return {
    id: String(goal._id),
    title: goal.title,
    category: goal.category,
    status: goal.status === "completed" ? "completed" : "active",
    progress: Math.min(
      100,
      items.reduce((sum, item) => sum + item.value, 0),
    ),
    items,
    createdAt: new Date(goal.createdAt).toISOString(),
    updatedAt: new Date(goal.updatedAt).toISOString(),
  };
}

const notFound = () => new AppError("NOT_FOUND", "Hedef bulunamadı.");

/**
 * @param {Actor} actor
 * @param {unknown} [query]
 */
export async function listGoals(actor, query = {}) {
  const filters = parseInput(goalFilterSchema, query);
  const page = parseInput(pageQuerySchema, query);
  const result = await findGoalsByUser(actor._id, filters, page);
  return { items: result.items.map(toGoalDTO), nextCursor: result.nextCursor };
}

/**
 * @param {Actor} actor
 * @param {unknown} input
 * @returns {Promise<GoalDTO>}
 */
export async function createGoal(actor, input) {
  const data = parseInput(goalSchema, input);
  const goal = await insertGoal(actor._id, { ...data, status: deriveGoalStatus(data.items) });
  return toGoalDTO(goal);
}

/**
 * @param {Actor} actor
 * @param {string} id
 * @param {unknown} items
 * @returns {Promise<GoalDTO>}
 */
export async function updateGoalProgress(actor, id, items) {
  const data = parseInput(goalProgressSchema, items);
  const goal = await updateGoalForUser(id, actor._id, {
    items: data,
    status: deriveGoalStatus(data),
  });
  if (!goal) throw notFound();
  return toGoalDTO(goal);
}

/**
 * @param {Actor} actor
 * @param {string} id
 */
export async function deleteGoal(actor, id) {
  const goal = await deleteGoalForUser(id, actor._id);
  if (!goal) throw notFound();
}
