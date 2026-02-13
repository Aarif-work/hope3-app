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
    X,
    Wallet
} from 'lucide-react';
import logo from '../../assets/hope logo.png';
import '../../styles/SuperAdmin.css';

const AdminSidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const role = localStorage.getItem('userRole') || 'SUPER_ADMIN'; // Default to Super Admin if not set for dev

    const allMenuItems = [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/super-admin/dashboard' },
        { label: 'Students Management', icon: Users, path: '/super-admin/students' },
        { label: 'Applied Students', icon: ClipboardList, path: '/super-admin/applied' },
        { label: 'Admins', icon: ShieldCheck, path: '/super-admin/admins', sensitive: true },
        { label: 'Donors', icon: HeartHandshake, path: '/super-admin/donors' },
        { label: 'Fund Usage', icon: Wallet, path: '/super-admin/fund-usage' },
        { label: 'Academic Details', icon: GraduationCap, path: '/super-admin/academic', sensitive: true },
        { label: 'Reports', icon: FileBarChart, path: '/super-admin/reports' },
        { label: 'Settings', icon: Settings, path: '/super-admin/settings', sensitive: true },
    ];

    // Filter menu items based on role
    const menuItems = role === 'ADMIN'
        ? allMenuItems.filter(item => !item.sensitive)
        : allMenuItems;

    const handleLogout = () => {
        localStorage.removeItem('userRole');
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
                    <div
                        className="admin-sidebar-logo"
                        onClick={() => handleNavigation('/')}
                        style={{
                            margin: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.85rem',
                            padding: '0 0.25rem'
                        }}
                    >
                        <img
                            src={logo}
                            alt="HOPE3"
                            style={{
                                height: '38px',
                                width: 'auto',
                                objectFit: 'contain',
                                display: 'block'
                            }}
                        />
                        <span style={{
                            fontSize: '1.2rem',
                            fontWeight: 900,
                            color: '#1e293b',
                            letterSpacing: '-0.03em',
                            whiteSpace: 'nowrap',
                            lineHeight: 1,
                            display: 'flex',
                            alignItems: 'baseline'
                        }}>
                            HOPE3 <span style={{ color: 'var(--admin-primary)', marginLeft: '0.35rem' }}>Academy</span>
                        </span>
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
