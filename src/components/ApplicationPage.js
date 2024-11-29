import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import vpsLogo from './images/vps.png';
import axios from 'axios';
import './ApplicationPage.css';

const ApplicationPage = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]); // State for companies
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(''); // Error state

    // Fetch companies from API
    const fetchCompanies = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/companies', {
                headers: {
                    'x-admin-key': 'PLMokn15',
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
        fetchCompanies(); // Fetch companies when component mounts
    }, []);

    const handleApply = async (companyName) => {
        try {
            const studentId = localStorage.getItem('registrationNumber'); // Assume registration number is used as ID
            const response = await axios.patch(`http://localhost:5000/api/student/applications/${studentId}`, {
                companyName: companyName,
                status: 'applied', // or 'yes' as per your requirement
            });
            if (response.status === 200) {
                alert('Applied successfully to ' + companyName);
            }
        } catch (err) {
            setError('Error applying: ' + (err.response ? err.response.data.message : err.message));
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleBack = () => {
        navigate('/student-dashboard');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    return (
        <div>
            <h1>Your Applications</h1>
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
                    <button onClick={() => {
                        localStorage.removeItem('name');
                        localStorage.removeItem('registrationNumber');
                        navigate('/');
                    }}>Logout</button>
                </div>
            )}

            <h2>Available Job Opportunities</h2>
            {companies.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {companies.map((company) => (
                    <div
                        key={company._id}
                        style={{
                            margin: '10px',
                            border: '1px solid #ccc',
                            padding: '10px',
                            boxSizing: 'border-box',
                            backgroundColor: 'black', // Set background color to black
                            color: 'white'  // Set text color to white
                        }}
                    >
                        <p style={{ color: 'white' }}><strong>Company Name:</strong> {company.name}</p>
                        <p style={{ color: 'white' }}><strong>Role Offered:</strong> {company.role}</p>
                        <p style={{ color: 'white' }}><strong>CTC (₹):</strong> {company.ctc}</p>
                        <p style={{ color: 'white' }}><strong>Location:</strong> {company.location}</p>
                        <button onClick={() => handleApply(company.name)} style={{ color: 'white', backgroundColor: 'black', border: '1px solid white' }}>Apply</button>
                    </div>
                ))}
            </div>
            
            ) : (
                <p>No companies available at the moment.</p>
            )}
            
            <button onClick={handleBack} style={{ marginLeft: '10px' }}>Back</button>
        </div>
    );
};

export default ApplicationPage;
