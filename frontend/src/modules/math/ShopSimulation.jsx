import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../store/AppContext';
import { ShoppingCart, Wallet, ArrowLeft, Store, Star, Award, History, ArrowRight, RefreshCcw, MousePointer2 } from 'lucide-react';
import axios from 'axios';
import api from '../../utils/api';

const BACKEND_URL = 'http://localhost:5005/api';

const ITEMS_DB = [
  { name: 'Apple', emoji: '🍎' }, { name: 'Banana', emoji: '🍌' }, { name: 'Notebook', emoji: '📓' },
  { name: 'Pen', emoji: '🖊️' }, { name: 'Milk', emoji: '🥛' }, { name: 'Bread', emoji: '🍞' },
  { name: 'Cookie', emoji: '🍪' }, { name: 'Juice', emoji: '🧃' }, { name: 'Soap', emoji: '🧼' },
  { name: 'Pencil', emoji: '✏️' }, { name: 'Water', emoji: '💧' }, { name: 'Carrot', emoji: '🥕' },
  { name: 'Tomato', emoji: '🍅' }, { name: 'Candy', emoji: '🍬' }, { name: 'Onion', emoji: '🧅' },
  { name: 'Mango', emoji: '🥭' }, { name: 'Egg', emoji: '🥚' }, { name: 'Cheese', emoji: '🧀' },
  { name: 'Rice', emoji: '🍚' }, { name: 'Tea', emoji: '☕' }
];

const CUSTOMERS = ['👩🏽', '👨🏽‍🦳', '👧🏻', '👦🏾', '👵🏼', '👱🏿‍♂️', '🧔🏻', '👩🏾‍🦱'];

