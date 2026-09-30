"use client";

import { ChevronDown, ChevronRight, X } from "lucide-react";

export default function NotesMenu({
  note = [],
  openMenu,
  setOpenMenu,
  activeNote,
  setActiveNote,
  deletedNotes,
}) {
  return (
    <nav aria-label="Notlar" className="space-y-2">
      {note.map((item) => {
        const isOpen = openMenu === item.id;
        const panelId = `note-menu-${item.id}`;

        return (
          <div key={item.id}>
            <div className="flex justify-between">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenMenu(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 hover:bg-gray-100"
              >
                <span className="font-semibold">{item.category}</span>
                {isOpen ? (
                  <ChevronDown size={18} aria-hidden="true" />
                ) : (
                  <ChevronRight size={18} aria-hidden="true" />
                )}
              </button>
              <button
                type="button"
                aria-label={`"${item.title}" notunu sil`}
                onClick={() => {
                  if (!window.confirm(`"${item.title}" notu silinsin mi?`)) return;
                  deletedNotes(item.id);
                  setOpenMenu(null);
                }}
                className="rounded-lg px-2 py-2 text-[#7d78ce] hover:bg-gray-100"
              >
                <X size={15} aria-hidden="true" />
              </button>
            </div>
            {isOpen && (
              <div id={panelId} className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-3">
                <button
                  type="button"
                  aria-current={activeNote?.id === item.id ? "page" : undefined}
                  onClick={() => setActiveNote(item)}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm transition ${
                    activeNote?.id === item.id
                      ? "bg-violet-100 font-semibold text-violet-700"
                      : "text-slate-600 hover:bg-gray-100"
                  }`}
                >
                  {item.subCategory}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
