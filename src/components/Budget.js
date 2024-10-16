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
            const username = userData?.username;

            if (!userToken) {
                console.error("User is not logged in");
                return;
            }

              const response = await fetch(`http://localhost:8082/transaction/getIncome?name=${username}`, {
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
                console.log("Fetched Income:", data); 
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
        const username = userData?.username;
    
        if (!userToken) return console.error("User is not logged in");
    
        try {
            const response = await fetch(`http://localhost:8082/transaction/getAll?name=${username}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}`,
                }
            });
    
            if (!response.ok) throw new Error(`Server error: ${response.statusText}`);
            const data = await response.json();
    
     
            const filteredSpends = data.filter(transaction => transaction.transactionType !== "INCOME");
    
            setSpends(filteredSpends);
            console.log("Fetched Spends:", filteredSpends);  
        } catch (error) {
            console.error("Error fetching spends:", error.message);
        }
    };
    


    useEffect(() => {
        const fetchData = async () => {
            await fetchIncome();
            await fetchSpends(); 
        };
    
        fetchData();
    }, []);

    const addSpend = async () => {
        if (spendAmount) {
            const newSpendAmount = Number(spendAmount);
            console.log("Current Spends:", spends);
console.log("New Spend Amount:", newSpendAmount); 
            const newTotalSpends = spends.reduce((total, spend) => total + spend.amount, 0) + newSpendAmount;

            console.log("New Total Spends:", newTotalSpends); 
            const userItem = localStorage.getItem("user");
            if (!userItem) {
                console.error("No user object found in localStorage.");
                return;
            }

            const userData = JSON.parse(userItem);
            const username = userData?.username;
            const userToken = userData?.token;


            if (!userToken) {
                console.error("User is not logged in");
                return;
            }


            if (newTotalSpends > income) {
                setErrorMessage("You don't have enough income. Please think about your spending.");
                setShowModal(true);
                return;
            }


            const newSpend = {
                userName: username,
                category: spendCategory,
                description: spendDescription,
                transactionType: "Expense",
                amount: newSpendAmount,
            };

            try {
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


    const removeSpend = async (transactionId) => {
      
        const payload = {
            transactionId: transactionId,
            userName: "",  
            category: "",  
            description: "", 
            transactionType: "", 
            amount: 0
        };
    
        try {
            const response = await fetch('http://localhost:8082/transaction/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete the transaction');
            }
    
            setSpends(prevSpends => prevSpends.filter(spend => spend.transactionId !== transactionId));
        } catch (error) {
            console.error("Error removing spend:", error);
        }
    };
    
    

    const calculateTotal = (category) => {
        return spends
            .filter(spend => spend.categoryName === category)
            .reduce((total, spend) => total + spend.amount, 0);
    };

    const totalSpends = spends.reduce((total, spend) => total + spend.amount, 0);
    const totalIncomeAfterSpends = income - totalSpends;

    const clearIncome = async () => {
        const userItem = localStorage.getItem("user");
        if (!userItem) {
            console.error("No user object found in localStorage.");
            return;
        }
    
        const userData = JSON.parse(userItem);
        const username = userData?.username;
        
        const userToken = userData?.token;
    
        if (!username || !userToken) {
            console.error("User is not logged in");
            return;
        }
    
        try {
          
            const body = {
                userName: username,
                category: "", 
                description: "",  
                transactionType: "income",
                amount: 0 
            };
    
            const response = await fetch("http://localhost:8082/transaction/delete", {
                method: "DELETE",  
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${userToken}` 
                },
                body: JSON.stringify(body)
            });
    
            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }
    
         
            const data = await response.json();
            console.log("Income cleared:", data);  
    
       
            setIncome(0);
            setInputIncome('');
        } catch (error) {
            console.error("Error clearing income:", error.message);
        }
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
            const username = userData?.username;

            if (!userToken) {
                console.error("User is not logged in");
                return;
            }

            const incomeData = {
                userName: username,
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
                console.log("Income After Adding:", await fetchIncome()); 
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
                            <button onClick={() => removeSpend(spend.transactionId)}>Remove</button>
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
                            <button onClick={() => removeSpend(spend.transactionId)}>Remove</button>
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
