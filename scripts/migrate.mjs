import mongoose from "mongoose";

import { runMigrations } from "./migrations.mjs";

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is required");

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10_000 });
  try {
    await runMigrations(mongoose.connection.db);
  } finally {
    await mongoose.disconnect();
  }
}

main().catch((error) => {
  process.stderr.write(
    JSON.stringify({
      level: "error",
      service: "pdos-migrate",
      message: error.message,
      stack: error.stack,
    }).concat("\n"),
  );
  process.exit(1);
});
