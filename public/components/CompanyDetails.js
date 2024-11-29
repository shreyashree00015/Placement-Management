import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import vpsLogo from './images/vps.png';
import './CompanyDetails.css';

const CompanyDetails = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [newCompany, setNewCompany] = useState({ name: '', ctc: '', role: '', location: '', rounds: '' });
    const [editCompany, setEditCompany] = useState(null); // To store company being edited
    const [isListCollapsed, setIsListCollapsed] = useState(false); // State to toggle collapse
    const navigate = useNavigate();

    const fetchCompanies = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/companies', {
                headers: {
                    'x-admin-key': 'PLMokn15', // Use your admin key here
                },
            });
            setCompanies(response.data);
        } catch (error) {
            console.error('Error fetching companies:', error);
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        navigate('/'); // Navigate to the login page
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    const handleDeleteCompany = async (companyId) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/delete-company/${companyId}`, {
                headers: {
                    'x-admin-key': 'PLMokn15', // Admin key for authentication
                },
            });
            fetchCompanies(); // Refresh the company list after deletion
        } catch (error) {
            console.error('Error deleting company:', error);
        }
    };

    const handleAddCompany = async (e) => {
        e.preventDefault();
        console.log('New Company:', newCompany); // Log the new company data
        try {
            const response = await axios.post('http://localhost:5000/api/admin/add-company', newCompany, {
                headers: {
                    'x-admin-key': 'PLMokn15', // Admin key for authentication
                },
            });
            console.log(response.data);
            setCompanies([...companies, response.data]); // Add the new company to the list
            setNewCompany({ name: '', ctc: '', role: '', location: '', rounds: '' }); // Reset the form
        } catch (error) {
            console.error('Error adding company:', error.response ? error.response.data : error.message);
        }
    };

    const handleEditCompany = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/admin/edit-company/${editCompany._id}`, editCompany, {
                headers: {
                    'x-admin-key': 'PLMokn15', // Admin key for authentication
                },
            });
            fetchCompanies(); // Refresh the company list after editing
            setEditCompany(null); // Close edit form
        } catch (error) {
            console.error('Error editing company:', error);
        }
    };

    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
    };

    const thTdStyle = {
        border: '1px solid black',
        padding: '8px',
        textAlign: 'left',
    };

    return (
        <div>
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
                    <button onClick={() => navigate('/admin-dashboard')}>Home</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
            <h2>Company Details Page</h2>

            {/* Add New Company Form */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <form onSubmit={handleAddCompany} style={{ marginBottom: '20px', width: '45%' }}>
                    <h3>Add New Company</h3>
                    <input
                        type="text"
                        placeholder="Company Name"
                        value={newCompany.name}
                        onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="CTC (₹)"
                        value={newCompany.ctc}
                        onChange={(e) => setNewCompany({ ...newCompany, ctc: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Role Offered"
                        value={newCompany.role}
                        onChange={(e) => setNewCompany({ ...newCompany, role: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Location"
                        value={newCompany.location}
                        onChange={(e) => setNewCompany({ ...newCompany, location: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Number of Rounds"
                        value={newCompany.rounds}
                        onChange={(e) => setNewCompany({ ...newCompany, rounds: e.target.value })}
                    />
                    <button type="submit">Add Company</button>
                </form>

                {/* Edit Company Form (if editCompany is not null) */}
                {editCompany && (
                    <form onSubmit={handleEditCompany} style={{ marginBottom: '20px', width: '45%' }}>
                        <h3>Edit Company</h3>
                        <input
                            type="text"
                            placeholder="Company Name"
                            value={editCompany.name}
                            onChange={(e) => setEditCompany({ ...editCompany, name: e.target.value })}
                            required
                        />
                        <input
                            type="number"
                            placeholder="CTC (₹)"
                            value={editCompany.ctc}
                            onChange={(e) => setEditCompany({ ...editCompany, ctc: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Role Offered"
                            value={editCompany.role}
                            onChange={(e) => setEditCompany({ ...editCompany, role: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            value={editCompany.location}
                            onChange={(e) => setEditCompany({ ...editCompany, location: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Number of Rounds"
                            value={editCompany.rounds}
                            onChange={(e) => setEditCompany({ ...editCompany, rounds: e.target.value })}
                        />
                        <button type="submit">Update Company</button>
                    </form>
                )}
            </div>

            {/* Collapse/Expand Button */}
            <button 
                onClick={() => setIsListCollapsed(!isListCollapsed)} 
                style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
            >
                {isListCollapsed ? 'Show Company List' : 'Hide Company List'}
            </button>

            {/* Company Table (conditionally rendered) */}
            {!isListCollapsed && companies.length > 0 && (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thTdStyle}>Company Name</th>
                            <th style={thTdStyle}>Role Offered</th>
                            <th style={thTdStyle}>CTC (₹)</th>
                            <th style={thTdStyle}>Location</th>
                            <th style={thTdStyle}>Number of Rounds</th>
                            <th style={thTdStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map((company) => (
                            <tr key={company._id}>
                                <td style={thTdStyle}>{company.name}</td>
                                <td style={thTdStyle}>{company.role || 'N/A'}</td>
                                <td style={thTdStyle}>{company.ctc}</td>
                                <td style={thTdStyle}>{company.location || 'N/A'}</td>
                                <td style={thTdStyle}>{company.rounds || 'N/A'}</td>
                                <td style={thTdStyle}>
                                    <button onClick={() => setEditCompany(company)}>Edit</button>
                                    <button onClick={() => handleDeleteCompany(company._id)} style={{ marginLeft: '10px' }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {isListCollapsed && <p>The company list is collapsed</p>}

            {/* Back Button to go to AdminDashboard */}
            <button onClick={() => navigate('/admin-dashboard')} style={{ marginTop: '20px' }}>
                Back to Dashboard
            </button>
        </div>
    );
};

export default CompanyDetails;
