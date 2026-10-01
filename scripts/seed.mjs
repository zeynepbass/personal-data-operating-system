import mongoose from "mongoose";

import { runMigrations } from "./migrations.mjs";
import { seedDemo } from "./seed-data.mjs";

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is required");

  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "admin-demo-123";
  const demoPassword = process.env.SEED_DEMO_PASSWORD ?? "demo-demo-123";

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10_000 });
  try {
    await runMigrations(mongoose.connection.db);
    await seedDemo(mongoose.connection.db, { adminPassword, demoPassword });
    process.stdout.write(
      JSON.stringify({
        level: "info",
        service: "pdos-seed",
        message: "demo data ready",
        accounts: ["admin@pdos.dev", "demo@pdos.dev"],
      }).concat("\n"),
    );
  } finally {
    await mongoose.disconnect();
  }
}

main().catch((error) => {
  process.stderr.write(
    `${JSON.stringify({ level: "error", service: "pdos-seed", message: error.message })}\n`,
  );
  process.exit(1);
});
