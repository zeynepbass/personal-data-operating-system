"use client";

import { Bell, Settings, Search } from "lucide-react";
 import Input from "@/shared/components/atoms/Input";
 import  Button  from "@/shared/components/atoms/Button";
export default function SearchBar() {
  return (
    <div className="flex items-center justify-between w-full px-4 py-3 border-b border-gray-200 bg-[#FAFAFA]">
      <form className="flex-1 max-w-full relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
        <Input
          type="text"
  
          placeholder="Ara..."
          className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-[#555A8A]"

        />
      </form>

      <div className="flex items-center ml-4">
        <Button text={<Bell size={20}/>} className="bg-transparent    hover:text-white" />

        <Button text={<Settings size={20} />} className="bg-transparent    hover:text-white" />
      </div>
    </div>
  );
}
