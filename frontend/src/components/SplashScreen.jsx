import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1.5;
      });
    }, 20);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-600/10 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-600/10 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Orbital Animation */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-[600px] h-[600px] rounded-full border border-indigo-500/20 relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-indigo-500 rounded-full shadow-[0_0_20px_rgba(99,102,241,1)]"></div>
        </motion.div>
        
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute w-[400px] h-[400px] rounded-full border border-cyan-500/10"
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)]"></div>
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col items-center"
        >
          {/* Logo Section */}
          <div className="relative mb-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-6"
            >
              <div className="relative">
                <div className="w-24 h-24 rounded-[2rem] bg-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-500/40 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                   <span className="text-5xl">🌍</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-cyan-400 flex items-center justify-center animate-bounce shadow-lg">
                   <span className="text-xs">✨</span>
                </div>
              </div>
              <div>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none">
                  EDU<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">VERSE</span>
                </h1>
                <p className="text-sm font-black text-indigo-400 uppercase tracking-[0.6em] mt-2 text-center md:text-left">Knowledge Engine</p>
              </div>
            </motion.div>
          </div>

          {/* Progress Bar Container */}
          <div className="w-72 md:w-[480px] space-y-4">
            <div className="flex justify-between items-end px-2">
               <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{progress < 100 ? 'Syncing Modules...' : 'Ready to Launch'}</span>
               <span className="text-sm font-black text-white">{Math.round(progress)}%</span>
            </div>
            
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-[2px]">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full rounded-full relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-500 to-cyan-400 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] animate-[shimmer_2s_infinite]"></div>
              </motion.div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 flex items-center gap-8 text-slate-500"
          >
             <div className="flex flex-col items-center">
                <span className="text-[10px] font-black uppercase tracking-widest mb-1">Scaling</span>
                <div className="w-12 h-[2px] bg-indigo-500/30"></div>
             </div>
             <div className="flex flex-col items-center">
                <span className="text-[10px] font-black uppercase tracking-widest mb-1">Learning</span>
                <div className="w-12 h-[2px] bg-indigo-500/30"></div>
             </div>
             <div className="flex flex-col items-center">
                <span className="text-[10px] font-black uppercase tracking-widest mb-1">Testing</span>
                <div className="w-12 h-[2px] bg-indigo-500/30"></div>
             </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-12 flex flex-col items-center gap-3">
        <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
           <p className="text-[8px] md:text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">Developed by EduVerse Core Architecture</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
