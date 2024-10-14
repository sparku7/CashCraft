import React, { useState, useEffect } from 'react';
import '../css/Goals.css';
import { useGoals } from './GoalsContext';
import { useSavings } from './SavingsContext';

const Goals = () => {
    const { goals, addGoal, removeGoal, editGoal, setGoals } = useGoals();
    const { setTotalSavings } = useSavings(); 
    const [newGoal, setNewGoal] = useState({ name: '', target: '' });
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [currentGoalIndex, setCurrentGoalIndex] = useState(null);
    const [savingsAmount, setSavingsAmount] = useState('');
    const [selectedGoal, setSelectedGoal] = useState('');

    useEffect(() => {
     
        const totalSavings = goals.reduce((acc, goal) => acc + goal.saved, 0);
        setTotalSavings(totalSavings);
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
                <ul>
                    {goals.map((goal, index) => (
                        <li key={index}>
                            <h4>{goal.name}</h4>
                            <progress value={goal.saved} max={goal.target}></progress>
                            <p>Target: £{goal.target} | Saved: £{goal.saved}</p>
                            <button onClick={() => openEditModal(index)}>Edit</button>
                            <button className="remove-button" onClick={() => removeGoal(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
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

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <h2>Add New Goal</h2>
                        <input
                            type="text"
                            placeholder="Goal Name"
                            value={newGoal.name}
                            onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                            className="modal-input"
                        />
                        <input
                            type="number"
                            placeholder="Target Amount"
                            value={newGoal.target}
                            onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                            className="modal-input"
                        />
                        <button onClick={handleAddGoal}>Add Goal</button>
                    </div>
                </div>
            )}

            {editModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setEditModal(false)}>&times;</span>
                        <h2>Edit Goal</h2>
                        <input
                            type="text"
                            placeholder="Goal Name"
                            value={newGoal.name}
                            onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                            className="modal-input"
                        />
                        <input
                            type="number"
                            placeholder="Target Amount"
                            value={newGoal.target}
                            onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                            className="modal-input"
                        />
                        <button onClick={updateGoal}>Update Goal</button>
                    </div>
                </div>
            )}

            <section className="tips">
                <h3>Saving Tips</h3>
                <p>1. Set realistic goals and track your progress.</p>
                <p>2. Automate your savings to make it easier.</p>
                <p>3. Review your goals regularly and adjust as needed.</p>
                <p>4. Celebrate milestones to stay motivated!</p>
            </section>
        </div>
    );
};

export default Goals;
