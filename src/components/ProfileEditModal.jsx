import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Check, 
  Sparkles, 
  School, 
  Phone, 
  Globe, 
  Award, 
  BookOpen, 
  Hash, 
  Save, 
  UserCheck, 
  Camera,
  MapPin,
  Flame,
  Target,
  Bell,
  Shield,
  Layers,
  GraduationCap,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  Volume2,
  Smartphone,
  Mail,
  Zap,
  HeartHandshake,
  LogOut
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { supportedLanguages } from '../data/mockData';

const AVATAR_CATEGORIES = {
  scholars: {
    label: 'Scholars',
    avatars: [
      { emoji: '🎓', label: 'Scholar Student' },
      { emoji: '👨‍🎓', label: 'Scholar Boy' },
      { emoji: '👩‍🎓', label: 'Scholar Girl' },
      { emoji: '🧑‍💻', label: 'Digital Learner' },
      { emoji: '📚', label: 'Avid Reader' },
      { emoji: '🎒', label: 'Campus Learner' }
    ]
  },
  explorers: {
    label: 'Explorers',
    avatars: [
      { emoji: '🚀', label: 'Space Explorer' },
      { emoji: '🌟', label: 'Star Achiever' },
      { emoji: '🏆', label: 'Champion' },
      { emoji: '💡', label: 'Innovator' },
      { emoji: '🔬', label: 'Young Scientist' },
      { emoji: '🔭', label: 'Astronomer' }
    ]
  },
  creatives: {
    label: 'Creatives',
    avatars: [
      { emoji: '🎨', label: 'Creative Artist' },
      { emoji: '🦁', label: 'Courageous Leader' },
      { emoji: '🎯', label: 'Goal Oriented' },
      { emoji: '⚡', label: 'Super Energetic' },
      { emoji: '🌱', label: 'Curious Mind' },
      { emoji: '🍀', label: 'Fortunate Achiever' }
    ]
  },
  mentors: {
    label: 'Mentors',
    avatars: [
      { emoji: '👨‍🏫', label: 'Maths Teacher' },
      { emoji: '👩‍🏫', label: 'Science Teacher' },
      { emoji: '🏛️', label: 'Principal & Lead' },
      { emoji: '📱', label: 'Connected Parent' },
      { emoji: '🤝', label: 'Guardian Mentor' },
      { emoji: '🎖️', label: 'Academic Director' }
    ]
  }
};

const CLASS_GRADE_OPTIONS = [
  'Class 6A', 'Class 6B',
  'Class 7A', 'Class 7B',
  'Class 8A', 'Class 8B',
  'Class 9A', 'Class 9B',
  'Class 10A', 'Class 10B'
];

const CORE_SUBJECT_OPTIONS = [
  'Mathematics',
  'Science',
  'Social Science',
  'English Language & Grammar',
  'Hindi Sahitya',
  'Digital Literacy & Computers'
];

const ACADEMIC_GOAL_OPTIONS = [
  'Score 90%+ in Board Exams',
  'Master Science & Technology Lab',
  'Win Rural STEM Merit Scholarship',
  'Computer Coding & Digital Career Readiness',
  'Strengthen Core Mathematics Fundamentals',
  'Top 3 in Class Assessment Rank'
];

