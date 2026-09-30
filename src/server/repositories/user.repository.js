import "server-only";
import mongoose from "mongoose";

import { connectDB } from "../db/connect";
import { User } from "../models/user.model";

const OWNED_COLLECTIONS = ["notes", "goals", "documents", "notifications"];

/** @param {string} id */
export async function findUserById(id, { withPassword = false } = {}) {
  await connectDB();
  if (!mongoose.isValidObjectId(id)) return null;
  const query = User.findById(id);
  return withPassword ? query.select("+password") : query;
}

/** @param {string} email */
export async function findUserByEmail(email, { withPassword = false } = {}) {
  await connectDB();
  const query = User.findOne({ email });
  return withPassword ? query.select("+password") : query;
}

/** @param {{ fullName: string, email: string, password: string }} data */
export async function createUser(data) {
  await connectDB();
  return User.create({ ...data, role: "user" });
}

/**
 * @param {string} id
 * @param {Record<string, unknown>} changes
 */
export async function updateUser(id, changes) {
  await connectDB();
  return User.findByIdAndUpdate(id, changes, { returnDocument: "after", runValidators: true });
}

/** @param {string} id */
export async function deleteUserWithData(id) {
  const { connection } = await connectDB();
  const userId = new mongoose.Types.ObjectId(id);

  await Promise.all(
    OWNED_COLLECTIONS.map((name) => connection.collection(name).deleteMany({ user: userId })),
  );
  await User.deleteOne({ _id: userId });
}
