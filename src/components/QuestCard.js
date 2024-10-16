import React from 'react';

const QuestCard = ({ quest, onComplete, onDelete }) => {
  return (
    <div className={`quest-card ${quest.completed ? 'completed' : ''}`}>
      <span>{quest.name}</span>
      <button className='quest-button' onClick={() => onComplete(quest.id)}>
        {quest.completed ? 'Undo' : 'Complete'}
      </button>
      {!quest.completed && (
        <button className="delete-button" onClick={() => onDelete(quest.id)} aria-label={`Delete ${quest.name}`}>
          Delete
        </button>
      )}
    </div>
  );
};

export default QuestCard;
