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
  School,
  Sun,
  Moon
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
  theme = 'light',
  onToggleTheme, 
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
          <nav className="hidden md:flex items-center bg-slate-100/90 dark:bg-slate-800/90 p-1 rounded-full border border-slate-200/70 dark:border-slate-700 text-xs">
            <button
              onClick={() => setRole('student')}
              className={`px-3 py-1 rounded-full font-semibold transition-all duration-150 ${
                role === 'student'
                  ? 'bg-upnavy-800 text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-upnavy-900 dark:hover:text-white'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => setRole('teacher')}
              className={`px-3 py-1 rounded-full font-semibold transition-all duration-150 ${
                role === 'teacher'
                  ? 'bg-upnavy-800 text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-upnavy-900 dark:hover:text-white'
              }`}
            >
              Teacher
            </button>
            <button
              onClick={() => setRole('parent')}
              className={`px-3 py-1 rounded-full font-semibold transition-all duration-150 ${
                role === 'parent'
                  ? 'bg-upnavy-800 text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-upnavy-900 dark:hover:text-white'
              }`}
            >
              Parent
            </button>
            <button
              onClick={() => setRole('admin')}
              className={`px-3 py-1 rounded-full font-semibold transition-all duration-150 ${
                role === 'admin'
                  ? 'bg-upnavy-800 text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-upnavy-900 dark:hover:text-white'
              }`}
            >
              Admin
            </button>
          </nav>
        </div>

        {/* Right: Modern Compact Utilities */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Active Class Grade Selector Dropdown */}
          <div className="relative" ref={classMenuRef}>
            <button
              onClick={() => setIsClassMenuOpen(!isClassMenuOpen)}
              className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-upnavy-900 dark:text-slate-100 border border-slate-200/90 dark:border-slate-700 flex items-center gap-1.5 transition active:scale-95 shadow-2xs"
              title="Switch Class Curriculum (Classes 6 to 10)"
            >
              <School className="w-3.5 h-3.5 text-upsaffron-600 shrink-0" />
              <span>{selectedGrade || 'Class 7'}</span>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
            </button>

            {isClassMenuOpen && (
              <div className="absolute top-full mt-2 left-0 sm:left-auto sm:right-0 w-52 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50 animate-scaleUp">
                <div className="px-3 py-1.5 text-[10px] font-black uppercase text-slate-400 tracking-wider border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span>Curriculum Class</span>
                  <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.2 rounded font-mono">6 to 10</span>
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
                        ? 'bg-upnavy-50 dark:bg-slate-800 text-upnavy-950 dark:text-slate-100 font-black' 
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{item.label}</div>
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

          {/* Unified Compact Network & Data Status Capsule (Consolidates Sync, Offline, and Low Data) */}
          <div className="hidden sm:flex items-center bg-slate-100/90 dark:bg-slate-800/90 p-0.5 rounded-full border border-slate-200/80 dark:border-slate-700 text-xs">
            <button
              onClick={() => setIsOffline(!isOffline)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold transition active:scale-95 ${
                isOffline
                  ? 'bg-rose-500 text-white shadow-2xs font-bold'
                  : 'text-slate-700 dark:text-slate-200 hover:text-upnavy-950'
              }`}
              title={isOffline ? 'Offline Mode Active - Tap to restore Online' : 'Online Mode - Tap to simulate Offline'}
            >
              <span className={`w-2 h-2 rounded-full ${isOffline ? 'bg-white' : 'bg-emerald-500'}`} />
              <span className="text-[11px] font-bold">{isOffline ? 'Offline' : 'Online'}</span>
            </button>

            <button
              onClick={() => setIsLowData(!isLowData)}
              className={`flex items-center gap-1 px-2 py-1 rounded-full font-bold transition active:scale-95 ${
                isLowData
                  ? 'bg-amber-500 text-white shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
              title={isLowData ? 'Low-Data Mode ON (<40KB) - Tap for Standard' : 'Standard Visuals - Tap for Low-Data Saver (<40KB)'}
            >
              <Zap className={`w-3 h-3 ${isLowData ? 'fill-white' : ''}`} />
              <span className="text-[10px] hidden xl:inline">{isLowData ? 'Saver' : ''}</span>
            </button>

            {pendingSyncCount > 0 && (
              <button
                onClick={onSyncNow}
                className="flex items-center gap-1 px-2 py-1 rounded-full font-bold text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition active:scale-95"
                title={`${pendingSyncCount} pending offline changes - Click to Sync Now`}
              >
                <RefreshCw className="w-3 h-3 text-amber-600 animate-spin-slow" />
                <span className="text-[11px]">{pendingSyncCount}</span>
              </button>
            )}
          </div>

          {/* Minimal Language Select (Compact Flag + Code) */}
          <div className="relative inline-flex items-center">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700 transition cursor-pointer">
              <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-800 dark:text-slate-100 outline-none cursor-pointer uppercase pr-0.5"
                aria-label="Select Language"
              >
                {supportedLanguages.map((l) => (
                  <option key={l.code} value={l.code} className="text-slate-900 font-medium">
                    {l.flag} {l.name} ({l.code.toUpperCase()})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Help & Support Desk Circular Icon Button */}
          <button
            onClick={onOpenHelp}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 transition active:scale-95 shadow-2xs shrink-0 cursor-pointer"
            title="GyanSetu Help & Support Desk (1800 180 5321)"
            aria-label="Help & Support Desk"
          >
            <HelpCircle className="w-4 h-4 text-upsaffron-600" />
          </button>

          {/* Dark / Light Mode Circular Icon Button */}
          <button
            onClick={onToggleTheme}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-amber-300 border border-slate-200/80 dark:border-slate-700 transition active:scale-95 shadow-2xs shrink-0 cursor-pointer"
            title={theme === 'dark' ? (lang === 'hi' ? 'लाइट मोड (डिफ़ॉल्ट)' : 'Switch to Light Mode (Default)') : (lang === 'hi' ? 'डार्क मोड' : 'Switch to Dark Mode')}
            aria-label="Toggle Dark and Light Mode"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20" />
            ) : (
              <Moon className="w-4 h-4 text-upnavy-800" />
            )}
          </button>

          {/* User Profile / Sign In (Clean, uncluttered, no clipping) */}
          <div className="relative shrink-0" ref={menuRef}>
            {currentUser ? (
              <div className="flex items-center gap-1 sm:gap-1.5">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-1.5 p-1 pr-2.5 sm:pl-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 rounded-full transition text-xs text-upnavy-900 dark:text-slate-100 font-semibold cursor-pointer active:scale-95"
                  title="Open user profile menu"
                >
                  <div className="w-6 h-6 rounded-full bg-upnavy-100 text-upnavy-900 flex items-center justify-center font-bold text-xs shadow-2xs border border-upnavy-200 shrink-0">
                    {currentUser.avatar}
                  </div>
                  <span className="hidden sm:inline font-bold">{currentUser.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-upsaffron-600 hover:bg-upsaffron-700 text-white shadow-sm shadow-upsaffron-600/30 transition active:scale-95 flex items-center gap-1.5 shrink-0"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
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

                  <div className="pt-2 mt-1.5 border-t border-slate-100 space-y-1.5">
                    {/* Theme Mode Option */}
                    <button
                      onClick={() => {
                        onToggleTheme();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center justify-between transition group cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        {theme === 'dark' ? (
                          <Sun className="w-3.5 h-3.5 text-amber-400" />
                        ) : (
                          <Moon className="w-3.5 h-3.5 text-upnavy-700 dark:text-slate-300" />
                        )}
                        <span>{lang === 'hi' ? 'थीम मोड' : 'Appearance'}</span>
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                        {theme === 'dark' ? (lang === 'hi' ? 'डार्क 🌙' : 'Dark 🌙') : (lang === 'hi' ? 'लाइट ☀️' : 'Light ☀️')}
                      </span>
                    </button>

                    {/* Switch / Another Account */}
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        onOpenAuthModal();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-between transition group cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <LogIn className="w-3.5 h-3.5 text-slate-500 group-hover:text-upsaffron-600 transition" />
                        <span>{lang === 'hi' ? 'अन्य खाते में लॉगिन करें' : 'Switch / Another Account'}</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    {/* Proper High-Visibility Logout Button */}
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl bg-rose-50/80 hover:bg-rose-100/90 text-rose-700 font-bold text-xs flex items-center justify-between transition border border-rose-200/80 active:scale-[0.99] cursor-pointer group shadow-2xs"
                    >
                      <span className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-rose-200/80 text-rose-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <LogOut className="w-3.5 h-3.5" />
                        </div>
                        <span>{lang === 'hi' ? 'लॉगआउट करें (अतिथि मोड)' : 'Sign Out / Logout'}</span>
                      </span>
                      <span className="text-[10px] bg-white text-rose-700 px-2 py-0.5 rounded-full border border-rose-200 font-bold">
                        {lang === 'hi' ? 'अतिथि मोड' : 'To Guest'}
                      </span>
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
          {currentUser && (
            <button
              onClick={onLogout}
              className="px-2.5 py-1 rounded-full font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 shrink-0 flex items-center gap-1 text-xs transition active:scale-95 cursor-pointer"
              title="Sign Out / Logout"
            >
              <LogOut className="w-3 h-3 text-rose-600" />
              <span>Logout</span>
            </button>
          )}
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
          <button
            onClick={onToggleTheme}
            className="p-1.5 rounded-full font-bold text-slate-700 dark:text-amber-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shrink-0 flex items-center justify-center transition active:scale-95 cursor-pointer"
            title={theme === 'dark' ? (lang === 'hi' ? 'लाइट मोड' : 'Switch to Light Mode') : (lang === 'hi' ? 'डार्क मोड' : 'Switch to Dark Mode')}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
          </button>
        </div>
      </div>
    </header>
  );
}
