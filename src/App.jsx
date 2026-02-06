import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import StudentAdmission from './pages/StudentAdmission';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import DonorDashboard from './pages/DonorDashboard';
import LoadingScreen from './components/LoadingScreen';
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
        </Routes>
      )}
    </AnimatePresence>
  );
}

export default App;
