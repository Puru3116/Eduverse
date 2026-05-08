import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../store/AppContext';
import { ArrowLeft, Award, Clock, ArrowRight, History, RefreshCcw, MousePointer2 } from 'lucide-react';
import axios from 'axios';
import api from '../../utils/api';

const BACKEND_URL = 'http://localhost:5005/api';

const LEVEL_NAMES = ["Beginner", "Intermediate", "Master", "Legend"];

const ALL_PAIRS = [
  { id: 1, val: 1, label: 'One', visual: '🐘' },
  { id: 2, val: 2, label: 'Two', visual: '⭐️⭐️' },
  { id: 3, val: 3, label: 'Three', visual: '🍎🍎🍎' },
  { id: 4, val: 4, label: 'Four', visual: '⚽️⚽️⚽️⚽️' },
  { id: 5, val: 5, label: 'Five', visual: '🚗🚗🚗🚗🚗' },
  { id: 6, val: 6, label: 'Six', visual: '🍉🍉🍉🍉🍉🍉' },
  { id: 7, val: 7, label: 'Seven', visual: '🎈🎈🎈🎈🎈🎈🎈' },
  { id: 8, val: 8, label: 'Eight', visual: '🍕🍕🍕🍕🍕🍕🍕🍕' },
  { id: 9, val: 9, label: 'Nine', visual: '🦋🦋🦋🦋🦋🦋🦋🦋🦋' },
  { id: 10, val: 10, label: 'Ten', visual: '🧤🧤🧤🧤🧤🧤🧤🧤🧤🧤' },
  { id: 11, val: 11, label: 'Eleven', visual: '🍦🍦🍦🍦🍦🍦🍦🍦🍦🍦🍦' },
  { id: 12, val: 12, label: 'Twelve', visual: '🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩🍩' },
  { id: 13, val: 13, label: 'Thirteen', visual: '🥨🥨🥨🥨🥨🥨🥨🥨🥨🥨🥨🥨🥨' },
  { id: 14, val: 14, label: 'Fourteen', visual: '🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪' },
  { id: 15, val: 15, label: 'Fifteen', visual: '🧁🧁🧁🧁🧁🧁🧁🧁🧁🧁🧁🧁🧁🧁🧁' },
  { id: 16, val: 16, label: 'Sixteen', visual: '🍭🍭🍭🍭🍭🍭🍭🍭🍭🍭🍭🍭🍭🍭🍭🍭' },
  { id: 17, val: 17, label: 'Seventeen', visual: '🍫🍫🍫🍫🍫🍫🍫🍫🍫🍫🍫🍫🍫🍫🍫🍫🍫' },
  { id: 18, val: 18, label: 'Eighteen', visual: '🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿🍿' },
  { id: 19, val: 19, label: 'Nineteen', visual: '🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤🥤' },
  { id: 20, val: 20, label: 'Twenty', visual: '🍔🍔🍔🍔🍔🍔🍔🍔🍔🍔🍔🍔🍔🍔🍔🍔🍔🍔🍔🍔' },
];

