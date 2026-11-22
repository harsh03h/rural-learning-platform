import React, { useState, useEffect } from 'react';
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
  BookMarked,
  X,
  ShieldCheck
} from 'lucide-react';
import { getNotesForChapter, formatNotesAsDocumentText } from '../data/chapterNotesBank';

export function ChapterNotesTab({ chapter, lang = 'en', onJumpToQuiz }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('stepper'); // 'stepper' | 'continuous'
  const [downloadedTxt, setDownloadedTxt] = useState(false);
  const [revealedSolutions, setRevealedSolutions] = useState({});
  const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState(false);

  const notes = getNotesForChapter(chapter, lang);

  useEffect(() => {
    const handleAfterPrint = () => {
      document.body.classList.remove('printing-notes-active');
    };
    window.addEventListener('afterprint', handleAfterPrint);
    return () => {
      window.removeEventListener('afterprint', handleAfterPrint);
      document.body.classList.remove('printing-notes-active');
    };
  }, []);

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

  const handleTriggerPrint = () => {
    document.body.classList.add('printing-notes-active');
    window.print();
    // Fallback safety timeout to clear class if afterprint doesn't fire
    setTimeout(() => {
      document.body.classList.remove('printing-notes-active');
    }, 1500);
  };

  const toggleSolution = (key) => {
    setRevealedSolutions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  /**
   * Renders the authentic, high-prestige NCERT A4 Printable Academic Study Guide Page.
   * Used for both on-screen print preview and the physical/PDF print engine.
   */
  const renderA4PrintablePage = (page, isPreview = false) => {
    if (!page) return null;

    return (
      <div 
        key={`a4-page-${page.pageNumber}`}
        className={`notes-printable-page-a4 bg-white text-slate-900 border-2 border-slate-900 rounded-md p-3.5 sm:p-6 md:p-8 flex flex-col justify-between ${
          isPreview ? 'shadow-xl max-w-full sm:max-w-[210mm] mx-auto min-h-0 sm:min-h-[297mm] my-2 sm:my-6 transition-transform' : ''
        }`}
        style={{ boxSizing: 'border-box' }}
      >
        {/* TOP OFFICIAL ACADEMIC LETTERHEAD */}
        <div className="border-b-2 border-slate-900 pb-2.5 mb-3.5 sm:mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-upnavy-950 text-white flex flex-col items-center justify-center font-black text-xs border border-amber-500 shrink-0 shadow-xs">
                <span className="text-[10px] sm:text-[11px] leading-tight text-amber-400">ज्ञान</span>
                <span className="text-[7.5px] sm:text-[8px] leading-none text-slate-200">सेतु</span>
              </div>
              <div className="min-w-0">
                <div className="text-[11px] sm:text-sm font-black uppercase tracking-wider text-slate-950 leading-tight">
                  GyanSetu Rural Digital Learning Initiative
                </div>
                <div className="text-[8px] sm:text-[9px] font-bold text-amber-700 uppercase tracking-wider leading-tight mt-0.5">
                  Autonomous Academic Council • Certified Under NCF
                </div>
              </div>
            </div>

            <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-center border-t border-slate-200 sm:border-0 pt-1.5 sm:pt-0 shrink-0">
              <div className="text-[9px] sm:text-[10px] font-mono font-black text-slate-900">
                DOC REF: GS-2026-{notes.subject.toUpperCase()}-CH0{page.pageNumber}
              </div>
              <div className="inline-block bg-slate-950 text-white font-mono text-[8.5px] sm:text-[9px] font-black px-2 py-0.5 rounded sm:mt-0.5">
                PAGE {page.pageNumber} OF 5
              </div>
            </div>
          </div>

          {/* Secondary Title Bar with Double Rule */}
          <div className="mt-2 pt-1.5 sm:pt-2 border-t border-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-0.5 sm:gap-2 text-xs">
            <div className="font-extrabold text-slate-900 uppercase tracking-tight text-[11px] sm:text-xs">
              {notes.grade} • {notes.subject.toUpperCase()} • {notes.title}
            </div>
            <div className="text-[8.5px] sm:text-[10px] font-bold text-slate-600 uppercase tracking-wider">
              NCERT Academic Study Guide
            </div>
          </div>
          <div className="h-0.5 bg-gradient-to-r from-upsaffron-600 via-amber-500 to-upsaffron-600 mt-1 rounded-full" />
        </div>

        {/* PAGE SPECIFIC ACADEMIC CONTENT */}
        <div className="flex-1 space-y-4 text-xs leading-relaxed">
          {/* Page Badge & Title */}
          <div className="border-l-4 border-upsaffron-600 pl-3 py-0.5 space-y-0.5">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800">
              {page.badge}
            </div>
            <h2 className="text-base sm:text-lg font-black text-slate-950 uppercase">
              {page.title}
            </h2>
            <p className="text-[11px] font-medium text-slate-600 italic">
              {page.subtitle}
            </p>
          </div>

          {/* PAGE 1: Foundations & Prerequisites */}
          {page.pageKey === 'foundations' && (
            <div className="space-y-3.5">
              {/* Overview */}
              <div className="p-3.5 rounded-lg border border-slate-300 bg-slate-50/70 space-y-1.5">
                <div className="font-black text-slate-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                  <span>1.1 Academic Context & In-Depth Chapter Overview</span>
                </div>
                {(page.academicOverview || []).map((para, idx) => (
                  <p key={idx} className="text-slate-800 text-[11px] leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* Objectives */}
              <div className="p-3 rounded-lg border border-amber-300 bg-amber-50/50 space-y-2">
                <div className="font-black text-amber-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>1.2 Target NCERT Learning Objectives & Competencies</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(page.learningObjectives || []).map((obj, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-[10.5px] text-slate-800 bg-white/90 p-2 rounded border border-amber-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prerequisites & Rural Context */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {page.prerequisites && (
                  <div className="p-3 rounded-lg border border-slate-300 bg-white space-y-1.5">
                    <div className="font-black text-slate-900 uppercase tracking-wider text-[10.5px] flex items-center gap-1.5">
                      <BookMarked className="w-3.5 h-3.5 text-indigo-700" />
                      <span>1.3 Prerequisite Knowledge Bridge</span>
                    </div>
                    <p className="text-[10px] text-slate-600">
                      {page.prerequisites.intro}
                    </p>
                    <ul className="space-y-1 text-[10px] text-slate-800">
                      {(page.prerequisites.items || []).map((it, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="font-bold text-amber-700">•</span>
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="p-3 rounded-lg border border-emerald-300 bg-emerald-50/50 space-y-1.5">
                  <div className="font-black text-emerald-950 uppercase tracking-wider text-[10.5px] flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-emerald-700" />
                    <span>1.4 Practical & Rural Community Relevance</span>
                  </div>
                  <p className="text-[10.5px] text-slate-800 leading-relaxed">
                    {page.realWorldRelevance}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 2: Conceptual Theory & Mechanisms */}
          {page.pageKey === 'theory' && (
            <div className="space-y-3.5">
              {/* Theory text */}
              <div className="p-3 rounded-lg border border-slate-300 bg-slate-50/60 space-y-1">
                <div className="font-black text-slate-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-700" />
                  <span>2.1 Conceptual Theory & Core Scientific Principles</span>
                </div>
                {(page.deepTheory || []).map((t, idx) => (
                  <p key={idx} className="text-slate-800 text-[11px] leading-relaxed">
                    {t}
                  </p>
                ))}
              </div>

              {/* Theorems */}
              <div className="space-y-1.5">
                <div className="font-black text-slate-950 uppercase tracking-wider text-[11px]">
                  2.2 Fundamental Laws, Theorems & Axioms
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(page.theorems || []).map((th, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg border border-slate-300 bg-white space-y-1">
                      <div className="flex items-center justify-between text-[10.5px]">
                        <span className="font-black text-slate-900">{th.name}</span>
                        <span className="text-[9px] font-bold font-mono px-1.5 py-0.2 bg-amber-100 text-amber-900 rounded border border-amber-300">
                          {th.ruleType}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-700 leading-relaxed">
                        {th.statement}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mechanisms */}
              {page.mechanism && (
                <div className="p-3 rounded-lg border border-sky-300 bg-sky-50/40 space-y-2">
                  <div className="font-black text-sky-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-700" />
                    <span>2.3 {page.mechanism.title}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {(page.mechanism.steps || []).map((st) => (
                      <div key={st.num} className="p-2 rounded bg-white border border-sky-200 space-y-1 text-[10px]">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900">
                          <span className="w-4 h-4 rounded-full bg-sky-700 text-white text-[9px] font-black flex items-center justify-center shrink-0">
                            {st.num}
                          </span>
                          <span className="truncate">{st.title}</span>
                        </div>
                        <p className="text-slate-600 text-[9.5px] leading-tight">
                          {st.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comparative Table */}
              {page.comparativeTable && (
                <div className="space-y-1">
                  <div className="font-black text-slate-950 uppercase tracking-wider text-[10.5px]">
                    2.4 Comparative Analysis & Classification Matrix
                  </div>
                  <div className="overflow-x-auto -mx-1 sm:mx-0 rounded border border-slate-300">
                    <table className="w-full min-w-[480px] text-left text-[10px] border-collapse">
                      <thead>
                        <tr className="bg-slate-100 text-slate-950 font-bold border-b border-slate-300">
                          {(page.comparativeTable.headers || []).map((h, idx) => (
                            <th key={idx} className="p-1.5 sm:p-2 border-r border-slate-200 last:border-0">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-slate-800">
                        {(page.comparativeTable.rows || []).map((r, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50/50">
                            {r.map((c, cIdx) => (
                              <td key={cIdx} className={`p-1.5 sm:p-2 border-r border-slate-200 last:border-0 ${cIdx === 0 ? 'font-bold' : ''}`}>
                                {c}
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

          {/* PAGE 3: Solved NCERT Exemplar Problems */}
          {page.pageKey === 'exemplars' && (
            <div className="space-y-3">
              {(page.exemplars || []).map((ex) => (
                <div key={ex.id} className="p-3 rounded-lg border border-slate-300 bg-white space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                      {ex.marksBadge}
                    </span>
                    <span className="text-[9.5px] font-mono font-bold text-slate-500">
                      NCERT EXEMPLAR PROBLEM #{ex.id}
                    </span>
                  </div>

                  <p className="font-bold text-slate-950 text-[11px] leading-snug">
                    {ex.question}
                  </p>

                  <div className="p-2 rounded bg-slate-50 border border-slate-200 text-[10px] text-slate-700">
                    <strong>Given / Parameters:</strong> {ex.given}
                  </div>

                  {/* Solution steps */}
                  <div className="space-y-1 pl-2 border-l-2 border-amber-600 text-[10px]">
                    {(ex.steps || []).map((st, idx) => (
                      <div key={idx} className="text-slate-800">
                        <strong className="text-slate-950 mr-1">{st.step}:</strong>
                        <span>{st.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Final answer and tip */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-slate-200 text-[10px]">
                    <div className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-950 font-bold border border-emerald-300 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{ex.finalAnswer}</span>
                    </div>
                    <div className="text-[9.5px] text-slate-600 italic flex items-center gap-1">
                      <Lightbulb className="w-3 h-3 text-amber-600 shrink-0" />
                      <span>{ex.examinerTip}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PAGE 4: High-Yield Formula Sheet & Exam Traps */}
          {page.pageKey === 'cheatsheet' && (
            <div className="space-y-3.5">
              {/* Formula Grid */}
              <div className="space-y-1.5">
                <div className="font-black text-slate-950 uppercase tracking-wider text-[11px]">
                  4.1 Master Formula & Definitions Matrix
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(page.formulaGrid || []).map((f, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg border border-slate-300 bg-white space-y-1">
                      <div className="flex items-center justify-between text-[10.5px]">
                        <span className="font-black text-slate-900">{f.term}</span>
                        <span className="font-mono text-[9px] text-slate-500">#{idx + 1}</span>
                      </div>
                      <p className="text-[10px] text-slate-700 font-medium">
                        {f.definition}
                      </p>
                      <div className="text-[9px] font-mono text-slate-500">
                        {f.notation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Table */}
              {page.quickSummaryTable && (
                <div className="space-y-1">
                  <div className="font-black text-slate-950 uppercase tracking-wider text-[10.5px]">
                    4.2 Quick Revision Matrix
                  </div>
                  <div className="overflow-x-auto -mx-1 sm:mx-0 rounded border border-slate-300">
                    <table className="w-full min-w-[480px] text-left text-[10px] border-collapse">
                      <thead>
                        <tr className="bg-slate-100 text-slate-950 font-bold border-b border-slate-300">
                          {(page.quickSummaryTable.headers || []).map((h, idx) => (
                            <th key={idx} className="p-1.5 border-r border-slate-200 last:border-0">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-slate-800">
                        {(page.quickSummaryTable.rows || []).map((r, rIdx) => (
                          <tr key={rIdx}>
                            {r.map((c, cIdx) => (
                              <td key={cIdx} className={`p-1.5 border-r border-slate-200 last:border-0 ${cIdx === 0 ? 'font-bold' : ''}`}>{c}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Exam Traps */}
              <div className="space-y-1.5">
                <div className="font-black text-rose-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>4.3 High-Yield Board Exam Pitfalls & Traps</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {(page.examTraps || []).map((tr, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg border border-rose-300 bg-rose-50/50 space-y-1 text-[10px]">
                      <div className="font-black text-rose-950">⚠️ {tr.title}</div>
                      <div className="text-slate-800">
                        <strong className="text-rose-700">Mistake:</strong> {tr.mistake}
                      </div>
                      <div className="text-slate-800">
                        <strong className="text-emerald-700">Fix:</strong> {tr.fix}
                      </div>
                      <div className="text-[9px] text-slate-500 italic pt-0.5">{tr.why}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mnemonic */}
              {page.mnemonic && (
                <div className="p-2.5 rounded-lg border border-amber-300 bg-amber-50/60 flex items-start gap-2 text-[10.5px]">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-950">{page.mnemonic.title}: </strong>
                    <span className="text-slate-800 font-medium">{page.mnemonic.text}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PAGE 5: Self-Assessment Practice Drill & Real-World Rural Impact */}
          {page.pageKey === 'practice' && (
            <div className="space-y-3.5">
              {/* Practice Questions */}
              <div className="space-y-2">
                <div className="font-black text-slate-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-700" />
                  <span>5.1 Self-Assessment Practice Drill & Model Answers</span>
                </div>
                {(page.drillQuestions || []).map((dq) => (
                  <div key={dq.id} className="p-2.5 rounded-lg border border-slate-300 bg-white space-y-1 text-[10.5px]">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-amber-900 bg-amber-100 px-1.5 py-0.2 rounded border border-amber-300 text-[9.5px]">
                        {dq.level}
                      </span>
                    </div>
                    <p className="font-bold text-slate-950 leading-snug">
                      {dq.question}
                    </p>
                    <div className="p-2 rounded bg-emerald-50 border border-emerald-200 text-emerald-950 text-[10px]">
                      <strong>Model Solution & Working:</strong> {dq.solution}
                    </div>
                  </div>
                ))}
              </div>

              {/* Rural Case Study */}
              {page.ruralCaseStudy && (
                <div className="p-3 rounded-lg border border-amber-300 bg-amber-50/50 space-y-1 text-[10.5px]">
                  <div className="font-black text-amber-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-amber-700" />
                    <span>5.2 {page.ruralCaseStudy.title}</span>
                  </div>
                  <div className="text-slate-800 space-y-1 text-[10px]">
                    <div><strong>Context:</strong> {page.ruralCaseStudy.context}</div>
                    <div><strong>Action:</strong> {page.ruralCaseStudy.solution}</div>
                    <div className="text-emerald-900 font-bold"><strong>Community Impact:</strong> {page.ruralCaseStudy.impact}</div>
                  </div>
                </div>
              )}

              {/* Official Academic Seal & Signatures */}
              <div className="p-3 rounded-lg border-2 border-slate-900 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-3">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-amber-600 bg-amber-50 flex flex-col items-center justify-center text-center p-1 shrink-0">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700" />
                    <span className="text-[6.5px] sm:text-[7px] font-black uppercase leading-none mt-0.5 text-amber-900">VERIFIED</span>
                    <span className="text-[5.5px] sm:text-[6px] font-mono text-amber-700">2026-27</span>
                  </div>
                  <div className="text-[10px]">
                    <div className="font-black text-slate-950 uppercase text-[9.5px] sm:text-[10px]">
                      Curriculum Verified & Certified
                    </div>
                    <div className="text-slate-600 text-[8.5px] sm:text-[9px]">
                      National Curriculum Framework Autonomous Academic Council
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-around sm:justify-end gap-4 sm:gap-6 text-center text-[9px] w-full sm:w-auto shrink-0 border-t border-slate-200 sm:border-0 pt-2 sm:pt-0">
                  <div className="border-t border-slate-400 pt-1 w-24">
                    <div className="font-serif italic font-bold text-slate-800">Sunita Deshmukh</div>
                    <div className="text-[8px] text-slate-500">Dr. Sunita Deshmukh</div>
                    <div className="text-[7px] text-slate-400">Head of Academic Council</div>
                  </div>
                  <div className="border-t border-slate-400 pt-1 w-24">
                    <div className="font-serif italic font-bold text-slate-800">Rajeshwar Rao</div>
                    <div className="text-[8px] text-slate-500">Prof. Rajeshwar Rao</div>
                    <div className="text-[7px] text-slate-400">Director of Curriculum</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM OFFICIAL ACADEMIC FOOTER */}
        <div className="border-t-2 border-slate-900 pt-2 mt-4 flex flex-col sm:flex-row items-center justify-between gap-1 text-[8.5px] sm:text-[9px] text-slate-600 text-center sm:text-left">
          <div>GyanSetu Rural Digital Learning Initiative • Free Quality Education</div>
          <div className="font-bold text-slate-900 uppercase">
            PAGE {page.pageNumber} OF 5 • OFFICIAL STUDY GUIDE
          </div>
          <div className="hidden sm:block">Registry ID: GS-2026-CERTIFIED</div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* ========================================================================= */}
      {/* 1. DEDICATED PRINTABLE A4 MULTI-PAGE DOCUMENT (100% ISOLATED FOR PRINT)   */}
      {/* ========================================================================= */}
      <div className="notes-print-document hidden print:block">
        {pages.map((p) => renderA4PrintablePage(p, false))}
      </div>

      {/* ========================================================================= */}
      {/* 2. ON-SCREEN INTERACTIVE NOTES VIEW (HIDDEN DURING PHYSICAL / PDF PRINT)  */}
      {/* ========================================================================= */}
      <div className="notes-screen-view print:hidden space-y-5">
        {/* TOP DOWNLOAD & RESOURCE CENTER HERO BANNER */}
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-upnavy-950 via-upnavy-900 to-upnavy-950 text-white shadow-md border border-slate-800 space-y-4 no-print">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
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
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto shrink-0">
              {/* Primary Print / Download PDF */}
              <button
                onClick={() => setIsPrintPreviewOpen(true)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-upsaffron-500 to-amber-500 hover:from-upsaffron-400 hover:to-amber-400 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-95 transition cursor-pointer whitespace-nowrap"
                title="Open clean A4 print preview and PDF export"
              >
                <Printer className="w-4 h-4 shrink-0" />
                <span>{isHi ? 'प्रिंट / PDF पूर्वावलोकन (5 पृष्ठ)' : 'Print / Download PDF (5 Pages)'}</span>
              </button>

              {/* Save Offline as .TXT */}
              <button
                onClick={handleDownloadTxt}
                className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition cursor-pointer whitespace-nowrap"
                title="Download clean offline text booklet for low-data devices"
              >
                {downloadedTxt ? <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <Download className="w-3.5 h-3.5 text-slate-400 shrink-0" />}
                <span>{downloadedTxt ? 'Saved .txt! ✓' : 'Save Text File'}</span>
              </button>
            </div>
          </div>

          {/* View Switcher Bar */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
              <span className="text-[10.5px] sm:text-[11px] font-bold text-slate-400 shrink-0">
                {isHi ? 'प्रारूप:' : 'Reading Mode:'}
              </span>
              <div className="inline-flex bg-slate-900/90 p-0.5 sm:p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setViewMode('stepper')}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 sm:gap-1.5 transition whitespace-nowrap ${
                    viewMode === 'stepper' 
                      ? 'bg-upsaffron-500 text-white shadow-2xs' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span>{isHi ? 'पृष्ठ-दर-पृष्ठ' : 'Page-by-Page'}</span>
                </button>
                <button
                  onClick={() => setViewMode('continuous')}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 sm:gap-1.5 transition whitespace-nowrap ${
                    viewMode === 'continuous' 
                      ? 'bg-upsaffron-500 text-white shadow-2xs' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span>{isHi ? 'सम्पूर्ण 5 पृष्ठ' : 'All 5 Pages'}</span>
                </button>
              </div>
            </div>

            <div className="text-[10px] sm:text-[11px] text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
              <span className="truncate">A4 Multi-Page Ready • Strict 1-5 Order</span>
            </div>
          </div>
        </div>

        {/* INTERACTIVE 5-PAGE STEPPER (When in stepper mode) */}
        {viewMode === 'stepper' && (
          <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-2xs space-y-2.5 sm:space-y-3 no-print">
            {/* Horizontal scroll on mobile (<sm), 5-column grid on desktop (sm+) */}
            <div className="flex sm:grid sm:grid-cols-5 gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 -mx-1 px-1">
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
                    className={`shrink-0 min-w-[92px] sm:min-w-0 flex-1 p-2 sm:p-2.5 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-0.5 border transition cursor-pointer active:scale-95 ${
                      isActive
                        ? 'bg-gradient-to-r from-upnavy-900 to-upnavy-800 text-white border-upnavy-700 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span className={`text-[10px] uppercase tracking-wider ${isActive ? 'text-amber-400' : 'text-slate-400'}`}>
                      Page {p.pageNumber}
                    </span>
                    <span className="truncate w-full text-center text-[11px] sm:text-xs">
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
              <span className="text-[10.5px] sm:text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 shrink-0">
                {isHi ? `पृष्ठ ${currentPage} का 5 (${(currentPage / 5) * 100}%)` : `Page ${currentPage} of 5 (${(currentPage / 5) * 100}%)`}
              </span>
            </div>
          </div>
        )}

        {/* SCREEN CONTENT DISPLAY */}
        {viewMode === 'stepper' ? (
          <div className="space-y-4">
            {renderA4PrintablePage(activePageObj, true)}

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
          <div className="space-y-8">
            {pages.map((p, idx) => (
              <React.Fragment key={p.pageNumber}>
                {renderA4PrintablePage(p, true)}
                {idx < pages.length - 1 && (
                  <div className="flex items-center gap-3 my-4 no-print">
                    <div className="flex-1 border-t-2 border-dashed border-slate-300 dark:border-slate-700" />
                    <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-300 dark:border-slate-700">
                      ✂️ A4 Page Break • Section {p.pageNumber + 1} of 5 Below
                    </span>
                    <div className="flex-1 border-t-2 border-dashed border-slate-300 dark:border-slate-700" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* BOTTOM DOWNLOAD CALLOUT BANNER */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs no-print">
          <div className="space-y-0.5">
            <div className="font-black text-upnavy-950 dark:text-white flex items-center gap-2">
              <Printer className="w-4 h-4 text-upsaffron-600" />
              <span>{isHi ? 'पूरे 5 पृष्ठ एक क्लिक में प्रिंट अथवा PDF सेव करें' : 'Print Clean A4 5-Page Booklet or Save as PDF'}</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              {isHi ? 'प्रिंट पूर्वावलोकन खोलें और उच्च-गुणवत्ता A4 प्रारूप में अध्ययन गाइड प्राप्त करें।' : 'Open official print preview to inspect all 5 pages and export pristine academic study material.'}
            </div>
          </div>

          <button
            onClick={() => setIsPrintPreviewOpen(true)}
            className="px-4 py-2 rounded-xl bg-upnavy-900 hover:bg-upsaffron-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-2xs active:scale-95 transition cursor-pointer shrink-0"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{isHi ? 'प्रिंट पूर्वावलोकन' : 'Open Print Preview'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. DEDICATED FULL-SCREEN A4 PRINT PREVIEW MODAL                           */}
      {/* ========================================================================= */}
      {isPrintPreviewOpen && (
        <div className="fixed inset-0 z-[70] bg-slate-950/85 backdrop-blur-md flex flex-col no-print animate-fadeIn">
          {/* Sticky Top Toolbar */}
          <div className="shrink-0 px-3 sm:px-6 py-2.5 sm:py-3 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 z-30">
            <div className="flex items-center justify-between sm:justify-start gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-upsaffron-600 to-amber-500 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
                  <Printer className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-sm font-black text-upnavy-950 dark:text-white truncate">
                    {isHi ? 'राष्ट्रीय पाठ्यक्रम अध्ययन गाइड - प्रिंट पूर्वावलोकन' : 'A4 Academic Study Guide • Print Preview'}
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    {notes.grade} • {notes.subject.toUpperCase()} • 5 Complete A4 Pages
                  </p>
                </div>
              </div>

              {/* Mobile-only close button on top right */}
              <button
                onClick={() => setIsPrintPreviewOpen(false)}
                className="sm:hidden p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 transition cursor-pointer"
                title="Close Preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleTriggerPrint}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-gradient-to-r from-upsaffron-500 to-amber-500 hover:from-upsaffron-400 hover:to-amber-400 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xs active:scale-95 transition cursor-pointer whitespace-nowrap"
              >
                <Printer className="w-4 h-4 shrink-0" />
                <span>{isHi ? 'प्रिंट करें (या PDF सेव करें)' : 'Print / Save PDF (5 Pages)'}</span>
              </button>

              {/* Desktop close button */}
              <button
                onClick={() => setIsPrintPreviewOpen(false)}
                className="hidden sm:flex p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition cursor-pointer"
                title="Close Preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Document Preview Area */}
          <div className="flex-1 overflow-y-auto p-2 sm:p-6 md:p-8 bg-slate-900/70">
            <div className="max-w-[210mm] mx-auto space-y-4 sm:space-y-8">
              {pages.map((p) => renderA4PrintablePage(p, true))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
