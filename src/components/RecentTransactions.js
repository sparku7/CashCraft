import React from 'react';

const RecentTransactions = ({ transactions }) => {
    return (
        <div className="recent-transactions">
            <h3>Recent Transactions</h3>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.date}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecentTransactions;
