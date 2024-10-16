import React, { useState, useEffect } from 'react';
import '../css/Goals.css';
import { useGoals } from './GoalsContext';
import { useSavings } from './SavingsContext';
import { useNavigate } from 'react-router-dom';
import GoalList from './GoalList';
import AddGoalModal from './AddGoalModal';
import EditGoalModal from './EditGoalModal';
import AchievementPopup from './AchievementPopup';

const Goals = () => {
    const { goals, addGoal, removeGoal, editGoal, setGoals } = useGoals();
    const { setTotalSavings } = useSavings(); 
    const [newGoal, setNewGoal] = useState({ name: '', target: '', savings: 0 });
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [currentGoalIndex, setCurrentGoalIndex] = useState(null);
    const [achievement, setAchievement] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const totalSavings = goals.reduce((acc, goal) => acc + goal.saved, 0);
        setTotalSavings(totalSavings);
    }, [goals, setTotalSavings]);

    const openEditModal = (index) => {
        setCurrentGoalIndex(index);
        const goal = goals[index];
        setNewGoal({ 
            name: goal.name, 
            target: goal.target, 
            savings: goal.saved // Set to goal.saved instead of 0
        });
        setEditModal(true);
    };

    const updateGoal = () => {
        if (currentGoalIndex !== null) {
            editGoal(currentGoalIndex, newGoal.name, newGoal.target, newGoal.savings); // Pass the updated savings
            setEditModal(false);
        }
    };

    const handleAddGoal = () => {
        addGoal(newGoal.name, newGoal.target);
        setNewGoal({ name: '', target: '', savings: 0 });
        setShowModal(false);
    };

    const totalSavings = goals.reduce((acc, goal) => acc + goal.savings, 0);

    const handlePopupClose = () => {
        setAchievement(null);
    };

    const handleViewAchievement = () => {
        handlePopupClose();
        navigate('/achievements');
    };

    return (
        <div className="goals">
            <header>
                <h1>Your Savings Goals</h1>
                <p>Track your savings goals and achieve your financial dreams!</p>
            </header>

            <section className="total-savings">
                <h3>Total Savings</h3>
                <p>£{totalSavings}</p>
            </section>

            <section className="goal-list">
                <h3>Goals</h3>
                <GoalList goals={goals} openEditModal={openEditModal} removeGoal={removeGoal} />
                <button onClick={() => setShowModal(true)}>Add New Goal</button>
            </section>

            <AddGoalModal 
                showModal={showModal} 
                setShowModal={setShowModal} 
                newGoal={newGoal} 
                setNewGoal={setNewGoal} 
                handleAddGoal={handleAddGoal} 
            />

            <EditGoalModal 
                editModal={editModal} 
                setEditModal={setEditModal} 
                newGoal={newGoal} 
                setNewGoal={setNewGoal} 
                updateGoal={updateGoal} 
            />

            <AchievementPopup 
                achievement={achievement} 
                handleViewAchievement={handleViewAchievement} 
                handlePopupClose={handlePopupClose} 
            />

            <section className="tips">
                <h3>Saving Tips</h3>
                <p>Stay motivated and save more with these tips...</p>
            </section>
        </div>
    );
};

export default Goals;
