import React from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    Users,
    Target,
    AlertCircle,
    ArrowUpRight
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

const Overview = ({ donorData, foundationData }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
        >
            {/* Pending Monthly Donation Alert */}
            {donorData.type === 'monthly' && !donorData.isCurrentMonthPaid && (
                <div style={{
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
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', background: '#fbbf24', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <AlertCircle size={20} />
                        </div>
                        <div>
                            <h4 style={{ margin: 0, color: '#92400e', fontSize: '0.95rem', fontWeight: 700 }}>Payment Pending</h4>
                            <p style={{ margin: 0, color: '#b45309', fontSize: '0.85rem' }}>Your monthly contribution for Feb 2026 is due.</p>
                        </div>
                    </div>
                    <button
                        onClick={() => window.open('https://hope3.org/donate', '_blank')}
                        className="btn-premium"
                        style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem', boxShadow: 'none' }}
                    >
                        Pay Now <ArrowUpRight size={16} />
                    </button>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div className="card-clean" style={{ padding: '1.75rem', border: 'none', background: 'white' }}>
                    <div style={{ color: 'var(--primary)', marginBottom: '1.2rem', background: 'rgba(0, 209, 193, 0.1)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TrendingUp size={20} />
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Total Donated</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#111827' }}>₹{donorData.totalDonated.toLocaleString()}</div>
                </div>
                <div className="card-clean" style={{ padding: '1.75rem', border: 'none', background: 'white' }}>
                    <div style={{ color: 'var(--secondary)', marginBottom: '1.2rem', background: 'rgba(251, 191, 36, 0.1)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Users size={20} />
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Students Supported</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#111827' }}>{foundationData.totalStudents}</div>
                </div>
                <div className="card-clean" style={{ padding: '1.75rem', border: 'none', background: 'white' }}>
                    <div style={{ color: '#8b5cf6', marginBottom: '1.2rem', background: 'rgba(139, 92, 246, 0.1)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Target size={20} />
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>My Impact</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: '900', color: '#111827' }}>{donorData.myImpactPercent}%</div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth <= 1024 ? '1fr' : '2fr 1.2fr', gap: '2rem' }}>
                <div className="card-clean" style={{ padding: '2rem', border: 'none', background: 'white' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '2rem' }}>Donation Growth & Foundation Impact</h3>
                    <div style={{ height: '300px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={foundationData.monthlyGrowth}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `₹${val / 1000}k`} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                                    formatter={(value) => [`₹${value.toLocaleString()}`, '']}
                                />
                                <Line
                                    name="Foundation Impact"
                                    type="monotone"
                                    dataKey="totalImpact"
                                    stroke="var(--primary)"
                                    strokeWidth={4}
                                    dot={{ r: 4, fill: 'var(--primary)' }}
                                    activeDot={{ r: 6 }}
                                />
                                <Line
                                    name="My Donation"
                                    type="monotone"
                                    dataKey="myDonation"
                                    stroke="var(--secondary)"
                                    strokeWidth={3}
                                    strokeDasharray="5 5"
                                    dot={{ r: 4, fill: 'var(--secondary)' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="card-clean" style={{ padding: '2rem', border: 'none', background: 'white' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '1.5rem' }}>Funds Utilization</h3>
                    <div style={{ height: '240px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={foundationData.fundingDistribution} dataKey="value" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>
                                    {foundationData.fundingDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                        {foundationData.fundingDistribution.map((item, idx) => (
                            <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }}></div>
                                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{item.name}</span>
                                </div>
                                <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>₹{(item.value / 1000).toFixed(0)}k</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Overview;
