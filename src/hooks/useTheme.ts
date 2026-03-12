import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  const saved = localStorage.getItem("theme") as Theme | null;
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(mode: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(mode);
  localStorage.setItem("theme", mode);
}

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const setThemeMode = useCallback((mode: Theme) => {
    setTheme(mode);
  }, []);

  return { theme, toggleTheme, setTheme: setThemeMode };
};
