import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Printer, 
  Sparkles, 
  Lightbulb, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight,
  BookmarkCheck,
  Compass,
  Award
} from 'lucide-react';
import { getNotesForChapter } from '../data/chapterNotesBank';

export function ChapterNotesTab({ chapter, lang = 'en', onJumpToQuiz }) {
  const [copied, setCopied] = useState(false);
  const notes = getNotesForChapter(chapter, lang);

  if (!notes) {
    return (
      <div className="p-8 text-center text-slate-500 text-xs">
        Notes are being prepared for this chapter.
      </div>
    );
  }

  const handleCopyNotes = () => {
    let text = `📝 ${notes.title} (${notes.grade} - ${notes.subject.toUpperCase()})\n\n`;
    text += `📌 Core Summary:\n${notes.keyTakeaway}\n\n`;
    text += `⚡ Key Formulas & Definitions:\n`;
    notes.keyFormulas.forEach((f, idx) => {
      text += `${idx + 1}. ${f.term}: ${f.definition}\n`;
    });
    text += `\n🎯 Exam Revision Tips:\n`;
    notes.examTips.forEach((t, idx) => {
      text += `• ${t}\n`;
    });
    text += `\n🌾 Rural Application:\n${notes.realWorldExample}\n\n— GyanSetu Rural Learning Platform`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } else {
      alert(text);
    }
  };

  const handlePrintNotes = () => {
    window.print();
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* 1. Notes Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-upsaffron-500/10 to-amber-500/10 dark:from-slate-800 dark:to-slate-800 border border-amber-200/80 dark:border-slate-700">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-upsaffron-600 to-amber-500 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-upsaffron-800 dark:text-upsaffron-300 bg-upsaffron-100 dark:bg-upsaffron-950 px-2 py-0.5 rounded-full border border-upsaffron-300 dark:border-upsaffron-800">
                {notes.grade} • {notes.subject.toUpperCase()}
              </span>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                NCERT Revision Notes
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-black text-upnavy-950 dark:text-white leading-tight mt-0.5">
              {notes.title}
            </h3>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto no-print">
          <button
            onClick={handleCopyNotes}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-2xs cursor-pointer"
            title="Copy formatted revision notes to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copied ? 'Copied! ✓' : 'Copy Notes'}</span>
          </button>

          <button
            onClick={handlePrintNotes}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-2xs cursor-pointer"
            title="Print clean A4 revision notes"
          >
            <Printer className="w-3.5 h-3.5 text-upsaffron-600" />
            <span className="hidden sm:inline">Print Notes</span>
          </button>

          {onJumpToQuiz && (
            <button
              onClick={onJumpToQuiz}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-upnavy-900 to-upnavy-800 hover:from-upsaffron-600 hover:to-amber-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs active:scale-95 transition cursor-pointer"
            >
              <span>5 Qs Quiz</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Core Takeaway / Concept Overview */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 shadow-2xs space-y-2">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-upnavy-950 dark:text-upsaffron-400">
          <BookmarkCheck className="w-4 h-4 text-upsaffron-600" />
          <span>{lang === 'hi' ? 'अध्याय सारांश एवं मूल भाव' : 'Chapter Core Overview & Key Takeaway'}</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          {notes.keyTakeaway}
        </p>
      </div>

      {/* 3. Key Formulas, Rules & Definitions */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-upnavy-950 dark:text-upsaffron-400 px-1">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>{lang === 'hi' ? 'महत्वपूर्ण सूत्र, नियम एवं परिभाषाएँ' : 'Key Formulas, Rules & Definitions'}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {notes.keyFormulas.map((formula, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700 shadow-2xs hover:border-upsaffron-300 dark:hover:border-upsaffron-500 transition-all space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-black text-upnavy-950 dark:text-white">
                  {formula.term}
                </span>
                <span className="text-[10px] font-mono font-bold text-upsaffron-700 dark:text-upsaffron-300 bg-upsaffron-50 dark:bg-upsaffron-950 px-2 py-0.5 rounded-full border border-upsaffron-200 dark:border-upsaffron-800">
                  #{idx + 1}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {formula.definition}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. High-Yield NCERT Exam Revision Tips */}
      <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/50 space-y-3">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-900 dark:text-emerald-300">
          <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{lang === 'hi' ? 'बोर्ड परीक्षा उपयोगी स्मरणीय बिंदु' : 'High-Yield NCERT Exam Revision Points'}</span>
        </div>

        <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          {notes.examTips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 5. Real-World Rural Application */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/50 space-y-2">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-900 dark:text-amber-300">
          <Compass className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>{lang === 'hi' ? 'दैनिक जीवन एवं ग्रामीण परिवेश में उपयोग' : 'Real-World Rural Application'}</span>
        </div>
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          {notes.realWorldExample}
        </p>
      </div>

      {/* Bottom Action Card */}
      {onJumpToQuiz && (
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs no-print">
          <div>
            <div className="font-bold text-upnavy-950 dark:text-white">
              {lang === 'hi' ? 'नोट्स पढ़ लिए? अब अपना ज्ञान परखें!' : 'Finished revising notes? Test your understanding!'}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              {lang === 'hi' ? '5 प्रश्नों के क्विज़ में 100 अंक प्राप्त कर +100 XP अर्जित करें।' : 'Score 100% on the 5-question chapter quiz to earn +100 XP.'}
            </div>
          </div>

          <button
            onClick={onJumpToQuiz}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-upsaffron-600 to-amber-500 hover:from-upsaffron-500 hover:to-amber-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-95 transition cursor-pointer shrink-0"
          >
            <span>{lang === 'hi' ? '5 प्रश्नों का क्विज़ शुरू करें' : 'Start 5 Qs Practice Quiz'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
