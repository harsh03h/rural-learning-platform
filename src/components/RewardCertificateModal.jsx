import React, { useState, useEffect } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Award, 
  Sparkles, 
  Trophy, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Globe, 
  School, 
  Share2,
  Check
} from 'lucide-react';

export function RewardCertificateModal({
  isOpen,
  onClose,
  currentUser,
  studentStats = { streakDays: 4, pointsXP: 350 },
  lang = 'en'
}) {
  if (!isOpen) return null;

  const [certLang, setCertLang] = useState(lang === 'hi' ? 'hi' : 'en');
  const [copied, setCopied] = useState(false);

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const isGuest = !currentUser;
  const studentName = currentUser?.name || (certLang === 'hi' ? 'आरव शर्मा' : 'Aarav Sharma');
  const studentGrade = currentUser?.grade || 'Class 7';
  const studentRoll = currentUser?.roll || '7042';
  const studentSchool = currentUser?.school || (isGuest 
    ? (certLang === 'hi' ? 'मॉडल उच्चतर माध्यमिक विद्यालय, रामपुर' : 'Model Senior Secondary School, Rampur') 
    : 'Model Senior Secondary School Rampur');
  const pointsXP = studentStats.pointsXP || 350;
  const streakDays = studentStats.streakDays || 4;

  const currentDate = new Date().toLocaleDateString(certLang === 'hi' ? 'hi-IN' : 'en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const certId = `GS-MERIT-2026-XP${pointsXP}-${studentRoll}`;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const text = `🏆 Proud moment! ${studentName} (${studentGrade}) earned the official GyanSetu Academic Merit Certificate with ${pointsXP} XP points on GyanSetu Rural Learning Platform! Certificate ID: ${certId}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } else {
      alert(text);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[60] flex flex-col items-center justify-start sm:justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto certificate-print-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[96vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 my-auto overflow-hidden animate-scaleUp">
        
        {/* 1. Modal Sticky Top Control Bar (Always visible, cannot be scrolled away, hidden during print) */}
        <div className="shrink-0 px-4 sm:px-6 py-3 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md flex items-center justify-between gap-3 no-print z-20">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xs sm:text-base font-black text-upnavy-950 dark:text-slate-100 flex items-center gap-2 truncate">
                <span className="truncate">Academic Merit Certificate</span>
                <span className="text-[10px] font-bold bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-700/60 shrink-0 hidden sm:inline-block">
                  Level 3 Achiever
                </span>
              </h2>
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate">
                Official certificate recognizing student mastery across Classes 6–10
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={() => setCertLang(certLang === 'en' ? 'hi' : 'en')}
              className="px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1 transition cursor-pointer active:scale-95"
              title="Toggle Certificate Language (English / हिन्दी)"
            >
              <Globe className="w-3.5 h-3.5 text-upsaffron-600" />
              <span>{certLang === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* Share Pride Report */}
            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hidden md:flex items-center gap-1.5 transition cursor-pointer active:scale-95"
              title="Share Pride Report with Parents"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-upsaffron-600" />}
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>

            {/* Primary Print Button */}
            <button
              onClick={handlePrint}
              className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-upsaffron-600 via-upsaffron-500 to-amber-500 hover:from-upsaffron-500 hover:to-amber-400 text-white text-xs font-black flex items-center gap-1.5 shadow-sm shadow-upsaffron-600/30 hover:shadow-md active:scale-95 transition cursor-pointer"
              title="Print A4 Certificate or Save as PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Print Certificate</span>
            </button>

            {/* Prominent Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-rose-100 dark:bg-slate-800 dark:hover:bg-rose-950/50 text-slate-600 hover:text-rose-600 dark:text-slate-300 dark:hover:text-rose-400 border border-slate-200 dark:border-slate-700 flex items-center justify-center transition active:scale-90 cursor-pointer shrink-0"
              aria-label="Close Certificate Preview"
              title="Close Certificate (Esc)"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* 2. Scrollable Certificate Preview Viewport */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4">
          
          {/* THE OFFICIAL HIGH-RESOLUTION PRINTABLE CERTIFICATE */}
          <div className="certificate-print-container w-full overflow-hidden rounded-2xl sm:rounded-3xl border-4 sm:border-8 border-upnavy-950 p-2 sm:p-4 bg-gradient-to-b from-[#fffefc] via-[#fcf9f2] to-[#fbf6e9] shadow-xl text-slate-900 relative">
            
            {/* Ornate Gold Inner Filigree Border */}
            <div className="border-2 sm:border-3 border-amber-600/70 p-4 sm:p-8 rounded-xl sm:rounded-2xl relative bg-transparent flex flex-col justify-between min-h-[480px] sm:min-h-[580px]">
              
              {/* 4 Corner Ornaments */}
              <div className="absolute top-2 left-2 text-amber-600 font-serif text-lg sm:text-2xl select-none">❖</div>
              <div className="absolute top-2 right-2 text-amber-600 font-serif text-lg sm:text-2xl select-none">❖</div>
              <div className="absolute bottom-2 left-2 text-amber-600 font-serif text-lg sm:text-2xl select-none">❖</div>
              <div className="absolute bottom-2 right-2 text-amber-600 font-serif text-lg sm:text-2xl select-none">❖</div>

              {/* Faint Center Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.035] pointer-events-none select-none">
                <div className="w-64 h-64 sm:w-96 sm:h-96 rounded-full border-8 border-upnavy-950 flex flex-col items-center justify-center text-center p-8">
                  <span className="text-6xl sm:text-8xl">🎓</span>
                  <span className="font-serif font-black text-2xl tracking-widest mt-4">GYANSETU</span>
                  <span className="font-serif text-sm">ज्ञानं परमं बलम्</span>
                </div>
              </div>

              {/* Certificate Header & Insignia */}
              <div className="text-center space-y-2 relative z-10">
                <div className="flex items-center justify-center gap-3">
                  <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-amber-500" />
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-upnavy-950 via-upnavy-900 to-upnavy-800 text-upsaffron-400 border-2 border-amber-400/80 flex items-center justify-center shadow-md">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                  </div>
                  <span className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-amber-500" />
                </div>

                <div>
                  <div className="text-[10px] sm:text-xs font-black tracking-[0.25em] text-amber-800 uppercase font-sans">
                    GyanSetu Rural Digital Learning Initiative
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-bold text-slate-500 tracking-wider uppercase">
                    Autonomous Academic Council • Certified Under National Curriculum Framework
                  </div>
                </div>

                {/* Title */}
                <div className="pt-2">
                  <h1 className="text-xl sm:text-3xl lg:text-4xl font-serif font-black tracking-tight text-upnavy-950 uppercase leading-none">
                    {certLang === 'hi' ? 'शैक्षणिक प्रवीणता एवं मेरिट प्रमाण पत्र' : 'Certificate of Academic Merit'}
                  </h1>
                  <p className="text-[11px] sm:text-xs font-semibold text-amber-800 tracking-widest uppercase mt-1">
                    {certLang === 'hi' ? 'कक्षा 6–10 उत्कृष्ट संकल्पना ज्ञान एवं निरंतरता' : 'Excellence in Conceptual Mastery & Learning Dedication'}
                  </p>
                </div>

                <div className="flex items-center justify-center gap-1 text-amber-500 text-xs pt-1">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
              </div>

              {/* Recipient Presentation Section */}
              <div className="text-center space-y-2.5 my-4 sm:my-6 relative z-10">
                <p className="text-xs sm:text-sm font-serif italic text-slate-600">
                  {certLang === 'hi' 
                    ? 'यह ससम्मान प्रमाणित किया जाता है कि विद्यार्थी' 
                    : 'This is proudly presented and certified to'}
                </p>

                {/* Student Name */}
                <div className="inline-block relative">
                  <h2 className="text-2xl sm:text-4xl font-serif font-black text-upnavy-950 tracking-wider capitalize px-4 sm:px-8">
                    {studentName}
                  </h2>
                  <div className="h-0.5 sm:h-1 w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent mt-1" />
                </div>

                <div className="text-xs sm:text-sm font-semibold text-slate-700 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                  <span>{certLang === 'hi' ? 'कक्षा:' : 'Student of'} <strong>{studentGrade}</strong></span>
                  <span>•</span>
                  <span>{certLang === 'hi' ? 'अनुक्रमांक (Roll):' : 'Roll No:'} <strong className="font-mono">{studentRoll}</strong></span>
                  <span>•</span>
                  <span>{studentSchool}</span>
                </div>

                {/* Citation Body */}
                <p className="max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed text-slate-700 font-serif pt-1 px-2">
                  {certLang === 'hi' ? (
                    <>
                      जिन्होंने कक्षा 6 से 10 के एनसीईआरटी पाठ्यक्रम के विभिन्न विषयों में असाधारण लगन और निरंतरता का परिचय देते हुए कुल <strong>{pointsXP} लर्निंग अंक (XP)</strong> एवं <strong>{streakDays} दिनों की अध्ययन निरंतरता</strong> अर्जित की है, तथा <strong>लेवल 3: संकल्पना पारंगत (Concept Achiever)</strong> का गौरव प्राप्त किया है।
                    </>
                  ) : (
                    <>
                      For demonstrating exemplary academic dedication, consistent study discipline, and conceptual proficiency across Classes 6–10 NCERT Curriculum subjects, accumulating <strong>{pointsXP} Learning Points (XP)</strong> with a continuous <strong>{streakDays}-day learning streak</strong>, earning the distinction of <strong>Level 3: Concept Achiever</strong>.
                    </>
                  )}
                </p>
              </div>

              {/* Official Credentials, Gold Foil Seal & Signatures */}
              <div className="pt-4 border-t border-amber-600/40 grid grid-cols-3 items-end gap-2 text-xs relative z-10">
                
                {/* Left: Metadata & Digital Verification */}
                <div className="space-y-1 text-left">
                  <div className="text-[10px] sm:text-[11px] text-slate-500">
                    <span className="block font-bold text-slate-600 uppercase text-[9px]">Issuance Date</span>
                    <span className="font-semibold text-upnavy-950">{currentDate}</span>
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-slate-500 pt-1">
                    <span className="block font-bold text-slate-600 uppercase text-[8px]">Certificate ID</span>
                    <span className="font-mono font-bold text-amber-900">{certId}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded w-fit">
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                    <span>Registry Verified</span>
                  </div>
                </div>

                {/* Center: Radiant Golden Foil Seal */}
                <div className="flex flex-col items-center justify-center -mb-2 sm:-mb-3">
                  <div className="relative flex flex-col items-center">
                    {/* Seal Medallion */}
                    <div className="w-16 h-16 sm:w-22 sm:h-22 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-200 border-2 sm:border-4 border-amber-600 shadow-lg flex flex-col items-center justify-center text-center p-1 relative z-10">
                      <div className="w-full h-full rounded-full border border-dashed border-amber-800/80 flex flex-col items-center justify-center p-0.5">
                        <Star className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-amber-950 fill-amber-900" />
                        <span className="text-[6px] sm:text-[8px] font-black uppercase text-amber-950 tracking-tighter leading-none mt-0.5">
                          Official Seal
                        </span>
                        <span className="text-[5px] sm:text-[7px] font-bold text-amber-900 font-mono">
                          GYANSETU
                        </span>
                        <span className="text-[5px] sm:text-[6px] text-amber-950">2026-27</span>
                      </div>
                    </div>

                    {/* Ribbon Tails Hanging Down */}
                    <div className="flex gap-1.5 -mt-2 z-0">
                      <div className="w-3 sm:w-4 h-6 sm:h-8 bg-amber-600 rounded-b shadow-sm transform -rotate-6" />
                      <div className="w-3 sm:w-4 h-6 sm:h-8 bg-amber-600 rounded-b shadow-sm transform rotate-6" />
                    </div>
                  </div>
                </div>

                {/* Right: Authoritative Signatures */}
                <div className="text-right space-y-2">
                  <div>
                    <div className="font-serif italic font-bold text-slate-800 text-xs sm:text-sm tracking-wide">
                      Sunita Deshmukh
                    </div>
                    <div className="h-px w-24 sm:w-32 bg-slate-400 ml-auto my-0.5" />
                    <div className="text-[9px] sm:text-[10px] font-bold text-upnavy-950">
                      Dr. Sunita Deshmukh
                    </div>
                    <div className="text-[8px] sm:text-[9px] text-slate-500">
                      Head of Academic Council
                    </div>
                  </div>

                  <div className="pt-1">
                    <div className="font-serif italic font-bold text-slate-800 text-xs sm:text-sm tracking-wide">
                      Rajeshwar Rao
                    </div>
                    <div className="h-px w-24 sm:w-32 bg-slate-400 ml-auto my-0.5" />
                    <div className="text-[9px] sm:text-[10px] font-bold text-upnavy-950">
                      Prof. Rajeshwar Rao
                    </div>
                    <div className="text-[8px] sm:text-[9px] text-slate-500">
                      Director of Rural Curriculum
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* 3. Modal Sticky Bottom Action Bar (Guarantees visible close & print buttons even if scrolled, hidden during print) */}
        <div className="shrink-0 px-4 sm:px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 no-print z-20">
          <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="font-bold text-upnavy-950 dark:text-slate-200">GyanSetu Merit Certificate</span>
            <span>•</span>
            <span className="font-mono text-amber-800 dark:text-amber-400 font-bold">{certId}</span>
          </div>

          <div className="flex items-center gap-2.5 ml-auto">
            {/* Bottom Close Button */}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>

            {/* Bottom Print Button */}
            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-upnavy-900 via-upnavy-800 to-upnavy-900 hover:from-upsaffron-600 hover:to-amber-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm active:scale-95 transition cursor-pointer"
            >
              <Printer className="w-4 h-4 text-upsaffron-300" />
              <span>Print A4 Certificate</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
