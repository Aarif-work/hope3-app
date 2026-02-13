import React, { useState, useMemo } from 'react';
import SuperAdminLayout from '../../components/SuperAdmin/SuperAdminLayout';
import AdminTable from '../../components/SuperAdmin/AdminTable';
import Modal from '../../components/SuperAdmin/Modal';
import {
    Plus,
    Search,
    Eye,
    Settings,
    UserX,
    UserCheck,
    Trash2,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    DollarSign,
    Calendar
} from 'lucide-react';

const DonorsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedDonor, setSelectedDonor] = useState(null);
    const [showMissedPaymentsOnly, setShowMissedPaymentsOnly] = useState(false);

    const [donors, setDonors] = useState([
        {
            id: 1,
            name: 'Global Tech Corp',
            contact: 'Mark Spencer',
            type: 'Corporate',
            paymentType: 'One-time',
            totalDonated: 25000,
            lastPaymentDate: '2026-01-15',
            monthlyStatus: 'N/A',
            status: 'Active',
            visibility: 'Full',
            logs: [
                { date: '2026-01-15', amount: 15000, type: 'Payment' },
                { date: '2025-12-10', amount: 10000, type: 'Payment' }
            ],
            createdAt: '2025-10-01'
        },
        {
            id: 2,
            name: 'Heritage Foundation',
            contact: 'Emily Watson',
            type: 'NGO',
            paymentType: 'Monthly',
            totalDonated: 5000,
            lastPaymentDate: '2026-02-01',
            monthlyStatus: 'Paid',
            status: 'Active',
            visibility: 'Restricted',
            logs: [
                { date: '2026-02-01', amount: 500, type: 'Payment' },
                { date: '2026-01-01', amount: 500, type: 'Payment' },
                { date: '2025-12-01', amount: 500, type: 'Payment' }
            ],
            createdAt: '2025-08-15'
        },
        {
            id: 3,
            name: 'Dr. Robert Wilson',
            contact: 'Robert Wilson',
            type: 'Individual',
            paymentType: 'Monthly',
            totalDonated: 1200,
            lastPaymentDate: '2026-01-05',
            monthlyStatus: 'Missed',
            status: 'Inactive',
            visibility: 'Basic',
            logs: [
                { date: '2026-02-05', amount: 0, type: 'Missed' },
                { date: '2026-01-05', amount: 200, type: 'Payment' }
            ],
            createdAt: '2026-01-01'
        },
        {
            id: 4,
            name: 'Sarah Jenkins',
            contact: 'Sarah Jenkins',
            type: 'Individual',
            paymentType: 'Monthly',
            totalDonated: 800,
            lastPaymentDate: '2026-01-10',
            monthlyStatus: 'Missed',
            status: 'Active',
            visibility: 'Basic',
            logs: [
                { date: '2026-02-10', amount: 0, type: 'Missed' },
                { date: '2026-01-10', amount: 200, type: 'Payment' }
            ],
            createdAt: '2025-11-20'
        }
    ]);

    const [newDonor, setNewDonor] = useState({ name: '', contact: '', type: 'Individual', paymentType: 'Monthly' });

    const handleAddDonor = (e) => {
        e.preventDefault();
        const newId = donors.length > 0 ? Math.max(...donors.map(d => d.id)) + 1 : 1;
        setDonors([...donors, {
            ...newDonor,
            id: newId,
            status: 'Active',
            visibility: 'Basic',
            totalDonated: 0,
            lastPaymentDate: '-',
            monthlyStatus: newDonor.paymentType === 'Monthly' ? 'Pending' : 'N/A',
            logs: [],
            createdAt: new Date().toISOString().split('T')[0]
        }]);
        setIsAddModalOpen(false);
        setNewDonor({ name: '', contact: '', type: 'Individual', paymentType: 'Monthly' });
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

    const viewDonorDetails = (donor) => {
        setSelectedDonor(donor);
        setIsDetailsModalOpen(true);
    };

    // Filter donors based on search term and missed payments toggle
    const filteredDonors = useMemo(() => {
        return donors.filter(donor => {
            const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                donor.contact.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesMissed = showMissedPaymentsOnly ? (donor.paymentType === 'Monthly' && donor.monthlyStatus === 'Missed') : true;
            return matchesSearch && matchesMissed;
        });
    }, [searchTerm, donors, showMissedPaymentsOnly]);

    const colDefs = useMemo(() => [
        {
            field: 'name',
            headerName: 'Donor / Organization',
            flex: 1.5,
            minWidth: 200,
            cellStyle: {
                fontWeight: 600,
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
            }
        },
        {
            field: 'paymentType',
            headerName: 'Type',
            cellRenderer: (params) => (
                <span style={{
                    fontSize: '0.75rem',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    background: params.value === 'Monthly' ? '#eff6ff' : '#f8fafc',
                    color: params.value === 'Monthly' ? '#2563eb' : '#64748b',
                    fontWeight: 600
                }}>
                    {params.value}
                </span>
            )
        },
        {
            field: 'totalDonated',
            headerName: 'Total Donated',
            cellRenderer: (params) => `$${params.value.toLocaleString()}`,
            cellStyle: { fontWeight: 600, color: 'var(--admin-primary)' }
        },
        { field: 'lastPaymentDate', headerName: 'Last Payment' },
        {
            field: 'monthlyStatus',
            headerName: 'Monthly Status',
            cellRenderer: (params) => {
                if (params.value === 'N/A') return <span style={{ color: '#cbd5e1' }}>—</span>;
                return (
                    <span className={`status-badge ${params.value === 'Paid' ? 'status-active' : 'status-pending'}`} style={{ fontSize: '0.7rem' }}>
                        {params.value}
                    </span>
                );
            }
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
                        title="View Full Details & Logs"
                        onClick={() => viewDonorDetails(params.data)}
                    >
                        <Eye size={16} />
                    </button>
                    <button
                        className="action-btn"
                        title="Visibility Settings"
                        onClick={() => toggleVisibility(params.data.id)}
                    >
                        <Settings size={16} />
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
            title="Donor Monitoring"
            subtitle="Monitor donor contributions, monthly commitments and activity logs"
        >
            <div className="admin-card">
                <div className="card-header">
                    <div style={{ display: 'flex', gap: '1rem', flex: 1, minWidth: '300px' }}>
                        <div className="search-wrapper">
                            <Search size={18} className="search-icon-pos" />
                            <input
                                type="text"
                                placeholder="Search donors..."
                                className="admin-input-search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            className={`admin-btn ${showMissedPaymentsOnly ? 'admin-btn-primary' : 'admin-btn-outline'}`}
                            onClick={() => setShowMissedPaymentsOnly(!showMissedPaymentsOnly)}
                            style={{ gap: '0.5rem' }}
                        >
                            <Filter size={16} />
                            {showMissedPaymentsOnly ? 'Showing Missed' : 'Show Missed Monthly'}
                        </button>
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

            {/* Donor Details & Logs Modal */}
            <Modal
                isOpen={isDetailsModalOpen}
                onClose={() => setIsDetailsModalOpen(false)}
                title="Donor Activity Logs"
                maxWidth="600px"
            >
                {selectedDonor && (
                    <div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2rem', padding: '1.25rem', background: '#f8fafc', borderRadius: '12px' }}>
                            <div>
                                <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>Donor Name</p>
                                <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>{selectedDonor.name}</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>Account Created</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                                    <Clock size={14} /> {selectedDonor.createdAt}
                                </div>
                            </div>
                            <div>
                                <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>Total Donated</p>
                                <p style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--admin-primary)' }}>${selectedDonor.totalDonated.toLocaleString()}</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.25rem' }}>Donor Type</p>
                                <p style={{ fontWeight: 600 }}>{selectedDonor.paymentType}</p>
                            </div>
                        </div>

                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Calendar size={18} /> Transaction Logs (Read-only)
                        </h4>

                        <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
                            {selectedDonor.logs && selectedDonor.logs.length > 0 ? (
                                <table className="admin-table" style={{ margin: 0 }}>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Type</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedDonor.logs.map((log, i) => (
                                            <tr key={i}>
                                                <td>{log.date}</td>
                                                <td>
                                                    <span style={{
                                                        color: log.type === 'Payment' ? '#16a34a' : '#ef4444',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.3rem',
                                                        fontSize: '0.75rem',
                                                        fontWeight: 600
                                                    }}>
                                                        {log.type === 'Payment' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                                        {log.type === 'Payment' ? 'Payment Made' : 'Month Skipped'}
                                                    </span>
                                                </td>
                                                <td style={{ fontWeight: 600 }}>{log.amount > 0 ? `$${log.amount}` : '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
                                    No activity logs found for this donor.
                                </div>
                            )}
                        </div>
                        <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '1rem', fontStyle: 'italic' }}>
                            * Financial records are immutable and cannot be edited or deleted.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                            <button className="admin-btn admin-btn-outline" onClick={() => setIsDetailsModalOpen(false)}>Close Details</button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* Add Donor Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add New Donor"
            >
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
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="admin-form-group">
                            <label className="admin-form-label">Donor Category</label>
                            <select
                                className="admin-select"
                                value={newDonor.type}
                                onChange={(e) => setNewDonor({ ...newDonor, type: e.target.value })}
                            >
                                <option>Individual</option>
                                <option>Corporate</option>
                                <option>NGO</option>
                            </select>
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-form-label">Donation Type</label>
                            <select
                                className="admin-select"
                                value={newDonor.paymentType}
                                onChange={(e) => setNewDonor({ ...newDonor, paymentType: e.target.value })}
                            >
                                <option value="Monthly">Monthly Recurring</option>
                                <option value="One-time">One-time Donation</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                        <button type="button" className="admin-btn admin-btn-outline" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                        <button type="submit" className="admin-btn admin-btn-primary">Create Donor Account</button>
                    </div>
                </form>
            </Modal>
        </SuperAdminLayout>
    );
};

export default DonorsPage;
