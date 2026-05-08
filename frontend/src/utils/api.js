import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5005/api',
});

api.interceptors.request.use(
  (config) => {
    // Determine context (student or teacher) based on URL or just append both if needed.
    // For simplicity, let's append student token if it exists.
    const studentToken = localStorage.getItem('eduverse_student_token');
    const teacherToken = localStorage.getItem('eduverse_teacher_token');

    // Determine context based on the current page URL or API URL
    const isTeacherContext = window.location.pathname.includes('/teacher') || config.url.includes('/teacher') || config.url.includes('/by-date') || config.url.includes('/update');

    if (isTeacherContext && teacherToken) {
        config.headers.Authorization = `Bearer ${teacherToken}`;
    } else if (studentToken) {
        config.headers.Authorization = `Bearer ${studentToken}`;
    } else if (teacherToken) {
        // Fallback if no student token exists but teacher token does
        config.headers.Authorization = `Bearer ${teacherToken}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
