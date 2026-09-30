import "server-only";

import { noteFilterSchema, noteSchema } from "@/shared/schemas/note";

import { AppError } from "../errors";
import { pageQuerySchema } from "../pagination";
import {
  deleteNoteForUser,
  findNoteForUser,
  findNotesByUser,
  insertNote,
  updateNoteForUser,
} from "../repositories/note.repository";
import { parseInput } from "../validation";

/**
 * @typedef {{ _id: import("mongoose").Types.ObjectId, role: string }} Actor
 * @typedef {{
 *   id: string, title: string, description: string, category: string, subCategory: string,
 *   sections: Array<{ id: string, title: string, type: string, content: string, language: string | null, items: string[] }>,
 *   createdAt: string, updatedAt: string,
 * }} NoteDTO
 */

/**
 * @param {any} note
 * @returns {NoteDTO}
 */
export function toNoteDTO(note) {
  return {
    id: String(note._id),
    title: note.title,
    description: note.description,
    category: note.category,
    subCategory: note.subCategory,
    sections: (note.sections ?? []).map((section) => ({
      id: section.id,
      title: section.title,
      type: section.type,
      content: section.content ?? "",
      language: section.language ?? null,
      items: section.items ?? [],
    })),
    createdAt: new Date(note.createdAt).toISOString(),
    updatedAt: new Date(note.updatedAt).toISOString(),
  };
}

const notFound = () => new AppError("NOT_FOUND", "Not bulunamadı.");

/**
 * @param {Actor} actor
 * @param {unknown} [query]
 * @returns {Promise<{ items: NoteDTO[], nextCursor: string | null }>}
 */
export async function listNotes(actor, query = {}) {
  const filters = parseInput(noteFilterSchema, query);
  const page = parseInput(pageQuerySchema, query);
  const result = await findNotesByUser(actor._id, filters, page);
  return { items: result.items.map(toNoteDTO), nextCursor: result.nextCursor };
}

/**
 * @param {Actor} actor
 * @param {string} id
 * @returns {Promise<NoteDTO>}
 */
export async function getNote(actor, id) {
  const note = await findNoteForUser(id, actor._id);
  if (!note) throw notFound();
  return toNoteDTO(note);
}

/**
 * @param {Actor} actor
 * @param {unknown} input
 * @returns {Promise<NoteDTO>}
 */
export async function createNote(actor, input) {
  const data = parseInput(noteSchema, input);
  return toNoteDTO(await insertNote(actor._id, data));
}

/**
 * @param {Actor} actor
 * @param {string} id
 * @param {unknown} input
 * @returns {Promise<NoteDTO>}
 */
export async function updateNote(actor, id, input) {
  const data = parseInput(noteSchema, input);
  const note = await updateNoteForUser(id, actor._id, data);
  if (!note) throw notFound();
  return toNoteDTO(note);
}

/**
 * @param {Actor} actor
 * @param {string} id
 */
export async function deleteNote(actor, id) {
  const note = await deleteNoteForUser(id, actor._id);
  if (!note) throw notFound();
}
