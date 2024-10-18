import React, { useEffect, useState } from 'react';
import '../css/Dashboard.css';
import { useGoals } from './GoalsContext';
import Balance from './Balance';
import RecentTransactions from './RecentTransactions';
import Goal from './Goal';
import ThemeToggle from './ThemeToggle';
import TipToast from './TipToast'; 

const Dashboard = () => {
    const { goals } = useGoals();

    const transactions = [
        { date: '2024-10-01', description: 'Salary', amount: '+£500.00' },
        { date: '2024-10-03', description: 'Tesco', amount: '-£50.00' },
        { date: '2024-10-05', description: 'Munchies', amount: '-£20.00' },
        { date: '2024-10-05', description: 'Maccy Ds', amount: '-£10.00' },
    ];
    const totalBalance = 1234.56;

    const [showTipToast, setShowTipToast] = useState(false);
    const [tip, setTip] = useState('');

    useEffect(() => {
        const hasSeenTip = localStorage.getItem('hasSeenTip');

        if (!hasSeenTip) {
            const tips = [
                "Start saving by setting a budget for non-essential items!",
                "Track your expenses daily to stay within your budget.",
                "Automate your savings for hassle-free saving.",
                "Use cash for discretionary spending to limit expenses.",
                "Review your subscriptions and cut unnecessary ones.",
                "Plan meals ahead to avoid impulse buying at the store.",
                "Set realistic financial goals and track your progress.",
                "Avoid impulse purchases by waiting 24 hours before buying.",
                "Consider a side hustle to boost your income.",
                "Learn about investing to make your money work for you."
            ];

            const randomTip = tips[Math.floor(Math.random() * tips.length)];
            setTip(randomTip);
            setShowTipToast(true);
            localStorage.setItem('hasSeenTip', 'true');
        }
    }, []);

    const closeTipToast = () => {
        setShowTipToast(false);
    };

    return (
        <div className="dashboard">
            <header>
                <h1>MoneyMate</h1>
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

            {showTipToast && <TipToast tip={tip} onClose={closeTipToast} />} {/* Update this line */}
        </div>
    );
};

export default Dashboard;
