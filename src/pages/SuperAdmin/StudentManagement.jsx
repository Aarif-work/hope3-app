import React, { useState } from 'react';
import SuperAdminLayout from '../../components/SuperAdmin/SuperAdminLayout';
import {
    Search,
    Filter,
    Edit,
    Trash2,
    Eye,
    MoreVertical,
    Download,
    Plus
} from 'lucide-react';

const StudentManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const students = [
        { hopeId: 'H3-2025-001', name: 'Courtney Henry', course: 'UX/UI Design', year: '2025-26', status: 'Active' },
        { hopeId: 'H3-2025-002', name: 'Arlene McCoy', course: 'Web Development', year: '2025-26', status: 'Active' },
        { hopeId: 'H3-2024-045', name: 'Jerome Bell', course: 'Data Science', year: '2024-25', status: 'Inactive' },
        { hopeId: 'H3-2025-003', name: 'Eleanor Pena', course: 'Digital Marketing', year: '2025-26', status: 'Active' },
        { hopeId: 'H3-2024-012', name: 'Bessie Cooper', course: 'UX/UI Design', year: '2024-25', status: 'Active' },
    ];

    return (
        <SuperAdminLayout
            title="Students Management"
            subtitle="Manage enrolled students and their academic records"
        >
            <div className="admin-card">
                <div className="card-header">
                    <div className="search-wrapper">
                        <Search size={18} className="search-icon-pos" />
                        <input
                            type="text"
                            placeholder="Search by Hope ID or Name..."
                            className="admin-input-search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button className="admin-btn admin-btn-outline">
                            <Download size={18} /> Export
                        </button>
                        <button className="admin-btn admin-btn-primary">
                            <Plus size={18} /> Add Student
                        </button>
                    </div>
                </div>

                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Hope ID</th>
                                <th>Name</th>
                                <th>Course</th>
                                <th>Academic Year</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.hopeId}>
                                    <td style={{ color: 'var(--admin-primary)', fontWeight: 600 }}>{student.hopeId}</td>
                                    <td style={{ fontWeight: 600 }}>{student.name}</td>
                                    <td>{student.course}</td>
                                    <td>{student.year}</td>
                                    <td>
                                        <span className={`status-badge ${student.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                                            {student.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                                            <button className="action-btn" title="View Profile">
                                                <Eye size={16} />
                                            </button>
                                            <button className="action-btn" title="Edit Student">
                                                <Edit size={16} />
                                            </button>
                                            <button className="action-btn action-btn-delete" title="Soft Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ padding: '1.5rem', borderTop: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <p style={{ fontSize: '0.875rem', color: 'var(--admin-text-light)' }}>Rows per page:</p>
                        <select className="admin-select" style={{ width: '70px', padding: '0.25rem' }}>
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="admin-btn admin-btn-outline" disabled>Previous</button>
                        <button className="admin-btn admin-btn-outline">Next</button>
                    </div>
                </div>
            </div>
        </SuperAdminLayout>
    );
};

export default StudentManagement;
