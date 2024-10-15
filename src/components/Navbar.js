import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import '../css/Navbar.css';

const Navbar = () => {
  const { theme } = useTheme();
  console.log("Current theme in Navbar:", theme);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${theme}`}>
      <div className="logo">CashCraft</div>
      <div className="hamburger" onClick={toggleMenu}>
        &#9776;
      </div>
      <ul className={isOpen ? 'active' : ''}>
        <li><Link to="/" onClick={toggleMenu}>Dashboard</Link></li>
        <li><Link to="/budget" onClick={toggleMenu}>Budget</Link></li>
        <li><Link to="/goals" onClick={toggleMenu}>Goals</Link></li>
        <li><Link to="/quests" onClick={toggleMenu}>Quests</Link></li>
        <li><Link to="/achievements" onClick={toggleMenu}>Achievements</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
