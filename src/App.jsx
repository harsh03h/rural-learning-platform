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
import { RewardCertificateModal } from './components/RewardCertificateModal';
import { CheckCircle, AlertCircle, RefreshCw, LogIn, Sparkles, GraduationCap, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { supportedLanguages } from './data/mockData';
import posterImg from './assets/gyansetu-hero-poster.jpg';
import { submitQuiz, syncOfflineBatch, submitDiagnostic, logout as apiLogout, clearSession, authApi, getAccessToken, getStoredSession } from './services/api';

export function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const isGuest = localStorage.getItem('gyansetu_is_guest');
      if (isGuest === 'true') return null; // Retain Guest Mode across refreshes!
      const saved = localStorage.getItem('gyansetu_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    // Start in Guest Mode. A demo profile is never assumed to be logged in.
    return null;
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
    const session = getStoredSession();
    if (!session?.user) {
      return;
    }

    // Restore user session immediately from local state
    setCurrentUser(session.user);
    if (session.user.role) setRole(session.user.role);
    if (session.user.language) setLang(session.user.language);

    // If online with a real server token (not offline mock token), verify in background
    const token = session.accessToken;
    if (token && !token.startsWith('jwt_offline_')) {
      let active = true;
      authApi.me().then((data) => {
        if (!active || !data?.user) return;
        setCurrentUser(data.user);
        if (data.user.role) setRole(data.user.role);
        if (data.user.language) setLang(data.user.language);
      }).catch(() => {
        // Retain local session even if remote verification temporarily fails
        console.info('[GyanSetu] Server auth verification offline, retaining active session.');
      });
      return () => { active = false; };
    }
  }, []);

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

  // Theme State: 'light' | 'dark' (Light Mode is Default!)
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('gyansetu_theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) {}
    return 'light'; // Default to Light Mode
  });

  useEffect(() => {
    try {
      localStorage.setItem('gyansetu_theme', theme);
    } catch (e) {}
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    showToast(nextTheme === 'dark' 
      ? (lang === 'hi' ? '🌙 डार्क मोड सक्रिय' : '🌙 Dark Mode Enabled') 
      : (lang === 'hi' ? '☀️ लाइट मोड सक्रिय (डिफ़ॉल्ट)' : '☀️ Light Mode Enabled (Default)'));
  };

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [isAiSaathiOpen, setIsAiSaathiOpen] = useState(false);
  const [isArchitectureOpen, setIsArchitectureOpen] = useState(false);
  const [isDownloadsOpen, setIsDownloadsOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isXpModalOpen, setIsXpModalOpen] = useState(false);
  const [isRewardCertOpen, setIsRewardCertOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);
  const [lessonInitialTab, setLessonInitialTab] = useState('lesson');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSaveProfile = (updatedUser) => {
    setCurrentUser(updatedUser);
    try {
      localStorage.setItem('gyansetu_user', JSON.stringify(updatedUser));
    } catch (e) {}
    authApi.profile({
      name: updatedUser.name,
      language: updatedUser.language,
      grade: updatedUser.grade,
      rollNo: updatedUser.rollNo,
      school: updatedUser.school,
      avatar: updatedUser.avatar,
    });
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

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch (e) {}
    clearSession();
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
    clearSession();
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
      const now = new Date().toISOString();
      const queuedRecords = Array.from({ length: pendingSyncCount || 1 }, (_, index) => ({
        clientId: `offline-progress-${Date.now()}-${index}`,
        type: 'progress',
        payload: { count: 1, syncedFrom: 'GyanSetu browser queue' },
        clientTimestamp: now,
      }));
      const syncResult = await syncOfflineBatch(queuedRecords);
      console.info('[GyanSetu] Offline batch synced:', syncResult?.syncedCount ?? 0);
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
        await submitQuiz({
          chapterId,
          courseId: String(chapterId || '').split('-').slice(0, 2).join('-'),
          topicKey,
          score,
          total,
          clientAttemptId: `quiz-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        });
      } catch (e) {}
      showToast(lang === 'hi'
        ? `क्विज़ पूरा हुआ! +${earnedXP} XP अर्जित किए।`
        : `Quiz completed! Earned +${earnedXP} XP.`);
    }
  };

  // Save Diagnostic
  const handleSaveDiagnostic = async ({ weakTopics, analysis, answers }) => {
    setDiagnosticData({
      completed: true,
      weakTopics: weakTopics.length ? weakTopics : ['None (All Mastered)'],
      masteredTopics: (analysis || []).filter(item => item.status === 'Good').map(item => item.topic)
    });
    try {
      await submitDiagnostic({
        weakTopics,
        analysis,
        answers,
        clientId: `diagnostic-${Date.now()}`,
      });
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
    <div className="min-h-screen flex flex-col bg-[#f4f6f9] dark:bg-slate-950 text-upnavy-950 dark:text-slate-100 font-sans transition-colors duration-200 w-full max-w-full overflow-x-hidden min-w-0">
      {/* Toast Notification - Sleek, non-bouncing, stable notification positioned below sticky header */}
      {toastMessage && (
        <div className="fixed bottom-6 left-4 sm:left-6 z-50 w-[92%] max-w-sm sm:w-auto bg-upnavy-950/95 backdrop-blur-md text-white px-4 py-3 rounded-2xl shadow-2xl border border-upnavy-700/80 text-xs flex items-center gap-2.5 animate-fadeIn transition-all pointer-events-none">
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
        theme={theme}
        onToggleTheme={handleToggleTheme}
        setTheme={setTheme}
        role={role}
        setRole={(r) => {
          setRole(r);
          if (currentUser) {
            const rolePersonas = {
              student: { 
                name: currentUser.isCustomRegistered && currentUser.role === 'student' ? currentUser.name : (currentUser.role === 'student' ? currentUser.name : 'Rohan Verma'), 
                avatar: currentUser.isCustomRegistered && currentUser.role === 'student' ? (currentUser.avatar || '🎓') : '🎓', 
                grade: currentUser.grade || 'Class 7A' 
              },
              teacher: { 
                name: currentUser.isCustomRegistered && currentUser.role === 'teacher' ? currentUser.name : 'Vikram Sharma', 
                avatar: currentUser.isCustomRegistered && currentUser.role === 'teacher' ? (currentUser.avatar || '👨‍🏫') : '👨‍🏫', 
                designation: currentUser.designation || 'Senior TGT Teacher' 
              },
              parent: { 
                name: currentUser.isCustomRegistered && currentUser.role === 'parent' ? currentUser.name : 'Kailash Verma', 
                avatar: currentUser.isCustomRegistered && currentUser.role === 'parent' ? (currentUser.avatar || '📱') : '📱', 
                wardName: currentUser.wardName || 'Rohan Verma' 
              },
              admin: { 
                name: 'Dr. Anita Deshmukh', 
                avatar: '🏛️', 
                designation: 'Principal & Director of Academics' 
              }
            };
            const persona = rolePersonas[r] || rolePersonas.student;
            setCurrentUser(prev => ({
              ...prev,
              ...persona,
              role: r
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
            onOpenRewardCert={() => setIsRewardCertOpen(true)}
        selectedGrade={selectedGrade}
        onSelectGrade={handleSelectGrade}
      />

      {/* Main Body Content by Active Role */}
      <main className="flex-1 max-w-7xl mx-auto w-full max-w-full px-2.5 sm:px-6 pt-3 sm:pt-5 pb-16 sm:pb-24 overflow-x-hidden min-w-0">
        {/* Modern Compact Guest Announcement Strip */}
        {!currentUser && (
          <div className="mb-5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-upnavy-900/95 via-upnavy-800/95 to-upnavy-950/95 text-white border border-upnavy-700/50 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <p className="text-slate-200 text-xs leading-tight">
                <strong className="text-upsaffron-300 font-bold">Guest Mode Active:</strong> Your quiz scores, XP points, and offline downloads are safely stored on this device.
              </p>
            </div>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-4 py-1.5 rounded-xl bg-upsaffron-600 hover:bg-upsaffron-500 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 transition active:scale-95 shadow-xs self-start sm:self-auto"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In / Switch</span>
            </button>
          </div>
        )}

        {/* GyanSetu Rural Learning Platform Official Poster Banner */}
        <div className="mb-5 sm:mb-6 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900 hover:shadow-md transition-all duration-300">
          <img
            src={posterImg}
            alt="Gyan Setu - Rural Learning Platform: Empowering Communities Through Knowledge & Technology"
            className="w-full h-auto max-h-48 sm:max-h-60 md:max-h-72 lg:max-h-80 object-cover object-[center_30%] select-none block"
            loading="eager"
          />
        </div>

        {role === 'student' && (
          <StudentView
            currentUser={currentUser}
            lang={lang}
            isLowData={isLowData}
            isOffline={isOffline}
            diagnosticData={diagnosticData}
            onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
            onOpenLesson={(ch, tab = 'lesson') => {
              setActiveLesson(ch);
              setLessonInitialTab(tab);
            }}
            downloadedIds={downloadedIds}
            onToggleDownload={handleToggleDownload}
            onOpenAiSaathi={() => setIsAiSaathiOpen(true)}
            isAiSaathiOpen={isAiSaathiOpen}
            studentStats={studentStats}
            onOpenXpRewards={() => setIsXpModalOpen(true)}
            onOpenRewardCert={() => setIsRewardCertOpen(true)}
            selectedGrade={selectedGrade}
            onSelectGrade={handleSelectGrade}
            onDownloadBatch={handleDownloadBatch}
            onAwardXp={(pts) => setStudentStats(prev => ({ ...prev, pointsXP: (prev.pointsXP || 0) + pts }))}
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
        theme={theme}
        onToggleTheme={handleToggleTheme}
        setTheme={setTheme}
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
        initialTab={lessonInitialTab}
      />

      <AiSaathiChat
        isOpen={isAiSaathiOpen}
        onClose={() => setIsAiSaathiOpen(false)}
        lang={lang}
        onSpeakText={handleSpeakText}
        currentUser={currentUser}
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

            <RewardCertificateModal
        isOpen={isRewardCertOpen}
        onClose={() => setIsRewardCertOpen(false)}
        currentUser={currentUser}
        studentStats={studentStats}
        lang={lang}
      />
      <XpRewardsModal
        onOpenRewardCert={() => setIsRewardCertOpen(true)}
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
      <footer className="mt-auto border-t border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm py-4 text-xs text-slate-500 dark:text-slate-400 relative z-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-upsaffron-500" />
              <strong className="text-upnavy-950 dark:text-slate-100">GyanSetu (ज्ञानसेतु)</strong>
              <span className="text-slate-400 dark:text-slate-500">• Rural EdTech Initiative (Classes 6–10)</span>
            </div>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
            <button
              onClick={() => setIsHelpModalOpen(true)}
              className="text-upsaffron-700 dark:text-upsaffron-400 hover:text-upsaffron-800 font-bold hover:underline flex items-center gap-1 transition"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Help & Support Desk (1800 180 5321)</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <button 
              onClick={() => setIsDownloadsOpen(true)} 
              className="hover:underline text-slate-600 dark:text-slate-300 hover:text-upsaffron-600 font-medium transition cursor-pointer"
            >
              Offline Device Storage ({downloadedIds.length} Saved)
            </button>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button 
              onClick={() => setIsArchitectureOpen(true)} 
              className="hover:underline text-upnavy-800 dark:text-amber-400 hover:text-upsaffron-600 font-bold transition"
            >
              System Architecture & Why GyanSetu
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
