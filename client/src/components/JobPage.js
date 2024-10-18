import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobPage = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('/api/jobs'); // Adjust this URL based on your backend
                setJobs(response.data); // Use the response data
            } catch (error) {
                setError('Failed to fetch jobs.');
            }
        };

        fetchJobs();
    }, []);

    return (
        <div>
            <h2>Job Listings</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {jobs.length > 0 ? (
                    jobs.map((job) => (
                        <li key={job.id}>{job.title}</li> // Adjust based on your job object structure
                    ))
                ) : (
                    <li>No jobs available</li>
                )}
            </ul>
        </div>
    );
};

export default JobPage;
