import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Shield,
    History,
    CreditCard,
    Edit3,
    Camera,
    ChevronRight,
    ExternalLink
} from 'lucide-react';
import DonorLayout from '@/components/Donor/DonorLayout';
import DonorTable from '@/components/Donor/DonorTable';

const DonorProfile = () => {
    // Mock donor data
    const [donorInfo, setDonorInfo] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+91 98765 43210',
        location: 'Tamil Nadu, India',
        type: 'Platinum Supporter',
        joinedDate: 'January 2024',
        totalDonated: '₹45,000',
        impactScore: '98',
    });

    const donationHistory = [
        { id: 'DON-9821', date: 'Jan 15, 2026', amount: 5000, project: 'Semester Fee Support', method: 'UPI' },
        { id: 'DON-8742', date: 'Dec 02, 2025', amount: 10000, project: 'General Education Fund', method: 'Bank Transfer' },
        { id: 'DON-7651', date: 'Oct 10, 2025', amount: 5000, project: 'Food Support', method: 'UPI' },
    ];

    const colDefs = useMemo(() => [
        {
            field: 'id',
            headerName: 'TXN ID',
            cellStyle: { color: 'var(--primary)', fontWeight: 800 }
        },
        {
            field: 'date',
            headerName: 'Date',
            cellStyle: { color: '#64748b' }
        },
        {
            field: 'amount',
            headerName: 'Amount',
            cellRenderer: (params) => (
                <div style={{ fontWeight: 800 }}>₹{params.value.toLocaleString()}</div>
            )
        },
        {
            field: 'project',
            headerName: 'Impact Fund',
            cellStyle: { fontWeight: 600 }
        },
        {
            field: 'method',
            headerName: 'Method',
            cellRenderer: (params) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                    <CreditCard size={14} /> {params.value}
                </div>
            )
        }
    ], []);

    const impactScore = donorInfo.impactScore; // Define impactScore from donorInfo

    return (
        <DonorLayout title="My Profile" subtitle="Manage your account settings and preferences">
            <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 1024 ? '1fr' : '1fr 2fr', gap: '2rem' }}>

                {/* Left Column: Profile Card */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="card-clean" style={{ padding: '2.5rem', textAlign: 'center', background: 'white' }}>
                        <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 1.5rem' }}>
                            <div style={{
                                width: '100%', height: '100%', borderRadius: '50%', background: 'var(--primary)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                            }}>
                                <User size={60} />
                            </div>
                            <div style={{
                                position: 'absolute', bottom: '0', right: '0', background: 'white', padding: '0.4rem',
                                borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', cursor: 'pointer'
                            }}>
                                <Camera size={18} color="var(--primary)" />
                            </div>
                        </div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', marginBottom: '0.3rem' }}>{donorInfo.name}</h2>
                        <p style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{donorInfo.type}</p>

                        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#64748b' }}>
                                <Mail size={18} />
                                <span style={{ fontSize: '0.9rem' }}>{donorInfo.email}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#64748b' }}>
                                <Phone size={18} />
                                <span style={{ fontSize: '0.9rem' }}>{donorInfo.phone}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#64748b' }}>
                                <MapPin size={18} />
                                <span style={{ fontSize: '0.9rem' }}>{donorInfo.location}</span>
                            </div>
                        </div>

                        <button className="btn-premium" style={{ width: '100%', marginTop: '2rem', padding: '0.85rem', justifyContent: 'center' }}>
                            <Edit3 size={18} /> Edit Profile
                        </button>
                    </div>

                    <div className="card-clean" style={{ padding: '2rem', background: 'white' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Shield size={20} color="var(--primary)" /> Security & Privacy
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <button className="btn-ghost" style={{ justifyContent: 'space-between', padding: '0.8rem 1rem', borderRadius: '10px' }}>
                                <span>Change Password</span>
                                <ChevronRight size={16} />
                            </button>
                            <button className="btn-ghost" style={{ justifyContent: 'space-between', padding: '0.8rem 1rem', borderRadius: '10px' }}>
                                <span>Notification Settings</span>
                                <ChevronRight size={16} />
                            </button>
                            <button className="btn-ghost" style={{ justifyContent: 'space-between', padding: '0.8rem 1rem', borderRadius: '10px' }}>
                                <span>Privacy Policy</span>
                                <ExternalLink size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Stats & History */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Summary Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div className="card-clean" style={{ padding: '2rem', background: 'white', borderLeft: '4px solid var(--primary)' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Total Contributed</p>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--primary)' }}>{donorInfo.totalDonated}</h3>
                        </div>
                        <div className="card-clean" style={{ padding: '2rem', background: 'white', borderLeft: '4px solid #8b5cf6' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Impact Score</p>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#8b5cf6' }}>{impactScore}</h3>
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="card-clean" style={{ background: 'white', padding: '0', overflow: 'hidden' }}>
                        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0 }}>
                                <History size={22} color="var(--primary)" /> Recent Transactions
                            </h3>
                        </div>

                        <div style={{ padding: '1.5rem', overflowX: 'auto' }}>
                            <DonorTable rowData={donationHistory} colDefs={colDefs} />
                        </div>
                    </div>
                </div>
            </div>
        </DonorLayout>
    );
};

export default DonorProfile;
