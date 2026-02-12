import React, { useState } from 'react';
import SuperAdminLayout from '../../components/SuperAdmin/SuperAdminLayout';
import {
    User,
    Mail,
    Shield,
    Phone,
    Calendar,
    Bell,
    Lock,
    CheckCircle2,
    Settings as SettingsIcon,
    Camera
} from 'lucide-react';

const AdminProfile = () => {
    const role = localStorage.getItem('userRole') || 'SUPER_ADMIN';

    const [adminInfo, setAdminInfo] = useState({
        name: role === 'SUPER_ADMIN' ? 'Super Admin' : 'John Administrator',
        email: role === 'SUPER_ADMIN' ? 'superadmin@hope3.org' : 'admin@hope3.org',
        role: role === 'SUPER_ADMIN' ? 'Full System Access' : 'Administrative Lead',
        phone: '+1 (555) 999-8888',
        joined: 'Jan 2024',
        lastLogin: 'Today, 10:24 AM'
    });

    const activities = [
        { action: 'Approved Student Application', target: 'HOPE3-2026-001', time: '2 hours ago' },
        { action: 'Updated Donor Visibility', target: 'Global Tech Corp', time: '5 hours ago' },
        { action: 'Created New Admin Account', target: 'Sarah Jenkins', time: 'Yesterday' },
        { action: 'Generated Monthly Report', target: 'January 2026', time: '2 days ago' },
    ];

    return (
        <SuperAdminLayout
            title="My Profile"
            subtitle="Manage your account settings and track your activities"
        >
            <div className="admin-grid-1-2">

                {/* Left Column: Account Card */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="admin-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
                        <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 1.5rem' }}>
                            <div style={{
                                width: '100%', height: '100%', borderRadius: '50%', background: 'var(--admin-primary)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                            }}>
                                <User size={50} />
                            </div>
                            <div style={{
                                position: 'absolute', bottom: '0', right: '0', background: 'white', padding: '0.5rem',
                                borderRadius: '50%', boxShadow: 'var(--admin-shadow)', cursor: 'pointer', border: '1px solid var(--admin-border)'
                            }}>
                                <Camera size={16} color="var(--admin-primary)" />
                            </div>
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>{adminInfo.name}</h2>
                        <span className="status-badge status-active">{role.replace('_', ' ')}</span>

                        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', textAlign: 'left' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--admin-text-light)' }}>
                                <Mail size={18} />
                                <span style={{ fontSize: '0.875rem' }}>{adminInfo.email}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--admin-text-light)' }}>
                                <Shield size={18} />
                                <span style={{ fontSize: '0.875rem' }}>{adminInfo.role}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--admin-text-light)' }}>
                                <Phone size={18} />
                                <span style={{ fontSize: '0.875rem' }}>{adminInfo.phone}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--admin-text-light)' }}>
                                <Calendar size={18} />
                                <span style={{ fontSize: '0.875rem' }}>Joined {adminInfo.joined}</span>
                            </div>
                        </div>

                        <button className="admin-btn admin-btn-primary" style={{ width: '100%', marginTop: '2rem' }}>
                            <SettingsIcon size={18} /> Edit Profile
                        </button>
                    </div>

                    <div className="admin-card" style={{ padding: '2rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Lock size={20} color="var(--admin-primary)" /> Security
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <button className="admin-btn admin-btn-outline" style={{ justifyContent: 'flex-start', width: '100%' }}>
                                <Lock size={16} /> Change Password
                            </button>
                            <button className="admin-btn admin-btn-outline" style={{ justifyContent: 'flex-start', width: '100%' }}>
                                <Shield size={16} /> Two-Factor Auth
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Experience & Activity */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Activity Feed */}
                    <div className="admin-card">
                        <div className="card-header">
                            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Bell size={20} color="var(--admin-primary)" /> Recent Activity
                            </h3>
                        </div>
                        <div style={{ padding: '0.5rem 0' }}>
                            {activities.map((item, i) => (
                                <div key={i} style={{
                                    padding: '1.25rem 2rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderBottom: i === activities.length - 1 ? 'none' : '1px solid var(--admin-border)'
                                }}>
                                    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                                        <div style={{
                                            width: '40px', height: '40px', borderRadius: '10px', background: 'var(--admin-primary-light)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--admin-primary)'
                                        }}>
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: 600, fontSize: '0.95rem', margin: 0 }}>{item.action}</p>
                                            <p style={{ color: 'var(--admin-text-light)', fontSize: '0.8rem', margin: '0.2rem 0 0' }}>Target: {item.target}</p>
                                        </div>
                                    </div>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)', fontWeight: 500 }}>{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* System Stats (for Admin) */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem' }}>
                        <div className="admin-card" style={{ padding: '2rem' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--admin-text-light)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Total Approvals</p>
                            <h3 style={{ fontSize: '2rem', fontWeight: 800 }}>142</h3>
                        </div>
                        <div className="admin-card" style={{ padding: '2rem' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--admin-text-light)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>System Health</p>
                            <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--admin-success)' }}>100%</h3>
                        </div>
                    </div>
                </div>
            </div>
        </SuperAdminLayout>
    );
};

export default AdminProfile;
