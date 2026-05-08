import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5005/api';

const QUESTIONS_TIER_1 = [
  // Math - Simple
  { text: "What is 5 + 3?", options: ["6", "7", "8", "9"], correct: "8", category: "Math" },
  { text: "How much is 10 - 4?", options: ["8", "6", "10", "4"], correct: "6", category: "Math" },
  { text: "Count the apples: 🍎🍎🍎🍎", options: ["2", "3", "4", "5"], correct: "4", category: "Math" },
  // English - Simple
  { text: "Which letter comes after 'B'?", options: ["A", "C", "D", "E"], correct: "C", category: "English" },
  { text: "Select the correct spelling:", options: ["Cat", "Kat", "Cot", "Kut"], correct: "Cat", category: "English" },
  { text: "The ___ shines in the day.", options: ["Moon", "Sun", "Star", "Cloud"], correct: "Sun", category: "English" }
];

const QUESTIONS_TIER_2 = [
  // Math - Intermediate
  { text: "What is 12 × 5?", options: ["50", "60", "70", "80"], correct: "60", category: "Math" },
  { text: "Subtract 450 - 175:", options: ["275", "375", "225", "325"], correct: "275", category: "Math" },
  { text: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], correct: "6", category: "Math" },
  // English - Intermediate
  { text: "Which is a plural noun?", options: ["Dog", "Cats", "Run", "Happy"], correct: "Cats", category: "English" },
  { text: "Antonym for 'Begin':", options: ["Start", "Finish", "Open", "Try"], correct: "Finish", category: "English" },
  { text: "The capital of France is ___.", options: ["London", "Berlin", "Paris", "Rome"], correct: "Paris", category: "General" }
];

