import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Globe,
    LogOut,
    ChevronLeft,
    Shield,
    History,
    CreditCard,
    Edit3,
    Camera
} from 'lucide-react';
import logo from '../assets/hope logo.png';

const DonorProfile = () => {
    const navigate = useNavigate();

    // Mock donor data
    const [donorInfo, setDonorInfo] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 000-1234',
        location: 'New York, USA',
        website: 'www.johndoe.com',
        type: 'Individual Platinum Donor',
        joinedDate: 'January 2024',
        totalDonated: '$15,000',
        impactScore: '98',
        profilePic: null
    });

    const donationHistory = [
        { id: 'DON-9821', date: 'Jan 15, 2026', amount: '$1,000', project: 'Digital Literacy 2026', method: 'Visa Card' },
        { id: 'DON-8742', date: 'Dec 02, 2025', amount: '$5,000', project: 'Academic Excellence Fund', method: 'Bank Transfer' },
        { id: 'DON-7651', date: 'Oct 10, 2025', amount: '$2,500', project: 'HOPE3 Infrastructure', method: 'PayPal' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#1e293b' }}>
            {/* Header / Nav */}
            <nav style={{
                padding: '1.5rem 5rem',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderBottom: '1px solid #e2e8f0', background: 'white', position: 'sticky', top: 0, zIndex: 100
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div className="back-btn" onClick={() => navigate('/donor-dashboard')} style={{ cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', background: '#f1f5f9', display: 'flex' }}>
                        <ChevronLeft size={20} />
                    </div>
                    <div className="nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                        <img src={logo} alt="HOPE3 Logo" style={{ height: '32px' }} />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <button
                        onClick={() => navigate('/login')}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', color: '#ef4444', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem', border: 'none' }}
                    >
                        <LogOut size={16} /> Sign Out
                    </button>
                </div>
            </nav>

            <main style={{ maxWidth: '1200px', margin: '0 auto' }} className="mobile-padding-sm">
                <div className="grid-responsive-2" style={{ padding: '3rem 0' }}>

                    {/* Left Column: Profile Overview */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div className="card-clean" style={{ padding: '2.5rem', textAlign: 'center', background: 'white' }}>
                            <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 1.5rem' }}>
                                <div style={{
                                    width: '100%', height: '100%', borderRadius: '50%', background: 'linear-gradient(135deg, #00d1c1, #00b3a6)',
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

                            <button className="btn-primary" style={{ width: '100%', marginTop: '2rem', padding: '0.85rem' }}>
                                <Edit3 size={18} /> Edit Profile
                            </button>
                        </div>

                        <div className="card-clean" style={{ padding: '2rem', background: 'white' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Shield size={20} color="var(--primary)" /> Account Security
                            </h3>
                            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem' }}>Update your security preferences and linked authentication methods.</p>
                            <button className="btn-ghost" style={{ width: '100%', fontSize: '0.85rem', padding: '0.75rem' }}>Change Password</button>
                        </div>
                    </div>

                    {/* Right Column: Detailed Info & Stats */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {/* Summary Stats */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
                            <div className="card-clean" style={{ padding: '2rem', background: 'white' }}>
                                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.5rem' }}>TOTAL CONTRIBUTIONS</p>
                                <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--primary)' }}>{donorInfo.totalDonated}</h3>
                            </div>
                            <div className="card-clean" style={{ padding: '2rem', background: 'white' }}>
                                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.5rem' }}>IMPACT SCORE</p>
                                <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#8b5cf6' }}>{donorInfo.impactScore}</h3>
                            </div>
                            <div className="card-clean" style={{ padding: '2rem', background: 'white' }}>
                                <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.5rem' }}>MEMBER SINCE</p>
                                <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#111827' }}>2024</h3>
                            </div>
                        </div>

                        {/* Donation History Table */}
                        <div className="card-clean" style={{ background: 'white', padding: '2.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 850, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <History size={24} color="var(--primary)" /> Donation History
                                </h3>
                                <button className="btn-ghost" style={{ fontSize: '0.85rem' }}>Download All Receipts</button>
                            </div>

                            <div className="table-container-responsive">
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                                            <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Transaction ID</th>
                                            <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Date</th>
                                            <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Amount</th>
                                            <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Project</th>
                                            <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Method</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {donationHistory.map((item) => (
                                            <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <td style={{ padding: '1.25rem 1rem', fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 700 }}>{item.id}</td>
                                                <td style={{ padding: '1.25rem 1rem', fontSize: '0.9rem', color: '#64748b' }}>{item.date}</td>
                                                <td style={{ padding: '1.25rem 1rem', fontSize: '1rem', fontWeight: 800 }}>{item.amount}</td>
                                                <td style={{ padding: '1.25rem 1rem', fontSize: '0.9rem', color: '#1e293b', fontWeight: 600 }}>{item.project}</td>
                                                <td style={{ padding: '1.25rem 1rem' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.85rem' }}>
                                                        <CreditCard size={14} /> {item.method}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DonorProfile;
