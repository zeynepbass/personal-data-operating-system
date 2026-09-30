"use server";

import { revalidatePath } from "next/cache";

import { runAction } from "@/server/action";
import { requireUser } from "@/server/auth/dal";
import { deleteDocument } from "@/server/services/document.service";

/** @param {string} id */
export async function deleteDocumentAction(id) {
  return runAction(async () => {
    await deleteDocument(await requireUser(), id);
    revalidatePath("/documents");
  });
}
