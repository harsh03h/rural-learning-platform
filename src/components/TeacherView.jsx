import React, { useState } from 'react';
import { 
  Users, 
  BarChart3, 
  AlertTriangle, 
  Sparkles, 
  RefreshCw,
  Copy,
  Check,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Printer,
  Send,
  Calendar,
  Layers,
  Award,
  Download,
  PhoneCall,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { mockStudents, translations } from '../data/mockData';

const INITIAL_STUDENTS = [
  ...mockStudents,
  {
    id: "stu-6",
    name: "Vikas Yadav",
    rollNo: "36",
    classGrade: "Class 7A",
    overallScore: 68,
    lastActive: "Today, 11:20 AM",
    weakTopics: ["Decimals"],
    status: "Average Progress",
    syncStatus: "Synced",
    isPresent: true
  },
  {
    id: "stu-7",
    name: "Priya Singh",
    rollNo: "41",
    classGrade: "Class 7A",
    overallScore: 84,
    lastActive: "Today, 9:05 AM",
    weakTopics: [],
    status: "Good Progress",
    syncStatus: "Synced",
    isPresent: true
  },
  {
    id: "stu-8",
    name: "Manoj Gaur",
    rollNo: "45",
    classGrade: "Class 7A",
    overallScore: 45,
    lastActive: "3 days ago",
    weakTopics: ["Fractions", "Equations"],
    status: "Needs Remedial Attention",
    syncStatus: "2 Quizzes Pending",
    isPresent: false
  }
];

export function TeacherView({ lang }) {
  const t = translations[lang] || translations['en'];
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'generator' | 'analytics'
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'needs_help' | 'good' | 'remedial'
  const [assignedRemedial, setAssignedRemedial] = useState({});
  const [copyStatus, setCopyStatus] = useState(false);
  const [attendance, setAttendance] = useState(() => {
    const map = {};
    INITIAL_STUDENTS.forEach(s => {
      map[s.id] = s.isPresent !== false;
    });
    return map;
  });
  const [feedbackToast, setFeedbackToast] = useState(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // AI Question Generator State
  const [subject, setSubject] = useState('Mathematics');
  const [topic, setTopic] = useState('Fractions (भिन्न)');
  const [grade, setGrade] = useState('Class 7');
  const [difficulty, setDifficulty] = useState('Medium');
  const [qCount, setQCount] = useState('3');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState([
    {
      q: "If 5 out of 20 mangoes in a village orchard are spoiled, what is the fraction of spoiled mangoes?",
      options: ["1/4", "1/5", "5/10", "4/1"],
      answer: "1/4",
      explanation: "5 / 20 simplified by dividing both by 5 equals 1/4."
    },
    {
      q: "Which fraction of a wheat field is larger: 3/5 or 4/5?",
      options: ["3/5", "4/5", "Both are equal", "None of these"],
      answer: "4/5",
      explanation: "When denominators are equal, the fraction with the larger numerator (4 > 3) is greater."
    },
    {
      q: "A farmer sold 2/3 of his harvested potatoes and stored 1/3 for his family. What is the total sum of the two fractions?",
      options: ["2/3", "3/3 (1 whole)", "1/3", "3/6"],
      answer: "3/3 (1 whole)",
      explanation: "2/3 + 1/3 = (2+1)/3 = 3/3 = 1 whole harvest."
    }
  ]);

  const showToast = (msg) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  const handleToggleAttendance = (studentId) => {
    setAttendance(prev => {
      const next = { ...prev, [studentId]: !prev[studentId] };
      const student = students.find(s => s.id === studentId);
      showToast(`${student ? student.name : 'Student'} marked as ${next[studentId] ? 'Present (हाजिर)' : 'Absent (अनुपस्थित)'}`);
      return next;
    });
  };

  const handleMarkAllPresent = () => {
    const all = {};
    students.forEach(s => { all[s.id] = true; });
    setAttendance(all);
    try {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.3 } });
    } catch (e) {}
    showToast('All students marked Present for today\'s session!');
  };

  const handleAssignRemedial = (studentId, studentName) => {
    setAssignedRemedial(prev => ({
      ...prev,
      [studentId]: true
    }));
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.3 } });
    } catch (e) {}
    showToast(`Remedial Worksheet & Offline Quiz dispatched to ${studentName}'s tablet!`);
  };

  const handleBroadcastSMS = () => {
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.4 } });
    } catch (e) {}
    showToast('✅ Weekly progress SMS broadcasted to all 30 guardian feature phones!');
  };

  const handleGenerateQuestions = (e) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      if (subject === 'Mathematics') {
        setGeneratedQuestions([
          {
            q: "Ramu cultivated wheat on 1/3 of his land and mustard on 1/3. What fraction is cultivated in total?",
            options: ["2/3", "1/6", "2/6", "3/3"],
            answer: "2/3",
            explanation: "1/3 + 1/3 = (1+1)/3 = 2/3 of the land."
          },
          {
            q: "A fraction has numerator 7 and denominator 10. Write the fraction:",
            options: ["10/7", "7/10", "17/10", "70/100"],
            answer: "7/10",
            explanation: "Numerator on top, denominator below = 7/10."
          },
          {
            q: "Convert mixed fraction 2 ½ into an improper fraction:",
            options: ["5/2", "3/2", "4/2", "5/4"],
            answer: "5/2",
            explanation: "(2 × 2 + 1)/2 = 5/2."
          }
        ]);
      } else if (subject === 'Science') {
        setGeneratedQuestions([
          {
            q: "Through which microscopic leaf pores do plants absorb Carbon Dioxide during daylight?",
            options: ["Stomata (रंध्र)", "Xylem", "Chlorophyll", "Roots"],
            answer: "Stomata (रंध्र)",
            explanation: "Tiny pores called stomata allow atmospheric gas exchange."
          },
          {
            q: "What essential chemical reactants are needed for photosynthesis besides solar energy?",
            options: ["Water (H2O) & Carbon Dioxide (CO2)", "Only Soil", "Only Oxygen", "Nitrogen only"],
            answer: "Water (H2O) & Carbon Dioxide (CO2)",
            explanation: "Water absorbed by roots and CO2 absorbed by leaves synthesize glucose."
          },
          {
            q: "Which green pigment traps sunlight in plant leaves?",
            options: ["Chlorophyll", "Hemoglobin", "Carotene", "Anthocyanin"],
            answer: "Chlorophyll",
            explanation: "Chlorophyll pigment absorbs light photons to drive the reaction."
          }
        ]);
      } else if (subject === 'English') {
        setGeneratedQuestions([
          {
            q: "Choose the correct polite greeting to address your Headmistress at 10:00 AM:",
            options: ["Good Morning, Ma'am", "Good Night, Ma'am", "Hey there", "Bye Ma'am"],
            answer: "Good Morning, Ma'am",
            explanation: "Before 12:00 PM, the standard formal greeting is Good Morning."
          },
          {
            q: "Fill in the blank: '_______ is my favourite teacher in school.'",
            options: ["He / She", "They is", "Us is", "Them"],
            answer: "He / She",
            explanation: "Singular subject pronoun He or She agrees with singular verb 'is'."
          },
          {
            q: "What word should you use when requesting a book from a classmate?",
            options: ["Please", "Now", "Give", "Hurry"],
            answer: "Please",
            explanation: "'Please' is the polite marker for making respectful requests."
          }
        ]);
      } else if (subject === 'Social Science') {
        setGeneratedQuestions([
          {
            q: "What is the minimum voting age for a villager to participate in the Gram Sabha?",
            options: ["18 Years", "16 Years", "21 Years", "25 Years"],
            answer: "18 Years",
            explanation: "Every adult citizen aged 18 or above registered in the village voter list is a Gram Sabha member."
          },
          {
            q: "Who is the executive head elected by the Gram Panchayat in rural local governance?",
            options: ["Sarpanch / Gram Pradhan", "Tehsildar", "Police Inspector", "Block Officer"],
            answer: "Sarpanch / Gram Pradhan",
            explanation: "The Gram Pradhan or Sarpanch is directly elected by the villagers."
          },
          {
            q: "At which level does the Zila Parishad operate in the 3-tier Panchayati Raj system?",
            options: ["District Level", "Village Level", "Block Level", "State Level"],
            answer: "District Level",
            explanation: "Zila Parishad operates at the district level coordinating all village panchayats."
          }
        ]);
      } else if (subject === 'Hindi') {
        setGeneratedQuestions([
          {
            q: "कविता 'हम पंछी उन्मुक्त गगन के' में 'कनक-तीलियाँ' से कवि का क्या तात्पर्य है?",
            options: ["सोने के पिंजरे की तीलियाँ", "लोहे की छड़ें", "लकड़ी का घोंसला", "चांदी की कटोरी"],
            answer: "सोने के पिंजरे की तीलियाँ",
            explanation: "'कनक' का अर्थ सोना होता है, अर्थात् सोने के पिंजरे की तीलियाँ।"
          },
          {
            q: "पक्षी पिंजरे में बंद रहने के बजाय क्या खाना पसंद करते हैं?",
            options: ["कटुक निंबौरी (कड़वी नीम)", "मैदा", "मिठाई", "सोने के दाने"],
            answer: "कटुक निंबौरी (कड़वी नीम)",
            explanation: "पक्षी स्वाभिमान और आज़ादी के साथ कड़वी नीम का फल खाना पसंद करते हैं।"
          }
        ]);
      } else {
        setGeneratedQuestions([
          {
            q: "What is the primary golden rule for receiving money through UPI QR codes?",
            options: [
              "NEVER enter your UPI PIN to receive money",
              "Always enter PIN to receive money",
              "Enter password twice",
              "Share OTP on phone call"
            ],
            answer: "NEVER enter your UPI PIN to receive money",
            explanation: "UPI PIN is only required to SEND money. Receiving funds requires no PIN."
          },
          {
            q: "What should you do if an unknown caller asks for your bank or Aadhaar OTP?",
            options: [
              "NEVER share OTP and disconnect immediately",
              "Share OTP if they say they are bank manager",
              "Write OTP on SMS",
              "Forward to friends"
            ],
            answer: "NEVER share OTP and disconnect immediately",
            explanation: "Banks and official authorities never ask for confidential OTPs over calls."
          }
        ]);
      }

      setIsGenerating(false);
      try {
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.4 } });
      } catch (e) {}
      showToast(`Generated ${qCount} rural-curriculum questions for ${subject}!`);
    }, 600);
  };

  const handleCopyQuestions = () => {
    const text = `GyanSetu Class Worksheet\nSubject: ${subject} | Grade: ${grade} | Topic: ${topic}\n\n` +
      generatedQuestions.map((q, i) => `${i + 1}. ${q.q}\nOptions:\n   A) ${q.options[0]}\n   B) ${q.options[1]}\n   C) ${q.options[2]}\n   D) ${q.options[3]}\nAnswer: ${q.answer}\nExplanation: ${q.explanation}\n`).join('\n');
    navigator.clipboard.writeText(text);
    setCopyStatus(true);
    showToast('Worksheet text copied to clipboard!');
    setTimeout(() => setCopyStatus(false), 2000);
  };

  // Filter students
  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.rollNo.includes(searchQuery);
    if (!matchesSearch) return false;

    if (statusFilter === 'needs_help') return s.overallScore < 50;
    if (statusFilter === 'good') return s.overallScore >= 75;
    if (statusFilter === 'remedial') return assignedRemedial[s.id];
    return true;
  });

  const presentCount = Object.values(attendance).filter(Boolean).length;
  const attendanceRate = Math.round((presentCount / students.length) * 100);

  return (
    <div className="space-y-6 pb-28 max-w-6xl mx-auto animate-fadeIn">
      {/* Toast Feedback */}
      {feedbackToast && (
        <div className="fixed top-28 sm:top-20 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-50 w-[92%] max-w-sm sm:w-auto bg-upnavy-950/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl border border-upnavy-700 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-upsaffron-400 shrink-0" />
          <span className="font-semibold text-slate-100">{feedbackToast}</span>
        </div>
      )}

      {/* 1. Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-upnavy-900 bg-upnavy-100/90 px-3 py-1 rounded-full border border-upnavy-200">
              Teacher Faculty Portal
            </span>
            <span className="text-xs text-slate-500 font-medium">Class 7A • Roll 01 to 30</span>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Active Session
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-upnavy-950 tracking-tight">
            Mr. R.K. Sharma (Senior Educator)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Govt Model Upper Primary School Rampur • Academic Session 2026-27
          </p>
        </div>

        {/* Quick Teacher Actions */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={handleMarkAllPresent}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition active:scale-95 flex items-center gap-1.5 border border-slate-200"
          >
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Mark All Present</span>
          </button>
          <button
            onClick={handleBroadcastSMS}
            className="px-4 py-2 bg-upsaffron-600 hover:bg-upsaffron-700 text-white font-bold text-xs rounded-2xl transition active:scale-95 flex items-center gap-1.5 shadow-sm shadow-upsaffron-600/30"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Broadcast SMS to Parents</span>
          </button>
        </div>
      </div>

      {/* 2. Bento Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Enrolled Students</span>
            <Users className="w-4 h-4 text-upnavy-800" />
          </div>
          <div className="text-2xl font-black text-upnavy-950">{students.length}</div>
          <div className="text-[11px] text-slate-500 font-medium">Class 7A Total Roster</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Today's Attendance</span>
            <Calendar className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700">{attendanceRate}%</div>
          <div className="text-[11px] text-emerald-600 font-bold">{presentCount} of {students.length} Present</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Class Average Mastery</span>
            <BarChart3 className="w-4 h-4 text-upsaffron-600" />
          </div>
          <div className="text-2xl font-black text-upsaffron-600">74%</div>
          <div className="text-[11px] text-slate-500 font-medium">+8% improvement this month</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Needs Remedial Help</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-600">
            {students.filter(s => s.overallScore < 50).length}
          </div>
          <div className="text-[11px] text-rose-600 font-semibold">Scores below 50% threshold</div>
        </div>
      </div>

      {/* 3. Segmented Navigation Tab Bar */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl max-w-full overflow-x-auto scrollbar-none border border-slate-200/60">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'overview'
              ? 'bg-upnavy-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-upnavy-950'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Student Roster & Remedials</span>
        </button>

        <button
          onClick={() => setActiveTab('generator')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'generator'
              ? 'bg-upnavy-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-upnavy-950'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-upsaffron-400" />
          <span>Multi-Subject AI Worksheet Generator</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
            activeTab === 'analytics'
              ? 'bg-upnavy-800 text-white shadow-xs'
              : 'text-slate-600 hover:text-upnavy-950'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Classroom Topic Analytics</span>
        </button>
      </div>

      {/* TAB 1: STUDENT ROSTER & REMEDIAL ACTIONS */}
      {activeTab === 'overview' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-7 space-y-6">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search student by name or roll number..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-upsaffron-500 font-semibold text-slate-900"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs overflow-x-auto max-w-full pb-1 scrollbar-none">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-xl font-bold transition shrink-0 ${statusFilter === 'all' ? 'bg-upnavy-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                All ({students.length})
              </button>
              <button
                onClick={() => setStatusFilter('needs_help')}
                className={`px-3 py-1.5 rounded-xl font-bold transition shrink-0 ${statusFilter === 'needs_help' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'}`}
              >
                Needs Help (&lt;50%)
              </button>
              <button
                onClick={() => setStatusFilter('good')}
                className={`px-3 py-1.5 rounded-xl font-bold transition shrink-0 ${statusFilter === 'good' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
              >
                Good (75%+)
              </button>
              <button
                onClick={() => setStatusFilter('remedial')}
                className={`px-3 py-1.5 rounded-xl font-bold transition shrink-0 ${statusFilter === 'remedial' ? 'bg-upsaffron-600 text-white' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'}`}
              >
                Remedial Assigned
              </button>
            </div>
          </div>

          {/* Student Roster Cards */}
          <div className="divide-y divide-slate-100">
            {filteredStudents.map(student => {
              const isRemedialAssigned = assignedRemedial[student.id];
              const isPresent = attendance[student.id] !== false;

              return (
                <div key={student.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-slate-50/60 p-2.5 rounded-2xl transition">
                  <div className="flex items-center gap-3.5">
                    {/* Attendance Pill */}
                    <button
                      onClick={() => handleToggleAttendance(student.id)}
                      className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center transition active:scale-95 shrink-0 ${
                        isPresent 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}
                      title={isPresent ? 'Click to mark Absent' : 'Click to mark Present'}
                    >
                      {isPresent ? 'P' : 'A'}
                    </button>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-upnavy-950">{student.name}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                          Roll {student.rollNo}
                        </span>
                        {isRemedialAssigned && (
                          <span className="text-[10px] bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full font-bold">
                            Worksheet Dispatched ✓
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                        <span>Last active: {student.lastActive}</span>
                        <span>•</span>
                        <span className="text-slate-400">{student.syncStatus}</span>
                      </div>
                    </div>
                  </div>

                  {/* Weak topics & score */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto pt-2 sm:pt-0 border-t border-slate-100 sm:border-0">
                    <div className="text-left sm:text-right">
                      <div className={`text-sm font-black ${
                        student.overallScore < 50 ? 'text-rose-600' : student.overallScore >= 75 ? 'text-emerald-600' : 'text-amber-600'
                      }`}>
                        {student.overallScore}% Mastery
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {student.weakTopics && student.weakTopics.length > 0
                          ? `Weak in: ${student.weakTopics.join(', ')}`
                          : 'All prerequisites mastered'}
                      </div>
                    </div>

                    <button
                      onClick={() => handleAssignRemedial(student.id, student.name)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition active:scale-95 shrink-0 flex items-center gap-1.5 ${
                        isRemedialAssigned
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-upnavy-800 hover:bg-upsaffron-600 text-white shadow-2xs'
                      }`}
                    >
                      {isRemedialAssigned ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Assigned</span>
                        </>
                      ) : (
                        <>
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Assign Remedial</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: MULTI-SUBJECT AI WORKSHEET GENERATOR */}
      {activeTab === 'generator' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-bold text-upnavy-950 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-upsaffron-600" />
                <span>AI Rural Curriculum Worksheet Generator</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Generate localized practice questions and printable village homework sets across all subjects
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyQuestions}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
              >
                {copyStatus ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copyStatus ? 'Copied!' : 'Copy Text'}</span>
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-upnavy-800 hover:bg-upsaffron-600 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Worksheet</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleGenerateQuestions} className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Subject:</label>
              <select
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
              >
                <option value="Mathematics">📐 Mathematics</option>
                <option value="Science">🔬 Science</option>
                <option value="English">📖 English</option>
                <option value="Social Science">🌍 Social Science</option>
                <option value="Hindi">🇮🇳 Hindi Literature</option>
                <option value="Digital Literacy">💻 Digital Literacy</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Class / Grade:</label>
              <select
                value={grade}
                onChange={e => setGrade(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
              >
                <option>Class 6</option>
                <option>Class 7</option>
                <option>Class 8</option>
                <option>Class 9</option>
                <option>Class 10</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Topic / Concept:</label>
              <input
                type="text"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="e.g. Fractions, Photosynthesis, Civics"
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full py-2.5 bg-upsaffron-600 hover:bg-upsaffron-700 text-white font-bold text-xs rounded-xl shadow-md shadow-upsaffron-600/30 transition flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>{isGenerating ? 'Generating...' : 'Generate AI Worksheet'}</span>
              </button>
            </div>
          </form>

          {/* Generated Questions Card */}
          <div className="space-y-4 pt-2">
            <h3 className="font-bold text-sm text-upnavy-950 flex items-center justify-between">
              <span>Preview: {subject} Practice Worksheet ({grade})</span>
              <span className="text-xs text-slate-400 font-normal">Ready for offline blackboard / print</span>
            </h3>

            <div className="space-y-3.5">
              {generatedQuestions.map((q, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                  <div className="font-bold text-upnavy-950">
                    Q{idx + 1}: {q.q}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    {q.options.map((opt, oIdx) => (
                      <div 
                        key={oIdx}
                        className={`p-2 rounded-xl border font-medium ${
                          opt === q.answer 
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold' 
                            : 'bg-white border-slate-200 text-slate-600'
                        }`}
                      >
                        <span className="font-mono text-slate-400 mr-1.5">{String.fromCharCode(65 + oIdx)})</span>
                        <span>{opt}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-[11px] text-emerald-700 bg-emerald-50/70 p-2 rounded-xl border border-emerald-200/60 mt-1">
                    <strong>Solution / Explanation:</strong> {q.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CLASSROOM TOPIC ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h2 className="text-xl font-bold text-upnavy-950">
              Class 7A Topic Mastery & Diagnostic Radar
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Comprehensive overview of student understanding to target remedial teaching
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { topic: "Fractions & Decimals (गणित)", pct: 42, status: "Urgent Remedial", color: "bg-rose-600", note: "Common error: adding denominators directly" },
              { topic: "Percentages & Ratios (प्रतिशत)", pct: 55, status: "Developing", color: "bg-amber-500", note: "Prerequisites locked until Fractions mastered" },
              { topic: "Photosynthesis (पौधों में पोषण)", pct: 88, status: "Mastered", color: "bg-emerald-600", note: "Strong understanding of leaf stomata and sunlight" },
              { topic: "Basic English Pronouns & Introductions", pct: 72, status: "Proficient", color: "bg-sky-600", note: "Oral speech fluency improving rapidly" },
              { topic: "Panchayati Raj & Village Civics", pct: 82, status: "Mastered", color: "bg-emerald-600", note: "Relates well to local Gram Sabha meetings" },
              { topic: "Digital Literacy & Cyber Safety", pct: 90, status: "Mastered", color: "bg-indigo-600", note: "100% awareness of NEVER sharing OTPs" }
            ].map((t, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-upnavy-950">{t.topic}</span>
                  <span className={`${t.pct < 50 ? 'text-rose-600' : 'text-slate-800'}`}>{t.pct}%</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div className={`${t.color} h-2.5 rounded-full transition-all duration-500`} style={{ width: `${t.pct}%` }} />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{t.note}</span>
                  <span className="font-bold text-slate-600">{t.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
