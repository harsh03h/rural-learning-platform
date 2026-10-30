import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  Download, 
  Check, 
  Volume2, 
  VolumeX, 
  Zap, 
  Award, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft,
  Sparkles, 
  BookOpen, 
  WifiOff,
  RotateCcw,
  Trophy,
  CheckCircle2,
  XCircle,
  Lightbulb,
  CheckCircle,
  Eye,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getLocalized, supportedLanguages } from '../data/mockData';
import { getQuestionsForChapter } from '../data/chapterQuizBank';

export function LessonModal({ 
  chapter, 
  isOpen, 
  onClose, 
  lang = 'en', 
  isLowData, 
  isOffline,
  isDownloaded,
  onToggleDownload,
  onRecordQuizResult 
}) {
  if (!isOpen || !chapter) return null;

  const [activeTab, setActiveTab] = useState('lesson'); // 'lesson' | 'quiz'
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Guaranteed 5 curated NCERT-aligned questions for every chapter
  const questions = useMemo(() => {
    return getQuestionsForChapter(chapter, lang);
  }, [chapter?.id, lang]);

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showAllInReview, setShowAllInReview] = useState(false);

  // Reset quiz state when chapter changes or modal opens
  useEffect(() => {
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setShowAllInReview(false);
    setIsPlayingAudio(false);
  }, [chapter?.id]);

  // Web Speech API text-to-speech with regional language matching
  const handlePlayAudio = () => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
        return;
      }

      window.speechSynthesis.cancel();
      const textToSpeak = getLocalized(chapter.audioScript, lang);
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      
      const langConfig = supportedLanguages.find(l => l.code === lang);
      utterance.lang = langConfig ? langConfig.tts : 'en-IN';
      utterance.rate = 0.9;

      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    } else {
      alert("Text-to-speech is not supported by your browser.");
    }
  };

  const handleStopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  };

  const handleQuizAnswer = (qIdx, optIdx) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [qIdx]: optIdx
    }));
  };

  const handleQuizSubmit = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        score += 1;
      }
    });

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    setQuizSubmitted(true);
    if (onRecordQuizResult) {
      onRecordQuizResult({
        chapterId: chapter.id,
        topicKey: chapter.topicKey,
        score,
        total: questions.length,
        isOffline
      });
    }
  };

  const handleRetakeQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setCurrentQuestionIdx(0);
    setShowAllInReview(false);
  };

  // Score calculations
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const isAllAnswered = answeredCount === totalQuestions;
  const currentQ = questions[currentQuestionIdx] || questions[0];

  const score = questions.reduce((acc, q, idx) => {
    return acc + (selectedAnswers[idx] === q.correct ? 1 : 0);
  }, 0);
  const scorePercent = Math.round((score / totalQuestions) * 100);
  const earnedXP = score * 20;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full p-4 sm:p-7 shadow-2xl border border-slate-100 dark:border-slate-800 max-h-[92vh] overflow-y-auto flex flex-col">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-upnavy-50 dark:bg-slate-800 text-upnavy-800 dark:text-upsaffron-400 border border-upnavy-200/80 dark:border-slate-700 flex items-center justify-center font-bold shrink-0">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-upnavy-100 dark:bg-slate-800 text-upnavy-900 dark:text-slate-200 uppercase tracking-wider border border-upnavy-200/60 dark:border-slate-700">
                  {chapter.topicKey}
                </span>
                {isDownloaded && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-upsaffron-100 text-upsaffron-800 dark:bg-upsaffron-950/60 dark:text-upsaffron-300 flex items-center gap-1 border border-upsaffron-200 dark:border-upsaffron-800/60">
                    <Check className="w-3 h-3" />
                    <span>Saved Offline</span>
                  </span>
                )}
                <span className="hidden sm:inline-flex text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                  5 Questions NCERT
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-upnavy-950 dark:text-slate-100 mt-0.5 line-clamp-1">
                {getLocalized(chapter.title, lang)}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleDownload(chapter.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition ${
                isDownloaded
                  ? 'bg-upnavy-50 dark:bg-slate-800 text-upnavy-800 dark:text-slate-200 border-upnavy-200 dark:border-slate-700'
                  : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {isDownloaded ? 'Downloaded' : `${chapter.sizeKB} KB`}
              </span>
            </button>
            <button 
              onClick={() => {
                handleStopAudio();
                onClose();
              }}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modern Segmented Navigation Tabs */}
        <div className="flex gap-2 my-4 p-1 bg-slate-100/80 dark:bg-slate-800/80 rounded-2xl text-xs font-bold w-fit border border-slate-200/60 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('lesson')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
              activeTab === 'lesson'
                ? 'bg-upnavy-800 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-upnavy-950 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Lesson Reader</span>
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
              activeTab === 'quiz'
                ? 'bg-upnavy-800 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-upnavy-950 dark:hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Practice Quiz</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
              activeTab === 'quiz' ? 'bg-upsaffron-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}>
              5 Qs
            </span>
          </button>
        </div>

        {/* TAB 1: LESSON READER */}
        {activeTab === 'lesson' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Sleek Interactive Audio Narrator Player */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-upnavy-50/70 via-slate-50 to-upsaffron-50/30 dark:from-slate-800/80 dark:via-slate-800/60 dark:to-slate-800/90 border border-upnavy-200/70 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePlayAudio}
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold shadow-sm transition active:scale-95 ${
                    isPlayingAudio
                      ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/30'
                      : 'bg-upsaffron-600 hover:bg-upsaffron-700 text-white shadow-upsaffron-600/30'
                  }`}
                  title="Listen with native text-to-speech"
                >
                  {isPlayingAudio ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>

                <div>
                  <div className="text-xs font-bold text-upnavy-950 dark:text-slate-100 flex items-center gap-2">
                    <span>{isPlayingAudio ? (lang === 'hi' ? 'वाचन जारी है...' : 'Speaking...') : (lang === 'hi' ? 'अपनी भाषा में सुनें' : 'Listen in Your Language')}</span>
                    {isPlayingAudio && (
                      <div className="flex items-center gap-0.5 h-3">
                        <span className="w-1 bg-upsaffron-600 rounded-full animate-soundwave-1" />
                        <span className="w-1 bg-upsaffron-600 rounded-full animate-soundwave-2" />
                        <span className="w-1 bg-upsaffron-600 rounded-full animate-soundwave-3" />
                        <span className="w-1 bg-upsaffron-600 rounded-full animate-soundwave-4" />
                      </div>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {lang === 'hi' ? 'ग्रामीण विद्यार्थियों के लिए स्पष्ट ऑडियो वाचन' : 'Spoken narration for rural students with emerging reading fluency'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-bold text-upnavy-900 dark:text-slate-200 bg-white/90 dark:bg-slate-800/90 px-3 py-1 rounded-full border border-upnavy-200 dark:border-slate-700">
                <Zap className="w-3.5 h-3.5 text-upsaffron-500 fill-upsaffron-500" />
                <span>{chapter.sizeKB} KB total</span>
              </div>
            </div>

            {/* Visual Aid (Normal vs Low Data) */}
            {!isLowData ? (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white relative overflow-hidden shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                    Visual Concept Model
                  </span>
                  <span className="text-[10px] text-slate-400">High-Resolution Mode</span>
                </div>
                
                {chapter.topicKey === 'Fractions' ? (
                  <div className="py-2 flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
                    <div className="w-24 h-24 rounded-full border-4 border-amber-400 grid grid-cols-2 grid-rows-2 overflow-hidden bg-amber-100 shadow-inner shrink-0">
                      <div className="bg-amber-500 border-r border-b border-amber-600 flex items-center justify-center font-bold text-white text-xs">1/4</div>
                      <div className="bg-amber-100 border-b border-amber-400 flex items-center justify-center font-bold text-amber-900 text-xs">1/4</div>
                      <div className="bg-amber-100 border-r border-amber-400 flex items-center justify-center font-bold text-amber-900 text-xs">1/4</div>
                      <div className="bg-amber-100 flex items-center justify-center font-bold text-amber-900 text-xs">1/4</div>
                    </div>
                    <div className="text-left text-xs max-w-xs space-y-1">
                      <p className="font-bold text-amber-300">Roti / Farm Division Model</p>
                      <p className="text-slate-300">1 Whole = 4 Equal Quarters</p>
                      <p className="text-slate-400">Numerator is the shaded slice (1), Denominator is total equal parts (4).</p>
                    </div>
                  </div>
                ) : (
                  <div className="py-3 flex items-center justify-center gap-4 text-center">
                    <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-500/30 text-emerald-200 text-xs">
                      ☀️ Sun + 💧 Soil Water + 🍃 Chlorophyll = 🌾 Glucose + 💨 Oxygen
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                <span><strong>Low Data Active:</strong> High-res images skipped to save data. Displaying ultra-light structured text & audio summary (&lt;25 KB).</span>
              </div>
            )}

            {/* Lesson Body Content */}
            <div className="prose prose-sm max-w-none text-slate-700 dark:text-slate-200 bg-slate-50/70 dark:bg-slate-800/40 p-4 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 leading-relaxed font-sans">
              <div className="whitespace-pre-line text-xs sm:text-sm">
                {getLocalized(chapter.lowDataContent, lang)}
              </div>
            </div>

            {/* Quick Practice CTA */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveTab('quiz')}
                className="px-6 py-2.5 rounded-2xl bg-upsaffron-600 hover:bg-upsaffron-700 text-white text-xs font-bold flex items-center gap-2 shadow-sm shadow-upsaffron-600/30 transition active:scale-95"
              >
                <span>{lang === 'hi' ? '5 प्रश्नों का अभ्यास क्विज़ शुरू करें' : 'Start 5-Question Quiz'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE 5-QUESTION QUIZ EXPERIENCE */}
        {activeTab === 'quiz' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Offline Notification */}
            {isOffline && (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 rounded-2xl text-xs flex items-center gap-2.5 border border-amber-200 dark:border-amber-800">
                <WifiOff className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  <strong>Offline Mode:</strong> Answers are saved in local device storage and will sync automatically upon reconnection.
                </span>
              </div>
            )}

            {/* Quiz Progress & Stepper Capsule */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-upnavy-950 dark:text-slate-100 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-upsaffron-600" />
                    <span>Question {currentQuestionIdx + 1} of {totalQuestions}</span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200/80 dark:border-slate-700">
                    NCERT Aligned
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    {answeredCount} / {totalQuestions} Answered
                  </span>
                  {quizSubmitted && (
                    <span className="text-xs font-black px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                      Score: {score}/{totalQuestions}
                    </span>
                  )}
                </div>
              </div>

              {/* Dynamic Progress Bar */}
              <div className="w-full h-2 bg-slate-200/80 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 rounded-full ${
                    quizSubmitted 
                      ? 'bg-emerald-500' 
                      : 'bg-gradient-to-r from-upsaffron-500 to-amber-500'
                  }`}
                  style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                />
              </div>

              {/* Jump Pills: [ 1 ] [ 2 ] [ 3 ] [ 4 ] [ 5 ] */}
              <div className="flex items-center justify-between gap-1.5 pt-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider hidden sm:block">
                  Jump to:
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                  {questions.map((q, idx) => {
                    const isCurrent = currentQuestionIdx === idx;
                    const isAnswered = selectedAnswers[idx] !== undefined;
                    const isCorrect = quizSubmitted && selectedAnswers[idx] === q.correct;
                    const isWrong = quizSubmitted && selectedAnswers[idx] !== undefined && selectedAnswers[idx] !== q.correct;

                    let pillClass = "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300";

                    if (quizSubmitted) {
                      if (isCorrect) {
                        pillClass = "bg-emerald-500 text-white border-emerald-600 font-black shadow-xs";
                      } else if (isWrong) {
                        pillClass = "bg-rose-500 text-white border-rose-600 font-black shadow-xs";
                      } else {
                        pillClass = "bg-slate-200 dark:bg-slate-700 text-slate-500 border-slate-300";
                      }
                    } else if (isCurrent) {
                      pillClass = "bg-upnavy-800 text-white border-upnavy-900 ring-2 ring-upsaffron-500 font-black shadow-sm scale-105";
                    } else if (isAnswered) {
                      pillClass = "bg-upsaffron-100 dark:bg-upsaffron-950/60 text-upsaffron-900 dark:text-upsaffron-200 border-upsaffron-300 font-bold";
                    }

                    return (
                      <button
                        key={q.id || idx}
                        onClick={() => {
                          setCurrentQuestionIdx(idx);
                          setShowAllInReview(false);
                        }}
                        className={`w-9 h-9 rounded-xl border text-xs flex items-center justify-center transition active:scale-95 ${pillClass}`}
                        title={`Question ${idx + 1}: ${isAnswered ? 'Answered' : 'Unanswered'}`}
                      >
                        {quizSubmitted ? (
                          isCorrect ? '✓' : (isWrong ? '✕' : (idx + 1))
                        ) : (
                          idx + 1
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RESULTS BANNER (When Submitted) */}
            {quizSubmitted && !showAllInReview && (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-upnavy-50 via-white to-emerald-50/60 dark:from-slate-800 dark:via-slate-800 dark:to-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-sm text-center space-y-3 animate-scaleUp">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 border border-amber-300 dark:border-amber-700 mx-auto shadow-2xs">
                  <Trophy className="w-6 h-6 fill-amber-500 text-amber-500" />
                </div>
                
                <div>
                  <h3 className="text-base sm:text-lg font-black text-upnavy-950 dark:text-slate-100">
                    {score === 5 ? '🏆 Outstanding Mastery! 5/5 Correct' :
                     score >= 4 ? '🌟 Excellent Performance! ' + score + '/5 Correct' :
                     score >= 3 ? '👍 Good Effort! ' + score + '/5 Correct' :
                     '💪 Keep Practicing! ' + score + '/5 Correct'}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                    {score === 5 
                      ? 'You have completely mastered all 5 core concepts of this chapter.' 
                      : 'Review each question below to understand the detailed NCERT explanations.'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  <span className="text-xs font-black text-upsaffron-700 dark:text-upsaffron-300 bg-upsaffron-100 dark:bg-upsaffron-950/70 px-3 py-1 rounded-full border border-upsaffron-300 dark:border-upsaffron-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>+{earnedXP} XP Earned</span>
                  </span>
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/70 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-700">
                    {scorePercent}% Accuracy
                  </span>
                  <span className="text-xs font-bold text-upnavy-800 dark:text-slate-300 bg-upnavy-100 dark:bg-slate-700 px-3 py-1 rounded-full border border-upnavy-200 dark:border-slate-600">
                    Recorded in Student Profile
                  </span>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
                  <button
                    onClick={() => setShowAllInReview(true)}
                    className="px-4 py-2 rounded-xl bg-upnavy-800 hover:bg-upnavy-900 text-white text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Review All 5 Explanations</span>
                  </button>
                  <button
                    onClick={handleRetakeQuiz}
                    className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-upnavy-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 text-xs font-bold flex items-center gap-1.5 transition active:scale-95"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                </div>
              </div>
            )}

            {/* MODE A: FULL 5-QUESTION REVIEW MODE */}
            {quizSubmitted && showAllInReview ? (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-upsaffron-600" />
                    <span className="text-xs font-black text-upnavy-950 dark:text-slate-100">
                      Full Chapter Quiz Review (All 5 Questions)
                    </span>
                  </div>
                  <button
                    onClick={() => setShowAllInReview(false)}
                    className="text-xs font-bold text-upnavy-800 dark:text-upsaffron-400 hover:underline"
                  >
                    Back to Stepper View
                  </button>
                </div>

                {questions.map((q, qIdx) => {
                  const userAns = selectedAnswers[qIdx];
                  const isCorrect = userAns === q.correct;
                  return (
                    <div 
                      key={q.id || qIdx}
                      className="p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-800/80 shadow-2xs space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-xs sm:text-sm font-bold text-upnavy-950 dark:text-slate-100 flex items-start gap-2">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5 ${
                            isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                          }`}>
                            {isCorrect ? '✓' : '✕'}
                          </span>
                          <span>{qIdx + 1}. {getLocalized(q.question, lang)}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {q.options.map((opt, optIdx) => {
                          const isRight = optIdx === q.correct;
                          const isPicked = userAns === optIdx;

                          let style = "border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800 text-slate-600 dark:text-slate-400";
                          if (isRight) {
                            style = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-bold ring-2 ring-emerald-500/20";
                          } else if (isPicked && !isRight) {
                            style = "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200 font-bold line-through";
                          }

                          return (
                            <div key={optIdx} className={`p-3 rounded-xl border flex items-center justify-between ${style}`}>
                              <span className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center font-mono text-[10px]">
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{opt}</span>
                              </span>
                              {isRight && <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400">CORRECT ✓</span>}
                              {isPicked && !isRight && <span className="text-[10px] font-black text-rose-600 dark:text-rose-400">YOUR CHOICE</span>}
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-950 dark:text-emerald-200 flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong>NCERT Explanation: </strong>
                          {getLocalized(q.explanation, lang)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* MODE B: INTERACTIVE STEPPER QUESTION CARD */
              <div className="p-4 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-800/80 shadow-xs space-y-4">
                
                {/* Question Text */}
                <div className="space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-upsaffron-600">
                    Question {currentQuestionIdx + 1} of {totalQuestions}
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-upnavy-950 dark:text-slate-100 leading-snug">
                    {getLocalized(currentQ.question, lang)}
                  </h3>
                </div>

                {/* 4 Large Tactile Option Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[currentQuestionIdx] === optIdx;
                    const letter = String.fromCharCode(65 + optIdx);
                    
                    let cardStyle = "border-slate-200 dark:border-slate-700 bg-slate-50/70 hover:bg-slate-100/80 dark:bg-slate-800/60 dark:hover:bg-slate-700/60 text-slate-800 dark:text-slate-200";
                    let letterStyle = "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300";

                    if (quizSubmitted) {
                      if (optIdx === currentQ.correct) {
                        cardStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 font-bold ring-2 ring-emerald-500/20";
                        letterStyle = "bg-emerald-500 text-white";
                      } else if (isSelected && optIdx !== currentQ.correct) {
                        cardStyle = "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200 font-bold";
                        letterStyle = "bg-rose-500 text-white";
                      } else {
                        cardStyle = "border-slate-200 dark:border-slate-700 opacity-50 bg-slate-50/40 dark:bg-slate-800/40 text-slate-500";
                      }
                    } else if (isSelected) {
                      cardStyle = "border-upsaffron-600 bg-upsaffron-50 dark:bg-upsaffron-950/50 text-upsaffron-950 dark:text-upsaffron-100 font-bold ring-2 ring-upsaffron-500/30 shadow-xs";
                      letterStyle = "bg-upsaffron-600 text-white";
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={quizSubmitted}
                        onClick={() => handleQuizAnswer(currentQuestionIdx, optIdx)}
                        className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-150 flex items-center justify-between gap-3 active:scale-[0.99] cursor-pointer ${cardStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono text-xs font-black shrink-0 shadow-2xs ${letterStyle}`}>
                            {letter}
                          </span>
                          <span className="text-xs sm:text-sm leading-snug">{opt}</span>
                        </div>

                        {/* Status Check / Radio Icon */}
                        <div className="shrink-0">
                          {quizSubmitted ? (
                            optIdx === currentQ.correct ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            ) : isSelected ? (
                              <XCircle className="w-5 h-5 text-rose-500" />
                            ) : null
                          ) : (
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              isSelected ? 'border-upsaffron-600 bg-upsaffron-600' : 'border-slate-300 dark:border-slate-600'
                            }`}>
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Question Explanation Box (When Submitted) */}
                {quizSubmitted && (
                  <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-950 dark:text-emerald-200 space-y-1 animate-fadeIn">
                    <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
                      <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>NCERT Explanation for Question {currentQuestionIdx + 1}:</span>
                    </div>
                    <p className="leading-relaxed pl-6">
                      {getLocalized(currentQ.explanation, lang)}
                    </p>
                  </div>
                )}

                {/* Bottom Navigation Toolbar */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between gap-2">
                  <button
                    disabled={currentQuestionIdx === 0}
                    onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold flex items-center gap-1.5 transition active:scale-95"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>

                  <div className="text-[11px] font-bold text-slate-400 hidden sm:block">
                    {selectedAnswers[currentQuestionIdx] !== undefined 
                      ? '✓ Answer selected' 
                      : 'Please choose an option'}
                  </div>

                  <div className="flex items-center gap-2">
                    {currentQuestionIdx < totalQuestions - 1 ? (
                      <button
                        onClick={() => setCurrentQuestionIdx(prev => Math.min(totalQuestions - 1, prev + 1))}
                        className="px-4 py-2 rounded-xl bg-upnavy-800 hover:bg-upnavy-900 text-white text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-xs"
                      >
                        <span>Next Question</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : !quizSubmitted ? (
                      <button
                        disabled={!isAllAnswered}
                        onClick={handleQuizSubmit}
                        className="px-5 py-2 rounded-xl bg-upsaffron-600 hover:bg-upsaffron-700 disabled:opacity-40 disabled:pointer-events-none text-white text-xs font-black flex items-center gap-1.5 transition active:scale-95 shadow-sm shadow-upsaffron-600/30"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Submit 5 Questions</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowAllInReview(true)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition active:scale-95"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Full Review</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}