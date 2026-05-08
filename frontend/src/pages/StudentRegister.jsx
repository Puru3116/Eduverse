import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, BookOpen, ArrowLeft } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import api from '../utils/api';

export default function StudentRegister() {
  const { setStudent, setStudentToken, theme } = useAppContext();
  const [showWelcome, setShowWelcome] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        setError('Please select your class grade.');
        setLoading(false);
        return;
      }
      const res = await api.post('/students/register', { firstName, lastName, email, password, classGrade });
      setStudentToken(res.data.token);
      setStudent(res.data.student);
      setShowWelcome(true);
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
        const res = await api.post('/students/google', { 
          credential: tokenResponse.access_token,
          action: 'register',
          classGrade
        });
        setStudentToken(res.data.token);
        setStudent(res.data.student);
        setShowWelcome(true);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Google registration failed.');
      } finally {
        setLoading(false);
      }
    },
    onError: error => setError('Google Registration Failed')
  });

  useEffect(() => {
    let timer;
    if (showWelcome && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate('/pretest');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showWelcome, countdown, navigate]);

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 transition-all duration-700 ${isDarkMode ? 'bg-[#0a0f1e]' : 'bg-slate-50'}`}>
      {showWelcome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} 
            className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[3rem] shadow-2xl flex flex-col items-center max-w-lg mx-auto border-4 border-indigo-500/20 text-center"
          >
            <motion.div 
              initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', damping: 15 }}
              className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center text-white mb-8 shadow-xl shadow-indigo-500/30"
            >
              <span className="text-5xl">🎓</span>
            </motion.div>
            <h2 className="text-4xl font-black mb-4 dark:text-white">Welcome, {firstName}! 🎉</h2>
            <p className="text-slate-500 dark:text-slate-400 font-bold text-lg mb-8 leading-relaxed">
              We're so excited to have you! To personalize your learning journey, you'll first take a quick <span className="text-indigo-500">Pre-Test</span> to check your basic knowledge.
            </p>
            
            <div className="relative w-32 h-32 flex items-center justify-center mb-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                <motion.circle 
                  cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" 
                  className="text-indigo-500"
                  strokeDasharray="377"
                  animate={{ strokeDashoffset: 377 - (377 * countdown) / 10 }}
                  transition={{ duration: 1, ease: "linear" }}
                />
              </svg>
              <span className="absolute text-4xl font-black dark:text-white">{countdown}</span>
            </div>
            
            <p className="text-indigo-500 font-black animate-pulse">Test starts automatically in {countdown}s...</p>
            
            <button 
              onClick={() => navigate('/pretest')}
              className="mt-8 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2"
            >
              Start Now <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      )}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
        className={`w-full max-w-md p-8 md:p-12 rounded-[2rem] shadow-2xl relative ${isDarkMode ? 'bg-slate-900 shadow-indigo-500/10' : 'bg-white shadow-slate-200/50'} border ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}
      >
        <Link to="/welcome" className={`absolute left-8 top-8 flex items-center gap-2 text-sm font-bold transition-colors ${isDarkMode ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-indigo-600'}`}>
          <ArrowLeft size={18} /> Back
        </Link>
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} 
            className="w-16 h-16 mx-auto bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-500/30"
          >
            <span className="text-3xl">✨</span>
          </motion.div>
          <h1 className={`text-3xl font-black tracking-tight mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Create Account</h1>
          <p className={`text-sm font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Join the EduVerse today</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-sm font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="relative group w-1/2">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${isDarkMode ? 'text-slate-500 group-focus-within:text-indigo-400' : 'text-slate-400 group-focus-within:text-indigo-600'}`}>
                  <User size={20} />
                </div>
                <input 
                  type="text" 
                  placeholder="First name" 
                  value={firstName} 
                  onChange={e => setFirstName(e.target.value)} 
                  className={`w-full pl-11 pr-4 py-4 rounded-xl text-sm font-bold outline-none border-2 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500 focus:bg-white'}`} 
                  required 
                />
              </div>
              <div className="relative group w-1/2">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${isDarkMode ? 'text-slate-500 group-focus-within:text-indigo-400' : 'text-slate-400 group-focus-within:text-indigo-600'}`}>
                  <User size={20} />
                </div>
                <input 
                  type="text" 
                  placeholder="Last name" 
                  value={lastName} 
                  onChange={e => setLastName(e.target.value)} 
                  className={`w-full pl-11 pr-4 py-4 rounded-xl text-sm font-bold outline-none border-2 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500 focus:bg-white'}`} 
                  required 
                />
              </div>
            </div>

            <div className="relative group">
              <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${isDarkMode ? 'text-slate-500 group-focus-within:text-indigo-400' : 'text-slate-400 group-focus-within:text-indigo-600'}`}>
                <Mail size={20} />
              </div>
              <input 
                type="email" 
                placeholder="Email address" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className={`w-full pl-12 pr-4 py-4 rounded-xl text-sm font-bold outline-none border-2 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500 focus:bg-white'}`} 
                required 
              />
            </div>

            <div className="relative group">
              <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${isDarkMode ? 'text-slate-500 group-focus-within:text-indigo-400' : 'text-slate-400 group-focus-within:text-indigo-600'}`}>
                <Lock size={20} />
              </div>
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className={`w-full pl-12 pr-4 py-4 rounded-xl text-sm font-bold outline-none border-2 transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500 focus:bg-white'}`} 
                required 
              />
            </div>

            <div className="relative group">
              <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${isDarkMode ? 'text-slate-500 group-focus-within:text-indigo-400' : 'text-slate-400 group-focus-within:text-indigo-600'}`}>
                <BookOpen size={20} />
              </div>
              <select
                value={classGrade} 
                onChange={e => setClassGrade(e.target.value)} 
                className={`w-full pl-12 pr-4 py-4 rounded-xl text-sm font-bold outline-none border-2 appearance-none transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500 focus:bg-white'}`}
                required
              >
                <option value="" disabled>Select your Class</option>
                <option value="1">Class 1 (Explorer)</option>
                <option value="2-5">Class 2-5 (Builder)</option>
                <option value="6-8">Class 6-8 (Achiever)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} 
            type="submit" 
            disabled={loading} 
            className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 text-white rounded-xl text-sm font-black shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all mt-4"
          >
            {loading ? "Creating account..." : "Sign up"}
            {!loading && <ArrowRight size={18} />}
          </motion.button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-4 font-bold ${isDarkMode ? 'bg-slate-900 text-slate-500' : 'bg-white text-slate-400'}`}>Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <button 
              type="button"
              onClick={() => {
                if (!classGrade) {
                  setError('Please select your class grade first.');
                  return;
                }
                loginWithGoogle();
              }}
              disabled={loading}
              className={`w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl border-2 font-bold transition-all ${isDarkMode ? 'border-slate-700 hover:bg-slate-800 text-white' : 'border-slate-200 hover:bg-slate-50 text-slate-700'} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                <path fill="none" d="M1 1h22v22H1z" />
              </svg>
              Google
            </button>
          </div>
        </div>

        <p className={`mt-10 text-center text-sm font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-500 transition-colors">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
