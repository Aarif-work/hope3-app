import React, { useState, useMemo } from 'react';
import SuperAdminLayout from '../../components/SuperAdmin/SuperAdminLayout';
import AdminTable from '../../components/SuperAdmin/AdminTable';
import {
    Search,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    Download
} from 'lucide-react';

const DonationsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');

    // Sample data aggregated from donors
    const [donations] = useState([
        { id: 1, donorName: 'Global Tech Corp', amount: 15000, date: '2026-01-15', type: 'Payment', category: 'Corporate' },
        { id: 2, donorName: 'Global Tech Corp', amount: 10000, date: '2025-12-10', type: 'Payment', category: 'Corporate' },
        { id: 3, donorName: 'Heritage Foundation', amount: 500, date: '2026-02-01', type: 'Payment', category: 'NGO' },
        { id: 4, donorName: 'Heritage Foundation', amount: 500, date: '2026-01-01', type: 'Payment', category: 'NGO' },
        { id: 5, donorName: 'Heritage Foundation', amount: 500, date: '2025-12-01', type: 'Payment', category: 'NGO' },
        { id: 6, donorName: 'Dr. Robert Wilson', amount: 0, date: '2026-02-05', type: 'Missed', category: 'Individual' },
        { id: 7, donorName: 'Dr. Robert Wilson', amount: 200, date: '2026-01-05', type: 'Payment', category: 'Individual' },
        { id: 8, donorName: 'Sarah Jenkins', amount: 0, date: '2026-02-10', type: 'Missed', category: 'Individual' },
        { id: 9, donorName: 'Sarah Jenkins', amount: 200, date: '2026-01-10', type: 'Payment', category: 'Individual' }
    ]);

    const filteredDonations = useMemo(() => {
        return donations.filter(donation => {
            const matchesSearch = donation.donorName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filterType === 'All' ||
                (filterType === 'Payments' && donation.type === 'Payment') ||
                (filterType === 'Missed' && donation.type === 'Missed');
            return matchesSearch && matchesFilter;
        });
    }, [searchTerm, filterType, donations]);

    const colDefs = useMemo(() => [
        {
            field: 'donorName',
            headerName: 'Donor Name',
            flex: 1.5,
            cellStyle: { fontWeight: 600 }
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 130
        },
        {
            field: 'date',
            headerName: 'Date',
            width: 150,
            cellRenderer: (params) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={14} className="text-slate-400" />
                    {params.value}
                </div>
            )
        },
        {
            field: 'type',
            headerName: 'Type',
            width: 150,
            cellRenderer: (params) => (
                <span style={{
                    color: params.value === 'Payment' ? '#16a34a' : '#ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    background: params.value === 'Payment' ? '#f0fdf4' : '#fef2f2',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '20px',
                    width: 'fit-content'
                }}>
                    {params.value === 'Payment' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {params.value === 'Payment' ? 'Received' : 'Missed'}
                </span>
            )
        },
        {
            field: 'amount',
            headerName: 'Amount',
            width: 150,
            cellRenderer: (params) => (
                <span style={{
                    fontWeight: 700,
                    color: params.data.type === 'Payment' ? '#1e293b' : '#94a3b8'
                }}>
                    {params.value > 0 ? `$${params.value.toLocaleString()}` : '-'}
                </span>
            )
        }
    ], []);

    return (
        <SuperAdminLayout
            title="Donations History"
            subtitle="View and manage all donor contributions and payment logs"
        >
            <div className="admin-card">
                <div className="card-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                    <div className="search-wrapper" style={{ flex: 1, minWidth: '250px' }}>
                        <Search size={18} className="search-icon-pos" />
                        <input
                            type="text"
                            placeholder="Search by donor..."
                            className="admin-input-search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <select
                            className="admin-select"
                            style={{ padding: '0.5rem 2rem 0.5rem 1rem', width: 'auto' }}
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="All">All Transactions</option>
                            <option value="Payments">Payments Only</option>
                            <option value="Missed">Missed Only</option>
                        </select>
                        <button className="admin-btn admin-btn-outline" style={{ gap: '0.5rem' }}>
                            <Download size={18} /> Export List
                        </button>
                    </div>
                </div>

                <div className="ag-theme-quartz" style={{ width: '100%' }}>
                    <AdminTable
                        rowData={filteredDonations}
                        colDefs={colDefs}
                    />
                </div>
            </div>
        </SuperAdminLayout>
    );
};

export default DonationsPage;
