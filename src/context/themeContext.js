const { createContext, useState, useEffect, useContext } = require("react");

const themeContext = createContext({ theme: "light" });

const themeProvider = ({ children }) => {
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
    <themeContext.provider value={{ theme, changeTheme }}>
      {children}
    </themeContext.provider>
  );
};

const useTheme = () => useContext(themeContext);
export { useTheme, themeProvider };
