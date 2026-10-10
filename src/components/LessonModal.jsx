import React, { useState } from 'react';
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
  Sparkles, 
  BookOpen, 
  WifiOff,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getLocalized, supportedLanguages } from '../data/mockData';

export function LessonModal({ 
  chapter, 
  isOpen, 
  onClose, 
  lang, 
  isLowData, 
  isOffline,
  isDownloaded,
  onToggleDownload,
  onRecordQuizResult 
}) {
  if (!isOpen || !chapter) return null;

  const [activeTab, setActiveTab] = useState('lesson'); // 'lesson' | 'quiz'
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

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
    setSelectedAnswers({
      ...selectedAnswers,
      [qIdx]: optIdx
    });
  };

  const handleQuizSubmit = () => {
    let score = 0;
    chapter.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        score += 1;
      }
    });

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    setQuizSubmitted(true);
    onRecordQuizResult({
      chapterId: chapter.id,
      topicKey: chapter.topicKey,
      score,
      total: chapter.quiz.length,
      isOffline
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-upnavy-50 text-upnavy-800 border border-upnavy-200 flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6 text-upnavy-800" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-upnavy-100 text-upnavy-900 uppercase tracking-wider">
                  {chapter.topicKey}
                </span>
                {isDownloaded && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-upsaffron-100 text-upsaffron-800 flex items-center gap-1 border border-upsaffron-200">
                    <Check className="w-3 h-3" />
                    <span>Saved Offline</span>
                  </span>
                )}
              </div>
              <h2 className="text-lg font-black text-upnavy-950 mt-0.5">
                {getLocalized(chapter.title, lang)}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleDownload(chapter.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition ${
                isDownloaded
                  ? 'bg-upnavy-50 text-upnavy-800 border-upnavy-200'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
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
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modern Segmented Navigation Tabs */}
        <div className="flex gap-2 my-5 p-1 bg-slate-100 rounded-2xl text-xs font-bold w-fit">
          <button
            onClick={() => setActiveTab('lesson')}
            className={`px-4 py-2 rounded-xl transition flex items-center gap-2 ${
              activeTab === 'lesson'
                ? 'bg-upnavy-800 text-white shadow-xs'
                : 'text-slate-500 hover:text-upnavy-950'
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
                : 'text-slate-500 hover:text-upnavy-950'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Practice Quiz ({chapter.quiz.length} Qs)</span>
          </button>
        </div>

        {/* TAB 1: LESSON READER */}
        {activeTab === 'lesson' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Sleek Interactive Audio Narrator Player */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-upnavy-50/70 via-slate-50 to-upsaffron-50/30 border border-upnavy-200/70 flex flex-wrap items-center justify-between gap-3">
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
                  <div className="text-xs font-bold text-upnavy-950 flex items-center gap-2">
                    <span>{isPlayingAudio ? 'Speaking...' : 'Listen in Your Language'}</span>
                    {isPlayingAudio && (
                      <div className="flex items-center gap-0.5 h-3">
                        <span className="w-1 bg-upsaffron-600 rounded-full animate-soundwave-1" />
                        <span className="w-1 bg-upsaffron-600 rounded-full animate-soundwave-2" />
                        <span className="w-1 bg-upsaffron-600 rounded-full animate-soundwave-3" />
                        <span className="w-1 bg-upsaffron-600 rounded-full animate-soundwave-4" />
                      </div>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Spoken narration for rural students with emerging reading fluency
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-bold text-upnavy-900 bg-white/90 px-3 py-1 rounded-full border border-upnavy-200">
                <Zap className="w-3.5 h-3.5 text-upsaffron-500 fill-upsaffron-500" />
                <span>{chapter.sizeKB} KB total</span>
              </div>
            </div>

            {/* Visual Aid (Normal vs Low Data) */}
            {!isLowData ? (
              <div className="p-5 rounded-2xl bg-slate-900 text-white relative overflow-hidden shadow-xs">
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
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                <span><strong>Low Data Active:</strong> High-res images skipped to save data. Displaying ultra-light structured text & audio summary (&lt;25 KB).</span>
              </div>
            )}

            {/* Lesson Body Content */}
            <div className="prose prose-sm max-w-none text-slate-700 bg-slate-50/70 p-5 sm:p-6 rounded-2xl border border-slate-200/80 leading-relaxed font-sans">
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
                <span>Take Practice Quiz</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: CHAPTER QUIZ */}
        {activeTab === 'quiz' && (
          <div className="space-y-4 animate-fadeIn">
            {isOffline && (
              <div className="p-3.5 bg-amber-50 text-amber-900 rounded-2xl text-xs flex items-center gap-2.5 border border-amber-200">
                <WifiOff className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  <strong>Offline Mode:</strong> Answers are securely cached in IndexedDB and will sync once internet returns.
                </span>
              </div>
            )}

            {chapter.quiz.map((q, qIdx) => {
              const selectedOpt = selectedAnswers[qIdx];
              return (
                <div key={q.id} className="p-5 rounded-2xl border border-slate-200/80 bg-white shadow-2xs space-y-3">
                  <p className="text-xs sm:text-sm font-bold text-slate-800">
                    {qIdx + 1}. {getLocalized(q.question, lang)}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedOpt === optIdx;
                      let btnStyle = "border-slate-200 hover:border-slate-300 bg-slate-50/60 text-slate-700";

                      if (quizSubmitted) {
                        if (optIdx === q.correct) {
                          btnStyle = "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20";
                        } else if (isSelected && optIdx !== q.correct) {
                          btnStyle = "border-rose-500 bg-rose-50 text-rose-900";
                        }
                      } else if (isSelected) {
                        btnStyle = "border-upsaffron-600 bg-upsaffron-50 text-upsaffron-950 font-bold ring-2 ring-upsaffron-500/20";
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={quizSubmitted}
                          onClick={() => handleQuizAnswer(qIdx, optIdx)}
                          className={`p-3 rounded-xl border text-left transition flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          <span className="text-[10px] opacity-60 font-mono">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-950">
                      <strong>Explanation: </strong>
                      {getLocalized(q.explanation, lang)}
                    </div>
                  )}
                </div>
              );
            })}

            {!quizSubmitted ? (
              <div className="flex justify-end pt-2">
                <button
                  disabled={Object.keys(selectedAnswers).length < chapter.quiz.length}
                  onClick={handleQuizSubmit}
                  className="px-6 py-2.5 rounded-2xl bg-upsaffron-600 hover:bg-upsaffron-700 disabled:opacity-40 text-white text-xs font-bold shadow-sm shadow-upsaffron-600/30 transition active:scale-95"
                >
                  Submit Quiz Answers
                </button>
              </div>
            ) : (
              <div className="p-5 rounded-2xl bg-upnavy-50 border border-upnavy-200 text-center space-y-2">
                <div className="font-bold text-sm text-upnavy-950">
                  Quiz Completed! 🎉
                </div>
                <p className="text-xs text-upnavy-800">
                  XP added to your profile. Teacher dashboard updated.
                </p>
                <button
                  onClick={() => {
                    setQuizSubmitted(false);
                    setSelectedAnswers({});
                  }}
                  className="px-4 py-1.5 rounded-xl bg-white border border-upnavy-300 text-xs font-bold text-upnavy-900 hover:bg-upnavy-100/50"
                >
                  Retake Quiz
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
