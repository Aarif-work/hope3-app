import React from 'react';
import { ArrowLeft, Printer, Download, Mail, Phone, MapPin, Calendar, User, BookOpen, Layers, Award } from 'lucide-react';

const StudentDetailView = ({ student, onBack }) => {
    // Mock full profile data merged with the selected student
    const fullProfile = {
        ...student,
        dob: '2005-05-15',
        email: 'student@example.com',
        mobile: '9876543210',
        altMobile: '9012345678',
        gender: 'Male',
        address: '123 Tech Lane, Innovation Hub, Chennai - 600001',
        district: 'Chennai',
        community: 'BC',
        religion: 'Hindu',
        fatherName: 'Robert Johnson',
        fatherOccupation: 'Engineer',
        fatherMobile: '9123456780',
        motherName: 'Sarah Johnson',
        annualIncome: '60,000',
        tenthSchool: 'Global High School',
        tenthMarks: '475/500',
        tenthYear: '2021',
        twelfthSchool: 'Global Higher Secondary',
        twelfthMarks: '1150/1200',
        twelfthYear: '2023',
        ambition: 'Software Engineer',
        hobbies: 'Coding, Chess',
    };

    const SectionHeader = ({ icon: Icon, title }) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ padding: '0.4rem', borderRadius: '6px', background: 'var(--admin-primary-light)', color: 'var(--admin-primary)' }}>
                <Icon size={18} />
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1e293b' }}>{title}</h3>
        </div>
    );

    const DetailRow = ({ label, value }) => (
        <div style={{ marginBottom: '0.8rem' }}>
            <p style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>{label}</p>
            <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#334155' }}>{value || '-'}</p>
        </div>
    );

    return (
        <div className="admin-card" style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
            {/* Header Actions */}
            <div className="card-header" style={{ marginBottom: '2rem' }}>
                <button onClick={onBack} className="admin-btn admin-btn-outline" style={{ border: 'none', paddingLeft: 0 }}>
                    <ArrowLeft size={20} /> Back to List
                </button>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="admin-btn admin-btn-outline">
                        <Printer size={18} /> Print
                    </button>
                    <button className="admin-btn admin-btn-primary">
                        <Download size={18} /> Download
                    </button>
                </div>
            </div>

            {/* Profile Header */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
                <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--admin-primary), #3b82f6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '2.5rem',
                    fontWeight: 800,
                    boxShadow: '0 10px 25px rgba(37, 99, 235, 0.2)'
                }}>
                    {fullProfile.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem' }}>{fullProfile.name}</h1>
                            <p style={{ color: 'var(--admin-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {fullProfile.hopeId}
                                <span style={{ padding: '0.2rem 0.6rem', borderRadius: '20px', background: '#ecfdf5', color: '#059669', fontSize: '0.75rem', border: '1px solid #d1fae5' }}>
                                    {fullProfile.status}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', color: '#64748b', fontSize: '0.9rem' }}>
                            <Mail size={16} /> {fullProfile.email}
                        </div>
                        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', color: '#64748b', fontSize: '0.9rem' }}>
                            <Phone size={16} /> {fullProfile.mobile}
                        </div>
                        <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', color: '#64748b', fontSize: '0.9rem' }}>
                            <MapPin size={16} /> {fullProfile.district}
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                {/* Personal Information */}
                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                    <SectionHeader icon={User} title="Personal Information" />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <DetailRow label="Date of Birth" value={fullProfile.dob} />
                        <DetailRow label="Gender" value={fullProfile.gender} />
                        <DetailRow label="Community" value={fullProfile.community} />
                        <DetailRow label="First Graduate" value="Yes" />
                        <DetailRow label="Physically Challenged" value="No" />
                        <DetailRow label="Religion" value={fullProfile.religion} />
                        <div style={{ gridColumn: 'span 2' }}>
                            <DetailRow label="Permanent Address" value={fullProfile.address} />
                        </div>
                    </div>
                </div>

                {/* Family Details */}
                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                    <SectionHeader icon={User} title="Family Information" />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <DetailRow label="Father's Name" value={fullProfile.fatherName} />
                        <DetailRow label="Occupation" value={fullProfile.fatherOccupation} />
                        <DetailRow label="Mobile" value={fullProfile.fatherMobile} />
                        <DetailRow label="Annual Income" value={fullProfile.annualIncome} />
                        <div style={{ gridColumn: 'span 2' }}>
                            <DetailRow label="Mother's Name" value={fullProfile.motherName} />
                        </div>
                    </div>
                </div>

                {/* Academic Details */}
                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                    <SectionHeader icon={BookOpen} title="Academic Background" />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <DetailRow label="10th School" value={fullProfile.tenthSchool} />
                        <DetailRow label="10th Marks" value={fullProfile.tenthMarks} />
                        <DetailRow label="12th School" value={fullProfile.twelfthSchool} />
                        <DetailRow label="12th Marks" value={fullProfile.twelfthMarks} />
                    </div>
                </div>

                {/* Course & Ambition */}
                <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                    <SectionHeader icon={Layers} title="Course & Ambition" />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <DetailRow label="Enrolled Course" value={fullProfile.course} />
                        <DetailRow label="Academic Year" value={fullProfile.year} />
                        <DetailRow label="Ambition" value={fullProfile.ambition} />
                        <DetailRow label="Hobbies" value={fullProfile.hobbies} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StudentDetailView;
