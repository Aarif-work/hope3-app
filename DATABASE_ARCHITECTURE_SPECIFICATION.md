# HOPE3 Academy - Complete Database Architecture Specification

## Document Overview
This document provides comprehensive details of all UI fields, data structures, and application flows for backend database architecture design.

---

## 1. USER ROLES & AUTHENTICATION

### 1.1 User Roles
- **Super Admin**: Full system access, manages all entities
- **Admin/Staff**: Limited access based on permissions
- **Donor**: View students, donation history, impact metrics
- **Student/Applicant**: Apply for scholarship, view application status

### 1.2 Authentication Fields
```
Login:
- email (string, required, unique)
- password (string, required, hashed)
- role (enum: SUPER_ADMIN, ADMIN, DONOR, STUDENT)
- status (enum: Active, Inactive)
- lastLogin (datetime)
- createdAt (datetime)
- updatedAt (datetime)
```

---

## 2. STUDENT ADMISSION APPLICATION FORM

### 2.1 Step 1: Student Personal Details
```
Student Information:
- firstName (string, required)
- lastName (string, required)
- dob (date, required)
- gender (enum: Male, Female, Other, required)
- email (string, email format)
- studentMobile (string, 10 digits, required)
- studentMobileAlt (string, 10 digits, optional)
- homeAddress (text, required)
- pincode (string, 6 digits, required)
- district (enum: 38 Tamil Nadu districts, required)
- homeRegionType (enum: Village, Town, City, required)
- physicallyChallenged (enum: Yes, No, required)
- livingWith (enum: Parents, Single parent, Orphanage Home, In Refugee Camp, Other, required)
- knowledgeSource (enum: Facebook/Social media, Whatsapp Forward, School/Teacher, Friends/Well wishers, Other, required)
- courseToStudy (enum: B.E/B.Tech Computer Science, B.E/B.Tech IT, B.E/B.Tech Electronics, B.E/B.Tech Electrical, B.Sc Computer Science, B.Sc Maths, B.A Political Science, B.A History, Medical, NEET, Others, required)
- ambitionChoice1 (enum: Doctor, Engineer, Designer, Film Making, Agriculture, Banking Sector, Business, CA, Civil Service, Research, Teacher, Others, required)
- ambitionChoice2 (enum: Same as above, required, must be different from choice1)
- isFirstGraduate (enum: Yes, No, required)
```

### 2.2 Step 2: Relative's Information
```
Guardian/Parent Details:
- relativeName (string, required)
- relationshipType (enum: Father, Mother, Guardian, Other, required)
- relativeOccupation (string)
- relativeMobile (string, 10 digits, required)
- relativeEmail (string, email format)
- relativeEducation (enum: Below 10th, 10th Standard, 12th Standard, Bachelor degree, Master degree)
- familyMembersCount (integer, required)
- familyIncomeMonthly (decimal, required)
```

### 2.3 Step 3: 10th Standard Education Details
```
10th Education:
- tenthSchoolName (string, required)
- tenthSchoolLocation (string, required)
- tenthRegistrationNumber (string, required)
- tenthDistrictStudied (enum: 38 Tamil Nadu districts, required)
- tenthSchoolRegionType (enum: Village, Town, City, required)
- tenthSchoolType (enum: Government School, Government Aided School, Private School, required)
- tenthYearPassed (enum: 2018-2024, required)
- tenthCourseCompleted (enum: Diploma, 11th, 12th, required) // Determines next steps
- tenthSubject1Marks (integer, required) // Language
- tenthSubject2Marks (integer, required) // English
- tenthSubject3Marks (integer, required) // Mathematics
- tenthSubject4Marks (integer, required) // Science
- tenthSubject5Marks (integer, required) // Social Science
- tenthTotalMarks (integer, required)
```

### 2.4 Step 4a: Diploma Details (Conditional - if tenthCourseCompleted = 'Diploma')
```
Diploma Education:
- diplomaCollegeName (string, required)
- diplomaCollegeLocation (string, required)
- diplomaPercentage (decimal, required)
- diplomaDistrictStudied (enum: 38 Tamil Nadu districts, required)
- diplomaCollegeRegionType (enum: Village, Town, City, required)
- diplomaCourseStudied (enum: Computer Engineering, Electrical Engineering, Electronics & Communication Engineering, Electrical & Telecommunication Engineering, Information Technology, Electrical and Electronics Engineering, Computer Science and Engineering, Other, required)
- diplomaYearPassed (enum: 2018-2024, required)
```

