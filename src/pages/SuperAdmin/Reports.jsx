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
