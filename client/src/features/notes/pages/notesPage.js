"use client";

import { useEffect, useState } from "react";
import NotesHome from "../components/NotesHome";
import NotesLayout from "./layout/NotesLayout";
import useNotes from "../hooks/useNotes";
import { PageHeader } from "@/shared/components/molecules";
import { Button } from "@/shared/components/atoms";
import NotesModal from "../components/NotesModal";

export default function NotesPage() {
  const {
    data = [],
    isLoading,
    deletedNotes,
    createNotes,
  } = useNotes();

  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [activeNote, setActiveNote] = useState(null);

  useEffect(() => {
    if (data.length > 0 && !activeNote) {
      setOpenMenu(data[0].id);
      setActiveNote(data[0]);
    }
  }, [data, activeNote]);

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <>
      {!data.length ? (
        <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
          <PageHeader
            title="Notlar"
            description="Notlarınız bulunamadı."
          />

          <Button
            text="+ Yeni not yükle"
            onClick={() => setOpen(true)}
            className="w-full text-gray-50 hover:text-white md:w-auto"
          />
        </div>
      ) : (
        <NotesLayout
          note={data}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          deletedNotes={deletedNotes}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
        >
          <NotesHome
            note={activeNote}
          />
        </NotesLayout>
      )}


      <NotesModal
        open={open}
        setOpen={setOpen}
        onSubmit={createNotes}
        isCreating={createNotes.isPending}
      />
    </>
  );
}