import React from 'react';
import { useNavigate } from 'react-router-dom';
import SuperAdminLayout from '../../components/SuperAdmin/SuperAdminLayout';
import {
    Users,
    ClipboardList,
    TrendingUp,
    HeartHandshake,
    DollarSign,
    Target,
    Wallet,
    PiggyBank,
    CreditCard
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
    const navigate = useNavigate();

    const studentStats = [
        { label: 'Total Students', value: '1,280', icon: Users, color: '#2563eb', bg: '#eff6ff', path: '/super-admin/students' },
        { label: 'Total Applications', value: '450', icon: ClipboardList, color: '#f59e0b', bg: '#fffbeb', path: '/super-admin/applied' },
        { label: 'Admission Trend', value: '+12%', icon: TrendingUp, color: '#8b5cf6', bg: '#f5f3ff', path: '/super-admin/reports' },
    ];

    const donorSummaryStats = [
        { label: 'Total Donors', value: '84', icon: HeartHandshake, color: '#059669', bg: '#ecfdf5', path: '/super-admin/donors' },
        { label: 'This Month', value: '$12,450', icon: DollarSign, color: '#2563eb', bg: '#eff6ff', path: '/super-admin/donors' },
        { label: 'All Time Collection', value: '$342,800', icon: Target, color: '#7c3aed', bg: '#f5f3ff', path: '/super-admin/donors' },
    ];

    const financialStats = [
        { label: 'Total Spent', value: '$254,600', icon: Wallet, color: '#ef4444', bg: '#fef2f2', path: '/super-admin/fund-usage' },
        { label: 'Foundation Balance', value: '$88,200', icon: PiggyBank, color: '#10b981', bg: '#ecfdf5', path: '/super-admin/fund-usage' },
        { label: 'Monthly Expenses', value: '$18,450', icon: CreditCard, color: '#f59e0b', bg: '#fffbeb', path: '/super-admin/fund-usage' },
    ];

    const courseStats = [
        { name: 'UX/UI Design', count: 320, color: '#2563eb' },
        { name: 'Web Development', count: 450, color: '#22c55e' },
        { name: 'Data Science', count: 280, color: '#f59e0b' },
        { name: 'Digital Marketing', count: 230, color: '#ef4444' },
    ];

    const recentApplications = [
        { id: 'APP001', name: 'John Doe', course: 'Web Development', date: '2026-02-10', status: 'Applied' },
        { id: 'APP002', name: 'Jane Smith', course: 'UX/UI Design', date: '2026-02-09', status: 'Applied' },
        { id: 'APP003', name: 'Mike Ross', course: 'Data Science', date: '2026-02-08', status: 'Applied' },
    ];

    return (
        <SuperAdminLayout
            title="Dashboard"
            subtitle="Overview of system performance, metrics and financial health"
        >
            {/* Student Stats */}
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--admin-text)' }}>Student Overview</h2>
            <div className="stats-grid" style={{ marginBottom: '2.5rem' }}>
                {studentStats.map((stat, index) => (
                    <div
                        key={index}
                        className="stat-card"
                        onClick={() => navigate(stat.path)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="stat-icon" style={{ backgroundColor: stat.bg, color: stat.color }}>
                            <stat.icon size={24} />
                        </div>
                        <div className="stat-info">
                            <h3>{stat.label}</h3>
                            <p>{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Donor Stats */}
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--admin-text)' }}>Donor Monitoring</h2>
            <div className="stats-grid" style={{ marginBottom: '2.5rem' }}>
                {donorSummaryStats.map((stat, index) => (
                    <div
                        key={index}
                        className="stat-card"
                        onClick={() => navigate(stat.path)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="stat-icon" style={{ backgroundColor: stat.bg, color: stat.color }}>
                            <stat.icon size={24} />
                        </div>
                        <div className="stat-info">
                            <h3>{stat.label}</h3>
                            <p>{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Financial Overview */}
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--admin-text)' }}>Foundation Financials</h2>
            <div className="stats-grid">
                {financialStats.map((stat, index) => (
                    <div
                        key={index}
                        className="stat-card"
                        onClick={() => navigate(stat.path)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="stat-icon" style={{ backgroundColor: stat.bg, color: stat.color }}>
                            <stat.icon size={24} />
                        </div>
                        <div className="stat-info">
                            <h3>{stat.label}</h3>
                            <p>{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="admin-grid-2-1" style={{ marginTop: '2rem' }}>
                {/* Donation Growth vs Foundation Need Graph */}
                <div className="admin-card">
                    <div className="card-header dashboard-chart-header">
                        <div>
                            <h2 className="card-title">Donation Growth & Foundation Impact</h2>
                            <p style={{ fontSize: '0.75rem', color: 'var(--admin-text-light)', marginTop: '0.25rem' }}>Foundation collection vs operational requirements</p>
                        </div>
                        <div className="chart-legend">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem' }}>
                                <div style={{ width: '12px', height: '12px', background: '#00d1c1', borderRadius: '2px' }}></div>
                                Impact
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem' }}>
                                <div style={{ width: '12px', height: '12px', border: '2px dashed #fbbf24', borderRadius: '2px' }}></div>
                                Need
                            </div>
                        </div>
                    </div>
                    <div style={{ padding: '1.5rem', height: '350px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={[
                                { month: 'Sep', impact: 145000, need: 110000 },
                                { month: 'Oct', impact: 162000, need: 125000 },
                                { month: 'Nov', impact: 188000, need: 140000 },
                                { month: 'Dec', impact: 225000, need: 165000 },
                                { month: 'Jan', impact: 292000, need: 195000 },
                                { month: 'Feb', impact: 342800, need: 220000 },
                            ]}>
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
                                    dataKey="impact"
                                    stroke="#00d1c1"
                                    strokeWidth={4}
                                    dot={{ r: 4, fill: '#00d1c1' }}
                                    activeDot={{ r: 6 }}
                                />
                                <Line
                                    name="Allocated Need"
                                    type="monotone"
                                    dataKey="need"
                                    stroke="#fbbf24"
                                    strokeWidth={3}
                                    strokeDasharray="5 5"
                                    dot={{ r: 4, fill: '#fbbf24' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Course-wise count */}
                <div className="admin-card">
                    <div className="card-header">
                        <h2 className="card-title">Course Enrollment</h2>
                    </div>
                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {courseStats.map((course, index) => (
                            <div key={index}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', fontSize: '0.875rem' }}>
                                    <span style={{ fontWeight: 600 }}>{course.name}</span>
                                    <span style={{ color: 'var(--admin-text-light)' }}>{course.count}</span>
                                </div>
                                <div style={{ width: '100%', height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden' }}>
                                    <div style={{
                                        width: `${(course.count / 500) * 100}%`,
                                        height: '100%',
                                        background: course.color,
                                        borderRadius: '5px'
                                    }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Applied Students */}
            <div className="admin-card" style={{ marginTop: '2rem' }}>
                <div className="card-header">
                    <h2 className="card-title">Recent Student Admissions</h2>
                    <button onClick={() => navigate('/super-admin/applied')} className="admin-btn admin-btn-outline">View All</button>
                </div>
                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Application ID</th>
                                <th>Name</th>
                                <th>Course</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentApplications.map((app) => (
                                <tr key={app.id}>
                                    <td>{app.id}</td>
                                    <td style={{ fontWeight: 600 }}>{app.name}</td>
                                    <td>{app.course}</td>
                                    <td>{app.date}</td>
                                    <td>
                                        <span className="status-badge status-applied">{app.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </SuperAdminLayout>
    );
};

export default Dashboard;
