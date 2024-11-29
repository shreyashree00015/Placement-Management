import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import vpsLogo from './images/vps.png';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);


    const handleStudentDetails = () => {
        navigate('/admin/student-details');
    };

    const handleCompanyDetails = () => {
        navigate('/admin/company-details');
    };

    const handleApplicationPage = () => {
        navigate('/admin/applications'); // Navigate to the application page
    };
    
    

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };


    const handleLogout = () => {
        navigate('/'); // Navigate to the login page
    };
    

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <Link to="/admin-dashboard">
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
            <p>
            <button onClick={handleStudentDetails}>Go to Student Details</button>
            <button onClick={handleCompanyDetails}>Go to Company Details</button>  
            </p>
            <p>
            <button onClick={handleApplicationPage}>Go to Applications</button>
            <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Log Out</button>
                
            </p>
        </div>
    );
};

export default AdminDashboard;
