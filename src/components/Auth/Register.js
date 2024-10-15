import React, { useState } from 'react';
import { useAuth } from '../Auth/AuthContext'; 
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { register } = useAuth(); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const success = register(username, password); 
        if (success) {
            console.log("User registered:", username);
            navigate('/'); 
        } else {
            alert("Username already exists!"); 
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
