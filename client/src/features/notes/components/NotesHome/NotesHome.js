import NotesCard from "../NotesCard";

export default function NotesHome({ note }) {
  if (!note) {
    return <div>Bir not seçin.</div>;
  }

  return <NotesCard note={note} />;
}