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
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { supportedLanguages } from '../data/mockData';

const AVAILABLE_AVATARS = [
  { emoji: '🎓', label: 'Scholar Student' },
  { emoji: '🚀', label: 'Explorer' },
  { emoji: '🌟', label: 'Star Achiever' },
  { emoji: '📚', label: 'Avid Reader' },
  { emoji: '🔬', label: 'Young Scientist' },
  { emoji: '👨‍🎓', label: 'Scholar Boy' },
  { emoji: '👩‍🎓', label: 'Scholar Girl' },
  { emoji: '🧑‍💻', label: 'Digital Learner' },
  { emoji: '💡', label: 'Innovator' },
  { emoji: '🏆', label: 'Champion' },
  { emoji: '🎨', label: 'Creative Artist' },
  { emoji: '🦁', label: 'Courageous' },
  { emoji: '👨‍🏫', label: 'Teacher' },
  { emoji: '📱', label: 'Parent Phone' },
  { emoji: '🏛️', label: 'Principal' }
];

export function ProfileEditModal({ isOpen, onClose, currentUser, onSaveProfile, lang }) {
  if (!isOpen || !currentUser) return null;

  const [name, setName] = useState(currentUser.name || '');
  const [avatar, setAvatar] = useState(currentUser.avatar || '🎓');
  const [grade, setGrade] = useState(currentUser.grade || 'Class 7A');
  const [rollNo, setRollNo] = useState(currentUser.rollNo || '24');
  const [school, setSchool] = useState(currentUser.school || 'Govt Upper Primary School Rampur');
  const [selectedLanguage, setSelectedLanguage] = useState(currentUser.language || lang || 'en');
  const [phone, setPhone] = useState(currentUser.phone || '+91 98765 43210');
  const [designation, setDesignation] = useState(currentUser.designation || 'Senior Subject Teacher');

  // Sync state if currentUser changes
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setAvatar(currentUser.avatar || '🎓');
      setGrade(currentUser.grade || 'Class 7A');
      setRollNo(currentUser.rollNo || '24');
      setSchool(currentUser.school || 'Govt Upper Primary School Rampur');
      setSelectedLanguage(currentUser.language || lang || 'en');
      setPhone(currentUser.phone || '+91 98765 43210');
      setDesignation(currentUser.designation || 'Senior Subject Teacher');
    }
  }, [currentUser, lang]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const updatedUser = {
      ...currentUser,
      name: name.trim(),
      avatar,
      grade,
      rollNo,
      school: school.trim(),
      language: selectedLanguage,
      phone: phone.trim(),
      designation: designation.trim()
    };

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.4 }
      });
    } catch (err) {}

    onSaveProfile(updatedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-4 sm:p-7 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto flex flex-col">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-upsaffron-50 text-upsaffron-700 border border-upsaffron-200 flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5 text-upsaffron-600" />
            </div>
            <div>
              <h2 className="text-lg font-black text-upnavy-950 flex items-center gap-2">
                <span>Edit Profile</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-upnavy-100 text-upnavy-900 border border-upnavy-200">
                  {currentUser.role.toUpperCase()}
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                {lang === 'hi' 
                  ? 'अपनी व्यक्तिगत जानकारी, अवतार और विद्यालय का विवरण अपडेट करें' 
                  : 'Customize your avatar, display name, and school credentials'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Preview Card */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-upnavy-900 via-upnavy-800 to-upnavy-950 text-white border border-upnavy-700/60 shadow-lg relative overflow-hidden flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-white/30 text-3xl flex items-center justify-center shadow-inner">
              {avatar}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-upsaffron-500 text-white p-1 rounded-full text-[10px] shadow">
              <Sparkles className="w-3 h-3" />
            </div>
          </div>
          <div className="overflow-hidden space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-black truncate">{name || 'Your Full Name'}</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-upsaffron-500/20 text-upsaffron-300 border border-upsaffron-400/40 uppercase">
                {currentUser.role}
              </span>
            </div>
            <p className="text-xs text-slate-300 truncate flex items-center gap-1.5">
              <School className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{school || 'School Name'}</span>
            </p>
            {currentUser.role === 'student' && (
              <p className="text-[11px] text-upsaffron-300 font-semibold">
                {grade} • Roll No. {rollNo}
              </p>
            )}
            {currentUser.role === 'teacher' && (
              <p className="text-[11px] text-upsaffron-300 font-semibold">
                {designation}
              </p>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          
          {/* Avatar Picker */}
          <div>
            <label className="block font-bold text-slate-700 mb-2 flex items-center justify-between">
              <span>{lang === 'hi' ? 'अवतार चुनें:' : 'Select Your Avatar:'}</span>
              <span className="text-[11px] text-slate-400 font-normal">Click any character to select</span>
            </label>
            <div className="grid grid-cols-5 sm:grid-cols-5 gap-2 p-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl">
              {AVAILABLE_AVATARS.map((av, idx) => {
                const isSelected = avatar === av.emoji;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatar(av.emoji)}
                    title={av.label}
                    className={`h-11 rounded-xl text-xl flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-white shadow-md ring-2 ring-upsaffron-500 scale-105 font-bold border border-upsaffron-300'
                        : 'hover:bg-white/80 opacity-80 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <span>{av.emoji}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">
              {lang === 'hi' ? 'पूरा नाम (Full Name):' : 'Full Name:'}
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rohan Verma"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-upsaffron-500 text-xs font-semibold text-slate-900 transition"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Role specific inputs */}
          {currentUser.role === 'student' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Class / Grade:</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                >
                  <option value="Class 6A">Class 6A</option>
                  <option value="Class 6B">Class 6B</option>
                  <option value="Class 7A">Class 7A</option>
                  <option value="Class 7B">Class 7B</option>
                  <option value="Class 8A">Class 8A</option>
                  <option value="Class 8B">Class 8B</option>
                  <option value="Class 9A">Class 9A</option>
                  <option value="Class 10A">Class 10A</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Roll Number:</label>
                <div className="relative">
                  <input
                    type="text"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    placeholder="e.g. 24"
                    className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                  />
                  <Hash className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
                </div>
              </div>
            </div>
          )}

          {currentUser.role === 'teacher' && (
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Subject / Designation:</label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="Senior Math & Science Teacher"
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
              />
            </div>
          )}

          {/* School Name */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">
              {lang === 'hi' ? 'विद्यालय या गाँव का नाम:' : 'School or Village Name:'}
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="e.g. Govt Upper Primary School Rampur"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-upsaffron-500 text-xs font-semibold text-slate-900 transition"
              />
              <School className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Language & Phone Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                {lang === 'hi' ? 'पसंदीदा भाषा (Language):' : 'Preferred Regional Language:'}
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
              >
                {supportedLanguages.map(l => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                {lang === 'hi' ? 'अभिभावक मोबाइल (SMS/IVR):' : 'Guardian Phone (SMS / IVR):'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
                />
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-upsaffron-600 hover:bg-upsaffron-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-upsaffron-600/30 transition active:scale-95"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'परिवर्तन सहेजें' : 'Save Profile Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
