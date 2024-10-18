import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditCompany = () => {
    const { id } = useParams(); // Get company id from route params
    const [company, setCompany] = useState({
        name: '',
        ctc: '',
        location: '',
        rounds: ''
    });
    const navigate = useNavigate();

    const fetchCompany = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/admin/company/${id}`, {
                headers: {
                    'x-admin-key': 'PLMokn15',
                },
            });
            setCompany(response.data);
        } catch (error) {
            console.error('Error fetching company:', error);
        }
    };

    const handleUpdateCompany = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/admin/update-company/${id}`, company, {
                headers: {
                    'x-admin-key': 'PLMokn15',
                },
            });
            navigate('/admin/company-details'); // Navigate back after update
        } catch (error) {
            console.error('Error updating company:', error);
        }
    };

    useEffect(() => {
        fetchCompany();
    }, [id]);

    return (
        <div>
            <h2>Edit Company</h2>
            <form onSubmit={handleUpdateCompany}>
                <input
                    type="text"
                    placeholder="Company Name"
                    value={company.name}
                    onChange={(e) => setCompany({ ...company, name: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="CTC (₹)"
                    value={company.ctc}
                    onChange={(e) => setCompany({ ...company, ctc: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={company.location}
                    onChange={(e) => setCompany({ ...company, location: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Number of Rounds"
                    value={company.rounds}
                    onChange={(e) => setCompany({ ...company, rounds: e.target.value })}
                    required
                />
                <button type="submit">Update Company</button>
            </form>
        </div>
    );
};

export default EditCompany;
