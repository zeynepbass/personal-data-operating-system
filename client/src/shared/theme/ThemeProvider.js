"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

const STORAGE_KEY = "pdos_theme";

function applyThemeClass(theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("light");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initial =
      stored ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    setThemeState(initial);
    applyThemeClass(initial);
  }, []);

  const setTheme = (nextTheme) => {
    setThemeState(nextTheme);
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    applyThemeClass(nextTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
