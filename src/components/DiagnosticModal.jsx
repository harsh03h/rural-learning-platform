import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, X, Award, ArrowRight, Brain, RotateCcw, Check, Sparkles } from 'lucide-react';
import { diagnosticQuestions, getLocalized, translations } from '../data/mockData';
import confetti from 'canvas-confetti';

export function DiagnosticModal({ isOpen, onClose, lang, onSaveResults }) {
  if (!isOpen) return null;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const question = diagnosticQuestions[currentIdx];

  const handleSelectOption = (optIdx) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIdx]: optIdx
    });
  };

  const handleNext = () => {
    if (currentIdx < diagnosticQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      calculateAndFinish();
    }
  };

  const calculateAndFinish = () => {
    const topicStats = {};
    diagnosticQuestions.forEach((q, idx) => {
      const topic = q.topic;
      if (!topicStats[topic]) {
        topicStats[topic] = { total: 0, correct: 0 };
      }
      topicStats[topic].total += 1;
      if (selectedAnswers[idx] === q.correct) {
        topicStats[topic].correct += 1;
      }
    });

    const analysis = Object.entries(topicStats).map(([topic, stats]) => {
      const percentage = Math.round((stats.correct / stats.total) * 100);
      let status = 'Good';
      if (percentage < 50) status = 'Weak';
      else if (percentage < 75) status = 'Average';
      return { topic, percentage, status };
    });

    const weakTopics = analysis.filter(a => a.status === 'Weak').map(a => a.topic);
    
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    setIsSubmitted(true);
    onSaveResults({ analysis, weakTopics });
  };

  const restart = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-4 sm:p-8 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-upsaffron-50 text-upsaffron-700 border border-upsaffron-200 flex items-center justify-center font-bold">
              <Brain className="w-5 h-5 text-upsaffron-600" />
            </div>
            <div>
              <h2 className="text-lg font-black text-upnavy-950">
                Diagnostic Baseline Assessment
              </h2>
              <p className="text-xs text-slate-500">
                Evaluating Foundational Math & Science Prerequisites (Classes 6 to 10)
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isSubmitted ? (
          <div>
            {/* Progress Stepper */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2">
              <span>Question {currentIdx + 1} of {diagnosticQuestions.length}</span>
              <span className="text-upnavy-900 bg-upnavy-100 px-2.5 py-0.5 rounded-full border border-upnavy-200 text-[11px] font-bold">
                Topic: {question.topic}
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full mb-6 overflow-hidden">
              <div 
                className="bg-upnavy-800 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / diagnosticQuestions.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 mb-6">
              <p className="text-sm sm:base font-bold text-upnavy-950 leading-snug">
                {getLocalized(question.question, lang)}
              </p>
            </div>

            {/* Options Grid */}
            <div className="space-y-2.5 mb-8">
              {question.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentIdx] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-semibold transition flex items-center justify-between ${
                      isSelected
                        ? 'border-upsaffron-600 bg-upsaffron-50/80 text-upsaffron-950 ring-2 ring-upsaffron-500/20 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{opt}</span>
                    <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-mono font-bold ${
                      isSelected ? 'border-upsaffron-600 bg-upsaffron-600 text-white' : 'border-slate-300 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(currentIdx - 1)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 disabled:opacity-30"
              >
                Previous
              </button>
              <button
                disabled={selectedAnswers[currentIdx] === undefined}
                onClick={handleNext}
                className="px-6 py-2.5 rounded-2xl bg-upsaffron-600 hover:bg-upsaffron-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs font-bold flex items-center gap-2 shadow-sm shadow-upsaffron-600/30 transition active:scale-95"
              >
                <span>{currentIdx === diagnosticQuestions.length - 1 ? 'Finish & Generate AI Report' : 'Next Question'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-2 animate-fadeIn">
            <div className="w-16 h-16 bg-upnavy-100 text-upnavy-800 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-upnavy-200">
              <Award className="w-8 h-8 text-upnavy-800" />
            </div>

            <h3 className="text-xl font-black text-upnavy-950 mb-1">
              Diagnostic Assessment Complete!
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Our rural adaptive engine has mapped your prerequisites and weak topics.
            </p>

            {/* Topic Results Breakdown Grid */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 mb-5 text-left">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                Topic-Wise Mastery Status
              </h4>
              <div className="space-y-2.5">
                {diagnosticQuestions.reduce((acc, q) => {
                  if (!acc.some(item => item.topic === q.topic)) {
                    acc.push({ topic: q.topic });
                  }
                  return acc;
                }, []).map((tObj, idx) => {
                  const qs = diagnosticQuestions.filter(q => q.topic === tObj.topic);
                  const correctCount = qs.filter(q => {
                    const qIdx = diagnosticQuestions.findIndex(dq => dq.id === q.id);
                    return selectedAnswers[qIdx] === q.correct;
                  }).length;
                  const pct = Math.round((correctCount / qs.length) * 100);
                  const isWeak = pct < 50;

                  return (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200">
                      <div>
                        <div className="font-bold text-xs text-slate-900">{tObj.topic}</div>
                        <div className="text-[11px] text-slate-400">
                          {correctCount} of {qs.length} correct ({pct}%)
                        </div>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        isWeak 
                          ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                          : pct >= 80 
                            ? 'bg-upnavy-100 text-upnavy-900 border border-upnavy-200' 
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {isWeak ? 'Weak Focus (Needs Remedial)' : 'Mastered Prerequisite'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Recommendation Alert */}
            <div className="p-4 rounded-2xl bg-upnavy-50/80 border border-upnavy-200 text-left mb-6 flex gap-3">
              <Sparkles className="w-5 h-5 text-upsaffron-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-upnavy-950 mb-0.5">
                  AI Personalized Remedial Recommendation:
                </p>
                <p className="text-xs text-upnavy-800">
                  "Revise Fractions Chapter 1 before advancing to Percentages to ensure foundational arithmetic fluency."
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={restart}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Test</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-2xl bg-upsaffron-600 hover:bg-upsaffron-700 text-white text-xs font-bold shadow-sm shadow-upsaffron-600/30 transition active:scale-95"
              >
                Open Personalized Study Path
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
