import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  BookOpen, 
  CheckCircle, 
  Printer, 
  Sparkles, 
  Zap, 
  Lightbulb, 
  Target, 
  Award,
  ChevronRight,
  School
} from 'lucide-react';

const WEEKLY_SCHEDULES = {
  'Class 6': {
    badge: 'Middle School Foundation',
    themeColor: 'from-purple-900 to-indigo-950',
    accentBadge: 'bg-purple-100 text-purple-900 border-purple-200',
    days: [
      { day: 'Monday', p1: 'Knowing Our Numbers (Math)', p2: 'Food: Where Does It Come From? (Science)', p3: 'A Tale of Two Birds (English)' },
      { day: 'Tuesday', p1: 'Whole Numbers on Number Line (Math)', p2: 'Components of Food (Science)', p3: 'वसंत: वह चिड़िया जो (Hindi)' },
      { day: 'Wednesday', p1: 'Basic Geometrical Ideas (Math)', p2: 'Diversity and Discrimination (Social Science)', p3: 'Computer Basics & Keyboard Skills (Digital)' },
      { day: 'Thursday', p1: 'Fractions as Equal Parts (Math)', p2: 'Separation of Substances (Science)', p3: 'Friendly Mongoose (English Reading)' },
      { day: 'Friday', p1: 'What, Where, How and When? (History)', p2: 'Getting to Know Plants (Science)', p3: 'बचपन - संस्मरण (Hindi)' },
      { day: 'Saturday', p1: 'Panchayati Raj Village System (SST)', p2: 'Weekly AI Diagnostic Quiz (All Subjects)', p3: 'Safe Internet Browsing (Digital Literacy)' }
    ]
  },
  'Class 7': {
    badge: 'Core Middle School Syllabus',
    themeColor: 'from-upnavy-900 to-upnavy-950',
    accentBadge: 'bg-amber-100 text-amber-900 border-amber-200',
    days: [
      { day: 'Monday', p1: 'Integers & Real-world Debits/Credits (Math)', p2: 'Nutrition in Plants & Photosynthesis (Science)', p3: 'Three Questions (English Honeycomb)' },
      { day: 'Tuesday', p1: 'Fractions & Roti Division Model (Math)', p2: 'Nutrition in Animals & Digestive System (Science)', p3: 'हम पंछी उन्मुक्त गगन के (Hindi)' },
      { day: 'Wednesday', p1: 'Decimals Multiplication (Math)', p2: 'Tracing Changes Through a Thousand Years (History)', p3: 'Word Processing & Typing Skills (Digital)' },
      { day: 'Thursday', p1: 'Heat & Clinical Thermometers (Science)', p2: 'On Equality & Democracy (Civics)', p3: 'A Gift of Chappals (English)' },
      { day: 'Friday', p1: 'Data Handling & Village Census (Math)', p2: 'Acids, Bases & Village Soil Testing (Science)', p3: 'दादी माँ - कहानी (Hindi)' },
      { day: 'Saturday', p1: 'Our Environment & Ecosystems (Geography)', p2: 'AI Diagnostic Practice Quiz & Remedial Check', p3: 'Spreadsheets & Data Entry Basics (Digital)' }
    ]
  },
  'Class 8': {
    badge: 'Upper Primary & Secondary Bridge',
    themeColor: 'from-emerald-900 to-teal-950',
    accentBadge: 'bg-emerald-100 text-emerald-900 border-emerald-200',
    days: [
      { day: 'Monday', p1: 'Rational Numbers & Closure Laws (Math)', p2: 'Crop Production & Modern Irrigation (Science)', p3: 'The Best Christmas Present in the World (English)' },
      { day: 'Tuesday', p1: 'Linear Equations in One Variable (Math)', p2: 'Microorganisms: Friend and Foe (Science)', p3: 'ध्वनि - सूर्यकांत त्रिपाठी निराला (Hindi)' },
      { day: 'Wednesday', p1: 'Understanding Quadrilaterals (Math)', p2: 'How, When and Where (History)', p3: 'Online Safety & Password Hygiene (Digital)' },
      { day: 'Thursday', p1: 'Linear Equations Word Problems (Math)', p2: 'Coal and Petroleum & Energy (Science)', p3: 'The Tsunami (English)' },
      { day: 'Friday', p1: 'The Indian Constitution & Secularism (Civics)', p2: 'Combustion, Flame & Fuel Efficiency (Science)', p3: 'लाख की चूड़ियां (Hindi)' },
      { day: 'Saturday', p1: 'Land, Soil, Water Resources (Geography)', p2: 'Weekly Remedial Diagnostic & Quiz', p3: 'Digital Literacy: Safe Board Form Submissions' }
    ]
  },
  'Class 9': {
    badge: 'Secondary Core & Board Prep Foundation',
    themeColor: 'from-rose-900 to-slate-950',
    accentBadge: 'bg-rose-100 text-rose-900 border-rose-200',
    days: [
      { day: 'Monday', p1: 'Number Systems & Rationalization (Math)', p2: 'Motion: Velocity-Time Graph Derivations (Physics)', p3: 'The Fun They Had (English Beehive)' },
      { day: 'Tuesday', p1: 'Polynomials & Remainder Theorem (Math)', p2: 'The Fundamental Unit of Life: Cell (Biology)', p3: 'दो बैलों की कथा - प्रेमचंद (Hindi)' },
      { day: 'Wednesday', p1: 'Coordinate Geometry & Quadrants (Math)', p2: 'The French Revolution & Liberty (History)', p3: 'Presentations & Document Formatting (Digital)' },
      { day: 'Thursday', p1: 'Linear Equations in Two Variables (Math)', p2: 'Force and Laws of Motion (Physics)', p3: 'The Sound of Music (English)' },
      { day: 'Friday', p1: 'What is Democracy? Why Democracy? (Civics)', p2: 'Matter in Our Surroundings (Chemistry)', p3: 'ल्हासा की ओर - राहुल सांकृत्यायन (Hindi)' },
      { day: 'Saturday', p1: 'India: Size and Location (Geography)', p2: 'Weekly Class 9 Mock Test & Remedial Drill', p3: 'Cyber Law & Digital Identity Protection' }
    ]
  },
  'Class 10': {
    badge: 'High School Board Examination Track',
    themeColor: 'from-amber-900 to-stone-950',
    accentBadge: 'bg-indigo-100 text-indigo-900 border-indigo-200',
    days: [
      { day: 'Monday', p1: 'Real Numbers & Fundamental Theorem (Math)', p2: 'Chemical Reactions & Balancing Equations (Chemistry)', p3: 'A Letter to God (English First Flight)' },
      { day: 'Tuesday', p1: 'Polynomials & Quadratic Equations (Math)', p2: 'Life Processes: Nutrition & Respiration (Biology)', p3: 'सूरदास के पद (Hindi क्षितिज)' },
      { day: 'Wednesday', p1: 'Introduction to Trigonometry Ratios (Math)', p2: 'Nationalism in India & Freedom Movement (History)', p3: 'Board Online Registration & Exam Portals (Digital)' },
      { day: 'Thursday', p1: 'Trigonometric Identities & Heights (Math)', p2: 'Light: Reflection & Refraction Numericals (Physics)', p3: 'Nelson Mandela: Long Walk to Freedom (English)' },
      { day: 'Friday', p1: 'Power Sharing & Federalism in India (Civics)', p2: 'Acids, Bases and Salts & pH Scale (Chemistry)', p3: 'नेताजी का चश्मा - स्वयं प्रकाश (Hindi)' },
      { day: 'Saturday', p1: 'Full-length Board Exam Mock Assessment (Math/Sci)', p2: 'Error Analysis & AI Remedial Revision', p3: 'Career Pathways & Scholarship Portal Practice' }
    ]
  }
};

