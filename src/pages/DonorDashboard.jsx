import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DonorLayout from '../components/Donor/DonorLayout';

// Import Modular Components
import Overview from './Donor/Overview';
import OurImpact from './Donor/OurImpact';
import DonationHistory from './Donor/DonationHistory';
import StudentManagement from './Donor/StudentManagement';
import Support from './Donor/Support';

const DonorDashboard = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab);
        }
    }, [location.state]);

    // Mock Donor Data
    const donorData = {
        name: 'John Doe',
        type: 'monthly',
        isCurrentMonthPaid: false,
        totalDonated: 45000,
        myImpactPercent: 1.2,
        email: 'john.doe@example.com',
        phone: '+91 98765 43210',
        location: 'Tamil Nadu, India',
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

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <Overview donorData={donorData} foundationData={foundationData} />;
            case 'students':
                return <StudentManagement />;
            case 'impact':
                return <OurImpact foundationData={foundationData} />;
            case 'donations':
                return <DonationHistory history={donorData.history} />;
            case 'support':
                return <Support />;
            default:
                return <Overview donorData={donorData} foundationData={foundationData} />;
        }
    };

    const labels = {
        overview: 'Dashboard',
        students: 'Students',
        impact: 'Our Impact',
        donations: 'History',
        support: 'Support'
    };

    return (
        <DonorLayout
            title={labels[activeTab]}
            subtitle={`Welcome back, ${donorData.name.split(' ')[0]}`}
            activeTab={activeTab}
            onTabChange={setActiveTab}
        >
            {renderContent()}
        </DonorLayout>
    );
};

export default DonorDashboard;
