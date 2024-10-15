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
    const [newGoal, setNewGoal] = useState({ name: '', target: '' });
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [currentGoalIndex, setCurrentGoalIndex] = useState(null);
    const [savingsAmount, setSavingsAmount] = useState('');
    const [selectedGoal, setSelectedGoal] = useState('');
    const [achievement, setAchievement] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const totalSavings = goals.reduce((acc, goal) => acc + goal.saved, 0);
        setTotalSavings(totalSavings);
        
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

    const openEditModal = (index) => {
        setCurrentGoalIndex(index);
        setNewGoal({ name: goals[index].name, target: goals[index].target });
        setEditModal(true);
    };

    const updateGoal = () => {
        editGoal(currentGoalIndex, newGoal.name, newGoal.target);
        setEditModal(false);
    };

    const handleAddGoal = () => {
        addGoal(newGoal.name, newGoal.target);
        setNewGoal({ name: '', target: '' });
        setShowModal(false);
    };

    const handleAddSavings = () => {
        const goalIndex = goals.findIndex(g => g.name === selectedGoal);
        if (goalIndex !== -1) {
            const updatedGoals = [...goals];
            updatedGoals[goalIndex].saved += Number(savingsAmount);
            setSavingsAmount('');
            setSelectedGoal('');
            setGoals(updatedGoals); 
        }
    };

    const totalSavings = goals.reduce((acc, goal) => acc + goal.saved, 0);

    const handlePopupClose = () => {
        setAchievement(null);
    };

    const handleViewAchievement= () => {
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

            <section className="add-savings">
                <h3>Add Savings</h3>
                <select onChange={(e) => setSelectedGoal(e.target.value)}>
                    <option value="">Select Goal</option>
                    {goals.map((goal) => (
                        <option key={goal.name} value={goal.name}>{goal.name}</option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Savings Amount"
                    value={savingsAmount}
                    onChange={(e) => setSavingsAmount(e.target.value)}
                />
                <button onClick={handleAddSavings}>Add Savings</button>
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
