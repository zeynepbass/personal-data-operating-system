"use client";

import { useEffect, useState } from "react";
import NotesHome from "../components/NotesHome";
import NotesLayout from "./layout/NotesLayout";
import useNotes from "../hooks/useNotes";

export default function NotesPage() {
  const { data = [], isLoading } = useNotes();

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
      openMenu={openMenu}
      setOpenMenu={setOpenMenu}
      activeNote={activeNote}
      setActiveNote={setActiveNote}
    >
      <NotesHome note={activeNote} />
    </NotesLayout>
  );
}