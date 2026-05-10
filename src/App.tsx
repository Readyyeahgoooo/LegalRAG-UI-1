import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, BookOpen, Search, Menu, User, Bell, ChevronDown } from 'lucide-react';
import { GraphView } from './components/GraphView';
import { SearchSection } from './components/SearchSection';
import { ResultSection } from './components/ResultSection';
import { LegalAnswer } from './types';
import { generateLegalAnswer } from './services/geminiService';

export default function App() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState<LegalAnswer | null>(null);

  const handleGenerate = async () => {
    if (!query || isLoading) return;
    
    setIsLoading(true);
    setAnswer(null); // Clear previous
    
    try {
      const result = await generateLegalAnswer(query);
      setAnswer(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-blue-100/50 pb-20 mesh-bg">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-white/50 h-20 px-8 lg:px-16 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3.5 group cursor-pointer">
            <div className="w-11 h-11 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-slate-900/20 group-hover:scale-105 transition-all duration-500 ease-out">
              <Shield size={22} fill="currentColor" fillOpacity={0.2} />
            </div>
            <div className="space-y-0.5">
              <span className="text-xl font-black tracking-tighter text-slate-900 block leading-none">Casemap</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block">Legal Dynamics</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {['Graph Explorer', 'Intelligent Search', 'Resources', 'Law Journal'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className={`text-xs font-black uppercase tracking-[0.14em] transition-all relative py-2 ${item === 'Graph Explorer' ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {item}
                {item === 'Graph Explorer' && (
                  <motion.div layoutId="nav-active" className="absolute -bottom-1 left-0 right-0 h-[3px] bg-blue-600 rounded-full" />
                )}
              </a>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:flex w-10 h-10 items-center justify-center rounded-2xl hover:bg-white text-slate-500 transition-all border border-transparent hover:border-slate-100">
            <Bell size={20} />
          </button>
          <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block" />
          <button className="flex items-center gap-3 pl-2.5 pr-5 py-2 glass-card ring-1 ring-slate-200/50 rounded-2xl hover:bg-white transition-all shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100 overflow-hidden">
              <User size={18} />
            </div>
            <span className="text-xs font-black text-slate-800 uppercase tracking-widest translate-y-[1px]">Account</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-8 lg:px-16 pt-12 space-y-16">
        
        {/* Header / Intro */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900 text-[10px] font-black text-white uppercase tracking-[0.2em] mb-2 shadow-xl shadow-slate-900/10">
              <BookOpen size={12} fill="currentColor" fillOpacity={0.4} /> Engine v2.4
            </div>
            <h1 className="text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 max-w-2xl leading-[0.95]">
              Accelerating legal insight with <span className="text-blue-600 relative inline-block">GraphRAG.<div className="absolute -bottom-2 inset-x-0 h-1.5 bg-blue-600/10 blur-md rounded-full" /></span>
            </h1>
          </div>
          
          <div className="flex items-center gap-10 shrink-0">
            {[
              { label: 'Uptime', value: '99.9%' },
              { label: 'Cloud Sync', value: 'Active' },
            ].map(stat => (
              <div key={stat.label} className="space-y-1">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                <div className="text-lg font-black text-slate-900 tracking-tight">{stat.value}</div>
              </div>
            ))}
          </div>
        </header>

        {/* Graph Area */}
        <section className="space-y-5">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em]">Graph Topology</h3>
              <div className="px-2 py-0.5 rounded-md bg-blue-50 text-[9px] font-black text-blue-600 uppercase">Live Retrieval</div>
            </div>
            <div className="flex items-center gap-6">
              <button className="text-[10px] font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-[0.14em]">Focus View</button>
              <button className="text-[10px] font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-[0.14em]">Export Data</button>
            </div>
          </div>
          <div className="rounded-[40px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-white">
            <GraphView />
          </div>
        </section>

        {/* Inquiry Area */}
        <section className="space-y-16">
          <SearchSection 
            query={query} 
            setQuery={setQuery} 
            onGenerate={handleGenerate} 
            isLoading={isLoading} 
          />
          
          <ResultSection answer={answer} isLoading={isLoading} />
        </section>
      </main>

      {/* Modern Footer */}
      <footer className="mt-40 py-20 bg-slate-900 text-white px-8 lg:px-16 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
        
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-start justify-between gap-16 relative">
          <div className="space-y-6 max-w-xs">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-xl">
                <Shield size={22} />
              </div>
              <span className="text-xl font-black tracking-tighter">Casemap</span>
            </div>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Advancing justice through high-fidelity legal graphing and semantic intelligence.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 uppercase">
            {[
              { title: 'System', items: ['Network', 'API', 'Uptime'] },
              { title: 'Resources', items: ['Docs', 'Precedents', 'Gazette'] },
              { title: 'Company', items: ['Methodology', 'Privacy', 'Contact'] }
            ].map(col => (
              <div key={col.title} className="space-y-6">
                <h5 className="text-[10px] font-black text-white tracking-[0.2em]">{col.title}</h5>
                <ul className="space-y-4">
                  {col.items.map(item => (
                    <li key={item}><a href="#" className="text-[11px] font-black text-slate-500 hover:text-white transition-colors tracking-widest">{item}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto mt-24 pt-10 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase">
          <div>© 2026 CASEMAP HK. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Twitter</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
            <a href="#" className="hover:text-white">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
