import React, { useState, useMemo } from 'react';
import SuperAdminLayout from '../../components/SuperAdmin/SuperAdminLayout';
import StudentDetailView from '../../components/SuperAdmin/StudentDetailView';
import AdminTable from '../../components/SuperAdmin/AdminTable';
import Modal from '../../components/SuperAdmin/Modal';
import {
    Search,
    Edit,
    Trash2,
    Eye,
    Plus,
    XCircle,
    CheckCircle2
} from 'lucide-react';

const StudentManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Initial mock data
    const [students, setStudents] = useState([
        { hopeId: 'H3-2025-001', name: 'Courtney Henry', course: 'UX/UI Design', year: '2025-26', status: 'Active' },
        { hopeId: 'H3-2025-002', name: 'Arlene McCoy', course: 'Web Development', year: '2025-26', status: 'Active' },
        { hopeId: 'H3-2024-045', name: 'Jerome Bell', course: 'Data Science', year: '2024-25', status: 'Inactive' },
        { hopeId: 'H3-2025-003', name: 'Eleanor Pena', course: 'Digital Marketing', year: '2025-26', status: 'Active' },
        { hopeId: 'H3-2024-012', name: 'Bessie Cooper', course: 'UX/UI Design', year: '2024-25', status: 'Active' },
    ]);

    // Form state for adding new student
    const [newStudent, setNewStudent] = useState({
        name: '',
        course: 'UX/UI Design',
        year: '2025-26',
        status: 'Active'
    });

    const handleAddStudent = (e) => {
        e.preventDefault();
        const id = `H3-${newStudent.year.split('-')[0]}-${String(students.length + 1).padStart(3, '0')}`;
        const studentToAdd = { ...newStudent, hopeId: id };
        setStudents([studentToAdd, ...students]);
        setIsAddModalOpen(false);
        setNewStudent({ name: '', course: 'UX/UI Design', year: '2025-26', status: 'Active' }); // Reset form
    };

    const handleDeleteStudent = (hopeId) => {
        if (window.confirm('Are you sure you want to delete this student record?')) {
            setStudents(students.filter(student => student.hopeId !== hopeId));
        }
    };

    const toggleStatus = (hopeId) => {
        setStudents(students.map(student =>
            student.hopeId === hopeId
                ? { ...student, status: student.status === 'Active' ? 'Inactive' : 'Active' }
                : student
        ));
    };

    // Filter students based on search term
    const filteredStudents = useMemo(() => {
        return students.filter(student =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.hopeId.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, students]);

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
            flex: 1.5,
            minWidth: 180,
            cellStyle: {
                fontWeight: 600,
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
            }
        },
        {
            field: 'course',
            headerName: 'Course',
            flex: 1.2,
            minWidth: 150,
            cellStyle: {
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
            }
        },
        { field: 'year', headerName: 'Academic Year', minWidth: 120 },
        {
            field: 'status',
            headerName: 'Status',
            cellRenderer: (params) => (
                <span
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleStatus(params.data.hopeId);
                    }}
                    className={`status-badge ${params.value === 'Active' ? 'status-active' : 'status-inactive'}`}
                    style={{ cursor: 'pointer' }}
                    title="Click to toggle status"
                >
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
                    <button
                        className="action-btn action-btn-delete"
                        title="Delete Record"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteStudent(params.data.hopeId);
                        }}
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ),
            width: 150,
            sortable: false,
            filter: false
        }
    ], [students]); // Re-render when students change for updated closures


    if (selectedStudent) {
        return (
            <SuperAdminLayout
                title="Student Profile"
                subtitle={`Viewing details for ${selectedStudent.name}`}
            >
                <StudentDetailView
                    student={selectedStudent}
                    onBack={() => setSelectedStudent(null)}
                />
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
                        <button
                            className="admin-btn admin-btn-primary"
                            onClick={() => setIsAddModalOpen(true)}
                        >
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

            {/* Add Student Modal */}
            {isAddModalOpen && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem'
                }}>
                    <div
                        onClick={() => setIsAddModalOpen(false)}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(4px)'
                        }}
                    />
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '500px',
                        background: 'white',
                        borderRadius: '16px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                        padding: '1.5rem',
                        animation: 'fadeIn 0.2s ease-out'
                    }}>
                        <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>Add New Student</h3>
                        <form onSubmit={handleAddStudent}>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="admin-input"
                                    placeholder="Enter student name"
                                    value={newStudent.name}
                                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Course</label>
                                <select
                                    className="admin-select"
                                    value={newStudent.course}
                                    onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
                                >
                                    <option>UX/UI Design</option>
                                    <option>Web Development</option>
                                    <option>Data Science</option>
                                    <option>Digital Marketing</option>
                                </select>
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Academic Year</label>
                                <select
                                    className="admin-select"
                                    value={newStudent.year}
                                    onChange={(e) => setNewStudent({ ...newStudent, year: e.target.value })}
                                >
                                    <option>2025-26</option>
                                    <option>2024-25</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                                <button type="button" className="admin-btn admin-btn-outline" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                                <button type="submit" className="admin-btn admin-btn-primary">Create Student</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </SuperAdminLayout>
    );
};

export default StudentManagement;
