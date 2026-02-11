import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, TrendingUp, Users, Target, LogOut, ChevronRight, Activity, Menu } from 'lucide-react';

import logo from '../assets/hope logo.png';

const DonorDashboard = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const updates = [
        { title: 'New Semester Enrollment', date: 'Feb 1, 2026', content: 'We have successfully filtered 150+ new applications for the upcoming batch.', category: 'OPERATIONS' },
        { title: 'Digital Literacy Workshop', date: 'Jan 25, 2026', content: 'Successfully conducted a 3-day workshop for 40 students on cloud fundamentals.', category: 'COMMUNITY' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#ffffff', color: '#1e293b', overflowX: 'hidden' }}>
            {/* Background Shapes */}
            <div className="bg-container" style={{ position: 'fixed', opacity: 0.4, pointerEvents: 'none' }}>
                <div className="organic-blob blob-1" style={{ top: '60%', right: '-10%', left: 'auto', background: 'var(--secondary)' }}></div>
            </div>

            <nav style={{
                padding: window.innerWidth <= 768 ? '1rem 1.5rem' : '1.5rem 5rem',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderBottom: '1px solid #f1f5f9', position: 'sticky', top: 0, zIndex: 100,
                background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)'
            }}>
                <div className="nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <img src={logo} alt="HOPE3 Logo" style={{ height: window.innerWidth <= 768 ? '32px' : '40px' }} />
                </div>

                {/* Desktop Nav */}
                <div style={{ display: window.innerWidth <= 768 ? 'none' : 'flex', alignItems: 'center', gap: '3rem' }}>
                    <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <Activity size={18} /> SUPPORTER PORTAL
                    </span>
                    <button
                        onClick={() => navigate('/')}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', color: 'var(--text-muted)', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem', border: 'none' }}
                    >
                        <LogOut size={16} /> Sign Out
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    style={{
                        display: window.innerWidth <= 768 ? 'flex' : 'none',
                        background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer'
                    }}
                >
                    <Menu size={24} />
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        position: 'fixed', top: '70px', left: 0, right: 0, background: 'white',
                        padding: '2rem', zIndex: 90, borderBottom: '1px solid #f1f5f9',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <Activity size={18} /> SUPPORTER PORTAL
                        </span>
                        <button
                            onClick={() => navigate('/')}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f8fafc', color: '#ef4444', fontWeight: '700', cursor: 'pointer', fontSize: '1rem', border: 'none', padding: '1rem', borderRadius: '12px' }}
                        >
                            <LogOut size={16} /> Sign Out
                        </button>
                    </div>
                </motion.div>
            )}

            <main style={{
                maxWidth: '1200px', margin: '0 auto',
                padding: window.innerWidth <= 768 ? '3rem 1.5rem' : '5rem 2rem',
                position: 'relative', zIndex: 5
            }}>
                <header style={{ marginBottom: window.innerWidth <= 768 ? '3rem' : '5rem' }}>
                    <h1 style={{ fontSize: window.innerWidth <= 768 ? '2rem' : '3.5rem', marginBottom: '1.5rem', color: '#111827', fontWeight: 900, lineHeight: 1.1 }}>Your Digital Impact</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: window.innerWidth <= 768 ? '1rem' : '1.1rem', maxWidth: '600px', lineHeight: 1.7 }}>Real-time updates on how your contributions are transforming student lives at HOPE3 Academy.</p>
                </header>

                {/* Impact Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(3, 1fr)',
                    gap: window.innerWidth <= 768 ? '1.5rem' : '2.5rem',
                    marginBottom: window.innerWidth <= 768 ? '4rem' : '6rem'
                }}>
                    {[
                        { label: 'STUDENTS EMPOWERED', value: '450+', icon: <Users size={28} />, color: 'var(--primary)' },
                        { label: 'COMMUNITY GROWTH', value: '24%', icon: <TrendingUp size={28} />, color: 'var(--secondary)' },
                        { label: 'IMPACT FUNDS USED', value: '$32.5K', icon: <Heart size={28} />, color: '#fbbf24' }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="card-clean"
                            style={{
                                padding: window.innerWidth <= 768 ? '2rem' : '3rem 2.5rem',
                                border: 'none', textAlign: 'left',
                                background: 'white',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                            }}
                        >
                            <div style={{ color: stat.color, marginBottom: '1.5rem' }}>{stat.icon}</div>
                            <div style={{ fontSize: window.innerWidth <= 768 ? '2rem' : '3rem', fontWeight: '900', marginBottom: '0.5rem', letterSpacing: '-1px', color: '#111827' }}>{stat.value}</div>
                            <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Updates Feed */}
                <section>
                    <div style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        marginBottom: '2rem', flexDirection: window.innerWidth <= 480 ? 'column' : 'row',
                        gap: '1rem', alignItems: window.innerWidth <= 480 ? 'flex-start' : 'center'
                    }}>
                        <h2 style={{ fontSize: window.innerWidth <= 768 ? '1.5rem' : '2rem', fontWeight: 850 }}>Latest Mission Updates</h2>
                        <button className="btn-ghost" style={{ fontSize: '0.9rem' }}>View History</button>
                    </div>

                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {updates.map((update, i) => (
                            <motion.div
                                key={i}
                                className="card-clean"
                                style={{
                                    padding: window.innerWidth <= 768 ? '1.5rem' : '2.5rem',
                                    border: 'none', display: 'flex',
                                    flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
                                    justifyContent: 'space-between', alignItems: window.innerWidth <= 768 ? 'flex-start' : 'center',
                                    gap: '1.5rem'
                                }}
                            >
                                <div>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: '0.7rem', fontWeight: '900', color: 'var(--primary)', letterSpacing: '0.05em', background: 'rgba(0, 209, 193, 0.1)', padding: '0.4rem 0.8rem', borderRadius: '50px' }}>{update.category}</span>
                                        <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: '600' }}>{update.date}</span>
                                    </div>
                                    <h3 style={{ fontSize: window.innerWidth <= 768 ? '1.2rem' : '1.5rem', marginBottom: '0.8rem', color: '#111827', fontWeight: 800 }}>{update.title}</h3>
                                    <p style={{ color: 'var(--text-muted)', maxWidth: '850px', lineHeight: '1.7', fontSize: '0.95rem' }}>{update.content}</p>
                                </div>
                                <button className="btn-icon-round" style={{ alignSelf: window.innerWidth <= 768 ? 'flex-end' : 'center' }}>
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
