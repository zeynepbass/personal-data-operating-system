import NotesPage from "@/features/notes/pages/notesPage";
import { requirePageUser } from "@/server/auth/dal";
import { listNotes } from "@/server/services/note.service";

export const metadata = { title: "Notlar" };

export default async function Notes() {
  const user = await requirePageUser();
  const { items } = await listNotes(user, { limit: 100 });

  return <NotesPage notes={items} />;
}
