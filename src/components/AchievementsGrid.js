import React from 'react';
import Achievement from './Achievement';

const AchievementsGrid = ({ achievements }) => {
  return (
    <div className="achievements-grid">
      {achievements.map((achievement) => (
        <Achievement key={achievement.id} achievement={achievement} />
      ))}
    </div>
  );
};

export default AchievementsGrid;
