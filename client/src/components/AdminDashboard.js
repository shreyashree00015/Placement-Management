import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

const AdminDashboard = () => {
    const navigate = useNavigate(); // Initialize the useNavigate hook

    // Handlers to navigate to student and company details
    const handleStudentDetails = () => {
        navigate('/admin/student-details');
    };

    const handleCompanyDetails = () => {
        navigate('/admin/company-details');
    };

    const handleLogout = () => {
        navigate('/'); // Navigate to the login page
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            
            <button onClick={handleStudentDetails}>Go to Student Details</button>
            <button onClick={handleCompanyDetails}>Go to Company Details</button>
            <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Log Out</button>
        </div>
    );
};

export default AdminDashboard;
