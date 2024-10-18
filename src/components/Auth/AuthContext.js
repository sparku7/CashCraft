import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false); 
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:1010/auth/login', {
                name: username,
                password: password,
            });

            if (response.data.statusCode === 200) {
                const token = response.data.token;
                const decoded = jwtDecode(token); 
                const loggedUser = { 
                    username: decoded.sub, 
                    role: response.data.role,
                    token: token 
                };
                setUser(loggedUser);
                localStorage.setItem('user', JSON.stringify(loggedUser)); 
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); 
        localStorage.removeItem('hasSeenTip');
    };

    const isAuthenticated = user !== null; 

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
