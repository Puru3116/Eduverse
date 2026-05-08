import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, ArrowRight, Presentation, ArrowLeft } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import api from '../utils/api';

export default function TeacherLogin() {
  const { setTeacherToken, setTeacher, theme } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const isDarkMode = theme === 'dark';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', { email, password });
      setTeacherToken(res.data.token);
      setTeacher(res.data.teacher);
      navigate('/teacher/dashboard');
    } catch(err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
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
          action: 'login'
        });
        setTeacherToken(res.data.token);
        setTeacher(res.data.teacher);
        navigate('/teacher/dashboard');
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Google login failed.');
      } finally {
        setLoading(false);
      }
    },
    onError: error => setError('Google Login Failed')
  });

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 transition-all duration-700 ${isDarkMode ? 'bg-[#0a0f1e]' : 'bg-rose-50'}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
        className={`w-full max-w-md p-8 md:p-12 rounded-[2rem] shadow-2xl relative ${isDarkMode ? 'bg-slate-900 shadow-rose-500/10' : 'bg-white shadow-rose-200/50'} border ${isDarkMode ? 'border-slate-800' : 'border-rose-100'}`}
      >
        <Link to="/welcome" className={`absolute left-8 top-8 flex items-center gap-2 text-sm font-bold transition-colors ${isDarkMode ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-rose-600'}`}>
          <ArrowLeft size={18} /> Back
        </Link>
        <div className="text-center mb-10">
          <motion.div 
            whileHover={{ rotate: 180 }} transition={{ duration: 0.5 }}
            className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-rose-500/20 bg-gradient-to-br from-rose-500 to-orange-500 text-white`}
          >
            <Presentation size={40} />
          </motion.div>
          <h1 className={`text-4xl font-black mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Welcome Back</h1>
          <p className={`font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Teacher Portal</p>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm font-bold mb-6 text-center">
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              <Mail size={14} /> Email Address
            </label>
            <input
              type="email" required placeholder="name@school.edu"
              value={email} onChange={(e) => setEmail(e.target.value)}
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
            className={`w-full py-4 rounded-xl font-black text-lg text-white flex items-center justify-center gap-2 shadow-lg shadow-rose-500/30 transition-all ${loading ? 'bg-rose-400' : 'bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400'}`}
          >
            {loading ? <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" /> : <>Sign In <LogIn size={20} /></>}
          </motion.button>
        </form>

        <div className="relative flex items-center py-8">
          <div className={`flex-grow border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}></div>
          <span className={`flex-shrink-0 mx-4 text-xs font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Or continue with</span>
          <div className={`flex-grow border-t ${isDarkMode ? 'border-slate-700' : 'border-slate-200'}`}></div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => loginWithGoogle()}
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
          Don't have an account?{' '}
          <Link to="/teacher/signup" className={`transition-colors flex items-center justify-center gap-1 mt-2 ${isDarkMode ? 'text-rose-400 hover:text-rose-300' : 'text-rose-600 hover:text-rose-500'}`}>
            Register here <ArrowRight size={14} />
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
