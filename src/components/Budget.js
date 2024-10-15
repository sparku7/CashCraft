import React, { useState } from 'react';
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

    const getPercentage = (category) => {
        const targetPercentage = category === 'needs' ? 0.5 : category === 'wants' ? 0.3 : 0.2; // 50%, 30%, 20%
        const totalCategoryExpenditure = calculateTotal(category);
        const effectiveIncome = income * targetPercentage;

        if (effectiveIncome === 0) return 0; // Avoid division by zero
        const percentage = (totalCategoryExpenditure / effectiveIncome) * 100;

        return percentage > 100 ? 100 : percentage; // Cap at 100%
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
                    <br />
                    <button onClick={addSpend}>Add Spends</button>
                </div>
            </div>
            <div className="tables-section">
                {['needs', 'wants', 'savings'].map(category => (
                    <div className="table-container" key={category}>
                        <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                        <table>
                            <tbody>
                                {spends.filter(spend => spend.category === category).map((spend, index) => (
                                    <tr key={index}>
                                        <td>{spend.description}</td>
                                        <td>${spend.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <h4>Total: ${calculateTotal(category)}</h4>
                        <h4>Percentage of Target Expenditure: {getPercentage(category).toFixed(2)}%</h4>
                        <h1>Target: {category === 'needs' ? '50%' : category === 'wants' ? '30%' : '20%'}</h1>
                        <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '5px' }}>
                            <div
                                style={{
                                    height: '20px',
                                    width: `${getPercentage(category).toFixed(2)}%`,
                                    backgroundColor: category === 'needs' ? '#4caf50' : category === 'wants' ? '#2196f3' : '#ff9800',
                                    borderRadius: '5px'
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default BudgetManager;