### 2.4b: Step 4: 11th Standard Details (Conditional - if tenthCourseCompleted = '11th' or '12th')
```
11th Education:
- eleventhSchoolName (string, required)
- eleventhSchoolLocation (string, required)
- eleventhRegistrationNumber (string)
- eleventhDistrictStudied (enum: 38 Tamil Nadu districts, required)
- eleventhSchoolRegionType (enum: Village, Town, City, required)
- eleventhSchoolType (enum: Government School, Government Aided School, Private School, required)
- eleventhYearPassed (enum: 2018-2024, required)
- eleventhSubjects (enum: 
    * Mathematics/Physics/Chemistry/Statistics
    * Accountancy/Commerce/Economics/History
    * Accountancy/Business Maths/Commerce/Economics
    * Accountancy/Commerce/Economics/Political Science
    * Commerce/Economics/Accountancy/Statistics
    * Biology/Chemistry/Mathematics/Physics
    * Botany/Chemistry/Physics/Zoology
    * Chemistry/Computer Science/Mathematics/Physics
    * Accountancy/Commerce/Computer Science/Economics
    * Accountancy/Commerce/Business Maths/Economics
    , required)
- eleventhEngineeringCutoff (decimal, optional)
- eleventhNeetScore (integer, optional)
- eleventhAgriCutoff (decimal, optional)
- eleventhSubject1Marks (integer, required) // Tamil/Language
- eleventhSubject2Marks (integer, required) // English

// Dynamic Major Subject Marks (based on eleventhSubjects selection):
- eleventhMathematicsMarks (integer, conditional)
- eleventhPhysicsMarks (integer, conditional)
- eleventhChemistryMarks (integer, conditional)
- eleventhBiologyMarks (integer, conditional)
- eleventhStatisticsMarks (integer, conditional)
- eleventhAccountancyMarks (integer, conditional)
- eleventhCommerceMarks (integer, conditional)
- eleventhEconomicsMarks (integer, conditional)
- eleventhHistoryMarks (integer, conditional)
- eleventhBusinessMathsMarks (integer, conditional)
- eleventhPoliticalScienceMarks (integer, conditional)
- eleventhBotanyMarks (integer, conditional)
- eleventhZoologyMarks (integer, conditional)
- eleventhComputerScienceMarks (integer, conditional)
- eleventhTotalMarks (integer, required)
```

### 2.5 Step 5: 12th Standard Details (Conditional - if tenthCourseCompleted = '12th')
```
12th Education:
- twelfthSchoolName (string, required)
- twelfthSchoolLocation (string, required)
- twelfthRegistrationNumber (string)
- twelfthDistrictStudied (enum: 38 Tamil Nadu districts, required)
- twelfthSchoolRegionType (enum: Village, Town, City, required)
- twelfthSchoolType (enum: Government School, Government Aided School, Private School, required)
- twelfthYearPassed (enum: 2018-2024, required)
- twelfthSubjects (enum: Same as 11th subjects list, required)
- twelfthEngineeringCutoff (decimal, optional)
- twelfthNeetScore (integer, optional)
- twelfthAgriCutoff (decimal, optional)
- twelfthSubject1Marks (integer, required) // Tamil/Language
- twelfthSubject2Marks (integer, required) // English

// Dynamic Major Subject Marks (based on twelfthSubjects selection):
- twelfthMathematicsMarks (integer, conditional)
- twelfthPhysicsMarks (integer, conditional)
- twelfthChemistryMarks (integer, conditional)
- twelfthBiologyMarks (integer, conditional)
- twelfthStatisticsMarks (integer, conditional)
- twelfthAccountancyMarks (integer, conditional)
- twelfthCommerceMarks (integer, conditional)
- twelfthEconomicsMarks (integer, conditional)
- twelfthHistoryMarks (integer, conditional)
- twelfthBusinessMathsMarks (integer, conditional)
- twelfthPoliticalScienceMarks (integer, conditional)
- twelfthBotanyMarks (integer, conditional)
- twelfthZoologyMarks (integer, conditional)
- twelfthComputerScienceMarks (integer, conditional)
- twelfthTotalMarks (integer, required)
```

### 2.6 Application Metadata
```
Application Status:
- applicationId (string, unique, auto-generated: HOPE3-YYYY-XXX)
- status (enum: Applied, Approved, Rejected, default: Applied)
- submittedAt (datetime, auto)
- reviewedAt (datetime, nullable)
- reviewedBy (reference to Admin, nullable)
- notes (text, admin notes)
```

---

## 3. STUDENT MANAGEMENT (Post-Admission)

### 3.1 Enrolled Student Record
```
Student Profile:
- hopeId (string, unique, format: H3-YYYY-XXX)
- applicationId (reference to Application)
- name (string, from application)
- course (string, required)
- academicYear (string, format: YYYY-YY, required)
- status (enum: Active, Inactive, Graduated, Dropped, default: Active)
- enrollmentDate (date)
- expectedGraduation (date)
- currentSemester (integer)
- cgpa (decimal, nullable)
- attendancePercentage (decimal, nullable)
- photo (file/url, nullable)
- documents (array of files/urls)
```

