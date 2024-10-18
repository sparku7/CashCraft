import React, { createContext, useState, useContext, useEffect } from 'react';
import Snowfall from './Snowfall';
import BlockAnimation from './BlockAnimation';
import HeartAnimation from './HeartAnimation';
import PumpkinAnimation from './PumpkinAnimation';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'standard');
  const [animationActive, setAnimationActive] = useState(false); 

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    setAnimationActive(true); 
    setTimeout(() => setAnimationActive(false), 1000); 
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
      <Snowfall active={theme === 'christmas' && animationActive} />
      <BlockAnimation active={theme === 'minecraft' && animationActive} />
      <HeartAnimation active={theme === 'barbie' && animationActive} />
      <PumpkinAnimation active={theme === 'halloween' && animationActive} />
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
      '--progress-color': '#00ff00',
      '--quest-color': '#66bb6a', 
    },
    barbie: {
      '--font-family': "'Barbie'",
      '--background-color': '#FFC0CB',
      '--text-color': '#C71585',
      '--button-bg-color': '#FF69B4',
      '--button-hover-color': '#FF1493',
      '--modal-bg-color': '#FFF0F5',
      '--progress-color': '#ff69b4',
      '--quest-color': '#FF85C2', 
    },
    halloween: {
      '--font-family': "'Halloween'",
      '--background-color': '#121212',
      '--text-color': '#ff7518',
      '--button-bg-color': '#ff7518',
      '--button-hover-color': '#ff9800',
      '--modal-bg-color': '#333',
      '--progress-color': '#ff7518',
      '--quest-color': '#ff9f68', 
    },
    standard: {
      '--font-family': "'Arial', sans-serif",
      '--background-color': '#f5f5f5',
      '--text-color': '#333333',
      '--button-bg-color': '#007bff',
      '--button-hover-color': '#0056b3',
      '--modal-bg-color': '#ffffff',
      '--progress-color': '#28a745',
      '--quest-color': '#3399ff', 
    },
    christmas: {
      '--font-family': "'Christmas'",
      '--background-color': '#e0e0e0',
      '--text-color': '#a40000',
      '--button-bg-color': '#d32f2f',
      '--button-hover-color': '#ffcc00',
      '--modal-bg-color': '#f5f5dc',
      '--progress-color': '#3caf60',
      '--quest-color': '#e56b6b', 
    }
  };
  