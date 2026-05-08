const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const progressRoutes = require('./routes/progressRoutes');
const testRoutes = require('./routes/testRoutes');
const messageRoutes = require('./routes/messageRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const teacherGroupMessageRoutes = require('./routes/teacherGroupMessageRoutes');
const Attendance = require('./models/Attendance');
const auth = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5005;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/eduverse';

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/test', testRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/teacher-group-messages', teacherGroupMessageRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'EduVerse API running' });
});

app.get('/api/attendance-history', auth, async (req, res) => {
  try {
    const studentId = req.user.student?.id;
    if (!studentId) return res.status(400).json({ message: 'Student ID not found' });
    const history = await Attendance.find({ studentId }).sort({ date: 1 });
    res.json(history);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Database connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
