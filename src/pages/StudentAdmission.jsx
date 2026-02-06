import React, { useState, useRef, useEffect, memo } from 'react';
import confetti from 'canvas-confetti';
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
    Upload,
    FileText,
    Users,
    Activity,
    Target,
    Heart,
    DollarSign,
    Link,
    ChevronDown,
    FileUp,
    X,
    Image as ImageIcon,
    Sparkles,
    Copy,
    Printer
} from 'lucide-react';

import logo from '../assets/hope logo.png';

// --- Pure UI Components (Defined Outside to Prevent Focus Loss) ---

const InputField = memo(({ label, icon: Icon, helperText, ...props }) => (
    <div className="form-group-admission">
        <div className="label-row-cln">
            <label>{label}</label>
            {helperText && <span className="helper-text-cln">{helperText}</span>}
        </div>
        <div className="input-with-icon-cln">
            {Icon && <Icon size={18} className="field-icon-cln" />}
            <input
                {...props}
                className={`enhanced-input ${Icon ? 'with-icon' : ''}`}
                autoComplete="new-password"
                placeholder={props.placeholder || `Enter ${label.toLowerCase()}...`}
            />
        </div>
    </div>
));

const TextAreaField = memo(({ label, icon: Icon, helperText, ...props }) => (
    <div className="form-group-admission">
        <div className="label-row-cln">
            <label>{label}</label>
            {helperText && <span className="helper-text-cln">{helperText}</span>}
        </div>
        <div className="input-with-icon-cln">
            {Icon && <Icon size={18} className="field-icon-cln" style={{ top: '20px', transform: 'none' }} />}
            <textarea
                {...props}
                className={`enhanced-input textarea-enhanced ${Icon ? 'with-icon' : ''}`}
                rows="3"
                placeholder={props.placeholder || `Provide ${label.toLowerCase()} details...`}
            />
        </div>
    </div>
));

