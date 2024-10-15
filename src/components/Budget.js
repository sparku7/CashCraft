import React, { useState } from 'react';
import '../css/Budget.css';

const BudgetManager = () => {
    const [income, setIncome] = useState(0);
    const [inputIncome, setInputIncome] = useState(''); // Temporary state for input income
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
        setInputIncome(''); // Clear the temporary input as well
    };

    const handleAddIncome = () => {
        setIncome(income + Number(inputIncome)); // Add new income to the current total
        setInputIncome(''); // Clear the input field after adding
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
                        value={inputIncome} // Use temporary state
                        onChange={(e) => setInputIncome(e.target.value)} // Update the temporary state
                        placeholder="Enter your income"
                    />
                    <div style={{ textAlign: 'center' }}>
                        <h3>Total Income: ${income}</h3>
                        <button onClick={handleAddIncome}>Add</button> {/* Call new function to add income */}
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
                    <br></br>
                    <br></br>
                    <button onClick={addSpend}>Add Spends</button>
                </div>
            </div>

            <div className="tables-section">
                <div className="table-container">
                    <h3>Needs</h3>
                    <table>
                        <tbody>
                            {spends.filter(spend => spend.category === 'needs').map((spend, index) => (
                                <tr key={index}>
                                    <td>{spend.description}</td>
                                    <td>${spend.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h4>Total: ${calculateTotal('needs')}</h4>
                    <h4>Percentage of Total Expenditure: {totalSpends > 0 ? ((calculateTotal('needs') / totalSpends) * 100).toFixed(2) : 0}%</h4>
                    <h1>Target: 50%</h1>
                </div>

                <div className="table-container">
                    <h3>Wants</h3>
                    <table>
                        <tbody>
                            {spends.filter(spend => spend.category === 'wants').map((spend, index) => (
                                <tr key={index}>
                                    <td>{spend.description}</td>
                                    <td>${spend.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h4>Total: ${calculateTotal('wants')}</h4>
                    <h4>Percentage of Total Expenditure: {totalSpends > 0 ? ((calculateTotal('wants') / totalSpends) * 100).toFixed(2) : 0}%</h4>
                    <h1>Target: 30%</h1>
                </div>

                <div className="table-container">
                    <h3>Savings</h3>
                    <table>
                        <tbody>
                            {spends.filter(spend => spend.category === 'savings').map((spend, index) => (
                                <tr key={index}>
                                    <td>{spend.description}</td>
                                    <td>${spend.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h4>Total: ${calculateTotal('savings')}</h4>
                    <h4>Percentage of Total Expenditure: {totalSpends > 0 ? ((calculateTotal('savings') / totalSpends) * 100).toFixed(2) : 0}%</h4>
                    <h1>Target: 20%</h1>
                </div>
            </div>
        </>
    );
};

export default BudgetManager;
