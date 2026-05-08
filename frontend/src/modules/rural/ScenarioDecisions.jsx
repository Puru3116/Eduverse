import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../store/AppContext';
import { 
  ArrowLeft, Map, Activity, ShieldAlert, Award, RefreshCcw, 
  ArrowRight, History, MousePointer2 
} from 'lucide-react';
import axios from 'axios';
import api from '../../utils/api';

const BACKEND_URL = 'http://localhost:5005/api';

const LEVEL_THEMES = [
  { id: 1, name: "Beginner", desc: "Everyday Home Safety", color: "bg-emerald-500 shadow-[0_8px_0_rgb(16,185,129)]" },
  { id: 2, name: "Intermediate", desc: "School & Road Safety", color: "bg-orange-500 shadow-[0_8px_0_rgb(249,115,22)]" },
  { id: 3, name: "Master", desc: "Nature & Wilderness", color: "bg-sky-500 shadow-[0_8px_0_rgb(14,165,233)]" },
  { id: 4, name: "Legend", desc: "Emergency Hero", color: "bg-rose-500 shadow-[0_8px_0_rgb(244,63,94)]" }
];

const MISSIONS = {
  1: [
    { id: 1.1, title: "Home Hazard Hunt", desc: "Find 10 safety mistakes at home.", startNode: "1.1_1" },
    { id: 1.2, title: "Kitchen Detective", desc: "Safe cooking and food handling.", startNode: "1.2_1" },
    { id: 1.3, title: "Morning Routine", desc: "Healthy habits from start to finish.", startNode: "1.3_1" }
  ],
  // ... more levels added in the state logic
};

const STORY_NODES = {
  // Level 1.1: Home Hazard Hunt (Simulated 10 steps)
  "1.1_1": { icon: "🏠", text: "You find a spill on the kitchen floor. What should you do?", choices: [{ text: "Wipe it up immediately.", next: "1.1_2" }, { text: "Leave it for later.", next: "1.1_fail" }] },
  "1.1_2": { icon: "🧹", text: "Great! Now you see toys on the stairs. Should you move them?", choices: [{ text: "Yes, move them to the box.", next: "1.1_3" }, { text: "No, someone might step over.", next: "1.1_fail" }] },
  "1.1_3": { icon: "🔌", text: "A phone is charging with a frayed wire. Should you touch it?", choices: [{ text: "Unplug it carefully by base.", next: "1.1_4" }, { text: "Pull the cord.", next: "1.1_fail" }] },
  "1.1_4": { icon: "🕯️", text: "A candle is burning near a curtain. What's the best action?", choices: [{ text: "Blow it out.", next: "1.1_5" }, { text: "Open the window.", next: "1.1_fail" }] },
  "1.1_5": { icon: "📦", text: "A heavy box is balanced on the edge of a shelf. Do you fix it?", choices: [{ text: "Ask an adult to move it low.", next: "1.1_6" }, { text: "Try to push it back yourself.", next: "1.1_fail" }] },
  "1.1_6": { icon: "🧴", text: "You find a bottle of colorful liquid. Should you drink it?", choices: [{ text: "No, it could be poison.", next: "1.1_7" }, { text: "Yes, it looks like juice.", next: "1.1_fail" }] },
  "1.1_7": { icon: "🚪", text: "Someone knocks at the door. You are alone. Do you open it?", choices: [{ text: "No, check through window first.", next: "1.1_8" }, { text: "Open it right away.", next: "1.1_fail" }] },
  "1.1_8": { icon: "🩹", text: "You have a small cut on your finger. How do you clean it?", choices: [{ text: "Wash with water and soap.", next: "1.1_9" }, { text: "Just wipe it on your shirt.", next: "1.1_fail" }] },
  "1.1_9": { icon: "🛁", text: "The bath water feels very hot. Should you jump in?", choices: [{ text: "Test with your elbow first.", next: "1.1_10" }, { text: "Jump in immediately.", next: "1.1_fail" }] },
  "1.1_10": { icon: "💤", text: "Time for bed! Should you leave the heater on all night?", choices: [{ text: "Turn it off to stay safe.", next: "1.1_win" }, { text: "Leave it on for warmth.", next: "1.1_fail" }] },
  "1.1_win": { icon: "🏆", text: "You completed the Home Hazard Hunt safely!", isEnd: true, success: true },
  "1.1_fail": { icon: "⚠️", text: "Oh no! That was a dangerous choice. Let's learn from it.", isEnd: true, success: false },

  // Generic templates for other missions to fulfill 120 unique questions (12 missions * 10 nodes)
  // Level 1.2
  "1.2_1": { icon: "🍳", text: "The pan handle is sticking out from the stove. Do you move it?", choices: [{ text: "Turn it inward.", next: "1.2_win" }, { text: "Leave it.", next: "1.1_fail" }] },
  "1.2_win": { icon: "🌟", text: "You fixed all kitchen hazards! (Expanded in full version)", isEnd: true, success: true },
};

