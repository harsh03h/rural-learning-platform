import React, { useState, useRef, useEffect } from 'react';
import { 
  Wifi, 
  WifiOff, 
  Zap, 
  Globe, 
  Layers, 
  RefreshCw, 
  Sparkles, 
  BookOpen, 
  LogIn, 
  LogOut, 
  ChevronDown,
  ChevronRight,
  HardDrive,
  UserCog,
  HelpCircle,
  LifeBuoy,
  Flame,
  Trophy,
  School
} from 'lucide-react';
import { translations, supportedLanguages } from '../data/mockData';

export function Navbar({ 
  currentUser,
  studentStats,
  onOpenAuthModal,
  onOpenProfileEdit,
  onLogout,
  onOpenXpRewards,
  role, 
  setRole, 
  lang, 
  setLang, 
  isOffline, 
  setIsOffline, 
  isLowData, 
  setIsLowData,
  pendingSyncCount,
  onSyncNow,
  downloadedCount,
  onOpenDownloads,
  onOpenArchitecture,
  onOpenHelp,
  selectedGrade = 'Class 7',
  onSelectGrade
}) {
  const t = translations[lang] || translations['en'];
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isClassMenuOpen, setIsClassMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const classMenuRef = useRef(null);

  // Close profile and class dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
      if (classMenuRef.current && !classMenuRef.current.contains(event.target)) {
        setIsClassMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs transition-all">
      {/* GyanSetu EdTech Aesthetic Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-upsaffron-600 via-amber-400 to-upnavy-800" />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left: Brand + Role Navigation Pills */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-2.5 cursor-pointer shrink-0" onClick={() => setRole('student')}>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-upnavy-900 via-upnavy-800 to-upnavy-700 flex items-center justify-center text-upsaffron-400 shadow-sm shadow-upnavy-900/30 border border-upnavy-700/40">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-black tracking-tight text-upnavy-950 font-sans leading-none block">
                Gyan<span className="text-upsaffron-600">Setu</span>
              </span>
              <span className="hidden sm:block text-[10px] text-slate-500 font-semibold tracking-tight">
                Classes 6–10 EdTech
              </span>
            </div>
          </div>

          {/* Segmented Role Navigation (Desktop & Tablet) */}
          <nav className="hidden md:flex items-center bg-slate-100/90 p-1 rounded-full border border-slate-200/70 text-xs">
            <button
              onClick={() => setRole('student')}
              className={`px-3.5 py-1.5 rounded-full font-semibold transition-all duration-150 ${
                role === 'student'
                  ? 'bg-upnavy-800 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-upnavy-900'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setRole('teacher')}
              className={`px-3.5 py-1.5 rounded-full font-semibold transition-all duration-150 ${
                role === 'teacher'
                  ? 'bg-upnavy-800 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-upnavy-900'
              }`}
            >
              Teacher
            </button>
            <button
              onClick={() => setRole('parent')}
              className={`px-3.5 py-1.5 rounded-full font-semibold transition-all duration-150 ${
                role === 'parent'
                  ? 'bg-upnavy-800 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-upnavy-900'
              }`}
            >
              Parent SMS
            </button>
            <button
              onClick={() => setRole('admin')}
              className={`px-3.5 py-1.5 rounded-full font-semibold transition-all duration-150 ${
                role === 'admin'
                  ? 'bg-upnavy-800 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-upnavy-900'
              }`}
            >
              Admin
            </button>
          </nav>
        </div>

        {/* Right: Modern Compact Utilities */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Active Class Grade Selector Dropdown */}
          <div className="relative" ref={classMenuRef}>
            <button
              onClick={() => setIsClassMenuOpen(!isClassMenuOpen)}
              className="px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold bg-upnavy-50 hover:bg-upnavy-100 text-upnavy-900 border border-upnavy-200/90 flex items-center gap-1.5 transition active:scale-95 shadow-2xs"
              title="Switch Class Curriculum (Classes 6 to 10)"
            >
              <School className="w-3.5 h-3.5 text-upsaffron-600 shrink-0" />
              <span className="font-black text-upnavy-950">{selectedGrade || 'Class 7'}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
            </button>

            {isClassMenuOpen && (
              <div className="absolute top-full mt-2 left-0 sm:left-auto sm:right-0 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-scaleUp">
                <div className="px-3 py-1.5 text-[10px] font-black uppercase text-slate-400 tracking-wider border-b border-slate-100 flex items-center justify-between">
                  <span>Curriculum Class</span>
                  <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-mono">6 to 10</span>
                </div>
                {[
                  { id: 'Class 6', label: 'Class 6', sub: 'Middle School • Foundation' },
                  { id: 'Class 7', label: 'Class 7', sub: 'Middle School • Core' },
                  { id: 'Class 8', label: 'Class 8', sub: 'Upper Primary • Advanced' },
                  { id: 'Class 9', label: 'Class 9', sub: 'Secondary • Board Prep' },
                  { id: 'Class 10', label: 'Class 10', sub: 'High School • Board Exam' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (onSelectGrade) onSelectGrade(item.id);
                      setIsClassMenuOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs transition flex items-center justify-between ${
                      selectedGrade === item.id 
                        ? 'bg-upnavy-50 text-upnavy-950 font-black' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-upnavy-950">{item.label}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{item.sub}</div>
                    </div>
                    {selectedGrade === item.id && (
                      <span className="w-2 h-2 rounded-full bg-upsaffron-500 ring-2 ring-upsaffron-200" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Offline Sync Alert Pill (Only shown if pending syncs) */}
          {pendingSyncCount > 0 && (
            <button
              onClick={onSyncNow}
              className="hidden sm:flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1.5 rounded-full text-[11px] font-bold transition active:scale-95 shadow-2xs"
              title="Click to push offline quiz results to school database"
            >
              <RefreshCw className="w-3 h-3 text-amber-700" />
              <span>{pendingSyncCount} Sync</span>
            </button>
          )}

          {/* Network Simulator Indicator Button (Desktop/Tablet) */}
          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium border transition-all ${
              isOffline
                ? 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100 shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
            }`}
            title="Click to toggle simulated offline mode"
          >
            <span className={`w-2 h-2 rounded-full shrink-0 ${isOffline ? 'bg-rose-500 ring-2 ring-rose-200' : 'bg-emerald-500 ring-2 ring-emerald-200'}`} />
            <span className="hidden md:inline font-semibold">{isOffline ? 'Offline' : 'Online'}</span>
          </button>

          {/* Minimalist Low Data Toggle Pill (Desktop/Tablet) */}
          <button
            onClick={() => setIsLowData(!isLowData)}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold border transition-all ${
              isLowData
                ? 'bg-amber-50 text-amber-900 border-amber-300/80 shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200/80'
            }`}
            title="Low Data Mode: saves 98% bandwidth with audio & text only"
          >
            <Zap className={`w-3.5 h-3.5 shrink-0 ${isLowData ? 'text-amber-600 fill-amber-500' : 'text-slate-400'}`} />
            <span className="hidden md:inline">{isLowData ? 'Low Data' : 'Standard'}</span>
          </button>

          {/* Minimal Language Select */}
          <div className="relative inline-flex items-center">
            <div className="flex items-center gap-1 px-2 py-1.5 sm:px-2.5 rounded-full text-xs font-medium bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 transition cursor-pointer">
              <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-800 outline-none cursor-pointer pr-0 sm:pr-1"
                aria-label="Select Language"
              >
                {supportedLanguages.map((l) => (
                  <option key={l.code} value={l.code} className="text-slate-900 font-medium">
                    {l.flag} {l.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Help & Support Desk Pill Button (Desktop/Tablet - on mobile it is in the sub-bar below) */}
          <button
            onClick={onOpenHelp}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold bg-upsaffron-50 hover:bg-upsaffron-100 text-upsaffron-800 border border-upsaffron-300/80 transition-all shadow-2xs group cursor-pointer"
            title="GyanSetu Help & Support Desk (Toll-Free: 1800-180-5321)"
          >
            <HelpCircle className="w-3.5 h-3.5 text-upsaffron-600 group-hover:scale-110 transition-transform shrink-0" />
            <span className="hidden lg:inline">Help</span>
          </button>

          {/* User Profile / Menu Dropdown */}
          <div className="relative" ref={menuRef}>
            {currentUser ? (
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-1.5 p-1 sm:pl-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-full transition text-xs text-upnavy-900 font-semibold"
              >
                <span className="hidden md:inline font-bold">{currentUser.name.split(' ')[0]}</span>
                <div className="w-7 h-7 rounded-full bg-upnavy-100 text-upnavy-900 flex items-center justify-center font-bold text-xs shadow-2xs border border-upnavy-200 shrink-0">
                  {currentUser.avatar}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-0.5 hidden sm:inline" />
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Guest</span>
                </span>
                <button
                  onClick={onOpenAuthModal}
                  className="px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold bg-upsaffron-600 hover:bg-upsaffron-700 text-white shadow-sm shadow-upsaffron-600/30 transition active:scale-95 flex items-center gap-1 sm:gap-1.5 shrink-0"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline sm:inline">Sign In</span>
                </button>
              </div>
            )}

            {/* Modernized Profile Dropdown Popover */}
            {isProfileMenuOpen && currentUser && (
              <div className="absolute right-0 mt-2.5 w-[calc(100vw-24px)] max-w-xs sm:w-80 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200/90 p-3 z-50 ring-1 ring-slate-900/5 animate-fadeIn text-xs">
                
                {/* User Info Header with Avatar & Badge */}
                <div className="p-3 bg-gradient-to-br from-slate-50 via-slate-50 to-upnavy-50/50 rounded-2xl border border-slate-200/80 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <div className="w-11 h-11 rounded-2xl bg-upnavy-100 border border-upnavy-200 text-xl flex items-center justify-center font-bold shadow-2xs">
                        {currentUser.avatar}
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" title="Active Account" />
                    </div>
                    <div className="overflow-hidden space-y-0.5">
                      <div className="font-black text-upnavy-950 text-sm truncate leading-snug">
                        {currentUser.name}
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-upsaffron-100 text-upsaffron-800 border border-upsaffron-200 uppercase">
                          {currentUser.role}
                        </span>
                        {currentUser.grade && (
                          <span className="text-[10px] font-bold text-upnavy-900 bg-upnavy-50 border border-upnavy-200 px-2 py-0.5 rounded-full truncate">
                            {currentUser.grade}
                          </span>
                        )}
                      </div>
                      {currentUser.school && (
                        <div className="text-[10px] text-slate-400 truncate mt-0.5">
                          {currentUser.school}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Student Streak & XP Highlight (Interactive) */}
                  {currentUser.role === 'student' && studentStats && (
                    <div className="mt-2.5 pt-2 border-t border-slate-200/70 grid grid-cols-2 gap-2 text-[11px]">
                      <div className="flex items-center gap-1.5 font-bold text-amber-700 bg-amber-50/80 px-2.5 py-1 rounded-xl border border-amber-200/60">
                        <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                        <span className="truncate">{studentStats.streakDays || 4}d Streak</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setIsProfileMenuOpen(false);
                          if (onOpenXpRewards) onOpenXpRewards();
                        }}
                        className="flex items-center gap-1.5 font-bold text-upsaffron-700 bg-upsaffron-50 hover:bg-upsaffron-100 px-2.5 py-1 rounded-xl border border-upsaffron-300 transition cursor-pointer active:scale-95 group text-left"
                        title="View XP Level, Rewards & Uses"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-upsaffron-500 group-hover:rotate-12 transition-transform shrink-0" />
                        <span className="truncate">{studentStats.pointsXP || 350} XP 🎁</span>
                      </button>
                    </div>
                  )}

                  {/* Profile Edit Option Button */}
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onOpenProfileEdit();
                    }}
                    className="w-full mt-3 py-2 px-3 rounded-xl bg-white hover:bg-upsaffron-50 text-upnavy-900 hover:text-upsaffron-800 font-bold border border-slate-200 hover:border-upsaffron-300 text-xs flex items-center justify-between transition-all shadow-2xs group cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <UserCog className="w-4 h-4 text-upsaffron-600" />
                      <span>Edit Profile Details</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:text-upsaffron-600 transition" />
                  </button>
                </div>

                {/* Quick Menu Options */}
                <div className="space-y-1">
                  {currentUser.role === 'student' && (
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        if (onOpenXpRewards) onOpenXpRewards();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-amber-50/80 text-amber-950 flex items-center justify-between transition font-medium group"
                    >
                      <span className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center transition">
                          <Trophy className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-bold text-xs text-amber-900">XP Rewards & Scholarships</span>
                      </span>
                      <span className="text-[10px] bg-amber-100 px-2 py-0.5 rounded-full text-amber-900 font-bold">
                        Level 3 ⭐
                      </span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onOpenDownloads();
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-upnavy-950 flex items-center justify-between transition font-medium group"
                  >
                    <span className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-upnavy-100 text-slate-600 group-hover:text-upnavy-800 flex items-center justify-center transition">
                        <HardDrive className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold text-xs">Offline Storage</span>
                    </span>
                    <span className="text-[10px] bg-slate-100 group-hover:bg-upnavy-100 px-2 py-0.5 rounded-full text-slate-600 group-hover:text-upnavy-900 font-bold transition">
                      {downloadedCount} cached
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onOpenHelp();
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-upsaffron-50 text-slate-700 hover:text-upsaffron-800 flex items-center justify-between transition font-medium group"
                  >
                    <span className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-upsaffron-100 text-upsaffron-700 flex items-center justify-center transition">
                        <HelpCircle className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold text-xs">Help & Support Desk</span>
                    </span>
                    <span className="text-[10px] text-upsaffron-700 bg-upsaffron-50 px-2 py-0.5 rounded-full border border-upsaffron-200 font-bold">
                      Toll-Free
                    </span>
                  </button>

                  {/* Mobile Quick Toggles for Data Saver and Offline Simulation */}
                  <div className="sm:hidden pt-2 pb-1 border-t border-slate-100 space-y-1">
                    <button
                      onClick={() => setIsOffline(!isOffline)}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 flex items-center justify-between text-xs font-semibold"
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${isOffline ? 'bg-rose-500 ring-2 ring-rose-200' : 'bg-emerald-500 ring-2 ring-emerald-200'}`} />
                        <span className="text-slate-700">Offline Simulation</span>
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isOffline ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                        {isOffline ? 'Offline' : 'Online'}
                      </span>
                    </button>
                    <button
                      onClick={() => setIsLowData(!isLowData)}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 flex items-center justify-between text-xs font-semibold"
                    >
                      <span className="flex items-center gap-2">
                        <Zap className={`w-3.5 h-3.5 ${isLowData ? 'text-amber-600 fill-amber-500' : 'text-slate-400'}`} />
                        <span className="text-slate-700">Low Data Saver</span>
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isLowData ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-700'}`}>
                        {isLowData ? 'Enabled' : 'Disabled'}
                      </span>
                    </button>
                  </div>

                  <div className="pt-1.5 mt-1 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        onOpenAuthModal();
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-upsaffron-50 text-upnavy-950 hover:text-upsaffron-700 font-bold flex items-center gap-2.5 transition"
                    >
                      <div className="w-7 h-7 rounded-lg bg-upsaffron-100 text-upsaffron-700 flex items-center justify-center">
                        <LogIn className="w-3.5 h-3.5" />
                      </div>
                      <span>Login</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Role Switcher (Shown only on small screens) */}
      <div className="md:hidden border-t border-slate-200/80 px-3 py-2 bg-slate-50/95 backdrop-blur-md flex items-center justify-between text-xs gap-1.5 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setRole('student')}
            className={`px-3 py-1 rounded-full font-semibold text-xs transition ${role === 'student' ? 'bg-upnavy-800 text-white shadow-xs font-bold' : 'text-slate-600 bg-white border border-slate-200/70'}`}
          >
            Student
          </button>
          <button
            onClick={() => setRole('teacher')}
            className={`px-3 py-1 rounded-full font-semibold text-xs transition ${role === 'teacher' ? 'bg-upnavy-800 text-white shadow-xs font-bold' : 'text-slate-600 bg-white border border-slate-200/70'}`}
          >
            Teacher
          </button>
          <button
            onClick={() => setRole('parent')}
            className={`px-3 py-1 rounded-full font-semibold text-xs transition ${role === 'parent' ? 'bg-upnavy-800 text-white shadow-xs font-bold' : 'text-slate-600 bg-white border border-slate-200/70'}`}
          >
            Parent
          </button>
          <button
            onClick={() => setRole('admin')}
            className={`px-3 py-1 rounded-full font-semibold text-xs transition ${role === 'admin' ? 'bg-upnavy-800 text-white shadow-xs font-bold' : 'text-slate-600 bg-white border border-slate-200/70'}`}
          >
            Admin
          </button>
        </div>
        
        <div className="flex items-center gap-1.5 shrink-0">
          {isOffline && (
            <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full border border-rose-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              Offline
            </span>
          )}
          <button
            onClick={onOpenHelp}
            className="px-2.5 py-1 rounded-full font-bold text-upsaffron-700 bg-upsaffron-100 hover:bg-upsaffron-200 border border-upsaffron-300 shrink-0 flex items-center gap-1 text-xs"
            title="Help & Support Desk"
          >
            <HelpCircle className="w-3 h-3 text-upsaffron-600" />
            <span>Help</span>
          </button>
        </div>
      </div>
    </header>
  );
}
