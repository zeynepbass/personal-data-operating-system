"use client";

import { useState } from "react";

import { Button } from "@/shared/components/atoms";
import { PageHeader } from "@/shared/components/molecules";

import NotesHome from "../components/NotesHome";
import NotesModal from "../components/NotesModal";
import useNotes from "../hooks/useNotes";

import NotesLayout from "./layout/NotesLayout";

export default function NotesPage({ notes: initialNotes = [] }) {
  const { notes, saveNote, deleteNote, isPending } = useNotes(initialNotes);

  const [editor, setEditor] = useState({ open: false, note: null });
  const [openMenu, setOpenMenu] = useState(null);
  const [activeNoteId, setActiveNoteId] = useState(null);

  const activeNote = notes.find((note) => note.id === activeNoteId) ?? notes[0] ?? null;
  const resolvedOpenMenu = openMenu ?? notes[0]?.id ?? null;

  const openEditor = (note = null) => setEditor({ open: true, note });
  const closeEditor = () => setEditor({ open: false, note: null });

  return (
    <>
      {!notes.length ? (
        <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
          <PageHeader title="Notlar" description="Notlarınız bulunamadı." />

          <Button
            text="+ Yeni not"
            onClick={() => openEditor()}
            className="w-full text-gray-50 hover:text-white md:w-auto"
          />
        </div>
      ) : (
        <NotesLayout
          note={notes}
          openMenu={resolvedOpenMenu}
          setOpenMenu={setOpenMenu}
          deletedNotes={deleteNote}
          activeNote={activeNote}
          setActiveNote={(note) => setActiveNoteId(note?.id ?? null)}
          onCreate={() => openEditor()}
        >
          <NotesHome note={activeNote} onEdit={() => openEditor(activeNote)} />
        </NotesLayout>
      )}

      <NotesModal
        open={editor.open}
        note={editor.note}
        onClose={closeEditor}
        isSaving={isPending}
        onSubmit={(payload, form) =>
          saveNote(editor.note, payload, form, (saved) => {
            closeEditor();
            if (saved?.id) setActiveNoteId(saved.id);
          })
        }
      />
    </>
  );
}
