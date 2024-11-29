import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import vpsLogo from './images/vps.png';

const StudentDetails = () => {
    const [students, setStudents] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [newStudent, setNewStudent] = useState({
        registrationNumber: '',
        name: '',
        branch: '',
        cgpa: '',
        tenthPercent: '',
        twelfthPercent: '',
        standingArrears: ''
    });
    const [editStudent, setEditStudent] = useState(null);
    const navigate = useNavigate();

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/students', {
                headers: {
                    'x-admin-key': 'PLMokn15', // Use your admin key here
                },
            });
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        navigate('/'); // Navigate to the login page
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleDeleteStudent = async (studentId) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/delete-student/${studentId}`, {
                headers: {
                    'x-admin-key': 'PLMokn15', // Admin key for authentication
                },
            });
            fetchStudents(); // Refresh the student list after deletion
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const handleAddStudent = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/admin/add-student', newStudent, {
                headers: {
                    'x-admin-key': 'PLMokn15', // Admin key for authentication
                },
            });
            setStudents([...students, response.data]); // Add the new student to the list
            setNewStudent({ registrationNumber: '', name: '', branch: '', cgpa: '', tenthPercent: '', twelfthPercent: '', standingArrears: '' }); // Reset the form
        } catch (error) {
            console.error('Error adding student:', error.response ? error.response.data : error.message);
        }
    };

    const handleEditStudent = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/admin/edit-student/${editStudent._id}`, editStudent, {
                headers: {
                    'x-admin-key': 'PLMokn15', // Admin key for authentication
                },
            });
            setStudents(students.map(student => student._id === editStudent._id ? response.data : student)); // Update the edited student in the list
            setEditStudent(null); // Close edit form
        } catch (error) {
            console.error('Error editing student:', error.response ? error.response.data : error.message);
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
            <h1> - </h1>
            <h2>Student Details Page</h2>

            {/* Add New Student Form */}
            <form onSubmit={handleAddStudent} style={{ marginBottom: '20px' }}>
                <h3>Add New Student</h3>
                <input
                    type="text"
                    placeholder="Registration Number"
                    value={newStudent.registrationNumber}
                    onChange={(e) => setNewStudent({ ...newStudent, registrationNumber: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Branch"
                    value={newStudent.branch}
                    onChange={(e) => setNewStudent({ ...newStudent, branch: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="CGPA"
                    value={newStudent.cgpa}
                    onChange={(e) => setNewStudent({ ...newStudent, cgpa: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="10th Percent"
                    value={newStudent.tenthPercent}
                    onChange={(e) => setNewStudent({ ...newStudent, tenthPercent: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="12th Percent"
                    value={newStudent.twelfthPercent}
                    onChange={(e) => setNewStudent({ ...newStudent, twelfthPercent: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Standing Arrears"
                    value={newStudent.standingArrears}
                    onChange={(e) => setNewStudent({ ...newStudent, standingArrears: e.target.value })}
                />
                <button type="submit">Add Student</button>
            </form>

            {/* Edit Student Form (if editStudent is not null) */}
            {editStudent && (
                <form onSubmit={handleEditStudent} style={{ marginBottom: '20px' }}>
                    <h3>Edit Student</h3>
                    <input
                        type="text"
                        placeholder="Registration Number"
                        value={editStudent.registrationNumber}
                        onChange={(e) => setEditStudent({ ...editStudent, registrationNumber: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Name"
                        value={editStudent.name}
                        onChange={(e) => setEditStudent({ ...editStudent, name: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Branch"
                        value={editStudent.branch}
                        onChange={(e) => setEditStudent({ ...editStudent, branch: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="CGPA"
                        value={editStudent.cgpa}
                        onChange={(e) => setEditStudent({ ...editStudent, cgpa: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="10th Percent"
                        value={editStudent.tenthPercent}
                        onChange={(e) => setEditStudent({ ...editStudent, tenthPercent: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="12th Percent"
                        value={editStudent.twelfthPercent}
                        onChange={(e) => setEditStudent({ ...editStudent, twelfthPercent: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Standing Arrears"
                        value={editStudent.standingArrears}
                        onChange={(e) => setEditStudent({ ...editStudent, standingArrears: e.target.value })}
                    />
                    <button type="submit">Update Student</button>
                </form>
            )}

            {/* Student Table */}
            {students.length > 0 ? (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thTdStyle}>Registration Number</th>
                            <th style={thTdStyle}>Name</th>
                            <th style={thTdStyle}>Branch</th>
                            <th style={thTdStyle}>CGPA</th>
                            <th style={thTdStyle}>10th Percent</th>
                            <th style={thTdStyle}>12th Percent</th>
                            <th style={thTdStyle}>Standing Arrears</th>
                            <th style={thTdStyle}>Actions</th> {/* Column for actions like Delete */}
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student._id}>
                                <td style={thTdStyle}>{student.registrationNumber}</td>
                                <td style={thTdStyle}>{student.name}</td>
                                <td style={thTdStyle}>{student.branch}</td>
                                <td style={thTdStyle}>{student.cgpa}</td>
                                <td style={thTdStyle}>{student.tenthPercent}%</td>
                                <td style={thTdStyle}>{student.twelfthPercent}%</td>
                                <td style={thTdStyle}>{student.standingArrears}</td>
                                <td style={thTdStyle}>
                                    <button onClick={() => setEditStudent(student)}>Edit</button>
                                    <button onClick={() => handleDeleteStudent(student._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No students found.</p>
            )}
        </div>
    );
};

export default StudentDetails;
