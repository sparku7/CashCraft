import React, { useEffect, useState } from 'react';
import '../css/Dashboard.css';
import { useGoals } from './GoalsContext';
import Balance from './Balance';
import RecentTransactions from './RecentTransactions';
import Goal from './Goal';
import ThemeToggle from './ThemeToggle';
import TipModal from './TipModal';

const Dashboard = () => {
    const { goals } = useGoals();

    const transactions = [
        { date: '2024-10-01', description: 'Paycheck', amount: '+£500.00' },
        { date: '2024-10-03', description: 'Grocery', amount: '-£50.00' },
        { date: '2024-10-05', description: 'Snacks', amount: '-£20.00' },
    ];
    const totalBalance = 1234.56;

    const [showTipModal, setShowTipModal] = useState(false);
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
            setShowTipModal(true);
            localStorage.setItem('hasSeenTip', 'true');
        }
    }, []);

    const closeTipModal = () => {
        setShowTipModal(false);
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

            {showTipModal && <TipModal tip={tip} onClose={closeTipModal} />}
        </div>
    );
};

export default Dashboard;
