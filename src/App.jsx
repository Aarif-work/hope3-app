import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import StudentAdmission from './pages/StudentAdmission';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import DonorDashboard from './pages/DonorDashboard';
import LoadingScreen from './components/LoadingScreen';

// Super Admin Pages
import SuperAdminDashboard from './pages/SuperAdmin/Dashboard';
import StudentManagement from './pages/SuperAdmin/StudentManagement';
import AppliedStudents from './pages/SuperAdmin/AppliedStudents';
import AdminsPage from './pages/SuperAdmin/Admins';
import DonorsPage from './pages/SuperAdmin/Donors';
import AcademicDetails from './pages/SuperAdmin/AcademicDetails';
import ReportsPage from './pages/SuperAdmin/Reports';
import SettingsPage from './pages/SuperAdmin/Settings';

import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Show loading only on the initial mount
  useEffect(() => {
    // The LoadingScreen component manages its own completion via progress
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
      ) : (
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/apply" element={<StudentAdmission />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/donor-dashboard" element={<DonorDashboard />} />

          {/* Super Admin Routes */}
          <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
          <Route path="/super-admin/students" element={<StudentManagement />} />
          <Route path="/super-admin/applied" element={<AppliedStudents />} />
          <Route path="/super-admin/admins" element={<AdminsPage />} />
          <Route path="/super-admin/donors" element={<DonorsPage />} />
          <Route path="/super-admin/academic" element={<AcademicDetails />} />
          <Route path="/super-admin/reports" element={<ReportsPage />} />
          <Route path="/super-admin/settings" element={<SettingsPage />} />
        </Routes>
      )}
    </AnimatePresence>
  );
}

export default App;
