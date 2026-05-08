import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, BookOpen, PenTool, Zap, 
  ChevronRight, ChevronLeft, CheckCircle2, 
  AlertCircle, Timer, Trophy, Lightbulb, Check, Pause, RotateCcw, X, Play
} from 'lucide-react';
import { ACHIEVER_CURRICULUM } from '../store/achieverConfig';
import generatedMathData from '../store/generatedMathQuestions.json';
import generatedScienceData from '../store/generatedScienceQuestions.json';
import generatedEnglishData from '../store/generatedEnglishQuestions.json';
import { useAppContext } from '../store/AppContext';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5005/api';

export default function AchieverHost() {
  const { moduleKey, topicId } = useParams();
  const navigate = useNavigate();
  const { theme, student } = useAppContext();
  const isDark = theme === 'dark';

  const baseModuleData = ACHIEVER_CURRICULUM[moduleKey];
  const baseTopic = baseModuleData?.topics.find(t => t.id === topicId);

  // Inject generated math questions if applicable
  const topic = useMemo(() => {
    if (!baseTopic) return null;
    
    // Merge generated data for Math and Science
    let dynamicContent = null;
    if (moduleKey === 'math' && generatedMathData[topicId]) {
      dynamicContent = generatedMathData[topicId];
    } else if (moduleKey === 'science' && generatedScienceData[topicId]) {
      dynamicContent = generatedScienceData[topicId];
    } else if (moduleKey === 'english' && generatedEnglishData[topicId]) {
      dynamicContent = generatedEnglishData[topicId];
    }

    if (dynamicContent) {
      return {
        ...baseTopic,
        content: {
          ...baseTopic.content,
          practice: dynamicContent.practice || baseTopic.content.practice,
          challenge: dynamicContent.challenge || baseTopic.content.challenge,
          test: dynamicContent.test || baseTopic.content.test,
        }
      };
    }
    return baseTopic;
  }, [moduleKey, topicId]);

  const [activeMode, setActiveMode] = useState('learn');
  const [currentStep, setCurrentStep] = useState(0); 
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(null);
  const [selectedDiagram, setSelectedDiagram] = useState(null);
  const [timerValue, setTimerValue] = useState(30);
  const [isComplete, setIsComplete] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [showStartPopup, setShowStartPopup] = useState(true);
  
  // New States for enhanced features
  const [testLevel, setTestLevel] = useState(1); // 1, 2, or 3 for Final Test
  const [isPaused, setIsPaused] = useState(false);
  const [flippedCard, setFlippedCard] = useState(false); 
  
  const [showResumePopup, setShowResumePopup] = useState(false);
  const [savedState, setSavedState] = useState(null);
  const [completedModes, setCompletedModes] = useState(() => {
    const saved = localStorage.getItem(`achiever_prog_${topicId}`);
    return saved ? JSON.parse(saved) : [];
  });

  // Check for resume-able state
  useEffect(() => {
    const saved = localStorage.getItem(`achiever_state_${topicId}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.currentStep > 0 || parsed.activeMode !== 'learn') {
        setSavedState(parsed);
        setShowResumePopup(true);
        setShowStartPopup(false);
      }
    }
  }, [topicId]);

  // Save state whenever it changes
  useEffect(() => {
    if (activeMode && !isComplete && !showStartPopup && !showResumePopup) {
      const state = {
        activeMode,
        currentStep,
        score,
        testLevel,
        lastUpdated: new Date().getTime()
      };
      localStorage.setItem(`achiever_state_${topicId}`, JSON.stringify(state));
    }
  }, [activeMode, currentStep, score, testLevel, isComplete, showStartPopup, showResumePopup, topicId]);

  const handleResume = () => {
    if (savedState) {
      setActiveMode(savedState.activeMode);
      setCurrentStep(savedState.currentStep);
      setScore(savedState.score);
      setTestLevel(savedState.testLevel || 1);
      setShowResumePopup(false);
      setIsPaused(false);
      setShowStartPopup(false);
    }
  };

  const handleStartOver = () => {
    localStorage.removeItem(`achiever_state_${topicId}`);
    setShowResumePopup(false);
    setShowStartPopup(true);
    resetMode('learn');
  };

  const getTimerForCurrentModeAndLevel = useCallback(() => {
    if (activeMode === 'practice') return 0; // No timer
    if (activeMode === 'challenge') return 60; // 1 min per question
    if (activeMode === 'test') {
      if (testLevel === 1) return 60;
      if (testLevel === 2) return 45;
      if (testLevel === 3) return 30;
    }
    return 30;
  }, [activeMode, testLevel]);

  const currentOptions = useMemo(() => {
    const modeData = topic?.content[activeMode];
    const q = activeMode === 'learn' ? null : modeData?.[currentStep];
    if (!q || !q.options) return [];
    return [...q.options].sort(() => Math.random() - 0.5);
  }, [activeMode, currentStep, topic]);

  const markModeComplete = (mode) => {
    if (!completedModes.includes(mode)) {
      const updated = [...completedModes, mode];
      setCompletedModes(updated);
      localStorage.setItem(`achiever_prog_${topicId}`, JSON.stringify(updated));
    }
  };

  const isModeUnlocked = (mode) => {
    if (mode === 'learn') return true;
    if (mode === 'practice') return completedModes.includes('learn');
    if (mode === 'challenge') return completedModes.includes('practice');
    if (mode === 'test') return completedModes.includes('challenge');
    return false;
  };

  const resetMode = (mode) => {
    setActiveMode(mode);
    setCurrentStep(0);
    setIsComplete(false);
    setScore(0);
    setTestLevel(1);
    setShowFeedback(null);
    setIsPaused(false);
    setShowStartPopup(true);
    setTimerValue(getTimerForCurrentModeAndLevel());
    localStorage.removeItem(`achiever_state_${topicId}`);
  };

  const saveProgressToDB = async () => {
    const studentId = student?.id || student?._id;
    if (!studentId || studentId === 'dummy_id_123') return;

    try {
      setSaveStatus('saving');
      await axios.post(`${BACKEND_URL}/progress`, {
        studentId: studentId,
        moduleName: `${moduleKey}_${topicId}`,
        gameId: `achiever_${activeMode}`,
        levelNumber: activeMode === 'test' ? testLevel : 1,
        score: score * 10,
        timeSpent: 60,
      });

      if (activeMode === 'test') {
        await axios.post(`${BACKEND_URL}/test`, {
          studentId: studentId,
          moduleName: `${moduleKey}_${topicId}`,
          testType: 'post',
          answers: [],
          score: score * 10
        });
      }
      setSaveStatus('success');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleNext = useCallback(() => {
    const currentModeData = topic.content[activeMode];
    
    if (activeMode === 'learn') {
      if (currentStep < topic.content.learn.concept.length - 1) {
        setCurrentStep(prev => prev + 1);
        setFlippedCard(false);
      } else {
        setIsComplete(true);
        markModeComplete('learn');
        localStorage.removeItem(`achiever_state_${topicId}`);
      }
      return;
    }

    if (activeMode === 'practice' || activeMode === 'challenge') {
      if (currentStep < currentModeData.length - 1) {
        setCurrentStep(prev => prev + 1);
        setShowFeedback(null);
        setTimerValue(getTimerForCurrentModeAndLevel());
      } else {
        setIsComplete(true);
        markModeComplete(activeMode);
        saveProgressToDB();
        localStorage.removeItem(`achiever_state_${topicId}`);
      }
      return;
    }

    if (activeMode === 'test') {
      const isEndOfLevel1 = currentStep === 29;
      const isEndOfLevel2 = currentStep === 59;
      const isEndOfTest = currentStep === currentModeData.length - 1;

      if (isEndOfTest) {
        setIsComplete(true);
        markModeComplete('test');
        saveProgressToDB();
        localStorage.removeItem(`achiever_state_${topicId}`);
      } else if (isEndOfLevel1) {
        setTestLevel(2);
        setCurrentStep(prev => prev + 1);
        setShowFeedback(null);
      } else if (isEndOfLevel2) {
        setTestLevel(3);
        setCurrentStep(prev => prev + 1);
        setShowFeedback(null);
      } else {
        setCurrentStep(prev => prev + 1);
        setShowFeedback(null);
      }
    }
  }, [activeMode, currentStep, topic, score, student, getTimerForCurrentModeAndLevel, saveProgressToDB]);

  useEffect(() => {
    if (!showFeedback && !isPaused && !isComplete && !showStartPopup) {
      setTimerValue(getTimerForCurrentModeAndLevel());
    }
  }, [currentStep, testLevel, activeMode, getTimerForCurrentModeAndLevel, isPaused, isComplete, showFeedback, showStartPopup]);

  // Timer Countdown
  useEffect(() => {
    let timer;
    const isTimedMode = activeMode === 'challenge' || activeMode === 'test';
    
    if (isTimedMode && !isComplete && !showFeedback && !isPaused && !showStartPopup) {
      if (timerValue > 0) {
        timer = setInterval(() => setTimerValue(prev => prev - 1), 1000);
      } else {
        handleAnswer('TIMEOUT_AUTO_FAIL');
      }
    }
    return () => clearInterval(timer);
  }, [activeMode, timerValue, isComplete, showFeedback, isPaused, showStartPopup]);

  if (!topic) return <div className="p-10 text-center">Topic not found</div>;

  const modes = [
    { id: 'learn', label: 'Deep Learning', icon: <BookOpen size={18} /> },
    { id: 'practice', label: 'Practice', icon: <PenTool size={18} /> },
    { id: 'challenge', label: 'Challenge', icon: <Zap size={18} /> },
    { id: 'test', label: 'Final Test', icon: <Trophy size={18} /> }
  ];

  const handleAnswer = (option) => {
    if (showFeedback) return;
    const currentModeData = topic.content[activeMode];
    if (!currentModeData || !currentModeData[currentStep]) return;

    const currentQ = currentModeData[currentStep];
    const isCorrect = option?.toString().trim() === currentQ.a?.toString().trim();
    
    if (isCorrect) setScore(prev => prev + 1);
    setShowFeedback({ isCorrect, explanation: currentQ.explanation, selected: option });

    if (activeMode === 'test' || activeMode === 'challenge') {
       setTimeout(handleNext, 2000);
    }
  };

  const renderResumePopup = () => (
    <AnimatePresence>
      {showResumePopup && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[400] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-6">
          <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className={`w-full max-w-xl p-10 rounded-[3.5rem] border-4 shadow-3xl text-center ${isDark ? 'bg-slate-900 border-indigo-500/30' : 'bg-white border-indigo-100'}`}>
            <div className="w-20 h-20 bg-indigo-500/20 text-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <RotateCcw size={40} />
            </div>
            <h2 className="text-4xl font-black mb-4 tracking-tight">Resume Achiever Journey?</h2>
            <p className="text-lg text-slate-400 font-bold mb-10">
              We found your previous progress in <span className="text-indigo-400 uppercase">{savedState?.activeMode}</span>. 
              Would you like to resume your session?
            </p>
            
            <div className="flex flex-col gap-4">
              <button 
                onClick={handleResume}
                className="w-full py-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[2rem] font-black text-xl shadow-xl transition-all flex items-center justify-center gap-3"
              >
                YES, RESUME <Play fill="currentColor" size={20} />
              </button>
              <button 
                onClick={handleStartOver}
                className={`w-full py-6 rounded-[2rem] font-black text-xl border-2 transition-all ${isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                NO, START OVER
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderStartPopup = () => (
    <AnimatePresence>
      {showStartPopup && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-6">
          <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} className={`w-full max-w-2xl p-12 rounded-[4rem] border-4 shadow-3xl text-center ${isDark ? 'bg-slate-900 border-indigo-500/30' : 'bg-white border-indigo-100'}`}>
            <div className={`w-24 h-24 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl ${activeMode === 'learn' ? 'bg-blue-500 text-white' : activeMode === 'practice' ? 'bg-emerald-500 text-white' : activeMode === 'challenge' ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white'}`}>
              {activeMode === 'learn' ? <BookOpen size={48} /> : activeMode === 'practice' ? <PenTool size={48} /> : activeMode === 'challenge' ? <Zap size={48} /> : <Trophy size={48} />}
            </div>
            <h2 className="text-5xl font-black mb-4">
              {activeMode === 'learn' ? 'Deep Learning' : activeMode === 'practice' ? 'Practice Mode' : activeMode === 'challenge' ? 'Challenge Mode' : 'Final Test'}
            </h2>
            <p className="text-xl text-slate-400 font-bold mb-10 leading-relaxed">
              {activeMode === 'learn' 
                ? "Dive deep into advanced concepts with interactive 3D flip cards. Master the material before testing your knowledge." 
                : activeMode === 'practice' 
                ? "30 curriculum-aligned questions to sharpen your expertise. Take your time to understand every solution."
                : activeMode === 'challenge'
                ? "Push your limits! 30 high-difficulty questions with a 60-second timer. Can you maintain accuracy under pressure?"
                : "The ultimate achiever milestone. 100 questions across 3 difficulty tiers. Prove your mastery!"}
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-12">
               <div className="p-6 rounded-3xl bg-slate-800/50 border border-white/5">
                  <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-1">Total Questions</p>
                  <p className="text-3xl font-black">{activeMode === 'learn' ? topic.content.learn.concept.length : activeMode === 'test' ? 100 : 30}</p>
               </div>
               <div className="p-6 rounded-3xl bg-slate-800/50 border border-white/5">
                  <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-1">Time Limit</p>
                  <p className="text-3xl font-black">{activeMode === 'practice' || activeMode === 'learn' ? 'None' : '60s / Q'}</p>
               </div>
            </div>

            <button 
              onClick={() => { setShowStartPopup(false); localStorage.removeItem(`achiever_state_${topicId}`); }}
              className="w-full py-8 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl shadow-indigo-500/40 transition-all hover:scale-[1.02] flex items-center justify-center gap-4"
            >
              START MODULE <Play fill="currentColor" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderPauseModal = () => (
    <AnimatePresence>
      {isPaused && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-6">
          <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className={`w-full max-w-md p-8 rounded-[3rem] shadow-2xl border-2 text-center ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
            <div className="w-20 h-20 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Pause size={40} />
            </div>
            <h2 className="text-3xl font-black mb-2">Assessment Paused</h2>
            <p className="text-slate-500 font-bold mb-8">Take a deep breath. You can resume when you are ready.</p>
            
            <div className="space-y-4">
              <button onClick={() => setIsPaused(false)} className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xl shadow-lg transition-transform hover:scale-[1.02]">
                Resume Assessment
              </button>
              <button onClick={() => resetMode(activeMode)} className={`w-full py-4 flex items-center justify-center gap-2 rounded-2xl font-black text-xl transition-colors ${isDark ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}>
                <RotateCcw size={20} /> Start Again
              </button>
              <button onClick={() => { setIsPaused(false); navigate('/dashboard'); }} className="w-full py-4 text-rose-500 font-bold text-lg hover:underline">
                Exit to Dashboard
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderGameBasedLearning = () => {
    const concept = topic.content.learn.concept[currentStep];
    return (
      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 shadow-inner">
              <BookOpen size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black">{concept.title}</h2>
              <p className="text-sm font-bold uppercase tracking-widest text-indigo-500">Level {currentStep + 1} of {topic.content.learn.concept.length}</p>
            </div>
          </div>
        </div>

        {/* 3D Flip Card Container */}
        <div 
          className="relative w-full h-[600px] mb-12 cursor-pointer group [perspective:2000px]" 
          onClick={() => setFlippedCard(!flippedCard)}
        >
          <motion.div 
            animate={{ rotateY: flippedCard ? 180 : 0 }} 
            transition={{ duration: 0.8, type: "spring", stiffness: 80, damping: 15 }}
            className="w-full h-full relative [transform-style:preserve-3d]"
          >
            {/* Front of Card: Concept Teaser */}
            <div 
              className={`absolute inset-0 w-full h-full p-12 rounded-[4rem] border-[8px] shadow-2xl flex flex-col justify-center items-center text-center [backface-visibility:hidden] overflow-hidden ${
                isDark 
                  ? 'bg-slate-900 border-indigo-500/20 text-white shadow-indigo-500/20' 
                  : 'bg-white border-indigo-50 text-slate-800 shadow-slate-200'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-30"></div>
              
              <motion.div 
                animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }} 
                transition={{ repeat: Infinity, duration: 4 }}
                className="text-9xl mb-12 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                💡
              </motion.div>
              
              <h3 className="text-4xl md:text-6xl font-black leading-tight max-w-4xl mb-14 tracking-tighter">
                {concept.text}
              </h3>
              
              <div className="relative group/btn">
                <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 group-hover/btn:opacity-40 transition-opacity"></div>
                <div className="relative px-10 py-4 rounded-full bg-indigo-500 text-white font-black text-lg uppercase tracking-[0.3em] flex items-center gap-3">
                  Deep Dive <RotateCcw size={24} className="animate-spin-slow" />
                </div>
              </div>
            </div>

            {/* Back of Card: Key Principles */}
            <div 
              className={`absolute inset-0 w-full h-full p-12 rounded-[4rem] border-[8px] shadow-2xl flex flex-col [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-hidden ${
                isDark 
                  ? 'bg-[#0b1120] border-indigo-500/40 text-white' 
                  : 'bg-indigo-50 border-white text-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-8">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-2xl shadow-indigo-500/40">
                    <BookOpen size={32} />
                  </div>
                  <div>
                    <h4 className="text-3xl font-black text-indigo-400 tracking-tight leading-none mb-1">Key Principles</h4>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Curriculum Mastery</p>
                  </div>
                </div>
                <button 
                  className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-all duration-300"
                  onClick={(e) => { e.stopPropagation(); setFlippedCard(false); }}
                >
                  <X size={28} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar pr-6 space-y-6">
                {concept.points && concept.points.length > 0 ? concept.points.map((p, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: flippedCard ? 1 : 0, x: flippedCard ? 0 : 30 }}
                    transition={{ delay: 0.2 + i * 0.1, type: "spring" }}
                    key={i} 
                    className={`p-8 rounded-[2.5rem] flex gap-8 text-left transition-all border-2 ${
                      isDark 
                        ? 'bg-slate-900/60 border-white/5 hover:border-indigo-500/40 hover:bg-slate-900' 
                        : 'bg-white border-indigo-100 hover:border-indigo-300 shadow-md'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-full bg-indigo-500 text-white flex items-center justify-center font-black text-2xl shrink-0 shadow-lg shadow-indigo-500/20">
                      {i + 1}
                    </div>
                    <p className="text-2xl font-bold leading-relaxed text-slate-100 dark:text-white drop-shadow-sm">
                      {p}
                    </p>
                  </motion.div>
                )) : (
                  <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-40">
                    <AlertCircle size={64} className="text-indigo-500 animate-pulse" />
                    <p className="text-2xl font-black italic">Synthesizing Core Concepts...</p>
                  </div>
                )}
                
                {concept.example && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: flippedCard ? 1 : 0, scale: flippedCard ? 1 : 0.95 }}
                    transition={{ delay: 0.5 }}
                    className={`p-10 rounded-[3.5rem] mt-12 border-l-[12px] border-amber-500 relative overflow-hidden shadow-2xl ${
                      isDark ? 'bg-slate-950/80 text-amber-100 shadow-amber-500/5' : 'bg-amber-50 text-amber-900'
                    }`}
                  >
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                      <Lightbulb size={100} />
                    </div>
                    <div className="flex items-center gap-4 mb-5 relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-xl">
                        <Lightbulb size={24} />
                      </div>
                      <p className="text-sm font-black uppercase tracking-[0.2em] text-amber-500">Real-World Case Study</p>
                    </div>
                    <p className="font-black text-3xl italic leading-relaxed relative z-10">
                      "{concept.example}"
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mt-14">
          <motion.button 
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            disabled={currentStep === 0}
            onClick={(e) => { e.stopPropagation(); setCurrentStep(prev => prev - 1); setFlippedCard(false); }} 
            className={`px-10 py-6 rounded-3xl font-black text-xl flex items-center gap-3 transition-all ${
              currentStep === 0 
                ? 'opacity-20 cursor-not-allowed' 
                : isDark ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-white text-slate-800 shadow-lg hover:bg-slate-50'
            }`}
          >
            <ChevronLeft size={28} /> Previous Concept
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="px-12 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-3xl font-black text-2xl shadow-2xl shadow-indigo-500/40 flex items-center gap-4 transition-all"
          >
            {currentStep === topic.content.learn.concept.length - 1 ? 'Mastered!' : 'Next Concept'} 
            <ChevronRight size={32} />
          </motion.button>
        </div>
      </div>
    );
  };

  const renderTestInterface = () => {
    const isTimedMode = activeMode === 'challenge' || activeMode === 'test';
    const isFinalTest = activeMode === 'test';
    const totalQ = topic.content[activeMode]?.length || 0;
    
    // Level progress indicators for Final Test
    const renderLevelIndicators = () => {
      if (!isFinalTest) return null;
      return (
        <div className="flex gap-2 items-center mr-4">
          {[1, 2, 3].map(lvl => (
            <div key={lvl} className={`px-3 py-1 rounded-full text-xs font-black border ${
              testLevel === lvl 
                ? 'bg-indigo-500 text-white border-indigo-500 animate-pulse shadow-lg' 
                : testLevel > lvl 
                  ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/20'
                  : 'bg-slate-500/10 text-slate-400 border-slate-500/10'
            }`}>
              Level {lvl}
            </div>
          ))}
        </div>
      );
    };

    return (
      <div className="space-y-8">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${activeMode === 'test' ? 'bg-rose-500/10 text-rose-500' : activeMode === 'practice' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                {activeMode === 'test' ? <Trophy size={28} /> : activeMode === 'practice' ? <PenTool size={28} /> : <Zap size={28} />}
              </div>
              <div>
                <h2 className="text-2xl font-black flex items-center gap-2">Question {currentStep + 1} <span className="text-sm text-slate-400 font-bold">/ {totalQ}</span></h2>
                <div className="flex items-center gap-2 mt-1">
                  {renderLevelIndicators()}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {isTimedMode && (
                <div className={`flex items-center gap-3 px-6 py-3 rounded-full font-black text-xl border-4 transition-colors shadow-inner ${
                  timerValue < 10 ? 'bg-rose-500/10 border-rose-500 text-rose-500 animate-pulse' : 'bg-slate-500/5 border-slate-500/20 text-slate-600 dark:text-slate-300'
                }`}>
                   <Timer size={24} /> {timerValue}s
                </div>
              )}
              <button onClick={() => setIsPaused(true)} className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${isDark ? 'border-slate-700 hover:bg-slate-800 text-slate-400' : 'border-slate-200 hover:bg-slate-100 text-slate-600'}`}>
                <Pause size={20} />
              </button>
            </div>
         </div>

         <div className={`p-10 rounded-[3rem] border-4 shadow-xl ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
           <p className="text-3xl font-black leading-relaxed">
             {topic.content[activeMode] && topic.content[activeMode][currentStep] ? topic.content[activeMode][currentStep].q : "No question available."}
           </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {currentOptions.map((opt, i) => {
             const isSelected = showFeedback?.selected === opt;
             const isCorrectAnswer = opt === topic.content[activeMode][currentStep].a;
             
             let btnClass = isDark ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-slate-50 border-slate-200 hover:bg-indigo-50 hover:border-indigo-200';
             
             if (showFeedback) {
               if (isCorrectAnswer) {
                 btnClass = 'bg-emerald-500 border-emerald-600 text-white shadow-emerald-500/50 shadow-lg scale-[1.02]';
               } else if (isSelected) {
                 btnClass = 'bg-rose-500 border-rose-600 text-white opacity-80';
               } else {
                 btnClass = 'opacity-30 grayscale';
               }
             }

             return (
               <button
                 key={i}
                 disabled={showFeedback !== null}
                 onClick={() => handleAnswer(opt)}
                 className={`p-8 rounded-[2rem] border-4 text-left text-xl font-bold transition-all ${btnClass}`}
               >
                 <span className="inline-block w-8 h-8 rounded-full bg-black/10 text-center leading-8 mr-4 text-sm font-black">{String.fromCharCode(65 + i)}</span>
                 {opt}
               </button>
             );
           })}
         </div>

         {showFeedback && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className={`p-8 rounded-[2.5rem] border-4 shadow-2xl ${showFeedback.isCorrect ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-700 dark:text-emerald-400' : 'bg-rose-50 dark:bg-rose-900/20 border-rose-500 text-rose-700 dark:text-rose-400'}`}
            >
              <div className="flex items-start gap-6">
                 <div className={`p-4 rounded-3xl ${showFeedback.isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                    {showFeedback.isCorrect ? <CheckCircle2 size={32} /> : <AlertCircle size={32} />}
                 </div>
                 <div className="flex-1">
                   <p className="font-black uppercase tracking-widest text-sm mb-2 opacity-80">
                     {showFeedback.selected === 'TIMEOUT_AUTO_FAIL' ? "Time Expired" : showFeedback.isCorrect ? 'Brilliant!' : 'Not Quite Right'}
                   </p>
                   <p className="text-xl font-bold leading-relaxed">{showFeedback.explanation}</p>
                 </div>
              </div>
              {activeMode === 'practice' && (
                <button 
                  onClick={handleNext}
                  className="mt-8 w-full py-5 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl font-black text-xl shadow-xl transition-all hover:scale-[1.02]"
                >
                  Continue to Next ➔
                </button>
              )}
            </motion.div>
         )}
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans pb-20 ${isDark ? 'bg-[#020617] text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {renderResumePopup()}
      {renderStartPopup()}
      {renderPauseModal()}
      
      {/* Toast */}
      <AnimatePresence>
        {saveStatus && (
          <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 20, opacity: 1 }} exit={{ y: -100, opacity: 0 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 font-black text-sm border-2
              ${saveStatus === 'success' ? 'bg-emerald-500 border-emerald-400 text-white' : saveStatus === 'saving' ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-rose-500 border-rose-400 text-white'}`}>
            {saveStatus === 'success' ? <Check size={18} /> : saveStatus === 'saving' ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <AlertCircle size={18} />}
            {saveStatus === 'success' ? 'Progress Saved!' : saveStatus === 'saving' ? 'Saving...' : 'Network Error!'}
          </motion.div>
        )}
      </AnimatePresence>

      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl ${isDark ? 'bg-[#020617]/80 border-slate-800' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/dashboard')}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isDark ? 'bg-slate-900 hover:bg-slate-800 text-slate-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-500 mb-1">{baseModuleData.title}</h1>
              <p className="text-2xl font-black">{topic?.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 shadow-inner overflow-x-auto">
            {modes.map(mode => {
              const unlocked = isModeUnlocked(mode.id);
              const isDone = completedModes.includes(mode.id);
              return (
                <button
                  key={mode.id}
                  disabled={!unlocked}
                  onClick={() => {
                    if (!unlocked) return;
                    resetMode(mode.id);
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-black transition-all whitespace-nowrap ${
                    activeMode === mode.id 
                      ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/30 scale-105' 
                      : unlocked 
                        ? 'text-slate-500 hover:text-indigo-500 hover:bg-white dark:hover:bg-slate-800' 
                        : 'text-slate-400 opacity-40 cursor-not-allowed'
                  } ${isDone && activeMode !== mode.id ? 'text-emerald-500' : ''}`}
                >
                  {isDone && activeMode !== mode.id ? <CheckCircle2 size={16} /> : mode.icon}
                  <span className="hidden lg:inline">{unlocked ? mode.label : '🔒 ' + mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Progress Bar */}
        <div className="flex gap-1 h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-12 shadow-inner">
          {Array.from({ length: activeMode === 'learn' ? topic?.content.learn.concept.length || 0 : topic?.content[activeMode]?.length || 0 }).map((_, i) => (
            <div key={i} className={`flex-1 h-full transition-all duration-500 ${i <= currentStep ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : ''}`} />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.div
              key={`${activeMode}-${currentStep}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {activeMode === 'learn' ? renderGameBasedLearning() : renderTestInterface()}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-16 rounded-[4rem] border-4 shadow-2xl text-center max-w-4xl mx-auto relative overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}
            >
              {/* Confetti / Glow effects */}
              <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent animate-[spin_10s_linear_infinite] pointer-events-none"></div>

              <div className="w-40 h-40 rounded-[3rem] bg-indigo-600 text-white flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-indigo-600/40 animate-bounce-slow relative z-10">
                <Trophy size={80} />
              </div>
              <h2 className="text-6xl font-black mb-6 relative z-10">
                {activeMode === 'learn' ? 'Study Complete!' : 'Assessment Complete!'}
              </h2>
              <p className="text-2xl text-slate-500 font-bold mb-14 max-w-2xl mx-auto relative z-10">
                {activeMode === 'learn' 
                  ? `You have mastered the concepts of ${topic.title}. Ready to test your knowledge?` 
                  : `You have successfully navigated the ${activeMode} phase.`}
              </p>
              
              {activeMode !== 'learn' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 relative z-10">
                   <div className="p-12 rounded-[3rem] bg-indigo-50 dark:bg-indigo-900/20 border-2 border-indigo-200 dark:border-indigo-800">
                      <p className="text-sm font-black uppercase text-indigo-500 mb-2 tracking-widest">Knowledge Score</p>
                      <p className="text-7xl font-black text-indigo-600 dark:text-indigo-400">{score}<span className="text-3xl text-slate-400 ml-2">/ {topic.content[activeMode]?.length || 0}</span></p>
                   </div>
                   <div className="p-12 rounded-[3rem] bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800">
                      <p className="text-sm font-black uppercase text-emerald-500 mb-2 tracking-widest">Mastery Level</p>
                      <p className="text-7xl font-black text-emerald-600 dark:text-emerald-400">
                        {Math.round((score / (topic.content[activeMode]?.length || 1)) * 100)}%
                      </p>
                   </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                <button 
                  onClick={() => navigate('/dashboard')}
                  className={`px-10 py-6 rounded-3xl font-black text-2xl border-4 transition-all hover:scale-105 ${isDark ? 'border-slate-700 hover:bg-slate-800 text-white' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}
                >
                  Return to Hub
                </button>
                <button 
                  onClick={() => {
                    if (activeMode === 'learn') resetMode('practice');
                    else if (activeMode === 'practice') resetMode('challenge');
                    else if (activeMode === 'challenge') resetMode('test');
                    else resetMode('test');
                  }}
                  className="px-10 py-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-3xl font-black text-2xl transition-transform shadow-2xl hover:scale-105"
                >
                  {activeMode === 'learn' ? 'Start Practice' : 
                   activeMode === 'practice' ? 'Start Challenge' :
                   activeMode === 'challenge' ? 'Start Final Test' : 'Retake Final Test'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
