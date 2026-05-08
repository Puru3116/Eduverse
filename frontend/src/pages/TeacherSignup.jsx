import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, Building, ArrowRight, Presentation, BookOpen, ArrowLeft } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import api from '../utils/api';

export default function TeacherSignup() {
  const { setTeacherToken, setTeacher, theme } = useAppContext();
  const [showWelcome, setShowWelcome] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [classGrade, setClassGrade] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const isDarkMode = theme === 'dark';

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (!classGrade) {
        setError('Please select a class grade.');
        setLoading(false);
        return;
      }
      const res = await api.post('/auth/register', { name, email, password, schoolName, classGrade });
      setTeacherToken(res.data.token);
      setTeacher(res.data.teacher);
      setShowWelcome(true);
      setTimeout(() => navigate('/teacher/dashboard'), 2000);
    } catch(err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setError('');
      try {
        const res = await api.post('/auth/google', { 
          credential: tokenResponse.access_token,
          action: 'register',
          classGrade
        });
        setTeacherToken(res.data.token);
        setTeacher(res.data.teacher);
        setShowWelcome(true);
        setTimeout(() => navigate('/teacher/dashboard'), 2000);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Google registration failed.');
      } finally {
        setLoading(false);
      }
    },
    onError: error => setError('Google Registration Failed')
  });

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 transition-all duration-700 ${isDarkMode ? 'bg-[#0a0f1e]' : 'bg-rose-50'}`}>
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} 
            className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl flex flex-col items-center max-w-sm mx-auto border-4 border-rose-500/20"
          >
            <motion.div 
              initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', damping: 15 }}
              className="w-24 h-24 bg-gradient-to-br from-rose-500 to-orange-500 rounded-full flex items-center justify-center text-white mb-6 shadow-xl shadow-rose-500/30"
            >
              <Presentation size={48} />
            </motion.div>
            <h2 className="text-3xl font-black text-center mb-2 dark:text-white">Welcome, {name.split(' ')[0]}! 🎉</h2>
            <p className="text-slate-500 font-bold text-center mb-6">Your teacher profile has been created.</p>
            <div className="w-8 h-8 border-4 border-rose-500/30 border-t-rose-500 rounded-full animate-spin"></div>
          </motion.div>
        </div>
      )}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
        className={`w-full max-w-md p-8 md:p-12 rounded-[2rem] shadow-2xl relative ${isDarkMode ? 'bg-slate-900 shadow-rose-500/10' : 'bg-white shadow-rose-200/50'} border ${isDarkMode ? 'border-slate-800' : 'border-rose-100'}`}
      >
        <Link to="/welcome" className={`absolute left-8 top-8 flex items-center gap-2 text-sm font-bold transition-colors ${isDarkMode ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-rose-600'}`}>
          <ArrowLeft size={18} /> Back
        </Link>
        <div className="text-center mb-10">
          <motion.div 
            whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}
            className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-rose-500/20 bg-gradient-to-br from-rose-500 to-orange-500 text-white`}
          >
            <Presentation size={40} />
          </motion.div>
          <h1 className={`text-4xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Create Account</h1>
          <p className={`font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Join EduVerse as a Teacher</p>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm font-bold mb-6 text-center">
            {error}
          </motion.div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-2">
            <label className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              <User size={14} /> Full Name
            </label>
            <input
              type="text" required placeholder="Dr. Sarah Jenkins"
              value={name} onChange={(e) => setName(e.target.value)}
              className={`w-full px-5 py-4 rounded-xl font-bold transition-all focus:ring-4 focus:ring-rose-500/20 outline-none ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-rose-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-rose-500'
              } border-2`}
            />
          </div>

          <div className="space-y-2">
            <label className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              <Mail size={14} /> Email Address
            </label>
            <input
              type="email" required placeholder="sarah.j@school.edu"
              value={email} onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-5 py-4 rounded-xl font-bold transition-all focus:ring-4 focus:ring-rose-500/20 outline-none ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-rose-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-rose-500'
              } border-2`}
            />
          </div>

          <div className="space-y-2">
            <label className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              <BookOpen size={14} /> Class Grade
            </label>
            <div className="relative">
              <select
                value={classGrade} onChange={(e) => setClassGrade(e.target.value)} required
                className={`w-full px-5 py-4 rounded-xl font-bold transition-all focus:ring-4 focus:ring-rose-500/20 outline-none appearance-none ${
                  isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-rose-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-rose-500'
                } border-2`}
              >
                <option value="" disabled>Select the class you teach</option>
                <option value="1">Class 1 (Explorer)</option>
                <option value="2-5">Class 2-5 (Builder)</option>
                <option value="6-8">Class 6-8 (Achiever)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              <Building size={14} /> School Name (Optional)
            </label>
            <input
              type="text" placeholder="Springfield Elementary"
              value={schoolName} onChange={(e) => setSchoolName(e.target.value)}
              className={`w-full px-5 py-4 rounded-xl font-bold transition-all focus:ring-4 focus:ring-rose-500/20 outline-none ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-rose-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-rose-500'
              } border-2`}
            />
          </div>

          <div className="space-y-2">
            <label className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              <Lock size={14} /> Password
            </label>
            <input
              type="password" required placeholder="••••••••"
              value={password} onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-5 py-4 rounded-xl font-bold transition-all focus:ring-4 focus:ring-rose-500/20 outline-none ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-rose-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-rose-500'
              } border-2`}
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            type="submit" disabled={loading}
            className={`w-full py-4 mt-2 rounded-xl font-black text-lg text-white flex items-center justify-center gap-2 shadow-lg shadow-rose-500/30 transition-all ${loading ? 'bg-rose-400' : 'bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400'}`}
          >
            {loading ? <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" /> : <>Sign Up <UserPlus size={20} /></>}
          </motion.button>
        </form>

        <div className="relative flex items-center py-8">
          <div className={`flex-grow border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}></div>
          <span className={`flex-shrink-0 mx-4 text-xs font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Or continue with</span>
          <div className={`flex-grow border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}></div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => {
            if (!classGrade) {
              setError('Please select a class grade before registering with Google.');
              return;
            }
            loginWithGoogle();
          }}
          type="button"
          className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 border-2 transition-all ${
            isDarkMode ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            <path d="M1 1h22v22H1z" fill="none"/>
          </svg>
          Google
        </motion.button>

        <p className={`mt-8 text-center font-bold text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          Already have an account?{' '}
          <Link to="/teacher/login" className={`transition-colors flex items-center justify-center gap-1 mt-2 ${isDarkMode ? 'text-rose-400 hover:text-rose-300' : 'text-rose-600 hover:text-rose-500'}`}>
            Sign in here <ArrowRight size={14} />
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
