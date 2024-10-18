import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const GoalsContext = createContext();

export const useGoals = () => {
    return useContext(GoalsContext);
};

export const GoalsProvider = ({ children }) => {
    const [goals, setGoals] = useState(() => {
        const savedGoals = JSON.parse(localStorage.getItem('savingsGoals'));
        return savedGoals || [
        
        ];
    });

    const [currentGoalIndex, setCurrentGoalIndex] = useState(null); 
    const [newGoal, setNewGoal] = useState({ name: '', target: '' });
    const [editModal, setEditModal] = useState(false);

    useEffect(() => {
        localStorage.setItem('savingsGoals', JSON.stringify(goals));
    }, [goals]);

    const totalGoals = goals.length;
    const completedGoals = goals.filter(goal => goal.saved >= goal.target).length;

    const addGoal = async (userName, name, target) => {
        const newGoal = { userName, goalName: name, target, saved: 0, enabled: true };

        try {
            const response = await fetch('http://localhost:8083/goals/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newGoal),
            });

            if (!response.ok) {
                throw new Error('Failed to add goal');
            }

            const addedGoal = await response.json();
            setGoals((prevGoals) => [...prevGoals, addedGoal]);
        } catch (error) {
            console.error(error);
        }
    };

    const editGoal = (index) => {
        setCurrentGoalIndex(index);
        setNewGoal({ name: goals[index].name, target: goals[index].target });
        setEditModal(true); 
    };

    const updateGoal = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const goalToUpdate = goals[currentGoalIndex]; 
    
        const updatedGoalData = {
            userName: user.username, 
            oldGoalName: goalToUpdate.name, 
            newGoalName: newGoal.name,
            target: Number(newGoal.target), 
            enabled: true, 
            categoryId: goalToUpdate.categoryId 
        };
    
        try {
            const response = await axios.put(`http://localhost:8083/goals/update/${goalToUpdate.categoryId}`, null, {
                params: updatedGoalData,
            });
    
            if (response.status === 200) {
                const updatedGoal = response.data;
                setGoals((prevGoals) =>
                    prevGoals.map((goal, index) =>
                        index === currentGoalIndex ? updatedGoal : goal
                    )
                );
                setNewGoal({ name: '', target: '' }); 
                setEditModal(false); 
            } else {
                console.error('Failed to update goal:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating goal:', error);
        }
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
                updateGoal, 
                removeGoal,
                newGoal, 
                setNewGoal,
                editModal, 
                setEditModal 
            }}>
            {children}
        </GoalsContext.Provider>
    );
};
