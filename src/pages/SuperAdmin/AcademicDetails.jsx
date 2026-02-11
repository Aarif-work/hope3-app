import React, { useState } from 'react';
import SuperAdminLayout from '../../components/SuperAdmin/SuperAdminLayout';
import {
    Plus,
    Edit,
    Trash2,
    Calendar,
    BookOpen,
    Clock,
    CheckCircle2,
    XCircle
} from 'lucide-react';

const AcademicDetails = () => {
    const courses = [
        { id: 1, name: 'UX/UI Design', duration: '6 Months', status: 'Active', admissions: 'Open' },
        { id: 2, name: 'Web Development', duration: '12 Months', status: 'Active', admissions: 'Open' },
        { id: 3, name: 'Data Science', duration: '12 Months', status: 'Inactive', admissions: 'Closed' },
        { id: 4, name: 'Digital Marketing', duration: '4 Months', status: 'Active', admissions: 'Open' },
    ];

    const academicYears = [
        { year: '2025-26', status: 'Current', students: 120 },
        { year: '2024-25', status: 'Previous', students: 105 },
        { year: '2023-24', status: 'Previous', students: 95 },
    ];

    return (
        <SuperAdminLayout
            title="Academic Configuration"
            subtitle="Manage academic years, courses, and admission periods"
        >
            <div className="admin-grid-1-2">
                {/* Academic Years */}
                <div>
                    <div className="admin-card">
                        <div className="card-header">
                            <h3 className="card-title">Academic Years</h3>
                            <button className="action-btn" title="Add Year"><Plus size={18} /></button>
                        </div>
                        <div style={{ padding: '0.5rem' }}>
                            {academicYears.map((ay, i) => (
                                <div key={i} style={{
                                    padding: '1rem',
                                    borderBottom: i !== academicYears.length - 1 ? '1px solid var(--admin-border)' : 'none',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div>
                                        <p style={{ fontWeight: 600 }}>{ay.year}</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)' }}>{ay.students} Students Enrolled</p>
                                    </div>
                                    <span style={{
                                        padding: '0.2rem 0.5rem',
                                        borderRadius: '4px',
                                        fontSize: '0.7rem',
                                        background: ay.status === 'Current' ? '#f0fdf4' : '#f1f5f9',
                                        color: ay.status === 'Current' ? '#16a34a' : '#64748b',
                                        fontWeight: 600
                                    }}>
                                        {ay.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="admin-card" style={{ marginTop: '1.5rem', padding: '1.5rem' }}>
                        <h3 className="card-title" style={{ marginBottom: '1rem' }}>Admission Portal</h3>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#f0fdf4', borderRadius: '0.5rem' }}>
                            <div>
                                <p style={{ fontWeight: 600, color: '#166534' }}>Current Status: OPEN</p>
                                <p style={{ fontSize: '0.75rem', color: '#166534' }}>Ends on 31st March 2026</p>
                            </div>
                            <button className="admin-btn" style={{ background: '#16a34a', color: 'white', padding: '0.5rem 1rem' }}>Close Portal</button>
                        </div>
                    </div>
                </div>

                {/* Courses Management */}
                <div className="admin-card">
                    <div className="card-header">
                        <h3 className="card-title">Course Management</h3>
                        <button className="admin-btn admin-btn-primary"><Plus size={18} /> Add New Course</button>
                    </div>
                    <div className="admin-table-container">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Course Name</th>
                                    <th>Duration</th>
                                    <th>Admissions</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.map((course) => (
                                    <tr key={course.id}>
                                        <td style={{ fontWeight: 600 }}>{course.name}</td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem' }}>
                                                <Clock size={14} className="text-slate-400" />
                                                {course.duration}
                                            </div>
                                        </td>
                                        <td>
                                            <span style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.3rem',
                                                fontSize: '0.8rem',
                                                color: course.admissions === 'Open' ? '#2563eb' : '#dc2626',
                                                fontWeight: 500
                                            }}>
                                                {course.admissions === 'Open' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                                                {course.admissions}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${course.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                                                {course.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.25rem' }}>
                                                <button className="action-btn" title="Edit Course">
                                                    <Edit size={16} />
                                                </button>
                                                <button className="action-btn action-btn-delete" title="Delete Course">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </SuperAdminLayout>
    );
};

export default AcademicDetails;
