import "server-only";

import { createMeetingSchema, taskStatusSchema, updateTaskSchema } from "@/shared/schemas/task";

import { AppError } from "../errors";
import {
  deleteNotificationsForTask,
  deleteTaskById,
  findAllMeetings,
  findAssignableUsers,
  findAssignableUsersByEmail,
  findMeetingsByIds,
  findTaskById,
  findTasks,
  insertMeetingWithTasks,
  updateTaskById,
} from "../repositories/task.repository";
import { parseInput } from "../validation";

const STATUS_COLORS = { todo: "green", "in-progress": "purple", done: "orange" };

/**
 * @typedef {{ _id: import("mongoose").Types.ObjectId, role: string }} Actor
 * @typedef {{ id: string, fullName: string, email: string, role: string, avatar: string }} AssigneeDTO
 * @typedef {{
 *   id: string, meetingId: string, title: string, description: string, label: string,
 *   priority: string, status: "todo" | "in-progress" | "done", completed: boolean,
 *   date: string | null, startDate: string | null, dueDate: string | null,
 *   estimatedHours: number, spentHours: number, progress: number, storyPoints: number,
 *   assignee: AssigneeDTO | null,
 * }} TaskDTO
 * @typedef {{
 *   id: string, title: string, color: string, meeting: string, meetingDetails: string,
 *   meetingCalendar: string | null, tasks: TaskDTO[],
 * }} MeetingDTO
 */

/** @param {Date | null | undefined} value */
const toDay = (value) => (value ? new Date(value).toISOString().slice(0, 10) : null);

const isAdmin = (actor) => actor.role === "admin";

/** @param {any} task */
const assigneeId = (task) => String(task.assignee?._id ?? task.assignee);

/**
 * @param {any} task
 * @returns {TaskDTO}
 */
export function toTaskDTO(task) {
  const assignee = task.assignee && typeof task.assignee === "object" && "email" in task.assignee
    ? {
        id: String(task.assignee._id),
        fullName: task.assignee.fullName,
        email: task.assignee.email,
        role: task.assignee.role,
        avatar: task.assignee.profileImage ?? "",
      }
    : null;

  return {
    id: String(task._id),
    meetingId: String(task.meeting),
    title: task.title,
    description: task.description ?? "",
    label: task.label ?? "",
    priority: task.priority,
    status: task.status,
    completed: task.status === "done",
    date: toDay(task.date),
    startDate: toDay(task.startDate),
    dueDate: toDay(task.dueDate),
    estimatedHours: task.estimatedHours ?? 0,
    spentHours: task.spentHours ?? 0,
    progress: task.progress ?? 0,
    storyPoints: task.storyPoints ?? 0,
    assignee,
  };
}

/**
 * @param {any} meeting
 * @param {TaskDTO[]} tasks
 * @returns {MeetingDTO}
 */
function toMeetingDTO(meeting, tasks) {
  return {
    id: String(meeting._id),
    title: meeting.title,
    color: meeting.color,
    meeting: meeting.meeting ?? "",
    meetingDetails: meeting.meetingDetails ?? "",
    meetingCalendar: toDay(meeting.meetingCalendar),
    tasks,
  };
}

const taskNotFound = () => new AppError("NOT_FOUND", "Görev bulunamadı.");
const adminOnly = () => new AppError("FORBIDDEN", "Bu işlem için admin yetkisi gereklidir.");

/**
 * @param {Actor} actor
 * @returns {Promise<MeetingDTO[]>}
 */
export async function listBoard(actor) {
  const tasks = await findTasks(isAdmin(actor) ? {} : { assignee: actor._id });
  const meetings = isAdmin(actor)
    ? await findAllMeetings()
    : await findMeetingsByIds([...new Set(tasks.map((task) => String(task.meeting)))]);

  const byMeeting = new Map(meetings.map((meeting) => [String(meeting._id), []]));
  for (const task of tasks) byMeeting.get(String(task.meeting))?.push(toTaskDTO(task));

  return meetings
    .map((meeting) => toMeetingDTO(meeting, byMeeting.get(String(meeting._id)) ?? []))
    .filter((meeting) => isAdmin(actor) || meeting.tasks.length > 0);
}

