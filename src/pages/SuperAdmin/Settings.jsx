import React from 'react';
import SuperAdminLayout from '../../components/SuperAdmin/SuperAdminLayout';
import {
    Settings as SettingsIcon,
    Bell,
    Lock,
    Globe,
    Database,
    Smartphone,
    Save
} from 'lucide-react';

const SettingsPage = () => {
    const settingsSections = [
        { title: 'System Configuration', icon: Globe, items: ['Default Language', 'Timezone', 'Currency Symbols'] },
        { title: 'Security & Auth', icon: Lock, items: ['Password Policy', 'Two-Factor Auth', 'Session Timeout'] },
        { title: 'Notifications', icon: Bell, items: ['Email Templates', 'System Alerts', 'Push Notifications'] },
        { title: 'Data Management', icon: Database, items: ['System Backup', 'Audit logs', 'Export Settings'] },
    ];

    return (
        <SuperAdminLayout
            title="System Settings"
            subtitle="Configure global system preferences and security policies"
        >
            <div className="admin-grid-1-2">
                <div className="admin-card" style={{ height: 'fit-content' }}>
                    <div className="card-header">
                        <h3 className="card-title">Settings Navigation</h3>
                    </div>
                    <div style={{ padding: '0.5rem' }}>
                        {settingsSections.map((section, i) => (
                            <button key={i} style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem',
                                border: 'none',
                                background: i === 0 ? 'var(--admin-primary-light)' : 'transparent',
                                color: i === 0 ? 'var(--admin-primary)' : 'var(--admin-text-light)',
                                fontWeight: 600,
                                borderRadius: '0.5rem',
                                textAlign: 'left',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}>
                                <section.icon size={20} />
                                <span>{section.title}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="admin-card">
                    <div className="card-header">
                        <h3 className="card-title">General Configuration</h3>
                        <button className="admin-btn admin-btn-primary">
                            <Save size={18} /> Save Changes
                        </button>
                    </div>
                    <div style={{ padding: '2rem' }}>
                        <div className="admin-form-group">
                            <label className="admin-form-label">Organization Name</label>
                            <input type="text" className="admin-input" defaultValue="HOPE3 Academy" />
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-form-label">System Email</label>
                            <input type="email" className="admin-input" defaultValue="admin@hope3.org" />
                        </div>
                        <div className="stats-grid" style={{ marginBottom: 0 }}>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Default Timezone</label>
                                <select className="admin-select">
                                    <option>GMT +05:30 (India)</option>
                                    <option>GMT +00:00 (London)</option>
                                    <option>GMT -05:00 (New York)</option>
                                </select>
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Primary Language</label>
                                <select className="admin-select">
                                    <option>English (US)</option>
                                    <option>Tamil</option>
                                    <option>Hindi</option>
                                </select>
                            </div>
                        </div>

                        <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--admin-border)' }} />

                        <h4 style={{ fontWeight: 600, marginBottom: '1.5rem' }}>System Maintenance</h4>
                        <div style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: '0.75rem', border: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <p style={{ fontWeight: 600, fontSize: '0.875rem' }}>Automatic Daily Backups</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)' }}>Last successful backup: 2 hours ago</p>
                            </div>
                            <div style={{ width: '40px', height: '20px', background: 'var(--admin-primary)', borderRadius: '10px', position: 'relative' }}>
                                <div style={{ width: '16px', height: '16px', background: 'white', borderRadius: '50%', position: 'absolute', right: '2px', top: '2px' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SuperAdminLayout>
    );
};

export default SettingsPage;
