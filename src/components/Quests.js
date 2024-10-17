import React, { useState, useEffect } from 'react';
import '../css/Quests.css';
import QuestProgress from './QuestProgress';
import QuestList from './QuestList';
import QuestCreation from './QuestCreation';

const Quests = () => {
  const [quests, setQuests] = useState([]);
  const [newQuest, setNewQuest] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchQuests = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.username) {
        try {
          const response = await fetch(`http://localhost:8083/quests/getAll?userName=${user.username}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch quests');
          }

          const data = await response.json();
          setQuests(data);
        } catch (error) {
          console.error('Error fetching quests:', error);
          setErrorMessage('Failed to load quests.');
        }
      } else {
        setErrorMessage('User is not logged in.');
      }
    };

    fetchQuests();
  }, []); 

  const completeQuest = async (id) => {
    try {
      const quest = quests.find((quest) => quest.questId === id);
      const response = await fetch(`http://localhost:8083/quests/update?questId=${id}&completed=${!quest.completed}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to update quest completion status');
      }

      const updatedQuests = quests.map((quest) =>
        quest.questId === id ? { ...quest, completed: !quest.completed } : quest
      );
      setQuests(updatedQuests);
    } catch (error) {
      console.error('Error completing quest:', error);
      alert('Failed to complete the quest.');
    }
  };

  const deleteQuest = async (id) => {
    try {
      const response = await fetch(`http://localhost:8083/quests/delete?questId=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete quest');
      }
  
         setQuests(quests.filter((quest) => quest.questId !== id));
    } catch (error) {
      console.error('Error deleting quest:', error);
      alert('Failed to delete the quest.');
    }
  };
  


  const addQuest = () => {
    if (newQuest.trim() === '') {
      setErrorMessage('Quest name cannot be empty.');
      return;
    }
    setErrorMessage('');
    
    const newId = quests.length > 0 ? quests[quests.length - 1].questId + 1 : 1; 
    const newQuestObj = { questId: newId, questName: newQuest, completed: false, enabled: true };

    setQuests([...quests, newQuestObj]);
    setNewQuest('');
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
          errorMessage={errorMessage}
        />
      </section>

    
      <section className="completed-quests">
        <h3>Completed Quests</h3>
        <QuestList 
          quests={quests.filter((quest) => quest.completed)} 
          onComplete={completeQuest} 
          onDelete={deleteQuest} 
          errorMessage={errorMessage}
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
