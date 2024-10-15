import React from 'react';
import '../css/Dashboard.css';
import { useGoals } from './GoalsContext';
import Balance from './Balance';
import RecentTransactions from './RecentTransactions';
import Goal from './Goal';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../components/Auth/AuthContext'; // Import useAuth
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Dashboard = () => {
    const { goals } = useGoals();
    const { logout } = useAuth(); // Get logout function
    const navigate = useNavigate(); // Use navigate for navigation

    const transactions = [
        { date: '2024-10-01', description: 'Paycheck', amount: '+£500.00' },
        { date: '2024-10-03', description: 'Grocery', amount: '-£50.00' },
        { date: '2024-10-05', description: 'Snacks', amount: '-£20.00' },
    ];
    const totalBalance = 1234.56;

    const handleLogout = () => {
        logout(); 
        navigate('/'); 
    };

    return (
        <div className="dashboard">
            <header>
                <h1>CashCraft</h1>
                <h2>Take Charge of Your Finances</h2>
                <button 
        style={{ 
            width: '100px',
            height: '40px',
            padding: '5px 10px', 
            margin: '10px' 
        }} onClick={handleLogout}>Logout</button> 
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
