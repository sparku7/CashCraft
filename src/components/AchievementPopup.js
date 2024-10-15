import React from 'react';

const AchievementPopup = ({ achievement, handleViewReward, handlePopupClose }) => {
    if (!achievement) return null;

    return (
        <div className="modal achievement-popup">
            <div className="popup-content">
                <h2>Achievement Unlocked!</h2>
                <p>{achievement}</p>
                <button onClick={handleViewReward}>View Reward</button>
                <button onClick={handlePopupClose}>Close</button>
            </div>
        </div>
    );
};

export default AchievementPopup;
