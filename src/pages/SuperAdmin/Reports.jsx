import React from 'react';
import SuperAdminLayout from '../../components/SuperAdmin/SuperAdminLayout';
import { FileBarChart, Download, Calendar } from 'lucide-react';

const ReportsPage = () => {
    const reportCategories = [
        { name: 'Admission Reports', desc: 'Detailed analysis of applications and enrollment trends.', icon: FileBarChart },
        { name: 'Financial Reports', desc: 'Summary of donations, grants, and academic expenses.', icon: FileBarChart },
        { name: 'Student Progress', desc: 'Academic performance and attendance metrics across courses.', icon: FileBarChart },
        { name: 'Donor Impact', desc: 'Reports showing how donor contributions are being utilized.', icon: FileBarChart },
    ];

    return (
        <SuperAdminLayout
            title="System Reports"
            subtitle="Generate and download comprehensive system reports"
        >
            <div className="admin-card" style={{ padding: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '1rem',
                        background: 'var(--admin-primary-light)',
                        color: 'var(--admin-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1.5rem auto'
                    }}>
                        <FileBarChart size={32} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Analytics & Insights</h2>
                    <p style={{ color: 'var(--admin-text-light)', marginBottom: '2rem' }}>
                        Choose a report category below to generate detailed insights. You can export data in PDF, Excel, or CSV formats.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: '#f8fafc', borderRadius: '0.5rem', border: '1px solid var(--admin-border)' }}>
                            <Calendar size={18} />
                            <span style={{ fontSize: '0.875rem' }}>Full Academic Year 2025-26</span>
                        </div>
                        <button className="admin-btn admin-btn-primary">
                            Generate Annual Overview
                        </button>
                    </div>
                </div>
            </div>

            <div className="stats-grid">
                {reportCategories.map((report, i) => (
                    <div key={i} className="admin-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                        <div style={{ padding: '0.75rem', borderRadius: '0.75rem', background: '#f8fafc', color: 'var(--admin-text-light)' }}>
                            <report.icon size={24} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{report.name}</h3>
                            <p style={{ fontSize: '0.875rem', color: 'var(--admin-text-light)', marginBottom: '1.25rem', lineHeight: 1.5 }}>{report.desc}</p>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button className="admin-btn admin-btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
                                    <Download size={14} /> PDF
                                </button>
                                <button className="admin-btn admin-btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}>
                                    <Download size={14} /> Excel
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </SuperAdminLayout>
    );
};

export default ReportsPage;
