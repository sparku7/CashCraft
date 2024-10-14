import React from 'react';
import '../css/Rewards.css'; // Make sure to create this CSS file for styling

const achievements = [
  { id: 1, name: '£1,000 Saved', imageUrl: 'https://via.placeholder.com/150', completion: '0%' },
  { id: 2, name: '£5,000 Saved', imageUrl: 'https://via.placeholder.com/150', completion: '0%' },
  { id: 3, name: '£10,000 Saved', imageUrl: 'https://via.placeholder.com/150', completion: '0%' },
  { id: 4, name: '4 Weeks Within Budget', imageUrl: 'https://via.placeholder.com/150', completion: '0%' },
  { id: 5, name: '8 Weeks Within Budget', imageUrl: 'https://via.placeholder.com/150', completion: '0%' },
  { id: 6, name: 'Emergency Fund Established', imageUrl: 'https://via.placeholder.com/150', completion: '0%' },
  { id: 7, name: 'Debt-Free Milestone', imageUrl: 'https://via.placeholder.com/150', completion: '0%' },
  { id: 8, name: 'Save for a Vacation', imageUrl: 'https://via.placeholder.com/150', completion: '0%' },
  { id: 9, name: 'Save for a New Gadget', imageUrl: 'https://via.placeholder.com/150', completion: '0%' },
  { id: 10, name: 'Refer a Friend', imageUrl: 'https://via.placeholder.com/150', completion: '0%' },
];

const AchievementsPage = () => {
  return (
    <div className="achievements-page">
      <h1>Achievements Overview</h1>
      <div className="achievements-grid">
        {achievements.map((achievement) => (
          <div className="achievement-item" key={achievement.id}>
            <img src={achievement.imageUrl} alt={achievement.name} />
            <h2>{achievement.name}</h2>
            <p>Completion: {achievement.completion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsPage;
