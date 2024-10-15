import React from 'react';

const Achievement = ({ achievement }) => {
  return (
    <div className="achievement-item">
      {achievement.completion === '100%' ? (
        <>
          <img src={achievement.imageUrl} alt={achievement.name} />
          <h2>{achievement.name}</h2>
          <p>Completion: {achievement.completion}</p>
        </>
      ) : (
        <div className="achievement-incomplete">
          <h2>{achievement.name}</h2>
          <p>Completion: {achievement.completion}</p>
          <p>Keep going to unlock this achievement!</p>
        </div>
      )}
    </div>
  );
};

export default Achievement;
