import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../store/AppContext';
import { ArrowLeft, Trash2, CheckCircle2, Factory, History, Award, ArrowRight, RefreshCcw, MousePointer2 } from 'lucide-react';
import axios from 'axios';
import api from '../../utils/api';

const BACKEND_URL = 'http://localhost:5005/api';

const ALL_ITEMS = [
  // Health & Hygiene
  { id: 1, name: "Fresh Apple", type: "clean", emoji: "🍎", category: "Health" },
  { id: 2, name: "Boiled Water", type: "clean", emoji: "💧", category: "Health" },
  { id: 3, name: "Soap", type: "clean", emoji: "🧼", category: "Hygiene" },
  { id: 4, name: "Clean Clothes", type: "clean", emoji: "👕", category: "Hygiene" },
  { id: 5, name: "Fresh Milk", type: "clean", emoji: "🥛", category: "Health" },
  { id: 6, name: "Covered Food", type: "clean", emoji: "🍲", category: "Health" },
  { id: 7, name: "Swept Floor", type: "clean", emoji: "🧹", category: "Environment" },
  { id: 8, name: "Bandage", type: "clean", emoji: "🩹", category: "First Aid" },
  { id: 9, name: "Muddy Shoe", type: "dirty", emoji: "👞", category: "Hygiene" },
  { id: 10, name: "Used Tissue", type: "dirty", emoji: "🤧", category: "Hygiene" },
  { id: 11, name: "Rotten Food", type: "dirty", emoji: "🪰", category: "Health" },
  { id: 12, name: "Stagnant Water", type: "dirty", emoji: "🦠", category: "Environment" },
  { id: 13, name: "Open Trash", type: "dirty", emoji: "🗑️", category: "Environment" },
  { id: 14, name: "Dirty Hands", type: "dirty", emoji: "🖐️", category: "Hygiene" },
  { id: 15, name: "Flies", type: "dirty", emoji: "🦟", category: "Environment" },
  { id: 16, name: "Broken Glass", type: "dirty", emoji: "💥", category: "Safety" },
  // Village & Nature
  { id: 17, name: "Green Grass", type: "clean", emoji: "🌱", category: "Nature" },
  { id: 18, name: "Clear River", type: "clean", emoji: "🏞️", category: "Nature" },
  { id: 19, name: "Ripe Mango", type: "clean", emoji: "🥭", category: "Health" },
  { id: 20, name: "Organic Manure", type: "clean", emoji: "💩", category: "Farming" },
  { id: 21, name: "Dirty Pond", type: "dirty", emoji: "🛶", category: "Nature" },
  { id: 22, name: "Smoke", type: "dirty", emoji: "💨", category: "Environment" },
  { id: 23, name: "Oil Spill", type: "dirty", emoji: "🛢️", category: "Environment" },
  { id: 24, name: "Rusty Nail", type: "dirty", emoji: "📍", category: "Safety" },
  // Daily Routine
  { id: 25, name: "Toothbrush", type: "clean", emoji: "🪥", category: "Hygiene" },
  { id: 26, name: "Sunlight", type: "clean", emoji: "☀️", category: "Health" },
  { id: 27, name: "Sleep", type: "clean", emoji: "😴", category: "Health" },
  { id: 28, name: "Exercise", type: "clean", emoji: "🏃", category: "Health" },
  { id: 29, name: "Junk Food", type: "dirty", emoji: "🍔", category: "Health" },
  { id: 30, name: "Litter", type: "dirty", emoji: "🍬", category: "Environment" },
  { id: 31, name: "Loud Noise", type: "dirty", emoji: "📢", category: "Health" },
  { id: 32, name: "Dark Room", type: "dirty", emoji: "🌑", category: "Health" },
  // Tools & Items
  { id: 33, name: "New Pencil", type: "clean", emoji: "✏️", category: "School" },
  { id: 34, name: "Clean Plate", type: "clean", emoji: "🍽️", category: "Kitchen" },
  { id: 35, name: "Towel", type: "clean", emoji: "🧣", category: "Hygiene" },
  { id: 36, name: "Comb", type: "clean", emoji: "🪮", category: "Hygiene" },
  { id: 37, name: "Bitten Apple", type: "dirty", emoji: "🍏", category: "Health" },
  { id: 38, name: "Muddy Paws", type: "dirty", emoji: "🐾", category: "Nature" },
  { id: 39, name: "Expired Meds", type: "dirty", emoji: "💊", category: "Safety" },
  { id: 40, name: "Smoking Pipe", type: "dirty", emoji: "🚬", category: "Health" },
];

