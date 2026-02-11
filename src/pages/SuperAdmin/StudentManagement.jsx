import React, { useState, useMemo } from 'react';
import SuperAdminLayout from '../../components/SuperAdmin/SuperAdminLayout';
import StudentDetailView from '../../components/SuperAdmin/StudentDetailView';
import AdminTable from '../../components/SuperAdmin/AdminTable';
import {
    Search,
    Edit,
    Trash2,
    Eye,
    Plus
} from 'lucide-react';

const StudentManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);

    const students = [
        { hopeId: 'H3-2025-001', name: 'Courtney Henry', course: 'UX/UI Design', year: '2025-26', status: 'Active' },
        { hopeId: 'H3-2025-002', name: 'Arlene McCoy', course: 'Web Development', year: '2025-26', status: 'Active' },
        { hopeId: 'H3-2024-045', name: 'Jerome Bell', course: 'Data Science', year: '2024-25', status: 'Inactive' },
        { hopeId: 'H3-2025-003', name: 'Eleanor Pena', course: 'Digital Marketing', year: '2025-26', status: 'Active' },
        { hopeId: 'H3-2024-012', name: 'Bessie Cooper', course: 'UX/UI Design', year: '2024-25', status: 'Active' },
    ];

    // Filter students based on search term
    const filteredStudents = useMemo(() => {
        return students.filter(student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.hopeId.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const colDefs = useMemo(() => [
        {
            field: 'hopeId',
            headerName: 'Hope ID',
            cellRenderer: (params) => (
                <span style={{ color: 'var(--admin-primary)', fontWeight: 600 }}>{params.value}</span>
            )
        },
        {
            field: 'name',
            headerName: 'Name',
            cellStyle: { fontWeight: 600 }
        },
        { field: 'course', headerName: 'Course' },
        { field: 'year', headerName: 'Academic Year' },
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
                    <button
                        className="action-btn"
                        title="View Profile"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStudent(params.data);
                        }}
                    >
                        <Eye size={16} />
                    </button>
                    <button className="action-btn" title="Edit Student" onClick={(e) => e.stopPropagation()}>
                        <Edit size={16} />
                    </button>
                    <button className="action-btn action-btn-delete" title="Soft Delete" onClick={(e) => e.stopPropagation()}>
                        <Trash2 size={16} />
                    </button>
                </div>
            ),
            width: 150,
            sortable: false,
            filter: false
        }
    ], []);


    if (selectedStudent) {
        return (
            <SuperAdminLayout
                title="Student Profile"
                subtitle={`Viewing details for ${selectedStudent.name}`}
            >
                <StudentDetailView student={selectedStudent} onBack={() => setSelectedStudent(null)} />
            </SuperAdminLayout>
        );
    }

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
                        <button className="admin-btn admin-btn-primary">
                            <Plus size={18} /> Add Student
                        </button>
                    </div>
                </div>

                <div className="ag-theme-quartz" style={{ width: '100%' }}>
                    <AdminTable
                        rowData={filteredStudents}
                        colDefs={colDefs}
                        onRowClicked={(event) => setSelectedStudent(event.data)}
                    />
                </div>
            </div>
        </SuperAdminLayout>
    );
};

export default StudentManagement;
