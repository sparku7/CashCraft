import React, { useEffect } from 'react';

const EditGoalModal = ({ editModal, setEditModal, newGoal, setNewGoal, updateGoal }) => {
    useEffect(() => {
        if (editModal) {
            setNewGoal((prev) => ({
                ...prev,
                name: prev.name || "",
                target: prev.target || "",
                savings: prev.savings || "",  
            }));
        }
    }, [editModal, setNewGoal]); 

    if (!editModal) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={() => setEditModal(false)}>&times;</span>
                <h2>Edit Goal</h2>

                <span>Goal Name</span>
                <br /><br />
                <input
                    type="text"
                    placeholder="Goal Name"
                    value={newGoal.name}
                    onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                />
                <br /><br />

                <span>Target</span>
                <br /><br />
                <input
                    type="number"
                    placeholder="Target Amount"
                    value={newGoal.target === "" ? "" : newGoal.target}  
                    onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value === "" ? "" : Number(e.target.value) })}
                    className="modal-input"
                />
                <br /><br />

                <span>Amount Saved</span>
                <br /><br />
                <input
                    type="number"
                    placeholder="Savings Amount"
                    value={newGoal.savings === "" ? "" : newGoal.savings} 
                    onChange={(e) => setNewGoal({ ...newGoal, savings: e.target.value === "" ? "" : Number(e.target.value) })}
                    className="modal-input"
                />
                <br /><br />

                <button onClick={updateGoal}>Update Goal</button>
            </div>
        </div>
    );
};

export default EditGoalModal;
