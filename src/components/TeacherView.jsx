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
  MessageSquare,
  GraduationCap,
  School,
  CheckCheck,
  Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { translations } from '../data/mockData';
import { generateTeacherQuestions } from '../services/api';

export const ASSIGNED_CLASSES = [
  {
    id: "class-7a",
    name: "Class 7A",
    grade: "Class 7",
    section: "Section A",
    subject: "Mathematics & Science",
    studentCount: 30,
    room: "Room 204",
    role: "Class Teacher & Math Lead",
    schedule: "Mon - Fri (09:00 AM - 10:30 AM)",
    badgeColor: "bg-upsaffron-50 text-upsaffron-700 border-upsaffron-200"
  },
  {
    id: "class-7b",
    name: "Class 7B",
    grade: "Class 7",
    section: "Section B",
    subject: "Mathematics",
    studentCount: 26,
    room: "Room 205",
    role: "Subject Teacher",
    schedule: "Mon - Fri (10:45 AM - 11:45 AM)",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200"
  },
  {
    id: "class-8a",
    name: "Class 8A",
    grade: "Class 8",
    section: "Section A",
    subject: "Higher Mathematics & Science",
    studentCount: 32,
    room: "Room 301",
    role: "Senior Math Faculty",
    schedule: "Mon - Fri (12:30 PM - 01:30 PM)",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
  },
  {
    id: "class-6a",
    name: "Class 6A",
    grade: "Class 6",
    section: "Section A",
    subject: "Foundational Mathematics",
    studentCount: 28,
    room: "Room 102",
    role: "Subject Teacher",
    schedule: "Mon - Fri (01:45 PM - 02:45 PM)",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200"
  },
  {
    id: "class-9a",
    name: "Class 9A",
    grade: "Class 9",
    section: "Section A",
    subject: "Secondary Mathematics",
    studentCount: 25,
    room: "Room 306",
    role: "Secondary Lead",
    schedule: "Tue, Thu, Sat (03:00 PM - 04:00 PM)",
    badgeColor: "bg-rose-50 text-rose-700 border-rose-200"
  },
  {
    id: "class-10a",
    name: "Class 10A",
    grade: "Class 10",
    section: "Section A",
    subject: "Board Prep Mathematics & Science",
    studentCount: 35,
    room: "Room 402",
    role: "Senior Board Exam Lead",
    schedule: "Mon - Sat (08:00 AM - 09:00 AM)",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200"
  }
];

