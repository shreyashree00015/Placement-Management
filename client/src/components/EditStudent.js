import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditStudent = () => {
    const { id } = useParams(); // Get student id from route params
    const [student, setStudent] = useState({
        registrationNumber: '',
        name: '',
        cgpa: '',
        tenthPercent: '',
        twelfthPercent: '',
        standingArrears: '',
        branch: ''
    });
    const navigate = useNavigate();

    const fetchStudent = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/student/${id}`, {
                headers: {
                    'x-admin-key': 'PLMokn15',
                },
            });
            setStudent(response.data);
        } catch (error) {
            console.error('Error fetching student:', error);
        }
    };

    const handleUpdateStudent = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/admin/update-student/${id}`, student, {
                headers: {
                    'x-admin-key': 'PLMokn15',
                },
            });
            navigate('/admin/student-details'); // Navigate back after update
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    useEffect(() => {
        fetchStudent();
    }, [id]);

    return (
        <div>
            <h2>Edit Student</h2>
            <form onSubmit={handleUpdateStudent}>
                <input
                    type="text"
                    placeholder="Registration Number"
                    value={student.registrationNumber}
                    onChange={(e) => setStudent({ ...student, registrationNumber: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={student.name}
                    onChange={(e) => setStudent({ ...student, name: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="CGPA"
                    value={student.cgpa}
                    onChange={(e) => setStudent({ ...student, cgpa: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="10th Percentage"
                    value={student.tenthPercent}
                    onChange={(e) => setStudent({ ...student, tenthPercent: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="12th Percentage"
                    value={student.twelfthPercent}
                    onChange={(e) => setStudent({ ...student, twelfthPercent: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Standing Arrears"
                    value={student.standingArrears}
                    onChange={(e) => setStudent({ ...student, standingArrears: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Branch"
                    value={student.branch}
                    onChange={(e) => setStudent({ ...student, branch: e.target.value })}
                    required
                />
                <button type="submit">Update Student</button>
            </form>
        </div>
    );
};

export default EditStudent;
