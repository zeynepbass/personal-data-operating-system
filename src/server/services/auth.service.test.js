import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { beforeEach, describe, expect, it } from "vitest";

import { clearDatabase, createTestUser } from "@tests/helpers/db";

import { createSession, validateSessionToken } from "../auth/session";
import { connectDB } from "../db/connect";
import { User } from "../models/user.model";

import { authenticate, deleteAccount, register, updateProfile } from "./auth.service";

const PNG = Uint8Array.from(
  Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
    "base64",
  ),
);

beforeEach(async () => {
  await clearDatabase();
});

describe("register", () => {
  const valid = {
    fullName: "  Ada Lovelace ",
    email: " Ada@Example.COM ",
    password: "analytical-engine",
    passwordAgain: "analytical-engine",
  };

  it("normalizes input and never returns the password", async () => {
    const user = await register(valid);

    expect(user).toMatchObject({
      fullName: "Ada Lovelace",
      email: "ada@example.com",
      role: "user",
    });
    expect(user).not.toHaveProperty("password");

    const stored = await User.findOne({ email: "ada@example.com" }).select("+password").lean();
    expect(stored.password).not.toBe(valid.password);
    await expect(bcrypt.compare(valid.password, stored.password)).resolves.toBe(true);
  });

  it("ignores attempts to self-assign the admin role", async () => {
    const user = await register({ ...valid, role: "admin" });
    expect(user.role).toBe("user");
  });

  it("rejects a duplicate email regardless of case", async () => {
    await register(valid);
    await expect(register({ ...valid, email: "ADA@example.com" })).rejects.toMatchObject({
      code: "CONFLICT",
      fieldErrors: { email: expect.any(Array) },
    });
  });

  it.each([
    ["missing fields", {}],
    ["null body", null],
    ["wrong types", { fullName: 42, email: ["x"], password: true, passwordAgain: true }],
    ["short password", { ...valid, password: "short", passwordAgain: "short" }],
    ["mismatched passwords", { ...valid, passwordAgain: "something-else" }],
    ["invalid email", { ...valid, email: "not-an-email" }],
    [
      "password over 72 bytes",
      { ...valid, password: "ş".repeat(40), passwordAgain: "ş".repeat(40) },
    ],
  ])("rejects %s with field errors", async (_label, input) => {
    await expect(register(input)).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: expect.any(Object),
    });
  });
});

describe("authenticate", () => {
  it("returns the public user for valid credentials", async () => {
    const { user, password } = await createTestUser({ email: "grace@example.com" });

    const result = await authenticate({ email: "GRACE@example.com", password });
    expect(result.id).toBe(String(user._id));
    expect(result).not.toHaveProperty("password");
  });

  it("uses the same error for unknown email and wrong password", async () => {
    await createTestUser({ email: "grace@example.com" });

    const unknown = await authenticate({
      email: "nobody@example.com",
      password: "whatever-1",
    }).catch((error) => error);
    const wrong = await authenticate({ email: "grace@example.com", password: "whatever-1" }).catch(
      (error) => error,
    );

    expect(unknown.code).toBe("UNAUTHENTICATED");
    expect(wrong.code).toBe("UNAUTHENTICATED");
    expect(unknown.message).toBe(wrong.message);
  });

  it("upgrades legacy bcrypt hashes after a successful login", async () => {
    await connectDB();
    await User.create({
      fullName: "Legacy",
      email: "legacy@example.com",
      password: await bcrypt.hash("old-password-1", 10),
    });

    await authenticate({ email: "legacy@example.com", password: "old-password-1" });

    const stored = await User.findOne({ email: "legacy@example.com" }).select("+password").lean();
    expect(bcrypt.getRounds(stored.password)).toBe(12);
  });
});

