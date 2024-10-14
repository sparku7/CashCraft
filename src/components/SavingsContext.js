import React, { createContext, useContext, useState } from 'react';


const SavingsContext = createContext();

export const SavingsProvider = ({ children }) => {
    const [totalSavings, setTotalSavings] = useState(() => {
        const savedTotal = JSON.parse(localStorage.getItem('totalSavings'));
        return savedTotal || 0;
    });

    return (
        <SavingsContext.Provider value={{ totalSavings, setTotalSavings }}>
            {children}
        </SavingsContext.Provider>
    );
};


export const useSavings = () => {
    return useContext(SavingsContext);
};
