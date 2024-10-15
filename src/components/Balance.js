import React from 'react';

const Balance = ({ total }) => {
    return (
        <div className="balance">
            <h3>Total Balance</h3>
            <p>£{total.toFixed(2)}</p>
        </div>
    );
};

export default Balance;
