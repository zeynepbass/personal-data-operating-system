import { randomUUID } from "node:crypto";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

import mongoose from "mongoose";

const STATUSES = new Set(["todo", "in-progress", "done"]);
const PRIORITIES = new Set(["low", "medium", "high", "critical"]);
const STATUS_COLORS = { todo: "green", "in-progress": "purple", done: "orange" };

const log = (message, extra = {}) =>
  process.env.NODE_ENV !== "test" &&
  process.stdout.write(
    `${JSON.stringify({ level: "info", service: "pdos-migrate", message, ...extra })}\n`,
  );

/** @param {import("mongodb").Db} db @param {string} collection @param {string} index */
async function dropIndexIfExists(db, collection, index) {
  const exists = await db.listCollections({ name: collection }).hasNext();
  if (!exists) return;
  const indexes = await db.collection(collection).indexes();
  if (indexes.some((item) => item.name === index)) {
    await db.collection(collection).dropIndex(index);
    log("dropped index", { collection, index });
  }
}

const toObjectId = (value) =>
  mongoose.isValidObjectId(value) ? new mongoose.Types.ObjectId(String(value)) : null;

export const migrations = [
  {
    id: "2026-10-01-drop-legacy-id-indexes",
    async up(db) {
      await dropIndexIfExists(db, "notes", "id_1");
      await dropIndexIfExists(db, "documents", "id_1");
      await dropIndexIfExists(db, "meetings", "id_1");
    },
  },
  {
    id: "2026-10-01-split-meeting-tasks",
    async up(db) {
      const meetings = db.collection("meetings");
      const tasks = db.collection("tasks");
      const notifications = db.collection("notifications");
      const users = db.collection("users");

      const cursor = meetings.find({ tasks: { $exists: true } });
      let moved = 0;

      for await (const meeting of cursor) {
        const status = STATUSES.has(String(meeting.name).toLowerCase())
          ? String(meeting.name).toLowerCase()
          : "todo";

        for (const task of meeting.tasks ?? []) {
          const assignee = toObjectId(task.assignee?.id);
          if (!assignee || !(await users.findOne({ _id: assignee }, { projection: { _id: 1 } }))) {
            log("skipped task without a valid assignee", {
              meeting: String(meeting._id),
              task: task.id,
            });
            continue;
          }

          const legacyId = String(task.id ?? randomUUID());
          const existing = await tasks.findOne({ legacyId }, { projection: { _id: 1 } });
          const taskId = existing?._id ?? new mongoose.Types.ObjectId();

          if (!existing) {
            const priority = String(task.priority ?? "").toLowerCase();
            const now = new Date();
            await tasks.insertOne({
              _id: taskId,
              meeting: meeting._id,
              assignee,
              createdBy: null,
              legacyId,
              title: task.title || "Başlıksız görev",
              description: task.description ?? "",
              label: task.label ?? "",
              priority: PRIORITIES.has(priority) ? priority : "medium",
              status,
              date: task.date ?? null,
              startDate: task.startDate ?? null,
              dueDate: task.dueDate ?? null,
              estimatedHours: Number(task.estimatedHours) || 0,
              spentHours: Number(task.spentHours) || 0,
              progress: Math.min(100, Number(task.progress) || 0),
              storyPoints: Number(task.storyPoints) || 0,
              completedAt: status === "done" ? (meeting.updatedAt ?? now) : null,
              createdAt: meeting.createdAt ?? now,
              updatedAt: meeting.updatedAt ?? now,
            });
            moved += 1;
          }

          await notifications.updateMany(
            { taskId: legacyId },
            { $set: { task: taskId, meeting: meeting._id }, $unset: { taskId: "", meetingId: "" } },
          );
        }

        await meetings.updateOne(
          { _id: meeting._id },
          {
            $set: { color: STATUS_COLORS[status], createdBy: meeting.createdBy ?? null },
            $unset: { tasks: "", name: "", id: "" },
          },
        );
      }

      await notifications.deleteMany({ taskId: { $exists: true } });
      log("moved embedded tasks", { moved });
    },
  },
  {
    id: "2026-10-01-normalize-goal-status",
    async up(db) {
      const goals = db.collection("goals");
      for await (const goal of goals.find({ status: { $nin: ["active", "completed"] } })) {
        const total = (goal.items ?? []).reduce((sum, item) => sum + (Number(item.value) || 0), 0);
        await goals.updateOne(
          { _id: goal._id },
          { $set: { status: total >= 100 ? "completed" : "active" } },
        );
      }
    },
  },
  {
    id: "2026-10-01-import-legacy-uploads",
    runnable: () =>
      Boolean(process.env.LEGACY_UPLOADS_DIR && existsSync(process.env.LEGACY_UPLOADS_DIR)),
    async up(db) {
      const root = path.resolve(process.env.LEGACY_UPLOADS_DIR);
      const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "files" });

      const importFile = async (relativePath, metadata) => {
        const absolute = path.resolve(root, relativePath.replace(/^\/uploads\//, ""));
        if (!absolute.startsWith(root + path.sep) || !existsSync(absolute)) return null;

        const data = await readFile(absolute);
        const id = new mongoose.Types.ObjectId();
        await new Promise((resolve, reject) => {
          bucket
            .openUploadStreamWithId(id, `${randomUUID()}${path.extname(absolute)}`, { metadata })
            .on("finish", resolve)
            .on("error", reject)
            .end(data);
        });
        return { id, size: data.byteLength };
      };

      const documents = db.collection("documents");
      for await (const doc of documents.find({
        pdf: /^\/uploads\//,
        file: { $in: [null, undefined] },
      })) {
        const stored = await importFile(doc.pdf, {
          owner: doc.user,
          kind: "document",
          contentType: "application/pdf",
          originalName: `${doc.name ?? "belge"}.pdf`,
          shared: Boolean(doc.shared),
        });
        if (!stored) {
          log("legacy document file missing", { document: String(doc._id), pdf: doc.pdf });
          continue;
        }
        await documents.updateOne(
          { _id: doc._id },
          { $set: { file: stored.id, sizeBytes: stored.size }, $unset: { pdf: "" } },
        );
      }

      const users = db.collection("users");
      const imageTypes = {
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".webp": "image/webp",
      };
      for await (const user of users.find({ profileImage: /^\/uploads\/profiles\// })) {
        const contentType = imageTypes[path.extname(user.profileImage).toLowerCase()];
        const stored = contentType
          ? await importFile(user.profileImage, {
              owner: user._id,
              kind: "avatar",
              contentType,
              originalName: path.basename(user.profileImage),
              shared: false,
            })
          : null;
        await users.updateOne(
          { _id: user._id },
          { $set: { profileImage: stored ? `/api/files/${stored.id}` : "" } },
        );
      }
    },
  },
  {
    id: "2026-10-02-drop-legacy-id-indexes-after-express-removal",
    async up(db) {
      await dropIndexIfExists(db, "notes", "id_1");
      await dropIndexIfExists(db, "documents", "id_1");
      await dropIndexIfExists(db, "meetings", "id_1");
    },
  },
];

/**
 * @param {import("mongodb").Db} db
 * @returns {Promise<string[]>}
 */
export async function runMigrations(db) {
  const applied = db.collection("migrations");
  const ran = [];

  for (const migration of migrations) {
    if (await applied.findOne({ _id: migration.id })) continue;
    if (migration.runnable && !migration.runnable()) {
      log("migration skipped", { id: migration.id });
      continue;
    }

    log("migration started", { id: migration.id });
    await migration.up(db);
    await applied.insertOne({ _id: migration.id, appliedAt: new Date() });
    log("migration applied", { id: migration.id });
    ran.push(migration.id);
  }

  return ran;
}
