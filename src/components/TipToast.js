import React, { useEffect, useState } from 'react';
import '../css/TipToast.css';

const TipToast = ({ tip, onClose }) => {
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    onClose();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [onClose]);

    const handleClose = () => {
        clearInterval();
        onClose();
    };

    return (
        <div className="toast">
            <h2>✨ Tip of the Day</h2>
            <p>{tip}</p>
            <div className="countdown-bar" style={{ width: `${(countdown / 10) * 100}%` }} />
            <button onClick={handleClose} className="close-button">Close</button>
        </div>
    );
};

export default TipToast;
