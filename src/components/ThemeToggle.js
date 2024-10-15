import React from 'react';
import { useTheme } from './ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const handleChange = (event) => {
    const newTheme = event.target.value;
    toggleTheme(newTheme);
  };

  return (
    <div className="theme-toggle-container">
      <select
        className={`theme-select ${theme}`}
        value={theme}
        onChange={handleChange}
      >
        <option value="minecraft">Minecraft Theme</option>
        <option value="barbie">Barbie Theme</option>
        <option value="halloween">Halloween Mode</option>
      </select>
    </div>
  );
};

export default ThemeToggle;
