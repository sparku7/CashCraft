import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useAuth(); 

    
    if (isLoading) {
        return <div>Loading...</div>; 
    }

    
    return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
