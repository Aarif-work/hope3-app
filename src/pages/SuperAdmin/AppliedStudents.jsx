import React, { useState } from 'react';
import SuperAdminLayout from '../../components/SuperAdmin/SuperAdminLayout';
import { Eye, Search, Filter } from 'lucide-react';

const AppliedStudents = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const applications = [
        { id: 'HOPE3-2026-001', name: 'Alisa Martin', course: 'UX/UI Design', date: '2026-02-05', status: 'Applied' },
        { id: 'HOPE3-2026-002', name: 'Robert Fox', course: 'Web Development', date: '2026-02-04', status: 'Applied' },
        { id: 'HOPE3-2026-003', name: 'Jenny Wilson', course: 'Data Science', date: '2026-02-03', status: 'Applied' },
        { id: 'HOPE3-2026-004', name: 'Cody Fisher', course: 'Digital Marketing', date: '2026-02-02', status: 'Applied' },
        { id: 'HOPE3-2026-005', name: 'Savannah Nguyen', course: 'UX/UI Design', date: '2026-02-01', status: 'Applied' },
    ];

    return (
        <SuperAdminLayout
            title="Applied Students"
            subtitle="Recently applied students awaiting review"
        >
            <div className="admin-card">
                <div className="card-header">
                    <div className="search-wrapper">
                        <Search size={18} className="search-icon-pos" />
                        <input
                            type="text"
                            placeholder="Search applications..."
                            className="admin-input-search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className="admin-btn admin-btn-outline">
                            <Filter size={18} /> Filters
                        </button>
                    </div>
                </div>

                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Application ID</th>
                                <th>Name</th>
                                <th>Course</th>
                                <th>Applied Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app) => (
                                <tr key={app.id}>
                                    <td>{app.id}</td>
                                    <td style={{ fontWeight: 600 }}>{app.name}</td>
                                    <td>{app.course}</td>
                                    <td>{app.date}</td>
                                    <td>
                                        <span className="status-badge status-applied">{app.status}</span>
                                    </td>
                                    <td>
                                        <button className="action-btn" title="View Details">
                                            <Eye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ padding: '1.5rem', borderTop: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '0.875rem', color: 'var(--admin-text-light)' }}>Showing 1 to 5 of 45 applications</p>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="admin-btn admin-btn-outline" disabled>Previous</button>
                        <button className="admin-btn admin-btn-outline">Next</button>
                    </div>
                </div>
            </div>

            <div style={{
                marginTop: '1rem',
                padding: '1rem',
                borderRadius: '0.5rem',
                backgroundColor: '#eff6ff',
                borderLeft: '4px solid #2563eb',
                fontSize: '0.875rem',
                color: '#1e40af'
            }}>
                <strong>Note:</strong> This page is read-only. To manage students, please go to the Students Management page.
            </div>
        </SuperAdminLayout>
    );
};

export default AppliedStudents;
