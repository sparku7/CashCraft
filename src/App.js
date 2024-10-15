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
import { AuthProvider } from './components/Auth/AuthContext';

import ThemeToggle from './components/ThemeToggle';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import './css/Achievements.css';
import './css/Budget.css';
import './css/Dashboard.css';
import './css/Goals.css';
import './css/Navbar.css';
import './css/Quests.css';
import './app.css';

const App = () => {
  return (
    <AuthProvider>
      <SavingsProvider>
        <GoalsProvider>
          <ThemeProvider>
            <Router>
              <Navbar />
              <ThemeToggle />
              <Routes>
              <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/budget"
                  element={
                    <ProtectedRoute>
                      <Budget />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/goals"
                  element={
                    <ProtectedRoute>
                      <Goals />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/quests"
                  element={
                    <ProtectedRoute>
                      <Quest />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/achievements"
                  element={
                    <ProtectedRoute>
                      <AchievementsPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Router>
          </ThemeProvider>
        </GoalsProvider>
      </SavingsProvider>
    </AuthProvider>
  );
};

export default App;
