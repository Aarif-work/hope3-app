import React, { useState, useMemo } from 'react';
import SuperAdminLayout from '../../components/SuperAdmin/SuperAdminLayout';
import AdminTable from '../../components/SuperAdmin/AdminTable';
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

    const colDefs = useMemo(() => [
        {
            field: 'name',
            headerName: 'Course Name',
            cellStyle: { fontWeight: 600 }
        },
        {
            field: 'duration',
            headerName: 'Duration',
            cellRenderer: (params) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem' }}>
                    <Clock size={14} className="text-slate-400" />
                    {params.value}
                </div>
            )
        },
        {
            field: 'admissions',
            headerName: 'Admissions',
            cellRenderer: (params) => (
                <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.8rem',
                    color: params.value === 'Open' ? '#2563eb' : '#dc2626',
                    fontWeight: 500
                }}>
                    {params.value === 'Open' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                    {params.value}
                </span>
            )
        },
        {
            field: 'status',
            headerName: 'Status',
            cellRenderer: (params) => (
                <span className={`status-badge ${params.value === 'Active' ? 'status-active' : 'status-inactive'}`}>
                    {params.value}
                </span>
            )
        },
        {
            headerName: 'Actions',
            field: 'actions',
            cellRenderer: (params) => (
                <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center', height: '100%' }}>
                    <button className="action-btn" title="Edit Course">
                        <Edit size={16} />
                    </button>
                    <button className="action-btn action-btn-delete" title="Delete Course">
                        <Trash2 size={16} />
                    </button>
                </div>
            ),
            width: 120,
            sortable: false,
            filter: false
        }
    ], []);

    return (
        <SuperAdminLayout
            title="Academic Configuration"
            subtitle="Manage academic years, courses, and admission periods"
        >
            <div className="admin-card" style={{ marginBottom: '2rem', padding: '2rem', background: 'linear-gradient(to right, #00d1c1 0%, #00b3a6 100%)', color: 'white', border: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>General Configuration</h3>
                        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem' }}>Manage admission portals and global academic settings from here.</p>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.75rem', borderRadius: '12px', backdropFilter: 'blur(4px)' }}>
                        <BookOpen size={32} color="white" />
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.2)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ padding: '0.5rem', background: 'white', borderRadius: '50%', display: 'flex' }}>
                            <CheckCircle2 size={24} color="#00d1c1" />
                        </div>
                        <div>
                            <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>Admission Portal is OPEN</p>
                            <p style={{ fontSize: '0.85rem', opacity: 0.9 }}>Taking applications for Academic Year 2026-27</p>
                        </div>
                    </div>
                    <button className="admin-btn" style={{ background: 'white', color: '#00d1c1', border: 'none', padding: '0.6rem 1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                        Close Portal
                    </button>
                </div>
            </div>

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

                </div>

                {/* Courses Management */}
                <div className="admin-card">
                    <div className="card-header">
                        <h3 className="card-title">Course Management</h3>
                        <button className="admin-btn admin-btn-primary"><Plus size={18} /> Add New Course</button>
                    </div>
                    <div className="ag-theme-quartz" style={{ width: '100%' }}>
                        <AdminTable
                            rowData={courses}
                            colDefs={colDefs}
                        />
                    </div>
                </div>
            </div>
        </SuperAdminLayout>
    );
};

export default AcademicDetails;
