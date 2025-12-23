import React, { useState, useEffect, useRef } from 'react';
import { Zap, Shield, Cpu, Activity, Layout, Terminal, ArrowRight, Layers, Box, X, Mail, CheckCircle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

// --- Types ---

type AppState = 'HERO' | 'LOADING' | 'ZEN';

// --- Mock Data ---

const PERFORMANCE_DATA = [
  { name: '00:00', val: 45 },
  { name: '04:00', val: 52 },
  { name: '08:00', val: 89 },
  { name: '12:00', val: 65 },
  { name: '16:00', val: 78 },
  { name: '20:00', val: 95 },
  { name: '24:00', val: 88 },
];

// --- Sub-components ---

const Logo: React.FC = () => (
  <div className="flex items-center gap-3 select-none">
    <div className="w-9 h-9 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-transform hover:scale-105">
      <Zap size={20} className="text-white fill-current" />
    </div>
    <span className="font-orbitron font-black text-2xl tracking-tighter text-slate-900 neon-glow italic">
      SELFHACK
    </span>
  </div>
);

const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`glass-card rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${className}`}>
    {children}
  </div>
);

const Navbar: React.FC = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between pointer-events-none">
    <div className="pointer-events-auto">
      <Logo />
    </div>
    <div className="hidden md:flex items-center gap-8 pointer-events-auto">
      {['PROTOCOL', 'CORE', 'Sovereignty'].map((item) => (
        <a key={item} href="#" className="font-mono-jet text-[10px] font-bold text-slate-500 hover:text-cyan-500 transition-colors tracking-widest uppercase">
          {item}
        </a>
      ))}
      <div className="h-4 w-[1px] bg-slate-200"></div>
      <div className="flex items-center gap-2 text-fuchsia-500">
        <Activity size={14} />
        <span className="font-mono-jet text-[10px] font-bold tracking-widest uppercase">Live Beta v0.7.2</span>
      </div>
    </div>
  </nav>
);

const BackgroundDecor: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-grid"></div>
    {/* Abstract Neural SVG */}
    <svg className="absolute top-0 right-0 w-2/3 h-full opacity-[0.03]" viewBox="0 0 800 800" fill="none">
      <path d="M100 100C300 100 400 300 400 500C400 700 600 800 800 800" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10" className="text-cyan-500" />
      <path d="M0 400C200 400 400 200 600 200C800 200 800 0 800 0" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" className="text-fuchsia-500" />
      <circle cx="400" cy="500" r="100" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400" />
      <circle cx="600" cy="200" r="150" stroke="currentColor" strokeWidth="0.5" className="text-fuchsia-400" />
    </svg>
    {/* Floating Orbs */}
    <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-cyan-100 rounded-full blur-[120px] opacity-30 animate-pulse-orb"></div>
    <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-fuchsia-100 rounded-full blur-[100px] opacity-30 animate-pulse-orb" style={{ animationDelay: '2s' }}></div>
  </div>
);

// --- Main Screen Components ---