export const INITIAL_ALL_STUDENTS = [
  // Class 7A Students
  {
    id: "stu-1",
    name: "Rahul Kumar",
    rollNo: "07",
    classGrade: "Class 7A",
    overallScore: 42,
    lastActive: "Today, 10:15 AM",
    weakTopics: ["Fractions", "Percentages"],
    status: "Needs Remedial Attention",
    syncStatus: "Synced",
    isPresent: true
  },
  {
    id: "stu-2",
    name: "Amit Sharma",
    rollNo: "12",
    classGrade: "Class 7A",
    overallScore: 48,
    lastActive: "Yesterday",
    weakTopics: ["Percentages", "Geometry"],
    status: "Needs Remedial Attention",
    syncStatus: "Synced",
    isPresent: true
  },
  {
    id: "stu-3",
    name: "Pooja Patel",
    rollNo: "19",
    classGrade: "Class 7A",
    overallScore: 52,
    lastActive: "2 days ago",
    weakTopics: ["Fractions"],
    status: "Average Progress",
    syncStatus: "1 Quiz Pending Offline",
    isPresent: true
  },
  {
    id: "stu-4",
    name: "Rohan Verma",
    rollNo: "24",
    classGrade: "Class 7A",
    overallScore: 72,
    lastActive: "Active Now",
    weakTopics: ["Fractions (In Progress)"],
    status: "On Track",
    syncStatus: "Synced",
    isPresent: true
  },
  {
    id: "stu-5",
    name: "Sunita Devi",
    rollNo: "31",
    classGrade: "Class 7A",
    overallScore: 91,
    lastActive: "Today, 2:30 PM",
    weakTopics: [],
    status: "Star Performer",
    syncStatus: "Synced",
    isPresent: true
  },
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
  },

  // Class 7B Students
  {
    id: "stu-7b-1",
    name: "Aarti Gupta",
    rollNo: "02",
    classGrade: "Class 7B",
    overallScore: 88,
    lastActive: "Today, 10:45 AM",
    weakTopics: [],
    status: "Star Performer",
    syncStatus: "Synced",
    isPresent: true
  },
  {
    id: "stu-7b-2",
    name: "Pankaj Maurya",
    rollNo: "08",
    classGrade: "Class 7B",
    overallScore: 46,
    lastActive: "Yesterday",
    weakTopics: ["Simple Equations"],
    status: "Needs Remedial Attention",
    syncStatus: "Synced",
    isPresent: false
  },
  {
    id: "stu-7b-3",
    name: "Meena Kumari",
    rollNo: "15",
    classGrade: "Class 7B",
    overallScore: 67,
    lastActive: "Today, 11:10 AM",
    weakTopics: ["Fractions"],
    status: "Average Progress",
    syncStatus: "Synced",
    isPresent: true
  },
  {
    id: "stu-7b-4",
    name: "Sachin Verma",
    rollNo: "21",
    classGrade: "Class 7B",
    overallScore: 39,
    lastActive: "4 days ago",
    weakTopics: ["Ratio & Proportion", "Equations"],
    status: "Needs Remedial Attention",
    syncStatus: "2 Quizzes Pending",
    isPresent: false
  },
  {
    id: "stu-7b-5",
    name: "Divya Chauhan",
    rollNo: "26",
    classGrade: "Class 7B",
    overallScore: 94,
    lastActive: "Active Now",
    weakTopics: [],
    status: "Top Scorer",
    syncStatus: "Synced",
    isPresent: true
  },
  {
    id: "stu-7b-6",
    name: "Harsh Vardhan",
    rollNo: "30",
    classGrade: "Class 7B",
    overallScore: 73,
    lastActive: "Today, 08:30 AM",
    weakTopics: ["Decimals"],
    status: "Good Progress",
    syncStatus: "Synced",
    isPresent: true
  },

  // Class 8A Students
  {
    id: "stu-8a-1",
    name: "Aditya Raj",
    rollNo: "04",
    classGrade: "Class 8A",
    overallScore: 78,
    lastActive: "Today, 12:40 PM",
    weakTopics: ["Linear Equations"],
    status: "Good Progress",
    syncStatus: "Synced",
    isPresent: true
  },
  {
    id: "stu-8a-2",
    name: "Babli Kumari",
    rollNo: "11",
    classGrade: "Class 8A",
    overallScore: 42,
    lastActive: "Yesterday",
    weakTopics: ["Algebraic Expressions", "Exponents"],
    status: "Needs Remedial Attention",
    syncStatus: "Synced",
    isPresent: false
  },
  {
    id: "stu-8a-3",
    name: "Chandan Yadav",
    rollNo: "16",
    classGrade: "Class 8A",
    overallScore: 85,
    lastActive: "Active Now",
    weakTopics: [],
    status: "Star Performer",
    syncStatus: "Synced",
    isPresent: true
  },
  {
    id: "stu-8a-4",
    name: "Geeta Devi",
    rollNo: "23",
    classGrade: "Class 8A",
    overallScore: 47,
    lastActive: "2 days ago",
    weakTopics: ["Rational Numbers", "Powers"],
    status: "Needs Remedial Attention",
    syncStatus: "1 Quiz Pending",
    isPresent: true
  },
  {
    id: "stu-8a-5",
    name: "Manish Pandey",
    rollNo: "28",
    classGrade: "Class 8A",
    overallScore: 71,
    lastActive: "Today, 09:15 AM",
    weakTopics: ["Mensuration"],
    status: "Average Progress",
    syncStatus: "Synced",
    isPresent: true
  },
  {
    id: "stu-8a-6",
    name: "Shilpa Maurya",
    rollNo: "33",
    classGrade: "Class 8A",
    overallScore: 92,
    lastActive: "Today, 01:10 PM",
    weakTopics: [],
    status: "Star Performer",
    syncStatus: "Synced",
    isPresent: true
  },

  // Class 6A Students
  {
    id: "stu-6a-1",
    name: "Ananya Mishra",
    rollNo: "03",
    classGrade: "Class 6A",
    overallScore: 82,
    lastActive: "Today, 01:50 PM",
    weakTopics: [],
    status: "Good Progress",
    syncStatus: "Synced",
    isPresent: true
  },
  {
    id: "stu-6a-2",
    name: "Deepak Kumar",
    rollNo: "09",
    classGrade: "Class 6A",
    overallScore: 44,
    lastActive: "3 days ago",
    weakTopics: ["Decimals", "Divisibility Rules"],
    status: "Needs Remedial Attention",
    syncStatus: "1 Quiz Pending",
    isPresent: false
  },
  {
    id: "stu-6a-3",
    name: "Kavita Rawat",
    rollNo: "14",
    classGrade: "Class 6A",
    overallScore: 90,
    lastActive: "Active Now",
    weakTopics: [],
    status: "Star Performer",
    syncStatus: "Synced",
    isPresent: true
  },
  {
    id: "stu-6a-4",
    name: "Suresh Patel",
    rollNo: "18",
    classGrade: "Class 6A",
    overallScore: 49,
    lastActive: "Yesterday",
    weakTopics: ["Fractions & Shapes"],
    status: "Needs Remedial Attention",
    syncStatus: "Synced",
    isPresent: true
  },
  {
    id: "stu-6a-5",
    name: "Neha Kumari",
    rollNo: "22",
    classGrade: "Class 6A",
    overallScore: 76,
    lastActive: "Today, 10:20 AM",
    weakTopics: ["Basic Geometry"],
    status: "Good Progress",
    syncStatus: "Synced",
    isPresent: true
  },
  {
    id: "stu-6a-6",
    name: "Rohit Sahani",
    rollNo: "27",
    classGrade: "Class 6A",
    overallScore: 63,
    lastActive: "Yesterday",
    weakTopics: ["Whole Numbers"],
    status: "Average Progress",
    syncStatus: "Synced",
    isPresent: true
  },

  // Class 9A Students
  {
    id: "stu-9a-1",
    name: "Aman Tripathi",
    rollNo: "01",
    classGrade: "Class 9A",
    overallScore: 89,
    lastActive: "Today, 03:15 PM",
    weakTopics: [],
    status: "Star Performer",
    syncStatus: "Synced",
    isPresent: true
  },
  {
    id: "stu-9a-2",
    name: "Jyoti Sharma",
    rollNo: "06",
    classGrade: "Class 9A",
    overallScore: 45,
    lastActive: "2 days ago",
    weakTopics: ["Polynomials", "Coordinate Geometry"],
    status: "Needs Remedial Attention",
    syncStatus: "Synced",
    isPresent: false
  },
  {
    id: "stu-9a-3",
    name: "Karan Pal",
    rollNo: "13",
    classGrade: "Class 9A",
    overallScore: 68,
    lastActive: "Today, 11:45 AM",
    weakTopics: ["Linear Equations in Two Variables"],
    status: "Average Progress",
    syncStatus: "Synced",
    isPresent: true
  },
  {
    id: "stu-9a-4",
    name: "Nisha Lodhi",
    rollNo: "19",
    classGrade: "Class 9A",
    overallScore: 51,
    lastActive: "Yesterday",
    weakTopics: ["Number Systems"],
    status: "Average Progress",
    syncStatus: "Synced",
    isPresent: true
  },
  {
    id: "stu-9a-5",
    name: "Pradeep Kumar",
    rollNo: "24",
    classGrade: "Class 9A",
    overallScore: 96,
    lastActive: "Active Now",
    weakTopics: [],
    status: "Top Scorer",
    syncStatus: "Synced",
    isPresent: true
  },
  {
    id: "stu-9a-6",
    name: "Ritu Maurya",
    rollNo: "29",
    classGrade: "Class 9A",
    overallScore: 74,
    lastActive: "Today, 02:00 PM",
    weakTopics: ["Triangles & Congruence"],
    status: "Good Progress",
    syncStatus: "Synced",
    isPresent: true
  },

  // Class 10A Students (Board Exam Candidates)
  {
    id: "stu-10a-1",
    name: "Alok Nath",
    rollNo: "02",
    classGrade: "Class 10A",
    overallScore: 93,
    lastActive: "Today, 08:45 AM",
    weakTopics: [],
    status: "Top Board Candidate",
    syncStatus: "Synced",
    isPresent: true
  },
  {
    id: "stu-10a-2",
    name: "Bhavna Chawla",
    rollNo: "07",
    classGrade: "Class 10A",
    overallScore: 44,
    lastActive: "Yesterday",
    weakTopics: ["Quadratic Equations", "Trigonometry"],
    status: "Needs Remedial Attention",
    syncStatus: "1 Quiz Pending",
    isPresent: false
  },
  {
    id: "stu-10a-3",
    name: "Chetan Sharma",
    rollNo: "14",
    classGrade: "Class 10A",
    overallScore: 76,
    lastActive: "Today, 10:15 AM",
    weakTopics: ["Light Optics"],
    status: "Good Progress",
    syncStatus: "Synced",
    isPresent: true
  },
  {
    id: "stu-10a-4",
    name: "Divyanshu Rai",
    rollNo: "20",
    classGrade: "Class 10A",
    overallScore: 88,
    lastActive: "Active Now",
    weakTopics: [],
    status: "Star Performer",
    syncStatus: "Synced",
    isPresent: true
  },
  {
    id: "stu-10a-5",
    name: "Ekta Maurya",
    rollNo: "25",
    classGrade: "Class 10A",
    overallScore: 49,
    lastActive: "2 days ago",
    weakTopics: ["Chemical Equations", "Triangles"],
    status: "Needs Remedial Attention",
    syncStatus: "Synced",
    isPresent: true
  },
  {
    id: "stu-10a-6",
    name: "Farhan Ansari",
    rollNo: "32",
    classGrade: "Class 10A",
    overallScore: 70,
    lastActive: "Today, 01:25 PM",
    weakTopics: ["Life Processes"],
    status: "Average Progress",
    syncStatus: "Synced",
    isPresent: true
  }
];

