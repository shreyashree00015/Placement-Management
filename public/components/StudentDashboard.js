// StudentDashboard.js
import React, { useEffect, useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import './StudentDashboard.css';
import vpsLogo from './images/vps.png';
import axios from 'axios';

const StudentDashboard = () => {
    const [studentDetails, setStudentDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const fetchStudentDetails = async (registrationNumber) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/students/${registrationNumber}`);
            if (response.data.success) {
                setStudentDetails(response.data.student);
            } else {
                setError('Failed to fetch student details.');
            }
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Error fetching student details.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const registrationNumber = localStorage.getItem('registrationNumber');
        if (registrationNumber) {
            fetchStudentDetails(registrationNumber);
        } else {
            setError('No registration number found. Please log in again.');
            setLoading(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('registrationNumber');
        navigate('/');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    return (
        <div className="dashboard">
            <Link to="/student-dashboard">
                <img 
                    src={vpsLogo} 
                    alt="Logo"
                    style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        width: '50px',
                        height: '50px',
                        cursor: 'pointer'
                    }}
                    onClick={toggleDropdown}
                />
            </Link>
            {dropdownOpen && (
                <div className="dropdown">
                    <button onClick={() => navigate('/student-dashboard')}>Home</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
            <header className="dashboard-header">
                <h1>Welcome, {studentDetails?.name || 'User'}!</h1>
            </header>
            <div className="dashboard-cards" style={{ backgroundColor: 'black', padding: '20px', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                <Link to="/profile" className="card" style={{ backgroundColor: '#333', color: 'white', padding: '20px', margin: '10px', borderRadius: '8px', textDecoration: 'none' }}>
                    <h2>My Profile</h2>
                    <p>View and edit your profile information.</p>
                </Link>
                <Link to="/jobs" className="card" style={{ backgroundColor: '#333', color: 'white', padding: '20px', margin: '10px', borderRadius: '8px', textDecoration: 'none' }}>
                    <h2>Jobs</h2>
                    <p>Explore available jobs.</p>
                </Link>
                <Link to="/applications" className="card" style={{ backgroundColor: '#333', color: 'white', padding: '20px', margin: '10px', borderRadius: '8px', textDecoration: 'none' }}>
                    <h2>Applications</h2>
                    <p>Apply for Available Jobs.</p>
                </Link>
                </div>

        </div>
    );
};

export default StudentDashboard;
