import React, { createContext, useState, useEffect, useContext } from "react";

const themeContext = createContext({ theme: "light" });

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setTheme(localStorage.getItem("theme") ?? "light");
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <themeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </themeContext.Provider>
  );
};

const useTheme = () => useContext(themeContext);
export { useTheme, ThemeProvider };
