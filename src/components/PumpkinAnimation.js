import React, { useEffect } from 'react';
import '../css/PumpkinAnimation.css'; 

const PumpkinAnimation = ({ active }) => {
    useEffect(() => {
        if (active) {
            const pumpkins = Array.from({ length: 100 }).map((_, index) => {
                const pumpkin = document.createElement('div');
                pumpkin.className = 'pumpkin'; 
                pumpkin.style.left = `${Math.random() * 100}vw`; 
                pumpkin.style.animationDuration = `${Math.random() * 3 + 2}s`; 
                pumpkin.style.opacity = Math.random(); 
                document.body.appendChild(pumpkin);

                
                pumpkin.addEventListener('animationend', () => {
                    pumpkin.remove();
                });

                return pumpkin;
            });
        }
    }, [active]);

    return null; 
};

export default PumpkinAnimation;
