import React from 'react';
import { X, HardDrive, Trash2, ArrowRight, BookOpen } from 'lucide-react';
import { sampleCourses, getLocalized } from '../data/mockData';

export function DownloadsModal({ isOpen, onClose, lang, downloadedIds, onRemoveDownload, onOpenLesson }) {
  if (!isOpen) return null;

  const allChapters = sampleCourses.flatMap(c => c.chapters);
  const downloadedChapters = allChapters.filter(ch => downloadedIds.includes(ch.id));
  const totalKB = downloadedChapters.reduce((acc, curr) => acc + curr.sizeKB, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-4 sm:p-6 shadow-2xl border border-slate-100 max-h-[88vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-upnavy-100 text-upnavy-800 border border-upnavy-200 flex items-center justify-center font-bold">
              <HardDrive className="w-4 h-4 text-upnavy-800" />
            </div>
            <div>
              <h2 className="text-base font-bold text-upnavy-950">
                {lang === 'hi' ? 'डिवाइस में सहेजे गए पाठ (IndexedDB)' : 'Device Offline Storage'}
              </h2>
              <p className="text-[11px] text-slate-500">
                {downloadedChapters.length} {lang === 'hi' ? 'अध्याय सुरक्षित' : 'chapters cached'} • {totalKB} KB {lang === 'hi' ? 'स्थान प्रयुक्त' : 'used'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {downloadedChapters.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs">
            {lang === 'hi' ? 'कोई भी अध्याय अभी ऑफ़लाइन सहेजा नहीं गया है।' : 'No chapters saved offline yet.'}
          </div>
        ) : (
          <div className="space-y-3">
            {downloadedChapters.map(ch => (
              <div key={ch.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3 text-xs">
                <div>
                  <div className="font-bold text-slate-800">{getLocalized(ch.title, lang)}</div>
                  <div className="text-[11px] text-slate-500">{ch.topicKey} • {ch.sizeKB} KB</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onOpenLesson(ch);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-lg bg-upsaffron-600 hover:bg-upsaffron-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm shadow-upsaffron-600/30 transition"
                  >
                    <span>{lang === 'hi' ? 'पढ़ें' : 'Read'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => onRemoveDownload(ch.id)}
                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50"
                    title="Remove from device storage"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
