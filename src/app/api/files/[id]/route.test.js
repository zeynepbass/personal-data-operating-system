import { beforeEach, describe, expect, it, vi } from "vitest";

import { getCurrentUser } from "@/server/auth/dal";
import { storeFile } from "@/server/services/file.service";
import { clearDatabase, createTestUser } from "@tests/helpers/db";

import { GET } from "./route";

vi.mock("@/server/auth/dal", () => ({ getCurrentUser: vi.fn() }));

const PDF = new TextEncoder().encode("%PDF-1.4\n%%EOF");

const call = (id) =>
  GET(new Request(`http://localhost/api/files/${id}`), { params: Promise.resolve({ id }) });

beforeEach(async () => {
  await clearDatabase();
});

describe("GET /api/files/[id]", () => {
  it("returns 401 without a session", async () => {
    vi.mocked(getCurrentUser).mockResolvedValue(null);
    const response = await call("507f1f77bcf86cd799439011");
    expect(response.status).toBe(401);
  });

  it("streams the owner's file with safe headers", async () => {
    const { user } = await createTestUser();
    const { id } = await storeFile({
      data: PDF,
      kind: "document",
      ownerId: user._id,
      originalName: "rapor ş.pdf",
    });
    vi.mocked(getCurrentUser).mockResolvedValue(user);

    const response = await call(id);

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("application/pdf");
    expect(response.headers.get("x-content-type-options")).toBe("nosniff");
    expect(response.headers.get("content-disposition")).toMatch(/^attachment; filename\*=UTF-8''/);
    expect(Buffer.from(await response.arrayBuffer()).equals(Buffer.from(PDF))).toBe(true);
  });

  it("returns 404 for another user's file", async () => {
    const { user: owner } = await createTestUser();
    const { user: intruder } = await createTestUser();
    const { id } = await storeFile({ data: PDF, kind: "document", ownerId: owner._id });
    vi.mocked(getCurrentUser).mockResolvedValue(intruder);

    const response = await call(id);
    expect(response.status).toBe(404);
  });
});
