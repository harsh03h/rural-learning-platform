import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Brain, 
  ArrowRight, 
  CheckCircle, 
  Award, 
  Download, 
  Play, 
  Flame, 
  BookOpen, 
  Check, 
  Zap, 
  Filter, 
  BarChart3, 
  Compass, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Eye, 
  TrendingUp, 
  Volume2, 
  HardDrive, 
  Target, 
  GraduationCap, 
  School, 
  CheckCheck, 
  Trophy, 
  Gift,
  Calendar,
  Clock,
  Lightbulb,
  FolderDown
} from 'lucide-react';
import { translations, sampleCourses, getLocalized } from '../data/mockData';
import { ClassTimetableModal } from './ClassTimetableModal';

export const CLASS_METADATA = {
  'Class 6': {
    label: 'Class 6',
    stage: 'Middle School',
    badge: 'Foundation',
    color: 'from-purple-900 to-indigo-950',
    accentBadge: 'bg-purple-100 text-purple-900 border-purple-200',
    ring: 'ring-purple-500/80',
    sub: 'Middle School Foundation',
    desc: 'NCERT Mathematics, Science, English, Social Science, Hindi, and Digital Literacy foundation.'
  },
  'Class 7': {
    label: 'Class 7',
    stage: 'Middle School',
    badge: 'Core',
    color: 'from-upnavy-900 to-upnavy-950',
    accentBadge: 'bg-amber-100 text-amber-900 border-amber-200',
    ring: 'ring-upsaffron-500/80',
    sub: 'Core Middle School',
    desc: 'NCERT Integers & Fractions, Science Nutrition, English Grammar, Hindi Stories, Medieval History, and Digital Skills.'
  },
  'Class 8': {
    label: 'Class 8',
    stage: 'Upper Primary',
    badge: 'Advanced',
    color: 'from-emerald-900 to-teal-950',
    accentBadge: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    ring: 'ring-emerald-500/80',
    sub: 'Upper Primary Advanced',
    desc: 'NCERT Rational Numbers & Linear Equations, Science Microorganisms, Modern History & Civics, and Cyber Safety.'
  },
  'Class 9': {
    label: 'Class 9',
    stage: 'Secondary',
    badge: 'Concepts',
    color: 'from-rose-900 to-slate-950',
    accentBadge: 'bg-rose-100 text-rose-900 border-rose-200',
    ring: 'ring-rose-500/80',
    sub: 'Secondary Board Prep',
    desc: 'NCERT Number Systems & Polynomials, Motion & Cell Biology, Democratic Politics, Hindi Literature, and Computer Science.'
  },
  'Class 10': {
    label: 'Class 10',
    stage: 'Secondary',
    badge: 'Board Prep',
    color: 'from-amber-900 to-stone-950',
    accentBadge: 'bg-indigo-100 text-indigo-900 border-indigo-200',
    ring: 'ring-indigo-500/80',
    sub: 'High School Board Exam',
    desc: 'NCERT Real Numbers & Trigonometry, Chemical Reactions, Nationalism in India, English Board Writing, and Mock Board Prep.'
  }
};

