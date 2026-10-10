import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  Phone, 
  PhoneCall, 
  MessageSquare, 
  Mail, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  AlertTriangle, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Volume2, 
  VolumeX, 
  Send, 
  FileText, 
  Clock, 
  ShieldCheck, 
  Copy, 
  Check, 
  RefreshCw,
  Sparkles,
  ExternalLink,
  LifeBuoy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { supportedLanguages } from '../data/mockData';

export function HelpSupportModal({ isOpen, onClose, lang = 'en' }) {
  if (!isOpen) return null;

  // Active sub-tab
  const [activeTab, setActiveTab] = useState('helpline'); // 'helpline' | 'faq' | 'diagnostic' | 'ticket'

  // FAQ state
  const [faqSearch, setFaqSearch] = useState('');
  const [faqCategory, setFaqCategory] = useState('all'); // 'all' | 'student' | 'teacher' | 'parent' | 'tech'
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Diagnostic state
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [diagnosticResults, setDiagnosticResults] = useState({
    tested: false,
    storage: true,
    mesh: true,
    audio: true,
    pwa: true,
    dataSaver: true
  });
  const [audioTesting, setAudioTesting] = useState(false);

  // Ticket form state
  const [ticketData, setTicketData] = useState({
    role: 'student',
    category: 'sync',
    name: '',
    phone: '',
    school: 'Govt Model Senior Secondary School Rampur',
    description: ''
  });
  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);

  // Copy status
  const [copiedKey, setCopiedKey] = useState(null);
  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Text-To-Speech IVR Audio guidance
  const [isSpeakingGuide, setIsSpeakingGuide] = useState(false);
  const handlePlayAudioHelp = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this device.');
      return;
    }

    if (isSpeakingGuide) {
      window.speechSynthesis.cancel();
      setIsSpeakingGuide(false);
      return;
    }

    window.speechSynthesis.cancel();

    let guideText = '';
    let voiceCode = 'en-IN';

    const langObj = supportedLanguages.find(l => l.code === lang) || { code: 'en', tts: 'en-IN' };
    voiceCode = langObj.tts || 'en-IN';

    switch (lang) {
      case 'hi':
        guideText = 'ज्ञानसेतु सहायता केंद्र में आपका स्वागत है। यदि आप बिना इंटरनेट के पढ़ना चाहते हैं, तो पाठ खोलकर डाउनलोड पर क्लिक करें। यदि आपको किसी प्रकार की समस्या है, तो टोल फ्री नंबर 1800 180 5321 पर कॉल करें।';
        break;
      case 'mr':
        guideText = 'ज्ञानसेतु मदत केंद्रात आपले स्वागत आहे. जर तुम्हाला इंटरनेटशिवाय अभ्यास करायचा असेल, तर धडा उघडून डाउनलोड वर क्लिक करा. अधिक मदतीसाठी टोल फ्री क्रमांक 1800 180 5321 वर संपर्क साधा.';
        break;
      case 'bn':
        guideText = 'জ্ঞানসেতু সহায়তা কেন্দ্রে স্বাগতম। আপনি যদি ইন্টারনেট ছাড়া পড়াশোনা করতে চান, তবে পাঠ্যটি খুলে ডাউনলোডে ক্লিক করুন। সহায়তার জন্য কল করুন 1800 180 5321 নম্বরে।';
        break;
      case 'te':
        guideText = 'జ్ఞానసేతు సహాయ కేంద్రానికి స్వాగతం. ఇంటర్నెట్ లేకుండా చదువుకోవడానికి డౌన్‌లోడ్ బటన్ క్లిక్ చేయండి. సహాయం కోసం 1800 180 5321 కు కాల్ చేయండి.';
        break;
      case 'ta':
        guideText = 'ஞானசேது உதவி மையத்திற்கு வரவேற்கிறோம். இணையம் இல்லாமல் படிக்க பாடத்தை திறந்து பதிவிறக்கம் செய்யவும். உதவிக்கு 1800 180 5321 எண்ணை அழைக்கவும்.';
        break;
      case 'gu':
        guideText = 'જ્ઞાનસેતુ સહાયતા કેન્દ્રમાં આપનું સ્વાગત છે. ઇન્ટરનેટ વિના અભ્યાસ કરવા માટે ડાઉનલોડ બટન દબાવો. વધુ માહિતી માટે 1800 180 5321 પર સંપર્ક કરો.';
        break;
      case 'kn':
        guideText = 'ಜ್ಞಾನಸೇತು ಸಹಾಯ ಕೇಂದ್ರಕ್ಕೆ ಸುಸ್ವಾಗತ. ಇಂಟರ್ನೆಟ್ ಇಲ್ಲದೆ ಕಲಿಯಲು ಡೌನ್‌ಲೋಡ್ ಕ್ಲಿಕ್ ಮಾಡಿ. ಸಹಾಯಕ್ಕಾಗಿ 1800 180 5321 ಗೆ ಕರೆ ಮಾಡಿ.';
        break;
      case 'pa':
        guideText = 'ਗਿਆਨਸੇਤੂ ਸਹਾਇਤਾ ਕੇਂਦਰ ਵਿੱਚ ਜੀ ਆਇਆਂ ਨੂੰ। ਬਿਨਾਂ ਇੰਟਰਨੈਟ ਪੜ੍ਹਨ ਲਈ ਡਾਊਨਲੋਡ ਬਟਨ ਦਬਾਓ। ਮਦਦ ਲਈ 1800 180 5321 ਤੇ ਕਾਲ ਕਰੋ।';
        break;
      case 'od':
        guideText = 'ଜ୍ଞାନସେତୁ ସହାୟତା କେନ୍ଦ୍ରକୁ ସ୍ୱାଗତ। ଇଣ୍ଟରନେଟ ବିନା ପଢିବା ପାଇଁ ପାଠକୁ ଡାଉନଲୋଡ କରନ୍ତୁ। ସହାୟତା ପାଇଁ 1800 180 5321 ରେ କଲ କରନ୍ତୁ।';
        break;
      default:
        guideText = 'Welcome to the GyanSetu Support Desk. To study without internet, open any chapter and tap Save Offline. For immediate government assistance, call our toll-free number 1800 180 5321.';
        break;
    }

    const utterance = new SpeechSynthesisUtterance(guideText);
    utterance.lang = voiceCode;
    utterance.rate = 0.95;

    utterance.onstart = () => setIsSpeakingGuide(true);
    utterance.onend = () => setIsSpeakingGuide(false);
    utterance.onerror = () => setIsSpeakingGuide(false);

    window.speechSynthesis.speak(utterance);
  };

  // Run self-diagnostic
  const handleRunDiagnostic = () => {
    setIsDiagnosing(true);
    setTimeout(() => {
      setIsDiagnosing(false);
      setDiagnosticResults({
        tested: true,
        storage: true,
        mesh: true,
        audio: true,
        pwa: true,
        dataSaver: true
      });
      try {
        confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
    }, 1200);
  };

  // Run audio sound test
  const handleTestAudioSound = () => {
    setAudioTesting(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance('GyanSetu audio output is functioning with zero errors.');
      utterance.onend = () => setAudioTesting(false);
      utterance.onerror = () => setAudioTesting(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setAudioTesting(false), 1000);
    }
  };

  // Submit Support Ticket
  const handleSubmitTicket = (e) => {
    e.preventDefault();
    if (!ticketData.name || !ticketData.phone || !ticketData.description) {
      alert('Please fill all required fields to register your support ticket.');
      return;
    }

    setIsSubmittingTicket(true);
    setTimeout(() => {
      setIsSubmittingTicket(false);
      const ticketId = 'GRV-UP-2026-' + Math.floor(1000 + Math.random() * 9000);
      setSubmittedTicket({
        id: ticketId,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        category: ticketData.category,
        name: ticketData.name,
        phone: ticketData.phone,
        status: 'Logged & Dispatched to Block Resource Coordinator (BRC)'
      });
      try {
        confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    }, 900);
  };

  // FAQ List
  const faqs = [
    {
      q: 'How do I study and practice quizzes when there is completely NO internet?',
      a: 'GyanSetu is an offline-first PWA. Open any chapter while connected to the school Wi-Fi mesh (or cellular) and tap "Save Offline". The lesson text, formulas, diagrams, and quiz questions are stored directly on your phone or tablet. You can solve quizzes and receive instant automated feedback with zero mobile data.',
      category: 'student'
    },
    {
      q: 'How does AI Saathi tutor work without high-speed data or cloud connectivity?',
      a: 'AI Saathi utilizes a lightweight, compressed rule engine and cached bilingual question bank. When you are offline, it provides pre-indexed step-by-step hints and reads explanations aloud using the native Text-to-Speech synthesis built into your browser, requiring 0 KB of server bandwidth.',
      category: 'student'
    },
    {
      q: 'How does the School Wi-Fi Mesh node work? Does it charge mobile balance?',
      a: 'No! The school uses a local Raspberry Pi 5 Edge server broadcasting the Wi-Fi network named "GyanSetu-School-Mesh". It is a local intranet with a 150-meter courtyard range. Connecting to it does not require internet, SIM cards, or data recharges.',
      category: 'tech'
    },
    {
      q: 'How do teachers mark attendance and push offline quiz grades to the government portal?',
      a: 'In the Teacher Dashboard, tap the P/A button next to each student to mark attendance. When near the school edge server or when an internet link is detected, tap "Sync All with Portal". All student attendance records and offline quiz scores are securely reconciled with the district database.',
      category: 'teacher'
    },
    {
      q: 'I am a parent with a basic button feature phone. How do I get school updates?',
      a: 'GyanSetu integrates a 2G SMS and automated IVR voice calling service. When your child completes a weekly milestone or unit test, our automated BSNL gateway sends a free SMS in your chosen regional language. You can also receive an automated telephone call that reads out your child\'s grades.',
      category: 'parent'
    },
    {
      q: 'How do teachers generate printable remedial worksheets for struggling students?',
      a: 'Go to Teacher Dashboard -> "Remedial Worksheet Generator". Select any subject (Mathematics, Science, English, etc.) and difficulty level. The system automatically creates a structured remedial practice sheet with answer keys. You can print it directly or send it to student tablets via local mesh.',
      category: 'teacher'
    },
    {
      q: 'How can I change the website language to my mother tongue?',
      a: 'Click on the globe/flag icon in the top navigation bar. GyanSetu provides instant translations and localized voice read-outs for 10 regional languages: Hindi, Marathi, Bengali, Telugu, Tamil, Gujarati, Kannada, Punjabi, Odia, and English.',
      category: 'student'
    },
    {
      q: 'What happens to student quiz scores if the tablet battery runs out before syncing?',
      a: 'All student activity is recorded instantaneously in the browser\'s non-volatile IndexedDB storage. Even if the tablet shuts down unexpectedly or reboots, no answers or points are lost. As soon as the device reconnects to the school mesh, scores are queued for auto-sync.',
      category: 'tech'
    },
    {
      q: 'What is the U-DISE+ compliance certificate in the Admin Dashboard?',
      a: 'U-DISE+ is the official Unified District Information System for Education mandated by the Ministry of Education, Govt. of India. The Admin dashboard automatically calculates gender parity, socio-demographic ratios, Mid-Day Meal distribution, and attendance, allowing the Headmistress to generate an attested PDF for the District Education Officer (DEO).',
      category: 'teacher'
    },
    {
      q: 'How do I edit my student name, roll number, or school name?',
      a: 'Click on your profile avatar in the top-right corner of the navigation bar and select "Edit Profile Details". You can update your display name, roll number, class grade, and school information at any time.',
      category: 'student'
    }
  ];

  const filteredFaqs = faqs.filter(f => {
    const matchesCat = faqCategory === 'all' || f.category === faqCategory;
    const matchesSearch = f.q.toLowerCase().includes(faqSearch.toLowerCase()) || 
                          f.a.toLowerCase().includes(faqSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-4 sm:p-7 shadow-2xl border border-slate-200/90 max-h-[92vh] overflow-y-auto relative flex flex-col">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-upnavy-950 text-white flex items-center justify-center font-bold text-lg sm:text-xl shadow-xs shrink-0">
              <LifeBuoy className="w-5 h-5 sm:w-6 sm:h-6 text-upsaffron-400 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-upsaffron-700 bg-upsaffron-50 px-2 py-0.5 rounded-full border border-upsaffron-200">
                  National EdTech Help Desk
                </span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  24x7 Rural Support
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-upnavy-950 tracking-tight mt-0.5">
                GyanSetu Help & Support Desk (सहायता केंद्र)
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Samagra Shiksha • Department of Basic Education, Govt. of Uttar Pradesh
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-nav Navigation Tabs (Grid on mobile, flex on desktop) */}
        <div className="bg-slate-100 p-1.5 rounded-2xl grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5 border border-slate-200/80 my-4 sm:my-5">
          <button
            onClick={() => setActiveTab('helpline')}
            className={`py-2 px-2.5 sm:px-3 sm:flex-1 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 sm:gap-2 ${
              activeTab === 'helpline'
                ? 'bg-upnavy-950 text-white shadow-xs'
                : 'text-slate-600 hover:text-upnavy-950 hover:bg-white/70'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5 text-upsaffron-400 shrink-0" />
            <span className="truncate">Toll-Free Helpline</span>
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className={`py-2 px-2.5 sm:px-3 sm:flex-1 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 sm:gap-2 ${
              activeTab === 'faq'
                ? 'bg-upnavy-950 text-white shadow-xs'
                : 'text-slate-600 hover:text-upnavy-950 hover:bg-white/70'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">FAQs & Guides</span>
          </button>

          <button
            onClick={() => setActiveTab('diagnostic')}
            className={`py-2 px-2.5 sm:px-3 sm:flex-1 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 sm:gap-2 ${
              activeTab === 'diagnostic'
                ? 'bg-upnavy-950 text-white shadow-xs'
                : 'text-slate-600 hover:text-upnavy-950 hover:bg-white/70'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Troubleshooter</span>
          </button>

          <button
            onClick={() => setActiveTab('ticket')}
            className={`py-2 px-2.5 sm:px-3 sm:flex-1 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 sm:gap-2 ${
              activeTab === 'ticket'
                ? 'bg-upnavy-950 text-white shadow-xs'
                : 'text-slate-600 hover:text-upnavy-950 hover:bg-white/70'
            }`}
          >
            <FileText className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Grievance Ticket</span>
          </button>
        </div>

        {/* Tab 1: Helpline & Direct Rural Contact */}
        {activeTab === 'helpline' && (
          <div className="space-y-6 animate-fadeIn text-xs">
            {/* Quick Audio Guidance Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-upnavy-950 via-upnavy-900 to-upnavy-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-upsaffron-600/30 border border-upsaffron-500/40 text-upsaffron-400 flex items-center justify-center shrink-0">
                  <Volume2 className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Spoken Audio Guidance (आवाज़ में सहायता)</h4>
                  <p className="text-[11px] text-slate-300">
                    Listen to spoken troubleshooting instructions in your selected regional language.
                  </p>
                </div>
              </div>

              <button
                onClick={handlePlayAudioHelp}
                className="px-4 py-2 bg-upsaffron-600 hover:bg-upsaffron-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition active:scale-95 shadow-xs shadow-upsaffron-600/30 shrink-0"
              >
                {isSpeakingGuide ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isSpeakingGuide ? 'Stop Audio' : 'Listen to Spoken Guide'}</span>
              </button>
            </div>

            {/* Helpline Channel Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Channel 1: Toll-Free Hotline */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-upnavy-400 transition space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                    Free Call • No Mobile Balance Needed
                  </span>
                  <Phone className="w-4 h-4 text-emerald-600" />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-upnavy-950">Samagra Shiksha Central Toll-Free</h4>
                  <div className="text-xl font-black font-mono text-upnavy-950 mt-1">
                    1800-180-5321
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Available Monday to Saturday, 8:00 AM – 7:00 PM. Provides assistance in Hindi, Awadhi, Bhojpuri, and English.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                  <a
                    href="tel:18001805321"
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95 text-center"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call Toll-Free Now</span>
                  </a>

                  <button
                    onClick={() => handleCopy('18001805321', 'tollfree')}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center gap-1"
                  >
                    {copiedKey === 'tollfree' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'tollfree' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Channel 2: WhatsApp & 2G SMS Helpline */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:border-upsaffron-400 transition space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-upsaffron-800 bg-upsaffron-100 px-2.5 py-0.5 rounded-full border border-upsaffron-300">
                    BSNL 2G SMS / WhatsApp
                  </span>
                  <MessageSquare className="w-4 h-4 text-upsaffron-600" />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-upnavy-950">Offline SMS & WhatsApp Help Desk</h4>
                  <div className="text-xl font-black font-mono text-upnavy-950 mt-1">
                    +91 94120 54321
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Send a normal SMS with keyword <code className="bg-slate-100 px-1 py-0.5 rounded font-bold text-upnavy-900">HELP</code> for automated offline guidance, or text via WhatsApp.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => {
                      alert('Redirecting to WhatsApp chat with GyanSetu Rural Nodal Desk (+91 94120 54321)...');
                    }}
                    className="flex-1 py-2 bg-upsaffron-600 hover:bg-upsaffron-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp / SMS Help</span>
                  </button>

                  <button
                    onClick={() => handleCopy('+919412054321', 'smsnum')}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition flex items-center gap-1"
                  >
                    {copiedKey === 'smsnum' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'smsnum' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Local District & Block Contacts */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <h4 className="font-bold text-upnavy-950 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-upnavy-800" />
                <span>Cluster & Village Level Nodal Officers (Rampur District)</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <div className="font-bold text-upnavy-950">Shri Ramakant Tiwari</div>
                  <div className="text-[11px] text-slate-500">Block Resource Coordinator (BRC Bilaspur)</div>
                  <div className="text-[11px] font-mono text-slate-700">📞 +91 98371 29401 • Room 14, Block Office</div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                  <div className="font-bold text-upnavy-950">Dr. Anita Deshmukh</div>
                  <div className="text-[11px] text-slate-500">School Headmistress & Digital Nodal</div>
                  <div className="text-[11px] font-mono text-slate-700">🏛️ Govt Model Sr Sec School Rampur • Room 101</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: FAQs & User Guides */}
        {activeTab === 'faq' && (
          <div className="space-y-4 animate-fadeIn text-xs">
            {/* Search Bar & Categories */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  placeholder="Search questions (e.g. offline, sync)..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1">
                {[
                  { id: 'all', label: 'All FAQs' },
                  { id: 'student', label: 'Students' },
                  { id: 'teacher', label: 'Teachers' },
                  { id: 'parent', label: 'Parents' },
                  { id: 'tech', label: 'Offline Mesh' },
                ].map(c => (
                  <button
                    key={c.id}
                    onClick={() => setFaqCategory(c.id)}
                    className={`px-3 py-1 rounded-lg font-bold text-[11px] whitespace-nowrap transition ${
                      faqCategory === c.id
                        ? 'bg-upnavy-950 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Accordion List */}
            <div className="space-y-2.5">
              {filteredFaqs.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500">
                  No matching questions found for "{faqSearch}". Try searching "offline" or "sync".
                </div>
              ) : (
                filteredFaqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-2xl overflow-hidden transition bg-white hover:border-slate-300"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                        className="w-full p-4 text-left font-bold text-xs sm:text-sm text-upnavy-950 flex items-center justify-between gap-3 bg-white"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-upnavy-100 text-upnavy-800 text-[10px] font-black flex items-center justify-center shrink-0">
                            Q
                          </span>
                          <span>{faq.q}</span>
                        </span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-xs text-slate-600 border-t border-slate-100 bg-slate-50/60 leading-relaxed">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Self-Troubleshooter */}
        {activeTab === 'diagnostic' && (
          <div className="space-y-5 animate-fadeIn text-xs">
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <h4 className="text-sm font-bold text-upnavy-950">
                    Offline Device Diagnostic & Compatibility Checker
                  </h4>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Tests local storage cache, offline Wi-Fi mesh signal, audio synthesis, and battery mode.
                  </p>
                </div>

                <button
                  onClick={handleRunDiagnostic}
                  disabled={isDiagnosing}
                  className="px-4 py-2 bg-upnavy-950 hover:bg-upnavy-900 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition active:scale-95 disabled:opacity-50 shadow-xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isDiagnosing ? 'animate-spin' : ''}`} />
                  <span>{isDiagnosing ? 'Testing System...' : 'Run Diagnostics Now'}</span>
                </button>
              </div>

              {/* Diagnostic Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Check 1 */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <HardDrive className="w-4 h-4 text-upnavy-800" />
                    <div>
                      <div className="font-bold text-upnavy-950">IndexedDB Offline Storage</div>
                      <div className="text-[10px] text-slate-400">4.2 GB space allocated for cached lessons</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" /> Ready
                  </span>
                </div>

                {/* Check 2 */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Wifi className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="font-bold text-upnavy-950">Local Edge Wi-Fi Mesh</div>
                      <div className="text-[10px] text-slate-400">Connected to GyanSetu-School-Mesh (12ms)</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" /> Connected
                  </span>
                </div>

                {/* Check 3 */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Volume2 className="w-4 h-4 text-upsaffron-600" />
                    <div>
                      <div className="font-bold text-upnavy-950">Web Speech Regional Audio</div>
                      <div className="text-[10px] text-slate-400">Native browser TTS synthesizer verified</div>
                    </div>
                  </div>
                  <button
                    onClick={handleTestAudioSound}
                    disabled={audioTesting}
                    className="text-[10px] font-bold text-upsaffron-800 bg-upsaffron-100 hover:bg-upsaffron-200 px-2 py-0.5 rounded-full flex items-center gap-1 transition"
                  >
                    <span>{audioTesting ? 'Testing...' : 'Test Sound'}</span>
                  </button>
                </div>

                {/* Check 4 */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-sky-600" />
                    <div>
                      <div className="font-bold text-upnavy-950">Progressive Web App (PWA)</div>
                      <div className="text-[10px] text-slate-400">Offline service worker installed & active</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" /> Active
                  </span>
                </div>
              </div>

              {/* Status summary */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  <strong>All Systems Operational:</strong> Your device is 100% ready for offline learning, audio lessons, and local Wi-Fi mesh synchronization.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Register Support Grievance */}
        {activeTab === 'ticket' && (
          <div className="space-y-5 animate-fadeIn text-xs">
            {submittedTicket ? (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                    Grievance Registered Successfully
                  </span>
                  <h4 className="text-lg font-black text-upnavy-950 mt-2">
                    Ticket Reference ID: <span className="font-mono text-upsaffron-700">{submittedTicket.id}</span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                    Your request has been dispatched to the Block Resource Coordinator (BRC Bilaspur) and school technical nodal officer.
                  </p>
                </div>

                <div className="max-w-md mx-auto p-4 bg-white rounded-xl border border-slate-200 text-left space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Applicant:</span>
                    <span className="font-bold text-upnavy-950">{submittedTicket.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Mobile Number:</span>
                    <span className="font-mono font-bold text-upnavy-950">{submittedTicket.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Current Status:</span>
                    <span className="font-bold text-emerald-700">Assigned for 24h Review</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSubmittedTicket(null);
                    setTicketData({
                      role: 'student',
                      category: 'sync',
                      name: '',
                      phone: '',
                      school: 'Govt Model Senior Secondary School Rampur',
                      description: ''
                    });
                  }}
                  className="px-5 py-2.5 bg-upnavy-950 hover:bg-upnavy-900 text-white font-bold text-xs rounded-xl transition"
                >
                  File Another Ticket
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitTicket} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h4 className="text-sm font-bold text-upnavy-950">
                    Register a Support Issue or Grievance (शिकायत पंजीकरण)
                  </h4>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Submit issues regarding offline synchronization, hardware defects, missing subject content, or account login.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Role / Portal View *</label>
                    <select
                      value={ticketData.role}
                      onChange={(e) => setTicketData({ ...ticketData, role: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-upnavy-600"
                    >
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="parent">Parent</option>
                      <option value="admin">School Administrator</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Issue Category *</label>
                    <select
                      value={ticketData.category}
                      onChange={(e) => setTicketData({ ...ticketData, category: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-upnavy-600"
                    >
                      <option value="sync">Offline Sync / Data Storage Problem</option>
                      <option value="tablet">Tablet Hardware / Battery Charging</option>
                      <option value="audio">Audio / Regional Language Playback</option>
                      <option value="content">Syllabus / Quiz Questions Discrepancy</option>
                      <option value="login">Account Login / Password Recovery</option>
                      <option value="other">Other School Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rohan Sharma / Dr. Anita Deshmukh"
                      value={ticketData.name}
                      onChange={(e) => setTicketData({ ...ticketData, name: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-upnavy-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Contact Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={ticketData.phone}
                      onChange={(e) => setTicketData({ ...ticketData, phone: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-upnavy-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">School Name / District *</label>
                  <input
                    type="text"
                    required
                    value={ticketData.school}
                    onChange={(e) => setTicketData({ ...ticketData, school: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-upnavy-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Describe the Issue in Detail *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Provide specific details (e.g. tablet TAB-RMP-05 not picking up school Wi-Fi mesh, or chapter 4 audio not loading in Marathi)..."
                    value={ticketData.description}
                    onChange={(e) => setTicketData({ ...ticketData, description: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-upnavy-600"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmittingTicket}
                    className="px-5 py-2.5 bg-upsaffron-600 hover:bg-upsaffron-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition active:scale-95 disabled:opacity-50 shadow-xs shadow-upsaffron-600/30"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmittingTicket ? 'Submitting...' : 'Register Support Ticket'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Footer info line */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <span>Official Helpline: <strong>1800-180-5321</strong> (Toll Free)</span>
          <span>Dept. of Basic Education, Government of Uttar Pradesh</span>
        </div>
      </div>
    </div>
  );
}
