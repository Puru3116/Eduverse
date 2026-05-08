import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../store/AppContext';
import { ArrowLeft, Clock, Award, ArrowRight, History, RefreshCcw, MousePointer2 } from 'lucide-react';
import axios from 'axios';
import api from '../../utils/api';

const BACKEND_URL = 'http://localhost:5005/api';
const TOTAL_QUESTIONS = 10;
const TIME_LIMIT = 60; // seconds

export default function TimedQuiz() {
  const navigate = useNavigate();
  const { student } = useAppContext();

  const [mainLevel, setMainLevel] = useState(1);
  const [subLevel, setSubLevel] = useState(1);
  const [gameState, setGameState] = useState('menu'); // 'menu', 'sub_selection', 'playing', 'round_over'
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [mistakes, setMistakes] = useState([]);
  const [unlockedProgress, setUnlockedProgress] = useState({ main: 1, sub: 1 });
  
  // Persistence Key
  const saveKey = student ? `eduverse_resume_${student.id || student._id}_timed-quiz_${mainLevel}_${subLevel}` : null;

  // Save state whenever it changes
  useEffect(() => {
    if (gameState === 'playing' && saveKey) {
      localStorage.setItem(saveKey, JSON.stringify({ currentIdx, score, mistakes, timeLeft, questions }));
    }
  }, [currentIdx, score, mistakes, timeLeft, gameState, saveKey, questions]);
  
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
      const gameProgress = res.data.filter(p => p.gameId === 'timed-quiz');
      
      console.log(`[TimedQuiz] Raw Progress:`, res.data);
      console.log(`[TimedQuiz] Filtered:`, gameProgress);

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
        
        console.log(`[TimedQuiz] Unlocking: ${nextMain}.${nextSub}`);
        setUnlockedProgress({ main: nextMain, sub: nextSub });
      }
    } catch (err) {
      console.error(`[TimedQuiz] Fetch Error:`, err);
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
      endGame();
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const generateQuestions = useCallback((mLvl, sLvl) => {
    const newQs = [];
    for (let i = 0; i < TOTAL_QUESTIONS; i++) {
      let a, b, ans, text;
      
      if (mLvl === 1) { // Beginner
        const isAdd = Math.random() > 0.5;
        const range = 5 + (sLvl * 5); // 10, 15, 20
        a = Math.floor(Math.random() * range) + 1;
        b = Math.floor(Math.random() * range) + 1;
        ans = isAdd ? a + b : Math.max(a, b) - Math.min(a, b);
        text = isAdd ? `${a} + ${b}` : `${Math.max(a, b)} - ${Math.min(a, b)}`;
      } else if (mLvl === 2) { // Intermediate
        const op = Math.random();
        if (op > 0.6) {
          a = Math.floor(Math.random() * (5 + sLvl)) + 1;
          b = Math.floor(Math.random() * (5 + sLvl)) + 1;
          ans = a * b;
          text = `${a} × ${b}`;
        } else {
          a = Math.floor(Math.random() * 50) + 10;
          b = Math.floor(Math.random() * 30) + 1;
          const isAdd = Math.random() > 0.5;
          ans = isAdd ? a + b : Math.max(a, b) - Math.min(a, b);
          text = isAdd ? `${a} + ${b}` : `${Math.max(a, b)} - ${Math.min(a, b)}`;
        }
      } else if (mLvl === 3) { // Master
        const op = Math.random();
        if (op > 0.5) {
          a = Math.floor(Math.random() * 12) + 2;
          b = Math.floor(Math.random() * (8 + sLvl)) + 2;
          ans = a * b;
          text = `${a} × ${b}`;
        } else {
          b = Math.floor(Math.random() * (8 + sLvl)) + 2;
          ans = Math.floor(Math.random() * 10) + 2;
          a = b * ans; 
          text = `${a} ÷ ${b}`;
        }
      } else { // Legend
        const op = Math.random();
        if (op > 0.7) {
          a = Math.floor(Math.random() * 100) + 50;
          b = Math.floor(Math.random() * 50) + 10;
          const isAdd = Math.random() > 0.5;
          ans = isAdd ? a + b : a - b;
          text = isAdd ? `${a} + ${b}` : `${a} - ${b}`;
        } else if (op > 0.35) {
          a = Math.floor(Math.random() * 15) + 5;
          b = Math.floor(Math.random() * 12) + 5;
          ans = a * b;
          text = `${a} × ${b}`;
        } else {
          b = Math.floor(Math.random() * 15) + 5;
          ans = Math.floor(Math.random() * 12) + 5;
          a = b * ans;
          text = `${a} ÷ ${b}`;
        }
      }
      
      let opts = [ans];
      while(opts.length < 4) {
        const offset = Math.floor(Math.random() * 10) - 5;
        const fake = ans + offset;
        if(fake > 0 && !opts.includes(fake)) opts.push(fake);
      }
      newQs.push({ text, ans, options: opts.sort(() => 0.5 - Math.random()) });
    }
    setQuestions(newQs);
  }, []);

  const selectMainLevel = (lvl) => {
    setMainLevel(lvl);
    setGameState('sub_selection');
  };

  const startMission = (sLvl, forceNew = false) => {
    setSubLevel(sLvl);
    const key = `eduverse_resume_${student.id || student._id}_timed-quiz_${mainLevel}_${sLvl}`;
    const saved = localStorage.getItem(key);

    if (saved && !forceNew) {
      setGameState('resume_prompt');
      return;
    }

    if (forceNew) localStorage.removeItem(key);

    generateQuestions(mainLevel, sLvl);
    setCurrentIdx(0);
    setScore(0);
    setTimeLeft(TIME_LIMIT - (mainLevel === 4 ? 20 : 0));
    setMistakes([]);
    setGameState('playing');
  };

  const resumeGame = () => {
    const saved = JSON.parse(localStorage.getItem(saveKey));
    if (saved) {
      setQuestions(saved.questions || []);
      setCurrentIdx(saved.currentIdx || 0);
      setScore(saved.score || 0);
      setTimeLeft(saved.timeLeft || TIME_LIMIT);
      setMistakes(saved.mistakes || []);
      setGameState('playing');
    }
  };

  const endGame = async () => {
    setGameState('round_over');
    if (!student) return;
    try {
      await api.post('/progress', {
        studentId: student.id || student._id,
        moduleName: 'Math Bazaar',
        gameId: 'timed-quiz',
        levelNumber: mainLevel,
        subLevel: subLevel,
        score: (score * 10 * mainLevel) + (timeLeft * mainLevel),
        attempts: 1,
        timeSpent: TIME_LIMIT - timeLeft
      });
      if (saveKey) localStorage.removeItem(saveKey);
      fetchProgress();
    } catch (err) { console.error(err); }
  };

  const handleAnswer = (selected) => {
    const q = questions[currentIdx];
    if (selected === q.ans) {
      setScore(s => s + 1);
    } else {
      setMistakes(prev => [...prev, `For ${q.text}, you answered ${selected}. The correct answer was ${q.ans}.`]);
    }
    
    if (currentIdx + 1 < TOTAL_QUESTIONS) {
      setCurrentIdx(i => i + 1);
    } else {
      endGame(); 
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 flex flex-col items-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="absolute top-6 w-full max-w-4xl px-6 flex justify-between items-center z-20">
        <button onClick={() => gameState === 'playing' || gameState === 'sub_selection' ? setGameState('menu') : navigate('/dashboard')} className="bg-white dark:bg-slate-900 p-4 rounded-full shadow-md border-b-4 border-slate-200 dark:border-slate-800 active:scale-95 transition-transform">
          <ArrowLeft size={24} className="text-slate-600 dark:text-slate-400" />
        </button>
        {gameState === 'playing' && (
          <div className="bg-white dark:bg-slate-900 px-6 py-2 rounded-full shadow-md border-b-4 border-slate-200 dark:border-slate-800 flex items-center space-x-6">
             <div className="flex items-center space-x-2">
               <span className="font-black text-indigo-500 uppercase text-xs">Mission {mainLevel}.{subLevel}</span>
             </div>
             <div className="flex items-center space-x-2 border-l border-slate-200 dark:border-slate-700 pl-4">
               <Clock size={20} className={timeLeft <= 10 ? 'text-rose-500 animate-pulse' : 'text-indigo-500'} />
               <span className={`font-black text-xl ${timeLeft <= 10 ? 'text-rose-500' : 'text-slate-700 dark:text-slate-200'}`}>{timeLeft}s</span>
             </div>
             <div className="flex items-center space-x-2 border-l border-slate-200 dark:border-slate-700 pl-4">
               <span className="font-black text-indigo-500 uppercase text-xs">Score: {score * 10}</span>
             </div>
             <button 
                onClick={() => startMission(subLevel, true)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-indigo-500"
                title="Reset Level"
              >
                <RefreshCcw size={20} />
              </button>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {gameState === 'menu' && (
          <motion.div key="menu" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full max-w-xl bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-indigo-100 dark:border-slate-800 m-auto z-10">
            <Clock size={64} className="text-indigo-500 mx-auto mb-6" />
            <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2">Minute Math</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-10">Choose your difficulty and test your speed!</p>
            <div className="grid grid-cols-1 gap-4">
               {[
                 { id: 1, name: 'Beginner', desc: 'Addition & Subtraction', color: 'bg-emerald-500 shadow-[0_8px_0_rgb(16,185,129)]' },
                 { id: 2, name: 'Intermediate', desc: 'Mixed Operators', color: 'bg-indigo-500 shadow-[0_8px_0_rgb(67,56,202)]' },
                 { id: 3, name: 'Master', desc: 'Multiply & Divide', color: 'bg-violet-500 shadow-[0_8px_0_rgb(139,92,246)]' },
                 { id: 4, name: 'Legend', desc: 'Ultimate Challenge', color: 'bg-rose-500 shadow-[0_8px_0_rgb(244,63,94)]' }
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
          <motion.div key="sub" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full max-w-xl bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-indigo-100 dark:border-slate-800 m-auto z-10">
            <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2">Select Mission</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-10">Level {mainLevel} Missions</p>
            <div className="grid grid-cols-1 gap-4 text-left">
              {[1, 2, 3].map(sLvl => {
                const locked = isLevelLocked(mainLevel, sLvl);
                return (
                  <button key={sLvl} disabled={locked} onClick={() => startMission(sLvl)} className={`${locked ? 'bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed opacity-50' : 'bg-white dark:bg-slate-800 hover:border-indigo-500'} border-b-8 border-slate-200 dark:border-slate-950 p-6 rounded-3xl flex items-center justify-between group transition-all`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${locked ? 'bg-slate-200 dark:bg-slate-700' : 'bg-indigo-500'} text-white rounded-2xl flex items-center justify-center font-black`}>
                        {locked ? <Award size={16} /> : `${mainLevel}.${sLvl}`}
                      </div>
                      <span className={`text-2xl font-black ${locked ? 'text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>Mission {sLvl}</span>
                    </div>
                    {!locked && <ArrowRight className="text-indigo-400" />}
                  </button>
                );
              })}
              <button onClick={() => setGameState('menu')} className="mt-4 text-slate-400 font-bold hover:text-indigo-500 transition-colors text-center w-full">
                &larr; Back to Levels
              </button>
            </div>
          </motion.div>
        )}

        {gameState === 'resume_prompt' && (
          <motion.div key="resume" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full max-w-md bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-indigo-100 dark:border-slate-800 m-auto z-10">
            <div className="w-24 h-24 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6"><History size={48} className="text-amber-500" /></div>
            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">Welcome Back!</h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold mb-10">You have an unfinished session. What would you like to do?</p>
            <div className="flex flex-col gap-4">
              <button onClick={resumeGame} className="py-6 bg-indigo-500 text-white font-black rounded-3xl shadow-[0_8px_0_rgb(67,56,202)] active:translate-y-2 transition-all text-xl">Resume Test</button>
              <button onClick={() => startMission(subLevel, true)} className="py-6 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-black rounded-3xl border-b-4 border-slate-200 dark:border-slate-950 active:translate-y-2 transition-all text-xl">Start Again</button>
            </div>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div key="playing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-2xl w-full flex flex-col pt-16 z-10 m-auto">
            <div className="flex justify-between items-center mb-8 px-4">
              <span className="font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Question {currentIdx + 1} of {TOTAL_QUESTIONS}</span>
              <div className="flex space-x-1.5">
                {[...Array(TOTAL_QUESTIONS)].map((_, i) => (
                  <div key={i} className={`h-3 w-3 rounded-full transition-all duration-300 ${i < currentIdx ? 'bg-indigo-500' : i === currentIdx ? 'bg-indigo-400 w-8 animate-pulse' : 'bg-slate-300 dark:bg-slate-700'}`} />
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-16 rounded-[3.5rem] shadow-2xl border-b-[16px] border-slate-100 dark:border-slate-800 flex items-center justify-center mb-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-indigo-500/10" />
              <h3 className="text-8xl font-black text-slate-800 dark:text-white tracking-tighter font-mono drop-shadow-sm">
                {questions[currentIdx]?.text}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-6 px-4">
              {questions[currentIdx]?.options.map((opt, i) => (
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  key={i} onClick={() => handleAnswer(opt)}
                  className="bg-white dark:bg-slate-900 border-b-8 border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-700 dark:text-slate-200 font-black text-5xl p-10 rounded-[2.5rem] transition-all active:border-b-0 active:translate-y-2 shadow-sm"
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {gameState === 'round_over' && (
          <motion.div 
            key="round_over"
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}
            className="w-full max-w-xl m-auto z-10"
          >
            <div className="bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-indigo-100 dark:border-slate-800">
              <Award className="w-32 h-32 text-amber-400 mx-auto drop-shadow-lg mb-6" />
              <h2 className="text-5xl font-black text-slate-800 dark:text-white mb-2">Quiz Over!</h2>
              <p className="text-slate-500 dark:text-slate-400 font-bold text-xl mb-8 tracking-widest uppercase">Score: {score} / {TOTAL_QUESTIONS}</p>
              
              <div className="mb-10 font-black text-6xl text-indigo-500 drop-shadow-md bg-indigo-50 dark:bg-indigo-900/20 py-8 rounded-[2.5rem] border-4 border-indigo-100 dark:border-indigo-900/30">
                {(score * 10 * mainLevel) + (timeLeft * mainLevel)} <span className="text-2xl text-indigo-300 tracking-widest">XP</span>
              </div>

              {mistakes.length > 0 && (
                <div className="mb-10 text-left bg-rose-50 dark:bg-rose-900/20 p-8 rounded-[2.5rem] border-4 border-rose-100 dark:border-rose-900/30">
                  <h4 className="text-rose-700 dark:text-rose-400 font-black text-2xl mb-4 flex items-center gap-3"><History size={28}/> Review Session</h4>
                  <ul className="space-y-3">
                    {mistakes.map((m, i) => (
                      <li key={i} className="text-rose-600 dark:text-rose-300 font-bold bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-rose-100 dark:border-rose-900/30 text-sm leading-relaxed">{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                 <button onClick={() => setGameState('menu')} className="flex-1 py-6 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-3xl shadow-[0_8px_0_rgb(67,56,202)] active:shadow-none active:translate-y-2 transition-all text-xl">New Quiz ➔</button>
                 <button onClick={() => navigate('/dashboard')} className="md:w-1/3 py-6 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 font-bold rounded-3xl transition-all uppercase tracking-widest text-sm border-b-4 border-slate-200 dark:border-slate-800 active:translate-y-1 active:border-b-0">Exit</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
