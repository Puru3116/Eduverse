import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import api from '../utils/api';

export default function StudentLogin() {
  const { setStudent, setStudentToken, theme } = useAppContext();
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
      const res = await api.post('/students/login', { email, password });
      setStudentToken(res.data.token);
      setStudent(res.data.student);
      navigate('/dashboard');
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
        const res = await api.post('/students/google', { 
          credential: tokenResponse.access_token,
          action: 'login'
        });
        setStudentToken(res.data.token);
        setStudent(res.data.student);
        navigate('/dashboard');
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
    <div className={`min-h-screen flex items-center justify-center p-6 transition-all duration-700 ${isDarkMode ? 'bg-[#0a0f1e]' : 'bg-slate-50'}`}>
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
            <span className="text-3xl">🌍</span>
          </motion.div>
          <h1 className={`text-3xl font-black tracking-tight mb-2 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Sign in</h1>
          <p className={`text-sm font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>to continue to EduVerse</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-sm font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
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
          </div>

          <div className="flex items-center justify-between mt-2">
            <a href="#" className="text-sm font-bold text-indigo-600 hover:text-indigo-500 transition-colors">Forgot password?</a>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} 
            type="submit" 
            disabled={loading} 
            className="w-full flex items-center justify-center gap-2 py-4 bg-indigo-600 text-white rounded-xl text-sm font-black shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-all"
          >
            {loading ? "Signing in..." : "Sign in"}
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
              onClick={() => loginWithGoogle()}
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
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-600 hover:text-indigo-500 transition-colors">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
}
