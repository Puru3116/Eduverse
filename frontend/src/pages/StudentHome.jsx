import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { BUILDER_CURRICULUM } from '../store/builderConfig';
import { ACHIEVER_CURRICULUM } from '../store/achieverConfig';
import { 
  Calculator, Languages, Sprout, ArrowRight, 
  Trophy, Target, Sparkles, BookOpen, 
  Zap, Compass, User, Moon, Sun, Info, MousePointer2, XCircle
} from 'lucide-react';
import api from '../utils/api';
import StudentProfile from './StudentProfile';
import StudentCommunication from './StudentCommunication';
import { MessageSquare as ChatIcon, CheckCircle2, AlertCircle as LeaveIcon, Clock, FileDown, Loader2 } from 'lucide-react';
import ProgressReportPDF from '../components/ProgressReportPDF';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const FloatingShape = ({ emoji, delay, x, y, duration, extraClass = "" }) => (
  <motion.div
    style={{ left: x, top: y }}
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: [0, -30, 0], opacity: 0.25 }}
    transition={{ delay, duration, repeat: Infinity, ease: "easeInOut" }}
    className={`absolute text-5xl md:text-7xl pointer-events-none select-none z-0 ${extraClass}`}
  >
    {emoji}
  </motion.div>
);

const EduBot = ({ message }) => (
  <motion.div 
    initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
    className="flex items-start gap-4 bg-white p-6 rounded-[2rem] shadow-xl border-l-[8px] border-indigo-500 max-w-2xl"
  >
    <div className="text-5xl shrink-0 animate-pulse">🤖</div>
    <div>
      <p className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-1">EduBot Expert</p>
      <p className="text-lg font-bold text-slate-700 leading-tight">{message}</p>
    </div>
  </motion.div>
);

