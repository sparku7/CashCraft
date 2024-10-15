import React, { useState } from 'react';

const CategoryList = ({ categories, openEditModal, removeCategory, isOverBudget, addExpense, setShowModal }) => {
  const [expenseAmounts, setExpenseAmounts] = useState({});

  const handleExpenseChange = (categoryName, value) => {
    setExpenseAmounts(prev => ({ ...prev, [categoryName]: value }));
  };

  const handleAddExpense = (categoryName) => {
    const amount = expenseAmounts[categoryName];
    if (amount && Number(amount) > 0) {
      addExpense(categoryName, amount);
      setExpenseAmounts(prev => ({ ...prev, [categoryName]: '' }));
    }
  };

  return (
    <div className="category-list">
      <ul>
        {categories.map((category, index) => (
          <li key={index} className="category-item" style={{ color: isOverBudget(category) ? 'red' : 'black' }}>
            <h4>{category.name}</h4>
            <progress value={category.spent} max={category.budget}></progress>
            <p>Budget: £{category.budget} | Spent: £{category.spent}</p>
            <button onClick={() => openEditModal(index)}>Edit</button>
            <button className="remove-button" onClick={() => removeCategory(index)}>Remove</button>
            <input
              type="number"
              placeholder="Expense Amount"
              value={expenseAmounts[category.name] || ''}
              onChange={(e) => handleExpenseChange(category.name, e.target.value)}
            />
            <button onClick={() => handleAddExpense(category.name)}>Add Expense</button> 
          </li>
        ))}
      </ul>
      <button className="add-category-button" onClick={() => setShowModal(true)}>Add New Category</button>
    </div>
  );
};

export default CategoryList;
