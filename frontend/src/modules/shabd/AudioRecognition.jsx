import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../store/AppContext';
import { ArrowLeft, Volume2, Award, ArrowRight, History, Play, RefreshCcw, MousePointer2 } from 'lucide-react';
import axios from 'axios';
import api from '../../utils/api';

const BACKEND_URL = 'http://localhost:5005/api';

const BEGINNER_VOCAB = ["Apple", "Water", "School", "Mother", "Father", "Teacher", "Friend", "Happy", "Play", "Eat", "Drink", "Sleep", "Sit", "Stand", "Walk", "Run", "Jump", "Dog", "Cat", "Bird", "Cow", "Hen", "Pig", "Sun", "Moon"];
const INTERMEDIATE_VOCAB = ["Beautiful", "Tomorrow", "Elephant", "Mountain", "Hospital", "Computer", "Umbrella", "Breakfast", "Bicycle", "Butterfly", "Garden", "Kitchen", "Village", "Market", "Morning", "Evening", "Holiday", "Question", "Answer", "Together"];
const MASTER_SENTENCES = [
  "Red Apple", "Play outside", "Drink clean water", "Wash your hands", 
  "Go to sleep", "Read a book", "Sunny bright day", "Eat fresh vegetables",
  "Close the door", "Open your eyes", "Walk to school", "Help your friends",
  "Brush your teeth", "Plant a tree", "Listen to music", "Draw a picture"
];
const LEGEND_SENTENCES = [
  "Walking through the green forest", "Farmers are working in fields", "Always speak the truth", "Keep your village clean",
  "Drinking boiled water is safe", "Washing hands with soap kills germs", "Birds are singing in the morning", "Stars shine bright at night",
  "Respect your elders and teachers", "Reading books makes us smart", "Fruits give us energy to play", "Sleep early and wake up early"
];

