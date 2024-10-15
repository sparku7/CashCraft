import React, { useState, useEffect } from 'react';
import '../css/Budget.css';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import CategoryList from './CategoryList';
import BudgetChart from './BudgetChart';
import CategoryModal from './CategoryModal';

Chart.register(ArcElement, Tooltip, Legend);

const Budget = () => {
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', budget: '' });
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(null);
    const [data, setData] = useState({
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [],
        }]
    });

    const isOverBudget = (category) => category.spent > category.budget;

    const openEditModal = (index) => {
        setCurrentCategoryIndex(index);
        setNewCategory({ name: categories[index].name, budget: categories[index].budget });
        setEditModal(true);
    };

    const removeCategory = (index) => {
        const updatedCategories = categories.filter((_, i) => i !== index);
        setCategories(updatedCategories);
        updateChartData(updatedCategories);
    };

    const addExpense = (categoryName, amount) => {
        const updatedCategories = categories.map((cat) =>
            cat.name === categoryName ? { ...cat, spent: cat.spent + Number(amount) } : cat
        );
        setCategories(updatedCategories);
        updateChartData(updatedCategories);
    };

    const addCategory = (name, budget) => {
        const newCategories = [...categories, { name, budget: Number(budget), spent: 0 }];
        setCategories(newCategories);
        setNewCategory({ name: '', budget: '' });
        setShowModal(false);
        updateChartData(newCategories);
    };

    const updateCategory = () => {
        const updatedCategories = categories.map((cat, i) =>
            i === currentCategoryIndex ? { ...cat, name: newCategory.name, budget: Number(newCategory.budget) } : cat
        );
        setCategories(updatedCategories);
        updateChartData(updatedCategories);
        setEditModal(false);
    };

    const updateChartData = (categoriesData = categories) => {
        const labels = categoriesData.map(cat => cat.name);
        const spentData = categoriesData.map(cat => cat.spent);
        const backgroundColor = categoriesData.map((_, index) => {
            const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
            return colors[index % colors.length];
        });

        setData({
            labels: labels,
            datasets: [{
                data: spentData,
                backgroundColor: backgroundColor,
            }]
        });
    };

    useEffect(() => {
        const initialCategories = [
            { name: 'Food', budget: 300, spent: 200 },
            { name: 'Transport', budget: 100, spent: 50 },
        ];
        setCategories(initialCategories);
        updateChartData(initialCategories);
    }, []);

    return (
        <div className="budget">
            <header>
                <h1>Your Budget Overview</h1>
                <p>Keep track of your expenses and plan for the future!</p>
            </header>

            { }
            <div className="category-container">
                <CategoryList
                    categories={categories}
                    openEditModal={openEditModal}
                    removeCategory={removeCategory}
                    isOverBudget={isOverBudget}
                    addExpense={addExpense}
                    setShowModal={setShowModal}
                />
            </div>

            <BudgetChart data={data} />
            <CategoryModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Add New Category"
                category={newCategory}
                handleSubmit={() => addCategory(newCategory.name, newCategory.budget)}
                setCategory={setNewCategory}
            />
            <CategoryModal
                isOpen={editModal}
                onClose={() => setEditModal(false)}
                title="Edit Category"
                category={newCategory}
                handleSubmit={updateCategory}
                setCategory={setNewCategory}
            />
            <section className="tips">
                <h3>Budgeting Tips</h3>
                <p>Try to stick to your budget categories to save more!</p>
            </section>
        </div>
    );
};

export default Budget;
