import React, { useState } from 'react';
import '../css/Quests.css';

const Quests = () => {
  const [quests, setQuests] = useState([
    { id: 1, name: 'Save $100 this month', completed: false },
    { id: 2, name: 'Track all your expenses for a week', completed: true },
    { id: 3, name: 'Create a budget for next month', completed: false },
  ]);

  const [newQuest, setNewQuest] = useState('');


  const completeQuest = (id) => {
    const updatedQuests = quests.map((quest) =>
      quest.id === id ? { ...quest, completed: !quest.completed } : quest
    );
    setQuests(updatedQuests);
  };

  const addQuest = () => {
    if (newQuest.trim() === '') return;
    const newId = quests.length > 0 ? quests[quests.length - 1].id + 1 : 1;
    setQuests([...quests, { id: newId, name: newQuest, completed: false }]);
    setNewQuest('');
  };

  const deleteQuest = (id) => {
    setQuests(quests.filter((quest) => quest.id !== id));
  };

  const totalQuests = quests.length;
  const completedQuests = quests.filter((quest) => quest.completed).length;

  return (
    <div className="quests">
      <header>
        <h1>Financial Quests</h1>
        <p>Complete fun challenges to improve your financial skills!</p>
      </header>

      <section className="progress-bar">
        <h3>Quest Progress</h3>
        <progress value={completedQuests} max={totalQuests}></progress>
        <p>{completedQuests} of {totalQuests} quests completed</p>
      </section>

      <section className="active-quests">
        <h3>Active Quests</h3>
        <div className="quest-cards-container">
          {quests
            .filter((quest) => !quest.completed)
            .map((quest) => (
              <div key={quest.id} className="quest-card">
                <span>{quest.name}</span>
                <button onClick={() => completeQuest(quest.id)}>Complete</button>
                <button className="delete-button" onClick={() => deleteQuest(quest.id)}>Delete</button>
              </div>
            ))}
        </div>
      </section>

      <section className="completed-quests">
        <h3>Completed Quests</h3>
        <div className="quest-cards-container">
          {quests
            .filter((quest) => quest.completed)
            .map((quest) => (
              <div key={quest.id} className="quest-card completed">
                <span>{quest.name}</span>
                <button onClick={() => completeQuest(quest.id)}>Undo</button>
              </div>
            ))}
        </div>
      </section>


      <section className="quest-creation">
        <h3>Create a New Quest</h3>
        <input
          type="text"
          placeholder="New Quest Name"
          className="quest-input"
          value={newQuest}
          onChange={(e) => setNewQuest(e.target.value)}
        />
        <button onClick={addQuest}>Add Quest</button>
      </section>
    </div>
  );
};

export default Quests;
