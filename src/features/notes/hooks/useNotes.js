"use client";

import { useOptimistic, useTransition } from "react";
import { toast } from "react-hot-toast";

import { handleActionResult } from "@/shared/helpers/form.helper";

import { createNoteAction, deleteNoteAction, updateNoteAction } from "../actions/note.actions";

function notesReducer(notes, change) {
  switch (change.type) {
    case "update":
      return notes.map((note) => (note.id === change.note.id ? { ...note, ...change.note } : note));
    case "delete":
      return notes.filter((note) => note.id !== change.id);
    default:
      return notes;
  }
}

export default function useNotes(notes) {
  const [optimisticNotes, applyOptimistic] = useOptimistic(notes, notesReducer);
  const [isPending, startTransition] = useTransition();

  const saveNote = (existing, payload, form, onSuccess) =>
    startTransition(async () => {
      if (existing) applyOptimistic({ type: "update", note: { ...payload, id: existing.id } });

      const result = existing
        ? await updateNoteAction(existing.id, payload)
        : await createNoteAction(payload);

      if (!handleActionResult(form, result)) return;
      toast.success(existing ? "Not güncellendi." : "Not oluşturuldu.");
      onSuccess?.(result.data);
    });

  const deleteNote = (id) =>
    startTransition(async () => {
      applyOptimistic({ type: "delete", id });
      const result = await deleteNoteAction(id);
      if (result.ok) toast.success("Not silindi.");
      else toast.error(result.error);
    });

  return { notes: optimisticNotes, saveNote, deleteNote, isPending };
}
