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
  Hash
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { supportedLanguages } from '../data/mockData';

const REGISTER_AVATARS = [
  { emoji: '🎓', label: 'Scholar Student' },
  { emoji: '🚀', label: 'Explorer' },
  { emoji: '🌟', label: 'Star Achiever' },
  { emoji: '📚', label: 'Avid Reader' },
  { emoji: '🔬', label: 'Young Scientist' },
  { emoji: '👨‍🎓', label: 'Scholar Boy' },
  { emoji: '👩‍🎓', label: 'Scholar Girl' },
  { emoji: '🧑‍💻', label: 'Digital Learner' },
  { emoji: '💡', label: 'Innovator' },
  { emoji: '🏆', label: 'Champion' }
];

export function AuthModal({ isOpen, onClose, lang, onLoginSuccess }) {
  if (!isOpen) return null;

  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState('student'); // 'student' | 'teacher' | 'parent' | 'admin'
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [studentName, setStudentName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🎓');
  const [selectedGrade, setSelectedGrade] = useState('Class 7');
  const [rollNo, setRollNo] = useState('');
  const [schoolName, setSchoolName] = useState('Govt Model Upper Primary School');
  const [regLanguage, setRegLanguage] = useState(lang || 'en');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVal, setOtpVal] = useState('');

  // Quick Demo Accounts for College Evaluators
  const demoAccounts = [
    {
      role: 'student',
      title: lang === 'hi' ? 'छात्र (रोहन वर्मा)' : 'Student (Rohan Verma)',
      badge: 'Class 7A • Roll 24',
      icon: '🎓',
      data: {
        id: 'stu-4',
        name: 'Rohan Verma',
        role: 'student',
        grade: 'Class 7A',
        rollNo: '24',
        school: 'Govt Upper Primary School Rampur',
        avatar: '🎓'
      }
    },
    {
      role: 'teacher',
      title: lang === 'hi' ? 'शिक्षक (श्री आर.के. शर्मा)' : 'Teacher (Mr. R.K. Sharma)',
      badge: 'Senior Math & Science',
      icon: '👨‍🏫',
      data: {
        id: 'teach-1',
        name: 'Mr. R.K. Sharma',
        role: 'teacher',
        designation: 'Senior Math & Science Teacher',
        school: 'Govt Upper Primary School Rampur',
        avatar: '👨‍🏫'
      }
    },
    {
      role: 'parent',
      title: lang === 'hi' ? 'अभिभावक (कैलाश वर्मा)' : 'Parent (Kailash Verma)',
      badge: 'SMS & IVR Portal',
      icon: '📱',
      data: {
        id: 'par-1',
        name: 'Kailash Verma (Rohan\'s Father)',
        role: 'parent',
        phone: '+91 98765 43210',
        device: 'Basic Keypad Phone (SMS/IVR)',
        avatar: '📱'
      }
    },
    {
      role: 'admin',
      title: lang === 'hi' ? 'प्रधानाध्यापिका (डॉ. अनीता)' : 'Headmistress (Dr. Anita)',
      badge: 'School Admin Portal',
      icon: '🏛️',
      data: {
        id: 'adm-1',
        name: 'Dr. Anita Deshmukh',
        role: 'admin',
        designation: 'School Headmaster & Admin',
        school: 'Govt Model Senior Secondary School Rampur',
        avatar: '🏛️'
      }
    }
  ];

  const handleQuickLogin = (demoUser) => {
    const mockJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify(demoUser.data))}.signature`;
    localStorage.setItem('gyansetu_jwt', mockJwt);
    localStorage.setItem('gyansetu_user', JSON.stringify(demoUser.data));
    try {
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.3 } });
    } catch (e) {}
    onLoginSuccess(demoUser.data);
    onClose();
  };

  const handleCustomLogin = (e) => {
    e.preventDefault();
    const userObj = {
      id: `user-${Date.now()}`,
      name: identifier.trim() || (selectedRole === 'student' ? 'Student Learner' : selectedRole === 'teacher' ? 'Faculty Member' : selectedRole === 'parent' ? 'Guardian' : 'School Head'),
      role: selectedRole,
      grade: selectedRole === 'student' ? selectedGrade : undefined,
      school: schoolName,
      avatar: selectedRole === 'student' ? '🎓' : selectedRole === 'teacher' ? '👨‍🏫' : selectedRole === 'parent' ? '📱' : '🏛️',
      language: regLanguage
    };

    localStorage.setItem('gyansetu_jwt', `jwt_token_${Date.now()}`);
    localStorage.setItem('gyansetu_user', JSON.stringify(userObj));
    try {
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.3 } });
    } catch (e) {}
    onLoginSuccess(userObj);
    onClose();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!studentName.trim()) return;

    const newUser = {
      id: `stu-${Date.now()}`,
      name: studentName.trim(),
      role: 'student',
      grade: selectedGrade,
      rollNo: rollNo.trim() || Math.floor(Math.random() * 50 + 1).toString(),
      school: schoolName.trim(),
      language: regLanguage,
      phone: guardianPhone.trim() || '+91 98765 43210',
      avatar: selectedAvatar
    };

    localStorage.setItem('gyansetu_jwt', `jwt_registered_${Date.now()}`);
    localStorage.setItem('gyansetu_user', JSON.stringify(newUser));
    try {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.35 } });
    } catch (e) {}
    onLoginSuccess(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-upnavy-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200/90 max-h-[92vh] overflow-hidden flex flex-col">
        
        {/* Modern UP Aesthetic Gradient Header */}
        <div className="bg-gradient-to-r from-upnavy-950 via-upnavy-900 to-upnavy-800 text-white p-6 relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-36 h-36 rounded-full bg-upsaffron-500/10 blur-2xl" />
          <div className="absolute bottom-0 left-1/3 w-32 h-32 rounded-full bg-amber-400/10 blur-xl" />
          
          <div className="relative z-10 flex items-start justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-upsaffron-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-upsaffron-600/30 border border-amber-300/30 font-bold shrink-0">
                <BookOpen className="w-6 h-6 stroke-[2.3]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black tracking-tight text-white">
                    Gyan<span className="text-upsaffron-400">Setu</span> Portal
                  </h2>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-upsaffron-500/20 text-upsaffron-300 border border-upsaffron-400/30">
                    Secure Gateway
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  {lang === 'hi' 
                    ? 'ग्रामीण डिजिटल शिक्षा व भूमिका सत्यापन प्रणाली' 
                    : 'Rural-First Authentication & Role Gateway'}
                </p>
              </div>
            </div>

            <button 
              onClick={onClose} 
              className="text-slate-400 hover:text-white p-2 rounded-2xl hover:bg-white/10 transition"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Segmented Mode Switcher Tab Bar */}
          <div className="mt-5 p-1 bg-upnavy-900/90 rounded-2xl border border-upnavy-700/80 flex gap-1 relative z-10">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                authMode === 'login'
                  ? 'bg-upsaffron-600 text-white shadow-md shadow-upsaffron-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'लॉगिन करें (Sign In)' : 'Sign In'}</span>
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                authMode === 'register'
                  ? 'bg-upsaffron-600 text-white shadow-md shadow-upsaffron-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'नया छात्र पंजीकरण (Register)' : 'New Student Registration'}</span>
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* 1-Click Quick Evaluator Demo Section */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50/40 to-amber-50/80 border border-amber-200/90 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-upsaffron-600" />
                <span>{lang === 'hi' ? '1-क्लिक त्वरित डेमो लॉगिन' : '1-Click Quick Evaluator Demo'}</span>
              </span>
              <span className="text-[10px] text-amber-800 font-bold bg-white/90 px-2.5 py-0.5 rounded-full border border-amber-300/80 shadow-2xs">
                Viva Ready ⚡
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {demoAccounts.map((acc, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickLogin(acc)}
                  className="p-3 rounded-2xl bg-white hover:bg-upsaffron-50/80 border border-amber-200 hover:border-upsaffron-300 text-left transition flex items-center gap-3 hover:shadow-sm active:scale-95 group"
                >
                  <span className="text-2xl group-hover:scale-110 transition shrink-0">{acc.icon}</span>
                  <div className="overflow-hidden space-y-0.5">
                    <div className="font-bold text-xs text-upnavy-950 truncate group-hover:text-upsaffron-700">
                      {acc.title}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      {acc.badge}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* TAB 1: CUSTOM LOGIN */}
          {authMode === 'login' && (
            <form onSubmit={handleCustomLogin} className="space-y-5">
              {/* Role Select Pills */}
              <div>
                <label className="block font-bold text-upnavy-950 mb-2">
                  {lang === 'hi' ? 'आपकी भूमिका चुनें (Choose Portal Role):' : 'Select Portal Role:'}
                </label>
                <div className="grid grid-cols-4 gap-2 p-1.5 bg-slate-100 rounded-2xl text-[11px] font-bold">
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
                          ? 'bg-upnavy-800 text-white shadow-sm ring-1 ring-upnavy-700' 
                          : 'text-slate-600 hover:text-upnavy-950 hover:bg-white/60'
                      }`}
                    >
                      <span className="text-base">{r.icon}</span>
                      <span>{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedRole === 'parent' ? (
                <div className="space-y-3.5">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">
                      {lang === 'hi' ? 'अभिभावक मोबाइल नंबर (10 अंक):' : 'Guardian Mobile Number (10 digits):'}
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="tel"
                          required
                          placeholder="9876543210"
                          className="w-full pl-10 pr-3 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-upsaffron-500"
                          value={identifier}
                          onChange={e => setIdentifier(e.target.value)}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setOtpSent(true)}
                        className="px-4 py-2.5 bg-upnavy-800 text-white font-bold rounded-2xl text-xs hover:bg-upnavy-900 transition active:scale-95 shadow-2xs shrink-0"
                      >
                        {otpSent ? 'Resend OTP' : 'Send SMS OTP'}
                      </button>
                    </div>
                  </div>

                  {otpSent && (
                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                      <label className="block font-bold text-emerald-950 text-[11px]">
                        {lang === 'hi' ? 'SMS ओटीपी दर्ज करें (डिफ़ॉल्ट: 1234):' : 'Enter SMS OTP (Default: 1234):'}
                      </label>
                      <input
                        type="text"
                        placeholder="1234"
                        className="w-full p-2.5 rounded-xl border border-emerald-300 bg-white text-xs font-mono font-bold tracking-widest text-emerald-900 outline-none focus:ring-2 focus:ring-emerald-500"
                        value={otpVal}
                        onChange={e => setOtpVal(e.target.value)}
                      />
                      <span className="text-[10px] text-emerald-700">✓ SMS simulated for low-tech keypad phone</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3.5">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">
                      {selectedRole === 'student' 
                        ? 'Student Roll Number or Username:' 
                        : selectedRole === 'teacher' 
                        ? 'Teacher ID / Email:' 
                        : 'Admin Key / Username:'}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        placeholder={selectedRole === 'student' ? 'e.g. rohan24 or roll-24' : 'e.g. sharma_teacher'}
                        className="w-full pl-10 pr-3 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-upsaffron-500 transition"
                        value={identifier}
                        onChange={e => setIdentifier(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">
                      {lang === 'hi' ? 'पासवर्ड / सुरक्षा पिन (Password / PIN):' : 'Password / Security PIN:'}
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-upsaffron-500 transition"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
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

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-upsaffron-600 via-upsaffron-600 to-amber-600 hover:from-upsaffron-500 hover:to-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-upsaffron-600/30 transition active:scale-95"
              >
                <LogIn className="w-4 h-4" />
                <span>{lang === 'hi' ? 'ज्ञानसेतु में प्रवेश करें' : 'Sign In to GyanSetu'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* TAB 2: STUDENT REGISTRATION */}
          {authMode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              
              {/* Avatar Selector */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                  <span>{lang === 'hi' ? 'अवतार चुनें:' : 'Select Your Avatar:'}</span>
                  <span className="text-[11px] text-slate-400">Chosen: {selectedAvatar}</span>
                </label>
                <div className="grid grid-cols-5 gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-200/80">
                  {REGISTER_AVATARS.map((av, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedAvatar(av.emoji)}
                      title={av.label}
                      className={`h-10 rounded-xl text-xl flex items-center justify-center transition ${
                        selectedAvatar === av.emoji 
                          ? 'bg-white shadow-md ring-2 ring-upsaffron-500 scale-105 border border-upsaffron-300' 
                          : 'hover:bg-white/60 opacity-80 hover:opacity-100'
                      }`}
                    >
                      {av.emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Student Name */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {lang === 'hi' ? 'विद्यार्थी का नाम (Student Full Name):' : 'Student Full Name:'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Kumar, Pooja Devi"
                    className="w-full pl-10 pr-3 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-upsaffron-500 transition"
                    value={studentName}
                    onChange={e => setStudentName(e.target.value)}
                  />
                </div>
              </div>

              {/* Grade and Roll Number */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Class / Grade:</label>
                  <select
                    value={selectedGrade}
                    onChange={e => setSelectedGrade(e.target.value)}
                    className="w-full p-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-xs font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                  >
                    <option>Class 6</option>
                    <option>Class 7</option>
                    <option>Class 8</option>
                    <option>Class 9</option>
                    <option>Class 10</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Roll Number:</label>
                  <div className="relative">
                    <Hash className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. 24"
                      value={rollNo}
                      onChange={e => setRollNo(e.target.value)}
                      className="w-full pl-8 pr-3 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-xs font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                    />
                  </div>
                </div>
              </div>

              {/* School Name */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  {lang === 'hi' ? 'विद्यालय या गाँव का नाम:' : 'School or Village Name:'}
                </label>
                <div className="relative">
                  <School className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Govt Upper Primary School Rampur"
                    className="w-full pl-10 pr-3 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-upsaffron-500 transition"
                    value={schoolName}
                    onChange={e => setSchoolName(e.target.value)}
                  />
                </div>
              </div>

              {/* Preferred Language & Guardian Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Preferred Regional Language:</label>
                  <select
                    value={regLanguage}
                    onChange={e => setRegLanguage(e.target.value)}
                    className="w-full p-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-xs font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                  >
                    {supportedLanguages.map(l => (
                      <option key={l.code} value={l.code}>
                        {l.flag} {l.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Guardian Mobile (SMS Alerts):</label>
                  <div className="relative">
                    <Smartphone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={guardianPhone}
                      onChange={e => setGuardianPhone(e.target.value)}
                      className="w-full pl-8 pr-3 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white text-xs font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-gradient-to-r from-amber-50 to-orange-50/50 rounded-2xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Rural-First Provision:</strong> No continuous email or smartphone required. All learning works seamlessly offline on school tablets.
                </span>
              </div>

              {/* Submit Registration Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-upsaffron-600 via-upsaffron-600 to-amber-600 hover:from-upsaffron-500 hover:to-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-upsaffron-600/30 transition active:scale-95"
              >
                <UserCheck className="w-4 h-4" />
                <span>{lang === 'hi' ? 'नया खाता बनाएं व पढ़ाई शुरू करें' : 'Create Student Account & Begin Learning'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