export default function DragDropNumbers() {
  const navigate = useNavigate();
  const { student } = useAppContext();
  
  const [mainLevel, setMainLevel] = useState(1);
  const [subLevel, setSubLevel] = useState(1);
  const [gameState, setGameState] = useState('menu'); // 'menu', 'sub_selection', 'playing', 'round_over'
  const [round, setRound] = useState(1);
  const [items, setItems] = useState([]);
  const [targets, setTargets] = useState([]);
  const [matches, setMatches] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [mistakes, setMistakes] = useState([]);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [unlockedProgress, setUnlockedProgress] = useState({ main: 1, sub: 1 });
  
  // Persistence Key
  const saveKey = student ? `eduverse_resume_${student.id || student._id}_match-numbers_${mainLevel}_${subLevel}` : null;

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
  }, [student, gameState]); // Re-fetch on state changes to ensure locks are fresh

  const fetchProgress = async () => {
    if (!student) return;
    try {
      const studentId = student.id || student._id;
      const res = await api.get(`/progress/${studentId}`);
      const gameProgress = res.data.filter(p => p.gameId === 'match-numbers');
      
      console.log(`[DragMatch] Raw Progress:`, res.data);
      console.log(`[DragMatch] Filtered:`, gameProgress);

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
        
        console.log(`[DragMatch] Unlocking: ${nextMain}.${nextSub}`);
        setUnlockedProgress({ main: nextMain, sub: nextSub });
      }
    } catch (err) {
      console.error(`[DragMatch] Fetch Error:`, err);
    }
  };

  const isLevelLocked = (mLvl, sLvl) => {
    if (mLvl < unlockedProgress.main) return false;
    if (mLvl === unlockedProgress.main && sLvl <= unlockedProgress.sub) return false;
    return true;
  };

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      finishLevel(false);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const generateLevel = useCallback((mLvl, sLvl) => {
    let pairCount = 3;
    let time = 30;
    if (mLvl === 2) { pairCount = 4; time = 25; }
    if (mLvl === 3) { pairCount = 5; time = 40; }
    if (mLvl === 4) { pairCount = 6; time = 20; }

    const maxVal = 5 + (mLvl * 3) + (sLvl * 2);
    const availablePairs = ALL_PAIRS.filter(p => p.val <= maxVal);
    const shuffledPairs = [...availablePairs].sort(() => 0.5 - Math.random()).slice(0, pairCount);
    
    setItems(shuffledPairs.map(p => ({ id: p.id, type: 'number', content: p.val })).sort(() => 0.5 - Math.random()));
    setTargets(shuffledPairs.map(p => ({ id: p.id, type: 'visual', content: p.visual })).sort(() => 0.5 - Math.random()));
    
    setMatches({});
    setSelectedItem(null);
    setTimeLeft(time);
  }, []);

  const selectMainLevel = (lvl) => {
    setMainLevel(lvl);
    setGameState('sub_selection');
  };

  const startMission = (sLvl, forceNew = false) => {
    setSubLevel(sLvl);
    const key = `eduverse_resume_${student.id || student._id}_match-numbers_${mainLevel}_${sLvl}`;
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
    generateLevel(mainLevel, sLvl);
    setGameState('playing');
  };

  const resumeGame = () => {
    const saved = JSON.parse(localStorage.getItem(saveKey));
    if (saved) {
      setRound(saved.round || 1);
      setScore(saved.score || 0);
      setMistakes(saved.mistakes || []);
      setStartTime(saved.startTime || Date.now());
      generateLevel(mainLevel, subLevel);
      setGameState('playing');
    }
  };


  const handleItemClick = (item) => {
    if (matches[item.id] || gameState !== 'playing') return;
    setSelectedItem(item);
  };

  const handleTargetClick = (target) => {
    if (!selectedItem || gameState !== 'playing') return;
    
    if (selectedItem.id === target.id) {
      const newMatches = { ...matches, [selectedItem.id]: true };
      setMatches(newMatches);
      setSelectedItem(null);
      
      if (Object.keys(newMatches).length === items.length) {
        if (round < 10) {
          setTimeout(() => {
            setRound(r => r + 1);
            setScore(s => s + (mainLevel * 50));
            generateLevel(mainLevel, subLevel);
          }, 800);
        } else {
          finishLevel(true);
        }
      }
    } else {
      const correctAnswer = ALL_PAIRS.find(p => p.id === selectedItem.id);
      setMistakes(prev => [...prev, `Matched '${selectedItem.content}' with a group, but correct was '${correctAnswer.visual}'.`]);
      setSelectedItem(null);
      if(timeLeft > 2) setTimeLeft(l => Math.max(0, l - 2));
    }
  };

  const finishLevel = async (success) => {
    const finalScore = success ? score + (timeLeft * 5) : score;
    setScore(finalScore);
    setGameState('round_over');

    if (student) {
      try {
        await api.post('/progress', {
        studentId: student.id || student._id,
        moduleName: 'Math Bazaar',
        gameId: 'match-numbers',
        levelNumber: mainLevel,
        subLevel: subLevel,
        score: Math.floor(finalScore),
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
        <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="absolute top-6 w-full max-w-4xl px-6 flex justify-between items-center z-20">
        <button 
          onClick={() => gameState === 'playing' || gameState === 'sub_selection' ? setGameState('menu') : navigate('/dashboard')} 
          className="bg-white dark:bg-slate-900 p-4 rounded-full shadow-md border-b-4 border-slate-200 dark:border-slate-800 active:scale-95 transition-transform"
        >
          <ArrowLeft size={24} className="text-slate-600 dark:text-slate-400" />
        </button>
        {gameState === 'playing' && (
          <div className="bg-white dark:bg-slate-900 px-6 py-2 rounded-full shadow-md border-b-4 border-slate-200 dark:border-slate-800 flex items-center space-x-6">
             <div className="flex items-center space-x-2">
               <span className="font-black text-cyan-500 uppercase text-xs">Mission {mainLevel}.{subLevel}</span>
               <span className="font-black text-slate-400 uppercase text-[10px]">Round {round}/10</span>
             </div>
             <div className="flex items-center space-x-2 border-l border-slate-200 dark:border-slate-700 pl-4">
               <Clock size={20} className={timeLeft <= 5 ? 'text-rose-500 animate-pulse' : 'text-cyan-500'} />
               <span className={`font-black text-xl ${timeLeft <= 5 ? 'text-rose-500' : 'text-slate-700 dark:text-slate-200'}`}>{timeLeft}s</span>
             </div>
             <div className="flex items-center space-x-2 border-l border-slate-200 dark:border-slate-700 pl-4">
               <span className="font-black text-cyan-500 text-xl">{score} <span className="text-xs uppercase">XP</span></span>
             </div>
             <button 
                onClick={() => startMission(subLevel, true)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-cyan-500"
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
            className="w-full max-w-xl bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-cyan-100 dark:border-slate-800 m-auto z-10"
          >
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="w-32 h-32 bg-cyan-100 dark:bg-cyan-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border-4 border-white dark:border-slate-800">
              <Award size={64} className="text-cyan-500 dark:text-cyan-400" />
            </motion.div>
            <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2">Number Match</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium mb-10">Match the numbers with their visual groups!</p>
            
            <div className="grid grid-cols-1 gap-4">
               {[
                 { id: 1, name: 'Beginner', desc: 'Simple Matching', color: 'bg-emerald-500 shadow-[0_8px_0_rgb(16,185,129)]' },
                 { id: 2, name: 'Intermediate', desc: 'Larger Numbers', color: 'bg-cyan-500 shadow-[0_8px_0_rgb(6,182,212)]' },
                 { id: 3, name: 'Master', desc: 'Fast Recognition', color: 'bg-blue-500 shadow-[0_8px_0_rgb(59,130,246)]' },
                 { id: 4, name: 'Legend', desc: 'Speed Master', color: 'bg-rose-500 shadow-[0_8px_0_rgb(244,63,94)]' }
               ].map(l => {
                 const locked = l.id > unlockedProgress.main;
                 return (
                   <button key={l.id} disabled={locked} onClick={() => selectMainLevel(l.id)} className={`${locked ? 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed opacity-60' : l.color} text-white p-6 rounded-3xl flex items-center justify-between transition-all relative overflow-hidden active:translate-y-2 active:shadow-none group`}>
                      <div className="text-left">
                         <h4 className="text-2xl font-black">{l.name}</h4>
                         <p className="font-bold opacity-80 text-sm">{l.desc}</p>
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
          <motion.div 
            key="sub_selection"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="w-full max-w-xl bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-cyan-100 dark:border-slate-800 m-auto z-10"
          >
            <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2">Select Mission</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium mb-10">Level {mainLevel} Missions</p>
            <div className="grid grid-cols-1 gap-4 text-left">
              {[1, 2, 3].map(sLvl => {
                const locked = isLevelLocked(mainLevel, sLvl);
                return (
                  <button key={sLvl} disabled={locked} onClick={() => startMission(sLvl)} className={`${locked ? 'bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed opacity-50' : 'bg-white dark:bg-slate-800 hover:border-cyan-500'} border-b-8 border-slate-200 dark:border-slate-950 p-6 rounded-3xl flex items-center justify-between group transition-all`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${locked ? 'bg-slate-200 dark:bg-slate-700' : 'bg-cyan-500'} text-white rounded-2xl flex items-center justify-center font-black`}>
                        {locked ? <Award size={16} /> : `${mainLevel}.${sLvl}`}
                      </div>
                      <span className={`text-2xl font-black ${locked ? 'text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>Mission {sLvl}</span>
                    </div>
                    {!locked && <ArrowRight className="text-cyan-400 group-hover:translate-x-2 transition-transform" />}
                  </button>
                );
              })}
              <button onClick={() => setGameState('menu')} className="mt-4 text-slate-400 font-bold hover:text-cyan-500 transition-colors text-center w-full">
                &larr; Back to Levels
              </button>
            </div>
          </motion.div>
        )}

        {gameState === 'resume_prompt' && (
          <motion.div key="resume" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full max-w-md bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-cyan-100 dark:border-slate-800 m-auto z-10">
            <div className="w-24 h-24 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6"><History size={48} className="text-amber-500" /></div>
            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">Welcome Back!</h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold mb-10">You have an unfinished session. What would you like to do?</p>
            <div className="flex flex-col gap-4">
              <button onClick={resumeGame} className="py-6 bg-cyan-500 text-white font-black rounded-3xl shadow-[0_8px_0_rgb(6,182,212)] active:translate-y-2 transition-all text-xl">Resume Test</button>
              <button onClick={() => startMission(subLevel, true)} className="py-6 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-black rounded-3xl border-b-4 border-slate-200 dark:border-slate-950 active:translate-y-2 transition-all text-xl">Start Again</button>
            </div>
          </motion.div>
        )}


        {gameState === 'playing' && (
          <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 p-6 z-10 m-auto mt-16">
            <div className="space-y-6">
              <h3 className="text-center font-black text-slate-400 uppercase tracking-widest text-sm mb-4">Select a Number</h3>
              <div className="grid grid-cols-2 gap-6">
                {items.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={!matches[item.id] ? { scale: 1.05 } : {}}
                    whileTap={!matches[item.id] ? { scale: 0.95 } : {}}
                    onClick={() => handleItemClick(item)}
                    className={`p-8 rounded-[2.5rem] text-5xl font-black transition-all border-b-8 flex items-center justify-center min-h-[140px] relative
                      ${matches[item.id] ? 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800 text-emerald-500 opacity-50 cursor-default' : 
                        selectedItem?.id === item.id ? 'bg-cyan-500 border-cyan-700 text-white scale-105 shadow-xl' : 
                        'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-cyan-400'}`}
                  >
                    {item.content}
                    {matches[item.id] && <div className="absolute top-2 right-2 text-2xl">✅</div>}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-center font-black text-slate-400 uppercase tracking-widest text-sm mb-4">Match the Group</h3>
              <div className="grid grid-cols-2 gap-6">
                {targets.map((target) => (
                  <motion.button
                    key={target.id}
                    whileHover={!matches[target.id] ? { scale: 1.05 } : {}}
                    whileTap={!matches[target.id] ? { scale: 0.95 } : {}}
                    onClick={() => handleTargetClick(target)}
                    className={`p-8 rounded-[2.5rem] text-4xl transition-all border-b-8 flex items-center justify-center min-h-[140px] relative overflow-hidden
                      ${matches[target.id] ? 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800 opacity-50 cursor-default' : 
                        'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-cyan-400'}`}
                  >
                    <div className="flex flex-wrap justify-center gap-1 max-w-[120px]">
                      {target.content}
                    </div>
                    {matches[target.id] && <div className="absolute top-2 right-2 text-2xl">✅</div>}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {gameState === 'round_over' && (
          <motion.div 
            key="round_over"
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
            className="w-full max-w-xl m-auto z-10"
          >
            <div className="bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-cyan-100 dark:border-slate-800">
              <Award className="w-32 h-32 text-cyan-500 mx-auto drop-shadow-lg mb-6" />
              <h2 className="text-5xl font-black text-slate-800 dark:text-white mb-2">{score > 0 ? 'Excellent!' : 'Time Up!'}</h2>
              <p className="text-slate-500 dark:text-slate-400 font-bold text-xl mb-8 tracking-widest uppercase">{score > 0 ? 'Match Completed' : 'Try Again next time'}</p>
              
              <div className="mb-10 font-black text-6xl text-cyan-500 drop-shadow-md bg-cyan-50 dark:bg-cyan-900/20 py-8 rounded-[2.5rem] border-4 border-cyan-100 dark:border-cyan-900/30">
                {score} <span className="text-2xl text-cyan-300 tracking-widest">XP</span>
              </div>

              {mistakes.length > 0 && (
                <div className="mb-10 text-left bg-rose-50 dark:bg-rose-900/20 p-8 rounded-[2.5rem] border-4 border-rose-100 dark:border-rose-900/30">
                  <h4 className="text-rose-700 dark:text-rose-400 font-black text-2xl mb-4 flex items-center gap-3"><History size={28}/> Study Notes</h4>
                  <ul className="space-y-3">
                    {mistakes.map((m, i) => (
                      <li key={i} className="text-rose-600 dark:text-rose-300 font-bold bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-rose-100 dark:border-rose-900/30 text-sm leading-relaxed">{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                 <button onClick={() => setGameState('menu')} className="flex-1 py-6 bg-cyan-600 hover:bg-cyan-700 text-white font-black rounded-3xl shadow-[0_8px_0_rgb(8,145,178)] active:shadow-none active:translate-y-2 transition-all text-xl">New Game ➔</button>
                 <button onClick={() => navigate('/dashboard')} className="md:w-1/3 py-6 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 font-bold rounded-3xl transition-all uppercase tracking-widest text-sm border-b-4 border-slate-200 dark:border-slate-800 active:translate-y-1 active:border-b-0">Exit</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
