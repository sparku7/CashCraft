// Goals.js
import React from 'react';
import { useGoals } from './GoalsContext'; 
import '../css/Goals.css'; 

const Goals = () => {
  const { goals, totalGoals, completedGoals, addGoal } = useGoals();

  return (
    <div className="goals">
      <header>
        <h1>Your Financial Goals</h1>
        <p>Set your sights on the future and make it happen!</p>
      </header>

      <section className="goal-overview">
        <h3>Goals Overview</h3>
        <p>{completedGoals} of {totalGoals} goals completed!</p>
      </section>

      <section className="goal-list">
        <h3>Your Goals</h3>
        <ul>
          {goals.map((goal, index) => (
            <li key={index}>
              <h4>{goal.name}</h4>
              <progress value={goal.saved} max={goal.target}></progress>
              <p>Target: £{goal.target} | Saved: £{goal.saved}</p>
            </li>
          ))}
        </ul>    
        <button onClick={() => addGoal('New Goal', 500)}>Add New Goal</button>
      </section>

      <section className="tips">
        <h3>Goal Achievement Tips</h3>
        <p>Stay consistent with your savings to reach your goals faster!</p>
      </section>
    </div>
  );
};

export default Goals;
