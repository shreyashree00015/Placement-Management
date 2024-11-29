import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import vpsLogo from './images/vps.png';
import './Profile.css';

const Profile = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [updatedFields, setUpdatedFields] = useState({
        personalEmail: '',
        phoneNumber: '',
        address: '',
        gender: '',
        dob: '',  // Date of birth
        linkedIn: '', // LinkedIn profile
        pwd: '',
    });
    
    const [newPassword, setNewPassword] = useState(''); // Track new password input

    useEffect(() => {
        const fetchStudentDetails = async () => {
            const registrationNumber = localStorage.getItem('registrationNumber');
            try {
                const response = await axios.get(`http://localhost:5000/api/students/${registrationNumber}`);
                if (response.data.success) {
                    setStudent(response.data.student);
                    setUpdatedFields((prevFields) => ({
                        ...prevFields,
                        personalEmail: response.data.student.personalEmail || prevFields.personalEmail,
                        phoneNumber: response.data.student.phoneNumber || prevFields.phoneNumber,
                        address: response.data.student.address || prevFields.address,
                        gender: response.data.student.gender || prevFields.gender,
                        dob: response.data.student.dob || prevFields.dob,
                        linkedIn: response.data.student.linkedIn || prevFields.linkedIn,
                    }));
                } else {
                    setError('Failed to fetch student details');
                }
            } catch (err) {
                setError(err.response ? err.response.data.message : 'Error fetching student details');
            } finally {
                setLoading(false);
            }
        };

        fetchStudentDetails();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedFields((prevFields) => ({
            ...prevFields,
            [name]: value
        }));
    };

    const handlePasswordChange = (e) => {
        const { value } = e.target;
        setNewPassword(value); // Update new password state
        setUpdatedFields((prevFields) => ({
            ...prevFields,
            pwd: value
        }));
    };

    const getPasswordStrength = (password) => {
        if (password.length < 3) return { color: 'red', strength: 'Weak' };
        if (password.length >= 3 && password.length < 7) return { color: 'orange', strength: 'Medium' };
        return { color: 'green', strength: 'Strong' };
    };

    const handleSave = async () => {
        const registrationNumber = localStorage.getItem('registrationNumber');
        try {
            const fieldsToUpdate = {};

            for (const key in updatedFields) {
                if (updatedFields[key]) {
                    fieldsToUpdate[key] = updatedFields[key];
                }
            }

            if (Object.keys(fieldsToUpdate).length > 0) {
                const response = await axios.put(`http://localhost:5000/api/students/${registrationNumber}`, fieldsToUpdate);
                console.log(response.data);
                alert('Details updated successfully!');
                setStudent((prevStudent) => ({
                    ...prevStudent,
                    ...fieldsToUpdate
                }));
            } else {
                alert('No new information to update.');
            }
        } catch (err) {
            console.error('Error updating details:', err);
            const errorMessage = err.response 
                ? err.response.data.message || 'Error updating details'
                : 'Error updating details';
            setError(errorMessage);
        }
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
    const handleBack = () => {
        navigate('/student-dashboard'); // Navigate to the login page
    };

    const { color, strength } = getPasswordStrength(newPassword); // Get password strength

    return (
        <div className="profile">
            <h2>Student Profile</h2>
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

            {student ? (
                <div className="profile-details">
                    <p><strong>Name:</strong> {student.name}</p>
                    <p><strong>Registration Number:</strong> {student.registrationNumber}</p>
                    <p><strong>CGPA:</strong> {student.cgpa}</p>
                    <p><strong>Branch:</strong> {student.branch}</p>
                    <p><strong>12%:</strong> {student.tenthPercent}</p>
                    <p><strong>10%:</strong> {student.twelfthPercent}</p>
                    <p><strong>Arrears:</strong> {student.standingArrears}</p>

                    {/* Additional Fields */}
                    <label>
                        <p>
                            <strong>Personal Email: </strong>
                            <input
                                type="email"
                                name="personalEmail"
                                value={updatedFields.personalEmail}
                                onChange={handleInputChange}
                                placeholder="Enter your personal email"
                            />
                        </p>
                    </label>
                    <label>
                        <p>
                            <strong>Phone Number: </strong>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={updatedFields.phoneNumber}
                                onChange={handleInputChange}
                                placeholder="Enter your phone number"
                            />
                        </p>
                    </label>
                    <label>
                        <p>
                            <strong>Address: </strong>
                            <input
                                type="text"
                                name="address"
                                value={updatedFields.address}
                                onChange={handleInputChange}
                                placeholder="Enter your address"
                            />
                        </p>
                    </label>
                    <label>
                        <p>
                            <strong>Gender: </strong>
                            <input
                                type="text"
                                name="gender"
                                value={updatedFields.gender}
                                onChange={handleInputChange}
                                placeholder="Enter your gender"
                            />
                        </p>
                    </label>
                    <label>
                        <p>
                            <strong>Date of Birth: </strong>
                            <input
                                type="date"
                                name="dob"
                                value={updatedFields.dob}
                                onChange={handleInputChange}
                            />
                        </p>
                    </label>
                    <label>
                        <p>
                            <strong>LinkedIn Profile: </strong>
                            <input
                                type="url"
                                name="linkedIn"
                                value={updatedFields.linkedIn}
                                onChange={handleInputChange}
                                placeholder="Enter your LinkedIn profile URL"
                            />
                        </p>
                    </label>
                    <label>
                        <p>
                            <strong>New Password: </strong>
                            <input
                                type="text"
                                name="pwd"
                                value={newPassword} // Use newPassword state for input value
                                onChange={handlePasswordChange} // Use the new handler
                                placeholder="Enter new password"
                            />
                            <div style={{
                                height: '5px',
                                width: '100%',
                                backgroundColor: color,
                                marginTop: '5px'
                            }} />
                            <p style={{ color }}>{strength}</p>
                        </p>
                    </label>

                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <p>No student details found.</p>
            )}
            <button onClick={handleBack} style={{ marginLeft: '10px' }}>Back</button>
        </div>
    );
};

export default Profile;