const CLASS_ANALYTICS = {
  "Class 7A": [
    { topic: "Fractions & Decimals (भिन्न एवं दशमलव)", pct: 42, status: "Urgent Remedial", color: "bg-rose-600", note: "Common error: adding denominators directly" },
    { topic: "Percentages & Ratios (प्रतिशत)", pct: 55, status: "Developing", color: "bg-amber-500", note: "Prerequisites locked until Fractions mastered" },
    { topic: "Photosynthesis (पौधों में पोषण)", pct: 88, status: "Mastered", color: "bg-emerald-600", note: "Strong understanding of leaf stomata and sunlight" },
    { topic: "Basic English Pronouns & Introductions", pct: 72, status: "Proficient", color: "bg-sky-600", note: "Oral speech fluency improving rapidly" },
    { topic: "Panchayati Raj & Village Civics", pct: 82, status: "Mastered", color: "bg-emerald-600", note: "Relates well to local Gram Sabha meetings" },
    { topic: "Digital Literacy & Cyber Safety", pct: 90, status: "Mastered", color: "bg-indigo-600", note: "100% awareness of NEVER sharing OTPs" }
  ],
  "Class 7B": [
    { topic: "Simple Equations (सरल समीकरण)", pct: 46, status: "Urgent Remedial", color: "bg-rose-600", note: "Sign errors when transposing terms across equals" },
    { topic: "Ratio & Proportion (अनुपात एवं समानुपात)", pct: 58, status: "Developing", color: "bg-amber-500", note: "Struggling with unitary method word problems" },
    { topic: "Nutrition in Animals (प्राणियों में पोषण)", pct: 85, status: "Mastered", color: "bg-emerald-600", note: "Clear comprehension of ruminant digestion" },
    { topic: "English Prepositions & Action Verbs", pct: 69, status: "Proficient", color: "bg-sky-600", note: "In/On/Under concepts clear in oral drills" },
    { topic: "Rural Livelihoods & Farm Economy", pct: 86, status: "Mastered", color: "bg-emerald-600", note: "High context connection with family farming" },
    { topic: "Cyber Hygiene & Mobile Device Care", pct: 92, status: "Mastered", color: "bg-indigo-600", note: "Understands low-data sync & offline safety" }
  ],
  "Class 8A": [
    { topic: "Linear Equations in One Variable", pct: 44, status: "Urgent Remedial", color: "bg-rose-600", note: "Cross-multiplication brackets calculation errors" },
    { topic: "Rational Numbers & Number Line", pct: 62, status: "Developing", color: "bg-amber-500", note: "Negative rational number placement on scale" },
    { topic: "Microorganisms: Friend and Foe", pct: 89, status: "Mastered", color: "bg-emerald-600", note: "Good grasp of fermentation and vaccination" },
    { topic: "Force and Pressure (बल तथा दाब)", pct: 77, status: "Proficient", color: "bg-sky-600", note: "Atmospheric pressure experiments conducted" },
    { topic: "Indian Constitution & Fundamental Rights", pct: 84, status: "Mastered", color: "bg-emerald-600", note: "Strong knowledge of Right to Equality & Education" },
    { topic: "Computer Fundamentals & Keyboard Skills", pct: 91, status: "Mastered", color: "bg-indigo-600", note: "Typing practice in Hindi & English" }
  ],
  "Class 6A": [
    { topic: "Fractions Basics (भिन्न की अवधारणा)", pct: 48, status: "Needs Support", color: "bg-rose-600", note: "Visual circle/square partition models helping" },
    { topic: "Whole Numbers & Number Line", pct: 74, status: "Proficient", color: "bg-sky-600", note: "Addition/subtraction on line well understood" },
    { topic: "Components of Food & Balanced Diet", pct: 87, status: "Mastered", color: "bg-emerald-600", note: "Identification of vitamins, proteins in village diet" },
    { topic: "Basic English Alphabet & Daily Words", pct: 79, status: "Proficient", color: "bg-emerald-600", note: "Sound phonics and bilingual vocabulary cards" },
    { topic: "Understanding Diversity & Panchayati Raj", pct: 81, status: "Mastered", color: "bg-emerald-600", note: "Active participation in mock village panchayat" },
    { topic: "Smartphone & Tablet Safe Handling", pct: 94, status: "Mastered", color: "bg-indigo-600", note: "Excellent offline quiz submission discipline" }
  ],
  "Class 9A": [
    { topic: "Polynomials & Factoring (बहुपद)", pct: 45, status: "Urgent Remedial", color: "bg-rose-600", note: "Splitting middle term formula confusion" },
    { topic: "Coordinate Geometry (निर्देशांक ज्यामिति)", pct: 65, status: "Developing", color: "bg-amber-500", note: "Quadrant sign identification improving" },
    { topic: "The Fundamental Unit of Life: Cell", pct: 90, status: "Mastered", color: "bg-emerald-600", note: "Plant vs animal cell organelles thoroughly mastered" },
    { topic: "Motion & Laws of Motion (गति)", pct: 73, status: "Proficient", color: "bg-sky-600", note: "Newton's 1st and 3rd laws understood with examples" },
    { topic: "Democracy in Contemporary World", pct: 85, status: "Mastered", color: "bg-emerald-600", note: "Good analysis of electoral participation" },
    { topic: "Information Technology & Spreadsheets", pct: 88, status: "Mastered", color: "bg-indigo-600", note: "Basic formulas and data entry proficiency" }
  ],
  "Class 10A": [
    { topic: "Real Numbers & Euclid Lemma (वास्तविक संख्याएँ)", pct: 88, status: "Mastered", color: "bg-emerald-600", note: "Strong grasp of Fundamental Theorem of Arithmetic" },
    { topic: "Quadratic Equations (द्विघात समीकरण)", pct: 46, status: "Urgent Remedial", color: "bg-rose-600", note: "Discriminant formula sign errors in test papers" },
    { topic: "Introduction to Trigonometry (त्रिकोणमिति)", pct: 42, status: "Urgent Remedial", color: "bg-rose-600", note: "Struggling with tan/sin/cos standard angle ratios" },
    { topic: "Chemical Reactions & Equations (रासायनिक अभिक्रियाएं)", pct: 82, status: "Mastered", color: "bg-emerald-600", note: "Balancing equations well understood" },
    { topic: "Life Processes & Respiration (जैव प्रक्रम)", pct: 79, status: "Proficient", color: "bg-sky-600", note: "Human digestive enzyme pathways clear" },
    { topic: "Light: Reflection & Refraction (प्रकाशिकी)", pct: 64, status: "Developing", color: "bg-amber-500", note: "Ray diagrams practice scheduled" }
  ]
};

