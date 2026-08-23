"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const storageKey = "academic-theme";

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const syncTheme = () => {
      const stored = window.localStorage.getItem(storageKey);
      const nextTheme: Theme =
        stored === "light" || stored === "dark"
          ? stored
          : media.matches
            ? "dark"
            : "light";

      applyTheme(nextTheme);
      setTheme(nextTheme);
    };

    syncTheme();
    media.addEventListener("change", syncTheme);

    return () => media.removeEventListener("change", syncTheme);
  }, []);

  const nextTheme: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
      onClick={() => {
        window.localStorage.setItem(storageKey, nextTheme);
        applyTheme(nextTheme);
        setTheme(nextTheme);
      }}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {theme === "dark" ? "☾" : "☀"}
      </span>
      <span className="theme-toggle-label">{theme === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}