export default function AudioRecognition() {
  const navigate = useNavigate();
  const { student } = useAppContext();
  
  const [mainLevel, setMainLevel] = useState(1);
  const [subLevel, setSubLevel] = useState(1);
  const [gameState, setGameState] = useState('menu'); // 'menu', 'sub_selection', 'playing', 'round_over'
  const [currentWord, setCurrentWord] = useState('');
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [feedback, setFeedback] = useState(null); // 'correct' or 'wrong'
  const [mistakes, setMistakes] = useState([]);
  const [unlockedProgress, setUnlockedProgress] = useState({ main: 1, sub: 1 });
  
  // Persistence Key
  const saveKey = student ? `eduverse_resume_${student.id || student._id}_audio-recognition_${mainLevel}_${subLevel}` : null;

  // Save state whenever it changes
  useEffect(() => {
    if (gameState === 'playing' && saveKey) {
      localStorage.setItem(saveKey, JSON.stringify({ round, score, mistakes, startTime, currentWord, options }));
    }
  }, [round, score, mistakes, gameState, saveKey, startTime, currentWord, options]);

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
      const gameProgress = res.data.filter(p => p.gameId === 'audio-recognition');
      
      console.log(`[AudioRec] Raw Progress:`, res.data);
      console.log(`[AudioRec] Filtered:`, gameProgress);

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
        
        console.log(`[AudioRec] Unlocking: ${nextMain}.${nextSub}`);
        setUnlockedProgress({ main: nextMain, sub: nextSub });
      }
    } catch (err) {
      console.error(`[AudioRec] Fetch Error:`, err);
    }
  };

  const isLevelLocked = (mLvl, sLvl) => {
    if (mLvl < unlockedProgress.main) return false;
    if (mLvl === unlockedProgress.main && sLvl <= unlockedProgress.sub) return false;
    return true;
  };

  const MAX_ROUNDS = 10;

  useEffect(() => {
    // Only auto-start round 1 if it's NOT a resume
    if (gameState === 'playing' && round === 1 && !currentWord) {
      setScore(0);
      setMistakes([]);
      setStartTime(Date.now());
      startRound(1);
    }
  }, [gameState]);

  const startRound = (r) => {
    setFeedback(null);
    let bank = BEGINNER_VOCAB;
    if (mainLevel === 2) bank = INTERMEDIATE_VOCAB;
    if (mainLevel === 3) bank = MASTER_SENTENCES;
    if (mainLevel === 4) bank = LEGEND_SENTENCES;

    // Use subLevel to seed randomization if needed, but for now simple random
    const word = bank[Math.floor(Math.random() * bank.length)];
    let opts = [word];
    
    while(opts.length < 4) {
      const w = bank[Math.floor(Math.random() * bank.length)];
      if(!opts.includes(w)) opts.push(w);
    }
    
    setCurrentWord(word);
    setOptions(opts.sort(() => 0.5 - Math.random()));
    
    setTimeout(() => speak(word), 800);
  };

  const selectMainLevel = (lvl) => {
    setMainLevel(lvl);
    setGameState('sub_selection');
  };

  const startMission = (sLvl, forceNew = false) => {
    setSubLevel(sLvl);
    const key = `eduverse_resume_${student.id || student._id}_audio-recognition_${mainLevel}_${sLvl}`;
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
    startRound(1);
    setGameState('playing');
  };

  const resumeGame = () => {
    const saved = JSON.parse(localStorage.getItem(saveKey));
    if (saved) {
      setRound(saved.round || 1);
      setScore(saved.score || 0);
      setMistakes(saved.mistakes || []);
      setStartTime(saved.startTime || Date.now());
      setCurrentWord(saved.currentWord || '');
      setOptions(saved.options || []);
      setGameState('playing');
    }
  };

  const speak = (text) => {
    if (!window.speechSynthesis || gameState !== 'playing') return;
    window.speechSynthesis.cancel();
    
    setIsPlaying(true);
    const msg = new SpeechSynthesisUtterance(text);
    
    // Select the best available voice
    const voices = window.speechSynthesis.getVoices();
    // Try to find a clear English voice (prefer Google or premium voices)
    const preferredVoice = voices.find(v => v.name.includes('Google') && v.lang.startsWith('en')) || 
                           voices.find(v => v.lang.startsWith('en'));
    
    if (preferredVoice) msg.voice = preferredVoice;
    
    msg.lang = 'en-IN'; 
    msg.volume = 1; // Max volume
    msg.pitch = 1.1; // Slightly higher pitch for better clarity
    msg.rate = mainLevel >= 3 ? 0.95 : 0.9; // Slightly faster for less robotic sound
    
    msg.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(msg);
  };

  const resetProgress = async () => {
    if (!student || !window.confirm("Are you sure you want to reset all progress for this module? This cannot be undone.")) return;
    try {
      const studentId = student.id || student._id;
      await api.delete(`/progress/${studentId}/audio-recognition`);
      setUnlockedProgress({ main: 1, sub: 1 });
      setGameState('menu');
      alert("Progress reset successfully!");
    } catch (err) {
      console.error("Reset Error:", err);
      alert("Failed to reset progress.");
    }
  };

  const handleSelect = (opt) => {
    if (feedback || gameState !== 'playing') return;
    
    const isCorrect = opt === currentWord;
    setFeedback(isCorrect ? 'correct' : 'wrong');
    
    if (isCorrect) {
      setScore(s => s + 1);
    } else {
      setMistakes(prev => [...prev, `You heard something else, but it was "${currentWord}".`]);
    }

    setTimeout(() => {
      if (round < MAX_ROUNDS) {
        setRound(r => r + 1);
        startRound(round + 1);
      } else {
        finishGame(score + (isCorrect ? 1 : 0));
      }
    }, 1500);
  };

  const finishGame = async (finalScore) => {
    setGameState('round_over');
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    if (student) {
      try {
        await api.post('/progress', {
          studentId: student.id || student._id,
          moduleName: 'Shabd Quest',
          gameId: 'audio-recognition',
          levelNumber: mainLevel,
          subLevel: subLevel,
          score: finalScore * 10,
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
        <div className="absolute top-10 left-10 w-32 h-32 bg-fuchsia-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-indigo-500 rounded-full blur-3xl" />
      </div>

      <div className="absolute top-6 w-full max-w-4xl px-6 flex justify-between items-center z-20">
        <button 
          onClick={() => gameState === 'playing' || gameState === 'round_over' ? setGameState('menu') : navigate('/dashboard')} 
          className="bg-white dark:bg-slate-900 p-4 rounded-full shadow-md border-b-4 border-slate-200 dark:border-slate-800 active:scale-95 transition-transform"
        >
          <ArrowLeft size={24} className="text-slate-600 dark:text-slate-400" />
        </button>
        {gameState === 'playing' && (
          <div className="bg-white dark:bg-slate-900 px-6 py-2 rounded-full shadow-md border-b-4 border-slate-200 dark:border-slate-800 flex items-center space-x-3">
             <span className="font-black text-slate-700 dark:text-slate-200 uppercase text-xs">Mission {mainLevel}.{subLevel}</span>
             <span className="font-black text-slate-700 dark:text-slate-200 uppercase text-xs">{score * 10} XP</span>
             <button 
                onClick={() => startMission(subLevel, true)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-fuchsia-500"
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
            className="w-full max-w-xl bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-fuchsia-100 dark:border-slate-800 m-auto z-10 relative"
          >
            <button 
              onClick={resetProgress}
              className="absolute top-6 right-6 p-3 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-2xl border-2 border-rose-100 dark:border-rose-900/30 hover:bg-rose-100 transition-all group"
              title="Reset Module Progress"
            >
              <RefreshCcw size={20} className="group-active:rotate-180 transition-transform duration-500" />
            </button>
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="w-32 h-32 bg-fuchsia-100 dark:bg-fuchsia-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border-4 border-white dark:border-slate-800">
              <Volume2 size={64} className="text-fuchsia-500 dark:text-fuchsia-400" />
            </motion.div>
            <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2">Audio Quest</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium mb-10">Listen carefully and identify the sound!</p>
            
            <div className="grid grid-cols-1 gap-4">
               {[
                 { id: 1, name: 'Beginner', desc: 'Simple Vocabulary', color: 'bg-emerald-500 shadow-[0_8px_0_rgb(10,140,105)]' },
                 { id: 2, name: 'Intermediate', desc: 'Action Words', color: 'bg-fuchsia-500 shadow-[0_8px_0_rgb(175,50,190)]' },
                 { id: 3, name: 'Master', desc: 'Short Phrases', color: 'bg-violet-500 shadow-[0_8px_0_rgb(100,60,200)]' },
                 { id: 4, name: 'Legend', desc: 'Complex Sentences', color: 'bg-rose-500 shadow-[0_8px_0_rgb(190,40,60)]' }
               ].map(l => {
                const locked = l.id > unlockedProgress.main;
                return (
                  <button key={l.id} disabled={locked} onClick={() => selectMainLevel(l.id)} className={`${locked ? 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed opacity-60' : l.color} text-white p-6 rounded-3xl flex items-center justify-between group active:translate-y-2 active:shadow-none transition-all relative overflow-hidden`}>
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
                        <span className="text-[8px] font-black uppercase tracking-tighter">Click to Learn</span>
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
            className="w-full max-w-xl bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-fuchsia-100 dark:border-slate-800 m-auto z-10"
          >
            <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2">Select Mission</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium mb-10">Level {mainLevel} Missions</p>
            <div className="grid grid-cols-1 gap-4 text-left">
              {[1, 2, 3].map(sLvl => {
                const locked = isLevelLocked(mainLevel, sLvl);
                return (
                  <button key={sLvl} disabled={locked} onClick={() => startMission(sLvl)} className={`${locked ? 'bg-slate-50 dark:bg-slate-800/50 cursor-not-allowed opacity-50' : 'bg-white dark:bg-slate-800 hover:border-fuchsia-500'} border-b-8 border-slate-200 dark:border-slate-950 p-6 rounded-3xl flex items-center justify-between group transition-all`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${locked ? 'bg-slate-200 dark:bg-slate-700' : 'bg-fuchsia-500'} text-white rounded-2xl flex items-center justify-center font-black`}>
                        {locked ? <Award size={16} /> : `${mainLevel}.${sLvl}`}
                      </div>
                      <span className={`text-2xl font-black ${locked ? 'text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>Mission {sLvl}</span>
                    </div>
                    {!locked && <ArrowRight className="text-fuchsia-400 group-hover:translate-x-2 transition-transform" />}
                  </button>
                );
              })}
              <button onClick={() => setGameState('menu')} className="mt-4 text-slate-400 font-bold hover:text-fuchsia-500 transition-colors text-center w-full">
                &larr; Back to Levels
              </button>
            </div>
          </motion.div>
        )}

        {gameState === 'resume_prompt' && (
          <motion.div key="resume" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full max-w-md bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-fuchsia-100 dark:border-slate-800 m-auto z-10">
            <div className="w-24 h-24 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6"><History size={48} className="text-amber-500" /></div>
            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">Welcome Back!</h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold mb-10">You have an unfinished session. What would you like to do?</p>
            <div className="flex flex-col gap-4">
              <button onClick={resumeGame} className="py-6 bg-fuchsia-500 text-white font-black rounded-3xl shadow-[0_8px_0_rgb(162,28,175)] active:translate-y-2 transition-all text-xl">Resume Test</button>
              <button onClick={() => startMission(subLevel, true)} className="py-6 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-black rounded-3xl border-b-4 border-slate-200 dark:border-slate-950 active:translate-y-2 transition-all text-xl">Start Again</button>
            </div>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <motion.div key="playing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-3xl w-full flex flex-col pt-16 z-10 m-auto text-center">
            <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-12">Click to hear the sound!</h2>
            
            <motion.button
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => speak(currentWord)}
              className={`w-48 h-48 mx-auto rounded-[4rem] flex flex-col items-center justify-center shadow-2xl mb-16 border-b-[12px] transition-all 
                ${isPlaying 
                  ? 'bg-fuchsia-400 border-fuchsia-500 border-b-[4px] translate-y-[8px] shadow-none' 
                  : 'bg-fuchsia-600 border-fuchsia-800 dark:border-fuchsia-900 hover:bg-fuchsia-500'}`}
            >
              <div className="relative">
                <Volume2 size={80} className="text-white drop-shadow-lg" />
                {isPlaying && (
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1.5, opacity: 0 }} 
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="absolute inset-0 bg-white/30 rounded-full"
                  />
                )}
              </div>
            </motion.button>

            <div className={`grid gap-6 ${mainLevel >= 3 ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {options.map((opt, i) => (
                <motion.button
                  whileHover={!feedback ? { scale: 1.02 } : {}} whileTap={!feedback ? { scale: 0.98 } : {}}
                  key={i} onClick={() => handleSelect(opt)}
                  disabled={!!feedback}
                  className={`py-8 px-6 rounded-[2.5rem] text-3xl font-black transition-all border-b-8 shadow-sm
                    ${feedback?.option === opt ? 
                      (feedback === 'correct' ? 'bg-emerald-500 text-white border-emerald-700' : 'bg-rose-500 text-white border-rose-700') 
                      : (feedback === 'wrong' && opt === currentWord) ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 border-emerald-200'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-fuchsia-400 hover:bg-fuchsia-50 dark:hover:bg-fuchsia-900/20'}`}
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
            <div className="bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl text-center border-b-[16px] border-fuchsia-100 dark:border-slate-800">
              <Award className="w-32 h-32 text-amber-400 mx-auto drop-shadow-lg mb-6" />
              <h2 className="text-5xl font-black text-slate-800 dark:text-white mb-2">Great Listening!</h2>
              <p className="text-slate-500 dark:text-slate-400 font-bold text-xl mb-8 tracking-widest uppercase">Score: {score} / {MAX_ROUNDS}</p>
              
              <div className="mb-10 font-black text-6xl text-fuchsia-500 drop-shadow-md bg-fuchsia-50 dark:bg-fuchsia-900/20 py-8 rounded-[2.5rem] border-4 border-fuchsia-100 dark:border-fuchsia-900/30">
                {score * 20} <span className="text-2xl text-fuchsia-300 tracking-widest">XP</span>
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
                 <button onClick={() => setGameState('menu')} className="flex-1 py-6 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-black rounded-3xl shadow-[0_8px_0_rgb(162,28,175)] active:shadow-none active:translate-y-2 transition-all text-xl">Play Again ➔</button>
                 <button onClick={() => navigate('/dashboard')} className="md:w-1/3 py-6 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 font-bold rounded-3xl transition-all uppercase tracking-widest text-sm border-b-4 border-slate-200 dark:border-slate-800 active:translate-y-1 active:border-b-0">Exit</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
