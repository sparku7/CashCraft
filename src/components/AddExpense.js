import React from 'react';

const AddExpense = ({ categories, newExpense, setNewExpense, addExpense }) => (
  <section className="add-expense">
    <h3>Add Expense</h3>
    <select onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}>
      <option value="">Select Category</option>
      {categories.map((category) => (
        <option key={category.name} value={category.name}>{category.name}</option>
      ))}
    </select>
    <input
      type="number"
      placeholder="Expense Amount"
      value={newExpense.amount}
      onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
    />
    <button onClick={() => addExpense(newExpense.category, newExpense.amount)}>Add Expense</button>
  </section>
);

export default AddExpense;