const QUESTIONS_TIER_3 = [
  // Math - Advanced
  { text: "What is the square root of 144?", options: ["10", "12", "14", "16"], correct: "12", category: "Math" },
  { text: "Solve for x: 3x + 5 = 20", options: ["3", "5", "7", "10"], correct: "5", category: "Math" },
  { text: "Area of a circle is calculated by:", options: ["2πr", "πr²", "l×w", "½bh"], correct: "πr²", category: "Math" },
  // Science/English - Advanced
  { text: "Which gas do plants absorb?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: "Carbon Dioxide", category: "Science" },
  { text: "Who wrote 'Romeo and Juliet'?", options: ["Dickens", "Shakespeare", "Twain", "Hemingway"], correct: "Shakespeare", category: "Literature" },
  { text: "Water freezes at ___ degrees Celsius.", options: ["0", "10", "32", "100"], correct: "0", category: "Science" }
];

export default function PreTest() {
  const navigate = useNavigate();
  const { student, setStudent, theme } = useAppContext();
  const isDarkMode = theme === 'dark';
  
  const getQuestions = () => {
    if (student?.classGrade === '1') return QUESTIONS_TIER_1;
    if (student?.classGrade === '2-5') return QUESTIONS_TIER_2;
    return QUESTIONS_TIER_3;
  };
  
  const QUESTIONS = getQuestions();
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  
  // New State variables
  const [timeLeft, setTimeLeft] = useState(15);
  const [mascotText, setMascotText] = useState("Let's see how smart you are!");

  // If no student or already completed, go home
  useEffect(() => {
    if (!student || student.hasCompletedPretest) {
      navigate('/dashboard');
    }
  }, [student, navigate]);

  // Timer Effect
  useEffect(() => {
    let timer;
    if (!submitting && !feedback && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft <= 0 && !feedback && !submitting) {
      handleAnswer('TIMEOUT');
    }
    return () => clearInterval(timer);
  }, [timeLeft, feedback, submitting]);

  const handleAnswer = (opt) => {
    if (feedback) return;

    const isCorrect = opt === QUESTIONS[currentIdx].correct;
    setFeedback(isCorrect ? 'correct' : 'wrong');
    
    if (isCorrect) {
       setScore(s => s + 1);
       setMascotText("Great job!");
    } else {
       setMascotText(opt === 'TIMEOUT' ? "Too slow! Let's hurry to the next one!" : "Oops! Let's try the next one.");
    }

    setTimeout(() => {
      setFeedback(null);
      const newAnswers = [...answers, { q: QUESTIONS[currentIdx].text, ans: opt, isCorrect }];
      setAnswers(newAnswers);

      if (currentIdx + 1 < QUESTIONS.length) {
        setCurrentIdx(currentIdx + 1);
        setTimeLeft(15);
        setMascotText("Let's see how smart you are!");
      } else {
        finishTest(newAnswers, score + (isCorrect ? 1 : 0));
      }
    }, 1500); // Increased slightly so they can read the mascot's reaction and see the shake
  };

  const finishTest = async (finalAnswers, finalScore) => {
    setSubmitting(true);
    setMascotText("Analyzing your results...");
    try {
      await axios.post(`${BACKEND_URL}/test`, {
        studentId: student.id,
        moduleName: 'Global',
        testType: 'pre',
        answers: finalAnswers,
        score: finalScore
      });

      // Update local storage
      const updatedStudent = { ...student, hasCompletedPretest: true };
      setStudent(updatedStudent);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      // Fallback update on failure
      const updatedStudent = { ...student, hasCompletedPretest: true };
      setStudent(updatedStudent);
      navigate('/dashboard');
      setSubmitting(false);
    }
  };

  if (!student || submitting) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-6 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
        <div className="text-center">
           <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="w-16 h-16 border-8 border-indigo-200 border-t-indigo-600 rounded-full mx-auto mb-6" />
           <h2 className={`text-3xl font-black animate-pulse ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Setting up your profile!</h2>
        </div>
      </div>
    );
  }

  const progress = ((currentIdx) / QUESTIONS.length) * 100;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 lg:p-12 relative overflow-hidden transition-colors duration-700 ${isDarkMode ? 'bg-[#0a0f1e]' : 'bg-indigo-50'}`}>
      
      {/* Dynamic BG */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
      <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000" />

      {/* Mascot Header */}
      <div className={`w-full max-w-4xl px-8 py-5 rounded-[2rem] shadow-lg border-b-[8px] flex items-center justify-between relative gap-6 mb-8 z-10 transition-all
        ${isDarkMode ? 'bg-slate-900 border-slate-950' : 'bg-white border-indigo-100'}`}>
        <div className="flex items-center gap-4">
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="text-5xl drop-shadow-md">🦊</motion.div>
          <div>
            <p className="text-indigo-400 font-black tracking-widest text-xs uppercase mb-1">Guide</p>
            <p className={`font-black text-xl ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{mascotText}</p>
          </div>
        </div>
        
        <div className={`hidden md:flex items-center gap-2 font-black text-2xl px-6 py-2 rounded-full border-2 transition-colors duration-500
          ${timeLeft <= 5 ? 'bg-rose-100 text-rose-600 border-rose-200 animate-pulse' : 'bg-slate-100 text-slate-700 border-slate-200'}`}
        >
          <Clock size={24} /> 00:{timeLeft < 10 ? `0${timeLeft}`: timeLeft}
        </div>
      </div>

      <div className="w-full max-w-4xl flex items-center mb-10 z-10 space-x-4">
        <div className="font-black text-indigo-400 tracking-widest uppercase text-sm">Progress</div>
        <div className="flex-1 h-6 bg-white rounded-full p-1 shadow-inner border break-inside-avoid border-indigo-100">
           <motion.div 
             className="h-full bg-indigo-500 rounded-full shadow-sm"
             initial={{ width: `${((currentIdx-1)/QUESTIONS.length)*100}%` }}
             animate={{ width: `${progress}%` }}
             transition={{ duration: 0.5, ease: "easeOut" }}
           />
        </div>
        <div className="font-black text-indigo-700">{currentIdx + 1} / {QUESTIONS.length}</div>
      </div>

      <div className="max-w-4xl w-full z-10 flex flex-col items-center">
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIdx}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            className={`w-full rounded-[3.5rem] shadow-2xl border-b-[16px] p-10 md:p-16 flex flex-col space-y-10 min-h-[400px] transition-colors duration-500
              ${feedback === 'correct' ? 'border-emerald-200 shadow-emerald-200/50' : 
                feedback === 'wrong' ? 'border-rose-200 shadow-rose-200/50' : (isDarkMode ? 'border-slate-950 shadow-indigo-500/10' : 'border-indigo-100')}
              ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}
          >
            <div className={`flex items-center justify-between border-b-2 pb-6 ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
               <span className="px-6 py-2 bg-indigo-50 text-indigo-700 font-bold uppercase tracking-widest rounded-2xl border-2 border-indigo-100 text-sm">
                 {QUESTIONS[currentIdx].category}
               </span>
               <span className="text-slate-500 font-black flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-xl">
                 🔥 Warm-up Challenge
               </span>
            </div>
            
            <h2 className={`text-4xl md:text-5xl font-black leading-snug flex-1 flex items-center ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
              {QUESTIONS[currentIdx].text}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {QUESTIONS[currentIdx].options.map(opt => {
                const isSelectedAndCorrect = feedback === 'correct' && opt === QUESTIONS[currentIdx].correct;
                const isSelectedAndWrong = feedback === 'wrong' && opt !== QUESTIONS[currentIdx].correct;

                return (
                  <motion.button
                    animate={isSelectedAndWrong ? { x: [-10, 10, -10, 10, 0] } : isSelectedAndCorrect ? { scale: [1, 1.05, 1], boxShadow: '0 8px 0 #047857' } : {}}
                    whileTap={{ scale: feedback ? 1 : 0.95 }}
                    key={opt}
                    onClick={() => handleAnswer(opt)}
                    disabled={feedback !== null}
                    className={`text-3xl font-black py-8 rounded-[2rem] border-b-8 transition-colors shadow-sm flex items-center justify-center space-x-4
                      ${isSelectedAndCorrect ? 'bg-emerald-500 border-emerald-700 text-white shadow-xl' :
                        isSelectedAndWrong ? 'bg-rose-500 border-rose-700 text-white shadow-xl' :
                        feedback ? 'bg-slate-50 border-slate-200 text-slate-400 opacity-50' :
                        (isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700')
                      }`}
                  >
                    <span>{opt}</span>
                    {isSelectedAndCorrect && <CheckCircle size={32} className="text-white" />}
                    {isSelectedAndWrong && <XCircle size={32} className="text-white" />}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}