/**
 * @param {Actor} actor
 * @param {string} id
 * @returns {Promise<TaskDTO>}
 */
export async function getTask(actor, id) {
  const task = await findTaskById(id);
  if (!task || (!isAdmin(actor) && assigneeId(task) !== String(actor._id))) throw taskNotFound();
  return toTaskDTO(task);
}

/**
 * @param {Actor} actor
 */
export async function listAssignableUsers(actor) {
  if (!isAdmin(actor)) throw adminOnly();
  const users = await findAssignableUsers(actor._id);
  return users.map((user) => ({
    id: String(user._id),
    fullName: user.fullName,
    email: user.email,
    role: user.role,
  }));
}

/**
 * @param {Actor} actor
 * @param {unknown} input
 * @returns {Promise<MeetingDTO>}
 */
export async function createMeetingWithTasks(actor, input) {
  if (!isAdmin(actor)) throw adminOnly();
  const data = parseInput(createMeetingSchema, input);

  const emails = [...new Set(data.tasks.map((task) => task.assignee))];
  const users = await findAssignableUsersByEmail(emails);
  const usersByEmail = new Map(users.map((user) => [user.email, user]));

  const missing = emails.filter((email) => !usersByEmail.has(email));
  if (missing.length) {
    throw new AppError("VALIDATION", `${missing.join(", ")} kullanıcısı bulunamadı.`, {
      fieldErrors: { assignee: ["Seçilen kullanıcı bulunamadı."] },
    });
  }

  const { meeting, taskIds } = await insertMeetingWithTasks(
    {
      createdBy: actor._id,
      title: data.title,
      color: STATUS_COLORS[data.name],
      meeting: data.meeting,
      meetingDetails: data.meetingDetails,
      meetingCalendar: data.meetingCalendar,
    },
    data.tasks.map(({ assignee, ...task }) => ({
      ...task,
      status: data.name,
      completedAt: data.name === "done" ? new Date() : null,
      assignee: usersByEmail.get(assignee)._id,
      createdBy: actor._id,
    })),
    (task, meetingDoc) => ({
      user: task.assignee,
      task: task._id,
      meeting: meetingDoc._id,
      title: "Yeni görev atandı",
      message: `"${task.title}" görevi size atandı.`,
    }),
  );

  const tasks = await findTasks({ _id: { $in: taskIds } });
  return toMeetingDTO(meeting, tasks.map(toTaskDTO));
}

/**
 * @param {Actor} actor
 * @param {string} id
 * @param {unknown} input
 * @returns {Promise<TaskDTO>}
 */
export async function updateTask(actor, id, input) {
  if (!isAdmin(actor)) throw adminOnly();
  const data = parseInput(updateTaskSchema, input);
  const task = await updateTaskById(id, data);
  if (!task) throw taskNotFound();
  return toTaskDTO(task);
}

/**
 * @param {Actor} actor
 * @param {string} id
 */
export async function deleteTask(actor, id) {
  if (!isAdmin(actor)) throw adminOnly();
  const task = await deleteTaskById(id);
  if (!task) throw taskNotFound();
}

/**
 * @param {Actor} actor
 * @param {string} id
 * @param {unknown} status
 * @returns {Promise<TaskDTO>}
 */
export async function changeTaskStatus(actor, id, status) {
  const next = parseInput(taskStatusSchema, status);
  const guard = isAdmin(actor) ? {} : { assignee: actor._id };

  const task = await updateTaskById(
    id,
    { status: next, completedAt: next === "done" ? new Date() : null },
    guard,
  );
  if (!task) throw taskNotFound();

  if (next === "done") await deleteNotificationsForTask(task._id);
  return toTaskDTO(task);
}

/**
 * @param {Actor} actor
 * @param {string} id
 * @returns {Promise<TaskDTO>}
 */
export async function toggleTaskCompletion(actor, id) {
  const current = await getTask(actor, id);
  return changeTaskStatus(actor, id, current.status === "done" ? "todo" : "done");
}
