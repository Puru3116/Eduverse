import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [student, setStudent] = useState(() => {
    const saved = localStorage.getItem('eduverse_student');
    return saved ? JSON.parse(saved) : null;
  });

  const [studentToken, setStudentToken] = useState(() => {
    return localStorage.getItem('eduverse_student_token') || null;
  });

  const [teacher, setTeacher] = useState(() => {
    const saved = localStorage.getItem('eduverse_teacher');
    return saved ? JSON.parse(saved) : null;
  });

  const [teacherToken, setTeacherToken] = useState(() => {
    return localStorage.getItem('eduverse_teacher_token') || null;
  });

  useEffect(() => {
    if (student) {
      localStorage.setItem('eduverse_student', JSON.stringify(student));
    } else {
      localStorage.removeItem('eduverse_student');
    }
  }, [student]);

  useEffect(() => {
    if (teacher) {
      localStorage.setItem('eduverse_teacher', JSON.stringify(teacher));
    } else {
      localStorage.removeItem('eduverse_teacher');
    }
  }, [teacher]);

  useEffect(() => {
    if (studentToken) {
      localStorage.setItem('eduverse_student_token', studentToken);
    } else {
      localStorage.removeItem('eduverse_student_token');
    }
  }, [studentToken]);

  useEffect(() => {
    if (teacherToken) {
      localStorage.setItem('eduverse_teacher_token', teacherToken);
    } else {
      localStorage.removeItem('eduverse_teacher_token');
    }
  }, [teacherToken]);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('eduverse_theme') || 'light';
  });

  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    localStorage.setItem('eduverse_theme', theme);
    // Apply theme class to document for Tailwind
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <AppContext.Provider value={{ 
      student, setStudent, 
      studentToken, setStudentToken,
      teacher, setTeacher,
      teacherToken, setTeacherToken, 
      theme, setTheme,
      selectedModule, setSelectedModule,
      selectedTopic, setSelectedTopic
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
