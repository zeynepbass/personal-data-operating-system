"use client";

import { useEffect, useState } from "react";
import NotesHome from "../components/NotesHome";
import NotesLayout from "./layout/NotesLayout";
import useNotes from "../hooks/useNotes";

export default function NotesPage() {
  const { data = [], isLoading,deletedNotes} = useNotes();
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

  if (!data.length) {
    return <div>Not bulunamadı.</div>;
  }

  return (
    <NotesLayout
      note={data}

      setOpen={setOpen}
      openMenu={openMenu}
      setOpenMenu={setOpenMenu}
      deletedNotes={deletedNotes}
      activeNote={activeNote}
      setActiveNote={setActiveNote}
    >
      <NotesHome note={activeNote}  open={open}/>
    </NotesLayout>
  );
}