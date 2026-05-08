import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Layouts / Pages
import LandingPage from './pages/LandingPage';
import StudentHome from './pages/StudentHome';
import StudentLogin from './pages/StudentLogin';
import StudentRegister from './pages/StudentRegister';
import TeacherLogin from './pages/TeacherLogin';
import TeacherSignup from './pages/TeacherSignup';
import TeacherDashboard from './pages/TeacherDashboard';
import PreTest from './pages/PreTest';
import BuilderGameHost from './pages/BuilderGameHost';
import AchieverHost from './pages/AchieverHost';
import StudentSecurity from './pages/StudentSecurity';
import SplashScreen from './components/SplashScreen';
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Math Modules
import ShopSimulation from './modules/math/ShopSimulation';
import TimedQuiz from './modules/math/TimedQuiz';
import DragDropNumbers from './modules/math/DragDropNumbers';

// Shabd Modules
import WordImageMatch from './modules/shabd/WordImageMatch';
import FillBlanks from './modules/shabd/FillBlanks';
import AudioRecognition from './modules/shabd/AudioRecognition';

// Builder Modules
import MultiplicationDash from './modules/builder/math/MultiplicationDash';

// Rural Modules
import ScenarioDecisions from './modules/rural/ScenarioDecisions';
import SortingGame from './modules/rural/SortingGame';
import QuickDecision from './modules/rural/QuickDecision';

const GOOGLE_CLIENT_ID = '858816687357-fl3qv2gv2tec2qfh8e66cnl9e75ursr4.apps.googleusercontent.com';

import ThemeToggle from './components/ThemeToggle';
import { useAppContext } from './store/AppContext';

 function AppContent() {
  const { theme } = useAppContext();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500); // 2.5 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className={`${theme === 'dark' ? 'dark' : ''} w-full min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-500`}>
        <AnimatePresence>
          {showSplash && <SplashScreen />}
        </AnimatePresence>
        
        <ThemeToggle />
        <Routes>
          {/* Core Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/welcome" element={<LandingPage />} />
          <Route path="/dashboard" element={<StudentHome />} />
          <Route path="/login" element={<StudentLogin />} />
          <Route path="/register" element={<StudentRegister />} />
          <Route path="/pretest" element={<PreTest />} />
          <Route path="/teacher/login" element={<TeacherLogin />} />
          <Route path="/teacher/signup" element={<TeacherSignup />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
          <Route path="/student/security" element={<StudentSecurity />} />
          <Route path="/achiever/:moduleKey/:topicId" element={<AchieverHost />} />

          {/* Math Games */}
          <Route path="/play/math/shop" element={<ShopSimulation />} />
          <Route path="/play/math/quiz" element={<TimedQuiz />} />
          <Route path="/play/math/dragdrop" element={<DragDropNumbers />} />

          {/* Builder Games */}
          <Route path="/play/builder/math/mult-dash" element={<MultiplicationDash />} />
          <Route path="/play/builder/:modId/:topicId" element={<BuilderGameHost />} />

          {/* Shabd Games */}
          <Route path="/play/shabd/match" element={<WordImageMatch />} />
          <Route path="/play/shabd/blanks" element={<FillBlanks />} />
          <Route path="/play/shabd/audio" element={<AudioRecognition />} />

          {/* Rural Games */}
          <Route path="/play/rural/scenario" element={<ScenarioDecisions />} />
          <Route path="/play/rural/sorting" element={<SortingGame />} />
          <Route path="/play/rural/quick" element={<QuickDecision />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
