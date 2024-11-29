// JobPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import vpsLogo from './images/vps.png';
import axios from 'axios';
import './JobPage.css';

const JobPage = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const fetchCompanies = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/companies', {
                headers: {
                    'x-admin-key': 'PLMokn15', // Ensure this matches your admin key setup
                },
            });
            setCompanies(response.data);
        } catch (err) {
            setError('Error fetching companies: ' + (err.response ? err.response.data.message : err.message));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('registrationNumber');
        navigate('/');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    const handleBack = () => {
        navigate('/student-dashboard'); // Navigate to the login page
    };

    return (
        <div style={{ backgroundColor: 'white', color: 'white', minHeight: '100vh', padding: '20px' }}>
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
            {dropdownOpen && (
                <div className="dropdown">
                    <button onClick={() => navigate('/student-dashboard')}>Home</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
            <h2>Available Job Opportunities</h2>
            {companies.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {companies.map((company) => (
                        <div
                            key={company._id}
                            style={{
                                flex: '1 1 30%',
                                margin: '10px',
                                border: '1px solid #ccc',
                                padding: '10px',
                                boxSizing: 'border-box',
                                backgroundColor: 'black',
                                color: 'white',
                            }}
                        >
                            <p style={{ color: 'white' }}>
                                <strong>Company Name:</strong> {company.name}
                            </p>
                            <p style={{ color: 'white' }}>
                                <strong>Role Offered:</strong> {company.role}
                            </p>
                            <p style={{ color: 'white' }}>
                                <strong>CTC (₹):</strong> {company.ctc}
                            </p>
                            <p style={{ color: 'white' }}>
                                <strong>Location:</strong> {company.location}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No companies available at the moment.</p>
            )}

            <button
                onClick={handleBack}
                style={{
                    marginLeft: '10px',
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Back
            </button>
        </div>
    );
};

export default JobPage;
