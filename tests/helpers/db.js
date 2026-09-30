import { connectDB, disconnectDB } from "@/server/db/connect";
import { hashPassword } from "@/server/auth/password";
import { User } from "@/server/models/user.model";

export async function clearDatabase() {
  const { connection } = await connectDB();
  const collections = await connection.db.collections();
  await Promise.all(collections.map((collection) => collection.deleteMany({})));
}

export { disconnectDB };

let sequence = 0;

/**
 * @param {Partial<{ fullName: string, email: string, password: string, role: "user" | "admin", passwordChangedAt: Date }>} [overrides]
 */
export async function createTestUser(overrides = {}) {
  await connectDB();
  sequence += 1;
  const password = overrides.password ?? "correct-horse-1";
  const user = await User.create({
    fullName: overrides.fullName ?? `Test User ${sequence}`,
    email: overrides.email ?? `user${sequence}@example.com`,
    password: await hashPassword(password),
    role: overrides.role ?? "user",
    passwordChangedAt: overrides.passwordChangedAt ?? null,
  });
  return { user, password };
}
