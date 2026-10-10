import React from 'react';
import { X, Layers, ShieldCheck, Database, Server, Smartphone, Cpu, CheckCircle } from 'lucide-react';

export function SystemArchitectureModal({ isOpen, onClose, lang }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-4 sm:p-7 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-upnavy-100 text-upnavy-800 border border-upnavy-200 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5 text-upnavy-800" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-upnavy-950">
                Major Project Technical Architecture & Viva Reference
              </h2>
              <p className="text-xs text-slate-500">
                3-Tier Decoupled Architecture & Rural-First Design Pattern
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 text-xs text-slate-700">
          {/* Decoupled Flow Card */}
          <div className="p-4 rounded-xl bg-slate-900 text-white space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-upsaffron-400 font-bold text-xs uppercase tracking-wider">
                End-to-End Request Pipeline
              </span>
              <span className="text-[10px] bg-upsaffron-500/20 text-upsaffron-300 px-2 py-0.5 rounded border border-upsaffron-400/30">
                Secure & Scalable
              </span>
            </div>

            {/* Pipeline visual */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                <Smartphone className="w-5 h-5 mx-auto text-cyan-400 mb-1" />
                <div className="font-bold text-slate-200">1. Client Tier</div>
                <div className="text-[10px] text-slate-400">React + Vite PWA + IndexedDB Cache</div>
              </div>

              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                <Server className="w-5 h-5 mx-auto text-emerald-400 mb-1" />
                <div className="font-bold text-slate-200">2. Gateway API</div>
                <div className="text-[10px] text-slate-400">Node.js + Express (JWT & Sync)</div>
              </div>

              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                <Cpu className="w-5 h-5 mx-auto text-amber-400 mb-1" />
                <div className="font-bold text-slate-200">3. AI Service</div>
                <div className="text-[10px] text-slate-400">Python + FastAPI Microservice</div>
              </div>

              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                <Database className="w-5 h-5 mx-auto text-rose-400 mb-1" />
                <div className="font-bold text-slate-200">4. LLM & Data</div>
                <div className="text-[10px] text-slate-400">LLM API + MongoDB Cluster</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-[11px] text-amber-300 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
              <span>
                <strong>Crucial Design Decision:</strong> React Frontend never speaks directly to the LLM. All AI requests pass through Node.js auth gateway into the Python FastAPI microservice, ensuring API key security, rate-limiting, and student prompt validation.
              </span>
            </div>
          </div>

          {/* Key Differences from DIKSHA / Generic LMS */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-3">
            <h4 className="font-bold text-sm text-amber-950">
              Viva Defense: "Why this platform when DIKSHA / Khan Academy already exist?"
            </h4>
            <div className="space-y-2 text-[11px] leading-relaxed text-slate-700">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Assumption Failure of existing LMS:</strong> Existing platforms assume high bandwidth, English familiarity, personal devices, and standard grade comprehension.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Diagnostic-driven Remedial Pathways:</strong> Instead of dumping static PDFs, GyanSetu evaluates baseline prerequisites (e.g. locks percentages until fractions are mastered).</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>True Local-First Offline & Bandwidth Modes:</strong> Real-time toggle reducing footprint from 20MB video to &lt;40KB text+voice narration with background IndexedDB sync when internet reconnects.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
