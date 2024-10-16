import React, { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../css/Budget.css';
import { useTheme } from './ThemeContext'

const BudgetManager = () => {
    const [income, setIncome] = useState(0);
    const [inputIncome, setInputIncome] = useState('');
    const [spends, setSpends] = useState([]);
    const [spendAmount, setSpendAmount] = useState('');
    const [spendCategory, setSpendCategory] = useState('needs');
    const [spendDescription, setSpendDescription] = useState('');


    const addSpend = () => {
        if (spendAmount) {
            const newSpend = {
                id: Math.random().toString(36).substr(2, 9), 
                description: spendDescription,
                amount: Number(spendAmount),
                category: spendCategory
            };
            setSpends([...spends, newSpend]);
            setSpendAmount('');
            setSpendDescription('');
        }
    };


    const removeSpend = (id) => {
        const newSpends = spends.filter(spend => spend.id !== id);
        setSpends(newSpends);
    };



    const calculateTotal = (category) => {
        return spends
            .filter(spend => spend.category === category)
            .reduce((total, spend) => total + spend.amount, 0);
    };

    const totalSpends = spends.reduce((total, spend) => total + spend.amount, 0);

    const totalIncomeAfterSpends = income - totalSpends;


    const clearIncome = () => {
        setIncome(0);
        setInputIncome('');
    };


    const handleAddIncome = () => {
        setIncome(income + Number(inputIncome));
        setInputIncome('');
    };


    const getPercentage = (category) => {
        const total = calculateTotal(category);
        return (total / (totalSpends || 1)) * 100;
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
                        <h3>Total Income After Spends: ${totalIncomeAfterSpends}</h3>

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
                    <br></br>
                    <button onClick={addSpend}>Add Spend</button>
                </div>
            </div>


            <div className="progress-section">
                <div className="progress-container">
                    <h3>Needs</h3>
                    <CircularProgressbar
                        value={getPercentage('needs')}
                        text={`${getPercentage('needs').toFixed(0)}%`}
                        styles={{
                            path: {
                              stroke: `var(--progress-color)`, 
                            },
                            text: {
                              fill: `var(--progress-color)`,
                            },
                          }}
                    />
                    <h4>Total: ${calculateTotal('needs')}</h4>
                    <h4>Target: 50%</h4>
                </div>

                <div className="progress-container">
                    <h3>Wants</h3>
                    <CircularProgressbar
                        value={getPercentage('wants')}
                        text={`${getPercentage('wants').toFixed(0)}%`}
                        styles={{
                            path: {
                              stroke: `var(--progress-color)`,
                            },
                            text: {
                              fill: `var(--progress-color)`, 
                            },
                          }}
                    />
                    
                    <h4>Total: ${calculateTotal('wants')}</h4>
                    <h4>Target: 30%</h4>
                </div>

                <div className="progress-container">
                    <h3>Savings</h3>
                    <CircularProgressbar
                        value={getPercentage('savings')}
                        text={`${getPercentage('savings').toFixed(0)}%`}
                        styles={{
                            path: {
                              stroke: `var(--progress-color)`, 
                            },
                            text: {
                              fill: `var(--progress-color)`,
                            },
                          }}
                    />
                    <h4>Total: ${calculateTotal('savings')}</h4>
                    <h4>Target: 20%</h4>
                </div>
            </div>

   
            <div className="tables-section">
                <div className="table-container">
                    <h3>Needs</h3>
                    <table className="budget-table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Amount</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {spends.filter(spend => spend.category === 'needs').map(spend => (
                                <tr key={spend.id}>
                                    <td>{spend.description}</td>
                                    <td>${spend.amount}</td>
                                    <td>
                                        <button onClick={() => removeSpend(spend.id)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                        <tfoot>
                            <tr>
                                <td><strong>Total:</strong></td>
                                <td><strong>${calculateTotal('needs')}</strong></td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div className="table-container">
                    <h3>Wants</h3>
                    <table className="budget-table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Amount</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {spends.filter(spend => spend.category === 'wants').map(spend => (
                                <tr key={spend.id}>
                                    <td>{spend.description}</td>
                                    <td>${spend.amount}</td>
                                    <td>
                                        <button onClick={() => removeSpend(spend.id)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                        <tfoot>
                            <tr>
                                <td><strong>Total:</strong></td>
                                <td><strong>${calculateTotal('wants')}</strong></td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div className="table-container">
                    <h3>Savings</h3>
                    <table className="budget-table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Amount</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {spends.filter(spend => spend.category === 'savings').map(spend => (
                                <tr key={spend.id}>
                                    <td>{spend.description}</td>
                                    <td>${spend.amount}</td>
                                    <td>
                                        <button onClick={() => removeSpend(spend.id)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                        <tfoot>
                            <tr>
                                <td><strong>Total:</strong></td>
                                <td><strong>${calculateTotal('savings')}</strong></td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </>
    );
};

export default BudgetManager;
