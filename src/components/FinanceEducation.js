import React from 'react';

const FinanceEducation = () => {
    return (
        <div className="finance-education" style={{ textAlign: 'center' }}>
            <header>
                <h1>Finance Fun Zone!</h1>
                <h2>Get Smart with Your Money</h2>
            </header>
            <main>
                <section className="introduction">
                    <p>
                        Welcome to the Finance Fun Zone! Here, you'll learn how to manage your money
                        like a pro while having a blast! 🌟
                    </p>
                </section>
                <section className="education-content">
                    <h3>Quick Tips for Smart Budgeting!</h3>
                    <div style={{ marginBottom: '10px' }}>
                        <span>💰 <strong>Create a Budget:</strong></span>
                        <span> Start tracking your income and expenses to see where your money goes!</span>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <span>📊 <strong>Set Savings Goals:</strong></span>
                        <span> Aim to save for something special, like a new game or gadget!</span>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <span>🎉 <strong>Have Fun with Saving:</strong></span>
                        <span> Try saving a little each week—watch your savings grow!</span>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <span>🛍️ <strong>Plan Your Spending:</strong></span>
                        <span> Before shopping, list what you need to avoid impulse buys.</span>
                    </div>
                </section>
                <section className="interactive-quiz">
                    <h3>Quiz Yourself!</h3>
                    <p>How well do you know your finances? Take our fun quiz to find out!</p>
                    <button
                        className="quiz-button"
                        style={{
                            height: '50px', 
                            width: '120px',   
                            fontSize: '16px',
                        }}
                    >
                        Start Quiz
                    </button>
                </section>
                <section className="resources">
                    <h3>Resources</h3>
                    <p>Check out these cool resources to learn more:</p>
                    <div style={{ marginBottom: '10px' }}>
                        <span>📚 <strong>Finance Academy:</strong></span>
                        <span> Financial literacy courses</span>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <span>💡 <strong>Mint:</strong></span>
                        <span> Budgeting tools for teens</span>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <span>🎮 <strong>Games:</strong></span>
                        <span> Financial literacy games for fun learning!</span>
                    </div>
                </section>
            </main>
            <footer>
                <p>Thanks for stopping by the Finance Fun Zone! Remember, managing money is a skill you can master! 🎉</p>
            </footer>
        </div>
    );
};

export default FinanceEducation;
