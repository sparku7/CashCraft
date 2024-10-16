import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 
    const [users, setUsers] = useState([ 
        { username: 'testuser', password: 'password123' },
        { username: 'admin', password: 'adminpass' },
    ]);

    useEffect(() => {
    
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (username, password) => {
        const foundUser = users.find(
            (u) => u.username === username && u.password === password
        );
        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem('user', JSON.stringify(foundUser));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); 
    };

    const register = (username, password) => {
        const existingUser = users.find((u) => u.username === username);
        if (!existingUser) {
            const newUser = { username, password };
            setUsers((prevUsers) => [...prevUsers, newUser]);
            return true;
        }
        return false; 
    };

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false); 
    }, []);
    
    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