export function ProfileEditModal({ 
  isOpen, 
  onClose, 
  currentUser, 
  onSaveProfile, 
  lang,
  studentStats = { streakDays: 4, pointsXP: 350 },
  onLogout
}) {
  if (!isOpen || !currentUser) return null;

  // Active Tab inside modal
  const [activeTab, setActiveTab] = useState('personal'); // 'personal' | 'academic' | 'guardian' | 'preferences'
  const [avatarCategory, setAvatarCategory] = useState('scholars');

  // Form States initialized from currentUser
  const [name, setName] = useState(currentUser.name || 'Rohan Verma');
  const [avatar, setAvatar] = useState(currentUser.avatar || '🎓');
  const [studentId, setStudentId] = useState(currentUser.id || 'STU-004');
  const [gender, setGender] = useState(currentUser.gender || 'Male');
  const [village, setVillage] = useState(currentUser.village || 'Bilaspur, Rampur');
  
  // Academic States
  const [grade, setGrade] = useState(currentUser.grade || 'Class 7A');
  const [rollNo, setRollNo] = useState(currentUser.rollNo || '24');
  const [school, setSchool] = useState(currentUser.school || 'Model Senior Secondary School Rampur');
  const [favoriteSubject, setFavoriteSubject] = useState(currentUser.favoriteSubject || 'Mathematics');
  const [academicGoal, setAcademicGoal] = useState(currentUser.academicGoal || 'Score 90%+ in Board Exams');
  const [deviceAccess, setDeviceAccess] = useState(currentUser.deviceAccess || 'School Mesh Tablet');
  
  // Teacher/Admin Specific
  const [designation, setDesignation] = useState(currentUser.designation || 'Senior TGT Teacher');
  const [qualification, setQualification] = useState(currentUser.qualification || 'M.Sc. Mathematics, B.Ed.');
  const [assignedClasses, setAssignedClasses] = useState(currentUser.assignedClasses || 'Classes 6 to 10');

  // Guardian & Contact States
  const [parentName, setParentName] = useState(currentUser.parentName || 'Suresh Verma');
  const [parentRelation, setParentRelation] = useState(currentUser.parentRelation || 'Father');
  const [phone, setPhone] = useState(currentUser.phone || '+91 98765 43210');
  const [email, setEmail] = useState(currentUser.email || 'rohan.student@gyansetu.edu.in');
  const [smsAlerts, setSmsAlerts] = useState(currentUser.smsAlerts ?? true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(currentUser.whatsappAlerts ?? true);

  // Language & Accessibility States
  const [selectedLanguage, setSelectedLanguage] = useState(currentUser.language || lang || 'en');
  const [audioNarration, setAudioNarration] = useState(currentUser.audioNarration ?? true);
  const [dataSaver, setDataSaver] = useState(currentUser.dataSaver ?? true);

  // Sync state if currentUser changes
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || 'Rohan Verma');
      setAvatar(currentUser.avatar || '🎓');
      setStudentId(currentUser.id || 'STU-004');
      setGender(currentUser.gender || 'Male');
      setVillage(currentUser.village || 'Bilaspur, Rampur');
      setGrade(currentUser.grade || 'Class 7A');
      setRollNo(currentUser.rollNo || '24');
      setSchool(currentUser.school || 'Model Senior Secondary School Rampur');
      setFavoriteSubject(currentUser.favoriteSubject || 'Mathematics');
      setAcademicGoal(currentUser.academicGoal || 'Score 90%+ in Board Exams');
      setDeviceAccess(currentUser.deviceAccess || 'School Mesh Tablet');
      setDesignation(currentUser.designation || 'Senior TGT Teacher');
      setQualification(currentUser.qualification || 'M.Sc. Mathematics, B.Ed.');
      setAssignedClasses(currentUser.assignedClasses || 'Classes 6 to 10');
      setParentName(currentUser.parentName || 'Suresh Verma');
      setParentRelation(currentUser.parentRelation || 'Father');
      setPhone(currentUser.phone || '+91 98765 43210');
      setEmail(currentUser.email || 'rohan.student@gyansetu.edu.in');
      setSmsAlerts(currentUser.smsAlerts ?? true);
      setWhatsappAlerts(currentUser.whatsappAlerts ?? true);
      setSelectedLanguage(currentUser.language || lang || 'en');
      setAudioNarration(currentUser.audioNarration ?? true);
      setDataSaver(currentUser.dataSaver ?? true);
    }
  }, [currentUser, lang]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const updatedUser = {
      ...currentUser,
      name: name.trim(),
      avatar,
      id: studentId.trim(),
      gender,
      village: village.trim(),
      grade,
      rollNo: rollNo.trim(),
      school: school.trim(),
      favoriteSubject,
      academicGoal,
      deviceAccess,
      designation: designation.trim(),
      qualification: qualification.trim(),
      assignedClasses: assignedClasses.trim(),
      parentName: parentName.trim(),
      parentRelation,
      phone: phone.trim(),
      email: email.trim(),
      smsAlerts,
      whatsappAlerts,
      language: selectedLanguage,
      audioNarration,
      dataSaver
    };

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.4 }
      });
    } catch (err) {}

    onSaveProfile(updatedUser);
    onClose();
  };

  const isStudent = currentUser.role === 'student';
  const isTeacher = currentUser.role === 'teacher';
  const isParent = currentUser.role === 'parent';
  const isAdmin = currentUser.role === 'admin';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-4 sm:p-7 shadow-2xl border border-slate-100 max-h-[92vh] overflow-hidden flex flex-col">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-upsaffron-50 text-upsaffron-700 border border-upsaffron-200 flex items-center justify-center font-bold shadow-2xs">
              <UserCheck className="w-5 h-5 text-upsaffron-600" />
            </div>
            <div>
              <h2 className="text-lg font-black text-upnavy-950 flex items-center gap-2">
                <span>Profile & Identity Card</span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  isStudent ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                  isTeacher ? 'bg-upnavy-100 text-upnavy-900 border-upnavy-200' :
                  isParent ? 'bg-amber-100 text-amber-900 border-amber-300' :
                  'bg-purple-100 text-purple-900 border-purple-300'
                }`}>
                  {currentUser.role}
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                {lang === 'hi' 
                  ? 'व्यक्तिगत जानकारी, कक्षा 6-10 विवरण, अभिभावक फोन और ऑफ़लाइन सेटिंग्स' 
                  : 'Manage personal details, Classes 6–10 academic grade, guardian alerts & offline preferences'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-700 p-2 rounded-xl hover:bg-slate-100 transition active:scale-95"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto pr-1 flex-1 space-y-5">

          {/* 1. Live Smart Identity Card Preview */}
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-upnavy-950 via-upnavy-900 to-[#031d33] text-white border border-upnavy-800 shadow-xl relative overflow-hidden">
            {/* Top Micro Banner */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3 text-[10px] text-slate-300">
              <span className="font-bold flex items-center gap-1.5 text-upsaffron-300">
                <School className="w-3 h-3 text-upsaffron-400" />
                <span>GyanSetu Private EdTech • Digital Campus</span>
              </span>
              <span className="font-mono text-slate-400 bg-white/10 px-2 py-0.5 rounded">
                ID: {studentId}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                {/* Avatar with Glow Badge */}
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 text-3xl flex items-center justify-center shadow-inner">
                    {avatar}
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full text-[9px] shadow-md border-2 border-upnavy-950">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                </div>

                {/* Name & Academic Meta */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-black tracking-tight text-white">{name || 'Your Full Name'}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-upsaffron-500/20 text-upsaffron-300 border border-upsaffron-400/40 uppercase">
                      {currentUser.role}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                    {isStudent && (
                      <span className="font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-md border border-amber-400/30">
                        {grade} • Roll #{rollNo}
                      </span>
                    )}
                    {isTeacher && (
                      <span className="font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-md border border-amber-400/30">
                        {designation}
                      </span>
                    )}
                    {isParent && (
                      <span className="font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-md border border-amber-400/30">
                        Guardian of {name} ({grade})
                      </span>
                    )}
                    {isAdmin && (
                      <span className="font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-md border border-amber-400/30">
                        Institutional Leadership
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-400 truncate flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{village} • {school}</span>
                  </p>
                </div>
              </div>

              {/* Student Live Stats Pill */}
              {isStudent && (
                <div className="flex sm:flex-col gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10 sm:border-l sm:border-white/10 sm:pl-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-white/10 px-2.5 py-1 rounded-xl border border-white/10">
                    <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{studentStats.streakDays || 4} Days Streak</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-upsaffron-300 bg-white/10 px-2.5 py-1 rounded-xl border border-white/10">
                    <Sparkles className="w-3.5 h-3.5 text-upsaffron-400" />
                    <span>{studentStats.pointsXP || 350} XP Points</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 2. Modal Categorical Navigation Tabs */}
          <div className="bg-slate-100 p-1 rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-1 border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveTab('personal')}
              className={`py-2 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'personal'
                  ? 'bg-upnavy-950 text-white shadow-xs'
                  : 'text-slate-600 hover:text-upnavy-950 hover:bg-white/70'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Personal</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('academic')}
              className={`py-2 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'academic'
                  ? 'bg-upnavy-950 text-white shadow-xs'
                  : 'text-slate-600 hover:text-upnavy-950 hover:bg-white/70'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isStudent ? 'Grades 6–10' : 'Academic Role'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('guardian')}
              className={`py-2 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'guardian'
                  ? 'bg-upnavy-950 text-white shadow-xs'
                  : 'text-slate-600 hover:text-upnavy-950 hover:bg-white/70'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Guardian & SMS</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('preferences')}
              className={`py-2 px-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                activeTab === 'preferences'
                  ? 'bg-upnavy-950 text-white shadow-xs'
                  : 'text-slate-600 hover:text-upnavy-950 hover:bg-white/70'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Language & Data</span>
            </button>
          </div>

          {/* 3. Form Sections based on Active Tab */}
          <form id="profile-form" onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* ======================================= */}
            {/* TAB 1: PERSONAL & AVATAR DETAILS */}
            {/* ======================================= */}
            {activeTab === 'personal' && (
              <div className="space-y-4 animate-fadeIn">
                {/* Avatar Selector with Category Pills */}
                <div className="p-3.5 bg-slate-50 border border-slate-200/90 rounded-2xl space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-upsaffron-600" />
                      <span>Choose Your Avatar Character:</span>
                    </span>

                    {/* Category Switcher */}
                    <div className="flex items-center gap-1">
                      {Object.keys(AVATAR_CATEGORIES).map((catKey) => (
                        <button
                          key={catKey}
                          type="button"
                          onClick={() => setAvatarCategory(catKey)}
                          className={`px-2 py-0.5 rounded-lg text-[10px] font-bold capitalize transition ${
                            avatarCategory === catKey
                              ? 'bg-upnavy-900 text-white'
                              : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                          }`}
                        >
                          {AVATAR_CATEGORIES[catKey].label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Avatars Grid */}
                  <div className="grid grid-cols-6 gap-2">
                    {AVATAR_CATEGORIES[avatarCategory].avatars.map((av, idx) => {
                      const isSelected = avatar === av.emoji;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setAvatar(av.emoji)}
                          title={av.label}
                          className={`h-12 rounded-2xl text-2xl flex items-center justify-center transition-all ${
                            isSelected
                              ? 'bg-white shadow-md ring-2 ring-upsaffron-500 scale-105 border border-upsaffron-300 font-bold'
                              : 'bg-white/70 hover:bg-white border border-slate-200/60 opacity-80 hover:opacity-100 hover:scale-105'
                          }`}
                        >
                          <span>{av.emoji}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Name & ID Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rohan Verma"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-upsaffron-500 font-semibold text-slate-900 transition"
                      />
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Student / Campus Roll ID
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        placeholder="e.g. STU-004"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-mono font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                      />
                      <Hash className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>
                </div>

                {/* Village / Habitat & Gender */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Village / Habitat / Block
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={village}
                        onChange={(e) => setVillage(e.target.value)}
                        placeholder="e.g. Bilaspur, Rampur"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                      />
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other / Prefer not to say</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================= */}
            {/* TAB 2: ACADEMIC & GRADES 6 TO 10 */}
            {/* ======================================= */}
            {activeTab === 'academic' && (
              <div className="space-y-4 animate-fadeIn">
                {isStudent && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Enrolled Class Grade (Classes 6 to 10) <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={grade}
                          onChange={(e) => setGrade(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-bold text-upnavy-950 outline-none focus:ring-2 focus:ring-upsaffron-500"
                        >
                          {CLASS_GRADE_OPTIONS.map((gr) => (
                            <option key={gr} value={gr}>{gr} (NCERT & State Curriculum)</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Class Roll Number
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={rollNo}
                            onChange={(e) => setRollNo(e.target.value)}
                            placeholder="e.g. 24"
                            className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-bold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                          />
                          <Hash className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Favorite Core Subject
                        </label>
                        <select
                          value={favoriteSubject}
                          onChange={(e) => setFavoriteSubject(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                        >
                          {CORE_SUBJECT_OPTIONS.map((sub) => (
                            <option key={sub} value={sub}>{sub}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Academic Ambition & Target
                        </label>
                        <select
                          value={academicGoal}
                          onChange={(e) => setAcademicGoal(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                        >
                          {ACADEMIC_GOAL_OPTIONS.map((goal) => (
                            <option key={goal} value={goal}>{goal}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Primary Learning Device Access
                      </label>
                      <select
                        value={deviceAccess}
                        onChange={(e) => setDeviceAccess(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                      >
                        <option value="School Mesh Tablet">Dedicated School Tablet (Wi-Fi Mesh Connected)</option>
                        <option value="Family Smartphone">Family Smartphone (Low-Data Saver)</option>
                        <option value="Computer Lab PC">Desktop Computer in Campus ICT Lab</option>
                      </select>
                    </div>
                  </>
                )}

                {isTeacher && (
                  <div className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Designation & Subject</label>
                        <input
                          type="text"
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                          placeholder="Senior TGT Mathematics"
                          className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Teaching Classes</label>
                        <input
                          type="text"
                          value={assignedClasses}
                          onChange={(e) => setAssignedClasses(e.target.value)}
                          placeholder="Classes 6 to 10"
                          className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Academic Qualifications</label>
                      <input
                        type="text"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        placeholder="M.Sc. Mathematics, B.Ed."
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                      />
                    </div>
                  </div>
                )}

                {/* School Name across roles */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    School / Campus Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      placeholder="e.g. Model Senior Secondary School Rampur"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                    />
                    <School className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>
              </div>
            )}

            {/* ======================================= */}
            {/* TAB 3: GUARDIAN & CONTACT DETAILS */}
            {/* ======================================= */}
            {activeTab === 'guardian' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Parent / Guardian Name
                    </label>
                    <input
                      type="text"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="e.g. Suresh Verma"
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Relationship</label>
                    <select
                      value={parentRelation}
                      onChange={(e) => setParentRelation(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                    >
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Guardian">Legal Guardian / Elder Sibling</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Guardian Phone (for 2G SMS & Voice IVR)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Student / Registered Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@gyansetu.edu.in"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>
                </div>

                {/* SMS & WhatsApp Alert Toggles */}
                <div className="p-4 bg-slate-50 border border-slate-200/90 rounded-2xl space-y-3">
                  <div className="font-bold text-upnavy-950 flex items-center gap-2">
                    <Bell className="w-4 h-4 text-upsaffron-600" />
                    <span>Parent Communication Settings</span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <div>
                      <div className="font-semibold text-slate-800">Daily SMS Attendance & Progress Alerts</div>
                      <div className="text-[11px] text-slate-500">Delivered directly on basic feature phone (no data needed)</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={smsAlerts}
                      onChange={(e) => setSmsAlerts(e.target.checked)}
                      className="w-4 h-4 rounded text-upsaffron-600 focus:ring-upsaffron-500"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
                    <div>
                      <div className="font-semibold text-slate-800">Weekly WhatsApp Performance Cards</div>
                      <div className="text-[11px] text-slate-500">Includes diagnostic mastery chart and teacher remarks</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={whatsappAlerts}
                      onChange={(e) => setWhatsappAlerts(e.target.checked)}
                      className="w-4 h-4 rounded text-upsaffron-600 focus:ring-upsaffron-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ======================================= */}
            {/* TAB 4: LANGUAGE & ACCESSIBILITY */}
            {/* ======================================= */}
            {activeTab === 'preferences' && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Preferred Regional Language (10 Vernacular Options)
                  </label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-bold text-upnavy-950 outline-none focus:ring-2 focus:ring-upsaffron-500"
                  >
                    {supportedLanguages.map(l => (
                      <option key={l.code} value={l.code}>
                        {l.flag} {l.name} ({l.code.toUpperCase()})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200/90 rounded-2xl space-y-3">
                  <div className="font-bold text-upnavy-950 flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-upsaffron-600" />
                    <span>Vernacular Audio & Data Saver</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-slate-800">Regional Vernacular Voice Narration</div>
                      <div className="text-[11px] text-slate-500">Reads text aloud in native dialect for early or struggling readers</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={audioNarration}
                      onChange={(e) => setAudioNarration(e.target.checked)}
                      className="w-4 h-4 rounded text-upsaffron-600 focus:ring-upsaffron-500"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
                    <div>
                      <div className="font-semibold text-slate-800">Strict Low-Data Saver Mode (&lt;40KB)</div>
                      <div className="text-[11px] text-slate-500">Compresses illustrations and prevents background network sync</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={dataSaver}
                      onChange={(e) => setDataSaver(e.target.checked)}
                      className="w-4 h-4 rounded text-upsaffron-600 focus:ring-upsaffron-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Modal Sticky Bottom Action Footer */}
        <div className="pt-3.5 border-t border-slate-100 mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          {onLogout ? (
            <button
              type="button"
              onClick={() => {
                onClose();
                onLogout();
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 transition flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow-2xs"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-600" />
              <span>{lang === 'hi' ? 'खाते से लॉगआउट करें' : 'Sign Out / Logout'}</span>
            </button>
          ) : <div />}

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition active:scale-95"
            >
              Cancel
            </button>

            <button
              type="submit"
              form="profile-form"
              className="px-6 py-2.5 rounded-xl bg-upsaffron-600 hover:bg-upsaffron-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-upsaffron-600/30 transition active:scale-95 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'परिवर्तन सहेजें' : 'Save Profile Changes'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
