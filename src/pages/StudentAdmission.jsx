import React, { useState, useRef, useEffect, memo } from 'react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/hope logo.png';

// --- Pure UI Components (Defined Outside to Prevent Focus Loss) ---

const InputField = memo(({ label, icon: Icon, helperText, error, ...props }) => (
    <div className={`form-group-admission ${error ? 'has-error' : ''}`}>
        <div className="label-row-cln">
            <label>
                {label} {props.required && <span style={{ color: '#ef4444', fontWeight: 'bold' }}>*</span>}
            </label>
            {helperText && <span className="helper-text-cln">{helperText}</span>}
        </div>
        <div className="input-with-icon-cln">
            {Icon && <Icon size={18} className="field-icon-cln" />}
            <input
                {...props}
                className={`enhanced-input ${Icon ? 'with-icon' : ''} ${error ? 'error-ring' : ''}`}
                autoComplete="new-password"
                placeholder={props.placeholder || `Enter ${label.toLowerCase()}...`}
            />
        </div>
        {error && <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="error-message-cln">{error}</motion.span>}
    </div>
));

const TextAreaField = memo(({ label, icon: Icon, helperText, error, ...props }) => (
    <div className={`form-group-admission ${error ? 'has-error' : ''}`}>
        <div className="label-row-cln">
            <label>
                {label} {props.required && <span style={{ color: '#ef4444', fontWeight: 'bold' }}>*</span>}
            </label>
            {helperText && <span className="helper-text-cln">{helperText}</span>}
        </div>
        <div className="input-with-icon-cln">
            {Icon && <Icon size={18} className="field-icon-cln" style={{ top: '20px', transform: 'none' }} />}
            <textarea
                {...props}
                className={`enhanced-input textarea-enhanced ${Icon ? 'with-icon' : ''} ${error ? 'error-ring' : ''}`}
                rows="3"
                placeholder={props.placeholder || `Provide ${label.toLowerCase()} details...`}
            />
        </div>
        {error && <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="error-message-cln">{error}</motion.span>}
    </div>
));

