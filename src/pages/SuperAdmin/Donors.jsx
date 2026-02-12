import React, { useState, useMemo } from 'react';
import SuperAdminLayout from '../../components/SuperAdmin/SuperAdminLayout';
import AdminTable from '../../components/SuperAdmin/AdminTable';
import {
    Plus,
    Search,
    Eye,
    Settings,
    UserX,
    UserCheck,
    Trash2
} from 'lucide-react';

const DonorsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [donors, setDonors] = useState([
        { id: 1, name: 'Global Tech Corp', contact: 'Mark Spencer', type: 'Corporate', status: 'Active', visibility: 'Full' },
        { id: 2, name: 'Heritage Foundation', contact: 'Emily Watson', type: 'NGO', status: 'Active', visibility: 'Restricted' },
        { id: 3, name: 'Dr. Robert Wilson', contact: 'Robert Wilson', type: 'Individual', status: 'Inactive', visibility: 'Basic' },
    ]);

    const [newDonor, setNewDonor] = useState({ name: '', contact: '', type: 'Individual' });

    const handleAddDonor = (e) => {
        e.preventDefault();
        const newId = donors.length > 0 ? Math.max(...donors.map(d => d.id)) + 1 : 1;
        setDonors([...donors, { ...newDonor, id: newId, status: 'Active', visibility: 'Basic' }]);
        setIsAddModalOpen(false);
        setNewDonor({ name: '', contact: '', type: 'Individual' });
    };

    const handleDeleteDonor = (id) => {
        if (window.confirm('Are you sure you want to delete this donor?')) {
            setDonors(donors.filter(d => d.id !== id));
        }
    };

    const toggleStatus = (id) => {
        setDonors(donors.map(d =>
            d.id === id ? { ...d, status: d.status === 'Active' ? 'Inactive' : 'Active' } : d
        ));
    };

    const toggleVisibility = (id) => {
        const levels = ['Basic', 'Restricted', 'Full'];
        setDonors(donors.map(d => {
            if (d.id === id) {
                const currentIndex = levels.indexOf(d.visibility);
                const nextIndex = (currentIndex + 1) % levels.length;
                return { ...d, visibility: levels[nextIndex] };
            }
            return d;
        }));
    };

    // Filter donors based on search term
    const filteredDonors = useMemo(() => {
        return donors.filter(donor =>
            donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donor.contact.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, donors]);

    const colDefs = useMemo(() => [
        {
            field: 'name',
            headerName: 'Donor Organization / Name',
            flex: 1.5,
            cellStyle: { fontWeight: 600 }
        },
        { field: 'contact', headerName: 'Primary Contact' },
        { field: 'type', headerName: 'Donor Type' },
        {
            field: 'visibility',
            headerName: 'Data Visibility',
            cellRenderer: (params) => (
                <span
                    onClick={() => toggleVisibility(params.data.id)}
                    style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        border: '1px solid var(--admin-border)',
                        color: 'var(--admin-text-light)',
                        cursor: 'pointer',
                        userSelect: 'none'
                    }}
                    title="Click to cycle visibility level"
                >
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
                    <button
                        className="action-btn"
                        title="Visibility Settings"
                        onClick={() => toggleVisibility(params.data.id)}
                    >
                        <Settings size={16} />
                    </button>
                    <button className="action-btn" title="View Donor Dashboard">
                        <Eye size={16} />
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
                        title="Delete Donor"
                        onClick={() => handleDeleteDonor(params.data.id)}
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ),
            width: 180,
            sortable: false,
            filter: false
        }
    ], [donors]);

    return (
        <SuperAdminLayout
            title="Donor Accounts"
            subtitle="Manage donor accounts and control their data visibility"
        >
            <div className="admin-card">
                <div className="card-header">
                    <div className="search-wrapper">
                        <Search size={18} className="search-icon-pos" />
                        <input
                            type="text"
                            placeholder="Search donors or contacts..."
                            className="admin-input-search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        className="admin-btn admin-btn-primary"
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        <Plus size={18} /> Add Donor
                    </button>
                </div>

                <div className="ag-theme-quartz" style={{ width: '100%' }}>
                    <AdminTable
                        rowData={filteredDonors}
                        colDefs={colDefs}
                    />
                </div>
            </div>

            {/* Add Donor Modal */}
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
                        <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>Add New Donor</h3>
                        <form onSubmit={handleAddDonor}>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Organization / Name</label>
                                <input
                                    type="text"
                                    className="admin-input"
                                    placeholder="Enter donor name"
                                    value={newDonor.name}
                                    onChange={(e) => setNewDonor({ ...newDonor, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Primary Contact</label>
                                <input
                                    type="text"
                                    className="admin-input"
                                    placeholder="Contact person name"
                                    value={newDonor.contact}
                                    onChange={(e) => setNewDonor({ ...newDonor, contact: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Donor Type</label>
                                <select
                                    className="admin-select"
                                    value={newDonor.type}
                                    onChange={(e) => setNewDonor({ ...newDonor, type: e.target.value })}
                                >
                                    <option>Individual</option>
                                    <option>Corporate</option>
                                    <option>NGO</option>
                                    <option>Government</option>
                                </select>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                                <button type="button" className="admin-btn admin-btn-outline" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                                <button type="submit" className="admin-btn admin-btn-primary">Add Donor</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </SuperAdminLayout>
    );
};

export default DonorsPage;
