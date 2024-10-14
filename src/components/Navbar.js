import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className={`navbar ${isOpen ? 'open' : ''}`}>
            <div className="logo">CashCraft</div>
            <div className="hamburger" onClick={toggleMenu}>
                &#9776;
            </div>
            <ul className={isOpen ? 'active' : ''}>
                <li><Link to="/" onClick={toggleMenu}>Dashboard</Link></li>
                <li><Link to="/budget" onClick={toggleMenu}>Budget</Link></li>
                <li><Link to="/goals" onClick={toggleMenu}>Goals</Link></li>
                <li><Link to="/quests" onClick={toggleMenu}>Quests</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
