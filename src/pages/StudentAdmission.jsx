import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, ArrowLeft, GraduationCap, Mail, Phone, Calendar, User, MapPin, Building, Briefcase } from 'lucide-react';

import logo from '../assets/hope logo.png';

const StudentAdmission = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [applicationId, setApplicationId] = useState('');

    const [formData, setFormData] = useState({
        fullName: '', gender: '', dob: '', mobileNumber: '', gmailId: '', address: '', district: '', pincode: '',
        parentStatus: '', fatherName: '', motherName: '', siblings: '', religion: '', community: '', physicallyChallenged: 'No',
        collegeName: '', course: '', major: '', hostelDayScholar: 'Day Scholar',
        studentBankName: '', studentAccountNo: '', bankIfsc: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => setStep(prev => prev + 1);
    const handlePrev = () => setStep(prev => prev - 1);

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = `HOPE3-2026-${Math.floor(Math.random() * 900) + 100}`;
        setApplicationId(id);
        setSubmitted(true);
    };

    const InputField = ({ label, icon: Icon, ...props }) => (
        <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{label}</label>
            <div style={{ position: 'relative' }}>
                {Icon && <Icon size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />}
                <input
                    {...props}
                    style={{
                        width: '100%',
                        padding: Icon ? '0.8rem 1rem 0.8rem 2.8rem' : '0.8rem 1.2rem',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        fontSize: '0.9rem',
                        background: '#f8fafc',
                        outline: 'none',
                        fontFamily: 'inherit'
                    }}
                />
            </div>
        </div>
    );

    if (submitted) {
        return (
            <>
                <div className="bg-container">
                    <div className="organic-blob blob-1"></div>
                </div>
                <div className="app-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="card-clean"
                        style={{ maxWidth: '550px', width: '90%', padding: '4rem 2rem', textAlign: 'center' }}
                    >
                        <div style={{ color: 'var(--primary)', marginBottom: '2rem' }}>
                            <div style={{ width: '80px', height: '80px', background: 'rgba(0, 209, 193, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                                <CheckCircle size={40} color="var(--primary)" />
                            </div>
                        </div>
                        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Success!</h1>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
                            Your application has been received. Please keep your Application ID for reference.
                        </p>
                        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '20px', marginBottom: '3rem', border: '1px dashed var(--primary)' }}>
                            <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>APPLICATION ID</span>
                            <span style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-main)', letterSpacing: '1px' }}>{applicationId}</span>
                        </div>
                        <button className="btn-pill btn-primary" onClick={() => navigate('/')}>Return to Home</button>
                    </motion.div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="bg-container">
                <div className="organic-blob blob-1"></div>
                <div className="organic-blob blob-2" style={{ opacity: 0.3 }}></div>
            </div>
            <div className="app-container" style={{ padding: '3rem 1rem', overflowY: 'auto' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <div className="nav-logo" style={{ marginBottom: '1rem', justifyContent: 'center' }} onClick={() => navigate('/')}>
                            <img src={logo} alt="HOPE3 Logo" />
                        </div>
                        <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Join the Academy</h2>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
                            {[1, 2, 3, 4].map(s => (
                                <div key={s} style={{ width: '40px', height: '6px', borderRadius: '3px', background: s <= step ? 'var(--primary)' : '#e2e8f0', transition: 'var(--transition)' }} />
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="card-clean" style={{ padding: '3rem' }}>
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                    <h3 style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>Personal Contact Information</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div style={{ gridColumn: 'span 2' }}><InputField label="Full Name" icon={User} name="fullName" value={formData.fullName} onChange={handleChange} required /></div>
                                        <InputField label="Mobile Number" icon={Phone} name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required />
                                        <InputField label="Gmail ID" icon={Mail} name="gmailId" value={formData.gmailId} onChange={handleChange} required />
                                        <InputField label="Date of Birth" icon={Calendar} type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Gender</label>
                                            <select name="gender" value={formData.gender} onChange={handleChange} required style={{ width: '100%', padding: '0.8rem 1.2rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none' }}>
                                                <option value="">Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="s2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                    <h3 style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>Family & Community Background</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <InputField label="Father's Name" name="fatherName" value={formData.fatherName} onChange={handleChange} />
                                        <InputField label="Mother's Name" name="motherName" value={formData.motherName} onChange={handleChange} />
                                        <InputField label="Religion" name="religion" value={formData.religion} onChange={handleChange} />
                                        <InputField label="Community" name="community" value={formData.community} onChange={handleChange} />
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="s3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                    <h3 style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>Educational Background</h3>
                                    <InputField label="College Name" icon={Building} name="collegeName" value={formData.collegeName} onChange={handleChange} required />
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <InputField label="Course" icon={GraduationCap} name="course" value={formData.course} onChange={handleChange} required />
                                        <InputField label="Major" icon={Briefcase} name="major" value={formData.major} onChange={handleChange} required />
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div key="s4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                    <h3 style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>Financial & Bank Details</h3>
                                    <InputField label="Student Bank Name" name="studentBankName" value={formData.studentBankName} onChange={handleChange} />
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <InputField label="Account Number" name="studentAccountNo" value={formData.studentAccountNo} onChange={handleChange} />
                                        <InputField label="Bank IFSC Code" name="bankIfsc" value={formData.bankIfsc} onChange={handleChange} />
                                    </div>
                                    <div style={{ padding: '1.5rem', background: 'rgba(163, 230, 53, 0.05)', borderRadius: '15px', border: '1px solid rgba(163, 230, 53, 0.1)', marginTop: '1rem' }}>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                                            I declare that all the information provided above is true and accurate to the best of my knowledge.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between' }}>
                            {step > 1 ? (
                                <button type="button" onClick={handlePrev} className="btn-pill" style={{ background: '#f1f5f9', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <ArrowLeft size={18} /> Back
                                </button>
                            ) : <div />}

                            {step < 4 ? (
                                <button type="button" onClick={handleNext} className="btn-pill btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                    Next Step <ArrowRight size={18} />
                                </button>
                            ) : (
                                <button type="submit" className="btn-pill btn-primary" style={{ background: 'var(--secondary)', color: '#064e3b' }}>
                                    Submit Application
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default StudentAdmission;
