import React, { useState } from 'react';
import { 
  X, 
  LogIn, 
  UserPlus, 
  User, 
  Lock, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Shield,
  Smartphone,
  School,
  Globe,
  Eye,
  EyeOff,
  UserCheck,
  Award,
  Hash,
  KeyRound,
  Check,
  Layers,
  MapPin,
  HeartHandshake,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { supportedLanguages } from '../data/mockData';

const REGISTER_AVATARS = {
  scholars: [
    { emoji: '🎓', label: 'Scholar Student' },
    { emoji: '👨‍🎓', label: 'Scholar Boy' },
    { emoji: '👩‍🎓', label: 'Scholar Girl' },
    { emoji: '🧑‍💻', label: 'Digital Learner' },
    { emoji: '📚', label: 'Avid Reader' }
  ],
  explorers: [
    { emoji: '🚀', label: 'Space Explorer' },
    { emoji: '🌟', label: 'Star Achiever' },
    { emoji: '🏆', label: 'Champion' },
    { emoji: '💡', label: 'Innovator' },
    { emoji: '🔬', label: 'Young Scientist' }
  ],
  mentors: [
    { emoji: '👨‍🏫', label: 'Teacher' },
    { emoji: '👩‍🏫', label: 'Instructor' },
    { emoji: '📱', label: 'Parent' },
    { emoji: '🏛️', label: 'Principal' },
    { emoji: '🤝', label: 'Guardian' }
  ]
};

const CLASS_OPTIONS = [
  'Class 6A', 'Class 6B',
  'Class 7A', 'Class 7B',
  'Class 8A', 'Class 8B',
  'Class 9A', 'Class 9B',
  'Class 10A', 'Class 10B'
];

export function AuthModal({ isOpen, onClose, lang, onLoginSuccess, onContinueAsGuest }) {
  if (!isOpen) return null;

  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState('student'); // 'student' | 'teacher' | 'parent' | 'admin'
  const [registerRole, setRegisterRole] = useState('student'); // 'student' | 'teacher' | 'parent'
  const [showPassword, setShowPassword] = useState(false);
  const [avatarCategory, setAvatarCategory] = useState('scholars');

  // Login Form States
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginGrade, setLoginGrade] = useState('Class 7A');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVal, setOtpVal] = useState('');
  const [showForgotNotice, setShowForgotNotice] = useState(false);

  // Registration Form States
  const [regFullName, setRegFullName] = useState('');
  const [regAvatar, setRegAvatar] = useState('🎓');
  const [regGrade, setRegGrade] = useState('Class 7A');
  const [regRollNo, setRegRollNo] = useState('');
  const [regStudentId, setRegStudentId] = useState('STU-015');
  const [regSchool, setRegSchool] = useState('Model Senior Secondary School Rampur');
  const [regVillage, setRegVillage] = useState('Bilaspur, Rampur');
  const [regLanguage, setRegLanguage] = useState(lang || 'en');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  
  // Teacher/Parent Registration Specifics
  const [regDesignation, setRegDesignation] = useState('TGT Subject Teacher');
  const [regFacultyCode, setRegFacultyCode] = useState('FAC-09');
  const [regWardName, setRegWardName] = useState('Rohan Verma');
  const [regParentRelation, setRegParentRelation] = useState('Father');

  // Quick 1-Click Demo Accounts
  const demoAccounts = [
    {
      role: 'student',
      title: lang === 'hi' ? 'छात्र (रोहन वर्मा)' : 'Student (Rohan Verma)',
      badge: 'Class 7A • Roll 24',
      school: 'Model Senior Secondary School',
      icon: '🎓',
      data: {
        id: 'stu-4',
        name: 'Rohan Verma',
        role: 'student',
        grade: 'Class 7A',
        rollNo: '24',
        school: 'Model Senior Secondary School Rampur',
        avatar: '🎓',
        village: 'Bilaspur, Rampur',
        language: lang || 'en'
      }
    },
    {
      role: 'teacher',
      title: lang === 'hi' ? 'शिक्षक (विक्रम शर्मा)' : 'Teacher (Vikram Sharma)',
      badge: 'Senior TGT Math (Gr 6-10)',
      school: 'Model Senior Secondary School',
      icon: '👨‍🏫',
      data: {
        id: 'teach-1',
        name: 'Vikram Sharma',
        role: 'teacher',
        designation: 'Senior TGT Mathematics',
        school: 'Model Senior Secondary School Rampur',
        avatar: '👨‍🏫',
        village: 'Bilaspur Campus',
        language: lang || 'en'
      }
    },
    {
      role: 'parent',
      title: lang === 'hi' ? 'अभिभावक (कैलाश वर्मा)' : 'Parent (Kailash Verma)',
      badge: 'Ward: Rohan (Class 7A)',
      school: 'SMS & Voice IVR Portal',
      icon: '📱',
      data: {
        id: 'par-1',
        name: 'Kailash Verma',
        role: 'parent',
        phone: '+91 98765 43210',
        wardName: 'Rohan Verma',
        wardGrade: 'Class 7A',
        school: 'Model Senior Secondary School Rampur',
        avatar: '📱',
        language: lang || 'en'
      }
    },
    {
      role: 'admin',
      title: lang === 'hi' ? 'प्रधानाध्यापिका (डॉ. अनीता)' : 'Headmistress (Dr. Anita)',
      badge: 'Director & Admin Nodal',
      school: 'GyanSetu Private Trust',
      icon: '🏛️',
      data: {
        id: 'adm-1',
        name: 'Dr. Anita Deshmukh',
        role: 'admin',
        designation: 'Principal & Director of Academics',
        school: 'Model Senior Secondary School Rampur',
        avatar: '🏛️',
        language: lang || 'en'
      }
    }
  ];

  const handleQuickLogin = (demoUser) => {
    localStorage.setItem('gyansetu_jwt', `jwt_demo_${Date.now()}`);
    localStorage.setItem('gyansetu_user', JSON.stringify(demoUser.data));
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.3 } });
    } catch (e) {}
    onLoginSuccess(demoUser.data);
    onClose();
  };

  const handleCustomLogin = (e) => {
    e.preventDefault();
    let finalName = loginIdentifier.trim();
    if (!finalName) {
      finalName = selectedRole === 'student' ? 'Student Learner' :
                  selectedRole === 'teacher' ? 'Faculty Member' :
                  selectedRole === 'parent' ? 'Registered Guardian' : 'School Administrator';
    }

    const userObj = {
      id: `user-${Date.now()}`,
      name: finalName,
      role: selectedRole,
      grade: selectedRole === 'student' ? loginGrade : undefined,
      rollNo: selectedRole === 'student' ? (loginIdentifier.replace(/\D/g, '') || '24') : undefined,
      school: 'Model Senior Secondary School Rampur',
      avatar: selectedRole === 'student' ? '🎓' : selectedRole === 'teacher' ? '👨‍🏫' : selectedRole === 'parent' ? '📱' : '🏛️',
      language: lang || 'en',
      village: 'Bilaspur, Rampur'
    };

    localStorage.setItem('gyansetu_jwt', `jwt_token_${Date.now()}`);
    localStorage.setItem('gyansetu_user', JSON.stringify(userObj));
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.3 } });
    } catch (e) {}
    onLoginSuccess(userObj);
    onClose();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!regFullName.trim()) return;

    let newUser = {};
    if (registerRole === 'student') {
      newUser = {
        id: regStudentId.trim() || `stu-${Date.now()}`,
        name: regFullName.trim(),
        role: 'student',
        grade: regGrade,
        rollNo: regRollNo.trim() || Math.floor(Math.random() * 40 + 1).toString(),
        school: regSchool.trim(),
        village: regVillage.trim(),
        language: regLanguage,
        phone: regPhone.trim() || '+91 98765 43210',
        avatar: regAvatar
      };
    } else if (registerRole === 'teacher') {
      newUser = {
        id: regFacultyCode.trim() || `fac-${Date.now()}`,
        name: regFullName.trim(),
        role: 'teacher',
        designation: regDesignation.trim(),
        school: regSchool.trim(),
        village: regVillage.trim(),
        language: regLanguage,
        phone: regPhone.trim() || '+91 98765 43210',
        avatar: regAvatar || '👨‍🏫'
      };
    } else {
      newUser = {
        id: `par-${Date.now()}`,
        name: regFullName.trim(),
        role: 'parent',
        relationship: regParentRelation,
        wardName: regWardName.trim(),
        wardGrade: regGrade,
        school: regSchool.trim(),
        village: regVillage.trim(),
        language: regLanguage,
        phone: regPhone.trim() || '+91 98765 43210',
        avatar: regAvatar || '📱'
      };
    }

    localStorage.setItem('gyansetu_jwt', `jwt_registered_${Date.now()}`);
    localStorage.setItem('gyansetu_user', JSON.stringify(newUser));
    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.35 } });
    } catch (e) {}
    onLoginSuccess(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-upnavy-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200/90 max-h-[92vh] overflow-hidden flex flex-col">
        
        {/* Header with GyanSetu Portal Credentials */}
        <div className="bg-gradient-to-r from-upnavy-950 via-upnavy-900 to-upnavy-800 text-white p-4 sm:p-5 relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-36 h-36 rounded-full bg-upsaffron-500/10 blur-2xl" />
          
          <div className="relative z-10 flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-upsaffron-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-upsaffron-600/30 border border-amber-300/30 font-bold shrink-0">
                <BookOpen className="w-5 h-5 stroke-[2.3]" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-base sm:text-lg font-black tracking-tight text-white">
                    Gyan<span className="text-upsaffron-400">Setu</span> Digital Portal
                  </h2>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-upsaffron-500/20 text-upsaffron-300 border border-upsaffron-400/30">
                    Classes 6 to 10
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Private EdTech Platform • Model Senior Secondary School Rampur
                </p>
              </div>
            </div>

            <button 
              onClick={onClose} 
              className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition shrink-0 active:scale-95"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode Switcher Tabs (Sign In vs Register) */}
          <div className="mt-3.5 p-1 bg-upnavy-900/90 rounded-2xl border border-upnavy-700/80 flex gap-1 relative z-10">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                authMode === 'login'
                  ? 'bg-upsaffron-600 text-white shadow-md shadow-upsaffron-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <LogIn className="w-3.5 h-3.5 shrink-0" />
              <span>{lang === 'hi' ? 'साइन इन (Sign In)' : 'Sign In'}</span>
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                authMode === 'register'
                  ? 'bg-upsaffron-600 text-white shadow-md shadow-upsaffron-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5 shrink-0" />
              <span>{lang === 'hi' ? 'नया पंजीकरण (Register)' : 'New Registration'}</span>
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5 flex-1 text-xs">
          
          {/* 1-Click Quick Evaluator Demo Section */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50/40 to-amber-50/80 border border-amber-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-upsaffron-600" />
                <span>{lang === 'hi' ? '1-क्लिक त्वरित डेमो लॉगिन' : '1-Click Quick Evaluator Demo'}</span>
              </span>
              <span className="text-[10px] text-amber-900 font-bold bg-white/90 px-2 py-0.5 rounded-full border border-amber-300/80 shadow-2xs">
                Instant Access ⚡
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {demoAccounts.map((acc, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickLogin(acc)}
                  className="p-2.5 rounded-2xl bg-white hover:bg-upsaffron-50/80 border border-amber-200/90 hover:border-upsaffron-300 text-left transition flex items-center gap-2.5 hover:shadow-sm active:scale-95 group cursor-pointer"
                >
                  <span className="text-2xl group-hover:scale-110 transition shrink-0">{acc.icon}</span>
                  <div className="overflow-hidden space-y-0.5 flex-1">
                    <div className="font-bold text-xs text-upnavy-950 truncate group-hover:text-upsaffron-700">
                      {acc.title}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium truncate">
                      {acc.badge}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ========================================================= */}
          {/* FORM 1: CUSTOM SIGN IN */}
          {/* ========================================================= */}
          {authMode === 'login' && (
            <form onSubmit={handleCustomLogin} className="space-y-4 animate-fadeIn">
              {/* Role Select Pills */}
              <div>
                <label className="block font-bold text-upnavy-950 mb-1.5">
                  {lang === 'hi' ? 'पोर्टल भूमिका चुनें (Choose Portal Role):' : 'Select Portal Role:'}
                </label>
                <div className="grid grid-cols-4 gap-1.5 p-1.5 bg-slate-100 rounded-2xl text-[11px] font-bold">
                  {[
                    { id: 'student', label: 'Student', icon: '🎓' },
                    { id: 'teacher', label: 'Teacher', icon: '👨‍🏫' },
                    { id: 'parent', label: 'Parent', icon: '📱' },
                    { id: 'admin', label: 'Admin', icon: '🏛️' }
                  ].map(r => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setSelectedRole(r.id)}
                      className={`py-2 rounded-xl transition flex flex-col items-center gap-0.5 ${
                        selectedRole === r.id 
                          ? 'bg-upnavy-900 text-white shadow-sm ring-1 ring-upnavy-800' 
                          : 'text-slate-600 hover:text-upnavy-950 hover:bg-white/60'
                      }`}
                    >
                      <span className="text-base">{r.icon}</span>
                      <span>{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Role Fields */}
              {selectedRole === 'student' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Student Username / Roll No <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. rohan24 or STU-004"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-upsaffron-500 transition"
                          value={loginIdentifier}
                          onChange={e => setLoginIdentifier(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Class Grade (Classes 6 to 10)
                      </label>
                      <select
                        value={loginGrade}
                        onChange={e => setLoginGrade(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-bold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                      >
                        {CLASS_OPTIONS.map(gr => (
                          <option key={gr} value={gr}>{gr}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Security PIN / Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••"
                        className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-upsaffron-500 transition"
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition"
                        title={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {selectedRole === 'teacher' && (
                <div className="space-y-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Faculty ID / Email <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. FAC-02 or sharma.maths"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-upsaffron-500 transition"
                        value={loginIdentifier}
                        onChange={e => setLoginIdentifier(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Faculty Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••"
                        className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-upsaffron-500 transition"
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {selectedRole === 'parent' && (
                <div className="space-y-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Registered Guardian Mobile Number (10 Digits) <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="tel"
                          required
                          placeholder="9876543210"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-upsaffron-500 transition"
                          value={loginIdentifier}
                          onChange={e => setLoginIdentifier(e.target.value)}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setOtpSent(true);
                          setOtpVal('1234');
                        }}
                        className="px-3.5 py-2.5 bg-upnavy-800 text-white font-bold rounded-xl text-xs hover:bg-upnavy-900 transition active:scale-95 shrink-0"
                      >
                        {otpSent ? 'Resend OTP' : 'Send SMS OTP'}
                      </button>
                    </div>
                  </div>

                  {otpSent && (
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <label className="block font-bold text-emerald-950 text-[11px]">
                          Enter SMS OTP (Auto-filled: 1234):
                        </label>
                        <span className="text-[10px] font-bold text-emerald-700">✓ SMS Sent</span>
                      </div>
                      <input
                        type="text"
                        placeholder="1234"
                        className="w-full p-2.5 rounded-xl border border-emerald-300 bg-white text-xs font-mono font-bold tracking-widest text-emerald-900 outline-none focus:ring-2 focus:ring-emerald-500"
                        value={otpVal}
                        onChange={e => setOtpVal(e.target.value)}
                      />
                      <span className="text-[10px] text-emerald-700 block">
                        Simulation for low-tech keypad phones without continuous internet.
                      </span>
                    </div>
                  )}
                </div>
              )}

              {selectedRole === 'admin' && (
                <div className="space-y-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Administrator Username / Email <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. dr.anita or admin"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-upsaffron-500 transition"
                        value={loginIdentifier}
                        onChange={e => setLoginIdentifier(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Master Admin PIN / Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••"
                        className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-upsaffron-500 transition"
                        value={loginPassword}
                        onChange={e => setLoginPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Remember Me & Forgot Password Helper */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded text-upsaffron-600 focus:ring-upsaffron-500"
                  />
                  <span>Remember this device</span>
                </label>

                <button
                  type="button"
                  onClick={() => setShowForgotNotice(!showForgotNotice)}
                  className="text-upsaffron-700 hover:text-upsaffron-800 font-bold hover:underline"
                >
                  Forgot PIN / Password?
                </button>
              </div>

              {showForgotNotice && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1 animate-fadeIn">
                  <div className="font-bold text-upnavy-950">Self-Service PIN Reset:</div>
                  <p>In rural offline mode, PINs can be reset via school teacher dashboard or by calling the platform helpline <strong>1800 180 5321</strong>.</p>
                </div>
              )}

              {/* Login Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-upsaffron-600 via-upsaffron-600 to-amber-600 hover:from-upsaffron-500 hover:to-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-upsaffron-600/30 transition active:scale-95 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>{lang === 'hi' ? 'ज्ञानसेतु में प्रवेश करें' : 'Sign In to GyanSetu'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-1 text-slate-500 text-xs">
                <span>New to GyanSetu? </span>
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className="font-bold text-upsaffron-700 hover:text-upsaffron-800 hover:underline"
                >
                  Create an Account
                </button>
              </div>

              {/* Or Continue as Guest Learner */}
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <button
                  type="button"
                  onClick={() => {
                    if (onContinueAsGuest) {
                      onContinueAsGuest();
                    } else {
                      onClose();
                    }
                  }}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-upnavy-950 font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
                >
                  <span>👤 {lang === 'hi' ? 'अतिथि शिक्षार्थी के रूप में जारी रखें' : 'Continue as Guest Learner'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <p className="text-[10px] text-center text-slate-400">
                  {lang === 'hi' 
                    ? 'बिना पासवर्ड लॉगिन करें • आपकी सभी प्रगति इस डिवाइस पर हमेशा सुरक्षित रहेगी।' 
                    : 'No account needed • All your quiz scores & downloads persist on this browser.'}
                </p>
              </div>
            </form>
          )}

          {/* ========================================================= */}
          {/* FORM 2: FULL REGISTRATION (STUDENT / TEACHER / PARENT) */}
          {/* ========================================================= */}
          {authMode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4 animate-fadeIn">
              
              {/* Registration Role Selection */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  Register Account Type:
                </label>
                <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl text-[11px] font-bold">
                  {[
                    { id: 'student', label: 'Student (Gr 6–10)', icon: '🎓' },
                    { id: 'teacher', label: 'Faculty Member', icon: '👨‍🏫' },
                    { id: 'parent', label: 'Guardian / Parent', icon: '📱' }
                  ].map(r => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRegisterRole(r.id)}
                      className={`py-2 rounded-xl transition flex flex-col items-center gap-0.5 ${
                        registerRole === r.id 
                          ? 'bg-upnavy-900 text-white shadow-sm ring-1 ring-upnavy-800' 
                          : 'text-slate-600 hover:text-upnavy-950 hover:bg-white/60'
                      }`}
                    >
                      <span className="text-base">{r.icon}</span>
                      <span>{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Avatar Selector */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700 text-xs">
                    Choose Character Avatar:
                  </span>
                  <div className="flex gap-1 text-[10px]">
                    {Object.keys(REGISTER_AVATARS).map(cat => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setAvatarCategory(cat)}
                        className={`px-2 py-0.5 rounded-lg capitalize font-bold ${
                          avatarCategory === cat
                            ? 'bg-upnavy-900 text-white'
                            : 'bg-white text-slate-600 border border-slate-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {REGISTER_AVATARS[avatarCategory].map((av, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setRegAvatar(av.emoji)}
                      title={av.label}
                      className={`h-11 rounded-xl text-xl flex items-center justify-center transition ${
                        regAvatar === av.emoji 
                          ? 'bg-white shadow-md ring-2 ring-upsaffron-500 scale-105 border border-upsaffron-300 font-bold' 
                          : 'bg-white/70 hover:bg-white border border-slate-200/60 opacity-80 hover:opacity-100'
                      }`}
                    >
                      {av.emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Kumar, Pooja Devi"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-upsaffron-500 transition"
                    value={regFullName}
                    onChange={e => setRegFullName(e.target.value)}
                  />
                </div>
              </div>

              {/* Student Registration Fields */}
              {registerRole === 'student' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Class Grade (Classes 6 to 10) <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={regGrade}
                        onChange={e => setRegGrade(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-bold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                      >
                        {CLASS_OPTIONS.map(gr => (
                          <option key={gr} value={gr}>{gr} (NCERT & State Board)</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Class Roll Number</label>
                      <div className="relative">
                        <Hash className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          placeholder="e.g. 24"
                          value={regRollNo}
                          onChange={e => setRegRollNo(e.target.value)}
                          className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-bold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Guardian Mobile (2G SMS Alerts)</label>
                      <div className="relative">
                        <Smartphone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={regPhone}
                          onChange={e => setRegPhone(e.target.value)}
                          className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Preferred Language</label>
                      <select
                        value={regLanguage}
                        onChange={e => setRegLanguage(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-bold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                      >
                        {supportedLanguages.map(l => (
                          <option key={l.code} value={l.code}>
                            {l.flag} {l.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Teacher Registration Fields */}
              {registerRole === 'teacher' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Subject Specialization</label>
                      <input
                        type="text"
                        placeholder="Mathematics & Science"
                        value={regDesignation}
                        onChange={e => setRegDesignation(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Faculty ID Code</label>
                      <input
                        type="text"
                        placeholder="FAC-09"
                        value={regFacultyCode}
                        onChange={e => setRegFacultyCode(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-mono font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Official Mobile / Contact</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={regPhone}
                      onChange={e => setRegPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                    />
                  </div>
                </div>
              )}

              {/* Parent Registration Fields */}
              {registerRole === 'parent' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Enrolled Ward's Full Name</label>
                      <input
                        type="text"
                        placeholder="Rohan Verma"
                        value={regWardName}
                        onChange={e => setRegWardName(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Ward's Class (Grades 6–10)</label>
                      <select
                        value={regGrade}
                        onChange={e => setRegGrade(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-bold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                      >
                        {CLASS_OPTIONS.map(gr => (
                          <option key={gr} value={gr}>{gr}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Mobile for SMS & Voice IVR</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={regPhone}
                        onChange={e => setRegPhone(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Relationship</label>
                      <select
                        value={regParentRelation}
                        onChange={e => setRegParentRelation(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                      >
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Guardian">Guardian</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* School & Village across all roles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">School Campus</label>
                  <div className="relative">
                    <School className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Model Senior Secondary School Rampur"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-upsaffron-500 transition"
                      value={regSchool}
                      onChange={e => setRegSchool(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Village / Habitat</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Bilaspur, Rampur"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-upsaffron-500 transition"
                      value={regVillage}
                      onChange={e => setRegVillage(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Create Security PIN */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Create Security PIN / Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter 4-digit PIN or password"
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-upsaffron-500 transition"
                    value={regPassword}
                    onChange={e => setRegPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Rural First Note */}
              <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50/50 rounded-2xl border border-emerald-200 text-[11px] text-emerald-950 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Zero-Cost Offline Architecture:</strong> Seamlessly synchronizes via local community Raspberry Pi Wi-Fi mesh. No continuous cellular plan required.
                </span>
              </div>

              {/* Submit Registration Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-upsaffron-600 via-upsaffron-600 to-amber-600 hover:from-upsaffron-500 hover:to-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-upsaffron-600/30 transition active:scale-95 cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>Create Account & Launch Learning</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-1 text-slate-500 text-xs">
                <span>Already registered? </span>
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="font-bold text-upsaffron-700 hover:text-upsaffron-800 hover:underline"
                >
                  Sign In
                </button>
              </div>

              {/* Or Continue as Guest Learner */}
              <div className="pt-2 border-t border-slate-100 text-center">
                <button
                  type="button"
                  onClick={() => {
                    if (onContinueAsGuest) {
                      onContinueAsGuest();
                    } else {
                      onClose();
                    }
                  }}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-upnavy-950 font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer"
                >
                  <span>👤 {lang === 'hi' ? 'अतिथि शिक्षार्थी के रूप में जारी रखें' : 'Continue as Guest Learner'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
