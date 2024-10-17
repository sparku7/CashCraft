import React from 'react';

const QuestCard = ({ quest, onComplete, onDelete }) => {
  return (
    <div className={`quest-card ${quest.completed ? 'completed' : ''}`}>
    
      <span>{quest.questName}</span> 
      
  
      <button className="quest-button" onClick={() => onComplete(quest.questId)}>
        {quest.completed ? 'Undo' : 'Complete'}
      </button>

      {!quest.completed && (
        <button 
          className="delete-button" 
          onClick={() => onDelete(quest.questId)} 
          aria-label={`Delete ${quest.questName}`}>
          Delete
        </button>
      )}
    </div>
  );
};

export default QuestCard;