const HeroScreen: React.FC<{ onLaunch: () => void; isExiting: boolean }> = ({ onLaunch, isExiting }) => {
  return (
    <div className={`relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 transition-all duration-1000 ${isExiting ? 'app-transition-exit' : ''}`}>
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Copy */}
        <div className="lg:col-span-7 flex flex-col gap-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 self-center lg:self-start px-3 py-1 bg-white border border-slate-200 rounded-full shadow-sm">
            <Shield size={14} className="text-cyan-500" />
            <span className="font-mono-jet text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Neural Protocols Established
            </span>
          </div>
          
          <h1 className="font-orbitron font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter text-slate-900 leading-[0.9] italic">
            REWRITE THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-fuchsia-500">
              CODE
            </span> OF YOUR <br />
            REALITY.
          </h1>
          
          <p className="max-w-xl text-lg md:text-xl text-slate-500 leading-relaxed mx-auto lg:mx-0">
            The first neural-link interface for human core optimization. 
            Gamify your life, hack your goals, reach sovereignty.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 mt-4 justify-center lg:justify-start">
            <button 
              onClick={onLaunch}
              className="group relative px-10 py-5 bg-white border-[1.5px] border-cyan-400/30 rounded-2xl overflow-hidden shadow-[0_20px_40px_-12px_rgba(6,182,212,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_25px_50px_-12px_rgba(6,182,212,0.4)] flex items-center gap-3 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Zap size={20} className="text-cyan-500 group-hover:animate-pulse" />
              <span className="font-mono-jet font-bold text-sm tracking-[0.2em] text-cyan-600 uppercase">
                Launch APP
              </span>
              <ArrowRight size={16} className="text-cyan-400 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Right Column: Dynamic UI Elements */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4 relative">
          {/* Card 1: Performance */}
          <GlassCard className="col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Cpu size={16} className="text-cyan-500" />
                <span className="font-mono-jet text-[10px] font-bold text-slate-400 uppercase tracking-widest">Neural Performance</span>
              </div>
              <span className="text-xs font-bold text-cyan-600">+12%</span>
            </div>
            <div className="h-[140px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={PERFORMANCE_DATA}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="val" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Card 2: Active Hack */}
          <GlassCard className="col-span-1 border-l-4 border-l-fuchsia-500">
            <Terminal size={18} className="text-fuchsia-500 mb-3" />
            <p className="font-mono-jet text-[9px] text-slate-400 uppercase tracking-widest mb-1">Active Hack</p>
            <p className="font-bold text-sm text-slate-800">Deep Work v2.4</p>
            <div className="mt-4 w-full bg-slate-100 h-1 rounded-full overflow-hidden">
              <div className="w-[65%] h-full bg-fuchsia-500"></div>
            </div>
          </GlassCard>

          {/* Card 3: Resources */}
          <GlassCard className="col-span-1">
            <Layers size={18} className="text-cyan-500 mb-3" />
            <p className="font-mono-jet text-[9px] text-slate-400 uppercase tracking-widest mb-1">Cognitive Load</p>
            <p className="font-bold text-sm text-slate-800">Optimal (24%)</p>
            <div className="mt-4 flex gap-1">
              {[1,1,1,1,0,0,0,0].map((v, i) => (
                <div key={i} className={`h-2 flex-1 rounded-sm ${v ? 'bg-cyan-400' : 'bg-slate-100'}`}></div>
              ))}
            </div>
          </GlassCard>

          {/* Decorative Floating Element */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/50 backdrop-blur-xl rounded-full border border-white/40 shadow-xl flex items-center justify-center animate-bounce duration-[3000ms]">
            <Box className="text-fuchsia-400" size={32} />
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-20 flex gap-12 border-t border-slate-200/50 pt-8 w-full max-w-7xl">
        {[
          { label: 'Latency', value: '4ms' },
          { label: 'Uptime', value: '99.99%' },
          { label: 'Nodes', value: '1,024' },
          { label: 'Status', value: 'Nominal' },
        ].map(stat => (
          <div key={stat.label}>
            <p className="font-mono-jet text-[9px] text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <p className="font-bold text-sm text-slate-700">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const NotifyPopup: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setEmail('');
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md glass-modal rounded-3xl p-8 shadow-2xl animate-fade-in-up">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="py-10 flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-2">
              <CheckCircle size={32} />
            </div>
            <h3 className="font-orbitron font-black text-2xl tracking-tight text-slate-900 italic uppercase">Access Granted</h3>
            <p className="text-slate-500 text-sm">We've added your core to the priority list. Check your transmission soon.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="w-12 h-12 bg-cyan-50 text-cyan-500 rounded-2xl flex items-center justify-center mb-2">
                <Mail size={24} />
              </div>
              <h3 className="font-orbitron font-black text-2xl tracking-tight text-slate-900 italic uppercase">Core Alert</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Join the neural beta. Be the first to rewrite your reality protocols.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="relative">
                <input 
                  type="email" 
                  required
                  placeholder="transcription@neural.link"
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10 transition-all font-mono-jet text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-slate-900 text-white font-mono-jet text-xs font-bold tracking-[0.2em] uppercase rounded-2xl hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-900/20"
              >
                Sync Identity
              </button>
            </form>
            
            <p className="text-[10px] text-slate-400 font-mono-jet text-center uppercase tracking-widest">By syncing you agree to neural link terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ComingSoonScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [progress, setProgress] = useState(0);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const TARGET_PROGRESS = 70;
  const DURATION = 6000; // 6 seconds for high-end feel

  const animate = (time: number) => {
    if (startTimeRef.current === undefined) {
      startTimeRef.current = time;
    }
    const elapsedTime = time - startTimeRef.current;
    
    // Smooth quadratic ease-out
    const t = Math.min(elapsedTime / DURATION, 1);
    const easedT = t * (2 - t); // Simple ease out
    const currentProgress = easedT * TARGET_PROGRESS;
    
    setProgress(currentProgress);

    if (t < 1) {
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      requestRef.current = requestAnimationFrame(animate);
    }, 500);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      clearTimeout(startTimeout);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 app-transition-enter-active">
      <NotifyPopup isOpen={isNotifyOpen} onClose={() => setIsNotifyOpen(false)} />
      
      {/* Background Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-200/40 to-fuchsia-200/40 rounded-full blur-[100px] animate-pulse-orb"></div>
      
      <div className="z-10 text-center flex flex-col items-center gap-12 max-w-2xl">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-white border border-slate-200 rounded-3xl shadow-xl flex items-center justify-center mb-4 transition-transform hover:rotate-12">
            <Layout className="text-cyan-500" size={32} />
          </div>
          <h2 className="font-orbitron font-black text-4xl tracking-tighter text-slate-900 italic">
            FINAL POLISHING <br /> IN PROGRESS...
          </h2>
          <p className="font-mono-jet text-xs font-bold text-slate-400 tracking-[0.3em] uppercase">
            Neural protocols established. Beta access starting soon.
          </p>
        </div>

        <div className="w-full flex flex-col gap-3">
          <div className="flex justify-between items-end">
            <span className="font-mono-jet text-[10px] font-bold text-cyan-600 tracking-widest uppercase">Initializing Core...</span>
            <span className="font-mono-jet text-sm font-bold text-slate-800 tracking-widest">
              {Math.floor(progress)}% LOADED
            </span>
          </div>
          <div className="w-full h-[2px] bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
              style={{ 
                width: `${progress}%`
              }}
            ></div>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => setIsNotifyOpen(true)}
            className="px-8 py-4 rounded-2xl bg-slate-900 text-white font-mono-jet text-[10px] font-bold tracking-widest uppercase hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-slate-900/20"
          >
            Notify Me
          </button>
          <button 
            onClick={onBack}
            className="px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-600 font-mono-jet text-[10px] font-bold tracking-widest uppercase hover:bg-slate-50 transition-all hover:border-slate-300 animate-fade-in-up [animation-delay:400ms] opacity-0"
            style={{ animationFillMode: 'forwards' }}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

// --- App Component ---

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('HERO');
  const [isExiting, setIsExiting] = useState(false);

  // Fix: handleLaunch must check for mandatory API key selection before proceeding.
  // Fix: window.aistudio.hasSelectedApiKey and window.aistudio.openSelectKey expect 1 argument (process.env.API_KEY).
  const handleLaunch = async () => {
    try {
      // Check for API key selection state
      if (!(await window.aistudio.hasSelectedApiKey(process.env.API_KEY))) {
        // Open the selection dialog if no key is selected
        await window.aistudio.openSelectKey(process.env.API_KEY);
      }
    } catch (e) {
      console.error("API key selection failed", e);
    }

    // Proceed to app transition (assuming key selection or existing key)
    setIsExiting(true);
    setTimeout(() => {
      setAppState('LOADING');
      setTimeout(() => {
        setAppState('ZEN');
      }, 50); // Small delay to trigger enter animation
    }, 800); // Wait for exit animation
  };

  const handleBack = () => {
    setIsExiting(false);
    setAppState('HERO');
  };

  return (
    <div className="min-h-screen text-slate-900 selection:bg-cyan-100 selection:text-cyan-900">
      <BackgroundDecor />
      <Navbar />
      
      <main>
        {appState === 'HERO' && (
          <HeroScreen onLaunch={handleLaunch} isExiting={isExiting} />
        )}
        
        {appState === 'ZEN' && (
          <ComingSoonScreen onBack={handleBack} />
        )}

        {appState === 'LOADING' && (
          <div className="min-h-screen bg-white"></div>
        )}
      </main>

      {/* Global Grid Overlay for Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay">
        <div className="absolute inset-0 bg-slate-900"></div>
      </div>
    </div>
  );
};

export default App;
