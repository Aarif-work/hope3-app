import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import StudentAdmission from './pages/StudentAdmission';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import DonorDashboard from './pages/DonorDashboard';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/apply" element={<StudentAdmission />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/donor-dashboard" element={<DonorDashboard />} />
    </Routes>
  );
}

export default App;
