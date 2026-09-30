import "server-only";
import mongoose from "mongoose";

import { connectDB } from "../db/connect";
import { Goal } from "../models/goal.model";
import { paginate } from "../pagination";

/**
 * @param {import("mongoose").Types.ObjectId} userId
 * @param {{ status?: string }} filters
 * @param {{ cursor?: string, limit?: number }} page
 */
export async function findGoalsByUser(userId, { status } = {}, page = {}) {
  await connectDB();
  const filter = { user: userId };
  if (status) filter.status = status;
  return paginate(Goal, filter, page);
}

/**
 * @param {import("mongoose").Types.ObjectId} userId
 * @param {Record<string, unknown>} data
 */
export async function insertGoal(userId, data) {
  await connectDB();
  const goal = await Goal.create({ ...data, user: userId });
  return goal.toObject();
}

/**
 * @param {string} id
 * @param {import("mongoose").Types.ObjectId} userId
 * @param {Record<string, unknown>} data
 */
export async function updateGoalForUser(id, userId, data) {
  await connectDB();
  if (!mongoose.isValidObjectId(id)) return null;
  return Goal.findOneAndUpdate({ _id: id, user: userId }, data, {
    returnDocument: "after",
    runValidators: true,
  }).lean();
}

/**
 * @param {string} id
 * @param {import("mongoose").Types.ObjectId} userId
 */
export async function deleteGoalForUser(id, userId) {
  await connectDB();
  if (!mongoose.isValidObjectId(id)) return null;
  return Goal.findOneAndDelete({ _id: id, user: userId }).lean();
}
