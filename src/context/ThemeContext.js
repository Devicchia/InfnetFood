import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  const theme = {
    background: dark ? "#0f172a" : "#f1f5f9",
    card: dark ? "#1e293b" : "#ffffff",
    text: dark ? "#f8fafc" : "#0f172a",
    primary: "#22c55e",
  };

  function toggleTheme() {
    setDark(!dark);
  }

  return (
    <ThemeContext.Provider value={{ theme, dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}