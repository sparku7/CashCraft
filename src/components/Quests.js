import React, { useState } from 'react';
import '../css/Quests.css';
import QuestProgress from './QuestProgress';
import QuestList from './QuestList';
import QuestCreation from './QuestCreation';

const Quests = () => {
  const [quests, setQuests] = useState([
    { id: 1, name: 'Save $100 this month', completed: false },
    { id: 2, name: 'Track all your expenses for a week', completed: true },
    { id: 3, name: 'Create a budget for next month', completed: false },
  ]);

  const [newQuest, setNewQuest] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const completeQuest = (id) => {
    const updatedQuests = quests.map((quest) =>
      quest.id === id ? { ...quest, completed: !quest.completed } : quest
    );
    setQuests(updatedQuests);
  };

  const addQuest = () => {
    if (newQuest.trim() === '') {
      setErrorMessage('Quest name cannot be empty.');
      return;
    }
    setErrorMessage('');
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

      <QuestProgress completed={completedQuests} total={totalQuests} />

      <section className="active-quests">
        <h3>Active Quests</h3>
        <QuestList 
          quests={quests.filter((quest) => !quest.completed)} 
          onComplete={completeQuest} 
          onDelete={deleteQuest} 
        />
      </section>

      <section className="completed-quests">
        <h3>Completed Quests</h3>
        <QuestList 
          quests={quests.filter((quest) => quest.completed)} 
          onComplete={completeQuest} 
          onDelete={deleteQuest} 
        />
      </section>

      <QuestCreation 
        newQuest={newQuest} 
        setNewQuest={setNewQuest} 
        addQuest={addQuest} 
        errorMessage={errorMessage} 
      />
    </div>
  );
};

export default Quests;
