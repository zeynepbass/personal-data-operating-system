import "server-only";

import { analyticsRangeSchema } from "@/shared/schemas/task";

import { connectDB } from "../db/connect";
import { Task } from "../models/task.model";
import { parseInput } from "../validation";

import { toTaskDTO } from "./task.service";

const WEEKDAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

/**
 * @typedef {{ _id: import("mongoose").Types.ObjectId, role: string }} Actor
 * @typedef {{
 *   tasks: import("./task.service").TaskDTO[],
 *   totalTasks: number,
 *   completedTasks: number,
 *   totalEstimatedHours: number,
 *   chartData: Array<{ day: string, value: number }>,
 *   mostProductiveDay: { day: string, value: number } | null,
 *   mostWorkedCategory: { category: string, count: number, percentage: number } | null,
 * }} TaskAnalytics
 */

/**
 * @param {Actor} actor
 * @param {unknown} range
 * @returns {Promise<TaskAnalytics>}
 */
export async function getTaskAnalytics(actor, range) {
  const { from, to } = parseInput(analyticsRangeSchema, range);
  const end = new Date(to);
  end.setUTCHours(23, 59, 59, 999);

  await connectDB();
  const docs = await Task.find({ assignee: actor._id, date: { $gte: from, $lte: end } })
    .sort({ date: 1 })
    .lean();
  const tasks = docs.map(toTaskDTO);

  const chartData = WEEKDAYS.map((day) => ({ day, value: 0 }));
  const labelCounts = new Map();

  for (const task of docs) {
    chartData[(new Date(task.date).getUTCDay() + 6) % 7].value += 1;
    const label = task.label?.trim();
    if (label) labelCounts.set(label, (labelCounts.get(label) ?? 0) + 1);
  }

  const mostProductiveDay = tasks.length
    ? chartData.reduce((best, current) => (current.value > best.value ? current : best))
    : null;

  const [topLabel] = [...labelCounts.entries()].sort((a, b) => b[1] - a[1]);

  return {
    tasks,
    totalTasks: tasks.length,
    completedTasks: tasks.filter((task) => task.completed).length,
    totalEstimatedHours: tasks.reduce((sum, task) => sum + task.estimatedHours, 0),
    chartData,
    mostProductiveDay,
    mostWorkedCategory: topLabel
      ? {
          category: topLabel[0],
          count: topLabel[1],
          percentage: Math.round((topLabel[1] / tasks.length) * 100),
        }
      : null,
  };
}
