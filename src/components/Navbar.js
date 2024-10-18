import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { useAuth } from '../components/Auth/AuthContext'; 
import '../css/Navbar.css';

const Navbar = () => {
  const { theme } = useTheme();
  const { isAuthenticated, logout } = useAuth(); 
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  const handleLogout = () => {
    logout(); 
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
      <div className="logo">MoneyMate</div>
      <div className="hamburger" onClick={toggleMenu}>
        &#9776;
      </div>
      <ul className={isOpen ? 'active' : ''}>
        {isAuthenticated ? ( 
          <>
            <li><Link to="/dashboard" onClick={toggleMenu}>Dashboard</Link></li>
            <li><Link to="/budget" onClick={toggleMenu}>Budget</Link></li>
            <li><Link to="/goals" onClick={toggleMenu}>Goals</Link></li>
            <li><Link to="/quests" onClick={toggleMenu}>Quests</Link></li>
            <li><Link to="/achievements" onClick={toggleMenu}>Achievements</Link></li>
            <li><Link to="/finance-education" onClick={toggleMenu}>Finance Fun Zone!</Link></li>
            <li>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          </>
        ) : (
          <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
