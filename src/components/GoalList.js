import React from 'react';

const GoalList = ({ goals, openEditModal, removeGoal }) => {
    return (
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
    );
};

export default GoalList;
