import React from 'react';

const EditGoalModal = ({ editModal, setEditModal, newGoal, setNewGoal, updateGoal }) => {
    if (!editModal) return null;

    return (
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
                <input
                    type="number"
                    placeholder="Savings Amount"
                    value={newGoal.savings}
                    onChange={(e) => setNewGoal({ ...newGoal, savings: Number(e.target.value) })} // Convert to number
                    className="modal-input"
                />
                <button onClick={updateGoal}>Update Goal</button>
            </div>
        </div>
    );
};

export default EditGoalModal;
