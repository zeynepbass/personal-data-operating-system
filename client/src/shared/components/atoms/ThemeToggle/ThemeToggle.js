"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/shared/theme/ThemeProvider";

export function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Aydınlık moda geç" : "Karanlık moda geç"}
      title={isDark ? "Aydınlık mod" : "Karanlık mod"}
      className={`flex h-10 w-10 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-[rgb(125,120,206)] dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-[#8b87d9] ${className}`}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
