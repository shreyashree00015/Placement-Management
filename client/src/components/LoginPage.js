import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check credentials
        if (
            (username === 'shreyashree00015' && password === 'PLMokn15') ||
            (username === 'priyanka26' && password === 'admin') ||
            (username === 'vishwash2003' && password === 'admin')
        ) {
            // Redirect to admin dashboard
            setSuccess('Login successful!');
            setError('');
            navigate('/admin-dashboard');
        } else {
            setError('Invalid credentials. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div className="login-form" style={{ textAlign: 'center' }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default Login;