export default function StudentHome() {
  const { 
    student, setStudent, setStudentToken,
    theme, setTheme,
    selectedModule, setSelectedModule,
    selectedTopic, setSelectedTopic
  } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [selectedModuleInfo, setSelectedModuleInfo] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [reportData, setReportData] = useState(null);
  const navigate = useNavigate();
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    if (!student) {
      navigate('/welcome');
    } else if (student.id !== 'dummy_id_123') {
      if (!student.classGrade) {
        // Needs to select class
      } else if (!student.hasCompletedPretest) {
        navigate('/pretest');
      }
    }
  }, [student, navigate]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await api.get(`/progress/${student.id}`);
        setProgress(res.data);
      } catch (err) {
        console.error("Fetch progress failed", err);
      }
    };

    if (student?.id && student.id !== 'dummy_id_123') {
      fetchProgress();
      
      // Check attendance
      const checkAttendance = async () => {
        try {
          const res = await api.get('/attendance/today');
          console.log("Attendance response:", res.data);
          if (!res.data) {
            setAttendanceMarked(false);
            setShowAttendanceModal(true); 
          } else {
            setAttendanceMarked(true);
          }
        } catch (err) {
          console.error("Fetch attendance failed", err);
        }
      };
      checkAttendance();
    }
  }, [student]);

  const handleSelectGrade = async (grade) => {
    setLoading(true);
    try {
      const studentId = student.id || student._id;
      const res = await api.put(`/students/${studentId}`, {
        classGrade: grade,
      });
      setStudent(res.data);
      if (!res.data.hasCompletedPretest) navigate('/pretest');
    } catch(err) {
      console.error(err);
      alert('Failed to update class grade: ' + (err.response?.data?.message || err.message));
    }
    setLoading(false);
  };

  const isLevelUnlocked = (topicId, lvlId) => {
    // Legacy support for Explorer
    if (lvlId === 1) return true;
    return progress.some(p => p.gameId === topicId && p.levelNumber >= lvlId - 1);
  };

  const isTopicUnlocked = (topicId) => {
    // Basic logic: topics are unlocked by default, but levels inside are locked.
    // For now, return true.
    return true;
  };

  const gradeOptions = [
    { id: '1', title: 'Explorer', sub: 'Nursery to 1', icon: '🧩', desc: 'Basics of words & numbers' },
    { id: '2-5', title: 'Builder', sub: 'Class 2 – 5', icon: '🏗️', desc: 'Complex math & concepts' },
    { id: '6-8', title: 'Achiever', sub: 'Class 6 – 8', icon: '🏆', desc: 'Advanced skills & logic' }
  ];

  const explorerModules = [
    {
      id: 'math', title: 'Math Bazaar', desc: 'Numbers & Shopping', colors: 'from-blue-400 to-cyan-400 border-cyan-100', icon: <Calculator size={36} className="text-white" />,
      mascot: "🛒",
      info: "Welcome to Math Bazaar, a vibrant marketplace for mastering numbers! You'll build a strong foundation in arithmetic through three main adventures: 🧩 Drag Match helps you connect symbols to quantities; 🛍️ Manage Your Shop teaches real-world addition and subtraction as you serve customers; and ⏱️ Time Quiz sharpens your mental math speed and accuracy. Perfect for building financial literacy and confidence!",
      games: [{ path: '/play/math/dragdrop', name: 'Drag Match', emoji: '🧩' }, { path: '/play/math/shop', name: 'Manage your shop', emoji: '🛍️' }, { path: '/play/math/quiz', name: 'Time Quiz', emoji: '⏱️' }]
    },
    {
      id: 'shabd', title: 'Shabd Quest', desc: 'Language & Words', colors: 'from-fuchsia-400 to-purple-500 border-purple-100', icon: <Languages size={36} className="text-white" />,
      mascot: "📚",
      info: "Embark on a linguistic journey with Shabd Quest! Master the building blocks of communication through our core challenges: 🅰️ Word Match links vocabulary to visual images for better memory; 📝 Fill Blanks teaches grammar and sentence structure in context; and 👂 Audio Guess improves listening comprehension by identifying spoken words. Build the confidence to read, write, and speak fluently!",
      games: [{ path: '/play/shabd/match', name: 'Word Match', emoji: '🅰️' }, { path: '/play/shabd/blanks', name: 'Fill Blanks', emoji: '📝' }, { path: '/play/shabd/audio', name: 'Audio Guess', emoji: '👂' }]
    },
    {
      id: 'rural', title: 'Rural Quest', desc: 'Life Skills', colors: 'from-orange-400 to-amber-500 border-amber-100', icon: <Sprout size={36} className="text-white" />,
      mascot: "🚜",
      info: "Prepare for the real world with Rural Quest! Learn vital life skills through interactive village adventures: 🗑️ Sort Goods teaches hygiene and hazard awareness by organizing items; ⚡ Quick Choice develops fast reflexes for making safe decisions; and 🏕️ Scenarios navigate complex social situations through wisdom-filled stories. Learn to stay safe, healthy, and responsible in any environment!",
      games: [{ path: '/play/rural/sorting', name: 'Sort Goods', emoji: '🗑️' }, { path: '/play/rural/quick', name: 'Quick Choice', emoji: '⚡' }, { path: '/play/rural/scenario', name: 'Scenarios', emoji: '🏕️' }]
    }
  ];

  const renderExplorerDashboard = () => (
    <div className="max-w-7xl w-full relative z-10">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 mt-4">
        <h2 className={`text-5xl font-black mb-3 drop-shadow-sm ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
          Hi, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{student.firstName} {student.lastName || ''}!</span>
        </h2>
        <div className="flex flex-col items-center gap-4">
          <p className={`text-lg font-bold bg-white/70 inline-flex items-center gap-2 px-6 py-2 rounded-full border-2 border-white/80 shadow-md backdrop-blur-md ${isDarkMode ? 'bg-slate-800/70 text-slate-200 border-slate-700/80' : 'text-slate-600'}`}>
            <span className="animate-bounce">🚀</span> Explorer Mode: Pick an adventure!
          </p>
        </div>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {explorerModules.map((mod, i) => (
          <motion.div key={mod.id} initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
            className={`${isDarkMode ? 'bg-slate-900 shadow-indigo-500/10' : 'bg-white shadow-slate-200/50'} rounded-[3rem] p-3 shadow-xl border-4 ${mod.colors} flex flex-col`}>
            <motion.div 
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedModuleInfo(mod)}
              className={`bg-gradient-to-br ${mod.colors} p-8 rounded-[2.5rem] flex flex-col items-center text-center shadow-inner mb-2 cursor-pointer group relative overflow-hidden`}
            >
              <div className="bg-white/30 p-5 rounded-full shadow-lg backdrop-blur-md mb-4 group-hover:rotate-12 transition-transform">{mod.icon}</div>
              <h3 className="text-3xl font-black text-white mb-1 tracking-wide">{mod.title}</h3>
              <p className="text-white/90 font-bold text-sm tracking-widest uppercase">{mod.desc}</p>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 p-2 rounded-full">
                <Sparkles size={16} className="text-white" />
              </div>

              {/* Pointer Hint - Moved to corner to avoid text overlap */}
              <motion.div 
                animate={{ x: [0, 5, 0], y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-4 left-4 bg-white/20 dark:bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 border border-white/30 group-hover:bg-white/40 transition-all"
              >
                <div className="p-1 rounded-full bg-white/40">
                  <MousePointer2 size={10} className="text-white" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-tighter text-white drop-shadow-sm">Learn!</span>
              </motion.div>
            </motion.div>
            <div className="p-4 space-y-3 grow flex flex-col justify-center">
              {mod.games.map((g, j) => (
                <motion.button key={j} onClick={() => navigate(g.path)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className={`w-full ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 hover:border-slate-600 text-white' : 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-slate-300 text-slate-700'} border-b-4 font-black py-5 px-6 rounded-2xl flex items-center justify-between transition-all active:border-b-0 active:translate-y-1 shadow-sm`}>
                  <span className="text-xl">{g.name}</span>
                  <span className="text-3xl">{g.emoji}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderBuilderDashboard = () => {
    const activeModule = selectedModule ? BUILDER_CURRICULUM[selectedModule] : null;

    return (
      <div className="max-w-7xl w-full relative z-10 pb-20 mt-4 transition-all duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl shadow-xl transition-all ${isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-600 text-white'}`}>
              <Calculator size={36} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className={`text-4xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                Welcome, <span className="text-indigo-500">{student.firstName} {student.lastName || ''}</span>
              </h2>
              <div className="flex items-center gap-3 mt-1">
                <p className={`font-black uppercase tracking-[0.2em] text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Builder Mode • Class 2–5</p>
              </div>
            </div>
          </div>
          <EduBot message={selectedModule ? `In ${activeModule.title}, we learn step-by-step.` : "Choose your path, Expert Scholar."} />
        </div>

        {selectedModule ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-3">
              <button onClick={() => { setSelectedModule(null); setSelectedTopic(null); }} className="flex items-center gap-2 text-indigo-500 font-black uppercase tracking-widest text-xs hover:gap-4 transition-all mb-6 ml-4">
                &larr; Back to Modules
              </button>
              <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] ml-4 mb-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Curriculum Topics</h3>
              {activeModule.topics.map((topic) => (
                <button key={topic.id} onClick={() => setSelectedTopic(topic)}
                  className={`w-full group text-left p-5 rounded-3xl border transition-all relative overflow-hidden ${selectedTopic?.id === topic.id ? `${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white shadow-xl border-slate-200'}` : `${isDarkMode ? 'bg-slate-900/30 border-white/5 hover:bg-slate-800/50' : 'bg-slate-50/50 border-slate-200 hover:bg-white hover:shadow-md'}`}`}
                >
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <p className={`text-lg font-black ${selectedTopic?.id === topic.id ? (isDarkMode ? 'text-white' : 'text-slate-900') : (isDarkMode ? 'text-slate-300' : 'text-slate-600')}`}>{topic.title}</p>
                      <p className={`text-[10px] font-bold mt-1 uppercase tracking-widest ${selectedTopic?.id === topic.id ? 'opacity-80' : 'opacity-50'} ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{topic.desc}</p>
                    </div>
                    {selectedTopic?.id === topic.id && (
                      <motion.div layoutId="activeDot" className={`w-4 h-4 rounded-full shadow-lg bg-gradient-to-br ${activeModule.colors}`} />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className={`lg:col-span-8 rounded-[3rem] p-8 shadow-2xl border transition-all min-h-[500px] flex flex-col relative overflow-hidden ${isDarkMode ? 'bg-slate-900/90 border-white/10' : 'bg-white border-slate-200'}`}>
              
              {/* Background Glow based on active module */}
              <div className={`absolute -top-40 -right-40 w-96 h-96 rounded-full blur-[100px] opacity-20 bg-gradient-to-br ${activeModule.colors} pointer-events-none`}></div>
              <div className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-[100px] opacity-20 bg-gradient-to-br ${activeModule.colors} pointer-events-none`}></div>

              {selectedTopic ? (
                // Blueprint Path
                <div className="h-full flex flex-col relative z-10">
                  <div className="mb-10 flex items-center justify-between border-b pb-6 dark:border-white/10 border-slate-100">
                    <div>
                      <p className={`text-xs font-black uppercase tracking-[0.2em] mb-1 bg-gradient-to-r ${activeModule.colors} text-transparent bg-clip-text`}>Blueprint Active</p>
                      <h4 className={`text-4xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{selectedTopic.title}</h4>
                    </div>
                    <div className="text-5xl opacity-20 filter grayscale">{activeModule.icon}</div>
                  </div>
                  
                  <div className="flex-1 flex flex-col items-center justify-center relative py-12">
                    {/* Connecting Dashed Line */}
                    <div className="absolute top-1/2 left-[10%] right-[10%] h-1 border-t-[6px] border-dashed border-slate-200 dark:border-slate-800 -translate-y-1/2 z-0 opacity-50"></div>

                    <div className="flex justify-between items-center w-[85%] relative z-10">
                      {[
                        { id: 'learn', label: 'Deep Learning', icon: '📖' },
                        { id: 'practice', label: 'Practice', icon: '🎮' },
                        { id: 'challenge', label: 'Challenge', icon: '⚡' },
                        { id: 'test', label: 'Final Test', icon: '🏆' }
                      ].map((lvl, index) => {
                        const savedProg = localStorage.getItem(`builder_prog_${selectedTopic.id}`);
                        const completedModes = savedProg ? JSON.parse(savedProg) : [];
                        
                        const unlocked = index === 0 || completedModes.includes(['learn', 'practice', 'challenge'][index - 1]);
                        const completed = completedModes.includes(lvl.id);
                        
                        return (
                          <div key={lvl.id} className="flex flex-col items-center group relative">
                            <motion.div animate={unlocked && !completed ? { y: [-5, 5, -5] } : {}} transition={{ repeat: Infinity, duration: 3, delay: index * 0.2 }}>
                              <motion.button 
                                whileHover={unlocked ? { scale: 1.15, rotate: 5 } : {}} 
                                whileTap={unlocked ? { scale: 0.9 } : {}} 
                                disabled={!unlocked} 
                                onClick={() => navigate(`/play/builder/${selectedModule}/${selectedTopic.id}`)}
                                className={`w-24 h-24 rounded-[2rem] flex flex-col items-center justify-center shadow-2xl transition-all border-b-[8px] relative ${
                                  completed 
                                    ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 border-emerald-800 text-white shadow-emerald-500/50' 
                                    : unlocked 
                                      ? `bg-gradient-to-br ${activeModule.colors} border-black/20 text-white shadow-indigo-500/50` 
                                      : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-900 text-slate-400 dark:text-slate-600 opacity-60 cursor-not-allowed grayscale'
                                }`}
                              >
                                {unlocked && !completed && <div className="absolute inset-0 rounded-[2rem] border-2 border-white/50 animate-pulse"></div>}
                                <span className="text-4xl drop-shadow-md">{lvl.icon}</span>
                              </motion.button>
                            </motion.div>
                            
                            <div className={`mt-6 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${completed ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400' : unlocked ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' : 'opacity-50'}`}>
                              {lvl.label}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="mt-28 text-center relative z-10">
                       <button onClick={() => navigate(`/play/builder/${selectedModule}/${selectedTopic.id}`)}
                        className={`group flex items-center gap-6 px-16 py-6 rounded-[2.5rem] bg-gradient-to-r ${activeModule.colors} text-white font-black text-2xl shadow-2xl hover:brightness-110 active:translate-y-2 active:border-b-0 border-b-[8px] border-black/20 transition-all`}>
                         CONTINUE JOURNEY
                         <div className="bg-white/20 p-2 rounded-full group-hover:translate-x-2 transition-transform">
                           <ArrowRight strokeWidth={3} />
                         </div>
                       </button>
                    </div>
                  </div>
                </div>
              ) : (
                // Module Overview (Empty State)
                <div className="h-full flex flex-col relative z-10">
                  <div className="text-center mb-10 mt-6">
                    <motion.div 
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}
                      className={`inline-flex items-center justify-center w-28 h-28 rounded-[2rem] bg-gradient-to-br ${activeModule.colors} text-6xl text-white shadow-2xl mb-6 border-4 border-white/20 dark:border-white/10 rotate-3`}
                    >
                      {activeModule.icon}
                    </motion.div>
                    <h2 className={`text-5xl font-black tracking-tight mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{activeModule.title} Overview</h2>
                    <p className={`text-lg font-bold max-w-lg mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Select a topic from the left to explore its learning path and master the concepts.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2 overflow-y-auto max-h-[360px] custom-scrollbar pr-4">
                    {activeModule.topics.map((topic, i) => (
                      <motion.button 
                        key={topic.id}
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: 1.03, y: -5 }} whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedTopic(topic)}
                        className={`p-6 rounded-[2rem] text-left transition-all border-b-[6px] group ${isDarkMode ? 'bg-slate-800 border-slate-950 hover:bg-slate-700' : 'bg-slate-50 border-slate-200 hover:bg-white shadow-lg hover:shadow-xl'}`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${activeModule.colors} opacity-90 flex items-center justify-center text-white text-2xl shadow-inner group-hover:rotate-12 transition-transform`}>
                            {i + 1}
                          </div>
                          <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'bg-slate-900/50 text-slate-400' : 'bg-slate-200 text-slate-600'}`}>
                            4 Stages
                          </div>
                        </div>
                        <h4 className={`text-xl font-black mb-1 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{topic.title}</h4>
                        <p className={`text-sm font-bold opacity-70 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{topic.desc}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {Object.entries(BUILDER_CURRICULUM).map(([key, mod]) => (
                <motion.button key={key} whileHover={{ scale: 1.02, y: -10 }} whileTap={{ scale: 0.98 }} onClick={() => setSelectedModule(key)}
                  className={`rounded-[3rem] p-8 transition-all shadow-2xl border-b-[12px] bg-gradient-to-br ${mod.colors} border-black/10 group relative overflow-hidden text-left flex flex-col min-h-[340px]`}>
                  
                  {/* Decorative Background Elements */}
                  <div className="absolute top-[-20px] right-[-20px] bg-white/10 w-40 h-40 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
                  <div className="absolute bottom-[-10px] left-[-10px] bg-black/10 w-32 h-32 rounded-full blur-xl pointer-events-none"></div>
                  
                  <div className="relative z-10 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-20 h-20 rounded-3xl bg-white/25 backdrop-blur-md flex items-center justify-center text-5xl shadow-inner group-hover:rotate-12 transition-transform duration-300 border border-white/20">
                        {mod.icon}
                      </div>
                      <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white font-black text-[10px] uppercase tracking-widest shadow-sm border border-white/10">
                        {mod.topics.length} Topics
                      </span>
                    </div>
                    
                    <h3 className="text-4xl font-black mb-3 text-white drop-shadow-md tracking-tight leading-none">{mod.title}</h3>
                    <p className="text-white/90 font-bold mb-8 leading-snug max-w-[90%] text-sm">
                      Master foundational concepts through interactive step-by-step blueprints.
                    </p>
                    
                    <div className="mt-auto">
                      <div className="inline-flex items-center gap-3 bg-white text-slate-800 px-6 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-xl group-hover:shadow-2xl transition-all group-hover:bg-slate-50">
                        Start Building <ArrowRight size={18} className={`text-${mod.colors.split(' ')[0].split('-')[1]}-500 group-hover:translate-x-1 transition-transform`} />
                      </div>
                    </div>
                  </div>
                </motion.button>
             ))}
          </div>
        )}
      </div>
    );
  };

  const renderAchieverDashboard = () => {
    const activeModule = selectedModule ? ACHIEVER_CURRICULUM[selectedModule] : null;

    return (
      <div className="max-w-7xl w-full relative z-10 pb-20 mt-4 transition-all duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-5">
            <div className={`w-16 h-16 rounded-3xl shadow-2xl flex items-center justify-center ${isDarkMode ? 'bg-indigo-600/20 text-indigo-400' : 'bg-indigo-600 text-white'}`}>
              <Trophy size={36} />
            </div>
            <div>
              <h2 className={`text-4xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Welcome: <span className="text-indigo-500">{student.firstName} {student.lastName || ''}</span></h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-slate-100 dark:bg-slate-900 text-slate-500">Class 6–8</span>
              </div>
            </div>
          </div>
        </div>


        <div className="w-full">
           {!selectedModule ? (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {Object.entries(ACHIEVER_CURRICULUM).map(([key, mod]) => (
                 <motion.button
                   key={key} whileHover={{ scale: 1.02, y: -10 }} whileTap={{ scale: 0.98 }} onClick={() => setSelectedModule(key)}
                   className={`p-10 rounded-[3rem] text-left transition-all relative overflow-hidden group shadow-2xl border-b-[12px] bg-gradient-to-br ${mod.colors} border-black/20 flex flex-col min-h-[360px]`}
                 >
                   {/* Decorative Ambient Orbs */}
                   <div className="absolute top-[-30px] right-[-30px] bg-white/10 w-48 h-48 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
                   <div className="absolute bottom-[-10px] left-[-10px] bg-black/10 w-32 h-32 rounded-full blur-xl pointer-events-none"></div>
                   <div className="absolute top-4 right-4 text-8xl opacity-10 filter grayscale group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 pointer-events-none">{mod.icon}</div>

                   <div className="relative z-10 flex-1 flex flex-col">
                     <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl text-white mb-8 group-hover:rotate-12 transition-transform duration-300 shadow-inner border border-white/20">
                       {mod.icon}
                     </div>
                     <h3 className="text-4xl font-black mb-3 text-white drop-shadow-md">{mod.title}</h3>
                     <p className="text-white/80 font-bold mb-8 text-sm leading-relaxed max-w-[90%]">
                       Master advanced concepts and tackle complex problems through deep learning paths.
                     </p>
                     
                     <div className="mt-auto">
                       <div className="inline-flex items-center gap-3 bg-white text-slate-800 px-6 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-xl group-hover:shadow-2xl transition-all group-hover:bg-slate-50">
                         Begin Path <ArrowRight size={18} className="text-indigo-600 group-hover:translate-x-1 transition-transform" />
                       </div>
                     </div>
                   </div>
                 </motion.button>
               ))}
             </div>
           ) : (
             <div className="space-y-8 relative">
               <div className="flex items-center justify-between border-b pb-6 dark:border-white/10 border-slate-200">
                 <button onClick={() => { setSelectedModule(null); setSelectedTopic(null); }} className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-widest text-xs hover:gap-4 transition-all bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-full">
                   &larr; Back to Modules
                 </button>
                 <div className="text-right">
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">Advanced Mastery</p>
                   <h3 className={`text-3xl font-black bg-gradient-to-r ${ACHIEVER_CURRICULUM[selectedModule].colors} text-transparent bg-clip-text`}>{ACHIEVER_CURRICULUM[selectedModule].title}</h3>
                 </div>
               </div>

               {selectedModule === 'science' && !selectedTopic?.category ? (
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                   {['physics', 'chemistry', 'biology'].map(cat => (
                     <motion.button
                       key={cat} whileHover={{ y: -10, scale: 1.02 }} whileTap={{ scale: 0.98 }}
                       onClick={() => setSelectedTopic({ category: cat })}
                       className={`p-8 rounded-[3rem] border-2 text-left transition-all relative overflow-hidden group shadow-xl ${
                         cat === 'physics' ? 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-900/50 hover:border-blue-500 hover:shadow-blue-500/20' : 
                         cat === 'chemistry' ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-900/50 hover:border-amber-500 hover:shadow-amber-500/20' : 
                         'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-900/50 hover:border-emerald-500 hover:shadow-emerald-500/20'
                       }`}
                     >
                        <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-6 shadow-lg group-hover:rotate-12 transition-transform ${
                          cat === 'physics' ? 'bg-gradient-to-br from-blue-400 to-indigo-500 text-white' : 
                          cat === 'chemistry' ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white' : 
                          'bg-gradient-to-br from-emerald-400 to-teal-500 text-white'
                        }`}>
                           {cat === 'physics' ? <Zap size={32} /> : cat === 'chemistry' ? <Sparkles size={32} /> : <Sprout size={32} />}
                        </div>
                        <h4 className={`text-3xl font-black capitalize mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{cat}</h4>
                        <p className={`text-sm font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Deep dive into complex {cat} principles and theoretical mastery.</p>
                     </motion.button>
                   ))}
                 </div>
               ) : (
                 <div className="mt-8">
                    {selectedModule === 'science' && (
                       <div className="mb-8 flex items-center gap-4">
                          <button onClick={() => setSelectedTopic(null)} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                            &larr;
                          </button>
                          <div>
                            <h4 className={`text-3xl font-black capitalize ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{selectedTopic?.category} Portals</h4>
                            <p className="text-sm font-bold text-slate-400 mt-1">Select a topic to begin your advanced study session.</p>
                          </div>
                       </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                      {ACHIEVER_CURRICULUM[selectedModule].topics
                        .filter(t => selectedModule !== 'science' || t.category === selectedTopic?.category)
                        .map((topic, i) => (
                          <motion.button 
                             key={topic.id} 
                             initial={{ opacity: 0, y: 40, scale: 0.95 }} 
                             animate={{ opacity: 1, y: 0, scale: 1 }} 
                             transition={{ delay: i * 0.1, type: "spring", stiffness: 80 }}
                             whileHover={{ scale: 1.05, y: -15 }}
                             whileTap={{ scale: 0.95 }}
                             onClick={() => navigate(`/achiever/${selectedModule}/${topic.id}`)}
                             className={`group relative p-1 rounded-[3.5rem] transition-all duration-500 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] ${
                               isDarkMode 
                                 ? 'hover:shadow-indigo-500/20' 
                                 : 'hover:shadow-indigo-500/30'
                             }`}
                          >
                             {/* Animated Border Gradient */}
                             <div className={`absolute inset-0 opacity-20 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${ACHIEVER_CURRICULUM[selectedModule].colors} p-[2px]`}></div>
                             
                             {/* Card Body */}
                             <div className={`relative h-full w-full p-10 rounded-[3.4rem] flex flex-col z-10 transition-colors duration-500 ${
                               isDarkMode 
                                 ? 'bg-[#0f172a] group-hover:bg-[#1e293b]' 
                                 : 'bg-white group-hover:bg-indigo-50/30'
                             }`}>
                               
                               {/* Floating Icon Background */}
                               <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>

                               <div className="flex justify-between items-start mb-10 relative z-10">
                                  <div className="relative">
                                     <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center shadow-2xl group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-500 bg-gradient-to-br ${ACHIEVER_CURRICULUM[selectedModule].colors} text-white relative z-10 border-4 ${isDarkMode ? 'border-slate-800' : 'border-white'}`}>
                                       <BookOpen size={44} className="drop-shadow-lg" />
                                     </div>
                                     <div className={`absolute inset-0 rounded-[2.5rem] blur-xl opacity-40 group-hover:opacity-60 transition-opacity bg-gradient-to-br ${ACHIEVER_CURRICULUM[selectedModule].colors}`}></div>
                                  </div>
                                  
                                  <div className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-tighter shadow-sm flex items-center gap-3 border ${
                                    isDarkMode 
                                      ? 'bg-slate-800/80 text-indigo-400 border-white/5' 
                                      : 'bg-white text-indigo-600 border-indigo-100'
                                  }`}>
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
                                    {topic.content?.learn?.concept?.length || 0} Modules
                                  </div>
                               </div>
                               
                               <div className="relative z-10 flex-1">
                                 <h4 className={`text-4xl font-black mb-4 tracking-tighter group-hover:text-indigo-500 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                   {topic.title}
                                 </h4>
                                 <p className={`text-lg font-bold leading-relaxed mb-8 transition-colors ${isDarkMode ? 'text-slate-400 group-hover:text-slate-300' : 'text-slate-500 group-hover:text-slate-600'}`}>
                                   {topic.desc}
                                 </p>
                               </div>

                               <div className="mt-auto relative z-10">
                                 <div className={`inline-flex items-center gap-3 px-8 py-4 rounded-3xl font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-lg ${
                                   isDarkMode 
                                     ? 'bg-indigo-600 text-white group-hover:bg-indigo-500' 
                                     : 'bg-indigo-600 text-white group-hover:bg-indigo-700'
                                 }`}>
                                   Unlock Session <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                 </div>
                               </div>
                             </div>
                          </motion.button>
                      ))}
                    </div>
                 </div>
               )}
             </div>
           )}
        </div>
      </div>
    );
  };

  const handleMarkAttendance = async (status) => {
    try {
      await api.post('/attendance/mark', { status });
      setAttendanceMarked(true);
      setShowAttendanceModal(false);
    } catch (err) {
      console.error("Mark attendance failed:", err.response?.data || err.message);
      alert('Failed to mark attendance: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDownloadReport = async () => {
    setIsGeneratingPDF(true);
    try {
      // 1. Fetch latest progress and attendance
      const [progressRes, attendanceRes] = await Promise.all([
        api.get(`/progress/${student.id}`),
        api.get('/attendance-history')
      ]);

      // 2. Set data to state so the hidden component renders it
      setReportData({
        progressData: progressRes.data,
        attendanceData: attendanceRes.data
      });

      // 3. Wait a moment for React to render the hidden component
      setTimeout(async () => {
        try {
          console.log("Starting isolated PDF generation...");
          const input = document.getElementById('progress-report-content');
          if (!input) {
             setIsGeneratingPDF(false);
             setReportData(null);
             alert("Error: Report template not found.");
             return;
          }

          // Create an isolated iframe to avoid Tailwind oklch style conflicts
          const iframe = document.createElement('iframe');
          iframe.style.position = 'fixed';
          iframe.style.top = '0';
          iframe.style.left = '0';
          iframe.style.width = '1000px'; // Extra width to avoid wrapping
          iframe.style.height = '1000px';
          iframe.style.visibility = 'hidden';
          document.body.appendChild(iframe);

          const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
          
          // Inject ONLY the necessary styles (classic hex only)
          iframeDoc.write(`
            <html>
              <head>
                <style>
                  body { margin: 0; padding: 0; background: white; font-family: sans-serif; }
                  * { box-sizing: border-box; }
                  table { width: 100%; border-collapse: collapse; }
                  th, td { padding: 12px; border-bottom: 1px solid #eee; }
                </style>
              </head>
              <body>
                ${input.outerHTML}
              </body>
            </html>
          `);
          iframeDoc.close();

          // Wait for iframe to "render"
          setTimeout(async () => {
            try {
              const canvas = await html2canvas(iframeDoc.body, { 
                scale: 1.5,
                useCORS: true,
                backgroundColor: "#ffffff",
                logging: false
              });
              
              const imgData = canvas.toDataURL('image/png');
              const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
              const pdfWidth = pdf.internal.pageSize.getWidth();
              const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
              
              pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
              pdf.save(`EduVerse_Report_${student.firstName}_${student.lastName}.pdf`);
              
              document.body.removeChild(iframe);
              setIsGeneratingPDF(false);
              setReportData(null);
            } catch (err) {
              console.error("Iframe capture failed:", err);
              document.body.removeChild(iframe);
              throw err;
            }
          }, 500);

        } catch (innerErr) {
          console.error("PDF Error:", innerErr);
          alert(`Failed to generate PDF: ${innerErr.message}`);
          setIsGeneratingPDF(false);
          setReportData(null);
        }
      }, 1500);

    } catch (err) {
      console.error("Failed to generate report:", err);
      let errorMsg = err.message;
      if (err.response) {
        errorMsg = `API Error ${err.response.status}: ${JSON.stringify(err.response.data)}`;
      }
      alert(`Failed to download report. Error: ${errorMsg}`);
      setIsGeneratingPDF(false);
      setReportData(null);
    }
  };

  return (
    <div className={`min-h-screen relative font-sans transition-all duration-700 overflow-hidden ${isDarkMode ? 'bg-gradient-to-b from-[#0a0f1e] to-indigo-950' : 'bg-gradient-to-b from-sky-300 to-sky-50'}`}>
      {!isDarkMode ? (
        <>
          {/* Light Mode: Sky, Clouds, Birds, Sun */}
          <FloatingShape emoji="☀️" delay={0} x="85%" y="10%" duration={20} extraClass="text-[120px] drop-shadow-[0_0_50px_rgba(250,204,21,0.8)]" />
          <FloatingShape emoji="☁️" delay={2} x="10%" y="20%" duration={15} extraClass="opacity-40" />
          <FloatingShape emoji="☁️" delay={5} x="75%" y="30%" duration={20} extraClass="opacity-50" />
          <FloatingShape emoji="☁️" delay={0} x="45%" y="15%" duration={25} extraClass="opacity-30" />
          <FloatingShape emoji="🐦" delay={3} x="25%" y="35%" duration={12} extraClass="text-4xl" />
          <FloatingShape emoji="🐦" delay={7} x="60%" y="25%" duration={14} extraClass="text-3xl" />
          <FloatingShape emoji="🪁" delay={1} x="80%" y="50%" duration={18} extraClass="text-5xl" />
          <FloatingShape emoji="☁️" delay={4} x="30%" y="65%" duration={22} extraClass="opacity-40" />
          <FloatingShape emoji="🐦" delay={8} x="15%" y="80%" duration={16} extraClass="text-4xl" />
          <FloatingShape emoji="☁️" delay={6} x="85%" y="75%" duration={24} extraClass="opacity-50" />
        </>
      ) : (
        <>
          {/* Dark Mode: Space, Moon, Stars, Black Clouds */}
          <FloatingShape emoji="🌕" delay={0} x="80%" y="15%" duration={25} extraClass="text-[100px] drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]" />
          <FloatingShape emoji="🌟" delay={1} x="15%" y="20%" duration={8} extraClass="text-3xl animate-pulse" />
          <FloatingShape emoji="✨" delay={2} x="40%" y="10%" duration={12} extraClass="text-5xl" />
          <FloatingShape emoji="⭐" delay={0.5} x="70%" y="30%" duration={10} extraClass="text-2xl animate-pulse" />
          <FloatingShape emoji="☄️" delay={5} x="30%" y="50%" duration={15} extraClass="text-6xl rotate-45" />
          <FloatingShape emoji="🪐" delay={3} x="10%" y="60%" duration={20} extraClass="text-6xl" />
          <FloatingShape emoji="☁️" delay={4} x="20%" y="25%" duration={18} extraClass="opacity-40 invert grayscale" />
          <FloatingShape emoji="☁️" delay={2} x="85%" y="45%" duration={22} extraClass="opacity-30 invert grayscale" />
          <FloatingShape emoji="🌟" delay={4} x="50%" y="80%" duration={14} extraClass="text-4xl animate-pulse" />
          <FloatingShape emoji="🛸" delay={6} x="85%" y="75%" duration={16} extraClass="text-5xl" />
          <FloatingShape emoji="✨" delay={3} x="15%" y="85%" duration={18} extraClass="text-4xl" />
        </>
      )}

      <div className="relative z-10 flex flex-col items-center p-6 min-h-screen">
        <div className="w-full flex justify-between items-center mb-8 max-w-7xl mt-4">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className={`flex items-center space-x-3 px-6 py-4 rounded-full shadow-2xl border-b-4 ${isDarkMode ? 'bg-slate-900 border-indigo-900/50' : 'bg-white border-indigo-200'}`}>
            <span className="text-3xl">🌍</span>
            <h1 className={`text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-indigo-600'}`}>EduVerse</h1>
          </motion.div>
          
          <div className="flex items-center gap-4">
            {!student && (
              <button onClick={() => navigate('/teacher/login')} className={`font-black px-6 py-3 rounded-full shadow-lg border-b-4 transition-all active:scale-95 ${isDarkMode ? 'bg-indigo-500/10 text-indigo-400 border-indigo-900/50 hover:bg-indigo-500/20' : 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50'}`}>
                👩‍🏫 Teacher Portal
              </button>
            )}
            {student && (
              <>
                <button 
                  onClick={() => setShowChat(true)}
                  className={`font-black px-6 py-3 rounded-full shadow-lg border-b-4 flex items-center gap-2 transition-all active:scale-95 ${isDarkMode ? 'bg-emerald-600/20 text-emerald-400 border-emerald-900/50 hover:bg-emerald-600/30' : 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100'}`}>
                  <ChatIcon size={18} />
                  MESSAGES
                </button>
                {!attendanceMarked && (
                  <button 
                    onClick={() => setShowAttendanceModal(true)}
                    className={`font-black px-6 py-3 rounded-full shadow-lg border-b-4 flex items-center gap-2 transition-all active:scale-95 ${isDarkMode ? 'bg-amber-500/10 text-amber-500 border-amber-900/50 hover:bg-amber-500/20' : 'bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100'}`}>
                    <Clock size={18} />
                    MARK ATTENDANCE
                  </button>
                )}
                <button 
                  onClick={() => setShowProfile(true)}
                  className={`font-black px-6 py-3 rounded-full shadow-lg border-b-4 flex items-center gap-2 transition-all active:scale-95 ${isDarkMode ? 'bg-indigo-600/20 text-indigo-400 border-indigo-900/50 hover:bg-indigo-600/30' : 'bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100'}`}>
                  {student.profileImage ? (
                    <img src={student.profileImage} alt="P" className="w-6 h-6 rounded-full object-cover" />
                  ) : (
                    <User size={18} />
                  )}
                  PROFILE
                </button>
                <button 
                  onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
                  className={`p-3 rounded-full shadow-lg border-b-4 transition-all active:scale-95 ${isDarkMode ? 'bg-amber-500/10 text-amber-500 border-amber-900/50 hover:bg-amber-500/20' : 'bg-white text-amber-500 border-amber-200 hover:bg-amber-50'}`}>
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button 
                  onClick={handleDownloadReport}
                  disabled={isGeneratingPDF}
                  className={`font-black px-6 py-3 rounded-full shadow-lg border-b-4 flex items-center gap-2 transition-all active:scale-95 ${isDarkMode ? 'bg-purple-600/20 text-purple-400 border-purple-900/50 hover:bg-purple-600/30' : 'bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-100'}`}>
                  {isGeneratingPDF ? <Loader2 size={18} className="animate-spin" /> : <FileDown size={18} />}
                  {isGeneratingPDF ? 'GENERATING...' : 'REPORT'}
                </button>
                <button onClick={() => { setStudentToken(null); setStudent(null); }} className={`font-black px-6 py-3 rounded-full shadow-lg border-b-4 ${isDarkMode ? 'bg-rose-500/10 text-rose-500 border-rose-900/50 hover:bg-rose-500/20' : 'bg-white text-rose-500 border-rose-200 hover:bg-rose-50'}`}>LOG OUT</button>
              </>
            )}
          </div>
        </div>

        {/* Hidden PDF Report Generator - Fixed visibility for html2canvas */}
        {reportData && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '800px', zIndex: -100, opacity: 0, visibility: 'visible', pointerEvents: 'none' }}>
            <div id="progress-report-content">
              <ProgressReportPDF 
                student={student}
                progressData={reportData.progressData}
                attendanceData={reportData.attendanceData}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {showProfile ? (
            <StudentProfile key="profile" onClose={() => setShowProfile(false)} />
          ) : showChat ? (
            <StudentCommunication key="chat" onClose={() => setShowChat(false)} />
          ) : (!student) ? null : (!student.classGrade) ? (
            <motion.div key="registration" initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0 }} 
              className={`w-full max-w-2xl p-8 md:p-12 rounded-[3rem] shadow-2xl border-4 ${isDarkMode ? 'bg-slate-900 border-indigo-500 shadow-indigo-500/20' : 'bg-white border-cyan-400 shadow-cyan-200/50'} relative overflow-hidden`}>
              
              <div className="absolute top-[-20px] left-[-20px] w-32 h-32 bg-yellow-400 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute bottom-[-20px] right-[-20px] w-40 h-40 bg-pink-400 rounded-full opacity-20 blur-2xl"></div>
                <div className="space-y-10 relative z-10">
                  <div className="text-center">
                    <h2 className={`text-4xl md:text-5xl font-black mb-3 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Pick Your Path!</h2>
                    <p className={`text-lg md:text-xl font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>Which class are you in?</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {gradeOptions.map((g, idx) => {
                      const colors = idx === 0 ? 'from-cyan-400 to-blue-500 border-blue-600' : idx === 1 ? 'from-pink-400 to-rose-500 border-rose-600' : 'from-amber-400 to-orange-500 border-orange-600';
                      return (
                        <motion.button 
                          key={g.id} 
                          whileHover={{ scale: 1.05, y: -10 }} 
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleSelectGrade(g.id)} 
                          className={`p-6 rounded-[2.5rem] text-center transition-all relative overflow-hidden group bg-gradient-to-br ${colors} text-white shadow-xl border-b-[8px] hover:shadow-2xl`}
                        >
                          <div className="bg-white/20 p-4 rounded-3xl inline-block mb-4 backdrop-blur-sm">
                            <span className="text-5xl">{g.icon}</span>
                          </div>
                          <h3 className="text-2xl font-black mb-2 drop-shadow-sm">{g.title}</h3>
                          <p className="text-xs font-black uppercase tracking-widest bg-white/20 rounded-full py-1.5 mb-3 backdrop-blur-sm">{g.sub}</p>
                          <p className="text-sm font-bold opacity-90">{g.desc}</p>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
            </motion.div>
          ) : selectedModuleInfo ? (
            <motion.div 
              key="module_info"
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md"
            >
              <div className={`w-full max-w-2xl bg-white dark:bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl border-b-[16px] ${selectedModuleInfo.colors.split(' ').pop()} dark:border-slate-800 text-center relative`}>
                <button 
                  onClick={() => setSelectedModuleInfo(null)}
                  className="absolute top-8 right-8 w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border-b-4 border-slate-200 dark:border-slate-950"
                >
                  <ArrowRight className="rotate-180" />
                </button>

                <div className="flex items-center justify-center gap-6 mb-10">
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-8xl">
                    {selectedModuleInfo.mascot}
                  </motion.div>
                  <div className="text-left">
                    <h2 className={`text-4xl font-black ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{selectedModuleInfo.title}</h2>
                    <p className={`font-bold uppercase tracking-[0.2em] text-sm ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>Discovery Hub</p>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2.5rem] mb-12 border-2 border-slate-100 dark:border-slate-800 shadow-inner">
                  <h4 className={`text-xl font-black mb-4 flex items-center justify-center gap-3 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                    <Target size={24} className="text-indigo-500" /> What will we learn?
                  </h4>
                  <p className={`text-lg font-bold leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {selectedModuleInfo.info}
                  </p>
                </div>

                <button 
                  onClick={() => setSelectedModuleInfo(null)}
                  className={`w-full py-6 rounded-3xl bg-gradient-to-r ${selectedModuleInfo.colors} text-white font-black text-2xl shadow-xl hover:brightness-110 active:translate-y-1 transition-all border-b-[8px] border-black/10`}
                >
                  GO TO ADVENTURE!
                </button>
              </div>
            </motion.div>
          ) : student.classGrade === '6-8' ? renderAchieverDashboard() : student.classGrade === '1' ? renderExplorerDashboard() : renderBuilderDashboard()}
        </AnimatePresence>

        {/* Attendance Modal */}
        <AnimatePresence>
          {showAttendanceModal && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
                className={`w-full max-w-lg p-10 rounded-[3rem] shadow-2xl border-b-[12px] text-center relative ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}
              >
                {/* Close Button added for flexibility */}
                <button 
                  onClick={() => setShowAttendanceModal(false)}
                  className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <XCircle size={24} />
                </button>

                <div className="flex justify-center mb-6">
                   <div className="w-20 h-20 rounded-3xl bg-indigo-500/20 flex items-center justify-center text-indigo-500">
                      <Clock size={40} />
                   </div>
                </div>
                
                <h2 className={`text-3xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Daily Attendance</h2>
                <p className={`font-bold mb-10 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Please mark your attendance to continue your learning journey today!</p>
                
                <div className="grid grid-cols-2 gap-6">
                   <motion.button 
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => handleMarkAttendance('present')}
                    className="p-8 rounded-[2rem] bg-emerald-500 text-white font-black shadow-xl shadow-emerald-500/20 border-b-8 border-emerald-700 active:border-b-0 active:translate-y-2 transition-all flex flex-col items-center gap-3"
                   >
                      <CheckCircle2 size={32} />
                      <span className="text-xl">PRESENT</span>
                   </motion.button>

                   <motion.button 
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => handleMarkAttendance('on-leave')}
                    className="p-8 rounded-[2rem] bg-amber-500 text-white font-black shadow-xl shadow-amber-500/20 border-b-8 border-amber-700 active:border-b-0 active:translate-y-2 transition-all flex flex-col items-center gap-3"
                   >
                      <LeaveIcon size={32} />
                      <span className="text-xl">ON LEAVE</span>
                   </motion.button>
                </div>

                <p className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 italic">
                  * Note: Your attendance will be visible to your teacher.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
