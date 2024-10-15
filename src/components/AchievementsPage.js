import React, { useEffect, useState } from 'react';
import '../css/Achievements.css'; 
import { useSavings } from './SavingsContext'; 
import AchievementsGrid from './AchievementsGrid';

const achievements = [
  { id: 1, name: '£1,000 Saved', imageUrl: require('../images/minecraft-award1.png'), completion: '0%' },
  { id: 2, name: '£5,000 Saved', imageUrl: require('../images/minecraft-award2.png'), completion: '0%' },
  { id: 3, name: '£10,000 Saved', imageUrl: require('../images/minecraft-award3.png'), completion: '0%' },
  { id: 4, name: '4 Weeks Within Budget', imageUrl: require('../images/minecraft-award4.png'), completion: '0%' },
  { id: 5, name: '8 Weeks Within Budget', imageUrl: require('../images/minecraft-award5.png'), completion: '0%' },
  { id: 6, name: 'Emergency Fund Established', imageUrl: require('../images/minecraft-award6.png'), completion: '0%' },
  { id: 7, name: 'Debt-Free Milestone', imageUrl: require('../images/minecraft-award7.png'), completion: '0%' },
  { id: 8, name: 'Save for a Vacation', imageUrl: require('../images/minecraft-award8.png'), completion: '0%' },
  { id: 9, name: 'Save for a New Gadget', imageUrl: require('../images/minecraft-award9.png'), completion: '0%' },
  { id: 10, name: 'Refer a Friend', imageUrl: require('../images/minecraft-award10.png'), completion: '0%' },
];

const AchievementsPage = () => {
  const { totalSavings } = useSavings(); 
  const [updatedAchievements, setUpdatedAchievements] = useState(() => {
    const savedAchievements = JSON.parse(localStorage.getItem('updatedAchievements'));
    return savedAchievements || achievements; 
  });

  useEffect(() => {
    const updated = updatedAchievements.map((achievement) => {
      let completion = achievement.completion; 
      
      if (achievement.id === 1 && totalSavings >= 1000) completion = '100%';
      else if (achievement.id === 2 && totalSavings >= 5000) completion = '100%';
      else if (achievement.id === 3 && totalSavings >= 10000) completion = '100%';

      return { ...achievement, completion };
    });

    setUpdatedAchievements(updated);
    
    localStorage.setItem('updatedAchievements', JSON.stringify(updated));
  }, [totalSavings]); 

  return (
    <div className="achievements-page">
      <h1>Achievements Overview</h1>
      <AchievementsGrid achievements={updatedAchievements} />
    </div>
  );
};

export default AchievementsPage;
