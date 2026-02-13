import React, { useState, useMemo } from 'react';
import SuperAdminLayout from '../../components/SuperAdmin/SuperAdminLayout';
import AdminTable from '../../components/SuperAdmin/AdminTable';
import {
    Plus,
    Search,
    Edit,
    Key,
    UserX,
    UserCheck,
    Trash2
} from 'lucide-react';

const AdminsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [admins, setAdmins] = useState([
        { id: 1, name: 'Aarif Rahaman', email: 'aarif@hope3.org', role: 'Founder', status: 'Active' },
        { id: 2, name: 'Sarah Jamal', email: 'sarah@hope3.org', role: 'Staff', status: 'Active' },
        { id: 3, name: 'Mohammed Ali', email: 'ali@hope3.org', role: 'Volunteer', status: 'Inactive' },
        { id: 4, name: 'Priya Dharshini', email: 'priya@hope3.org', role: 'Staff', status: 'Active' },
    ]);

    const [newAdmin, setNewAdmin] = useState({ name: '', email: '', role: 'Staff' });

    const getRoleBadgeStyle = (role) => {
        switch (role) {
            case 'Founder': return { background: '#fef3f2', color: '#b91c1c' };
            case 'Staff': return { background: '#f5f3ff', color: '#6d28d9' };
            case 'Volunteer': return { background: '#ecfdf5', color: '#047857' };
            default: return { background: '#f8fafc', color: '#475569' };
        }
    };

    const handleAddAdmin = (e) => {
        e.preventDefault();
        const newId = admins.length > 0 ? Math.max(...admins.map(a => a.id)) + 1 : 1;
        setAdmins([...admins, { ...newAdmin, id: newId, status: 'Active' }]);
        setIsAddModalOpen(false);
        setNewAdmin({ name: '', email: '', role: 'Staff' });
    };

    const handleDeleteAdmin = (id) => {
        if (window.confirm('Are you sure you want to remove this admin?')) {
            setAdmins(admins.filter(a => a.id !== id));
        }
    };

    const toggleStatus = (id) => {
        setAdmins(admins.map(a => a.id === id ? { ...a, status: a.status === 'Active' ? 'Inactive' : 'Active' } : a));
    };

    // Filter admins based on search term
    const filteredAdmins = useMemo(() => {
        return admins.filter(admin =>
            admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            admin.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, admins]);

    const colDefs = useMemo(() => [
        {
            field: 'name',
            headerName: 'Admin Name',
            flex: 1.2,
            minWidth: 150,
            cellStyle: {
                fontWeight: 600,
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
            }
        },
        {
            field: 'email',
            headerName: 'Email Address',
            flex: 1.5,
            minWidth: 200,
            cellStyle: {
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
            }
        },
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
                <span
                    onClick={() => toggleStatus(params.data.id)}
                    className={`status-badge ${params.value === 'Active' ? 'status-active' : 'status-inactive'}`}
                    style={{ cursor: 'pointer' }}
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
                    <button className="action-btn" title="Edit Admin">
                        <Edit size={16} />
                    </button>
                    <button
                        className="action-btn"
                        title={params.data.status === 'Active' ? 'Deactivate' : 'Activate'}
                        onClick={() => toggleStatus(params.data.id)}
                    >
                        {params.data.status === 'Active' ? <UserX size={16} /> : <UserCheck size={16} />}
                    </button>
                    <button
                        className="action-btn action-btn-delete"
                        title="Delete Admin"
                        onClick={() => handleDeleteAdmin(params.data.id)}
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ),
            width: 150,
            sortable: false,
            filter: false
        }
    ], [admins]);

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
                    <button
                        className="admin-btn admin-btn-primary"
                        onClick={() => setIsAddModalOpen(true)}
                    >
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

            {/* Add Admin Modal */}
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
                        <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>Create New Admin</h3>
                        <form onSubmit={handleAddAdmin}>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="admin-input"
                                    placeholder="Enter full name"
                                    value={newAdmin.name}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Email Address</label>
                                <input
                                    type="email"
                                    className="admin-input"
                                    placeholder="admin@example.com"
                                    value={newAdmin.email}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Role</label>
                                <select
                                    className="admin-select"
                                    value={newAdmin.role}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                                >
                                    <option>Staff</option>
                                    <option>Volunteer</option>
                                    <option>Founder</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                                <button type="button" className="admin-btn admin-btn-outline" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                                <button type="submit" className="admin-btn admin-btn-primary">Create Admin</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </SuperAdminLayout>
    );
};

export default AdminsPage;
