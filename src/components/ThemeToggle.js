import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'minecraft';
  });

  useEffect(() => {
   
    document.body.className = theme; 
    localStorage.setItem('theme', theme);
    

    const navbar = document.querySelector('.navbar');
    if (navbar) {
     
      navbar.classList.remove('minecraft', 'barbie', 'halloween');
    
      navbar.classList.add(theme);
    }
  }, [theme]);

  const handleChange = (event) => {
    setTheme(event.target.value); 
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
