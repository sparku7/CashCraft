import React from 'react';
import '../css/Rewards.css'; // Make sure to create this CSS file for styling


const achievements = [
    { id: 1, name: '£1,000 Saved', imageUrl: require('../images/minecraft-award1.png'), completion: '0%' },
  { id: 2, name: '£5,000 Saved', imageUrl: require('../images/minecraft-award2.png'), completion: '0%' },
  { id: 3, name: '£10,000 Saved', imageUrl: require('../images/minecraft-award3.png'), completion: '0%' },
  { id: 4, name: '4 Weeks Within Budget', imageUrl:require('../images/minecraft-award4.png'), completion: '0%' },
  { id: 5, name: '8 Weeks Within Budget', imageUrl: require('../images/minecraft-award5.png'),completion: '0%' },
  { id: 6, name: 'Emergency Fund Established', imageUrl: require('../images/minecraft-award6.png'), completion: '0%' },
  { id: 7, name: 'Debt-Free Milestone', imageUrl: require('../images/minecraft-award7.png'), completion: '0%' },
  { id: 8, name: 'Save for a Vacation', imageUrl: require('../images/minecraft-award8.png'),completion: '0%' },
  { id: 9, name: 'Save for a New Gadget', imageUrl:require('../images/minecraft-award9.png'), completion: '0%' },
  { id: 10, name: 'Refer a Friend', imageUrl: require('../images/minecraft-award10.png'), completion: '0%' },
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
