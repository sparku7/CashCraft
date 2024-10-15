import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Budget from './components/Budget';
import Goals from './components/Goals';
import Quest from './components/Quests';
import Navbar from './components/Navbar';
import AchievementsPage from './components/AchievementsPage';
import { GoalsProvider } from './components/GoalsContext';
import { SavingsProvider } from './components/SavingsContext';
import { ThemeProvider } from './components/ThemeContext';
import './app.css';
import ThemeToggle from './components/ThemeToggle';

const App = () => {
  return (
    <SavingsProvider>
      <GoalsProvider>
        <ThemeProvider>
          <Router>
            <Navbar />
            <ThemeToggle />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/quests" element={<Quest />} />
              <Route path="/achievements" element={<AchievementsPage />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </GoalsProvider>
    </SavingsProvider>
  );
};

export default App;
