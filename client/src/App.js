
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import StudentDetails from './components/StudentDetails';
import CompanyDetails from './components/CompanyDetails';
import LoginPage from './components/LoginPage';
import EditProfilePage from './components/EditProfilePage';
import ApplicationPage from './components/ApplicationPage';
import JobPage from './components/JobPage';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginPage />} /> {/* Updated to use the new Login component */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin/student-details" element={<StudentDetails />} />
        <Route path="/admin/company-details" element={<CompanyDetails />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/applications" element={<ApplicationPage />} />
        <Route path="/jobs" element={<JobPage />} />
      </Routes>
    </Router>
  );
}

export default App;
