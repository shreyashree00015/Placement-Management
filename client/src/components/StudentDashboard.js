import React from 'react';
import { Link } from 'react-router-dom';
import './StudentDashboard.css'; // Include styling to match theme

const StudentDashboard = () => {
    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Welcome to the Placement Portal</h1>
            </header>
            <div className="dashboard-cards">
                <Link to="/profile" className="card">
                    <h2>My Profile</h2>
                    <p>View and edit your profile information.</p>
                </Link>
                <Link to="/jobs" className="card">
                    <h2>Jobs</h2>
                    <p>Explore and apply for available jobs.</p>
                </Link>
                <Link to="/applications" className="card">
                    <h2>Applications</h2>
                    <p>View the status of your applications.</p>
                </Link>
            </div>
        </div>
    );
};

export default StudentDashboard;
