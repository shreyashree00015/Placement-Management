import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import vpsLogo from './images/vps.png';
import axios from 'axios';
import * as XLSX from 'xlsx'; // Import xlsx library
import './Applications.css'; // Import the CSS file


const Applications = () => {
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };


    const handleLogout = () => {
        navigate('/'); // Navigate to the login page
    };

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/admin/companies', {
                    headers: {
                        'x-admin-key': 'PLMokn15',
                    },
                });
                setCompanies(response.data);
            } catch (err) {
                console.error('Error fetching companies:', err);
            }
        };

        fetchCompanies();
    }, []);

    const handleCompanyClick = async (companyName) => {
        setSelectedCompany(companyName);
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/applications/${companyName}`);
            setStudents(response.data);
        } catch (err) {
            console.error('Error fetching students:', err);
        }
    };

    const downloadExcel = () => {
        const filteredStudents = students.map(({ pwd, applications, ...rest }) => rest);
        const worksheet = XLSX.utils.json_to_sheet(filteredStudents);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, selectedCompany);
        XLSX.writeFile(workbook, `${selectedCompany}_students.xlsx`);
    };

    return (
        <div className="applications-container">
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
            <div className="companies-list">
                <h2>Companies</h2>
                <div className="company-items">
                    {companies.map((company) => (
                        <div 
                            key={company._id} 
                            className="company-item" 
                            onClick={() => handleCompanyClick(company.name)}
                        >
                            {company.name}
                            <button className="download-button" onClick={downloadExcel}>Download</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="students-info">
                <h2>Students Applied to {selectedCompany || 'Company'}</h2>
                {selectedCompany && (
                    <div className="students-list">
                        {students.length > 0 ? (
                            students.map((student) => (
                                <div key={student.registrationNumber} className="student-card">
                                    <p><strong>Name:</strong> {student.name}</p>
                                    <p><strong>Registration Number:</strong> {student.registrationNumber}</p>
                                    <p><strong>Branch:</strong> {student.branch}</p>
                                    <p><strong>CGPA:</strong> {student.cgpa}</p>
                                    <p><strong>10th Percent:</strong> {student.tenthPercent}</p>
                                    <p><strong>12th Percent:</strong> {student.twelfthPercent}</p>
                                    <p><strong>Standing Arrears:</strong> {student.standingArrears ? 'Yes' : 'No'}</p>
                                </div>
                            ))
                        ) : (
                            <p>No students have applied to this company yet.</p>
                        )}
                    </div>
                )}
            </div>
            
        </div>
    );
};

export default Applications;