export const REMEDIAL_ROADMAP_BY_GRADE = {
  'Class 6': [
    {
      title: "Whole Numbers & Number Line (Class 6)",
      status: "Mastered (95%) ✓",
      statusColor: "bg-emerald-100 text-emerald-800",
      desc: "Strong conceptual foundation in Indian place value system, estimation, and number line jumps.",
      type: "mastered"
    },
    {
      title: "Fractions as Parts of a Whole (Class 6)",
      status: "Priority Focus (45%)",
      statusColor: "bg-rose-200/80 text-rose-900",
      desc: "Struggling with visual division of objects (e.g. roti division). Practice basic unit fractions.",
      type: "weak",
      action: "Start Class 6 Foundation Lesson"
    },
    {
      title: "Integers & Negative Numbers (Class 7 Prerequisite)",
      status: "Prerequisite Locked",
      statusColor: "bg-amber-200/80 text-amber-900",
      desc: "Unlocks after completing Class 6 Fractions Chapter 1 with 70%+ score to prevent sign confusion.",
      type: "locked"
    },
    {
      title: "Basic Geometric Shapes (Class 6)",
      status: "In Progress (60%)",
      statusColor: "bg-blue-100 text-blue-800",
      desc: "Point, line segment, ray, and angles with everyday village boundary examples.",
      type: "progress"
    }
  ],
  'Class 7': [
    {
      title: "Fractions & Decimals Operations (Class 7)",
      status: "Priority Weak (40%)",
      statusColor: "bg-rose-200/80 text-rose-900",
      desc: "Difficulty identified in adding unequal denominators. Reviewing the roti division model is recommended.",
      type: "weak",
      action: "Start Remedial Lesson"
    },
    {
      title: "Linear Equations (Class 8 Prerequisite)",
      status: "Prerequisite Locked",
      statusColor: "bg-amber-200/80 text-amber-900",
      desc: "Locked until Class 7 Fractions & Integers is completed with 70%+ score to prevent algebraic confusion.",
      type: "locked"
    },
    {
      title: "Whole Numbers & Place Value (Class 6 Prerequisite)",
      status: "Mastered (95%) ✓",
      statusColor: "bg-emerald-100 text-emerald-800",
      desc: "Strong conceptual foundation in Indian place value system and basic arithmetic operations.",
      type: "mastered"
    },
    {
      title: "Nutrition in Plants & Animals (Class 7 Science)",
      status: "On Track (75%)",
      statusColor: "bg-blue-100 text-blue-800",
      desc: "Photosynthesis mechanisms and digestive enzymes verified via interactive chapter quiz.",
      type: "progress"
    }
  ],
  'Class 8': [
    {
      title: "Linear Equations in One Variable (Class 8)",
      status: "Priority Weak (42%)",
      statusColor: "bg-rose-200/80 text-rose-900",
      desc: "Difficulty in transposing terms with variables across the equals sign. Practice balance scale method.",
      type: "weak",
      action: "Start Algebra Bridge Lesson"
    },
    {
      title: "Rational Numbers & Operations (Class 8)",
      status: "Mastered (92%) ✓",
      statusColor: "bg-emerald-100 text-emerald-800",
      desc: "Excellent understanding of closure, commutativity, and representation on number line.",
      type: "mastered"
    },
    {
      title: "Polynomials & Identities (Class 9 Prerequisite)",
      status: "Prerequisite Locked",
      statusColor: "bg-amber-200/80 text-amber-900",
      desc: "Unlocks once Linear Equations Chapter is completed with 75%+ score.",
      type: "locked"
    },
    {
      title: "Microorganisms: Friend and Foe (Class 8 Science)",
      status: "On Track (80%)",
      statusColor: "bg-blue-100 text-blue-800",
      desc: "Bacteria fermentation in curd and soil nitrogen fixation concepts mastered.",
      type: "progress"
    }
  ],
  'Class 9': [
    {
      title: "Coordinate Geometry & Graphing (Class 9)",
      status: "Priority Weak (44%)",
      statusColor: "bg-rose-200/80 text-rose-900",
      desc: "Cartesian plane quadrant identification and plotting negative coordinates require reinforcement.",
      type: "weak",
      action: "Start Geometry Visual Practice"
    },
    {
      title: "Real Numbers & Laws of Exponents (Class 9)",
      status: "Mastered (88%) ✓",
      statusColor: "bg-emerald-100 text-emerald-800",
      desc: "Irrational numbers on number line and rationalization of denominators mastered.",
      type: "mastered"
    },
    {
      title: "Quadratic Equations (Class 10 Board Prerequisite)",
      status: "Prerequisite Locked",
      statusColor: "bg-amber-200/80 text-amber-900",
      desc: "High school board prerequisite. Unlocks after Class 9 Polynomial Factorization is cleared.",
      type: "locked"
    },
    {
      title: "Motion & Laws of Force (Class 9 Physics)",
      status: "On Track (78%)",
      statusColor: "bg-blue-100 text-blue-800",
      desc: "Newton's second law and velocity-time graphs thoroughly evaluated via interactive problems.",
      type: "progress"
    }
  ],
  'Class 10': [
    {
      title: "Trigonometric Ratios & Applications (Class 10 Board Exam)",
      status: "High Weightage Focus (45%)",
      statusColor: "bg-rose-200/80 text-rose-900",
      desc: "Height & distances problems and identity transformations require step-by-step NCERT practice.",
      type: "weak",
      action: "Start Board Prep Drill"
    },
    {
      title: "Real Numbers & Euclid's Division Lemma (Class 10)",
      status: "Mastered (94%) ✓",
      statusColor: "bg-emerald-100 text-emerald-800",
      desc: "Fundamental Theorem of Arithmetic and proof of irrationality (√2, √3) mastered.",
      type: "mastered"
    },
    {
      title: "Board Exam Mock Paper 1 (Full Syllabus)",
      status: "Pre-Board Target",
      statusColor: "bg-amber-200/80 text-amber-900",
      desc: "Standard 80-mark mock paper aligned with latest CBSE / State Board question paper pattern.",
      type: "locked"
    },
    {
      title: "Light: Reflection & Refraction (Class 10 Science)",
      status: "On Track (82%)",
      statusColor: "bg-blue-100 text-blue-800",
      desc: "Ray diagrams for concave/convex mirrors and lens formula numericals mastered.",
      type: "progress"
    }
  ]
};

