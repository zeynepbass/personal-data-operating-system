import "server-only";

import { documentFilterSchema, documentMetaSchema } from "@/shared/schemas/document";

import { AppError } from "../errors";
import { pageQuerySchema } from "../pagination";
import {
  deleteDocumentById,
  findDocumentById,
  findVisibleDocuments,
  insertDocument,
} from "../repositories/document.repository";
import { parseInput } from "../validation";

import { deleteFile, storeFile } from "./file.service";

/**
 * @typedef {{ _id: import("mongoose").Types.ObjectId, role: string }} Actor
 * @typedef {{
 *   id: string, name: string, type: string, color: string, icon: string,
 *   size: string, date: string, createdAt: string, pdf: string,
 *   favorite: boolean, shared: boolean, isOwner: boolean,
 * }} DocumentDTO
 */

const dateFormatter = new Intl.DateTimeFormat("tr-TR", { timeZone: "Europe/Istanbul" });

/** @param {number} bytes */
const formatSize = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

/**
 * @param {any} doc
 * @param {Actor} actor
 * @returns {DocumentDTO}
 */
export function toDocumentDTO(doc, actor) {
  return {
    id: String(doc._id),
    name: doc.name,
    type: doc.type ?? "pdf",
    color: doc.color ?? "",
    icon: "pdf",
    size: doc.sizeBytes ? formatSize(doc.sizeBytes) : (doc.size ?? "-"),
    date: dateFormatter.format(new Date(doc.createdAt)),
    createdAt: new Date(doc.createdAt).toISOString(),
    pdf: doc.file ? `/api/files/${doc.file}` : (doc.pdf ?? ""),
    favorite: Boolean(doc.favorite),
    shared: Boolean(doc.shared),
    isOwner: String(doc.user) === String(actor._id),
  };
}

/**
 * @param {Actor} actor
 * @param {unknown} [query]
 */
export async function listDocuments(actor, query = {}) {
  const filters = parseInput(documentFilterSchema, query);
  const page = parseInput(pageQuerySchema, query);
  const result = await findVisibleDocuments(actor._id, filters, page);
  return {
    items: result.items.map((doc) => toDocumentDTO(doc, actor)),
    nextCursor: result.nextCursor,
  };
}

/**
 * @param {Actor} actor
 * @param {unknown} meta
 * @param {{ data: Uint8Array, name?: string } | null} upload
 * @returns {Promise<DocumentDTO>}
 */
export async function uploadDocument(actor, meta, upload) {
  const data = parseInput(documentMetaSchema, meta);
  if (!upload?.data?.byteLength) {
    throw new AppError("VALIDATION", "PDF dosyası gereklidir.", {
      fieldErrors: { pdf: ["PDF dosyası gereklidir."] },
    });
  }

  const shared = actor.role === "admin" ? data.shared : false;
  const stored = await storeFile({
    data: upload.data,
    kind: "document",
    ownerId: actor._id,
    originalName: upload.name,
    shared,
  });

  try {
    const doc = await insertDocument({
      user: actor._id,
      name: data.name,
      type: data.type,
      color: data.color,
      file: stored.id,
      sizeBytes: stored.size,
      shared,
    });
    return toDocumentDTO(doc, actor);
  } catch (error) {
    await deleteFile(stored.id, actor);
    throw error;
  }
}

/**
 * @param {Actor} actor
 * @param {string} id
 */
export async function deleteDocument(actor, id) {
  const doc = await findDocumentById(id);
  const allowed = doc && (actor.role === "admin" || String(doc.user) === String(actor._id));
  if (!allowed) throw new AppError("NOT_FOUND", "Belge bulunamadı veya silme yetkiniz yok.");

  await deleteDocumentById(id);
  if (doc.file) await deleteFile(String(doc.file), actor);
}
