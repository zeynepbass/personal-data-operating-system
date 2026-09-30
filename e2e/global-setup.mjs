import mongoose from "mongoose";

import { ensureUser } from "../scripts/seed-data.mjs";

export const E2E_ADMIN = {
  email: "e2e-admin@pdos.dev",
  password: "e2e-admin-password",
  fullName: "E2E Admin",
  role: "admin",
};

export default async function globalSetup() {
  const uri = process.env.E2E_MONGODB_URI ?? "mongodb://localhost:27019/pdos";
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10_000 });
  try {
    await ensureUser(mongoose.connection.db, E2E_ADMIN);
    await mongoose.connection.db.collection("rate_limits").deleteMany({});
  } finally {
    await mongoose.disconnect();
  }
}
