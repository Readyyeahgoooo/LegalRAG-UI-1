import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Download, Bookmark, ExternalLink, ShieldCheck, Route, AlertTriangle, ChevronRight, FileBox, Landmark } from 'lucide-react';
import { LegalAnswer } from '../types';

interface ResultSectionProps {
  answer: LegalAnswer | null;
  isLoading: boolean;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ answer, isLoading }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Grounded Answer */}
      <div className="lg:col-span-2 space-y-6">
        <div className="glass-card p-10 ring-1 ring-slate-200/40 min-h-[500px] relative overflow-hidden">
          {/* Decorative Background Accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {!answer && !isLoading ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20"
              >
                <div className="w-20 h-20 rounded-[32px] bg-white flex items-center justify-center text-slate-400 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] pill-glow">
                  <FileBox size={32} className="opacity-40" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 tracking-tight">Ready for Inquiry</h3>
                  <p className="text-slate-400 text-sm max-w-[280px] mt-2 font-medium">Ask a legal question above to generate a grounded answer from the HK Law GraphRAG.</p>
                </div>
              </motion.div>
            ) : isLoading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-10"
              >
                <div className="space-y-4">
                  <div className="h-8 w-1/4 bg-slate-100/50 animate-pulse rounded-xl" />
                  <div className="h-5 w-3/4 bg-slate-100/50 animate-pulse rounded-xl" />
                </div>
                <div className="space-y-8">
                  {[1, 2].map(i => (
                    <div key={i} className="space-y-4">
                      <div className="h-4 w-24 bg-slate-100/50 animate-pulse rounded-lg" />
                      <div className="h-32 w-full bg-slate-50/50 animate-pulse rounded-[24px]" />
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="content"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-10"
              >
                <div className="flex items-start justify-between border-b border-slate-100 pb-8">
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[10px] uppercase tracking-[0.14em] font-black text-blue-600">
                      <div className="w-1 h-1 rounded-full bg-blue-600 animate-pulse" />
                      Grounded Answer
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                      {answer?.issue}
                    </h2>
                  </div>
                  <div className="flex gap-2">
                    {[Copy, Download, Bookmark].map((Icon, i) => (
                      <button key={i} className="p-3 bg-white rounded-2xl text-slate-400 hover:text-blue-600 transition-all border border-slate-100 hover:border-blue-100 shadow-sm hover:shadow-md active:scale-95">
                        <Icon size={18} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-10">
                  <section className="space-y-4">
                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                      Answer Summary
                    </h4>
                    <p className="text-slate-700 leading-relaxed text-[17px] font-medium selection:bg-blue-100">
                      {answer?.summary}
                    </p>
                  </section>

                  <section className="space-y-4">
                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                      Key Authorities
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {answer?.authorities.map((auth, i) => (
                        <div key={i} className="subtle-metal p-5 rounded-[24px] group cursor-pointer transition-all hover:scale-[1.02] active:scale-98">
                          <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center mb-3 shadow-sm border border-slate-100 text-slate-400 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
                            <Landmark size={14} />
                          </div>
                          <div className="font-bold text-slate-900 text-[15px] mb-1.5 tracking-tight">{auth.name}</div>
                          <div className="text-xs text-slate-500 font-medium leading-normal">{auth.description}</div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Grounded in HK Law Corpus</div>
                  <button className="glass px-5 py-2 rounded-xl text-[11px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-[0.14em] flex items-center gap-2 transition-all hover:gap-3">
                    View in full <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Sidebars: Citations & Source Trail */}
      <div className="space-y-6">
        {/* Supporting Citations */}
        <div className="glass p-6 rounded-[28px] ring-1 ring-slate-200/50 space-y-4">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-blue-500" />
              Citations
            </span>
            <span className="text-slate-400 text-[10px] font-bold">{answer?.citations.length || 0} Total</span>
          </h4>
          <div className="space-y-3">
            {answer?.citations.map((cite) => (
              <div key={cite.id} className="flex gap-3 group">
                <div className="text-[10px] font-bold text-slate-300 w-4 pt-1">{cite.id}</div>
                <div className="flex-1 space-y-1">
                  <div className="text-[11px] text-slate-700 leading-normal line-clamp-2 group-hover:line-clamp-none transition-all">
                    {cite.text}
                  </div>
                  <div className="text-[9px] font-bold text-slate-400 flex items-center gap-1 group-hover:text-blue-500 transition-colors cursor-pointer">
                    {cite.ref} <ExternalLink size={8} />
                  </div>
                </div>
              </div>
            ))}
            {!answer && !isLoading && <div className="text-xs text-slate-400 italic">No citations loaded.</div>}
            {isLoading && [1, 2, 3].map(i => <div key={i} className="h-10 w-full bg-slate-50 animate-pulse rounded-xl" />)}
          </div>
          {answer && (
            <button className="w-full py-2 text-[10px] font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest pt-2 border-t border-slate-50">
              View all 18 citations
            </button>
          )}
        </div>

        {/* Source Trail */}
        <div className="glass p-6 rounded-[28px] ring-1 ring-slate-200/50 space-y-4">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Route size={16} className="text-slate-400" />
            Source Trail
          </h4>
          <div className="p-3 bg-slate-50/50 rounded-2xl flex flex-wrap items-center gap-2 border border-slate-100">
            {['Criminal Law', 'Arrest', 'PFO', 'Cap. 232 s.24'].map((stop, i) => (
              <React.Fragment key={i}>
                <span className="text-[9px] font-bold text-slate-500">{stop}</span>
                {i < 3 && <ChevronRight size={10} className="text-slate-300" />}
              </React.Fragment>
            ))}
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-1.5 font-bold text-slate-400">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              98% Confidence
            </div>
            <button className="text-blue-500 font-bold hover:underline">View in graph</button>
          </div>
        </div>

        {/* Warnings */}
        <div className="bg-amber-50/30 p-5 rounded-[28px] border border-amber-100/50 space-y-2">
          <h4 className="text-[10px] font-bold text-amber-600 uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle size={14} />
            Grounding Warnings
          </h4>
          <div className="text-[10px] text-amber-700/70 leading-relaxed font-medium">
            Some secondary sources may require verification against latest HK Gazette updates.
          </div>
        </div>
      </div>
    </div>
  );
};
