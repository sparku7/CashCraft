import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([ 
        { username: 'testuser', password: 'password123' },
        { username: 'admin', password: 'adminpass' },
    ]);

    const login = (username, password) => {
        const foundUser = users.find(
            (u) => u.username === username && u.password === password
        );
        if (foundUser) {
            setUser(foundUser);
            return true;
        }
        return false;
    };

    const logout = () => setUser(null);

    const register = (username, password) => {
        const existingUser = users.find((u) => u.username === username);
        if (!existingUser) {
            const newUser = { username, password };
            setUsers((prevUsers) => [...prevUsers, newUser]);
            return true;
        }
        return false; 
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
