/**
 * Validation utilities for the Student Admission process.
 * Centralizing this logic makes it easier to test and maintain.
 */

export const validateAdmissionStep = (currentStep, formData, helpers = {}) => {
    const { getMajorSubjectList, getSubjectKey } = helpers;
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

        if (formData.eleventhSubjects && getMajorSubjectList && getSubjectKey) {
            const majors = getMajorSubjectList(formData.eleventhSubjects);
            majors.forEach(m => {
                const key = getSubjectKey('eleventh', m);
                if (!formData[key]) newErrors[key] = 'Required';
                else if (formData[key] < 0 || formData[key] > 100) newErrors[key] = '0-100';
            });

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

        if (formData.twelfthSubjects && getMajorSubjectList && getSubjectKey) {
            const majors = getMajorSubjectList(formData.twelfthSubjects);
            majors.forEach(m => {
                const key = getSubjectKey('twelfth', m);
                if (!formData[key]) newErrors[key] = 'Required';
                else if (formData[key] < 0 || formData[key] > 100) newErrors[key] = '0-100';
            });

            const sum = (Number(formData.twelfthSubject1Marks) || 0) + (Number(formData.twelfthSubject2Marks) || 0) +
                majors.reduce((acc, m) => acc + (Number(formData[getSubjectKey('twelfth', m)]) || 0), 0);

            if (!formData.twelfthTotalMarks) newErrors.twelfthTotalMarks = 'Required';
            else if (Number(formData.twelfthTotalMarks) !== sum) newErrors.twelfthTotalMarks = `Total must be ${sum}`;
        }
    }

    // Step 5: Confirmation for Diploma/11th OR Step 6: Confirmation for 12th
    // No validation needed for confirmation step - just a confirmation page
    if ((currentStep === 5 && (formData.tenthCourseCompleted === 'Diploma' || formData.tenthCourseCompleted === '11th')) ||
        (currentStep === 6 && formData.tenthCourseCompleted === '12th')) {
        // Confirmation step - no validation required, just return empty errors
    }

    return newErrors;
};
