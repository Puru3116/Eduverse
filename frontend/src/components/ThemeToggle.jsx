import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useAppContext } from '../store/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, setTheme } = useAppContext();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className={`fixed bottom-6 right-6 z-[10000] p-4 rounded-2xl shadow-2xl transition-all duration-300 border-2
        ${theme === 'dark' 
          ? 'bg-slate-900/80 border-indigo-500/50 text-amber-400 backdrop-blur-md hover:shadow-indigo-500/20' 
          : 'bg-white/80 border-slate-200 text-indigo-600 backdrop-blur-md hover:shadow-slate-200/50'
        }`}
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ y: 20, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'dark' ? <Sun size={24} strokeWidth={2.5} /> : <Moon size={24} strokeWidth={2.5} />}
        </motion.div>
      </AnimatePresence>
      
      {/* Tooltip hint */}
      <span className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
        ${theme === 'dark' ? 'bg-slate-800 text-slate-200' : 'bg-slate-900 text-white'}`}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </span>
    </motion.button>
  );
};

export default ThemeToggle;
