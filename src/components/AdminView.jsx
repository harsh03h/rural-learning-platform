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
  Activity
} from 'lucide-react';

export function AdminView({ lang }) {
  const [isEdgeSyncing, setIsEdgeSyncing] = useState(false);
  const [edgeStatus, setEdgeStatus] = useState('Broadcasting via School Wi-Fi (No Internet Required)');

  const handleTriggerEdgeSync = () => {
    setIsEdgeSyncing(true);
    setTimeout(() => {
      setIsEdgeSyncing(false);
      setEdgeStatus('Synced with District Cloud Repository (All 128 Student Records Updated)');
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-28 max-w-6xl mx-auto">
      {/* 1. Modern Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-upnavy-900 bg-upnavy-100 px-3 py-1 rounded-full border border-upnavy-200">
              School Administration
            </span>
            <span className="text-xs text-slate-400">U-DISE: 09280104502</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-upnavy-950 tracking-tight">
            Dr. Anita Deshmukh (Headmistress)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Govt Model Senior Secondary School Rampur • Local Hub Cluster
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-2xl text-xs font-bold text-emerald-900 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-200" />
          <span>Local Edge Hub Online</span>
        </div>
      </div>

      {/* 2. Key Administrative Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Enrolled Students</span>
            <Users className="w-4 h-4 text-upnavy-800" />
          </div>
          <div className="text-2xl font-black text-upnavy-950">128</div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">Classes 6 to 10</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Teaching Staff</span>
            <School className="w-4 h-4 text-upsaffron-600" />
          </div>
          <div className="text-2xl font-black text-upnavy-950">8</div>
          <div className="text-[11px] text-upsaffron-600 font-bold mt-1">100% Active</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Active PWA Tablets</span>
            <HardDrive className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-700">34</div>
          <div className="text-[11px] text-amber-600 font-semibold mt-1">Synchronized to Edge</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Offline Curriculum</span>
            <Database className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-black text-sky-700">4.2 GB</div>
          <div className="text-[11px] text-sky-600 font-semibold mt-1">Cached Locally</div>
        </div>
      </div>

      {/* 3. Rural Edge Server Node */}
      <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-upnavy-100 text-upnavy-800 flex items-center justify-center font-bold border border-upnavy-200">
              <Server className="w-5 h-5 text-upnavy-800" />
            </div>
            <div>
              <h3 className="text-base font-bold text-upnavy-950">
                School Community Edge Server (Raspberry Pi Node)
              </h3>
              <p className="text-xs text-slate-500">
                Local Wi-Fi mesh distributing learning content to student phones without cellular data
              </p>
            </div>
          </div>

          <button
            onClick={handleTriggerEdgeSync}
            disabled={isEdgeSyncing}
            className="px-4 py-2 bg-upsaffron-600 hover:bg-upsaffron-700 text-white font-bold text-xs rounded-2xl flex items-center gap-2 shadow-xs shadow-upsaffron-600/30 transition active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isEdgeSyncing ? 'animate-spin' : ''}`} />
            <span>{isEdgeSyncing ? 'Syncing...' : 'Sync Edge with District Cloud'}</span>
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-upnavy-50/70 border border-upnavy-200/80 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-upnavy-950 font-medium">
            <Wifi className="w-4 h-4 text-upnavy-800 shrink-0" />
            <span><strong>Status:</strong> {edgeStatus}</span>
          </div>
          <span className="text-[10px] font-bold bg-white text-upnavy-900 px-3 py-1 rounded-full border border-upnavy-200 w-fit">
            Node: RAMPUR-EDGE-01
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="font-bold text-slate-800">Class 6–8 Mathematics</div>
            <div className="text-[11px] text-slate-400">14 chapters cached in 10 languages</div>
            <div className="text-[11px] text-upnavy-800 font-bold pt-1">✓ Ready for Local Wi-Fi sync</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="font-bold text-slate-800">Class 6–8 Science</div>
            <div className="text-[11px] text-slate-400">18 lessons + audio voiceovers</div>
            <div className="text-[11px] text-upnavy-800 font-bold pt-1">✓ Ready for Local Wi-Fi sync</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="font-bold text-slate-800">Language Audio Dictionaries</div>
            <div className="text-[11px] text-slate-400">Hindi, Marathi, Bengali, Telugu, Tamil, etc.</div>
            <div className="text-[11px] text-upnavy-800 font-bold pt-1">✓ 100% Cached Locally</div>
          </div>
        </div>
      </div>
    </div>
  );
}
