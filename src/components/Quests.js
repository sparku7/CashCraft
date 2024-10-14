
import React, { useState } from 'react';
import '../css/Quests.css';

const Quests = () => {
  const [quests, setQuests] = useState([
    { name: 'Save $100 this month', completed: false },
    { name: 'Track all your expenses for a week', completed: true },
    { name: 'Create a budget for next month', completed: false },
  ]);

  const completeQuest = (index) => {
    const updatedQuests = quests.map((quest, i) => 
      i === index ? { ...quest, completed: true } : quest
    );
    setQuests(updatedQuests);
  };

  return (
    <div className="quests">
      <header>
        <h1>Financial Quests</h1>
        <p>Complete fun challenges to improve your financial skills!</p>
      </header>

      <section className="active-quests">
        <h3>Active Quests</h3>
        <ul>
          {quests.map((quest, index) => (
            <li key={index} className={quest.completed ? 'completed' : ''}>
              <span>{quest.name}</span>
              {!quest.completed && <button onClick={() => completeQuest(index)}>Complete</button>}
            </li>
          ))}
        </ul>
      </section>

      <section className="completed-quests">
        <h3>Completed Quests</h3>
        <ul>
          {quests.filter(quest => quest.completed).map((quest, index) => (
            <li key={index}>{quest.name}</li>
          ))}
        </ul>
      </section>

      <section className="quest-creation">
        <h3>Create a New Quest</h3>
        <input type="text" placeholder="New Quest Name" />
        <button>Add Quest</button>
      </section>
    </div>
  );
};

export default Quests;