### 3.2 Academic Performance Tracking
```
Semester Records:
- studentId (reference to Student)
- semester (integer)
- year (string)
- subjects (array of subject records)
- gpa (decimal)
- attendance (decimal)
- remarks (text)
```

---

## 4. ADMIN MANAGEMENT

### 4.1 Admin/Staff Records
```
Admin Profile:
- id (integer, auto-increment)
- name (string, required)
- email (string, unique, required)
- role (enum: Founder, Staff, Volunteer, required)
- status (enum: Active, Inactive, default: Active)
- permissions (json/array, defines access levels)
- createdAt (datetime)
- createdBy (reference to SuperAdmin)
```

---

## 5. DONOR MANAGEMENT

### 5.1 Donor Profile
```
Donor Information:
- id (integer, auto-increment)
- name (string, required) // Organization or Individual name
- type (enum: Individual, Corporate, NGO, Government, required)
- primaryContact (string, required)
- email (string, unique, required)
- phone (string)
- location (string)
- status (enum: Active, Inactive, default: Active)
- dataVisibility (enum: Basic, Restricted, Full, default: Basic)
  * Basic: Can see total student count, general statistics
  * Restricted: Can see student names, courses, limited details
  * Full: Can see complete student profiles, academic records
- donorType (enum: monthly, one-time)
- joinedDate (date)
- totalDonated (decimal, calculated)
- impactScore (decimal, calculated)
```

### 5.2 Donation Records
```
Donation Transaction:
- id (string, unique, format: DON-XXXX)
- donorId (reference to Donor)
- amount (decimal, required)
- date (datetime, required)
- paymentMode (enum: UPI, Bank Transfer, Cash, Cheque, Card, required)
- donationType (enum: Monthly, One-time, required)
- project (enum: Semester Fee Support, Food Support, General Education Fund, Other)
- status (enum: Success, Pending, Failed, default: Pending)
- transactionReference (string)
- receiptUrl (string/file)
```

### 5.3 Donor-Student Visibility Mapping
```
Donor Access Control:
- donorId (reference to Donor)
- studentId (reference to Student, nullable) // null = all students
- accessLevel (enum: View, Full)
- grantedAt (datetime)
- grantedBy (reference to Admin)
```

---

## 6. ACADEMIC CONFIGURATION

### 6.1 Academic Years
```
Academic Year:
- year (string, format: YYYY-YY, primary key)
- status (enum: Current, Previous, Upcoming)
- startDate (date)
- endDate (date)
- totalStudentsEnrolled (integer, calculated)
- admissionOpen (boolean, default: false)
```

### 6.2 Courses
```
Course Master:
- id (integer, auto-increment)
- name (string, required, unique)
- duration (string, e.g., "6 Months", "12 Months")
- status (enum: Active, Inactive, default: Active)
- admissionStatus (enum: Open, Closed, default: Closed)
- description (text)
- eligibility (text)
- fees (decimal)
```

---

## 7. REPORTS & ANALYTICS

### 7.1 Dashboard Metrics (Calculated/Aggregated)
```
Super Admin Dashboard:
- totalStudents (count of active students)
- totalApplications (count of pending applications)
- admissionTrend (percentage change)
- courseWiseDistribution (count by course)
- recentApplications (last 10 applications)
- monthlyAdmissionTrend (12-month data)

Donor Dashboard:
- totalDonated (sum of donations)
- myImpactPercent (calculated contribution percentage)
- isCurrentMonthPaid (boolean for monthly donors)
- donationHistory (list of transactions)
- foundationTotalStudents (count)
- fundingNeeds (allocation vs total by category)
- monthlyGrowthChart (donor's contribution over time)
```

---

## 8. APPLICATION FLOW

### 8.1 Student Application Journey
```
1. Landing Page → Click "Apply Now"
2. Student Admission Form (Multi-step):
   - Step 1: Personal Details
   - Step 2: Relative Information
   - Step 3: 10th Education
   - Step 4: Diploma/11th Education (conditional)
   - Step 5: 12th Education (conditional, only if 12th selected)
   - Confirmation Modal
3. Submit → Generate Application ID (HOPE3-2026-XXX)
4. Success Page with Application ID
5. Status: "Applied" (awaiting admin review)
```

### 8.2 Admin Review Process
```
1. Admin logs in → Navigate to "Applied Students"
2. View list of applications with status "Applied"
3. Click on application → View full details
4. Actions:
   - Approve → Status changes to "Approved", student record created with Hope ID
   - Reject → Status changes to "Rejected"
5. Approved students appear in "Students Management"
```

