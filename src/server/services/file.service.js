import "server-only";
import { randomUUID } from "node:crypto";
import { Readable } from "node:stream";

import { fileTypeFromBuffer } from "file-type";
import mongoose from "mongoose";

import { connectDB } from "../db/connect";
import { AppError } from "../errors";

const BUCKET = "files";

export const FILE_RULES = Object.freeze({
  avatar: {
    maxBytes: 2 * 1024 * 1024,
    mimeTypes: ["image/png", "image/jpeg", "image/webp"],
  },
  document: {
    maxBytes: 10 * 1024 * 1024,
    mimeTypes: ["application/pdf"],
  },
});

/**
 * @typedef {keyof typeof FILE_RULES} FileKind
 * @typedef {{ _id: import("mongoose").Types.ObjectId, role: string }} Actor
 */

async function getBucket() {
  const { connection } = await connectDB();
  return new mongoose.mongo.GridFSBucket(connection.db, { bucketName: BUCKET });
}

/**
 * @param {{ data: Uint8Array, kind: FileKind, ownerId: import("mongoose").Types.ObjectId | string, originalName?: string, shared?: boolean }} input
 * @returns {Promise<{ id: string, contentType: string, size: number }>}
 */
export async function storeFile({ data, kind, ownerId, originalName = "", shared = false }) {
  const rules = FILE_RULES[kind];
  if (!rules) throw new AppError("VALIDATION", "Desteklenmeyen dosya türü.");

  if (!data?.byteLength) throw new AppError("VALIDATION", "Dosya boş.");
  if (data.byteLength > rules.maxBytes) {
    throw new AppError(
      "VALIDATION",
      `Dosya en fazla ${Math.round(rules.maxBytes / 1024 / 1024)} MB olabilir.`,
    );
  }

  const detected = await fileTypeFromBuffer(data);
  if (!detected || !rules.mimeTypes.includes(detected.mime)) {
    throw new AppError("VALIDATION", "Dosya içeriği izin verilen türlerden biri değil.");
  }

  const bucket = await getBucket();
  const id = new mongoose.Types.ObjectId();
  const upload = bucket.openUploadStreamWithId(id, `${randomUUID()}.${detected.ext}`, {
    metadata: {
      owner: new mongoose.Types.ObjectId(String(ownerId)),
      kind,
      contentType: detected.mime,
      originalName: originalName.slice(0, 255),
      shared,
    },
  });

  await new Promise((resolve, reject) => {
    Readable.from(Buffer.from(data)).pipe(upload).on("finish", resolve).on("error", reject);
  });

  return { id: String(id), contentType: detected.mime, size: data.byteLength };
}

/**
 * @param {any} file
 * @param {Actor} actor
 */
function canRead(file, actor) {
  const meta = file.metadata ?? {};
  return actor.role === "admin" || meta.shared === true || String(meta.owner) === String(actor._id);
}

/**
 * @param {string} id
 * @param {Actor} actor
 */
export async function openFileForRead(id, actor) {
  if (!mongoose.isValidObjectId(id)) throw new AppError("NOT_FOUND", "Dosya bulunamadı.");

  const bucket = await getBucket();
  const objectId = new mongoose.Types.ObjectId(id);
  const [file] = await bucket.find({ _id: objectId }).limit(1).toArray();

  if (!file || !canRead(file, actor)) throw new AppError("NOT_FOUND", "Dosya bulunamadı.");

  return {
    stream: bucket.openDownloadStream(objectId),
    contentType: file.metadata.contentType,
    length: file.length,
    kind: file.metadata.kind,
    filename: file.metadata.originalName || file.filename,
  };
}

/**
 * @param {string} id
 * @param {Actor} actor
 */
export async function deleteFile(id, actor) {
  if (!mongoose.isValidObjectId(id)) return;

  const bucket = await getBucket();
  const objectId = new mongoose.Types.ObjectId(id);
  const [file] = await bucket.find({ _id: objectId }).limit(1).toArray();
  if (!file) return;

  const isOwner = String(file.metadata?.owner) === String(actor._id);
  if (!isOwner && actor.role !== "admin") throw new AppError("NOT_FOUND", "Dosya bulunamadı.");

  await bucket.delete(objectId);
}

/** @param {import("mongoose").Types.ObjectId | string} ownerId */
export async function deleteFilesOwnedBy(ownerId) {
  const bucket = await getBucket();
  const owner = new mongoose.Types.ObjectId(String(ownerId));
  const files = await bucket.find({ "metadata.owner": owner }).toArray();
  await Promise.all(files.map((file) => bucket.delete(file._id)));
}

/**
 * @param {string | null | undefined} url
 * @returns {string | null}
 */
export function fileIdFromUrl(url) {
  const match = /^\/api\/files\/([a-f0-9]{24})$/.exec(url ?? "");
  return match ? match[1] : null;
}
