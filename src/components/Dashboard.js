import React from 'react';
import '../css/Dashboard.css';
import { useGoals } from './GoalsContext'; 

const Dashboard = () => {
  const { goals } = useGoals(); 

  return (
    <div className="dashboard">
      <header>
        <h1>CashCraft</h1>
        <h2>Take Charge of Your Finances</h2>
      </header>

      <section className="overview">
        <div className="balance">
          <h3>Total Balance</h3>
          <p>£1,234.56</p>
        </div>
        <div className="recent-transactions">
          <h3>Recent Transactions</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2024-10-01</td>
                <td>Paycheck</td>
                <td>+£500.00</td>
              </tr>
              <tr>
                <td>2024-10-03</td>
                <td>Grocery</td>
                <td>-£50.00</td>
              </tr>
              <tr>
                <td>2024-10-05</td>
                <td>Snacks</td>
                <td>-£20.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="goals">
        <h3>Your Financial Goals</h3>
        {goals.map((goal, index) => (
          <div className="goal" key={index}>
            <h4>{goal.name}</h4>
            <progress value={goal.saved} max={goal.target}></progress>
            <p>Goal: £{goal.target} | Current: £{goal.saved}</p>
          </div>
        ))}
      </section>

      <section className="tips">
        <h3>Financial Tips</h3>
        <p>Start saving by setting a budget for non-essential items!</p>
      </section>
        
    </div>
  );
};

export default Dashboard;