export default function SortingGame() {
  const navigate = useNavigate();
  const { student } = useAppContext();
  
  const [mainLevel, setMainLevel] = useState(1);
  const [subLevel, setSubLevel] = useState(1);
  const [gameState, setGameState] = useState('menu'); // 'menu', 'sub_selection', 'playing', 'round_over'
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0); 
  const [animatingItem, setAnimatingItem] = useState(null); 
  const [startTime, setStartTime] = useState(0);
  const [unlockedProgress, setUnlockedProgress] = useState({ main: 1, sub: 1 });
  
  // Persistence Key
  const saveKey = student ? `eduverse_resume_${student.id || student._id}_sorting-game_${mainLevel}_${subLevel}` : null;

  // Save state whenever it changes
  useEffect(() => {
    if (gameState === 'playing' && saveKey) {
      localStorage.setItem(saveKey, JSON.stringify({ items, score, mistakes, timeLeft, startTime }));
    }
  }, [items, score, mistakes, timeLeft, gameState, saveKey, startTime]);

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
      const gameProgress = res.data.filter(p => p.gameId === 'sorting-game');
      
      console.log(`[SortingGame] Raw Progress:`, res.data);
      console.log(`[SortingGame] Filtered:`, gameProgress);

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
        
        console.log(`[SortingGame] Unlocking: ${nextMain}.${nextSub}`);
        setUnlockedProgress({ main: nextMain, sub: nextSub });
      }
    } catch (err) {
      console.error(`[SortingGame] Fetch Error:`, err);
    }
  };

  const isLevelLocked = (mLvl, sLvl) => {
    if (mLvl < unlockedProgress.main) return false;
    if (mLvl === unlockedProgress.main && sLvl <= unlockedProgress.sub) return false;
    return true;
  };

  const ITEM_COUNT = 10;
  const TIME_PER_ITEM = 50; 

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && !animatingItem && items.length > 0) {
      if (timeLeft > 0) {
        timer = setInterval(() => setTimeLeft(prev => prev - 1), 100);
      } else {
        handleTimeout(items[0]);
      }
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft, animatingItem, items]);

  const selectMainLevel = (lvl) => {
    setMainLevel(lvl);
    setGameState('sub_selection');
  };

  const startMission = (sLvl, forceNew = false) => {
    setSubLevel(sLvl);
    const key = `eduverse_resume_${student.id || student._id}_sorting-game_${mainLevel}_${sLvl}`;
    const saved = localStorage.getItem(key);

    if (saved && !forceNew) {
      setGameState('resume_prompt');
      return;
    }

    if (forceNew) localStorage.removeItem(key);

    const shuffled = [...ALL_ITEMS].sort(() => 0.5 - Math.random());
    setItems(shuffled.slice(0, ITEM_COUNT));
    setScore(0);
    setMistakes([]);
    setTimeLeft(TIME_PER_ITEM - (mainLevel * 5) - (sLvl * 2));
    setStartTime(Date.now());
    setGameState('playing');
  };

  const resumeGame = () => {
    const saved = JSON.parse(localStorage.getItem(saveKey));
    if (saved) {
      setItems(saved.items || []);
      setScore(saved.score || 0);
      setMistakes(saved.mistakes || []);
      setTimeLeft(saved.timeLeft || 0);
      setStartTime(saved.startTime || Date.now());
      setGameState('playing');
    }
  };

  const handleTimeout = (item) => {
    setMistakes(prev => [...prev, `Time ran out on ${item.name}! It was ${item.type.toUpperCase()}.`]);
    animateAndAdvance(item, 'timeout');
  };

  const handleSort = (type) => {
    if (items.length === 0 || animatingItem) return;
    
    const currentItem = items[0];
    const isCorrect = currentItem.type === type;

    if (isCorrect) {
      setScore(s => s + 10 + Math.floor(timeLeft / 5));
    } else {
      setMistakes(prev => [...prev, `Sorted ${currentItem.name} as ${type.toUpperCase()}, but it is ${currentItem.type.toUpperCase()}.`]);
    }
    
    animateAndAdvance(currentItem, type);
  };

  const animateAndAdvance = (item, direction) => {
    setAnimatingItem({ item, target: direction });
    
    setTimeout(() => {
      setAnimatingItem(null);
      const newItems = items.slice(1);
      setItems(newItems);
      
      if (newItems.length === 0) {
        endGame(score);
      } else {
        setTimeLeft(TIME_PER_ITEM - (mainLevel * 5) - (subLevel * 2));
      }
    }, 500);
  };

  const endGame = async (finalScore) => {
    setGameState('round_over');
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    if (student) {
      try {
        await api.post('/progress', {
          studentId: student.id || student._id,
          moduleName: 'Rural Quest',
          gameId: 'sorting-game',
          levelNumber: mainLevel,
          subLevel: subLevel,
          score: finalScore,
          attempts: 1,
          timeSpent
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
        <div className="absolute top-10 left-10 w-32 h-32 bg-teal-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-emerald-500 rounded-full blur-3xl" />
      </div>

      <div className="absolute top-6 w-full max-w-4xl px-6 flex justify-between items-center z-20">
        <button 
          onClick={() => gameState === 'playing' || gameState === 'sub_selection' ? setGameState('menu') : navigate('/dashboard')} 
          className="bg-white dark:bg-slate-900 p-4 rounded-full shadow-md border-b-4 border-slate-200 dark:border-slate-800 active:scale-95 transition-transform"
        >
          <ArrowLeft size={24} className="text-slate-600 dark:text-slate-400" />
        </button>
        {gameState === 'playing' && (
          <div className="bg-white dark:bg-slate-900 px-6 py-2 rounded-full shadow-md border-b-4 border-slate-200 dark:border-slate-800 flex items-center space-x-3">
             <span className="font-black text-teal-600 uppercase tracking-widest text-xs">Mission {mainLevel}.{subLevel}</span>
             <span className="text-slate-300">|</span>
             <span className="font-black text-teal-700 dark:text-teal-400 text-xs">Round {ITEM_COUNT - items.length + 1}/{ITEM_COUNT}</span>
             <span className="text-slate-300">|</span>
             <span className="font-black text-teal-700 dark:text-teal-400 text-xs">{score} XP</span>
             <button 
                onClick={() => startMission(subLevel, true)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-teal-500"
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
            className="w-full max-w-xl bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-teal-100 dark:border-slate-800 m-auto z-10"
          >
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="w-32 h-32 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border-4 border-white dark:border-slate-800">
              <Factory size={64} className="text-teal-600 dark:text-teal-400" />
            </motion.div>
            <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2">Sorting Factory</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium mb-10">Decide quickly: is the item Clean or Dirty?</p>
            
            <div className="grid grid-cols-1 gap-4">
               {[
                 { id: 1, name: 'Beginner', desc: 'Basic Health Items', color: 'bg-emerald-500 shadow-[0_8px_0_rgb(16,185,129)]' },
                 { id: 2, name: 'Intermediate', desc: 'Village Environment', color: 'bg-teal-500 shadow-[0_8px_0_rgb(13,148,136)]' },
                 { id: 3, name: 'Master', desc: 'Expert Hygiene', color: 'bg-sky-500 shadow-[0_8px_0_rgb(14,165,233)]' },
                 { id: 4, name: 'Legend', desc: 'Speed Challenge', color: 'bg-rose-500 shadow-[0_8px_0_rgb(244,63,94)]' }
               ].map(l => {
                 const locked = l.id > unlockedProgress.main;
                 return (
                   <button key={l.id} disabled={locked} onClick={() => selectMainLevel(l.id)} className={`${locked ? 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed opacity-60' : l.color} p-6 rounded-3xl flex items-center justify-between group active:translate-y-2 active:shadow-none transition-all shadow-md text-white relative overflow-hidden`}>
                      <div className="flex items-center space-x-6">
                         <div className={`w-16 h-16 ${locked ? 'bg-slate-200/50' : 'bg-white/20'} text-white rounded-2xl flex items-center justify-center font-black text-2xl`}>{l.id}</div>
                         <div className="text-left">
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
            className="w-full max-w-xl bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-teal-100 dark:border-slate-800 m-auto z-10"
          >
            <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2">Select Mission</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium mb-10">Level {mainLevel} Missions</p>
            <div className="grid grid-cols-1 gap-4 text-left">
              {[1, 2, 3].map(sLvl => {
                const locked = isLevelLocked(mainLevel, sLvl);
                return (
                  <button key={sLvl} disabled={locked} onClick={() => startMission(sLvl)} className={`${locked ? 'bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed opacity-50' : 'bg-white dark:bg-slate-800 hover:border-teal-500'} border-b-8 border-slate-200 dark:border-slate-950 p-6 rounded-3xl flex items-center justify-between group transition-all`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${locked ? 'bg-slate-200 dark:bg-slate-700' : 'bg-teal-500'} text-white rounded-2xl flex items-center justify-center font-black`}>
                        {locked ? <Award size={16} /> : `${mainLevel}.${sLvl}`}
                      </div>
                      <span className={`text-2xl font-black ${locked ? 'text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>Mission {sLvl}</span>
                    </div>
                    {!locked && <ArrowRight className="text-teal-400 group-hover:translate-x-2 transition-transform" />}
                  </button>
                );
              })}
              <button onClick={() => setGameState('menu')} className="mt-4 text-slate-400 font-bold hover:text-teal-500 transition-colors text-center w-full">
                &larr; Back to Levels
              </button>
            </div>
          </motion.div>
        )}

        {gameState === 'resume_prompt' && (
          <motion.div key="resume" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full max-w-md bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-teal-100 dark:border-slate-800 m-auto z-10">
            <div className="w-24 h-24 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6"><History size={48} className="text-amber-500" /></div>
            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">Welcome Back!</h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold mb-10">You have an unfinished session. What would you like to do?</p>
            <div className="flex flex-col gap-4">
              <button onClick={resumeGame} className="py-6 bg-teal-500 text-white font-black rounded-3xl shadow-[0_8px_0_rgb(13,148,136)] active:translate-y-2 transition-all text-xl">Resume Test</button>
              <button onClick={() => startMission(subLevel, true)} className="py-6 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-black rounded-3xl border-b-4 border-slate-200 dark:border-slate-950 active:translate-y-2 transition-all text-xl">Start Again</button>
            </div>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 w-full max-w-4xl flex flex-col items-center justify-center z-10 m-auto">
            
            <div className="mb-8 font-black text-slate-400 uppercase tracking-[0.3em] text-sm">Inspection Area</div>
            
            <div className="relative w-full max-w-md h-[400px] flex items-center justify-center mb-12">
               {/* Conveyor Belt Design */}
               <div className="absolute inset-x-0 bottom-16 h-20 bg-slate-800 dark:bg-slate-900 rounded-3xl border-b-[12px] border-slate-950 shadow-2xl overflow-hidden">
                  <motion.div 
                    animate={{ x: [-100, 0] }} transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
                    className="w-[200%] h-full bg-[repeating-linear-gradient(90deg,#1e293b,#1e293b_40px,#0f172a_40px,#0f172a_80px)] opacity-50" 
                  />
               </div>

               <AnimatePresence>
                 {items.length > 0 && !animatingItem && (
                   <motion.div
                     key={items[0].id}
                     initial={{ x: 300, opacity: 0, rotate: 10 }}
                     animate={{ x: 0, opacity: 1, rotate: 0 }}
                     exit={{ opacity: 0, scale: 0.5 }}
                     className="absolute bg-white dark:bg-slate-900 shadow-2xl rounded-[4rem] w-64 h-64 flex flex-col items-center justify-center border-b-[16px] border-slate-100 dark:border-slate-800 z-20 border-x-4"
                   >
                     <span className="text-[6rem] drop-shadow-md mb-2">{items[0].emoji}</span>
                     <span className="text-2xl font-black text-slate-700 dark:text-slate-200">{items[0].name}</span>
                   </motion.div>
                 )}
               </AnimatePresence>

               {animatingItem && (
                  <motion.div
                     initial={{ x: 0, y: 0, scale: 1 }}
                     animate={{ 
                       x: animatingItem.target === 'clean' ? -300 : animatingItem.target === 'dirty' ? 300 : 0, 
                       y: animatingItem.target === 'timeout' ? 300 : -100,
                       scale: 0.2, opacity: 0, rotate: animatingItem.target === 'clean' ? -45 : 45
                     }}
                     transition={{ duration: 0.4 }}
                     className="absolute bg-white dark:bg-slate-900 shadow-2xl rounded-[4rem] w-64 h-64 flex flex-col items-center justify-center border-b-[16px] border-slate-100 dark:border-slate-800 z-30"
                   >
                     <span className="text-[6rem] mb-2">{animatingItem.item.emoji}</span>
                  </motion.div>
               )}
            </div>

            {/* Timer Bar */}
            <div className="w-full max-w-sm h-4 bg-slate-200 dark:bg-slate-800 rounded-full mb-12 shadow-inner p-1 overflow-hidden">
               <motion.div 
                 className={`h-full rounded-full ${timeLeft < (TIME_PER_ITEM / 3) ? 'bg-rose-500' : 'bg-teal-500'}`}
                 initial={{ width: '100%' }}
                 animate={{ width: `${(timeLeft / (TIME_PER_ITEM - (mainLevel * 5) - (subLevel * 2))) * 100}%` }}
                 transition={{ ease: "linear", duration: 0.1 }}
               />
            </div>

            <div className="flex space-x-8 w-full max-w-3xl">
              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSort('clean')}
                className="flex-1 bg-gradient-to-br from-emerald-400 to-teal-600 text-white rounded-[3rem] py-12 shadow-xl border-b-[12px] border-teal-800 flex flex-col items-center justify-center group active:translate-y-2 active:border-b-[4px]"
              >
                <CheckCircle2 size={64} className="mb-4 drop-shadow-md group-hover:scale-110 transition-transform" />
                <span className="font-black text-3xl tracking-widest uppercase">CLEAN</span>
              </motion.button>

              <motion.button 
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSort('dirty')}
                className="flex-1 bg-gradient-to-br from-rose-500 to-red-700 text-white rounded-[3rem] py-12 shadow-xl border-b-[12px] border-red-900 flex flex-col items-center justify-center group active:translate-y-2 active:border-b-[4px]"
              >
                <Trash2 size={64} className="mb-4 drop-shadow-md group-hover:scale-110 transition-transform" />
                <span className="font-black text-3xl tracking-widest uppercase">DIRTY</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {gameState === 'round_over' && (
          <motion.div 
            key="round_over"
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
            className="w-full max-w-2xl m-auto z-10"
          >
            <div className="bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-teal-100 dark:border-slate-800">
              <Award className="w-32 h-32 text-amber-400 mx-auto drop-shadow-lg mb-6" />
              <h2 className="text-5xl font-black text-slate-800 dark:text-white mb-2">Shift Ended!</h2>
              <p className="text-slate-500 dark:text-slate-400 font-bold text-xl mb-8 tracking-widest uppercase">Total XP: {score}</p>
              
              <div className="mb-10 font-black text-7xl text-teal-600 drop-shadow-md bg-teal-50 dark:bg-teal-900/20 py-8 rounded-[2.5rem] border-4 border-teal-100 dark:border-teal-900/30">
                {score} <span className="text-2xl text-teal-300 tracking-widest uppercase">Points</span>
              </div>

              {mistakes.length > 0 && (
                <div className="mb-10 text-left bg-rose-50 dark:bg-rose-900/20 p-8 rounded-[2.5rem] border-4 border-rose-100 dark:border-rose-900/30 max-h-[300px] overflow-y-auto shadow-inner">
                  <h4 className="text-rose-700 dark:text-rose-400 font-black text-2xl mb-4 flex items-center gap-3"><History size={28}/> Quality Check</h4>
                  <ul className="space-y-3">
                    {mistakes.map((m, i) => (
                      <li key={i} className="text-rose-600 dark:text-rose-300 font-bold bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-rose-100 dark:border-rose-900/30 text-sm leading-relaxed">{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                 <button onClick={() => setGameState('menu')} className="flex-1 py-6 bg-teal-600 hover:bg-teal-700 text-white font-black rounded-3xl shadow-[0_8px_0_rgb(13,148,136)] active:shadow-none active:translate-y-2 transition-all text-xl">New Shift ➔</button>
                 <button onClick={() => navigate('/dashboard')} className="md:w-1/3 py-6 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 font-bold rounded-3xl transition-all uppercase tracking-widest text-sm border-b-4 border-slate-200 dark:border-slate-800 active:translate-y-1 active:border-b-0">Exit</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
