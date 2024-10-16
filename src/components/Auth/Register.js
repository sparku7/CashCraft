import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const register = async (username, password) => {
        try {
            const response = await fetch('http://localhost:1010/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: username,
                    password: password,
                }),
            });

            if (response.ok) {
                return true;
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Registration failed!');
                return false; 
            }
        } catch (err) {
            setError('An error occurred while registering!');
            return false;
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const isSuccess = await register(username, password); 
        if (isSuccess) {
            setSuccess(true);
        } else {
            setError("Username already exists!"); 
        }
    };

    const closeErrorModal = () => {
        setError(''); 
    };

    const closeSuccessModal = () => {
        setSuccess(false); 
        navigate('/'); 
    };

    return (
        <div>
            <form onSubmit={handleRegister}>
                <h2>Register</h2>
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
                <button type="submit">Register</button>
            </form>

            {error && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeErrorModal}>&times;</span>
                        <p>{error}</p>
                    </div>
                </div>
            )}

            {success && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeSuccessModal}>&times;</span>
                        <p>User registered successfully!</p>
                        <button onClick={closeSuccessModal}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;
