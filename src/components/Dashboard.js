import React from 'react';
import '../css/Dashboard.css';
import { useGoals } from './GoalsContext';
import Balance from './Balance';
import RecentTransactions from './RecentTransactions';
import Goal from './Goal';
import ThemeToggle from './ThemeToggle';


const Dashboard = () => {
    const { goals } = useGoals();
    const transactions = [
        { date: '2024-10-01', description: 'Paycheck', amount: '+£500.00' },
        { date: '2024-10-03', description: 'Grocery', amount: '-£50.00' },
        { date: '2024-10-05', description: 'Snacks', amount: '-£20.00' },
    ];
    const totalBalance = 1234.56;

    return (
        <div className="dashboard">
            <header>
                <h1>CashCraft</h1>
                <h2>Take Charge of Your Finances</h2>
            </header>
            <ThemeToggle />

            <section className="overview">
                <Balance total={totalBalance} />
                <RecentTransactions transactions={transactions} />
            </section>

            <section className="goals">
                <h3>Your Financial Goals</h3>
                {goals.map((goal, index) => (
                    <Goal key={index} goal={goal} />
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
