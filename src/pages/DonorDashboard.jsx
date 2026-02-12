import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Heart,
    TrendingUp,
    Users,
    Target,
    LogOut,
    ChevronRight,
    Activity,
    Menu,
    AlertCircle,
    ArrowUpRight,
    Calendar,
    CreditCard,
    DollarSign,
    Shield,
    ExternalLink
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';

import logo from '../assets/hope logo.png';

const DonorDashboard = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Mock Donor Data
    const donorData = {
        name: 'John Doe',
        type: 'monthly',
        isCurrentMonthPaid: false,
        totalDonated: 45000,
        myImpactPercent: 1.2,
        history: [
            { id: 1, date: 'Feb 10, 2026', amount: 5000, mode: 'UPI', type: 'Monthly', status: 'Success' },
            { id: 2, date: 'Jan 10, 2026', amount: 5000, mode: 'UPI', type: 'Monthly', status: 'Success' },
            { id: 3, date: 'Dec 15, 2025', amount: 10000, mode: 'Bank Transfer', type: 'One-time', status: 'Success' },
            { id: 4, date: 'Dec 10, 2025', amount: 5000, mode: 'UPI', type: 'Monthly', status: 'Success' },
            { id: 5, date: 'Nov 10, 2025', amount: 5000, mode: 'UPI', type: 'Monthly', status: 'Success' },
            { id: 6, date: 'Oct 10, 2025', amount: 5000, mode: 'UPI', type: 'Monthly', status: 'Success' },
            { id: 7, date: 'Sep 10, 2025', amount: 5000, mode: 'UPI', type: 'Monthly', status: 'Success' },
        ]
    };

    // Foundation Data
    const foundationData = {
        totalStudents: 120,
        needs: [
            { category: 'Semester Fee Support', allocated: 250000, total: 500000 },
            { category: 'Food Support', allocated: 80000, total: 150000 },
            { category: 'General Education Fund', allocated: 120000, total: 200000 },
        ],
        monthlyGrowth: [
            { month: 'Sep', myDonation: 5000, totalImpact: 45000 },
            { month: 'Oct', myDonation: 5000, totalImpact: 52000 },
            { month: 'Nov', myDonation: 5000, totalImpact: 68000 },
            { month: 'Dec', myDonation: 15000, totalImpact: 85000 },
            { month: 'Jan', myDonation: 5000, totalImpact: 92000 },
            { month: 'Feb', myDonation: 5000, totalImpact: 105000 },
        ],
        fundingDistribution: [
            { name: 'Semester Support', value: 250000, color: '#00d1c1' },
            { name: 'Food Support', value: 80000, color: '#fbbf24' },
            { name: 'General Fund', value: 120000, color: '#f8db39' },
        ]
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', color: '#1e293b', overflowX: 'hidden' }}>
            {/* Background Decorations */}
            <div className="bg-container" style={{ position: 'fixed', opacity: 0.3, pointerEvents: 'none' }}>
                <div className="organic-blob blob-1" style={{ top: '60%', right: '-10%', left: 'auto', background: 'var(--secondary)' }}></div>
                <div className="organic-blob blob-2" style={{ top: '-10%', left: '-5%', background: 'var(--primary)' }}></div>
            </div>

            <nav style={{
                padding: window.innerWidth <= 768 ? '1rem 1.2rem' : '1.2rem 4rem',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 100,
                background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)'
            }}>
                <div className="nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <img src={logo} alt="HOPE3 Logo" style={{ height: window.innerWidth <= 768 ? '32px' : '38px' }} />
                    <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.5px' }}>HOPE3 <span style={{ color: 'var(--primary)' }}>DONOR</span></span>
                </div>

                {/* Desktop Nav */}
                <div style={{ display: window.innerWidth <= 768 ? 'none' : 'flex', alignItems: 'center', gap: '2.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <button
                            onClick={() => navigate('/donor-profile')}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', color: '#475569', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem', border: 'none' }}
                        >
                            <Users size={18} /> My Profile
                        </button>
                        <button
                            onClick={() => window.open('https://hope3.org/donate', '_blank')}
                            className="btn-premium"
                            style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
                        >
                            <Heart size={16} /> Donate Now
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', color: '#ef4444', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem', border: 'none' }}
                        >
                            <LogOut size={18} /> Exit
                        </button>
                    </div>
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
            {/* Same as before but consistent styling */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        position: 'fixed', top: '65px', left: 0, right: 0, background: 'white',
                        padding: '1.5rem', zIndex: 90, borderBottom: '1px solid #e2e8f0',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <button
                            onClick={() => navigate('/donor-profile')}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: '#f8fafc', color: '#1e293b', fontWeight: '600', cursor: 'pointer', fontSize: '1rem', border: 'none', padding: '1rem', borderRadius: '12px' }}
                        >
                            <Users size={18} /> My Profile
                        </button>
                        <button
                            onClick={() => window.open('https://hope3.org/donate', '_blank')}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'var(--primary)', color: 'white', fontWeight: '700', cursor: 'pointer', fontSize: '1rem', border: 'none', padding: '1rem', borderRadius: '12px' }}
                        >
                            <Heart size={18} /> Donate Now
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: '#fef2f2', color: '#ef4444', fontWeight: '600', cursor: 'pointer', fontSize: '1rem', border: 'none', padding: '1rem', borderRadius: '12px' }}
                        >
                            <LogOut size={18} /> Sign Out
                        </button>
                    </div>
                </motion.div>
            )}

            <main style={{
                maxWidth: '1300px', margin: '0 auto',
                padding: window.innerWidth <= 768 ? '1.5rem' : '3rem',
                position: 'relative', zIndex: 5
            }}>

                {/* Pending Monthly Donation Alert */}
                {donorData.type === 'monthly' && !donorData.isCurrentMonthPaid && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            background: '#fffbeb',
                            border: '1px solid #fde68a',
                            borderRadius: '16px',
                            padding: '1.2rem 1.5rem',
                            marginBottom: '2rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '1rem'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', background: '#fbbf24', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: 'white', justifyContent: 'center' }}>
                                <AlertCircle size={20} />
                            </div>
                            <div>
                                <h4 style={{ margin: 0, color: '#92400e', fontSize: '0.95rem', fontWeight: 700 }}>Action Required</h4>
                                <p style={{ margin: 0, color: '#b45309', fontSize: '0.85rem' }}>Your monthly contribution for this month is pending.</p>
                            </div>
                        </div>
                        <button
                            onClick={() => window.open('https://hope3.org/donate', '_blank')}
                            style={{
                                background: '#fbbf24',
                                color: 'white',
                                padding: '0.6rem 1.2rem',
                                borderRadius: '10px',
                                fontWeight: 700,
                                fontSize: '0.85rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                border: 'none',
                                cursor: 'pointer',
                                boxShadow: '0 4px 10px rgba(251, 191, 36, 0.3)'
                            }}
                        >
                            Donate Now <ArrowUpRight size={16} />
                        </button>
                    </motion.div>
                )}

                <header style={{ marginBottom: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
                        <div>
                            <h1 style={{ fontSize: window.innerWidth <= 768 ? '1.75rem' : '2.5rem', color: '#111827', fontWeight: 900, marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>
                                Welcome back, {donorData.name.split(' ')[0]}!
                            </h1>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500 }}>
                                Your support is currently helping {foundationData.totalStudents} students build their future.
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <div style={{ padding: '0.5rem 1rem', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
                                <Calendar size={16} color="var(--primary)" /> Feb 2026
                            </div>
                        </div>
                    </div>
                </header>

                {/* Top Summary Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '2.5rem'
                }}>
                    {/* Card 1: Total Donated */}
                    <div className="card-clean" style={{ padding: '1.75rem', border: 'none', background: 'white', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.05 }}>
                            <DollarSign size={80} />
                        </div>
                        <div style={{ color: 'var(--primary)', marginBottom: '1rem', background: 'rgba(0, 209, 193, 0.1)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <TrendingUp size={20} />
                        </div>
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Total I Donated</div>
                        <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#111827' }}>₹{donorData.totalDonated.toLocaleString()}</div>
                        <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
                            <ArrowUpRight size={14} /> +₹5,000 this month
                        </div>
                    </div>

                    {/* Card 2: Total Students */}
                    <div className="card-clean" style={{ padding: '1.75rem', border: 'none', background: 'white', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ color: 'var(--secondary)', marginBottom: '1rem', background: 'rgba(251, 191, 36, 0.1)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Users size={20} />
                        </div>
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Foundation Students</div>
                        <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#111827' }}>{foundationData.totalStudents} Students</div>
                        <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                            Enrolled across 12 disciplines
                        </div>
                    </div>

                    {/* Card 3: Foundation Current Needs */}
                    <div className="card-clean" style={{ padding: '1.75rem', border: 'none', background: 'white', gridColumn: window.innerWidth > 1024 ? 'span 1' : 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Usage</div>
                            <Target size={18} color="var(--primary)" />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {foundationData.needs.slice(0, 2).map((need, idx) => (
                                <div key={idx}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                                        <span>{need.category}</span>
                                        <span style={{ color: 'var(--primary)' }}>₹{need.allocated.toLocaleString()}</span>
                                    </div>
                                    <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
                                        <div style={{ width: `${(need.allocated / need.total) * 100}%`, height: '100%', background: idx === 0 ? 'var(--primary)' : 'var(--secondary)', borderRadius: '10px' }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Card 4: My Impact */}
                    <div className="card-clean" style={{ padding: '1.75rem', border: 'none', background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: 'white' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>My Impact</div>
                            <Heart size={18} fill="#ef4444" color="#ef4444" />
                        </div>
                        <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#e2e8f0', marginBottom: '1rem', fontWeight: 500 }}>
                            "Your contribution helped support education and essential needs for HOPE3 students."
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ fontSize: '1.25rem', fontWeight: '800' }}>{donorData.myImpactPercent}%</div>
                            <div style={{ fontSize: '0.7rem', color: '#94a3b8', background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.6rem', borderRadius: '50px' }}>of total fund</div>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: window.innerWidth <= 1024 ? '1fr' : '2fr 1.2fr',
                    gap: '2rem',
                    marginBottom: '3rem'
                }}>
                    {/* Main Graph (Line Chart) */}
                    <div className="card-clean" style={{ padding: '2rem', border: 'none', background: 'white' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Donation Growth & Foundation Impact</h3>
                            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', fontWeight: 700 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--primary)' }}></div> My Donations
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--secondary)' }}></div> Foundation Impact
                                </div>
                            </div>
                        </div>
                        <div style={{ height: '300px', width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={foundationData.monthlyGrowth}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis
                                        dataKey="month"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                                        tickFormatter={(value) => `₹${value / 1000}k`}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '12px' }}
                                        itemStyle={{ fontWeight: 700, fontSize: '12px' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="myDonation"
                                        stroke="var(--primary)"
                                        strokeWidth={4}
                                        dot={{ r: 6, fill: 'var(--primary)', strokeWidth: 3, stroke: '#fff' }}
                                        activeDot={{ r: 8 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="totalImpact"
                                        stroke="var(--secondary)"
                                        strokeWidth={4}
                                        dot={{ r: 6, fill: 'var(--secondary)', strokeWidth: 3, stroke: '#fff' }}
                                        activeDot={{ r: 8 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Secondary Chart (Pie Chart) */}
                    <div className="card-clean" style={{ padding: '2rem', border: 'none', background: 'white' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>Funding Distribution</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', fontWeight: 500 }}>Where your contributions are utilized</p>

                        <div style={{ height: '240px', width: '100%', position: 'relative' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={foundationData.fundingDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={8}
                                        dataKey="value"
                                    >
                                        {foundationData.fundingDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total</div>
                                <div style={{ fontSize: '1.1rem', fontWeight: 900 }}>₹4.5L</div>
                            </div>
                        </div>

                        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {foundationData.fundingDistribution.map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color }}></div>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{item.name}</span>
                                    </div>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>{Math.round((item.value / 450000) * 100)}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Donation History Table */}
                <section className="card-clean" style={{ border: 'none', background: 'white', padding: 0, overflow: 'hidden', marginBottom: '4rem' }}>
                    <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Donation History</h3>
                        <button className="btn-ghost" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>Export PDF</button>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ background: '#f8fafc' }}>
                                    <th style={{ padding: '1rem 2rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Date</th>
                                    <th style={{ padding: '1rem 2rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Amount</th>
                                    <th style={{ padding: '1rem 2rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Mode</th>
                                    <th style={{ padding: '1rem 2rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Type</th>
                                    <th style={{ padding: '1rem 2rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donorData.history.map((item) => (
                                    <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '1.2rem 2rem', fontWeight: 600, fontSize: '0.9rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                                <Calendar size={16} color="#94a3b8" /> {item.date}
                                            </div>
                                        </td>
                                        <td style={{ padding: '1.2rem 2rem', fontWeight: 800, fontSize: '0.95rem' }}>₹{item.amount.toLocaleString()}</td>
                                        <td style={{ padding: '1.2rem 2rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.85rem' }}>{item.mode}</td>
                                        <td style={{ padding: '1.2rem 2rem' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: item.type === 'Monthly' ? 'var(--primary)' : 'var(--secondary)' }}>{item.type}</span>
                                        </td>
                                        <td style={{ padding: '1.2rem 2rem' }}>
                                            <span style={{
                                                padding: '0.3rem 0.8rem',
                                                borderRadius: '50px',
                                                fontSize: '0.7rem',
                                                fontWeight: 800,
                                                background: '#ecfdf5',
                                                color: '#059669'
                                            }}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ padding: '1.5rem', textAlign: 'center', borderTop: '1px solid #f1f5f9' }}>
                        <button className="btn-ghost" style={{ fontSize: '0.85rem' }}>View Full History</button>
                    </div>
                </section>

                <footer style={{ textAlign: 'center', paddingBottom: '3rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>
                            <Shield size={16} /> Data Encryption Active
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>
                            <Activity size={16} /> Transparent Impact Monitoring
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>
                            <ExternalLink size={16} /> Official Foundation Support
                        </div>
                    </div>
                </footer>

            </main>
        </div>
    );
};

export default DonorDashboard;

