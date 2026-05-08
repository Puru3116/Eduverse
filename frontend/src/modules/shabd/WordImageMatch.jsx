import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../store/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Award, History, Volume2, ArrowRight, RefreshCcw, MousePointer2 } from 'lucide-react';
import axios from 'axios';
import api from '../../utils/api';

const BACKEND_URL = 'http://localhost:5005/api';

const DB = [
  // Animals
  { id: 'a1', theme: 'Animals', word: 'Dog', sentence: 'The friendly animal that barks.', emoji: '🐕', decoyEmoji: '🦊', decoyName: 'Fox' },
  { id: 'a2', theme: 'Animals', word: 'Cow', sentence: 'The farm animal that gives milk.', emoji: '🐄', decoyEmoji: '🐃', decoyName: 'Buffalo' },
  { id: 'a3', theme: 'Animals', word: 'Cat', sentence: 'The small pet that catches mice.', emoji: '🐈', decoyEmoji: '🐆', decoyName: 'Leopard' },
  { id: 'a4', theme: 'Animals', word: 'Hen', sentence: 'The bird that lays eggs.', emoji: '🐔', decoyEmoji: '🦃', decoyName: 'Turkey' },
  { id: 'a5', theme: 'Animals', word: 'Horse', sentence: 'The strong animal we can ride.', emoji: '🐎', decoyEmoji: '🦓', decoyName: 'Zebra' },
  { id: 'a6', theme: 'Animals', word: 'Lion', sentence: 'The king of the jungle with a mane.', emoji: '🦁', decoyEmoji: '🐯', decoyName: 'Tiger' },
  { id: 'a7', theme: 'Animals', word: 'Elephant', sentence: 'A giant animal with a long trunk.', emoji: '🐘', decoyEmoji: '🦏', decoyName: 'Rhino' },
  { id: 'a8', theme: 'Animals', word: 'Rabbit', sentence: 'A small animal that hops and eats carrots.', emoji: '🐇', decoyEmoji: '🐀', decoyName: 'Rat' },
  { id: 'a9', theme: 'Animals', word: 'Monkey', sentence: 'An animal that swings from trees.', emoji: '🐒', decoyEmoji: '🦧', decoyName: 'Orangutan' },
  { id: 'a10', theme: 'Animals', word: 'Giraffe', sentence: 'An animal with a very long neck.', emoji: '🦒', decoyEmoji: '🦌', decoyName: 'Deer' },
  
  // Fruits
  { id: 'f1', theme: 'Fruits', word: 'Apple', sentence: 'A red, crunchy, sweet fruit.', emoji: '🍎', decoyEmoji: '🍅', decoyName: 'Tomato' },
  { id: 'f2', theme: 'Fruits', word: 'Banana', sentence: 'A long yellow fruit monkeys love.', emoji: '🍌', decoyEmoji: '🌙', decoyName: 'Moon' },
  { id: 'f3', theme: 'Fruits', word: 'Grapes', sentence: 'Small green or purple fruits in bunches.', emoji: '🍇', decoyEmoji: '🫐', decoyName: 'Blueberries' },
  { id: 'f4', theme: 'Fruits', word: 'Orange', sentence: 'A round, orange citrus fruit.', emoji: '🍊', decoyEmoji: '🏀', decoyName: 'Basketball' },
  { id: 'f5', theme: 'Fruits', word: 'Watermelon', sentence: 'A massive green fruit red inside.', emoji: '🍉', decoyEmoji: '🥝', decoyName: 'Kiwi' },
  { id: 'f6', theme: 'Fruits', word: 'Mango', sentence: 'The king of fruits, sweet and yellow.', emoji: '🥭', decoyEmoji: '🍑', decoyName: 'Peach' },
  { id: 'f7', theme: 'Fruits', word: 'Strawberry', sentence: 'A small red fruit with seeds outside.', emoji: '🍓', decoyEmoji: '🍒', decoyName: 'Cherry' },
  { id: 'f8', theme: 'Fruits', word: 'Pineapple', sentence: 'A spiky fruit that is yellow inside.', emoji: '🍍', decoyEmoji: '🌽', decoyName: 'Corn' },
  { id: 'f9', theme: 'Fruits', word: 'Pear', sentence: 'A sweet fruit shaped like a bell.', emoji: '🍐', decoyEmoji: '🥑', decoyName: 'Avocado' },
  { id: 'f10', theme: 'Fruits', word: 'Coconut', sentence: 'A hard brown fruit with milk inside.', emoji: '🥥', decoyEmoji: '🥔', decoyName: 'Potato' },

  // School
  { id: 's1', theme: 'School', word: 'Book', sentence: 'We open this to read stories.', emoji: '📚', decoyEmoji: '📦', decoyName: 'Box' },
  { id: 's2', theme: 'School', word: 'Pencil', sentence: 'We use this to write on paper.', emoji: '✏️', decoyEmoji: '🪄', decoyName: 'Wand' },
  { id: 's3', theme: 'School', word: 'Bag', sentence: 'We carry our notebooks inside this.', emoji: '🎒', decoyEmoji: '👜', decoyName: 'Handbag' },
  { id: 's4', theme: 'School', word: 'Bus', sentence: 'The large vehicle for school trips.', emoji: '🚌', decoyEmoji: '🚐', decoyName: 'Van' },
  { id: 's5', theme: 'School', word: 'Chair', sentence: 'Something we sit on in class.', emoji: '🪑', decoyEmoji: '🪜', decoyName: 'Ladder' },
  { id: 's6', theme: 'School', word: 'Clock', sentence: 'It tells us the time for lunch.', emoji: '⏰', decoyEmoji: '⏲️', decoyName: 'Timer' },
  { id: 's7', theme: 'School', word: 'Crayons', sentence: 'Used for coloring beautiful pictures.', emoji: '🖍️', decoyEmoji: '🧪', decoyName: 'Test Tube' },
  { id: 's8', theme: 'School', word: 'Bell', sentence: 'It rings when school is over.', emoji: '🔔', decoyEmoji: '🔕', decoyName: 'Silent' },
  { id: 's9', theme: 'School', word: 'Globe', sentence: 'A round map of the whole world.', emoji: '🌍', decoyEmoji: '⚽', decoyName: 'Ball' },
  { id: 's10', theme: 'School', word: 'Paper', sentence: 'White sheets we write our lessons on.', emoji: '📄', decoyEmoji: '✉️', decoyName: 'Letter' },

  // Village Life
  { id: 'v1', theme: 'Village Life', word: 'Tractor', sentence: 'The machine used for farming.', emoji: '🚜', decoyEmoji: '🚙', decoyName: 'Car' },
  { id: 'v2', theme: 'Village Life', word: 'Well', sentence: 'A deep hole for drinking water.', emoji: '🪣', decoyEmoji: '🗑️', decoyName: 'Trash Can' },
  { id: 'v3', theme: 'Village Life', word: 'Hut', sentence: 'A small house with a thatched roof.', emoji: '🛖', decoyEmoji: '⛺', decoyName: 'Tent' },
  { id: 'v4', theme: 'Village Life', word: 'Tree', sentence: 'A tall plant that gives shade.', emoji: '🌳', decoyEmoji: '🥦', decoyName: 'Broccoli' },
  { id: 'v5', theme: 'Village Life', word: 'Plow', sentence: 'Tool used to prepare soil for seeds.', emoji: '⛏️', decoyEmoji: '🔨', decoyName: 'Hammer' },
  { id: 'v6', theme: 'Village Life', word: 'Farmer', sentence: 'A person who grows food for us.', emoji: '👨‍🌾', decoyEmoji: '👨‍🍳', decoyName: 'Chef' },
  { id: 'v7', theme: 'Village Life', word: 'Cart', sentence: 'A vehicle pulled by animals.', emoji: '🛒', decoyEmoji: '🚲', decoyName: 'Bike' },
  { id: 'v8', theme: 'Village Life', word: 'Pot', sentence: 'Clay container for storing grain.', emoji: '🏺', decoyEmoji: '☕', decoyName: 'Cup' },
  { id: 'v9', theme: 'Village Life', word: 'Seed', sentence: 'Small thing that grows into a plant.', emoji: '🌱', decoyEmoji: '🍂', decoyName: 'Leaf' },
  { id: 'v10', theme: 'Village Life', word: 'Path', sentence: 'A narrow road through the fields.', emoji: '🛤️', decoyEmoji: '🪜', decoyName: 'Ladder' }
];

