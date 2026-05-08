import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../store/AppContext';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { GraduationCap, Presentation, Sparkles, ArrowRight } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';

const FloatingShape = ({ emoji, delay, x, y, duration }) => (
  <motion.div
    style={{ left: x, top: y }}
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: [0, -40, 0], opacity: 0.15 }}
    transition={{ delay, duration, repeat: Infinity, ease: "easeInOut" }}
    className="absolute text-5xl md:text-7xl pointer-events-none select-none z-0"
  >
    {emoji}
  </motion.div>
);

export default function LandingPage() {
  const { theme } = useAppContext();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isDarkMode = theme === 'dark';

  return (
    <div className={`min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-6 transition-colors duration-700 ${isDarkMode ? 'bg-[#0a0f1e]' : 'bg-slate-50'}`}>
      
      {/* Language Selector Fixed at Top Right */}
      <div className="absolute top-6 right-6 z-50">
        <LanguageSelector isDarkMode={isDarkMode} />
      </div>

      {/* Background ambient blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-indigo-500/20 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-cyan-500/20 blur-[100px] pointer-events-none"></div>

      {/* Floating Elements */}
      <FloatingShape emoji="⭐" delay={0} x="15%" y="20%" duration={4} />
      <FloatingShape emoji="🪐" delay={1.5} x="80%" y="15%" duration={5} />
      <FloatingShape emoji="🚀" delay={1} x="10%" y="70%" duration={4.5} />
      <FloatingShape emoji="💡" delay={2} x="85%" y="80%" duration={5.5} />

      <div className="w-full max-w-5xl z-10 space-y-16 mt-12 md:mt-0">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
          className="text-center space-y-6"
        >
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center justify-center p-4 rounded-[2rem] bg-indigo-600 text-white shadow-xl shadow-indigo-500/30 mb-2"
          >
            <Sparkles size={40} className="animate-pulse" />
          </motion.div>
          
          <h1 className={`text-5xl md:text-7xl font-black tracking-tighter ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
            {i18n.language === 'en' ? (
              <>
                {t('landing.welcome')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500">EduVerse</span>
              </>
            ) : (
              <>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500">EduVerse</span> {t('landing.welcome')}
              </>
            )}
          </h1>
          <p className={`text-xl md:text-2xl font-bold max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            {t('landing.description')}
          </p>
        </motion.div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 px-4">
          
          {/* Student Card */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.03, translateY: -10 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/login')}
            className={`group cursor-pointer rounded-[3rem] p-10 md:p-12 border-4 transition-all duration-300 relative overflow-hidden ${
              isDarkMode 
                ? 'bg-slate-900 border-indigo-500/30 hover:border-indigo-400 hover:shadow-[0_0_40px_rgba(99,102,241,0.2)]' 
                : 'bg-white border-indigo-100 hover:border-indigo-300 hover:shadow-2xl hover:shadow-indigo-500/20'
            }`}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="relative z-10 flex flex-col items-start text-left h-full">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white flex items-center justify-center mb-8 shadow-lg shadow-indigo-500/30 group-hover:rotate-12 transition-transform">
                <GraduationCap size={40} />
              </div>
              
              <h2 className={`text-4xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                {t('landing.im_student')}
              </h2>
              <p className={`text-lg font-bold mb-10 flex-grow ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {t('landing.student_desc')}
              </p>
              
              <div className="flex items-center gap-2 text-indigo-500 font-black text-xl group-hover:gap-4 transition-all">
                {t('landing.enter_portal')} <ArrowRight size={24} />
              </div>
            </div>
          </motion.div>

          {/* Teacher Card */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.03, translateY: -10 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/teacher/login')}
            className={`group cursor-pointer rounded-[3rem] p-10 md:p-12 border-4 transition-all duration-300 relative overflow-hidden ${
              isDarkMode 
                ? 'bg-slate-900 border-rose-500/30 hover:border-rose-400 hover:shadow-[0_0_40px_rgba(244,63,94,0.2)]' 
                : 'bg-white border-rose-100 hover:border-rose-300 hover:shadow-2xl hover:shadow-rose-500/20'
            }`}
          >
            <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-rose-500/20 to-orange-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            
            <div className="relative z-10 flex flex-col items-start text-left h-full">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 text-white flex items-center justify-center mb-8 shadow-lg shadow-rose-500/30 group-hover:-rotate-12 transition-transform">
                <Presentation size={40} />
              </div>
              
              <h2 className={`text-4xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                {t('landing.im_teacher')}
              </h2>
              <p className={`text-lg font-bold mb-10 flex-grow ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {t('landing.teacher_desc')}
              </p>
              
              <div className="flex items-center gap-2 text-rose-500 font-black text-xl group-hover:gap-4 transition-all">
                {t('landing.access_dashboard')} <ArrowRight size={24} />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
