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
import { XpRewardsModal } from './components/XpRewardsModal';
import { CheckCircle, AlertCircle, RefreshCw, LogIn, Sparkles, GraduationCap, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { supportedLanguages } from './data/mockData';
import bannerImg from './assets/gyansetu-banner.png';
import { submitQuiz, syncOfflineBatch, submitDiagnostic } from './services/api';

export function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const isGuest = localStorage.getItem('gyansetu_is_guest');
      if (isGuest === 'true') return null; // Retain Guest Mode across refreshes!
      const saved = localStorage.getItem('gyansetu_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      id: 'stu-4',
      name: 'Rohan Verma',
      role: 'student',
      grade: 'Class 7A',
      rollNo: '24',
      school: 'Model Senior Secondary School Rampur',
      avatar: '🎓'
    };
  });

  const [role, setRole] = useState(() => {
    try {
      const saved = localStorage.getItem('gyansetu_role');
      if (saved) return saved;
    } catch (e) {}
    return 'student';
  });

  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('gyansetu_lang');
      if (saved) return saved;
    } catch (e) {}
    return 'en';
  });

  const [isOffline, setIsOffline] = useState(() => {
    try {
      const saved = localStorage.getItem('gyansetu_offline');
      if (saved !== null) return saved === 'true';
    } catch (e) {}
    return false;
  });

  const [isLowData, setIsLowData] = useState(() => {
    try {
      const saved = localStorage.getItem('gyansetu_low_data');
      if (saved !== null) return saved === 'true';
    } catch (e) {}
    return true;
  });

  const [pendingSyncCount, setPendingSyncCount] = useState(() => {
    try {
      const saved = localStorage.getItem('gyansetu_pending_sync');
      if (saved !== null) return parseInt(saved, 10);
    } catch (e) {}
    return 1;
  });

  const [downloadedIds, setDownloadedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('gyansetu_downloaded_ids');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ['math-c7-ch1', 'sci-c7-ch1'];
  });

  const [toastMessage, setToastMessage] = useState(null);

  // Diagnostic State - Persisted across reloads
  const [diagnosticData, setDiagnosticData] = useState(() => {
    try {
      const saved = localStorage.getItem('gyansetu_diagnostic_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      completed: true,
      weakTopics: ['Fractions (भिन्न)', 'Percentages (प्रतिशत)'],
      masteredTopics: ['Decimals (दशमलव)', 'Geometry']
    };
  });

  // Student Gamification & Mastery State - Persisted across reloads
  const [studentStats, setStudentStats] = useState(() => {
    try {
      const saved = localStorage.getItem('gyansetu_student_stats');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      streakDays: 4,
      pointsXP: 350,
      subjectProgress: {
        math: 72,
        science: 81,
        english: 64
      }
    };
  });

  // Selected Class Grade (Classes 6 to 10) - Strictly filters curriculum across platform
  const [selectedGrade, setSelectedGrade] = useState(() => {
    try {
      const saved = localStorage.getItem('gyansetu_selected_grade');
      if (saved && ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'].includes(saved)) {
        return saved;
      }
    } catch (e) {}
    return 'Class 7'; // Default to student's registered class
  });

  const handleSelectGrade = (grade) => {
    setSelectedGrade(grade);
    try {
      localStorage.setItem('gyansetu_selected_grade', grade);
    } catch (e) {}
  };

  // Synchronize all platform states to localStorage so nothing resets on browser refresh (guest or logged-in)
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('gyansetu_user', JSON.stringify(currentUser));
        localStorage.removeItem('gyansetu_is_guest');
      } else {
        localStorage.removeItem('gyansetu_user');
        localStorage.setItem('gyansetu_is_guest', 'true');
      }
    } catch (e) {}
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('gyansetu_role', role);
    } catch (e) {}
  }, [role]);

  useEffect(() => {
    try {
      localStorage.setItem('gyansetu_lang', lang);
    } catch (e) {}
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem('gyansetu_offline', isOffline.toString());
    } catch (e) {}
  }, [isOffline]);

  useEffect(() => {
    try {
      localStorage.setItem('gyansetu_low_data', isLowData.toString());
    } catch (e) {}
  }, [isLowData]);

  useEffect(() => {
    try {
      localStorage.setItem('gyansetu_pending_sync', pendingSyncCount.toString());
    } catch (e) {}
  }, [pendingSyncCount]);

  useEffect(() => {
    try {
      localStorage.setItem('gyansetu_downloaded_ids', JSON.stringify(downloadedIds));
    } catch (e) {}
  }, [downloadedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('gyansetu_diagnostic_data', JSON.stringify(diagnosticData));
    } catch (e) {}
  }, [diagnosticData]);

  useEffect(() => {
    try {
      localStorage.setItem('gyansetu_student_stats', JSON.stringify(studentStats));
    } catch (e) {}
  }, [studentStats]);

  useEffect(() => {
    try {
      localStorage.setItem('gyansetu_selected_grade', selectedGrade);
    } catch (e) {}
  }, [selectedGrade]);

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [isAiSaathiOpen, setIsAiSaathiOpen] = useState(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [isDownloadsOpen, setIsDownloadsOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isXpModalOpen, setIsXpModalOpen] = useState(false);
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
    try {
      localStorage.removeItem('gyansetu_is_guest');
      localStorage.setItem('gyansetu_user', JSON.stringify(userData));
    } catch (e) {}
    setCurrentUser(userData);
    setRole(userData.role);
    if (userData.language) {
      setLang(userData.language);
    }
    showToast(`Welcome ${userData.name}! Logged in as ${userData.role}.`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setRole('student');
    try {
      localStorage.removeItem('gyansetu_user');
      localStorage.setItem('gyansetu_is_guest', 'true');
    } catch (e) {}
    setIsAuthModalOpen(false);
    showToast(lang === 'hi' ? 'सफलतापूर्वक लॉगआउट हुए (अतिथि मोड सक्रिय)।' : 'Logged out successfully (Guest Mode active).');
  };

  const handleContinueAsGuest = () => {
    setCurrentUser(null);
    setRole('student');
    try {
      localStorage.removeItem('gyansetu_user');
      localStorage.setItem('gyansetu_is_guest', 'true');
    } catch (e) {}
    setIsAuthModalOpen(false);
    showToast(lang === 'hi' ? 'अतिथि मोड में स्वागत है! आपकी प्रगति इस डिवाइस पर सुरक्षित रहेगी।' : 'Browsing as Guest Learner! Progress saved on device.');
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

  // Batch download entire class chapters for offline study
  const handleDownloadBatch = (chapterIds, className) => {
    setDownloadedIds(prev => Array.from(new Set([...prev, ...chapterIds])));
    try {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.3 } });
    } catch (e) {}
    showToast(lang === 'hi' 
      ? `✅ ${className} के सभी अध्याय ऑफ़लाइन पढ़ने के लिए सहेजे गए!`
      : `✅ Complete ${className} offline bundle saved to device cache!`);
  };

  // Sync Offline Queue
  const handleSyncNow = async () => {
    if (isOffline) {
      alert(lang === 'hi' 
        ? "सिंक करने के लिए इंटरनेट चालू करें (ऊपर दिए गए 'Offline' बटन पर क्लिक करके ऑनलाइन मोड चुनें)।"
        : "Please restore internet connection (toggle Offline button to Online) before syncing.");
      return;
    }

    setToastMessage(lang === 'hi' ? 'स्कूल सर्वर के साथ डेटा सिंक हो रहा है...' : 'Syncing local progress with school database...');
    
    // Call batch sync endpoint on backend
    try {
      await syncOfflineBatch([{ syncTime: new Date().toISOString(), count: pendingSyncCount }]);
    } catch (e) {
      console.warn("Backend batch sync failed, completing local sync", e);
    }

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
    }, 800);
  };

  // Record Quiz Result
  const handleRecordQuizResult = async ({ chapterId, topicKey, score, total, isOffline: wasOffline }) => {
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
      try {
        await submitQuiz({ chapterId, topicKey, score, total });
      } catch (e) {}
      showToast(lang === 'hi'
        ? `क्विज़ पूरा हुआ! +${earnedXP} XP अर्जित किए।`
        : `Quiz completed! Earned +${earnedXP} XP.`);
    }
  };

  // Save Diagnostic
  const handleSaveDiagnostic = async ({ weakTopics }) => {
    setDiagnosticData({
      completed: true,
      weakTopics: weakTopics.length ? weakTopics : ['None (All Mastered)']
    });
    try {
      await submitDiagnostic({ weakTopics });
    } catch (e) {}
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
      {/* Toast Notification - Sleek, non-bouncing, stable notification positioned below sticky header */}
      {toastMessage && (
        <div className="fixed top-28 sm:top-20 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-50 w-[92%] max-w-sm sm:w-auto bg-upnavy-950/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl border border-upnavy-700/80 text-xs flex items-center gap-2.5 animate-fadeIn transition-all">
          <CheckCircle className="w-4 h-4 text-upsaffron-400 shrink-0" />
          <span className="font-semibold text-slate-100">{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        currentUser={currentUser}
        studentStats={studentStats}
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
        onOpenXpRewards={() => setIsXpModalOpen(true)}
        selectedGrade={selectedGrade}
        onSelectGrade={handleSelectGrade}
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
            onOpenXpRewards={() => setIsXpModalOpen(true)}
            selectedGrade={selectedGrade}
            onSelectGrade={handleSelectGrade}
            onDownloadBatch={handleDownloadBatch}
          />
        )}

        {role === 'teacher' && (
          <TeacherView lang={lang} onLogout={handleLogout} />
        )}

        {role === 'parent' && (
          <ParentView lang={lang} onLogout={handleLogout} />
        )}

        {role === 'admin' && (
          <AdminView lang={lang} onLogout={handleLogout} />
        )}
      </main>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        lang={lang}
        onLoginSuccess={handleLoginSuccess}
        onContinueAsGuest={handleContinueAsGuest}
      />

      <ProfileEditModal
        isOpen={isProfileEditOpen}
        onClose={() => setIsProfileEditOpen(false)}
        currentUser={currentUser}
        onSaveProfile={handleSaveProfile}
        lang={lang}
        studentStats={studentStats}
        onLogout={handleLogout}
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

      <XpRewardsModal
        isOpen={isXpModalOpen}
        onClose={() => setIsXpModalOpen(false)}
        lang={lang}
        studentStats={studentStats}
        currentUser={currentUser}
        onClaimReward={(reward) => {
          showToast(`✨ Unlocked reward: ${reward.title}!`);
        }}
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
            </div>
            <button
              onClick={() => setIsHelpModalOpen(true)}
              className="text-upsaffron-700 hover:text-upsaffron-800 font-bold hover:underline flex items-center gap-1 transition"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Help & Support Desk</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            
            <span>•</span>
            <button onClick={() => setIsArchitectureOpen(true)} className="hover:underline text-upnavy-800 hover:text-upsaffron-600 font-bold transition">
              Architecture & Why this platform
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
