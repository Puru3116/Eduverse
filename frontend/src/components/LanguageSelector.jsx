import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'mr', name: 'मराठी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ' },
];

export default function LanguageSelector({ isDarkMode }) {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-300 ${
          isDarkMode 
            ? 'bg-slate-900 border-indigo-500/30 text-white hover:border-indigo-400' 
            : 'bg-white border-indigo-100 text-slate-800 hover:border-indigo-300'
        }`}
      >
        <Globe size={18} className="text-indigo-500" />
        <span className="font-bold">{currentLanguage.name}</span>
        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <div 
              className="fixed inset-0 z-40 md:hidden" 
              onClick={() => setIsOpen(false)}
            ></div>
            
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className={`absolute right-0 mt-2 w-48 rounded-2xl shadow-2xl z-50 overflow-hidden border ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800 shadow-indigo-500/10' 
                  : 'bg-white border-slate-100 shadow-slate-200'
              }`}
            >
              <div className="py-2 max-h-80 overflow-y-auto custom-scrollbar">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors ${
                      i18n.language === lang.code
                        ? 'bg-indigo-600 text-white'
                        : isDarkMode 
                          ? 'text-slate-300 hover:bg-slate-800 hover:text-indigo-400' 
                          : 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-600'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
