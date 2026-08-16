"use client";

import { ChevronDown, ChevronRight,X } from "lucide-react";

export default function NotesMenu({
  note = [],
  openMenu,
  setOpenMenu,
  activeNote,
  setActiveNote,
  deletedNotes
}) {
  return (
    <div className="space-y-2 ">
      {note.map((item) => {
        const isOpen = openMenu === item.id;

        return (
          <div key={item.id}>
            <div className="flex justif-between">
            <button
              onClick={() => {
                setOpenMenu(isOpen ? null : item.id);
              }}
              className="flex w-full items-center justify-between rounded-lg px-4 py-3 hover:bg-gray-100"
            >
           
              <span className="font-semibold">{item.category}</span>
              {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
            <button
                type="button"
                onClick={() => {

                  deletedNotes(item.id);

                  setOpenMenu(false);
                }}
                className=" items-center  px-2 py-2 text-left text-[#7d78ce] hover:bg-gray-100"
              >
                {" "}
                <X size={15} />
              </button>{" "}
              </div>
            {isOpen && (
              <div className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-3">
                <button
                  onClick={() => {
                    setActiveNote(item);
                  }}
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
    </div>
  );
}
