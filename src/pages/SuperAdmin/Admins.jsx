import React, { useState } from 'react';
import SuperAdminLayout from '../../components/SuperAdmin/SuperAdminLayout';
import {
    Plus,
    Search,
    Edit,
    Key,
    UserX,
    UserCheck,
    Shield
} from 'lucide-react';

const AdminsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const admins = [
        { id: 1, name: 'Aarif Rahaman', email: 'aarif@hope3.org', role: 'Founder', status: 'Active' },
        { id: 2, name: 'Sarah Jamal', email: 'sarah@hope3.org', role: 'Staff', status: 'Active' },
        { id: 3, name: 'Mohammed Ali', email: 'ali@hope3.org', role: 'Volunteer', status: 'Inactive' },
        { id: 4, name: 'Priya Dharshini', email: 'priya@hope3.org', role: 'Staff', status: 'Active' },
    ];

    const getRoleBadgeStyle = (role) => {
        switch (role) {
            case 'Founder': return { background: '#fef3f2', color: '#b91c1c' };
            case 'Staff': return { background: '#f5f3ff', color: '#6d28d9' };
            case 'Volunteer': return { background: '#ecfdf5', color: '#047857' };
            default: return { background: '#f8fafc', color: '#475569' };
        }
    };

    return (
        <SuperAdminLayout
            title="Admin Management"
            subtitle="Manage system administrators and their roles"
        >
            <div className="admin-card">
                <div className="card-header">
                    <div className="search-wrapper">
                        <Search size={18} className="search-icon-pos" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="admin-input-search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="admin-btn admin-btn-primary">
                        <Plus size={18} /> Create Admin
                    </button>
                </div>

                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Admin Name</th>
                                <th>Email Address</th>
                                <th>Role Type</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map((admin) => (
                                <tr key={admin.id}>
                                    <td style={{ fontWeight: 600 }}>{admin.name}</td>
                                    <td>{admin.email}</td>
                                    <td>
                                        <span className="status-badge" style={getRoleBadgeStyle(admin.role)}>
                                            {admin.role}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${admin.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                                            {admin.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                                            <button className="action-btn" title="Edit Admin">
                                                <Edit size={16} />
                                            </button>
                                            <button className="action-btn" title="Reset Password">
                                                <Key size={16} />
                                            </button>
                                            <button className="action-btn" title={admin.status === 'Active' ? 'Deactivate' : 'Activate'}>
                                                {admin.status === 'Active' ? <UserX size={16} /> : <UserCheck size={16} />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Role Permissions Summary */}
            <div className="stats-grid" style={{ marginTop: '2rem' }}>
                {[
                    { role: 'Founder', desc: 'Full system access, manage finances, and all administration.' },
                    { role: 'Staff', desc: 'Manage students, handle admissions, and generate reports.' },
                    { role: 'Volunteer', desc: 'ReadOnly access to student list and basic dashboard metrics.' }
                ].map((info, i) => (
                    <div key={i} className="admin-card" style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            <div style={{ padding: '0.5rem', borderRadius: '0.5rem', background: 'var(--admin-primary-light)', color: 'var(--admin-primary)' }}>
                                <Shield size={20} />
                            </div>
                            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>{info.role}</h3>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--admin-text-light)', lineHeight: 1.5 }}>
                            {info.desc}
                        </p>
                    </div>
                ))}
            </div>
        </SuperAdminLayout>
    );
};

export default AdminsPage;
