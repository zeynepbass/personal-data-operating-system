import { Pencil } from "lucide-react";

import NotesCard from "../NotesCard";

export default function NotesHome({ note, onEdit }) {
  if (!note) {
    return <p className="text-sm text-gray-500">Bir not seçin.</p>;
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#555A8A] transition hover:bg-gray-50"
        >
          <Pencil size={15} aria-hidden="true" />
          Notu düzenle
        </button>
      </div>
      <NotesCard note={note} />
    </div>
  );
}
