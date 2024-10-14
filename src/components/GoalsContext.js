import React, { createContext, useContext, useState, useEffect } from 'react';

const GoalsContext = createContext();

export const useGoals = () => {
    return useContext(GoalsContext);
};

export const GoalsProvider = ({ children }) => {
    const [goals, setGoals] = useState(() => {
        const savedGoals = JSON.parse(localStorage.getItem('savingsGoals'));
        return savedGoals || [
            { name: 'Save for a New Phone', target: 800, saved: 100 },
            { name: 'Vacation', target: 1500, saved: 100 },
            { name: 'Emergency Fund', target: 1000, saved: 100 },
        ];
    });

    useEffect(() => {
        localStorage.setItem('savingsGoals', JSON.stringify(goals));
    }, [goals]);

    const totalGoals = goals.length;
    const completedGoals = goals.filter(goal => goal.saved >= goal.target).length;

    const addGoal = (name, target) => {
        setGoals([...goals, { name, target, saved: 0 }]);
    };

    const editGoal = (index, name, target) => {
        setGoals((prevGoals) =>
            prevGoals.map((goal, i) =>
                i === index ? { ...goal, name, target: Number(target) } : goal
            )
        );
    };

    const removeGoal = (index) => {
        setGoals((prevGoals) => prevGoals.filter((_, i) => i !== index));
    };

    return (
        <GoalsContext.Provider 
            value={{ 
                goals, 
                setGoals, 
                totalGoals, 
                completedGoals, 
                addGoal, 
                editGoal, 
                removeGoal 
            }}>
            {children}
        </GoalsContext.Provider>
    );
};
