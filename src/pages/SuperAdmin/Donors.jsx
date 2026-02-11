import React, { useState, useMemo } from 'react';
import SuperAdminLayout from '../../components/SuperAdmin/SuperAdminLayout';
import AdminTable from '../../components/SuperAdmin/AdminTable';
import {
    Plus,
    Search,
    Eye,
    Settings,
    UserX,
    UserCheck
} from 'lucide-react';

const DonorsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const donors = [
        { id: 1, name: 'Global Tech Corp', contact: 'Mark Spencer', type: 'Corporate', status: 'Active', visibility: 'Full' },
        { id: 2, name: 'Heritage Foundation', contact: 'Emily Watson', type: 'NGO', status: 'Active', visibility: 'Restricted' },
        { id: 3, name: 'Dr. Robert Wilson', contact: 'Robert Wilson', type: 'Individual', status: 'Inactive', visibility: 'Basic' },
    ];

    // Filter donors based on search term
    const filteredDonors = useMemo(() => {
        return donors.filter(donor =>
            donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donor.contact.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

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
                <span style={{
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    border: '1px solid var(--admin-border)',
                    color: 'var(--admin-text-light)'
                }}>
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
                    <button className="action-btn" title="Visibility Settings">
                        <Settings size={16} />
                    </button>
                    <button className="action-btn" title="View Donor Dashboard">
                        <Eye size={16} />
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
                    <button className="admin-btn admin-btn-primary">
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

        </SuperAdminLayout>
    );
};

export default DonorsPage;