const playSound = (type) => {
  if (!window.AudioContext && !window.webkitAudioContext) return;
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  if (type === 'correct') {
    osc.type = 'sine'; osc.frequency.setValueAtTime(500, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(1, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
    osc.start(); osc.stop(ctx.currentTime + 0.3);
  } else if (type === 'wrong') {
    osc.type = 'square'; osc.frequency.setValueAtTime(150, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(1, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    osc.start(); osc.stop(ctx.currentTime + 0.2);
  }
};

export default function ShopSimulation() {
  const navigate = useNavigate();
  const { student } = useAppContext();
  
  const [gameState, setGameState] = useState('menu'); // menu, sub_selection, playing, round_over
  const [mainLevel, setMainLevel] = useState(1);
  const [subLevel, setSubLevel] = useState(1);
  const [round, setRound] = useState(1);
  const [unlockedProgress, setUnlockedProgress] = useState({ main: 1, sub: 1 });
  
  const [storeItems, setStoreItems] = useState([]);
  const [targetItems, setTargetItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [wallet, setWallet] = useState(999);
  const [banknote, setBanknote] = useState(0);
  const [userChangeInput, setUserChangeInput] = useState('');
  const [customer, setCustomer] = useState('👩🏽');
  
  const [isShaking, setIsShaking] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const [mistakes, setMistakes] = useState([]);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(0);
  
  // Persistence Key
  const saveKey = student ? `eduverse_resume_${student.id || student._id}_shop-simulation_${mainLevel}_${subLevel}` : null;

  // Save state whenever it changes
  useEffect(() => {
    if (gameState === 'playing' && saveKey) {
      localStorage.setItem(saveKey, JSON.stringify({ round, score, mistakes, startTime }));
    }
  }, [round, score, mistakes, gameState, saveKey, startTime]);

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
      const gameProgress = res.data.filter(p => p.gameId === 'shop-simulation');
      
      console.log(`[ShopSim] Raw Progress:`, res.data);
      console.log(`[ShopSim] Filtered:`, gameProgress);

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
        
        console.log(`[ShopSim] Unlocking: ${nextMain}.${nextSub}`);
        setUnlockedProgress({ main: nextMain, sub: nextSub });
      }
    } catch (err) {
      console.error(`[ShopSim] Fetch Error:`, err);
    }
  };

  const resetProgress = async () => {
    if (!student || !window.confirm("Are you sure you want to reset all progress for this module? This cannot be undone.")) return;
    try {
      const studentId = student.id || student._id;
      await api.delete(`/progress/${studentId}/shop-simulation`);
      setUnlockedProgress({ main: 1, sub: 1 });
      setGameState('menu');
      alert("Progress reset successfully!");
    } catch (err) {
      console.error("Reset Error:", err);
      alert("Failed to reset progress.");
    }
  };

  const isLevelLocked = (mLvl, sLvl) => {
    if (mLvl < unlockedProgress.main) return false;
    if (mLvl === unlockedProgress.main && sLvl <= unlockedProgress.sub) return false;
    return true;
  };

  const generateRound = useCallback((mLvl, sLvl) => {
    // Generate fresh market pricing based on difficulty
    const priceMultiplier = mLvl * 5;
    const currentMarket = [...ITEMS_DB].sort(() => 0.5 - Math.random()).slice(0, 8).map((item, i) => ({
      id: i,
      ...item,
      price: Math.floor(Math.random() * 5 + 1) * priceMultiplier
    }));
    setStoreItems(currentMarket);
    
    // Target count based on level
    let targetCount = 1;
    if (mLvl === 2) targetCount = 2;
    if (mLvl === 3) targetCount = 3;
    if (mLvl === 4) targetCount = 4;
    
    const requested = [...currentMarket].sort(() => 0.5 - Math.random()).slice(0, targetCount);
    const totalCost = requested.reduce((sum, item) => sum + item.price, 0);

    setTargetItems(requested);
    setCart([]);
    setCustomer(CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)]);
    setUserChangeInput('');
    setIsShaking(false);
    setIsGlowing(false);

    // Setup specific level logic
    if (mLvl === 1) {
      setWallet(999);
    } else if (mLvl === 2) {
      setWallet(totalCost + (Math.floor(Math.random() * 2) * 5));
    } else if (mLvl >= 3) {
      setWallet(999);
      const notes = [50, 100, 200, 500, 1000];
      const validNotes = notes.filter(n => n > totalCost);
      setBanknote(validNotes.length > 0 ? validNotes[0] : 1000);
    }
  }, []);

  const selectMainLevel = (lvl) => {
    setMainLevel(lvl);
    setGameState('sub_selection');
  };

  const startMission = (sLvl, forceNew = false) => {
    setSubLevel(sLvl);
    const key = `eduverse_resume_${student.id || student._id}_shop-simulation_${mainLevel}_${sLvl}`;
    const saved = localStorage.getItem(key);

    if (saved && !forceNew) {
      setGameState('resume_prompt');
      return;
    }

    if (forceNew) localStorage.removeItem(key);

    setRound(1);
    setScore(0);
    setMistakes([]);
    setStartTime(Date.now());
    generateRound(mainLevel, sLvl);
    setGameState('playing');
  };

  const resumeGame = () => {
    const saved = JSON.parse(localStorage.getItem(saveKey));
    if (saved) {
      setRound(saved.round || 1);
      setScore(saved.score || 0);
      setMistakes(saved.mistakes || []);
      setStartTime(saved.startTime || Date.now());
      generateRound(mainLevel, subLevel);
      setGameState('playing');
    }
  };

  const checkOut = () => {
    const targetCost = targetItems.reduce((sum, item) => sum + item.price, 0);
    const cartStr = [...cart].map(i => i.name).sort().join(',');
    const targetStr = [...targetItems].map(i => i.name).sort().join(',');

    if (cartStr !== targetStr) {
      triggerError("Items don't match!");
      return;
    }

    if (mainLevel >= 3) {
      const correctChange = banknote - targetCost;
      if (parseInt(userChangeInput) !== correctChange) {
        triggerError(`Incorrect change! Total: ₹${targetCost}. Change should be ₹${correctChange}.`);
        return;
      }
    }

    playSound('correct');
    setIsGlowing(true);
    setScore(s => s + 100);
    
    setTimeout(() => {
      if (round < 10) {
        setRound(r => r + 1);
        generateRound(mainLevel, subLevel);
      } else {
        finishLevel();
      }
    }, 1000);
  };

  const triggerError = (msg) => {
    playSound('wrong');
    setIsShaking(true);
    setMistakes(prev => [...prev, msg]);
    setTimeout(() => setIsShaking(false), 500);
  };

  const finishLevel = async () => {
    setGameState('round_over');
    if (!student) return;
    try {
      await api.post('/progress', {
        studentId: student.id || student._id,
        moduleName: 'Math Bazaar',
        gameId: 'shop-simulation',
        levelNumber: mainLevel,
        subLevel: subLevel,
        score: score + 100,
        attempts: 1,
        timeSpent: Math.floor((Date.now() - startTime) / 1000)
      });
      if (saveKey) localStorage.removeItem(saveKey);
      fetchProgress(); // Refresh locks
    } catch (err) { console.error(err); }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 flex flex-col items-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-sky-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="absolute top-6 w-full max-w-4xl px-6 flex justify-between items-center z-20">
        <button onClick={() => (gameState === 'playing' || gameState === 'sub_selection') ? setGameState('menu') : navigate('/dashboard')} className="bg-white dark:bg-slate-900 p-4 rounded-full shadow-md border-b-4 border-slate-200 dark:border-slate-800 active:scale-95 transition-transform">
          <ArrowLeft size={24} className="text-slate-600 dark:text-slate-400" />
        </button>
        {gameState === 'playing' && (
          <div className="bg-white dark:bg-slate-900 px-6 py-2 rounded-full shadow-md border-b-4 border-slate-200 dark:border-slate-800 flex items-center space-x-4">
             <span className="font-black text-slate-400 uppercase text-xs">Mission {mainLevel}.{subLevel}</span>
             <span className="font-black text-sky-500 uppercase text-xs">Round {round}/10</span>
             <button 
                onClick={() => startMission(subLevel, true)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-sky-500"
                title="Reset Level"
              >
                <RefreshCcw size={20} />
              </button>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {gameState === 'menu' && (
          <motion.div key="menu" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full max-w-xl bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-sky-100 dark:border-slate-800 m-auto z-10 relative">
            <button 
              onClick={resetProgress}
              className="absolute top-6 right-6 p-3 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-2xl border-2 border-rose-100 dark:border-rose-900/30 hover:bg-rose-100 transition-all group"
              title="Reset Module Progress"
            >
              <RefreshCcw size={20} className="group-active:rotate-180 transition-transform duration-500" />
            </button>
            <Store size={64} className="text-sky-500 mx-auto mb-6" />
            <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2">Math Bazaar</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-10">Select your expertise level</p>
            <div className="grid grid-cols-1 gap-4">
              {[
                { id: 1, name: 'Beginner', desc: 'Simple Items', color: 'bg-emerald-500 shadow-[0_8px_0_rgb(16,185,129)]' },
                { id: 2, name: 'Intermediate', desc: 'Budget Control', color: 'bg-sky-500 shadow-[0_8px_0_rgb(14,165,233)]' },
                { id: 3, name: 'Master', desc: 'Cashier Duty', color: 'bg-violet-500 shadow-[0_8px_0_rgb(139,92,246)]' },
                { id: 4, name: 'Legend', desc: 'Rush Hour', color: 'bg-rose-500 shadow-[0_8px_0_rgb(244,63,94)]' }
              ].map(l => {
                const locked = l.id > unlockedProgress.main;
                return (
                  <button 
                    key={l.id} 
                    disabled={locked}
                    onClick={() => selectMainLevel(l.id)} 
                    className={`${locked ? 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed opacity-60 shadow-none' : l.color} text-white p-6 rounded-3xl flex items-center justify-between transition-all active:translate-y-2 active:shadow-none relative overflow-hidden group`}
                  >
                    <div className="text-left">
                      <h4 className="text-2xl font-black">{l.name}</h4>
                      <p className="opacity-80 text-sm font-bold uppercase">{l.desc}</p>
                    </div>
                    {!locked && (
                        <motion.div 
                          animate={{ x: [0, 5, 0], y: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 3 }}
                          className="absolute top-2 right-2 bg-white/20 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1 border border-white/30"
                        >
                          <MousePointer2 size={10} className="text-white" />
                          <span className="text-[8px] font-black uppercase tracking-tighter">Click</span>
                        </motion.div>
                      )}
                    {locked ? <Award size={24} className="opacity-20" /> : <ArrowRight />}
                    {locked && <div className="absolute inset-0 bg-black/5 flex items-center justify-center backdrop-blur-[1px]"><Award size={48} className="text-white/20 rotate-12" /></div>}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}


        {gameState === 'sub_selection' && (
          <motion.div key="sub" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full max-w-xl bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-sky-100 dark:border-slate-800 m-auto z-10">
            <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2">Select Mission</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-10">Level {mainLevel} Challenges</p>
            <div className="grid grid-cols-1 gap-4">
              {[1, 2, 3].map(sLvl => {
                const locked = isLevelLocked(mainLevel, sLvl);
                return (
                  <button 
                    key={sLvl} 
                    disabled={locked}
                    onClick={() => startMission(sLvl)} 
                    className={`${locked ? 'bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed opacity-50' : 'bg-white dark:bg-slate-800 hover:border-sky-500'} border-b-8 border-slate-200 dark:border-slate-950 p-6 rounded-3xl flex items-center justify-between group transition-all`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${locked ? 'bg-slate-200 dark:bg-slate-700' : 'bg-sky-500'} text-white rounded-2xl flex items-center justify-center font-black`}>
                        {locked ? <Award size={16} /> : `${mainLevel}.${sLvl}`}
                      </div>
                      <span className={`text-2xl font-black ${locked ? 'text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>Mission {sLvl}</span>
                    </div>
                    {!locked && <ArrowRight className="text-sky-400" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {gameState === 'resume_prompt' && (
          <motion.div key="resume" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full max-w-md bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-sky-100 dark:border-slate-800 m-auto z-10">
            <div className="w-24 h-24 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6"><History size={48} className="text-amber-500" /></div>
            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">Welcome Back!</h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold mb-10">You have an unfinished session. What would you like to do?</p>
            <div className="flex flex-col gap-4">
              <button onClick={resumeGame} className="py-6 bg-sky-500 text-white font-black rounded-3xl shadow-[0_8px_0_rgb(14,165,233)] active:translate-y-2 transition-all text-xl">Resume Test</button>
              <button onClick={() => startMission(subLevel, true)} className="py-6 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-black rounded-3xl border-b-4 border-slate-200 dark:border-slate-950 active:translate-y-2 transition-all text-xl">Start Again</button>
            </div>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 mt-16 relative">
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-xl border-b-[12px] border-slate-100 dark:border-slate-800">
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                 {storeItems.map((item) => (
                   <button key={item.id} onClick={() => setCart([...cart, item])} className="p-6 rounded-[2rem] bg-sky-50 dark:bg-slate-800 border-b-8 border-sky-100 dark:border-sky-900 flex flex-col items-center">
                     <span className="text-5xl mb-2">{item.emoji}</span>
                     <span className="font-black text-slate-700 dark:text-slate-200">₹{item.price}</span>
                   </button>
                 ))}
               </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-xl border-b-[8px] border-slate-100 dark:border-slate-800 text-center">
                <div className="text-7xl mb-4">{customer}</div>
                <p className="font-bold text-slate-500 mb-4">"I want these:"</p>
                <div className="flex justify-center gap-2 flex-wrap">
                  {targetItems.map((t, i) => <div key={i} className="bg-sky-50 dark:bg-sky-900/30 p-2 rounded-xl text-2xl">{t.emoji}</div>)}
                </div>
                {mainLevel >= 3 && (
                  <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border-2 border-emerald-100">
                    <p className="text-emerald-600 font-black">Customer pays: ₹{banknote}</p>
                  </div>
                )}
              </div>

              <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-xl border-b-[8px] border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center mb-4">
                   <h3 className="font-black text-xl">Basket</h3>
                   <span className="font-black text-sky-500">₹{cart.reduce((s,i)=>s+i.price,0)}</span>
                </div>
                <div className="min-h-[100px] flex flex-wrap gap-2 mb-6">
                   {cart.map((i, idx) => <button key={idx} onClick={() => setCart(cart.filter((_,id)=>id!==idx))} className="text-3xl bg-slate-100 dark:bg-slate-800 p-2 rounded-xl">{i.emoji}</button>)}
                </div>
                {mainLevel >= 3 && (
                  <input type="number" placeholder="Enter Change..." value={userChangeInput} onChange={(e) => setUserChangeInput(e.target.value)} className="w-full bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl mb-4 font-black text-center text-xl outline-none" />
                )}
                <button onClick={checkOut} className="w-full bg-sky-500 text-white font-black py-4 rounded-3xl shadow-[0_8px_0_rgb(14,165,233)] active:translate-y-2 active:shadow-none">Checkout</button>
              </div>
            </div>
          </motion.div>
        )}

        {gameState === 'round_over' && (
          <motion.div key="over" initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="m-auto w-full max-w-xl bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-sky-100 dark:border-slate-800 z-10">
            <Award className="w-24 h-24 text-sky-500 mx-auto mb-6" />
            <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2">Mission Complete!</h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold mb-6">Level {mainLevel} Finished</p>
            
            {mistakes.length > 0 && (
              <div className="mb-10 text-left bg-rose-50 dark:bg-rose-900/20 p-8 rounded-[2.5rem] border-4 border-rose-100 dark:border-rose-900/30 max-h-60 overflow-y-auto">
                <h4 className="text-rose-700 dark:text-rose-400 font-black text-2xl mb-4 flex items-center gap-3"><History size={28}/> Shop Log</h4>
                <ul className="space-y-3">
                  {mistakes.map((m, i) => (
                    <li key={i} className="text-rose-600 dark:text-rose-300 font-bold bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-rose-100 dark:border-rose-900/30 text-sm leading-relaxed">{m}</li>
                  ))}
                </ul>
              </div>
            )}

            <button onClick={() => setGameState('menu')} className="w-full bg-sky-500 text-white font-black py-6 rounded-3xl shadow-[0_8px_0_rgb(14,165,233)] active:translate-y-2 active:shadow-none text-2xl">Return to Levels</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
