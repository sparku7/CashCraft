import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'minecraft');

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
    const root = document.documentElement;
    const themeVariables = themes[theme];
    for (const [key, value] of Object.entries(themeVariables)) {
      root.style.setProperty(key, value);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

const themes = {
  minecraft: {
    '--font-family': "'MinecraftRegular'",
    '--background-color': '#f9f9f9',
    '--text-color': '#333',
    '--button-bg-color': '#4caf50',
    '--button-hover-color': '#45a049',
    '--modal-bg-color': 'white',
  },
  barbie: {
    '--font-family': "'Arial', sans-serif",
    '--background-color': '#FFC0CB',
    '--text-color': '#C71585',
    '--button-bg-color': '#FF69B4',
    '--button-hover-color': '#FF1493',
    '--modal-bg-color': '#FFF0F5',
  },
  halloween: {
    '--font-family': "'MinecraftRegular'",
    '--background-color': '#121212',
    '--text-color': '#ff7518',
    '--button-bg-color': '#ff7518',
    '--button-hover-color': '#ff9800',
    '--modal-bg-color': '#333',
  }
};
