import React, { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Load theme preference from local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem("isDarkTheme");
    if (savedTheme !== null) {
      setIsDarkTheme(JSON.parse(savedTheme));
    } 
  }, []);

  // Toggle theme and save preference to local storage
  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem("isDarkTheme", JSON.stringify(newTheme));
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
