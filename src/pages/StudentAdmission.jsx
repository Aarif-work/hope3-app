import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle,
    ArrowRight,
    ArrowLeft,
    GraduationCap,
    Mail,
    Phone,
    Calendar,
    User,
    Building,
    Briefcase,
    ChevronLeft,
    ShieldCheck,
    MapPin,
    Home,
    Heart,
    DollarSign,
    Upload,
    FileText,
    Users
} from 'lucide-react';

import logo from '../assets/hope logo.png';

const StudentAdmission = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [applicationId, setApplicationId] = useState('');

    const [formData, setFormData] = useState({
        // Identity
        fullName: '', gender: '', dob: '', gmailId: '', mobileNumber: '',
        photograph: null, religion: '', community: '', physicallyChallenged: 'No',
        mode: 'Day Scholar', isAlumni: 'No', year: '2026', currentYear: '1st Year',

        // Address
        fullAddress: '', areaType: 'Urban', landmark: '', area: '', district: '', pincode: '',

        // Family
        parentStatus: 'Both Alive', siblings: '0',
        fatherName: '', fatherOccupation: '', fatherContact: '',
        motherName: '', motherOccupation: '', motherContact: '',
        guardianName: '', guardianOccupation: '', guardianContact: '',

        // Academic
        collegeName: '', course: '', major: '', collegeAddress: '',
        hostelDayScholar: 'Day Scholar', hostelAddress: '',

        // Bank & Financial
        studentBankName: '', studentAccountNo: '', bankIfsc: '',
        parentAccountNo: '', parentIfsc: '',
        fundingMaturity: 'No', fundingPercent: '0', fundingAmount: '0', funders: '',

        // Career & Misc
        currentlyWorking: 'No', workLocation: '', designation: '',
        isMarried: 'No', onTrack: 'Yes', volunteering: 'Yes',
        otherNotes: '', remarks: '', folderLink: ''
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
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
        <div className="form-group-cln">
            <label className="label-cln">{label}</label>
            <div className="input-wrap-cln">
                {Icon && <Icon size={18} className="icon-cln" />}
                <input
                    {...props}
                    className={`input-field-cln ${Icon ? 'with-icon' : ''}`}
                    autoComplete="off"
                />
            </div>
        </div>
    );

    const TextAreaField = ({ label, icon: Icon, ...props }) => (
        <div className="form-group-cln">
            <label className="label-cln">{label}</label>
            <div className="input-wrap-cln">
                {Icon && <Icon size={18} className="icon-cln" style={{ top: '20%', transform: 'none' }} />}
                <textarea
                    {...props}
                    className={`input-field-cln textarea-cln ${Icon ? 'with-icon' : ''}`}
                    rows="3"
                />
            </div>
        </div>
    );

    const SelectField = ({ label, options, icon: Icon, ...props }) => (
        <div className="form-group-cln">
            <label className="label-cln">{label}</label>
            <div className="input-wrap-cln">
                {Icon && <Icon size={18} className="icon-cln" />}
                <select {...props} className={`select-cln ${Icon ? 'with-icon' : ''}`}>
                    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
            </div>
        </div>
    );

    if (submitted) {
        return (
            <div className="admission-full-page">
                <div className="bg-container"><div className="organic-blob blob-1"></div></div>
                <div className="app-container central-form-view">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card-clean success-box">
                        <div className="success-icon-glow"><CheckCircle size={48} /></div>
                        <h1 className="success-title">Application Submitted!</h1>
                        <p className="success-msg">Your comprehensive profile has been received. Our team will review the details and contact you.</p>
                        <div className="id-badge">
                            <span className="id-label">APPLICATION ID</span>
                            <span className="id-value">{applicationId}</span>
                        </div>
                        <button className="btn-pill btn-primary" onClick={() => navigate('/')}><ArrowLeft size={18} /> Return to Home</button>
                    </motion.div>
                </div>
                {localStyles}
            </div>
        );
    }

    return (
        <div className="admission-full-page">
            <div className="bg-container"><div className="organic-blob blob-1"></div></div>
            <div className="app-container central-form-view">
                <div className="admission-content-width">
                    <div className="admission-nav-top">
                        <div className="back-link-cln" onClick={() => navigate('/')}><ChevronLeft size={20} /><span>Back to Site</span></div>
                        <div className="logo-brand-cln">
                            <img src={logo} alt="Logo" className="logo-cln" /><span className="brand-name-cln">HOPE3 Academy</span>
                        </div>
                    </div>

                    <div className="admission-intro">
                        <h2 className="title-cln">Comprehensive Enrollment</h2>
                        <div className="step-tracker-visual">
                            {[1, 2, 3, 4, 5, 6].map(s => (
                                <React.Fragment key={s}>
                                    <div className={`step-node ${s === step ? 'active' : s < step ? 'completed' : ''}`}>
                                        {s < step ? <CheckCircle size={16} /> : s}
                                    </div>
                                    {s < 6 && <div className={`step-connector ${s < step ? 'filled' : ''}`}></div>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="card-clean form-card-padding">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div key="s1" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                                    <h3 className="step-heading">Step 1: Identity & Personal</h3>
                                    <InputField label="Full Name" icon={User} name="fullName" value={formData.fullName} onChange={handleChange} required />
                                    <div className="grid-flex">
                                        <SelectField label="Gender" icon={Users} name="gender" value={formData.gender} onChange={handleChange} options={['Select', 'Male', 'Female', 'Other']} />
                                        <InputField label="Date of Birth" icon={Calendar} type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                                    </div>
                                    <div className="grid-flex">
                                        <InputField label="Gmail ID" icon={Mail} name="gmailId" value={formData.gmailId} onChange={handleChange} required />
                                        <InputField label="Mobile Number" icon={Phone} name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required />
                                    </div>
                                    <div className="grid-flex">
                                        <InputField label="Religion" name="religion" value={formData.religion} onChange={handleChange} />
                                        <InputField label="Community" name="community" value={formData.community} onChange={handleChange} />
                                    </div>
                                    <div className="grid-flex">
                                        <SelectField label="Physically Challenged" name="physicallyChallenged" value={formData.physicallyChallenged} onChange={handleChange} options={['No', 'Yes']} />
                                        <InputField label="Photograph (Upload)" icon={Upload} type="file" name="photograph" onChange={handleChange} />
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="s2" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                                    <h3 className="step-heading">Step 2: Address & Location</h3>
                                    <TextAreaField label="Full Address" icon={MapPin} name="fullAddress" value={formData.fullAddress} onChange={handleChange} required />
                                    <div className="grid-flex">
                                        <SelectField label="Area Type" icon={Home} name="areaType" value={formData.areaType} onChange={handleChange} options={['Urban', 'Rural']} />
                                        <InputField label="District" name="district" value={formData.district} onChange={handleChange} required />
                                    </div>
                                    <div className="grid-flex">
                                        <InputField label="Area" name="area" value={formData.area} onChange={handleChange} />
                                        <InputField label="Landmark" name="landmark" value={formData.landmark} onChange={handleChange} />
                                    </div>
                                    <InputField label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} required />
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="s3" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                                    <h3 className="step-heading">Step 3: Family Details</h3>
                                    <div className="grid-flex">
                                        <SelectField label="Parent Status" name="parentStatus" value={formData.parentStatus} onChange={handleChange} options={['Both Alive', 'Single Parent', 'Orphan']} />
                                        <InputField label="Number of Siblings" name="siblings" value={formData.siblings} onChange={handleChange} type="number" />
                                    </div>
                                    <div className="family-section">
                                        <h4 className="sub-heading">Father Details</h4>
                                        <div className="grid-flex">
                                            <InputField label="Name" name="fatherName" value={formData.fatherName} onChange={handleChange} />
                                            <InputField label="Occupation" name="fatherOccupation" value={formData.fatherOccupation} onChange={handleChange} />
                                        </div>
                                        <InputField label="Contact Number" name="fatherContact" value={formData.fatherContact} onChange={handleChange} />
                                    </div>
                                    <div className="family-section">
                                        <h4 className="sub-heading">Mother Details</h4>
                                        <div className="grid-flex">
                                            <InputField label="Name" name="motherName" value={formData.motherName} onChange={handleChange} />
                                            <InputField label="Occupation" name="motherOccupation" value={formData.motherOccupation} onChange={handleChange} />
                                        </div>
                                        <InputField label="Contact Number" name="motherContact" value={formData.motherContact} onChange={handleChange} />
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div key="s4" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                                    <h3 className="step-heading">Step 4: Academic Information</h3>
                                    <InputField label="College Name" icon={Building} name="collegeName" value={formData.collegeName} onChange={handleChange} required />
                                    <TextAreaField label="College Address" icon={MapPin} name="collegeAddress" value={formData.collegeAddress} onChange={handleChange} />
                                    <div className="grid-flex">
                                        <InputField label="Course" icon={GraduationCap} name="course" value={formData.course} onChange={handleChange} required />
                                        <InputField label="Major" icon={Briefcase} name="major" value={formData.major} onChange={handleChange} required />
                                    </div>
                                    <div className="grid-flex">
                                        <SelectField label="Hostel or Day-scholar" name="hostelDayScholar" value={formData.hostelDayScholar} onChange={handleChange} options={['Day Scholar', 'Hostel']} />
                                        <InputField label="Current Year" name="currentYear" value={formData.currentYear} onChange={handleChange} />
                                    </div>
                                </motion.div>
                            )}

                            {step === 5 && (
                                <motion.div key="s5" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                                    <h3 className="step-heading">Step 5: Bank & Financials</h3>
                                    <h4 className="sub-heading">Student Bank Account</h4>
                                    <div className="grid-flex">
                                        <InputField label="Bank Name" name="studentBankName" value={formData.studentBankName} onChange={handleChange} />
                                        <InputField label="Account Number" name="studentAccountNo" value={formData.studentAccountNo} onChange={handleChange} />
                                    </div>
                                    <InputField label="IFSC Code" name="bankIfsc" value={formData.bankIfsc} onChange={handleChange} />

                                    <h4 className="sub-heading" style={{ marginTop: '2rem' }}>Parent Bank Account</h4>
                                    <div className="grid-flex">
                                        <InputField label="Account Number" name="parentAccountNo" value={formData.parentAccountNo} onChange={handleChange} />
                                        <InputField label="IFSC Code" name="parentIfsc" value={formData.parentIfsc} onChange={handleChange} />
                                    </div>
                                </motion.div>
                            )}

                            {step === 6 && (
                                <motion.div key="s6" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                                    <h3 className="step-heading">Step 6: Career & Future</h3>
                                    <div className="grid-flex">
                                        <SelectField label="Currently Working" name="currentlyWorking" value={formData.currentlyWorking} onChange={handleChange} options={['No', 'Yes']} />
                                        <SelectField label="Is Married" name="isMarried" value={formData.isMarried} onChange={handleChange} options={['No', 'Yes']} />
                                    </div>
                                    <div className="grid-flex">
                                        <SelectField label="Are you on track" name="onTrack" value={formData.onTrack} onChange={handleChange} options={['Yes', 'No']} />
                                        <SelectField label="Willing to volunteer" name="volunteering" value={formData.volunteering} onChange={handleChange} options={['Yes', 'No']} />
                                    </div>
                                    <TextAreaField label="Other Notes" icon={FileText} name="otherNotes" value={formData.otherNotes} onChange={handleChange} />
                                    <div className="compliance-box" style={{ marginTop: '2rem' }}>
                                        <ShieldCheck size={20} className="comp-icon" />
                                        <p>I confirm all details are original and provided for HOPE3 Academy screening.</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="form-actions-row">
                            {step > 1 && <button type="button" onClick={handlePrev} className="btn-secondary-cln"><ArrowLeft size={18} /> Previous</button>}
                            {step < 6 ? (
                                <button type="button" onClick={handleNext} className="btn-primary-cln">Continue <ArrowRight size={18} /></button>
                            ) : (
                                <button type="submit" className="btn-primary-cln submit-color">Complete Application</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
            {localStyles}
        </div>
    );
};

const localStyles = (
    <style jsx>{`
        .admission-full-page { min-height: 100vh; width: 100%; position: relative; overflow-x: hidden; background: #fff; }
        .central-form-view { display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding: 4rem 1rem; min-height: 100vh; }
        .admission-content-width { width: 100%; max-width: 800px; }
        .admission-nav-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; }
        .back-link-cln { display: flex; align-items: center; gap: 0.5rem; color: #64748b; font-size: 0.9rem; font-weight: 700; cursor: pointer; }
        .logo-brand-cln { display: flex; align-items: center; gap: 1rem; }
        .logo-cln { height: 40px; }
        .brand-name-cln { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 1.1rem; color: #111827; text-transform: uppercase; letter-spacing: 0.05em; }
        .admission-intro { text-align: center; margin-bottom: 3rem; }
        .title-cln { font-size: 2.2rem; font-weight: 950; color: #111827; margin-bottom: 2rem; }
        
        /* Step Tracker */
        .step-tracker-visual { display: flex; align-items: center; justify-content: center; gap: 0; margin-bottom: 1rem; }
        .step-node { width: 36px; height: 36px; border-radius: 50%; border: 2px solid #e2e8f0; display: flex; align-items: center; justify-content: center; background: white; color: #94a3b8; font-weight: 800; font-size: 0.85rem; position: relative; z-index: 2; transition: all 0.4s ease; }
        .step-node.active { border-color: var(--primary); color: var(--primary); transform: scale(1.1); }
        .step-node.completed { border-color: var(--primary); background: var(--primary); color: white; }
        .step-connector { width: 40px; height: 2px; background: #e2e8f0; position: relative; z-index: 1; }
        .step-connector.filled { background: var(--primary); }

        .form-card-padding { padding: 3rem; background: white; box-shadow: 0 40px 100px rgba(0,0,0,0.05); border-radius: 32px; border: 1px solid #f1f5f9; }
        .step-heading { font-size: 1.1rem; font-weight: 800; color: #111827; margin-bottom: 2rem; border-bottom: 1px solid #f1f5f9; padding-bottom: 1rem; }
        .sub-heading { font-size: 0.9rem; font-weight: 700; color: var(--primary); margin: 1.5rem 0 1rem; text-transform: uppercase; letter-spacing: 1px; }
        
        .form-group-cln { margin-bottom: 1.2rem; }
        .label-cln { display: block; font-size: 0.75rem; font-weight: 850; color: #64748b; text-transform: uppercase; margin-bottom: 0.5rem; }
        .input-wrap-cln { position: relative; }
        .icon-cln { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); color: var(--primary); }
        .input-field-cln, .select-cln { width: 100%; padding: 0.9rem 1rem; background: #f8fafc; border: 1.5px solid #f1f5f9; border-radius: 12px; font-size: 0.95rem; outline: none; transition: 0.3s; }
        .input-field-cln.with-icon { padding-left: 3.2rem; }
        .textarea-cln { resize: vertical; min-height: 80px; }
        .grid-flex { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .family-section { padding: 1.5rem; background: #fafafa; border-radius: 20px; margin-bottom: 1.5rem; border: 1px solid #f0f0f0; }

        .compliance-box { display: flex; gap: 1rem; padding: 1.2rem; background: rgba(0,209,193,0.05); border-radius: 16px; align-items: center; }
        .compliance-box p { font-size: 0.8rem; color: #0f766e; font-weight: 600; line-height: 1.4; }
        .form-actions-row { display: flex; justify-content: space-between; margin-top: 2.5rem; gap: 1rem; }
        .btn-primary-cln { flex: 1.5; padding: 1rem; background: var(--primary); color: white; border: none; border-radius: 14px; font-weight: 850; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.6rem; transition: 0.3s; }
        .btn-primary-cln.submit-color { background: var(--secondary); color: #1e293b; }
        .btn-secondary-cln { flex: 1; background: #f1f5f9; color: #475569; border: none; border-radius: 14px; font-weight: 850; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }

        .success-box { max-width: 600px; padding: 4rem 2rem; text-align: center; }
        .success-icon-glow { width: 80px; height: 80px; background: rgba(0,209,193,0.1); color: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; }
        .id-badge { background: #f8fafc; border: 2px dashed var(--primary); padding: 2rem; border-radius: 20px; margin-bottom: 2.5rem; }
        .id-label { display: block; font-size: 0.7rem; font-weight: 900; color: var(--primary); margin-bottom: 0.5rem; }
        .id-value { font-size: 1.8rem; font-weight: 950; color: #111827; letter-spacing: 2px; }

        @media (max-width: 768px) { .grid-flex { grid-template-columns: 1fr; } .form-card-padding { padding: 1.5rem; } }
    `}</style>
);

export default StudentAdmission;