export function ClassTimetableModal({ 
  isOpen, 
  onClose, 
  selectedGrade = 'Class 7', 
  lang = 'en' 
}) {
  if (!isOpen) return null;

  const schedule = WEEKLY_SCHEDULES[selectedGrade] || WEEKLY_SCHEDULES['Class 7'];
  const todayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-upnavy-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-scaleUp">
        
        {/* Header with Grade Badge */}
        <div className={`p-5 sm:p-6 bg-gradient-to-r ${schedule.themeColor} text-white flex items-center justify-between relative`}>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full ${schedule.accentBadge}`}>
                {selectedGrade}
              </span>
              <span className="text-xs text-slate-300 font-medium">
                {schedule.badge}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black flex items-center gap-2">
              <Calendar className="w-5 h-5 text-upsaffron-400" />
              <span>Recommended Weekly Study Timetable</span>
            </h3>
            <p className="text-xs text-slate-300 max-w-lg">
              Optimized for rural students with daylight-friendly periods and zero-screen night revision.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 sm:px-3 sm:py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              title="Print timetable for study wall"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print Schedule</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Timetable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Daily Schedule Slots */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {schedule.days.map((item, idx) => {
              const isToday = item.day.toLowerCase() === todayName.toLowerCase();
              return (
                <div 
                  key={idx}
                  className={`rounded-2xl p-4 border transition-all duration-200 flex flex-col justify-between ${
                    isToday
                      ? 'bg-upsaffron-50/70 border-upsaffron-300 ring-2 ring-upsaffron-500/30 shadow-sm'
                      : 'bg-slate-50/80 hover:bg-white border-slate-200/80 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-200/70">
                    <span className="font-black text-sm text-upnavy-950 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-upsaffron-600" />
                      <span>{item.day}</span>
                    </span>
                    {isToday ? (
                      <span className="text-[10px] font-black bg-upsaffron-600 text-white px-2 py-0.5 rounded-full animate-pulse">
                        Today's Plan 🎯
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-semibold">
                        Day {idx + 1}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2 bg-white/90 p-2 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-black text-upnavy-900 bg-upnavy-100 px-1.5 py-0.5 rounded shrink-0">
                        P1
                      </span>
                      <span className="text-slate-700 font-medium leading-snug">
                        {item.p1}
                      </span>
                    </div>

                    <div className="flex items-start gap-2 bg-white/90 p-2 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-black text-upsaffron-900 bg-upsaffron-100 px-1.5 py-0.5 rounded shrink-0">
                        P2
                      </span>
                      <span className="text-slate-700 font-medium leading-snug">
                        {item.p2}
                      </span>
                    </div>

                    <div className="flex items-start gap-2 bg-white/90 p-2 rounded-xl border border-slate-100">
                      <span className="text-[10px] font-black text-emerald-900 bg-emerald-100 px-1.5 py-0.5 rounded shrink-0">
                        P3
                      </span>
                      <span className="text-slate-700 font-medium leading-snug">
                        {item.p3}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rural-First Study Habits Advice Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-upnavy-50 to-amber-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-upsaffron-100 text-upsaffron-700 flex items-center justify-center shrink-0">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-upnavy-950">
                  Rural Digital Study Guidelines for {selectedGrade}
                </h4>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  • <strong>Power cuts?</strong> Download chapters during school hours using the "Save Offline" button.
                  <br />
                  • <strong>Low 2G signal?</strong> Keep "Low Data Mode" turned ON to study without loading heavy videos.
                  <br />
                  • <strong>Doubt Saathi:</strong> Ask any academic question in Hindi or regional language before bedtime.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-upnavy-900 hover:bg-upsaffron-600 text-white font-bold text-xs rounded-xl transition active:scale-95 shrink-0 self-end sm:self-auto"
            >
              Close & Start Studying
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
