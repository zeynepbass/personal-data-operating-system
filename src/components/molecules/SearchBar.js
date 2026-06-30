"use client";

import { Bell, Settings,Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="flex items-center justify-between w-full px-4 py-3 border-b border-gray-200 bg-[#FAFAFA]">
      

      <form className="flex-1 max-w-full relative">
  <Search
    size={18}
    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
  />

  <input
    type="text"
    placeholder="Ara..."
    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
</form>

      <div className="flex items-center gap-3 ml-4">

        <button className="p-2 rounded-lg hover:bg-gray-100 transition">
          <Bell size={20} />
        </button>


        <button className="p-2 rounded-lg hover:bg-gray-100 transition">
          <Settings size={20} />
        </button>



      </div>
    </div>
  );
}