import React, { useState, useEffect } from 'react';
import '../css/Budget.css'; 
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'; 

// Register the Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

const Budget = () => {
  const [categories, setCategories] = useState([
    { name: 'Food', budget: 200, spent: 120 },
    { name: 'Entertainment', budget: 100, spent: 80 },
    { name: 'Savings', budget: 150, spent: 0 },
  ]);

  const [newExpense, setNewExpense] = useState({ category: '', amount: '' });
  const [newCategory, setNewCategory] = useState({ name: '', budget: '' }); 
  const [showModal, setShowModal] = useState(false); 
  const [editModal, setEditModal] = useState(false); // State for the edit modal
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(null); // Index of the category being edited

  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem('budgetCategories'));
    if (savedCategories) setCategories(savedCategories);
  }, []);

  useEffect(() => {
    localStorage.setItem('budgetCategories', JSON.stringify(categories));
  }, [categories]);

  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const remainingBudget = totalBudget - totalSpent;

  const addCategory = (name, budget) => {
    setCategories([...categories, { name, budget, spent: 0 }]);
    setNewCategory({ name: '', budget: 100 }); 
    setShowModal(false); 
  };

  const addExpense = (categoryName, amount) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat.name === categoryName ? { ...cat, spent: cat.spent + Number(amount) } : cat
      )
    );
  };

  const openEditModal = (index) => {
    setCurrentCategoryIndex(index);
    setNewCategory({ name: categories[index].name, budget: categories[index].budget });
    setEditModal(true); // Open the edit modal
  };

  const updateCategory = () => {
    setCategories((prevCategories) =>
      prevCategories.map((cat, i) =>
        i === currentCategoryIndex ? { ...cat, name: newCategory.name, budget: Number(newCategory.budget) } : cat
      )
    );
    setEditModal(false); // Close the modal after updating
  };

  const removeCategory = (index) => {
    setCategories((prevCategories) => prevCategories.filter((_, i) => i !== index));
  };

  const isOverBudget = (category) => category.spent > category.budget;

  const data = {
    labels: categories.map((cat) => cat.name),
    datasets: [{
      data: categories.map((cat) => cat.spent),
      backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
    }],
  };

  return (
    <div className="budget">
      <header>
        <h1>Your Budget Overview</h1>
        <p>Keep track of your expenses and plan for the future!</p>
      </header>

      <section className="overview">
        <div className="budget-summary">
          <h3>Total Budget: £{totalBudget}</h3>
          <h3>Amount Spent: £{totalSpent}</h3>
          <h3>Remaining Budget: £{remainingBudget}</h3>
        </div>
      </section>

      <section className="categories">
        <h3>Budget Categories</h3>
        <ul>
          {categories.map((category, index) => (
            <li key={index} style={{ color: isOverBudget(category) ? 'red' : 'black' }}>
              <h4>{category.name}</h4>
              <progress value={category.spent} max={category.budget}></progress>
              <p>Budget: £{category.budget} | Spent: £{category.spent}</p>
              <button onClick={() => openEditModal(index)}>Edit</button>
              <button className="remove-button" onClick={() => removeCategory(index)}>Remove</button>
            </li>          
          ))}
        </ul>
        <button onClick={() => setShowModal(true)}>Add New Category</button>
      </section>

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
          placeholder="Expense Amount" // Updated placeholder
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
        />
        <button onClick={() => addExpense(newExpense.category, newExpense.amount)}>Add Expense</button>
      </section>

      <section className="budget-chart">
        <h3>Spending by Category</h3>
        <Pie data={data} />
      </section>

      <section className="tips">
        <h3>Budgeting Tips</h3>
        <p>Try to stick to your budget categories to save more!</p>
      </section>

      {/* Modal for Adding New Category */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Add New Category</h2>
            <input 
              type="text" 
              placeholder="Category Name" 
              value={newCategory.name} 
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} 
              className="modal-input"
            />
            <input 
              type="number" 
              placeholder="Budget Amount" 
              value={newCategory.budget} 
              onChange={(e) => setNewCategory({ ...newCategory, budget: e.target.value })} 
              className="modal-input"
            />
            <button onClick={() => addCategory(newCategory.name, newCategory.budget)}>Add Category</button>
          </div>
        </div>
      )}

      {/* Modal for Editing Category */}
      {editModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setEditModal(false)}>&times;</span>
            <h2>Edit Category</h2>
            <input 
              type="text" 
              placeholder="Category Name" 
              value={newCategory.name} 
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} 
              className="modal-input"
            />
            <input 
              type="number" 
              placeholder="Budget" 
              value={newCategory.budget} 
              onChange={(e) => setNewCategory({ ...newCategory, budget: e.target.value })} 
              className="modal-input"
            />
            <button onClick={updateCategory}>Update Category</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budget;
