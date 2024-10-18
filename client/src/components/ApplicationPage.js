import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApplicationPage = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            const response = await axios.get('/api/student/applications');
            setApplications(response.data);
        };
        fetchApplications();
    }, []);

    return (
        <div>
            <h1>Your Applications</h1>
            <div>
                <h2>Companies Yet to Apply</h2>
                {/* Render companies list here */}
            </div>
            <div>
                <h2>Companies Applied</h2>
                {applications.map((app, index) => (
                    <div key={index}>
                        <h3>{app.companyName}</h3>
                        <p>CTC: {app.ctc}</p>
                        <p>Next Round: {app.rounds[0]}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ApplicationPage;
