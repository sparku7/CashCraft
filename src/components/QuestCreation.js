import React, { useState } from 'react';

const QuestCreation = ({ onAddQuest }) => {
  const [newQuest, setNewQuest] = useState('');
  
  const handleAddQuest = async () => {
    const storedUser = JSON.parse(localStorage.getItem('user')); 
    const userName = storedUser?.username; 
    
    if (!userName || !newQuest) {
      alert('Please enter a quest name and ensure you are logged in.');
      return;
    }

    const questData = {
      userName: userName, 
      questName: newQuest,
    };

    try {
      const response = await fetch('http://localhost:8083/quests/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questData),
      });

      if (!response.ok) {
        throw new Error('Failed to add quest');
      }

      const addedQuest = await response.json();
      onAddQuest(addedQuest); // Call the function passed down from Quests.js
      setNewQuest(''); // Clear input field after adding quest
    } catch (error) {
      console.error('Error adding quest:', error);
      alert('Failed to add quest: ' + error.message);
    }
  };

  return (
    <section className="quest-creation">
      <h3>Create a New Quest</h3>
      <input
        type="text"
        placeholder="New Quest Name"
        className="quest-input"
        value={newQuest}
        onChange={(e) => setNewQuest(e.target.value)}
      />
      <button onClick={handleAddQuest}>Add Quest</button>
    </section>
  );
};

export default QuestCreation;
