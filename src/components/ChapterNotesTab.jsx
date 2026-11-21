import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  Check, 
  Sparkles, 
  Lightbulb, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  BookmarkCheck,
  Compass,
  Award,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Layers,
  Eye,
  BookMarked
} from 'lucide-react';
import { getNotesForChapter, formatNotesAsDocumentText } from '../data/chapterNotesBank';

export function ChapterNotesTab({ chapter, lang = 'en', onJumpToQuiz }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('stepper'); // 'stepper' | 'continuous'
  const [downloadedTxt, setDownloadedTxt] = useState(false);
  const [revealedSolutions, setRevealedSolutions] = useState({});

  const notes = getNotesForChapter(chapter, lang);

  if (!notes) {
    return (
      <div className="p-8 text-center text-slate-500 text-xs">
        {lang === 'hi' ? 'इस अध्याय के नोट्स तैयार किए जा रहे हैं।' : 'Notes are being prepared for this chapter.'}
      </div>
    );
  }

  const isHi = lang === 'hi';
  const pages = notes.pages || [];
  const activePageObj = pages.find(p => p.pageNumber === currentPage) || pages[0];

  const handleDownloadTxt = () => {
    const text = formatNotesAsDocumentText(notes);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const cleanTitle = (notes.title || 'Chapter').replace(/[^a-zA-Z0-9_-]/g, '_');
    link.download = `GyanSetu_${notes.grade.replace(/\s+/g, '_')}_${cleanTitle}_5Page_Notes.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloadedTxt(true);
    setTimeout(() => setDownloadedTxt(false), 2500);
  };

  const handlePrintNotes = () => {
    window.print();
  };

  const toggleSolution = (key) => {
    setRevealedSolutions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Helper to render individual page content cleanly
  const renderSinglePage = (page) => {
    if (!page) return null;

    return (
      <div 
        key={page.pageNumber} 
        className="notes-print-page bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-xs space-y-6 relative overflow-hidden"
      >
        {/* Official Page Header (Appears on print & screen) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 border-b border-slate-100 dark:border-slate-800/80 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-upsaffron-600 to-amber-500 text-white flex items-center justify-center font-black text-[11px] shadow-2xs shrink-0">
              GS
            </div>
            <div className="font-bold text-upnavy-950 dark:text-slate-200 text-[11px] sm:text-xs">
              GyanSetu Academic Council • {notes.grade} {notes.subject.toUpperCase()}
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="font-mono text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-upsaffron-100 dark:bg-upsaffron-950 text-upsaffron-900 dark:text-upsaffron-300 border border-upsaffron-300/80 dark:border-upsaffron-800/60">
              {isHi ? `पृष्ठ ${page.pageNumber} / 5` : `Page ${page.pageNumber} of 5`}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 hidden sm:inline">
              NCERT Curriculum
            </span>
          </div>
        </div>

        {/* Page Title & Subtitle */}
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-upsaffron-700 dark:text-upsaffron-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-0.5 rounded-md border border-amber-200 dark:border-amber-900/40">
            {page.badge}
          </span>
          <h2 className="text-base sm:text-xl font-black text-upnavy-950 dark:text-white leading-tight">
            {page.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {page.subtitle}
          </p>
        </div>

        {/* PAGE 1 CONTENT: Foundations & Prerequisites */}
        {page.pageKey === 'foundations' && (
          <div className="space-y-5">
            {/* 1. Academic Overview */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-upnavy-950 dark:text-upsaffron-400">
                <BookOpen className="w-4 h-4 text-upsaffron-600" />
                <span>{isHi ? '1.1 अध्याय की विस्तृत पृष्ठभूमि एवं विषय प्रवेश' : '1.1 Academic Context & Chapter Overview'}</span>
              </div>
              {(page.academicOverview || []).map((para, idx) => (
                <p key={idx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* 2. Target Learning Objectives */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-950 dark:text-amber-300">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>{isHi ? '1.2 अपेक्षित अधिगम प्रतिफल (Learning Outcomes)' : '1.2 Target NCERT Learning Objectives & Competencies'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(page.learningObjectives || []).map((obj, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-white/80 dark:bg-slate-800/60 p-2.5 rounded-xl border border-amber-100 dark:border-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Prerequisite Knowledge Bridge */}
            {page.prerequisites && (
              <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-900/40 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-indigo-950 dark:text-indigo-300">
                  <BookMarked className="w-4 h-4 text-indigo-600" />
                  <span>{isHi ? '1.3 पूर्व ज्ञान सेतु (Prerequisites Bridge)' : '1.3 Foundational Prerequisite Concepts'}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {page.prerequisites.intro}
                </p>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {(page.prerequisites.items || []).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold text-indigo-600 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 4. Real-World Relevance */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 flex items-start gap-3">
              <Compass className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="text-xs font-black uppercase tracking-wider text-emerald-950 dark:text-emerald-300">
                  {isHi ? '1.4 समाज एवं ग्रामीण जीवन में प्रासंगिकता' : '1.4 Practical & Rural Community Relevance'}
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {page.realWorldRelevance}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 2 CONTENT: Deep Conceptual Theory & Mechanisms */}
        {page.pageKey === 'theory' && (
          <div className="space-y-5">
            {/* 1. Deep Theory Breakdown */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-upnavy-950 dark:text-upsaffron-400">
                <Layers className="w-4 h-4 text-upsaffron-600" />
                <span>{isHi ? '2.1 गहन सैद्धांतिक विश्लेषण एवं मूल सिद्धांत' : '2.1 In-Depth Conceptual Theory & Core Principles'}</span>
              </div>
              {(page.deepTheory || []).map((t, idx) => (
                <p key={idx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {t}
                </p>
              ))}
            </div>

            {/* 2. Theorems / Core Laws */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-upnavy-950 dark:text-upsaffron-400">
                <BookmarkCheck className="w-4 h-4 text-amber-500" />
                <span>{isHi ? '2.2 मौलिक नियम, प्रमेय एवं सूत्र' : '2.2 Fundamental Theorems, Laws & Rules'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(page.theorems || []).map((th, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-black text-upnavy-950 dark:text-white">
                        {th.name}
                      </span>
                      <span className="text-[10px] font-bold text-upsaffron-800 dark:text-upsaffron-300 bg-upsaffron-50 dark:bg-upsaffron-950/80 px-2 py-0.5 rounded-full border border-upsaffron-200 dark:border-upsaffron-800">
                        {th.ruleType}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      {th.statement}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Step-by-Step Mechanisms */}
            {page.mechanism && (
              <div className="p-4 sm:p-5 rounded-2xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200/80 dark:border-sky-900/40 space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-sky-950 dark:text-sky-300">
                  <CheckCircle2 className="w-4 h-4 text-sky-600" />
                  <span>{page.mechanism.title}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(page.mechanism.steps || []).map((st) => (
                    <div key={st.num} className="p-3 rounded-xl bg-white/90 dark:bg-slate-800/80 border border-sky-100 dark:border-slate-700 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-sky-600 text-white text-[10px] font-black flex items-center justify-center shrink-0">
                          {st.num}
                        </span>
                        <span className="text-xs font-bold text-upnavy-950 dark:text-white">
                          {st.title}
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 pl-7">
                        {st.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Comparative Matrix Table */}
            {page.comparativeTable && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-upnavy-950 dark:text-upsaffron-400">
                  <FileText className="w-4 h-4 text-amber-500" />
                  <span>{isHi ? '2.3 तुलनात्मक सारणी एवं वर्गीकरण' : '2.3 Comparative Analysis & Classification Matrix'}</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100/80 dark:bg-slate-800 text-upnavy-950 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
                        {(page.comparativeTable.headers || []).map((h, idx) => (
                          <th key={idx} className="p-2.5 sm:p-3 whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                      {(page.comparativeTable.rows || []).map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className={`p-2.5 sm:p-3 ${cIdx === 0 ? 'font-bold text-upnavy-950 dark:text-slate-200' : ''}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PAGE 3 CONTENT: Solved NCERT Exemplar Problems */}
        {page.pageKey === 'exemplars' && (
          <div className="space-y-4">
            {(page.exemplars || []).map((ex) => (
              <div 
                key={ex.id}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3 shadow-2xs"
              >
                <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700/80 pb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-upsaffron-800 dark:text-upsaffron-300 bg-upsaffron-100 dark:bg-upsaffron-950/80 px-2.5 py-0.5 rounded-full border border-upsaffron-300 dark:border-upsaffron-800">
                    {ex.marksBadge}
                  </span>
                  <span className="text-[11px] text-slate-500 font-bold">
                    NCERT Problem #{ex.id}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {isHi ? 'प्रश्न विवरण:' : 'Problem Statement:'}
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-upnavy-950 dark:text-white leading-relaxed">
                    {ex.question}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <span className="font-bold text-upnavy-950 dark:text-slate-200">
                    {isHi ? 'दिया गया डेटा एवं प्रासंगिक सूत्र:' : 'Given Data & Parameters:'}
                  </span>
                  <div>{ex.given}</div>
                </div>

                {/* Step-by-Step Solution */}
                <div className="space-y-2 pt-1">
                  <div className="text-xs font-black uppercase tracking-wider text-upnavy-950 dark:text-upsaffron-400">
                    {isHi ? 'चरणबद्ध समाधान (Step-by-Step Solution):' : 'Step-by-Step Solution:'}
                  </div>
                  <div className="space-y-1.5 pl-2 border-l-2 border-upsaffron-400/80 dark:border-upsaffron-600">
                    {(ex.steps || []).map((st, idx) => (
                      <div key={idx} className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        <span className="font-bold text-upnavy-950 dark:text-white mr-1.5">{st.step}:</span>
                        <span>{st.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verified Final Answer & Examiner Tip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-700/80">
                  <div className="px-3 py-1.5 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 text-xs font-bold border border-emerald-300 dark:border-emerald-800 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{ex.finalAnswer}</span>
                  </div>
                  <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{ex.examinerTip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGE 4 CONTENT: High-Yield Formula Sheet & Exam Traps */}
        {page.pageKey === 'cheatsheet' && (
          <div className="space-y-5">
            {/* 1. Master Formula Grid */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-upnavy-950 dark:text-upsaffron-400">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{isHi ? '4.1 त्वरित सूत्र एवं पारिभाषिक शब्दावली तालिका' : '4.1 Master Formula & Definitions Grid'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(page.formulaGrid || []).map((f, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-black text-upnavy-950 dark:text-white">
                        {f.term}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-upsaffron-800 dark:text-upsaffron-300 bg-upsaffron-50 dark:bg-upsaffron-950 px-2 py-0.5 rounded-full border border-upsaffron-200 dark:border-upsaffron-800">
                        #{idx + 1}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      {f.definition}
                    </p>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {f.notation}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Quick Summary Matrix */}
            {page.quickSummaryTable && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-upnavy-950 dark:text-upsaffron-400">
                  <FileText className="w-4 h-4 text-upsaffron-600" />
                  <span>{isHi ? '4.2 त्वरित पुनरावलोकन मैट्रिक्स' : '4.2 Quick Revision Matrix'}</span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 dark:bg-slate-800 text-upnavy-950 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
                        {(page.quickSummaryTable.headers || []).map((h, idx) => (
                          <th key={idx} className="p-2.5 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                      {(page.quickSummaryTable.rows || []).map((r, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                          {r.map((c, cIdx) => (
                            <td key={cIdx} className={`p-2.5 ${cIdx === 0 ? 'font-bold' : ''}`}>{c}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. Common Board Exam Traps & Pitfalls */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-900 dark:text-rose-300">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>{isHi ? '4.3 बोर्ड परीक्षा की सामान्य गलतियाँ एवं सावधानियाँ' : '4.3 High-Yield Board Exam Pitfalls & Traps'}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(page.examTraps || []).map((trap, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 space-y-2">
                    <div className="text-xs font-black text-rose-950 dark:text-rose-300">
                      ⚠️ {trap.title}
                    </div>
                    <div className="text-[11px] text-slate-700 dark:text-slate-300 space-y-1">
                      <div><strong className="text-rose-700 dark:text-rose-400">{isHi ? 'गलती: ' : 'Mistake: '}</strong>{trap.mistake}</div>
                      <div><strong className="text-emerald-700 dark:text-emerald-400">{isHi ? 'सही विधि: ' : 'Fix: '}</strong>{trap.fix}</div>
                      <div className="text-[10px] text-slate-500 italic pt-1">{trap.why}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Memory Recall Mnemonic */}
            {page.mnemonic && (
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5 text-xs">
                  <span className="font-black text-amber-950 dark:text-amber-200 uppercase tracking-wider">
                    {page.mnemonic.title}
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">
                    {page.mnemonic.text}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PAGE 5 CONTENT: Self-Assessment Practice Drill & Rural Applications */}
        {page.pageKey === 'practice' && (
          <div className="space-y-5">
            {/* 1. Self-Assessment Practice Drill Questions */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-upnavy-950 dark:text-upsaffron-400">
                <Award className="w-4 h-4 text-upsaffron-600" />
                <span>{isHi ? '5.1 आत्म-मूल्यांकन अभ्यास प्रश्न (Self-Assessment Drill)' : '5.1 Self-Assessment Practice Drill Questions'}</span>
              </div>
              <div className="space-y-3">
                {(page.drillQuestions || []).map((dq) => {
                  const isExpanded = revealedSolutions[dq.id];
                  return (
                    <div 
                      key={dq.id} 
                      className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2.5 shadow-2xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black text-upsaffron-800 dark:text-upsaffron-300 bg-upsaffron-50 dark:bg-upsaffron-950 px-2.5 py-0.5 rounded-full border border-upsaffron-200 dark:border-upsaffron-800">
                          {dq.level}
                        </span>
                        <button
                          onClick={() => toggleSolution(dq.id)}
                          className="text-xs text-upsaffron-700 dark:text-upsaffron-400 hover:text-upsaffron-900 font-bold flex items-center gap-1 cursor-pointer no-print"
                        >
                          <span>{isExpanded ? (isHi ? 'उत्तर छिपाएं' : 'Hide Solution') : (isHi ? 'उत्तर देखें' : 'Reveal Solution')}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <p className="text-xs sm:text-sm font-bold text-upnavy-950 dark:text-white leading-relaxed">
                        {dq.question}
                      </p>

                      <div className="text-[11px] text-slate-500 italic">
                        {dq.hint}
                      </div>

                      {/* Expandable Solution on Screen / Visible on Print */}
                      <div className={`pt-2 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 ${isExpanded ? 'block' : 'hidden print:block'}`}>
                        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 font-medium">
                          {dq.solution}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Real-World Rural India Case Study */}
            {page.ruralCaseStudy && (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-upsaffron-500/10 to-amber-500/10 dark:from-slate-800 dark:to-slate-800 border border-amber-200/90 dark:border-slate-700 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-950 dark:text-upsaffron-300">
                  <Compass className="w-4 h-4 text-amber-600" />
                  <span>{page.ruralCaseStudy.title}</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <p><strong>{isHi ? 'पृष्ठभूमि: ' : 'Background: '}</strong>{page.ruralCaseStudy.context}</p>
                  <p><strong>{isHi ? 'अनुप्रयोग: ' : 'Application: '}</strong>{page.ruralCaseStudy.solution}</p>
                  <p className="text-emerald-800 dark:text-emerald-300 font-bold">
                    <strong>{isHi ? 'प्रभाव: ' : 'Community Impact: '}</strong>{page.ruralCaseStudy.impact}
                  </p>
                </div>
              </div>
            )}

            {/* 3. Next Action / Milestone */}
            {page.nextAction && (
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs no-print">
                <div className="space-y-0.5">
                  <div className="font-black text-upnavy-950 dark:text-white">
                    🎯 {page.nextAction.callout}
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400">
                    {page.nextAction.description}
                  </div>
                </div>
                {onJumpToQuiz && (
                  <button
                    onClick={onJumpToQuiz}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-upsaffron-600 to-amber-500 hover:from-upsaffron-500 hover:to-amber-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-95 transition cursor-pointer shrink-0"
                  >
                    <span>{isHi ? '5 प्रश्नों का क्विज़ शुरू करें (+100 XP)' : 'Start 5 Qs Quiz (+100 XP)'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Official Page Footer */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
          <span>GyanSetu Rural Digital Learning Initiative • Certified Free Academic Resource</span>
          <span>{isHi ? `पृष्ठ ${page.pageNumber} / 5` : `Page ${page.pageNumber} of 5`}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* 1. TOP DOWNLOAD & RESOURCE CENTER HERO BANNER */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-upnavy-950 via-upnavy-900 to-upnavy-950 text-white shadow-md border border-slate-800 space-y-4 no-print">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                {notes.grade} • {notes.subject.toUpperCase()}
              </span>
              <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1">
                <Check className="w-3 h-3" />
                <span>5-Page Academic Study Guide (NCERT)</span>
              </span>
            </div>
            <h2 className="text-base sm:text-xl font-black text-white leading-tight">
              {notes.title}
            </h2>
            <p className="text-xs text-slate-300 line-clamp-2 max-w-2xl">
              {notes.keyTakeaway}
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Primary Print / Download PDF */}
            <button
              onClick={handlePrintNotes}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-upsaffron-500 to-amber-500 hover:from-upsaffron-400 hover:to-amber-400 text-white font-extrabold text-xs flex items-center gap-2 shadow-sm active:scale-95 transition cursor-pointer"
              title="Print clean A4 5-page study notes or save as PDF"
            >
              <Printer className="w-4 h-4" />
              <span>{isHi ? 'प्रिंट / PDF डाउनलोड (5 पृष्ठ)' : 'Download PDF / Print Notes'}</span>
            </button>

            {/* Save Offline as .TXT */}
            <button
              onClick={handleDownloadTxt}
              className="px-3 py-2 rounded-xl border border-slate-700 bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 text-xs font-bold flex items-center gap-1.5 active:scale-95 transition cursor-pointer"
              title="Download clean offline text booklet for low-data devices"
            >
              {downloadedTxt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5 text-slate-400" />}
              <span>{downloadedTxt ? 'Saved .txt! ✓' : 'Save Text File'}</span>
            </button>
          </div>
        </div>

        {/* View Switcher Bar */}
        <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400">
              {isHi ? 'अध्ययन प्रारूप:' : 'Reading Mode:'}
            </span>
            <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewMode('stepper')}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                  viewMode === 'stepper' 
                    ? 'bg-upsaffron-500 text-white shadow-2xs' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{isHi ? 'पृष्ठ-दर-पृष्ठ (Page-by-Page)' : 'Page-by-Page'}</span>
              </button>
              <button
                onClick={() => setViewMode('continuous')}
                className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                  viewMode === 'continuous' 
                    ? 'bg-upsaffron-500 text-white shadow-2xs' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{isHi ? 'सम्पूर्ण 5 पृष्ठ (Continuous View)' : 'All 5 Pages'}</span>
              </button>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>A4 Portrait Layout Ready • 5 Total Sections</span>
          </div>
        </div>
      </div>

      {/* 2. INTERACTIVE 5-PAGE STEPPER (When in stepper mode) */}
      {viewMode === 'stepper' && (
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-2xs space-y-3 no-print">
          {/* Stepper Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2">
            {pages.map((p) => {
              const isActive = p.pageNumber === currentPage;
              const shortTitles = isHi ? [
                '1. परिचय',
                '2. सिद्धांत',
                '3. हल प्रश्न',
                '4. सूत्र सूची',
                '5. अभ्यास'
              ] : [
                '1. Foundations',
                '2. Theory',
                '3. Exemplars',
                '4. Formulas',
                '5. Practice'
              ];
              const shortLabel = shortTitles[p.pageNumber - 1] || `Page ${p.pageNumber}`;

              return (
                <button
                  key={p.pageNumber}
                  onClick={() => setCurrentPage(p.pageNumber)}
                  className={`p-2 sm:p-2.5 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-0.5 border transition cursor-pointer active:scale-95 ${
                    isActive
                      ? 'bg-gradient-to-r from-upnavy-900 to-upnavy-800 text-white border-upnavy-700 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <span className={`text-[10px] uppercase tracking-wider ${isActive ? 'text-amber-400' : 'text-slate-400'}`}>
                    Page {p.pageNumber}
                  </span>
                  <span className="truncate w-full text-center">
                    {shortLabel}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Stepper Progress Bar */}
          <div className="flex items-center gap-3 pt-1">
            <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-upsaffron-500 to-amber-500 transition-all duration-300"
                style={{ width: `${(currentPage / 5) * 100}%` }}
              />
            </div>
            <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 shrink-0">
              {isHi ? `पृष्ठ ${currentPage} का 5 (${(currentPage / 5) * 100}%)` : `Page ${currentPage} of 5 (${(currentPage / 5) * 100}%)`}
            </span>
          </div>
        </div>
      )}

      {/* 3. MAIN CONTENT DISPLAY */}
      {viewMode === 'stepper' ? (
        // Single Active Page View on screen; in print mode, all 5 pages print automatically!
        <div className="space-y-4">
          {renderSinglePage(activePageObj)}

          {/* Hidden on screen but included for clean Print execution */}
          <div className="hidden print:block space-y-6">
            {pages.filter(p => p.pageNumber !== currentPage).map(p => renderSinglePage(p))}
          </div>

          {/* Stepper Bottom Navigation Controls */}
          <div className="flex items-center justify-between gap-3 pt-2 no-print">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition ${
                currentPage === 1
                  ? 'opacity-40 cursor-not-allowed bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
                  : 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 active:scale-95 shadow-2xs cursor-pointer'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isHi ? 'पिछला पृष्ठ' : 'Previous Page'}</span>
            </button>

            <span className="text-xs font-bold text-slate-500">
              Page {currentPage} of 5
            </span>

            {currentPage < 5 ? (
              <button
                onClick={() => setCurrentPage(prev => Math.min(5, prev + 1))}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-upnavy-900 to-upnavy-800 hover:from-upsaffron-600 hover:to-amber-500 text-white text-xs font-bold flex items-center gap-2 shadow-xs active:scale-95 transition cursor-pointer"
              >
                <span>{isHi ? 'अगला पृष्ठ' : 'Next Page'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : onJumpToQuiz ? (
              <button
                onClick={onJumpToQuiz}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-upsaffron-600 to-amber-500 hover:from-upsaffron-500 hover:to-amber-400 text-white text-xs font-bold flex items-center gap-2 shadow-xs active:scale-95 transition cursor-pointer"
              >
                <span>{isHi ? '5 प्रश्नों का क्विज़' : '5 Qs Quiz'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        // Continuous 5-Page View (All 5 pages laid out sequentially)
        <div className="space-y-6">
          {pages.map((p, idx) => (
            <React.Fragment key={p.pageNumber}>
              {renderSinglePage(p)}
              {idx < pages.length - 1 && (
                <div className="flex items-center gap-3 my-4 no-print">
                  <div className="flex-1 border-t-2 border-dashed border-slate-200 dark:border-slate-700" />
                  <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                    ✂️ Page Break • Page {p.pageNumber + 1} of 5 Below
                  </span>
                  <div className="flex-1 border-t-2 border-dashed border-slate-200 dark:border-slate-700" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* 4. BOTTOM DOWNLOAD CALLOUT BANNER */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs no-print">
        <div className="space-y-0.5">
          <div className="font-black text-upnavy-950 dark:text-white flex items-center gap-2">
            <Printer className="w-4 h-4 text-upsaffron-600" />
            <span>{isHi ? 'पूरे 5 पृष्ठ एक क्लिक में प्रिंट अथवा PDF सेव करें' : 'Print Clean A4 5-Page Booklet or Save as PDF'}</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            {isHi ? 'प्रिंट डायलॉग में "Save as PDF" चुनकर ऑफलाइन उपयोग हेतु 5-पृष्ठों की गाइड सुरक्षित रखें।' : 'Choose "Save as PDF" in your print dialog to save the complete 5-page guide for offline study.'}
          </div>
        </div>

        <button
          onClick={handlePrintNotes}
          className="px-4 py-2 rounded-xl bg-upnavy-900 hover:bg-upsaffron-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-2xs active:scale-95 transition cursor-pointer shrink-0"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>{isHi ? 'प्रिंट / PDF' : 'Print / Save PDF'}</span>
        </button>
      </div>
    </div>
  );
}
