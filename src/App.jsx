import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { StudentView } from './components/StudentView';
import { TeacherView } from './components/TeacherView';
import { ParentView } from './components/ParentView';
import { AdminView } from './components/AdminView';
import { AuthModal } from './components/AuthModal';
import { DiagnosticModal } from './components/DiagnosticModal';
import { LessonModal } from './components/LessonModal';
import { AiSaathiChat } from './components/AiSaathiChat';
import { SystemArchitectureModal } from './components/SystemArchitectureModal';
import { DownloadsModal } from './components/DownloadsModal';
import { ProfileEditModal } from './components/ProfileEditModal';
import { HelpSupportModal } from './components/HelpSupportModal';
import { CheckCircle, AlertCircle, RefreshCw, LogIn, Sparkles, GraduationCap, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { supportedLanguages } from './data/mockData';
import bannerImg from './assets/gyansetu-banner.png';

export function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('gyansetu_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      id: 'stu-4',
      name: 'Rohan Verma',
      role: 'student',
      grade: 'Class 7A',
      rollNo: '24',
      school: 'Govt Upper Primary School Rampur',
      avatar: '🎓'
    };
  });

  const [role, setRole] = useState('student'); // 'student' | 'teacher' | 'parent' | 'admin'
  const [lang, setLang] = useState('en'); // default language is English
  const [isOffline, setIsOffline] = useState(false);
  const [isLowData, setIsLowData] = useState(true); // default to low-data mode
  const [pendingSyncCount, setPendingSyncCount] = useState(1);
  const [downloadedIds, setDownloadedIds] = useState(['math-c7-ch1', 'sci-c7-ch1']);
  const [toastMessage, setToastMessage] = useState(null);

  // Diagnostic State
  const [diagnosticData, setDiagnosticData] = useState({
    completed: true,
    weakTopics: ['Fractions (भिन्न)', 'Percentages (प्रतिशत)'],
    masteredTopics: ['Decimals (दशमलव)', 'Geometry']
  });

  // Student Gamification & Mastery State
  const [studentStats, setStudentStats] = useState({
    streakDays: 4,
    pointsXP: 350,
    subjectProgress: {
      math: 72,
      science: 81,
      english: 64
    }
  });

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [isAiSaathiOpen, setIsAiSaathiOpen] = useState(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [isDownloadsOpen, setIsDownloadsOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveProfile = (updatedUser) => {
    setCurrentUser(updatedUser);
    try {
      localStorage.setItem('gyansetu_user', JSON.stringify(updatedUser));
    } catch (e) {}
    if (updatedUser.language && updatedUser.language !== lang) {
      setLang(updatedUser.language);
    }
    showToast(lang === 'hi' ? '✨ प्रोफ़ाइल विवरण सफलतापूर्वक अपडेट हो गया!' : '✨ Profile details updated successfully!');
  };

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setRole(userData.role);
    if (userData.language) {
      setLang(userData.language);
    }
    showToast(`Welcome ${userData.name}! Logged in as ${userData.role}.`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthModalOpen(true);
    showToast(lang === 'hi' ? 'सफलतापूर्वक लॉगआउट हुए।' : 'Logged out successfully.');
  };

  // Toggle download in IndexedDB / local state
  const handleToggleDownload = (chapterId) => {
    if (downloadedIds.includes(chapterId)) {
      setDownloadedIds(downloadedIds.filter(id => id !== chapterId));
      showToast(lang === 'hi' ? 'अध्याय डिवाइस मेमोरी से हटा दिया गया' : 'Chapter removed from offline cache');
    } else {
      setDownloadedIds([...downloadedIds, chapterId]);
      showToast(lang === 'hi' ? 'अध्याय ऑफ़लाइन पढ़ने के लिए सहेजा गया (24 KB)' : 'Chapter cached for offline study (24 KB)');
    }
  };

  // Sync Offline Queue
  const handleSyncNow = () => {
    if (isOffline) {
      alert(lang === 'hi' 
        ? "सिंक करने के लिए इंटरनेट चालू करें (ऊपर दिए गए 'Offline' बटन पर क्लिक करके ऑनलाइन मोड चुनें)।"
        : "Please restore internet connection (toggle Offline button to Online) before syncing.");
      return;
    }

    setToastMessage(lang === 'hi' ? 'स्कूल सर्वर के साथ डेटा सिंक हो रहा है...' : 'Syncing local progress with school database...');
    setTimeout(() => {
      setPendingSyncCount(0);
      try {
        confetti({
          particleCount: 50,
          spread: 50,
          origin: { y: 0.2 }
        });
      } catch (e) {}
      setToastMessage(lang === 'hi' ? '✅ सभी ऑफ़लाइन क्विज़ सफलतापूर्वक सर्वर में सिंक हो गए!' : '✅ All offline records synced with school server successfully!');
      setTimeout(() => setToastMessage(null), 3500);
    }, 1000);
  };

  // Record Quiz Result
  const handleRecordQuizResult = ({ chapterId, topicKey, score, total, isOffline: wasOffline }) => {
    const earnedXP = score * 20;
    setStudentStats(prev => ({
      ...prev,
      pointsXP: prev.pointsXP + earnedXP,
      subjectProgress: {
        ...prev.subjectProgress,
        math: Math.min(100, prev.subjectProgress.math + 4)
      }
    }));

    if (wasOffline) {
      setPendingSyncCount(prev => prev + 1);
      showToast(lang === 'hi' 
        ? `क्विज़ सहेजा गया! इंटरनेट बंद होने के कारण यह सिंक कतार (Sync Queue) में सुरक्षित है।`
        : `Quiz recorded offline! Added to background sync queue.`);
    } else {
      showToast(lang === 'hi'
        ? `क्विज़ पूरा हुआ! +${earnedXP} XP अर्जित किए।`
        : `Quiz completed! Earned +${earnedXP} XP.`);
    }
  };

  // Save Diagnostic
  const handleSaveDiagnostic = ({ weakTopics }) => {
    setDiagnosticData({
      completed: true,
      weakTopics: weakTopics.length ? weakTopics : ['None (All Mastered)']
    });
    showToast(lang === 'hi' ? 'दक्षता स्तर जांच परिणाम अपडेट हो गए!' : 'Diagnostic assessment results recorded!');
  };

  // Global Speech synthesis
  const handleSpeakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const langConfig = supportedLanguages.find(l => l.code === lang);
      utterance.lang = langConfig ? langConfig.tts : 'hi-IN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleToggleOffline = (val) => {
    const nextVal = typeof val === 'boolean' ? val : !isOffline;
    setIsOffline(nextVal);
    showToast(nextVal 
      ? (lang === 'hi' ? '📡 ऑफ़लाइन मोड: डिवाइस स्टोरेज से सुरक्षित पाठ चलेंगे' : '📡 Offline Mode active: study using device cached lessons')
      : (lang === 'hi' ? '🌐 ऑनलाइन मोड: स्कूल नेटवर्क से जुड़ा' : '🌐 Online Mode restored: connected to platform network'));
  };

  const handleToggleLowData = (val) => {
    const nextVal = typeof val === 'boolean' ? val : !isLowData;
    setIsLowData(nextVal);
    showToast(nextVal 
      ? (lang === 'hi' ? '⚡ कम डेटा मोड सक्रिय: 98% बैंडविड्थ बचत (<40KB)' : '⚡ Low-Data Mode: saving 98% bandwidth (<40KB audio/text)')
      : (lang === 'hi' ? '🎨 मानक मोड सक्रिय: समृद्ध चित्र एवं चित्रकला चालू' : '🎨 Standard Mode: rich visuals enabled'));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6f9] text-upnavy-950 font-sans">
      {/* Toast Notification - Sleek, non-bouncing, stable notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 bg-upnavy-950/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl border border-upnavy-700/80 text-xs flex items-center gap-2.5 animate-fadeIn transition-all">
          <CheckCircle className="w-4 h-4 text-upsaffron-400 shrink-0" />
          <span className="font-semibold text-slate-100">{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenProfileEdit={() => setIsProfileEditOpen(true)}
        onLogout={handleLogout}
        role={role}
        setRole={(r) => {
          setRole(r);
          if (currentUser) {
            setCurrentUser(prev => ({
              ...prev,
              role: r,
              avatar: r === 'student' ? '🎓' : r === 'teacher' ? '👨‍🏫' : r === 'parent' ? '📱' : '🏛️'
            }));
          }
        }}
        lang={lang}
        setLang={setLang}
        isOffline={isOffline}
        setIsOffline={handleToggleOffline}
        isLowData={isLowData}
        setIsLowData={handleToggleLowData}
        pendingSyncCount={pendingSyncCount}
        onSyncNow={handleSyncNow}
        downloadedCount={downloadedIds.length}
        onOpenDownloads={() => setIsDownloadsOpen(true)}
        onOpenArchitecture={() => setIsArchitectureOpen(true)}
        onOpenHelp={() => setIsHelpModalOpen(true)}
      />

      {/* Main Body Content by Active Role */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 pt-4 sm:pt-5">
        {/* Official GyanSetu Portal National Banner */}
        <div className="mb-5 sm:mb-6 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs border border-slate-200/90 bg-white hover:shadow-md transition-all duration-300">
          <img
            src={bannerImg}
            alt="GyanSetu - One Nation One Digital Platform"
            className="w-full h-auto block select-none rounded-2xl sm:rounded-3xl object-cover"
            loading="eager"
          />
        </div>

        {/* If user logged out: Prompt login card */}
        {!currentUser && (
          <div className="mb-6 bg-gradient-to-r from-upnavy-900 via-upnavy-800 to-upnavy-950 text-white p-6 rounded-3xl shadow-xl border border-upnavy-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-upsaffron-500/20 text-upsaffron-300 px-2.5 py-0.5 rounded-full border border-upsaffron-400/30">
                GyanSetu Authentication Gateway
              </span>
              <h2 className="text-xl font-bold">You are currently browsing as Guest</h2>
              <p className="text-xs text-slate-300">
                Login with your Student, Teacher, Parent or Admin credentials to track personal progress and offline syncs.
              </p>
            </div>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-6 py-2.5 rounded-xl bg-upsaffron-600 hover:bg-upsaffron-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-upsaffron-600/30 active:scale-95 transition shrink-0"
            >
              <LogIn className="w-4 h-4" />
              <span>Login / Switch Role</span>
            </button>
          </div>
        )}

        {role === 'student' && (
          <StudentView
            currentUser={currentUser}
            lang={lang}
            isLowData={isLowData}
            isOffline={isOffline}
            diagnosticData={diagnosticData}
            onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
            onOpenLesson={(ch) => setActiveLesson(ch)}
            downloadedIds={downloadedIds}
            onToggleDownload={handleToggleDownload}
            onOpenAiSaathi={() => setIsAiSaathiOpen(true)}
            isAiSaathiOpen={isAiSaathiOpen}
            studentStats={studentStats}
          />
        )}

        {role === 'teacher' && (
          <TeacherView lang={lang} />
        )}

        {role === 'parent' && (
          <ParentView lang={lang} />
        )}

        {role === 'admin' && (
          <AdminView lang={lang} />
        )}
      </main>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        lang={lang}
        onLoginSuccess={handleLoginSuccess}
      />

      <ProfileEditModal
        isOpen={isProfileEditOpen}
        onClose={() => setIsProfileEditOpen(false)}
        currentUser={currentUser}
        onSaveProfile={handleSaveProfile}
        lang={lang}
      />

      <DiagnosticModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
        lang={lang}
        onSaveResults={handleSaveDiagnostic}
      />

      <LessonModal
        chapter={activeLesson}
        isOpen={Boolean(activeLesson)}
        onClose={() => setActiveLesson(null)}
        lang={lang}
        isLowData={isLowData}
        isOffline={isOffline}
        isDownloaded={activeLesson ? downloadedIds.includes(activeLesson.id) : false}
        onToggleDownload={handleToggleDownload}
        onRecordQuizResult={handleRecordQuizResult}
      />

      <AiSaathiChat
        isOpen={isAiSaathiOpen}
        onClose={() => setIsAiSaathiOpen(false)}
        lang={lang}
        onSpeakText={handleSpeakText}
      />

      <SystemArchitectureModal
        isOpen={isArchitectureOpen}
        onClose={() => setIsArchitectureOpen(false)}
        lang={lang}
      />

      <DownloadsModal
        isOpen={isDownloadsOpen}
        onClose={() => setIsDownloadsOpen(false)}
        lang={lang}
        downloadedIds={downloadedIds}
        onRemoveDownload={handleToggleDownload}
        onOpenLesson={(ch) => setActiveLesson(ch)}
      />

      <HelpSupportModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        lang={lang}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200/90 bg-white/90 backdrop-blur-sm py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-upsaffron-500" />
              <strong className="text-upnavy-950">GyanSetu (ज्ञानसेतु)</strong>
              <span className="text-slate-400">• Rural EdTech Initiative</span>
            </div>
            <span className="hidden sm:inline text-slate-300">|</span>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
              <span>National Toll-Free:</span>
              <a href="tel:18001805321" className="font-mono font-bold text-upnavy-950 hover:text-upsaffron-600 transition">
                1800-180-5321
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setIsHelpModalOpen(true)}
              className="text-upsaffron-700 hover:text-upsaffron-800 font-bold hover:underline flex items-center gap-1 transition"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Help & Support Desk</span>
            </button>
            <span>•</span>
            <button onClick={() => setIsArchitectureOpen(true)} className="hover:underline text-upnavy-800 hover:text-upsaffron-600 font-bold transition">
              Technical Architecture & Viva
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
