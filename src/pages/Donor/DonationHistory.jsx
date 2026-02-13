import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Download, Calendar, DollarSign, CreditCard } from 'lucide-react';
import DonorTable from '@/components/Donor/DonorTable';

const DonationHistory = ({ history }) => {
    const colDefs = useMemo(() => [
        {
            field: 'date',
            headerName: 'Date',
            cellRenderer: (params) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600 }}>
                    <Calendar size={16} color="var(--primary)" />
                    {params.value}
                </div>
            )
        },
        {
            field: 'amount',
            headerName: 'Amount',
            cellRenderer: (params) => (
                <div style={{ fontWeight: 800, color: '#111827' }}>
                    ₹{params.value.toLocaleString()}
                </div>
            )
        },
        {
            field: 'mode',
            headerName: 'Payment Mode',
            cellRenderer: (params) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                    <CreditCard size={14} />
                    {params.value}
                </div>
            )
        },
        {
            field: 'type',
            headerName: 'Frequency',
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
                        background: '#ecfdf5',
                        color: '#059669',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        border: '1px solid #d1fae5'
                    }}>
                        {params.value}
                    </span>
                </div>
            )
        }
    ], []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
        >
            <div className="card-clean" style={{ padding: '0', background: 'white', overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#111827' }}>Donation History</h3>
                        <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>Detailed record of all your contributions to HOPE3</p>
                    </div>
                    <button className="btn-ghost" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem', borderRadius: '12px' }}>
                        <Download size={18} /> Export Statement
                    </button>
                </div>
                <div style={{ padding: '1.5rem' }}>
                    <DonorTable rowData={history} colDefs={colDefs} />
                </div>
            </div>
        </motion.div>
    );
};

export default DonationHistory;