### 8.3 Student Enrollment
```
1. After approval, create Student record:
   - Generate Hope ID (H3-YYYY-XXX)
   - Link to original application
   - Assign course and academic year
   - Set status to "Active"
2. Student now visible to:
   - Super Admin (full access)
   - Admins (based on permissions)
   - Donors (based on visibility level)
```

### 8.4 Donor Access Flow
```
1. Donor logs in → Donor Dashboard
2. Navigation tabs:
   - Overview: Stats, donation summary, impact metrics
   - Students: List of students (filtered by visibility level)
   - Our Impact: Foundation-wide statistics
   - History: Donation transaction history
   - Support: Help and contact
3. Student visibility based on dataVisibility field:
   - Basic: Count only
   - Restricted: Names, courses, years
   - Full: Complete profiles, academic records
```

---

## 9. DATA RELATIONSHIPS

### 9.1 Entity Relationships
```
User (1) ←→ (1) Admin/Donor/Student Profile
Application (1) ←→ (0..1) Student (after approval)
Student (1) ←→ (N) Semester Records
Student (N) ←→ (N) Donors (via visibility mapping)
Donor (1) ←→ (N) Donations
Admin (1) ←→ (N) Applications (reviewed by)
Course (1) ←→ (N) Students
Academic Year (1) ←→ (N) Students
```

### 9.2 Key Indexes Required
```
- applicationId (unique)
- hopeId (unique)
- email (unique, indexed)
- status fields (indexed for filtering)
- dates (indexed for range queries)
- donorId + studentId (composite for visibility)
```

---

## 10. VALIDATION RULES

### 10.1 Field Validations
```
- Mobile numbers: Exactly 10 digits, numeric only
- Pincode: Exactly 6 digits, numeric only
- Email: Valid email format
- Dates: Valid date format, logical constraints (DOB < today)
- Marks: 0-100 range for individual subjects
- Total marks: Sum validation against individual subjects
- Ambition choices: Must be different
- Conditional fields: Required only when parent condition met
```

### 10.2 Business Rules
```
- Application ID: Auto-generated, format HOPE3-YYYY-XXX
- Hope ID: Auto-generated on approval, format H3-YYYY-XXX
- Status transitions: Applied → Approved/Rejected (one-way)
- Donor visibility: Controlled by Super Admin only
- Academic year: Only one "Current" year at a time
- Course admission: Can be toggled Open/Closed independently
```

---

## 11. TAMIL NADU DISTRICTS (38 Districts)
```
Ariyalur, Chengalpattu, Chennai, Coimbatore, Cuddalore, Dharmapuri, Dindigul, Erode, 
Kallakurichi, Kanchipuram, Kanniyakumari, Karur, Krishnagiri, Madurai, Mayiladuthurai, 
Nagapattinam, Namakkal, Nilgiris, Perambalur, Pudukkottai, Ramanathapuram, Ranipet, 
Salem, Sivagangai, Tenkasi, Thanjavur, Theni, Thoothukudi, Tiruchirappalli, Tirunelveli, 
Tirupathur, Tiruppur, Tiruvallur, Tiruvannamalai, Tiruvarur, Vellore, Viluppuram, Virudhunagar
```

---

## 12. ADDITIONAL FEATURES

### 12.1 Settings & Configuration
```
System Settings:
- admissionPortalStatus (boolean: Open/Closed)
- currentAcademicYear (reference)
- applicationEmailNotifications (boolean)
- donorReportFrequency (enum: Weekly, Monthly, Quarterly)
```

### 12.2 Notifications (Future Enhancement)
```
Notification Log:
- userId (reference)
- type (enum: Email, SMS, In-App)
- subject (string)
- message (text)
- sentAt (datetime)
- status (enum: Sent, Failed, Pending)
```

---

## 13. SECURITY & PRIVACY

### 13.1 Data Protection
```
- Passwords: Hashed using bcrypt/argon2
- PII fields: Encrypted at rest
- API access: JWT-based authentication
- Role-based access control (RBAC)
- Audit logs for sensitive operations
```

### 13.2 Audit Trail
```
Audit Log:
- userId (reference)
- action (string: CREATE, UPDATE, DELETE, VIEW)
- entity (string: Student, Application, Donor, etc.)
- entityId (string)
- changes (json: before/after values)
- timestamp (datetime)
- ipAddress (string)
```

---

## SUMMARY

This specification covers:
- **4 User Roles**: Super Admin, Admin, Donor, Student
- **100+ Database Fields** across all entities
- **Multi-step Application Form** with conditional logic
- **Complete Application Flow** from submission to enrollment
- **Donor Management** with granular visibility controls
- **Academic Configuration** for courses and years
- **Comprehensive Validation Rules** and business logic

The database should support:
- Relational structure with proper foreign keys
- Indexes on frequently queried fields
- Audit logging for compliance
- Scalability for growing student and donor base
- Flexible visibility controls for donor access
