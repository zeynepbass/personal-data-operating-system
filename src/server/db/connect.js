import "server-only";
import mongoose from "mongoose";

import { env } from "../env";
import { logger } from "../logger";

/** @type {{ conn: typeof mongoose | null, promise: Promise<typeof mongoose> | null, listening: boolean }} */
const cached = (globalThis.__pdosMongoose ??= { conn: null, promise: null, listening: false });

function attachListeners() {
  if (cached.listening) return;
  cached.listening = true;

  mongoose.connection.on("disconnected", () => logger.warn("mongodb disconnected"));
  mongoose.connection.on("reconnected", () => logger.info("mongodb reconnected"));
  mongoose.connection.on("error", (err) => logger.error({ err }, "mongodb connection error"));
}

/** @returns {Promise<typeof mongoose>} */
export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    attachListeners();

    cached.promise = mongoose
      .connect(env.MONGODB_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 5000,
      })
      .then((instance) => {
        logger.info({ db: instance.connection.name }, "mongodb connected");
        return instance;
      })
      .catch((err) => {
        cached.promise = null;
        logger.error({ err }, "mongodb connection failed");
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

/** @returns {Promise<boolean>} */
export async function pingDB() {
  const { connection } = await connectDB();
  const result = await connection.db.admin().ping();
  return result.ok === 1;
}

export async function disconnectDB() {
  if (!cached.conn) return;
  await mongoose.disconnect();
  cached.conn = null;
  cached.promise = null;
}
