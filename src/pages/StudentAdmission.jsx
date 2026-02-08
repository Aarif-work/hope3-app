import React, { useState, useRef, useEffect, memo } from 'react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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

import {
    CheckCircle,
    ArrowRight,
    ArrowLeft,
    Mail,
    Phone,
    Calendar,
    User,
    ChevronLeft,
    ShieldCheck,
    MapPin,
    Home,
    Users,
    ChevronDown,
    Copy,
    Printer
} from 'lucide-react';

const StudentAdmission = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [applicationId, setApplicationId] = useState('');
    const [copying, setCopying] = useState(false);
    const [formData, setFormData] = useState({
        // Page 1: Student Details
        firstName: '',
        lastName: '',
        dob: '',
        homeAddress: '',
        pincode: '',
        studentMobile: '',
        studentMobileAlt: '',
        email: '',
        knowledgeSource: '',
        gender: '',
        district: '',
        physicallyChallenged: '',
        livingWith: '',
        homeRegionType: '',
        courseToStudy: '',
        ambitionChoice1: '',
        ambitionChoice2: '',
        isFirstGraduate: '',
        // Page 2: Relative's Information
        relativeName: '',
        relativeOccupation: '',
        relativeMobile: '',
        relativeEmail: '',
        familyMembersCount: '',
        familyIncomeMonthly: '',
        relationshipType: '',
        relativeEducation: ''
    });



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
                            <h3 className="section-divider">Student Details</h3>
                            <div className="p-row"><span>First Name:</span> <strong>{formData.firstName}</strong></div>
                            <div className="p-row"><span>Initial / Last Name:</span> <strong>{formData.lastName}</strong></div>
                            <div className="p-row"><span>Date of Birth:</span> <strong>{formData.dob}</strong></div>
                            <div className="p-row"><span>Home Address:</span> <strong>{formData.homeAddress}</strong></div>
                            <div className="p-row"><span>Pincode:</span> <strong>{formData.pincode}</strong></div>
                            <div className="p-row"><span>Mobile Number:</span> <strong>{formData.studentMobile}</strong></div>
                            <div className="p-row"><span>Alternate Mobile:</span> <strong>{formData.studentMobileAlt}</strong></div>
                            <div className="p-row"><span>Email:</span> <strong>{formData.email}</strong></div>
                            <div className="p-row"><span>Gender:</span> <strong>{formData.gender}</strong></div>
                            <div className="p-row"><span>District:</span> <strong>{formData.district}</strong></div>
                        </div>
                    </div>

                    <div className="print-section">
                        <h3 className="section-divider">Educational & Ambition</h3>
                        <div className="p-row"><span>Course Desired:</span> <strong>{formData.courseToStudy}</strong></div>
                        <div className="p-row"><span>Ambition 1:</span> <strong>{formData.ambitionChoice1}</strong></div>
                        <div className="p-row"><span>Ambition 2:</span> <strong>{formData.ambitionChoice2}</strong></div>
                        <div className="p-row"><span>First Graduate:</span> <strong>{formData.isFirstGraduate}</strong></div>
                        <div className="p-row"><span>Region Type:</span> <strong>{formData.homeRegionType}</strong></div>
                    </div>

                    <div className="print-section">
                        <h3 className="section-divider">Relative's Information</h3>
                        <div className="p-row"><span>Relative Name:</span> <strong>{formData.relativeName}</strong></div>
                        <div className="p-row"><span>Relationship:</span> <strong>{formData.relationshipType}</strong></div>
                        <div className="p-row"><span>Occupation:</span> <strong>{formData.relativeOccupation}</strong></div>
                        <div className="p-row"><span>Mobile:</span> <strong>{formData.relativeMobile}</strong></div>
                        <div className="p-row"><span>Email ID:</span> <strong>{formData.relativeEmail}</strong></div>
                        <div className="p-row"><span>Education:</span> <strong>{formData.relativeEducation}</strong></div>
                        <div className="p-row"><span>Family Members:</span> <strong>{formData.familyMembersCount}</strong></div>
                        <div className="p-row"><span>Monthly Income:</span> <strong>{formData.familyIncomeMonthly}</strong></div>
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
                            <h1 className="premium-success-title">Application Submitted!</h1>
                            <p className="premium-success-subtitle">Thank you for applying for the Hope3 Scholarship. Your application has been received and is under review.</p>
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
                        <h2 className="title-cln">Scholarship Application Form</h2>
                        <div className="step-tracker-visual">
                            {[1, 2].map(s => (
                                <React.Fragment key={s}>
                                    <div className={`step-node ${s === step ? 'active' : s < step ? 'completed' : ''}`}>
                                        {s < step ? <CheckCircle size={16} /> : s}
                                    </div>
                                    {s < 2 && <div className={`step-connector ${s < step ? 'filled' : ''}`}></div>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="card-clean form-card-padding">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div key="s1" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                                    <h3 className="step-heading">Page 1: Student Details</h3>
                                    <div className="grid-flex">
                                        <InputField label="First Name" icon={User} name="firstName" value={formData.firstName} onChange={handleChange} required />
                                        <InputField label="Initial / Last Name" icon={User} name="lastName" value={formData.lastName} onChange={handleChange} required />
                                    </div>
                                    <div className="grid-flex">
                                        <InputField label="Date-of-Birth" icon={Calendar} type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                                        <InputField label="Pincode" icon={MapPin} name="pincode" value={formData.pincode} onChange={handleChange} required />
                                    </div>
                                    <TextAreaField label="Home Address" icon={Home} name="homeAddress" value={formData.homeAddress} onChange={handleChange} required />
                                    <div className="grid-flex">
                                        <InputField label="Student Mobile Number" icon={Phone} name="studentMobile" value={formData.studentMobile} onChange={handleChange} required />
                                        <InputField label="Student Mobile Number (Alternate)" icon={Phone} name="studentMobileAlt" value={formData.studentMobileAlt} onChange={handleChange} />
                                    </div>
                                    <div className="grid-flex">
                                        <InputField label="Email" icon={Mail} type="email" name="email" value={formData.email} onChange={handleChange} required />
                                        <CustomDropdown label="How you came to know Hope3?" name="knowledgeSource" value={formData.knowledgeSource} onChange={handleChange} options={['Facebook / Social media', 'Whatsapp Forward', 'School / Teacher', 'Friends / Well wishers', 'Other']} />
                                    </div>
                                    <div className="grid-flex">
                                        <CustomDropdown label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['Male', 'Female', 'Other']} />
                                        <CustomDropdown label="District" name="district" value={formData.district} onChange={handleChange} options={['Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanniyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivagangai', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar']} />
                                    </div>
                                    <div className="grid-flex">
                                        <CustomDropdown label="Physically challenged?" name="physicallyChallenged" value={formData.physicallyChallenged} onChange={handleChange} options={['Yes', 'No']} />
                                        <CustomDropdown label="Living with?" name="livingWith" value={formData.livingWith} onChange={handleChange} options={['Parents', 'Single parent', 'Orphanage Home', 'In Refugee Camp', 'Other']} />
                                    </div>
                                    <div className="grid-flex">
                                        <CustomDropdown label="Home Region type" name="homeRegionType" value={formData.homeRegionType} onChange={handleChange} options={['Village', 'Town', 'City']} />
                                        <CustomDropdown label="Course you want to study?" name="courseToStudy" value={formData.courseToStudy} onChange={handleChange} options={['B.E / B.Tech – Computer Science', 'B.E / B.Tech – Information Technology', 'B.E / B.Tech – Electronics', 'B.E / B.Tech – Electrical', 'B.Sc Computer Science', 'B.Sc Maths', 'B.A Political Science', 'B.A History', 'Medical', 'NEET', 'Others']} />
                                    </div>
                                    <div className="grid-flex">
                                        <CustomDropdown label="Ambition (Choice 1)?" name="ambitionChoice1" value={formData.ambitionChoice1} onChange={handleChange} options={['Doctor', 'Engineer', 'Designer', 'Film Making', 'Agriculture', 'Work in Banking Sector', 'Business', 'CA', 'Civil Service', 'Research', 'Teacher', 'Others']} />
                                        <CustomDropdown label="Ambition (Choice 2)?" name="ambitionChoice2" value={formData.ambitionChoice2} onChange={handleChange} options={['Doctor', 'Engineer', 'Designer', 'Film Making', 'Agriculture', 'Work in Banking Sector', 'Business', 'CA', 'Civil Service', 'Research', 'Teacher', 'Others']} />
                                    </div>
                                    <CustomDropdown label="Are you a First Graduate?" name="isFirstGraduate" value={formData.isFirstGraduate} onChange={handleChange} options={['Yes', 'No']} />
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="s2" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                                    <h3 className="step-heading">Page 2: Relative's Information</h3>
                                    <div className="grid-flex">
                                        <InputField label="Name of Relative" name="relativeName" value={formData.relativeName} onChange={handleChange} required helperText="Father / Mother / Guardian" />
                                        <CustomDropdown label="Relationship type" name="relationshipType" value={formData.relationshipType} onChange={handleChange} options={['Father', 'Mother', 'Guardian', 'Other']} />
                                    </div>
                                    <div className="grid-flex">
                                        <InputField label="Occupation" name="relativeOccupation" value={formData.relativeOccupation} onChange={handleChange} required />
                                        <InputField label="Mobile Number" name="relativeMobile" value={formData.relativeMobile} onChange={handleChange} required />
                                    </div>
                                    <div className="grid-flex">
                                        <InputField label="Email id" name="relativeEmail" value={formData.relativeEmail} onChange={handleChange} />
                                        <CustomDropdown label="Educational level" name="relativeEducation" value={formData.relativeEducation} onChange={handleChange} options={['Below 10th', '10th Standard', '12th Standard', 'Bachelor degree', 'Master degree']} />
                                    </div>
                                    <div className="grid-flex">
                                        <InputField label="Total members in family" type="number" name="familyMembersCount" value={formData.familyMembersCount} onChange={handleChange} required />
                                        <InputField label="Total Family Income (Monthly)" type="number" name="familyIncomeMonthly" value={formData.familyIncomeMonthly} onChange={handleChange} required />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div className="form-actions-row">
                            {step > 1 && <button type="button" onClick={handlePrev} className="btn-secondary-cln"><ArrowLeft size={18} /> Previous</button>}
                            {step < 2 ? (
                                <button type="button" onClick={handleNext} className="btn-primary-cln">Next Page <ArrowRight size={18} /></button>
                            ) : (
                                <button type="submit" className="btn-primary-cln submit-color">Submit Application</button>
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
        .admission-intro { text-align: center; margin-bottom: 4rem; }
        

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
