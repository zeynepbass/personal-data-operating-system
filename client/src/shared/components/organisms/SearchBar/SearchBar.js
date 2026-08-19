"use client";

import { Bell, Settings, Search } from "lucide-react";
import {
  Button,
  Input,
  ThemeToggle
} from "@/shared/components/atoms";
export function SearchBar() {
  return (
    <div className="flex items-center justify-between w-full px-4 py-3 bg-white dark:bg-[#1a1a22] border-b border-gray-100 dark:border-white/10 transition-colors">
      <form className="flex-1 max-w-md relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
        />
        <Input
          type="text"

          placeholder="Ara..."
          className="w-full pl-10 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-[#555A8A]"

        />
      </form>

      <div className="flex items-center gap-1 ml-4">
        <ThemeToggle />

        <Button
          variant="ghost"
          text={<Bell size={20}/>}
          className="text-gray-500 dark:text-gray-400 hover:text-[rgb(125,120,206)] dark:hover:text-[#8b87d9]"
        />

        <Button
          variant="ghost"
          text={<Settings size={20} />}
          className="text-gray-500 dark:text-gray-400 hover:text-[rgb(125,120,206)] dark:hover:text-[#8b87d9]"
        />
      </div>
    </div>
  );
}