const CustomDropdown = memo(({ label, options, icon: Icon, name, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        const val = option === 'Select' ? '' : option;
        onChange({ target: { name, value: val } });
        setIsOpen(false);
    };

    return (
        <div className="form-group-admission" ref={dropdownRef} style={{ zIndex: isOpen ? 1000 : 1 }}>
            <div className="label-row-cln">
                <label>{label}</label>
            </div>
            <div className={`custom-dropdown-wrap ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                {Icon && <Icon size={18} className="field-icon-cln" />}
                <div className={`dropdown-selected ${Icon ? 'with-icon' : ''} ${!value ? 'placeholder' : ''}`}>
                    {value || 'Select an option'}
                </div>
                <ChevronDown size={18} className={`chevron-icon ${isOpen ? 'rotated' : ''}`} />

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="dropdown-options"
                        >
                            {options.map(opt => (
                                <div
                                    key={opt}
                                    className={`dropdown-opt ${value === opt ? 'selected' : ''}`}
                                    onClick={(e) => { e.stopPropagation(); handleSelect(opt); }}
                                >
                                    {opt}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
});

const CustomFilePicker = memo(({ label, helperText, name, value, onChange }) => {
    const fileInputRef = useRef(null);

    const handleFileClick = () => fileInputRef.current.click();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onChange({ target: { name, type: 'file', files: [file] } });
        }
    };

    const clearFile = (e) => {
        e.stopPropagation();
        onChange({ target: { name, value: null } });
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="form-group-admission">
            <div className="label-row-cln">
                <label>{label}</label>
                {helperText && <span className="helper-text-cln">{helperText}</span>}
            </div>
            <div className={`file-picker-enhanced ${value ? 'has-file' : ''}`} onClick={handleFileClick}>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                    accept="image/*"
                />
                <div className="file-picker-inner">
                    {value ? (
                        <div className="file-info-cln">
                            <div className="file-preview-cln">
                                <ImageIcon size={20} className="file-icon-pulse" />
                                <span className="file-name-truncate">{value.name}</span>
                            </div>
                            <button type="button" className="clear-file-btn" onClick={clearFile}><X size={16} /></button>
                        </div>
                    ) : (
                        <div className="file-placeholder-cln">
                            <FileUp size={24} className="upload-icon-anim" />
                            <div className="text-stack-cln">
                                <span className="main-text">Click to upload photograph</span>
                                <span className="sub-text">PNG, JPG or WEBP (Max 2MB)</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});

const StudentAdmission = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [applicationId, setApplicationId] = useState('');
    const [copying, setCopying] = useState(false);
    const [formData, setFormData] = useState({
        sNo: '', fullName: '', admissionMode: 'Regular', gender: '', dobOriginal: '', gmailId: '', mobileNumber: '', photographRecent: null,
        religion: '', community: '', physicallyChallenged: 'No', fullAddress: '', areaType: 'Urban', landmark: '', area: '', district: '', pincode: '',
        parentStatus: 'Both Alive', fatherName: '', fatherOccupation: '', fatherContactNumber: '', motherName: '', motherOccupation: '', motherContactNumber: '',
        guardianName: '', guardianOccupation: '', guardianContactNumber: '', numberOfSiblings: '0', courseName: '', majorSubject: '', collegeName: '',
        collegeAddress: '', bankNameSavings: '', bankAccountNumber: '', bankIfscCode: '', parentAccountNumber: '', parentIfscCode: '',
        academicFundingMaturity: 'No', fundingPercentage: '0', fundingAmountApprox: '0', fundersNames: '', adminRemarks: '', folderLink: '',
        currentlyWorking: 'No', currentLocation: '', currentDesignation: '', isMarried: 'No', isOnTrack: 'Yes', willingToVolunteer: 'Yes', otherNotes: ''
    });

    const [photoPreview, setPhotoPreview] = useState(null);

    useEffect(() => {
        if (formData.photographRecent) {
            const url = URL.createObjectURL(formData.photographRecent);
            setPhotoPreview(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [formData.photographRecent]);

    const triggerCelebration = () => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: 0, y: 0 }, gravity: 1.2, scalar: 1.2, colors: ['#00d1c1', '#fbbf24', '#ffffff'] });
            confetti({ ...defaults, particleCount, origin: { x: 1, y: 0 }, gravity: 1.2, scalar: 1.2, colors: ['#00d1c1', '#fbbf24', '#ffffff'] });
        }, 250);
    };

    useEffect(() => {
        if (submitted) {
            triggerCelebration();
        }
    }, [submitted]);

    const handleCopyId = () => {
        navigator.clipboard.writeText(applicationId);
        setCopying(true);
        setTimeout(() => setCopying(false), 2000);
    };

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

    if (submitted) {
        return (
            <div className="admission-full-page celebration-bg">
                {/* Print Only Area */}
                <div className="printable-application">
                    <div className="print-header">
                        <img src={logo} alt="HOPE3 Logo" className="print-logo" />
                        <div className="print-header-text">
                            <h1>HOPE3 ACADEMY</h1>
                            <p>Official Student Enrollment Record - 2026</p>
                        </div>
                        <div className="print-id-badge">
                            <span className="p-label">APPLICATION ID</span>
                            <span className="p-value">{applicationId}</span>
                        </div>
                    </div>

                    <div className="print-content-grid">
                        <div className="print-section">
                            <h3 className="section-divider">Baseline Information</h3>
                            <div className="p-row"><span>Full Name:</span> <strong>{formData.fullName}</strong></div>
                            <div className="p-row"><span>Gender:</span> <strong>{formData.gender}</strong></div>
                            <div className="p-row"><span>Date of Birth:</span> <strong>{formData.dobOriginal}</strong></div>
                            <div className="p-row"><span>Mobile:</span> <strong>{formData.mobileNumber}</strong></div>
                            <div className="p-row"><span>Email:</span> <strong>{formData.gmailId}</strong></div>
                            <div className="p-row"><span>Admission Mode:</span> <strong>{formData.admissionMode}</strong></div>
                        </div>

                        <div className="print-photo-box">
                            {photoPreview ? <img src={photoPreview} alt="Student" /> : <div className="photo-placeholder">PHOTO</div>}
                        </div>
                    </div>

                    <div className="print-section">
                        <h3 className="section-divider">Geographic Details</h3>
                        <div className="p-row"><span>Address:</span> <strong>{formData.fullAddress}</strong></div>
                        <div className="p-grid">
                            <div className="p-row"><span>Area Type:</span> <strong>{formData.areaType}</strong></div>
                            <div className="p-row"><span>District:</span> <strong>{formData.district}</strong></div>
                            <div className="p-row"><span>Pincode:</span> <strong>{formData.pincode}</strong></div>
                        </div>
                    </div>

                    <div className="print-section">
                        <h3 className="section-divider">Family & Guardian</h3>
                        <div className="p-row"><span>Parent Status:</span> <strong>{formData.parentStatus}</strong></div>
                        <div className="p-grid">
                            <div className="p-row"><span>Father Name:</span> <strong>{formData.fatherName}</strong></div>
                            <div className="p-row"><span>Father Occupation:</span> <strong>{formData.fatherOccupation}</strong></div>
                        </div>
                        <div className="p-grid">
                            <div className="p-row"><span>Mother Name:</span> <strong>{formData.motherName}</strong></div>
                            <div className="p-row"><span>Mother Occupation:</span> <strong>{formData.motherOccupation}</strong></div>
                        </div>
                    </div>

                    <div className="print-section">
                        <h3 className="section-divider">Academic & Banking</h3>
                        <div className="p-row"><span>College:</span> <strong>{formData.collegeName}</strong></div>
                        <div className="p-row"><span>Course/Major:</span> <strong>{formData.courseName} - {formData.majorSubject}</strong></div>
                        <div className="p-grid">
                            <div className="p-row"><span>Bank:</span> <strong>{formData.bankNameSavings}</strong></div>
                            <div className="p-row"><span>A/C No:</span> <strong>{formData.bankAccountNumber}</strong></div>
                        </div>
                    </div>

                    <div className="print-footer">
                        <div className="signature-box">
                            <div className="sig-line"></div>
                            <p>Student Signature</p>
                        </div>
                        <div className="signature-box">
                            <div className="sig-line"></div>
                            <p>Registrar Seal</p>
                        </div>
                    </div>
                </div>

                <div className="bg-container">
                    <div className="organic-blob blob-celebrate-1"></div>
                    <div className="organic-blob blob-celebrate-2"></div>
                </div>
                <div className="app-container central-form-view">
                    <motion.div initial={{ opacity: 0, y: 40, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="success-card-premium">
                        <div className="success-header">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.3 }} className="check-ring">
                                <CheckCircle size={64} className="check-icon-main" />
                                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="ring-glow"></motion.div>
                            </motion.div>
                        </div>
                        <div className="success-content">
                            <h1 className="premium-success-title">Enrollment Complete!</h1>
                            <p className="premium-success-subtitle">Welcome to the HOPE3 Academy Family. The candidate's academic profile is now active and verified.</p>
                            <div className="hope-id-box">
                                <span className="id-meta">OFFICIAL HOPE IDENTIFIER</span>
                                <div className="id-value-row">
                                    <span className="id-text">{applicationId}</span>
                                    <button onClick={handleCopyId} className={`id-copy-btn ${copying ? 'copied' : ''}`}>
                                        {copying ? <CheckCircle size={18} /> : <Copy size={18} />}
                                    </button>
                                </div>
                                <div className="id-footer">
                                    <ShieldCheck size={14} /> <span>Blockchain Verified Record</span>
                                </div>
                            </div>
                            <div className="success-actions">
                                <button className="success-btn btn-print" onClick={() => window.print()}><Printer size={18} /> Print Application</button>
                                <button className="success-btn btn-home" onClick={() => navigate('/')}><ArrowLeft size={18} /> Home Dashboard</button>
                            </div>
                        </div>
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
                        <h2 className="title-cln">Enhanced Student Enrollment</h2>
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
                                    <h3 className="step-heading">Step 1: Identity & Profile Baseline</h3>
                                    <div className="grid-flex">
                                        <InputField label="Name" icon={User} name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Full name as per official records" />
                                        <CustomDropdown label="Gender" icon={Users} name="gender" value={formData.gender} onChange={handleChange} options={['Male', 'Female', 'Other']} />
                                    </div>
                                    <div className="grid-flex">
                                        <InputField label="Date of Birth (Original)" icon={Calendar} type="date" name="dobOriginal" value={formData.dobOriginal} onChange={handleChange} required />
                                        <InputField label="Gmail ID" icon={Mail} name="gmailId" value={formData.gmailId} onChange={handleChange} required placeholder="example@gmail.com" helperText="Secondary backup contact" />
                                    </div>
                                    <div className="grid-flex">
                                        <InputField label="Mobile Number" icon={Phone} name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required placeholder="+91 00000 00000" />
                                        <CustomDropdown label="Mode" name="admissionMode" value={formData.admissionMode} onChange={handleChange} options={['Regular', 'Parallel Immersive']} />
                                    </div>
                                    <CustomFilePicker label="Photograph (Recent & Quality)" name="photographRecent" value={formData.photographRecent} onChange={handleChange} helperText="Passport size image (Max 2MB)" />
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="s2" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                                    <h3 className="step-heading">Step 2: Geographic Background</h3>
                                    <TextAreaField label="Full Address" icon={MapPin} name="fullAddress" value={formData.fullAddress} onChange={handleChange} required />
                                    <div className="grid-flex">
                                        <CustomDropdown label="Area Type" icon={Home} name="areaType" value={formData.areaType} onChange={handleChange} options={['Urban', 'Rural']} />
                                        <InputField label="Area" name="area" value={formData.area} onChange={handleChange} />
                                    </div>
                                    <div className="grid-flex">
                                        <InputField label="Landmark" name="landmark" value={formData.landmark} onChange={handleChange} />
                                        <InputField label="District" name="district" value={formData.district} onChange={handleChange} required />
                                    </div>
                                    <div className="grid-flex">
                                        <InputField label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} required helperText="6-digit area code" placeholder="600001" />
                                        <InputField label="S.No" name="sNo" value={formData.sNo} onChange={handleChange} placeholder="Optional tracking #" />
                                    </div>
                                    <div className="grid-flex">
                                        <InputField label="Religion" name="religion" value={formData.religion} onChange={handleChange} />
                                        <InputField label="Community" name="community" value={formData.community} onChange={handleChange} />
                                    </div>
                                    <CustomDropdown label="Physically Challenged" name="physicallyChallenged" value={formData.physicallyChallenged} onChange={handleChange} options={['No', 'Yes']} />
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="s3" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                                    <h3 className="step-heading">Step 3: Family & Guardian Structure</h3>
                                    <div className="grid-flex">
                                        <CustomDropdown label="Parent Status" name="parentStatus" value={formData.parentStatus} onChange={handleChange} options={['Both Alive', 'Single Parent', 'Orphan']} />
                                        <InputField label="Number of Siblings" name="numberOfSiblings" value={formData.numberOfSiblings} onChange={handleChange} type="number" />
                                    </div>
                                    <div className="form-sub-container">
                                        <h4 className="label-sub">Father Information</h4>
                                        <div className="grid-flex">
                                            <InputField label="Father Name" name="fatherName" value={formData.fatherName} onChange={handleChange} />
                                            <InputField label="Occupation" name="fatherOccupation" value={formData.fatherOccupation} onChange={handleChange} />
                                        </div>
                                        <InputField label="Contact Number" name="fatherContactNumber" value={formData.fatherContactNumber} onChange={handleChange} />
                                    </div>
                                    <div className="form-sub-container">
                                        <h4 className="label-sub">Mother Information</h4>
                                        <div className="grid-flex">
                                            <InputField label="Mother Name" name="motherName" value={formData.motherName} onChange={handleChange} />
                                            <InputField label="Occupation" name="motherOccupation" value={formData.motherOccupation} onChange={handleChange} />
                                        </div>
                                        <InputField label="Contact Number" name="motherContactNumber" value={formData.motherContactNumber} onChange={handleChange} />
                                    </div>
                                    <div className="form-sub-container">
                                        <h4 className="label-sub">Guardian Information</h4>
                                        <div className="grid-flex">
                                            <InputField label="Guardian Name" name="guardianName" value={formData.guardianName} onChange={handleChange} />
                                            <InputField label="Occupation" name="guardianOccupation" value={formData.guardianOccupation} onChange={handleChange} />
                                        </div>
                                        <InputField label="Contact Number" name="guardianContactNumber" value={formData.guardianContactNumber} onChange={handleChange} />
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div key="s4" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                                    <h3 className="step-heading">Step 4: Academic Journey</h3>
                                    <InputField label="College" icon={Building} name="collegeName" value={formData.collegeName} onChange={handleChange} required />
                                    <TextAreaField label="College Address" icon={MapPin} name="collegeAddress" value={formData.collegeAddress} onChange={handleChange} />
                                    <div className="grid-flex">
                                        <InputField label="Course" icon={GraduationCap} name="courseName" value={formData.courseName} onChange={handleChange} required />
                                        <InputField label="Major" icon={Briefcase} name="majorSubject" value={formData.majorSubject} onChange={handleChange} required />
                                    </div>
                                </motion.div>
                            )}

                            {step === 5 && (
                                <motion.div key="s5" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                                    <h3 className="step-heading">Step 5: Financial & Banking</h3>
                                    <div className="form-sub-container">
                                        <h4 className="label-sub">Direct Account Details</h4>
                                        <InputField label="Which Bank you are having savings account?" name="bankNameSavings" value={formData.bankNameSavings} onChange={handleChange} placeholder="Main savings account #" />
                                        <div className="grid-flex">
                                            <InputField label="Bank Account Number" name="bankAccountNumber" value={formData.bankAccountNumber} onChange={handleChange} placeholder="Main savings account #" />
                                            <InputField label="Bank - IFSC" name="bankIfscCode" value={formData.bankIfscCode} onChange={handleChange} helperText="11 characters" placeholder="ABCD0123456" />
                                        </div>
                                    </div>
                                    <div className="form-sub-container">
                                        <h4 className="label-sub">Parent Account Tracking</h4>
                                        <div className="grid-flex">
                                            <InputField label="Parent Account Number" name="parentAccountNumber" value={formData.parentAccountNumber} onChange={handleChange} placeholder="Guardian's account #" />
                                            <InputField label="Parent IFSC" name="parentIfscCode" value={formData.parentIfscCode} onChange={handleChange} helperText="11 characters" />
                                        </div>
                                    </div>
                                    <div className="form-sub-container">
                                        <h4 className="label-sub">Academic Funding Status</h4>
                                        <div className="grid-flex">
                                            <CustomDropdown label="Academic Funding Maturity" name="academicFundingMaturity" value={formData.academicFundingMaturity} onChange={handleChange} options={['No', 'Yes']} />
                                            <InputField label="Funding %" name="fundingPercentage" value={formData.fundingPercentage} onChange={handleChange} type="number" />
                                        </div>
                                        <div className="grid-flex">
                                            <InputField label="Amount (Approx)" icon={DollarSign} name="fundingAmountApprox" value={formData.fundingAmountApprox} onChange={handleChange} />
                                            <InputField label="Funders" icon={Users} name="fundersNames" value={formData.fundersNames} onChange={handleChange} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 6 && (
                                <motion.div key="s6" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                                    <h3 className="step-heading">Step 6: Future & Admin Control</h3>
                                    <div className="grid-flex">
                                        <CustomDropdown label="Currently Working" name="currentlyWorking" value={formData.currentlyWorking} onChange={handleChange} options={['No', 'Yes']} />
                                        <InputField label="Location" icon={MapPin} name="workLocation" value={formData.workLocation} onChange={handleChange} />
                                    </div>
                                    <div className="grid-flex">
                                        <InputField label="Designation" icon={Briefcase} name="designation" value={formData.designation} onChange={handleChange} />
                                        <CustomDropdown label="Is Married" name="isMarried" value={formData.isMarried} onChange={handleChange} options={['No', 'Yes']} />
                                    </div>
                                    <div className="grid-flex">
                                        <CustomDropdown label="Are you on track" icon={Target} name="isOnTrack" value={formData.isOnTrack} onChange={handleChange} options={['Yes', 'No']} />
                                        <CustomDropdown label="Willing to do volunteering" icon={Heart} name="willingToVolunteer" value={formData.willingToVolunteer} onChange={handleChange} options={['Yes', 'No']} />
                                    </div>
                                    <InputField label="Folder Link" icon={Link} name="folderLink" value={formData.folderLink} onChange={handleChange} placeholder="Drive / Cloud Link" />
                                    <TextAreaField label="Other Notes" icon={FileText} name="otherNotes" value={formData.otherNotes} onChange={handleChange} />
                                    <TextAreaField label="Remarks" name="adminRemarks" value={formData.adminRemarks} onChange={handleChange} />
                                    <div className="compliance-box" style={{ marginTop: '2rem' }}>
                                        <ShieldCheck size={20} className="comp-icon" />
                                        <p>Comprehensive Verification: I declare all the provided data is verified for HOPE3 internal records.</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div className="form-actions-row">
                            {step > 1 && <button type="button" onClick={handlePrev} className="btn-secondary-cln"><ArrowLeft size={18} /> Previous</button>}
                            {step < 6 ? (
                                <button type="button" onClick={handleNext} className="btn-primary-cln">Continue <ArrowRight size={18} /></button>
                            ) : (
                                <button type="submit" className="btn-primary-cln submit-color">Finalize Enrollment</button>
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
    <style>{`
        .admission-full-page { min-height: 100vh; width: 100%; position: relative; overflow-x: hidden; background: #fff; }
        .central-form-view { display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding: 4rem 1rem; min-height: 100vh; }
        .admission-content-width { width: 100%; max-width: 850px; }
        .admission-nav-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; }
        .back-link-cln { display: flex; align-items: center; gap: 0.5rem; color: #64748b; font-size: 0.9rem; font-weight: 700; cursor: pointer; transition: 0.3s; }
        .back-link-cln:hover { color: var(--primary); }
        .logo-brand-cln { display: flex; align-items: center; gap: 1rem; }
        .logo-cln { height: 40px; }
        .brand-name-cln { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 1.1rem; color: #111827; text-transform: uppercase; letter-spacing: 0.05em; }
        .admission-intro { text-align: center; margin-bottom: 3rem; }
        .title-cln { font-size: 2.2rem; font-weight: 950; color: #111827; margin-bottom: 2rem; }
        
        /* Step Tracker Visual */
        .step-tracker-visual { display: flex; align-items: center; justify-content: center; gap: 0; margin-bottom: 1rem; }
        .step-node { width: 42px; height: 42px; border-radius: 50%; border: 2px solid #e2e8f0; display: flex; align-items: center; justify-content: center; background: white; color: #94a3b8; font-weight: 800; font-size: 0.9rem; position: relative; z-index: 2; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .step-node.active { border-color: var(--primary); color: var(--primary); transform: scale(1.15); box-shadow: 0 0 0 5px rgba(0, 209, 193, 0.1); }
        .step-node.completed { border-color: var(--primary); background: var(--primary); color: white; }
        .step-connector { width: 45px; height: 3px; background: #f1f5f9; position: relative; z-index: 1; }
        .step-connector.filled { background: var(--primary); }

        .form-card-padding { padding: 4rem; background: white; box-shadow: 0 40px 100px rgba(0,0,0,0.06); border-radius: 40px; border: 2px solid #b2bec3; }
        .step-heading { font-size: 1.4rem; font-weight: 800; color: #111827; margin-bottom: 2.5rem; border-left: 5px solid var(--primary); padding-left: 1.5rem; line-height: 1.2; text-transform: none; letter-spacing: -0.01em; }
        .form-sub-container { background: #fbfbfb; border: 1.5px solid #b2bec3; padding: 2rem; border-radius: 24px; margin-bottom: 2rem; }
        .label-sub { font-size: 0.95rem; font-weight: 800; color: var(--primary); margin-bottom: 1.5rem; text-transform: none; letter-spacing: -0.01em; display: flex; align-items: center; gap: 0.8rem; }
        .label-sub::after { content: ''; height: 1px; flex: 1; background: #b2bec3; }
        
        .form-group-admission { margin-bottom: 2rem; position: relative; }
        .label-row-cln { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 0.7rem; }
        .label-row-cln label, .form-group-admission > label { display: block; font-size: 0.95rem; font-weight: 750; color: #1e293b; text-transform: none; letter-spacing: -0.01em; margin: 0; }
        .helper-text-cln { font-size: 0.7rem; color: #94a3b8; font-weight: 600; }
        
        .input-with-icon-cln { position: relative; width: 100%; transition: transform 0.2s ease; }
        .field-icon-cln { position: absolute; left: 1.1rem; top: 50%; transform: translateY(-50%); color: var(--primary); pointer-events: none; transition: 0.3s; z-index: 2; }
        
        .enhanced-input { 
            width: 100%; 
            padding: 1.1rem 1.4rem; 
            background: #ffffff; 
            border: 2px solid #b2bec3; 
            border-radius: 16px; 
            font-size: 1rem; 
            font-family: 'Outfit', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            font-weight: 400; 
            outline: none; 
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
            color: #111827; 
        }
        .enhanced-input.with-icon { padding-left: 3.6rem; }
        .textarea-enhanced { resize: vertical; min-height: 110px; line-height: 1.6; }
        .enhanced-input::placeholder { color: #cbd5e1; font-weight: 400; }
        .enhanced-input:hover { border-color: #94a3b8; background: #fcfcfc; }
        .enhanced-input:focus { 
            border-color: var(--primary); 
            background: #fff; 
            box-shadow: 0 0 0 4px rgba(0, 209, 193, 0.1), 0 10px 20px rgba(0, 0, 0, 0.05);
            transform: translateY(-2px);
        }
        .enhanced-input:focus + .field-icon-cln { color: var(--primary); scale: 1.1; }

        .custom-dropdown-wrap {
            position: relative; width: 100%; height: 56px; background: #fff; border: 2px solid #b2bec3; border-radius: 16px; 
            cursor: pointer; display: flex; align-items: center; transition: all 0.3s ease;
        }
        .custom-dropdown-wrap:hover { border-color: #94a3b8; background: #fcfcfc; }
        .custom-dropdown-wrap.active { border-color: var(--primary); box-shadow: 0 0 0 4px rgba(0, 209, 193, 0.1); transform: translateY(-2px); }
        .dropdown-selected { flex: 1; padding: 0 1.4rem; font-size: 1rem; font-family: 'Outfit', sans-serif; font-weight: 400; color: #111827; user-select: none; }
        .dropdown-selected.with-icon { padding-left: 3.6rem; }
        .dropdown-selected.placeholder { color: #cbd5e1; font-weight: 400; }
        .chevron-icon { position: absolute; right: 1.2rem; color: #94a3b8; transition: transform 0.3s ease; }
        .chevron-icon.rotated { transform: rotate(180deg); color: var(--primary); }
        .dropdown-options {
            position: absolute; top: calc(100% + 8px); left: 0; right: 0; background: #fff; border-radius: 16px; 
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12); border: 1px solid #f1f5f9; z-index: 100; overflow: hidden; padding: 0.5rem;
        }
        .dropdown-opt { padding: 0.8rem 1.2rem; font-size: 0.95rem; font-weight: 600; color: #475569; transition: all 0.2s; border-radius: 10px; }
        .dropdown-opt:hover { background: #f1f5f9; color: var(--primary); }
        .dropdown-opt.selected { background: rgba(0, 209, 193, 0.08); color: var(--primary); }

        .file-picker-enhanced {
            width: 100%; min-height: 72px; background: #f8fafc; border: 2px dashed #b2bec3; border-radius: 16px; 
            cursor: pointer; transition: all 0.3s ease; overflow: hidden; display: flex; align-items: center; justify-content: flex-start;
        }
        .file-picker-enhanced:hover { border-color: var(--primary); background: rgba(0, 209, 193, 0.02); }
        .file-picker-enhanced.has-file { border-style: solid; border-color: var(--primary); background: #fff; }
        .file-placeholder-cln { display: flex; align-items: center; gap: 1.2rem; padding: 0.8rem 1.4rem; }
        .upload-icon-anim { color: var(--primary); }
        .text-stack-cln { display: flex; flex-direction: column; }
        .main-text { font-size: 0.95rem; font-weight: 800; color: #1e293b; }
        .sub-text { font-size: 0.8rem; font-weight: 600; color: #94a3b8; margin-top: 2px; }
        .file-info-cln { display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 1.2rem 1.5rem; }
        .file-preview-cln { display: flex; align-items: center; gap: 1rem; }
        .file-icon-pulse { color: var(--primary); animation: pulse 2s infinite; }
        .file-name-truncate { font-size: 0.95rem; font-weight: 700; color: #1e293b; max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .clear-file-btn { width: 32px; height: 32px; border-radius: 50%; border: none; background: #fee2e2; color: #ef4444; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s; }
        .clear-file-btn:hover { transform: scale(1.1); background: #ef4444; color: #fff; }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.6; } 100% { opacity: 1; } }
        .grid-flex { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
        .compliance-box { display: flex; gap: 1.2rem; padding: 1.5rem; background: rgba(0,209,193,0.04); border: 1px solid rgba(0,209,193,0.08); border-radius: 20px; align-items: center; }
        .compliance-box p { font-size: 0.85rem; color: #0d9488; font-weight: 700; line-height: 1.6; }
        .form-actions-row { display: flex; justify-content: space-between; margin-top: 3rem; gap: 1.5rem; }
        .btn-primary-cln { flex: 1.5; padding: 1.1rem; background: var(--primary); color: white; border: none; border-radius: 16px; font-weight: 900; font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.8rem; transition: 0.3s; box-shadow: 0 12px 24px rgba(0, 209, 193, 0.2); }
        .btn-primary-cln:hover { transform: translateY(-3px); box-shadow: 0 15px 35px rgba(0, 209, 193, 0.3); }
        .btn-primary-cln.submit-color { background: var(--secondary); color: #1e293b; box-shadow: 0 12px 24px rgba(251, 191, 36, 0.2); }
        .btn-secondary-cln { flex: 0.8; background: #f8fafc; color: #64748b; border: 1.5px solid #f1f5f9; border-radius: 16px; font-weight: 850; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.6rem; transition: 0.3s; }
        .btn-secondary-cln:hover { background: #f1f5f9; color: #1e293b; }

        .celebration-bg { background: radial-gradient(circle at top left, rgba(0,209,193,0.05) 0%, #fff 50%, rgba(251,191,36,0.05) 100%); }
        .success-card-premium {
            background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.4);
            box-shadow: 0 40px 100px rgba(0, 0, 0, 0.08); border-radius: 48px; padding: 4rem 3rem; max-width: 680px; width: 100%; text-align: center; position: relative;
        }
        .success-header { position: relative; margin-bottom: 2.5rem; display: flex; justify-content: center; }
        .check-ring { 
            width: 120px; height: 120px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; 
            box-shadow: 0 20px 40px rgba(0, 209, 193, 0.15); position: relative; z-index: 2;
        }
        .check-icon-main { color: var(--primary); }
        .ring-glow { position: absolute; inset: -10px; border: 2px solid var(--primary); border-radius: 50%; opacity: 0.3; z-index: 1; }
        .premium-success-title { font-size: 2.8rem; font-weight: 950; color: #111827; margin-bottom: 1rem; letter-spacing: -0.02em; }
        .premium-success-subtitle { font-size: 1.1rem; color: #64748b; font-weight: 600; line-height: 1.6; max-width: 500px; margin: 0 auto 3rem; }
        .hope-id-box { background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 32px; padding: 2.5rem; margin-bottom: 3.5rem; position: relative; transition: 0.3s; }
        .hope-id-box:hover { border-color: var(--primary); background: white; }
        .id-meta { display: block; font-size: 0.75rem; font-weight: 900; color: #94a3b8; letter-spacing: 0.15em; margin-bottom: 1rem; }
        .id-value-row { display: flex; align-items: center; justify-content: center; gap: 1.5rem; margin-bottom: 1.5rem; }
        .id-text { font-family: 'Space Mono', monospace; font-size: 1.8rem; font-weight: 900; color: #111827; }
        .id-copy-btn { 
            width: 48px; height: 48px; border-radius: 14px; border: none; background: white; color: #64748b; cursor: pointer; 
            display: flex; align-items: center; justify-content: center; transition: 0.2s; box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .id-copy-btn:hover { background: var(--primary); color: white; transform: scale(1.1); }
        .id-copy-btn.copied { background: #22c55e; color: white; }
        .id-footer { display: flex; align-items: center; justify-content: center; gap: 0.5rem; color: #0d9488; font-size: 0.8rem; font-weight: 700; opacity: 0.8; }
        .success-actions { display: flex; gap: 1.5rem; justify-content: center; }
        .success-btn { padding: 1.1rem 2rem; border-radius: 18px; font-weight: 850; font-size: 1rem; display: flex; align-items: center; gap: 0.8rem; cursor: pointer; transition: 0.3s; }
        .btn-print { background: #1e293b; color: white; border: none; }
        .btn-print:hover { background: #000; transform: translateY(-3px); }
        .btn-home { background: transparent; color: #64748b; border: 2px solid #e2e8f0; }
        .btn-home:hover { background: #f8fafc; color: #111827; border-color: #cbd5e1; }
        .organic-blob.blob-celebrate-1 { width: 600px; height: 600px; bottom: -200px; left: -200px; background: rgba(0,209,193,0.1); }
        .organic-blob.blob-celebrate-2 { width: 500px; height: 500px; top: -100px; right: -100px; background: rgba(251,191,36,0.1); }
        .printable-application { display: none; }

        @media print {
            .celebration-bg, .success-card-premium, .bg-container, .admission-nav-top, .success-actions { display: none !important; }
            body, html { background: white !important; margin: 0; padding: 0; }
            
            .printable-application { 
                display: block; 
                padding: 40px; 
                background: white; 
                font-family: 'Outfit', sans-serif;
                color: #000;
            }

            .print-header { 
                display: flex; 
                align-items: center; 
                justify-content: space-between; 
                border-bottom: 2px solid #000; 
                padding-bottom: 20px; 
                margin-bottom: 30px; 
            }
            .print-logo { height: 60px; }
            .print-header-text h1 { margin: 0; font-size: 24px; color: #000; }
            .print-header-text p { margin: 5px 0 0; font-size: 14px; font-weight: 600; opacity: 0.7; }
            
            .print-id-badge { text-align: right; }
            .p-label { display: block; font-size: 10px; font-weight: 800; color: #64748b; }
            .p-value { font-size: 18px; font-weight: 900; color: #000; }

            .print-content-grid { display: flex; justify-content: space-between; gap: 40px; margin-bottom: 30px; }
            .print-photo-box { 
                width: 140px; 
                height: 160px; 
                border: 1px solid #e2e8f0; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                background: #f8fafc;
                overflow: hidden;
            }
            .print-photo-box img { width: 100%; height: 100%; object-fit: cover; }
            .photo-placeholder { font-size: 12px; font-weight: 800; color: #94a3b8; }

            .section-divider { 
                font-size: 14px; 
                text-transform: uppercase; 
                letter-spacing: 0.1em; 
                color: var(--primary); 
                border-bottom: 1px solid #e2e8f0; 
                padding-bottom: 8px; 
                margin: 25px 0 15px; 
            }

            .p-row { margin-bottom: 10px; font-size: 13px; }
            .p-row span { color: #64748b; font-weight: 600; margin-right: 10px; min-width: 120px; display: inline-block; }
            .p-row strong { color: #000; }
            
            .p-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 10px; }

            .print-footer { 
                margin-top: 60px; 
                display: flex; 
                justify-content: space-between; 
                padding-top: 40px;
            }
            .signature-box { text-align: center; width: 200px; }
            .sig-line { border-top: 1px solid #000; margin-bottom: 10px; }
            .signature-box p { font-size: 12px; font-weight: 700; margin: 0; }
        }
    `}</style>
);

export default StudentAdmission;