const playTone = (type) => {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  const ctx = new AudioContextClass();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  if (type === 'pop') {
    osc.type = 'sine'; osc.frequency.setValueAtTime(600, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.5, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    osc.start(); osc.stop(ctx.currentTime + 0.1);
  } else if (type === 'error') {
    osc.type = 'sawtooth'; osc.frequency.setValueAtTime(200, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.5, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    osc.start(); osc.stop(ctx.currentTime + 0.2);
  } else if (type === 'success') {
    osc.type = 'sine'; osc.frequency.setValueAtTime(400, ctx.currentTime); osc.frequency.setValueAtTime(600, ctx.currentTime + 0.1); osc.frequency.setValueAtTime(1000, ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.5, ctx.currentTime); gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
    osc.start(); osc.stop(ctx.currentTime + 0.4);
  }
};

export default function WordImageMatch() {
  const navigate = useNavigate();
  const { student } = useAppContext();
  const [gameState, setGameState] = useState('menu');
  const [mainLevel, setMainLevel] = useState(1);
  const [subLevel, setSubLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentRound, setCurrentRound] = useState(0);
  const [mascotText, setMascotText] = useState("Match the words quickly!");
  const [currentTheme, setCurrentTheme] = useState("");
  const [textItems, setTextItems] = useState([]);
  const [imgItems, setImgItems] = useState([]);
  const [selectedText, setSelectedText] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [matchedIds, setMatchedIds] = useState([]);
  const [mistakes, setMistakes] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [unlockedProgress, setUnlockedProgress] = useState({ main: 1, sub: 1 });

  // Persistence Key
  const saveKey = student ? `eduverse_resume_${student.id || student._id}_word-match_${mainLevel}_${subLevel}` : null;

  // Save state whenever it changes
  useEffect(() => {
    if (gameState === 'playing' && saveKey) {
      localStorage.setItem(saveKey, JSON.stringify({ currentRound, score, mistakes, startTime }));
    }
  }, [currentRound, score, mistakes, gameState, saveKey]);

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
      const gameProgress = res.data.filter(p => p.gameId === 'word-match');
      
      console.log(`[WordMatch] Raw Progress:`, res.data);
      console.log(`[WordMatch] Filtered:`, gameProgress);

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
        
        console.log(`[WordMatch] Unlocking: ${nextMain}.${nextSub}`);
        setUnlockedProgress({ main: nextMain, sub: nextSub });
      }
    } catch (err) {
      console.error(`[WordMatch] Fetch Error:`, err);
    }
  };

  const isLevelLocked = (mLvl, sLvl) => {
    if (mLvl < unlockedProgress.main) return false;
    if (mLvl === unlockedProgress.main && sLvl <= unlockedProgress.sub) return false;
    return true;
  };

  const generateRound = useCallback((mLvl, sLvl) => {
    const themes = ['Animals', 'Fruits', 'School', 'Village Life'];
    const theme = themes[((mLvl - 1) + (sLvl - 1)) % themes.length];
    setCurrentTheme(theme);
    
    const themeDB = DB.filter(i => i.theme === theme);
    const shuffled = [...themeDB].sort(() => 0.5 - Math.random());
    
    let wordCount = 3, decoyCount = 1, time = 30;
    if (mLvl === 2) { wordCount = 4; decoyCount = 2; time = 25; }
    if (mLvl === 3) { wordCount = 4; decoyCount = 2; time = 40; }
    if (mLvl === 4) { wordCount = 5; decoyCount = 3; time = 20; }

    const pool = shuffled.slice(0, wordCount);
    setTextItems(pool.map(i => ({ id: i.id, text: mLvl === 3 ? i.sentence : i.word })).sort(() => 0.5 - Math.random()));
    const images = pool.map(i => ({ targetId: i.id, emoji: i.emoji, isDecoy: false, name: i.word }));
    const decoys = pool.slice(0, decoyCount).map((i, idx) => ({ targetId: `d-${idx}`, emoji: i.decoyEmoji, isDecoy: true, name: i.decoyName }));
    
    setImgItems([...images, ...decoys].sort(() => 0.5 - Math.random()));
    setMatchedIds([]); setSelectedText(null); setSelectedImg(null); setTimeLeft(time);
    setMascotText(mLvl === 4 ? "FAST! SPEED MATCH!" : mLvl === 3 ? "Read carefully!" : "Match them all!");
  }, []);

  const selectMainLevel = (lvl) => {
    setMainLevel(lvl);
    setGameState('sub_selection');
  };

  const startMission = (sLvl, forceNew = false) => {
    setSubLevel(sLvl);
    const key = `eduverse_resume_${student.id || student._id}_word-match_${mainLevel}_${sLvl}`;
    const saved = localStorage.getItem(key);

    if (saved && !forceNew) {
      setGameState('resume_prompt');
      return;
    }

    if (forceNew) localStorage.removeItem(key);

    setCurrentRound(1);
    setScore(0);
    setMistakes([]);
    setStartTime(Date.now());
    generateRound(mainLevel, sLvl);
    setGameState('playing');
  };

  const resumeGame = () => {
    const saved = JSON.parse(localStorage.getItem(saveKey));
    if (saved) {
      setCurrentRound(saved.currentRound || 1);
      setScore(saved.score || 0);
      setMistakes(saved.mistakes || []);
      setStartTime(saved.startTime || Date.now());
      generateRound(mainLevel, subLevel);
      setGameState('playing');
    }
  };

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (gameState === 'playing' && timeLeft <= 0) {
      playTone('error');
      setMistakes(p => [...p, "Time ran out!"]);
      endRound();
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const speakText = (text) => {
    if (mainLevel === 3 && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-IN'; u.rate = 0.9;
      window.speechSynthesis.speak(u);
    }
  };

  const evaluateMatch = (textItem, imgItem) => {
    if (imgItem.isDecoy) {
      playTone('error');
      setMascotText(`No! That is a ${imgItem.name}!`);
      setMistakes(p => [...p, `Mistook ${textItem.text} for ${imgItem.name}`]);
      if (mainLevel === 4) setTimeLeft(t => Math.max(0, t - 5));
      setSelectedText(null); setSelectedImg(null);
      return;
    }
    if (textItem.id === imgItem.targetId) {
      playTone('pop');
      const newMatched = [...matchedIds, textItem.id];
      setMatchedIds(newMatched);
      setScore(s => s + 50);
      setMascotText("Correct! Keep going!");
      
      if (newMatched.length === textItems.length) {
        if (currentRound < 5) {
          setTimeout(() => {
            setCurrentRound(r => r + 1);
            generateRound(mainLevel, subLevel);
          }, 800);
        } else {
          setTimeout(() => {
            playTone('success');
            setScore(s => s + (timeLeft * 10));
            finishLevel();
          }, 500);
        }
      }
    } else {
      playTone('error');
      setMascotText("Not a match! Try again.");
      setMistakes(p => [...p, `Wrong match for ${textItem.text}`]);
    }
    setSelectedText(null); setSelectedImg(null);
  };

  const finishLevel = async () => {
    setGameState('round_over');
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    if (student) {
      try {
        await api.post('/progress', {
          studentId: student.id || student._id,
          moduleName: 'Shabd Quest',
          gameId: 'word-match',
          levelNumber: mainLevel,
          subLevel: subLevel,
          score: score * 10,
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
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-500 rounded-full blur-3xl" />
      </div>

      <div className="absolute top-6 w-full max-w-4xl px-6 flex justify-between items-center z-20">
        <button onClick={() => gameState === 'playing' || gameState === 'sub_selection' ? setGameState('menu') : navigate('/dashboard')} className="bg-white dark:bg-slate-900 p-4 rounded-full shadow-md border-b-4 border-slate-200 dark:border-slate-800 active:scale-95 transition-transform">
          <ArrowLeft size={24} className="text-slate-600 dark:text-slate-400" />
        </button>
        {gameState === 'playing' && (
          <div className="bg-white dark:bg-slate-900 px-6 py-2 rounded-full shadow-md border-b-4 border-slate-200 dark:border-slate-800 flex items-center space-x-6">
            <span className="font-black text-indigo-600 dark:text-indigo-400 uppercase text-xs">Level {mainLevel}.{subLevel}</span>
            <div className={`flex items-center gap-2 font-black text-xl ${timeLeft <= 5 ? 'text-rose-500 animate-pulse' : 'text-slate-700 dark:text-slate-200'}`}>
              <Clock size={20} /> {timeLeft}s
            </div>
            <span className="font-black text-indigo-700 dark:text-indigo-300 text-xl">{score} XP</span>
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
            <div className="w-32 h-32 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white dark:border-slate-800"><Volume2 size={64} className="text-indigo-500 dark:text-indigo-400" /></div>
            <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2">Word Matcher</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-10">Choose a difficulty to start!</p>
            <div className="grid grid-cols-1 gap-4 text-left">
              {[
                { id: 1, title: 'Beginner', desc: 'Simple Words', color: 'bg-emerald-500 shadow-[0_8px_0_rgb(16,185,129)]' },
                { id: 2, title: 'Intermediate', desc: 'Mixed Vocabulary', color: 'bg-blue-500 shadow-[0_8px_0_rgb(59,130,246)]' },
                { id: 3, title: 'Master', desc: 'Full Sentences', color: 'bg-violet-500 shadow-[0_8px_0_rgb(139,92,246)]' },
                { id: 4, title: 'Legend', desc: 'Expert Speed Match', color: 'bg-rose-500 shadow-[0_8px_0_rgb(244,63,94)]' }
              ].map(l => {
                const locked = l.id > unlockedProgress.main;
                return (
                  <button key={l.id} disabled={locked} onClick={() => selectMainLevel(l.id)} className={`${locked ? 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed opacity-60' : l.color} text-white p-6 rounded-3xl flex items-center justify-between transition-all relative overflow-hidden active:translate-y-2 active:shadow-none`}>
                    <div><h4 className="text-2xl font-black">{l.title}</h4><p className="text-sm font-bold opacity-80">{l.desc}</p></div>
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
                    {!locked && <ArrowRight className="text-indigo-400 group-hover:translate-x-2 transition-transform" />}
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
          <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 w-full max-w-5xl flex flex-col items-center my-auto z-10 pt-12">
            <div className="bg-white dark:bg-slate-900 px-8 py-5 rounded-[2rem] shadow-lg border-b-[8px] border-indigo-100 dark:border-slate-800 w-full mb-8 flex items-center gap-6">
              <span className="text-6xl animate-bounce">🦜</span>
              <div className="flex-1">
                <p className="text-indigo-400 font-black text-xs uppercase mb-1">Theme: {currentTheme}</p>
                <p className="text-slate-700 dark:text-slate-200 font-black text-2xl leading-tight">{mascotText}</p>
              </div>
            </div>
            
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="flex flex-col space-y-4">
                {textItems.map(item => {
                  const isMatched = matchedIds.includes(item.id);
                  const isSelected = selectedText?.id === item.id;
                  return (
                    <button key={item.id} onClick={() => { if(isMatched) return; speakText(item.text); if(selectedImg) evaluateMatch(item, selectedImg); else setSelectedText(item); }} className={`p-8 rounded-[2rem] border-b-[8px] transition-all font-black text-2xl flex items-center justify-center relative overflow-hidden ${isMatched ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 opacity-50' : isSelected ? 'bg-indigo-500 text-white border-indigo-700 translate-y-2 border-b-0' : 'bg-white dark:bg-slate-900 border-slate-200 text-slate-700 dark:text-slate-200'}`}>
                      {mainLevel === 3 && !isMatched && <Volume2 className="absolute right-4 top-4 opacity-30" size={18} />}
                      <span className={mainLevel === 3 ? 'text-lg text-left w-full' : ''}>{item.text}</span>
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-row flex-wrap gap-4 justify-center items-start content-start">
                {imgItems.map((item, idx) => {
                  const isMatched = matchedIds.includes(item.targetId);
                  const isSelected = selectedImg?.targetId === item.targetId && selectedImg?.emoji === item.emoji;
                  return (
                    <button key={idx} onClick={() => { if(isMatched) return; if(selectedText) evaluateMatch(selectedText, item); else setSelectedImg(item); }} className={`w-32 h-32 rounded-[2.5rem] border-b-[8px] flex items-center justify-center text-6xl transition-all ${isMatched ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 opacity-30' : isSelected ? 'bg-pink-500 text-white border-pink-700 translate-y-2 border-b-0' : 'bg-white dark:bg-slate-900 border-slate-200 shadow-sm'}`}>
                      {item.emoji}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {gameState === 'round_over' && (
          <motion.div key="round_over" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl border-b-[16px] border-slate-100 dark:border-slate-800 max-w-xl w-full z-10 m-auto text-center">
            <Award className="w-32 h-32 text-indigo-500 mx-auto mb-6" />
            <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2">Round Finished!</h2>
            <div className="mb-8 font-black text-6xl text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 py-8 rounded-[2rem] border-4 border-indigo-100 dark:border-indigo-900/30">{score} <span className="text-2xl">XP</span></div>
            {mistakes.length > 0 && (
              <div className="mb-8 text-left bg-rose-50 dark:bg-rose-900/20 p-6 rounded-3xl border-2 border-rose-100 dark:border-rose-900/30">
                <h4 className="text-rose-700 dark:text-rose-400 font-black mb-2 flex items-center gap-2"><History size={20}/> Quick Review</h4>
                <ul className="text-sm font-bold text-rose-600 dark:text-rose-300 space-y-1">{mistakes.slice(0, 3).map((m, i) => <li key={i}>• {m}</li>)}</ul>
              </div>
            )}
            <div className="flex flex-col gap-4">
              <button onClick={() => setGameState('menu')} className="py-6 bg-indigo-500 text-white font-black rounded-3xl shadow-[0_8px_0_rgb(67,56,202)] active:translate-y-2 transition-all text-xl">Play Another</button>
              <button onClick={() => navigate('/dashboard')} className="py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors">Return to Map</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