export default function ScenarioDecisions() {
  const navigate = useNavigate();
  const { student } = useAppContext();
  
  const [mainLevel, setMainLevel] = useState(1);
  const [subLevel, setSubLevel] = useState(1);
  const [gameState, setGameState] = useState('menu'); // 'menu', 'sub_selection', 'playing', 'round_over'
  const [currentNodeId, setCurrentNodeId] = useState(null);
  const [startTime, setStartTime] = useState(0);
  const [unlockedProgress, setUnlockedProgress] = useState({ main: 1, sub: 1 });
  
  // Persistence Key
  const saveKey = student ? `eduverse_resume_${student.id || student._id}_story-scenarios_${mainLevel}_${subLevel}` : null;

  // Save state whenever it changes
  useEffect(() => {
    if (gameState === 'playing' && saveKey) {
      localStorage.setItem(saveKey, JSON.stringify({ currentNodeId, startTime }));
    }
  }, [currentNodeId, gameState, saveKey, startTime]);

  useEffect(() => {
    if (student) {
      fetchProgress();
    }
  }, [student, gameState]);

  const fetchProgress = async () => {
    if (!student) return;
    try {
      const studentId = student.id || student._id;
      const res = await api.get(`/progress/${studentId}`);
      const gameProgress = res.data.filter(p => p.gameId === 'story-scenarios');
      
      console.log(`[Scenarios] Raw Progress:`, res.data);
      console.log(`[Scenarios] Filtered:`, gameProgress);

      if (gameProgress.length > 0) {
        let maxMain = 1;
        let maxSub = 0;
        
        gameProgress.forEach(p => {
          const pMain = Number(p.levelNumber);
          const pSub = p.subLevel !== undefined ? Number(p.subLevel) : 1;
          if (!isNaN(pMain) && !isNaN(pSub)) {
            if (pMain > maxMain || (pMain === maxMain && pSub > maxSub)) {
              maxMain = pMain;
              maxSub = pSub;
            }
          }
        });

        let nextMain = maxMain;
        let nextSub = maxSub + 1;
        if (nextSub > 3) {
          nextMain++;
          nextSub = 1;
        }
        
        console.log(`[Scenarios] Unlocking: ${nextMain}.${nextSub}`);
        setUnlockedProgress({ main: nextMain, sub: nextSub });
      }
    } catch (err) {
      console.error(`[Scenarios] Fetch Error:`, err);
    }
  };

  const isLevelLocked = (mLvl, sLvl) => {
    if (mLvl < unlockedProgress.main) return false;
    if (mLvl === unlockedProgress.main && sLvl <= unlockedProgress.sub) return false;
    return true;
  };

  const selectMainLevel = (lvl) => {
    setMainLevel(lvl);
    setGameState('sub_selection');
  };

  const startMission = (mission, forceNew = false) => {
    // Standardize subLevel as 1, 2, or 3 for locking logic
    const sLvl = Math.round((mission.id % 1) * 10) || (mission.id > 10 ? mission.id % 10 : 1); 
    setSubLevel(sLvl);
    
    const key = `eduverse_resume_${student.id || student._id}_story-scenarios_${mainLevel}_${sLvl}`;
    const saved = localStorage.getItem(key);

    if (saved && !forceNew) {
      setGameState('resume_prompt');
      return;
    }

    if (forceNew) localStorage.removeItem(key);

    setCurrentNodeId(mission.startNode);
    setStartTime(Date.now());
    setGameState('playing');
  };

  const resumeGame = () => {
    const saved = JSON.parse(localStorage.getItem(saveKey));
    if (saved) {
      setCurrentNodeId(saved.currentNodeId || null);
      setStartTime(saved.startTime || Date.now());
      setGameState('playing');
    }
  };

  const currentNode = currentNodeId ? STORY_NODES[currentNodeId] : null;

  const finishStory = async (score) => {
    setGameState('round_over');
    if (student) {
      try {
        await api.post('/progress', {
          studentId: student.id || student._id,
          moduleName: 'Rural Quest',
          gameId: 'story-scenarios',
          levelNumber: mainLevel,
          subLevel: subLevel,
          score: score,
          attempts: 1,
          timeSpent: Math.floor((Date.now() - startTime) / 1000)
        });
        if (saveKey) localStorage.removeItem(saveKey);
        fetchProgress();
      } catch (err) { console.error(err); }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 flex flex-col items-center p-6 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-indigo-500 rounded-full blur-3xl" />
      </div>

      <div className="absolute top-6 w-full max-w-4xl px-6 flex justify-between items-center z-20">
        <button 
          onClick={() => (gameState === 'playing' || gameState === 'round_over' || gameState === 'sub_selection') ? setGameState('menu') : navigate('/dashboard')} 
          className="bg-white dark:bg-slate-900 p-4 rounded-full shadow-md border-b-4 border-slate-200 dark:border-slate-800 active:scale-95 transition-transform"
        >
          <ArrowLeft size={24} className="text-slate-600 dark:text-slate-400" />
        </button>
        {gameState === 'playing' && (
          <div className="bg-white dark:bg-slate-900 px-6 py-2 rounded-full shadow-md border-b-4 border-slate-200 dark:border-slate-800 flex items-center space-x-3">
             <Map className="text-orange-500" size={20} />
             <span className="font-black text-slate-700 dark:text-slate-200 uppercase tracking-tight text-xs">Mission {subLevel}</span>
             <button 
                onClick={() => startMission(MISSIONS[mainLevel].find(m => m.id === subLevel || m.id === (mainLevel + subLevel/10)), true)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-orange-500"
                title="Reset Level"
              >
                <RefreshCcw size={20} />
              </button>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {gameState === 'menu' && (
          <motion.div 
            key="menu"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-xl bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-orange-100 dark:border-slate-800 m-auto z-10"
          >
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="w-32 h-32 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border-4 border-white dark:border-slate-800">
              <Map size={64} className="text-orange-500 dark:text-orange-400" />
            </motion.div>
            <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2">Adventure Tales</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium mb-10">Step into a story and make choices to help our heroes stay safe!</p>
            
            <div className="grid grid-cols-1 gap-4 text-left">
               {LEVEL_THEMES.map(l => {
                 const locked = l.id > unlockedProgress.main;
                 return (
                   <button key={l.id} disabled={locked} onClick={() => selectMainLevel(l.id)} className={`${locked ? 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed opacity-60' : l.color} p-6 rounded-3xl flex items-center justify-between group active:translate-y-2 active:shadow-none transition-all shadow-md text-white relative overflow-hidden`}>
                      <div className="flex items-center space-x-6">
                         <div className={`w-16 h-16 ${locked ? 'bg-slate-200/50' : 'bg-white/20'} text-white rounded-2xl flex items-center justify-center font-black text-2xl`}>{l.id}</div>
                         <div>
                            <h4 className="text-xl font-black">{l.name}</h4>
                            <p className="text-xs font-bold opacity-80 uppercase tracking-widest">{l.desc}</p>
                         </div>
                      </div>
                      {!locked && (
                        <motion.div 
                          animate={{ x: [0, 5, 0], y: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 3 }}
                          className="absolute top-2 right-2 bg-white/20 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1 border border-white/30"
                        >
                          <MousePointer2 size={10} className="text-white" />
                          <span className="text-[8px] font-black uppercase tracking-tighter">Click to Learn</span>
                        </motion.div>
                      )}
                      {locked ? <Award size={24} className="opacity-20" /> : <ArrowRight className="group-hover:translate-x-2 transition-transform" />}
                      {locked && <div className="absolute inset-0 bg-black/5 flex items-center justify-center backdrop-blur-[1px]"><Award size={48} className="text-white/20 rotate-12" /></div>}
                   </button>
                 );
               })}
            </div>
          </motion.div>
        )}


        {gameState === 'sub_selection' && (
          <motion.div 
            key="sub_selection"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-xl bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-orange-100 dark:border-slate-800 m-auto z-10"
          >
            <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2">Select Journey</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium mb-10">{LEVEL_THEMES.find(l => l.id === mainLevel)?.name} Missions</p>
            <div className="grid grid-cols-1 gap-4 text-left">
              {(MISSIONS[mainLevel] || [
                { id: mainLevel + .1, title: `Story ${mainLevel}.1`, desc: "Coming Soon", startNode: "1.1_1" },
                { id: mainLevel + .2, title: `Story ${mainLevel}.2`, desc: "Coming Soon", startNode: "1.1_1" },
                { id: mainLevel + .3, title: `Story ${mainLevel}.3`, desc: "Coming Soon", startNode: "1.1_1" }
              ]).map((m, idx) => {
                const sLvl = idx + 1; // 1, 2, or 3
                const locked = isLevelLocked(mainLevel, sLvl);
                return (
                  <button key={m.id} disabled={locked} onClick={() => startMission(m)} className={`${locked ? 'bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed opacity-50' : 'bg-white dark:bg-slate-800 hover:border-orange-500'} border-b-8 border-slate-200 dark:border-slate-950 p-6 rounded-3xl flex items-center justify-between group transition-all`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${locked ? 'bg-slate-200 dark:bg-slate-700' : 'bg-orange-500'} text-white rounded-2xl flex items-center justify-center font-black`}>
                        {locked ? <Award size={16} /> : `${mainLevel}.${sLvl}`}
                      </div>
                      <div>
                        <span className={`text-xl font-black ${locked ? 'text-slate-400' : 'text-slate-700 dark:text-slate-200'} block`}>{m.title}</span>
                        <span className="text-xs text-slate-400 font-bold uppercase">{m.desc}</span>
                      </div>
                    </div>
                    {!locked && <ArrowRight className="text-orange-400 group-hover:translate-x-2 transition-transform" />}
                  </button>
                );
              })}
              <button onClick={() => setGameState('menu')} className="mt-4 text-slate-400 font-bold hover:text-orange-500 transition-colors text-center w-full">
                &larr; Back to Levels
              </button>
            </div>
          </motion.div>
        )}


        {gameState === 'resume_prompt' && (
          <motion.div key="resume" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full max-w-md bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-orange-100 dark:border-slate-800 m-auto z-10">
            <div className="w-24 h-24 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6"><History size={48} className="text-amber-500" /></div>
            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">Welcome Back!</h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold mb-10">You have an unfinished session. What would you like to do?</p>
            <div className="flex flex-col gap-4">
              <button onClick={resumeGame} className="py-6 bg-orange-500 text-white font-black rounded-3xl shadow-[0_8px_0_rgb(194,65,12)] active:translate-y-2 transition-all text-xl">Resume Test</button>
              <button onClick={() => startMission(MISSIONS[mainLevel].find(m => m.id === subLevel || m.id === (mainLevel + subLevel/10)), true)} className="py-6 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-black rounded-3xl border-b-4 border-slate-200 dark:border-slate-950 active:translate-y-2 transition-all text-xl">Start Again</button>
            </div>
          </motion.div>
        )}

        {gameState === 'playing' && currentNode && (
          <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-4xl w-full flex flex-col pt-16 z-10 m-auto">
            
            <motion.div 
               key={currentNodeId}
               initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }}
               className={`bg-white dark:bg-slate-900 rounded-[4rem] shadow-2xl border-b-[20px] overflow-hidden
                 ${currentNode.consequence === 'negative' ? 'border-rose-200 dark:border-rose-900/50' : 
                   currentNode.consequence === 'positive' ? 'border-emerald-200 dark:border-emerald-900/50' : 
                   'border-slate-100 dark:border-slate-800'}`}
            >
               <div className={`p-16 text-center transition-colors duration-500 
                  ${currentNode.consequence === 'negative' ? 'bg-rose-500' : 
                    currentNode.consequence === 'positive' ? 'bg-emerald-500' : 
                    'bg-orange-600'}`}
               >
                  <div className="text-[7rem] mb-8 drop-shadow-2xl bg-white/20 inline-block p-6 rounded-full backdrop-blur-md">
                    {currentNode.icon}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-white leading-relaxed drop-shadow-md">
                    {currentNode.text}
                  </h2>
               </div>

               <div className="p-12 bg-slate-50 dark:bg-slate-900/50">
                  {currentNode.isEnd ? (
                    <div className="text-center">
                       <button onClick={() => finishStory(currentNode.success ? 100 * mainLevel : 0)} className={`w-full py-8 text-white font-black text-3xl rounded-[3rem] shadow-xl active:translate-y-2 active:shadow-none transition-all
                          ${currentNode.success ? 'bg-emerald-500 shadow-[0_12px_0_rgb(5,150,105)]' : 'bg-slate-700 shadow-[0_12px_0_rgb(30,41,59)]'}`}>
                          {currentNode.success ? 'Complete Journey ➔' : 'Try This Chapter Again'}
                       </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {currentNode.choices.map((choice, i) => (
                         <button key={i} onClick={() => setCurrentNodeId(choice.next)} className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-800 border-b-8 border-slate-200 dark:border-slate-950 text-left font-black text-2xl text-slate-700 dark:text-slate-200 hover:border-orange-500 active:translate-y-2 active:border-b-0 transition-all flex items-center justify-between group">
                            <span>{choice.text}</span>
                            <ArrowRight className="text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                         </button>
                       ))}
                    </div>
                  )}
               </div>
            </motion.div>
          </motion.div>
        )}

        {gameState === 'round_over' && (
          <motion.div 
            key="round_over"
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
            className="w-full max-w-xl m-auto z-10"
          >
            <div className="bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-orange-100 dark:border-slate-800">
              <Award className={`w-32 h-32 mx-auto drop-shadow-lg mb-6 ${currentNode?.success ? 'text-amber-400' : 'text-slate-400'}`} />
              <h2 className="text-5xl font-black text-slate-800 dark:text-white mb-2">{currentNode?.success ? 'Amazing Job!' : 'Not Quite...'}</h2>
              <p className="text-slate-500 dark:text-slate-400 font-bold text-xl mb-12 tracking-widest uppercase">{currentNode?.success ? 'Success! Hero Saved' : 'Safety First, Try Again'}</p>
              
              <div className="flex flex-col space-y-4">
                 <button onClick={() => currentNode?.success ? setGameState('menu') : startMission(MISSIONS[mainLevel].find(m => m.id === subLevel))} className={`py-8 text-white font-black rounded-3xl shadow-xl active:translate-y-2 active:shadow-none transition-all text-2xl
                    ${currentNode?.success ? 'bg-orange-500 shadow-[0_10px_0_rgb(194,65,12)]' : 'bg-rose-500 shadow-[0_10px_0_rgb(190,18,60)]'}`}>
                    {currentNode?.success ? 'Play Another Story ➔' : 'Retry Journey ↻'}
                 </button>
                 <button onClick={() => navigate('/dashboard')} className="py-6 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold rounded-3xl transition-all uppercase tracking-widest text-sm border-b-4 border-slate-200 dark:border-slate-950">Exit to Map</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
