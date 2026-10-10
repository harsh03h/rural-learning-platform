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
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { translations, supportedLanguages } from '../data/mockData';

export function ParentView({ lang }) {
  const t = translations[lang] || translations['en'];
  const [selectedParentLang, setSelectedParentLang] = useState(lang || 'hi');
  const [isCalling, setIsCalling] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const [teacherCallRequested, setTeacherCallRequested] = useState(false);
  const [copyStatus, setCopyStatus] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState(null);

  const showToast = (msg) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  const getSms1 = (l = selectedParentLang) => {
    switch (l) {
      case 'mr':
        return 'प्रिय पालक, तुमच्या मुलाने रोहनने आज गणितात 80% गुण मिळवले. त्याने अपूर्णांकांचा (Fractions) पाठ पूर्ण केला. अभिनंदन!';
      case 'bn':
        return 'প্রিয় অভিভাবক, আপনার সন্তান রোহন আজ গণিতে ৮০% নম্বর পেয়েছে। সে ভগ্নাংশের (Fractions) পাঠ সম্পন্ন করেছে। সাবাশ!';
      case 'te':
        return 'ప్రియమైన తల్లిదండ్రులకు, మీ అబ్బాయి రోహన్ ఈరోజు గణితంలో 80% మార్కులు సాధించాడు. అతను భిన్నాల (Fractions) పాఠాన్ని పూర్తి చేశాడు!';
      case 'ta':
        return 'அன்புள்ள பெற்றோரே, உங்கள் மகன் ரோஹன் இன்று கணிதத்தில் 80% மதிப்பெண்கள் பெற்றுள்ளார். பின்னங்கள் (Fractions) பாடத்தை வெற்றிகரமாக முடித்துள்ளார்!';
      case 'gu':
        return 'પ્રિય વાલી, આપના પુત્ર રોહને આજે ગણિતમાં 80% ગુણ મેળવ્યા છે. તેણે અપૂર્ણાંકનો (Fractions) પાઠ પૂર્ણ કર્યો છે. ખૂબ સરસ!';
      case 'kn':
        return 'ಆತ್ಮೀಯ ಪೋಷಕರೇ, ನಿಮ್ಮ ಮಗ ರೋಹನ್ ಇಂದು ಗಣಿತದಲ್ಲಿ 80% ಅಂಕಗಳನ್ನು ಗಳಿಸಿದ್ದಾನೆ. ಭಿನ್ನರಾಶಿಗಳ (Fractions) ಪಾಠವನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದ್ದಾನೆ!';
      case 'pa':
        return 'ਪਿਆਰੇ ਮਾਪਿਓ, ਤੁਹਾਡੇ ਬੇਟੇ ਰੋਹਨ ਨੇ ਅੱਜ ਗਣਿਤ ਵਿੱਚ 80% ਅੰਕ ਪ੍ਰਾਪਤ ਕੀਤੇ। ਉਸਨੇ ਭਿੰਨਾਂ (Fractions) ਦਾ ਪਾਠ ਪੂਰਾ ਕਰ ਲਿਆ ਹੈ। ਸ਼ਾਬਾਸ਼!';
      case 'od':
        return 'ପ୍ରିୟ ଅଭିଭାବକ, ଆପଣଙ୍କ ପୁଅ ରୋହନ ଆଜି ଗଣିତରେ ୮୦% ନମ୍ବର ପାଇଛି। ସେ ଭଗ୍ନାଂଶ (Fractions) ପାଠ ସମ୍ପୂର୍ଣ୍ଣ କରିଛି!';
      case 'hi':
        return 'प्रिय अभिभावक, आपके पुत्र रोहन ने आज गणित में 80% अंक प्राप्त किए। उन्होंने भिन्न (Fractions) का पाठ पूरा किया। शाबाश!';
      default:
        return 'Dear Parent, your child Rohan scored 80% in Math today after completing the Fractions module. Keep up the encouragement!';
    }
  };

  const getSms2 = (l = selectedParentLang) => {
    switch (l) {
      case 'mr':
        return 'नमस्ते. रोहनला टक्केवारीमध्ये (Percentages) थोडा सराव हवा आहे. शाळेने त्याच्या टॅबलेटवर ऑफलाइन सराव चाचणी सेव्ह केली आहे.';
      case 'bn':
        return 'নমস্কার। রোহনের শতকরা (Percentages) অধ্যায়ে সামান্য অতিরিক্ত অনুশীলনের প্রয়োজন। অফলাইনে অনুশীলনের জন্য কুইজ ডিভাইসে সংরক্ষিত হয়েছে।';
      case 'te':
        return 'నమస్కారం. రోహన్‌కు శాతాలు (Percentages) అంశంలో అదనపు సాధన అవసరం. ఆఫ్‌లైన్ క్విజ్ డివైజ్‌లో సేవ్ చేయబడింది.';
      case 'ta':
        return 'வணக்கம். ரோஹனுக்கு சதவீதம் (Percentages) பாடத்தில் கூடுதல் பயிற்சி தேவைப்படுகிறது. ஆஃப்லைன் வினாடி வினா சாதனத்தில் சேமிக்கப்பட்டுள்ளது.';
      case 'gu':
        return 'નમસ્તે. રોહનને ટકાવારીમાં (Percentages) થોડી વધુ પ્રેક્ટિસની જરૂર છે. શાળાએ ડિવાઇસમાં ઑફલાઇન ક્વિઝ સેવ કરી આપી છે.';
      case 'kn':
        return 'ನಮಸ್ಕಾರ. ರೋಹನ್‌ಗೆ ಶೇಕಡಾವಾರು (Percentages) ವಿಷಯದಲ್ಲಿ ಹೆಚ್ಚಿನ ಅಭ್ಯಾಸ ಬೇಕಿದೆ. ಆಫ್‌ಲೈನ್ ರಸಪ್ರಶ್ನೆ ಸಾಧನದಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ.';
      case 'pa':
        return 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ। ਰੋਹਨ ਨੂੰ ਪ੍ਰਤੀਸ਼ਤ (Percentages) ਵਿੱਚ ਕੁਝ ਹੋਰ ਅਭਿਆਸ ਦੀ ਲੋੜ ਹੈ। ਸਕੂਲ ਨੇ ਆਫਲਾਈਨ ਕਵਿਜ਼ ਡਿਵਾਈਸ ਵਿੱਚ ਸੇਵ ਕਰ ਦਿੱਤੀ ਹੈ।';
      case 'od':
        return 'ନମସ୍କାର। ରୋହନକୁ ଶତକଡ଼ା (Percentages) ପାଠରେ କିଛି ଅଧିକ ଅଭ୍ୟାସ ଦରକାର। ଡିଭାଇସ୍‌ରେ ଅଫଲାଇନ୍ କ୍ୱିଜ୍ ସେଭ୍ କରାଯାଇଛି।';
      case 'hi':
        return 'नमस्ते। रोहन को प्रतिशत (Percentages) में थोड़ी कठिनाई आ रही है। स्कूल ने उनके फोन/टैबलेट में ऑफ़लाइन अभ्यास क्विज़ सेव कर दिया है।';
      default:
        return 'Greetings. Rohan requires extra practice with Percentages. School has cached remedial offline quizzes onto their shared device.';
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
    setIsCalling(false);
    setCallActive(false);
    showToast('IVR Voice Call completed.');
  };

  const handleRequestTeacherCall = () => {
    setTeacherCallRequested(true);
    try {
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.3 } });
    } catch (e) {}
    showToast('📞 Call request sent to Class Teacher Mr. Sharma! Expected call today at 4:30 PM.');
  };

  const handleShareWhatsApp = () => {
    const text = `*GyanSetu Student Report Card*\nStudent: Rohan Verma (Class 7A)\nAttendance: 94%\nMath Score: 80% (Fractions Completed)\nScience Score: 88%\nTeacher Note: Good progress! Remedial quiz cached for offline study.`;
    navigator.clipboard.writeText(text);
    setCopyStatus(true);
    showToast('Report card copied! Ready to paste into WhatsApp / SMS.');
    setTimeout(() => setCopyStatus(false), 2500);
  };

  return (
    <div className="space-y-6 pb-28 max-w-5xl mx-auto animate-fadeIn">
      {/* Toast Notification */}
      {feedbackToast && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 bg-upnavy-950/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl border border-upnavy-700 text-xs flex items-center gap-2 animate-fadeIn">
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
            <span className="text-xs text-slate-500 font-medium">Low-Tech 2G SMS & Automated IVR</span>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-200">
              Zero Internet Needed
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-upnavy-950 tracking-tight">
            Kailash Verma (Rohan's Guardian)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Linked Student: Rohan Verma • Class 7A • Govt Upper Primary School Rampur
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
                {callActive ? 'Speaking Rohan\'s academic progress in your chosen mother tongue...' : 'Connecting to village cell tower...'}
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

      {/* 2. Grid: Academic Progress Card + Feature Phone Simulator */}
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
                  <h3 className="font-bold text-base text-upnavy-950">Weekly Performance Report</h3>
                  <p className="text-xs text-slate-500">Class 7A • Govt Upper Primary School</p>
                </div>
              </div>
              <span className="text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full">
                Active Student
              </span>
            </div>

            {/* Attendance & Stats Highlights */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-0.5">
                <div className="text-lg font-black text-emerald-600">94%</div>
                <div className="text-[11px] text-slate-500 font-medium">Attendance</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-0.5">
                <div className="text-lg font-black text-upnavy-950">80%</div>
                <div className="text-[11px] text-slate-500 font-medium">Math Score</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-center space-y-0.5">
                <div className="text-lg font-black text-upsaffron-600">88%</div>
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
                "रोहन पढ़ाई में बहुत ध्यान दे रहे हैं। गणित में भिन्न (Fractions) बहुत अच्छा किया है। प्रतिशत (Percentages) में थोड़ी मदद चाहिए, जिसके लिए स्कूल टैबलेट में ऑफ़लाइन अभ्यास सुरक्षित कर दिया गया है।"
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
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition ${
                      selectedParentLang === l.code
                        ? 'bg-upnavy-800 text-white font-bold shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {l.flag} {l.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Direct Teacher Helpline */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <div className="text-xs text-slate-500">
              Have doubts about Rohan's progress?
            </div>
            <button
              onClick={handleRequestTeacherCall}
              disabled={teacherCallRequested}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                teacherCallRequested
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-upnavy-800 hover:bg-upsaffron-600 text-white shadow-2xs active:scale-95'
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{teacherCallRequested ? 'Call Requested ✓' : 'Request Teacher Call'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: 2G Feature Phone Simulator */}
        <div className="bg-slate-900 text-white rounded-[40px] p-6 sm:p-7 shadow-2xl border-4 border-slate-700 flex flex-col justify-between max-w-sm mx-auto w-full">
          {/* Phone Earpiece */}
          <div>
            <div className="flex justify-center items-center gap-2 mb-3">
              <div className="w-14 h-1.5 bg-slate-800 rounded-full" />
              <div className="w-2.5 h-2.5 bg-slate-800 rounded-full" />
            </div>

            {/* Feature Phone Screen */}
            <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-3.5 shadow-inner">
              <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-slate-800/80 pb-2">
                <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                  <Radio className="w-3.5 h-3.5" />
                  <span>BSNL 2G (Village Hub)</span>
                </span>
                <span className="font-mono">10:30 AM</span>
              </div>

              <div className="space-y-3 py-1">
                {/* SMS Message 1 */}
                <div className="bg-slate-900 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-emerald-400 font-bold">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      <span>GyanSetu-School</span>
                    </span>
                    <span className="text-slate-500 text-[10px]">Today</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-sans">
                    {getSms1()}
                  </p>
                  <div className="flex justify-end text-[10px] text-slate-400 items-center gap-1 pt-0.5">
                    <CheckCheck className="w-3 h-3 text-emerald-400" />
                    <span>Delivered (Free Govt SMS)</span>
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
                  <p className="text-xs text-slate-200 leading-relaxed font-sans">
                    {getSms2()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Keypad Simulation */}
          <div className="pt-4 px-2 space-y-2">
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold text-slate-400">
              <div className="bg-slate-800 py-1.5 rounded-xl border border-slate-700">1</div>
              <div className="bg-slate-800 py-1.5 rounded-xl border border-slate-700">2 <span className="text-[8px] block opacity-50">ABC</span></div>
              <div className="bg-slate-800 py-1.5 rounded-xl border border-slate-700">3 <span className="text-[8px] block opacity-50">DEF</span></div>
              <div className="bg-slate-800 py-1.5 rounded-xl border border-slate-700">4 <span className="text-[8px] block opacity-50">GHI</span></div>
              <div className="bg-slate-800 py-1.5 rounded-xl border border-slate-700">5 <span className="text-[8px] block opacity-50">JKL</span></div>
              <div className="bg-slate-800 py-1.5 rounded-xl border border-slate-700">6 <span className="text-[8px] block opacity-50">MNO</span></div>
              <div className="bg-slate-800 py-1.5 rounded-xl border border-slate-700">7 <span className="text-[8px] block opacity-50">PQRS</span></div>
              <div className="bg-slate-800 py-1.5 rounded-xl border border-slate-700">8 <span className="text-[8px] block opacity-50">TUV</span></div>
              <div className="bg-slate-800 py-1.5 rounded-xl border border-slate-700">9 <span className="text-[8px] block opacity-50">WXYZ</span></div>
              <div className="bg-slate-800 py-1.5 rounded-xl border border-slate-700">*</div>
              <div className="bg-slate-800 py-1.5 rounded-xl border border-slate-700">0</div>
              <div className="bg-slate-800 py-1.5 rounded-xl border border-slate-700">#</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
