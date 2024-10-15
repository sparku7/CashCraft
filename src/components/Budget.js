import React, { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../css/Budget.css';

const BudgetManager = () => {
    const [income, setIncome] = useState(0);
    const [inputIncome, setInputIncome] = useState('');
    const [spends, setSpends] = useState([]);
    const [spendAmount, setSpendAmount] = useState('');
    const [spendCategory, setSpendCategory] = useState('needs');
    const [spendDescription, setSpendDescription] = useState('');

    const addSpend = () => {
        if (spendAmount) {
            setSpends([...spends, { description: spendDescription, amount: Number(spendAmount), category: spendCategory }]);
            setSpendAmount('');
            setSpendDescription('');
        }
    };

    const calculateTotal = (category) => {
        return spends
            .filter(spend => spend.category === category)
            .reduce((total, spend) => total + spend.amount, 0);
    };

    const totalSpends = spends.reduce((total, spend) => total + spend.amount, 0);

    const clearIncome = () => {
        setIncome(0);
        setInputIncome('');
    };

    const handleAddIncome = () => {
        setIncome(income + Number(inputIncome));
        setInputIncome('');
    };

    const getPercentage = (category, target) => {
        const total = calculateTotal(category);
        return Math.min((total / (totalSpends || 1)) * 100, target); // Cap at target percentage
    };

    return (
        <>
            <h1 className="budget-title">Budget Manager</h1>
            <p className="budget-description">
                The 50/30/20 budget rule is a simple guideline for managing your finances.
                It suggests that 50% of your income should go to needs (essentials),
                30% to wants (non-essentials), and 20% to savings or debt repayment.
                This framework helps you allocate your resources effectively for
                a balanced financial life.
            </p>

            <div className="budget-manager">
                <div className="income-section">
                    <h2>Enter Income</h2>
                    <input
                        type="number"
                        value={inputIncome}
                        onChange={(e) => setInputIncome(e.target.value)}
                        placeholder="Enter your income"
                    />
                    <div style={{ textAlign: 'center' }}>
                        <h3>Total Income: ${income}</h3>
                        <button onClick={handleAddIncome}>Add</button>
                        <button onClick={clearIncome}>Clear</button>
                    </div>
                </div>

                <div className="spend-section">
                    <h2>Spends</h2>
                    <input
                        type="text"
                        value={spendDescription}
                        onChange={(e) => setSpendDescription(e.target.value)}
                        placeholder="Enter spend description"
                    />
                    <input
                        type="number"
                        value={spendAmount}
                        onChange={(e) => setSpendAmount(e.target.value)}
                        placeholder="Enter spend amount"
                    />
                    <select value={spendCategory} onChange={(e) => setSpendCategory(e.target.value)}>
                        <option value="needs">Needs</option>
                        <option value="wants">Wants</option>
                        <option value="savings">Savings</option>
                    </select>
                    <br />
                    <button onClick={addSpend}>Add Spends</button>
                </div>
            </div>

            <div className="tables-section">
                <div className="table-container">
                    <h3>Needs</h3>
                    <CircularProgressbar value={getPercentage('needs', 50)} text={`${getPercentage('needs', 50).toFixed(0)}%`} />
                    <h4>Total: ${calculateTotal('needs')}</h4>
                    <h4>Target: 50%</h4>
                </div>

                <div className="table-container">
                    <h3>Wants</h3>
                    <CircularProgressbar value={getPercentage('wants', 30)} text={`${getPercentage('wants', 30).toFixed(0)}%`} />
                    <h4>Total: ${calculateTotal('wants')}</h4>
                    <h4>Target: 30%</h4>
                </div>

                <div className="table-container">
                    <h3>Savings</h3>
                    <CircularProgressbar value={getPercentage('savings', 20)} text={`${getPercentage('savings', 20).toFixed(0)}%`} />
                    <h4>Total: ${calculateTotal('savings')}</h4>
                    <h4>Target: 20%</h4>
                </div>
            </div>
        </>
    );
};

export default BudgetManager;
