"use server";

import { revalidatePath } from "next/cache";

import { runAction } from "@/server/action";
import { requireUser } from "@/server/auth/dal";
import * as noteService from "@/server/services/note.service";

/** @param {unknown} input */
export async function createNoteAction(input) {
  return runAction(async () => {
    const note = await noteService.createNote(await requireUser(), input);
    revalidatePath("/notes");
    revalidatePath("/dashboard");
    return note;
  });
}

/**
 * @param {string} id
 * @param {unknown} input
 */
export async function updateNoteAction(id, input) {
  return runAction(async () => {
    const note = await noteService.updateNote(await requireUser(), id, input);
    revalidatePath("/notes");
    return note;
  });
}

/** @param {string} id */
export async function deleteNoteAction(id) {
  return runAction(async () => {
    await noteService.deleteNote(await requireUser(), id);
    revalidatePath("/notes");
    revalidatePath("/dashboard");
  });
}
