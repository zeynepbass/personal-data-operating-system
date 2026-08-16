import { PageHeader } from "@/shared/components/molecules";
import { Button } from "@/shared/components/atoms";
import NotesMenu from "../../../components/NotesMenu";
import NotesNavbar from "../../../components/NotesNavbar";

export default function NotesLayout({
  children,
  note,
  setOpen,
  openMenu,
  setOpenMenu,
  activeNote,
  setActiveNote,
  deletedNotes,
}) {
  return (
    <>
       <div className="flex flex-col gap-4 md:flex-row py-4 md:items-center md:justify-between">
        <PageHeader
          title="Notlar"
          description="Notlarınızı görüntüleyin ve yönetin."
        />

        <Button
          text="+ Yeni not yükle"
          onClick={() => setOpen(true)}
          className="w-full md:w-auto hover:text-white text-gray-50"
        />
      </div>
      <div className="grid gap-5 lg:grid-cols-[260px_minmax(0,1fr)_260px]">
        <aside className="rounded-2xl bg-white p-3">
          <NotesMenu
            note={note}
            deletedNotes={deletedNotes}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            activeNote={activeNote}
            setActiveNote={setActiveNote}
          />
        </aside>

        <main className="min-w-0">{children}</main>

        <aside className="hidden w-64 xl:block">
          <NotesNavbar note={activeNote} />
        </aside>
      </div>
    </>
  );
}
