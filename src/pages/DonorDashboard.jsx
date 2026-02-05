import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, TrendingUp, Users, Target, LogOut, ChevronRight, Activity } from 'lucide-react';

import logo from '../assets/hope logo.png';

const DonorDashboard = () => {
    const navigate = useNavigate();

    const updates = [
        { title: 'New Semester Enrollment', date: 'Feb 1, 2026', content: 'We have successfully filtered 150+ new applications for the upcoming batch.', category: 'OPERATIONS' },
        { title: 'Digital Literacy Workshop', date: 'Jan 25, 2026', content: 'Successfully conducted a 3-day workshop for 40 students on cloud fundamentals.', category: 'COMMUNITY' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#ffffff', color: '#1e293b' }}>
            {/* Background Shapes */}
            <div className="bg-container" style={{ position: 'fixed', opacity: 0.4 }}>
                <div className="organic-blob blob-1" style={{ top: '60%', right: '-10%', left: 'auto', background: 'var(--secondary)' }}></div>
            </div>

            <nav style={{ padding: '2rem 5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', position: 'relative', zIndex: 10 }}>
                <div className="nav-logo" onClick={() => navigate('/')}>
                    <img src={logo} alt="HOPE3 Logo" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <Activity size={18} /> SUPPORTER PORTAL
                    </span>
                    <button
                        onClick={() => navigate('/')}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', color: 'var(--text-muted)', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem' }}
                    >
                        <LogOut size={16} /> Sign Out
                    </button>
                </div>
            </nav>

            <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 2rem', position: 'relative', zIndex: 5 }}>
                <header style={{ marginBottom: '5rem' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', color: '#111827' }}>Your Digital Impact</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px' }}>Real-time updates on how your contributions are transforming student lives at HOPE3 Academy.</p>
                </header>

                {/* Impact Cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem', marginBottom: '6rem' }}>
                    {[
                        { label: 'STUDENTS EMPOWERED', value: '450+', icon: <Users size={24} />, color: 'var(--primary)' },
                        { label: 'COMMUNITY GROWTH', value: '24%', icon: <TrendingUp size={24} />, color: 'var(--secondary)' },
                        { label: 'IMPACT FUNDS USED', value: '$32.5K', icon: <Heart size={24} />, color: '#fbbf24' }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="card-clean"
                            style={{ padding: '3rem 2rem', border: 'none', textAlign: 'left' }}
                        >
                            <div style={{ color: stat.color, marginBottom: '1.5rem' }}>{stat.icon}</div>
                            <div style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', letterSpacing: '-1px' }}>{stat.value}</div>
                            <div style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Updates Feed */}
                <section>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.5rem' }}>Latest Mission Updates</h2>
                        <button style={{ background: 'none', color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem' }}>View All History</button>
                    </div>

                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {updates.map((update, i) => (
                            <motion.div
                                key={i}
                                className="card-clean"
                                style={{ padding: '2.5rem', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                <div>
                                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '1rem' }}>
                                        <span style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '0.05em' }}>{update.category}</span>
                                        <span style={{ fontSize: '0.85rem', color: '#cbd5e1', fontWeight: '500' }}>{update.date}</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.8rem', color: '#111827' }}>{update.title}</h3>
                                    <p style={{ color: 'var(--text-muted)', maxWidth: '850px', lineHeight: '1.7' }}>{update.content}</p>
                                </div>
                                <button style={{ background: 'rgba(0, 209, 193, 0.05)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                                    <ChevronRight size={20} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default DonorDashboard;
