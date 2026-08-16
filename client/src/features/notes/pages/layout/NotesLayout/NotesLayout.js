import { PageHeader } from "@/shared/components/molecules";
import NotesMenu from "../../../components/NotesMenu";
import NotesNavbar from "../../../components/NotesNavbar";

export default function NotesLayout({
  children,
  note,
  openMenu,
  setOpenMenu,
  activeNote,
  setActiveNote,
}) {
  return (
    <>
      <PageHeader title="Notlar" />

      <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)_260px]">
        

        <aside>
          <NotesMenu
            note={note}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            activeNote={activeNote}
            setActiveNote={setActiveNote}
          />
        </aside>


        <main className="min-w-0">
          {children}
        </main>


        <aside className="hidden w-64 xl:block">
          <NotesNavbar  note={activeNote}/>
        </aside>

      </div>
    </>
  );
}