import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart,
    LogOut,
    Menu,
    Shield,
    LayoutDashboard,
    History,
    HelpCircle,
    User,
    GraduationCap,
    Activity
} from 'lucide-react';

import logo from '../../assets/hope logo.png';

const DonorLayout = ({ title, subtitle, children, activeTab, onTabChange }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navItems = [
        { id: 'overview', label: 'Dashboard', icon: LayoutDashboard, path: '/donor-dashboard' },
        { id: 'students', label: 'Students', icon: GraduationCap, path: '/donor-dashboard' },
        { id: 'impact', label: 'Our Impact', icon: Heart, path: '/donor-dashboard' },
        { id: 'donations', label: 'History', icon: History, path: '/donor-dashboard' },
        { id: 'support', label: 'Support', icon: HelpCircle, path: '/donor-dashboard' },
    ];

    const currentTab = activeTab || 'overview';

    const handleNavClick = (item) => {
        setIsSidebarOpen(false);
        if (location.pathname === item.path) {
            if (onTabChange) onTabChange(item.id);
        } else {
            // If we are on a different page (like profile), navigate to dashboard with that tab
            // For now, simple navigation
            navigate(item.path, { state: { activeTab: item.id } });
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex' }}>
            {/* Sidebar Overlay for Mobile */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        style={{
                            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 90,
                            backdropFilter: 'blur(4px)'
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <div
                className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}
                style={{
                    width: '280px', background: 'white', borderRight: '1px solid #e2e8f0',
                    padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column',
                    position: 'fixed', height: '100vh', left: 0, top: 0,
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: 100,
                    transform: window.innerWidth <= 1024 && !isSidebarOpen ? 'translateX(-100%)' : 'translateX(0)'
                }}
            >
                <div
                    className="nav-logo"
                    style={{ marginBottom: '3.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                >
                    <img src={logo} alt="HOPE3 Logo" style={{ height: '36px' }} />
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', letterSpacing: '-0.02em' }}>
                        HOPE3 <span style={{ color: 'var(--primary)' }}>DONOR</span>
                    </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => handleNavClick(item)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1.2rem', borderRadius: '12px', textAlign: 'left',
                                background: (location.pathname === item.path && currentTab === item.id) ? 'var(--primary)' : 'transparent',
                                color: (location.pathname === item.path && currentTab === item.id) ? 'white' : 'var(--text-muted)',
                                fontWeight: '700', fontSize: '0.9rem', border: 'none', cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            <item.icon size={20} /> {item.label}
                        </button>
                    ))}
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <button
                        onClick={() => window.open('https://hope3.org/donate', '_blank')}
                        className="btn-premium"
                        style={{
                            width: '100%', padding: '0.8rem', borderRadius: '12px',
                            fontSize: '0.9rem', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', gap: '0.75rem', boxShadow: '0 4px 12px rgba(0, 209, 193, 0.2)'
                        }}
                    >
                        <Heart size={18} /> Donate Again
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1.2rem',
                            color: '#ef4444', fontWeight: '700', background: 'none', border: 'none',
                            cursor: 'pointer', width: '100%', borderRadius: '12px', transition: 'all 0.2s'
                        }}
                        className="btn-ghost"
                    >
                        <LogOut size={18} /> Sign Out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <main style={{
                flex: 1,
                marginLeft: window.innerWidth <= 1024 ? 0 : '280px',
                padding: window.innerWidth <= 768 ? '1.5rem' : '2.5rem',
                minWidth: 0
            }}>
                <header style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    marginBottom: '2.5rem', gap: '1.5rem', flexWrap: 'wrap'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            style={{
                                display: window.innerWidth <= 1024 ? 'flex' : 'none',
                                background: 'white', border: '1px solid #e2e8f0', padding: '0.5rem', borderRadius: '8px', color: 'var(--text-muted)'
                            }}
                        >
                            <Menu size={20} />
                        </button>
                        <div>
                            <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#111827', textTransform: 'capitalize' }}>
                                {title || 'Dashboard'}
                            </h1>
                            {subtitle && (
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ textAlign: 'right', display: window.innerWidth <= 640 ? 'none' : 'block' }}>
                            <p style={{ fontSize: '0.85rem', fontWeight: 800, margin: 0 }}>Feb 2026</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--primary)', margin: 0, fontWeight: 700 }}>Platinum ID: #D-2024</p>
                        </div>
                        <div
                            onClick={() => navigate('/donor-profile')}
                            style={{
                                width: '44px', height: '44px', borderRadius: '12px', background: 'white',
                                border: location.pathname === '/donor-profile' ? '2px solid var(--primary)' : '1px solid #e2e8f0',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: location.pathname === '/donor-profile' ? 'var(--primary)' : 'var(--text-muted)',
                                cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.03)'
                            }}
                        >
                            <User size={20} />
                        </div>
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    {children}
                </AnimatePresence>

                <footer style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>
                            <Shield size={14} /> SSL Secured
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>
                            <Activity size={14} /> 24/7 Monitoring
                        </div>
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600 }}>
                        © 2026 HOPE3 Foundation. All rights reserved.
                    </div>
                </footer>
            </main>

            <style jsx>{`
                @media (max-width: 1024px) {
                    .admin-sidebar {
                        transform: translateX(${isSidebarOpen ? '0' : '-100%'}) !important;
                    }
                    main {
                        margin-left: 0 !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default DonorLayout;
