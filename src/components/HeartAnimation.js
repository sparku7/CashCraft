import React, { useEffect } from 'react';
import '../css/HeartAnimation.css'; 

const HeartAnimation = ({ active }) => {
    useEffect(() => {
        if (active) {
            const hearts = Array.from({ length: 100 }).map((_, index) => {
                const heart = document.createElement('div');
                heart.className = 'heart'; 
                heart.style.left = `${Math.random() * 100}vw`; 
                heart.style.animationDuration = `${Math.random() * 3 + 2}s`; 
                heart.style.opacity = Math.random(); 
                document.body.appendChild(heart);

                
                heart.addEventListener('animationend', () => {
                    heart.remove();
                });

                return heart;
            });
        }
    }, [active]);

    return null; 
};

export default HeartAnimation;
