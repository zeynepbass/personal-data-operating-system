import { beforeEach, describe, expect, it, vi } from "vitest";

import { GET as getDocuments, POST as postDocument } from "@/app/api/documents/route";
import { GET as getNotes } from "@/app/api/notes/route";
import { GET as getNotifications } from "@/app/api/notifications/route";
import { GET as getTasks } from "@/app/api/tasks/route";
import { createSession } from "@/server/auth/session";
import { createNote } from "@/server/services/note.service";
import { clearDatabase, createTestUser } from "@tests/helpers/db";
import { requestState, resetRequestState } from "@tests/helpers/next";

vi.mock("next/headers", async () => (await import("@tests/helpers/next")).nextHeadersMock());
vi.mock("next/navigation", async () => (await import("@tests/helpers/next")).nextNavigationMock());
vi.mock("next/cache", async () => (await import("@tests/helpers/next")).nextCacheMock());

const PDF = new TextEncoder().encode("%PDF-1.4\n%%EOF");

async function signIn(overrides) {
  const { user } = await createTestUser(overrides);
  const { token } = await createSession(user._id);
  requestState.cookies.set("pdos_session", token);
  return user;
}

function uploadRequest({ origin = "http://localhost:3000", file = PDF, name = "Rapor" } = {}) {
  const form = new FormData();
  form.set("name", name);
  form.set("pdf", new File([file], "rapor.pdf", { type: "application/pdf" }));
  return new Request("http://localhost:3000/api/documents", {
    method: "POST",
    body: form,
    headers: { origin, host: "localhost:3000" },
  });
}

beforeEach(async () => {
  await clearDatabase();
  resetRequestState();
});

describe("route handlers", () => {
  it.each([
    ["GET /api/tasks", () => getTasks(new Request("http://localhost/api/tasks"))],
    ["GET /api/notes", () => getNotes(new Request("http://localhost/api/notes"))],
    [
      "GET /api/notifications",
      () => getNotifications(new Request("http://localhost/api/notifications")),
    ],
    ["GET /api/documents", () => getDocuments(new Request("http://localhost/api/documents"))],
    ["POST /api/documents", () => postDocument(uploadRequest())],
  ])("%s rejects anonymous requests", async (_label, call) => {
    const response = await call();
    expect(response.status).toBe(401);
  });

  it("paginates notes and validates query parameters", async () => {
    const user = await signIn();
    for (let i = 0; i < 3; i += 1) {
      await createNote(user, { title: `n${i}`, description: "d", category: "c", subCategory: "s" });
    }

    const first = await getNotes(new Request("http://localhost/api/notes?limit=2"));
    const page = await first.json();
    expect(page.items).toHaveLength(2);
    expect(page.nextCursor).toEqual(expect.any(String));

    const bad = await getNotes(new Request("http://localhost/api/notes?limit=abc"));
    expect(bad.status).toBe(400);
    await expect(bad.json()).resolves.toMatchObject({ code: "VALIDATION" });
  });

  it("uploads a document and rejects cross-origin uploads", async () => {
    await signIn();

    const created = await postDocument(uploadRequest());
    expect(created.status).toBe(201);
    await expect(created.json()).resolves.toMatchObject({ name: "Rapor", isOwner: true });

    const forged = await postDocument(uploadRequest({ origin: "https://evil.example" }));
    expect(forged.status).toBe(403);

    const fake = await postDocument(uploadRequest({ file: new TextEncoder().encode("<html>") }));
    expect(fake.status).toBe(400);
  });

  it("returns only the caller's board", async () => {
    await signIn();
    const response = await getTasks(new Request("http://localhost/api/tasks"));
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual([]);
  });
});
