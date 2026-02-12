import React, { useState, useMemo } from 'react';
import SuperAdminLayout from '../../components/SuperAdmin/SuperAdminLayout';
import StudentDetailView from '../../components/SuperAdmin/StudentDetailView';
import AdminTable from '../../components/SuperAdmin/AdminTable';
import { Eye, Search, Filter, CheckCircle, XCircle } from 'lucide-react';

const AppliedStudents = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStudent, setSelectedStudent] = useState(null);

    const [applications, setApplications] = useState([
        { id: 'HOPE3-2026-001', name: 'Alisa Martin', course: 'UX/UI Design', date: '2026-02-05', status: 'Applied', hopeId: 'APP-001' },
        { id: 'HOPE3-2026-002', name: 'Robert Fox', course: 'Web Development', date: '2026-02-04', status: 'Applied', hopeId: 'APP-002' },
        { id: 'HOPE3-2026-003', name: 'Jenny Wilson', course: 'Data Science', date: '2026-02-03', status: 'Applied', hopeId: 'APP-003' },
        { id: 'HOPE3-2026-004', name: 'Cody Fisher', course: 'Digital Marketing', date: '2026-02-02', status: 'Applied', hopeId: 'APP-004' },
        { id: 'HOPE3-2026-005', name: 'Savannah Nguyen', course: 'UX/UI Design', date: '2026-02-01', status: 'Applied', hopeId: 'APP-005' },
    ]);

    const handleStatusUpdate = (id, newStatus) => {
        if (window.confirm(`Are you sure you want to ${newStatus === 'Approved' ? 'approve' : 'reject'} this application?`)) {
            setApplications(applications.map(app =>
                app.id === id ? { ...app, status: newStatus } : app
            ));
        }
    };

    // Filter applications based on search term
    const filteredApplications = useMemo(() => {
        return applications.filter(app =>
            app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.id.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, applications]);

    const colDefs = useMemo(() => [
        { field: 'id', headerName: 'Application ID', flex: 1.5 },
        {
            field: 'name',
            headerName: 'Name',
            cellStyle: { fontWeight: 600 }
        },
        { field: 'course', headerName: 'Course' },
        { field: 'date', headerName: 'Applied Date' },
        {
            field: 'status',
            headerName: 'Status',
            cellRenderer: (params) => {
                let badgeClass = 'status-applied';
                if (params.value === 'Approved') badgeClass = 'status-active';
                if (params.value === 'Rejected') badgeClass = 'status-inactive';

                return <span className={`status-badge ${badgeClass}`}>{params.value}</span>;
            }
        },
        {
            headerName: 'Actions',
            field: 'actions',
            cellRenderer: (params) => (
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button
                        className="action-btn"
                        title="View Details"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStudent(params.data);
                        }}
                    >
                        <Eye size={18} />
                    </button>
                    {params.data.status === 'Applied' && (
                        <>
                            <button
                                className="action-btn"
                                style={{ color: '#10b981', background: '#ecfdf5' }}
                                title="Approve"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleStatusUpdate(params.data.id, 'Approved');
                                }}
                            >
                                <CheckCircle size={18} />
                            </button>
                            <button
                                className="action-btn"
                                style={{ color: '#ef4444', background: '#fef2f2' }}
                                title="Reject"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleStatusUpdate(params.data.id, 'Rejected');
                                }}
                            >
                                <XCircle size={18} />
                            </button>
                        </>
                    )}
                </div>
            ),
            width: 160,
            sortable: false,
            filter: false
        }
    ], [applications]);

    if (selectedStudent) {
        return (
            <SuperAdminLayout
                title="Application Details"
                subtitle={`Viewing application for ${selectedStudent.name}`}
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

                <div className="ag-theme-quartz" style={{ width: '100%' }}>
                    <AdminTable
                        rowData={filteredApplications}
                        colDefs={colDefs}
                        onRowClicked={(event) => setSelectedStudent(event.data)}
                    />
                </div>
            </div>

        </SuperAdminLayout>
    );
};

export default AppliedStudents;
