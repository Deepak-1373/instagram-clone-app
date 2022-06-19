const { createContext } = require("react");

const themeContext = createContext({ theme: "light" });

const themeProvider = ({ children }) => {
  return <themeContext.provider value={{}}>{children}</themeContext.provider>;
};
