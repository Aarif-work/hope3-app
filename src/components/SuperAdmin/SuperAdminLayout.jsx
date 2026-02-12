import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../styles/SuperAdmin.css';

const SuperAdminLayout = ({ children, title, subtitle }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const role = localStorage.getItem('userRole') || 'SUPER_ADMIN';

    return (
        <div className="admin-layout">
            <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <main className="admin-main">
                <header className="admin-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', minWidth: 0 }}>
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setIsSidebarOpen(true)}
                            style={{
                                background: 'white',
                                border: '1px solid var(--admin-border)',
                                color: 'var(--admin-text)',
                                padding: '0.5rem',
                                borderRadius: '10px'
                            }}
                        >
                            <Menu size={22} />
                        </button>
                        <div className="admin-title" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <h1 style={{ lineHeight: 1.2 }}>{title}</h1>
                            <p style={{ margin: 0 }}>{subtitle}</p>
                        </div>
                    </div>
                    <div
                        className="admin-user-profile profile-clickable-area"
                        onClick={() => navigate('/super-admin/profile')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            cursor: 'pointer',
                            padding: '0.4rem',
                            borderRadius: '12px',
                            transition: 'all 0.2s'
                        }}
                    >
                        <div className="profile-text-hide-mobile" style={{ textAlign: 'right' }}>
                            <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>{role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin'}</p>
                            <p style={{ color: 'var(--admin-text-light)', fontSize: '0.75rem' }}>System Access</p>
                        </div>
                        <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: 'var(--admin-primary)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '0.8rem'
                        }}>
                            {role === 'SUPER_ADMIN' ? 'SA' : 'AD'}
                        </div>
                    </div>
                </header>
                <div className="admin-content">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default SuperAdminLayout;
