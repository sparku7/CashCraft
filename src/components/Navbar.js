import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { useAuth } from '../components/Auth/AuthContext'; // Import useAuth
import '../css/Navbar.css';

const Navbar = () => {
  const { theme } = useTheme();
  const { logout } = useAuth(); // Get logout function
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleLogout = () => {
    logout(); 
    // Optionally redirect after logout
  };

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
        <li>
          <button onClick={handleLogout} style={{border: '2px solid black', }}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
