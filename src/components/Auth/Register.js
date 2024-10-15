import React, { useState } from 'react';
import { useAuth } from '../Auth/AuthContext'; 
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { register } = useAuth(); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const success = register(username, password); 
        if (success) {
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
