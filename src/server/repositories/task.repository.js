import "server-only";
import mongoose from "mongoose";

import { connectDB } from "../db/connect";
import { Meeting } from "../models/meeting.model";
import { Notification } from "../models/notification.model";
import { Task } from "../models/task.model";
import { User } from "../models/user.model";

const ASSIGNEE_FIELDS = "fullName email role profileImage";

/**
 * @param {Record<string, unknown>} filter
 */
export async function findTasks(filter) {
  await connectDB();
  return Task.find(filter).sort({ createdAt: -1, _id: -1 }).populate("assignee", ASSIGNEE_FIELDS).lean();
}

/**
 * @param {string} id
 */
export async function findTaskById(id) {
  await connectDB();
  if (!mongoose.isValidObjectId(id)) return null;
  return Task.findById(id).populate("assignee", ASSIGNEE_FIELDS).lean();
}

/**
 * @param {import("mongoose").Types.ObjectId[]} ids
 */
export async function findMeetingsByIds(ids) {
  await connectDB();
  return Meeting.find({ _id: { $in: ids } }).sort({ createdAt: -1, _id: -1 }).lean();
}

export async function findAllMeetings() {
  await connectDB();
  return Meeting.find().sort({ createdAt: -1, _id: -1 }).lean();
}

/**
 * @param {string[]} emails
 */
export async function findAssignableUsersByEmail(emails) {
  await connectDB();
  return User.find({ email: { $in: emails }, role: "user" }).select("_id email fullName").lean();
}

/**
 * @param {import("mongoose").Types.ObjectId} excludeId
 */
export async function findAssignableUsers(excludeId) {
  await connectDB();
  return User.find({ role: "user", _id: { $ne: excludeId } })
    .select("_id fullName email role")
    .sort({ fullName: 1 })
    .lean();
}

/**
 * @param {Record<string, unknown>} meeting
 * @param {Array<Record<string, unknown>>} tasks
 * @param {(task: any, meeting: any) => Record<string, unknown>} buildNotification
 */
export async function insertMeetingWithTasks(meeting, tasks, buildNotification) {
  await connectDB();
  const meetingDoc = await Meeting.create(meeting);

  try {
    const taskDocs = await Task.insertMany(tasks.map((task) => ({ ...task, meeting: meetingDoc._id })));
    await Notification.insertMany(taskDocs.map((task) => buildNotification(task, meetingDoc)));
    return { meeting: meetingDoc.toObject(), taskIds: taskDocs.map((task) => task._id) };
  } catch (error) {
    await Task.deleteMany({ meeting: meetingDoc._id });
    await Notification.deleteMany({ meeting: meetingDoc._id });
    await Meeting.deleteOne({ _id: meetingDoc._id });
    throw error;
  }
}

/**
 * @param {string} id
 * @param {Record<string, unknown>} changes
 * @param {Record<string, unknown>} [guard]
 */
export async function updateTaskById(id, changes, guard = {}) {
  await connectDB();
  if (!mongoose.isValidObjectId(id)) return null;
  return Task.findOneAndUpdate({ _id: id, ...guard }, changes, {
    returnDocument: "after",
    runValidators: true,
  })
    .populate("assignee", ASSIGNEE_FIELDS)
    .lean();
}

/**
 * @param {string} id
 */
export async function deleteTaskById(id) {
  await connectDB();
  if (!mongoose.isValidObjectId(id)) return null;
  const task = await Task.findByIdAndDelete(id).lean();
  if (task) await Notification.deleteMany({ task: task._id });
  return task;
}

/**
 * @param {import("mongoose").Types.ObjectId} taskId
 */
export async function deleteNotificationsForTask(taskId) {
  await connectDB();
  await Notification.deleteMany({ task: taskId });
}
