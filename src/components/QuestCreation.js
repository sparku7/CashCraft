import React from 'react';

const QuestCreation = ({ newQuest, setNewQuest, addQuest, errorMessage }) => {
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
      <button onClick={addQuest}>Add Quest</button>
    </section>
  );
};

export default QuestCreation;
