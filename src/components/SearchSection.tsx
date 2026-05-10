import React from 'react';
import { Search, Sparkles, SlidersHorizontal, ChevronDown, FileBox, Landmark, Scroll, Highlighter } from 'lucide-react';
import { motion } from 'motion/react';

interface SearchSectionProps {
  query: string;
  setQuery: (q: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const SearchSection: React.FC<SearchSectionProps> = ({ query, setQuery, onGenerate, isLoading }) => {
  return (
    <div className="w-full space-y-4">
      <div className="relative group">
        <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-[40px] -z-10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-1000" />
        <div className="glass-card pl-8 pr-4 py-5 ring-1 ring-slate-200/60 group-focus-within:ring-blue-200 transition-all duration-500 flex items-center gap-5 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)]">
          <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-focus-within:text-blue-500 group-focus-within:bg-blue-50 transition-all">
            <Search size={22} strokeWidth={2.5} />
          </div>
          <input 
            type="text" 
            placeholder="Search HK laws, precedents, or citations..."
            className="flex-1 bg-transparent border-none outline-none text-lg text-slate-800 placeholder:text-slate-300 font-bold tracking-tight"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onGenerate()}
          />
          <button 
            onClick={onGenerate}
            disabled={isLoading || !query}
            className="flex items-center gap-2.5 px-8 py-3.5 bg-slate-900 border border-slate-800 text-white rounded-[20px] font-black text-sm hover:bg-slate-800 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100 shadow-xl shadow-slate-900/10"
          >
            {isLoading ? (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles size={18} fill="currentColor" />
              </motion.div>
            ) : <Sparkles size={18} fill="currentColor" fillOpacity={0.2} />}
            {isLoading ? 'Thinking...' : 'AI Generate'}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 px-2">
        <div className="flex flex-wrap items-center gap-3">
          {[
            { label: 'Cases', icon: <FileBox size={14} /> },
            { label: 'Statutes', icon: <Landmark size={14} /> },
            { label: 'Doctrine', icon: <Scroll size={14} /> },
            { label: 'Citations', icon: <Highlighter size={14} /> }
          ].map((filter, i) => (
            <button key={i} className="glass pl-3 pr-2 py-2 rounded-xl flex items-center gap-2 ring-1 ring-slate-200/50 hover:bg-white transition-colors text-xs font-semibold text-slate-600">
              {filter.icon}
              {filter.label}
              <ChevronDown size={14} className="opacity-40" />
            </button>
          ))}
        </div>

        <button className="glass px-4 py-2 rounded-xl flex items-center gap-2 ring-1 ring-slate-200/50 hover:bg-white transition-colors text-xs font-semibold text-slate-600 shadow-sm">
          <SlidersHorizontal size={14} />
          Advanced Filters
        </button>
      </div>
    </div>
  );
};