const CustomDropdown = memo(({ label, options, icon: Icon, name, value, onChange, required, error }) => {
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
        const val = option === '-- Select --' ? '' : option;
        onChange({ target: { name, value: val } });
        setIsOpen(false);
    };

    return (
        <div className={`form-group-admission ${error ? 'has-error' : ''}`} ref={dropdownRef} style={{ zIndex: isOpen ? 1000 : 1 }}>
            <div className="label-row-cln">
                <label>
                    {label} {required && <span style={{ color: '#ef4444', fontWeight: 'bold' }}>*</span>}
                </label>
            </div>
            <div className={`custom-dropdown-wrap ${isOpen ? 'active' : ''} ${error ? 'error-ring' : ''}`} onClick={() => setIsOpen(!isOpen)}>
                {Icon && <Icon size={18} className="field-icon-cln" />}
                <div className={`dropdown-selected ${Icon ? 'with-icon' : ''} ${!value ? 'placeholder' : ''}`}>
                    {value || '-- Select --'}
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
                            <div
                                className={`dropdown-opt ${!value ? 'selected' : ''}`}
                                style={{ color: '#94a3b8', fontStyle: 'italic', borderBottom: '1px dashed #e2e8f0' }}
                                onClick={(e) => { e.stopPropagation(); handleSelect('-- Select --'); }}
                            >
                                -- Select --
                            </div>
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
            {error && <motion.span initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="error-message-cln">{error}</motion.span>}
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

    const ambitionOptions = ['Doctor', 'Engineer', 'Designer', 'Film Making', 'Agriculture', 'Work in Banking Sector', 'Business', 'CA', 'Civil Service', 'Research', 'Teacher', 'Others'];

    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [applicationId, setApplicationId] = useState('');
    const [copying, setCopying] = useState(false);
    const [errors, setErrors] = useState({});
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
        relativeEducation: '',
        // Page 3: 10th Education Details
        tenthSchoolName: '',
        tenthSchoolLocation: '',
        tenthRegistrationNumber: '',
        tenthDistrictStudied: '',
        tenthSchoolRegionType: '',
        tenthSchoolType: '',
        tenthYearPassed: '',
        tenthCourseCompleted: '',
        tenthSubject1Marks: '',
        tenthSubject2Marks: '',
        tenthSubject3Marks: '',
        tenthSubject4Marks: '',
        tenthSubject5Marks: '',
        tenthTotalMarks: '',
        // Page 4: Diploma Details (Conditional - only if Diploma selected)
        diplomaCollegeName: '',
        diplomaCollegeLocation: '',
        diplomaPercentage: '',
        diplomaDistrictStudied: '',
        diplomaCollegeRegionType: '',
        diplomaCourseStudied: '',
        diplomaYearPassed: '',
        // Page 4/5: 11th Education Details (Conditional - only if 11th selected)
        eleventhSchoolName: '',
        eleventhSchoolLocation: '',
        eleventhRegistrationNumber: '',
        eleventhDistrictStudied: '',
        eleventhSchoolRegionType: '',
        eleventhSchoolType: '',
        eleventhYearPassed: '',
        eleventhSubjects: '',
        eleventhEngineeringCutoff: '',
        eleventhNeetScore: '',
        eleventhAgriCutoff: '',
        eleventhSubject1Marks: '',
        eleventhSubject2Marks: '',
        // 11th Major Subject Marks (conditional based on subjects selected)
        eleventhMathematicsMarks: '',
        eleventhPhysicsMarks: '',
        eleventhChemistryMarks: '',
        eleventhBiologyMarks: '',
        eleventhStatisticsMarks: '',
        eleventhAccountancyMarks: '',
        eleventhCommerceMarks: '',
        eleventhEconomicsMarks: '',
        eleventhHistoryMarks: '',
        eleventhBusinessMathsMarks: '',
        eleventhPoliticalScienceMarks: '',
        eleventhBotanyMarks: '',
        eleventhZoologyMarks: '',
        eleventhComputerScienceMarks: '',
        eleventhTotalMarks: '',
        // Page 4/5: 12th Education Details (Conditional - only if 12th selected)
        twelfthSchoolName: '',
        twelfthSchoolLocation: '',
        twelfthRegistrationNumber: '',
        twelfthDistrictStudied: '',
        twelfthSchoolRegionType: '',
        twelfthSchoolType: '',
        twelfthYearPassed: '',
        twelfthSubjects: '',
        twelfthEngineeringCutoff: '',
        twelfthNeetScore: '',
        twelfthAgriCutoff: '',
        twelfthSubject1Marks: '',
        twelfthSubject2Marks: '',
        // 12th Major Subject Marks (conditional based on subjects selected)
        twelfthMathematicsMarks: '',
        twelfthPhysicsMarks: '',
        twelfthChemistryMarks: '',
        twelfthBiologyMarks: '',
        twelfthStatisticsMarks: '',
        twelfthAccountancyMarks: '',
        twelfthCommerceMarks: '',
        twelfthEconomicsMarks: '',
        twelfthHistoryMarks: '',
        twelfthBusinessMathsMarks: '',
        twelfthPoliticalScienceMarks: '',
        twelfthBotanyMarks: '',
        twelfthZoologyMarks: '',
        twelfthComputerScienceMarks: '',
        twelfthTotalMarks: ''
    });

    const fillDummyData = () => {
        let dummyData = {};

        if (step === 1) {
            dummyData = {
                firstName: 'Alex',
                lastName: 'Johnson',
                dob: '2005-05-15',
                homeAddress: '123 Tech Lane, Innovation Hub',
                pincode: '600001',
                studentMobile: '9876543210',
                studentMobileAlt: '9012345678',
                email: 'alex.tech@example.com',
                knowledgeSource: 'Friends / Well wishers',
                gender: 'Male',
                district: 'Chennai',
                physicallyChallenged: 'No',
                livingWith: 'Parents',
                homeRegionType: 'City',
                courseToStudy: 'B.E / B.Tech – Computer Science',
                ambitionChoice1: 'Engineer',
                ambitionChoice2: 'Research',
                isFirstGraduate: 'Yes'
            };
        } else if (step === 2) {
            dummyData = {
                relativeName: 'Robert Johnson',
                relationshipType: 'Father',
                relativeOccupation: 'Engineer',
                relativeMobile: '9123456780',
                relativeEmail: 'robert@example.com',
                familyMembersCount: '4',
                familyIncomeMonthly: '50000',
                relativeEducation: 'B.Tech'
            };
        } else if (step === 3) {
            dummyData = {
                tenthSchoolName: 'Global High School',
                tenthSchoolLocation: 'Chennai Central',
                tenthRegistrationNumber: '10TH89234',
                tenthDistrictStudied: 'Chennai',
                tenthSchoolRegionType: 'City',
                tenthSchoolType: 'Private School',
                tenthYearPassed: '2021',
                tenthCourseCompleted: '12th',
                tenthSubject1Marks: '95',
                tenthSubject2Marks: '92',
                tenthSubject3Marks: '98',
                tenthSubject4Marks: '94',
                tenthSubject5Marks: '96',
                tenthTotalMarks: '475'
            };
        } else if (step === 4) {
            if (formData.tenthCourseCompleted === 'Diploma') {
                dummyData = {
                    diplomaCollegeName: 'Tech Poly',
                    diplomaCollegeLocation: 'Chennai',
                    diplomaPercentage: '88',
                    diplomaDistrictStudied: 'Chennai',
                    diplomaCollegeRegionType: 'City',
                    diplomaCourseStudied: 'Computer Engineering',
                    diplomaYearPassed: '2024'
                };
            } else {
                dummyData = {
                    eleventhSchoolName: 'Global Higher Secondary',
                    eleventhSchoolLocation: 'Chennai Central',
                    eleventhRegistrationNumber: '11TH99234',
                    eleventhDistrictStudied: 'Chennai',
                    eleventhSchoolRegionType: 'City',
                    eleventhSchoolType: 'Private School',
                    eleventhYearPassed: '2022',
                    eleventhSubjects: 'Mathematics / Physics / Chemistry / Statistics',
                    eleventhEngineeringCutoff: '198',
                    eleventhSubject1Marks: '94',
                    eleventhSubject2Marks: '91',
                    eleventhMathematicsMarks: '99',
                    eleventhPhysicsMarks: '97',
                    eleventhChemistryMarks: '98',
                    eleventhStatisticsMarks: '96',
                    eleventhTotalMarks: '575'
                };
            }
        } else if (step === 5 && formData.tenthCourseCompleted === '12th') {
            dummyData = {
                twelfthSchoolName: 'Global Higher Secondary',
                twelfthSchoolLocation: 'Chennai Central',
                twelfthRegistrationNumber: '12TH10234',
                twelfthDistrictStudied: 'Chennai',
                twelfthSchoolRegionType: 'City',
                twelfthSchoolType: 'Private School',
                twelfthYearPassed: '2023',
                twelfthSubjects: 'Mathematics / Physics / Chemistry / Statistics',
                twelfthEngineeringCutoff: '199',
                twelfthSubject1Marks: '96',
                twelfthSubject2Marks: '93',
                twelfthMathematicsMarks: '100',
                twelfthPhysicsMarks: '98',
                twelfthChemistryMarks: '99',
                twelfthStatisticsMarks: '97',
                twelfthTotalMarks: '583'
            };
        }

        setFormData(prev => ({ ...prev, ...dummyData }));
        setErrors({});
    };



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

    // Helper functions for dynamic major subjects
    const getMajorSubjectList = (subjectString) => {
        if (!subjectString) return [];
        return subjectString.split(' / ').map(s => s.trim());
    };

    const getSubjectKey = (grade, subject) => {
        // Map subject name to formData key (e.g., 'Mathematics' -> 'eleventhMathematicsMarks')
        // Remove special characters like '&' before normalizing
        const normalized = subject.replace(/[&\s]+/g, '');
        return `${grade}${normalized}Marks`;
    };

    const handleChange = (e) => {
        let { name, value, type, files } = e.target;

        // Restrict Pincode and Mobile to numbers only
        if (['pincode', 'studentMobile', 'studentMobileAlt', 'relativeMobile', 'tenthTotalMarks', 'tenthRegistrationNumber'].includes(name)) {
            value = value.replace(/\D/g, '');
        }

        if (type === 'file') {
            setFormData(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateStep = (currentStep) => {
        const newErrors = {};

        // Helper: Validate Required
        const checkRequired = (fields) => {
            fields.forEach(f => {
                if (!formData[f] || (typeof formData[f] === 'string' && formData[f].trim() === '')) {
                    newErrors[f] = 'This field is required';
                }
            });
        };

        // Helper: Validate Email
        const checkEmail = (f) => {
            if (formData[f] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[f])) {
                newErrors[f] = 'Invalid email format';
            }
        };

        // Helper: Validate Mobile (10 digits)
        const checkMobile = (fields) => {
            fields.forEach(f => {
                if (formData[f] && !/^\d{10}$/.test(formData[f])) {
                    newErrors[f] = 'Mobile number must be 10 digits';
                }
            });
        };

        // Helper: Validate Pincode (6 digits)
        const checkPincode = (f) => {
            if (formData[f] && !/^\d{6}$/.test(formData[f])) {
                newErrors[f] = 'Pincode must be 6 digits';
            }
        };

        // Helper: Validate Marks (0-100)
        const checkMarks = (fields) => {
            fields.forEach(f => {
                if (formData[f] !== '' && (formData[f] < 0 || formData[f] > 100)) {
                    newErrors[f] = 'Marks must be 0-100';
                }
            });
        };

        if (currentStep === 1) {
            checkRequired(['firstName', 'lastName', 'dob', 'homeAddress', 'pincode', 'studentMobile', 'gender', 'district', 'physicallyChallenged', 'livingWith', 'homeRegionType', 'courseToStudy', 'ambitionChoice1', 'ambitionChoice2', 'isFirstGraduate', 'knowledgeSource']);
            checkEmail('email');
            checkMobile(['studentMobile', 'studentMobileAlt']);
            checkPincode('pincode');

            if (formData.ambitionChoice1 && formData.ambitionChoice1 === formData.ambitionChoice2) {
                newErrors.ambitionChoice2 = 'Choices 1 and 2 must be different';
            }
        }

        if (currentStep === 2) {
            checkRequired(['relativeName', 'relationshipType', 'relativeMobile', 'familyMembersCount', 'familyIncomeMonthly']);
            checkEmail('relativeEmail');
            checkMobile(['relativeMobile']);
        }

        if (currentStep === 3) {
            checkRequired(['tenthSchoolName', 'tenthSchoolLocation', 'tenthRegistrationNumber', 'tenthDistrictStudied', 'tenthSchoolRegionType', 'tenthSchoolType', 'tenthYearPassed', 'tenthCourseCompleted', 'tenthSubject1Marks', 'tenthSubject2Marks', 'tenthSubject3Marks', 'tenthSubject4Marks', 'tenthSubject5Marks', 'tenthTotalMarks']);
            checkMarks(['tenthSubject1Marks', 'tenthSubject2Marks', 'tenthSubject3Marks', 'tenthSubject4Marks', 'tenthSubject5Marks']);

            // Logic: Total check
            const sum = [1, 2, 3, 4, 5].reduce((acc, i) => acc + (Number(formData[`tenthSubject${i}Marks`]) || 0), 0);
            if (formData.tenthTotalMarks && Number(formData.tenthTotalMarks) !== sum) {
                newErrors.tenthTotalMarks = `Total must be ${sum}`;
            }
        }

        if (currentStep === 4 && formData.tenthCourseCompleted === 'Diploma') {
            checkRequired(['diplomaCollegeName', 'diplomaCollegeLocation', 'diplomaPercentage', 'diplomaDistrictStudied', 'diplomaCollegeRegionType', 'diplomaCourseStudied', 'diplomaYearPassed']);
            if (formData.diplomaPercentage && (formData.diplomaPercentage < 0 || formData.diplomaPercentage > 100)) {
                newErrors.diplomaPercentage = 'Percentage must be 0-100';
            }
            if (formData.tenthYearPassed && formData.diplomaYearPassed && Number(formData.diplomaYearPassed) <= Number(formData.tenthYearPassed)) {
                newErrors.diplomaYearPassed = 'Must be after 10th';
            }
        }

        if (currentStep === 4 && (formData.tenthCourseCompleted === '11th' || formData.tenthCourseCompleted === '12th')) {
            checkRequired(['eleventhSchoolName', 'eleventhSchoolLocation', 'eleventhDistrictStudied', 'eleventhSchoolRegionType', 'eleventhSchoolType', 'eleventhYearPassed', 'eleventhSubjects', 'eleventhSubject1Marks', 'eleventhSubject2Marks']);
            checkMarks(['eleventhSubject1Marks', 'eleventhSubject2Marks']);

            if (formData.tenthYearPassed && formData.eleventhYearPassed && Number(formData.eleventhYearPassed) <= Number(formData.tenthYearPassed)) {
                newErrors.eleventhYearPassed = 'Must be after 10th';
            }

            if (formData.eleventhSubjects) {
                const majors = getMajorSubjectList(formData.eleventhSubjects);
                majors.forEach(m => {
                    const key = getSubjectKey('eleventh', m);
                    if (!formData[key]) newErrors[key] = 'Required';
                    else if (formData[key] < 0 || formData[key] > 100) newErrors[key] = '0-100';
                });

                // Total Check for 11th: 2 languages + 4 majors
                const sum = (Number(formData.eleventhSubject1Marks) || 0) + (Number(formData.eleventhSubject2Marks) || 0) +
                    majors.reduce((acc, m) => acc + (Number(formData[getSubjectKey('eleventh', m)]) || 0), 0);

                if (!formData.eleventhTotalMarks) newErrors.eleventhTotalMarks = 'Required';
                else if (Number(formData.eleventhTotalMarks) !== sum) newErrors.eleventhTotalMarks = `Total must be ${sum}`;
            }
        }

        if (currentStep === 5 && formData.tenthCourseCompleted === '12th') {
            checkRequired(['twelfthSchoolName', 'twelfthSchoolLocation', 'twelfthDistrictStudied', 'twelfthSchoolRegionType', 'twelfthSchoolType', 'twelfthYearPassed', 'twelfthSubjects', 'twelfthSubject1Marks', 'twelfthSubject2Marks']);
            checkMarks(['twelfthSubject1Marks', 'twelfthSubject2Marks']);

            if (formData.eleventhYearPassed && formData.twelfthYearPassed && Number(formData.twelfthYearPassed) <= Number(formData.eleventhYearPassed)) {
                newErrors.twelfthYearPassed = 'Must be after 11th';
            }

            if (formData.twelfthSubjects) {
                const majors = getMajorSubjectList(formData.twelfthSubjects);
                majors.forEach(m => {
                    const key = getSubjectKey('twelfth', m);
                    if (!formData[key]) newErrors[key] = 'Required';
                    else if (formData[key] < 0 || formData[key] > 100) newErrors[key] = '0-100';
                });

                // Total Check for 12th: 2 languages + 4 majors
                const sum = (Number(formData.twelfthSubject1Marks) || 0) + (Number(formData.twelfthSubject2Marks) || 0) +
                    majors.reduce((acc, m) => acc + (Number(formData[getSubjectKey('twelfth', m)]) || 0), 0);

                if (!formData.twelfthTotalMarks) newErrors.twelfthTotalMarks = 'Required';
                else if (Number(formData.twelfthTotalMarks) !== sum) newErrors.twelfthTotalMarks = `Total must be ${sum}`;
            }
        }

        // Step 6 is the confirmation step - no validation needed, just allow to proceed
        if (currentStep === 6) {
            // No validation required for confirmation step
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Calculate total steps based on course completed
    // Step 1: Student Details
    // Step 2: Relative's Information
    // Step 3: 10th Education Details
    // Step 4: Diploma/11th/12th Details
    // Step 5: 12th Details (only if 12th selected) OR Confirmation (if Diploma/11th)
    // Step 6: Confirmation (only if 12th selected)
    const totalSteps = formData.tenthCourseCompleted === 'Diploma' ? 5 :
        formData.tenthCourseCompleted === '11th' ? 5 :
            formData.tenthCourseCompleted === '12th' ? 6 : 5;

    const handleNext = () => {
        if (validateStep(step)) {
            setStep(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    const handlePrev = () => {
        setStep(prev => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateStep(step)) {
            const id = `HOPE3-2026-${Math.floor(Math.random() * 900) + 100}`;
            setApplicationId(id);
            setSubmitted(true);
        }
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

                    <div className="print-section">
                        <h3 className="section-divider">10th Education Details</h3>
                        <div className="p-row"><span>School Name:</span> <strong>{formData.tenthSchoolName}</strong></div>
                        <div className="p-row"><span>School Location:</span> <strong>{formData.tenthSchoolLocation}</strong></div>
                        <div className="p-row"><span>Registration Number:</span> <strong>{formData.tenthRegistrationNumber}</strong></div>
                        <div className="p-grid">
                            <div className="p-row"><span>District Studied:</span> <strong>{formData.tenthDistrictStudied}</strong></div>
                            <div className="p-row"><span>School Region:</span> <strong>{formData.tenthSchoolRegionType}</strong></div>
                        </div>
                        <div className="p-grid">
                            <div className="p-row"><span>School Type:</span> <strong>{formData.tenthSchoolType}</strong></div>
                            <div className="p-row"><span>Year Passed:</span> <strong>{formData.tenthYearPassed}</strong></div>
                        </div>
                        <div className="p-row"><span>Course Completed:</span> <strong>{formData.tenthCourseCompleted}</strong></div>
                        <h4 style={{ fontSize: '12px', marginTop: '15px', marginBottom: '10px', color: '#64748b' }}>Subject Marks</h4>
                        <div className="p-grid">
                            <div className="p-row"><span>Language:</span> <strong>{formData.tenthSubject1Marks}</strong></div>
                            <div className="p-row"><span>English:</span> <strong>{formData.tenthSubject2Marks}</strong></div>
                        </div>
                        <div className="p-grid">
                            <div className="p-row"><span>Mathematics:</span> <strong>{formData.tenthSubject3Marks}</strong></div>
                            <div className="p-row"><span>Science:</span> <strong>{formData.tenthSubject4Marks}</strong></div>
                        </div>
                        <div className="p-grid">
                            <div className="p-row"><span>Social Science:</span> <strong>{formData.tenthSubject5Marks}</strong></div>
                            <div className="p-row"><span>Total Marks:</span> <strong>{formData.tenthTotalMarks}</strong></div>
                        </div>
                    </div>

                    {formData.tenthCourseCompleted === 'Diploma' && (
                        <div className="print-section">
                            <h3 className="section-divider">Diploma Details</h3>
                            <div className="p-row"><span>College Name:</span> <strong>{formData.diplomaCollegeName}</strong></div>
                            <div className="p-row"><span>College Location:</span> <strong>{formData.diplomaCollegeLocation}</strong></div>
                            <div className="p-grid">
                                <div className="p-row"><span>Percentage:</span> <strong>{formData.diplomaPercentage}%</strong></div>
                                <div className="p-row"><span>District Studied:</span> <strong>{formData.diplomaDistrictStudied}</strong></div>
                            </div>
                            <div className="p-grid">
                                <div className="p-row"><span>College Region:</span> <strong>{formData.diplomaCollegeRegionType}</strong></div>
                                <div className="p-row"><span>Course Studied:</span> <strong>{formData.diplomaCourseStudied}</strong></div>
                            </div>
                            <div className="p-row"><span>Year Passed:</span> <strong>{formData.diplomaYearPassed}</strong></div>
                        </div>
                    )}

                    {(formData.tenthCourseCompleted === '11th' || formData.tenthCourseCompleted === '12th') && (
                        <div className="print-section">
                            <h3 className="section-divider">11th Education Details</h3>
                            <div className="p-row"><span>School Name:</span> <strong>{formData.eleventhSchoolName}</strong></div>
                            <div className="p-row"><span>School Location:</span> <strong>{formData.eleventhSchoolLocation}</strong></div>
                            <div className="p-row"><span>Registration Number:</span> <strong>{formData.eleventhRegistrationNumber}</strong></div>
                            <div className="p-grid">
                                <div className="p-row"><span>District Studied:</span> <strong>{formData.eleventhDistrictStudied}</strong></div>
                                <div className="p-row"><span>School Region:</span> <strong>{formData.eleventhSchoolRegionType}</strong></div>
                            </div>
                            <div className="p-grid">
                                <div className="p-row"><span>School Type:</span> <strong>{formData.eleventhSchoolType}</strong></div>
                                <div className="p-row"><span>Year Passed:</span> <strong>{formData.eleventhYearPassed}</strong></div>
                            </div>
                            <div className="p-row"><span>Subjects:</span> <strong>{formData.eleventhSubjects}</strong></div>
                            <h4 style={{ fontSize: '12px', marginTop: '15px', marginBottom: '10px', color: '#64748b' }}>Subject Marks & Cutoffs</h4>
                            <div className="p-grid">
                                <div className="p-row"><span>Tamil/Language:</span> <strong>{formData.eleventhSubject1Marks}</strong></div>
                                <div className="p-row"><span>English:</span> <strong>{formData.eleventhSubject2Marks}</strong></div>
                            </div>
                            {(formData.eleventhEngineeringCutoff || formData.eleventhNeetScore || formData.eleventhAgriCutoff) && (
                                <div className="p-grid">
                                    {formData.eleventhEngineeringCutoff && <div className="p-row"><span>Engineering Cutoff:</span> <strong>{formData.eleventhEngineeringCutoff}</strong></div>}
                                    {formData.eleventhNeetScore && <div className="p-row"><span>NEET Score:</span> <strong>{formData.eleventhNeetScore}</strong></div>}
                                    {formData.eleventhAgriCutoff && <div className="p-row"><span>Agri Cutoff:</span> <strong>{formData.eleventhAgriCutoff}</strong></div>}
                                </div>
                            )}
                            {(formData.eleventhMathematicsMarks || formData.eleventhTotalMarks) && (
                                <>
                                    <h4 style={{ fontSize: '12px', marginTop: '15px', marginBottom: '10px', color: '#64748b' }}>Major Subject Marks</h4>
                                    <div className="p-grid">
                                        <div className="p-row"><span>Mathematics:</span> <strong>{formData.eleventhMathematicsMarks}</strong></div>
                                        <div className="p-row"><span>Physics:</span> <strong>{formData.eleventhPhysicsMarks}</strong></div>
                                    </div>
                                    <div className="p-grid">
                                        <div className="p-row"><span>Chemistry:</span> <strong>{formData.eleventhChemistryMarks}</strong></div>
                                        <div className="p-row"><span>{formData.eleventhBiologyMarks ? 'Biology' : 'Statistics'}:</span> <strong>{formData.eleventhBiologyMarks || formData.eleventhStatisticsMarks}</strong></div>
                                    </div>
                                    <div className="p-row"><span>Total Marks:</span> <strong>{formData.eleventhTotalMarks}</strong></div>
                                </>
                            )}
                        </div>
                    )}

                    {formData.tenthCourseCompleted === '12th' && (
                        <div className="print-section">
                            <h3 className="section-divider">12th Education Details</h3>
                            <div className="p-row"><span>School Name:</span> <strong>{formData.twelfthSchoolName}</strong></div>
                            <div className="p-row"><span>School Location:</span> <strong>{formData.twelfthSchoolLocation}</strong></div>
                            <div className="p-row"><span>Registration Number:</span> <strong>{formData.twelfthRegistrationNumber}</strong></div>
                            <div className="p-grid">
                                <div className="p-row"><span>District Studied:</span> <strong>{formData.twelfthDistrictStudied}</strong></div>
                                <div className="p-row"><span>School Region:</span> <strong>{formData.twelfthSchoolRegionType}</strong></div>
                            </div>
                            <div className="p-grid">
                                <div className="p-row"><span>School Type:</span> <strong>{formData.twelfthSchoolType}</strong></div>
                                <div className="p-row"><span>Year Passed:</span> <strong>{formData.twelfthYearPassed}</strong></div>
                            </div>
                            <div className="p-row"><span>Subjects:</span> <strong>{formData.twelfthSubjects}</strong></div>
                            <h4 style={{ fontSize: '12px', marginTop: '15px', marginBottom: '10px', color: '#64748b' }}>Subject Marks & Cutoffs</h4>
                            <div className="p-grid">
                                <div className="p-row"><span>Tamil/Language:</span> <strong>{formData.twelfthSubject1Marks}</strong></div>
                                <div className="p-row"><span>English:</span> <strong>{formData.twelfthSubject2Marks}</strong></div>
                            </div>
                            {(formData.twelfthEngineeringCutoff || formData.twelfthNeetScore || formData.twelfthAgriCutoff) && (
                                <div className="p-grid">
                                    {formData.twelfthEngineeringCutoff && <div className="p-row"><span>Engineering Cutoff:</span> <strong>{formData.twelfthEngineeringCutoff}</strong></div>}
                                    {formData.twelfthNeetScore && <div className="p-row"><span>NEET Score:</span> <strong>{formData.twelfthNeetScore}</strong></div>}
                                    {formData.twelfthAgriCutoff && <div className="p-row"><span>Agri Cutoff:</span> <strong>{formData.twelfthAgriCutoff}</strong></div>}
                                </div>
                            )}
                            {(formData.twelfthMathematicsMarks || formData.twelfthCommerceMarks) && (
                                <>
                                    <h4 style={{ fontSize: '12px', marginTop: '15px', marginBottom: '10px', color: '#64748b' }}>Major Subject Marks</h4>
                                    {formData.twelfthCommerceMarks && (
                                        <>
                                            <div className="p-grid">
                                                <div className="p-row"><span>Commerce:</span> <strong>{formData.twelfthCommerceMarks}</strong></div>
                                                <div className="p-row"><span>Economics:</span> <strong>{formData.twelfthEconomicsMarks}</strong></div>
                                            </div>
                                            <div className="p-grid">
                                                <div className="p-row"><span>Accountancy:</span> <strong>{formData.twelfthAccountancyMarks}</strong></div>
                                                <div className="p-row"><span>Statistics:</span> <strong>{formData.twelfthStatisticsMarks}</strong></div>
                                            </div>
                                        </>
                                    )}
                                    {formData.twelfthMathematicsMarks && (
                                        <div className="p-grid">
                                            <div className="p-row"><span>Mathematics:</span> <strong>{formData.twelfthMathematicsMarks}</strong></div>
                                            <div className="p-row"><span>Physics:</span> <strong>{formData.twelfthPhysicsMarks}</strong></div>
                                            <div className="p-row"><span>Chemistry:</span> <strong>{formData.twelfthChemistryMarks}</strong></div>
                                            <div className="p-row"><span>{formData.twelfthBiologyMarks ? 'Biology' : 'Statistics'}:</span> <strong>{formData.twelfthBiologyMarks || formData.twelfthStatisticsMarks}</strong></div>
                                        </div>
                                    )}
                                    <div className="p-row"><span>Total Marks:</span> <strong>{formData.twelfthTotalMarks}</strong></div>
                                </>
                            )}
                        </div>
                    )}

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
                        <div className="back-link-cln" onClick={() => navigate('/')}>
                            <ChevronLeft size={18} /> Back to Home
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <button
                                type="button"
                                onClick={fillDummyData}
                                className="dev-fill-btn"
                                title="Fill form with dummy data"
                            >
                                <Users size={16} /> <span>Dev: Fill Data</span>
                            </button>
                            <div className="logo-brand-cln">
                                <img src={logo} alt="Hope3 Logo" className="logo-cln" />
                                <span className="brand-name-cln">HOPE3 Academy</span>
                            </div>
                        </div>
                    </div>
                    <div className="admission-intro">
                        <h2 className="title-cln">Scholarship Application Form</h2>
                        <div className="step-tracker-visual">
                            {Array.from({ length: totalSteps }, (_, i) => i + 1).map(s => (
                                <React.Fragment key={s}>
                                    <div className={`step-node ${s === step ? 'active' : s < step ? 'completed' : ''}`}>
                                        {s < step ? <CheckCircle size={20} strokeWidth={3} /> : <span>{s}</span>}
                                    </div>
                                    {s < totalSteps && <div className={`step-connector ${s < step ? 'filled' : ''}`}></div>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="card-clean form-card-padding">
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div key="s1" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                                    <h3 className="step-heading">Student Details</h3>
                                    <div className="grid-flex">
                                        <InputField label="First Name" icon={User} name="firstName" value={formData.firstName} onChange={handleChange} required error={errors.firstName} />
                                        <InputField label="Initial / Last Name" icon={User} name="lastName" value={formData.lastName} onChange={handleChange} required error={errors.lastName} />
                                    </div>
                                    <div className="grid-flex">
                                        <InputField label="Date-of-Birth" icon={Calendar} type="date" name="dob" value={formData.dob} onChange={handleChange} required error={errors.dob} />
                                        <InputField label="Pincode" icon={MapPin} name="pincode" value={formData.pincode} onChange={handleChange} required error={errors.pincode} maxLength={6} />
                                    </div>
                                    <TextAreaField label="Home Address" icon={Home} name="homeAddress" value={formData.homeAddress} onChange={handleChange} required error={errors.homeAddress} />
                                    <div className="grid-flex">
                                        <InputField label="Student Mobile Number" icon={Phone} name="studentMobile" value={formData.studentMobile} onChange={handleChange} required error={errors.studentMobile} maxLength={10} />
                                        <InputField label="Student Mobile Number (Alternate)" icon={Phone} name="studentMobileAlt" value={formData.studentMobileAlt} onChange={handleChange} error={errors.studentMobileAlt} maxLength={10} />
                                    </div>
                                    <div className="grid-flex">
                                        <InputField label="Email" icon={Mail} type="email" name="email" value={formData.email} onChange={handleChange} error={errors.email} />
                                        <CustomDropdown label="How you came to know Hope3?" name="knowledgeSource" value={formData.knowledgeSource} onChange={handleChange} options={['Facebook / Social media', 'Whatsapp Forward', 'School / Teacher', 'Friends / Well wishers', 'Other']} required error={errors.knowledgeSource} />
                                    </div>
                                    <div className="grid-flex">
                                        <CustomDropdown label="Gender" name="gender" value={formData.gender} onChange={handleChange} options={['Male', 'Female', 'Other']} required error={errors.gender} />
                                        <CustomDropdown label="District" name="district" value={formData.district} onChange={handleChange} options={['Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanniyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivagangai', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar']} required error={errors.district} />
                                    </div>
                                    <div className="grid-flex">
                                        <CustomDropdown label="Physically challenged?" name="physicallyChallenged" value={formData.physicallyChallenged} onChange={handleChange} options={['Yes', 'No']} required error={errors.physicallyChallenged} />
                                        <CustomDropdown label="Living with?" name="livingWith" value={formData.livingWith} onChange={handleChange} options={['Parents', 'Single parent', 'Orphanage Home', 'In Refugee Camp', 'Other']} required error={errors.livingWith} />
                                    </div>
                                    <div className="grid-flex">
                                        <CustomDropdown label="Home Region type" name="homeRegionType" value={formData.homeRegionType} onChange={handleChange} options={['Village', 'Town', 'City']} required error={errors.homeRegionType} />
                                        <CustomDropdown label="What course do you want to study?" name="courseToStudy" value={formData.courseToStudy} onChange={handleChange} options={['B.E / B.Tech – Computer Science', 'B.E / B.Tech – Information Technology', 'B.E / B.Tech – Electronics', 'B.E / B.Tech – Electrical', 'B.Sc Computer Science', 'B.Sc Maths', 'B.A Political Science', 'B.A History', 'Medical', 'NEET', 'Others']} required error={errors.courseToStudy} />
                                    </div>
                                    <div className="grid-flex">
                                        <CustomDropdown label="Ambition (Choice 1)" name="ambitionChoice1" value={formData.ambitionChoice1} onChange={handleChange} options={ambitionOptions.filter(opt => opt !== formData.ambitionChoice2)} required error={errors.ambitionChoice1} />
                                        <CustomDropdown label="Ambition (Choice 2)" name="ambitionChoice2" value={formData.ambitionChoice2} onChange={handleChange} options={ambitionOptions.filter(opt => opt !== formData.ambitionChoice1)} required error={errors.ambitionChoice2} />
                                    </div>
                                    <CustomDropdown label="Are you a First Graduate?" name="isFirstGraduate" value={formData.isFirstGraduate} onChange={handleChange} options={['Yes', 'No']} required error={errors.isFirstGraduate} />
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="s2" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                                    <h3 className="step-heading">Relative's Information</h3>
                                    <div className="grid-flex">
                                        <InputField label="Name of Relative" name="relativeName" value={formData.relativeName} onChange={handleChange} required helperText="Father / Mother / Guardian" error={errors.relativeName} />
                                        <CustomDropdown label="Relationship type" name="relationshipType" value={formData.relationshipType} onChange={handleChange} options={['Father', 'Mother', 'Guardian', 'Other']} required error={errors.relationshipType} />
                                    </div>
                                    <div className="grid-flex">
                                        <InputField label="Occupation" name="relativeOccupation" value={formData.relativeOccupation} onChange={handleChange} error={errors.relativeOccupation} />
                                        <InputField label="Mobile Number" name="relativeMobile" value={formData.relativeMobile} onChange={handleChange} required error={errors.relativeMobile} maxLength={10} />
                                    </div>
                                    <div className="grid-flex">
                                        <InputField label="Email id" name="relativeEmail" value={formData.relativeEmail} onChange={handleChange} error={errors.relativeEmail} />
                                        <CustomDropdown label="Educational level" name="relativeEducation" value={formData.relativeEducation} onChange={handleChange} options={['Below 10th', '10th Standard', '12th Standard', 'Bachelor degree', 'Master degree']} error={errors.relativeEducation} />
                                    </div>
                                    <div className="grid-flex">
                                        <InputField label="Total members in family" type="number" name="familyMembersCount" value={formData.familyMembersCount} onChange={handleChange} required error={errors.familyMembersCount} />
                                        <InputField label="Total Family Income (Monthly)" type="number" name="familyIncomeMonthly" value={formData.familyIncomeMonthly} onChange={handleChange} required error={errors.familyIncomeMonthly} />
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div key="s3" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                                    <h3 className="step-heading">10th Education Details</h3>
                                    <div className="grid-flex">
                                        <InputField label="10th School Name" name="tenthSchoolName" value={formData.tenthSchoolName} onChange={handleChange} required error={errors.tenthSchoolName} />
                                        <InputField label="10th School Location" name="tenthSchoolLocation" value={formData.tenthSchoolLocation} onChange={handleChange} required error={errors.tenthSchoolLocation} />
                                    </div>
                                    <div className="grid-flex">
                                        <InputField label="10th Registration Number" name="tenthRegistrationNumber" value={formData.tenthRegistrationNumber} onChange={handleChange} required error={errors.tenthRegistrationNumber} />
                                        <CustomDropdown label="10th District Studied" name="tenthDistrictStudied" value={formData.tenthDistrictStudied} onChange={handleChange} options={['Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanniyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivagangai', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar']} required error={errors.tenthDistrictStudied} />
                                    </div>
                                    <div className="grid-flex">
                                        <CustomDropdown label="School Region type" name="tenthSchoolRegionType" value={formData.tenthSchoolRegionType} onChange={handleChange} options={['Village', 'Town', 'City']} required error={errors.tenthSchoolRegionType} />
                                        <CustomDropdown label="10th standard school type" name="tenthSchoolType" value={formData.tenthSchoolType} onChange={handleChange} options={['Government School', 'Government Aided School', 'Private School']} required error={errors.tenthSchoolType} />
                                    </div>
                                    <div className="grid-flex">
                                        <CustomDropdown label="Year passed 10th Standard" name="tenthYearPassed" value={formData.tenthYearPassed} onChange={handleChange} options={['2018', '2019', '2020', '2021', '2022', '2023', '2024']} required error={errors.tenthYearPassed} />
                                        <CustomDropdown label="Which course did you complete?" name="tenthCourseCompleted" value={formData.tenthCourseCompleted} onChange={handleChange} options={['Diploma', '11th', '12th']} required error={errors.tenthCourseCompleted} />
                                    </div>

                                    <div className="form-sub-container">
                                        <h4 className="label-sub">10th Standard Subject Marks</h4>
                                        <div className="grid-flex">
                                            <InputField label="Subject 1: Language marks" type="number" name="tenthSubject1Marks" value={formData.tenthSubject1Marks} onChange={handleChange} required error={errors.tenthSubject1Marks} />
                                            <InputField label="Subject 2: English language marks" type="number" name="tenthSubject2Marks" value={formData.tenthSubject2Marks} onChange={handleChange} required error={errors.tenthSubject2Marks} />
                                        </div>
                                        <div className="grid-flex">
                                            <InputField label="Subject 3: Mathematics marks" type="number" name="tenthSubject3Marks" value={formData.tenthSubject3Marks} onChange={handleChange} required error={errors.tenthSubject3Marks} />
                                            <InputField label="Subject 4: Science marks" type="number" name="tenthSubject4Marks" value={formData.tenthSubject4Marks} onChange={handleChange} required error={errors.tenthSubject4Marks} />
                                        </div>
                                        <div className="grid-flex">
                                            <InputField label="Subject 5: Social Science marks" type="number" name="tenthSubject5Marks" value={formData.tenthSubject5Marks} onChange={handleChange} required error={errors.tenthSubject5Marks} />
                                            <InputField label="10th Total Marks" type="number" name="tenthTotalMarks" value={formData.tenthTotalMarks} onChange={handleChange} required error={errors.tenthTotalMarks} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && formData.tenthCourseCompleted === 'Diploma' && (
                                <motion.div key="s4" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                                    <h3 className="step-heading">Diploma Details</h3>
                                    <div className="grid-flex">
                                        <InputField label="College Name" name="diplomaCollegeName" value={formData.diplomaCollegeName} onChange={handleChange} required />
                                        <InputField label="College Location" name="diplomaCollegeLocation" value={formData.diplomaCollegeLocation} onChange={handleChange} required />
                                    </div>
                                    <div className="grid-flex">
                                        <InputField label="Diploma Percentage" type="number" name="diplomaPercentage" value={formData.diplomaPercentage} onChange={handleChange} required helperText="Enter percentage (e.g., 85.5)" />
                                        <CustomDropdown label="Diploma District Studied" name="diplomaDistrictStudied" value={formData.diplomaDistrictStudied} onChange={handleChange} options={['Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanniyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivagangai', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar']} required />
                                    </div>
                                    <div className="grid-flex">
                                        <CustomDropdown label="College Region type" name="diplomaCollegeRegionType" value={formData.diplomaCollegeRegionType} onChange={handleChange} options={['Village', 'Town', 'City']} required />
                                        <CustomDropdown label="Course you studied?" name="diplomaCourseStudied" value={formData.diplomaCourseStudied} onChange={handleChange} options={['Computer Engineering', 'Electrical Engineering', 'Electronics & Communication Engineering', 'Electrical & Telecommunication Engineering', 'Information Technology', 'Electrical and Electronics Engineering', 'Computer Science and Engineering', 'Other']} required />
                                    </div>
                                    <CustomDropdown label="Year passed College" name="diplomaYearPassed" value={formData.diplomaYearPassed} onChange={handleChange} options={['2018', '2019', '2020', '2021', '2022', '2023', '2024']} required error={errors.diplomaYearPassed} />
                                </motion.div>
                            )}

                            {step === 4 && (formData.tenthCourseCompleted === '11th' || formData.tenthCourseCompleted === '12th') && (
                                <motion.div key="s4-11th" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                                    <h3 className="step-heading">11th Education Details</h3>
                                    <div className="grid-flex">
                                        <InputField label="11th School Name" name="eleventhSchoolName" value={formData.eleventhSchoolName} onChange={handleChange} required error={errors.eleventhSchoolName} />
                                        <InputField label="11th School Location" name="eleventhSchoolLocation" value={formData.eleventhSchoolLocation} onChange={handleChange} required error={errors.eleventhSchoolLocation} />
                                    </div>
                                    <div className="grid-flex">
                                        <InputField label="11th Registration Number" name="eleventhRegistrationNumber" value={formData.eleventhRegistrationNumber} onChange={handleChange} error={errors.eleventhRegistrationNumber} />
                                        <CustomDropdown label="11th District Studied" name="eleventhDistrictStudied" value={formData.eleventhDistrictStudied} onChange={handleChange} options={['Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanniyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivagangai', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar']} required error={errors.eleventhDistrictStudied} />
                                    </div>
                                    <div className="grid-flex">
                                        <CustomDropdown label="School Region type" name="eleventhSchoolRegionType" value={formData.eleventhSchoolRegionType} onChange={handleChange} options={['Village', 'Town', 'City']} required error={errors.eleventhSchoolRegionType} />
                                        <CustomDropdown label="11th standard school type" name="eleventhSchoolType" value={formData.eleventhSchoolType} onChange={handleChange} options={['Government School', 'Government Aided School', 'Private School']} required error={errors.eleventhSchoolType} />
                                    </div>
                                    <div className="grid-flex">
                                        <CustomDropdown label="Year passed 11th Standard" name="eleventhYearPassed" value={formData.eleventhYearPassed} onChange={handleChange} options={['2018', '2019', '2020', '2021', '2022', '2023', '2024']} required error={errors.eleventhYearPassed} />
                                        <CustomDropdown label="Select your subjects" name="eleventhSubjects" value={formData.eleventhSubjects} onChange={handleChange} options={['Mathematics / Physics / Chemistry / Statistics', 'Accountancy / Commerce / Economics / History', 'Accountancy / Business Maths / Commerce / Economics', 'Accountancy / Commerce / Economics / Political Science', 'Commerce / Economics / Accountancy / Statistics', 'Biology / Chemistry / Mathematics / Physics', 'Botany / Chemistry / Physics / Zoology', 'Chemistry / Computer Science / Mathematics / Physics', 'Accountancy / Commerce / Computer Science / Economics', 'Accountancy / Commerce / Business Maths / Economics']} required error={errors.eleventhSubjects} />
                                    </div>



                                    <div className="form-sub-container">
                                        <h4 className="label-sub">Cutoff Scores (Optional - based on your stream)</h4>
                                        <div className="grid-flex">
                                            <InputField label="Engineering Cutoff" type="number" name="eleventhEngineeringCutoff" value={formData.eleventhEngineeringCutoff} onChange={handleChange} helperText="For engineering students" />
                                            <InputField label="NEET Score" type="number" name="eleventhNeetScore" value={formData.eleventhNeetScore} onChange={handleChange} helperText="For medical students" />
                                        </div>
                                        <InputField label="Agri Cutoff" type="number" name="eleventhAgriCutoff" value={formData.eleventhAgriCutoff} onChange={handleChange} helperText="For agriculture students" />
                                    </div>

                                    <div className="form-sub-container">
                                        <h4 className="label-sub">11th Standard Subject Marks</h4>
                                        <div className="grid-flex">
                                            <InputField label="Subject 1: Tamil / Language marks" type="number" name="eleventhSubject1Marks" value={formData.eleventhSubject1Marks} onChange={handleChange} required error={errors.eleventhSubject1Marks} />
                                            <InputField label="Subject 2: English marks" type="number" name="eleventhSubject2Marks" value={formData.eleventhSubject2Marks} onChange={handleChange} required error={errors.eleventhSubject2Marks} />
                                        </div>

                                        {/* Dynamic Major Subject Marks - Shows inside the same container */}
                                        {formData.eleventhSubjects && (
                                            <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(0, 209, 193, 0.03)', borderRadius: '12px', border: '1px dashed var(--primary)' }}>
                                                <h4 className="label-sub" style={{ color: 'var(--primary)', fontWeight: '700', marginBottom: '1rem' }}>Major Subjects Marks</h4>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                                    {getMajorSubjectList(formData.eleventhSubjects).map((subject, idx) => (
                                                        <InputField
                                                            key={idx}
                                                            label={`11th ${subject} Marks`}
                                                            type="number"
                                                            name={getSubjectKey('eleventh', subject)}
                                                            value={formData[getSubjectKey('eleventh', subject)]}
                                                            onChange={handleChange}
                                                            required
                                                            error={errors[getSubjectKey('eleventh', subject)]}
                                                        />
                                                    ))}
                                                    <InputField label="11th Total Marks" type="number" name="eleventhTotalMarks" value={formData.eleventhTotalMarks} onChange={handleChange} required error={errors.eleventhTotalMarks} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {step === 5 && formData.tenthCourseCompleted === '12th' && (
                                <motion.div key="s5-12th" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                                    <h3 className="step-heading">12th Education Details</h3>
                                    <div className="grid-flex">
                                        <InputField label="12th School Name" name="twelfthSchoolName" value={formData.twelfthSchoolName} onChange={handleChange} required error={errors.twelfthSchoolName} />
                                        <InputField label="12th School Location" name="twelfthSchoolLocation" value={formData.twelfthSchoolLocation} onChange={handleChange} required error={errors.twelfthSchoolLocation} />
                                    </div>
                                    <div className="grid-flex">
                                        <InputField label="12th Registration Number" name="twelfthRegistrationNumber" value={formData.twelfthRegistrationNumber} onChange={handleChange} error={errors.twelfthRegistrationNumber} />
                                        <CustomDropdown label="12th District Studied" name="twelfthDistrictStudied" value={formData.twelfthDistrictStudied} onChange={handleChange} options={['Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanniyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivagangai', 'Tenkasi', 'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar']} required error={errors.twelfthDistrictStudied} />
                                    </div>
                                    <div className="grid-flex">
                                        <CustomDropdown label="School Region type" name="twelfthSchoolRegionType" value={formData.twelfthSchoolRegionType} onChange={handleChange} options={['Village', 'Town', 'City']} required error={errors.twelfthSchoolRegionType} />
                                        <CustomDropdown label="12th standard school type" name="twelfthSchoolType" value={formData.twelfthSchoolType} onChange={handleChange} options={['Government School', 'Government Aided School', 'Private School']} required error={errors.twelfthSchoolType} />
                                    </div>
                                    <div className="grid-flex">
                                        <CustomDropdown label="Year passed 12th Standard" name="twelfthYearPassed" value={formData.twelfthYearPassed} onChange={handleChange} options={['2018', '2019', '2020', '2021', '2022', '2023', '2024']} required error={errors.twelfthYearPassed} />
                                        <CustomDropdown label="Select your subjects" name="twelfthSubjects" value={formData.twelfthSubjects} onChange={handleChange} options={['Mathematics / Physics / Chemistry / Statistics', 'Accountancy / Commerce / Economics / History', 'Accountancy / Business Maths / Commerce / Economics', 'Accountancy / Commerce / Economics / Political Science', 'Commerce / Economics / Accountancy / Statistics', 'Biology / Chemistry / Mathematics / Physics', 'Botany / Chemistry / Physics / Zoology', 'Chemistry / Computer Science / Mathematics / Physics', 'Accountancy / Commerce / Computer Science / Economics', 'Accountancy / Commerce / Business Maths / Economics']} required error={errors.twelfthSubjects} />
                                    </div>



                                    <div className="form-sub-container">
                                        <h4 className="label-sub">Cutoff Scores (Optional - based on your stream)</h4>
                                        <div className="grid-flex">
                                            <InputField label="Engineering Cutoff" type="number" name="twelfthEngineeringCutoff" value={formData.twelfthEngineeringCutoff} onChange={handleChange} helperText="For engineering students" />
                                            <InputField label="NEET Score" type="number" name="twelfthNeetScore" value={formData.twelfthNeetScore} onChange={handleChange} helperText="For medical students" />
                                        </div>
                                        <InputField label="Agri Cutoff" type="number" name="twelfthAgriCutoff" value={formData.twelfthAgriCutoff} onChange={handleChange} helperText="For agriculture students" />
                                    </div>

                                    <div className="form-sub-container">
                                        <h4 className="label-sub">12th Standard Subject Marks</h4>
                                        <div className="grid-flex">
                                            <InputField label="Subject 1: Tamil / Language marks" type="number" name="twelfthSubject1Marks" value={formData.twelfthSubject1Marks} onChange={handleChange} required error={errors.twelfthSubject1Marks} />
                                            <InputField label="Subject 2: English marks" type="number" name="twelfthSubject2Marks" value={formData.twelfthSubject2Marks} onChange={handleChange} required error={errors.twelfthSubject2Marks} />
                                        </div>

                                        {/* Dynamic Major Subject Marks - Shows inside the same container */}
                                        {formData.twelfthSubjects && (
                                            <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(0, 209, 193, 0.03)', borderRadius: '12px', border: '1px dashed var(--primary)' }}>
                                                <h4 className="label-sub" style={{ color: 'var(--primary)', fontWeight: '700', marginBottom: '1rem' }}>Major Subjects Marks</h4>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                                    {getMajorSubjectList(formData.twelfthSubjects).map((subject, idx) => (
                                                        <InputField
                                                            key={idx}
                                                            label={`12th ${subject} Marks`}
                                                            type="number"
                                                            name={getSubjectKey('twelfth', subject)}
                                                            value={formData[getSubjectKey('twelfth', subject)]}
                                                            onChange={handleChange}
                                                            required
                                                            error={errors[getSubjectKey('twelfth', subject)]}
                                                        />
                                                    ))}
                                                    <InputField label="12th Total Marks" type="number" name="twelfthTotalMarks" value={formData.twelfthTotalMarks} onChange={handleChange} required error={errors.twelfthTotalMarks} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 5 for Diploma/11th OR Step 6 for 12th - Final Confirmation */}
                            {((step === 5 && (formData.tenthCourseCompleted === 'Diploma' || formData.tenthCourseCompleted === '11th')) || 
                              (step === 6 && formData.tenthCourseCompleted === '12th')) && (
                                <motion.div key="completion-step" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                                    <h3 className="step-heading">Submit Application</h3>
                                    <div className="compliance-box" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '1.5rem', padding: '2.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <ShieldCheck size={32} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                                            <div>
                                                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>English</h4>
                                                <p style={{ fontSize: '1rem', color: '#0d9488', fontWeight: '600', lineHeight: '1.8', margin: 0 }}>
                                                    Please ensure the information you provided is correct before submitting the form.
                                                </p>
                                            </div>
                                        </div>
                                        <div style={{ width: '100%', height: '1px', background: 'rgba(0, 209, 193, 0.2)' }}></div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <ShieldCheck size={32} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                                            <div>
                                                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#111827', marginBottom: '0.5rem' }}>Tamil</h4>
                                                <p style={{ fontSize: '1rem', color: '#0d9488', fontWeight: '600', lineHeight: '1.8', margin: 0 }}>
                                                    படிவத்தை சமர்ப்பிக்கும் முன் நீங்கள் வழங்கிய தகவல்கள் சரியானவை என்பதை உறுதிப்படுத்தவும்.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <div className="form-actions-row">
                            {step > 1 && <button type="button" onClick={handlePrev} className="btn-secondary-cln"><ArrowLeft size={18} /> Previous</button>}
                            {step < totalSteps ? (
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
        .step-tracker-visual { display: flex; align-items: center; justify-content: center; gap: 0; margin-bottom: 2rem; }
        .step-node { 
            width: 44px; height: 44px; border-radius: 50%; border: 2.5px solid #e2e8f0; 
            display: flex; align-items: center; justify-content: center; background: white; 
            color: #94a3b8; font-weight: 800; font-size: 1rem; position: relative; z-index: 2; 
            transition: all 0.3s ease; 
        }
        .step-node.active { 
            border-color: var(--primary); color: var(--primary); 
            box-shadow: 0 0 0 8px rgba(0, 209, 193, 0.08);
            transform: scale(1.05);
        }
        .step-node.completed { 
            border-color: var(--primary); background: var(--primary); color: white; 
        }
        .step-node span { position: relative; top: 1px; }
        .step-connector { width: 50px; height: 3px; background: #e2e8f0; position: relative; z-index: 1; margin: 0 -2px; }
        .step-connector.filled { background: var(--primary); }

        .form-card-padding { padding: 4rem; background: white; box-shadow: 0 40px 100px rgba(0,0,0,0.06); border-radius: 40px; border: 2px solid #b2bec3; }
        .step-heading { font-size: 1.4rem; font-weight: 800; color: #111827; margin-bottom: 2.5rem; border-left: 5px solid var(--primary); padding-left: 1.5rem; line-height: 1.2; text-transform: none; letter-spacing: -0.01em; }
        .form-sub-container { background: #fbfbfb; border: 1.5px solid #b2bec3; padding: 2rem; border-radius: 24px; margin-bottom: 2rem; }
        .label-sub { font-size: 0.95rem; font-weight: 800; color: var(--primary); margin-bottom: 1.5rem; text-transform: none; letter-spacing: -0.01em; display: flex; align-items: center; gap: 0.8rem; }
        .label-sub::after { content: ''; height: 1px; flex: 1; background: #b2bec3; }
        
        .form-group-admission { margin-bottom: 2rem; position: relative; }
        .label-row-cln { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 0.7rem; min-height: 1.2rem; }
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

        .dev-fill-btn {
            background: #f1f5f9;
            border: 1px solid #e2e8f0;
            padding: 0.6rem 1rem;
            border-radius: 12px;
            color: #64748b;
            font-size: 0.75rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            transition: all 0.2s ease;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .dev-fill-btn:hover {
            background: #e2e8f0;
            color: #1e293b;
            transform: translateY(-1px);
        }

        .dev-fill-btn:active {
            transform: translateY(0);
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
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12); border: 1px solid #f1f5f9; z-index: 100; overflow-y: auto; max-height: 300px; padding: 0.5rem;
        }
        .dropdown-opt { padding: 0.8rem 1.2rem; font-size: 0.95rem; font-weight: 600; color: #475569; transition: all 0.2s; border-radius: 10px; }
        .dropdown-opt:hover { background: #f1f5f9; color: var(--primary); }
        .dropdown-opt.selected { background: rgba(0, 209, 193, 0.08); color: var(--primary); }
        .dropdown-options::-webkit-scrollbar { width: 6px; }
        .dropdown-options::-webkit-scrollbar-track { background: #f1f5f9; border-radius: 10px; }
        .dropdown-options::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .dropdown-options::-webkit-scrollbar-thumb:hover { background: var(--primary); }


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
        .error-message-cln { color: #ef4444; font-size: 0.75rem; font-weight: 700; margin-top: 0.5rem; display: block; }
        .error-ring { border-color: #ef4444 !important; }
        .form-group-admission.has-error .field-icon-cln { color: #ef4444; }
        .form-group-admission.has-error label { color: #ef4444; }
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

        /* --- Mobile Responsive Overrides --- */
        @media (max-width: 768px) {
            .central-form-view { padding: 2rem 0.5rem; }
            .admission-nav-top { flex-direction: column; gap: 1.5rem; margin-bottom: 2rem; align-items: flex-start; }
            .logo-brand-cln { width: 100%; justify-content: space-between; }
            .dev-fill-btn { order: 2; margin-top: 1rem; width: 100%; justify-content: center; }
            
            .title-cln { font-size: 1.6rem; margin-bottom: 1.5rem; }
            .form-card-padding { padding: 1.5rem; border-radius: 20px; overflow: hidden; }
            
            .step-tracker-visual { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; margin: 0 auto 2.5rem; }
            .step-node { width: 34px; height: 34px; min-width: 34px; font-size: 0.85rem; }
            .step-connector { width: 25px; min-width: 25px; height: 2px; }
            
            .grid-flex { grid-template-columns: 1fr; gap: 1.5rem; }
            .step-heading { font-size: 1.2rem; margin-bottom: 1.5rem; padding-left: 1rem; }
            .form-sub-container { padding: 1.2rem; border-radius: 16px; }
            
            .enhanced-input { padding: 0.9rem 1.1rem; font-size: 0.95rem; }
            .enhanced-input.with-icon { padding-left: 3rem; }
            .field-icon-cln { left: 0.9rem; }
            
            .form-actions-row { flex-direction: column-reverse; gap: 1rem; margin-top: 2rem; }
            .btn-primary-cln, .btn-secondary-cln { width: 100%; padding: 1rem; flex: none; }
            
            .compliance-box { padding: 1.2rem; gap: 1rem; }
            
            /* Success Page Mobile */
            .success-card-premium { padding: 2.5rem 1.5rem; border-radius: 32px; }
            .premium-success-title { font-size: 1.8rem; }
            .premium-success-subtitle { font-size: 0.95rem; margin-bottom: 2rem; }
            .hope-id-box { padding: 1.5rem; border-radius: 24px; }
            .id-text { font-size: 1.3rem; }
            .success-actions { flex-direction: column; width: 100%; }
            .success-btn { width: 100%; justify-content: center; }
        }

        @media (max-width: 480px) {
            .title-cln { font-size: 1.4rem; }
            .step-node { width: 28px; height: 28px; min-width: 28px; }
            .step-connector { width: 15px; min-width: 15px; }
        }
    `}</style>
);

export default StudentAdmission;
