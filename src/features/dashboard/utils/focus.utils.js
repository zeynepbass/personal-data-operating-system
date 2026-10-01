import { toLocalDay } from "@/shared/helpers/format.helper";

/**
 * @typedef {"day" | "month" | "year"} Duration
 * @typedef {{ date: string | null, status: string }} FocusTask
 */

/** @param {string} value */
const parseDay = (value) => {
  const [year, month, day] = value.split("-").map(Number);
  return { year, month: month - 1, day };
};

/**
 * @param {FocusTask[]} tasks
 * @param {Duration} duration
 * @param {Date} [now]
 */
export function filterTasksByDuration(tasks, duration, now = new Date()) {
  return tasks.filter((task) => {
    if (!task.date) return false;
    const { year, month, day } = parseDay(task.date);
    if (year !== now.getFullYear()) return false;
    if (duration === "year") return true;
    if (month !== now.getMonth()) return false;
    if (duration === "month") return true;
    return day === now.getDate();
  });
}

/** @param {FocusTask[]} tasks */
export function summarizeStatuses(tasks) {
  const count = (status) => tasks.filter((task) => task.status === status).length;
  const todo = count("todo");
  const inProgress = count("in-progress");
  return { total: tasks.length, todo, inProgress, done: count("done"), pending: todo + inProgress };
}

/**
 * @param {FocusTask[]} tasks
 * @param {Duration} duration
 * @param {Date} [now]
 * @returns {Array<{ label: string, count: number }>}
 */
export function buildActivity(tasks, duration, now = new Date()) {
  const inScope = filterTasksByDuration(tasks, duration === "day" ? "month" : duration, now);

  if (duration === "year") {
    return Array.from({ length: 12 }, (_, month) => ({
      label: new Date(now.getFullYear(), month, 1).toLocaleDateString("tr-TR", { month: "short" }),
      count: inScope.filter((task) => parseDay(task.date).month === month).length,
    }));
  }

  if (duration === "month") {
    const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    return Array.from({ length: days }, (_, index) => ({
      label: String(index + 1),
      count: inScope.filter((task) => parseDay(task.date).day === index + 1).length,
    }));
  }

  return Array.from({ length: 7 }, (_, offset) => {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (6 - offset));
    const key = toLocalDay(date);
    return {
      label: date.toLocaleDateString("tr-TR", { weekday: "short" }),
      count: tasks.filter((task) => task.date === key).length,
    };
  });
}
