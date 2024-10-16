import React, { useEffect } from 'react';

const Snowfall = ({ active }) => {
    useEffect(() => {
        if (active) {
            const snowflakes = Array.from({ length: 100 }).map((_, index) => {
                const snowflake = document.createElement('div');
                snowflake.className = 'snowflake';
                snowflake.style.left = `${Math.random() * 100}vw`; 
                snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`; 
                snowflake.style.opacity = Math.random(); 
                document.body.appendChild(snowflake);

                
                snowflake.addEventListener('animationend', () => {
                    snowflake.remove();
                });

                return snowflake;
            });
        }
    }, [active]);

    return null; 
};

export default Snowfall;
