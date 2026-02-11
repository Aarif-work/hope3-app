import React, { useState, useMemo } from 'react';
import SuperAdminLayout from '../../components/SuperAdmin/SuperAdminLayout';
import AdminTable from '../../components/SuperAdmin/AdminTable';
import {
    Plus,
    Search,
    Edit,
    Key,
    UserX,
    UserCheck
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

    // Filter admins based on search term
    const filteredAdmins = useMemo(() => {
        return admins.filter(admin =>
            admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            admin.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const colDefs = useMemo(() => [
        {
            field: 'name',
            headerName: 'Admin Name',
            cellStyle: { fontWeight: 600 }
        },
        { field: 'email', headerName: 'Email Address', flex: 1.5 },
        {
            field: 'role',
            headerName: 'Role Type',
            cellRenderer: (params) => (
                <span className="status-badge" style={getRoleBadgeStyle(params.value)}>
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
                    <button className="action-btn" title="Edit Admin">
                        <Edit size={16} />
                    </button>
                    <button className="action-btn" title="Reset Password">
                        <Key size={16} />
                    </button>
                    <button className="action-btn" title={params.data.status === 'Active' ? 'Deactivate' : 'Activate'}>
                        {params.data.status === 'Active' ? <UserX size={16} /> : <UserCheck size={16} />}
                    </button>
                </div>
            ),
            width: 150,
            sortable: false,
            filter: false
        }
    ], []);

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

                <div className="ag-theme-quartz" style={{ width: '100%' }}>
                    <AdminTable
                        rowData={filteredAdmins}
                        colDefs={colDefs}
                    />
                </div>
            </div>
        </SuperAdminLayout>
    );
};

export default AdminsPage;
