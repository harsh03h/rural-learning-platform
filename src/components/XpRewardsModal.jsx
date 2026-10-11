import React, { useState } from 'react';
import { 
  X, 
  Award, 
  Sparkles, 
  Flame, 
  Trophy, 
  Check, 
  Download, 
  ShieldCheck, 
  Star, 
  Gift, 
  BookOpen, 
  Zap, 
  School, 
  Crown, 
  Target, 
  Printer, 
  ArrowRight,
  ChevronRight,
  Lock,
  Smartphone,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

const XP_LEVELS = [
  { level: 1, title: 'Novice Scholar (प्रारंभिक विद्यार्थी)', minXp: 0, maxXp: 100, badge: '🌱', color: 'emerald', desc: 'Foundational grade concept explorer' },
  { level: 2, title: 'Active Explorer (सक्रिय अध्येता)', minXp: 101, maxXp: 250, badge: '🚀', color: 'blue', desc: 'Consistent chapter completions and quiz attempts' },
  { level: 3, title: 'Concept Achiever (संकल्पना पारंगत)', minXp: 251, maxXp: 500, badge: '⭐', color: 'amber', desc: 'High accuracy in diagnostic and practice tests' },
  { level: 4, title: 'Subject Champion (विषय विजेता)', minXp: 501, maxXp: 800, badge: '🏆', color: 'purple', desc: 'Advanced problem solver across Classes 6 to 10' },
  { level: 5, title: 'Model Academic Leader (आदर्श नेतृत्व)', minXp: 801, maxXp: 1500, badge: '👑', color: 'rose', desc: 'School rank holder & board exam front-runner' }
];

export function XpRewardsModal({ 
  isOpen, 
  onClose, 
  lang = 'en', 
  studentStats = { streakDays: 4, pointsXP: 350 },
  currentUser,
  onClaimReward
}) {
  if (!isOpen) return null;

  const currentXp = studentStats.pointsXP || 350;
  const currentStreak = studentStats.streakDays || 4;
  const studentName = currentUser?.name || 'Rohan Verma';
  const studentGrade = currentUser?.grade || 'Class 7A';
  const studentSchool = currentUser?.school || 'Model Senior Secondary School Rampur';

  // Determine Current Level
  const currentLevelObj = XP_LEVELS.find(lvl => currentXp >= lvl.minXp && currentXp <= lvl.maxXp) || XP_LEVELS[2];
  const nextLevelObj = XP_LEVELS[XP_LEVELS.indexOf(currentLevelObj) + 1] || currentLevelObj;
  const xpNeededForNext = Math.max(0, nextLevelObj.minXp - currentXp);
  const levelProgressPct = Math.min(100, Math.round(((currentXp - currentLevelObj.minXp) / (currentLevelObj.maxXp - currentLevelObj.minXp)) * 100));

  // State for Claimed Rewards
  const [claimedRewards, setClaimedRewards] = useState({
    cert: false,
    labPass: true,
    formulaPack: false
  });

  const handleClaim = (key, title) => {
    setClaimedRewards(prev => ({ ...prev, [key]: true }));
    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.4 } });
    } catch (e) {}
    if (onClaimReward) {
      onClaimReward({ key, title });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-slate-900/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 max-h-[92vh] overflow-hidden flex flex-col">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-upnavy-950 via-upnavy-900 to-upnavy-800 text-white p-5 sm:p-6 relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 rounded-full bg-upsaffron-500/15 blur-2xl" />
          
          <div className="relative z-10 flex items-start justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-upsaffron-500 to-amber-400 flex items-center justify-center text-white shadow-lg shadow-upsaffron-600/30 font-bold shrink-0">
                <Trophy className="w-6 h-6 stroke-[2.3]" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg sm:text-xl font-black tracking-tight text-white">
                    XP Points & Rewards Hub
                  </h2>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-upsaffron-500/20 text-upsaffron-300 border border-upsaffron-400/40">
                    Effort Rewards
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  How your learning efforts translate into real academic standing, scholarships & perks
                </p>
              </div>
            </div>

            <button 
              onClick={onClose} 
              className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition shrink-0 active:scale-95"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current Level Bento Summary */}
          <div className="mt-4 pt-3.5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs relative z-10">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex items-center gap-3">
              <span className="text-2xl">{currentLevelObj.badge}</span>
              <div>
                <div className="text-[10px] uppercase tracking-wider font-bold text-slate-300">Current Standing</div>
                <div className="font-extrabold text-sm text-white">Level {currentLevelObj.level} Achiever</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
                <Sparkles className="w-4 h-4 fill-amber-300" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider font-bold text-slate-300">Total Balance</div>
                <div className="font-black text-sm text-amber-300">{currentXp} XP Points</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-400/20 border border-rose-400/30 flex items-center justify-center text-rose-300">
                <Flame className="w-4 h-4 fill-rose-300" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider font-bold text-slate-300">Active Discipline</div>
                <div className="font-black text-sm text-rose-300">{currentStreak} Days Streak</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1 text-xs">
          
          {/* Level Progress Ladder Bar */}
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="font-bold text-upnavy-950 flex items-center gap-1.5">
                <span>{currentLevelObj.title}</span>
              </div>
              <span className="font-bold text-upsaffron-700">
                {xpNeededForNext > 0 ? `${xpNeededForNext} XP to Level ${nextLevelObj.level}` : 'Max Tier Achieved 🏆'}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden p-0.5">
              <div 
                className="bg-gradient-to-r from-upsaffron-600 via-amber-500 to-emerald-500 h-full rounded-full transition-all duration-700" 
                style={{ width: `${levelProgressPct}%` }}
              />
            </div>

            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>{currentLevelObj.minXp} XP</span>
              <span className="font-bold text-slate-700">{currentXp} XP (Current)</span>
              <span>{currentLevelObj.maxXp} XP</span>
            </div>
          </div>

          {/* SECTION 1: WHAT ARE XP POINTS USED FOR? */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-black text-upnavy-950 flex items-center gap-2">
                <Award className="w-4 h-4 text-upsaffron-600" />
                <span>Primary Uses of XP Points in GyanSetu</span>
              </h3>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                6 Verified Uses
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Use 1 */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 hover:border-upnavy-300 transition">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center font-bold">
                    🎓
                  </div>
                  <div className="font-bold text-upnavy-950 text-xs">
                    Academic Rank & Level Titles
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Accumulating XP advances your level tier (Level 1 to 5). Higher tiers display verified merit badges on your Digital Identity Card.
                </p>
              </div>

              {/* Use 2 */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 hover:border-upsaffron-300 transition">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-upsaffron-50 border border-upsaffron-200 text-upsaffron-700 flex items-center justify-center font-bold">
                    📜
                  </div>
                  <div className="font-bold text-upnavy-950 text-xs">
                    Trust Merit Scholarships & Awards
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Students crossing 500+ XP are automatically nominated for the GyanSetu Private Education Trust Annual Merit Scholarship and receive official certificates.
                </p>
              </div>

              {/* Use 3 */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 hover:border-sky-300 transition">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center font-bold">
                    🔬
                  </div>
                  <div className="font-bold text-upnavy-950 text-xs">
                    Campus Science Lab & Tablet Priority
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  High XP earners receive priority scheduling in the school ICT computer lab and weekend borrowing privileges for smart learning tablets.
                </p>
              </div>

              {/* Use 4 */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 hover:border-purple-300 transition">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center font-bold">
                    📖
                  </div>
                  <div className="font-bold text-upnavy-950 text-xs">
                    Classes 9 & 10 Board Question Banks
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Unlock exclusive offline question banks, board examination tips, formula cheat-sheets, and solved sample papers for Classes 9 & 10.
                </p>
              </div>

              {/* Use 5 */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 hover:border-emerald-300 transition">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold">
                    🎨
                  </div>
                  <div className="font-bold text-upnavy-950 text-xs">
                    Avatar Packs & Profile Customization
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Unlock rare character avatars (Scientists, Astronomers, Creative Leaders) and custom badge borders for your profile.
                </p>
              </div>

              {/* Use 6 */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 hover:border-rose-300 transition">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 flex items-center justify-center font-bold">
                    📱
                  </div>
                  <div className="font-bold text-upnavy-950 text-xs">
                    Parent WhatsApp & SMS Pride Reports
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  XP points are summarized into weekly effort scores sent to parents via SMS and WhatsApp, showcasing student consistency.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 2: CLAIMABLE REWARDS & MILESTONES */}
          <div className="space-y-3">
            <h3 className="text-sm sm:text-base font-black text-upnavy-950 flex items-center gap-2">
              <Gift className="w-4 h-4 text-emerald-600" />
              <span>Redeemable Rewards & Milestones (Available Now)</span>
            </h3>

            <div className="space-y-2.5">
              {/* Reward Item 1 */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl shrink-0">
                    📜
                  </div>
                  <div>
                    <div className="font-bold text-emerald-950 flex items-center gap-2">
                      <span>GyanSetu Merit Certificate (Level 3 Achiever)</span>
                      <span className="text-[10px] font-bold bg-white text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                        250 XP
                      </span>
                    </div>
                    <p className="text-[11px] text-emerald-800 mt-0.5">
                      Official printable certificate recognizing your mastery across Classes 6–10 subjects.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleClaim('cert', 'GyanSetu Merit Certificate');
                    window.print();
                  }}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition active:scale-95 shrink-0 self-start sm:self-auto cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Certificate</span>
                </button>
              </div>

              {/* Reward Item 2 */}
              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center text-xl shrink-0">
                    🔬
                  </div>
                  <div>
                    <div className="font-bold text-sky-950 flex items-center gap-2">
                      <span>Science Lab & Computer Simulation Access</span>
                      <span className="text-[10px] font-bold bg-white text-sky-800 px-2 py-0.5 rounded-full border border-sky-300">
                        300 XP
                      </span>
                    </div>
                    <p className="text-[11px] text-sky-800 mt-0.5">
                      VIP priority pass for the weekly ICT lab hands-on simulation sessions.
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-emerald-800 bg-white px-3 py-1.5 rounded-xl border border-emerald-300 flex items-center gap-1 shrink-0 self-start sm:self-auto">
                  <Check className="w-3.5 h-3.5" />
                  <span>Pass Active</span>
                </span>
              </div>

              {/* Reward Item 3 */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl shrink-0">
                    📖
                  </div>
                  <div>
                    <div className="font-bold text-amber-950 flex items-center gap-2">
                      <span>Class 10 Board Exam Rapid Formula Pack</span>
                      <span className="text-[10px] font-bold bg-white text-amber-800 px-2 py-0.5 rounded-full border border-amber-300">
                        350 XP
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-800 mt-0.5">
                      Concise offline pocket guide for Mathematics & Science formulas.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleClaim('formulaPack', 'Class 10 Formula Pack')}
                  className="px-4 py-2 bg-upsaffron-600 hover:bg-upsaffron-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition active:scale-95 shrink-0 self-start sm:self-auto cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{claimedRewards.formulaPack ? 'Cached Offline ✓' : 'Unlock & Cache'}</span>
                </button>
              </div>

              {/* Locked Reward 4 */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 opacity-80">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-500 flex items-center justify-center text-xl shrink-0">
                    🏆
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 flex items-center gap-2">
                      <span>Education Trust Annual Scholarship Nomination</span>
                      <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                        Requires 500 XP
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Eligible for financial tuition grant and book kit sponsorship. (150 XP remaining)
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-slate-500 bg-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-1 shrink-0 self-start sm:self-auto">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Locked</span>
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 3: HOW TO EARN MORE XP */}
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-upnavy-50 via-slate-50 to-amber-50/50 border border-slate-200 space-y-3">
            <h4 className="font-black text-upnavy-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>How to Earn More XP Points Fast</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="font-black text-upsaffron-600">+25 XP</div>
                <div className="text-[11px] text-slate-600">Complete any chapter lesson</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="font-black text-upsaffron-600">+50 XP</div>
                <div className="text-[11px] text-slate-600">Pass diagnostic test quiz</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="font-black text-amber-600">+20 XP/day</div>
                <div className="text-[11px] text-slate-600">Daily learning streak bonus</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="font-black text-emerald-600">+75 XP</div>
                <div className="text-[11px] text-slate-600">100% Score on unit test</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="font-black text-sky-600">+15 XP</div>
                <div className="text-[11px] text-slate-600">P2P homework sync on mesh</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <div className="font-black text-purple-600">+100 XP</div>
                <div className="text-[11px] text-slate-600">Finish full subject syllabus</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Sticky Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0 bg-slate-50/50">
          <div className="text-[11px] text-slate-500 hidden sm:block">
            Student: <strong>{studentName}</strong> • {studentGrade} • {studentSchool}
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-upnavy-950 hover:bg-upnavy-900 text-white font-bold text-xs transition active:scale-95 shadow-xs cursor-pointer ml-auto"
          >
            Got It! Close Hub
          </button>
        </div>

      </div>
    </div>
  );
}
