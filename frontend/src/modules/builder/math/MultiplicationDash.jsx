import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../../../store/AppContext';
import { 
  Trophy, 
  Timer, 
  CheckCircle2, 
  XCircle, 
  ArrowRight,
  Lightbulb,
  Play
} from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5005/api';

export default function MultiplicationDash() {
  const { student } = useAppContext();
  const navigate = useNavigate();
  
  // Game States: 'intro' | 'learn' | 'play' | 'result'
  const [gameState, setGameState] = useState('intro');
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [question, setQuestion] = useState({ a: 0, b: 0, answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong'
  const [learnedCount, setLearnedCount] = useState(0);
  
  const timerRef = useRef(null);

  // Generate question based on level difficulty
  const generateQuestion = () => {
    let a, b;
    if (level === 1) { // 1-5 tables
      a = Math.floor(Math.random() * 5) + 1;
      b = Math.floor(Math.random() * 10) + 1;
    } else if (level === 2) { // 1-10 tables
      a = Math.floor(Math.random() * 10) + 1;
      b = Math.floor(Math.random() * 10) + 1;
    } else { // Tricky (11-15)
      a = Math.floor(Math.random() * 5) + 11;
      b = Math.floor(Math.random() * 10) + 1;
    }
    setQuestion({ a, b, answer: a * b });
    setUserAnswer('');
    setFeedback(null);
  };

  const startPlay = () => {
    setGameState('play');
    setTimeLeft(30);
    setScore(0);
    generateQuestion();
  };

  useEffect(() => {
    if (gameState === 'play' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timerRef.current);
      setGameState('result');
      finishGame();
    }
    return () => clearInterval(timerRef.current);
  }, [gameState, timeLeft]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback !== null) return;

    if (parseInt(userAnswer) === question.answer) {
      setScore(s => s + 10);
      setFeedback('correct');
      setTimeout(generateQuestion, 600);
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        setFeedback(null);
        setUserAnswer('');
      }, 800);
    }
  };

  const finishGame = async () => {
    if (!student?.id || student.id === 'dummy_id_123') return;
    try {
      await axios.post(`${BACKEND_URL}/progress`, {
        studentId: student.id,
        moduleName: 'math',
        gameId: 'mult-dash',
        levelNumber: level,
        score: score,
        timeSpent: 30
      });
    } catch (err) {
      console.error("Failed to save progress", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 p-6 flex flex-col items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        
        {/* State 1: Intro */}
        {gameState === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}
            className="bg-white p-12 rounded-[3rem] shadow-2xl border-b-[16px] border-slate-100 max-w-2xl w-full text-center"
          >
            <div className="w-24 h-24 bg-indigo-500 rounded-[2rem] flex items-center justify-center text-5xl text-white mx-auto mb-8 shadow-lg shadow-indigo-200">
              ✖️
            </div>
            <h1 className="text-4xl font-black mb-4">Multiplication Dash</h1>
            <p className="text-xl text-slate-500 font-bold mb-10 leading-relaxed">
              Master your tables with speed! <br/> 
              <span className="text-indigo-600">Learn</span> the trick, then <span className="text-indigo-600">Play</span> the dash.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
               <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-100">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Phase 1</p>
                  <p className="font-black text-lg flex items-center justify-center gap-2">📖 Visual Learning</p>
               </div>
               <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-100">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Phase 2</p>
                  <p className="font-black text-lg flex items-center justify-center gap-2">⚡ Speed Challenge</p>
               </div>
            </div>

            <button 
              onClick={() => setGameState('learn')}
              className="w-full bg-indigo-600 text-white font-black py-6 rounded-[2rem] text-2xl shadow-[0_8px_0_rgb(55,48,163)] active:translate-y-2 active:shadow-none transition-all flex items-center justify-center gap-3"
            >
              Start Lesson <Lightbulb size={28} />
            </button>
          </motion.div>
        )}

        {/* State 2: Learn */}
        {gameState === 'learn' && (
          <motion.div 
            key="learn"
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}
            className="bg-white p-12 rounded-[3.5rem] shadow-2xl border-b-[20px] border-slate-100 max-w-4xl w-full"
          >
            <div className="flex items-center justify-between mb-12">
               <span className="bg-indigo-100 text-indigo-600 font-black px-6 py-2 rounded-full uppercase tracking-widest text-sm">Visual Lesson</span>
               <div className="text-4xl">🤖</div>
            </div>

            <div className="text-center mb-16">
               <h2 className="text-5xl font-black mb-4 tracking-tight">What is 3 × 4?</h2>
               <p className="text-2xl text-slate-400 font-bold italic">"It means 3 groups of 4 items each."</p>
            </div>

            <div className="flex justify-center gap-12 mb-20 scale-125">
               {[1, 2, 3].map(group => (
                 <motion.div 
                   key={group} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: group * 0.2 }}
                   className="p-4 bg-indigo-50 rounded-[2rem] border-2 border-indigo-100 grid grid-cols-2 gap-2"
                 >
                    {[1, 2, 3, 4].map(dot => (
                      <div key={dot} className="w-4 h-4 bg-indigo-500 rounded-full shadow-sm" />
                    ))}
                 </motion.div>
               ))}
            </div>

            <div className="flex flex-col items-center">
               <div className="bg-slate-900 text-white font-black text-4xl px-12 py-6 rounded-[2.5rem] shadow-2xl mb-12">
                  3 × 4 = <span className="text-indigo-400 animate-pulse">12</span>
               </div>
               
               <button 
                onClick={startPlay}
                className="bg-emerald-500 text-white font-black px-16 py-6 rounded-[2rem] text-2xl shadow-[0_8px_0_rgb(5,150,105)] active:translate-y-2 active:shadow-none transition-all flex items-center gap-4 hover:bg-emerald-400"
               >
                 I'm Ready! Let's Dash <Play size={28} />
               </button>
            </div>
          </motion.div>
        )}

        {/* State 3: Play */}
        {gameState === 'play' && (
          <motion.div 
            key="play"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="w-full max-w-3xl"
          >
            {/* HUD */}
            <div className="flex justify-between items-center mb-8 bg-white/50 backdrop-blur-md p-6 rounded-[2.5rem] border-2 border-white shadow-sm">
               <div className="flex items-center gap-4">
                  <div className="bg-amber-100 p-3 rounded-2xl text-amber-600">
                    <Trophy size={32} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Score</p>
                    <p className="text-3xl font-black text-slate-800">{score}</p>
                  </div>
               </div>

               <div className={`flex items-center gap-4 px-8 py-3 rounded-full border-4 transition-colors ${timeLeft < 10 ? 'bg-rose-50 border-rose-200 text-rose-500' : 'bg-white border-slate-100 text-slate-800'}`}>
                  <Timer size={28} className={timeLeft < 10 ? 'animate-bounce' : ''} />
                  <span className="text-4xl font-black">{timeLeft}s</span>
               </div>
            </div>

            {/* Question Card */}
            <motion.div 
              animate={feedback === 'wrong' ? { x: [-10, 10, -10, 10, 0] } : {}}
              className={`bg-white p-12 rounded-[4rem] shadow-2xl border-b-[24px] text-center transition-all
                ${feedback === 'correct' ? 'border-emerald-100 ring-8 ring-emerald-50 shadow-emerald-200/50' : feedback === 'wrong' ? 'border-rose-100 ring-8 ring-rose-50 shadow-rose-200/50' : 'border-slate-100'}`}
            >
               <h2 className="text-[12rem] font-black leading-none mb-4 tracking-tighter text-slate-800 select-none">
                  {question.a} <span className="text-indigo-500 text-[8rem] mx-2">×</span> {question.b}
               </h2>

               <form onSubmit={handleSubmit} className="relative max-w-xs mx-auto">
                 <input 
                    type="number" autoFocus
                    value={userAnswer}
                    onChange={e => setUserAnswer(e.target.value)}
                    placeholder="?"
                    className="w-full text-center py-8 rounded-[2.5rem] bg-slate-100 border-4 border-slate-200 focus:bg-white focus:border-indigo-500 transition-all text-7xl font-black outline-none no-spinner"
                 />
                 <div className="absolute -right-16 top-1/2 -translate-y-1/2">
                    {feedback === 'correct' && <motion.div initial={{ scale: 0 }} animate={{ scale: 1.5 }} className="text-emerald-500"><CheckCircle2 size={60}/></motion.div>}
                    {feedback === 'wrong' && <motion.div initial={{ scale: 0 }} animate={{ scale: 1.5 }} className="text-rose-500"><XCircle size={60}/></motion.div>}
                 </div>
               </form>
               <p className="mt-8 text-slate-400 font-black uppercase tracking-widest text-sm">Type your answer and hit Enter</p>
            </motion.div>
          </motion.div>
        )}

        {/* State 4: Result */}
        {gameState === 'result' && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-16 rounded-[4rem] shadow-2xl border-b-[20px] border-slate-100 max-w-lg w-full text-center"
          >
             <div className="text-9xl mb-8">🎖️</div>
             <h2 className="text-5xl font-black mb-2">Time Up!</h2>
             <p className="text-2xl font-bold text-slate-400 mb-12">Amazing speed, Builder!</p>

             <div className="bg-indigo-50 p-10 rounded-[3rem] border-4 border-dashed border-indigo-200 mb-12">
                <p className="text-sm font-black text-indigo-400 uppercase tracking-widest mb-2">Points Earned</p>
                <p className="text-8xl font-black text-indigo-600">+{score}</p>
             </div>

             <div className="space-y-4">
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="w-full bg-slate-800 text-white font-black py-6 rounded-[2rem] text-xl shadow-[0_8px_0_rgb(30,27,24)] active:translate-y-2 active:shadow-none transition-all flex items-center justify-center gap-3"
                >
                  Return to Dashboard
                </button>
                <button 
                  onClick={() => { setGameState('play'); setTimeLeft(30); setScore(0); generateQuestion(); }}
                  className="w-full text-indigo-600 font-black py-4 hover:bg-indigo-50 rounded-2xl transition-all"
                >
                  Try Again 🔄
                </button>
             </div>
          </motion.div>
        )}

      </AnimatePresence>

      <style>{`
        .no-spinner::-webkit-inner-spin-button, .no-spinner::-webkit-outer-spin-button { 
          -webkit-appearance: none; margin: 0; 
        }
      `}</style>
    </div>
  );
}
