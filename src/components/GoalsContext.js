import React, { createContext, useContext, useState } from 'react';

const GoalsContext = createContext();

export const useGoals = () => {
  return useContext(GoalsContext);
};

export const GoalsProvider = ({ children }) => {
  const [goals, setGoals] = useState([
    { name: 'Save for a New Phone', target: 800, saved: 400 },
    { name: 'Vacation', target: 1500, saved: 600 }, 
    { name: 'Emergency Fund', target: 1000, saved: 300 }, 
  ]);

  const totalGoals = goals.length;
  const completedGoals = goals.filter(goal => goal.saved >= goal.target).length;

  const addGoal = (name, target) => {
    setGoals([...goals, { name, target, saved: 0 }]);
  };

  return (
    <GoalsContext.Provider value={{ goals, totalGoals, completedGoals, addGoal }}>
      {children}
    </GoalsContext.Provider>
  );
};