export function TeacherView({ lang }) {
  const t = translations[lang] || translations['en'];
  const [selectedClass, setSelectedClass] = useState('Class 7A');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'generator' | 'analytics'
  const [allStudents, setAllStudents] = useState(INITIAL_ALL_STUDENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'needs_help' | 'good' | 'remedial'
  const [assignedRemedial, setAssignedRemedial] = useState({});
  const [copyStatus, setCopyStatus] = useState(false);
  const [attendance, setAttendance] = useState(() => {
    const map = {};
    INITIAL_ALL_STUDENTS.forEach(s => {
      map[s.id] = s.isPresent !== false;
    });
    return map;
  });
  const [feedbackToast, setFeedbackToast] = useState(null);

  // Active Class Info
  const activeClassInfo = ASSIGNED_CLASSES.find(c => c.name === selectedClass) || ASSIGNED_CLASSES[0];

  // AI Question Generator State
  const [subject, setSubject] = useState('Mathematics');
  const [topic, setTopic] = useState('Fractions (भिन्न)');
  const [grade, setGrade] = useState(activeClassInfo.grade);
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

  const handleSelectClass = (className) => {
    setSelectedClass(className);
    const targetClass = ASSIGNED_CLASSES.find(c => c.name === className);
    if (targetClass) {
      setGrade(targetClass.grade);
    }
    showToast(`Switched to ${className} (${targetClass?.subject || 'Subject Roster'})`);
  };

  // Filter students for the active selected class
  const classStudents = allStudents.filter(s => s.classGrade === selectedClass);

  const handleToggleAttendance = (studentId) => {
    setAttendance(prev => {
      const next = { ...prev, [studentId]: !prev[studentId] };
      const student = allStudents.find(s => s.id === studentId);
      showToast(`${student ? student.name : 'Student'} marked as ${next[studentId] ? 'Present (हाजिर)' : 'Absent (अनुपस्थित)'}`);
      return next;
    });
  };

  const handleMarkAllPresent = () => {
    setAttendance(prev => {
      const next = { ...prev };
      classStudents.forEach(s => {
        next[s.id] = true;
      });
      return next;
    });
    try {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.3 } });
    } catch (e) {}
    showToast(`All ${classStudents.length} students in ${selectedClass} marked Present for today!`);
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
    showToast(`✅ Weekly progress SMS broadcasted to all ${activeClassInfo.studentCount} guardian feature phones of ${selectedClass}!`);
  };

  const handleGenerateQuestions = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const apiResult = await generateTeacherQuestions({
        topic: topic || 'Fractions',
        grade: grade || 'Class 6',
        count: parseInt(qCount) || 3,
        difficulty
      });

      if (apiResult && apiResult.questions && apiResult.questions.length > 0) {
        setGeneratedQuestions(apiResult.questions);
        setIsGenerating(false);
        try {
          confetti({ particleCount: 50, spread: 50, origin: { y: 0.4 } });
        } catch (e) {}
        showToast(`AI generated ${apiResult.questions.length} questions via backend AI service for ${topic} (${grade})!`);
        return;
      }
    } catch (err) {
      console.warn("Backend question generation error, falling back to local questions", err);
    }

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
      showToast(`Generated ${qCount} rural-curriculum questions for ${subject} (${grade})!`);
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

  // Filter students within the selected class
  const filteredStudents = classStudents.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.rollNo.includes(searchQuery);
    if (!matchesSearch) return false;

    if (statusFilter === 'needs_help') return s.overallScore < 50;
    if (statusFilter === 'good') return s.overallScore >= 75;
    if (statusFilter === 'remedial') return assignedRemedial[s.id];
    return true;
  });

  // Calculate dynamic metrics for selected class
  const classPresentCount = classStudents.filter(s => attendance[s.id] !== false).length;
  const classAttendanceRate = classStudents.length > 0 ? Math.round((classPresentCount / classStudents.length) * 100) : 0;
  const classAvgScore = classStudents.length > 0 
    ? Math.round(classStudents.reduce((acc, s) => acc + s.overallScore, 0) / classStudents.length) 
    : 72;
  const classRemedialCount = classStudents.filter(s => s.overallScore < 50).length;

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
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-upnavy-900 bg-upnavy-100/90 px-3 py-1 rounded-full border border-upnavy-200 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-upnavy-700" />
              Teacher Faculty Portal
            </span>
            <span className="text-xs font-bold bg-upsaffron-50 text-upsaffron-700 px-3 py-1 rounded-full border border-upsaffron-200 flex items-center gap-1">
              <span>Active: {selectedClass}</span>
              <span className="text-[10px] text-upsaffron-600 font-medium">({activeClassInfo.section})</span>
            </span>
            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {activeClassInfo.room} • {activeClassInfo.schedule.split(' ')[0]}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-upnavy-950 tracking-tight">
            Mr. R.K. Sharma (Senior Educator)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-2 flex-wrap">
            <span>Model Senior Secondary School Rampur</span>
            <span>•</span>
            <span className="text-slate-400">Teaching 5 Assigned Classes</span>
            <span>•</span>
            <span className="text-emerald-600 font-semibold">Academic Session 2026-27</span>
          </p>
        </div>

        {/* Quick Teacher Actions */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={handleMarkAllPresent}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition active:scale-95 flex items-center gap-1.5 border border-slate-200"
            title={`Mark all students in ${selectedClass} present`}
          >
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Mark {selectedClass} Present</span>
          </button>
          <button
            onClick={handleBroadcastSMS}
            className="px-4 py-2.5 bg-upsaffron-600 hover:bg-upsaffron-700 text-white font-bold text-xs rounded-2xl transition active:scale-95 flex items-center gap-1.5 shadow-sm shadow-upsaffron-600/30"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Broadcast SMS to Parents</span>
          </button>
        </div>
      </div>

      {/* 2. CLASS SWITCHER BAR (MULTI-CLASS MANAGEMENT) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-upnavy-900 text-upsaffron-400 flex items-center justify-center shrink-0">
              <School className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-upnavy-950 flex items-center gap-2">
                <span>Assigned Classes & Sections</span>
                <span className="text-[10px] bg-upnavy-100 text-upnavy-900 font-bold px-2 py-0.5 rounded-full">
                  {ASSIGNED_CLASSES.length} Classes Assigned
                </span>
              </h2>
              <p className="text-[11px] text-slate-500">
                Click any class to instantly switch rosters, attendance, worksheets, and topic diagnostics
              </p>
            </div>
          </div>

          <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 self-start sm:self-auto bg-slate-50 px-3 py-1 rounded-xl border border-slate-100">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Viewing: <strong className="text-upnavy-950">{selectedClass} ({activeClassInfo.subject})</strong></span>
          </div>
        </div>

        {/* Class Cards Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-1">
          {ASSIGNED_CLASSES.map(cls => {
            const isSelected = cls.name === selectedClass;
            const clsStudentCount = allStudents.filter(s => s.classGrade === cls.name).length;

            return (
              <button
                key={cls.id}
                onClick={() => handleSelectClass(cls.name)}
                className={`p-3.5 rounded-2xl text-left transition-all duration-200 relative group flex flex-col justify-between border ${
                  isSelected
                    ? 'bg-gradient-to-br from-upnavy-900 to-upnavy-950 text-white border-upnavy-900 shadow-md ring-2 ring-upsaffron-500/80 scale-[1.02]'
                    : 'bg-slate-50/80 hover:bg-white text-slate-700 border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-xs font-black tracking-tight px-2 py-0.5 rounded-lg ${
                      isSelected 
                        ? 'bg-white/20 text-white' 
                        : 'bg-white text-upnavy-950 border border-slate-200 shadow-2xs'
                    }`}>
                      {cls.name}
                    </span>
                    {isSelected ? (
                      <span className="w-4 h-4 rounded-full bg-upsaffron-500 text-white flex items-center justify-center text-[10px] font-black">
                        ✓
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-semibold">
                        {cls.room}
                      </span>
                    )}
                  </div>

                  <div className={`text-[11px] font-bold truncate ${isSelected ? 'text-slate-100' : 'text-slate-900'}`}>
                    {cls.subject}
                  </div>
                  <div className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {cls.role}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/40 flex items-center justify-between text-[10px]">
                  <span className={isSelected ? 'text-upsaffron-300 font-bold' : 'text-slate-500'}>
                    {cls.studentCount} Students
                  </span>
                  <span className={`px-1.5 py-0.2 rounded font-semibold ${
                    isSelected ? 'bg-white/10 text-slate-200' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {cls.section}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Bento Statistics Cards (Dynamic for Selected Class) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Enrolled Students</span>
            <Users className="w-4 h-4 text-upnavy-800" />
          </div>
          <div className="text-2xl font-black text-upnavy-950">{activeClassInfo.studentCount}</div>
          <div className="text-[11px] text-slate-500 font-medium">
            {selectedClass} ({classStudents.length} Portal Active)
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Today's Attendance</span>
            <Calendar className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700">{classAttendanceRate}%</div>
          <div className="text-[11px] text-emerald-600 font-bold">
            {classPresentCount} of {classStudents.length} Present in {selectedClass}
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Class Average Mastery</span>
            <BarChart3 className="w-4 h-4 text-upsaffron-600" />
          </div>
          <div className="text-2xl font-black text-upsaffron-600">{classAvgScore}%</div>
          <div className="text-[11px] text-slate-500 font-medium">{selectedClass} Academic Average</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Needs Remedial Help</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-600">
            {classRemedialCount}
          </div>
          <div className="text-[11px] text-rose-600 font-semibold">Scores below 50% threshold</div>
        </div>
      </div>

      {/* 4. Segmented Navigation Tab Bar */}
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
          <span>{selectedClass} Student Roster ({classStudents.length})</span>
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
          <span>{selectedClass} Topic Analytics</span>
        </button>
      </div>

      {/* TAB 1: STUDENT ROSTER & REMEDIAL ACTIONS */}
      {activeTab === 'overview' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-7 space-y-6">
          {/* Class Subheader & Quick Switcher Dropdown */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-upnavy-950">
                  {selectedClass} Roster & Remedial Monitoring
                </h3>
                <span className="text-[11px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-md border border-slate-200">
                  {activeClassInfo.subject}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {activeClassInfo.room} • {activeClassInfo.schedule} • {activeClassInfo.role}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs text-slate-500 font-semibold hidden md:inline">Switch Class:</span>
              <select
                value={selectedClass}
                onChange={e => handleSelectClass(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-upnavy-900 outline-none focus:ring-2 focus:ring-upsaffron-500 cursor-pointer"
              >
                {ASSIGNED_CLASSES.map(c => (
                  <option key={c.id} value={c.name}>
                    {c.name} ({c.subject})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder={`Search ${selectedClass} by name or roll number...`}
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
                All ({classStudents.length})
              </button>
              <button
                onClick={() => setStatusFilter('needs_help')}
                className={`px-3 py-1.5 rounded-xl font-bold transition shrink-0 ${statusFilter === 'needs_help' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'}`}
              >
                Needs Help (&lt;50%) ({classRemedialCount})
              </button>
              <button
                onClick={() => setStatusFilter('good')}
                className={`px-3 py-1.5 rounded-xl font-bold transition shrink-0 ${statusFilter === 'good' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
              >
                Good (75%+) ({classStudents.filter(s => s.overallScore >= 75).length})
              </button>
              <button
                onClick={() => setStatusFilter('remedial')}
                className={`px-3 py-1.5 rounded-xl font-bold transition shrink-0 ${statusFilter === 'remedial' ? 'bg-upsaffron-600 text-white' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'}`}
              >
                Remedial Assigned ({classStudents.filter(s => assignedRemedial[s.id]).length})
              </button>
            </div>
          </div>

          {/* Student Roster Cards */}
          <div className="divide-y divide-slate-100">
            {filteredStudents.length === 0 ? (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <Users className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-sm font-semibold">No students match current search or filters in {selectedClass}.</p>
                <button
                  onClick={() => { setSearchQuery(''); setStatusFilter('all'); }}
                  className="text-xs text-upsaffron-600 font-bold hover:underline"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              filteredStudents.map(student => {
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
                          <span className="text-[10px] bg-upnavy-50 text-upnavy-800 px-2 py-0.5 rounded-full font-semibold border border-upnavy-100">
                            {student.classGrade}
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
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 2: MULTI-SUBJECT AI WORKSHEET GENERATOR */}
      {activeTab === 'generator' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-upnavy-950 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-upsaffron-600" />
                  <span>AI Rural Curriculum Worksheet Generator</span>
                </h2>
                <span className="text-[11px] bg-upsaffron-50 text-upsaffron-800 font-bold px-2 py-0.5 rounded-md border border-upsaffron-200">
                  Targeting {selectedClass}
                </span>
              </div>
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
              <label className="block font-bold text-slate-700 mb-1.5">Target Grade / Class:</label>
              <select
                value={grade}
                onChange={e => setGrade(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-upsaffron-500"
              >
                <option value="Class 6">Class 6 (Middle School)</option>
                <option value="Class 7">Class 7 (Middle School)</option>
                <option value="Class 8">Class 8 (Upper Primary)</option>
                <option value="Class 9">Class 9 (Secondary)</option>
                <option value="Class 10">Class 10 (Secondary Board)</option>
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
                <span>{isGenerating ? 'Generating...' : `Generate for ${selectedClass}`}</span>
              </button>
            </div>
          </form>

          {/* Generated Questions Card */}
          <div className="space-y-4 pt-2">
            <h3 className="font-bold text-sm text-upnavy-950 flex items-center justify-between">
              <span>Preview: {subject} Practice Worksheet ({grade} • {selectedClass})</span>
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-upnavy-950">
                  {selectedClass} Topic Mastery & Diagnostic Radar
                </h2>
                <span className="text-[11px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-md border border-slate-200">
                  {activeClassInfo.subject}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Comprehensive overview of student understanding in {selectedClass} to target remedial teaching
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">Change Class:</span>
              <select
                value={selectedClass}
                onChange={e => handleSelectClass(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-upnavy-900 outline-none focus:ring-2 focus:ring-upsaffron-500 cursor-pointer"
              >
                {ASSIGNED_CLASSES.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(CLASS_ANALYTICS[selectedClass] || CLASS_ANALYTICS["Class 7A"]).map((t, idx) => (
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
