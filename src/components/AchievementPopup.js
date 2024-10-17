import React from 'react';

const AchievementPopup = ({ achievement, handleViewAchievement, handlePopupClose }) => {
    if (!achievement) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Achievement Unlocked!</h2>
                <p>{achievement}</p>
                <button onClick={handleViewAchievement}>View Achievement</button>
                <button onClick={handlePopupClose}>Close</button>
            </div>
        </div>
    );
};

export default AchievementPopup;
