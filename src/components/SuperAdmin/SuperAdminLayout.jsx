import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { Menu, X } from 'lucide-react';
import '../../styles/SuperAdmin.css';

const SuperAdminLayout = ({ children, title, subtitle }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="admin-layout">
            <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <main className="admin-main">
                <header className="admin-header">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setIsSidebarOpen(true)}
                            style={{ background: 'none', color: 'var(--admin-text)' }}
                        >
                            <Menu size={24} />
                        </button>
                        <div className="admin-title">
                            <h1>{title}</h1>
                            <p>{subtitle}</p>
                        </div>
                    </div>
                    <div className="admin-user-profile" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>Super Admin</p>
                            <p style={{ color: 'var(--admin-text-light)', fontSize: '0.75rem' }}>System Access</p>
                        </div>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'var(--admin-primary)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700
                        }}>
                            SA
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
