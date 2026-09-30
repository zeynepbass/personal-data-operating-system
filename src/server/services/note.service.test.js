import { beforeEach, describe, expect, it } from "vitest";

import { clearDatabase, createTestUser } from "@tests/helpers/db";

import { createNote, deleteNote, getNote, listNotes, updateNote } from "./note.service";

const validNote = (overrides = {}) => ({
  title: "Closures",
  description: "JS closures notes",
  category: "Frontend",
  subCategory: "JavaScript",
  sections: [{ id: "s1", title: "Intro", type: "code", content: "const a = 1;", language: "js" }],
  ...overrides,
});

beforeEach(async () => {
  await clearDatabase();
});

describe("note service", () => {
  it("creates a note owned by the actor and ignores client-supplied ids", async () => {
    const { user } = await createTestUser();

    const note = await createNote(user, { ...validNote(), id: "hijack", user: "someone-else" });

    expect(note).toMatchObject({ title: "Closures", sections: [expect.objectContaining({ id: "s1" })] });
    const { items } = await listNotes(user);
    expect(items).toHaveLength(1);
  });

  it.each([
    ["null", null],
    ["missing title", validNote({ title: "" })],
    ["whitespace title", validNote({ title: "   " })],
    ["wrong section type", validNote({ sections: [{ id: "x", title: "t", type: "html" }] })],
    ["sections not an array", validNote({ sections: "nope" })],
    ["title as number", validNote({ title: 12 })],
  ])("rejects %s", async (_label, input) => {
    const { user } = await createTestUser();
    await expect(createNote(user, input)).rejects.toMatchObject({ code: "VALIDATION" });
  });

  it("never exposes another user's notes", async () => {
    const { user: alice } = await createTestUser();
    const { user: bob } = await createTestUser();
    const note = await createNote(alice, validNote());

    await expect(listNotes(bob)).resolves.toMatchObject({ items: [] });
    await expect(getNote(bob, note.id)).rejects.toMatchObject({ code: "NOT_FOUND" });
    await expect(updateNote(bob, note.id, validNote({ title: "pwned" }))).rejects.toMatchObject({
      code: "NOT_FOUND",
    });
    await expect(deleteNote(bob, note.id)).rejects.toMatchObject({ code: "NOT_FOUND" });

    await expect(getNote(alice, note.id)).resolves.toMatchObject({ title: "Closures" });
  });

  it("updates and deletes the actor's own note", async () => {
    const { user } = await createTestUser();
    const note = await createNote(user, validNote());

    await expect(updateNote(user, note.id, validNote({ title: "Updated" }))).resolves.toMatchObject({
      title: "Updated",
    });
    await deleteNote(user, note.id);
    await expect(getNote(user, note.id)).rejects.toMatchObject({ code: "NOT_FOUND" });
  });

  it.each(["not-an-id", "", "507f1f77bcf86cd799439011"])("returns NOT_FOUND for id %j", async (id) => {
    const { user } = await createTestUser();
    await expect(getNote(user, id)).rejects.toMatchObject({ code: "NOT_FOUND" });
    await expect(deleteNote(user, id)).rejects.toMatchObject({ code: "NOT_FOUND" });
  });

  it("paginates newest first with a stable cursor", async () => {
    const { user } = await createTestUser();
    for (let i = 0; i < 5; i += 1) await createNote(user, validNote({ title: `Note ${i}` }));

    const first = await listNotes(user, { limit: 2 });
    const second = await listNotes(user, { limit: "2", cursor: first.nextCursor });
    const third = await listNotes(user, { limit: 2, cursor: second.nextCursor });

    const titles = [...first.items, ...second.items, ...third.items].map((n) => n.title);
    expect(titles).toEqual(["Note 4", "Note 3", "Note 2", "Note 1", "Note 0"]);
    expect(third.nextCursor).toBeNull();
  });

  it("rejects malformed cursors and out-of-range limits", async () => {
    const { user } = await createTestUser();
    await expect(listNotes(user, { cursor: "garbage" })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(listNotes(user, { limit: 0 })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(listNotes(user, { limit: 1000 })).rejects.toMatchObject({ code: "VALIDATION" });
  });

  it("filters by category and title search, treating the query as plain text", async () => {
    const { user } = await createTestUser();
    await createNote(user, validNote({ title: "React hooks", category: "Frontend" }));
    await createNote(user, validNote({ title: "Mongo indexes", category: "Backend" }));
    await createNote(user, validNote({ title: "a.*b", category: "Backend" }));

    await expect(listNotes(user, { category: "Backend" })).resolves.toMatchObject({
      items: [expect.anything(), expect.anything()],
    });
    const search = await listNotes(user, { q: "hooks" });
    expect(search.items.map((n) => n.title)).toEqual(["React hooks"]);
    const regexLike = await listNotes(user, { q: ".*" });
    expect(regexLike.items.map((n) => n.title)).toEqual(["a.*b"]);
  });
});
