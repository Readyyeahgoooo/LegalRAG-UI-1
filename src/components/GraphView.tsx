import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'motion/react';
import { Share2, Scale, Users, ShieldAlert, FileText, Plus, Minus, Maximize2 } from 'lucide-react';

interface NodeProps {
  label: string;
  type: 'root' | 'topic' | 'sub-topic' | 'case';
  icon?: React.ReactNode;
}

const Node: React.FC<NodeProps> = ({ label, type, icon }) => {
  const baseStyles = "relative px-5 py-2.5 rounded-2xl transition-all duration-500 flex items-center gap-2.5 group cursor-pointer border";
  const variants = {
    root: "bg-slate-900 text-white shadow-[0_10px_30px_-5px_rgba(15,23,42,0.3)] scale-110 font-bold border-slate-800",
    topic: "glass-card text-slate-800 font-bold border-white ring-1 ring-slate-100/50 hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-0.5",
    'sub-topic': "bg-white/60 backdrop-blur-md border-white/30 text-slate-600 text-[13px] font-semibold hover:bg-white/90",
    case: "bg-white/30 border-white/20 text-slate-500 text-[11px] font-medium italic hover:bg-white/50"
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[type]}`}
    >
      {icon && <span className="opacity-60 group-hover:opacity-100 transition-opacity translate-y-[0.5px]">{icon}</span>}
      <span className="whitespace-nowrap tracking-tight">{label}</span>
      {type === 'root' && (
        <div className="absolute -inset-2 bg-blue-500/10 blur-2xl rounded-full -z-10 animate-pulse" />
      )}
    </motion.div>
  );
};

export const GraphView: React.FC = () => {
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoom = (delta: number) => {
    setScale(prev => Math.min(Math.max(0.5, prev + delta), 2));
  };

  const nodes = [
    { id: '1', label: 'Criminal law', type: 'root' as const, x: 0, y: 0, icon: <Scale size={18} /> },
    
    // Left branch: Traffic
    { id: '2', label: 'Traffic offences', type: 'topic' as const, x: -280, y: -100, icon: <Users size={16} /> },
    { id: '2.1', label: 'Drink driving', type: 'sub-topic' as const, x: -380, y: -40, parentId: '2' },
    { id: '2.2', label: 'Careless driving', type: 'sub-topic' as const, x: -180, y: -40, parentId: '2' },
    
    // Middle-left: Arrest
    { id: '3', label: 'Arrest', type: 'topic' as const, x: -300, y: 150, icon: <ShieldAlert size={16} /> },
    { id: '3.1', label: 'Search', type: 'sub-topic' as const, x: -400, y: 220, parentId: '3' },
    { id: '3.2', label: 'Detention', type: 'sub-topic' as const, x: -200, y: 220, parentId: '3' },
    
    // Right branch: Trial
    { id: '4', label: 'Trial', type: 'topic' as const, x: 280, y: 150, icon: <FileText size={16} /> },
    { id: '4.1', label: 'Procedure', type: 'sub-topic' as const, x: 180, y: 220, parentId: '4' },
    { id: '4.2', label: 'Evidence', type: 'sub-topic' as const, x: 380, y: 220, parentId: '4' },
    
    // Bottom branch: Public order
    { id: '5', label: 'Public order', type: 'topic' as const, x: 0, y: 280, icon: <Users size={16} /> },
  ];

  return (
    <div className="relative w-full h-[600px] overflow-hidden mesh-bg rounded-3xl border border-slate-200/60 shadow-inner group">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
      />

      {/* Controls */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-10">
        <div className="glass p-1.5 flex flex-col gap-1 rounded-2xl ring-1 ring-slate-200">
          <button onClick={() => handleZoom(0.1)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600"><Plus size={18}/></button>
          <div className="h-px bg-slate-200 mx-2" />
          <button onClick={() => handleZoom(-0.1)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600"><Minus size={18}/></button>
        </div>
        <button className="glass p-3 rounded-2xl ring-1 ring-slate-200 hover:bg-slate-50 transition-colors text-slate-600 shadow-lg">
          <Maximize2 size={18} />
        </button>
      </div>

      <div className="absolute top-6 left-6 z-10 glass px-4 py-2 rounded-2xl flex items-center gap-3 text-xs text-slate-500 font-medium tracking-wide">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-slate-900" /> Topic
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-slate-300 border border-slate-400/30" /> Sub-topic
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-slate-200/50 border border-slate-300/20" /> Case
        </div>
      </div>

      {/* Stats Overlay */}
      <div className="absolute top-6 right-6 z-10 flex gap-4">
        {[
          { label: 'Nodes', value: '3,564', icon: <Share2 size={14}/> },
          { label: 'Cases', value: '1,664', icon: <FileText size={14}/> },
          { label: 'Statutes', value: '465', icon: <Scale size={14}/> }
        ].map((stat, i) => (
          <div key={i} className="glass px-4 py-3 rounded-2xl flex items-center gap-3 ring-1 ring-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
              {stat.icon}
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{stat.label}</div>
              <div className="text-sm font-semibold text-slate-700 leading-none mt-1">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Graph Area */}
      <motion.div
        drag
        dragConstraints={containerRef}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        style={{ x: '50%', y: '50%', scale }}
        className="relative cursor-grab active:cursor-grabbing w-0 h-0"
      >
        <svg className="absolute overflow-visible pointer-events-none" style={{ left: 0, top: 0 }}>
          <defs>
            <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill="#cbd5e1" />
            </marker>
          </defs>
          
          {/* Main Connections */}
          {nodes.map(node => {
            if (node.id === '1') return null;
            const parent = node.parentId ? nodes.find(n => n.id === node.parentId) : nodes.find(n => n.id === '1');
            if (!parent) return null;

            // Simplified path drawing
            const d = `M ${parent.x} ${parent.y} L ${node.x} ${node.y}`;
            
            return (
              <g key={`link-${node.id}`}>
                <path
                  d={d}
                  stroke="#cbd5e1"
                  strokeWidth={node.parentId ? "1" : "1.5"}
                  fill="none"
                  strokeDasharray={node.parentId ? "4 4" : "0"}
                  className="transition-all duration-500 opacity-60"
                />
              </g>
            );
          })}
        </svg>

        {nodes.map(node => (
          <div
            key={node.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: node.x, top: node.y }}
          >
            <Node label={node.label} type={node.type} icon={node.icon} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
