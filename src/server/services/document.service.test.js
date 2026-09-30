import { beforeEach, describe, expect, it } from "vitest";

import { clearDatabase, createTestUser } from "@tests/helpers/db";

import { deleteDocument, listDocuments, uploadDocument } from "./document.service";
import { openFileForRead } from "./file.service";

const PDF = new TextEncoder().encode("%PDF-1.4\n1 0 obj<<>>endobj\n%%EOF");
const upload = { data: PDF, name: "report.pdf" };

beforeEach(async () => {
  await clearDatabase();
});

describe("document service", () => {
  it("stores the file in GridFS and derives size and date on the server", async () => {
    const { user } = await createTestUser();

    const doc = await uploadDocument(user, { name: "Report", type: "pdf", size: "999 GB" }, upload);

    expect(doc).toMatchObject({ name: "Report", size: "0.00 MB", isOwner: true, shared: false });
    expect(doc.pdf).toMatch(/^\/api\/files\/[a-f0-9]{24}$/);
  });

  it("lets only admins share documents", async () => {
    const { user } = await createTestUser();
    const { user: admin } = await createTestUser({ role: "admin" });
    const { user: other } = await createTestUser();

    const own = await uploadDocument(user, { name: "Mine", shared: "true" }, upload);
    const shared = await uploadDocument(admin, { name: "Team", shared: "true" }, upload);

    expect(own.shared).toBe(false);
    expect(shared.shared).toBe(true);

    const visible = await listDocuments(other);
    expect(visible.items.map((d) => d.name)).toEqual(["Team"]);

    const fileId = shared.pdf.split("/").pop();
    await expect(openFileForRead(fileId, other)).resolves.toBeTruthy();
    await expect(openFileForRead(own.pdf.split("/").pop(), other)).rejects.toMatchObject({
      code: "NOT_FOUND",
    });
  });

  it.each([
    ["no file", { name: "x" }, null],
    [
      "a non-pdf payload",
      { name: "x" },
      { data: new TextEncoder().encode("<html>"), name: "x.pdf" },
    ],
    ["a missing name", { name: "" }, upload],
    ["an invalid type", { name: "x", type: "exe" }, upload],
  ])("rejects %s", async (_label, meta, file) => {
    const { user } = await createTestUser();
    await expect(uploadDocument(user, meta, file)).rejects.toMatchObject({ code: "VALIDATION" });
  });

  it("allows only the owner or an admin to delete, and removes the file", async () => {
    const { user } = await createTestUser();
    const { user: intruder } = await createTestUser();
    const { user: admin } = await createTestUser({ role: "admin" });

    const doc = await uploadDocument(user, { name: "Report" }, upload);
    const fileId = doc.pdf.split("/").pop();

    await expect(deleteDocument(intruder, doc.id)).rejects.toMatchObject({ code: "NOT_FOUND" });
    await deleteDocument(admin, doc.id);

    await expect(listDocuments(user)).resolves.toMatchObject({ items: [] });
    await expect(openFileForRead(fileId, user)).rejects.toMatchObject({ code: "NOT_FOUND" });
  });
});
