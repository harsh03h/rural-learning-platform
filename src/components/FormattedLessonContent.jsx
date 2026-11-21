import React from 'react';
import { 
  BookOpen, 
  Lightbulb, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  BookmarkCheck,
  Compass,
  ArrowRight
} from 'lucide-react';

/**
 * Parses inline formatting (**bold** and *italic*)
 */
function renderFormattedInline(text) {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-upnavy-950 dark:text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={i} className="italic text-slate-800 dark:text-slate-200">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
}

/**
 * Parses structured NCERT chapter markdown into clean section objects
 */
function parseLessonMarkdown(rawText) {
  if (!rawText) return [];

  // Split by section headers starting with ###
  const rawSections = rawText.split(/(?=^###\s+)/m);
  const sections = [];

  for (let raw of rawSections) {
    const trimmed = raw.trim();
    if (!trimmed) continue;

    const lines = trimmed.split('\n').map(l => l.trim()).filter(Boolean);
    let title = '';
    let sectionNumber = null;
    let contentLines = lines;

    if (lines[0].startsWith('###')) {
      const headerLine = lines[0].replace(/^###\s+/, '').trim();
      const numMatch = headerLine.match(/^(\d+)\.\s*(.*)$/);
      if (numMatch) {
        sectionNumber = numMatch[1];
        title = numMatch[2];
      } else {
        title = headerLine;
      }
      contentLines = lines.slice(1);
    }

    const blocks = [];
    let currentList = null;

    for (let line of contentLines) {
      const numMatch = line.match(/^(\d+)\.\s+(.*)$/);
      const bulletMatch = line.match(/^[-*]\s+(.*)$/);

      if (numMatch) {
        if (!currentList || currentList.type !== 'numbered') {
          currentList = { type: 'numbered', items: [] };
          blocks.push(currentList);
        }
        currentList.items.push({ num: numMatch[1], text: numMatch[2] });
      } else if (bulletMatch) {
        if (!currentList || currentList.type !== 'bullet') {
          currentList = { type: 'bullet', items: [] };
          blocks.push(currentList);
        }
        currentList.items.push(bulletMatch[1]);
      } else {
        currentList = null;
        const lower = line.toLowerCase();
        if (
          lower.startsWith('example:') || 
          lower.startsWith('उदाहरण:') || 
          lower.startsWith('a farmer') || 
          lower.startsWith('किसान') ||
          lower.startsWith('key takeaway') ||
          lower.startsWith('महत्वपूर्ण')
        ) {
          blocks.push({ type: 'callout', text: line });
        } else {
          blocks.push({ type: 'paragraph', text: line });
        }
      }
    }

    sections.push({
      number: sectionNumber,
      title: title || 'Core Concept',
      blocks
    });
  }

  return sections;
}

export function FormattedLessonContent({ content, lang = 'en', onTakeQuiz }) {
  if (!content) return null;

  const sections = parseLessonMarkdown(content);

  return (
    <div className="space-y-4">
      {sections.map((sec, secIdx) => {
        const displayNumber = sec.number || (secIdx + 1);

        return (
          <div 
            key={secIdx}
            className="rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 p-4 sm:p-6 shadow-xs hover:shadow-sm transition-all space-y-4 group"
          >
            {/* Section Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700/70 gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-upnavy-900 to-upnavy-800 text-upsaffron-400 font-mono font-black text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-2xs border border-upnavy-700/40">
                  {displayNumber}
                </div>
                <h3 className="text-sm sm:text-base font-black text-upnavy-950 dark:text-slate-100 tracking-tight leading-snug">
                  {sec.title}
                </h3>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 dark:bg-slate-700/60 px-2 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-600/60 shrink-0">
                Part {displayNumber}
              </span>
            </div>

            {/* Section Blocks */}
            <div className="space-y-3">
              {sec.blocks.map((block, bIdx) => {
                if (block.type === 'paragraph') {
                  return (
                    <p 
                      key={bIdx}
                      className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans"
                    >
                      {renderFormattedInline(block.text)}
                    </p>
                  );
                }

                if (block.type === 'numbered') {
                  return (
                    <div key={bIdx} className="space-y-2 pt-1">
                      {block.items.map((item, itemIdx) => (
                        <div 
                          key={itemIdx}
                          className="flex items-start gap-3 p-3 rounded-xl sm:rounded-2xl bg-slate-50/70 hover:bg-slate-100/70 dark:bg-slate-800/60 dark:hover:bg-slate-700/40 border border-slate-200/70 dark:border-slate-700/70 transition-all duration-150"
                        >
                          <span className="w-6 h-6 rounded-lg bg-upnavy-100 dark:bg-slate-700 text-upnavy-900 dark:text-upsaffron-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 border border-upnavy-200/80 dark:border-slate-600">
                            {item.num}
                          </span>
                          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-0.5">
                            {renderFormattedInline(item.text)}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }

                if (block.type === 'bullet') {
                  return (
                    <div key={bIdx} className="space-y-2 pt-1 bg-slate-50/50 dark:bg-slate-800/40 p-3 sm:p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
                      {block.items.map((bullet, bulletIdx) => (
                        <div key={bulletIdx} className="flex items-start gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-upsaffron-500 ring-2 ring-upsaffron-200 dark:ring-upsaffron-950 mt-1.5 shrink-0" />
                          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            {renderFormattedInline(bullet)}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }

                if (block.type === 'callout') {
                  return (
                    <div 
                      key={bIdx}
                      className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-50/90 via-amber-50/50 to-orange-50/30 dark:from-amber-950/30 dark:via-slate-800/40 dark:to-slate-800/20 border border-amber-200/80 dark:border-amber-800/60 flex items-start gap-3 shadow-2xs"
                    >
                      <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 border border-amber-300/80 dark:border-amber-700/60">
                        <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed pt-0.5 font-medium">
                        {renderFormattedInline(block.text)}
                      </div>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </div>
        );
      })}

      {/* Lesson Complete & Quiz Incentive Banner */}
      {onTakeQuiz && (
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-upnavy-900 via-upnavy-800 to-upnavy-950 text-white shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3.5 mt-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 text-upsaffron-400 flex items-center justify-center shrink-0 border border-white/10">
              <Sparkles className="w-5 h-5 text-upsaffron-400" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-black text-white">
                {lang === 'hi' ? 'पाठ पूरा हुआ! अपनी समझ की जांच करें' : 'Lesson Complete! Test Your Understanding'}
              </div>
              <div className="text-[11px] text-slate-300">
                {lang === 'hi' 
                  ? '5 प्रश्नों का NCERT क्विज़ हल करें और +100 तक XP जीतें।' 
                  : 'Take the 5-question NCERT quiz to earn up to +100 XP & lock your streak.'}
              </div>
            </div>
          </div>

          <button
            onClick={onTakeQuiz}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-upsaffron-600 hover:bg-upsaffron-500 text-white text-xs font-black flex items-center justify-center gap-2 shadow-sm shadow-upsaffron-600/30 transition active:scale-95 shrink-0"
          >
            <span>{lang === 'hi' ? '5 प्रश्नों का क्विज़ शुरू करें' : 'Start 5-Question Quiz'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
