import { beforeEach, describe, expect, it } from "vitest";

import { clearDatabase, createTestUser } from "@tests/helpers/db";

import { FILE_RULES, deleteFile, fileIdFromUrl, openFileForRead, storeFile } from "./file.service";

const PNG = Uint8Array.from(
  Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
    "base64",
  ),
);
const PDF = new TextEncoder().encode("%PDF-1.4\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF");

async function readAll(stream) {
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks);
}

beforeEach(async () => {
  await clearDatabase();
});

describe("storeFile", () => {
  it("detects the type from content, not from the name", async () => {
    const { user } = await createTestUser();

    const stored = await storeFile({
      data: PNG,
      kind: "avatar",
      ownerId: user._id,
      originalName: "x.pdf",
    });

    expect(stored.contentType).toBe("image/png");
  });

  it.each([
    ["html pretending to be an image", "avatar", new TextEncoder().encode("<html></html>")],
    [
      "svg (script-capable)",
      "avatar",
      new TextEncoder().encode('<svg xmlns="http://www.w3.org/2000/svg"/>'),
    ],
    ["a png uploaded as a document", "document", PNG],
    ["an empty file", "avatar", new Uint8Array()],
  ])("rejects %s", async (_label, kind, data) => {
    const { user } = await createTestUser();
    await expect(storeFile({ data, kind, ownerId: user._id })).rejects.toMatchObject({
      code: "VALIDATION",
    });
  });

  it("rejects files above the size limit", async () => {
    const { user } = await createTestUser();
    const big = new Uint8Array(FILE_RULES.avatar.maxBytes + 1);
    big.set(PNG);

    await expect(storeFile({ data: big, kind: "avatar", ownerId: user._id })).rejects.toMatchObject(
      {
        code: "VALIDATION",
      },
    );
  });

  it("rejects unknown kinds", async () => {
    const { user } = await createTestUser();
    await expect(storeFile({ data: PNG, kind: "script", ownerId: user._id })).rejects.toMatchObject(
      {
        code: "VALIDATION",
      },
    );
  });
});

describe("openFileForRead", () => {
  it("lets the owner read the exact bytes", async () => {
    const { user } = await createTestUser();
    const { id } = await storeFile({ data: PDF, kind: "document", ownerId: user._id });

    const file = await openFileForRead(id, user);

    expect(file.contentType).toBe("application/pdf");
    expect((await readAll(file.stream)).equals(Buffer.from(PDF))).toBe(true);
  });

  it("hides another user's file behind NOT_FOUND", async () => {
    const { user: owner } = await createTestUser();
    const { user: intruder } = await createTestUser();
    const { id } = await storeFile({ data: PNG, kind: "avatar", ownerId: owner._id });

    await expect(openFileForRead(id, intruder)).rejects.toMatchObject({ code: "NOT_FOUND" });
  });

  it("allows admins and shared files", async () => {
    const { user: owner } = await createTestUser();
    const { user: admin } = await createTestUser({ role: "admin" });
    const { user: other } = await createTestUser();
    const privateFile = await storeFile({ data: PNG, kind: "avatar", ownerId: owner._id });
    const sharedFile = await storeFile({
      data: PDF,
      kind: "document",
      ownerId: owner._id,
      shared: true,
    });

    await expect(openFileForRead(privateFile.id, admin)).resolves.toBeTruthy();
    await expect(openFileForRead(sharedFile.id, other)).resolves.toBeTruthy();
  });

  it.each(["not-an-id", "", "../../etc/passwd", "507f1f77bcf86cd799439011"])(
    "returns NOT_FOUND for %j",
    async (id) => {
      const { user } = await createTestUser();
      await expect(openFileForRead(id, user)).rejects.toMatchObject({ code: "NOT_FOUND" });
    },
  );
});

describe("deleteFile", () => {
  it("does not let another user delete a file", async () => {
    const { user: owner } = await createTestUser();
    const { user: intruder } = await createTestUser();
    const { id } = await storeFile({ data: PNG, kind: "avatar", ownerId: owner._id });

    await expect(deleteFile(id, intruder)).rejects.toMatchObject({ code: "NOT_FOUND" });
    await expect(openFileForRead(id, owner)).resolves.toBeTruthy();

    await deleteFile(id, owner);
    await expect(openFileForRead(id, owner)).rejects.toMatchObject({ code: "NOT_FOUND" });
  });
});

describe("fileIdFromUrl", () => {
  it("only accepts internal file urls", () => {
    expect(fileIdFromUrl("/api/files/507f1f77bcf86cd799439011")).toBe("507f1f77bcf86cd799439011");
    expect(fileIdFromUrl("/uploads/profiles/a.png")).toBeNull();
    expect(fileIdFromUrl("https://evil.example/api/files/507f1f77bcf86cd799439011")).toBeNull();
    expect(fileIdFromUrl(null)).toBeNull();
  });
});
