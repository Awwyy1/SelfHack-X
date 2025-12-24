
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Zap, Shield, Cpu, Activity, Layout, Terminal, ArrowRight, Layers, Box, X, Mail, CheckCircle, Snowflake, Trophy, Mic, Sparkles } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

// --- Types ---
type AppState = 'HERO' | 'LOADING' | 'ZEN';

// --- Components ---

const SnowflakeOverlay: React.FC = () => {
  const snowflakes = useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 8 + 4}s`,
      animationDelay: `${Math.random() * 5}s`,
      size: `${Math.random() * 5 + 3}px`,
      opacity: Math.random() * 0.4 + 0.5,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animation: `snow-fall ${flake.animationDuration} linear infinite ${flake.animationDelay}`,
          }}
        />
      ))}
    </div>
  );
};

const Logo: React.FC = () => (
  <div className="flex items-center gap-3 select-none">
    <div className="w-9 h-9 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-transform hover:scale-105">
      <Zap size={20} className="text-white fill-current" />
    </div>
    <span className="font-orbitron font-black text-2xl tracking-tighter text-slate-900 neon-glow">
      SELFHACK
    </span>
  </div>
);

const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`glass-card rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${className}`}>
    {children}
  </div>
);

const SantaHat: React.FC = () => (
  <div className="absolute -top-[18px] -left-[6px] pointer-events-none z-10 santa-hat-anim">
    <svg width="21" height="17" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 1L17 11H1L9 1Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="0.5" />
      <rect x="1" y="10.5" width="16" height="3" rx="1.5" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.5" />
      <circle cx="9" cy="2" r="1.8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="0.5" />
    </svg>
  </div>
);

const Navbar: React.FC<{ isSnowing: boolean; onToggleSnow: () => void }> = ({ isSnowing, onToggleSnow }) => (
  <nav className="fixed top-0 left-0 right-0 z-[110] px-8 py-6 flex items-center justify-between pointer-events-none">
    <div className="pointer-events-auto">
      <Logo />
    </div>
    <div className="flex items-center gap-4 md:gap-8 pointer-events-auto">
      <div className="hidden md:flex items-center gap-8">
        {['PROTOCOL', 'CORE', 'Sovereignty'].map((item) => (
          <a key={item} href="#" className="font-mono-jet text-[10px] font-bold text-slate-500 hover:text-cyan-500 transition-colors tracking-widest uppercase">
            {item}
          </a>
        ))}
        <div className="h-4 w-[1px] bg-slate-200"></div>
      </div>
      
      <button 
        onClick={onToggleSnow}
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full transition-all duration-300 border relative ${
          isSnowing 
          ? 'bg-cyan-500 text-white border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.5)]' 
          : 'bg-white/90 text-slate-500 border-slate-200 hover:border-slate-300'
        } backdrop-blur-md active:scale-95 group`}
      >
        <div className="relative">
          <SantaHat />
          <Snowflake size={14} className={`${isSnowing ? 'animate-spin-slow' : 'group-hover:rotate-12 transition-transform'}`} />
        </div>
        <span className="font-mono-jet text-[10px] font-bold tracking-widest uppercase">Snow</span>
      </button>

      <div className="flex items-center gap-2 text-fuchsia-500">
        <Activity size={14} />
        <span className="font-mono-jet text-[10px] font-bold tracking-widest uppercase hidden sm:inline">Beta v0.3.</span>
      </div>
    </div>
  </nav>
);

