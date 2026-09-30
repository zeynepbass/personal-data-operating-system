"use server";

import { revalidatePath } from "next/cache";

import { runAction } from "@/server/action";
import { requireUser } from "@/server/auth/dal";
import { markAllNotificationsRead } from "@/server/services/notification.service";
import * as taskService from "@/server/services/task.service";

const revalidateTaskViews = () => {
  for (const path of ["/tasks", "/dashboard", "/calendar", "/analytics"]) revalidatePath(path);
};

/** @param {unknown} input */
export async function createMeetingAction(input) {
  return runAction(async () => {
    const meeting = await taskService.createMeetingWithTasks(await requireUser(), input);
    revalidateTaskViews();
    return meeting;
  });
}

/**
 * @param {string} id
 * @param {unknown} input
 */
export async function updateTaskAction(id, input) {
  return runAction(async () => {
    const task = await taskService.updateTask(await requireUser(), id, input);
    revalidateTaskViews();
    revalidatePath(`/tasks/${id}`);
    return task;
  });
}

/** @param {string} id */
export async function deleteTaskAction(id) {
  return runAction(async () => {
    await taskService.deleteTask(await requireUser(), id);
    revalidateTaskViews();
  });
}

/**
 * @param {string} id
 * @param {unknown} status
 */
export async function changeTaskStatusAction(id, status) {
  return runAction(async () => {
    const task = await taskService.changeTaskStatus(await requireUser(), id, status);
    revalidateTaskViews();
    return task;
  });
}

/** @param {string} id */
export async function toggleTaskCompletionAction(id) {
  return runAction(async () => {
    const task = await taskService.toggleTaskCompletion(await requireUser(), id);
    revalidateTaskViews();
    return task;
  });
}

export async function markNotificationsReadAction() {
  return runAction(async () => {
    await markAllNotificationsRead(await requireUser());
  });
}
