import React, { useState } from 'react';
import { 
  School, 
  Users, 
  Server, 
  HardDrive, 
  ShieldCheck, 
  Wifi, 
  BookOpen, 
  CheckCircle, 
  Database,
  Layers,
  Cpu,
  RefreshCw,
  Activity,
  Battery,
  BatteryCharging,
  Search,
  Filter,
  Download,
  FileText,
  Check,
  AlertTriangle,
  ArrowUpRight,
  Radio,
  Lock,
  Unlock,
  Send,
  Sparkles,
  Printer,
  Eye,
  X,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { translations } from '../data/mockData';

export function AdminView({ lang = 'en' }) {
  const t = translations[lang] || translations['en'];

  // Sub-navigation tabs
  const [activeTab, setActiveTab] = useState('mesh'); // 'mesh' | 'fleet' | 'udise' | 'faculty'

  // Mesh Server state
  const [isMeshActive, setIsMeshActive] = useState(true);
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);
  const [cloudSyncStatus, setCloudSyncStatus] = useState({
    synced: true,
    lastTime: 'Today at 08:30 AM',
    recordsCount: 128,
    latency: '42ms (BharatNet Fiber)'
  });
  const [isPushingCurriculum, setIsPushingCurriculum] = useState(false);
  const [pushProgress, setPushProgress] = useState(0);

  // Tablet fleet state
  const [fleetSearch, setFleetSearch] = useState('');
  const [fleetFilter, setFleetFilter] = useState('all'); // 'all' | 'online' | 'charging' | 'attention'
  const [tablets, setTablets] = useState([
    { id: 'TAB-RMP-01', student: 'Rohan Sharma', grade: 'Class 8', roll: 14, battery: 92, charging: false, status: 'online', cache: 100, lastPing: 'Just now', locked: false },
    { id: 'TAB-RMP-02', student: 'Priya Kumari', grade: 'Class 8', roll: 21, battery: 84, charging: false, status: 'online', cache: 100, lastPing: '1m ago', locked: false },
    { id: 'TAB-RMP-03', student: 'Amit Verma', grade: 'Class 9', roll: 7, battery: 45, charging: true, status: 'charging', cache: 98, lastPing: '3m ago', locked: false },
    { id: 'TAB-RMP-04', student: 'Neha Patel', grade: 'Class 7', roll: 19, battery: 78, charging: false, status: 'online', cache: 100, lastPing: '2m ago', locked: false },
    { id: 'TAB-RMP-05', student: 'Vikas Singh', grade: 'Class 8', roll: 32, battery: 18, charging: false, status: 'attention', cache: 82, lastPing: '14m ago', locked: false },
    { id: 'TAB-RMP-06', student: 'Sunita Yadav', grade: 'Class 6', roll: 5, battery: 96, charging: true, status: 'charging', cache: 100, lastPing: 'Just now', locked: false },
    { id: 'TAB-RMP-07', student: 'Deepak Rao', grade: 'Class 10', roll: 11, battery: 67, charging: false, status: 'online', cache: 96, lastPing: '5m ago', locked: false },
    { id: 'TAB-RMP-08', student: 'Kavita Das', grade: 'Class 9', roll: 28, battery: 89, charging: false, status: 'online', cache: 100, lastPing: '1m ago', locked: false },
    { id: 'TAB-RMP-09', student: 'Rahul Kumar', grade: 'Class 7', roll: 16, battery: 54, charging: false, status: 'online', cache: 94, lastPing: '4m ago', locked: false },
    { id: 'TAB-RMP-10', student: 'Ananya Roy', grade: 'Class 8', roll: 3, battery: 88, charging: false, status: 'online', cache: 100, lastPing: 'Just now', locked: false },
    { id: 'TAB-RMP-11', student: 'Sanjay Meena', grade: 'Class 6', roll: 22, battery: 24, charging: true, status: 'charging', cache: 88, lastPing: '8m ago', locked: false },
    { id: 'TAB-RMP-12', student: 'Pooja Tiwari', grade: 'Class 10', roll: 18, battery: 91, charging: false, status: 'online', cache: 100, lastPing: 'Just now', locked: false },
  ]);

  // Faculty state
  const [facultyList, setFacultyList] = useState([
    { id: 'FAC-01', name: 'Dr. Anita Deshmukh', role: 'Headmistress & Admin', subject: 'Institutional Leadership', attendance: 'Present', syllabus: 95, planStatus: 'Approved' },
    { id: 'FAC-02', name: 'Vikram Sharma', role: 'TGT Mathematics', subject: 'Mathematics (Gr 6-8)', attendance: 'Present', syllabus: 82, planStatus: 'Approved' },
    { id: 'FAC-03', name: 'Priya Verma', role: 'TGT Science', subject: 'General Science (Gr 6-8)', attendance: 'Present', syllabus: 88, planStatus: 'Approved' },
    { id: 'FAC-04', name: 'Anjali Gupta', role: 'TGT English', subject: 'English & Grammar (Gr 6-10)', attendance: 'Present', syllabus: 76, planStatus: 'Pending Review' },
    { id: 'FAC-05', name: 'Rajesh Kumar', role: 'TGT Social Science', subject: 'Social Studies & Civics', attendance: 'Present', syllabus: 84, planStatus: 'Approved' },
    { id: 'FAC-06', name: 'Meena Patel', role: 'TGT Hindi', subject: 'Hindi & Sanskrit Sahitya', attendance: 'Present', syllabus: 92, planStatus: 'Approved' },
    { id: 'FAC-07', name: 'Suresh Rao', role: 'ICT & Lab Instructor', subject: 'Digital Literacy & PWA Hub', attendance: 'Present', syllabus: 90, planStatus: 'Approved' },
    { id: 'FAC-08', name: 'Sunita Yadav', role: 'Special Educator', subject: 'Remedial & CWSN Learning', attendance: 'Present', syllabus: 80, planStatus: 'Pending Review' }
  ]);

  // Notice & Circular modal state
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [noticeText, setNoticeText] = useState('All teachers are requested to verify offline worksheet syncing on their class tablets before 3:00 PM today.');

  // U-DISE Certificate Modal
  const [isUdiseReportModalOpen, setIsUdiseReportModalOpen] = useState(false);
  const [isAttested, setIsAttested] = useState(true);

  // Global Toast
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  // Trigger District Cloud Sync
  const handleCloudSync = () => {
    setIsCloudSyncing(true);
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step >= 3) {
        clearInterval(interval);
        setIsCloudSyncing(false);
        setCloudSyncStatus({
          synced: true,
          lastTime: 'Just now (' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ')',
          recordsCount: 128,
          latency: '38ms (BharatNet Optical)'
        });
        showToast('✓ Successfully synced 128 student academic records with District Education Repository');
        try {
          confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
        } catch (e) {}
      }
    }, 500);
  };

  // Trigger Curriculum Push across Wi-Fi Mesh
  const handleCurriculumPush = () => {
    setIsPushingCurriculum(true);
    setPushProgress(10);
    const interval = setInterval(() => {
      setPushProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsPushingCurriculum(false);
          showToast('✓ Week 4 Remedial Curriculum & Regional Audio packs pushed to all 34 tablets via Wi-Fi Mesh!');
          try {
            confetti({ particleCount: 40, spread: 70, origin: { y: 0.7 } });
          } catch (e) {}
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  // Device actions
  const handlePingDevice = (id) => {
    showToast(`📡 Ping response from ${id}: 12ms latency • Signal Strength: -48dBm (Excellent)`);
  };

  const handleToggleLock = (id) => {
    setTablets(prev => prev.map(tab => {
      if (tab.id === id) {
        const nextState = !tab.locked;
        showToast(nextState ? `🔒 ${id} locked in Exam Mode.` : `🔓 ${id} unlocked for open study.`);
        return { ...tab, locked: nextState };
      }
      return tab;
    }));
  };

  const handleForceSync = (id) => {
    setTablets(prev => prev.map(tab => tab.id === id ? { ...tab, cache: 100, status: 'online' } : tab));
    showToast(`✓ Forced cache synchronization for ${id}: 100% complete.`);
  };

  // Lesson Plan approval
  const handleApprovePlan = (id) => {
    setFacultyList(prev => prev.map(fac => fac.id === id ? { ...fac, planStatus: 'Approved' } : fac));
    showToast('✓ Weekly Lesson Plan approved & archived into U-DISE record.');
  };

  // Filtered tablets
  const filteredTablets = tablets.filter(t => {
    const matchesSearch = t.id.toLowerCase().includes(fleetSearch.toLowerCase()) ||
                          t.student.toLowerCase().includes(fleetSearch.toLowerCase()) ||
                          t.grade.toLowerCase().includes(fleetSearch.toLowerCase());
    if (!matchesSearch) return false;
    if (fleetFilter === 'online') return t.status === 'online';
    if (fleetFilter === 'charging') return t.status === 'charging';
    if (fleetFilter === 'attention') return t.status === 'attention';
    return true;
  });

  return (
    <div className="space-y-6 pb-28 max-w-6xl mx-auto">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-upnavy-950 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-upsaffron-500 flex items-center gap-3 text-xs sm:text-sm animate-bounce">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 animate-ping" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* 1. Header Card with Principal Profile & School Credentials */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-32 bg-radial from-upnavy-100/60 to-transparent pointer-events-none" />

        <div className="space-y-2 z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-upnavy-900 bg-upnavy-100 px-3 py-1 rounded-full border border-upnavy-200">
              Department of Basic Education • Govt. of Uttar Pradesh
            </span>
            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
              U-DISE: 09280104502
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-upnavy-950 tracking-tight flex items-center gap-2">
            <span>Dr. Anita Deshmukh</span>
            <span className="text-xs font-bold text-upsaffron-700 bg-upsaffron-50 border border-upsaffron-200 px-2.5 py-0.5 rounded-full">
              Headmistress / Cluster Nodal
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Govt Model Senior Secondary School Rampur • Block Bilaspur • District Rampur (UP)
          </p>
        </div>

        {/* Live System Pills */}
        <div className="flex flex-wrap items-center gap-2.5 z-10">
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-2xl text-xs font-bold text-emerald-900">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Raspberry Pi Node: Online</span>
          </div>
          <div className="flex items-center gap-2 bg-upnavy-50 border border-upnavy-200 px-3.5 py-2 rounded-2xl text-xs font-bold text-upnavy-900">
            <Radio className="w-3.5 h-3.5 text-upnavy-700" />
            <span>Wi-Fi Mesh Active (0 KB cellular)</span>
          </div>
        </div>
      </div>

      {/* 2. Key Administrative Bento Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs hover:border-upnavy-300 transition">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-semibold">Enrolled Students</span>
            <Users className="w-4 h-4 text-upnavy-800" />
          </div>
          <div className="text-3xl font-black text-upnavy-950">128</div>
          <div className="text-[11px] text-emerald-700 font-bold mt-1 flex items-center gap-1">
            <span>94.2% Attendance</span>
            <span className="text-slate-400 font-normal">• Gr 6 to 10</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs hover:border-upsaffron-300 transition">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-semibold">Teaching Faculty</span>
            <School className="w-4 h-4 text-upsaffron-600" />
          </div>
          <div className="text-3xl font-black text-upnavy-950">8 / 8</div>
          <div className="text-[11px] text-upsaffron-600 font-bold mt-1">
            100% Present Today
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs hover:border-amber-300 transition">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-semibold">PWA Tablet Fleet</span>
            <HardDrive className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-amber-700">34 Active</div>
          <div className="text-[11px] text-amber-600 font-bold mt-1">
            31 Mesh Synced • 3 Charging
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs hover:border-sky-300 transition">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span className="font-semibold">Local Edge Storage</span>
            <Database className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-3xl font-black text-sky-800">4.2 GB</div>
          <div className="text-[11px] text-sky-600 font-bold mt-1">
            Cached in 10 Languages
          </div>
        </div>
      </div>

      {/* 3. Navigation Switcher Tabs */}
      <div className="bg-slate-100 p-1.5 rounded-2xl flex flex-wrap gap-1.5 border border-slate-200">
        <button
          onClick={() => setActiveTab('mesh')}
          className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'mesh'
              ? 'bg-upnavy-950 text-white shadow-xs'
              : 'text-slate-600 hover:text-upnavy-950 hover:bg-white/70'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>Local Edge Mesh Hub</span>
        </button>

        <button
          onClick={() => setActiveTab('fleet')}
          className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'fleet'
              ? 'bg-upnavy-950 text-white shadow-xs'
              : 'text-slate-600 hover:text-upnavy-950 hover:bg-white/70'
          }`}
        >
          <HardDrive className="w-4 h-4" />
          <span>Tablet Fleet Inventory (34)</span>
        </button>

        <button
          onClick={() => setActiveTab('udise')}
          className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'udise'
              ? 'bg-upnavy-950 text-white shadow-xs'
              : 'text-slate-600 hover:text-upnavy-950 hover:bg-white/70'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>U-DISE+ 2026-27 Compliance</span>
        </button>

        <button
          onClick={() => setActiveTab('faculty')}
          className={`flex-1 min-w-[150px] py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
            activeTab === 'faculty'
              ? 'bg-upnavy-950 text-white shadow-xs'
              : 'text-slate-600 hover:text-upnavy-950 hover:bg-white/70'
          }`}
        >
          <School className="w-4 h-4" />
          <span>Faculty & Syllabus</span>
        </button>
      </div>

      {/* 4. Tab 1: Edge Mesh Server Node */}
      {activeTab === 'mesh' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-upnavy-100 text-upnavy-900 flex items-center justify-center font-bold border border-upnavy-200 shrink-0">
                  <Server className="w-6 h-6 text-upnavy-800" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-upnavy-950">
                      Community Edge Node (Raspberry Pi 5 Hub)
                    </h2>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                      Active Node #01
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 max-w-xl">
                    Broadcasting zero-cost offline Wi-Fi mesh across the entire school campus. Students download worksheets, interact with simulations, and submit diagnostic quizzes without using mobile cellular data.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={handleCloudSync}
                  disabled={isCloudSyncing}
                  className="px-4 py-2.5 bg-upnavy-950 hover:bg-upnavy-900 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition active:scale-95 disabled:opacity-60 shadow-xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isCloudSyncing ? 'animate-spin' : ''}`} />
                  <span>{isCloudSyncing ? 'Syncing Records...' : 'Sync Edge with District Cloud'}</span>
                </button>

                <button
                  onClick={handleCurriculumPush}
                  disabled={isPushingCurriculum}
                  className="px-4 py-2.5 bg-upsaffron-600 hover:bg-upsaffron-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition active:scale-95 disabled:opacity-60 shadow-xs shadow-upsaffron-600/30"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isPushingCurriculum ? `Pushing (${pushProgress}%)` : 'Push Curriculum to All Tablets'}</span>
                </button>
              </div>
            </div>

            {/* Curriculum Push Progress Bar (if active) */}
            {isPushingCurriculum && (
              <div className="p-4 rounded-2xl bg-upsaffron-50 border border-upsaffron-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-upsaffron-950">
                  <span>Broadcasting Week 4 Multilingual Bundles via Wi-Fi Multicast...</span>
                  <span>{pushProgress}%</span>
                </div>
                <div className="w-full h-2.5 bg-upsaffron-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-upsaffron-600 transition-all duration-300 rounded-full"
                    style={{ width: `${pushProgress}%` }}
                  />
                </div>
                <div className="text-[11px] text-upsaffron-800">
                  Simultaneous packet transfer to 34 connected tablets over 5GHz Wi-Fi (Estimated time: 1.5s)
                </div>
              </div>
            )}

            {/* Edge Server Hardware & Network Specifications */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <Wifi className="w-4 h-4 text-upnavy-800" />
                    <span>Wi-Fi Mesh Broadcast</span>
                  </span>
                  <span className="text-[10px] text-emerald-700 font-extrabold bg-emerald-100 px-2 py-0.5 rounded-full">
                    5.0 GHz / 2.4 GHz
                  </span>
                </div>
                <div className="text-xs text-slate-600">
                  <strong>SSID:</strong> <code className="bg-slate-200/70 px-1 py-0.5 rounded text-upnavy-900 font-bold">GyanSetu-School-Mesh</code>
                </div>
                <div className="text-[11px] text-slate-500">
                  Range: 150m coverage radius across 6 classrooms, laboratory & courtyard.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-upnavy-800" />
                    <span>Hardware Node Status</span>
                  </span>
                  <span className="text-[10px] text-upnavy-800 font-extrabold bg-upnavy-100 px-2 py-0.5 rounded-full">
                    Raspberry Pi 5 (8GB)
                  </span>
                </div>
                <div className="text-xs text-slate-600">
                  <strong>CPU Temp:</strong> 41°C • <strong>RAM:</strong> 1.8 GB / 8 GB (22%)
                </div>
                <div className="text-[11px] text-slate-500">
                  Storage: 128GB High-Endurance eMMC + 512GB NVMe SSD
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <BatteryCharging className="w-4 h-4 text-emerald-700" />
                    <span>Solar UPS Inverter</span>
                  </span>
                  <span className="text-[10px] text-emerald-800 font-extrabold bg-emerald-100 px-2 py-0.5 rounded-full">
                    98% Battery
                  </span>
                </div>
                <div className="text-xs text-slate-600">
                  <strong>Solar Array:</strong> 3.2 kVA Monocrystalline (Output: 1.4 kW)
                </div>
                <div className="text-[11px] text-slate-500">
                  LiFePO4 battery pack gives 14.2h continuous run during power outages.
                </div>
              </div>
            </div>

            {/* Offline Cache Breakdown by Subject */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-upnavy-950 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-upnavy-800" />
                  <span>Curriculum Cache Allocation (Total Cached: 4.2 GB / 64 GB)</span>
                </h3>
                <span className="text-xs text-slate-500">10 Indian Languages Ready</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-upnavy-50/70 border border-upnavy-200/80">
                  <div className="font-bold text-upnavy-950">Mathematics</div>
                  <div className="text-[11px] text-slate-500">840 MB • 14 Chapters</div>
                  <div className="text-[11px] text-upnavy-800 font-bold mt-1">✓ Complete NCERT/SCERT</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                  <div className="font-bold text-emerald-950">Science & Lab</div>
                  <div className="text-[11px] text-slate-500">1,240 MB • 18 Modules</div>
                  <div className="text-[11px] text-emerald-800 font-bold mt-1">✓ Interactive simulations</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                  <div className="font-bold text-amber-950">Regional TTS Audio</div>
                  <div className="text-[11px] text-slate-500">980 MB • 10 Dialects</div>
                  <div className="text-[11px] text-amber-800 font-bold mt-1">✓ Native spoken speech</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200/80">
                  <div className="font-bold text-sky-950">English & Grammar</div>
                  <div className="text-[11px] text-slate-500">690 MB • Phonics & Vocab</div>
                  <div className="text-[11px] text-sky-800 font-bold mt-1">✓ Level 1–4 Audio Reader</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200/80">
                  <div className="font-bold text-purple-950">Digital Literacy</div>
                  <div className="text-[11px] text-slate-500">450 MB • Cyber safety</div>
                  <div className="text-[11px] text-purple-800 font-bold mt-1">✓ Practical modules</div>
                </div>
              </div>
            </div>

            {/* Cloud Sync Diagnostic Details */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>District Cloud Sync Status:</strong> {cloudSyncStatus.lastTime} ({cloudSyncStatus.recordsCount} records synced, latency {cloudSyncStatus.latency})
                </span>
              </div>
              <span className="text-[10px] font-bold bg-white text-upnavy-900 px-3 py-1 rounded-full border border-slate-300">
                Protocol: Offline Delta-Diff Encrypted
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 5. Tab 2: Tablet Fleet Inventory */}
      {activeTab === 'fleet' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-upnavy-950">
                    School PWA Tablet Fleet (34 Active Devices)
                  </h2>
                  <span className="text-xs font-bold text-upnavy-900 bg-upnavy-100 px-2.5 py-0.5 rounded-full border border-upnavy-200">
                    All Devices Registered
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Manage assigned tablets, monitor battery and cache health, ping network latency, or lock devices for examinations.
                </p>
              </div>

              {/* Search & Status Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={fleetSearch}
                    onChange={(e) => setFleetSearch(e.target.value)}
                    placeholder="Search device, student..."
                    className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-upnavy-600 w-44 sm:w-56"
                  />
                </div>

                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                  <button
                    onClick={() => setFleetFilter('all')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition ${
                      fleetFilter === 'all' ? 'bg-white text-upnavy-950 shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    All (34)
                  </button>
                  <button
                    onClick={() => setFleetFilter('online')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition ${
                      fleetFilter === 'online' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    Online (28)
                  </button>
                  <button
                    onClick={() => setFleetFilter('charging')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition ${
                      fleetFilter === 'charging' ? 'bg-white text-amber-800 shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    Charging (4)
                  </button>
                  <button
                    onClick={() => setFleetFilter('attention')}
                    className={`px-2.5 py-1 rounded-lg font-bold transition ${
                      fleetFilter === 'attention' ? 'bg-white text-rose-800 shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    Attention (2)
                  </button>
                </div>
              </div>
            </div>

            {/* Tablet Fleet Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTablets.map((tab) => (
                <div
                  key={tab.id}
                  className={`p-4 rounded-2xl border transition relative space-y-3 ${
                    tab.locked
                      ? 'bg-amber-50/40 border-amber-300'
                      : tab.status === 'attention'
                      ? 'bg-rose-50/40 border-rose-300'
                      : 'bg-white border-slate-200 hover:border-upnavy-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-upnavy-950 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {tab.id}
                      </span>
                      {tab.locked && (
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 flex items-center gap-1">
                          <Lock className="w-2.5 h-2.5" /> Exam Locked
                        </span>
                      )}
                    </div>

                    {/* Battery Indicator */}
                    <div className="flex items-center gap-1.5 text-xs font-bold">
                      {tab.charging ? (
                        <BatteryCharging className="w-4 h-4 text-amber-600 animate-pulse" />
                      ) : tab.battery > 50 ? (
                        <Battery className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Battery className="w-4 h-4 text-rose-500" />
                      )}
                      <span className={tab.battery < 25 ? 'text-rose-600' : 'text-slate-700'}>
                        {tab.battery}%
                      </span>
                    </div>
                  </div>

                  {/* Student Details */}
                  <div className="space-y-0.5">
                    <div className="font-bold text-sm text-upnavy-950 flex items-center justify-between">
                      <span>{tab.student}</span>
                      <span className="text-xs text-slate-400 font-normal">Roll #{tab.roll}</span>
                    </div>
                    <div className="text-xs text-slate-500">
                      {tab.grade} • Last mesh sync: {tab.lastPing}
                    </div>
                  </div>

                  {/* Cache & Health bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Local Cache</span>
                      <span className="font-bold text-upnavy-900">{tab.cache}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          tab.cache === 100 ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${tab.cache}%` }}
                      />
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => handlePingDevice(tab.id)}
                      title="Test latency via mesh"
                      className="flex-1 py-1 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-bold transition flex items-center justify-center gap-1"
                    >
                      <Radio className="w-3 h-3 text-upnavy-800" />
                      <span>Ping</span>
                    </button>

                    <button
                      onClick={() => handleForceSync(tab.id)}
                      title="Force update local storage"
                      className="flex-1 py-1 px-2 bg-upnavy-50 hover:bg-upnavy-100 text-upnavy-900 rounded-lg text-[11px] font-bold border border-upnavy-200 transition flex items-center justify-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3 text-upnavy-800" />
                      <span>Sync</span>
                    </button>

                    <button
                      onClick={() => handleToggleLock(tab.id)}
                      title={tab.locked ? 'Unlock tablet' : 'Lock tablet in exam mode'}
                      className={`py-1 px-2.5 rounded-lg text-[11px] font-bold transition flex items-center justify-center ${
                        tab.locked
                          ? 'bg-amber-600 hover:bg-amber-700 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      {tab.locked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Fleet Summary Banner */}
            <div className="p-4 rounded-2xl bg-upnavy-50/70 border border-upnavy-200 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-upnavy-950">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-upnavy-800 shrink-0" />
                <span>
                  <strong>Fleet Integrity:</strong> 100% Asset Accountability (0 lost units). All devices running GyanSetu PWA v2.4.1 (Offline-First Edition).
                </span>
              </div>
              <span className="font-bold text-xs text-upsaffron-700 bg-white px-3 py-1 rounded-full border border-upsaffron-200">
                Avg Battery: 76.8%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 6. Tab 3: U-DISE+ 2026-27 Compliance */}
      {activeTab === 'udise' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-upnavy-950">
                    Unified District Information System for Education (U-DISE+ 2026-27)
                  </h2>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                    Compliant & Verified
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Official census registry, RTE compliance metrics, socio-demographic indicators, and welfare entitlement fulfillment.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => setIsUdiseReportModalOpen(true)}
                  className="px-4 py-2.5 bg-upnavy-950 hover:bg-upnavy-900 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition active:scale-95 shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Official U-DISE+ Document</span>
                </button>

                <button
                  onClick={() => {
                    showToast('✓ U-DISE+ data exported to CSV format for District Education Officer (DEO).');
                  }}
                  className="px-4 py-2.5 bg-upsaffron-600 hover:bg-upsaffron-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition active:scale-95 shadow-xs shadow-upsaffron-600/30"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export DEO File (.csv)</span>
                </button>
              </div>
            </div>

            {/* School Registration Details */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <span className="text-slate-400 block text-[11px]">School Category</span>
                <span className="font-bold text-upnavy-950">Upper Primary (Gr 6–10)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">School Management</span>
                <span className="font-bold text-upnavy-950">Dept. of Basic Education (UP)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Rural Habitat Code</span>
                <span className="font-bold text-upnavy-950">RMP-BLS-0928</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Affiliation Board</span>
                <span className="font-bold text-upnavy-950">UP State Board / Samagra Shiksha</span>
              </div>
            </div>

            {/* Demographics & Gender Ratio */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-upnavy-950 flex items-center gap-2">
                <Users className="w-4 h-4 text-upnavy-800" />
                <span>Student Enrollment & Inclusivity Distribution (128 Students)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <div className="text-xs text-slate-500 font-semibold">Boys Enrolled</div>
                  <div className="text-2xl font-black text-upnavy-950">68 <span className="text-xs font-normal text-slate-400">(53.1%)</span></div>
                  <div className="text-[11px] text-emerald-700 font-bold">93.8% Regular Attendance</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <div className="text-xs text-slate-500 font-semibold">Girls Enrolled</div>
                  <div className="text-2xl font-black text-upnavy-950">60 <span className="text-xs font-normal text-slate-400">(46.9%)</span></div>
                  <div className="text-[11px] text-emerald-700 font-bold">94.7% (+14.6% YoY growth)</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <div className="text-xs text-slate-500 font-semibold">Social Groups</div>
                  <div className="text-xs font-bold text-upnavy-950 mt-1 space-y-0.5">
                    <div>OBC: 58 • SC: 34</div>
                    <div>General: 24 • ST: 12</div>
                  </div>
                  <div className="text-[10px] text-slate-400">100% Scholarship mapped</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <div className="text-xs text-slate-500 font-semibold">CWSN (Divyangjan)</div>
                  <div className="text-2xl font-black text-upnavy-950">3 <span className="text-xs font-normal text-slate-400">Students</span></div>
                  <div className="text-[11px] text-upsaffron-700 font-bold">Full Audio-First Support</div>
                </div>
              </div>
            </div>

            {/* National Welfare Schemes Tracker */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-upnavy-950 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-upnavy-800" />
                <span>Govt Welfare Schemes Fulfillment (100% Saturation)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-emerald-950">
                    <span>PM POSHAN (Mid-Day Meal)</span>
                    <span className="text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-300 text-[10px]">Active</span>
                  </div>
                  <div className="text-slate-600">
                    128/128 students served hot nutritional meals today. Menu: Dal, Roti, Seasonal Sabzi & Fresh Fruit.
                  </div>
                  <div className="text-[11px] text-emerald-800 font-bold">✓ Inspected by Village Education Committee</div>
                </div>

                <div className="p-4 rounded-2xl bg-upnavy-50/70 border border-upnavy-200 space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-upnavy-950">
                    <span>Free Textbooks & Uniforms</span>
                    <span className="text-upnavy-800 bg-white px-2 py-0.5 rounded-full border border-upnavy-300 text-[10px]">100% Done</span>
                  </div>
                  <div className="text-slate-600">
                    SCERT books & 2 pairs of uniforms distributed under Samagra Shiksha DBT transfer.
                  </div>
                  <div className="text-[11px] text-upnavy-800 font-bold">✓ Direct Bank Transfer (DBT) reconciled</div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-amber-950">
                    <span>Digital & Sanitation Infrastructure</span>
                    <span className="text-amber-800 bg-white px-2 py-0.5 rounded-full border border-amber-300 text-[10px]">Certified</span>
                  </div>
                  <div className="text-slate-600">
                    Solar powered ICT lab, clean RO drinking water plant, and functional separate gender toilets.
                  </div>
                  <div className="text-[11px] text-amber-800 font-bold">✓ Swachh Vidyalaya 5-Star rated</div>
                </div>
              </div>
            </div>

            {/* Official Principal Attestation Stamp */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-xs font-bold text-upnavy-950">
                  Principal Electronic Attestation & Digital Stamp
                </div>
                <div className="text-xs text-slate-500">
                  Digitally certified under UP State Board e-Governance Act (Information Technology Act 2000).
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setIsAttested(!isAttested);
                    showToast(isAttested ? 'Attestation unverified.' : '✓ Principal signature and digital seal attested successfully!');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                    isAttested
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>{isAttested ? 'Digitally Sealed & Attested' : 'Click to Attest'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. Tab 4: Faculty & Syllabus Progress */}
      {activeTab === 'faculty' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-xs space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-upnavy-950">
                    Teaching Staff & Syllabus Coverage (Academic Year 2026-27)
                  </h2>
                  <span className="text-xs font-bold text-upsaffron-800 bg-upsaffron-100 px-2.5 py-0.5 rounded-full border border-upsaffron-300">
                    8 Faculty Members
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Track individual teacher attendance, curriculum progress, lesson plan submissions, and broadcast administrative circulars.
                </p>
              </div>

              {/* Action */}
              <button
                onClick={() => setIsNoticeModalOpen(true)}
                className="px-4 py-2.5 bg-upnavy-950 hover:bg-upnavy-900 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition active:scale-95 shadow-xs"
              >
                <Send className="w-3.5 h-3.5 text-upsaffron-400" />
                <span>Broadcast Staff Circular</span>
              </button>
            </div>

            {/* Faculty Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] tracking-wider font-bold">
                    <th className="py-3 px-3">Faculty Member</th>
                    <th className="py-3 px-3">Subject & Classes</th>
                    <th className="py-3 px-3">Attendance</th>
                    <th className="py-3 px-3">Syllabus Covered</th>
                    <th className="py-3 px-3">Weekly Lesson Plan</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {facultyList.map((fac) => (
                    <tr key={fac.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-upnavy-950 text-sm">{fac.name}</div>
                        <div className="text-[11px] text-slate-400">{fac.role}</div>
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="font-semibold text-slate-700">{fac.subject}</div>
                        <div className="text-[10px] text-slate-400">Class 6–10 Curricula</div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          {fac.attendance}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 min-w-[140px]">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="font-bold text-upnavy-900">{fac.syllabus}%</span>
                          <span className="text-[10px] text-slate-400">On Track</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-upsaffron-600 rounded-full"
                            style={{ width: `${fac.syllabus}%` }}
                          />
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                            fac.planStatus === 'Approved'
                              ? 'bg-slate-100 text-slate-700 border border-slate-200'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}
                        >
                          {fac.planStatus}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        {fac.planStatus === 'Pending Review' ? (
                          <button
                            onClick={() => handleApprovePlan(fac.id)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold transition active:scale-95"
                          >
                            Approve Plan
                          </button>
                        ) : (
                          <span className="text-slate-400 text-[11px]">✓ Approved</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Academic Standards Summary */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-700">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-upnavy-800 shrink-0" />
                <span>
                  <strong>Academic Schedule Compliance:</strong> All 6 core subjects meet SCERT Uttar Pradesh milestone pacing guidelines.
                </span>
              </div>
              <span className="text-[11px] font-bold text-upnavy-900 bg-white px-3 py-1 rounded-full border border-slate-300">
                Next Evaluation: Unit Test 2 (Nov 15)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 8. Modal: Broadcast Staff Circular */}
      {isNoticeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-upnavy-100 text-upnavy-900 flex items-center justify-center font-bold">
                  <Send className="w-4 h-4 text-upnavy-800" />
                </div>
                <h3 className="text-base font-bold text-upnavy-950">Broadcast Faculty Circular</h3>
              </div>
              <button
                onClick={() => setIsNoticeModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Official Circular Content:</label>
              <textarea
                value={noticeText}
                onChange={(e) => setNoticeText(e.target.value)}
                rows={4}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-upnavy-600 text-slate-800 leading-relaxed"
              />
              <p className="text-[11px] text-slate-400">
                This notice will be immediately broadcast to all 8 teacher dashboards and local offline PWA notifications.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setIsNoticeModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsNoticeModalOpen(false);
                  showToast('✓ Official Circular successfully broadcast to all 8 teachers!');
                }}
                className="px-5 py-2 bg-upsaffron-600 hover:bg-upsaffron-700 text-white font-bold text-xs rounded-xl transition active:scale-95 shadow-xs shadow-upsaffron-600/30"
              >
                Send Circular Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Modal: Official U-DISE+ Printable Report Card */}
      {isUdiseReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95 my-8">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-upnavy-950 text-white flex items-center justify-center font-bold text-lg">
                  🏛️
                </div>
                <div>
                  <h3 className="text-base font-black text-upnavy-950">
                    U-DISE+ 2026-27 School Compliance Certificate
                  </h3>
                  <p className="text-xs text-slate-500">
                    Government of Uttar Pradesh • Department of Basic Education
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsUdiseReportModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Official Report Document Body */}
            <div className="space-y-4 p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">School Name</span>
                  <span className="font-bold text-upnavy-950">Govt Model Sr Sec School Rampur</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">U-DISE Code</span>
                  <span className="font-bold font-mono text-upnavy-950">09280104502</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">District / Block</span>
                  <span className="font-bold text-upnavy-950">Rampur / Bilaspur (UP)</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Headmistress</span>
                  <span className="font-bold text-upnavy-950">Dr. Anita Deshmukh</span>
                </div>
              </div>

              {/* Statistics Table */}
              <div className="space-y-2">
                <div className="font-bold text-upnavy-950">Verified Parameters:</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-400 text-[10px] block">Total Enrollment</span>
                    <span className="font-black text-upnavy-900 text-sm">128 Students</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-400 text-[10px] block">Gender Parity</span>
                    <span className="font-black text-upnavy-900 text-sm">68 Boys / 60 Girls</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-400 text-[10px] block">Avg Attendance</span>
                    <span className="font-black text-emerald-700 text-sm">94.2% (Passed)</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-400 text-[10px] block">Mid-Day Meal (MDM)</span>
                    <span className="font-black text-emerald-700 text-sm">100% Saturation</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-400 text-[10px] block">Free Textbooks & DBT</span>
                    <span className="font-black text-emerald-700 text-sm">100% Disbursed</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-400 text-[10px] block">Solar & ICT Lab</span>
                    <span className="font-black text-emerald-700 text-sm">34 Tablets Operational</span>
                  </div>
                </div>
              </div>

              {/* Official Seal / Signature Stamp */}
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-mono text-[10px] text-slate-400">DIGITAL CERTIFICATE ID</div>
                  <div className="font-mono font-bold text-upnavy-950">UDISE-UP-2026-RMP-092801</div>
                </div>
                <div className="p-2 bg-emerald-100 border border-emerald-300 rounded-xl text-center">
                  <div className="text-[10px] font-extrabold text-emerald-900 uppercase">✓ VERIFIED & SEALED</div>
                  <div className="text-[9px] text-emerald-700">Dr. Anita Deshmukh (Headmistress)</div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-2 transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Certificate</span>
              </button>

              <button
                onClick={() => {
                  setIsUdiseReportModalOpen(false);
                  showToast('✓ U-DISE+ official compliance report downloaded successfully.');
                }}
                className="px-5 py-2.5 bg-upnavy-950 hover:bg-upnavy-900 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition active:scale-95 shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-upsaffron-400" />
                <span>Download Official PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
