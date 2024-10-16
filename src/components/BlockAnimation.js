import React, { useEffect } from 'react';
import '../css/BlockAnimation.css'; 

const BlockAnimation = ({ active }) => {
    useEffect(() => {
        if (active) {
            const blocks = Array.from({ length: 100 }).map((_, index) => {
                const block = document.createElement('div');
                block.className = 'minecraft-block'; 
                block.style.left = `${Math.random() * 100}vw`; 
                block.style.animationDuration = `${Math.random() * 3 + 2}s`; 
                block.style.opacity = Math.random(); 
                document.body.appendChild(block);

                
                block.addEventListener('animationend', () => {
                    block.remove();
                });

                return block;
            });
        }
    }, [active]);

    return null; 
};

export default BlockAnimation;
