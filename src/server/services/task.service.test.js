import { beforeEach, describe, expect, it } from "vitest";

import { clearDatabase, createTestUser } from "@tests/helpers/db";

import { Notification } from "../models/notification.model";

import { getTaskAnalytics } from "./analytics.service";
import { listNotifications, markAllNotificationsRead } from "./notification.service";
import {
  changeTaskStatus,
  createMeetingWithTasks,
  deleteTask,
  getTask,
  listAssignableUsers,
  listBoard,
  toggleTaskCompletion,
  updateTask,
} from "./task.service";

const meetingInput = (assignees, overrides = {}) => ({
  title: "Sprint",
  name: "todo",
  meeting: "https://meet.example/abc",
  meetingCalendar: "2026-03-02",
  meetingDetails: "",
  tasks: assignees.map((email, index) => ({
    title: `Task ${index}`,
    description: "desc",
    label: "Frontend",
    priority: "High",
    assignee: email,
    date: "2026-03-02",
    startDate: "2026-03-01",
    dueDate: "2026-03-05",
    estimatedHours: "3",
    storyPoints: 2,
  })),
  ...overrides,
});

async function setup() {
  const { user: admin } = await createTestUser({ role: "admin" });
  const { user: alice } = await createTestUser();
  const { user: bob } = await createTestUser();
  const meeting = await createMeetingWithTasks(admin, meetingInput([alice.email, bob.email]));
  const aliceTask = meeting.tasks.find((task) => task.assignee.id === String(alice._id));
  const bobTask = meeting.tasks.find((task) => task.assignee.id === String(bob._id));
  return { admin, alice, bob, meeting, aliceTask, bobTask };
}

beforeEach(async () => {
  await clearDatabase();
});

describe("creating meetings", () => {
  it("creates tasks with normalized values and notifies each assignee", async () => {
    const { alice, meeting, aliceTask } = await setup();

    expect(meeting.tasks).toHaveLength(2);
    expect(aliceTask).toMatchObject({
      status: "todo",
      priority: "high",
      estimatedHours: 3,
      date: "2026-03-02",
      completed: false,
    });
    expect(aliceTask.assignee).not.toHaveProperty("password");

    const { items, unread } = await listNotifications(alice);
    expect(unread).toBe(1);
    expect(items[0]).toMatchObject({ title: "Yeni görev atandı", taskId: aliceTask.id });
  });

  it("is admin only", async () => {
    const { user: alice } = await createTestUser();
    const { user: bob } = await createTestUser();

    await expect(createMeetingWithTasks(alice, meetingInput([bob.email]))).rejects.toMatchObject({
      code: "FORBIDDEN",
    });
    await expect(listAssignableUsers(alice)).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("rejects unknown assignees, admins as assignees, empty task lists and bad dates", async () => {
    const { user: admin } = await createTestUser({ role: "admin" });
    const { user: otherAdmin } = await createTestUser({ role: "admin" });
    const { user: alice } = await createTestUser();

    await expect(
      createMeetingWithTasks(admin, meetingInput(["ghost@example.com"])),
    ).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(
      createMeetingWithTasks(admin, meetingInput([otherAdmin.email])),
    ).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(createMeetingWithTasks(admin, meetingInput([]))).rejects.toMatchObject({
      code: "VALIDATION",
    });

    const badDates = meetingInput([alice.email]);
    badDates.tasks[0].startDate = "2026-03-10";
    badDates.tasks[0].dueDate = "2026-03-01";
    await expect(createMeetingWithTasks(admin, badDates)).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: expect.any(Object),
    });

    await expect(listBoard(admin)).resolves.toEqual([]);
  });
});

describe("board visibility", () => {
  it("shows a user only the tasks assigned to them", async () => {
    const { admin, alice, aliceTask, bobTask } = await setup();

    const aliceBoard = await listBoard(alice);
    expect(aliceBoard.flatMap((m) => m.tasks).map((t) => t.id)).toEqual([aliceTask.id]);

    const adminBoard = await listBoard(admin);
    expect(adminBoard.flatMap((m) => m.tasks)).toHaveLength(2);

    await expect(getTask(alice, bobTask.id)).rejects.toMatchObject({ code: "NOT_FOUND" });
    await expect(getTask(alice, aliceTask.id)).resolves.toMatchObject({ id: aliceTask.id });
  });

  it("shows nothing to a user without assignments", async () => {
    await setup();
    const { user: carol } = await createTestUser();
    await expect(listBoard(carol)).resolves.toEqual([]);
  });
});

