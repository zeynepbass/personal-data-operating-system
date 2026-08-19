import NotesCard from "../NotesCard";


export default function NotesHome({ note}) {
  if (!note) {
    return <div className="text-gray-500 dark:text-gray-400">Bir not seçin.</div>;
  }

  return    <NotesCard note={note} />

}
