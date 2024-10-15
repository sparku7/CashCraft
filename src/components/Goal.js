import React from 'react';

const Goal = ({ goal }) => {
    return (
        <div className="goal">
            <h4>{goal.name}</h4>
            <progress value={goal.saved} max={goal.target}></progress>
            <p>Goal: £{goal.target} | Current: £{goal.saved}</p>
        </div>
    );
};

export default Goal;