const BackgroundDecor: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-grid"></div>
    <svg className="absolute top-0 right-0 w-2/3 h-full opacity-[0.03]" viewBox="0 0 800 800" fill="none">
      <path d="M100 100C300 100 400 300 400 500C400 700 600 800 800 800" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10" className="text-cyan-500" />
      <path d="M0 400C200 400 400 200 600 200C800 200 800 0 800 0" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" className="text-fuchsia-500" />
      <circle cx="400" cy="500" r="100" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400" />
      <circle cx="600" cy="200" r="150" stroke="currentColor" strokeWidth="0.5" className="text-fuchsia-400" />
    </svg>
    <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-cyan-100 rounded-full blur-[120px] opacity-30 animate-pulse-orb"></div>
    <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-fuchsia-100 rounded-full blur-[100px] opacity-30 animate-pulse-orb" style={{ animationDelay: '2s' }}></div>
  </div>
);

// === HERO CARD WITH DYNAMIC TITLES ONLY (NO LEVEL-UP ANIMATION) ===
const GameHeroCard: React.FC = () => {
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(850);

  // Level titles hierarchy
  const levelTitles = [
    "Seed",    // Level 1
    "Scout",   // Level 2
    "Awaken",     // Level 3
    "Hunter",     // Level 4
    "Hacker",     // Level 5
    "Leader",  // Level 6
    "Champ",  // Level 7
    "Titan",   // Level 8
    "Prime",   // Level 9
    "Legend"     // Level 10+
  ];

  // Current title (cap at Eternal)
  const currentTitle = level <= 10 ? levelTitles[level - 1] : "Eternal";

  // Smooth XP accumulation
  useEffect(() => {
    const interval = setInterval(() => {
      setXp(prev => prev + 2);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Clean level increase without side effects inside state
  useEffect(() => {
    if (xp >= 1000) {
      setXp(0);
      setLevel(prev => prev + 1);
    }
  }, [xp]);

  return (
    <div className="relative w-full group perspective-1000 max-w-[420px] mx-auto scale-95 lg:scale-100">
      {/* Main Hero Card */}
      <div className="relative w-full bg-white border border-slate-200 rounded-[32px] md:rounded-[40px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-700 group-hover:shadow-cyan-200/40 group-hover:rotate-y-3">
        <div className="absolute top-0 left-0 h-full w-1.5 md:w-2 bg-gradient-to-b from-cyan-400 to-fuchsia-500"></div>

        <div className="flex flex-col">
          {/* Header Area */}
          <div className="p-6 md:p-10 flex items-center gap-5 md:gap-6">
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-[24px] md:rounded-[32px] bg-white shadow-2xl border border-slate-50 flex items-center justify-center relative shrink-0">
              <div className="absolute inset-0 bg-cyan-400/5 blur-2xl animate-pulse rounded-full"></div>
              <Zap size={32} className="text-cyan-500 fill-current md:scale-125" />
            </div>
            <div className="flex flex-col">
              {/* Dynamic level title */}
              <h4 className="font-orbitron font-black text-xl md:text-3xl text-slate-900 tracking-tighter uppercase leading-none transition-all duration-500">
                {currentTitle}
              </h4>
              <div className="flex items-center gap-2 mt-2 bg-slate-50 self-start px-2.5 py-1 rounded-full border border-slate-100">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></div>
                <span className="font-mono-jet text-[8px] md:text-[9px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">
                  Status: Active
                </span>
              </div>
            </div>
          </div>

          {/* Progress Stats Section */}
          <div className="px-6 md:px-10 pb-8 md:pb-10 flex flex-col gap-6 md:gap-8">
            <div className="flex items-end justify-between">
              <div className="flex flex-col">
                <span className="font-mono-jet text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Level</span>
                <span className="font-orbitron font-black text-4xl md:text-7xl text-slate-900 tracking-tighter leading-none">
                  {level}
                </span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="font-mono-jet text-[9px] font-bold text-slate-400 uppercase tracking-widest">Progress</span>
                <span className="font-orbitron font-black text-lg md:text-2xl text-slate-800">{xp} XP</span>
              </div>
            </div>

            {/* Level Progress Bar */}
            <div className="w-full h-2.5 bg-slate-50 rounded-full overflow-hidden relative border border-slate-100">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)] transition-all duration-300 ease-linear" 
                style={{ width: `${(xp / 1000) * 100}%` }}
              />
            </div>

            {/* Stat Meters */}
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="font-mono-jet text-[8px] font-bold text-slate-400 uppercase tracking-widest">Focus</span>
                  <span className="font-mono-jet text-[10px] font-bold text-cyan-600">84%</span>
                </div>
                <div className="flex gap-0.5">
                  {[1,1,1,1,1,1,1,1,0,0].map((v, i) => (
                    <div key={i} className={`h-1 flex-1 rounded-sm ${v ? 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.3)]' : 'bg-slate-100'}`} />
                  ))}
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="font-mono-jet text-[8px] font-bold text-slate-400 uppercase tracking-widest">Energy</span>
                  <span className="font-mono-jet text-[10px] font-bold text-fuchsia-500">62%</span>
                </div>
                <div className="flex gap-0.5">
                  {[1,1,1,1,1,1,0,0,0,0].map((v, i) => (
                    <div key={i} className={`h-1 flex-1 rounded-sm ${v ? 'bg-fuchsia-400 shadow-[0_0_8px_rgba(217,70,239,0.3)]' : 'bg-slate-100'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trophy decoration */}
      <div className="absolute -top-6 -right-3 md:-top-8 md:-right-8 w-12 h-12 md:w-16 md:h-16 bg-white rounded-[18px] md:rounded-[24px] shadow-2xl border border-slate-50 flex items-center justify-center animate-pulse z-10">
        <Trophy size={20} className="text-yellow-500 drop-shadow-sm md:scale-125" />
      </div>
    </div>
  );
};

const HeroScreen: React.FC<{ onLaunch: () => void | Promise<void>; isExiting: boolean }> = ({ onLaunch, isExiting }) => {
  return (
    <div className={`relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 transition-all duration-1000 ${isExiting ? 'app-transition-exit' : ''}`}>
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left column: Text content and CTA */}
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

        {/* Right column: Hero Card with dynamic title */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <GameHeroCard />
        </div>
      </div>

      {/* Bottom stats row */}
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
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md glass-modal rounded-3xl p-8 shadow-2xl animate-fade-in-up mx-auto">
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
  // Using useRef properly from react import
  const requestRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);
  const TARGET_PROGRESS = 70;
  const DURATION = 6000;

  const animate = (time: number) => {
    if (startTimeRef.current === undefined) {
      startTimeRef.current = time;
    }
    const elapsedTime = time - startTimeRef.current;
    const t = Math.min(elapsedTime / DURATION, 1);
    const easedT = t * (2 - t);
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
      if (requestRef.current !== undefined) {
        cancelAnimationFrame(requestRef.current);
      }
      clearTimeout(startTimeout);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 app-transition-enter-active">
      <NotifyPopup isOpen={isNotifyOpen} onClose={() => setIsNotifyOpen(false)} />
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
              style={{ width: `${progress}%` }}
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

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('HERO');
  const [isExiting, setIsExiting] = useState(false);
  const [isSnowing, setIsSnowing] = useState(false);

  const handleLaunch = async () => {
    setIsExiting(true);
    setTimeout(() => {
      setAppState('LOADING');
      setTimeout(() => {
        setAppState('ZEN');
      }, 50);
    }, 800);
  };

  const handleBack = () => {
    setIsExiting(false);
    setAppState('HERO');
  };

  const toggleSnow = () => setIsSnowing(prev => !prev);

  return (
    <div className="min-h-screen text-slate-900 selection:bg-cyan-100 selection:text-cyan-900">
      {isSnowing && <SnowflakeOverlay />}
      <BackgroundDecor />
      <Navbar isSnowing={isSnowing} onToggleSnow={toggleSnow} />
      
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

      <div className="fixed inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay">
        <div className="absolute inset-0 bg-slate-900"></div>
      </div>
    </div>
  );
};

export default App;
