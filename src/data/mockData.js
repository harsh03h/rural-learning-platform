// GyanSetu - Rural Digital Learning Platform Mock Data & Multi-language strings

export const supportedLanguages = [
  { code: 'hi', name: 'हिन्दी', englishName: 'Hindi', flag: '🇮🇳', tts: 'hi-IN' },
  { code: 'en', name: 'English', englishName: 'English', flag: '🇬🇧', tts: 'en-IN' },
  { code: 'mr', name: 'मराठी', englishName: 'Marathi', flag: '🇮🇳', tts: 'mr-IN' },
  { code: 'bn', name: 'বাংলা', englishName: 'Bengali', flag: '🇮🇳', tts: 'bn-IN' },
  { code: 'te', name: 'తెలుగు', englishName: 'Telugu', flag: '🇮🇳', tts: 'te-IN' },
  { code: 'ta', name: 'தமிழ்', englishName: 'Tamil', flag: '🇮🇳', tts: 'ta-IN' },
  { code: 'gu', name: 'ગુજરાતી', englishName: 'Gujarati', flag: '🇮🇳', tts: 'gu-IN' },
  { code: 'kn', name: 'ಕನ್ನಡ', englishName: 'Kannada', flag: '🇮🇳', tts: 'kn-IN' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', englishName: 'Punjabi', flag: '🇮🇳', tts: 'pa-IN' },
  { code: 'od', name: 'ଓଡ଼ିଆ', englishName: 'Odia', flag: '🇮🇳', tts: 'or-IN' }
];

export const getLocalized = (obj, lang) => {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj['hi'] || obj['en'] || Object.values(obj)[0] || '';
};

export const translations = {
  en: {
    appName: "GyanSetu",
    tagline: "Rural-First Digital Education Platform",
    online: "Online",
    offline: "Offline Mode",
    lowDataOn: "Low Data Mode ON",
    lowDataOff: "Low Data Mode OFF",
    dataSaved: "Bandwidth Saved",
    switchRole: "Role",
    studentRole: "Student (Rohan)",
    teacherRole: "Teacher (Mr. Sharma)",
    parentRole: "Parent Portal (SMS View)",
    diagnosticTitle: "Diagnostic Assessment",
    diagnosticDesc: "Identify your strengths and weak topics to unlock a personalized study path.",
    startDiagnostic: "Start Diagnostic Test",
    recommendedTitle: "AI Personalized Learning Path",
    basedOnDiagnostic: "Based on your latest diagnostic assessment & quiz performance",
    weakTopicsIdentified: "Weak Topics Identified",
    courses: "Subjects & Courses",
    allSubjects: "All Subjects",
    math: "Mathematics",
    science: "Science",
    english: "English",
    hindi: "Hindi",
    lessons: "Lessons",
    practiceQuiz: "Practice Quiz",
    downloadForOffline: "Download for Offline",
    downloaded: "Saved Offline",
    readAloud: "Listen (Audio)",
    stopAudio: "Stop Audio",
    aiSaathi: "AI Doubt Saathi",
    askDoubt: "Ask any academic doubt in simple language...",
    teacherDashboard: "Teacher Analytics Dashboard",
    totalStudents: "Total Students",
    classAverage: "Class Average Score",
    offlineSyncPending: "Offline Sync Queue",
    studentsNeedingHelp: "Students Needing Attention",
    classWeakAreas: "Class-wide Weak Topics",
    aiQuestionGen: "AI Question Generator",
    generateQuestions: "Generate Questions for Class",
    syncNow: "Sync Offline Data Now",
    syncSuccess: "Synced successfully with school server!",
    normalModeLabel: "Normal Mode (Videos + Rich Visuals)",
    lowDataModeLabel: "Low-Data Mode (<40KB Text + Audio)",
    ruralFeatures: "Rural-First Innovations",
    selectLanguage: "Select Regional Language"
  },
  hi: {
    appName: "ज्ञानसेतु",
    tagline: "ग्रामीण विद्यार्थियों के लिए डिजिटल शिक्षा मंच",
    online: "ऑनलाइन",
    offline: "ऑफ़लाइन मोड",
    lowDataOn: "कम डेटा मोड चालू",
    lowDataOff: "कम डेटा मोड बंद",
    dataSaved: "डेटा बचत",
    switchRole: "भूमिका बदलें",
    studentRole: "विद्यार्थी (रोहन)",
    teacherRole: "अध्यापक (शर्मा जी)",
    parentRole: "अभिभावक दृश्य (SMS/संदेश)",
    diagnosticTitle: "प्रारंभिक स्तर जांच परीक्षा (Diagnostic Test)",
    diagnosticDesc: "अपनी कमजोरियों और मजबूत विषयों की पहचान करें और अपने अनुसार पढ़ाई शुरू करें।",
    startDiagnostic: "जांच परीक्षा शुरू करें",
    recommendedTitle: "एआई व्यक्तिगत अध्ययन योजना",
    basedOnDiagnostic: "आपकी पिछली परीक्षा और क्विज़ के आधार पर",
    weakTopicsIdentified: "पहचाने गए कमजोर विषय",
    courses: "विषय और पाठ्यक्रम",
    allSubjects: "सभी विषय",
    math: "गणित",
    science: "विज्ञान",
    english: "अंग्रेजी",
    hindi: "हिंदी",
    lessons: "अध्याय व पाठ",
    practiceQuiz: "अभ्यास प्रश्नोत्तरी",
    downloadForOffline: "ऑफ़लाइन के लिए डाउनलोड करें",
    downloaded: "डिवाइस में सुरक्षित",
    readAloud: "पाठ सुनें (ऑडियो)",
    stopAudio: "ऑडियो रोकें",
    aiSaathi: "एआई साथी (शंका समाधान)",
    askDoubt: "अपनी भाषा में कोई भी सवाल पूछें...",
    teacherDashboard: "अध्यापक मॉनिटरिंग डैशबोर्ड",
    totalStudents: "कुल विद्यार्थी",
    classAverage: "कक्षा का औसत स्कोर",
    offlineSyncPending: "ऑफ़लाइन सिंक प्रतीक्षा सूची",
    studentsNeedingHelp: "जिन छात्रों पर विशेष ध्यान चाहिए",
    classWeakAreas: "कक्षा के कमजोर विषय",
    aiQuestionGen: "एआई प्रश्न निर्माता",
    generateQuestions: "कक्षा के लिए नए प्रश्न बनाएं",
    syncNow: "ऑफ़लाइन डेटा अभी सिंक करें",
    syncSuccess: "स्कूल सर्वर के साथ सफलतापूर्वक सिंक हो गया!",
    normalModeLabel: "सामान्य मोड (वीडियो + चित्र)",
    lowDataModeLabel: "कम-डेटा मोड (<40KB पाठ + ऑडियो)",
    ruralFeatures: "ग्रामीण केंद्रित विशेषताएं",
    selectLanguage: "क्षेत्रीय भाषा चुनें"
  },
  mr: {
    appName: "ज्ञानसेतू",
    tagline: "ग्रामीण विद्यार्थ्यांसाठी डिजिटल शिक्षण व्यासपीठ",
    online: "ऑनलाइन",
    offline: "ऑफलाइन मोड",
    lowDataOn: "कमी डेटा मोड सुरू",
    lowDataOff: "कमी डेटा मोड बंद",
    dataSaved: "डेटा बचत",
    switchRole: "भूमिका बदला",
    studentRole: "विद्यार्थी (रोहन)",
    teacherRole: "शिक्षक (शर्मा सर)",
    parentRole: "पालक दृश्य (SMS)",
    diagnosticTitle: "प्राथमिक स्तर चाचणी (Diagnostic Test)",
    diagnosticDesc: "आपल्या कच्च्या आणि पक्क्या घटकांची ओळख पटवा आणि त्यानुसार अभ्यास करा.",
    startDiagnostic: "चाचणी सुरू करा",
    recommendedTitle: "एआय वैयक्तिक अभ्यास योजना",
    basedOnDiagnostic: "तुमच्या चाचणी आणि प्रश्नमंजुषा निकालांवर आधारित",
    weakTopicsIdentified: "कच्चे राहिलेले विषय",
    courses: "विषय आणि अभ्यासक्रम",
    allSubjects: "सर्व विषय",
    math: "गणित",
    science: "विज्ञान",
    english: "इंग्रजी",
    hindi: "हिंदी",
    lessons: "धडे आणि प्रकरणे",
    practiceQuiz: "सराव प्रश्नमंजुषा",
    downloadForOffline: "ऑफलाइनसाठी डाउनलोड करा",
    downloaded: "डिव्हाइसमध्ये सुरक्षित",
    readAloud: "धडा ऐका (ऑडिओ)",
    stopAudio: "ऑडिओ थांबवा",
    aiSaathi: "एआय साथी (शंका समाधान)",
    askDoubt: "तुमच्या भाषेत शंका विचारा...",
    teacherDashboard: "शिक्षक डॅशबोर्ड",
    totalStudents: "एकूण विद्यार्थी",
    classAverage: "वर्गाची सरासरी",
    offlineSyncPending: "ऑफलाइन सिंक बाकी",
    studentsNeedingHelp: "विशेष लक्ष हवे असलेले विद्यार्थी",
    classWeakAreas: "वर्गातील कच्चे विषय",
    aiQuestionGen: "एआय प्रश्न निर्माता",
    generateQuestions: "वर्गासाठी नवीन प्रश्न तयार करा",
    syncNow: "आता डेटा सिंक करा",
    syncSuccess: "शाळा सर्व्हरशी यशस्वीपणे सिंक झाले!",
    normalModeLabel: "सामान्य मोड",
    lowDataModeLabel: "कमी डेटा मोड (<40KB)",
    ruralFeatures: "ग्रामीण वैशिष्ट्ये",
    selectLanguage: "प्रादेशिक भाषा निवडा"
  },
  bn: {
    appName: "জ্ঞানসেতু",
    tagline: "গ্রামীণ শিক্ষার্থীদের জন্য ডিজিটাল লার্নিং প্ল্যাটফর্ম",
    online: "অনলাইন",
    offline: "অফলাইন মোড",
    lowDataOn: "কম ডেটা মোড চালু",
    lowDataOff: "কম ডেটা মোড বন্ধ",
    dataSaved: "ডেটা সঞ্চয়",
    switchRole: "ভূমিকা পরিবর্তন",
    studentRole: "শিক্ষার্থী (রোহন)",
    teacherRole: "শিক্ষক (শর্মা বাবু)",
    parentRole: "অভিভাবক পোর্টাল (SMS)",
    diagnosticTitle: "প্রাথমিক স্তরের মূল্যায়ন (Diagnostic Test)",
    diagnosticDesc: "আপনার শক্তি ও দুর্বল বিষয় চিহ্নিত করে ব্যক্তিগত পড়ার পরিকল্পনা তৈরি করুন।",
    startDiagnostic: "পরীক্ষা শুরু করুন",
    recommendedTitle: "এআই ব্যক্তিগত পাঠ পরিকল্পনা",
    basedOnDiagnostic: "পূর্বের কুইজ ও পরীক্ষার ফলাফলের ভিত্তিতে",
    weakTopicsIdentified: "দুর্বল বিষয়সমূহ",
    courses: "বিষয় ও পাঠ্যক্রম",
    allSubjects: "সকল বিষয়",
    math: "গণিত",
    science: "বিজ্ঞান",
    english: "ইংরেজি",
    hindi: "হিন্দি",
    lessons: "অধ্যায় ও পাঠ",
    practiceQuiz: "অনুশীলন কুইজ",
    downloadForOffline: "অফলাইনে ডাউনলোড করুন",
    downloaded: "ডিভাইসে সংরক্ষিত",
    readAloud: "পাঠ শুনুন (অডিও)",
    stopAudio: "অডিও বন্ধ করুন",
    aiSaathi: "এআই সঙ্গী (সন্দেহ নিরসন)",
    askDoubt: "সহজ ভাষায় যেকোনো প্রশ্ন জিজ্ঞাসা করুন...",
    teacherDashboard: "শিক্ষক ড্যাশবোর্ড",
    totalStudents: "মোট শিক্ষার্থী",
    classAverage: "শ্রেণীর গড় স্কোর",
    offlineSyncPending: "অফলাইন সিঙ্ক বাকি",
    studentsNeedingHelp: "বিশেষ নজর প্রয়োজন এমন শিক্ষার্থী",
    classWeakAreas: "শ্রেণীর দুর্বল বিষয়সমূহ",
    aiQuestionGen: "এআই প্রশ্ন জেনারেটর",
    generateQuestions: "ক্লাসের জন্য প্রশ্ন তৈরি করুন",
    syncNow: "এখনই ডেটা সিঙ্ক করুন",
    syncSuccess: "সার্ভারে সফলভাবে সিঙ্ক হয়েছে!",
    normalModeLabel: "সাধারণ মোড",
    lowDataModeLabel: "কম ডেটা মোড (<40KB)",
    ruralFeatures: "গ্রামীণ শিক্ষার্থীদের সুবিধা",
    selectLanguage: "আঞ্চলিক ভাষা নির্বাচন করুন"
  },
  te: {
    appName: "జ్ఞానసేతు",
    tagline: "గ్రామీణ విద్యార్థుల కోసం డిజిటల్ లెర్నింగ్ వేదిక",
    online: "ఆన్‌లైన్",
    offline: "ఆఫ్‌లైన్ మోడ్",
    lowDataOn: "తక్కువ డేటా మోడ్ ఆన్",
    lowDataOff: "తక్కువ డేటా మోడ్ ఆఫ్",
    dataSaved: "డేటా ఆదా",
    switchRole: "పాత్ర మార్చండి",
    studentRole: "విద్యార్థి (రోహన్)",
    teacherRole: "ఉపాధ్యాయుడు (శర్మ గారు)",
    parentRole: "తల్లిదండ్రుల పోర్టల్ (SMS)",
    diagnosticTitle: "ప్రాథమిక స్థాయి పరీక్ష (Diagnostic Test)",
    diagnosticDesc: "మీ బలాలు మరియు బలహీనమైన అంశాలను గుర్తించి వ్యక్తిగత అధ్యయన ప్రణాళికను ప్రారంభించండి.",
    startDiagnostic: "పరీక్షను ప్రారంభించండి",
    recommendedTitle: "AI వ్యక్తిగతీకరించిన అభ్యాస మార్గం",
    basedOnDiagnostic: "మీ తాజా పరీక్ష ఫలితాల ఆధారంగా",
    weakTopicsIdentified: "బలహీనమైన అంశాలు",
    courses: "సబ్జెక్టులు & కోర్సులు",
    allSubjects: "అన్ని సబ్జెక్టులు",
    math: "గణితం",
    science: "సైన్స్",
    english: "ఇంగ్లీష్",
    hindi: "హిందీ",
    lessons: "పాఠాలు & అధ్యాయాలు",
    practiceQuiz: "అభ్యాస క్విజ్",
    downloadForOffline: "ఆఫ్‌లైన్ కోసం డౌన్‌లోడ్ చేయండి",
    downloaded: "డివైజ్‌లో భద్రపరచబడింది",
    readAloud: "వినండి (ఆడియో)",
    stopAudio: "ఆడియో ఆపండి",
    aiSaathi: "AI సాథీ (సందేహాల నివృత్తి)",
    askDoubt: "మీ సందేహాలను సరళమైన భాషలో అడగండి...",
    teacherDashboard: "ఉపాధ్యాయుల డాష్‌బోర్డ్",
    totalStudents: "మొత్తం విద్యార్థులు",
    classAverage: "తరగతి సగటు స్కోరు",
    offlineSyncPending: "ఆఫ్‌లైన్ సింక్ పెండింగ్",
    studentsNeedingHelp: "ప్రత్యేక శ్రద్ధ అవసరమైన విద్యార్థులు",
    classWeakAreas: "తరగతి బలహీనమైన అంశాలు",
    aiQuestionGen: "AI ప్రశ్నల జనరేటర్",
    generateQuestions: "తరగతి కోసం ప్రశ్నలను రూపొందించండి",
    syncNow: "ఇప్పుడే డేటాను సింక్ చేయండి",
    syncSuccess: "సర్వర్‌తో విజయవంతంగా సమకాలీకరించబడింది!",
    normalModeLabel: "సాధారణ మోడ్",
    lowDataModeLabel: "తక్కువ డేటా మోడ్ (<40KB)",
    ruralFeatures: "గ్రామీణ ప్రత్యేకతలు",
    selectLanguage: "ప్రాంతీయ భాషను ఎంచుకోండి"
  },
  ta: {
    appName: "ஞானசேது",
    tagline: "கிராமப்புற மாணவர்களுக்கான டிஜிட்டல் கற்றல் தளம்",
    online: "ஆன்லைன்",
    offline: "ஆஃப்லைன் முறை",
    lowDataOn: "குறைந்த டேட்டா பயன்முறை ஆன்",
    lowDataOff: "குறைந்த டேட்டா பயன்முறை ஆஃப்",
    dataSaved: "சேமிக்கப்பட்ட டேட்டா",
    switchRole: "பங்கு மாற்றம்",
    studentRole: "மாணவர் (ரோஹன்)",
    teacherRole: "ஆசிரியர் (சர்மா ஐயா)",
    parentRole: "பெற்றோர் பக்கம் (SMS)",
    diagnosticTitle: "தொடக்க மதிப்பீட்டுத் தேர்வு (Diagnostic Test)",
    diagnosticDesc: "உங்கள் திறன்கள் மற்றும் பலவீனமான பாடங்களைக் கண்டறிந்து தனிப்பயனாக்கப்பட்ட கற்றலைத் தொடங்குங்கள்.",
    startDiagnostic: "தேர்வைத் தொடங்கவும்",
    recommendedTitle: "AI தனிப்பயன் கற்றல் திட்டம்",
    basedOnDiagnostic: "உங்கள் தேர்வு முடிவுகளின் அடிப்படையில்",
    weakTopicsIdentified: "கவனம் தேவைப்படும் பாடங்கள்",
    courses: "பாடங்கள் & பாடநெறிகள்",
    allSubjects: "அனைத்து பாடங்களும்",
    math: "கணிதம்",
    science: "அறிவியல்",
    english: "ஆங்கிலம்",
    hindi: "இந்தி",
    lessons: "பாடங்கள்",
    practiceQuiz: "பயிற்சி வினாடி வினா",
    downloadForOffline: "ஆஃப்லைனில் பதிவிறக்குக",
    downloaded: "சாதனத்தில் சேமிக்கப்பட்டது",
    readAloud: "கேளுங்கள் (ஆடியோ)",
    stopAudio: "ஆடியோவை நிறுத்து",
    aiSaathi: "AI தோழன் (சந்தேக தீர்வு)",
    askDoubt: "எளிய மொழியில் சந்தேகங்களைக் கேளுங்கள்...",
    teacherDashboard: "ஆசிரியர் கண்காணிப்பு பலகை",
    totalStudents: "மொத்த மாணவர்கள்",
    classAverage: "வகுப்பு சராசரி",
    offlineSyncPending: "ஆஃப்லைன் ஒத்திசைவு நிலுவை",
    studentsNeedingHelp: "கவனம் தேவைப்படும் மாணவர்கள்",
    classWeakAreas: "வகுப்பின் பலவீனமான பாடங்கள்",
    aiQuestionGen: "AI கேள்வி தயாரிப்பாளர்",
    generateQuestions: "புதிய கேள்விகளை உருவாக்கவும்",
    syncNow: "இப்போது ஒத்திசைக்கவும்",
    syncSuccess: "பள்ளி சேவையகத்துடன் வெற்றிகரமாக ஒத்திசைக்கப்பட்டது!",
    normalModeLabel: "இயல்பான முறை",
    lowDataModeLabel: "குறைந்த டேட்டா முறை (<40KB)",
    ruralFeatures: "கிராமப்புற வசதிகள்",
    selectLanguage: "பிராந்திய மொழியைத் தேர்ந்தெடுக்கவும்"
  },
  gu: {
    appName: "જ્ઞાનસેતુ",
    tagline: "ગ્રામીણ વિદ્યાર્થીઓ માટે ડિજિટલ શિક્ષણ મંચ",
    online: "ઑનલાઇન",
    offline: "ઑફલાઇન મોડ",
    lowDataOn: "ઓછો ડેટા મોડ ચાલુ",
    lowDataOff: "ઓછો ડેટા મોડ બંધ",
    dataSaved: "ડેટા બચત",
    switchRole: "ભૂમિકા બદલો",
    studentRole: "વિદ્યાર્થી (રોહન)",
    teacherRole: "શિક્ષક (શર્મા સાહેબ)",
    parentRole: "વાલી પોર્ટલ (SMS)",
    diagnosticTitle: "પ્રારંભિક સ્તર પરીક્ષા (Diagnostic Test)",
    diagnosticDesc: "તમારી નબળાઈઓ ઓળખીને વ્યક્તિગત અભ્યાસ યોજના શરૂ કરો.",
    startDiagnostic: "પરીક્ષા શરૂ કરો",
    recommendedTitle: "AI વ્યક્તિગત અભ્યાસ યોજના",
    basedOnDiagnostic: "તમારા ક્વિઝ પરિણામોના આધારે",
    weakTopicsIdentified: "નબળા વિષયો",
    courses: "વિષયો અને પાઠ્યક્રમ",
    allSubjects: "બધા વિષયો",
    math: "ગણિત",
    science: "વિજ્ઞાન",
    english: "અંગ્રેજી",
    hindi: "હિન્દી",
    lessons: "પાઠ અને પ્રકરણ",
    practiceQuiz: "મહાવરો ક્વિઝ",
    downloadForOffline: "ઑફલાઇન માટે ડાઉનલોડ કરો",
    downloaded: "ડિવાઇસમાં સુરક્ષિત",
    readAloud: "પાઠ સાંભળો (ઑડિયો)",
    stopAudio: "ઑડિયો બંધ કરો",
    aiSaathi: "AI સાથી (શંકા સમાધાન)",
    askDoubt: "સરળ ભાષામાં પ્રશ્ન પૂછો...",
    teacherDashboard: "શિક્ષક ડેશબોર્ડ",
    totalStudents: "કુલ વિદ્યાર્થીઓ",
    classAverage: "વર્ગ સરેરાશ સ્કોર",
    offlineSyncPending: "ઑફલાઇન સિંક બાકી",
    studentsNeedingHelp: "વિશેષ ધ્યાન આપવા જેવા વિદ્યાર્થીઓ",
    classWeakAreas: "વર્ગના નબળા વિષયો",
    aiQuestionGen: "AI પ્રશ્ન નિર્માતા",
    generateQuestions: "વર્ગ માટે પ્રશ્નો બનાવો",
    syncNow: "હમણાં ડેટા સિંક કરો",
    syncSuccess: "સર્વર સાથે સફળતાપૂર્વક સિંક થયું!",
    normalModeLabel: "સામાન્ય મોડ",
    lowDataModeLabel: "ઓછો ડેટા મોડ (<40KB)",
    ruralFeatures: "ગ્રામીણ વિશેષતાઓ",
    selectLanguage: "પ્રાદેશિક ભાષા પસંદ કરો"
  },
  kn: {
    appName: "ಜ್ಞಾನಸೇತು",
    tagline: "ಗ್ರಾಮೀಣ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಡಿಜಿಟಲ್ ಕಲಿಕಾ ವೇದಿಕೆ",
    online: "ಆನ್‌ಲೈನ್",
    offline: "ಆಫ್‌ಲೈನ್ ಮೋಡ್",
    lowDataOn: "ಕಡಿಮೆ ಡೇಟಾ ಮೋಡ್ ಆನ್",
    lowDataOff: "ಕಡಿಮೆ ಡೇಟಾ ಮೋಡ್ ಆಫ್",
    dataSaved: "ಡೇಟಾ ಉಳಿತಾಯ",
    switchRole: "ಪಾತ್ರ ಬದಲಾಯಿಸಿ",
    studentRole: "ವಿದ್ಯಾರ್ಥಿ (ರೋಹನ್)",
    teacherRole: "ಶಿಕ್ಷಕರು (ಶರ್ಮಾ ಸರ್)",
    parentRole: "ಪೋಷಕರ ನೋಟ (SMS)",
    diagnosticTitle: "ಆರಂಭಿಕ ಮಟ್ಟದ ಪರೀಕ್ಷೆ (Diagnostic Test)",
    diagnosticDesc: "ನಿಮ್ಮ ಸಾಮರ್ಥ್ಯ ಮತ್ತು ಕಲಿಕಾ ನ್ಯೂನತೆಗಳನ್ನು ಗುರುತಿಸಿ ಅಧ್ಯಯನ ಆರಂಭಿಸಿ.",
    startDiagnostic: "ಪರೀಕ್ಷೆ ಪ್ರಾರಂಭಿಸಿ",
    recommendedTitle: "AI ವೈಯಕ್ತಿಕ ಕಲಿಕಾ ಯೋಜನೆ",
    basedOnDiagnostic: "ನಿಮ್ಮ ಕ್ವಿಜ್ ಫಲಿತಾಂಶಗಳ ಆಧಾರದ ಮೇಲೆ",
    weakTopicsIdentified: "ಗಮನಹರಿಸಬೇಕಾದ ವಿಷಯಗಳು",
    courses: "ವಿಷಯಗಳು ಮತ್ತು ಕೋರ್ಸ್‌ಗಳು",
    allSubjects: "ಎಲ್ಲಾ ವಿಷಯಗಳು",
    math: "ಗಣಿತ",
    science: "ವಿಜ್ಞಾನ",
    english: "ಇಂಗ್ಲಿಷ್",
    hindi: "ಹಿಂದಿ",
    lessons: "ಪಾಠಗಳು",
    practiceQuiz: "ಅಭ್ಯಾಸ ರಸಪ್ರಶ್ನೆ",
    downloadForOffline: "ಆಫ್‌ಲೈನ್‌ಗಾಗಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    downloaded: "ಸಾಧನದಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ",
    readAloud: "ಪಾಠವನ್ನು ಆಲಿಸಿ (ಆಡಿಯೋ)",
    stopAudio: "ಆಡಿಯೋ ನಿಲ್ಲಿಸಿ",
    aiSaathi: "AI ಒಡನಾಡಿ (ಸಂದೇಹ ಪರಿಹಾರ)",
    askDoubt: "ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಸಂದೇಹ ಕೇಳಿ...",
    teacherDashboard: "ಶಿಕ್ಷಕರ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    totalStudents: "ಒಟ್ಟು ವಿದ್ಯಾರ್ಥಿಗಳು",
    classAverage: "ತರಗತಿಯ ಸರಾಸರಿ",
    offlineSyncPending: "ಆಫ್‌ಲೈನ್ ಸಿಂಕ್ ಬಾಕಿ",
    studentsNeedingHelp: "ವಿಶೇಷ ಗಮನ ಬೇಕಾದ ವಿದ್ಯಾರ್ಥಿಗಳು",
    classWeakAreas: "ತರಗತಿಯ ಕಷ್ಟಕರ ವಿಷಯಗಳು",
    aiQuestionGen: "AI ಪ್ರಶ್ನೆ ಸೃಷ್ಟಿಕರ್ತ",
    generateQuestions: "ತರಗತಿಗಾಗಿ ಪ್ರಶ್ನೆಗಳನ್ನು ರಚಿಸಿ",
    syncNow: "ಈಗಲೇ ಸಿಂಕ್ ಮಾಡಿ",
    syncSuccess: "ಸರ್ವರ್‌ನೊಂದಿಗೆ ಯಶಸ್ವಿಯಾಗಿ ಸಿಂಕ್ ಆಗಿದೆ!",
    normalModeLabel: "ಸಾಮಾನ್ಯ ಮೋಡ್",
    lowDataModeLabel: "ಕಡಿಮೆ ಡೇಟಾ ಮೋಡ್ (<40KB)",
    ruralFeatures: "ಗ್ರಾಮೀಣ ಸೌಲಭ್ಯಗಳು",
    selectLanguage: "ಪ್ರಾದೇಶಿಕ ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ"
  },
  pa: {
    appName: "ਗਿਆਨਸੇਤੂ",
    tagline: "ਪੇਂਡੂ ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਡਿਜੀਟਲ ਸਿੱਖਿਆ ਪਲੇਟਫਾਰਮ",
    online: "ਆਨਲਾਈਨ",
    offline: "ਆਫਲਾਈਨ ਮੋਡ",
    lowDataOn: "ਘੱਟ ਡਾਟਾ ਮੋਡ ਚਾਲੂ",
    lowDataOff: "ਘੱਟ ਡਾਟਾ ਮੋਡ ਬੰਦ",
    dataSaved: "ਡਾਟਾ ਬਚਤ",
    switchRole: "ਭੂਮਿਕਾ ਬਦਲੋ",
    studentRole: "ਵਿਦਿਆਰਥੀ (ਰੋਹਨ)",
    teacherRole: "ਅਧਿਆਪਕ (ਸ਼ਰਮਾ ਜੀ)",
    parentRole: "ਮਾਪੇ ਪੋਰਟਲ (SMS)",
    diagnosticTitle: "ਸ਼ੁਰੂਆਤੀ ਪੱਧਰ ਜਾਂਚ ਪ੍ਰੀਖਿਆ",
    diagnosticDesc: "ਆਪਣੀਆਂ ਕਮਜ਼ੋਰੀਆਂ ਅਤੇ ਮਜ਼ਬੂਤ ਵਿਸ਼ਿਆਂ ਦੀ ਪਛਾਣ ਕਰੋ।",
    startDiagnostic: "ਟੈਸਟ ਸ਼ੁਰੂ ਕਰੋ",
    recommendedTitle: "AI ਨਿੱਜੀ ਅਧਿਐਨ ਯੋਜਨਾ",
    basedOnDiagnostic: "ਤੁਹਾਡੇ ਕਵਿਜ਼ ਨਤੀਜਿਆਂ ਦੇ ਆਧਾਰ ਤੇ",
    weakTopicsIdentified: "ਕਮਜ਼ੋਰ ਵਿਸ਼ੇ",
    courses: "ਵਿਸ਼ੇ ਅਤੇ ਕੋਰਸ",
    allSubjects: "ਸਾਰੇ ਵਿਸ਼ੇ",
    math: "ਗਣਿਤ",
    science: "ਵਿਗਿਆਨ",
    english: "ਅੰਗਰੇਜ਼ੀ",
    hindi: "ਹਿੰਦੀ",
    lessons: "ਪਾਠ ਅਤੇ ਅਧਿਆਇ",
    practiceQuiz: "ਅਭਿਆਸ ਕਵਿਜ਼",
    downloadForOffline: "ਆਫਲਾਈਨ ਲਈ ਡਾਊਨਲੋਡ ਕਰੋ",
    downloaded: "ਡਿਵਾਈਸ ਵਿੱਚ ਸੁਰੱਖਿਅਤ",
    readAloud: "ਪਾਠ ਸੁਣੋ (ਆਡੀਓ)",
    stopAudio: "ਆਡੀਓ ਰੋਕੋ",
    aiSaathi: "AI ਸਾਥੀ (ਸ਼ੰਕਾ ਨਿਵਾਰਨ)",
    askDoubt: "ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਕੋਈ ਵੀ ਸਵਾਲ ਪੁੱਛੋ...",
    teacherDashboard: "ਅਧਿਆਪਕ ਡੈਸ਼ਬੋਰਡ",
    totalStudents: "ਕੁੱਲ ਵਿਦਿਆਰਥੀ",
    classAverage: "ਜਮਾਤ ਦਾ ਔਸਤ ਸਕੋਰ",
    offlineSyncPending: "ਆਫਲਾਈਨ ਸਿੰਕ ਬਾਕੀ",
    studentsNeedingHelp: "ਧਿਆਨ ਦੇਣ ਯੋਗ ਵਿਦਿਆਰਥੀ",
    classWeakAreas: "ਕਮਜ਼ੋਰ ਵਿਸ਼ੇ",
    aiQuestionGen: "AI ਪ੍ਰਸ਼ਨ ਨਿਰਮਾਤਾ",
    generateQuestions: "ਨਵੇਂ ਪ੍ਰਸ਼ਨ ਬਣਾਓ",
    syncNow: "ਹੁਣੇ ਸਿੰਕ ਕਰੋ",
    syncSuccess: "ਸਰਵਰ ਨਾਲ ਸਫਲਤਾਪੂਰਵਕ ਸਿੰਕ ਹੋ ਗਿਆ!",
    normalModeLabel: "ਆਮ ਮੋਡ",
    lowDataModeLabel: "ਘੱਟ ਡਾਟਾ ਮੋਡ (<40KB)",
    ruralFeatures: "ਪੇਂਡੂ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ",
    selectLanguage: "ਖੇਤਰੀ ਭਾਸ਼ਾ ਚੁਣੋ"
  },
  od: {
    appName: "ଜ୍ଞାନସେତୁ",
    tagline: "ଗ୍ରାମାଞ୍ଚଳ ଛାତ୍ରଛାତ୍ରୀଙ୍କ ପାଇଁ ଡିଜିଟାଲ ଶିକ୍ଷା ମଞ୍ଚ",
    online: "ଅନଲାଇନ୍",
    offline: "ଅଫଲାଇନ୍ ମୋଡ୍",
    lowDataOn: "କମ୍ ଡାଟା ମୋଡ୍ ଚାଲୁ",
    lowDataOff: "କମ୍ ଡାଟା ମୋଡ୍ ବନ୍ଦ",
    dataSaved: "ଡାଟା ସଞ୍ଚୟ",
    switchRole: "ଭୂମିକା ପରିବର୍ତ୍ତନ",
    studentRole: "ଛାତ୍ର (ରୋହନ)",
    teacherRole: "ଶିକ୍ଷକ (ଶର୍ମା ସାର୍)",
    parentRole: "ଅଭିଭାବକ ପୋର୍ଟାଲ୍ (SMS)",
    diagnosticTitle: "ପ୍ରାରମ୍ଭିକ ମୂଲ୍ୟାଙ୍କନ ପରୀକ୍ଷା",
    diagnosticDesc: "ନିଜର ଦୁର୍ବଳ ବିଷୟ ଚିହ୍ନଟ କରି ବ୍ୟକ୍ତିଗତ ପାଠ୍ୟକ୍ରମ ଆରମ୍ଭ କରନ୍ତୁ।",
    startDiagnostic: "ପରୀକ୍ଷା ଆରମ୍ଭ କରନ୍ତୁ",
    recommendedTitle: "AI ବ୍ୟକ୍ତିଗତ ଅଧ୍ୟୟନ ଯୋଜନା",
    basedOnDiagnostic: "ପୂର୍ବ କ୍ୱିଜ୍ ଫଳାଫଳ ଉପରେ ଆଧାରିତ",
    weakTopicsIdentified: "ଦୁର୍ବଳ ବିଷୟଗୁଡ଼ିକ",
    courses: "ବିଷୟ ଏବଂ ପାଠ୍ୟକ୍ରମ",
    allSubjects: "ସମସ୍ତ ବିଷୟ",
    math: "ଗଣିତ",
    science: "ବିଜ୍ଞାନ",
    english: "ଇଂରାଜୀ",
    hindi: "ହିନ୍ଦୀ",
    lessons: "ପାଠ ଏବଂ ଅଧ୍ୟାୟ",
    practiceQuiz: "ଅଭ୍ୟାସ କ୍ୱିଜ୍",
    downloadForOffline: "ଅଫଲାଇନ୍ ପାଇଁ ଡାଉନଲୋଡ୍ କରନ୍ତୁ",
    downloaded: "ଡିଭାଇସ୍‌ରେ ସୁରକ୍ଷିତ",
    readAloud: "ପାଠ ଶୁଣନ୍ତୁ (ଅଡିଓ)",
    stopAudio: "ଅଡିଓ ବନ୍ଦ କରନ୍ତୁ",
    aiSaathi: "AI ସାଥୀ (ସନ୍ଦେହ ସମାଧାନ)",
    askDoubt: "ସହଜ ଭାଷାରେ ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ...",
    teacherDashboard: "ଶିକ୍ଷକ ଡ୍ୟାସବୋର୍ଡ",
    totalStudents: "ମୋଟ ଛାତ୍ରଛାତ୍ରୀ",
    classAverage: "ଶ୍ରେଣୀ ହାରାହାରି ସ୍କୋର",
    offlineSyncPending: "ଅଫଲାଇନ୍ ସିଙ୍କ୍ ବାକି",
    studentsNeedingHelp: "ସ୍ୱତନ୍ତ୍ର ଧ୍ୟାନ ଆବଶ୍ୟକ ଛାତ୍ର",
    classWeakAreas: "ଶ୍ରେଣୀର ଦୁର୍ବଳ ବିଷୟ",
    aiQuestionGen: "AI ପ୍ରଶ୍ନ ପ୍ରସ୍ତୁତକାରୀ",
    generateQuestions: "ଶ୍ରେଣୀ ପାଇଁ ପ୍ରଶ୍ନ ତିଆରି କରନ୍ତୁ",
    syncNow: "ଏବେ ସିଙ୍କ୍ କରନ୍ତୁ",
    syncSuccess: "ସର୍ଭର ସହିତ ସଫଳତାର ସହ ସିଙ୍କ୍ ହେଲା!",
    normalModeLabel: "ସାଧାରଣ ମୋଡ୍",
    lowDataModeLabel: "କମ୍ ଡାଟା ମୋଡ୍ (<40KB)",
    ruralFeatures: "ଗ୍ରାମାଞ୍ଚଳ ବିଶେଷତା",
    selectLanguage: "ଆଞ୍ଚଳିକ ଭାଷା ଚୟନ କରନ୍ତୁ"
  }
};

export const sampleCourses = [
  {
    id: "math-c7",
    subject: "math",
    classGrade: "Class 7",
    title: {
      en: "Class 7 Mathematics",
      hi: "कक्षा 7 गणित",
      mr: "इयत्ता 7 वी गणित",
      bn: "সপ্তম শ্রেণী গণিত",
      te: "7వ తరగతి గణితం",
      ta: "7ஆம் வகுப்பு கணிதம்",
      gu: "ધોરણ 7 ગણિત",
      kn: "7 ನೇ ತರಗತಿ ಗಣಿತ",
      pa: "ਜਮਾਤ 7ਵੀਂ ਗਣਿਤ",
      od: "ସପ୍ତମ ଶ୍ରେଣୀ ଗଣିତ"
    },
    icon: "Calculator",
    color: "from-amber-500 to-orange-600",
    chapters: [
      {
        id: "math-c7-ch1",
        title: {
          en: "Fractions & Decimals",
          hi: "भिन्न एवं दशमलव",
          mr: "अपूर्णांक आणि दशांश",
          bn: "ভগ্নাংশ ও দশমিক",
          te: "భిన్నాలు మరియు దశాంశాలు",
          ta: "பின்னங்கள் மற்றும் தசமங்கள்",
          gu: "અપૂર્ણાંક અને દશાંશ",
          kn: "ಭಿನ್ನರಾಶಿಗಳು ಮತ್ತು ದಶಮಾಂಶಗಳು",
          pa: "ਭਿੰਨ ਅਤੇ ਦਸ਼ਮਲਵ",
          od: "ଭଗ୍ନାଂଶ ଏବଂ ଦଶମିକ"
        },
        topicKey: "Fractions",
        sizeKB: 24,
        isDownloaded: true,
        summary: {
          en: "Understanding parts of a whole using everyday examples like dividing roti or land.",
          hi: "रोटी या खेत बांटने जैसे दैनिक उदाहरणों से हिस्से और भिन्न को समझें।",
          mr: "भाकरी किंवा शेत वाटण्याच्या रोजच्या उदाहरणांवरून अपूर्णांक समजून घ्या.",
          bn: "রুটি বা জমি ভাগ করার মতো দৈনন্দিন উদাহরণের মাধ্যমে ভগ্নাংশ বুঝুন।",
          te: "రొట్టె లేదా పొలం పంచడం వంటి రోజువారీ ఉదాహరణలతో భిన్నాలను అర్థం చేసుకోండి.",
          ta: "ரொட்டி அல்லது நிலத்தைப் பிரிப்பது போன்ற அன்றாட உதாரணங்கள் மூலம் பின்னங்களைப் புரிந்து கொள்ளுங்கள்.",
          gu: "રોટલી કે ખેતર વહેંચવાના રોજીંદા ઉદાહરણો દ્વારા અપૂર્ણાંક સમજો.",
          kn: "ರೊಟ್ಟಿ ಅಥವಾ ಜಮೀನು ಹಂಚುವಂತಹ ದೈನಂದಿನ ಉದಾಹರಣೆಗಳೊಂದಿಗೆ ಭಿನ್ನರಾಶಿಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",
          pa: "ਰੋਟੀ ਜਾਂ ਖੇਤ ਵੰਡਣ ਦੀਆਂ ਉਦਾਹਰਨਾਂ ਰਾਹੀਂ ਭਿੰਨਾਂ ਨੂੰ ਸਮਝੋ।",
          od: "ରୁଟି କିମ୍ବା ଜମି ବାଣ୍ଟିବା ଭଳି ଦୈନନ୍ଦିନ ଉଦାହରଣ ମାଧ୍ୟମରେ ଭଗ୍ନାଂଶ ବୁଝନ୍ତୁ।"
        },
        lowDataContent: {
          en: `### 1. What is a Fraction?
A fraction represents a part of a whole. 
If 1 roti is equally divided among 4 children, each child receives **1/4 (one-fourth)** of the roti.

- **Numerator:** The top number (parts we have). In 3/4, numerator is 3.
- **Denominator:** The bottom number (total equal parts). In 3/4, denominator is 4.

### 2. Types of Fractions
1. **Proper Fraction:** Numerator is smaller than denominator (e.g. 2/5, 3/7).
2. **Improper Fraction:** Numerator is larger than or equal to denominator (e.g. 7/4, 5/2).
3. **Mixed Fraction:** Combination of whole number and proper fraction (e.g. 1 3/4).

### 3. Real-life Rural Application
If a farmer divides his 6-acre field: 2 acres for wheat (2/6) and 3 acres for mustard (3/6), the total cultivated field is (2+3)/6 = **5/6**!`,
          hi: `### 1. भिन्न क्या होती है?
भिन्न किसी पूरी वस्तु के एक हिस्से को दर्शाती है।
यदि 1 रोटी को 4 बच्चों में बराबर बांटा जाए, तो प्रत्येक बच्चे को **1/4 (एक चौथाई)** रोटी मिलेगी।

- **अंश (Numerator):** ऊपर की संख्या (हमारे पास कितने हिस्से हैं)। उदाहरण: 3/4 में अंश 3 है।
- **हर (Denominator):** नीचे की संख्या (कुल कितने बराबर हिस्से किए गए)। उदाहरण: 3/4 में हर 4 है।

### 2. भिन्न के प्रकार
1. **उचित भिन्न (Proper):** अंश हर से छोटा होता है (जैसे 2/5, 3/7)।
2. **अनुचित भिन्न (Improper):** अंश हर से बड़ा होता है (जैसे 7/4, 5/2)।
3. **मिश्रित भिन्न (Mixed):** पूर्ण संख्या और उचित भिन्न का मेल (जैसे 1 3/4)।

### 3. ग्रामीण जीवन में प्रयोग
यदि एक किसान अपने खेत के 2/6 हिस्से पर गेहूं और 3/6 हिस्से पर सरसों बोता है, तो कुल बोया गया खेत = (2+3)/6 = **5/6** हिस्सा है!`,
          mr: `### 1. अपूर्णांक म्हणजे काय?
अपूर्णांक म्हणजे संपूर्ण वस्तूचा एक भाग.
जर 1 भाकरी 4 मुलांमध्ये समान वाटली, तर प्रत्येक मुलाला भाकरीचा **1/4 (पाव भाग)** मिळतो.

- **अंश (Numerator):** वरची संख्या (आपल्याकडे किती भाग आहेत). उदाहरण: 3/4 मध्ये अंश 3 आहे.
- **छेद (Denominator):** खालची संख्या (एकूण समान भाग). उदाहरण: 3/4 मध्ये छेद 4 आहे.

### 2. अपूर्णांकांची बेरीज
समान छेद असल्यास फक्त अंशांची बेरीज करा:
- 1/5 + 2/5 = (1 + 2)/5 = **3/5**`
        },
        audioScript: {
          en: "Welcome to Fractions. A fraction represents a part of a whole. For example, dividing one roti into four equal pieces gives one-fourth to each person. The top number is the numerator and the bottom number is the denominator.",
          hi: "भिन्न के पाठ में आपका स्वागत है। भिन्न किसी पूरी वस्तु का एक हिस्सा होती है। जैसे यदि आप एक रोटी के चार बराबर टुकड़े करें, तो प्रत्येक को एक बटा चार हिस्सा मिलता है। ऊपर की संख्या अंश और नीचे की संख्या हर कहलाती है।",
          mr: "अपूर्णांकांच्या पाठात आपले स्वागत आहे. अपूर्णांक म्हणजे संपूर्ण वस्तूचा एक भाग. जसे की एका भाकरीचे चार तुकडे केले तर प्रत्येकाला एक चतुर्थांश भाग मिळतो. वरची संख्या अंश आणि खालची संख्या छेद असते.",
          bn: "ভগ্নাংশের পাঠে আপনাকে স্বাগতম। ভগ্নাংশ হলো কোনো পূর্ণ বস্তুর একটি অংশ। একটি রুটিকে সমান চার ভাগে ভাগ করলে প্রতি ভাগকে এক-চতুর্থাংশ বলে।",
          te: "భిన్నాల పాఠానికి స్వాగతం. ఒక పూర్తి వస్తువులోని భాగాన్ని భిన్నం అంటారు. ఉదాహరణకు ఒక రొట్టెను నాలుగు సమాన భాగాలుగా చేస్తే ప్రతి భాగం నాలుగో వంతు అవుతుంది.",
          ta: "பின்னங்கள் பாடத்திற்கு வரவேற்கிறோம். ஒரு முழுப் பொருளின் ஒரு பகுதியை பின்னம் குறிக்கிறது. ஒரு ரொட்டியை நான்கு சம பாகங்களாகப் பிரித்தால் ஒவ்வொரு பகுதியும் கால் பகுதி ஆகும்.",
          gu: "અપૂર્ણાંકના પાઠમાં આપનું સ્વાગત છે. અપૂર્ણાંક એટલે કોઈપણ પૂર્ણ વસ્તુનો એક ભાગ. એક રોટલીના ચાર સરખા ભાગ કરીએ તો દરેક ભાગને એક ચતુર્થાંશ કહેવાય.",
          kn: "ಭಿನ್ನರಾಶಿಗಳ ಪಾಠಕ್ಕೆ ಸುಸ್ವಾಗತ. ಪೂರ್ಣ ವಸ್ತುವಿನ ಒಂದು ಭಾಗವನ್ನು ಭಿನ್ನರಾಶಿ ಎನ್ನಲಾಗುತ್ತದೆ. ಒಂದು ರೊಟ್ಟಿಯನ್ನು ನಾಲ್ಕು ಸಮಭಾಗ ಮಾಡಿದರೆ ಪ್ರತಿಯೊಂದು ಕಾಲು ಭಾಗವಾಗುತ್ತದೆ.",
          pa: "ਭਿੰਨਾਂ ਦੇ ਪਾਠ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ। ਕਿਸੇ ਪੂਰੀ ਚੀਜ਼ ਦੇ ਇੱਕ ਹਿੱਸੇ ਨੂੰ ਭਿੰਨ ਕਿਹਾ ਜਾਂਦਾ ਹੈ। ਜਿਵੇਂ ਇੱਕ ਰੋਟੀ ਦੇ ਚਾਰ ਬਰਾਬਰ ਟੁਕੜੇ ਕੀਤੇ ਜਾਣ ਤਾਂ ਹਰੇਕ ਚੌਥਾਈ ਹਿੱਸਾ ਹੁੰਦਾ ਹੈ।",
          od: "ଭଗ୍ନାଂଶ ପାଠକୁ ସ୍ୱାଗତ। ଗୋଟିଏ ସମ୍ପୂର୍ଣ୍ଣ ବସ୍ତୁର ଅଂଶକୁ ଭଗ୍ନାଂଶ କୁହାଯାଏ। ଯେପରି ଗୋଟିଏ ରୁଟିକୁ ଚାରି ଭାଗ କଲେ ପ୍ରତ୍ୟେକ ଭାଗ ଏକ ଚତୁର୍ଥାଂଶ ହୁଏ।"
        },
        quiz: [
          {
            id: "q-frac-1",
            question: {
              en: "In the fraction 3/8, what is the numerator?",
              hi: "भिन्न 3/8 में अंश (Numerator) कौन सी संख्या है?",
              mr: "3/8 या अपूर्णांकात अंश कोणता आहे?",
              bn: "৩/৮ ভগ্নাংশে লব (Numerator) কোনটি?",
              te: "3/8 భిన్నంలో లవం (Numerator) ఏది?",
              ta: "3/8 பின்னத்தில் தொகுதி (Numerator) எது?",
              gu: "અપૂર્ણાંક 3/8 માં અંશ કઈ સંખ્યા છે?",
              kn: "3/8 ಭಿನ್ನರಾಶಿಯಲ್ಲಿ ಅಂಶ (Numerator) ಯಾವುದು?",
              pa: "ਭਿੰਨ 3/8 ਵਿੱਚ ਅੰਸ਼ ਕਿਹੜਾ ਹੈ?",
              od: "ଭଗ୍ନାଂଶ ୩/୮ ରେ ଲବ (Numerator) କିଏ?"
            },
            options: ["3", "8", "11", "5"],
            correct: 0,
            explanation: {
              en: "The top number is the numerator. In 3/8, 3 is on top.",
              hi: "ऊपर लिखी संख्या अंश होती है। 3/8 में 3 ऊपर है, अतः 3 अंश है।",
              mr: "वरची संख्या अंश असते. 3/8 मध्ये 3 वर आहे, म्हणून 3 अंश आहे.",
              bn: "উপরের সংখ্যাটি হলো লব। ৩/৮-এ ৩ উপরে আছে।",
              te: "పై సంఖ్య లవం. 3/8 లో 3 పైన ఉంది.",
              ta: "மேலே உள்ள எண் தொகுதி ஆகும். 3/8 இல் 3 மேலே உள்ளது."
            }
          },
          {
            id: "q-frac-2",
            question: {
              en: "Solve: 2/7 + 3/7 = ?",
              hi: "हल कीजिए: 2/7 + 3/7 = ?",
              mr: "सोडवा: 2/7 + 3/7 = ?",
              bn: "সমাধান করুন: ২/৭ + ৩/৭ = ?",
              te: "సాధించండి: 2/7 + 3/7 = ?",
              ta: "தீர்வு காண்க: 2/7 + 3/7 = ?",
              gu: "ઉકેલો: 2/7 + 3/7 = ?",
              kn: "ಬಿಡಿಸಿ: 2/7 + 3/7 = ?",
              pa: "ਹੱਲ ਕਰੋ: 2/7 + 3/7 = ?",
              od: "ସମାଧାନ କରନ୍ତୁ: ୨/୭ + ୩/୭ = ?"
            },
            options: ["5/14", "5/7", "6/7", "1/7"],
            correct: 1,
            explanation: {
              en: "When denominators are identical, simply add numerators: (2 + 3)/7 = 5/7.",
              hi: "जब हर समान हों, तो केवल अंशों को जोड़ते हैं: 2 + 3 = 5, उत्तर 5/7 होगा।"
            }
          }
        ]
      },
      {
        id: "math-c7-ch2",
        title: {
          en: "Percentages & Simple Interest",
          hi: "प्रतिशत एवं साधारण ब्याज",
          mr: "टक्केवारी आणि सरळ व्याज",
          bn: "শতকরা ও সরল সুদ",
          te: "శాతం మరియు సాధారణ వడ్డీ",
          ta: "சதவீதம் மற்றும் தனிவட்டி",
          gu: "ટકાવારી અને સાદુ વ્યાજ",
          kn: "ಶೇಕಡಾವಾರು ಮತ್ತು ಸರಳ ಬಡ್ಡಿ",
          pa: "ਪ੍ਰਤੀਸ਼ਤ ਅਤੇ ਸਧਾਰਨ ਵਿਆਜ",
          od: "ଶତକଡ଼ା ଏବଂ ସରଳ ସୁଧ"
        },
        topicKey: "Percentages",
        sizeKB: 28,
        isDownloaded: false,
        summary: {
          en: "Percentage means 'per hundred'. Learn how village markets, crops, and loans calculate percentages.",
          hi: "प्रतिशत का अर्थ है 'प्रति सैकड़ा'। जाने मंडी के भाव, फसल उपज और ब्याज में प्रतिशत का महत्व।",
          mr: "टक्केवारी म्हणजे 'दर शेकडा'. बाजारभाव, पीक उत्पादन आणि कर्जावरील व्याज समजून घ्या.",
          bn: "শতকরা মানে 'প্রতি একশ'। শস্য উৎপাদন ও ঋণের সুদে এর ব্যবহার জানুন।",
          te: "శాతం అంటే 'ప్రతి వందకు'. మార్కెట్ ధరలు మరియు పంట దిగుబడిలో శాతాన్ని లెక్కించడం నేర్చుకోండి.",
          ta: "சதவீதம் என்றால் 'நூற்றுக்கு' என்று பொருள். சந்தை மற்றும் வட்டி கணக்குகளைப் புரிந்து கொள்ளுங்கள்.",
          gu: "ટકાવારી એટલે 'દર સોએ'. મંડીના ભાવ અને પાક ઉત્પાદનમાં ટકાવારીનું મહત્વ સમજો.",
          kn: "ಶೇಕಡಾವಾರು ಎಂದರೆ 'ಪ್ರತಿ ನೂರಕ್ಕೆ'. ಮಾರುಕಟ್ಟೆ ಮತ್ತು ಬಡ್ಡಿಯಲ್ಲಿ ಇದರ ಬಳಕೆಯನ್ನು ತಿಳಿಯಿರಿ.",
          pa: "ਪ੍ਰਤੀਸ਼ਤ ਦਾ ਅਰਥ ਹੈ 'ਪ੍ਰਤੀ ਸੌ'। ਫ਼ਸਲ ਉਪਜ ਅਤੇ ਮੰਡੀ ਦੇ ਹਿਸਾਬ ਵਿੱਚ ਇਸਦੀ ਵਰਤੋਂ ਸਿੱਖੋ।",
          od: "ଶତକଡ଼ାର ଅର୍ଥ 'ପ୍ରତି ଶହେରେ'। ଫସଲ ଉତ୍ପାଦନ ଏବଂ ସୁଧ ହିସାବରେ ଏହାର ବ୍ୟବହାର ଜାଣନ୍ତୁ।"
        },
        lowDataContent: {
          en: `### 1. Meaning of Percentage
Percentage means **out of 100**. Symbol: **%**
- 25% means 25 out of 100 (or 1/4).
- 50% means half of total.

### 2. Rural Context Example
If a bag of seeds costs ₹500 and the Krishi Kendra offers a **10% discount**:
- Discount = (10/100) × 500 = **₹50**
- Final price = ₹450`,
          hi: `### 1. प्रतिशत का अर्थ
प्रतिशत का मतलब होता है **प्रति 100 में से**। चिन्ह: **%**
- 25% का अर्थ है 100 में से 25 (या 1/4)।
- 50% का अर्थ है कुल का आधा।

### 2. ग्रामीण उदाहरण
यदि बीज की एक बोरी ₹500 की है और कृषि केंद्र पर **10% की छूट** मिल रही है:
- छूट की राशि = (10/100) × 500 = **₹50**
- किसान को देने होंगे = **₹450**`
        },
        audioScript: {
          en: "Percentage means out of 100. Fifty percent means half. To find ten percent of five hundred rupees, multiply ten by five hundred and divide by one hundred, which gives fifty rupees.",
          hi: "प्रतिशत का अर्थ है प्रति 100 में से। पचास प्रतिशत का मतलब आधा होता है। पांच सौ रुपये का दस प्रतिशत निकालने के लिए दस को पांच सौ से गुणा कर सौ से भाग दें, जो पचास रुपये बनता है।",
          mr: "टक्केवारी म्हणजे दर शंभरामागे. पन्नास टक्के म्हणजे निम्मे. पाचशे रुपयांचे दहा टक्के म्हणजे पन्नास रुपये होतात.",
          bn: "শতকরা মানে প্রতি একশতে কত। পাঁচশত টাকার দশ শতাংশ হলো পঞ্চাশ টাকা।",
          te: "శాతం అంటే ప్రతి వందకు ఎంత అని అర్థం. ఐదు వందల రూపాయలలో పది శాతం అంటే యాభై రూపాయలు అవుతుంది.",
          ta: "சதவீதம் என்பது நூற்றுக்கு எவ்வளவு என்பதைக் குறிக்கும். ஐந்நூறு ரூபாயில் பத்து சதவீதம் என்பது ஐம்பது ரூபாய் ஆகும்."
        },
        quiz: [
          {
            id: "q-perc-1",
            question: {
              en: "What is 20% of 200?",
              hi: "200 का 20% कितना होगा?",
              mr: "200 चे 20% किती?",
              bn: "২০০ এর ২০% কত?",
              te: "200 లో 20% ఎంత?",
              ta: "200 இல் 20% எவ்வளவு?",
              gu: "200 ના 20% કેટલા થાય?",
              kn: "200 ರ 20% ಎಷ್ಟು?",
              pa: "200 ਦਾ 20% ਕਿੰਨਾ ਹੋਵੇਗਾ?",
              od: "୨୦୦ ର ୨୦% କେତେ?"
            },
            options: ["20", "40", "50", "10"],
            correct: 1,
            explanation: {
              en: "(20 / 100) * 200 = 40.",
              hi: "(20 / 100) × 200 = 40."
            }
          }
        ]
      }
    ]
  },
  {
    id: "sci-c7",
    subject: "science",
    classGrade: "Class 7",
    title: {
      en: "Class 7 Science",
      hi: "कक्षा 7 विज्ञान",
      mr: "इयत्ता 7 वी विज्ञान",
      bn: "সপ্তম শ্রেণী বিজ্ঞান",
      te: "7వ తరగతి సైన్స్",
      ta: "7ஆம் வகுப்பு அறிவியல்",
      gu: "ધોરણ 7 વિજ્ઞાન",
      kn: "7 ನೇ ತರಗತಿ ವಿಜ್ಞಾನ",
      pa: "ਜਮਾਤ 7ਵੀਂ ਵਿਗਿਆਨ",
      od: "ସପ୍ତମ ଶ୍ରେଣୀ ବିଜ୍ଞାନ"
    },
    icon: "FlaskConical",
    color: "from-emerald-500 to-teal-700",
    chapters: [
      {
        id: "sci-c7-ch1",
        title: {
          en: "Nutrition in Plants (Photosynthesis)",
          hi: "पादपों में पोषण (प्रकाश संश्लेषण)",
          mr: "वनસ્પતીंमधील पोषण (प्रकाशसंश्लेषण)",
          bn: "উদ্ভিদের পুষ্টি (সালোকসংশ্লেষ)",
          te: "మొక్కలలో పోషణ (కిరణజన్య సంయోగక్రియ)",
          ta: "தாவரங்களில் ஊட்டச்சத்து (ஒளிச்சேர்க்கை)",
          gu: "વનસ્પતિમાં પોષણ (પ્રકાશસંશ્લેષણ)",
          kn: "ಸಸ್ಯಗಳಲ್ಲಿ ಪೋಷಣೆ (ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ)",
          pa: "ਪੌਦਿਆਂ ਵਿੱਚ ਪੋਸ਼ਣ (ਪ੍ਰਕਾਸ਼ ਸੰਸ਼ਲੇਸ਼ਣ)",
          od: "ଉଦ୍ଭିଦରେ ପୋଷଣ (ଆଲୋକ ସଂଶ୍ଳେଷଣ)"
        },
        topicKey: "Photosynthesis",
        sizeKB: 26,
        isDownloaded: true,
        summary: {
          en: "How green leaves prepare food using sunlight, water, and air like a solar kitchen.",
          hi: "हरी पत्तियां धूप, पानी और हवा से भोजन कैसे बनाती हैं - प्रकृति की रसोई।",
          mr: "हिरवी पाने सूर्यप्रकाश, पाणी आणि हवेचा वापर करून अन्न कसे तयार करतात ते शिका.",
          bn: "সবুজ পাতা কীভাবে সূর্যালোক, জল এবং বাতাসের সাহায্যে খাদ্য তৈরি করে তা জানুন।",
          te: "ఆకుపచ్చని ఆకులు సూర్యరశ్మి, నీరు మరియు గాలితో ఆహారాన్ని ఎలా తయారుచేస్తాయో తెలుసుకోండి.",
          ta: "சூரிய ஒளி, நீர் மற்றும் காற்றைப் பயன்படுத்தி பச்சை இலைகள் எவ்வாறு உணவைத் தயாரிக்கின்றன என்று அறிக.",
          gu: "લીલા પાંદડા સૂર્યપ્રકાશ, પાણી અને હવા દ્વારા પોતાનો ખોરાક કેવી રીતે બનાવે છે તે સમજો.",
          kn: "ಹಸಿರು ಎಲೆಗಳು ಸೂರ್ಯನ ಬೆಳಕು, ನೀರು ಮತ್ತು ಗಾಳಿಯಿಂದ ಹೇಗೆ ಆಹಾರ ತಯಾರಿಸುತ್ತವೆ ಎಂದು ತಿಳಿಯಿರಿ.",
          pa: "ਹਰੇ ਪੱਤੇ ਧੁੱਪ, ਪਾਣੀ ਅਤੇ ਹਵਾ ਤੋਂ ਭੋਜਨ ਕਿਵੇਂ ਤਿਆਰ ਕਰਦੇ ਹਨ।",
          od: "ସବୁଜ ପତ୍ର ସୂର୍ଯ୍ୟାଲୋକ, ଜଳ ଓ ବାୟୁରୁ କିପରି ଖାଦ୍ୟ ପ୍ରସ୍ତୁତ କରେ ତାହା ଜାଣନ୍ତୁ।"
        },
        lowDataContent: {
          en: `### 1. What is Photosynthesis?
Green plants make their own food using:
1. **Chlorophyll:** Green pigment in leaves.
2. **Sunlight:** Natural solar energy.
3. **Carbon Dioxide (CO2):** Gas absorbed through leaf pores (Stomata).
4. **Water & Minerals:** Absorbed from soil by roots.

### 2. Equation of Food Making
CO2 + Water --[Sunlight + Chlorophyll]--> **Glucose (Food) + Oxygen**`,
          hi: `### 1. प्रकाश संश्लेषण क्या है?
हरे पौधे अपना भोजन स्वयं बनाते हैं:
1. **क्लोरोफिल (पर्णहरित):** पत्तियों में मौजूद हरा रंग जो धूप को सोखता है।
2. **सूर्य का प्रकाश:** प्राकृतिक ऊर्जा का स्रोत।
3. **कार्बन डाइऑक्साइड:** पत्तियों के छिद्रों (रंध्र / Stomata) द्वारा ली जाती है।
4. **जल और खनिज:** जड़ों द्वारा मिट्टी से सोखे जाते हैं।

### 2. रासायनिक प्रक्रिया
CO2 + जल --[धूप + क्लोरोफिल]--> **ग्लूकोज (भोजन) + ऑक्सीजन**`
        },
        audioScript: {
          en: "Plants make their food using sunlight, water, carbon dioxide, and chlorophyll. This process is called photosynthesis. In return, plants release fresh oxygen for us to breathe.",
          hi: "पौधे सूर्य के प्रकाश, पानी, कार्बन डाइऑक्साइड और क्लोरोफिल की मदद से अपना भोजन बनाते हैं। इस प्रक्रिया को प्रकाश संश्लेषण कहते हैं और बदले में वे हमें सांस लेने के लिए ऑक्सीजन देते हैं।",
          mr: "वनस्पती सूर्यप्रकाश, पाणी, कार्बन डायऑक्साइड आणि हरितद्रव्याच्या मदतीने अन्न तयार करतात. या प्रक्रियेला प्रकाशसंश्लेषण म्हणतात.",
          bn: "উদ্ভিদ সূর্যালোক, জল, কার্বন ডাই অক্সাইড এবং ক্লোরোফিলের সাহায্যে খাদ্য তৈরি করে। একে সালোকসংশ্লেষ বলে।",
          te: "మొక్కలు సూర్యరశ్మి, నీరు, కార్బన్ డయాక్సైడ్ మరియు పత్రహరితం సహాయంతో ఆహారాన్ని తయారు చేసుకుంటాయి. దీనిని కిరణజన్య సంయోగక్రియ అంటారు.",
          ta: "தாவரங்கள் சூரிய ஒளி, நீர், கார்பன் டை ஆக்சைடு மற்றும் பச்சையம் ஆகியவற்றைப் பயன்படுத்தி உணவு தயாரிக்கின்றன. இது ஒளிச்சேர்க்கை எனப்படும்."
        },
        quiz: [
          {
            id: "q-sci-1",
            question: {
              en: "Which green pigment in leaves captures sunlight?",
              hi: "पत्तियों में कौन सा हरा वर्णक सूर्य के प्रकाश को अवशोषित करता है?",
              mr: "पानांमधील कोणते हरितद्रव्य सूर्यप्रकाश शोषून घेते?",
              bn: "পাতায় কোন সবুজ রঞ্জক সূর্যালোক শোষণ করে?",
              te: "ఆకులలో సూర్యరశ్మిని గ్రహించే ఆకుపచ్చ వర్ణద్రవ్యం ఏది?",
              ta: "இலைகளில் சூரிய ஒளியை ஈர்க்கும் பச்சை நிறமி எது?",
              gu: "પાંદડામાં કયું લીલું દ્રવ્ય સૂર્યપ્રકાશ શોષે છે?",
              kn: "ಎಲೆಗಳಲ್ಲಿ ಸೂರ್ಯನ ಬೆಳಕನ್ನು ಹೀರಿಕೊಳ್ಳುವ ಹಸಿರು ವರ್ಣದ್ರವ್ಯ ಯಾವುದು?",
              pa: "ਪੱਤਿਆਂ ਵਿੱਚ ਕਿਹੜਾ ਹਰਾ ਤੱਤ ਧੁੱਪ ਨੂੰ ਸੋਖਦਾ ਹੈ?",
              od: "ପତ୍ରରେ ଥିବା କେଉଁ ସବୁଜ କଣିକା ସୂର୍ଯ୍ୟାଲୋକ ଶୋଷଣ କରେ?"
            },
            options: ["Stomata", "Chlorophyll", "Glucose", "Hemoglobin"],
            correct: 1,
            explanation: {
              en: "Chlorophyll is the green pigment that traps sunlight.",
              hi: "क्लोरोफिल पत्तियों में पाया जाने वाला हरा रंगद्रव्य है जो धूप सोखता है।"
            }
          }
        ]
      }
    ]
  },
  {
    id: "eng-c7",
    subject: "english",
    classGrade: "Class 7",
    title: {
      en: "Class 7 English Communication",
      hi: "कक्षा 7 अंग्रेजी संचार व व्याकरण",
      mr: "इयत्ता 7 वी इंग्रजी संवाद",
      bn: "সপ্তম শ্রেণী ইংরেজি যোগাযোগ",
      te: "7వ తరగతి ఆంగ్ల సంభాషణ",
      ta: "7ஆம் வகுப்பு ஆங்கில உரையாடல்",
      gu: "ધોરણ 7 અંગ્રેજી સંવાદ",
      kn: "7 ನೇ ತರಗತಿ ಇಂಗ್ಲಿಷ್ ಸಂವಹನ",
      pa: "ਜਮਾਤ 7ਵੀਂ ਅੰਗਰੇਜ਼ੀ ਸੰਚਾਰ",
      od: "ସପ୍ତମ ଶ୍ରେଣୀ ଇଂରାଜୀ ଯୋଗାଯୋଗ"
    },
    icon: "BookOpen",
    color: "from-sky-500 to-blue-600",
    chapters: [
      {
        id: "eng-c7-ch1",
        title: {
          en: "Everyday English & Self-Introduction",
          hi: "दैनिक बोलचाल व अपना परिचय",
          mr: "दैनंदिन संवाद आणि स्वतःची ओळख",
          bn: "দৈনন্দিন ইংরেজি ও আত্মপরিচয়",
          te: "రోజువారీ ఇంగ్లీష్ & స్వీయ పరిచయం",
          ta: "அன்றாட ஆங்கிலம் & சுய அறிமுகம்",
          gu: "રોજીંદુ અંગ્રેજી અને સ્વ-પરિચય",
          kn: "ದೈನಂದಿನ ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಸ್ವಯಂ ಪರಿಚಯ",
          pa: "ਰੋਜ਼ਾਨਾ ਅੰਗਰੇਜ਼ੀ ਅਤੇ ਆਪਣੀ ਜਾਣ-ਪਛਾਣ",
          od: "ଦୈନନ୍ଦିନ ଇଂରାଜୀ ଏବଂ ଆତ୍ମ ପରିଚୟ"
        },
        topicKey: "English Grammar",
        sizeKB: 18,
        isDownloaded: false,
        summary: {
          en: "Learn to introduce yourself, greet teachers, and ask simple questions politely.",
          hi: "अंग्रेजी में आत्मविश्वास से अपना परिचय देना, अभिवादन करना और सरल सवाल पूछना सीखें।",
          mr: "आत्मविश्वासाने इंग्रजीत स्वतःची ओळख करून देणे आणि साधे प्रश्न विचारणे शिका.",
          bn: "ইংরেজি ভাষায় নিজের পরিচয় দেওয়া ও অভিবাদন জানানো শিখুন।",
          te: "ఇంగ్లీషులో ఆత్మవిశ్వాసంతో మిమ్మల్ని మీరు పరిచయం చేసుకోవడం నేర్చుకోండి.",
          ta: "ஆங்கிலத்தில் உங்களை நம்பிக்கையுடன் அறிமுகப்படுத்த கற்றுக்கொள்ளுங்கள்.",
          gu: "અંગ્રેજીમાં આત્મવિશ્વાસથી પોતાનો પરિચય આપતા શીખો.",
          kn: "ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ನಿಮ್ಮನ್ನು ಪರಿಚಯಿಸಿಕೊಳ್ಳುವುದನ್ನು ಕಲಿಯಿರಿ.",
          pa: "ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਆਪਣੀ ਜਾਣ-ਪਛਾਣ ਕਰਵਾਉਣਾ ਸਿੱਖੋ।",
          od: "ଇଂରାଜୀରେ ନିଜର ପରିଚୟ ଦେବା ଶିଖନ୍ତୁ।"
        },
        lowDataContent: {
          en: `### 1. Greetings in English
- **Good Morning:** 6:00 AM to 12:00 PM (Used with teachers and elders)
- **Good Afternoon:** 12:00 PM to 5:00 PM
- **Good Evening:** 5:00 PM onwards

### 2. How to Introduce Yourself
1. "Hello, my name is **Rohan**."
2. "I study in **Class 7** at Govt School."
3. "My favourite subject is **Mathematics**."
4. "Nice to meet you!"

### 3. Polite Words
Always use:
- **Please:** when requesting something ("Please lend me your pencil.")
- **Thank you:** when receiving help ("Thank you, teacher!")
- **Excuse me:** when seeking attention politely.`,
          hi: `### 1. अंग्रेजी में अभिवादन (Greetings)
- **Good Morning:** सुबह 6 से दोपहर 12 बजे तक (शिक्षकों व बड़ों के लिए)
- **Good Afternoon:** दोपहर 12 से शाम 5 बजे तक
- **Good Evening:** शाम 5 बजे के बाद

### 2. अपना परिचय कैसे दें (Self-Introduction)
1. "Hello, my name is **रोहन**।" (नमस्ते, मेरा नाम रोहन है।)
2. "I study in **Class 7**।" (मैं कक्षा 7 में पढ़ता हूँ।)
3. "My favourite subject is **Science**।" (मेरा प्रिय विषय विज्ञान है।)
4. "Nice to meet you!" (आपसे मिलकर खुशी हुई!)

### 3. विनम्र शब्द (Golden Polite Words)
- **Please:** किसी चीज़ के अनुरोध के लिए ("कृपया...")
- **Thank you:** सहायता मिलने पर ("धन्यवाद!")
- **Sorry:** गलती होने पर क्षमा मांगने के लिए।`
        },
        audioScript: {
          en: "Welcome to English Communication. Today we learn how to introduce ourselves. You can say: Hello, my name is Rohan, and I study in Class 7. Always use polite words like Please and Thank You.",
          hi: "अंग्रेजी संवाद पाठ में आपका स्वागत है। आज हम अपना परिचय देना सीखेंगे। आप कह सकते हैं: Hello, my name is Rohan. हमेशा Please और Thank You जैसे विनम्र शब्दों का प्रयोग करें।"
        },
        quiz: [
          {
            id: "q-eng-1",
            question: {
              en: "What should you say to a teacher at 9:00 in the morning?",
              hi: "सुबह 9 बजे शिक्षक को क्या कहना चाहिए?",
              mr: "सकाळी 9 वाजता शिक्षकांना काय म्हणाल?",
              bn: "সকাল ৯টায় শিক্ষককে কী বলা উচিত?",
              te: "ఉదయం 9 గంటలకు ఉపాధ్యాయుడికి ఏమి చెప్పాలి?",
              ta: "காலை 9 மணிக்கு ஆசிரியரிடம் என்ன சொல்ல வேண்டும்?",
              gu: "સવારે 9 વાગ્યે શિક્ષકને શું કહેવું જોઈએ?",
              kn: "ಬೆಳಿಗ್ಗೆ 9 ಗಂಟೆಗೆ ಶಿಕ್ಷಕರಿಗೆ ಏನು ಹೇಳಬೇಕು?",
              pa: "ਸਵੇਰੇ 9 ਵਜੇ ਅਧਿਆਪਕ ਨੂੰ ਕੀ ਕਹਿਣਾ ਚਾਹੀਦਾ ਹੈ?",
              od: "ସକାଳ ୯ଟାରେ ଶିକ୍ଷକଙ୍କୁ କ’ଣ କହିବା ଉଚିତ?"
            },
            options: ["Good Night", "Good Morning", "Good Evening", "Goodbye"],
            correct: 1,
            explanation: {
              en: "Between 6 AM and 12 PM, we greet with Good Morning.",
              hi: "सुबह 6 से दोपहर 12 बजे तक Good Morning कहा जाता है।"
            }
          }
        ]
      }
    ]
  },
  {
    id: "soc-c7",
    subject: "social",
    classGrade: "Class 7",
    title: {
      en: "Class 7 Social Science & Civics",
      hi: "कक्षा 7 सामाजिक विज्ञान व नागरिक शास्त्र",
      mr: "इयत्ता 7 वी सामाजिक शास्त्र आणि नागरिकशास्त्र",
      bn: "সপ্তম শ্রেণী সমাজবিজ্ঞান ও পৌরবিজ্ঞান",
      te: "7వ తరగతి సాంఘిక శాస్త్రం",
      ta: "7ஆம் வகுப்பு சமூக அறிவியல்",
      gu: "ધોરણ 7 સામાજિક વિજ્ઞાન",
      kn: "7 ನೇ ತರಗತಿ ಸಮಾಜ ವಿಜ್ಞಾನ",
      pa: "ਜਮਾਤ 7ਵੀਂ ਸਮਾਜਿਕ ਵਿਗਿਆਨ",
      od: "ସପ୍ତମ ଶ୍ରେଣୀ ସାମାଜିକ ବିଜ୍ଞାନ"
    },
    icon: "Compass",
    color: "from-emerald-500 to-teal-700",
    chapters: [
      {
        id: "soc-c7-ch1",
        title: {
          en: "Gram Panchayat & Village Governance",
          hi: "ग्राम पंचायत एवं स्थानीय ग्रामीण शासन",
          mr: "ग्रामपंचायत आणि स्थानिक ग्रामीण शासन",
          bn: "গ্রাম পঞ্চায়েত ও স্থানীয় গ্রামীণ শাসন",
          te: "గ్రామ పంచాయతీ & స్థానిక పాలన",
          ta: "கிராம பஞ்சாயத்து & உள்ளாட்சி நிர்வாகம்",
          gu: "ગ્રામ પંચાયત અને સ્થાનિક શાસન",
          kn: "ಗ್ರಾಮ ಪಂಚಾಯತ್ ಮತ್ತು ಸ್ಥಳೀಯ ಆಡಳಿತ",
          pa: "ਗ੍ਰਾਮ ਪੰਚਾਇਤ ਅਤੇ ਪੇਂਡੂ ਪ੍ਰਸ਼ਾਸਨ",
          od: "ଗ୍ରାମ ପଞ୍ଚାୟତ ଏବଂ ଗ୍ରାମୀଣ ପ୍ରଶାସନ"
        },
        topicKey: "Civics",
        sizeKB: 21,
        isDownloaded: false,
        summary: {
          en: "Learn how the Gram Sabha meets, how the Sarpanch/Pradhan is elected, and how village funds are used for schools and handpumps.",
          hi: "जानें कि ग्राम सभा की बैठक कैसे होती है, प्रधान का चुनाव और गांव में स्कूल-नल-सड़क का विकास कैसे होता है।",
          mr: "ग्रामसभेची बैठक कशी होते आणि सरपंचांची निवड कशी होते ते जाणून घ्या.",
          bn: "গ্রামসভা কীভাবে কাজ করে এবং প্রধান কীভাবে নির্বাচিত হয় তা জানুন।",
          te: "గ్రామసభ ఎలా పనిచేస్తుందో మరియు సర్పంచ్ ఎలా ఎన్నికవుతారో తెలుసుకోండి.",
          ta: "கிராம சபை எவ்வாறு செயல்படுகிறது என்பதை அறியுங்கள்.",
          gu: "ગ્રામ પંચાયત અને સરપંચની કામગીરી સમજો.",
          kn: "ಗ್ರಾಮ ಸಭೆ ಮತ್ತು ಪಂಚಾಯತ್ ಕಾರ್ಯವೈಖರಿಯನ್ನು ತಿಳಿಯಿರಿ.",
          pa: "ਗ੍ਰਾਮ ਪੰਚਾਇਤ ਦੇ ਕੰਮਕਾਜ ਬਾਰੇ ਜਾਣੋ।",
          od: "ଗ୍ରାମ ପଞ୍ଚାୟତର କାର୍ଯ୍ୟାବଳୀ ବୁଝନ୍ତୁ।"
        },
        lowDataContent: {
          en: `### 1. What is a Gram Sabha?
The **Gram Sabha** consists of all adult villagers who are 18 years or older and registered to vote in the village.
- The Gram Sabha reviews the work of the Gram Panchayat.
- It prevents the Panchayat from misusing public funds.

### 2. The 3-Tier Panchayati Raj System
1. **Gram Panchayat (Village Level):** Headed by the Sarpanch / Gram Pradhan.
2. **Panchayat Samiti / Block Level:** Coordinates several village panchayats.
3. **Zila Parishad (District Level):** Coordinates development plans for the entire district.

### 3. Key Responsibilities
- Construction and maintenance of water sources, village roads, and school buildings.
- Executing government welfare schemes (MNREGA, scholarship distribution).`,
          hi: `### 1. ग्राम सभा क्या है?
**ग्राम सभा** गांव के उन सभी वयस्क ग्रामीणों की सभा है जिनकी आयु 18 वर्ष या उससे अधिक है और जिनका नाम मतदाता सूची में दर्ज है।
- ग्राम सभा ग्राम पंचायत के कार्यों की निगरानी करती है।
- यह सरकारी धन के सदुपयोग को सुनिश्चित करती है।

### 2. पंचायती राज के तीन स्तर (3-Tiers)
1. **ग्राम पंचायत (ग्राम स्तर):** मुखिया/प्रधान व वार्ड सदस्यों द्वारा संचालित।
2. **क्षेत्र पंचायत/ब्लॉक (प्रखंड स्तर):** कई ग्राम पंचायतों का समूह।
3. **जिला परिषद (जिला स्तर):** पूरे जिले के विकास कार्यों की योजना बनाना।

### 3. ग्राम पंचायत के प्रमुख कार्य
- गांव की गलियों, खड़ंजों, नालियों और हैंडपंपों की मरम्मत।
- प्राथमिक विद्यालय, आंगनवाड़ी और स्वास्थ्य सुविधाओं की देखरेख।`
        },
        audioScript: {
          en: "Welcome to Social Science. Today we explore the Gram Panchayat, our village local government. The Gram Sabha includes all villagers aged 18 and above. They elect the Gram Pradhan to maintain village roads, water pumps, and local schools.",
          hi: "सामाजिक विज्ञान में आपका स्वागत है। आज हम ग्राम पंचायत और स्थानीय शासन के बारे में जानेंगे। 18 वर्ष से अधिक उम्र के सभी ग्रामीण ग्राम सभा के सदस्य होते हैं जो प्रधान का चुनाव करते हैं।"
        },
        quiz: [
          {
            id: "q-soc-1",
            question: {
              en: "What is the minimum age to be a voting member of the Gram Sabha?",
              hi: "ग्राम सभा का मतदाता सदस्य बनने के लिए न्यूनतम आयु क्या है?",
              mr: "ग्रामसभेचे सदस्य होण्यासाठी किमान वय किती असावे?",
              bn: "গ্রামসভার সদস্য হওয়ার জন্য ন্যূনতম বয়স কত?",
              te: "గ్రామసభలో సభ్యుడిగా ఉండటానికి కనీస వయస్సు ఎంత?",
              ta: "கிராம சபை உறுப்பினராக குறைந்தபட்ச வயது என்ன?",
              gu: "ગ્રામસભાના સભ્ય બનવા માટે લઘુત્તમ ઉંમર કેટલી છે?",
              kn: "ಗ್ರಾಮ ಸಭೆಯ ಸದಸ್ಯರಾಗಲು ಕನಿಷ್ಠ ವಯಸ್ಸು ಎಷ್ಟು?",
              pa: "ਗ੍ਰਾਮ ਸਭਾ ਦਾ ਮੈਂਬਰ ਬਣਨ ਲਈ ਘੱਟੋ-ਘੱਟ ਉਮਰ ਕਿੰਨੀ ਹੈ?",
              od: "ଗ୍ରାମସଭାର ସଦସ୍ୟ ହେବା ପାଇଁ ସର୍ବନିମ୍ନ ବୟସ କେତେ?"
            },
            options: ["16 Years", "18 Years", "21 Years", "25 Years"],
            correct: 1,
            explanation: {
              en: "Every Indian citizen aged 18 or above with voting rights in the village is a Gram Sabha member.",
              hi: "18 वर्ष या उससे अधिक आयु के पंजीकृत मतदाता ग्राम सभा के सदस्य होते हैं।"
            }
          }
        ]
      }
    ]
  },
  {
    id: "hindi-c7",
    subject: "hindi",
    classGrade: "Class 7",
    title: {
      en: "Class 7 Hindi Literature (Vasant)",
      hi: "कक्षा 7 हिंदी साहित्य (वसंत भाग-2)",
      mr: "इयत्ता 7 वी हिंदी साहित्य",
      bn: "সপ্তম শ্রেণী হিন্দি সাহিত্য",
      te: "7వ తరగతి హిందీ సాహిత్యం",
      ta: "7ஆம் வகுப்பு இந்தி இலக்கியம்",
      gu: "ધોરણ 7 હિન્દી સાહિત્ય",
      kn: "7 ನೇ ತರಗತಿ ಹಿಂದಿ ಸಾಹಿತ್ಯ",
      pa: "ਜਮਾਤ 7ਵੀਂ ਹਿੰਦੀ ਸਾਹਿਤ",
      od: "ସପ୍ତମ ଶ୍ରେଣୀ ହିନ୍ଦୀ ସାହିତ୍ୟ"
    },
    icon: "BookOpen",
    color: "from-rose-500 to-red-600",
    chapters: [
      {
        id: "hindi-c7-ch1",
        title: {
          en: "Hum Panchhi Unmukt Gagan Ke (Poem)",
          hi: "हम पंछी उन्मुक्त गगन के (कविता)",
          mr: "आम्ही मुक्त आकाशातील पक्षी (कविता)",
          bn: "আমরা মুক্ত আকাশের পাখি (কবিতা)",
          te: "మేము స్వేచ్ఛా పక్షులం (కవిత)",
          ta: "நாங்கள் சுதந்திரப் பறவைகள் (கவிதை)",
          gu: "અમે મુક્ત આકાશના પંખી (કાવ્ય)",
          kn: "ನಾವು ಮುಕ್ತ ಆಕಾಶದ ಹಕ್ಕಿಗಳು (ಕವಿತೆ)",
          pa: "ਅਸੀਂ ਮੁਕਤ ਅਸਮਾਨ ਦੇ ਪੰਛੀ (ਕਵਿਤਾ)",
          od: "ଆମେ ମୁକ୍ତ ଆକାଶର ପକ୍ଷୀ (କବିତା)"
        },
        topicKey: "Hindi Poetry",
        sizeKB: 19,
        isDownloaded: false,
        summary: {
          en: "Dr. Shivmangal Singh 'Suman's poetic masterpiece celebrating the joy of freedom over gold cages.",
          hi: "डॉ. शिवमंगल सिंह 'सुमन' द्वारा रचित प्रसिद्ध कविता जो सोने के पिंजरे से बेहतर आज़ादी की उड़ान को बताती है।",
          mr: "स्वातंत्र्याचे मोल समजावणारी प्रसिद्ध कविता.",
          bn: "স্বাধীনতার আনন্দ প্রকাশ করে ড. শিবমঙ্গল সিংহের বিখ্যাত কবিতা।",
          te: "స్వేచ్ఛ యొక్క ప్రాముఖ్యతను వివరించే కవిత.",
          ta: "சுதந்திரத்தின் பெருமையை விளக்கும் கவிதை.",
          gu: "સ્વાતંત્ર્યનું મહત્વ સમજાવતી સુંદર કવિતા.",
          kn: "ಸ್ವಾತಂತ್ರ್ಯದ ಮಹತ್ವವನ್ನು ಸಾರುವ ಕವನ.",
          pa: "ਆਜ਼ਾਦੀ ਦੀ ਮਹੱਤਤਾ ਦਰਸਾਉਂਦੀ ਪ੍ਰਸਿੱਧ ਕਵਿਤਾ।",
          od: "ସ୍ୱାଧୀନତାର ମହତ୍ତ୍ୱ ବର୍ଣ୍ଣନା କରୁଥିବା କବିତା।"
        },
        lowDataContent: {
          en: `### 1. Poem Theme: Freedom & Nature
The poet speaks in the voice of caged birds who declare that they cannot sing in captivity, even if kept in cages of gold.

### 2. Key Stanzas
*"हम पंछी उन्मुक्त गगन के, पिंजरबद्ध न गा पाएँगे।*
*कनक-तीलियों से टकराकर, पुलकित पंख टूट जाएँगे।..."*

### 3. Word Meanings (शब्दार्थ)
- **उन्मुक्त (Unmukt):** Open / Free (खुला / आज़ाद)
- **कनक (Kanak):** Gold (सोना)
- **कटुक निंबौरी (Katuk Nimbouri):** Bitter neem fruit (नीम का कड़वा फल)
- **नीड़ (Need):** Nest (घोंसला)`,
          hi: `### 1. कविता का मूल भाव
इस कविता में कवि डॉ. शिवमंगल सिंह 'सुमन' ने पक्षियों के माध्यम से आज़ादी के महत्व को दर्शाया है। पक्षी कहते हैं कि सोने के पिंजरे में बंद रहकर वे गा नहीं पाएंगे।

### 2. प्रमुख पंक्तियाँ
*"हम पंछी उन्मुक्त गगन के,*
*पिंजरबद्ध न गा पाएँगे।*
*कनक-तीलियों से टकराकर,*
*पुलकित पंख टूट जाएँगे।..."*

### 3. कठिन शब्दार्थ
- **उन्मुक्त:** खुला, बंधनमुक्त।
- **कनक:** सोना (Gold)।
- **कटुक निंबौरी:** नीम का कड़वा फल।
- **नीड़:** घोंसला (आश्रय)।`
        },
        audioScript: {
          en: "Welcome to Hindi Literature. Today we recite the poem 'Hum Panchhi Unmukt Gagan Ke' by Dr. Shivmangal Singh Suman. The poem teaches us that freedom is precious for every living creature, even more valuable than gold bowls.",
          hi: "हिंदी साहित्य में आपका स्वागत है। आज हम डॉ. शिवमंगल सिंह 'सुमन' की कविता 'हम पंछी उन्मुक्त गगन के' सुनेंगे। यह कविता आज़ादी और स्वाभिमान का संदेश देती है।"
        },
        quiz: [
          {
            id: "q-hin-1",
            question: {
              en: "What does the word 'कनक' (Kanak) mean in the poem?",
              hi: "कविता में 'कनक' शब्द का क्या अर्थ है?",
              mr: "कवितेत 'कनक' शब्दाचा अर्थ काय आहे?",
              bn: "কবিতায় 'কনক' শব্দের অর্থ কী?",
              te: "కవితలో 'కనక్' పదానికి అర్థం ఏమిటి?",
              ta: "கவிதையில் 'கனக்' என்ற சொல்லின் பொருள் என்ன?",
              gu: "કવિતામાં 'કનક' શબ્દનો અર્થ શું છે?",
              kn: "ಕವಿತೆಯಲ್ಲಿ 'ಕನಕ' ಪದದ ಅರ್ಥವೇನು?",
              pa: "ਕਵਿਤਾ ਵਿੱਚ 'ਕਨਕ' ਸ਼ਬਦ ਦਾ ਕੀ ਅਰਥ ਹੈ?",
              od: "କବିତାରେ 'କନକ' ଶବ୍ଦର ଅର୍ଥ କ’ଣ?"
            },
            options: ["लोहा (Iron)", "सोना (Gold)", "चांदी (Silver)", "लकड़ी (Wood)"],
            correct: 1,
            explanation: {
              en: "'कनक' means Gold (सोना).",
              hi: "'कनक' का अर्थ सोना (Gold) होता है।"
            }
          }
        ]
      }
    ]
  },
  {
    id: "comp-c7",
    subject: "computer",
    classGrade: "Class 7",
    title: {
      en: "Class 7 Digital Literacy & Cyber Safety",
      hi: "कक्षा 7 डिजिटल साक्षरता व साइबर सुरक्षा",
      mr: "इयत्ता 7 वी डिजिटल साक्षरता",
      bn: "সপ্তম শ্রেণী ডিজিটাল সাক্ষরতা",
      te: "7వ తరగతి డిజిటల్ అక్షరాస్యత",
      ta: "7ஆம் வகுப்பு டிஜிட்டல் எழுத்தறிவு",
      gu: "ધોરણ 7 ડિજિટલ સાક્ષરતા",
      kn: "7 ನೇ ತರಗತಿ ಡಿಜಿಟಲ್ ಸಾಕ್ಷರತೆ",
      pa: "ਜਮਾਤ 7ਵੀਂ ਡਿਜੀਟਲ ਸਾਖਰਤਾ",
      od: "ସପ୍ତମ ଶ୍ରେଣୀ ଡିଜିଟାଲ ସାକ୍ଷରତା"
    },
    icon: "Cpu",
    color: "from-indigo-500 to-purple-600",
    chapters: [
      {
        id: "comp-c7-ch1",
        title: {
          en: "Smartphone Basics & Safe UPI / Internet",
          hi: "स्मार्टफोन मूल बातें व सुरक्षित UPI/इंटरनेट",
          mr: "स्मार्टफोन आणि सुरक्षित इंटरनेट वापर",
          bn: "স্মার্টফোন ও নিরাপদ ইন্টারনেট ব্যবহার",
          te: "స్మార్ట్‌ఫోన్ & సురక్షిత ఇంటర్నెట్",
          ta: "ஸ்மார்ட்போன் & பாதுகாப்பான இணையம்",
          gu: "સ્માર્ટફોન અને સુરક્ષિત ઇન્ટરનેટ",
          kn: "ಸ್ಮಾರ್ಟ್‌ಫೋನ್ ಮತ್ತು ಸುರಕ್ಷಿತ ಇಂಟರ್ನೆಟ್",
          pa: "ਸਮਾਰਟਫੋਨ ਅਤੇ ਸੁਰੱਖਿਅਤ ਇੰਟਰਨੈੱਟ",
          od: "ସ୍ମାର୍ଟଫୋନ୍ ଏବଂ ସୁରକ୍ଷିତ ଇଣ୍ଟରନେଟ୍"
        },
        topicKey: "Cyber Safety",
        sizeKB: 20,
        isDownloaded: false,
        summary: {
          en: "Crucial digital skills: safe QR code scanning, never sharing bank OTP, creating strong passwords, and avoiding cyber fraud.",
          hi: "जरूरी डिजिटल ज्ञान: सुरक्षित QR कोड स्कैनिंग, बैंक OTP कभी साझा न करना, मजबूत पासवर्ड और साइबर फ्रॉड से बचाव।",
          mr: "सुरक्षित इंटरनेट, ओटीपी सुरक्षा आणि सायबर फसवणुकीपासून बचाव शिका.",
          bn: "নিরাপদ কিউআর কোড স্ক্যানিং ও ওটিপি সুরক্ষার নিয়ম জানুন।",
          te: "సురక్షితమైన ఇంటర్నెట్ మరియు సైబర్ భద్రతా పద్ధతులను తెలుసుకోండి.",
          ta: "பாதுகாப்பான இணையப் பயன்பாடு மற்றும் சைபர் பாதுகாப்பு விதிகள்.",
          gu: "ઓનલાઇન છેતરપિંડીથી બચવા માટે ડિજિટલ જાગૃતિ.",
          kn: "ಸೈಬರ್ ಸುರಕ್ಷತೆ ಮತ್ತು ಆನ್‌ಲೈನ್ ವಂಚನೆಗಳಿಂದ ರಕ್ಷಣೆ.",
          pa: "ਸਾਈਬਰ ਧੋਖਾਧੜੀ ਤੋਂ ਬਚਣ ਦੇ ਤਰੀਕੇ ਸਿੱਖੋ।",
          od: "ସାଇବର ନିରାପତ୍ତା ଏବଂ ସୁରକ୍ଷିତ ଇଣ୍ଟରନେଟ୍ ବ୍ୟବହାର।"
        },
        lowDataContent: {
          en: `### 1. Digital India: What is a QR Code?
A **QR (Quick Response) Code** is a matrix barcode that can be scanned using a smartphone camera.
- Scanning a merchant QR lets you make payments via UPI without cash.
- **Golden Rule:** To *RECEIVE* money, you NEVER need to enter your UPI PIN or scan a QR code!

### 2. OTP Security (One-Time Password)
- Never share OTP or PIN with anyone, even if someone claims to be a bank manager or school officer on the phone.
- Banks NEVER ask for OTP or passwords over phone calls.

### 3. Cyber Safety Rules
1. Never click on unknown lottery or free recharge links received on WhatsApp or SMS.
2. Use strong passwords combining letters, numbers, and symbols.`,
          hi: `### 1. क्यूआर कोड (QR Code) क्या है?
**QR कोड** एक विशेष चौकोर कोड होता है जिसे फोन के कैमरे से स्कैन किया जाता है।
- **सुनहरा नियम (Golden Rule):** किसी से पैसे *प्राप्त करने (Receive)* के लिए कभी भी UPI PIN दर्ज नहीं करना पड़ता! PIN केवल पैसे भेजने (Send) के समय डाला जाता है।

### 2. ओटीपी (OTP) सुरक्षा
- फोन पर बैंक कर्मचारी या सरकारी अधिकारी बनकर कॉल करने वाले किसी भी व्यक्ति को OTP या पिन कभी न बताएं।
- कोई भी बैंक फोन पर OTP नहीं मांगता।

### 3. साइबर सुरक्षा के जरूरी नियम
1. WhatsApp या SMS पर आए "मुफ्त रिचार्ज" या "लॉटरी" वाले अज्ञात लिंक पर कभी क्लिक न करें।
2. अपना फोन पासवर्ड या फिंगरप्रिंट लॉक हमेशा सक्रिय रखें।`
        },
        audioScript: {
          en: "Welcome to Digital Literacy. Always remember the golden rule of cyber safety: Never share your OTP with anyone, and never enter your UPI PIN to receive money. Stay alert against fraud messages.",
          hi: "डिजिटल साक्षरता में आपका स्वागत है। हमेशा याद रखें: पैसे प्राप्त करने के लिए कभी UPI PIN न डालें, और फोन पर किसी को भी अपना बैंक OTP न बताएं। साइबर धोखाधड़ी से सावधान रहें।"
        },
        quiz: [
          {
            id: "q-comp-1",
            question: {
              en: "Do you need to enter your UPI PIN to RECEIVE money in your bank account?",
              hi: "क्या अपने बैंक खाते में पैसे प्राप्त करने के लिए UPI PIN दर्ज करने की आवश्यकता होती है?",
              mr: "खात्यात पैसे मिळवण्यासाठी यूपीआय पिन टाकण्याची गरज असते का?",
              bn: "ব্যাংক একাউন্টে টাকা পেতে কি ইউপিআই পিন দিতে হয়?",
              te: "బ్యాంకులో డబ్బులు పొందడానికి UPI పిన్ ఎంటర్ చేయాలా?",
              ta: "பணம் பெற UPI PIN உள்ளிட வேண்டுமா?",
              gu: "પૈસા મેળવવા માટે UPI PIN નાખવાની જરૂર છે?",
              kn: "ಹಣ ಪಡೆಯಲು UPI ಪಿನ್ ನಮೂದಿಸಬೇಕೆ?",
              pa: "ਕੀ ਪੈਸੇ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ UPI PIN ਦਰਜ ਕਰਨ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ?",
              od: "ଟଙ୍କା ପାଇବା ପାଇଁ UPI PIN ଦେବା ଆବଶ୍ୟକ କି?"
            },
            options: [
              "No, NEVER enter PIN to receive money",
              "Yes, always enter PIN",
              "Only on Sundays",
              "Only for large amounts"
            ],
            correct: 0,
            explanation: {
              en: "UPI PIN is ONLY entered when SENDING money or deducting from your account.",
              hi: "पिन केवल पैसे भेजने या कटौती के समय डाला जाता है, पैसे आने पर कभी नहीं।"
            }
          }
        ]
      }
    ]
  }
];

export const diagnosticQuestions = [
  {
    id: "diag-1",
    topic: "Fractions",
    question: {
      en: "Which fraction represents half of an object?",
      hi: "कौन सी भिन्न किसी वस्तु के आधे भाग को दर्शाती है?",
      mr: "कोणता अपूर्णांक वस्तूचा अर्धा भाग दर्शवतो?",
      bn: "কোন ভগ্নাংশটি কোনো বস্তুর অর্ধেক অংশ প্রকাশ করে?",
      te: "ఏ భిన్నం ఒక వస్తువు యొక్క సగ భాగాన్ని సూచిస్తుంది?",
      ta: "எந்த பின்னம் ஒரு பொருளின் பாதியை குறிக்கிறது?",
      gu: "કયો અપૂર્ણાંક કોઈપણ વસ્તુનો અડધો ભાગ દર્શાવે છે?",
      kn: "ಯಾವ ಭಿನ್ನರಾಶಿಯು ವಸ್ತುವಿನ ಅರ್ಧ ಭಾಗವನ್ನು ಪ್ರತಿನಿಧಿಸುತ್ತದೆ?",
      pa: "ਕਿਹੜੀ ਭਿੰਨ ਕਿਸੇ ਚੀਜ਼ ਦੇ ਅੱਧੇ ਹਿੱਸੇ ਨੂੰ ਦਰਸਾਉਂਦੀ ਹੈ?",
      od: "କେଉଁ ଭଗ୍ନାଂଶଟି କୌଣସି ବସ୍ତୁର ଅଧା ଭାଗକୁ ଦର୍ଶାଏ?"
    },
    options: ["1/4", "1/2", "3/4", "2/1"],
    correct: 1
  },
  {
    id: "diag-2",
    topic: "Fractions",
    question: {
      en: "Calculate: 1/4 + 2/4 = ?",
      hi: "गणना करें: 1/4 + 2/4 = ?",
      mr: "गणना करा: 1/4 + 2/4 = ?",
      bn: "গণনা করুন: ১/৪ + ২/৪ = ?",
      te: "లెక్కించండి: 1/4 + 2/4 = ?",
      ta: "கணக்கிடுங்கள்: 1/4 + 2/4 = ?",
      gu: "ગણતરી કરો: 1/4 + 2/4 = ?",
      kn: "ಲೆಕ್ಕ ಹಾಕಿ: 1/4 + 2/4 = ?",
      pa: "ਹਿਸਾਬ ਲਗਾਓ: 1/4 + 2/4 = ?",
      od: "ଗଣନା କରନ୍ତୁ: ୧/୪ + ୨/୪ = ?"
    },
    options: ["3/8", "3/4", "1/2", "2/4"],
    correct: 1
  },
  {
    id: "diag-3",
    topic: "Percentages",
    question: {
      en: "How would you write 50% as a fraction in simplest form?",
      hi: "50% को सबसे सरल भिन्न के रूप में कैसे लिखेंगे?",
      mr: "50% ला सर्वात सोप्या अपूर्णांकात कसे लिहाल?",
      bn: "৫০% কে সরল ভগ্নাংশে কীভাবে লিখবেন?",
      te: "50% ని సరళమైన భిన్నంగా ఎలా వ్రాస్తారు?",
      ta: "50% ஐ எளிய பின்னமாக எவ்வாறு எழுதுவீர்கள்?",
      gu: "50% ને સાદા અપૂર્ણાંકમાં કેવી રીતે લખશો?",
      kn: "50% ಅನ್ನು ಸರಳ ಭಿನ್ನರಾಶಿಯಾಗಿ ಹೇಗೆ ಬರೆಯುವಿರಿ?",
      pa: "50% ਨੂੰ ਸਰਲ ਭਿੰਨ ਦੇ ਰੂਪ ਵਿੱਚ ਕਿਵੇਂ ਲਿਖੋਗੇ?",
      od: "୫୦% କୁ ସରଳ ଭଗ୍ନାଂଶ ଆକାରରେ କିପରି ଲେଖିବେ?"
    },
    options: ["50/10", "1/4", "1/2", "5/100"],
    correct: 2
  },
  {
    id: "diag-4",
    topic: "Percentages",
    question: {
      en: "A student scored 40 marks out of 50 in an exam. What is their percentage?",
      hi: "एक छात्र ने 50 में से 40 अंक प्राप्त किए। उसका प्रतिशत क्या है?",
      mr: "एका विद्यार्थ्याला 50 पैकी 40 गुण मिळाले. त्याची टक्केवारी किती?",
      bn: "৫০ এর মধ্যে ৪০ পেলে শতকরা কত নম্বর পাওয়া হলো?",
      te: "50 కి 40 మార్కులు వస్తే శాతం ఎంత?",
      ta: "50க்கு 40 மதிப்பெண்கள் பெற்றால் சதவீதம் எவ்வளவு?",
      gu: "50 માંથી 40 ગુણ મળ્યા હોય તો ટકાવારી કેટલી?",
      kn: "50 ಕ್ಕೆ 40 ಅಂಕ ಪಡೆದರೆ ಶೇಕಡಾವಾರು ಎಷ್ಟು?",
      pa: "50 ਵਿੱਚੋਂ 40 ਅੰਕ ਮਿਲਣ ਤੇ ਪ੍ਰਤੀਸ਼ਤ ਕਿੰਨਾ ਹੋਵੇਗਾ?",
      od: "୫୦ ରୁ ୪୦ ନମ୍ବର ପାଇଲେ ଶତକଡ଼ା କେତେ ହେବ?"
    },
    options: ["40%", "75%", "80%", "90%"],
    correct: 2
  },
  {
    id: "diag-5",
    topic: "Decimals",
    question: {
      en: "Which number is greater: 0.7 or 0.07?",
      hi: "इनमें से कौन सी संख्या बड़ी है: 0.7 या 0.07?",
      mr: "0.7 आणि 0.07 यांपैकी कोणती संख्या मोठी आहे?",
      bn: "০.৭ নাকি ০.০৭ - কোন সংখ্যাটি বড়?",
      te: "0.7 లేదా 0.07 - వీటిలో ఏది పెద్దది?",
      ta: "0.7 அல்லது 0.07 - இதில் எது பெரியது?",
      gu: "0.7 કે 0.07 માંથી કઈ સંખ્યા મોટી છે?",
      kn: "0.7 ಅಥವಾ 0.07 - ಇವುಗಳಲ್ಲಿ ಯಾವುದು ದೊಡ್ಡದು?",
      pa: "0.7 ਜਾਂ 0.07 ਵਿੱਚੋਂ ਕਿਹੜਾ ਵੱਡਾ ਹੈ?",
      od: "୦.୭ କିମ୍ବା ୦.୦୭ - କେଉଁଟି ବଡ଼?"
    },
    options: ["0.07", "0.7", "Both are equal", "Cannot say"],
    correct: 1
  },
  {
    id: "diag-6",
    topic: "Geometry",
    question: {
      en: "What is the perimeter of a square with side length 5 cm?",
      hi: "5 सेमी भुजा वाले वर्ग का परिमाप क्या होगा?",
      mr: "5 सेमी बाजू असलेल्या चौरसाची परिमिती किती?",
      bn: "৫ সেমি বাহুবিশিষ্ট বর্গের পরিসীমা কত?",
      te: "5 సెం.మీ భుజం గల చతురస్రం చుట్టుకొలత ఎంత?",
      ta: "5 செ.மீ பக்க அளவு கொண்ட சதுரத்தின் சுற்றளவு என்ன?",
      gu: "5 સેમી બાજુવાળા ચોરસની પરિમિતિ કેટલી?",
      kn: "5 ಸೆಂ.ಮೀ ಬದಿಯ ಚೌಕದ ಪರಿಧಿ ಎಷ್ಟು?",
      pa: "5 ਸਮ ਭੁਜਾ ਵਾਲੇ ਵਰਗ ਦਾ ਘੇਰਾ ਕਿੰਨਾ ਹੋਵੇਗਾ?",
      od: "୫ ସେମି ବାହୁ ଥିବା ବର୍ଗକ୍ଷେତ୍ରର ପରିସୀମା କେତେ?"
    },
    options: ["10 cm", "20 cm", "25 cm", "15 cm"],
    correct: 1
  }
];

export const mockStudents = [
  {
    id: "stu-1",
    name: "Rahul Kumar",
    rollNo: "07",
    classGrade: "Class 7A",
    overallScore: 42,
    lastActive: "Today, 10:15 AM",
    weakTopics: ["Fractions", "Percentages"],
    status: "Needs Remedial Attention",
    syncStatus: "Synced"
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
    syncStatus: "Synced"
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
    syncStatus: "1 Quiz Pending Offline"
  },
  {
    id: "stu-4",
    name: "Rohan Verma (You)",
    rollNo: "24",
    classGrade: "Class 7A",
    overallScore: 72,
    lastActive: "Active Now",
    weakTopics: ["Fractions (In Progress)"],
    status: "On Track",
    syncStatus: "Synced"
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
    syncStatus: "Synced"
  }
];

export const prebuiltAiDoubtAnswers = [
  {
    triggerWords: ["fraction", "भिन्न", "अपूर्णांक", "ভগ্নাংশ", "భిన్నం", "பின்னம்", "kya hai", "kya hote"],
    response: {
      en: "Think of a fraction like a fresh round roti! 🫓 If your mother cuts it into 4 equal slices and gives you 1 slice, you have 1/4 (one-fourth) of the roti. The bottom number (4) tells total parts made, and the top number (1) tells parts you took.",
      hi: "भिन्न को एक ताज़ी गोल रोटी की तरह समझें! 🫓 यदि आपकी माता जी उसे 4 बराबर हिस्सों में काटकर आपको 1 टुकड़ा दें, तो आपके पास रोटी का 1/4 (एक-चौथाई) हिस्सा है। नीचे की संख्या (4) कुल टुकड़ों को दर्शाती है और ऊपर की संख्या (1) आपको मिले टुकड़े को।",
      mr: "अपूर्णांकाला एका गरमागरम गोल भाकरीसारखे समजा! 🫓 जर आईने तिचे 4 समान तुकडे केले आणि तुम्हाला 1 तुकडा दिला, तर तुमच्याकडे भाकरीचा 1/4 भाग आहे. खालची संख्या (4) एकूण तुकडे दर्शवते आणि वरची संख्या (1) मिळालेला तुकडा दर्शवते.",
      bn: "ভগ্নাংশকে একটি রুটির মতো মনে করুন! 🫓 একটি রুটিকে ৪টি সমান টুকরো করে ১টি টুকরো নিলে আপনি পেলেন ১/৪ অংশ। নিচের সংখ্যা (৪) মোট টুকরো এবং উপরের সংখ্যা (১) আপনার নেওয়া অংশ বোঝায়।",
      te: "భిన్నాన్ని ఒక తాజా రొట్టెలా ఊహించుకోండి! 🫓 4 సమాన భాగాలుగా చేసి 1 ముక్క తీసుకుంటే అది 1/4 భాగం. కింద సంఖ్య (4) మొత్తం భాగాలను, పై సంఖ్య (1) తీసుకున్న భాగాన్ని సూచిస్తుంది.",
      ta: "பின்னத்தை ஒரு ரொட்டி போல கற்பனை செய்யுங்கள்! 🫓 4 சம துண்டுகளாக வெட்டி 1 துண்டு எடுத்தால் அது 1/4 ஆகும். கீழ் எண் (4) மொத்த துண்டுகளையும், மேல் எண் (1) எடுத்த துண்டையும் குறிக்கும்."
    }
  },
  {
    triggerWords: ["photosynthesis", "प्रकाश संश्लेषण", "प्रकाशसंश्लेषण", "সালোকসংশ্লেষ", "కిరణజన్య", "ஒளிச்சேர்க்கை", "food", "khana", "plant"],
    response: {
      en: "Photosynthesis is the plant's solar kitchen! 🌿 Just like cooking in a village hearth requires wood, flour, and water: green leaves use sunlight (heat), chlorophyll (vessel), water from soil, and carbon dioxide from air to prepare glucose food. They also gift us pure oxygen to breathe!",
      hi: "प्रकाश संश्लेषण पौधों की प्राकृतिक सौर रसोई है! 🌿 जैसे चूल्हे पर रोटी बनाने के लिए आग, आटा और पानी चाहिए, वैसे ही हरी पत्तियां धूप (ऊर्जा), पत्तियों का हरा रंग (क्लोरोफिल), मिट्टी से पानी और हवा से कार्बन डाइऑक्साइड लेकर अपना भोजन बनाती हैं। साथ ही हमें शुद्ध ऑक्सीजन देती हैं!",
      mr: "प्रकाशसंश्लेषण हे वनस्पतींचे सौर स्वयंपाकघर आहे! 🌿 हिरवी पाने सूर्यप्रकाश, क्लोरोफिल, पाणी आणि हवेतील कार्बन डायऑक्साइड वापरून अन्न तयार करतात आणि आपल्याला ऑक्सिजन देतात!",
      bn: "সালোকসংশ্লেষ হলো উদ্ভিদের প্রাকৃতিক রান্নাঘর! 🌿 সবুজ পাতা সূর্যালোক, জল এবং কার্বন ডাই অক্সাইডের সাহায্যে খাদ্য তৈরি করে এবং আমাদের জন্য অক্সিজেন নির্গত করে।",
      te: "కిరణజన్య సంయోగక్రియ మొక్కల సహజ వంటగది! 🌿 ఆకులు సూర్యరశ్మి, నీరు మరియు కార్బన్ డయాక్సైడ్ ఉపయోగించి ఆహారాన్ని తయారు చేసి, మనకు ఆక్సిజన్ ఇస్తాయి.",
      ta: "ஒளிச்சேர்க்கை என்பது தாவரங்களின் இயற்கை சமையலறை! 🌿 இலைகள் சூரிய ஒளி, நீர் மற்றும் கார்பன் டை ஆக்சைடைப் பயன்படுத்தி உணவை உருவாக்கி, நமக்கு ஆக்ஸிஜனைத் தருகின்றன."
    }
  },
  {
    triggerWords: ["percentage", "प्रतिशत", "टक्केवारी", "শতকরা", "శాతం", "சதவீதம்", "percent", "vyaj"],
    response: {
      en: "Percentage literally means 'how much out of 100'. If in a harvest of 100 quintals of wheat, 20 quintals are sold at the mandi, that is 20%! It makes comparing crops or test marks very easy.",
      hi: "प्रतिशत का सीधा मतलब है '100 में से कितना'। यदि 100 बोरी गेहूं में से 20 बोरी मंडी में बिक गई, तो वह 20% बिका! इससे अलग-अलग चीजों या अंकों की तुलना करना बहुत आसान हो जाता है।",
      mr: "टक्केवारी म्हणजे '100 पैकी किती'. 100 पोती गव्हापैकी 20 पोती विकली गेली तर ती 20% विक्री झाली. यामुळे तुलना करणे सोपे होते.",
      bn: "শতকরা মানে '১০০ এর মধ্যে কত'। ১০০ বস্তা ধানের মধ্যে ২০ বস্তা বিক্রি হলে তা ২০%। এর মাধ্যমে হিসাব করা সহজ হয়।",
      te: "శాతం అంటే 'ప్రతి 100కి ఎంత'. 100 బస్తాల ధాన్యంలో 20 బస్తాలు అమ్మితే అది 20% అన్నమాట.",
      ta: "சதவீதம் என்பது '100க்கு எவ்வளவு' என்பதாகும். 100 மூட்டை நெல்லில் 20 மூட்டை விற்றால் அது 20% ஆகும்."
    }
  }
];
