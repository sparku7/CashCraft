import React from 'react';
import QuestCard from './QuestCard';

const QuestList = ({ quests, onComplete, onDelete }) => {
  return (
    <div className="quest-cards-container">
      {quests.map((quest) => (
        <QuestCard key={quest.id} quest={quest} onComplete={onComplete} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default QuestList;
