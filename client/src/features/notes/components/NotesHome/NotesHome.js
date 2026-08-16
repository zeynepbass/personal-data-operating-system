import NotesCard from "../NotesCard";
import NotesModal from "../NotesModal";

export default function NotesHome({ note, open }) {
  if (!note) {
    return <div>Bir not seçin.</div>;
  }

  return (
    <>
      <NotesCard note={note} />
      {open && console.log("acıldı")}{" "}
    </>
  );
}
