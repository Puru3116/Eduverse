import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Activity, LogOut, Sun, Moon, LayoutDashboard, Calendar,
  ArrowLeft, BrainCircuit, Library, Clock, Calculator,
  FileText, CheckSquare, MessageSquare, Settings,
  Bell, FileOutput
} from 'lucide-react';
import api from '../utils/api';

// Import all tabs
import DashboardOverview from './teacher/DashboardOverview';
import StudentManagement from './teacher/StudentManagement';
import CourseManagement from './teacher/CourseManagement';
import Assignments from './teacher/Assignments';
import QuizSystem from './teacher/QuizSystem';
import Attendance from './teacher/Attendance';
import GradingReports from './teacher/GradingReports';
import Communication from './teacher/Communication';
import Notifications from './teacher/Notifications';
import SettingsProfile from './teacher/SettingsProfile';


export default function TeacherDashboard() {
  const { teacherToken, teacher, setTeacherToken, theme, setTheme } = useAppContext();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [allProgress, setAllProgress] = useState([]);
  const [allTests, setAllTests] = useState([]);
  const [allGrades, setAllGrades] = useState([]);
  
  // Tab Management
  const [activeTab, setActiveTab] = useState('dashboard');
  
  useEffect(() => {
    if (!teacherToken) {
      navigate('/teacher/login');
      return;
    }
    
    fetchDashboardData(true);

    // Real-time updates: Poll every 30 seconds without showing loading spinner
    const interval = setInterval(() => fetchDashboardData(false), 30000);
    return () => clearInterval(interval);
  }, [teacherToken, navigate]);

  const fetchDashboardData = async (isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      const [stuRes, progRes, testRes, gradRes] = await Promise.all([
        api.get('/students'),
        api.get('/progress/class/all'),
        api.get('/test/class/all'),
        api.get(`/grades/class/${teacher?.classGrade || '1'}`)
      ]);
      const rawStudents = stuRes.data || [];
      const formattedStudents = rawStudents
        .filter(st => {
          if (!teacher?.classGrade) return true;
          const sGrade = String(st.classGrade || "").trim();
          const tGrade = String(teacher.classGrade).trim();
          // Relaxed matching: check if either string contains the other
          return sGrade.includes(tGrade) || tGrade.includes(sGrade) || sGrade === tGrade;
        })
        .map(st => ({
          ...st,
          name: st.firstName ? st.firstName + (st.lastName ? ' ' + st.lastName : '') : 'Unknown Student'
        }));
      
      console.log(`Raw Students: ${rawStudents.length}, Formatted: ${formattedStudents.length}`);
      
      const studentIds = new Set(formattedStudents.map(s => String(s._id)));
      
      const filteredProgress = (progRes.data || []).filter(p => {
        const sId = p.studentId?._id || p.studentId;
        return sId && studentIds.has(String(sId));
      });
      
      const filteredTests = (testRes.data || []).filter(t => {
        const sId = t.studentId?._id || t.studentId;
        return sId && studentIds.has(String(sId));
      });

      setStudents(formattedStudents);
      setAllProgress(filteredProgress);
      setAllTests(filteredTests);
      setAllGrades(gradRes.data);
      console.log(`Fetched ${formattedStudents.length} students for grade ${teacher?.classGrade}`);
    } catch(err) {
      console.error("Dashboard Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setTeacherToken(null);
    navigate('/');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center font-sans ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'}`}>
        <div className="w-16 h-16 border-8 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const TABS = [
    { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'students', label: 'Students', icon: <Users size={20} /> },
    { id: 'attendance', label: 'Attendance', icon: <Clock size={20} /> },
    { id: 'grading', label: 'Grading', icon: <FileOutput size={20} /> },
    { id: 'communication', label: 'Chat & Announce', icon: <MessageSquare size={20} /> },
    { id: 'notifications', label: 'Staff Hub', icon: <Users size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className={`min-h-screen flex flex-col md:flex-row transition-colors duration-500 font-sans ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Sidebar */}
      <aside className={`w-full md:w-72 p-6 flex flex-col border-r-2 transition-all duration-500 overflow-y-auto custom-scrollbar
        ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}`}>
        
        <div className="flex items-center space-x-4 mb-8">
          <motion.div whileHover={{ rotate: 10, scale: 1.1 }} className="bg-indigo-600 p-3 rounded-[1rem] shadow-lg shadow-indigo-500/20">
            <BrainCircuit className="text-white" size={24} />
          </motion.div>
          <div>
            <h1 className="text-xl font-black tracking-tight leading-none">EduVerse</h1>
            <p className="text-[0.65rem] font-black tracking-[0.2em] uppercase text-indigo-500 mt-1">LMS Hub</p>
          </div>
        </div>
        
        <nav className="flex-1 space-y-1">
          <div className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2 mt-4">Management</div>
          
          {TABS.slice(0, 5).map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-black transition-all group
              ${activeTab === tab.id ? (theme === 'dark' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600') : (theme === 'dark' ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-50')}`}>
              <div className="flex items-center space-x-3">{tab.icon}<span>{tab.label}</span></div>
            </button>
          ))}

          <div className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2 mt-6">Engagement</div>
          
          {TABS.slice(5, 6).map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-black transition-all group
              ${activeTab === tab.id ? (theme === 'dark' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600') : (theme === 'dark' ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-50')}`}>
              <div className="flex items-center space-x-3">{tab.icon}<span>{tab.label}</span></div>
            </button>
          ))}

          <div className="text-[0.65rem] font-black text-slate-400 uppercase tracking-widest mb-3 ml-2 mt-6">System</div>

          {TABS.slice(6).map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-black transition-all group
              ${activeTab === tab.id ? (theme === 'dark' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-indigo-50 text-indigo-600') : (theme === 'dark' ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-50')}`}>
              <div className="flex items-center space-x-3">{tab.icon}<span>{tab.label}</span></div>
            </button>
          ))}
        </nav>

        <div className="mt-8 space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">

          <button onClick={logout} className={`w-full flex items-center justify-center space-x-3 font-black py-3.5 rounded-2xl transition-all border-b-4
            ${theme === 'dark' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20 hover:bg-rose-500/20' : 'bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-100'}`}>
            <LogOut size={18} /><span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto h-screen custom-scrollbar relative">
        
        {/* Top Header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-1 capitalize">
              {activeTab === 'dashboard' ? `Welcome, ${teacher?.name || 'Teacher'}` : TABS.find(t => t.id === activeTab)?.label}
            </h2>
            <p className={`text-lg font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
              <Calendar size={18}/> {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              <span className="mx-2 opacity-20">|</span>
              <span className="text-sm uppercase tracking-tighter opacity-80">{teacher?.classGrade === '1' ? 'Explorer' : teacher?.classGrade === '2-5' ? 'Builder' : teacher?.classGrade === '6-8' ? 'Achiever' : 'Class Admin'}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className={`px-5 py-2.5 rounded-2xl border-2 flex items-center gap-3 font-black ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-white border-slate-200 text-slate-600'}`}>
               <span className="text-xs uppercase tracking-widest text-slate-400">Class Code</span>
               <span className="text-indigo-500 tracking-wider">EDU-V1-X9</span>
            </div>
            <Link to="/" className={`flex items-center gap-2 font-black px-6 py-3 rounded-full shadow-lg border-b-4 transition-all active:scale-95 text-sm
              ${theme === 'dark' ? 'bg-indigo-600 border-indigo-700 text-white hover:bg-indigo-500' : 'bg-indigo-600 border-indigo-700 text-white hover:bg-indigo-500'}`}>
              <ArrowLeft size={18} /> Student App
            </Link>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'dashboard' && <DashboardOverview students={students} allProgress={allProgress} theme={theme} />}
            {activeTab === 'students' && <StudentManagement students={students} allProgress={allProgress} theme={theme} refreshData={fetchDashboardData} />}
            {activeTab === 'courses' && <CourseManagement theme={theme} />}
            {activeTab === 'assignments' && <Assignments theme={theme} />}
            {activeTab === 'quizzes' && <QuizSystem theme={theme} />}
            {activeTab === 'attendance' && <Attendance students={students} theme={theme} />}
            {activeTab === 'grading' && <GradingReports students={students} allProgress={allProgress} allTests={allTests} allGrades={allGrades} theme={theme} refreshData={fetchDashboardData} />}
            {activeTab === 'communication' && <Communication students={students} theme={theme} />}
            {activeTab === 'notifications' && <Notifications theme={theme} />}
            {activeTab === 'settings' && <SettingsProfile theme={theme} teacher={teacher} />}
          </motion.div>
        </AnimatePresence>

      </main>
    </div>
  );
}