describe("updateProfile", () => {
  it("updates name and about without asking for the password", async () => {
    const { user } = await createTestUser();

    const result = await updateProfile(user, {
      fullName: "New Name",
      email: user.email,
      about: "hello",
    });

    expect(result).toMatchObject({ fullName: "New Name", about: "hello" });
  });

  it("requires the current password to change the email", async () => {
    const { user, password } = await createTestUser();

    await expect(
      updateProfile(user, { fullName: user.fullName, email: "new@example.com" }),
    ).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { currentPassword: expect.any(Array) },
    });

    await expect(
      updateProfile(user, {
        fullName: user.fullName,
        email: "new@example.com",
        currentPassword: "wrong-password",
      }),
    ).rejects.toMatchObject({ code: "VALIDATION" });

    const result = await updateProfile(user, {
      fullName: user.fullName,
      email: "new@example.com",
      currentPassword: password,
    });
    expect(result.email).toBe("new@example.com");
  });

  it("refuses an email that belongs to someone else", async () => {
    const { user, password } = await createTestUser();
    const { user: other } = await createTestUser();

    await expect(
      updateProfile(user, {
        fullName: user.fullName,
        email: other.email,
        currentPassword: password,
      }),
    ).rejects.toMatchObject({ code: "CONFLICT" });
  });

  it("ignores role and password fields in the payload", async () => {
    const { user } = await createTestUser();

    await updateProfile(user, {
      fullName: user.fullName,
      email: user.email,
      role: "admin",
      password: "hijacked-password",
    });

    const stored = await User.findById(user._id).lean();
    expect(stored.role).toBe("user");
  });

  it("stores a valid avatar and serves it through the files endpoint", async () => {
    const { user } = await createTestUser();

    const result = await updateProfile(
      user,
      { fullName: user.fullName, email: user.email },
      { avatar: { data: PNG, name: "me.png" } },
    );

    expect(result.profileImage).toMatch(/^\/api\/files\/[a-f0-9]{24}$/);
  });

  it("rejects an HTML file disguised as an image", async () => {
    const { user } = await createTestUser();
    const html = new TextEncoder().encode("<html><script>alert(1)</script></html>");

    await expect(
      updateProfile(
        user,
        { fullName: user.fullName, email: user.email },
        { avatar: { data: html, name: "avatar.png" } },
      ),
    ).rejects.toMatchObject({ code: "VALIDATION" });
  });
});

describe("deleteAccount", () => {
  it("requires the password", async () => {
    const { user } = await createTestUser();

    await expect(deleteAccount(user, { password: "wrong" })).rejects.toMatchObject({
      code: "VALIDATION",
    });
    await expect(User.exists({ _id: user._id })).resolves.toBeTruthy();
  });

  it("removes the user, their data, files and sessions but not other users' data", async () => {
    const { user, password } = await createTestUser();
    const { user: other } = await createTestUser();
    const { connection } = await connectDB();

    await connection.collection("notes").insertMany([{ user: user._id }, { user: other._id }]);
    await connection.collection("goals").insertOne({ user: user._id });
    await updateProfile(
      user,
      { fullName: user.fullName, email: user.email },
      { avatar: { data: PNG, name: "me.png" } },
    );
    const { token } = await createSession(user._id);

    await deleteAccount(user, { password });

    await expect(User.exists({ _id: user._id })).resolves.toBeNull();
    await expect(connection.collection("notes").countDocuments({ user: user._id })).resolves.toBe(
      0,
    );
    await expect(connection.collection("notes").countDocuments({ user: other._id })).resolves.toBe(
      1,
    );
    await expect(connection.collection("goals").countDocuments({ user: user._id })).resolves.toBe(
      0,
    );
    await expect(
      connection.collection("files.files").countDocuments({ "metadata.owner": user._id }),
    ).resolves.toBe(0);
    await expect(validateSessionToken(token)).resolves.toBeNull();
  });

  it("rejects an actor id that is not a valid ObjectId", async () => {
    await expect(
      deleteAccount({ _id: "not-an-id", role: "user" }, { password: "x" }),
    ).rejects.toMatchObject({ code: "NOT_FOUND" });
    expect(mongoose.isValidObjectId("not-an-id")).toBe(false);
  });
});
