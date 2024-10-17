import React, { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../css/Budget.css';
import BudgetModal from './BudgetModal';

const BudgetManager = () => {
    const [income, setIncome] = useState(0);
    const [inputIncome, setInputIncome] = useState('');
    const [spends, setSpends] = useState([]);
    const [spendAmount, setSpendAmount] = useState('');
    const [spendCategory, setSpendCategory] = useState('needs');
    const [spendDescription, setSpendDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const fetchIncome = async () => {
        const userItem = localStorage.getItem("user");
        
        if (!userItem) {
            console.error("No user object found in localStorage.");
            return;
        }
    
        try {
            const userData = JSON.parse(userItem);
            const userToken = userData?.token;
    
            if (!userToken) {
                console.error("User is not logged in");
                return;
            }
    
            const response = await fetch("http://localhost:8082/transaction/getIncome", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`,  
                }
            });
    
            if (!response.ok) {
                console.error(`Server error: ${response.statusText}`);
                return;
            }
    
            const data = await response.json();
    
            if (typeof data === 'number') {
                setIncome(data); 
            } else {
                console.error("Data is not a number:", data);
            }
        } catch (error) {
            console.error("Error fetching income:", error.message);
        }
    };

    const fetchSpends = async () => {
        const userItem = localStorage.getItem("user");
        if (!userItem) return console.error("No user object found in localStorage.");
    
        const userData = JSON.parse(userItem);
        const userToken = userData?.token;
    
        if (!userToken) return console.error("User is not logged in");
    
        try {
            const response = await fetch("http://localhost:8082/transaction/getAll?name=admin1", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`,
                }
            });
    
            if (!response.ok) throw new Error(`Server error: ${response.statusText}`);
            const data = await response.json();
            setSpends(data);
        } catch (error) {
            console.error("Error fetching spends:", error.message);
        }
    };
    

    useEffect(() => {
        fetchIncome();
        fetchSpends(); 
    }, []);

    const addSpend = async () => {
        if (spendAmount) {
            const newSpendAmount = Number(spendAmount);
            const newTotalSpends = spends.reduce((total, spend) => total + spend.amount, 0) + newSpendAmount;

            if (newTotalSpends > income) {
                setErrorMessage("You don't have enough income. Please think about your spending.");
                setShowModal(true);
                return;
            }

            const newSpend = {
                userName: "admin1",  
                category: spendCategory,
                description: spendDescription,
                transactionType: "Expense",
                amount: newSpendAmount
            };

           
            const userItem = localStorage.getItem("user");

            if (!userItem) {
                console.error("No user object found in localStorage.");
                return;
            }

            try {
                const userData = JSON.parse(userItem);
                const userToken = userData?.token;

                if (!userToken) {
                    console.error("User is not logged in");
                    return;
                }

                const response = await fetch("http://localhost:8082/transaction/new", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${userToken}`,
                    },
                    body: JSON.stringify(newSpend),
                });

                if (response.ok) {
                    console.log("Spend added successfully");
                    await fetchSpends();
                    setSpendAmount('');
                    setSpendDescription('');
                    setErrorMessage('');
                    setShowModal(false);
                } else {
                    console.error("Failed to add spend:", response.statusText);
                }
            } catch (error) {
                console.error("Error adding spend:", error);
            }
        }
    };

    const removeSpend = (id) => {
        const newSpends = spends.filter(spend => spend.id !== id);
        setSpends(newSpends);
    };

    const calculateTotal = (category) => {
        return spends
            .filter(spend => spend.categoryName === category)
            .reduce((total, spend) => total + spend.amount, 0);
    };

    const totalSpends = spends.reduce((total, spend) => total + spend.amount, 0);
    const totalIncomeAfterSpends = income - totalSpends;

    const clearIncome = () => {
        setIncome(0);
        setInputIncome('');
    };

    const handleAddIncome = async () => {
        const userItem = localStorage.getItem("user");

        if (!userItem) {
            console.error("No user object found in localStorage.");
            return;
        }

        try {
            const userData = JSON.parse(userItem);
            const userToken = userData?.token;

            if (!userToken) {
                console.error("User is not logged in");
                return;
            }

            const incomeData = {
                transactionId: 1,
                categoryName: "INCOME",
                transactionType: "INCOME",
                description: "Income added",
                amount: Number(inputIncome),
                date: new Date().toISOString().split("T")[0],
            };

            const response = await fetch("http://localhost:8082/transaction/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`,
                },
                body: JSON.stringify(incomeData),
            });

            if (response.ok) {
                console.log("Income added successfully");
                fetchIncome();  
                setInputIncome('');
            } else {
                console.error("Failed to add income:", response.statusText);
            }
        } catch (error) {
            console.error("Error parsing user object from localStorage or adding income:", error);
        }
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

            {showModal && (
                <BudgetModal
                    message={errorMessage}
                    onClose={() => setShowModal(false)}
                />
            )}

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
                            {spends.filter(spend => spend.categoryName === 'needs').map(spend => (
                                <tr key={spend.transactionId}>
                                    <td>{spend.description}</td>
                                    <td>${spend.amount}</td>
                                    <td>
                                        <button onClick={() => removeSpend(spend.id)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
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
                            {spends.filter(spend => spend.categoryName === 'wants').map(spend => (
                                <tr key={spend.transactionId}>
                                    <td>{spend.description}</td>
                                    <td>${spend.amount}</td>
                                    <td>
                                        <button onClick={() => removeSpend(spend.id)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
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
      {spends.filter(spend => spend.categoryName === 'savings').map(spend => (
        <tr key={spend.transactionId}>
          <td>{spend.description}</td>
          <td>${spend.amount}</td>
          <td>
            <button onClick={() => removeSpend(spend.transactionId)}>Remove</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

            </div>
        </>
    );
};

export default BudgetManager;
