import React from 'react';
import { useNavigate } from 'react-router-dom';
import SuperAdminLayout from '../../components/SuperAdmin/SuperAdminLayout';
import {
    Users,
    ClipboardList,
    UserCheck,
    TrendingUp,
    GraduationCap,
    Clock
} from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();

    const stats = [
        { label: 'Total Students', value: '1,280', icon: Users, color: '#2563eb', bg: '#eff6ff', path: '/super-admin/students' },
        { label: 'Total Applications', value: '450', icon: ClipboardList, color: '#f59e0b', bg: '#fffbeb', path: '/super-admin/applied' },
        { label: 'Admission Trend', value: '+12%', icon: TrendingUp, color: '#8b5cf6', bg: '#f5f3ff', path: '/super-admin/reports' },
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
            subtitle="Overview of system performance and metrics"
        >
            <div className="stats-grid">
                {stats.map((stat, index) => (
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

            <div className="admin-grid-2-1">
                {/* Course-wise Distribution */}
                <div className="admin-card">
                    <div className="card-header">
                        <h2 className="card-title">Admission Trend (Mock Graph)</h2>
                        <button className="admin-btn admin-btn-outline">Download Report</button>
                    </div>
                    <div className="admin-table-container">
                        <div style={{ padding: '2rem', height: '300px', display: 'flex', alignItems: 'flex-end', gap: '1rem', minWidth: '500px' }}>
                            {[40, 70, 45, 90, 65, 80, 55, 75, 60, 85, 95, 100].map((height, i) => (
                                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{
                                        width: '100%',
                                        height: `${height}%`,
                                        background: 'var(--admin-primary)',
                                        borderRadius: '4px 4px 0 0',
                                        opacity: 0.8 + (height / 500)
                                    }}></div>
                                    <span style={{ fontSize: '0.65rem', color: 'var(--admin-text-light)' }}>{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Course-wise count */}
                <div className="admin-card">
                    <div className="card-header">
                        <h2 className="card-title">Course-wise Count</h2>
                    </div>
                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {courseStats.map((course, index) => (
                            <div key={index}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                    <span style={{ fontWeight: 500 }}>{course.name}</span>
                                    <span style={{ color: 'var(--admin-text-light)' }}>{course.count}</span>
                                </div>
                                <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{
                                        width: `${(course.count / 500) * 100}%`,
                                        height: '100%',
                                        background: course.color,
                                        borderRadius: '4px'
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
                    <h2 className="card-title">Recent Applications</h2>
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
