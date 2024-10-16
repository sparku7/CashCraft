import React from 'react';
import { useGoals } from './GoalsContext';
import Goal from './Goal';

const GoalList = ({ openEditModal }) => {
    const { goals, removeGoal } = useGoals();

    return (
        <ul>
            {goals.map((goal, index) => (
                <li key={index}>
                    <Goal goal={goal} /> 
                    <button onClick={() => openEditModal(index)}>Edit</button>
                    <button className="remove-button" onClick={() => removeGoal(index)}>Remove</button>
                </li>
            ))}
        </ul>
    );
};

export default GoalList;
