
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import StudentDetails from './components/StudentDetails';
import CompanyDetails from './components/CompanyDetails';
import LoginPage from './components/LoginPage';
// import EditProfilePage from './components/EditProfilePage';
import ApplicationPage from './components/ApplicationPage'; //client side
import JobPage from './components/JobPage';
import './App.css';
import Profile from './components/Profile';
import Applications from './components/Applications'; //admin side
import LandingPage from './components/landing_page/LandingPage';

function App() {
  return (
    <Router>{/*how to comment*/}
      <Routes>
      <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/student-details" element={<StudentDetails />} />
        <Route path="/admin/company-details" element={<CompanyDetails />} />
        {/* <Route path="/edit-profile" element={<EditProfilePage />} /> */}
        <Route path="/applications" element={<ApplicationPage />} />
        <Route path="/jobs" element={<JobPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/applications" element={<ApplicationPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/applications" element={<Applications />} /> {/* Add this line */}
      </Routes>
    </Router>
  );
}

export default App;