import { beforeEach, describe, expect, it } from "vitest";

import { clearDatabase, createTestUser } from "@tests/helpers/db";

import { createGoal, deleteGoal, listGoals, updateGoalProgress } from "./goal.service";

const goal = (overrides = {}) => ({
  title: "Ship v2",
  category: "Work",
  items: [
    { title: "Design", value: 30 },
    { title: "Build", value: 20 },
  ],
  ...overrides,
});

beforeEach(async () => {
  await clearDatabase();
});

describe("goal service", () => {
  it("derives status and progress from the items instead of trusting the client", async () => {
    const { user } = await createTestUser();

    const created = await createGoal(user, { ...goal(), status: "completed" });
    expect(created).toMatchObject({ status: "active", progress: 50 });

    const done = await updateGoalProgress(user, created.id, [
      { title: "Design", value: 50 },
      { title: "Build", value: "50" },
    ]);
    expect(done).toMatchObject({ status: "completed", progress: 100 });
  });

  it.each([
    ["total above 100", [{ title: "a", value: 60 }, { title: "b", value: 60 }]],
    ["negative value", [{ title: "a", value: -1 }]],
    ["non-numeric value", [{ title: "a", value: "abc" }]],
    ["missing title", [{ value: 10 }]],
    ["not an array", { title: "a", value: 1 }],
    ["null", null],
  ])("rejects progress with %s", async (_label, items) => {
    const { user } = await createTestUser();
    const created = await createGoal(user, goal());

    await expect(updateGoalProgress(user, created.id, items)).rejects.toMatchObject({
      code: "VALIDATION",
    });
  });

  it("keeps goals private to their owner", async () => {
    const { user: alice } = await createTestUser();
    const { user: bob } = await createTestUser();
    const created = await createGoal(alice, goal());

    await expect(listGoals(bob)).resolves.toMatchObject({ items: [] });
    await expect(updateGoalProgress(bob, created.id, [])).rejects.toMatchObject({
      code: "NOT_FOUND",
    });
    await expect(deleteGoal(bob, created.id)).rejects.toMatchObject({ code: "NOT_FOUND" });

    await deleteGoal(alice, created.id);
    await expect(listGoals(alice)).resolves.toMatchObject({ items: [] });
  });

  it("filters by status", async () => {
    const { user } = await createTestUser();
    await createGoal(user, goal());
    await createGoal(user, goal({ items: [{ title: "all", value: 100 }] }));

    const completed = await listGoals(user, { status: "completed" });
    expect(completed.items).toHaveLength(1);
    await expect(listGoals(user, { status: "bogus" })).rejects.toMatchObject({ code: "VALIDATION" });
  });
});
