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
  UserCog
} from 'lucide-react';
import { translations, supportedLanguages } from '../data/mockData';

export function Navbar({ 
  currentUser,
  onOpenAuthModal,
  onOpenProfileEdit,
  onLogout,
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
  onOpenArchitecture
}) {
  const t = translations[lang] || translations['en'];
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs transition-all">
      {/* UP Portal Government Aesthetic Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-upsaffron-600 via-amber-400 to-upnavy-800" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand + Role Navigation Pills */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setRole('student')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-upnavy-900 via-upnavy-800 to-upnavy-700 flex items-center justify-center text-upsaffron-400 shadow-sm shadow-upnavy-900/30 border border-upnavy-700/40">
              <BookOpen className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-upnavy-950 font-sans leading-none">
                Gyan<span className="text-upsaffron-600">Setu</span>
              </span>
              <span className="block text-[10px] text-slate-500 font-semibold tracking-tight">
                Rural EdTech Portal
              </span>
            </div>
          </div>

          {/* Segmented Role Navigation */}
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
        <div className="flex items-center gap-2.5">
          {/* Offline Sync Alert Pill (Only shown if pending syncs) */}
          {pendingSyncCount > 0 && (
            <button
              onClick={onSyncNow}
              className="hidden sm:flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1.5 rounded-full text-[11px] font-bold transition active:scale-95 shadow-2xs"
              title="Click to push offline quiz results to school database"
            >
              <RefreshCw className="w-3 h-3 text-amber-700" />
              <span>{pendingSyncCount} Sync Pending</span>
            </button>
          )}

          {/* Network Simulator Indicator Button */}
          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              isOffline
                ? 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100 shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200/80'
            }`}
            title="Click to toggle simulated offline mode"
          >
            <span className={`w-2 h-2 rounded-full ${isOffline ? 'bg-rose-500 ring-2 ring-rose-200' : 'bg-emerald-500 ring-2 ring-emerald-200'}`} />
            <span className="hidden sm:inline font-semibold">{isOffline ? 'Offline' : 'Online'}</span>
          </button>

          {/* Minimalist Low Data Toggle Pill */}
          <button
            onClick={() => setIsLowData(!isLowData)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              isLowData
                ? 'bg-amber-50 text-amber-900 border-amber-300/80 shadow-xs'
                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200/80'
            }`}
            title="Low Data Mode: saves 98% bandwidth with audio & text only"
          >
            <Zap className={`w-3.5 h-3.5 ${isLowData ? 'text-amber-600 fill-amber-500' : 'text-slate-400'}`} />
            <span className="hidden sm:inline">{isLowData ? 'Low Data' : 'Standard'}</span>
          </button>

          {/* Minimal Language Select */}
          <div className="relative inline-flex items-center">
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 transition cursor-pointer">
              <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-800 outline-none cursor-pointer pr-1"
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

          {/* User Profile / Menu Dropdown */}
          <div className="relative" ref={menuRef}>
            {currentUser ? (
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 p-1 pl-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-full transition text-xs text-upnavy-900 font-semibold"
              >
                <span className="hidden md:inline font-bold">{currentUser.name.split(' ')[0]}</span>
                <div className="w-7 h-7 rounded-full bg-upnavy-100 text-upnavy-900 flex items-center justify-center font-bold text-xs shadow-2xs border border-upnavy-200">
                  {currentUser.avatar}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1" />
              </button>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="px-4 py-1.5 rounded-full text-xs font-bold bg-upsaffron-600 hover:bg-upsaffron-700 text-white shadow-sm shadow-upsaffron-600/30 transition active:scale-95 flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Modernized Profile Dropdown Popover */}
            {isProfileMenuOpen && currentUser && (
              <div className="absolute right-0 mt-2.5 w-72 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200/90 p-3 z-50 ring-1 ring-slate-900/5 animate-fadeIn text-xs">
                
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
                          <span className="text-[10px] text-slate-500 font-medium truncate">
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

                  {/* Profile Edit Option Button */}
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onOpenProfileEdit();
                    }}
                    className="w-full mt-3 py-2 px-3 rounded-xl bg-white hover:bg-upsaffron-50 text-upnavy-900 hover:text-upsaffron-800 font-bold border border-slate-200 hover:border-upsaffron-300 text-xs flex items-center justify-between transition-all shadow-2xs group"
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
                      onOpenArchitecture();
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-upnavy-950 flex items-center justify-between transition font-medium group"
                  >
                    <span className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-upnavy-100 text-slate-600 group-hover:text-upnavy-800 flex items-center justify-center transition">
                        <Layers className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold text-xs">Viva Technical Deck</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Architecture
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onOpenAuthModal();
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-upsaffron-50 text-slate-700 hover:text-upsaffron-800 flex items-center justify-between transition font-medium group"
                  >
                    <span className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-upsaffron-50 text-upsaffron-600 flex items-center justify-center transition">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold text-xs">Switch Role / Demo</span>
                    </span>
                    <span className="text-[10px] text-upsaffron-600 font-bold">
                      Shortcut
                    </span>
                  </button>

                  <div className="pt-1.5 mt-1 border-t border-slate-100">
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-rose-50 text-rose-600 font-bold flex items-center gap-2.5 transition"
                    >
                      <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                        <LogOut className="w-3.5 h-3.5" />
                      </div>
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Role Switcher (Shown only on small screens) */}
      <div className="md:hidden border-t border-slate-100 px-4 py-2 bg-slate-50 flex items-center justify-between text-xs overflow-x-auto gap-2">
        <button
          onClick={() => setRole('student')}
          className={`px-3 py-1 rounded-full font-semibold shrink-0 ${role === 'student' ? 'bg-upnavy-800 text-white' : 'text-slate-600'}`}
        >
          Student
        </button>
        <button
          onClick={() => setRole('teacher')}
          className={`px-3 py-1 rounded-full font-semibold shrink-0 ${role === 'teacher' ? 'bg-upnavy-800 text-white' : 'text-slate-600'}`}
        >
          Teacher
        </button>
        <button
          onClick={() => setRole('parent')}
          className={`px-3 py-1 rounded-full font-semibold shrink-0 ${role === 'parent' ? 'bg-upnavy-800 text-white' : 'text-slate-600'}`}
        >
          Parent
        </button>
        <button
          onClick={() => setRole('admin')}
          className={`px-3 py-1 rounded-full font-semibold shrink-0 ${role === 'admin' ? 'bg-upnavy-800 text-white' : 'text-slate-600'}`}
        >
          Admin
        </button>
      </div>
    </header>
  );
}
