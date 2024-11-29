import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import vpsLogo from './images/vps.png';
import './LoginPage.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Clear local storage on component mount to avoid retaining previous user data
        localStorage.removeItem('name');
        localStorage.removeItem('registrationNumber');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Check if the username is an admin
            if (
                (username === 'shreyashree15' && password === 'admin') ||
                (username === 'priyanka26' && password === 'admin') ||
                (username === 'vishwash2003' && password === 'admin')
            ) {
                // Redirect to admin dashboard
                setSuccess('Login successful!');
                setError('');
                localStorage.setItem('name', username); // Store admin username
                navigate('/admin-dashboard');
            } else {
                // For non-admin users, verify against MongoDB Atlas
                const response = await axios.post('http://localhost:5000/api/admin/students', {
                    registrationNumber: username,
                    pwd: password
                });

                console.log('Response from server:', response.data); // Log response

                if (response.data.success) {
                    setSuccess('Login successful!');
                    setError('');
                    localStorage.setItem('name', response.data.name); // Save the name field from response
                    localStorage.setItem('registrationNumber', username); // Store the registration number
                    navigate('/student-dashboard'); // Redirect to student dashboard
                } else {
                    setError('Invalid credentials. Please try again.');
                    setSuccess('');
                }
            }
        } catch (error) {
            console.error('Error during login:', error.response ? error.response.data : error.message);
            setError('Error occurred during login. Please try again.');
            setSuccess('');
        }        
    };

    return (
        <div className="login-form" style={{ textAlign: 'center', position: 'relative' }}>
            {/* Image in the top left corner */}
            <img 
                src={vpsLogo} 
                alt="Logo"
                style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    width: '50px',
                    height: '50px',
                }}
            />
            <h2>VPS Login</h2>
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

export default LoginPage;
