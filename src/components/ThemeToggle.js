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
        <option value="standard">Standard</option>
        <option value="minecraft">Minecraft</option>
        <option value="barbie">Barbie</option>
        <option value="halloween">Halloween</option>
        <option value="christmas">Christmas</option>
      </select>
    </div>
  );
};

export default ThemeToggle;
