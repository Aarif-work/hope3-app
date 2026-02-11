import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Users,
    UserPlus,
    Search,
    Filter,
    CheckCircle,
    XCircle,
    FileText,
    LogOut,
    ChevronRight,
    UserCheck,
    Menu
} from 'lucide-react';

import logo from '../assets/hope logo.png';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('applications');
    const [searchTerm, setSearchTerm] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [applications, setApplications] = useState([
        { id: 'HOPE3-2026-001', name: 'Alisa Martin', course: 'UX/UI Design', date: '2026-02-05', status: 'Applied' },
        { id: 'HOPE3-2026-002', name: 'Robert Fox', course: 'Web Development', date: '2026-02-04', status: 'Applied' },
        { id: 'HOPE3-2026-003', name: 'Jenny Wilson', course: 'Data Science', date: '2026-02-03', status: 'Applied' },
    ]);

    const handleAction = (id, newStatus) => {
        setApplications(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
    };

    return (
        <div className="admin-dashboard-root" style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex' }}>
            {/* Sidebar Overlay for Mobile */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    style={{
                        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 90,
                        backdropFilter: 'blur(4px)'
                    }}
                />
            )}

            {/* Sidebar */}
            <div style={{
                width: '280px', background: 'white', borderRight: '1px solid #e2e8f0', padding: '2.5rem 1.5rem',
                display: 'flex', flexDirection: 'column',
                position: 'fixed', height: '100vh', left: 0, top: 0,
                transition: 'transform 0.3s ease',
                transform: `translateX(${isSidebarOpen ? '0' : window.innerWidth <= 1024 ? '-100%' : '0'})`,
                zIndex: 100
            }}>
                <div className="nav-logo" style={{ marginBottom: '3.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => navigate('/')}>
                    <img src={logo} alt="HOPE3 Logo" style={{ height: '40px' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {[
                        { id: 'applications', label: 'Applications', icon: FileText },
                        { id: 'students', label: 'Students', icon: Users },
                        { id: 'impact', label: 'Impact Tracker', icon: UserCheck },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem 1.2rem', borderRadius: '12px', textAlign: 'left',
                                background: activeTab === item.id ? 'var(--primary)' : 'transparent',
                                color: activeTab === item.id ? 'white' : 'var(--text-muted)',
                                fontWeight: '600', fontSize: '0.9rem', border: 'none', cursor: 'pointer'
                            }}
                        >
                            <item.icon size={18} /> {item.label}
                        </button>
                    ))}
                </div>

                <div style={{ marginTop: 'auto' }}>
                    <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', color: '#ef4444', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer' }}>
                        <LogOut size={18} /> Sign Out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div style={{
                flex: 1,
                padding: window.innerWidth <= 768 ? '1.5rem' : '3rem 4rem',
                marginLeft: window.innerWidth <= 1024 ? '0' : '280px',
                width: '100%'
            }}>
                <header style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                    marginBottom: '3rem', flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
                    gap: window.innerWidth <= 768 ? '1.5rem' : '0'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}>
                        <button
                            className="mobile-toggle"
                            onClick={() => setIsSidebarOpen(true)}
                            style={{
                                display: window.innerWidth <= 1024 ? 'flex' : 'none',
                                background: 'white', border: '1px solid #e2e8f0', padding: '0.6rem', borderRadius: '10px'
                            }}
                        >
                            <Menu size={20} />
                        </button>
                        <div>
                            <h1 style={{ fontSize: window.innerWidth <= 768 ? '1.5rem' : '2rem', color: '#111827' }}>{activeTab === 'applications' ? 'Admissions' : 'Registry'}</h1>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Managing the heart of HOPE3 Academy</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem', width: window.innerWidth <= 768 ? '100%' : 'auto' }}>
                        <button className="btn-pill" style={{ background: 'white', border: '1px solid #e2e8f0', flex: window.innerWidth <= 768 ? 1 : 'none' }}>Export</button>
                        <button className="btn-pill btn-primary" style={{ flex: window.innerWidth <= 768 ? 1 : 'none' }}>+ Add New</button>
                    </div>
                </header>

                {/* Global Search */}
                <div className="card-clean" style={{ padding: '1rem 1.5rem', display: 'flex', gap: '1rem', marginBottom: '2rem', border: 'none' }}>
                    <Search size={20} color="var(--text-muted)" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: '0.95rem' }}
                    />
                </div>

                {/* Table Area */}
                <div className="card-clean" style={{ padding: '0', overflow: 'hidden' }}>
                    <div className="table-responsive">
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                    <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', minWidth: '150px' }}>Student</th>
                                    <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', minWidth: '150px' }}>Course</th>
                                    <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', minWidth: '120px' }}>Date</th>
                                    <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Status</th>
                                    <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {applications.map((app) => (
                                    <tr key={app.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '1.5rem' }}>
                                            <div style={{ fontWeight: '700' }}>{app.name}</div>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--primary)' }}>{app.id}</div>
                                        </td>
                                        <td style={{ padding: '1.5rem', fontSize: '0.9rem' }}>{app.course}</td>
                                        <td style={{ padding: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{app.date}</td>
                                        <td style={{ padding: '1.5rem' }}>
                                            <span style={{
                                                padding: '0.3rem 0.8rem', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '700',
                                                background: app.status === 'Applied' ? 'rgba(0, 209, 193, 0.1)' : app.status === 'Enrolled' ? 'rgba(163, 230, 53, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                color: app.status === 'Applied' ? 'var(--primary)' : app.status === 'Enrolled' ? '#166534' : '#991b1b'
                                            }}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1.5rem' }}>
                                            <div style={{ display: 'flex', gap: '1rem' }}>
                                                <button onClick={() => handleAction(app.id, 'Enrolled')} title="Enroll" style={{ color: 'var(--secondary)', background: 'none', border: 'none', cursor: 'pointer' }}><UserPlus size={20} /></button>
                                                <button onClick={() => handleAction(app.id, 'Rejected')} title="Reject" style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><XCircle size={20} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 1024px) {
                    .admin-dashboard-root > div:nth-child(2) {
                        transform: translateX(${isSidebarOpen ? '0' : '-100%'}) !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
