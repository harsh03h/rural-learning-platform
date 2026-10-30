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
  School,
  Download,
  Share2
} from 'lucide-react';

export const WEEKLY_SCHEDULES = {
  'Class 6': {
    badge: 'Middle School Foundation',
    themeColor: 'from-purple-900 to-indigo-950',
    accentBadge: 'bg-purple-100 text-purple-900 border-purple-200',
    eveningFocus: 'Practice 5 whole number jumps & read 1 Hindi story offline',
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
    eveningFocus: 'Review Fraction Roti division model & 10 min AI Doubt Saathi quiz drill',
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
    eveningFocus: 'Solve 3 linear equation word problems & review cyber hygiene tips',
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
    eveningFocus: 'Derive velocity-time graph equations & revise plant vs animal cell diagram',
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
    eveningFocus: 'Solve 1 NCERT Trigonometric identity drill & balance 5 chemical equations',
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

/**
 * Generates an immaculate, standalone, high-resolution A4 printable HTML document.
 * Includes official headers, period timings, student info, timetable table, guidelines, and signatures.
 */
export function generatePrintableTimetableHtml({ schedule, selectedGrade, currentUser, lang }) {
  const isHi = lang === 'hi';
  const studentName = currentUser?.name || (isHi ? 'अतिथि शिक्षार्थी' : 'Student Learner');
  const studentRoll = currentUser?.rollNo || (currentUser ? '24' : 'N/A');
  const studentSchool = currentUser?.school || 'Model Senior Secondary School Rampur';
  const currentDate = new Date().toLocaleDateString(isHi ? 'hi-IN' : 'en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return `<!DOCTYPE html>
<html lang="${isHi ? 'hi' : 'en'}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${selectedGrade} Weekly Study Timetable - GyanSetu</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;600;700;800&display=swap');
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Plus Jakarta Sans', 'Noto Sans Devanagari', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #0f172a;
      background: #f8fafc;
      line-height: 1.4;
      padding: 24px;
      -webkit-font-smoothing: antialiased;
    }

    /* Floating Top Toolbar (Hidden on actual print) */
    .no-print-toolbar {
      position: sticky;
      top: 12px;
      z-index: 1000;
      max-width: 980px;
      margin: 0 auto 24px auto;
      background: #062F4F;
      color: #ffffff;
      padding: 12px 20px;
      border-radius: 16px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      box-shadow: 0 10px 25px -5px rgba(6, 47, 79, 0.4);
    }

    .toolbar-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .toolbar-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 18px;
      font-size: 13px;
      font-weight: 700;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      transition: all 0.15s ease;
      font-family: inherit;
    }

    .btn-print {
      background: #e4541f;
      color: #ffffff;
    }
    .btn-print:hover {
      background: #c2410c;
    }

    .btn-close {
      background: rgba(255, 255, 255, 0.15);
      color: #ffffff;
    }
    .btn-close:hover {
      background: rgba(255, 255, 255, 0.25);
    }

    .toolbar-tip {
      font-size: 11px;
      color: #bae6fd;
    }

    /* Printable Page Container */
    .printable-sheet {
      max-width: 980px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 16px;
      padding: 28px 32px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }

    /* Official Sheet Header */
    .sheet-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      border-bottom: 2.5px solid #062F4F;
      padding-bottom: 16px;
      margin-bottom: 16px;
      gap: 20px;
    }

    .brand-title {
      font-size: 24px;
      font-weight: 900;
      color: #062F4F;
      letter-spacing: -0.5px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .brand-subtitle {
      font-size: 12px;
      font-weight: 700;
      color: #e4541f;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 2px;
    }

    .school-name {
      font-size: 13px;
      color: #334155;
      font-weight: 600;
      margin-top: 4px;
    }

    .badge-grade {
      background: #062F4F;
      color: #ffffff;
      padding: 6px 16px;
      border-radius: 9999px;
      font-size: 14px;
      font-weight: 800;
      text-align: right;
      display: inline-block;
    }

    .badge-session {
      font-size: 11px;
      color: #64748b;
      font-weight: 600;
      margin-top: 4px;
      text-align: right;
    }

    /* Student Info Strip */
    .student-strip {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 10px 14px;
      margin-bottom: 18px;
    }

    .student-field-label {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      color: #64748b;
      margin-bottom: 2px;
    }

    .student-field-val {
      font-size: 13px;
      font-weight: 800;
      color: #062F4F;
    }

    /* Daily Periods Timing Legend */
    .timings-bar {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-bottom: 18px;
    }

    .timing-card {
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 8px 10px;
    }

    .timing-card.p1 { border-left: 4px solid #062F4F; }
    .timing-card.p2 { border-left: 4px solid #e4541f; }
    .timing-card.p3 { border-left: 4px solid #059669; }
    .timing-card.ss { border-left: 4px solid #7c3aed; }

    .timing-pname {
      font-weight: 800;
      font-size: 11px;
      color: #0f172a;
    }

    .timing-ptime {
      font-weight: 700;
      color: #e4541f;
      font-size: 11px;
    }

    .timing-pdesc {
      font-size: 10px;
      color: #64748b;
      margin-top: 2px;
      line-height: 1.25;
    }

    /* Weekly Schedule Table */
    .schedule-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      font-size: 11.5px;
    }

    .schedule-table th {
      background: #062F4F;
      color: #ffffff;
      font-weight: 800;
      text-align: left;
      padding: 10px 12px;
      font-size: 11px;
      letter-spacing: 0.3px;
      text-transform: uppercase;
      border: 1px solid #062F4F;
    }

    .schedule-table td {
      padding: 9px 12px;
      border: 1px solid #cbd5e1;
      vertical-align: top;
      color: #1e293b;
      line-height: 1.35;
    }

    .schedule-table tr:nth-child(even) {
      background: #f8fafc;
    }

    .day-cell {
      font-weight: 900;
      color: #062F4F;
      white-space: nowrap;
      font-size: 12px;
    }

    .p-tag {
      display: inline-block;
      font-size: 9px;
      font-weight: 800;
      padding: 1px 5px;
      border-radius: 4px;
      margin-right: 4px;
      text-transform: uppercase;
    }

    .p1-tag { background: #dbeafe; color: #1e40af; }
    .p2-tag { background: #ffedd5; color: #9a3412; }
    .p3-tag { background: #dcfce7; color: #166534; }
    .ss-tag { background: #f3e8ff; color: #6b21a8; }

    /* Rural Study Tips Box */
    .guidelines-box {
      background: #fffbeb;
      border: 1px solid #fde68a;
      border-radius: 12px;
      padding: 12px 16px;
      margin-bottom: 20px;
      font-size: 11px;
      color: #78350f;
    }

    .guidelines-title {
      font-weight: 800;
      font-size: 12px;
      color: #92400e;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .guidelines-list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-top: 6px;
      line-height: 1.35;
    }

    /* Signatures Section */
    .signatures-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding-top: 18px;
      border-top: 1px dashed #cbd5e1;
      margin-top: 16px;
      font-size: 11px;
      color: #475569;
    }

    .signature-box {
      border-top: 1px solid #94a3b8;
      padding-top: 6px;
      text-align: center;
      font-weight: 700;
      color: #334155;
    }

    .signature-box span {
      display: block;
      font-size: 10px;
      color: #64748b;
      font-weight: 500;
    }

    /* Print Overrides */
    @media print {
      body {
        background: #ffffff !important;
        padding: 0 !important;
      }

      .no-print-toolbar {
        display: none !important;
      }

      .printable-sheet {
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
        max-width: 100% !important;
        border-radius: 0 !important;
      }

      @page {
        size: A4 portrait;
        margin: 10mm 12mm;
      }

      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    }
  </style>
</head>
<body>
  <!-- Floating No-Print Toolbar -->
  <div class="no-print-toolbar">
    <div class="toolbar-left">
      <button class="toolbar-btn btn-print" onclick="window.print()">
        🖨️ ${isHi ? 'समय-सारणी प्रिंट करें (Print / Save PDF)' : 'Print Timetable / Save as PDF'}
      </button>
      <button class="toolbar-btn btn-close" onclick="window.close()">
        ✕ ${isHi ? 'विंडो बंद करें' : 'Close Window'}
      </button>
    </div>
    <div class="toolbar-tip">
      💡 ${isHi ? 'सुझाव: प्रिंट डायलॉग में "Save as PDF" चुनें या अपने प्रिंटर से A4 साइज पोस्टर प्रिंट करें।' : 'Tip: Select "Save as PDF" in print preview or send directly to printer.'}
    </div>
  </div>

  <!-- A4 Printable Sheet -->
  <div class="printable-sheet">
    <!-- Header -->
    <div class="sheet-header">
      <div>
        <div class="brand-title">
          <span>ज्ञानसेतु</span> • GyanSetu
        </div>
        <div class="brand-subtitle">
          ${isHi ? 'ग्रामीण शिक्षा पहल • साप्ताहिक अध्ययन समय-सारणी' : 'Rural Learning Platform • Weekly Academic Study Timetable'}
        </div>
        <div class="school-name">
          🏛️ ${studentSchool}
        </div>
      </div>
      <div style="text-align: right;">
        <div class="badge-grade">
          ${selectedGrade}
        </div>
        <div class="badge-session">
          Academic Session 2026–27 • ${schedule.badge}
        </div>
      </div>
    </div>

    <!-- Student Info Strip -->
    <div class="student-strip">
      <div>
        <div class="student-field-label">${isHi ? 'विद्यार्थी का नाम' : 'Student Name'}</div>
        <div class="student-field-val">${studentName}</div>
      </div>
      <div>
        <div class="student-field-label">${isHi ? 'कक्षा व रोल नंबर' : 'Class & Roll No'}</div>
        <div class="student-field-val">${selectedGrade} • Roll #${studentRoll}</div>
      </div>
      <div>
        <div class="student-field-label">${isHi ? 'पाठ्यक्रम' : 'Curriculum Track'}</div>
        <div class="student-field-val">NCERT & State Board</div>
      </div>
      <div>
        <div class="student-field-label">${isHi ? 'प्रिंट दिनांक' : 'Issue / Print Date'}</div>
        <div class="student-field-val">${currentDate}</div>
      </div>
    </div>

    <!-- Daily Periods Timing Legend -->
    <div class="timings-bar">
      <div class="timing-card p1">
        <div class="timing-pname">Period 1 (Morning)</div>
        <div class="timing-ptime">08:30 AM – 10:00 AM</div>
        <div class="timing-pdesc">Core Concepts, Mathematics & Formulas</div>
      </div>
      <div class="timing-card p2">
        <div class="timing-pname">Period 2 (Mid-Day)</div>
        <div class="timing-ptime">10:30 AM – 12:00 PM</div>
        <div class="timing-pdesc">Science, Experiments & Social Science</div>
      </div>
      <div class="timing-card p3">
        <div class="timing-pname">Period 3 (Afternoon)</div>
        <div class="timing-ptime">02:00 PM – 03:30 PM</div>
        <div class="timing-pdesc">English, Hindi Literature & Digital Skills</div>
      </div>
      <div class="timing-card ss">
        <div class="timing-pname">Self-Study (Evening)</div>
        <div class="timing-ptime">06:00 PM – 07:00 PM</div>
        <div class="timing-pdesc">Offline Quizzes & AI Doubt Saathi Revision</div>
      </div>
    </div>

    <!-- Weekly Schedule Table -->
    <table class="schedule-table">
      <thead>
        <tr>
          <th style="width: 14%;">${isHi ? 'दिन' : 'Day'}</th>
          <th style="width: 28%;">${isHi ? 'पीरियड 1 (08:30-10:00)' : 'Period 1 (08:30–10:00)'}</th>
          <th style="width: 28%;">${isHi ? 'पीरियड 2 (10:30-12:00)' : 'Period 2 (10:30–12:00)'}</th>
          <th style="width: 30%;">${isHi ? 'पीरियड 3 (02:00-03:30)' : 'Period 3 (02:00–03:30)'}</th>
        </tr>
      </thead>
      <tbody>
        ${schedule.days.map((item, idx) => `
          <tr>
            <td class="day-cell">
              <strong>${item.day}</strong>
              <div style="font-size: 10px; color: #64748b; font-weight: normal;">Day ${idx + 1}</div>
            </td>
            <td>
              <span class="p-tag p1-tag">P1</span>
              <span>${item.p1}</span>
            </td>
            <td>
              <span class="p-tag p2-tag">P2</span>
              <span>${item.p2}</span>
            </td>
            <td>
              <span class="p-tag p3-tag">P3</span>
              <span>${item.p3}</span>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <!-- Rural Study Guidelines Box -->
    <div class="guidelines-box">
      <div class="guidelines-title">
        ⚡ ${isHi ? 'ग्रामीण विद्यार्थियों के लिए अध्ययन दिशा-निर्देश' : 'Rural Digital Study Routine & Exam Preparation Guidelines'}
      </div>
      <div class="guidelines-list">
        <div>
          <strong>1. ${isHi ? 'बिजली कटौती व ऑफ़लाइन डाउनलोड:' : 'Power Cuts & Offline Download:'}</strong>
          ${isHi ? 'दिन के समय स्कूल वाई-फाई या मोबाइल नेटवर्क से पाठ सेव कर लें। सभी पाठ 50KB से छोटे हैं।' : 'Download chapters on your shared tablet or phone during school hours. All lessons are under 50KB.'}
        </div>
        <div>
          <strong>2. ${isHi ? 'लो-डेटा मोड (2G/3G):' : 'Low Data Mode (2G/3G):'}</strong>
          ${isHi ? 'डेटा सेवर हमेशा ऑन रखें। भारी वीडियो के बजाय ऑडियो व टेक्स्ट से पढ़ाई करें।' : 'Keep data saver enabled. Use voice narration instead of heavy video streaming to save mobile balance.'}
        </div>
        <div>
          <strong>3. ${isHi ? 'एआई साती डाउट सॉल्वर:' : 'AI Doubt Saathi (Bedtime):'}</strong>
          ${isHi ? 'सोने से पहले अपने किसी भी विषय का सवाल हिंदी या मातृभाषा में पूछकर समझें।' : 'Solve remaining doubts in Hindi or your mother tongue before sleeping without extra tutoring costs.'}
        </div>
      </div>
    </div>

    <!-- Signatures Section -->
    <div class="signatures-row">
      <div class="signature-box">
        ${isHi ? 'विद्यार्थी के हस्ताक्षर' : 'Student Signature'}
        <span>${isHi ? 'नियमित अध्ययन संकल्प' : 'Learner Commitment'}</span>
      </div>
      <div class="signature-box">
        ${isHi ? 'अभिभावक के हस्ताक्षर' : 'Parent / Guardian Signature'}
        <span>${isHi ? 'दैनिक प्रगति निगरानी' : 'Daily Study Monitoring'}</span>
      </div>
      <div class="signature-box">
        ${isHi ? 'कक्षा शिक्षक / मेंटर' : 'Class Teacher / Mentor'}
        <span>${studentSchool}</span>
      </div>
    </div>
  </div>

  <script>
    // Trigger automatic print dialog once page is loaded
    window.addEventListener('load', function() {
      setTimeout(function() {
        try {
          window.print();
        } catch (e) {
          console.warn('Auto print failed:', e);
        }
      }, 350);
    });
  </script>
</body>
</html>`;
}

export function ClassTimetableModal({ 
  isOpen, 
  onClose, 
  selectedGrade = 'Class 7', 
  currentUser,
  lang = 'en' 
}) {
  if (!isOpen) return null;

  const isHi = lang === 'hi';
  const schedule = WEEKLY_SCHEDULES[selectedGrade] || WEEKLY_SCHEDULES['Class 7'];
  const todayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());

  const handlePrint = () => {
    try {
      const printWindow = window.open('', '_blank', 'width=980,height=850');
      if (printWindow) {
        const printableHtml = generatePrintableTimetableHtml({
          schedule,
          selectedGrade,
          currentUser,
          lang
        });
        printWindow.document.open();
        printWindow.document.write(printableHtml);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          try {
            printWindow.print();
          } catch (e) {
            console.warn('Auto print dialog trigger error:', e);
          }
        }, 400);
      } else {
        // Fallback if browser blocked popups
        window.print();
      }
    } catch (err) {
      console.warn('Failed to open dedicated print window, falling back to window.print():', err);
      window.print();
    }
  };

  return (
    <div className="timetable-print-overlay fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-upnavy-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="timetable-print-container bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-scaleUp">
        
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
              <span>{isHi ? 'साप्ताहिक अध्ययन समय-सारणी' : 'Recommended Weekly Study Timetable'}</span>
            </h3>
            <p className="text-xs text-slate-300 max-w-lg">
              {isHi 
                ? 'ग्रामीण विद्यार्थियों के लिए डे-लाइट फ्रेंडली पीरियड्स और ज़ीरो-स्क्रीन रात के रिविजन के साथ अनुकूलित।' 
                : 'Optimized for rural students with daylight-friendly periods and zero-screen night revision.'}
            </p>
          </div>

          <div className="flex items-center gap-2 no-print">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-upsaffron-600 hover:bg-upsaffron-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm shadow-upsaffron-600/30 cursor-pointer active:scale-95"
              title={isHi ? 'स्टडी वॉल के लिए प्रिंट करें या PDF सेव करें' : 'Print timetable for study wall or save as PDF'}
            >
              <Printer className="w-4 h-4" />
              <span>{isHi ? 'प्रिंट / PDF' : 'Print / Save PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition active:scale-95 cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Timetable Body */}
        <div className="timetable-print-body p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Daily Timing Legend Banner */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 bg-slate-50 p-3 rounded-2xl border border-slate-200/80 text-xs">
            <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-100">
              <span className="w-2 h-2 rounded-full bg-upnavy-800 mt-1 shrink-0" />
              <div>
                <strong className="block text-upnavy-950 font-bold text-[11px]">Period 1 (Morning)</strong>
                <span className="text-[10px] text-upsaffron-700 font-semibold block">08:30 AM – 10:00 AM</span>
                <span className="text-[10px] text-slate-500 block">Mathematics & Concepts</span>
              </div>
            </div>
            <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-100">
              <span className="w-2 h-2 rounded-full bg-upsaffron-600 mt-1 shrink-0" />
              <div>
                <strong className="block text-upnavy-950 font-bold text-[11px]">Period 2 (Mid-Day)</strong>
                <span className="text-[10px] text-upsaffron-700 font-semibold block">10:30 AM – 12:00 PM</span>
                <span className="text-[10px] text-slate-500 block">Science & Social Studies</span>
              </div>
            </div>
            <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-100">
              <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1 shrink-0" />
              <div>
                <strong className="block text-upnavy-950 font-bold text-[11px]">Period 3 (Afternoon)</strong>
                <span className="text-[10px] text-upsaffron-700 font-semibold block">02:00 PM – 03:30 PM</span>
                <span className="text-[10px] text-slate-500 block">Languages & Digital Skills</span>
              </div>
            </div>
            <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-slate-100">
              <span className="w-2 h-2 rounded-full bg-purple-600 mt-1 shrink-0" />
              <div>
                <strong className="block text-upnavy-950 font-bold text-[11px]">Self-Study (Evening)</strong>
                <span className="text-[10px] text-upsaffron-700 font-semibold block">06:00 PM – 07:00 PM</span>
                <span className="text-[10px] text-slate-500 block">AI Doubt Saathi & Quiz</span>
              </div>
            </div>
          </div>

          {/* Daily Schedule Slots */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {schedule.days.map((item, idx) => {
              const isToday = item.day.toLowerCase() === todayName.toLowerCase();
              return (
                <div 
                  key={idx}
                  className={`timetable-day-card rounded-2xl p-4 border transition-all duration-200 flex flex-col justify-between ${
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
                        {isHi ? 'आज का प्लान 🎯' : "Today's Plan 🎯"}
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-semibold">
                        {isHi ? `दिन ${idx + 1}` : `Day ${idx + 1}`}
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
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-upnavy-50 to-amber-50 dark:from-slate-900 dark:to-slate-900/90 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-upsaffron-100 text-upsaffron-700 flex items-center justify-center shrink-0">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-upnavy-950">
                  {isHi ? `${selectedGrade} के लिए डिजिटल ग्रामीण अध्ययन नियम` : `Rural Digital Study Guidelines for ${selectedGrade}`}
                </h4>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  • <strong>{isHi ? 'बिजली कटौती?' : 'Power cuts?'}</strong> {isHi ? 'स्कूल समय में "Save Offline" बटन से पाठ डिवाइस पर सुरक्षित कर लें।' : 'Download chapters during school hours using the "Save Offline" button.'}
                  <br />
                  • <strong>{isHi ? 'धीमा 2G सिग्नल?' : 'Low 2G signal?'}</strong> {isHi ? 'कम डेटा मोड चालू रखें ताकि बिना वीडियो बफरिंग पढ़ाई हो सके।' : 'Keep "Low Data Mode" turned ON to study without loading heavy videos.'}
                  <br />
                  • <strong>{isHi ? 'डाउट साथी:' : 'Doubt Saathi:'}</strong> {isHi ? 'सोने से पहले हिंदी या अपनी भाषा में सवाल पूछकर समझें।' : 'Ask any academic question in Hindi or regional language before bedtime.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto no-print">
              <button
                onClick={handlePrint}
                className="px-4 py-2.5 bg-upsaffron-600 hover:bg-upsaffron-700 text-white font-bold text-xs rounded-xl transition active:scale-95 flex items-center gap-1.5 shadow-sm cursor-pointer"
                title={isHi ? 'A4 साइज में प्रिंट करें या PDF सेव करें' : 'Print timetable or save as PDF'}
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{isHi ? 'प्रिंट समय-सारणी (A4)' : 'Print Timetable (A4)'}</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2.5 bg-upnavy-900 hover:bg-upnavy-800 text-white font-bold text-xs rounded-xl transition active:scale-95 cursor-pointer"
              >
                {isHi ? 'शुरू करें' : 'Close & Start Studying'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
