import { describe, expect, it, vi } from "vitest";

import { pingDB } from "@/server/db/connect";

import { GET } from "./route";

vi.mock("@/server/db/connect", () => ({ pingDB: vi.fn() }));

describe("GET /api/health", () => {
  it("returns 200 when the database is reachable", async () => {
    vi.mocked(pingDB).mockResolvedValue(true);

    const response = await GET();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ status: "ok", db: "up" });
  });

  it("returns 503 without leaking the error when the database is down", async () => {
    vi.mocked(pingDB).mockRejectedValue(new Error("secret connection string in message"));

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body).toEqual({ status: "error", db: "down" });
  });
});