describe("changing status", () => {
  it("lets the assignee move their own task and clears its notifications when done", async () => {
    const { alice, aliceTask, bobTask } = await setup();

    await expect(changeTaskStatus(alice, aliceTask.id, "in-progress")).resolves.toMatchObject({
      status: "in-progress",
      completed: false,
    });
    await changeTaskStatus(alice, aliceTask.id, "done");
    await expect(Notification.countDocuments({ user: alice._id })).resolves.toBe(0);

    const board = await listBoard(alice);
    expect(board[0].tasks[0].status).toBe("done");

    const bobStillTodo = await getTask(await createAdmin(), bobTask.id);
    expect(bobStillTodo.status).toBe("todo");
  });

  it("forbids moving someone else's task", async () => {
    const { alice, bobTask } = await setup();
    await expect(changeTaskStatus(alice, bobTask.id, "done")).rejects.toMatchObject({
      code: "NOT_FOUND",
    });
  });

  it.each(["finished", "", null, 3])("rejects invalid status %j", async (status) => {
    const { alice, aliceTask } = await setup();
    await expect(changeTaskStatus(alice, aliceTask.id, status)).rejects.toMatchObject({
      code: "VALIDATION",
    });
  });

  it("toggles completion back and forth", async () => {
    const { alice, aliceTask } = await setup();
    await expect(toggleTaskCompletion(alice, aliceTask.id)).resolves.toMatchObject({
      status: "done",
    });
    await expect(toggleTaskCompletion(alice, aliceTask.id)).resolves.toMatchObject({
      status: "todo",
    });
  });
});

describe("editing and deleting", () => {
  it("is limited to admins", async () => {
    const { admin, alice, aliceTask } = await setup();
    const edit = { title: "Renamed", priority: "low", estimatedHours: 1, progress: 50 };

    await expect(updateTask(alice, aliceTask.id, edit)).rejects.toMatchObject({
      code: "FORBIDDEN",
    });
    await expect(deleteTask(alice, aliceTask.id)).rejects.toMatchObject({ code: "FORBIDDEN" });

    await expect(updateTask(admin, aliceTask.id, edit)).resolves.toMatchObject({
      title: "Renamed",
      progress: 50,
    });
    await deleteTask(admin, aliceTask.id);
    await expect(getTask(admin, aliceTask.id)).rejects.toMatchObject({ code: "NOT_FOUND" });
    await expect(Notification.countDocuments({ user: alice._id })).resolves.toBe(0);
  });

  it("validates edits", async () => {
    const { admin, aliceTask } = await setup();
    await expect(updateTask(admin, aliceTask.id, { title: "" })).rejects.toMatchObject({
      code: "VALIDATION",
    });
    await expect(
      updateTask(admin, aliceTask.id, { title: "x", progress: 150 }),
    ).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(updateTask(admin, "nope", { title: "x" })).rejects.toMatchObject({
      code: "NOT_FOUND",
    });
  });
});

describe("notifications and analytics", () => {
  it("marks only the actor's notifications as read", async () => {
    const { alice, bob } = await setup();
    await markAllNotificationsRead(alice);

    await expect(listNotifications(alice)).resolves.toMatchObject({ unread: 0 });
    await expect(listNotifications(bob)).resolves.toMatchObject({ unread: 1 });
  });

  it("computes analytics for the actor's tasks in range", async () => {
    const { alice, aliceTask } = await setup();
    await changeTaskStatus(alice, aliceTask.id, "done");

    const stats = await getTaskAnalytics(alice, { from: "2026-03-01", to: "2026-03-31" });
    expect(stats).toMatchObject({
      totalTasks: 1,
      completedTasks: 1,
      totalEstimatedHours: 3,
      mostWorkedCategory: { category: "Frontend", count: 1, percentage: 100 },
      mostProductiveDay: { day: "Pzt", value: 1 },
    });

    const outside = await getTaskAnalytics(alice, { from: "2026-04-01", to: "2026-04-30" });
    expect(outside).toMatchObject({
      totalTasks: 0,
      mostProductiveDay: null,
      mostWorkedCategory: null,
    });

    await expect(
      getTaskAnalytics(alice, { from: "2026-05-01", to: "2026-04-01" }),
    ).rejects.toMatchObject({
      code: "VALIDATION",
    });
    await expect(getTaskAnalytics(alice, { from: "garbage", to: "x" })).rejects.toMatchObject({
      code: "VALIDATION",
    });
  });
});

async function createAdmin() {
  const { user } = await createTestUser({ role: "admin" });
  return user;
}
