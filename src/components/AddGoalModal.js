import React from 'react';

const AddGoalModal = ({ showModal, setShowModal, newGoal, setNewGoal, handleAddGoal }) => {
    if (!showModal) return null;

    return (
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
    );
};

export default AddGoalModal;