export function StudentView({ 
  lang, 
  isLowData, 
  isOffline,
  diagnosticData,
  onOpenDiagnostic,
  onOpenLesson,
  downloadedIds,
  onToggleDownload,
  onOpenAiSaathi,
  studentStats,
  currentUser,
  isAiSaathiOpen,
  onOpenXpRewards,
  selectedGrade: propSelectedGrade,
  onSelectGrade: propOnSelectGrade,
  onDownloadBatch
}) {
  const t = translations[lang] || translations['en'];
  const [activeTab, setActiveTab] = useState('courses'); // 'courses' | 'remedial' | 'progress'
  const [internalGrade, setInternalGrade] = useState(() => {
    return propSelectedGrade || 'Class 7';
  });
  
  // Selected Grade is ALWAYS one specific class: 'Class 6' | 'Class 7' | 'Class 8' | 'Class 9' | 'Class 10'
  const selectedGrade = propSelectedGrade || internalGrade;
  const setSelectedGrade = (g) => {
    if (propOnSelectGrade) {
      propOnSelectGrade(g);
    } else {
      setInternalGrade(g);
    }
  };

  const [selectedSubject, setSelectedSubject] = useState('all');
  const [filterOfflineOnly, setFilterOfflineOnly] = useState(false);
  const [visibleLimit, setVisibleLimit] = useState(6);
  const [isTimetableOpen, setIsTimetableOpen] = useState(false);

  // Reset pagination limit when any filter changes to prevent page bulkiness
  useEffect(() => {
    setVisibleLimit(6);
  }, [selectedGrade, selectedSubject, filterOfflineOnly]);

  const isGuest = !currentUser;
  const studentFirstName = currentUser?.name 
    ? currentUser.name.split(' ')[0] 
    : (lang === 'hi' ? 'अतिथि शिक्षार्थी' : 'Guest Learner');
  const studentGrade = currentUser?.grade || selectedGrade;
  const studentRoll = currentUser?.rollNo || (isGuest ? 'Local-User' : '24');
  const studentSchool = currentUser?.school || (isGuest 
    ? (lang === 'hi' ? 'डिवाइस स्टोरेज में सहेजा गया (अतिथि मोड)' : 'Offline Local Storage (Saved on Device)')
    : 'Model Senior Secondary School Rampur');
  const studentAvatar = currentUser?.avatar || (isGuest ? '👤' : '🎓');

  const activeClassMeta = CLASS_METADATA[selectedGrade] || CLASS_METADATA['Class 7'];

  // STRICTLY filter courses for selectedGrade ONLY - rest of classes are never shown!
  const gradeCourses = sampleCourses.filter(c => c.classGrade === selectedGrade);

  const getSubjectCount = (subjId) => {
    if (subjId === 'all') {
      return gradeCourses.reduce((acc, c) => acc + c.chapters.length, 0);
    }
    const course = gradeCourses.find(c => c.subject === subjId);
    return course ? course.chapters.length : 0;
  };

  const filteredCourses = gradeCourses.filter(c => {
    if (selectedSubject !== 'all' && c.subject !== selectedSubject) return false;
    return true;
  });

  // Calculate offline download completion for the entire active class
  const allGradeChapterIds = gradeCourses.flatMap(c => c.chapters.map(ch => ch.id));
  const isEntireClassDownloaded = allGradeChapterIds.length > 0 && allGradeChapterIds.every(id => downloadedIds.includes(id));

  const handleDownloadEntireClass = () => {
    if (onDownloadBatch) {
      onDownloadBatch(allGradeChapterIds, selectedGrade);
    } else {
      allGradeChapterIds.forEach(id => {
        if (!downloadedIds.includes(id)) {
          onToggleDownload(id);
        }
      });
    }
  };

  return (
    <div className="space-y-7 pb-36 sm:pb-28 max-w-6xl mx-auto">
      {/* 1. Modern Hero Section with Bento Stat Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Welcome Hero Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-white via-white to-upnavy-50/50 rounded-3xl p-5 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-3 relative z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-upnavy-900 bg-upnavy-100/90 px-3 py-1 rounded-full border border-upnavy-200 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-upnavy-700" />
                <span>{studentGrade} • {isGuest ? (lang === 'hi' ? 'अतिथि मोड' : 'Guest Learner') : `Roll ${studentRoll}`}</span>
              </span>
              <span className="text-[10px] font-black bg-upsaffron-100 text-upsaffron-900 px-3 py-1 rounded-full border border-upsaffron-300">
                Classes 6 to 10 Platform
              </span>
              {isGuest ? (
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
                  <span>💾</span>
                  <span>{lang === 'hi' ? 'प्रगति डिवाइस पर सुरक्षित' : 'Progress Saved on Device'}</span>
                </span>
              ) : (
                <span className="text-xs text-slate-500 font-medium truncate max-w-xs sm:max-w-md">
                  {studentSchool}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-upnavy-950 tracking-tight leading-snug flex items-center gap-2.5">
              <span className="text-3xl">{studentAvatar}</span>
              <span>
                {lang === 'hi' 
                  ? (isGuest ? 'ज्ञानसेतु में आपका स्वागत है! 👋' : `नमस्ते, ${studentFirstName}! 👋`) 
                  : (isGuest ? 'Welcome to GyanSetu! 👋' : `Welcome back, ${studentFirstName}! 👋`)}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg leading-relaxed">
              {lang === 'hi' 
                ? 'कक्षा 6 से 10 के सभी विषयों (गणित, विज्ञान, अंग्रेजी, सामाजिक विज्ञान, हिंदी, डिजिटल साक्षरता) की संपूर्ण तैयारी कम डेटा व ऑफ़लाइन मोड में।'
                : 'Dedicated rural learning platform for Classes 6 to 10. Study NCERT & State Board Mathematics, Science, English, Social Science, Hindi, and Digital Literacy even on 2G/3G.'}
            </p>
          </div>

          {/* Daily Goal & Next Step Bar */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-upsaffron-50 text-upsaffron-700 flex items-center justify-center shrink-0 font-bold border border-upsaffron-200">
                <Target className="w-5 h-5 text-upsaffron-600" />
              </div>
              <div>
                <div className="text-xs font-bold text-upnavy-950">
                  {lang === 'hi' ? 'आज का लक्ष्य (2/3 पाठ पूर्ण)' : 'Daily Learning Quest (2 of 3 Completed)'}
                </div>
                <div className="text-[11px] text-slate-500">1 practice quiz remaining for today's streak</div>
              </div>
            </div>

            <button
              onClick={() => onOpenLesson(sampleCourses[0].chapters[0])}
              className="px-5 py-2.5 bg-upsaffron-600 hover:bg-upsaffron-700 text-white text-xs font-bold rounded-2xl shadow-sm shadow-upsaffron-600/30 hover:shadow-md transition active:scale-95 flex items-center gap-2 shrink-0 self-start sm:self-auto"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>{lang === 'hi' ? 'पाठ शुरू करें' : 'Resume Lesson'}</span>
            </button>
          </div>
        </div>

        {/* Bento Stats Column */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
          {/* Day Streak & XP Card (Interactive Rewards Hub Button) */}
          <div 
            onClick={onOpenXpRewards}
            className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between hover:border-upsaffron-400 hover:shadow-md transition active:scale-[0.99] cursor-pointer group"
            title="Click to view XP Level, Rewards & Uses"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 shadow-2xs group-hover:scale-105 transition-transform">
                <Flame className="w-6 h-6 fill-amber-500 text-amber-500" />
              </div>
              <div>
                <div className="text-lg font-black text-upnavy-950 leading-tight flex items-center gap-1.5">
                  <span>{studentStats.streakDays} Days</span>
                  <span className="text-[10px] font-bold text-upsaffron-700 bg-upsaffron-50 px-2 py-0.5 rounded-full border border-upsaffron-200">
                    Rewards 🎁
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">Learning Streak • Tap to view perks</div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-base font-black text-upsaffron-600 leading-tight">+{studentStats.pointsXP}</div>
              <div className="text-[10px] text-slate-400 font-bold group-hover:text-upsaffron-600 transition">XP Points & Uses →</div>
            </div>
          </div>

          {/* Rural Data Saver & Offline Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-upnavy-50 border border-upnavy-200 flex items-center justify-center text-upnavy-700 shadow-2xs">
                <HardDrive className="w-5 h-5 text-upnavy-700" />
              </div>
              <div>
                <div className="text-lg font-black text-upnavy-950 leading-tight">{downloadedIds.length} Chapters</div>
                <div className="text-[11px] text-slate-500 font-medium">Cached on Device 📦</div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-upnavy-900 bg-upnavy-100/80 px-2.5 py-1 rounded-full border border-upnavy-200">
                &lt; 50 KB total
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Modern Segmented Tab Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl max-w-full overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'courses'
                ? 'bg-upnavy-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-upnavy-950'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Class 6–10 Courses & Modules</span>
          </button>

          <button
            onClick={() => setActiveTab('remedial')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'remedial'
                ? 'bg-upnavy-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-upnavy-950'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>AI Diagnostic Path</span>
            {diagnosticData.weakTopics.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-upsaffron-500 ring-2 ring-upsaffron-200" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('progress')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'progress'
                ? 'bg-upnavy-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-upnavy-950'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Mastery & Grade Progression</span>
          </button>
        </div>

        {/* Retake Diagnostic Shortcut */}
        <button
          onClick={onOpenDiagnostic}
          className="text-xs font-bold text-upnavy-900 hover:text-upsaffron-600 flex items-center gap-1.5 transition self-start sm:self-auto bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs"
        >
          <Compass className="w-3.5 h-3.5 text-upsaffron-600" />
          <span>{lang === 'hi' ? 'दक्षता स्तर जांच परीक्षा दें' : 'Diagnostic Test (Grades 6–10)'}</span>
        </button>
      </div>

      {/* TAB 1: COURSES & MODULES */}
      {activeTab === 'courses' && (
        <div id="curriculum-section" className="space-y-4 animate-fadeIn scroll-mt-24">
          {/* A. DEDICATED CLASS SWITCHER BAR (CLASSES 6 TO 10) */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-upnavy-900 text-upsaffron-400 flex items-center justify-center shrink-0">
                  <School className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-upnavy-950 uppercase tracking-wide">
                    Curriculum by Class (Grades 6 to 10)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Aligned with NCERT & State Board syllabus for middle and secondary students
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-600 font-semibold bg-slate-50 px-3 py-1 rounded-xl border border-slate-200/60 self-start sm:self-auto">
                <span>Active: </span>
                <strong className="text-upnavy-900">
                  {selectedGrade === 'all' ? 'All Grades (6 to 10)' : `${selectedGrade}`}
                </strong>
                <span className="text-slate-400 font-normal"> ({filteredCourses.length} Courses available)</span>
              </div>
            </div>

            {/* Class Selection Pills - Strictly Classes 6 to 10 (Rest of classes hidden for clean UI) */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1">
              {[
                { id: 'Class 6', label: 'Class 6', sub: 'Middle School', badge: 'Foundation' },
                { id: 'Class 7', label: 'Class 7', sub: 'Middle School', badge: 'Core' },
                { id: 'Class 8', label: 'Class 8', sub: 'Upper Primary', badge: 'Advanced' },
                { id: 'Class 9', label: 'Class 9', sub: 'Secondary', badge: 'Concepts' },
                { id: 'Class 10', label: 'Class 10', sub: 'Secondary', badge: 'Board Prep' }
              ].map(g => {
                const isSelected = selectedGrade === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGrade(g.id)}
                    className={`p-3 rounded-2xl text-left transition-all duration-150 border flex flex-col justify-between ${
                      isSelected
                        ? 'bg-gradient-to-br from-upnavy-900 to-upnavy-950 text-white border-upnavy-900 shadow-md ring-2 ring-upsaffron-500 scale-[1.02]'
                        : 'bg-slate-50 hover:bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-xs font-black ${isSelected ? 'text-white' : 'text-upnavy-950'}`}>
                        {g.label}
                      </span>
                      {isSelected ? (
                        <span className="w-4 h-4 rounded-full bg-upsaffron-500 text-white flex items-center justify-center text-[10px] font-black">
                          ✓
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold bg-slate-200/80 text-slate-600 px-1.5 py-0.5 rounded-md">
                          {g.badge}
                        </span>
                      )}
                    </div>
                    <div className={`text-[10px] ${isSelected ? 'text-upsaffron-200' : 'text-slate-400'}`}>
                      {g.sub}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dedicated Class Power Spotlight Banner */}
            <div className={`rounded-2xl p-4 sm:p-5 bg-gradient-to-r ${activeClassMeta.color} text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 mt-3`}>
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${activeClassMeta.accentBadge}`}>
                    {selectedGrade} Focus
                  </span>
                  <span className="text-[11px] text-slate-300 font-semibold">
                    {activeClassMeta.sub}
                  </span>
                  <span className="text-[10px] bg-white/10 text-emerald-300 px-2 py-0.5 rounded-full font-bold border border-white/10">
                    Rest of classes hidden for focused view ✓
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-white">
                  {selectedGrade} Curriculum & Digital Study Hub
                </h4>
                <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                  {activeClassMeta.desc}
                </p>

                {/* 4 Quick Metrics */}
                <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-200">
                  <span className="flex items-center gap-1 font-semibold">
                    <BookOpen className="w-3.5 h-3.5 text-upsaffron-400" />
                    <span>6 Subjects</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-semibold">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>12 Chapters</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-semibold">
                    <HardDrive className="w-3.5 h-3.5 text-sky-400" />
                    <span>&lt; 1.4 MB Total Size</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-semibold text-emerald-300">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>100% NCERT Aligned</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons: Batch Offline Download + Class Timetable */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
                <button
                  onClick={handleDownloadEntireClass}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition active:scale-95 shadow-sm ${
                    isEntireClassDownloaded
                      ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/40'
                      : 'bg-upsaffron-600 hover:bg-upsaffron-500 text-white shadow-upsaffron-600/30'
                  }`}
                  title="Download all 12 chapters of this class in one click"
                >
                  <Download className="w-4 h-4" />
                  <span>{isEntireClassDownloaded ? `All ${selectedGrade} Saved ✓` : `Save All ${selectedGrade} Offline`}</span>
                </button>

                <button
                  onClick={() => setIsTimetableOpen(true)}
                  className="px-4 py-2.5 rounded-xl font-bold text-xs bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center gap-2 transition active:scale-95"
                >
                  <Calendar className="w-4 h-4 text-upsaffron-300" />
                  <span>Study Timetable</span>
                </button>
              </div>
            </div>
          </div>

          {/* B. Subject Filter Bar for Active Class with Dynamic Chapter Counts */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedSubject('all')}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition shrink-0 flex items-center gap-1.5 ${
                  selectedSubject === 'all' 
                    ? 'bg-upnavy-800 text-white shadow-xs' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>All {selectedGrade} Subjects</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  selectedSubject === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {getSubjectCount('all')}
                </span>
              </button>

              <button
                onClick={() => setSelectedSubject('math')}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition shrink-0 flex items-center gap-1.5 ${
                  selectedSubject === 'math' 
                    ? 'bg-upnavy-800 text-white shadow-xs' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>📐 Mathematics</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  selectedSubject === 'math' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {getSubjectCount('math')}
                </span>
              </button>

              <button
                onClick={() => setSelectedSubject('science')}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition shrink-0 flex items-center gap-1.5 ${
                  selectedSubject === 'science' 
                    ? 'bg-upnavy-800 text-white shadow-xs' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>🔬 Science</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  selectedSubject === 'science' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {getSubjectCount('science')}
                </span>
              </button>

              <button
                onClick={() => setSelectedSubject('english')}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition shrink-0 flex items-center gap-1.5 ${
                  selectedSubject === 'english' 
                    ? 'bg-upnavy-800 text-white shadow-xs' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>📖 English</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  selectedSubject === 'english' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {getSubjectCount('english')}
                </span>
              </button>

              <button
                onClick={() => setSelectedSubject('social')}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition shrink-0 flex items-center gap-1.5 ${
                  selectedSubject === 'social' 
                    ? 'bg-upnavy-800 text-white shadow-xs' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>🌍 Social Science</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  selectedSubject === 'social' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {getSubjectCount('social')}
                </span>
              </button>

              <button
                onClick={() => setSelectedSubject('hindi')}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition shrink-0 flex items-center gap-1.5 ${
                  selectedSubject === 'hindi' 
                    ? 'bg-upnavy-800 text-white shadow-xs' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>🇮🇳 Hindi</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  selectedSubject === 'hindi' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {getSubjectCount('hindi')}
                </span>
              </button>

              <button
                onClick={() => setSelectedSubject('computer')}
                className={`px-3.5 py-1.5 rounded-xl font-bold transition shrink-0 flex items-center gap-1.5 ${
                  selectedSubject === 'computer' 
                    ? 'bg-upnavy-800 text-white shadow-xs' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>💻 Digital Literacy</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  selectedSubject === 'computer' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {getSubjectCount('computer')}
                </span>
              </button>
            </div>

            <button
              onClick={() => setFilterOfflineOnly(!filterOfflineOnly)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition shrink-0 self-start sm:self-auto ${
                filterOfflineOnly
                  ? 'bg-upsaffron-100 text-upsaffron-900 border-upsaffron-300'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Offline Ready Only</span>
            </button>
          </div>

          {/* C. Course Cards Grid with Progressive Reveal (View More) */}
          {(() => {
            const allVisibleChapters = filteredCourses.flatMap(course => 
              course.chapters
                .filter(ch => !filterOfflineOnly || downloadedIds.includes(ch.id))
                .map(chapter => ({
                  ...chapter,
                  courseGrade: course.classGrade,
                  courseTitle: course.title,
                  courseSubject: course.subject
                }))
            );

            if (allVisibleChapters.length === 0) {
              return (
                <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
                    <Download className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-upnavy-950">No Chapters Found for Current Filter</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    No chapters match your combination of Grade ({selectedGrade}), Subject, and Offline state.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedGrade('all');
                      setSelectedSubject('all');
                      setFilterOfflineOnly(false);
                    }}
                    className="px-4 py-2 bg-upnavy-800 hover:bg-upsaffron-600 text-white rounded-xl text-xs font-bold transition"
                  >
                    Reset All Filters (View All Classes)
                  </button>
                </div>
              );
            }

            const displayedChapters = allVisibleChapters.slice(0, visibleLimit);
            const remainingCount = allVisibleChapters.length - visibleLimit;
            const hasMore = remainingCount > 0;
            const isExpanded = visibleLimit > 6;

            return (
              <div className="space-y-4">
                {/* Header Summary & Display Counter */}
                <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-upnavy-950">
                      Showing {displayedChapters.length} of {allVisibleChapters.length} Chapters
                    </span>
                    {hasMore && (
                      <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                        Compact Mode
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span>Filter:</span>
                    <strong className="text-upnavy-800">
                      {selectedGrade === 'all' ? 'All Classes (6–10)' : selectedGrade}
                    </strong>
                    {selectedSubject !== 'all' && (
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold capitalize">
                        {selectedSubject}
                      </span>
                    )}
                  </div>
                </div>

                {/* Grid of Chapter Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {displayedChapters.map(chapter => {
                    const isDownloaded = downloadedIds.includes(chapter.id);
                    return (
                      <div 
                        key={chapter.id}
                        className="modern-card rounded-3xl p-6 flex flex-col justify-between group relative overflow-hidden"
                      >
                        {/* Concept Visual Illustration Banner */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-3 gap-2">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {/* Prominent Class Badge */}
                              <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                                chapter.courseGrade === 'Class 6' ? 'bg-purple-100 text-purple-900 border-purple-200' :
                                chapter.courseGrade === 'Class 7' ? 'bg-amber-100 text-amber-900 border-amber-200' :
                                chapter.courseGrade === 'Class 8' ? 'bg-emerald-100 text-emerald-900 border-emerald-200' :
                                chapter.courseGrade === 'Class 9' ? 'bg-rose-100 text-rose-900 border-rose-200' :
                                'bg-indigo-100 text-indigo-900 border-indigo-200'
                              }`}>
                                {chapter.courseGrade}
                              </span>
                              <span className="text-[11px] font-bold text-upnavy-800 bg-upnavy-50 px-2.5 py-0.5 rounded-full border border-upnavy-200/60 truncate max-w-[200px]">
                                {getLocalized(chapter.courseTitle, lang)}
                              </span>
                            </div>

                            <div className="flex items-center gap-1 text-xs font-semibold text-slate-400 bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-200/60 shrink-0">
                              <Zap className="w-3 h-3 text-upsaffron-500 fill-upsaffron-500" />
                              <span>{chapter.sizeKB} KB</span>
                            </div>
                          </div>

                          <h3 className="text-lg font-bold text-upnavy-950 mb-1.5 group-hover:text-upsaffron-600 transition">
                            {getLocalized(chapter.title, lang)}
                          </h3>
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {getLocalized(chapter.summary, lang)}
                          </p>
                        </div>

                        {/* Interactive Footer Actions */}
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                          <button
                            onClick={() => onToggleDownload(chapter.id)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition ${
                              isDownloaded
                                ? 'bg-upnavy-50 text-upnavy-800 border-upnavy-200'
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                            }`}
                            title={isDownloaded ? 'Saved in device memory' : 'Download for offline use'}
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>{isDownloaded ? 'Downloaded ✓' : 'Save Offline'}</span>
                          </button>

                          <button
                            onClick={() => onOpenLesson(chapter)}
                            className="px-5 py-2 rounded-xl bg-upnavy-800 hover:bg-upsaffron-600 text-white font-bold text-xs flex items-center gap-2 shadow-sm active:scale-95 transition"
                          >
                            <span>Study & Quiz</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Interactive View More / Show Less Controls Bar */}
                {allVisibleChapters.length > 6 && (
                  <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                    <div className="flex items-center gap-3 text-center sm:text-left">
                      <div className="w-10 h-10 rounded-2xl bg-upsaffron-50 text-upsaffron-600 flex items-center justify-center shrink-0 border border-upsaffron-200">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-upnavy-950">
                          {hasMore 
                            ? `${remainingCount} More Chapters Available in This View` 
                            : 'All Available Chapters are Displayed'}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {hasMore 
                            ? 'Page kept clean and lightweight. Click below to progressively reveal more.'
                            : `Displaying all ${allVisibleChapters.length} chapters across selected subjects.`}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      {hasMore && (
                        <>
                          <button
                            onClick={() => setVisibleLimit(prev => Math.min(prev + 6, allVisibleChapters.length))}
                            className="flex-1 sm:flex-initial px-4 py-2.5 bg-upnavy-800 hover:bg-upsaffron-600 text-white rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm active:scale-95"
                          >
                            <span>View More (+{Math.min(6, remainingCount)})</span>
                            <ChevronDown className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setVisibleLimit(allVisibleChapters.length)}
                            className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5"
                            title="Show all chapters at once"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Show All ({allVisibleChapters.length})</span>
                          </button>
                        </>
                      )}

                      {isExpanded && (
                        <button
                          onClick={() => {
                            setVisibleLimit(6);
                            const el = document.getElementById('curriculum-section');
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2"
                        >
                          <ChevronUp className="w-4 h-4" />
                          <span>Show Less (Collapse)</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* TAB 2: AI DIAGNOSTIC & REMEDIAL PATH (Class Scoped) */}
      {activeTab === 'remedial' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-upnavy-950">
                    {selectedGrade} Topic Mastery & AI Remedial Roadmap
                  </h3>
                  <span className="text-[11px] bg-upnavy-100 text-upnavy-900 font-bold px-2 py-0.5 rounded-full">
                    Adaptive AI Engine
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Our diagnostic engine evaluates foundational prerequisites for {selectedGrade} before unlocking complex topics
                </p>
              </div>
              <button
                onClick={onOpenDiagnostic}
                className="px-4 py-2 bg-upsaffron-600 hover:bg-upsaffron-700 text-white font-bold rounded-xl text-xs shadow-xs transition"
              >
                Retake Assessment
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {(REMEDIAL_ROADMAP_BY_GRADE[selectedGrade] || REMEDIAL_ROADMAP_BY_GRADE['Class 7']).map((item, idx) => (
                <div 
                  key={idx} 
                  className={`p-5 rounded-2xl border space-y-2 ${
                    item.type === 'weak' ? 'bg-rose-50/70 border-rose-200/90' :
                    item.type === 'locked' ? 'bg-amber-50/70 border-amber-200/90' :
                    item.type === 'mastered' ? 'bg-emerald-50/70 border-emerald-200/90' :
                    'bg-blue-50/70 border-blue-200/90'
                  }`}
                >
                  <div className="flex justify-between items-center gap-2">
                    <span className="font-bold text-sm text-upnavy-950">{item.title}</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                  {item.action && gradeCourses.length > 0 && (
                    <div className="pt-2">
                      <button
                        onClick={() => onOpenLesson(gradeCourses[0].chapters[0])}
                        className="text-xs font-bold text-upsaffron-700 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>{item.action}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SUBJECT PROGRESS & GRADE PROGRESSION RADAR */}
      {activeTab === 'progress' && (
        <div className="space-y-6 animate-fadeIn">
          {/* XP Effort Rewards & Scholarships Banner */}
          <div className="bg-gradient-to-r from-amber-500 via-upsaffron-600 to-amber-600 rounded-3xl p-5 sm:p-6 text-white shadow-lg shadow-upsaffron-600/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="space-y-1 relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white px-2.5 py-0.5 rounded-full border border-white/20">
                Level 3 • Concept Achiever ⭐
              </span>
              <h3 className="text-lg sm:text-xl font-black">
                You have earned {studentStats.pointsXP} XP Points!
              </h3>
              <p className="text-xs text-amber-100 max-w-xl">
                Redeem your XP points for printable Merit Certificates, ICT Lab Priority Passes, Board Exam Formula Handbooks, and Trust Scholarship nominations.
              </p>
            </div>

            <button
              onClick={onOpenXpRewards}
              className="px-5 py-2.5 rounded-2xl bg-white hover:bg-amber-50 text-upnavy-950 font-bold text-xs shadow-md transition active:scale-95 flex items-center gap-2 shrink-0 self-start sm:self-auto cursor-pointer relative z-10"
            >
              <Trophy className="w-4 h-4 text-upsaffron-600" />
              <span>Open Rewards & Perks Hub →</span>
            </button>
          </div>

          {/* Grade Progression Radar (Classes 6 to 10) */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div>
              <h3 className="text-lg font-bold text-upnavy-950 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-upsaffron-600" />
                <span>Secondary School Progression Ladder (Classes 6 to 10)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Multi-year academic tracking designed to prepare rural students for secondary board examination excellence
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
              {[
                { grade: 'Class 6', status: selectedGrade === 'Class 6' ? 'Active Focus 🎯' : 'Mastered', pct: 95, color: 'bg-emerald-500', tag: 'Foundation ✓' },
                { grade: 'Class 7', status: selectedGrade === 'Class 7' ? 'Active Focus 🎯' : 'Core Middle', pct: 76, color: 'bg-upsaffron-500', tag: 'Middle Core' },
                { grade: 'Class 8', status: selectedGrade === 'Class 8' ? 'Active Focus 🎯' : 'Upper Primary', pct: 45, color: 'bg-sky-500', tag: 'Advanced' },
                { grade: 'Class 9', status: selectedGrade === 'Class 9' ? 'Active Focus 🎯' : 'Secondary Core', pct: 20, color: 'bg-purple-500', tag: 'Secondary' },
                { grade: 'Class 10', status: selectedGrade === 'Class 10' ? 'Active Focus 🎯' : 'Board Target', pct: 10, color: 'bg-indigo-500', tag: 'Board Exam 🏆' }
              ].map((ladder, idx) => {
                const isCurrent = ladder.grade === selectedGrade;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedGrade(ladder.grade);
                      const el = document.getElementById('curriculum-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      isCurrent
                        ? 'bg-upnavy-50/90 border-upsaffron-400 ring-2 ring-upsaffron-400/50 shadow-sm scale-[1.02]'
                        : 'bg-slate-50 hover:bg-white border-slate-200/80 hover:border-slate-300 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`font-black text-xs ${isCurrent ? 'text-upnavy-950 font-black' : 'text-slate-800'}`}>{ladder.grade}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${isCurrent ? 'bg-upsaffron-500 text-white' : 'bg-slate-200 text-slate-600'}`}>
                        {isCurrent ? 'Active 🎯' : ladder.tag}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-1.5">
                      <div className={`${ladder.color} h-2 rounded-full`} style={{ width: `${ladder.pct}%` }} />
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400 font-medium">{ladder.status}</span>
                      <span className="font-bold text-upnavy-900">{ladder.pct}%</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subject Mastery Breakdown */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
            <div>
              <h3 className="text-lg font-bold text-upnavy-950">
                Subject Syllabus Completion
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Track your syllabus completion across core subjects in the curriculum
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-900">📐 Mathematics</span>
                  <span className="text-upnavy-800 font-black">{studentStats.subjectProgress.math}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-upnavy-800 h-2.5 rounded-full transition-all duration-500" style={{ width: `${studentStats.subjectProgress.math}%` }} />
                </div>
                <div className="text-[11px] text-slate-400">Classes 6 to 10 Modules: 8 completed</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-900">🔬 Science</span>
                  <span className="text-upsaffron-700 font-black">{studentStats.subjectProgress.science}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-upsaffron-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${studentStats.subjectProgress.science}%` }} />
                </div>
                <div className="text-[11px] text-slate-400">Photosynthesis & Crop Farming: Mastered</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-900">📖 English</span>
                  <span className="text-sky-700 font-black">{studentStats.subjectProgress.english}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-sky-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${studentStats.subjectProgress.english}%` }} />
                </div>
                <div className="text-[11px] text-slate-400">Grammar & Dialogue: In progress</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-900">🌍 Social Science</span>
                  <span className="text-emerald-700 font-black">78%</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `78%` }} />
                </div>
                <div className="text-[11px] text-slate-400">Constitution & Panchayati Raj: Completed</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-900">🇮🇳 Hindi Literature</span>
                  <span className="text-rose-700 font-black">85%</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-rose-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `85%` }} />
                </div>
                <div className="text-[11px] text-slate-400">Poetry & Munshi Premchand Stories: Completed</div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-900">💻 Digital Literacy</span>
                  <span className="text-indigo-700 font-black">90%</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `90%` }} />
                </div>
                <div className="text-[11px] text-slate-400">Cyber Safety & Board Portals: Mastered</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modern Floating AI Doubt Saathi Button */}
      {!isAiSaathiOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30">
          <button
            onClick={onOpenAiSaathi}
            className="flex items-center gap-2 bg-upnavy-900 hover:bg-upsaffron-600 text-white px-4 py-2.5 sm:px-5 sm:py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border border-upnavy-700 group text-xs font-bold"
          >
            <Sparkles className="w-4 h-4 text-upsaffron-400 group-hover:rotate-12 transition-transform duration-300 shrink-0" />
            <span>Ask AI Saathi</span>
          </button>
        </div>
      )}

      {/* Interactive Class Study Timetable Modal */}
      <ClassTimetableModal
        isOpen={isTimetableOpen}
        onClose={() => setIsTimetableOpen(false)}
        selectedGrade={selectedGrade}
        lang={lang}
      />
    </div>
  );
}
