// src/components/TipModal.js
import React from 'react';

const TipModal = ({ tip, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Tip of the Day</h2>
                <p>{tip}</p>
                <button onClick={onClose}>Got it!</button>
            </div>
        </div>
    );
};

export default TipModal;
