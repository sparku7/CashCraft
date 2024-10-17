import React from 'react';

const QuestCreation = ({ newQuest, setNewQuest, addQuest, errorMessage }) => {
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
      addQuest(addedQuest); 
      setNewQuest(''); 
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
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button onClick={handleAddQuest}>Add Quest</button>
    </section>
  );
};

export default QuestCreation;
