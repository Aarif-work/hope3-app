import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    ClipboardList,
    ShieldCheck,
    HeartHandshake,
    GraduationCap,
    FileBarChart,
    Settings,
    LogOut,
    X
} from 'lucide-react';
import logo from '../../assets/hope logo.png';
import '../../styles/SuperAdmin.css';

const AdminSidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/super-admin/dashboard' },
        { label: 'Students Management', icon: Users, path: '/super-admin/students' },
        { label: 'Applied Students', icon: ClipboardList, path: '/super-admin/applied' },
        { label: 'Admins', icon: ShieldCheck, path: '/super-admin/admins' },
        { label: 'Donors', icon: HeartHandshake, path: '/super-admin/donors' },
        { label: 'Academic Details', icon: GraduationCap, path: '/super-admin/academic' },
        { label: 'Reports', icon: FileBarChart, path: '/super-admin/reports' },
        { label: 'Settings', icon: Settings, path: '/super-admin/settings' },
    ];

    const handleLogout = () => {
        // Add logout logic here
        navigate('/login');
    };

    const handleNavigation = (path) => {
        navigate(path);
        if (onClose) onClose();
    };

    return (
        <>
            {/* Backdrop for mobile */}
            {isOpen && <div className="admin-sidebar-overlay" onClick={onClose}></div>}

            <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <div className="admin-sidebar-logo" onClick={() => handleNavigation('/')} style={{ margin: 0 }}>
                        <img src={logo} alt="HOPE3" />
                    </div>
                    <button className="mobile-close-btn" onClick={onClose} style={{ background: 'none' }}>
                        <X size={24} />
                    </button>
                </div>

                <nav className="admin-nav">
                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => handleNavigation(item.path)}
                            className={`admin-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="admin-sidebar-footer">
                    <button
                        onClick={handleLogout}
                        className="admin-nav-item logout-btn"
                        style={{ color: '#ef4444' }}
                    >
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
