import { describe, expect, it } from "vitest";

import {
  groupTasksByStatus,
  getTodayTasks,
  transformTasksToRows,
} from "@/features/task/utils/colums.filter";
import { toLocalDay } from "@/shared/helpers/format.helper";

import { buildActivity, filterTasksByDuration, summarizeStatuses } from "./focus.utils";

const now = new Date(2026, 2, 15, 12);
const tasks = [
  { id: "1", date: "2026-03-15", status: "todo" },
  { id: "2", date: "2026-03-10", status: "done" },
  { id: "3", date: "2026-01-02", status: "in-progress" },
  { id: "4", date: "2025-03-15", status: "todo" },
  { id: "5", date: null, status: "todo" },
];

describe("focus utils", () => {
  it("filters by day, month and year without timezone drift", () => {
    expect(filterTasksByDuration(tasks, "day", now).map((t) => t.id)).toEqual(["1"]);
    expect(filterTasksByDuration(tasks, "month", now).map((t) => t.id)).toEqual(["1", "2"]);
    expect(filterTasksByDuration(tasks, "year", now).map((t) => t.id)).toEqual(["1", "2", "3"]);
  });

  it("summarizes statuses", () => {
    expect(summarizeStatuses(tasks)).toEqual({
      total: 5,
      todo: 3,
      inProgress: 1,
      done: 1,
      pending: 4,
    });
    expect(summarizeStatuses([])).toEqual({
      total: 0,
      todo: 0,
      inProgress: 0,
      done: 0,
      pending: 0,
    });
  });

  it("builds activity series with unique labels", () => {
    const week = buildActivity(tasks, "day", now);
    expect(week).toHaveLength(7);
    expect(week.at(-1).count).toBe(1);
    expect(new Set(week.map((d) => d.label)).size).toBe(7);

    const month = buildActivity(tasks, "month", now);
    expect(month).toHaveLength(31);
    expect(month[9].count).toBe(1);

    const year = buildActivity(tasks, "year", now);
    expect(year.map((m) => m.count)).toEqual([1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });
});

describe("board utils", () => {
  const board = [
    {
      id: "m1",
      title: "Sprint",
      tasks: [
        {
          id: "a",
          status: "todo",
          date: toLocalDay(),
          assignee: { id: "u1" },
        },
        { id: "b", status: "done", date: null, assignee: { id: "u2" } },
      ],
    },
    {
      id: "m2",
      title: "Retro",
      tasks: [{ id: "c", status: "in-progress", assignee: { id: "u1" } }],
    },
  ];

  it("groups by each task's own status", () => {
    const columns = groupTasksByStatus(board);
    expect(columns.map((c) => [c.id, c.tasks.map((t) => t.id)])).toEqual([
      ["todo", ["a"]],
      ["in-progress", ["c"]],
      ["done", ["b"]],
    ]);
  });

  it("flattens rows with their meeting", () => {
    expect(transformTasksToRows(board).map((r) => [r.id, r.meetingTitle])).toEqual([
      ["a", "Sprint"],
      ["b", "Sprint"],
      ["c", "Retro"],
    ]);
  });

  it("returns today's open tasks for the given user only", () => {
    expect(getTodayTasks(board, "u1").map((t) => t.id)).toEqual(["a"]);
    expect(getTodayTasks(board, "u2")).toEqual([]);
    expect(getTodayTasks(board, undefined)).toEqual([]);
  });
});
