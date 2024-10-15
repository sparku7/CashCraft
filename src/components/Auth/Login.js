import React, { useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const { login, user } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (login(username, password)) { 
            navigate('/dashboard'); 
        } else {
            setError('Invalid username or password.');
        }
    };

    const closeErrorModal = () => {
        setError('');
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <h2>Please Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>

            <p>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>

            {error && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeErrorModal}>&times;</span>
                        <p>{error}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
