import React, { useState, useEffect } from 'react';
import '../css/Goals.css'; 
import { useGoals } from './GoalsContext'; // Import your context

const Goals = () => {
  const { goals, addGoal, removeGoal, editGoal } = useGoals(); // Get functions from context
  const [newGoal, setNewGoal] = useState({ name: '', target: '' });
  const [showModal, setShowModal] = useState(false); 
  const [editModal, setEditModal] = useState(false); 
  const [currentGoalIndex, setCurrentGoalIndex] = useState(null); 
  const [savingsAmount, setSavingsAmount] = useState(''); // New state for savings amount

  const openEditModal = (index) => {
    setCurrentGoalIndex(index);
    setNewGoal({ name: goals[index].name, target: goals[index].target });
    setEditModal(true);
  };

  const updateGoal = () => {
    editGoal(currentGoalIndex, newGoal.name, newGoal.target); // Pass index to editGoal
    setEditModal(false);
  };

  const handleAddGoal = () => {
    addGoal(newGoal.name, newGoal.target);
    setNewGoal({ name: '', target: '' });
    setShowModal(false);
  };

  const handleAddSavings = (goalName) => {
    const goal = goals.find(g => g.name === goalName);
    if (goal) {
      goal.saved += Number(savingsAmount); // Update saved amount
    }
    setSavingsAmount(''); // Reset savings amount
  };

  return (
    <div className="goals">
      <header>
        <h1>Your Savings Goals</h1>
        <p>Track your savings goals and achieve your financial dreams!</p>
      </header>

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
        <select onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}>
          <option value="">Select Goal</option>
          {goals.map((goal) => (
            <option key={goal.name} value={goal.name}>{goal.name}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Savings Amount"
          value={savingsAmount} // Use new savings amount state
          onChange={(e) => setSavingsAmount(e.target.value)} // Update savings amount state
        />
        <button onClick={() => handleAddSavings(newGoal.name)}>Add Savings</button> {/* Call handleAddSavings */}
      </section>

      {/* Modal for Adding New Goal */}
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

      {/* Modal for Editing Goal */}
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

      {/* Tips Box */}
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
