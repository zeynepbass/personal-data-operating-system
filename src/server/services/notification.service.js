import "server-only";

import { connectDB } from "../db/connect";
import { Notification } from "../models/notification.model";
import { pageQuerySchema, paginate } from "../pagination";
import { parseInput } from "../validation";

/**
 * @typedef {{ _id: import("mongoose").Types.ObjectId, role: string }} Actor
 * @typedef {{ id: string, title: string, message: string, read: boolean, taskId: string | null, createdAt: string }} NotificationDTO
 */

/**
 * @param {any} notification
 * @returns {NotificationDTO}
 */
function toNotificationDTO(notification) {
  return {
    id: String(notification._id),
    title: notification.title,
    message: notification.message,
    read: Boolean(notification.read),
    taskId: notification.task ? String(notification.task) : null,
    createdAt: new Date(notification.createdAt).toISOString(),
  };
}

/**
 * @param {Actor} actor
 * @param {unknown} [query]
 * @returns {Promise<{ items: NotificationDTO[], nextCursor: string | null, unread: number }>}
 */
export async function listNotifications(actor, query = {}) {
  const page = parseInput(pageQuerySchema, query);
  await connectDB();
  const [result, unread] = await Promise.all([
    paginate(Notification, { user: actor._id }, page),
    Notification.countDocuments({ user: actor._id, read: false }),
  ]);
  return { items: result.items.map(toNotificationDTO), nextCursor: result.nextCursor, unread };
}

/**
 * @param {Actor} actor
 */
export async function markAllNotificationsRead(actor) {
  await connectDB();
  await Notification.updateMany({ user: actor._id, read: false }, { read: true });
}
