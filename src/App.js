import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Budget from './components/Budget';
import Goals from './components/Goals';
import Quest from './components/Quests';
import Navbar from './components/Navbar';
import RewardsPage from './components/Rewards';
import { GoalsProvider } from './components/GoalsContext'; // Import the GoalsProvider


const App = () => {
  return (
    <GoalsProvider> {/* Wrap your application with the GoalsProvider */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/quests" element={<Quest />} />
          <Route path="/rewards" element={<RewardsPage />} />
        </Routes>
      </Router>
    </GoalsProvider>
  );
};

export default App;
