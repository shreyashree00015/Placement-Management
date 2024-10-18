import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    academicDetails: '',
    achievements: ''
  });

  useEffect(() => {
    // Fetch the profile data on component mount
    const fetchProfile = async () => {
      const response = await axios.get('/api/student/profile');
      setProfile(response.data);
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/student/profile/edit', profile);
    alert('Profile Updated');
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={profile.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Academic Details:
          <input type="text" name="academicDetails" value={profile.academicDetails} onChange={handleChange} />
        </label>
        <br />
        <label>
          Achievements:
          <input type="text" name="achievements" value={profile.achievements} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfilePage;
