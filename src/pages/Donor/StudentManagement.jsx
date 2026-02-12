import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, Filter, User, GraduationCap } from 'lucide-react';
import DonorTable from '../../components/Donor/DonorTable';

const StudentManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const students = [
        { hopeId: 'H3-2025-001', name: 'Courtney Henry', course: 'UX/UI Design', year: '2025-26', status: 'Active', photo: 'CH' },
        { hopeId: 'H3-2025-002', name: 'Arlene McCoy', course: 'Web Development', year: '2025-26', status: 'Active', photo: 'AM' },
        { hopeId: 'H3-2024-045', name: 'Jerome Bell', course: 'Data Science', year: '2024-25', status: 'Active', photo: 'JB' },
        { hopeId: 'H3-2025-003', name: 'Eleanor Pena', course: 'Digital Marketing', year: '2025-26', status: 'Active', photo: 'EP' },
        { hopeId: 'H3-2024-012', name: 'Bessie Cooper', course: 'UX/UI Design', year: '2024-25', status: 'Active', photo: 'BC' },
    ];

    const colDefs = useMemo(() => [
        {
            field: 'name',
            headerName: 'Student',
            minWidth: 200,
            cellRenderer: (params) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingTop: '8px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem' }}>
                        {params.data.photo}
                    </div>
                    <span style={{ fontWeight: 700, color: '#1e293b' }}>{params.value}</span>
                </div>
            )
        },
        {
            field: 'hopeId',
            headerName: 'Hope ID',
            cellStyle: { color: 'var(--primary)', fontWeight: 800 }
        },
        {
            field: 'course',
            headerName: 'Degree/Course',
            cellStyle: { color: '#64748b' }
        },
        {
            field: 'year',
            headerName: 'Academic Year',
            cellStyle: { color: '#64748b' }
        },
        {
            field: 'status',
            headerName: 'Status',
            cellRenderer: (params) => (
                <div style={{ display: 'flex', paddingTop: '12px' }}>
                    <span style={{
                        padding: '0.4rem 1rem',
                        borderRadius: '50px',
                        background: '#e0f2fe',
                        color: '#0284c7',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        border: '1px solid #bae6fd'
                    }}>
                        {params.value}
                    </span>
                </div>
            )
        },
        {
            headerName: 'Action',
            width: 100,
            cellRenderer: () => (
                <div style={{ display: 'flex', paddingTop: '8px' }}>
                    <button className="btn-ghost" style={{ padding: '0.5rem', borderRadius: '8px', color: 'var(--primary)' }}>
                        <Eye size={18} />
                    </button>
                </div>
            )
        }
    ], []);

    const filteredStudents = useMemo(() => {
        return students.filter(student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.hopeId.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
        >
            <div className="card-clean" style={{ padding: '2rem', background: 'white', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#111827', marginBottom: '0.5rem' }}>Student Directory</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Comprehensive list of students benefiting from your support.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', flex: window.innerWidth <= 640 ? '1 1 100%' : 'none' }}>
                    <div style={{ position: 'relative', width: '100%', minWidth: '300px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input
                            type="text"
                            placeholder="Search by ID or Name..."
                            style={{
                                padding: '0.8rem 1rem 0.8rem 3rem',
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0',
                                width: '100%',
                                outline: 'none',
                                fontSize: '0.95rem',
                                transition: 'all 0.2s',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                            }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div style={{ overflowX: 'auto', background: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                <DonorTable rowData={filteredStudents} colDefs={colDefs} />
            </div>
        </motion.div>
    );
};

export default StudentManagement;

