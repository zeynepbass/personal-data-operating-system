import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import mongoose from "mongoose";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { connectDB } from "@/server/db/connect";
import { changeTaskStatus, listBoard } from "@/server/services/task.service";
import { clearDatabase, createTestUser } from "@tests/helpers/db";

import { runMigrations } from "../scripts/migrations.mjs";

const PDF = Buffer.from("%PDF-1.4\n%%EOF");
let uploadsDir;

beforeEach(async () => {
  await clearDatabase();
  const { connection } = await connectDB();
  await connection.db.collection("migrations").deleteMany({});
  uploadsDir = await mkdtemp(path.join(os.tmpdir(), "pdos-uploads-"));
  await mkdir(path.join(uploadsDir, "profiles"));
});

afterEach(async () => {
  delete process.env.LEGACY_UPLOADS_DIR;
  await rm(uploadsDir, { recursive: true, force: true });
});

async function seedLegacyData() {
  const { connection } = await connectDB();
  const db = connection.db;
  const { user: admin } = await createTestUser({ role: "admin" });
  const { user: alice } = await createTestUser();

  const meetingId = new mongoose.Types.ObjectId();
  await db.collection("meetings").insertOne({
    _id: meetingId,
    id: "1700000000000",
    name: "in-progress",
    title: "Sprint planning",
    color: "bg-purple-50",
    meetingCalendar: new Date("2026-01-05"),
    tasks: [
      {
        id: "1700000000000-0",
        title: "Write API",
        priority: "High",
        date: new Date("2026-01-06"),
        assignee: { id: String(alice._id), fullName: alice.fullName, email: alice.email },
      },
      {
        id: "1700000000000-1",
        title: "Orphan task",
        assignee: { id: "not-an-id" },
      },
    ],
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  });
  await db.collection("notifications").insertOne({
    user: alice._id,
    taskId: "1700000000000-0",
    meetingId: "1700000000000",
    title: "Yeni görev atandı",
    message: "x",
    read: false,
    createdAt: new Date(),
  });
  await db.collection("goals").insertOne({
    user: alice._id,
    title: "Legacy",
    category: "x",
    status: "all",
    items: [{ title: "a", value: 120 }],
  });

  await writeFile(path.join(uploadsDir, "123-report.pdf"), PDF);
  await db.collection("documents").insertOne({
    user: alice._id,
    name: "Report",
    pdf: "/uploads/123-report.pdf",
    shared: false,
    createdAt: new Date(),
  });
  await db.collection("documents").insertOne({
    user: alice._id,
    name: "Escape",
    pdf: "/uploads/../../etc/passwd",
    createdAt: new Date(),
  });

  return { db, admin, alice };
}

describe("data migrations", () => {
  it("drops the legacy unique id index even if the old server recreated it", async () => {
    const { connection } = await connectDB();
    const db = connection.db;
    await db.collection("documents").createIndex({ id: 1 }, { unique: true });
    await db.collection("migrations").insertOne({ _id: "2026-10-01-drop-legacy-id-indexes" });

    await runMigrations(db);

    const indexes = await db.collection("documents").indexes();
    expect(indexes.map((index) => index.name)).not.toContain("id_1");
    await db.collection("documents").insertMany([{ name: "a" }, { name: "b" }]);
  });

  it("moves embedded tasks into their own collection with per-task status", async () => {
    const { db, admin, alice } = await seedLegacyData();

    await runMigrations(db);

    const meeting = await db.collection("meetings").findOne({ title: "Sprint planning" });
    expect(meeting).not.toHaveProperty("tasks");
    expect(meeting).not.toHaveProperty("name");

    const tasks = await db.collection("tasks").find().toArray();
    expect(tasks).toHaveLength(1);
    expect(tasks[0]).toMatchObject({
      status: "in-progress",
      priority: "high",
      legacyId: "1700000000000-0",
    });

    const notification = await db.collection("notifications").findOne({ user: alice._id });
    expect(String(notification.task)).toBe(String(tasks[0]._id));
    expect(notification).not.toHaveProperty("taskId");

    const board = await listBoard(alice);
    expect(board[0].tasks.map((task) => task.title)).toEqual(["Write API"]);
    await expect(listBoard(admin)).resolves.toHaveLength(1);

    const moved = await changeTaskStatus(alice, String(tasks[0]._id), "done");
    expect(moved.status).toBe("done");
  });

  it("normalizes invalid goal statuses", async () => {
    const { db } = await seedLegacyData();
    await runMigrations(db);
    const goal = await db.collection("goals").findOne({ title: "Legacy" });
    expect(goal.status).toBe("completed");
  });

  it("imports legacy uploads into GridFS and refuses paths outside the upload dir", async () => {
    const { db } = await seedLegacyData();
    process.env.LEGACY_UPLOADS_DIR = uploadsDir;

    await runMigrations(db);

    const report = await db.collection("documents").findOne({ name: "Report" });
    expect(report.file).toBeInstanceOf(mongoose.Types.ObjectId);
    expect(report).not.toHaveProperty("pdf");

    const escape = await db.collection("documents").findOne({ name: "Escape" });
    expect(escape.file ?? null).toBeNull();
    expect(await db.collection("files.files").countDocuments()).toBe(1);
  });

  it("skips the upload import until a directory is configured, and is idempotent", async () => {
    const { db } = await seedLegacyData();

    const first = await runMigrations(db);
    expect(first).not.toContain("2026-10-01-import-legacy-uploads");

    process.env.LEGACY_UPLOADS_DIR = uploadsDir;
    const second = await runMigrations(db);
    expect(second).toEqual(["2026-10-01-import-legacy-uploads"]);
    expect(first).toContain("2026-10-02-drop-legacy-id-indexes-after-express-removal");

    await expect(runMigrations(db)).resolves.toEqual([]);
    expect(await db.collection("tasks").countDocuments()).toBe(1);
  });
});
