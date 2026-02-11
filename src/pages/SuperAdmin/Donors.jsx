import React, { useState } from 'react';
import SuperAdminLayout from '../../components/SuperAdmin/SuperAdminLayout';
import {
    Plus,
    Search,
    Eye,
    Settings,
    UserX,
    UserCheck,
    Heart
} from 'lucide-react';

const DonorsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const donors = [
        { id: 1, name: 'Global Tech Corp', contact: 'Mark Spencer', type: 'Corporate', status: 'Active', visibility: 'Full' },
        { id: 2, name: 'Heritage Foundation', contact: 'Emily Watson', type: 'NGO', status: 'Active', visibility: 'Restricted' },
        { id: 3, name: 'Dr. Robert Wilson', contact: 'Robert Wilson', type: 'Individual', status: 'Inactive', visibility: 'Basic' },
    ];

    return (
        <SuperAdminLayout
            title="Donor Accounts"
            subtitle="Manage donor accounts and control their data visibility"
        >
            <div className="admin-card">
                <div className="card-header">
                    <div className="search-wrapper">
                        <Search size={18} className="search-icon-pos" />
                        <input
                            type="text"
                            placeholder="Search donors or contacts..."
                            className="admin-input-search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="admin-btn admin-btn-primary">
                        <Plus size={18} /> Add Donor
                    </button>
                </div>

                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Donor Organization / Name</th>
                                <th>Primary Contact</th>
                                <th>Donor Type</th>
                                <th>Data Visibility</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donors.map((donor) => (
                                <tr key={donor.id}>
                                    <td style={{ fontWeight: 600 }}>{donor.name}</td>
                                    <td>{donor.contact}</td>
                                    <td>{donor.type}</td>
                                    <td>
                                        <span style={{
                                            padding: '0.2rem 0.6rem',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            border: '1px solid var(--admin-border)',
                                            color: 'var(--admin-text-light)'
                                        }}>
                                            {donor.visibility}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${donor.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                                            {donor.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                                            <button className="action-btn" title="Visibility Settings">
                                                <Settings size={16} />
                                            </button>
                                            <button className="action-btn" title="View Donor Dashboard">
                                                <Eye size={16} />
                                            </button>
                                            <button className="action-btn" title={donor.status === 'Active' ? 'Deactivate' : 'Activate'}>
                                                {donor.status === 'Active' ? <UserX size={16} /> : <UserCheck size={16} />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div style={{
                marginTop: '1.5rem',
                padding: '1.5rem',
                backgroundColor: '#fef3f2',
                borderRadius: '0.75rem',
                border: '1px solid #fee2e2',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center'
            }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: '#fee2e2',
                    color: '#dc2626',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Heart size={24} />
                </div>
                <div>
                    <h4 style={{ color: '#991b1b', marginBottom: '0.25rem' }}>Donor Access Rule</h4>
                    <p style={{ fontSize: '0.875rem', color: '#b91c1c' }}>
                        All donor accounts are strictly **Read-Only**. They can only view the data you authorize. They cannot modify student records or system settings.
                    </p>
                </div>
            </div>
        </SuperAdminLayout>
    );
};

export default DonorsPage;
