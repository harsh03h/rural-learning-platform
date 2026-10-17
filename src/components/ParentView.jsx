import React, { useState } from 'react';
import { 
  Smartphone, 
  MessageSquare, 
  CheckCheck, 
  AlertCircle, 
  Signal, 
  Battery, 
  Radio, 
  PhoneCall, 
  PhoneOff, 
  Volume2, 
  Share2, 
  Award, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Sparkles, 
  HelpCircle, 
  Copy, 
  Check,
  School,
  GraduationCap,
  LogOut
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { translations, supportedLanguages } from '../data/mockData';

const ENROLLED_CHILDREN = [
  {
    id: 'rohan',
    name: 'Rohan Verma',
    grade: 'Class 7A',
    roll: '24',
    level: 'Middle School Core',
    overallScore: 78,
    attendance: '94%',
    mathScore: '80%',
    scienceScore: '88%',
    weakTopic: 'Percentages (प्रतिशत)',
    strongTopic: 'Fractions (भिन्न)',
    teacherNote: 'रोहन पढ़ाई में बहुत ध्यान दे रहे हैं। गणित में भिन्न (Fractions) बहुत अच्छा किया है। प्रतिशत (Percentages) में थोड़ी मदद चाहिए, जिसके लिए स्कूल टैबलेट में ऑफ़लाइन अभ्यास सुरक्षित कर दिया गया है।',
    smsMathScore: '80%',
    smsTopic: 'Fractions'
  },
  {
    id: 'priya',
    name: 'Priya Verma',
    grade: 'Class 10A',
    roll: '12',
    level: 'Secondary Board Prep',
    overallScore: 91,
    attendance: '98%',
    mathScore: '92%',
    scienceScore: '95%',
    weakTopic: 'Trigonometry (त्रिकोणमिति)',
    strongTopic: 'Chemical Reactions (रसायन विज्ञान)',
    teacherNote: 'प्रिया कक्षा 10वीं बोर्ड परीक्षा की तैयारी बहुत लगन से कर रही हैं। विज्ञान में प्रथम स्थान पर हैं। त्रिकोणमिति में कुछ अतिरिक्त अभ्यास के वर्कशीट दिए गए हैं।',
    smsMathScore: '92%',
    smsTopic: 'Chemical Reactions'
  },
  {
    id: 'aniket',
    name: 'Aniket Verma',
    grade: 'Class 6B',
    roll: '08',
    level: 'Middle School Foundation',
    overallScore: 74,
    attendance: '90%',
    mathScore: '76%',
    scienceScore: '82%',
    weakTopic: 'Decimals (दशमलव)',
    strongTopic: 'Whole Numbers (पूर्ण संख्याएँ)',
    teacherNote: 'अनिकेत कक्षा 6 में नियमित आ रहे हैं। पूर्ण संख्याओं की समझ बहुत अच्छी है। भोजन के घटक पाठ की प्रश्नोत्तरी सफलतापूर्वक पूरी की है।',
    smsMathScore: '76%',
    smsTopic: 'Whole Numbers'
  }
];

export function ParentView({ lang, onLogout }) {
  const t = translations[lang] || translations['en'];
  const [selectedChildId, setSelectedChildId] = useState('rohan');
  const [selectedParentLang, setSelectedParentLang] = useState(lang || 'hi');
  const [isCalling, setIsCalling] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const [teacherCallRequested, setTeacherCallRequested] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState(null);

  const currentChild = ENROLLED_CHILDREN.find(c => c.id === selectedChildId) || ENROLLED_CHILDREN[0];
  const childFirstName = currentChild.name.split(' ')[0];

  const showToast = (msg) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  const getSms1 = (l = selectedParentLang) => {
    switch (l) {
      case 'mr':
        return `प्रिय पालक, तुमच्या पाल्याने ${childFirstName} ने आज ${currentChild.grade} मध्ये ${currentChild.smsMathScore} गुण मिळवले. त्याने ${currentChild.smsTopic} चा पाठ पूर्ण केला. अभिनंदन!`;
      case 'bn':
        return `প্রিয় অভিভাবক, আপনার সন্তান ${childFirstName} আজ ${currentChild.grade} তে ${currentChild.smsMathScore} নম্বর পেয়েছে। সে ${currentChild.smsTopic} এর পাঠ সম্পন্ন করেছে। সাবাশ!`;
      case 'te':
        return `ప్రియమైన తల్లిదండ్రులకు, మీ విద్యార్థి ${childFirstName} ఈరోజు ${currentChild.grade} లో ${currentChild.smsMathScore} మార్కులు సాధించారు. ${currentChild.smsTopic} పాఠాన్ని పూర్తి చేశారు!`;
      case 'ta':
        return `அன்புள்ள பெற்றோரே, உங்கள் பிள்ளை ${childFirstName} இன்று ${currentChild.grade} வகுப்பில் ${currentChild.smsMathScore} மதிப்பெண்கள் பெற்றுள்ளார். ${currentChild.smsTopic} பாடத்தை வெற்றிகரமாக முடித்துள்ளார்!`;
      case 'gu':
        return `પ્રિય વાલી, આપના બાળક ${childFirstName} એ આજે ${currentChild.grade} માં ${currentChild.smsMathScore} ગુણ મેળવ્યા છે. તેણે ${currentChild.smsTopic} નો પાઠ પૂર્ણ કર્યો છે. ખૂબ સરસ!`;
      case 'kn':
        return `ಆತ್ಮೀಯ ಪೋಷಕರೇ, ನಿಮ್ಮ ಮಗು ${childFirstName} ಇಂದು ${currentChild.grade} ನಲ್ಲಿ ${currentChild.smsMathScore} ಅಂಕಗಳನ್ನು ಗಳಿಸಿದೆ. ${currentChild.smsTopic} ಪಾಠವನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದೆ!`;
      case 'pa':
        return `ਪਿਆਰੇ ਮਾਪਿਓ, ਤੁਹਾਡੇ ਬੱਚੇ ${childFirstName} ਨੇ ਅੱਜ ${currentChild.grade} ਵਿੱਚ ${currentChild.smsMathScore} ਅੰਕ ਪ੍ਰਾਪਤ ਕੀਤੇ। ਉਸਨੇ ${currentChild.smsTopic} ਦਾ ਪਾਠ ਪੂਰਾ ਕਰ ਲਿਆ ਹੈ। ਸ਼ਾਬਾਸ਼!`;
      case 'od':
        return `ପ୍ରିୟ ଅଭିଭାବକ, ଆପଣଙ୍କ ପିଲା ${childFirstName} ଆଜି ${currentChild.grade} ରେ ${currentChild.smsMathScore} ନମ୍ବର ପାଇଛି। ସେ ${currentChild.smsTopic} ପାଠ ସମ୍ପୂର୍ଣ୍ଣ କରିଛି!`;
      case 'hi':
        return `प्रिय अभिभावक, आपके बच्चे ${childFirstName} ने आज ${currentChild.grade} में ${currentChild.smsMathScore} अंक प्राप्त किए। उन्होंने ${currentChild.smsTopic} का पाठ पूरा किया। शाबाश!`;
      default:
        return `Dear Parent, your child ${childFirstName} (${currentChild.grade}) scored ${currentChild.smsMathScore} today after completing the ${currentChild.smsTopic} module. Keep up the encouragement!`;
    }
  };

  const getSms2 = (l = selectedParentLang) => {
    switch (l) {
      case 'mr':
        return `नमस्ते. ${childFirstName} ला ${currentChild.weakTopic} मध्ये थोडा सराव हवा आहे. शाळेने टॅबलेटवर ऑफलाइन सराव चाचणी सेव्ह केली आहे.`;
      case 'bn':
        return `নমস্কার। ${childFirstName} এর ${currentChild.weakTopic} অধ্যায়ে সামান্য অতিরিক্ত অনুশীলনের প্রয়োজন। অফলাইনে কুইজ ডিভাইসে সংরক্ষিত হয়েছে।`;
      case 'te':
        return `నమస్కారం. ${childFirstName} కు ${currentChild.weakTopic} అంశంలో అదనపు సాధన అవసరం. ఆఫ్‌లైన్ క్విజ్ డివైజ్‌లో సేవ్ చేయబడింది.`;
      case 'ta':
        return `வணக்கம். ${childFirstName} க்கு ${currentChild.weakTopic} பாடத்தில் கூடுதல் பயிற்சி தேவைப்படுகிறது. ஆஃப்லைன் வினாடி வினா சாதனத்தில் சேமிக்கப்பட்டுள்ளது.`;
      case 'gu':
        return `નમસ્તે. ${childFirstName} ને ${currentChild.weakTopic} માં થોડી વધુ પ્રેક્ટિસની જરૂર છે. શાળાએ ડિવાઇસમાં ઑફલાઇન ક્વિઝ સેવ કરી આપી છે.`;
      case 'kn':
        return `ನಮಸ್ಕಾರ. ${childFirstName} ಗೆ ${currentChild.weakTopic} ವಿಷಯದಲ್ಲಿ ಹೆಚ್ಚಿನ ಅಭ್ಯಾಸ ಬೇಕಿದೆ. ಆಫ್‌ಲೈನ್ ರಸಪ್ರಶ್ನೆ ಸಾಧನದಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ.`;
      case 'pa':
        return `ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ। ${childFirstName} ਨੂੰ ${currentChild.weakTopic} ਵਿੱਚ ਕੁਝ ਹੋਰ ਅਭਿਆਸ ਦੀ ਲੋੜ ਹੈ। ਸਕੂਲ ਨੇ ਆਫਲਾਈਨ ਕਵਿਜ਼ ਡਿਵਾਈਸ ਵਿੱਚ ਸੇਵ ਕਰ ਦਿੱਤੀ ਹੈ।`;
      case 'od':
        return `ନମସ୍କାର। ${childFirstName} କୁ ${currentChild.weakTopic} ପାଠରେ କିଛି ଅଧିକ ଅଭ୍ୟାସ ଦରକାର। ଡିଭାଇସ୍‌ରେ ଅଫଲାଇନ୍ କ୍ୱିଜ୍ ସେଭ୍ କରାଯାଇଛି।`;
      case 'hi':
        return `नमस्ते। ${childFirstName} को ${currentChild.weakTopic} में थोड़ी कठिनाई आ रही है। स्कूल ने उनके फोन/टैबलेट में ऑफ़लाइन अभ्यास क्विज़ सेव कर दिया है।`;
      default:
        return `Greetings. ${childFirstName} requires extra practice with ${currentChild.weakTopic}. School has cached remedial offline quizzes onto their shared device.`;
    }
  };

  // Text-to-Speech IVR voice call simulation
  const handleStartIVRCall = () => {
    setIsCalling(true);
    setCallActive(false);

    setTimeout(() => {
      setCallActive(true);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const speechText = getSms1(selectedParentLang) + ' ' + getSms2(selectedParentLang);
        const utterance = new SpeechSynthesisUtterance(speechText);
        const langConfig = supportedLanguages.find(l => l.code === selectedParentLang);
        utterance.lang = langConfig ? langConfig.tts : 'hi-IN';
        utterance.rate = 0.88;
        utterance.onend = () => {
          setCallActive(false);
          setIsCalling(false);
        };
        window.speechSynthesis.speak(utterance);
      }
    }, 1200);
  };

  const handleEndCall = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setCallActive(false);
    setIsCalling(false);
    showToast('IVR Voice Call completed.');
  };

  const handleRequestTeacherCallback = () => {
    setTeacherCallRequested(true);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.5 } });
    } catch (e) {}
    showToast(`Teacher callback requested for ${currentChild.name} (${currentChild.grade})! Educator will contact during office hours.`);
  };

  const handleShareWhatsApp = () => {
    const text = `GyanSetu Student Report for ${currentChild.name} (${currentChild.grade})\n` +
      `Overall Mastery: ${currentChild.overallScore}%\n` +
      `Attendance: ${currentChild.attendance}\n\n` +
      `Official SMS 1: ${getSms1()}\n` +
      `Official SMS 2: ${getSms2()}`;
    navigator.clipboard.writeText(text);
    setCopyStatus(true);
    showToast('Student report text copied to clipboard!');
    setTimeout(() => setCopyStatus(false), 2500);
  };

  return (
    <div className="space-y-6 pb-28 max-w-5xl mx-auto animate-fadeIn">
      {/* Toast Notification */}
      {feedbackToast && (
        <div className="fixed top-28 sm:top-20 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-50 w-[92%] max-w-sm sm:w-auto bg-upnavy-950/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl border border-upnavy-700 text-xs flex items-center gap-2 animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-upsaffron-400 shrink-0" />
          <span className="font-semibold text-slate-100">{feedbackToast}</span>
        </div>
      )}

      {/* 1. Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-upnavy-900 bg-upnavy-100/90 px-3 py-1 rounded-full border border-upnavy-200">
              Parent & Guardian Portal
            </span>
            <span className="text-[10px] font-black bg-upsaffron-100 text-upsaffron-900 px-2.5 py-0.5 rounded-full border border-upsaffron-300">
              Classes 6 to 10 Support
            </span>
            <span className="text-xs text-slate-500 font-medium">Low-Tech 2G SMS & Automated IVR</span>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-200">
              Zero Internet Needed
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-upnavy-950 tracking-tight">
            Kailash Verma (Guardian Portal)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Monitoring Enrolled Wards • Model Senior Secondary School Rampur • Academic Session 2026-27
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={handleStartIVRCall}
            disabled={isCalling}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-2xl transition active:scale-95 flex items-center gap-2 shadow-sm shadow-emerald-600/30"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{isCalling ? 'Call In Progress...' : 'Listen via Voice Call (IVR)'}</span>
          </button>

          <button
            onClick={handleShareWhatsApp}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition active:scale-95 flex items-center gap-1.5 border border-slate-200"
          >
            <Share2 className="w-4 h-4 text-emerald-600" />
            <span>{copyStatus ? 'Copied!' : 'Share on WhatsApp'}</span>
          </button>

          {onLogout && (
            <button
              onClick={onLogout}
              className="px-3.5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-2xl transition active:scale-95 flex items-center gap-1.5 border border-rose-200 cursor-pointer shadow-2xs"
              title={lang === 'hi' ? 'लॉगआउट करें' : 'Sign Out / Logout'}
            >
              <LogOut className="w-3.5 h-3.5 text-rose-600" />
              <span>{lang === 'hi' ? 'लॉगआउट' : 'Logout'}</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Enrolled Children / Grade Switcher Bar (Classes 6 to 10 Coverage) */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-upnavy-950 flex items-center gap-2">
              <School className="w-4 h-4 text-upsaffron-600" />
              <span>Select Child (Enrolled across Classes 6 to 10):</span>
              <span className="text-[10px] bg-upnavy-100 text-upnavy-900 font-bold px-2 py-0.5 rounded-full">
                {currentChild.grade} Active
              </span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Parents can monitor attendance, homework, and weekly SMS for all children studying in Classes 6 to 10
            </p>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Viewing: <strong className="text-upnavy-950">{currentChild.name} ({currentChild.grade})</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {ENROLLED_CHILDREN.map(child => {
            const isSelected = child.id === selectedChildId;
            return (
              <button
                key={child.id}
                onClick={() => {
                  setSelectedChildId(child.id);
                  showToast(`Switched report to ${child.name} (${child.grade})`);
                }}
                className={`p-3.5 rounded-2xl text-left border transition flex items-center justify-between ${
                  isSelected
                    ? 'bg-gradient-to-r from-upnavy-900 to-upnavy-950 text-white border-upnavy-900 shadow-sm ring-2 ring-upsaffron-500/80 scale-[1.01]'
                    : 'bg-slate-50 hover:bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs">{child.name}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-white text-upnavy-900 border border-slate-200'
                    }`}>
                      {child.grade}
                    </span>
                  </div>
                  <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {child.level} • Roll {child.roll}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-black ${isSelected ? 'text-upsaffron-300' : 'text-upnavy-950'}`}>
                    {child.overallScore}%
                  </div>
                  <div className="text-[9px] text-slate-400">Mastery</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Incoming IVR Voice Call Simulator Modal */}
      {isCalling && (
        <div className="p-5 bg-gradient-to-r from-emerald-900 via-upnavy-950 to-emerald-950 text-white rounded-3xl border border-emerald-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <PhoneCall className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm">GyanSetu School Automated Voice Call</h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30">
                  IVR Active
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {callActive ? `Speaking ${childFirstName}'s (${currentChild.grade}) academic progress in your chosen mother tongue...` : 'Connecting to village cell tower...'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleEndCall}
              className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-2xl transition flex items-center gap-1.5 shadow-md shadow-rose-600/30 active:scale-95"
            >
              <PhoneOff className="w-4 h-4" />
              <span>End Call</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Grid: Academic Progress Card + Feature Phone Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Student Academic Progress Report */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-upsaffron-50 text-upsaffron-700 border border-upsaffron-200 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5 text-upsaffron-600" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-upnavy-950">
                    Weekly Performance: {currentChild.name}
                  </h3>
                  <p className="text-xs text-slate-500">{currentChild.grade} • Model Senior Secondary School</p>
                </div>
              </div>
              <span className="text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full">
                Active Student
              </span>
            </div>

            {/* Attendance & Stats Highlights */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-0.5">
                <div className="text-lg font-black text-emerald-600">{currentChild.attendance}</div>
                <div className="text-[11px] text-slate-500 font-medium">Attendance</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-0.5">
                <div className="text-lg font-black text-upnavy-950">{currentChild.mathScore}</div>
                <div className="text-[11px] text-slate-500 font-medium">Math Score</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-0.5">
                <div className="text-lg font-black text-upsaffron-600">{currentChild.scienceScore}</div>
                <div className="text-[11px] text-slate-500 font-medium">Science Score</div>
              </div>
            </div>

            {/* Teacher Notes */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/90 space-y-2 text-xs">
              <div className="flex items-center justify-between text-amber-950 font-bold">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-upsaffron-600" />
                  <span>Teacher's Note (श्री आर.के. शर्मा):</span>
                </span>
                <span className="text-[10px] text-amber-700 font-medium">Yesterday</span>
              </div>
              <p className="text-slate-700 leading-relaxed text-[11px]">
                "{currentChild.teacherNote}"
              </p>
            </div>

            {/* Language Selector for Parents */}
            <div>
              <label className="block font-bold text-slate-700 mb-2 text-xs">
                {lang === 'hi' ? 'अपनी भाषा चुनें (Test SMS / Voice in Mother Tongue):' : 'Select Guardian Regional Language:'}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {supportedLanguages.map(l => (
                  <button
                    key={l.code}
                    onClick={() => setSelectedParentLang(l.code)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                      selectedParentLang === l.code
                        ? 'bg-upnavy-800 text-white shadow-2xs font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Callback Request */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <div className="text-xs text-slate-500">
              Need to talk to class teacher?
            </div>
            <button
              onClick={handleRequestTeacherCallback}
              disabled={teacherCallRequested}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                teacherCallRequested
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 active:scale-95'
              }`}
            >
              {teacherCallRequested ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Callback Requested ✓</span>
                </>
              ) : (
                <>
                  <PhoneCall className="w-3.5 h-3.5 text-upnavy-800" />
                  <span>Request Free Callback</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: 2G Feature Phone Simulator */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-[320px] bg-slate-950 rounded-[44px] p-5 shadow-2xl border-4 border-slate-800 relative">
            {/* Top Speaker & Camera Dot */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-12 h-1.5 bg-slate-800 rounded-full" />
              <div className="w-2 h-2 bg-slate-800 rounded-full" />
            </div>

            {/* Screen Bezel */}
            <div className="bg-slate-900 rounded-[28px] p-4 border border-slate-800 text-white space-y-4">
              {/* Phone Status Bar */}
              <div className="flex items-center justify-between text-[10px] text-slate-400 border-b border-slate-800/80 pb-2">
                <div className="flex items-center gap-1">
                  <Signal className="w-3 h-3 text-emerald-400" />
                  <span className="font-mono">BSNL 2G</span>
                </div>
                <div className="flex items-center gap-1 font-mono">
                  <span>11:45 AM</span>
                  <Battery className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>

              {/* SMS Inbox View */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-upsaffron-400" />
                    <span>Official School SMS</span>
                  </span>
                  <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-300">
                    2 New
                  </span>
                </div>

                {/* SMS Message 1 */}
                <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-upsaffron-400 font-bold">
                    <span className="flex items-center gap-1">
                      <School className="w-3 h-3" />
                      <span>GyanSetu-School</span>
                    </span>
                    <span className="text-slate-500 text-[10px]">Today</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-sans">
                    {getSms1()}
                  </p>
                  <div className="flex justify-end text-[10px] text-slate-400 items-center gap-1 pt-0.5">
                    <CheckCheck className="w-3 h-3 text-emerald-400" />
                    <span>Delivered (Free School SMS Gateway)</span>
                  </div>
                </div>

                {/* SMS Message 2 */}
                <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-amber-400 font-bold">
                    <span className="flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>Teacher Sharma Ji</span>
                    </span>
                    <span className="text-slate-500 text-[10px]">Yesterday</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {getSms2()}
                  </p>
                  <div className="flex justify-end text-[10px] text-slate-400 items-center gap-1 pt-0.5">
                    <CheckCheck className="w-3 h-3 text-emerald-400" />
                    <span>Delivered</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Phone Physical Keypad Aesthetic */}
            <div className="mt-4 pt-2 border-t border-slate-800/80 grid grid-cols-3 gap-2 px-3 text-center text-slate-400 font-mono text-[11px]">
              <div className="p-1 rounded-lg bg-slate-900 border border-slate-800">1</div>
              <div className="p-1 rounded-lg bg-slate-900 border border-slate-800">2 abc</div>
              <div className="p-1 rounded-lg bg-slate-900 border border-slate-800">3 def</div>
              <div className="p-1 rounded-lg bg-slate-900 border border-slate-800">4 ghi</div>
              <div className="p-1 rounded-lg bg-slate-900 border border-slate-800">5 jkl</div>
              <div className="p-1 rounded-lg bg-slate-900 border border-slate-800">6 mno</div>
              <div className="p-1 rounded-lg bg-slate-900 border border-slate-800">7 pqrs</div>
              <div className="p-1 rounded-lg bg-slate-900 border border-slate-800">8 tuv</div>
              <div className="p-1 rounded-lg bg-slate-900 border border-slate-800">9 wxyz</div>
              <div className="p-1 rounded-lg bg-slate-900 border border-slate-800">*</div>
              <div className="p-1 rounded-lg bg-slate-900 border border-slate-800">0 +</div>
              <div className="p-1 rounded-lg bg-slate-900 border border-slate-800">#</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
