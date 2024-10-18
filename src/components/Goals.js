import React, { useState, useEffect } from 'react';
import '../css/Goals.css';
import { useGoals } from './GoalsContext';
import { useSavings } from './SavingsContext'; 
import { useNavigate } from 'react-router-dom';
import GoalList from './GoalList';
import AddGoalModal from './AddGoalModal';
import EditGoalModal from './EditGoalModal';
import AchievementPopup from './AchievementPopup';
import axios from 'axios';

const Goals = () => {
    const { goals, setGoals } = useGoals();
    const { setTotalSavings } = useSavings(); 
    const [newGoal, setNewGoal] = useState({ name: '', target: '', savings: 0, enabled: true });
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [currentGoalIndex, setCurrentGoalIndex] = useState(null);
    const [achievement, setAchievement] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const totalSavings = goals.reduce((acc, goal) => acc + goal.saved, 0);
        setTotalSavings(totalSavings);

        // Achievement triggers
        if (totalSavings >= 10000 && !localStorage.getItem('achieved_10000')) {
            setAchievement('Congratulations! You have achieved: £10,000 Saved!');
            localStorage.setItem('achieved_10000', 'true');
        } else if (totalSavings >= 5000 && !localStorage.getItem('achieved_5000')) {
            setAchievement('Congratulations! You have achieved: £5,000 Saved!');
            localStorage.setItem('achieved_5000', 'true');
        } else if (totalSavings >= 1000 && !localStorage.getItem('achieved_1000')) {
            setAchievement('Congratulations! You have achieved: £1,000 Saved!');
            localStorage.setItem('achieved_1000', 'true');
        }
    }, [goals, setTotalSavings]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.username) {
            fetchGoals(user.username);
        }
    }, []);

    const fetchGoals = async (username) => {
        try {
            const response = await axios.get(`http://localhost:8083/goals/getAll?userName=${username}`);
            setGoals(response.data);
        } catch (error) {
            console.error('Failed to fetch goals:', error);
        }
    };
    
    const openEditModal = (index) => {
        setCurrentGoalIndex(index);
        const goal = goals[index];
        setNewGoal({ 
            name: goal.goalName, 
            target: goal.target,
            savings: goal.saved,
            enabled: goal.enabled
        });
        setEditModal(true);
    };
    
    const updateGoal = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const oldGoalName = goals[currentGoalIndex].goalName; 
        
        try {
            const response = await axios.put(`http://localhost:8083/goals/update`, null, {
                params: {
                    userName: user.username,
                    oldGoalName,
                    newGoalName: newGoal.name,
                    target: Number(newGoal.target),
                    saved: Number(newGoal.savings),
                    enabled: newGoal.enabled,
                }
            });
    
            console.log('Goal updated:', response.data);
            setGoals((prevGoals) => {
                const updatedGoals = [...prevGoals];
                updatedGoals[currentGoalIndex] = {
                    ...updatedGoals[currentGoalIndex],
                    goalName: newGoal.name,
                    target: Number(newGoal.target),
                    saved: Number(newGoal.savings),
                };
                return updatedGoals;
            });
        } catch (error) {
            console.error('Error updating goal:', error);
        } finally {
            setEditModal(false); 
        }
    };

    const handleAddGoal = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const goalData = {
            userName: user.username,
            goalName: newGoal.name,
            target: Number(newGoal.target),
            saved: 0,
            enabled: true,
        };

        try {
            const response = await fetch('http://localhost:8083/goals/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(goalData),
            });

            if (response.ok) {
                const addedGoal = await response.json();
                setGoals([...goals, addedGoal]);
                setNewGoal({ name: '', target: '' });
                setShowModal(false);
            } else {
                console.error('Failed to add goal:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding goal:', error);
        }
    };

    const handlePopupClose = () => {
        setAchievement(null);
    };

    const handleViewAchievement = () => {
        handlePopupClose();
        navigate('/achievements'); // This line will navigate to the achievements page
    };

    return (
        <div className="goals">
            <header>
                <h1>Your Savings Goals</h1>
                <p>Track your savings goals and achieve your financial dreams!</p>
            </header>

            <section className="goal-list">
                <h3>Goals</h3>
                <GoalList goals={goals} openEditModal={openEditModal} />
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
                handleViewAchievement={handleViewAchievement} // Pass this function down
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
