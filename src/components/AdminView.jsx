import React, { useState } from 'react';
import { 
  School, 
  Users, 
  Server, 
  HardDrive, 
  ShieldCheck, 
  Wifi, 
  BookOpen, 
  CheckCircle, 
  Database,
  Layers,
  Cpu,
  RefreshCw,
  Activity,
  Battery,
  BatteryCharging,
  Search,
  Filter,
  Download,
  FileText,
  Check,
  AlertTriangle,
  ArrowUpRight,
  Radio,
  Lock,
  Unlock,
  Send,
  Sparkles,
  Printer,
  Eye,
  X,
  HelpCircle,
  Plus,
  Edit2,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Settings,
  Sliders,
  GraduationCap,
  Bell,
  Award,
  CheckCircle2,
  ChevronRight,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { translations } from '../data/mockData';

export function AdminView({ lang = 'en' }) {
  const t = translations[lang] || translations['en'];

  // Global Toast
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  // Sub-navigation tabs
  const [activeTab, setActiveTab] = useState('features'); // 'features' | 'classes' | 'students' | 'curriculum' | 'faculty' | 'mesh' | 'fleet' | 'accreditation'

  // ==========================================
  // 1. INSTITUTIONAL PROFILE STATE (EDITABLE)
  // ==========================================
  const [institution, setInstitution] = useState({
    schoolName: 'Model Senior Secondary School Rampur',
    trustName: 'GyanSetu Private Education Trust',
    headmistress: 'Dr. Anita Deshmukh',
    designation: 'Principal & Director of Academics',
    affiliation: 'Autonomous Private EdTech Council • CBSE Aligned',
    accreditationCode: 'GS-PVT-092801',
    block: 'Bilaspur',
    district: 'Rampur (UP)',
    helpline: '1800 180 5321',
    email: 'admin@gyansetu.edu.in',
    establishedYear: '2018'
  });
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({ ...institution });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setInstitution({ ...profileForm });
    setIsEditProfileModalOpen(false);
    showToast('✓ Institutional Profile updated successfully!');
    try { confetti({ particleCount: 25, spread: 50 }); } catch (err) {}
  };

  // ==========================================
  // 2. PLATFORM FEATURES STATE (ADD & TOGGLE)
  // ==========================================
  const [platformFeatures, setPlatformFeatures] = useState([
    {
      id: 'feat-ai-doubt',
      name: 'AI Doubt Saathi (Offline AI Tutor)',
      category: 'Learning Assistance',
      description: 'Provides instant vernacular explanations and step-by-step math solutions in 10 languages without internet.',
      targetGrade: 'Classes 6 to 10',
      enabled: true,
      isCore: true
    },
    {
      id: 'feat-mesh-sync',
      name: 'Zero-Data Raspberry Pi Mesh Sync',
      category: 'Infrastructure',
      description: 'Synchronizes lesson plans, tests, and audio files over campus local Wi-Fi hotspot with zero cellular cost.',
      targetGrade: 'All Classes',
      enabled: true,
      isCore: true
    },
    {
      id: 'feat-low-data',
      name: 'Low-Bandwidth 2G Data Saver Mode',
      category: 'Network',
      description: 'Compresses vector illustrations and restricts high-data video streams on cellular 2G/3G connections.',
      targetGrade: 'All Classes',
      enabled: true,
      isCore: true
    },
    {
      id: 'feat-parent-sms',
      name: 'Automated Guardian SMS & WhatsApp Alerts',
      category: 'Parent Engagement',
      description: 'Sends daily attendance alerts and weekly exam marks summaries to parents in Hindi & regional languages.',
      targetGrade: 'Classes 6 to 10',
      enabled: true,
      isCore: true
    },
    {
      id: 'feat-audio-10lang',
      name: 'Multilingual Audio Narration (10 Languages)',
      category: 'Accessibility',
      description: 'Full voice readout of science and social science chapters in Hindi, Bhojpuri, Maithili, Awadhi, etc.',
      targetGrade: 'Classes 6 to 10',
      enabled: true,
      isCore: true
    },
    {
      id: 'feat-exam-lockdown',
      name: 'Exam Mode Remote Tablet Lockdown',
      category: 'Security & Assessment',
      description: 'Restricts tablets to full-screen timed assessment tests, preventing background navigation.',
      targetGrade: 'Classes 9 & 10',
      enabled: false,
      isCore: true
    },
    {
      id: 'feat-diagnostic-test',
      name: 'Adaptive Diagnostic Testing Engine',
      category: 'Evaluation',
      description: 'Dynamically adapts test difficulty based on student mastery curves to detect foundational gaps.',
      targetGrade: 'Classes 6 to 10',
      enabled: true,
      isCore: true
    },
    {
      id: 'feat-gamified-streaks',
      name: 'Gamified Streaks & Merit Medals',
      category: 'Student Motivation',
      description: 'Awards bronze, silver, and gold medals for continuous study streaks and chapter completion.',
      targetGrade: 'Classes 6 to 10',
      enabled: true,
      isCore: false
    },
    {
      id: 'feat-p2p-share',
      name: 'Peer-to-Peer Wi-Fi Notes Sharing',
      category: 'Collaboration',
      description: 'Allows students to beam solved homework and diagrams between adjacent tablets over Wi-Fi Direct.',
      targetGrade: 'Classes 8 to 10',
      enabled: true,
      isCore: false
    }
  ]);

  const [featureCategoryFilter, setFeatureCategoryFilter] = useState('all');
  const [isAddFeatureModalOpen, setIsAddFeatureModalOpen] = useState(false);
  const [newFeatureForm, setNewFeatureForm] = useState({
    name: '',
    category: 'Learning Assistance',
    targetGrade: 'Classes 6 to 10',
    description: '',
    enabled: true
  });

  const handleToggleFeature = (id) => {
    setPlatformFeatures(prev => prev.map(f => {
      if (f.id === id) {
        const nextState = !f.enabled;
        showToast(nextState ? `✓ Feature "${f.name}" enabled.` : `ℹ Feature "${f.name}" disabled.`);
        return { ...f, enabled: nextState };
      }
      return f;
    }));
  };

  const handleAddFeature = (e) => {
    e.preventDefault();
    if (!newFeatureForm.name.trim()) return;
    const newFeature = {
      id: 'feat-custom-' + Date.now(),
      name: newFeatureForm.name.trim(),
      category: newFeatureForm.category,
      targetGrade: newFeatureForm.targetGrade,
      description: newFeatureForm.description.trim() || 'Custom administrator configured capability.',
      enabled: newFeatureForm.enabled,
      isCore: false
    };
    setPlatformFeatures(prev => [newFeature, ...prev]);
    setIsAddFeatureModalOpen(false);
    setNewFeatureForm({
      name: '',
      category: 'Learning Assistance',
      targetGrade: 'Classes 6 to 10',
      description: '',
      enabled: true
    });
    showToast(`✓ New platform feature "${newFeature.name}" added successfully!`);
    try { confetti({ particleCount: 35, spread: 60 }); } catch (err) {}
  };

  const handleDeleteFeature = (id, name) => {
    setPlatformFeatures(prev => prev.filter(f => f.id !== id));
    showToast(`✓ Feature "${name}" removed.`);
  };

  // ==========================================
  // 3. CLASSES & SECTIONS STATE (ADD & EDIT)
  // ==========================================
  const [classesList, setClassesList] = useState([
    { id: 'CLS-6A', grade: 'Class 6', section: 'A', room: 'Room 101', teacher: 'Sunita Yadav', students: 25, attendance: '95%', stream: 'Foundation General' },
    { id: 'CLS-6B', grade: 'Class 6', section: 'B', room: 'Room 102', teacher: 'Vikram Sharma', students: 26, attendance: '94%', stream: 'Foundation General' },
    { id: 'CLS-7A', grade: 'Class 7', section: 'A', room: 'Room 103', teacher: 'Priya Verma', students: 24, attendance: '96%', stream: 'Middle School Core' },
    { id: 'CLS-8A', grade: 'Class 8', section: 'A', room: 'Room 104', teacher: 'Vikram Sharma', students: 28, attendance: '93%', stream: 'Middle School Advanced' },
    { id: 'CLS-9A', grade: 'Class 9', section: 'A', room: 'Room 201', teacher: 'Rajesh Kumar', students: 23, attendance: '91%', stream: 'Secondary Science & Tech' },
    { id: 'CLS-10A', grade: 'Class 10', section: 'A', room: 'Room 202', teacher: 'Dr. Anita Deshmukh', students: 22, attendance: '96%', stream: 'Secondary Board Prep' }
  ]);
  const [isAddClassModalOpen, setIsAddClassModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [classForm, setClassForm] = useState({
    grade: 'Class 8',
    section: 'B',
    room: 'Room 105',
    teacher: 'Anjali Gupta',
    students: 25,
    stream: 'Middle School Core'
  });

  const handleSaveClass = (e) => {
    e.preventDefault();
    if (editingClass) {
      setClassesList(prev => prev.map(c => c.id === editingClass.id ? { ...c, ...classForm } : c));
      showToast(`✓ Class ${classForm.grade}-${classForm.section} updated successfully.`);
      setEditingClass(null);
    } else {
      const newClass = {
        id: `CLS-${classForm.grade.replace('Class ', '')}${classForm.section}`,
        ...classForm,
        attendance: '95%'
      };
      setClassesList(prev => [...prev, newClass]);
      showToast(`✓ New Class ${newClass.grade}-${newClass.section} registered!`);
      try { confetti({ particleCount: 30, spread: 55 }); } catch (err) {}
      setIsAddClassModalOpen(false);
    }
  };

  const handleDeleteClass = (id, name) => {
    setClassesList(prev => prev.filter(c => c.id !== id));
    showToast(`✓ ${name} removed.`);
  };

  // ==========================================
  // 4. STUDENTS DIRECTORY STATE (ADD & EDIT)
  // ==========================================
  const [studentsList, setStudentsList] = useState([
    { id: 'STU-001', name: 'Rohan Sharma', grade: 'Class 8', roll: 14, parent: 'Suresh Sharma', contact: '98765-43210', attendance: 95, status: 'Active' },
    { id: 'STU-002', name: 'Priya Kumari', grade: 'Class 8', roll: 21, parent: 'Ramesh Kumar', contact: '98765-43211', attendance: 98, status: 'Active' },
    { id: 'STU-003', name: 'Amit Verma', grade: 'Class 9', roll: 7, parent: 'Mahesh Verma', contact: '98765-43212', attendance: 88, status: 'Active' },
    { id: 'STU-004', name: 'Neha Patel', grade: 'Class 7', roll: 19, parent: 'Kailash Patel', contact: '98765-43213', attendance: 92, status: 'Active' },
    { id: 'STU-005', name: 'Vikas Singh', grade: 'Class 8', roll: 32, parent: 'Dharmendra Singh', contact: '98765-43214', attendance: 79, status: 'Attention' },
    { id: 'STU-006', name: 'Sunita Yadav', grade: 'Class 6', roll: 5, parent: 'Hari Yadav', contact: '98765-43215', attendance: 96, status: 'Active' },
    { id: 'STU-007', name: 'Deepak Rao', grade: 'Class 10', roll: 11, parent: 'Shivaji Rao', contact: '98765-43216', attendance: 94, status: 'Active' },
    { id: 'STU-008', name: 'Kavita Das', grade: 'Class 9', roll: 28, parent: 'Shyam Das', contact: '98765-43217', attendance: 91, status: 'Active' },
    { id: 'STU-009', name: 'Rahul Kumar', grade: 'Class 7', roll: 16, parent: 'Sanjay Kumar', contact: '98765-43218', attendance: 90, status: 'Active' },
    { id: 'STU-010', name: 'Ananya Roy', grade: 'Class 8', roll: 3, parent: 'Bimal Roy', contact: '98765-43219', attendance: 99, status: 'Active' },
    { id: 'STU-011', name: 'Sanjay Meena', grade: 'Class 6', roll: 22, parent: 'Prem Meena', contact: '98765-43220', attendance: 84, status: 'Active' },
    { id: 'STU-012', name: 'Pooja Tiwari', grade: 'Class 10', roll: 18, parent: 'Alok Tiwari', contact: '98765-43221', attendance: 97, status: 'Active' }
  ]);
  const [studentSearch, setStudentSearch] = useState('');
  const [studentGradeFilter, setStudentGradeFilter] = useState('all');
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentForm, setStudentForm] = useState({
    name: '',
    grade: 'Class 8',
    roll: '',
    parent: '',
    contact: '',
    status: 'Active'
  });

  const handleSaveStudent = (e) => {
    e.preventDefault();
    if (!studentForm.name.trim()) return;
    if (editingStudent) {
      setStudentsList(prev => prev.map(s => s.id === editingStudent.id ? { ...s, ...studentForm } : s));
      showToast(`✓ Student record for ${studentForm.name} updated.`);
      setEditingStudent(null);
    } else {
      const newStudent = {
        id: 'STU-' + String(studentsList.length + 1).padStart(3, '0'),
        name: studentForm.name.trim(),
        grade: studentForm.grade,
        roll: Number(studentForm.roll) || studentsList.length + 1,
        parent: studentForm.parent.trim() || 'Parent/Guardian',
        contact: studentForm.contact.trim() || '98765-00000',
        attendance: 95,
        status: studentForm.status
      };
      setStudentsList(prev => [newStudent, ...prev]);
      showToast(`✓ New student ${newStudent.name} admitted to ${newStudent.grade}!`);
      try { confetti({ particleCount: 30, spread: 50 }); } catch (err) {}
      setIsAddStudentModalOpen(false);
    }
  };

  const handleDeleteStudent = (id, name) => {
    setStudentsList(prev => prev.filter(s => s.id !== id));
    showToast(`✓ Student record for ${name} removed.`);
  };

  // ==========================================
  // 5. CURRICULUM & MODULES (ADD & EDIT)
  // ==========================================
  const [curriculumModules, setCurriculumModules] = useState([
    { id: 'CUR-01', grade: 'Class 6', subject: 'Mathematics', title: 'Knowing Our Numbers & Whole Numbers', chapters: 2, status: 'Active', audioSync: true },
    { id: 'CUR-02', grade: 'Class 6', subject: 'Science', title: 'Components of Food & Separation of Substances', chapters: 2, status: 'Active', audioSync: true },
    { id: 'CUR-03', grade: 'Class 7', subject: 'Mathematics', title: 'Integers, Fractions & Decimals', chapters: 2, status: 'Active', audioSync: true },
    { id: 'CUR-04', grade: 'Class 7', subject: 'Science', title: 'Nutrition in Plants & Heat Transfer', chapters: 2, status: 'Active', audioSync: true },
    { id: 'CUR-05', grade: 'Class 8', subject: 'Mathematics', title: 'Rational Numbers & Linear Equations', chapters: 2, status: 'Active', audioSync: true },
    { id: 'CUR-06', grade: 'Class 8', subject: 'Science', title: 'Crop Production & Microorganisms Friends and Foe', chapters: 2, status: 'Active', audioSync: true },
    { id: 'CUR-07', grade: 'Class 9', subject: 'Mathematics', title: 'Number Systems & Polynomials', chapters: 2, status: 'Active', audioSync: true },
    { id: 'CUR-08', grade: 'Class 9', subject: 'Science', title: 'Matter in Our Surroundings & Fundamental Unit of Life', chapters: 2, status: 'Active', audioSync: true },
    { id: 'CUR-09', grade: 'Class 10', subject: 'Mathematics', title: 'Real Numbers & Quadratic Equations', chapters: 2, status: 'Active', audioSync: true },
    { id: 'CUR-10', grade: 'Class 10', subject: 'Science', title: 'Chemical Reactions, Acids Bases & Electricity', chapters: 2, status: 'Active', audioSync: true },
    { id: 'CUR-11', grade: 'Class 10', subject: 'Digital Literacy', title: 'Cyber Safety, Portals & Digital Career Readiness', chapters: 1, status: 'Active', audioSync: true }
  ]);
  const [curriculumGradeFilter, setCurriculumGradeFilter] = useState('all');
  const [isAddModuleModalOpen, setIsAddModuleModalOpen] = useState(false);
  const [moduleForm, setModuleForm] = useState({
    grade: 'Class 8',
    subject: 'Mathematics',
    title: '',
    chapters: 1,
    audioSync: true
  });

  const handleAddModule = (e) => {
    e.preventDefault();
    if (!moduleForm.title.trim()) return;
    const newMod = {
      id: 'CUR-' + String(curriculumModules.length + 1).padStart(2, '0'),
      grade: moduleForm.grade,
      subject: moduleForm.subject,
      title: moduleForm.title.trim(),
      chapters: Number(moduleForm.chapters) || 1,
      status: 'Active',
      audioSync: moduleForm.audioSync
    };
    setCurriculumModules(prev => [newMod, ...prev]);
    setIsAddModuleModalOpen(false);
    setModuleForm({ grade: 'Class 8', subject: 'Mathematics', title: '', chapters: 1, audioSync: true });
    showToast(`✓ New chapter "${newMod.title}" added to ${newMod.grade}!`);
    try { confetti({ particleCount: 30, spread: 55 }); } catch (err) {}
  };

  // ==========================================
  // 6. FACULTY & STAFF STATE
  // ==========================================
  const [facultyList, setFacultyList] = useState([
    { id: 'FAC-01', name: 'Dr. Anita Deshmukh', role: 'Principal & Director of Academics', subject: 'Leadership & Board Math (Gr 10)', attendance: 'Present', syllabus: 95, planStatus: 'Approved' },
    { id: 'FAC-02', name: 'Vikram Sharma', role: 'Senior TGT Mathematics', subject: 'Mathematics (Gr 6-8)', attendance: 'Present', syllabus: 88, planStatus: 'Approved' },
    { id: 'FAC-03', name: 'Priya Verma', role: 'Senior TGT Science', subject: 'General Science (Gr 6-8)', attendance: 'Present', syllabus: 90, planStatus: 'Approved' },
    { id: 'FAC-04', name: 'Anjali Gupta', role: 'Senior TGT English', subject: 'English & Grammar (Gr 6-10)', attendance: 'Present', syllabus: 82, planStatus: 'Pending Review' },
    { id: 'FAC-05', name: 'Rajesh Kumar', role: 'Senior TGT Social Science', subject: 'Social Studies & Civics (Gr 9-10)', attendance: 'Present', syllabus: 86, planStatus: 'Approved' },
    { id: 'FAC-06', name: 'Meena Patel', role: 'TGT Languages', subject: 'Hindi & Sanskrit Sahitya', attendance: 'Present', syllabus: 92, planStatus: 'Approved' },
    { id: 'FAC-07', name: 'Suresh Rao', role: 'ICT & Lab Instructor', subject: 'Digital Literacy & PWA Hub', attendance: 'Present', syllabus: 94, planStatus: 'Approved' },
    { id: 'FAC-08', name: 'Sunita Yadav', role: 'Special Educator', subject: 'Remedial & CWSN Learning', attendance: 'Present', syllabus: 85, planStatus: 'Pending Review' }
  ]);
  const [isAddFacultyModalOpen, setIsAddFacultyModalOpen] = useState(false);
  const [facultyForm, setFacultyForm] = useState({
    name: '',
    role: 'TGT Teacher',
    subject: 'Mathematics (Gr 6-10)'
  });

  const handleAddFaculty = (e) => {
    e.preventDefault();
    if (!facultyForm.name.trim()) return;
    const newFac = {
      id: 'FAC-' + String(facultyList.length + 1).padStart(2, '0'),
      name: facultyForm.name.trim(),
      role: facultyForm.role,
      subject: facultyForm.subject,
      attendance: 'Present',
      syllabus: 80,
      planStatus: 'Approved'
    };
    setFacultyList(prev => [...prev, newFac]);
    setIsAddFacultyModalOpen(false);
    setFacultyForm({ name: '', role: 'TGT Teacher', subject: 'Mathematics (Gr 6-10)' });
    showToast(`✓ Faculty member ${newFac.name} registered.`);
  };

  const handleApprovePlan = (id) => {
    setFacultyList(prev => prev.map(fac => fac.id === id ? { ...fac, planStatus: 'Approved' } : fac));
    showToast('✓ Weekly Lesson Plan approved and published to faculty portal.');
  };

  // Staff Notice Modal
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [noticeText, setNoticeText] = useState('All teachers are requested to verify offline worksheet syncing on their class tablets before 3:00 PM today.');

  // ==========================================
  // 7. EDGE MESH SERVER & SYNC STATE
  // ==========================================
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);
  const [cloudSyncStatus, setCloudSyncStatus] = useState({
    synced: true,
    lastTime: 'Today at 08:30 AM',
    recordsCount: 128,
    latency: '42ms (Fiber Edge)'
  });
  const [isPushingCurriculum, setIsPushingCurriculum] = useState(false);
  const [pushProgress, setPushProgress] = useState(0);

  const handleCloudSync = () => {
    setIsCloudSyncing(true);
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step >= 3) {
        clearInterval(interval);
        setIsCloudSyncing(false);
        setCloudSyncStatus({
          synced: true,
          lastTime: 'Just now (' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ')',
          recordsCount: 128,
          latency: '36ms (Optical Edge)'
        });
        showToast('✓ Successfully synced 128 student academic records with Central Academic Repository');
        try { confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } }); } catch (e) {}
      }
    }, 500);
  };

  const handleCurriculumPush = () => {
    setIsPushingCurriculum(true);
    setPushProgress(10);
    const interval = setInterval(() => {
      setPushProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsPushingCurriculum(false);
          showToast('✓ Week 4 Remedial Curriculum & Regional Audio packs pushed to all 34 tablets via Wi-Fi Mesh!');
          try { confetti({ particleCount: 40, spread: 70, origin: { y: 0.7 } }); } catch (e) {}
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  // ==========================================
  // 8. TABLET FLEET STATE
  // ==========================================
  const [fleetSearch, setFleetSearch] = useState('');
  const [fleetFilter, setFleetFilter] = useState('all');
  const [tablets, setTablets] = useState([
    { id: 'TAB-RMP-01', student: 'Rohan Sharma', grade: 'Class 8', roll: 14, battery: 92, charging: false, status: 'online', cache: 100, lastPing: 'Just now', locked: false },
    { id: 'TAB-RMP-02', student: 'Priya Kumari', grade: 'Class 8', roll: 21, battery: 84, charging: false, status: 'online', cache: 100, lastPing: '1m ago', locked: false },
    { id: 'TAB-RMP-03', student: 'Amit Verma', grade: 'Class 9', roll: 7, battery: 45, charging: true, status: 'charging', cache: 98, lastPing: '3m ago', locked: false },
    { id: 'TAB-RMP-04', student: 'Neha Patel', grade: 'Class 7', roll: 19, battery: 78, charging: false, status: 'online', cache: 100, lastPing: '2m ago', locked: false },
    { id: 'TAB-RMP-05', student: 'Vikas Singh', grade: 'Class 8', roll: 32, battery: 18, charging: false, status: 'attention', cache: 82, lastPing: '14m ago', locked: false },
    { id: 'TAB-RMP-06', student: 'Sunita Yadav', grade: 'Class 6', roll: 5, battery: 96, charging: true, status: 'charging', cache: 100, lastPing: 'Just now', locked: false },
    { id: 'TAB-RMP-07', student: 'Deepak Rao', grade: 'Class 10', roll: 11, battery: 67, charging: false, status: 'online', cache: 96, lastPing: '5m ago', locked: false },
    { id: 'TAB-RMP-08', student: 'Kavita Das', grade: 'Class 9', roll: 28, battery: 89, charging: false, status: 'online', cache: 100, lastPing: '1m ago', locked: false },
    { id: 'TAB-RMP-09', student: 'Rahul Kumar', grade: 'Class 7', roll: 16, battery: 54, charging: false, status: 'online', cache: 94, lastPing: '4m ago', locked: false },
    { id: 'TAB-RMP-10', student: 'Ananya Roy', grade: 'Class 8', roll: 3, battery: 88, charging: false, status: 'online', cache: 100, lastPing: 'Just now', locked: false },
    { id: 'TAB-RMP-11', student: 'Sanjay Meena', grade: 'Class 6', roll: 22, battery: 24, charging: true, status: 'charging', cache: 88, lastPing: '8m ago', locked: false },
    { id: 'TAB-RMP-12', student: 'Pooja Tiwari', grade: 'Class 10', roll: 18, battery: 91, charging: false, status: 'online', cache: 100, lastPing: 'Just now', locked: false },
  ]);

  const handlePingDevice = (id) => {
    showToast(`📡 Ping response from ${id}: 12ms latency • Signal: -48dBm (Excellent)`);
  };

  const handleToggleLock = (id) => {
    setTablets(prev => prev.map(tab => {
      if (tab.id === id) {
        const nextState = !tab.locked;
        showToast(nextState ? `🔒 ${id} locked in Exam Mode.` : `🔓 ${id} unlocked for open study.`);
        return { ...tab, locked: nextState };
      }
      return tab;
    }));
  };

  const handleForceSync = (id) => {
    setTablets(prev => prev.map(tab => tab.id === id ? { ...tab, cache: 100, status: 'online' } : tab));
    showToast(`✓ Forced cache synchronization for ${id}: 100% complete.`);
  };

  // ==========================================
  // 9. ACCREDITATION & PRIVATE COMPLIANCE
  // ==========================================
  const [isAccreditationModalOpen, setIsAccreditationModalOpen] = useState(false);
  const [isAttested, setIsAttested] = useState(true);

  // Filters
  const filteredFeatures = platformFeatures.filter(f => {
    if (featureCategoryFilter === 'all') return true;
    return f.category === featureCategoryFilter;
  });

  const filteredStudents = studentsList.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
                          s.parent.toLowerCase().includes(studentSearch.toLowerCase()) ||
                          String(s.roll).includes(studentSearch);
    if (!matchesSearch) return false;
    if (studentGradeFilter !== 'all' && s.grade !== studentGradeFilter) return false;
    return true;
  });

  const filteredCurriculum = curriculumModules.filter(c => {
    if (curriculumGradeFilter !== 'all' && c.grade !== curriculumGradeFilter) return false;
    return true;
  });

  const filteredTablets = tablets.filter(t => {
    const matchesSearch = t.id.toLowerCase().includes(fleetSearch.toLowerCase()) ||
                          t.student.toLowerCase().includes(fleetSearch.toLowerCase()) ||
                          t.grade.toLowerCase().includes(fleetSearch.toLowerCase());
    if (!matchesSearch) return false;
    if (fleetFilter === 'online') return t.status === 'online';
    if (fleetFilter === 'charging') return t.status === 'charging';
    if (fleetFilter === 'attention') return t.status === 'attention';
    return true;
  });

  return (
    <div className="space-y-6 pb-28 max-w-6xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-28 sm:top-20 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-50 w-[92%] max-w-sm sm:w-auto bg-upnavy-950/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl border border-upnavy-700 text-xs flex items-center gap-2.5 animate-fadeIn">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
          <span className="font-semibold text-slate-100">{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Card: Institutional Profile & School Credentials */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-32 bg-radial from-upnavy-100/60 to-transparent pointer-events-none" />

        <div className="space-y-2 z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-upnavy-900 bg-upnavy-100 px-3 py-1 rounded-full border border-upnavy-200 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-upnavy-700" />
              <span>{institution.trustName}</span>
            </span>
            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
              ID: {institution.accreditationCode}
            </span>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
              Classes 6–10 EdTech
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-upnavy-950 tracking-tight flex items-center gap-2">
              <span>{institution.headmistress}</span>
              <span className="text-xs font-bold text-upsaffron-700 bg-upsaffron-50 border border-upsaffron-200 px-2.5 py-0.5 rounded-full">
                {institution.designation}
              </span>
            </h1>

            {/* Edit School Profile Button */}
            <button
              onClick={() => {
                setProfileForm({ ...institution });
                setIsEditProfileModalOpen(true);
              }}
              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition active:scale-95"
              title="Edit School Profile & Credentials"
            >
              <Edit2 className="w-3.5 h-3.5 text-slate-600" />
              <span>Edit School Profile</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            {institution.schoolName} • Block {institution.block} • District {institution.district} • {institution.affiliation}
          </p>
        </div>

        {/* Live System Pills */}
        <div className="flex flex-wrap items-center gap-2.5 z-10">
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-2xl text-xs font-bold text-emerald-900">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Raspberry Pi Node: Online</span>
          </div>
          <div className="flex items-center gap-2 bg-upnavy-50 border border-upnavy-200 px-3.5 py-2 rounded-2xl text-xs font-bold text-upnavy-900">
            <Radio className="w-3.5 h-3.5 text-upnavy-700" />
            <span>Wi-Fi Mesh Active (0 KB cellular)</span>
          </div>
        </div>
      </div>

      {/* 2. Key Administrative Bento Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs hover:border-upnavy-300 transition">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-semibold">Enrolled Students</span>
            <Users className="w-4 h-4 text-upnavy-800" />
          </div>
          <div className="text-3xl font-black text-upnavy-950">{studentsList.length * 10 + 8}</div>
          <div className="text-[11px] text-emerald-700 font-bold mt-1 flex items-center gap-1">
            <span>94.8% Attendance</span>
            <span className="text-slate-400 font-normal">• Gr 6 to 10</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs hover:border-upsaffron-300 transition">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-semibold">Teaching Faculty</span>
            <School className="w-4 h-4 text-upsaffron-600" />
          </div>
          <div className="text-3xl font-black text-upnavy-950">{facultyList.length} / {facultyList.length}</div>
          <div className="text-[11px] text-upsaffron-600 font-bold mt-1">
            100% Present Today
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs hover:border-amber-300 transition">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-semibold">PWA Tablet Fleet</span>
            <HardDrive className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-amber-700">34 Active</div>
          <div className="text-[11px] text-amber-600 font-bold mt-1">
            31 Mesh Synced • 3 Charging
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs hover:border-sky-300 transition">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-semibold">Platform Features</span>
            <Sliders className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-3xl font-black text-sky-800">{platformFeatures.filter(f => f.enabled).length} Active</div>
          <div className="text-[11px] text-sky-600 font-bold mt-1">
            {platformFeatures.length} Configured Modules
          </div>
        </div>
      </div>

      {/* 3. Navigation Switcher Tabs (8 Full Control Panels) */}
      <div className="bg-slate-100 p-1.5 rounded-2xl grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-wrap gap-1.5 border border-slate-200">
        <button
          onClick={() => setActiveTab('features')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeTab === 'features'
              ? 'bg-upnavy-950 text-white shadow-xs'
              : 'text-slate-600 hover:text-upnavy-950 hover:bg-white/70'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 shrink-0" />
          <span>Feature Controls</span>
        </button>

        <button
          onClick={() => setActiveTab('classes')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeTab === 'classes'
              ? 'bg-upnavy-950 text-white shadow-xs'
              : 'text-slate-600 hover:text-upnavy-950 hover:bg-white/70'
          }`}
        >
          <Layers className="w-3.5 h-3.5 shrink-0" />
          <span>Classes & Sections ({classesList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('students')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeTab === 'students'
              ? 'bg-upnavy-950 text-white shadow-xs'
              : 'text-slate-600 hover:text-upnavy-950 hover:bg-white/70'
          }`}
        >
          <Users className="w-3.5 h-3.5 shrink-0" />
          <span>Students Directory</span>
        </button>

        <button
          onClick={() => setActiveTab('curriculum')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeTab === 'curriculum'
              ? 'bg-upnavy-950 text-white shadow-xs'
              : 'text-slate-600 hover:text-upnavy-950 hover:bg-white/70'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 shrink-0" />
          <span>Curriculum (Gr 6–10)</span>
        </button>

        <button
          onClick={() => setActiveTab('faculty')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeTab === 'faculty'
              ? 'bg-upnavy-950 text-white shadow-xs'
              : 'text-slate-600 hover:text-upnavy-950 hover:bg-white/70'
          }`}
        >
          <School className="w-3.5 h-3.5 shrink-0" />
          <span>Faculty & Staff ({facultyList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('mesh')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeTab === 'mesh'
              ? 'bg-upnavy-950 text-white shadow-xs'
              : 'text-slate-600 hover:text-upnavy-950 hover:bg-white/70'
          }`}
        >
          <Server className="w-3.5 h-3.5 shrink-0" />
          <span>Edge Mesh Hub</span>
        </button>

        <button
          onClick={() => setActiveTab('fleet')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeTab === 'fleet'
              ? 'bg-upnavy-950 text-white shadow-xs'
              : 'text-slate-600 hover:text-upnavy-950 hover:bg-white/70'
          }`}
        >
          <HardDrive className="w-3.5 h-3.5 shrink-0" />
          <span>Tablet Fleet (34)</span>
        </button>

        <button
          onClick={() => setActiveTab('accreditation')}
          className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeTab === 'accreditation'
              ? 'bg-upnavy-950 text-white shadow-xs'
              : 'text-slate-600 hover:text-upnavy-950 hover:bg-white/70'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          <span>Accreditation</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: FEATURE CONTROLS & ADD NEW FEATURES ACCORDING TO NEED */}
      {/* ========================================================= */}
      {activeTab === 'features' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-upnavy-950">
                    Platform Feature Access & Modules Management
                  </h2>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                    Full Admin Master Control
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 max-w-xl">
                  Turn platform capabilities on or off in real-time, or add custom new learning and administrative modules according to institutional needs.
                </p>
              </div>

              {/* Master Add Feature Button */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setIsAddFeatureModalOpen(true)}
                  className="px-4 py-2.5 bg-upsaffron-600 hover:bg-upsaffron-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition active:scale-95 shadow-xs shadow-upsaffron-600/30"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add New Feature</span>
                </button>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-semibold text-[11px] mr-1">Category:</span>
              {['all', 'Learning Assistance', 'Infrastructure', 'Network', 'Parent Engagement', 'Accessibility', 'Security & Assessment', 'Evaluation'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFeatureCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                    featureCategoryFilter === cat
                      ? 'bg-upnavy-950 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'All Features' : cat}
                </button>
              ))}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFeatures.map((feat) => (
                <div
                  key={feat.id}
                  className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between space-y-4 ${
                    feat.enabled
                      ? 'bg-white border-slate-200 shadow-xs hover:border-upnavy-400'
                      : 'bg-slate-50/70 border-slate-200/70 opacity-75'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200">
                        {feat.category}
                      </span>
                      <span className="text-[10px] font-bold text-upnavy-800 bg-upnavy-50 px-2 py-0.5 rounded-full border border-upnavy-200">
                        {feat.targetGrade}
                      </span>
                    </div>

                    <h3 className="font-bold text-upnavy-950 text-sm flex items-center gap-1.5">
                      <span>{feat.name}</span>
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>

                  {/* Footer with Toggle and Delete if Custom */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleFeature(feat.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                          feat.enabled
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                        }`}
                      >
                        {feat.enabled ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Active / Enabled</span>
                          </>
                        ) : (
                          <>
                            <X className="w-3.5 h-3.5" />
                            <span>Disabled</span>
                          </>
                        )}
                      </button>
                    </div>

                    {!feat.isCore && (
                      <button
                        onClick={() => handleDeleteFeature(feat.id, feat.name)}
                        className="text-rose-500 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50 transition"
                        title="Delete custom feature"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: CLASSES & SECTIONS MANAGER (ADD, EDIT & DELETE) */}
      {/* ========================================================= */}
      {activeTab === 'classes' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-upnavy-950">
                    Classes & Academic Sections Management
                  </h2>
                  <span className="text-xs font-bold text-upnavy-800 bg-upnavy-100 px-2.5 py-0.5 rounded-full border border-upnavy-200">
                    {classesList.length} Active Sections (Grades 6–10)
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1 max-w-xl">
                  Configure classrooms, assign class teachers, set maximum student intake, and manage curriculum tracks.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingClass(null);
                  setClassForm({
                    grade: 'Class 8',
                    section: 'B',
                    room: 'Room 105',
                    teacher: 'Anjali Gupta',
                    students: 25,
                    stream: 'Middle School Core'
                  });
                  setIsAddClassModalOpen(true);
                }}
                className="px-4 py-2.5 bg-upnavy-950 hover:bg-upnavy-900 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition active:scale-95 shadow-xs"
              >
                <Plus className="w-4 h-4 text-upsaffron-400" />
                <span>+ Add New Class</span>
              </button>
            </div>

            {/* Classes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classesList.map((cls) => (
                <div key={cls.id} className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-upnavy-400 transition space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-extrabold text-upsaffron-700">{cls.grade} • Section {cls.section}</div>
                      <div className="text-base font-black text-upnavy-950">{cls.room}</div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {cls.attendance} Attendance
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="text-slate-500 flex items-center justify-between">
                      <span>Assigned Class Teacher:</span>
                      <strong className="text-slate-800">{cls.teacher}</strong>
                    </div>
                    <div className="text-slate-500 flex items-center justify-between">
                      <span>Enrolled Capacity:</span>
                      <strong className="text-slate-800">{cls.students} Students</strong>
                    </div>
                    <div className="text-slate-500 flex items-center justify-between">
                      <span>Stream / Focus:</span>
                      <strong className="text-upnavy-900">{cls.stream}</strong>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        setEditingClass(cls);
                        setClassForm({
                          grade: cls.grade,
                          section: cls.section,
                          room: cls.room,
                          teacher: cls.teacher,
                          students: cls.students,
                          stream: cls.stream
                        });
                        setIsAddClassModalOpen(true);
                      }}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1 transition"
                    >
                      <Edit2 className="w-3 h-3 text-slate-500" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => handleDeleteClass(cls.id, `${cls.grade}-${cls.section}`)}
                      className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition"
                      title="Delete class section"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: STUDENTS DIRECTORY (ADD, EDIT, FILTER & REMOVE) */}
      {/* ========================================================= */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-upnavy-950">
                    Student Admissions & Academic Directory
                  </h2>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                    {studentsList.length} Registered Students
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Enrol new students, update contact information, and monitor individual diagnostic attendance across Classes 6 to 10.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingStudent(null);
                  setStudentForm({
                    name: '',
                    grade: 'Class 8',
                    roll: '',
                    parent: '',
                    contact: '',
                    status: 'Active'
                  });
                  setIsAddStudentModalOpen(true);
                }}
                className="px-4 py-2.5 bg-upsaffron-600 hover:bg-upsaffron-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition active:scale-95 shadow-xs shadow-upsaffron-600/30"
              >
                <Plus className="w-4 h-4" />
                <span>+ Enrol New Student</span>
              </button>
            </div>

            {/* Search and Grade Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search student name, roll number, or parent..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="w-full text-xs pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {['all', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'].map((gr) => (
                  <button
                    key={gr}
                    onClick={() => setStudentGradeFilter(gr)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                      studentGradeFilter === gr
                        ? 'bg-upnavy-950 text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {gr === 'all' ? 'All Classes' : gr}
                  </button>
                ))}
              </div>
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                    <th className="py-3 px-3">Student Name & Roll</th>
                    <th className="py-3 px-3">Grade</th>
                    <th className="py-3 px-3">Guardian / Mobile</th>
                    <th className="py-3 px-3">Attendance</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-3">
                        <div className="font-bold text-upnavy-950 text-sm">{st.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">Roll #{st.roll} • {st.id}</div>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-bold text-upnavy-900 bg-upnavy-50 px-2 py-0.5 rounded-lg border border-upnavy-200 text-xs">
                          {st.grade}
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-700">{st.parent}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{st.contact}</div>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-bold text-emerald-800 text-xs">{st.attendance}%</span>
                      </td>

                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          st.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}>
                          {st.status}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setEditingStudent(st);
                              setStudentForm({
                                name: st.name,
                                grade: st.grade,
                                roll: st.roll,
                                parent: st.parent,
                                contact: st.contact,
                                status: st.status
                              });
                              setIsAddStudentModalOpen(true);
                            }}
                            className="p-1.5 text-slate-600 hover:text-upnavy-900 hover:bg-slate-100 rounded-lg transition"
                            title="Edit Student"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteStudent(st.id, st.name)}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                            title="Delete Student"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: CURRICULUM & MODULES (ADD & MANAGE MODULES) */}
      {/* ========================================================= */}
      {activeTab === 'curriculum' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-upnavy-950">
                    Curriculum & Course Chapters (Classes 6–10)
                  </h2>
                  <span className="text-xs font-bold text-upsaffron-800 bg-upsaffron-100 px-2.5 py-0.5 rounded-full border border-upsaffron-300">
                    {curriculumModules.length} Active Modules
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Manage syllabus coverage, configure regional audio packs, and add new chapters for students across all classes.
                </p>
              </div>

              <button
                onClick={() => setIsAddModuleModalOpen(true)}
                className="px-4 py-2.5 bg-upnavy-950 hover:bg-upnavy-900 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition active:scale-95 shadow-xs"
              >
                <Plus className="w-4 h-4 text-upsaffron-400" />
                <span>+ Add New Chapter</span>
              </button>
            </div>

            {/* Filter by Grade */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-slate-400 font-semibold text-xs mr-1">Filter Grade:</span>
              {['all', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'].map((gr) => (
                <button
                  key={gr}
                  onClick={() => setCurriculumGradeFilter(gr)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                    curriculumGradeFilter === gr
                      ? 'bg-upnavy-950 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {gr === 'all' ? 'All Classes' : gr}
                </button>
              ))}
            </div>

            {/* Curriculum Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCurriculum.map((mod) => (
                <div key={mod.id} className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-upnavy-400 transition space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-upsaffron-700 bg-upsaffron-50 px-2.5 py-0.5 rounded-full border border-upsaffron-200">
                      {mod.grade} • {mod.subject}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {mod.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-upnavy-950 text-sm leading-snug">
                    {mod.title}
                  </h3>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>{mod.chapters} Lesson Chapters</span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      10 Lang Audio Ready
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: FACULTY & STAFF PROGRESS (ADD & MANAGE) */}
      {/* ========================================================= */}
      {activeTab === 'faculty' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-upnavy-950">
                    Teaching Staff & Syllabus Coverage (Academic Year 2026-27)
                  </h2>
                  <span className="text-xs font-bold text-upsaffron-800 bg-upsaffron-100 px-2.5 py-0.5 rounded-full border border-upsaffron-300">
                    {facultyList.length} Faculty Members
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Track individual teacher attendance, curriculum progress, lesson plan submissions, and broadcast administrative circulars.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => setIsAddFacultyModalOpen(true)}
                  className="px-4 py-2.5 bg-upsaffron-600 hover:bg-upsaffron-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition active:scale-95 shadow-xs shadow-upsaffron-600/30"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Faculty</span>
                </button>

                <button
                  onClick={() => setIsNoticeModalOpen(true)}
                  className="px-4 py-2.5 bg-upnavy-950 hover:bg-upnavy-900 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition active:scale-95 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5 text-upsaffron-400" />
                  <span>Broadcast Circular</span>
                </button>
              </div>
            </div>

            {/* Faculty Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                    <th className="py-3 px-3">Faculty Member</th>
                    <th className="py-3 px-3">Subject & Classes</th>
                    <th className="py-3 px-3">Attendance</th>
                    <th className="py-3 px-3">Syllabus Covered</th>
                    <th className="py-3 px-3">Weekly Lesson Plan</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {facultyList.map((fac) => (
                    <tr key={fac.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-upnavy-950 text-sm">{fac.name}</div>
                        <div className="text-[11px] text-slate-400">{fac.role}</div>
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="font-semibold text-slate-700">{fac.subject}</div>
                        <div className="text-[10px] text-slate-400">Class 6–10 Curricula</div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          {fac.attendance}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 min-w-[140px]">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="font-bold text-upnavy-900">{fac.syllabus}%</span>
                          <span className="text-[10px] text-slate-400">On Track</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-upsaffron-600 rounded-full"
                            style={{ width: `${fac.syllabus}%` }}
                          />
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                            fac.planStatus === 'Approved'
                              ? 'bg-slate-100 text-slate-700 border border-slate-200'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}
                        >
                          {fac.planStatus}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        {fac.planStatus === 'Pending Review' ? (
                          <button
                            onClick={() => handleApprovePlan(fac.id)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold transition active:scale-95"
                          >
                            Approve Plan
                          </button>
                        ) : (
                          <span className="text-slate-400 text-[11px]">✓ Approved</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Academic Standards Summary */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-700">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-upnavy-800 shrink-0" />
                <span>
                  <strong>Academic Schedule Compliance:</strong> All core subjects across Classes 6 to 10 meet Model Academic Council milestone pacing guidelines.
                </span>
              </div>
              <span className="text-[11px] font-bold text-upnavy-900 bg-white px-3 py-1 rounded-full border border-slate-300">
                Next Evaluation: Unit Test 2 (Nov 15)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 6: EDGE MESH SERVER NODE & WI-FI MESH */}
      {/* ========================================================= */}
      {activeTab === 'mesh' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-upnavy-100 text-upnavy-900 flex items-center justify-center font-bold border border-upnavy-200 shrink-0">
                  <Server className="w-6 h-6 text-upnavy-800" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-upnavy-950">
                      Community Edge Node (Raspberry Pi 5 Hub)
                    </h2>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                      Active Node #01
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 max-w-xl">
                    Broadcasting zero-cost offline Wi-Fi mesh across the entire campus. Students download worksheets, interact with simulations, and submit diagnostic quizzes without cellular data.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={handleCloudSync}
                  disabled={isCloudSyncing}
                  className="px-4 py-2.5 bg-upnavy-950 hover:bg-upnavy-900 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition active:scale-95 disabled:opacity-60 shadow-xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isCloudSyncing ? 'animate-spin' : ''}`} />
                  <span>{isCloudSyncing ? 'Syncing Records...' : 'Sync Edge with Central Cloud'}</span>
                </button>

                <button
                  onClick={handleCurriculumPush}
                  disabled={isPushingCurriculum}
                  className="px-4 py-2.5 bg-upsaffron-600 hover:bg-upsaffron-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition active:scale-95 disabled:opacity-60 shadow-xs shadow-upsaffron-600/30"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isPushingCurriculum ? `Pushing (${pushProgress}%)` : 'Push Curriculum to All Tablets'}</span>
                </button>
              </div>
            </div>

            {/* Curriculum Push Progress Bar (if active) */}
            {isPushingCurriculum && (
              <div className="p-4 rounded-2xl bg-upsaffron-50 border border-upsaffron-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-upsaffron-950">
                  <span>Broadcasting Week 4 Multilingual Bundles via Wi-Fi Multicast...</span>
                  <span>{pushProgress}%</span>
                </div>
                <div className="w-full h-2.5 bg-upsaffron-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-upsaffron-600 transition-all duration-300 rounded-full"
                    style={{ width: `${pushProgress}%` }}
                  />
                </div>
                <div className="text-[11px] text-upsaffron-800">
                  Simultaneous packet transfer to 34 connected tablets over 5GHz Wi-Fi (Estimated time: 1.5s)
                </div>
              </div>
            )}

            {/* Edge Server Hardware & Network Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hardware Health</span>
                  <Cpu className="w-4 h-4 text-upnavy-800" />
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Processor:</span>
                    <strong className="text-upnavy-950 font-mono">Broadcom BCM2712 Quad 2.4GHz</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">RAM Utilization:</span>
                    <strong className="text-emerald-700">1.8 GB / 8.0 GB (22.5%)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">CPU Temperature:</span>
                    <strong className="text-emerald-700">41.2°C (Passive Heatsink)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Local Cache:</span>
                    <strong className="text-upnavy-950 font-mono">128 GB NVMe SSD (84% Free)</strong>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mesh Network Access</span>
                  <Wifi className="w-4 h-4 text-upsaffron-600" />
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600">SSID Broadcast:</span>
                    <strong className="text-upnavy-950 font-mono">GyanSetu-Campus-Mesh</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Connected Tablets:</span>
                    <strong className="text-emerald-700">34 Devices Active</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Mesh Protocol:</span>
                    <strong className="text-upnavy-950">BATMAN-adv 802.11s</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Cellular Data Saved:</span>
                    <strong className="text-upsaffron-700 font-bold">142.6 GB this month</strong>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cloud Sync Telemetry</span>
                  <Activity className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Sync Status:</span>
                    <strong className="text-emerald-700">✓ Up to Date</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Last Synced:</span>
                    <strong className="text-slate-700">{cloudSyncStatus.lastTime}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Sync Mode:</span>
                    <strong className="text-upnavy-950">Opportunistic Store & Forward</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Network Latency:</span>
                    <strong className="text-upnavy-950 font-mono">{cloudSyncStatus.latency}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 7: TABLET FLEET MANAGEMENT (REMOTE ACTIONS) */}
      {/* ========================================================= */}
      {activeTab === 'fleet' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-upnavy-950">
                    Classroom Device Fleet (34 Smart Tablets)
                  </h2>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                    31 Online • 3 Charging
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Monitor individual tablet battery levels, force offline curriculum caches, and remotely lock devices into Exam Mode.
                </p>
              </div>

              {/* Quick Fleet Action */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setTablets(prev => prev.map(t => ({ ...t, cache: 100, status: 'online' })));
                    showToast('✓ Cache synchronized to 100% across all 34 tablets!');
                  }}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Sync All Caches</span>
                </button>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search device ID, student, or grade..."
                  value={fleetSearch}
                  onChange={(e) => setFleetSearch(e.target.value)}
                  className="w-full text-xs pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                />
              </div>

              <div className="flex items-center gap-1.5">
                {['all', 'online', 'charging', 'attention'].map((flt) => (
                  <button
                    key={flt}
                    onClick={() => setFleetFilter(flt)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition ${
                      fleetFilter === flt
                        ? 'bg-upnavy-950 text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {flt}
                  </button>
                ))}
              </div>
            </div>

            {/* Tablet Fleet Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                    <th className="py-3 px-3">Device ID</th>
                    <th className="py-3 px-3">Assigned Student</th>
                    <th className="py-3 px-3">Grade</th>
                    <th className="py-3 px-3">Battery</th>
                    <th className="py-3 px-3">Offline Cache</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Remote Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTablets.map((tab) => (
                    <tr key={tab.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3 px-3 font-mono font-bold text-upnavy-950">
                        {tab.id}
                      </td>

                      <td className="py-3 px-3 font-semibold text-slate-800">
                        {tab.student}
                      </td>

                      <td className="py-3 px-3 text-slate-500">
                        {tab.grade} (Roll #{tab.roll})
                      </td>

                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5">
                          {tab.charging ? (
                            <BatteryCharging className="w-4 h-4 text-emerald-600" />
                          ) : tab.battery < 20 ? (
                            <Battery className="w-4 h-4 text-rose-500" />
                          ) : (
                            <Battery className="w-4 h-4 text-slate-600" />
                          )}
                          <span
                            className={`font-bold font-mono ${
                              tab.battery < 20 ? 'text-rose-600' : 'text-slate-700'
                            }`}
                          >
                            {tab.battery}%
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-3 min-w-[120px]">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-600 rounded-full"
                              style={{ width: `${tab.cache}%` }}
                            />
                          </div>
                          <span className="font-mono text-[10px] text-slate-400 font-bold">{tab.cache}%</span>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            tab.status === 'online'
                              ? 'bg-emerald-100 text-emerald-800'
                              : tab.status === 'charging'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              tab.status === 'online'
                                ? 'bg-emerald-600'
                                : tab.status === 'charging'
                                ? 'bg-blue-600'
                                : 'bg-rose-600'
                            }`}
                          />
                          {tab.status}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handlePingDevice(tab.id)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
                            title="Ping Device"
                          >
                            <Radio className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleForceSync(tab.id)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
                            title="Force Sync Cache"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleToggleLock(tab.id)}
                            className={`p-1.5 rounded-lg transition ${
                              tab.locked
                                ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                            title={tab.locked ? 'Unlock Tablet' : 'Lock in Exam Mode'}
                          >
                            {tab.locked ? (
                              <Lock className="w-3.5 h-3.5 text-rose-600" />
                            ) : (
                              <Unlock className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 8: ACCREDITATION & PRIVATE COMPLIANCE */}
      {/* ========================================================= */}
      {activeTab === 'accreditation' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-upnavy-950">
                    Institutional Accreditation & Compliance (2026-27)
                  </h2>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                    100% Saturation Certified
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Private education accreditation metrics, scholarship disbursals, gender parity, and digital infrastructure audit records.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setIsAccreditationModalOpen(true)}
                  className="px-4 py-2 bg-upnavy-950 hover:bg-upnavy-900 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition active:scale-95 shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5 text-upsaffron-400" />
                  <span>View Accreditation Certificate</span>
                </button>
              </div>
            </div>

            {/* School Registration Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <span className="text-slate-400 block text-[11px]">School Category</span>
                <span className="font-bold text-upnavy-950">Upper Primary & Secondary (Gr 6–10)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Management Foundation</span>
                <span className="font-bold text-upnavy-950">{institution.trustName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Campus Code</span>
                <span className="font-bold text-upnavy-950">{institution.accreditationCode}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Affiliation Board</span>
                <span className="font-bold text-upnavy-950">{institution.affiliation}</span>
              </div>
            </div>

            {/* Demographics & Gender Ratio */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-upnavy-950 flex items-center gap-2">
                <Users className="w-4 h-4 text-upnavy-800" />
                <span>Student Enrollment & Inclusivity Distribution (128 Students)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <div className="text-xs text-slate-500 font-semibold">Boys Enrolled</div>
                  <div className="text-2xl font-black text-upnavy-950">68 <span className="text-xs font-normal text-slate-400">(53.1%)</span></div>
                  <div className="text-[11px] text-emerald-700 font-bold">94.2% Regular Attendance</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <div className="text-xs text-slate-500 font-semibold">Girls Enrolled</div>
                  <div className="text-2xl font-black text-upnavy-950">60 <span className="text-xs font-normal text-slate-400">(46.9%)</span></div>
                  <div className="text-[11px] text-emerald-700 font-bold">95.4% (+14.6% YoY growth)</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <div className="text-xs text-slate-500 font-semibold">Scholarship Mappings</div>
                  <div className="text-xs font-bold text-upnavy-950 mt-1 space-y-0.5">
                    <div>Merit Trust: 58 • Need-Based: 34</div>
                    <div>STEM Scholars: 24 • Sports: 12</div>
                  </div>
                  <div className="text-[10px] text-emerald-700 font-bold">100% Tuition Assistance Funded</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <div className="text-xs text-slate-500 font-semibold">CWSN (Special Learning)</div>
                  <div className="text-2xl font-black text-upnavy-950">3 <span className="text-xs font-normal text-slate-400">Students</span></div>
                  <div className="text-[11px] text-upsaffron-700 font-bold">Full Audio-First Support</div>
                </div>
              </div>
            </div>

            {/* Private Trust Welfare & Infrastructure Tracker */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-upnavy-950 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-upnavy-800" />
                <span>Private Education & Merit Scholarships Saturation (100%)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-emerald-950">
                    <span>Mid-Day Nutrition Scheme</span>
                    <span className="text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-300 text-[10px]">Active</span>
                  </div>
                  <div className="text-slate-600">
                    128/128 students served hot nutritional meals today. Menu: Dal, Roti, Seasonal Sabzi & Fresh Fruit.
                  </div>
                  <div className="text-[11px] text-emerald-800 font-bold">✓ Monitored by School Management Committee</div>
                </div>

                <div className="p-4 rounded-2xl bg-upnavy-50/70 border border-upnavy-200 space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-upnavy-950">
                    <span>Digital Study Materials & Kits</span>
                    <span className="text-upnavy-800 bg-white px-2 py-0.5 rounded-full border border-upnavy-300 text-[10px]">100% Done</span>
                  </div>
                  <div className="text-slate-600">
                    Complete textbooks, notebooks, and digital offline tablets distributed to every enrolled learner.
                  </div>
                  <div className="text-[11px] text-upnavy-800 font-bold">✓ Direct institutional disbarment verified</div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-amber-950">
                    <span>Digital & Green Lab Infrastructure</span>
                    <span className="text-amber-800 bg-white px-2 py-0.5 rounded-full border border-amber-300 text-[10px]">Certified</span>
                  </div>
                  <div className="text-slate-600">
                    Solar powered ICT lab, clean RO drinking water plant, and functional separate gender toilets.
                  </div>
                  <div className="text-[11px] text-amber-800 font-bold">✓ 5-Star Campus Hygiene rated</div>
                </div>
              </div>
            </div>

            {/* Principal Attestation Stamp */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs font-bold text-upnavy-950">
                  Principal Electronic Attestation & Digital Stamp
                </div>
                <div className="text-xs text-slate-500">
                  Digitally certified under GyanSetu Institutional Academic Council (IT Standards 2026).
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setIsAttested(!isAttested);
                    showToast(isAttested ? 'Attestation unverified.' : '✓ Principal signature and digital seal attested successfully!');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                    isAttested
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{isAttested ? 'Digitally Sealed & Attested' : 'Click to Attest'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 1: EDIT INSTITUTIONAL PROFILE */}
      {/* ========================================================= */}
      {isEditProfileModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-upnavy-950 text-white flex items-center justify-center">
                  <Edit2 className="w-4 h-4 text-upsaffron-400" />
                </div>
                <div>
                  <h3 className="text-base font-black text-upnavy-950">Edit Institutional Profile</h3>
                  <p className="text-xs text-slate-500">Configure private school credentials & leadership</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditProfileModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">School Name</label>
                <input
                  type="text"
                  value={profileForm.schoolName}
                  onChange={(e) => setProfileForm({ ...profileForm, schoolName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Education Trust / Management Foundation</label>
                <input
                  type="text"
                  value={profileForm.trustName}
                  onChange={(e) => setProfileForm({ ...profileForm, trustName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Headmistress / Principal</label>
                  <input
                    type="text"
                    value={profileForm.headmistress}
                    onChange={(e) => setProfileForm({ ...profileForm, headmistress: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Designation</label>
                  <input
                    type="text"
                    value={profileForm.designation}
                    onChange={(e) => setProfileForm({ ...profileForm, designation: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Affiliation Board</label>
                  <input
                    type="text"
                    value={profileForm.affiliation}
                    onChange={(e) => setProfileForm({ ...profileForm, affiliation: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Accreditation Code</label>
                  <input
                    type="text"
                    value={profileForm.accreditationCode}
                    onChange={(e) => setProfileForm({ ...profileForm, accreditationCode: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Toll-Free Helpline</label>
                  <input
                    type="text"
                    value={profileForm.helpline}
                    onChange={(e) => setProfileForm({ ...profileForm, helpline: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Administrative Email</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditProfileModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-upnavy-950 hover:bg-upnavy-900 text-white font-bold rounded-xl transition active:scale-95 shadow-xs"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: ADD NEW PLATFORM FEATURE (ACCORDING TO NEED) */}
      {/* ========================================================= */}
      {isAddFeatureModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-upsaffron-600 text-white flex items-center justify-center">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-upnavy-950">Add New Platform Feature</h3>
                  <p className="text-xs text-slate-500">Deploy custom modules and capabilities according to need</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddFeatureModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddFeature} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Feature Name</label>
                <input
                  type="text"
                  placeholder="e.g. Virtual Science Lab Simulator, Spoken English Practice"
                  value={newFeatureForm.name}
                  onChange={(e) => setNewFeatureForm({ ...newFeatureForm, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={newFeatureForm.category}
                    onChange={(e) => setNewFeatureForm({ ...newFeatureForm, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                  >
                    <option value="Learning Assistance">Learning Assistance</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Network">Network</option>
                    <option value="Parent Engagement">Parent Engagement</option>
                    <option value="Accessibility">Accessibility</option>
                    <option value="Security & Assessment">Security & Assessment</option>
                    <option value="Evaluation">Evaluation</option>
                    <option value="Collaboration">Collaboration</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Audience</label>
                  <select
                    value={newFeatureForm.targetGrade}
                    onChange={(e) => setNewFeatureForm({ ...newFeatureForm, targetGrade: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                  >
                    <option value="Classes 6 to 10">Classes 6 to 10</option>
                    <option value="All Classes">All Classes</option>
                    <option value="Classes 6 to 8">Classes 6 to 8</option>
                    <option value="Classes 9 & 10">Classes 9 & 10</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description / Purpose</label>
                <textarea
                  rows={3}
                  placeholder="Detail what this feature does, how it works offline, and how it helps students or teachers..."
                  value={newFeatureForm.description}
                  onChange={(e) => setNewFeatureForm({ ...newFeatureForm, description: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800 leading-relaxed"
                  required
                />
              </div>

              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  id="feat-enable-checkbox"
                  checked={newFeatureForm.enabled}
                  onChange={(e) => setNewFeatureForm({ ...newFeatureForm, enabled: e.target.checked })}
                  className="w-4 h-4 rounded text-upsaffron-600 focus:ring-upsaffron-500"
                />
                <label htmlFor="feat-enable-checkbox" className="text-slate-800 font-semibold cursor-pointer">
                  Enable this feature immediately upon deployment
                </label>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddFeatureModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-upsaffron-600 hover:bg-upsaffron-700 text-white font-bold rounded-xl transition active:scale-95 shadow-xs shadow-upsaffron-600/30"
                >
                  Deploy Feature Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: ADD / EDIT CLASS SECTION */}
      {/* ========================================================= */}
      {isAddClassModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-upnavy-950 text-white flex items-center justify-center">
                  <Layers className="w-4 h-4 text-upsaffron-400" />
                </div>
                <div>
                  <h3 className="text-base font-black text-upnavy-950">
                    {editingClass ? 'Edit Class Section' : 'Add New Class Section'}
                  </h3>
                  <p className="text-xs text-slate-500">Configure grade, classroom and faculty lead</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddClassModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveClass} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Grade</label>
                  <select
                    value={classForm.grade}
                    onChange={(e) => setClassForm({ ...classForm, grade: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                  >
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Section</label>
                  <input
                    type="text"
                    value={classForm.section}
                    onChange={(e) => setClassForm({ ...classForm, section: e.target.value.toUpperCase() })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800 font-bold"
                    placeholder="A, B, C..."
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Room Number</label>
                  <input
                    type="text"
                    value={classForm.room}
                    onChange={(e) => setClassForm({ ...classForm, room: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                    placeholder="Room 105"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Max Capacity</label>
                  <input
                    type="number"
                    value={classForm.students}
                    onChange={(e) => setClassForm({ ...classForm, students: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Assigned Class Teacher</label>
                <select
                  value={classForm.teacher}
                  onChange={(e) => setClassForm({ ...classForm, teacher: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                >
                  {facultyList.map(f => (
                    <option key={f.id} value={f.name}>{f.name} ({f.role})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Stream / Curriculum Track</label>
                <input
                  type="text"
                  value={classForm.stream}
                  onChange={(e) => setClassForm({ ...classForm, stream: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                  placeholder="e.g. Middle School Core, Secondary Board Prep"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddClassModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-upnavy-950 hover:bg-upnavy-900 text-white font-bold rounded-xl transition active:scale-95 shadow-xs"
                >
                  {editingClass ? 'Save Changes' : 'Create Class'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 4: ADD / EDIT STUDENT */}
      {/* ========================================================= */}
      {isAddStudentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-upsaffron-600 text-white flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-upnavy-950">
                    {editingStudent ? 'Edit Student Details' : 'Enrol New Student'}
                  </h3>
                  <p className="text-xs text-slate-500">Student registration and guardian record</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddStudentModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveStudent} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Student Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Pooja Meena"
                  value={studentForm.name}
                  onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Admitted Grade</label>
                  <select
                    value={studentForm.grade}
                    onChange={(e) => setStudentForm({ ...studentForm, grade: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                  >
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Class Roll Number</label>
                  <input
                    type="number"
                    placeholder="e.g. 24"
                    value={studentForm.roll}
                    onChange={(e) => setStudentForm({ ...studentForm, roll: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Parent / Guardian Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Mohan Meena"
                    value={studentForm.parent}
                    onChange={(e) => setStudentForm({ ...studentForm, parent: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Guardian Mobile (SMS / Call)</label>
                  <input
                    type="text"
                    placeholder="98765-XXXXX"
                    value={studentForm.contact}
                    onChange={(e) => setStudentForm({ ...studentForm, contact: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Academic Status</label>
                <select
                  value={studentForm.status}
                  onChange={(e) => setStudentForm({ ...studentForm, status: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                >
                  <option value="Active">Active (In Good Standing)</option>
                  <option value="Attention">Attention (Remedial Needed)</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddStudentModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-upsaffron-600 hover:bg-upsaffron-700 text-white font-bold rounded-xl transition active:scale-95 shadow-xs shadow-upsaffron-600/30"
                >
                  {editingStudent ? 'Save Student Record' : 'Enrol Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 5: ADD NEW COURSE CHAPTER */}
      {/* ========================================================= */}
      {isAddModuleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-upnavy-950 text-white flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-upsaffron-400" />
                </div>
                <div>
                  <h3 className="text-base font-black text-upnavy-950">Add New Course Chapter</h3>
                  <p className="text-xs text-slate-500">Expand curriculum coverage for Classes 6 to 10</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModuleModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddModule} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Grade</label>
                  <select
                    value={moduleForm.grade}
                    onChange={(e) => setModuleForm({ ...moduleForm, grade: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                  >
                    <option value="Class 6">Class 6</option>
                    <option value="Class 7">Class 7</option>
                    <option value="Class 8">Class 8</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subject</label>
                  <select
                    value={moduleForm.subject}
                    onChange={(e) => setModuleForm({ ...moduleForm, subject: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Science">Science</option>
                    <option value="Social Science">Social Science</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Digital Literacy">Digital Literacy</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Chapter Title & Key Topics</label>
                <input
                  type="text"
                  placeholder="e.g. Chapter 4: Linear Equations & Graphs"
                  value={moduleForm.title}
                  onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                  required
                />
              </div>

              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  id="mod-audio-checkbox"
                  checked={moduleForm.audioSync}
                  onChange={(e) => setModuleForm({ ...moduleForm, audioSync: e.target.checked })}
                  className="w-4 h-4 rounded text-upsaffron-600 focus:ring-upsaffron-500"
                />
                <label htmlFor="mod-audio-checkbox" className="text-slate-800 font-semibold cursor-pointer">
                  Auto-generate regional audio narration in 10 languages
                </label>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModuleModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-upnavy-950 hover:bg-upnavy-900 text-white font-bold rounded-xl transition active:scale-95 shadow-xs"
                >
                  Publish Chapter to Mesh
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 6: ADD NEW FACULTY MEMBER */}
      {/* ========================================================= */}
      {isAddFacultyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-upsaffron-600 text-white flex items-center justify-center">
                  <School className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-upnavy-950">Add Teaching Faculty Member</h3>
                  <p className="text-xs text-slate-500">Register teacher and assign curriculum subjects</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddFacultyModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddFaculty} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Faculty Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Anand Shukla"
                  value={facultyForm.name}
                  onChange={(e) => setFacultyForm({ ...facultyForm, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Designation & Role</label>
                <input
                  type="text"
                  placeholder="e.g. Senior TGT Mathematics"
                  value={facultyForm.role}
                  onChange={(e) => setFacultyForm({ ...facultyForm, role: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Subjects & Grade Range</label>
                <input
                  type="text"
                  placeholder="e.g. Physics & Mathematics (Gr 8-10)"
                  value={facultyForm.subject}
                  onChange={(e) => setFacultyForm({ ...facultyForm, subject: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 text-slate-800"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddFacultyModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-upsaffron-600 hover:bg-upsaffron-700 text-white font-bold rounded-xl transition active:scale-95 shadow-xs shadow-upsaffron-600/30"
                >
                  Register Faculty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 7: BROADCAST STAFF CIRCULAR */}
      {/* ========================================================= */}
      {isNoticeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-upnavy-100 text-upnavy-900 flex items-center justify-center font-bold">
                  <Send className="w-4 h-4 text-upnavy-800" />
                </div>
                <h3 className="text-base font-bold text-upnavy-950">Broadcast Faculty Circular</h3>
              </div>
              <button
                onClick={() => setIsNoticeModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Official Circular Content:</label>
              <textarea
                value={noticeText}
                onChange={(e) => setNoticeText(e.target.value)}
                rows={4}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-upnavy-600 text-slate-800 leading-relaxed"
              />
              <p className="text-[11px] text-slate-400">
                This notice will be immediately broadcast to all {facultyList.length} teacher dashboards and local offline PWA notifications.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setIsNoticeModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsNoticeModalOpen(false);
                  showToast(`✓ Official Circular successfully broadcast to all ${facultyList.length} teachers!`);
                }}
                className="px-5 py-2 bg-upsaffron-600 hover:bg-upsaffron-700 text-white font-bold text-xs rounded-xl transition active:scale-95 shadow-xs shadow-upsaffron-600/30"
              >
                Send Circular Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 8: ACCREDITATION CERTIFICATE (PRINTABLE) */}
      {/* ========================================================= */}
      {isAccreditationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-4 sm:p-8 shadow-2xl border border-slate-200 space-y-5 sm:space-y-6 animate-in fade-in zoom-in-95 my-4 sm:my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-upnavy-950 text-white flex items-center justify-center font-bold text-lg">
                  🏛️
                </div>
                <div>
                  <h3 className="text-base font-black text-upnavy-950">
                    Institutional Accreditation Certificate 2026-27
                  </h3>
                  <p className="text-xs text-slate-500">
                    {institution.trustName} • Autonomous Academic Council
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAccreditationModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">School Name</span>
                  <span className="font-bold text-upnavy-950">{institution.schoolName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Campus Code</span>
                  <span className="font-bold font-mono text-upnavy-950">{institution.accreditationCode}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">District / Block</span>
                  <span className="font-bold text-upnavy-950">{institution.district} / {institution.block}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Headmistress</span>
                  <span className="font-bold text-upnavy-950">{institution.headmistress}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-upnavy-950">Compliance & Saturation Indicators:</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-400 text-[10px] block">Students Enrolled</span>
                    <span className="font-black text-upnavy-950 text-sm">128 Students</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-400 text-[10px] block">Gender Parity</span>
                    <span className="font-black text-upnavy-950 text-sm">46.9% Girls (95.4% Att.)</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-400 text-[10px] block">Faculty Ratio</span>
                    <span className="font-black text-upnavy-950 text-sm">1:16 (8 Teachers)</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-400 text-[10px] block">Mid-Day Meal Saturation</span>
                    <span className="font-black text-emerald-700 text-sm">100% Saturation</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-400 text-[10px] block">Textbooks & Kits</span>
                    <span className="font-black text-emerald-700 text-sm">100% Disbursed</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-400 text-[10px] block">Solar & ICT Lab</span>
                    <span className="font-black text-emerald-700 text-sm">34 Tablets Operational</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-mono text-[10px] text-slate-400">DIGITAL CERTIFICATE ID</div>
                  <div className="font-mono font-bold text-upnavy-950">GS-PVT-2026-RMP-092801</div>
                </div>
                <div className="p-2 bg-emerald-100 border border-emerald-300 rounded-xl text-center">
                  <div className="text-[10px] font-extrabold text-emerald-900 uppercase">✓ VERIFIED & SEALED</div>
                  <div className="text-[9px] text-emerald-700">{institution.headmistress} ({institution.designation})</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-2 transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Certificate</span>
              </button>

              <button
                onClick={() => {
                  setIsAccreditationModalOpen(false);
                  showToast('✓ Official accreditation compliance report downloaded successfully.');
                }}
                className="px-5 py-2.5 bg-upnavy-950 hover:bg-upnavy-900 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition active:scale-95 shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-upsaffron-400" />
                <span>Download Official PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
