import React from 'react';

const CategoryList = ({ categories, openEditModal, removeCategory, isOverBudget, setShowModal }) => (
  <div>
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
    <br></br>
    <button onClick={() => setShowModal(true)}>Add New Category</button>
  </div>
);

export default CategoryList;
