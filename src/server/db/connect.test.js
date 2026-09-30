import mongoose from "mongoose";
import { afterEach, describe, expect, it, vi } from "vitest";

import { logger } from "../logger";

import { connectDB, disconnectDB, pingDB } from "./connect";

afterEach(async () => {
  await disconnectDB();
});

describe("connectDB", () => {
  it("reuses the cached connection", async () => {
    const connectSpy = vi.spyOn(mongoose, "connect");

    const first = await connectDB();
    const second = await connectDB();

    expect(second).toBe(first);
    expect(connectSpy).toHaveBeenCalledTimes(1);
  });

  it("disables command buffering so queries fail fast without a connection", async () => {
    const connectSpy = vi.spyOn(mongoose, "connect");

    await connectDB();

    expect(connectSpy.mock.calls[0][1]).toMatchObject({ bufferCommands: false });
  });

  it("logs and rethrows connection errors, then retries on the next call", async () => {
    const failure = new Error("connection refused");
    const connectSpy = vi.spyOn(mongoose, "connect").mockRejectedValueOnce(failure);
    const errorSpy = vi.spyOn(logger, "error");

    await expect(connectDB()).rejects.toBe(failure);
    expect(errorSpy).toHaveBeenCalledWith({ err: failure }, "mongodb connection failed");

    await expect(connectDB()).resolves.toBeDefined();
    expect(connectSpy).toHaveBeenCalledTimes(2);
  });
});

describe("pingDB", () => {
  it("returns true when the server answers", async () => {
    await expect(pingDB()).resolves.toBe(true);
  });
});
