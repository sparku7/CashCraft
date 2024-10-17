import React from 'react';
import QuestCard from './QuestCard';

const QuestList = ({ quests, onComplete, onDelete, errorMessage }) => {
  return (
    <div className="quest-cards-container">
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {quests.map((quest) => (
        <QuestCard 
          key={quest.questId} 
          quest={quest} 
          onComplete={onComplete} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default QuestList;
